export type BgId = 'office' | 'trash' | 'car' | 'square';
export type SpeakerId = 'karel' | 'nacelnik' | 'telefon' | 'vypravec';

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

export const speakers: Record<SpeakerId, Speaker> = {
  karel: {
    name: 'Patrik',
    pitch: 210,
    voice: { voice: 'cs-CZ-AntoninNeural', pitch: '+8Hz', rate: '+4%' },
  },
  nacelnik: {
    name: 'Náčelník',
    pitch: 95,
    voice: { voice: 'cs-CZ-AntoninNeural', pitch: '-12Hz', rate: '-8%' },
  },
  telefon: {
    name: 'Hlas v telefonu',
    pitch: 330,
    voice: { voice: 'cs-CZ-VlastaNeural', pitch: '+0Hz', rate: '+0%', effect: 'phone' },
  },
  vypravec: {
    name: '',
    pitch: 0,
    voice: { voice: 'cs-CZ-VlastaNeural', pitch: '-4Hz', rate: '-10%' },
  },
};

export interface Choice {
  label: string;
  next: string;
}

export interface Node {
  bg: BgId;
  speaker: SpeakerId;
  text: string;
  /** text k namluvení, pokud se liší od zobrazeného */
  say?: string;
  sfx?: 'ring' | 'sad' | 'chime';
  next?: string;
  choices?: Choice[];
  ending?: 'bad' | 'demo';
}

export const story: Record<string, Node> = {
  start: {
    bg: 'office',
    speaker: 'vypravec',
    text: 'Okresní služebna, rok 1999. Za oknem prší, na stole stojí drátový telefon a v koutě dosychá kytka, kterou nikdo nezalil od revoluce.',
    next: 'n1',
  },
  n1: {
    bg: 'office',
    speaker: 'nacelnik',
    text: 'Patriku, sedněte si. Omlouvám se, ale nemám z čeho platit policajty.',
    next: 'n1b',
  },
  n1b: {
    bg: 'office',
    speaker: 'karel',
    text: 'Šéfe, já myslel, že mi konečně přidáte.',
    next: 'n2',
  },
  n2: {
    bg: 'office',
    speaker: 'nacelnik',
    text: 'Přidám vám, až nám přibude rozpočet. A abych byl upřímný, vy děláte doslova úplný nic.',
    next: 'n2b',
  },
  n2b: {
    bg: 'office',
    speaker: 'karel',
    text: 'To není pravda. Minulý týden jsem posunul tu kytku blíž k oknu.',
    next: 'n2c',
  },
  n2c: {
    bg: 'office',
    speaker: 'nacelnik',
    text: 'Ta kytka je mrtvá, Patriku. Už od úterý.',
    next: 'n3',
  },
  n3: {
    bg: 'office',
    speaker: 'vypravec',
    text: 'RIIIIING! Drátový telefon se rozcinká tak hlasitě, že se z lustru snese prach.',
    say: 'Drátový telefon se rozcinká tak hlasitě, že se z lustru snese prach.',
    sfx: 'ring',
    next: 'n4',
  },
  n4: {
    bg: 'office',
    speaker: 'nacelnik',
    text: 'Haló? … Cože? … Ano. … Hm.',
    next: 'n5',
  },
  n5: {
    bg: 'office',
    speaker: 'telefon',
    text: 'Pane náčelníku, v Brdýmově někdo ukradl obří železný rohlík! Říká se, že je v něm zlato a diamanty!',
    next: 'n6',
  },
  n6: {
    bg: 'office',
    speaker: 'nacelnik',
    text: 'Mhm… no… jo… (zamumlá cosi a položí sluchátko)',
    say: 'Mhm… no… jo…',
    next: 'n7',
  },
  n7: {
    bg: 'office',
    speaker: 'nacelnik',
    text: 'Tak. Další policajty nemám. A tohle je vaše poslední šance, Patriku.',
    next: 'n8',
  },
  n8: {
    bg: 'office',
    speaker: 'nacelnik',
    text: 'Tak co? Pojedete tam?',
    choices: [
      { label: 'Asi ne, díky.', next: 'bad1' },
      { label: 'No… stejně nemám na výběr.', next: 'good1' },
    ],
  },

  // Špatný konec
  bad1: {
    bg: 'office',
    speaker: 'nacelnik',
    text: 'Dobře. Tak mi zbývá jediné. Máte padáka.',
    sfx: 'sad',
    next: 'bad2',
  },
  bad2: {
    bg: 'trash',
    speaker: 'vypravec',
    text: 'Skončil jsi v koši. Ale s pohovkou, televizí a kýblem sody. Žiješ si tam super život až do konce. Brdýmov se nikdy nedozví, co se stalo s rohlíkem. A náčelník taky ne, protože do koše nechodí pošta.',
    ending: 'bad',
  },

  // Správná cesta
  good1: {
    bg: 'office',
    speaker: 'nacelnik',
    text: 'To jsem rád. Auto je před služebnou. Nezapomeňte natankovat. Nebo ne, na to taky nemám.',
    next: 'good1b',
  },
  good1b: {
    bg: 'office',
    speaker: 'karel',
    text: 'A kolik v něm je benzínu?',
    next: 'good1c',
  },
  good1c: {
    bg: 'office',
    speaker: 'nacelnik',
    text: 'Tak na půl cesty. Tam, nebo zpátky, to si vyberte sám.',
    next: 'good2',
  },
  good2: {
    bg: 'car',
    speaker: 'vypravec',
    text: 'Jedeš tři hodiny služebním autem. Smrdí v něm uzeninou, protože si tam minulý týden někdo zapomněl řízky. Za okny se střídají louky, pole a billboardy na pivo.',
    next: 'good2b',
  },
  good2b: {
    bg: 'car',
    speaker: 'karel',
    text: 'Jestli ještě jednou ucítím tu uzeninu, vystoupím za jízdy.',
    next: 'good2c',
  },
  good2c: {
    bg: 'car',
    speaker: 'vypravec',
    text: 'Rádio hraje už dvě hodiny tu samou polku. Patrik pomalu přestává rozlišovat, jestli ji slyší, nebo si ji jen pamatuje.',
    next: 'good3',
  },
  good3: {
    bg: 'square',
    speaker: 'vypravec',
    text: 'Brdýmov. Na náměstí stojí prázdný betonový podstavec a okolo něj se tlačí zvědavci. Mezi nimi stařenka, která tvrdí, že všechno viděla, ale neví co.',
    sfx: 'chime',
    next: 'good4',
  },
  good4: {
    bg: 'square',
    speaker: 'karel',
    text: 'No nazdar. Teď se uvidí, jestli jsem tak k ničemu, jak říkal šéf.',
    next: 'good5',
  },
  good5: {
    bg: 'square',
    speaker: 'vypravec',
    text: 'A tak začíná případ, na který Brdýmov nezapomene. Hlavně kvůli rohlíku.',
    ending: 'demo',
  },
};
