/**
 * Scény ve stylu předrenderované 3D grafiky Poldy 1 (1998): sytá paleta,
 * hladké stínování bez obrysů, místnosti v širokoúhlé perspektivě, šachovnicové
 * podlahy, hubení shrbení lidé s obřími nosy. Každá scéna má rozměr 640 x 360;
 * výsledný „pixelový“ vzhled (256 barev, rozptyl, zrno) dělá render.ts.
 */

export const OL = 'stroke="#1c0c30" stroke-opacity=".34" stroke-width="1.1" stroke-linejoin="round" stroke-linecap="round"';
export const ol = 'stroke="#1c0c30" stroke-opacity=".24" stroke-width=".8" stroke-linejoin="round" stroke-linecap="round"';

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
export type HatKind = 'fedora' | 'police' | 'cap' | 'beret' | 'straw' | 'scarf' | 'none';

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
  eyes?: string;
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
  const nose = (o.nose ?? 1) * 1.3;
  const head = (o.head ?? 1) * 0.9;
  const gid = nid('pg');
  const hid = nid('ph');
  const skg = nid('sk');
  const pg = nid('pt');
  const nsg = nid('ns');
  const skinD = shade(skin, 0.84);
  const skinL = shade(skin, 1.1);
  const noseCol = o.redNose ? '#e8806a' : skinL;
  const coatD = shade(coat, 0.7);
  const hairD = shade(hair, 0.6);
  const bw = 34 + belly; // přední hrana kabátu
  const bl = 36 + belly * 0.25; // zadní hrana
  const hemY = o.dress ? -46 : -56;
  const hasHat = hat !== 'none';
  const eyeC = o.eyes ?? '#3a5a7a';

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
  } else if (hat === 'police') {
    hatSvg = `<g transform="rotate(${tilt} 2 -186)"><path d="M-24 -190Q-28 -214 2 -218Q32 -214 28 -190z" fill="url(#${hid})" ${OL}/>
      <path d="M-25 -197Q2 -191 29 -197L29 -189Q2 -183 -25 -189z" fill="${shade(hatC, 0.5)}" ${ol}/>
      <path d="M12 -189q30 -1 36 6q-20 6 -38 2z" fill="#14141a" ${OL}/>
      <path d="M-22 -207Q2 -213 26 -207" stroke="${shade(hatC, 1.5)}" stroke-width="2" fill="none" opacity=".6"/>
      <circle cx="3" cy="-199" r="5" fill="#e8c14a" ${ol}/><circle cx="3" cy="-199" r="2" fill="#c23b3b"/></g>`;
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
  const collar = o.collarUp
    ? `<path d="M-20 -146L-10 -158L-3 -146zM20 -146L12 -158L4 -146z" fill="${shade(coat, 1.05)}" ${OL}/>`
    : '';
  const medals = o.medals
    ? `${rep(3, (i) => `<circle cx="${6 + i * 9}" cy="${-120 + (i % 2) * 2}" r="3.8" fill="${['#e8c14a', '#c23b3b', '#e8c14a'][i]}" ${ol}/>`)}<path d="M-26 -140L-10 -140" stroke="#e8c14a" stroke-width="5" stroke-linecap="round"/>`
    : '';

  /* --- tělo: kabát nebo šaty --- */
  const legs = o.dress
    ? `<path d="M-12 -52L-11 -9H-3L-3 -52z" fill="url(#${skg})" ${OL}/><path d="M5 -52L5 -9H13L12 -52z" fill="url(#${skg})" ${OL}/>
       <path d="M-12 -22H-3M5 -22H13" stroke="#e8e8e8" stroke-width="5"/>`
    : `<path d="M-17 -64L-16 -9H-3L-2 -64z" fill="url(#${pg})" ${OL}/>
       <path d="M3 -64L4 -9H18L17 -64z" fill="url(#${pg})" ${OL}/>
       <path d="M-16 -40Q-9 -36 -3 -40M4 -40Q11 -36 17 -40" stroke="${shade(pants, 0.55)}" stroke-width="1.4" fill="none" opacity=".6"/>`;
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
    ${grad(gid, coat, false, 1.25, 0.62)}
    ${grad(hid, hatC, true, 1.25, 0.75)}
    ${grad(pg, pants, false, 1.2, 0.6)}
    <radialGradient id="${skg}" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="${shade(skin, 1.16)}"/><stop offset=".55" stop-color="${skin}"/><stop offset="1" stop-color="${shade(skin, 0.7)}"/></radialGradient>
    <radialGradient id="${nsg}" cx=".3" cy=".3" r=".9"><stop offset="0" stop-color="${shade(noseCol, 1.18)}"/><stop offset="1" stop-color="${shade(noseCol, 0.78)}"/></radialGradient>
  </defs>
  <ellipse cx="0" cy="1" rx="${38 + belly * 0.6}" ry="6" fill="#000" opacity=".22"/>
  ${legs}
  <path d="M-20 -9H-2Q0 -1 -3 0H-22Q-25 -2 -20 -9z" fill="#2a1a22" ${OL}/><path d="M-19 -7H-8" stroke="#fff" stroke-opacity=".45" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M2 -9H20Q23 -1 19 0H0Q-1 -2 2 -9z" fill="#1e1218" ${OL}/><path d="M4 -7H14" stroke="#fff" stroke-opacity=".4" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M-29 -140Q-44 -112 -39 -82L-30 -82Q-31 -108 -22 -130z" fill="${coatD}" ${OL}/>
  <circle cx="-35" cy="-77" r="6" fill="url(#${skg})" ${ol}/>
  <path d="M-20 -146Q${-(bl - 1)} -142 ${-(bl - 1)} -118L${-(bl + 2)} ${hemY}H${bw}L${bw - 2} -118Q${bw - 2} -142 20 -146z" fill="url(#${gid})" ${OL}/>
  <path d="M0 -146V${hemY}" stroke="${coatD}" stroke-width="1.6"/>
  ${shirtTie}
  ${collar}
  ${o.dress ? '' : `<circle cx="-5" cy="-100" r="2" fill="${coatD}"/><circle cx="-5" cy="-84" r="2" fill="${coatD}"/>`}
  ${medals}
  ${apron}
  <path d="M26 -140Q41 -114 38 -86L29 -85Q30 -108 21 -130z" fill="url(#${gid})" ${OL}/>
  <circle cx="34" cy="-80" r="6" fill="url(#${skg})" ${ol}/>
  <rect x="-3" y="-152" width="8" height="12" fill="${skinD}"/>
  <g transform="translate(0 -146) scale(${head}) translate(0 146)">
    ${hairBack}
    <ellipse cx="-17" cy="-167" rx="5" ry="7" fill="${skinD}" ${ol}/>
    <ellipse cx="2" cy="-168" rx="21" ry="24" fill="url(#${skg})" ${OL}/>
    <path d="M-12 -150Q2 -142 18 -150Q8 -138 -4 -142z" fill="${skinD}" opacity=".5"/>
    ${stubble}
    ${beard}
    <path d="M18 -170Q${18 + 18 * nose} -168 ${17 + 16 * nose} -157Q${12 + 10 * nose} -152 17 -156z" fill="url(#${nsg})" ${OL}/>
    <circle cx="${27 + 4 * nose}" cy="-157" r="1.6" fill="#7a3a2a"/>
    <ellipse cx="5" cy="-173" rx="6.8" ry="8" fill="#fff" ${ol}/>
    <ellipse cx="19" cy="-173" rx="5.6" ry="7.6" fill="#fff" ${ol}/>
    <circle cx="8.2" cy="-171" r="3.2" fill="${eyeC}"/><circle cx="8.4" cy="-171" r="1.5" fill="#111"/>
    <circle cx="21.2" cy="-171" r="2.8" fill="${eyeC}"/><circle cx="21.4" cy="-171" r="1.3" fill="#111"/>
    <path d="M-1.8 -173.5Q5 -182 11.8 -173.5z" fill="${skinD}"/><path d="M13.4 -173.5Q19.5 -181.6 25.6 -173.5z" fill="${skinD}"/>
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

/**
 * Patrik podle vzoru Pankráce z Poldy 1: hubený shrbený strážník z profilu,
 * tmavě šedá košile s krátkým rukávem, černé kalhoty a boty, ruce za zády,
 * kulatá čepice s dlouhým štítkem a obří nos. Hnědé vlasy i oči, žádný kabát.
 */
export function pankrac(x: number, y: number, s = 1, flip = false): string {
  const g = nid('pk');
  const pt = nid('pp');
  const sk = nid('ps');
  const cp = nid('pc');
  const skin = '#f0a070';
  const hair = '#6a3a18';
  return `
<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
  <defs>
    ${grad(g, '#5a5a64', false, 1.3, 0.55)}
    ${grad(pt, '#363640', false, 1.35, 0.5)}
    ${grad(cp, '#50505a', true, 1.3, 0.6)}
    <radialGradient id="${sk}" cx=".35" cy=".3" r=".95"><stop offset="0" stop-color="${shade(skin, 1.18)}"/><stop offset=".55" stop-color="${skin}"/><stop offset="1" stop-color="${shade(skin, 0.66)}"/></radialGradient>
  </defs>
  <ellipse cx="8" cy="1" rx="42" ry="6" fill="#000" opacity=".24"/>
  <!-- zadní noha a bota -->
  <path d="M-14 -90L4 -90L2 -48L-2 -11L-17 -11L-12 -48z" fill="url(#${pt})" ${OL}/>
  <path d="M-21 -12H-5Q6 -12 9 -4Q9 0 5 0H-25Q-29 -5 -21 -12z" fill="#17171c" ${OL}/><path d="M-19 -9H-8" stroke="#fff" stroke-opacity=".35" stroke-width="1.6" stroke-linecap="round"/>
  <!-- přední noha a bota -->
  <path d="M-4 -90L16 -90L24 -48L24 -11L9 -11L6 -48z" fill="url(#${pt})" ${OL}/>
  <path d="M6 -12H25Q38 -10 42 -3Q42 0 38 0H3Q-1 -5 6 -12z" fill="#101014" ${OL}/><path d="M9 -9H22" stroke="#fff" stroke-opacity=".4" stroke-width="1.6" stroke-linecap="round"/>
  <!-- trup (předkloněný) -->
  <g transform="rotate(17 0 -88)">
    <path d="M-16 -88L18 -88L20 -116Q23 -134 12 -141L-12 -141Q-21 -131 -18 -112z" fill="url(#${g})" ${OL}/>
    <rect x="-17" y="-93" width="37" height="6.5" fill="#101014" ${ol}/><rect x="-3" y="-93" width="8" height="6.5" fill="#b8b8c0" ${ol}/>
    <path d="M2 -138L2 -94" stroke="#2a2a32" stroke-width="1.4" opacity=".7"/>
    <rect x="6" y="-128" width="10" height="9" fill="#2a2a32" opacity=".45"/>
    <path d="M-9 -141L-2 -131L5 -141z" fill="#6a6a74" ${ol}/>
  </g>
  <!-- paže za zády -->
  <path d="M14 -136Q0 -134 -4 -118L8 -114Q8 -124 18 -128z" fill="url(#${g})" ${OL}/>
  <path d="M-4 -118L-10 -98L-2 -95L8 -114z" fill="url(#${sk})" ${ol}/>
  <circle cx="-8" cy="-94" r="5" fill="url(#${sk})" ${ol}/>
  <!-- krk -->
  <path d="M17 -138L28 -160L38 -155L30 -134z" fill="${shade(skin, 0.82)}" ${ol}/>
  <!-- hlava -->
  <g transform="translate(34 -172) rotate(9)">
    <path d="M-17 -4Q-21 10 -11 18L-6 8Q-11 2 -9 -8z" fill="${hair}" ${ol}/>
    <ellipse cx="-9" cy="2" rx="4.4" ry="6.4" fill="${shade(skin, 0.86)}" ${ol}/>
    <ellipse cx="2" cy="1" rx="18" ry="21" fill="url(#${sk})" ${OL}/>
    <path d="M12 12Q22 22 8 25Q-2 25 -6 16Q4 22 12 12z" fill="${shade(skin, 0.8)}" opacity=".7"/>
    <path d="M14 -3Q36 -1 37 12Q35 22 24 20Q18 18 16 12z" fill="url(#${sk})" ${OL}/>
    <circle cx="30" cy="15" r="1.7" fill="#7a3a2a"/>
    <ellipse cx="8" cy="-6" rx="6.6" ry="7.4" fill="#fff" ${ol}/>
    <circle cx="10.4" cy="-5" r="3.5" fill="#5a3015"/><circle cx="10.8" cy="-5" r="1.6" fill="#120804"/>
    <path d="M1.4 -7.5Q8 -14 14.6 -7.5z" fill="${shade(skin, 0.88)}"/>
    <path d="M1 -14Q8 -18 15 -13" stroke="${hair}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M12 17Q19 21 25 16" stroke="#8a3a2a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- čepice -->
    <g transform="rotate(-4 2 -16)">
      <path d="M-20 -14Q-23 -37 2 -40Q27 -37 23 -14z" fill="url(#${cp})" ${OL}/>
      <path d="M-22 -19Q2 -12 25 -19L25 -11Q2 -4 -22 -11z" fill="#2a2a32" ${ol}/>
      <path d="M12 -13Q38 -17 52 -10Q36 -5 10 -8z" fill="#101014" ${OL}/>
      <path d="M-16 -30Q2 -37 18 -30" stroke="#8a8a96" stroke-width="2" fill="none" opacity=".6"/>
      <circle cx="6" cy="-24" r="4.6" fill="#c8c8d0" ${ol}/><circle cx="6" cy="-24" r="1.8" fill="#8a8a96"/>
    </g>
  </g>
</g>`;
}

/** Hlavní postava (zachován původní název pro scény). */
export const patrik = (x: number, y: number, s: number, extra: Partial<PersonOpts> = {}): string =>
  pankrac(x, y, s, !!extra.flip);

export const noise = (idv: string): string =>
  `<pattern id="${idv}" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="1.5" height="1.5" fill="#fff" opacity=".07"/><rect x="1.5" y="1.5" width="1.5" height="1.5" fill="#000" opacity=".05"/></pattern>`;


/**
 * Šachovnicová podlaha v perspektivě (typický vzhled Poldy 1). Vykresluje se do
 * celé spodní části scény; ořez řeší volající přes clip-path.
 */
export function checker(c1: string, c2: string, yBack = 238, vx = 320, yh = 120, cw = 120): string {
  const yb = 360;
  const rows = 9;
  const ys: number[] = [];
  for (let i = 0; i <= rows; i++) {
    const d = 1 + (i / rows) * ((yb - yh) / (yBack - yh) - 1);
    ys.push(yh + (yb - yh) / d);
  }
  ys.reverse();
  let out = '';
  for (let r = 0; r < rows; r++) {
    const ya = ys[r];
    const yc = ys[r + 1];
    const ta = (ya - yh) / (yb - yh);
    const tc = (yc - yh) / (yb - yh);
    for (let j = -12; j < 12; j++) {
      const xa0 = vx + j * cw * ta;
      const xa1 = vx + (j + 1) * cw * ta;
      const xc0 = vx + j * cw * tc;
      const xc1 = vx + (j + 1) * cw * tc;
      out += `<polygon points="${xa0.toFixed(1)},${ya.toFixed(1)} ${xa1.toFixed(1)},${ya.toFixed(1)} ${xc1.toFixed(1)},${yc.toFixed(1)} ${xc0.toFixed(1)},${yc.toFixed(1)}" fill="${(r + j) & 1 ? c1 : c2}"/>`;
    }
  }
  return out;
}
