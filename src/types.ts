export type BgId =
  | 'office'
  | 'trash'
  | 'car'
  | 'square'
  | 'square2'
  | 'hospoda'
  | 'trafika'
  | 'urad'
  | 'dvur'
  | 'sbirka'
  | 'zbrojnice'
  | 'zbrojnice2';

export type SpeakerId =
  | 'karel'
  | 'nacelnik'
  | 'telefon'
  | 'vypravec'
  | 'pepa'
  | 'starosta'
  | 'hospodsky'
  | 'stamgasti'
  | 'pani'
  | 'sberatel'
  | 'starenka'
  | 'kluk'
  | 'statkar'
  | 'zena'
  | 'pekar';

/** Jedna promluva; `say` je text určený k namluvení, pokud se liší od zobrazeného. */
export interface Line {
  who: SpeakerId;
  text: string;
  say?: string;
  sfx?: 'ring' | 'sad' | 'chime';
  /** bez namluvení (např. nápověda) */
  silent?: boolean;
}

/** Přístup ke stavu hry pro podmínky. */
export interface Game {
  has(item: string): boolean;
  flag(f: string): boolean;
}

export type Cond = (g: Game) => boolean;

export type Ending = 'bad' | 'arrest' | 'mercy';

export type Step =
  | Line
  | { give: string }
  | { take: string }
  | { set: string }
  | { unset: string }
  | { go: string } // přejít do lokace (průzkum)
  | { bg: BgId } // změna pozadí v cutscéně
  | { talk: string } // rozhovor (nabídka témat)
  | { choice: { label: string; steps: Step[]; if?: Cond }[] }
  | { when: Cond; then: Step[]; else?: Step[] }
  | { end: Ending }
  | { toast: string };

export interface Topic {
  label: string;
  steps: Step[];
  /** zobrazit jen když platí */
  if?: Cond;
  /** po použití zmizí */
  once?: boolean;
}

export interface Conversation {
  topics: Topic[];
  /** co řekne postava na rozloučenou (nepovinné) */
  bye?: Step[];
}

export type Rect = [number, number, number, number];

export interface Hotspot {
  id: string;
  name: string;
  rect: Rect; // v souřadnicích scény 640 x 360
  look?: Step[];
  talk?: Step[];
  use?: Step[];
  /** použití předmětu z kapsy na tuto věc */
  item?: Record<string, Step[]>;
  /** východ do jiné lokace */
  go?: string;
  /** brána: když neplatí, spustí se `fail` a východ se nekoná */
  gate?: { ok: Cond; fail: Step[] };
  /** zobrazit jen když platí */
  show?: Cond;
}

export interface Location {
  id: string;
  name: string;
  bg: BgId | ((g: Game) => BgId);
  hotspots: Hotspot[];
  /** při prvním příchodu */
  enter?: Step[];
}

export interface ItemDef {
  id: string;
  name: string;
  desc: string;
}
