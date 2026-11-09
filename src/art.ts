/**
 * Kreslené scény ve stylu adventur z konce 90. let: sytá teplá paleta, měkké
 * stínování místo tlustých obrysů, místnosti v perspektivě, hubení postavy
 * s velkými nosy a očima. Každá scéna má rozměr 640 x 360.
 */

export const OL = 'stroke="#3b2214" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"';
export const ol = 'stroke="#3b2214" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round"';

let uid = 0;
export const nid = (p: string): string => `${p}${++uid}`;

export const wrap = (inner: string): string =>
  `<svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

export const rep = (n: number, f: (i: number) => string): string =>
  Array.from({ length: n }, (_, i) => f(i)).join('');

/** Ztmaví (k < 1) nebo zesvětlí (k > 1) barvu #rrggbb. */
export function shade(hex: string, k: number): string {
  const n = parseInt(hex.slice(1), 16);
  const c = (v: number): number => Math.max(0, Math.min(255, Math.round(v * k)));
  const r = c((n >> 16) & 255);
  const g = c((n >> 8) & 255);
  const b = c(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

/** Lineární přechod z barvy do tmavší/světlejší varianty. */
export function grad(idv: string, base: string, vertical = true, light = 1.18, dark = 0.74): string {
  return `<linearGradient id="${idv}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}"><stop offset="0" stop-color="${shade(base, light)}"/><stop offset="1" stop-color="${shade(base, dark)}"/></linearGradient>`;
}

/* ------------------------------------------------------------------ */
/*  POSTAVA: hubená, velký nos, kulaté oči                             */
/* ------------------------------------------------------------------ */

export type HairStyle = 'short' | 'messy' | 'bald' | 'combover' | 'bun' | 'long';
export type HatKind = 'fedora' | 'cap' | 'beret' | 'straw' | 'scarf' | 'none';

export interface PersonOpts {
  x: number; // střed
  y: number; // chodidla
  s?: number;
  flip?: boolean;
  skin?: string;
  hair?: string;
  hairStyle?: HairStyle;
  coat?: string;
  pants?: string;
  hat?: HatKind;
  hatColor?: string;
  hatTilt?: number;
  mustache?: boolean;
  beard?: boolean;
  stubble?: boolean;
  glasses?: boolean;
  belly?: number;
  tie?: string;
  nose?: number; // velikost nosu
  head?: number; // velikost hlavy (děti mají větší)
  dress?: boolean;
  apron?: string;
  brows?: 'normal' | 'sad' | 'angry';
  mouth?: 'smile' | 'flat' | 'open' | 'frown';
  tired?: boolean;
  medals?: boolean;
  redNose?: boolean;
  collarUp?: boolean;
}

export function person(o: PersonOpts): string {
  const s = o.s ?? 1;
  const skin = o.skin ?? '#f1b88c';
  const hair = o.hair ?? '#7a4a22';
  const hairStyle = o.hairStyle ?? 'short';
  const coat = o.coat ?? '#8a7650';
  const pants = o.pants ?? '#4a4a5a';
  const hat = o.hat ?? 'none';
  const hatC = o.hatColor ?? '#55482c';
  const belly = o.belly ?? 0;
  const nose = o.nose ?? 1;
  const head = o.head ?? 1;
  const gid = nid('pg');
  const hid = nid('ph');
  const skinD = shade(skin, 0.84);
  const skinL = shade(skin, 1.1);
  const coatD = shade(coat, 0.7);
  const hairD = shade(hair, 0.6);
  const bw = 34 + belly; // přední hrana kabátu
  const bl = 36 + belly * 0.25; // zadní hrana
  const hemY = o.dress ? -46 : -56;
  const hasHat = hat !== 'none';

  /* --- vlasy --- */
  const hairBack = hairStyle === 'long'
    ? `<path d="M-22 -178Q-36 -150 -30 -116L-10 -120Q-18 -148 -15 -170z" fill="${hair}" ${OL}/>`
    : '';
  const sideTufts = `<path d="M-19 -176Q-23 -170 -20 -162L-16 -165Q-17 -170 -16 -175z" fill="${hair}" ${ol}/>`;
  let hairFront = '';
  if (hat === 'none' || hat === 'beret') {
    switch (hairStyle) {
      case 'messy':
        hairFront = `<path d="M-21 -172L-28 -185L-17 -184L-19 -197L-8 -192L-6 -205L2 -197L8 -207L12 -197L22 -203L20 -190L29 -186L22 -178Q10 -190 -6 -186Q-14 -184 -21 -172z" fill="${hair}" ${OL}/>`;
        break;
      case 'bald':
        hairFront = `${sideTufts}<ellipse cx="-3" cy="-189" rx="7" ry="3" fill="#fff" opacity=".35"/>`;
        break;
      case 'combover':
        hairFront = `${sideTufts}<path d="M-13 -191Q2 -202 18 -190M-12 -186Q2 -196 17 -184M-11 -181Q2 -190 15 -178" stroke="${hair}" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="-4" cy="-193" rx="6" ry="2.5" fill="#fff" opacity=".3"/>`;
        break;
      case 'bun':
        hairFront = `<circle cx="-14" cy="-199" r="9" fill="${hair}" ${OL}/><path d="M-20 -176Q-22 -200 2 -199Q26 -200 22 -178Q10 -190 -6 -186Q-14 -184 -20 -176z" fill="${hair}" ${OL}/>`;
        break;
      default:
        hairFront = `<path d="M-20 -176Q-22 -200 2 -199Q26 -200 22 -178Q10 -190 -6 -186Q-14 -184 -20 -176z" fill="${hair}" ${OL}/>`;
    }
  } else if (hat !== 'scarf') {
    hairFront = hairStyle === 'bald' || hairStyle === 'combover' ? sideTufts : `${sideTufts}`;
  }

  /* --- klobouky --- */
  const tilt = o.hatTilt ?? 0;
  let hatSvg = '';
  if (hat === 'fedora') {
    hatSvg = `<g transform="rotate(${tilt} 2 -186)"><ellipse cx="2" cy="-186" rx="33" ry="7.5" fill="${shade(hatC, 0.82)}" ${OL}/>
      <path d="M-19 -188Q-20 -216 2 -216Q24 -216 23 -188z" fill="url(#${hid})" ${OL}/>
      <path d="M-18 -204Q2 -198 22 -204" stroke="${shade(hatC, 0.6)}" stroke-width="1.6" fill="none"/>
      <path d="M-19.5 -190H23.5V-184H-19.5z" fill="${shade(hatC, 0.55)}" ${ol}/></g>`;
  } else if (hat === 'cap') {
    hatSvg = `<g transform="rotate(${tilt} 2 -186)"><path d="M-21 -190Q-22 -214 2 -214Q26 -214 25 -190z" fill="url(#${hid})" ${OL}/>
      <path d="M-22 -190H26V-184H-22z" fill="${shade(hatC, 0.6)}" ${ol}/>
      <path d="M12 -186q26 -2 32 4q-15 5 -32 2z" fill="${shade(hatC, 0.5)}" ${ol}/>
      <circle cx="12" cy="-199" r="4" fill="#e8c14a" ${ol}/></g>`;
  } else if (hat === 'beret') {
    hatSvg = `<ellipse cx="-1" cy="-193" rx="28" ry="10" fill="url(#${hid})" ${OL} transform="rotate(-9 -1 -193)"/><rect x="-5" y="-206" width="4" height="7" rx="2" fill="${shade(hatC, 0.6)}" ${ol}/>`;
  } else if (hat === 'straw') {
    hatSvg = `<ellipse cx="2" cy="-188" rx="44" ry="9" fill="${shade(hatC, 1.1)}" ${OL}/>
      <path d="M-18 -190Q-18 -214 2 -214Q22 -214 22 -190z" fill="url(#${hid})" ${OL}/>
      <path d="M-18 -194H22V-189H-18z" fill="#b8302b" ${ol}/>
      <path d="M-40 -188q-4 4 -2 6M44 -188q4 4 2 6" stroke="#3b2214" stroke-width="1.2" fill="none"/>`;
  } else if (hat === 'scarf') {
    hatSvg = `<path d="M-23 -166Q-26 -206 2 -205Q30 -206 25 -166Q22 -186 2 -187Q-18 -186 -23 -166z" fill="url(#${hid})" ${OL}/>
      <path d="M-14 -155L-6 -138L0 -152z" fill="${hatC}" ${OL}/><path d="M-18 -190q6 -8 14 -10" stroke="${shade(hatC, 1.4)}" stroke-width="2" fill="none"/>`;
  }

  /* --- obličej --- */
  const browsKind = o.brows ?? 'normal';
  const brows =
    browsKind === 'sad'
      ? 'M-3 -181Q4 -184 12 -188M14 -188Q20 -184 25 -181'
      : browsKind === 'angry'
        ? 'M-3 -188Q4 -186 12 -181M14 -181Q20 -186 25 -188'
        : 'M-3 -184Q4 -189 12 -184M14 -183Q20 -187 25 -183';
  const mouthKind = o.mouth ?? 'smile';
  const mouth =
    mouthKind === 'flat'
      ? `<path d="M10 -146H26" stroke="#8a3a2a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
      : mouthKind === 'open'
        ? `<ellipse cx="18" cy="-146" rx="5.5" ry="4.5" fill="#7a2a22" ${ol}/><path d="M13 -148.5h10" stroke="#fff" stroke-width="2"/>`
        : mouthKind === 'frown'
          ? `<path d="M10 -143Q18 -150 26 -143" stroke="#8a3a2a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`
          : `<path d="M10 -148Q18 -141 26 -148" stroke="#8a3a2a" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  const bags = o.tired
    ? `<path d="M-1 -164Q5 -161 11 -164M13 -164Q19 -161 25 -164" stroke="${shade(skin, 0.55)}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
       <path d="M-1.5 -176.5Q5 -181 11.5 -176.5L11.5 -174Q5 -178 -1.5 -174z" fill="${shade(skin, 0.9)}" opacity=".9"/>`
    : '';
  const stubble = o.stubble
    ? `<path d="M-15 -160Q2 -138 21 -154Q23 -148 12 -142Q0 -137 -12 -146z" fill="#4a3a2a" opacity=".38"/>
       ${rep(14, (i) => `<circle cx="${-10 + (i % 7) * 4.2}" cy="${-150 + Math.floor(i / 7) * 5 + (i % 3)}" r=".8" fill="#2a1a10" opacity=".6"/>`)}`
    : '';
  const beard = o.beard
    ? `<path d="M-19 -164Q-18 -134 4 -130Q26 -134 22 -158Q16 -146 4 -145Q-10 -146 -19 -164z" fill="${hair}" ${OL}/>`
    : '';
  const glasses = o.glasses
    ? `<circle cx="5" cy="-173" r="9.4" fill="#cfe8f0" opacity=".25" stroke="#2a2a2a" stroke-width="1.8"/><circle cx="19.4" cy="-173" r="8.6" fill="#cfe8f0" opacity=".25" stroke="#2a2a2a" stroke-width="1.8"/><path d="M14.4 -173H10.8M-4.4 -174L-17 -171" stroke="#2a2a2a" stroke-width="1.6"/>`
    : '';
  const mus = o.mustache
    ? `<path d="M7 -153Q21 -163 38 -153Q36 -147 22 -151Q10 -146 7 -153z" fill="${hairD}" ${ol}/>`
    : '';
  const noseCol = o.redNose ? '#e8806a' : skinL;
  const collar = o.collarUp
    ? `<path d="M-20 -146L-10 -158L-3 -146zM20 -146L12 -158L4 -146z" fill="${shade(coat, 1.05)}" ${OL}/>`
    : '';
  const medals = o.medals
    ? `${rep(3, (i) => `<circle cx="${6 + i * 9}" cy="${-120 + (i % 2) * 2}" r="3.8" fill="${['#e8c14a', '#c23b3b', '#e8c14a'][i]}" ${ol}/>`)}<path d="M-26 -140L-10 -140" stroke="#e8c14a" stroke-width="5" stroke-linecap="round"/>`
    : '';

  /* --- tělo: kabát nebo šaty --- */
  const legs = o.dress
    ? `<path d="M-12 -52L-11 -9H-3L-3 -52z" fill="${skin}" ${OL}/><path d="M5 -52L5 -9H13L12 -52z" fill="${skinD}" ${OL}/>
       <path d="M-12 -22H-3M5 -22H13" stroke="#e8e8e8" stroke-width="5"/>`
    : `<path d="M-17 -64L-16 -9H-3L-2 -64z" fill="${pants}" ${OL}/>
       <path d="M3 -64L4 -9H18L17 -64z" fill="${shade(pants, 0.85)}" ${OL}/>`;
  const apron = o.apron
    ? `<path d="M-12 -118L-17 -50H${bw - 6}L${bw - 12} -118z" fill="${o.apron}" ${OL}/><path d="M-12 -118L${bw - 12} -118" stroke="${shade(o.apron, 0.7)}" stroke-width="2"/>`
    : '';
  const shirtTie = o.dress
    ? `<path d="M-9 -146Q0 -136 9 -146" stroke="${shade(coat, 0.6)}" stroke-width="2" fill="none"/>`
    : `<path d="M-8 -146L0 -126L8 -146z" fill="#f4f2ea" ${ol}/>${
        o.tie ? `<path d="M-2 -138H3L5 -104L0 -98L-5 -104z" fill="${o.tie}" ${ol}/>` : ''
      }`;

  return `
