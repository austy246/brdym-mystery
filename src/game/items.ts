import type { ItemDef } from '../types';

export const items: Record<string, ItemDef> = {
  prukaz: {
    id: 'prukaz',
    name: 'Služební průkaz',
    desc: 'Platný do roku 1996. Na fotce vypadám, jako by mě zatýkali.',
  },
  rizek: {
    id: 'rizek',
    name: 'Zapomenutý řízek',
    desc: 'Řízek z auta. Je starší než moje služební poměr. Smrdí, ale loajálně.',
  },
  koruna: {
    id: 'koruna',
    name: 'Dvacetikoruna',
    desc: 'Moje poslední peníze. Dvacet korun nejsou peníze, to je nálada.',
  },
  utrzek: {
    id: 'utrzek',
    name: 'Útržek z podstavce',
    desc: 'Zmačkaný lístek: „Kovošrot Brdýmov, odvoz v 5:00, podpis: P.“',
  },
  kava: {
    id: 'kava',
    name: 'Černá káva',
    desc: 'Hustá jako politika. Postaví na nohy i mrtvého, a to i bez cukru.',
  },
  odpoved: {
    id: 'odpoved',
    name: 'Dopis od starosty',
    desc: '„Rohlík není na prodej. Již prodán. S pozdravem P.“ Tedy: nejdřív ne, a pak už jo.',
  },
  klic: {
    id: 'klic',
    name: 'Klíč od zbrojnice',
    desc: 'Starý klíč s visačkou „HASIČI – NEPŮJČOVAT“. Dostal jsem ho, takže asi nepůjčený.',
  },
  dopis: {
    id: 'dopis',
    name: 'Pekařův dopis',
    desc: 'Požloutlý dopis z roku 1957. Někdo ho psal pečlivě a někdo to zakopal do železa.',
  },
};

/** Jednoduché ikony předmětů (36 x 36). */
export function itemIcon(id: string): string {
  const o = 'stroke="#3b2214" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"';
  const wrap = (s: string): string => `<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">${s}</svg>`;
  switch (id) {
    case 'prukaz':
      return wrap(
        `<rect x="4" y="8" width="28" height="20" rx="3" fill="#3a6ea8" ${o}/><rect x="7" y="11" width="9" height="11" fill="#f0b488" ${o}/><path d="M19 13h10M19 18h10M19 23h6" stroke="#fff" stroke-width="2"/>`,
      );
    case 'rizek':
      return wrap(
        `<path d="M6 20Q4 10 14 8Q26 4 31 14Q34 24 24 28Q12 32 6 20z" fill="#d99a4a" ${o}/><path d="M10 18Q12 12 18 12M20 24Q26 22 27 17" stroke="#b9722a" stroke-width="2" fill="none"/><path d="M14 4q-2 3 0 5M20 3q-2 3 0 5" stroke="#6a8a3a" stroke-width="2" fill="none"/>`,
      );
    case 'koruna':
      return wrap(
        `<circle cx="18" cy="18" r="12" fill="#d9b13b" ${o}/><circle cx="18" cy="18" r="8" fill="none" stroke="#a8841c" stroke-width="1.6"/><text x="18" y="23" text-anchor="middle" font-family="Georgia,serif" font-size="13" font-weight="bold" fill="#7a5a10">20</text>`,
      );
    case 'utrzek':
      return wrap(
        `<path d="M6 8L28 5L31 14L27 20L31 28L9 31L5 22L9 16z" fill="#f4eed8" ${o}/><path d="M10 12h14M10 17h16M11 22h12" stroke="#777" stroke-width="1.6"/>`,
      );
    case 'kava':
      return wrap(
        `<path d="M8 12h18v10q0 8 -9 8t-9 -8z" fill="#f2f2f2" ${o}/><path d="M26 15q8 0 6 6t-6 4" fill="none" ${o}/><path d="M9 14h16v4q-8 4 -16 0z" fill="#4a2a14"/><path d="M13 8q-2 -3 1 -5M19 8q-2 -3 1 -5" stroke="#bbb" stroke-width="2" fill="none"/>`,
      );
    case 'odpoved':
      return wrap(
        `<rect x="4" y="8" width="28" height="20" rx="2" fill="#f4eed8" ${o}/><path d="M4 9l14 11l14 -11" fill="none" ${o}/><circle cx="26" cy="22" r="4" fill="#b8262e" ${o}/>`,
      );
    case 'klic':
      return wrap(
        `<circle cx="11" cy="14" r="7" fill="#d9b13b" ${o}/><circle cx="11" cy="14" r="2.5" fill="#3b2214"/><path d="M17 18L31 30M25 26l4 -4M28 29l3 -3" stroke="#3b2214" stroke-width="3" stroke-linecap="round"/><path d="M17 18L31 30" stroke="#d9b13b" stroke-width="1.6" stroke-linecap="round"/>`,
      );
    case 'dopis':
      return wrap(
        `<path d="M7 4h22v28H7z" fill="#f1e2b4" ${o}/><path d="M11 10h14M11 15h14M11 20h14M11 25h9" stroke="#8a6a2a" stroke-width="1.6"/><circle cx="26" cy="27" r="3.4" fill="#b8262e" ${o}/>`,
      );
    default:
      return wrap(`<circle cx="18" cy="18" r="12" fill="#ccc" ${o}/>`);
  }
}
