// Vygeneruje public/voices/<klíč>.mp3 pro každou namluvenou repliku ve hře.
// Spouštět přes: npm run voices   (přegenerovat vše: npm run voices -- --force)
// Používá neoficiální koncový bod Microsoft Edge online TTS (balíček node-edge-tts).
import { EdgeTTS } from 'node-edge-tts';
import { mkdir, stat, readdir, unlink } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { intro, reveal, capsule } from '../src/game/story.ts';
import { convs } from '../src/game/convs.ts';
import { locations } from '../src/game/locations.ts';
import { speakers } from '../src/speakers.ts';
import { voiceKey } from '../src/voice.ts';

const force = process.argv.includes('--force');
const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'voices');
await mkdir(outDir, { recursive: true });

// Najdi všechny repliky (objekty s `who` a `text`) ve všech datech hry.
const lines = new Map();
const seen = new Set();
const walk = (o) => {
  if (!o || typeof o !== 'object' || seen.has(o)) return;
  seen.add(o);
  if (typeof o.who === 'string' && typeof o.text === 'string' && !o.silent) {
    lines.set(voiceKey(o), o);
  }
  for (const v of Object.values(o)) walk(v);
};
[intro, reveal, capsule, convs, locations].forEach(walk);

const exists = async (p) => {
  try {
    return (await stat(p)).size > 0;
  } catch {
    return false;
  }
};

const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const fmt = (n, u) => `${n >= 0 ? '+' : '-'}${Math.abs(Math.round(n))}${u}`;

let made = 0;
let skipped = 0;
let failed = 0;
const wanted = new Set();

for (const [key, line] of lines) {
  const file = join(outDir, `${key}.mp3`);
  wanted.add(`${key}.mp3`);
  if (!force && (await exists(file))) {
    skipped++;
    continue;
  }
  const v = speakers[line.who].voice;
  // Drobná odchylka u každé repliky (jako když člověk pokaždé řekne větu trochu jinak),
  // stejná pro stejný klíč, takže přegenerování dá stejný výsledek.
  const r1 = (hash(key) % 1000) / 1000 - 0.5;
  const r2 = (hash(key + 'r') % 1000) / 1000 - 0.5;
  const tts = new EdgeTTS({
    voice: v.voice,
    lang: 'cs-CZ',
    outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
    pitch: fmt(parseFloat(v.pitch) + r1 * 6, 'Hz'),
    rate: fmt(parseFloat(v.rate) + r2 * 10, '%'),
    timeout: 20000,
  });
  const text = line.say ?? line.text;
  let ok = false;
  for (let attempt = 1; attempt <= 4 && !ok; attempt++) {
    try {
      await tts.ttsPromise(text, file);
      ok = true;
    } catch (e) {
      console.warn(`  ${key}: pokus ${attempt} selhal (${e?.message ?? e})`);
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  if (ok) {
    const { size } = await stat(file);
    console.log(`${key}.mp3  ${size} B  [${line.who}] ${text.slice(0, 50)}`);
    made++;
  } else {
    failed++;
  }
}

// Smaž osiřelé soubory po změně textů.
let removed = 0;
for (const f of await readdir(outDir)) {
  if (f.endsWith('.mp3') && !wanted.has(f)) {
    await unlink(join(outDir, f));
    removed++;
  }
}

console.log(`Hotovo: ${lines.size} replik, vytvořeno ${made}, přeskočeno ${skipped}, selhalo ${failed}, smazáno starých ${removed}.`);
if (failed) process.exit(1);