<g transform="translate(${o.x} ${o.y}) scale(${o.flip ? -s : s} ${s})">
  <defs>
    ${grad(gid, coat, false, 1.2, 0.7)}
    ${grad(hid, hatC, true, 1.25, 0.75)}
  </defs>
  <ellipse cx="0" cy="1" rx="${38 + belly * 0.6}" ry="6" fill="#000" opacity=".22"/>
  ${legs}
  <path d="M-20 -9H-2Q0 -1 -3 0H-22Q-25 -2 -20 -9z" fill="#3a2314" ${OL}/>
  <path d="M2 -9H20Q23 -1 19 0H0Q-1 -2 2 -9z" fill="#2c1a0e" ${OL}/>
  <path d="M-29 -140Q-44 -112 -39 -82L-30 -82Q-31 -108 -22 -130z" fill="${coatD}" ${OL}/>
  <circle cx="-35" cy="-77" r="6" fill="${skinD}" ${ol}/>
  <path d="M-20 -146Q${-(bl - 1)} -142 ${-(bl - 1)} -118L${-(bl + 2)} ${hemY}H${bw}L${bw - 2} -118Q${bw - 2} -142 20 -146z" fill="url(#${gid})" ${OL}/>
  <path d="M0 -146V${hemY}" stroke="${coatD}" stroke-width="1.6"/>
  ${shirtTie}
  ${collar}
  ${o.dress ? '' : `<circle cx="-5" cy="-100" r="2" fill="${coatD}"/><circle cx="-5" cy="-84" r="2" fill="${coatD}"/>`}
  ${medals}
  ${apron}
  <path d="M26 -140Q41 -114 38 -86L29 -85Q30 -108 21 -130z" fill="${shade(coat, 0.95)}" ${OL}/>
  <circle cx="34" cy="-80" r="6" fill="${skin}" ${ol}/>
  <rect x="-5" y="-150" width="12" height="10" fill="${skinD}"/>
  <g transform="translate(0 -146) scale(${head}) translate(0 146)">
    ${hairBack}
    <ellipse cx="-17" cy="-167" rx="5" ry="7" fill="${skinD}" ${ol}/>
    <ellipse cx="2" cy="-168" rx="21" ry="24" fill="${skin}" ${OL}/>
    <path d="M-12 -150Q2 -142 18 -150Q8 -138 -4 -142z" fill="${skinD}" opacity=".5"/>
    ${stubble}
    ${beard}
    <path d="M18 -170Q${18 + 18 * nose} -168 ${17 + 16 * nose} -157Q${12 + 10 * nose} -152 17 -156z" fill="${noseCol}" ${OL}/>
    <circle cx="${27 + 4 * nose}" cy="-157" r="1.6" fill="#7a3a2a"/>
    <ellipse cx="5" cy="-173" rx="6.8" ry="8" fill="#fff" ${ol}/>
    <ellipse cx="19" cy="-173" rx="5.6" ry="7.6" fill="#fff" ${ol}/>
    <circle cx="7.6" cy="-172" r="3.4" fill="#4a6a8a"/><circle cx="7.8" cy="-172" r="1.6" fill="#111"/>
    <circle cx="20.6" cy="-172" r="3" fill="#4a6a8a"/><circle cx="20.8" cy="-172" r="1.4" fill="#111"/>
    ${bags}
    ${glasses}
    <path d="${brows}" stroke="${hairD}" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${mouth}
    ${mus}
    ${hairFront}
    ${hatSvg}
  </g>
