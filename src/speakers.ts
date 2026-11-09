import type { SpeakerId } from './types';

export interface VoiceConfig {
  /** Microsoft Edge TTS hlas (česky existují jen Antonin a Vlasta) */
  voice: 'cs-CZ-AntoninNeural' | 'cs-CZ-VlastaNeural';
  /** posun výšky, např. "-12Hz" */
  pitch: string;
  /** rychlost, např. "-8%" */
  rate: string;
  /** efekt při přehrávání */
  effect?: 'phone';
}

export interface Speaker {
  name: string;
  /** výška pípání při psaní (záloha, když hlas chybí) */
  pitch: number;
  voice: VoiceConfig;
}

const A = 'cs-CZ-AntoninNeural' as const;
const V = 'cs-CZ-VlastaNeural' as const;

export const speakers: Record<SpeakerId, Speaker> = {
  karel: { name: 'Patrik', pitch: 210, voice: { voice: A, pitch: '+8Hz', rate: '+4%' } },
  nacelnik: { name: 'Náčelník', pitch: 95, voice: { voice: A, pitch: '-12Hz', rate: '-8%' } },
  telefon: { name: 'Hlas v telefonu', pitch: 330, voice: { voice: V, pitch: '+0Hz', rate: '+0%', effect: 'phone' } },
  vypravec: { name: '', pitch: 0, voice: { voice: V, pitch: '-4Hz', rate: '-10%' } },
  pepa: { name: 'Pepa', pitch: 250, voice: { voice: A, pitch: '+16Hz', rate: '+12%' } },
  starosta: { name: 'Starosta Pelikán', pitch: 150, voice: { voice: A, pitch: '-4Hz', rate: '-4%' } },
  hospodsky: { name: 'Lojza', pitch: 120, voice: { voice: A, pitch: '-18Hz', rate: '+6%' } },
  stamgasti: { name: 'Štamgasti', pitch: 105, voice: { voice: A, pitch: '-8Hz', rate: '-16%' } },
  pani: { name: 'Paní Dvořáčková', pitch: 290, voice: { voice: V, pitch: '+8Hz', rate: '+14%' } },
  sberatel: { name: 'Ctibor Kocour', pitch: 200, voice: { voice: A, pitch: '+22Hz', rate: '-6%' } },
  starenka: { name: 'Stařenka', pitch: 310, voice: { voice: V, pitch: '+16Hz', rate: '-14%' } },
  kluk: { name: 'Kluk', pitch: 340, voice: { voice: V, pitch: '+34Hz', rate: '+10%' } },
  statkar: { name: 'Statkář', pitch: 100, voice: { voice: A, pitch: '-14Hz', rate: '-10%' } },
  zena: { name: 'Paní', pitch: 280, voice: { voice: V, pitch: '+0Hz', rate: '+4%' } },
  pekar: { name: 'Pekař Brdýmovský', pitch: 110, voice: { voice: A, pitch: '-20Hz', rate: '-12%' } },
};
