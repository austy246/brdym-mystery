import type { Line } from './types';

/** Stabilní klíč souboru s namluvenou replikou podle řečníka a textu (FNV-1a). */
export function voiceKey(line: Pick<Line, 'who' | 'text' | 'say'>): string {
  const s = `${line.who}|${line.say ?? line.text}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}