</g>`;
}

/* ------------------------------------------------------------------ */
/*  KOBEREC V PERSPEKTIVĚ                                              */
/* ------------------------------------------------------------------ */

export function carpet(x0: number, x1: number, y0: number, y1: number, fill: string): string {
  let out = '';
  const rows = 11;
  for (let r = 0; r < rows; r++) {
    const t = r / (rows - 1);
    const y = y0 + (y1 - y0) * Math.pow(t, 1.45);
    const size = 9 + 26 * t;
    const step = size * 2.2;
    const off = (r % 2) * (step / 2);
    for (let x = x0 - step + off; x < x1 + step; x += step) {
      out += `<path d="M${x.toFixed(1)} ${y.toFixed(1)}l${(size / 2).toFixed(1)} ${(size * 0.28).toFixed(1)} ${(-size / 2).toFixed(1)} ${(size * 0.28).toFixed(1)} ${(-size / 2).toFixed(1)} ${(-size * 0.28).toFixed(1)}z" fill="${fill}" opacity=".55"/>`;
    }
  }
  return out;
}

/** Patrik: ušmudlaný detektiv na pokraji vyhazovu – strniště, kruhy pod očima, pomačkaný kabát. */
export const patrik = (x: number, y: number, s: number, extra: Partial<PersonOpts> = {}): string =>
  person({
    x,
    y,
    s,
    coat: '#a89260',
    pants: '#5a4f45',
    hat: 'fedora',
    hatColor: '#6a5a3a',
    hatTilt: -7,
    hair: '#5a3a1a',
    hairStyle: 'messy',
    skin: '#f0b488',
    nose: 1.25,
    tie: '#2f5f9a',
    stubble: true,
    tired: true,
    brows: 'sad',
    mouth: 'flat',
    collarUp: true,
    ...extra,
  });

export const noise = (idv: string): string =>
  `<pattern id="${idv}" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="1.5" height="1.5" fill="#fff" opacity=".07"/><rect x="1.5" y="1.5" width="1.5" height="1.5" fill="#000" opacity=".05"/></pattern>`;

