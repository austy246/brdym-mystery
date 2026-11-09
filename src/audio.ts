const KEY = 'zvb-settings';

export interface Settings {
  volume: number; // 0..1
  textSpeed: number; // 1..4
  voices: boolean; // mluvené hlasy zapnuty
}

const saved = (() => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}') as Partial<Settings>;
  } catch {
    return {};
  }
})();

export const settings: Settings = { volume: 0.7, textSpeed: 3, voices: true, ...saved };

export function saveSettings(): void {
  localStorage.setItem(KEY, JSON.stringify(settings));
}

let ctx: AudioContext | null = null;

function ac(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

function tone(freq: number, dur: number, type: OscillatorType, gain: number, when = 0): void {
  const c = ac();
  const t = c.currentTime + when;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(gain * settings.volume, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.02);
}

/** Krátké pípnutí při "mluvení" – každá postava má jinou výšku. */
export function blip(pitch: number): void {
  tone(pitch * (0.92 + Math.random() * 0.16), 0.06, 'square', 0.07);
}

export function click(): void {
  tone(520, 0.05, 'triangle', 0.12);
}

/** Zvonění drátového telefonu: třikrát dlouhé zvonění. */
export function ring(): void {
  for (let r = 0; r < 3; r++) {
    for (let i = 0; i < 14; i++) {
      tone(i % 2 ? 1750 : 1500, 0.035, 'square', 0.1, r * 1.5 + i * 0.07);
    }
  }
}

export function chime(): void {
  [523, 659, 784].forEach((f, i) => tone(f, 0.25, 'triangle', 0.15, i * 0.12));
}

export function sad(): void {
  [392, 330, 262].forEach((f, i) => tone(f, 0.4, 'sawtooth', 0.08, i * 0.3));
}

export function previewVolume(): void {
  tone(660, 0.12, 'triangle', 0.2);
}

/* ---------------- mluvené hlasy ---------------- */

export interface VoicePlayback {
  stop(): void;
  /** true, dokud se hlas nepodařilo načíst a nevyhodil chybu (pak se píská) */
  readonly ok: boolean;
}

let current: VoicePlayback | null = null;

export function stopVoice(): void {
  current?.stop();
  current = null;
}

let impulse: AudioBuffer | null = null;

/** Krátká syntetická odezva malé místnosti (šum s exponenciálním doznívání). */
function roomImpulse(c: AudioContext): AudioBuffer {
  if (impulse) return impulse;
  const len = Math.floor(c.sampleRate * 0.35);
  const buf = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
    }
  }
  impulse = buf;
  return buf;
}

/**
 * Přehraje namluvenou repliku. Při chybě (chybí soubor, zablokované přehrávání)
 * tiše přejde na `ok = false` a hra se vrátí k pípání.
 */
export function playVoice(url: string, effect?: 'phone'): VoicePlayback {
  stopVoice();
  const audio = new Audio(url);
  let failed = false;
  let nodes: AudioNode[] = [];

  if (effect === 'phone') {
    try {
      const c = ac();
      const src = c.createMediaElementSource(audio);
      const hp = c.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 300;
      const lp = c.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 3400;
      const gain = c.createGain();
      gain.gain.value = Math.min(1, settings.volume) * 1.6;
      src.connect(hp).connect(lp).connect(gain).connect(c.destination);
      nodes = [src, hp, lp, gain];
    } catch {
      audio.volume = settings.volume;
    }
  } else {
    // Mírná "místnost": jemná ozvěna, teplejší zvuk a trocha měkkého stlačení,
    // aby hlas nezněl tak suše a strojově.
    try {
      const c = ac();
      const src = c.createMediaElementSource(audio);
      const hp = c.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 80;
      const warm = c.createBiquadFilter();
      warm.type = 'lowshelf';
      warm.frequency.value = 220;
      warm.gain.value = 2.5;
      const air = c.createBiquadFilter();
      air.type = 'highshelf';
      air.frequency.value = 7000;
      air.gain.value = -3;
      const comp = c.createDynamicsCompressor();
      comp.threshold.value = -22;
      comp.ratio.value = 3;
      const dry = c.createGain();
      dry.gain.value = Math.min(1, settings.volume);
      const wet = c.createGain();
      wet.gain.value = Math.min(1, settings.volume) * 0.16;
      const verb = c.createConvolver();
      verb.buffer = roomImpulse(c);
      src.connect(hp).connect(warm).connect(air).connect(comp);
      comp.connect(dry).connect(c.destination);
      comp.connect(verb).connect(wet).connect(c.destination);
      nodes = [src, hp, warm, air, comp, dry, wet, verb];
    } catch {
      audio.volume = settings.volume;
    }
  }

  const fail = (): void => {
    failed = true;
  };
  audio.addEventListener('error', fail);
  audio.play().catch(fail);

  const pb: VoicePlayback = {
    stop() {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      nodes.forEach((n) => n.disconnect());
    },
    get ok() {
      return !failed;
    },
  };
  current = pb;
  return pb;
}
