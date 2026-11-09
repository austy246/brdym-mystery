// Vygeneruje public/voices/<id>.mp3 pro každou repliku ze src/story.ts.
// Spouštět přes: npm run voices   (přegenerovat vše: npm run voices -- --force)
// Používá neoficiální koncový bod Microsoft Edge online TTS (balíček node-edge-tts).
import { EdgeTTS } from 'node-edge-tts';
import { mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { story, speakers } from '../src/story.ts';

const force = process.argv.includes('--force');
const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'voices');
await mkdir(outDir, { recursive: true });

const exists = async (p) => {
  try {
    return (await stat(p)).size > 0;
  } catch {
    return false;
  }
};

let made = 0;
let skipped = 0;
let failed = 0;

for (const [id, node] of Object.entries(story)) {
  const file = join(outDir, `${id}.mp3`);
  if (!force && (await exists(file))) {
    skipped++;
    continue;
  }
  const v = speakers[node.speaker].voice;
  // Drobná náhodná odchylka u každé repliky (jako když člověk pokaždé řekne větu trochu jinak),
  // vždy stejná pro stejné id, takže přegenerování dá stejný výsledek.
  const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  const r1 = (hash(id) % 1000) / 1000 - 0.5;
  const r2 = (hash(id + 'r') % 1000) / 1000 - 0.5;
  const fmt = (n, u) => `${n >= 0 ? '+' : '-'}${Math.abs(Math.round(n))}${u}`;
  const tts = new EdgeTTS({
    voice: v.voice,
    lang: 'cs-CZ',
    outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
    pitch: fmt(parseFloat(v.pitch) + r1 * 6, 'Hz'),
    rate: fmt(parseFloat(v.rate) + r2 * 10, '%'),
    timeout: 20000,
  });
  const text = node.say ?? node.text;
  let ok = false;
  for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
    try {
      await tts.ttsPromise(text, file);
      ok = true;
    } catch (e) {
      console.warn(`  ${id}: pokus ${attempt} selhal (${e?.message ?? e})`);
    }
  }
  if (ok) {
    const { size } = await stat(file);
    console.log(`${id}.mp3  ${size} B  [${node.speaker}]`);
    made++;
  } else {
    failed++;
  }
}

console.log(`Hotovo: vytvořeno ${made}, přeskočeno ${skipped}, selhalo ${failed}.`);
if (failed) process.exit(1);
