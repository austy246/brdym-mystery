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
  sleeves?: 'short' | 'long';
  pocket?: boolean;
}

export function person(o: PersonOpts): string {
  const s = o.s ?? 1;
  const skin = o.skin ?? '#e8924f';
  const hair = o.hair ?? '#7a4a22';
  const hairStyle = o.hairStyle ?? 'short';
  const coat = o.coat ?? '#8a7650';
  const pants = o.pants ?? '#4a4a5a';
  const hat = o.hat ?? 'none';
  const hatC = o.hatColor ?? '#55482c';
  const belly = o.belly ?? 0;
  const n = o.nose ?? 1;
  const head = o.head ?? 1;
  const gid = nid('pg');
  const hid = nid('ph');
  const skg = nid('sk');
  const pg = nid('pt');
  const nsg = nid('ns');
  const skinD = shade(skin, 0.82);
  const skinL = shade(skin, 1.12);
  const noseCol = o.redNose ? '#e8806a' : skinL;
  const coatD = shade(coat, 0.68);
  const hairD = shade(hair, 0.6);
  const hw = 26 + belly * 0.5; // půlšířka trupu
  const hemY = o.dress ? -80 : -58;
  const eyeC = o.eyes ?? '#6a3a18';
  const shortSl = o.sleeves === 'short';

  /* --- vlasy --- */
  const sideTufts = `<path d="M-19 -172Q-24 -166 -21 -154L-17.5 -158Q-17.5 -165 -16 -171z" fill="${hair}" ${ol}/><path d="M19 -172Q24 -166 21 -154L17.5 -158Q17.5 -165 16 -171z" fill="${hair}" ${ol}/>`;
  const hairBack =
    hairStyle === 'long'
      ? `<path d="M-22 -170Q-36 -140 -29 -108L-14 -114Q-20 -140 -17 -165z" fill="${hair}" ${OL}/><path d="M22 -170Q36 -140 29 -108L14 -114Q20 -140 17 -165z" fill="${hair}" ${OL}/>`
      : '';
  let hairFront = '';
  if (hat === 'none' || hat === 'beret') {
    switch (hairStyle) {
      case 'messy':
        hairFront = `<path d="M-22 -168L-28 -182L-17 -180L-19 -194L-8 -188L-4 -202L3 -193L10 -203L13 -192L23 -196L21 -184L28 -180L22 -168Q12 -182 0 -180Q-12 -182 -22 -168z" fill="${hair}" ${OL}/>`;
        break;
      case 'bald':
        hairFront = `${sideTufts}<ellipse cx="-4" cy="-180" rx="8" ry="3" fill="#fff" opacity=".35"/>`;
        break;
      case 'combover':
        hairFront = `${sideTufts}<path d="M-13 -181Q0 -190 13 -181M-12 -177Q0 -185 12 -176M-11 -173Q0 -180 11 -172" stroke="${hair}" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="-4" cy="-184" rx="6" ry="2.5" fill="#fff" opacity=".3"/>`;
        break;
      case 'bun':
        hairFront = `<circle cx="0" cy="-198" r="9" fill="${hair}" ${OL}/><path d="M-21 -168Q-23 -197 0 -196Q23 -197 21 -168Q12 -182 0 -180Q-12 -182 -21 -168z" fill="${hair}" ${OL}/>`;
        break;
      default:
        hairFront = `<path d="M-21 -168Q-24 -196 0 -197Q24 -196 21 -168Q12 -182 0 -180Q-12 -182 -21 -168z" fill="${hair}" ${OL}/>`;
    }
  } else if (hat !== 'scarf') {
    hairFront = `${sideTufts}${
      hairStyle === 'bald'
        ? ''
        : `<path d="M-20 -166Q-21 -183 -8 -183L0 -169L8 -183Q21 -183 20 -166Q13 -174 6 -175L0 -168L-6 -175Q-13 -174 -20 -166z" fill="${hair}" ${ol}/>`
    }`;
  }

  /* --- klobouky (čelní pohled, čelo na y = -178) --- */
  const tilt = o.hatTilt ?? 0;
  let hatSvg = '';
  if (hat === 'police') {
    hatSvg = `<g transform="translate(0 -6) rotate(${tilt} 0 -178)">
      <path d="M-36 -178Q-43 -204 -14 -213Q0 -217 14 -213Q43 -204 36 -178Q0 -170 -36 -178z" fill="url(#${hid})" ${OL}/>
      <path d="M-30 -186Q-34 -200 -22 -208M30 -186Q34 -200 22 -208M-8 -190Q-14 -200 -9 -210M8 -190Q14 -200 9 -210" stroke="${shade(hatC, 0.55)}" stroke-width="1.6" fill="none" opacity=".7"/>
      <path d="M-35 -185Q0 -176 35 -185L36 -177Q0 -169 -36 -177z" fill="${shade(hatC, 0.5)}" ${ol}/>
      <path d="M-23 -179Q0 -187 23 -179Q18 -171 0 -170Q-18 -171 -23 -179z" fill="#16161c" ${OL}/>
      <path d="M-16 -178Q0 -183 16 -178" stroke="#fff" stroke-opacity=".28" stroke-width="1.4" fill="none"/>
      <circle cx="0" cy="-199" r="7.6" fill="#b8b8c0" ${OL}/><circle cx="0" cy="-199" r="4.8" fill="#8e8e9a"/><path d="M-3 -197Q0 -203 3 -197Q0 -195 -3 -197z" fill="#d8d8e0"/></g>`;
  } else if (hat === 'fedora') {
    hatSvg = `<g transform="rotate(${tilt} 0 -178)"><ellipse cx="0" cy="-178" rx="38" ry="7.5" fill="${shade(hatC, 0.82)}" ${OL}/>
      <path d="M-21 -180Q-22 -212 0 -212Q22 -212 21 -180z" fill="url(#${hid})" ${OL}/>
      <path d="M-20 -194Q0 -188 20 -194" stroke="${shade(hatC, 0.6)}" stroke-width="1.6" fill="none"/>
      <path d="M-21 -184H21V-178H-21z" fill="${shade(hatC, 0.55)}" ${ol}/></g>`;
  } else if (hat === 'cap') {
    hatSvg = `<g transform="rotate(${tilt} 0 -178)"><path d="M-24 -178Q-26 -206 0 -206Q26 -206 24 -178z" fill="url(#${hid})" ${OL}/>
      <path d="M-24 -184Q0 -178 24 -184L24 -178Q0 -172 -24 -178z" fill="${shade(hatC, 0.6)}" ${ol}/>
      <path d="M-22 -178Q0 -171 22 -178Q16 -167 0 -167Q-16 -167 -22 -178z" fill="${shade(hatC, 0.5)}" ${OL}/>
      <circle cx="0" cy="-206" r="2.4" fill="${shade(hatC, 0.6)}"/><circle cx="0" cy="-193" r="4" fill="#e8c14a" ${ol}/></g>`;
  } else if (hat === 'beret') {
    hatSvg = `<ellipse cx="-2" cy="-186" rx="30" ry="11" fill="url(#${hid})" ${OL} transform="rotate(-8 -2 -186)"/><rect x="-6" y="-200" width="4" height="7" rx="2" fill="${shade(hatC, 0.6)}" ${ol}/>`;
  } else if (hat === 'straw') {
    hatSvg = `<ellipse cx="0" cy="-180" rx="46" ry="9" fill="${shade(hatC, 1.1)}" ${OL}/>
      <path d="M-20 -182Q-20 -208 0 -208Q20 -208 20 -182z" fill="url(#${hid})" ${OL}/>
      <path d="M-20 -188H20V-182H-20z" fill="#b8302b" ${ol}/>
      <path d="M-44 -180q-4 4 -2 6M44 -180q4 4 2 6" stroke="#3b2214" stroke-width="1.2" fill="none"/>`;
  } else if (hat === 'scarf') {
    hatSvg = `<path d="M-24 -166Q-27 -204 0 -203Q27 -204 24 -166Q22 -186 0 -187Q-22 -186 -24 -166z" fill="url(#${hid})" ${OL}/>
      <path d="M-22 -172L-30 -152L-20 -158z" fill="${hatC}" ${OL}/><path d="M-14 -190q8 -9 18 -9" stroke="${shade(hatC, 1.4)}" stroke-width="2" fill="none"/>`;
  }

  /* --- obličej --- */
  const browsKind = o.brows ?? 'normal';
  const brows =
    browsKind === 'sad'
      ? 'M-16 -171Q-9 -175 -3 -179M3 -179Q9 -175 16 -171'
      : browsKind === 'angry'
        ? 'M-16 -179Q-9 -175 -3 -171M3 -171Q9 -175 16 -179'
        : 'M-16 -174Q-9.5 -180 -3 -174M3 -174Q9.5 -180 16 -174';
  const mouthKind = o.mouth ?? 'smile';
  const mouth =
    mouthKind === 'flat'
      ? `<path d="M-6 -133H6" stroke="#8a3a2a" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
      : mouthKind === 'open'
        ? `<ellipse cx="0" cy="-133" rx="3.4" ry="3" fill="#6a2018" ${ol}/><ellipse cx="0" cy="-134.4" rx="2" ry="1" fill="#e8b0a0" opacity=".7"/>`
        : mouthKind === 'frown'
          ? `<path d="M-6 -131Q0 -137 6 -131" stroke="#8a3a2a" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
          : `<path d="M-6.5 -135Q0 -129.5 6.5 -135" stroke="#8a3a2a" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  const bags = o.tired
    ? `<path d="M-14.5 -158Q-9.5 -155 -4.5 -158M4.5 -158Q9.5 -155 14.5 -158" stroke="${shade(skin, 0.55)}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`
    : '';
  const stubble = o.stubble
    ? `<path d="M-17 -156Q-19 -140 -8 -132Q0 -126 8 -132Q19 -140 17 -156Q14 -142 0 -140Q-14 -142 -17 -156z" fill="#4a3a2a" opacity=".36"/>
       ${rep(14, (i) => `<circle cx="${-10 + (i % 7) * 3.4}" cy="${-138 + Math.floor(i / 7) * 5 + (i % 3)}" r=".8" fill="#2a1a10" opacity=".6"/>`)}`
    : '';
  const beard = o.beard
    ? `<path d="M-20 -160Q-21 -130 0 -124Q21 -130 20 -160Q14 -144 0 -144Q-14 -144 -20 -160z" fill="${hair}" ${OL}/>`
    : '';
  const glasses = o.glasses
    ? `<circle cx="-9.5" cy="-165" r="8.6" fill="#cfe8f0" opacity=".25" stroke="#2a2a2a" stroke-width="1.7"/><circle cx="9.5" cy="-165" r="8.6" fill="#cfe8f0" opacity=".25" stroke="#2a2a2a" stroke-width="1.7"/><path d="M-0.9 -166Q0 -168 0.9 -166M-18 -166L-22 -168M18 -166L22 -168" stroke="#2a2a2a" stroke-width="1.5" fill="none"/>`
    : '';
  const mus = o.mustache
    ? `<path d="M0 -139Q8 -145 16 -138Q14 -133 6 -137Q0 -135 0 -139Q0 -135 -6 -137Q-14 -133 -16 -138Q-8 -145 0 -139z" fill="${hairD}" ${ol}/>`
    : '';
  const eye = (x: number): string =>
    `<ellipse cx="${x}" cy="-165" rx="7" ry="7.6" fill="#dcdad6" ${ol}/>
     <circle cx="${x}" cy="-164" r="3.7" fill="${eyeC}"/><circle cx="${x}" cy="-164" r="1.8" fill="#140a05"/><circle cx="${x + 1.3}" cy="-166" r="1" fill="#fff" opacity=".85"/>
     <path d="M${x - 6.6} -166Q${x} -176 ${x + 6.6} -166Q${x} -169.5 ${x - 6.6} -166z" fill="${skinD}"/>`;

  /* --- tělo --- */
  const belt = o.dress ? '' : `<rect x="${-hw}" y="-64" width="${hw * 2}" height="7" fill="#14141a" ${ol}/><rect x="-4" y="-64" width="8" height="7" fill="#b8b8c0" ${ol}/>`;
  const legs = o.dress
    ? `<path d="M-12 -46L-11 -9H-3L-3 -46z" fill="url(#${skg})" ${OL}/><path d="M3 -46L3 -9H11L12 -46z" fill="url(#${skg})" ${OL}/>
       <path d="M-12 -22H-3M3 -22H12" stroke="#e8e8e8" stroke-width="5"/>
       <path d="M${-hw + 2} -82L${-hw - 8} -44H${hw + 8}L${hw - 2} -82z" fill="url(#${gid})" ${OL}/>`
    : `<path d="M-16 -60L-15 -9H-2L-1 -60z" fill="url(#${pg})" ${OL}/>
       <path d="M1 -60L2 -9H15L16 -60z" fill="url(#${pg})" ${OL}/>
       <path d="M-15 -36Q-8 -33 -2 -36M2 -36Q9 -33 15 -36" stroke="${shade(pants, 0.55)}" stroke-width="1.3" fill="none" opacity=".6"/>`;
  const shoes = `<path d="M-18 -10H-2Q0 -2 -3 0H-21Q-24 -3 -18 -10z" fill="#17171c" ${OL}/><path d="M-17 -7H-8" stroke="#fff" stroke-opacity=".4" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M2 -10H18Q24 -3 21 0H3Q0 -2 2 -10z" fill="#101014" ${OL}/><path d="M4 -7H12" stroke="#fff" stroke-opacity=".4" stroke-width="1.5" stroke-linecap="round"/>`;
  const yE = shortSl ? -92 : -72;
  const arm = (sg: number): string => {
    const xo = sg * (hw + 10);
    const xi = sg * (hw - 3);
    const sleeve = `<path d="M${sg * (hw + 1)} -119Q${xo + sg * 2} -108 ${xo} ${yE}L${xi + sg * 1} ${yE}Q${sg * (hw - 2)} -106 ${sg * (hw - 6)} -116z" fill="url(#${gid})" ${OL}/>`;
    const cuff = shortSl
      ? `<path d="M${xo} ${yE - 4}L${xi + sg} ${yE - 4}L${xi + sg} ${yE + 1}L${xo} ${yE + 1}z" fill="${shade(coat, 1.15)}" ${ol}/>
         <path d="M${xo - sg} ${yE + 1}L${xo - sg * 1.5} -72L${xi + sg * 2} -72L${xi + sg} ${yE + 1}z" fill="url(#${skg})" ${ol}/>`
      : '';
    return `${sleeve}${cuff}<circle cx="${(xo + xi) / 2}" cy="-67" r="6.2" fill="url(#${skg})" ${ol}/>`;
  };
  const apron = o.apron
    ? `<path d="M${-hw + 8} -112L${-hw + 4} -46H${hw - 4}L${hw - 8} -112z" fill="${o.apron}" ${OL}/><path d="M${-hw + 8} -112H${hw - 8}" stroke="${shade(o.apron, 0.7)}" stroke-width="2"/>`
    : '';
  const pocket = o.pocket ?? (!o.dress && !o.apron)
    ? `<path d="M7 -108H21V-92Q14 -89 7 -92z" fill="${coatD}" opacity=".6" ${ol}/><path d="M7 -108H21" stroke="${shade(coat, 1.3)}" stroke-width="1.2"/>`
    : '';
  const collarStyle = o.collarUp
    ? `<path d="M-12 -122L-9 -140L-2 -126zM12 -122L9 -140L2 -126z" fill="${shade(coat, 1.05)}" ${OL}/>`
    : `<path d="M-10 -124L-6 -134L-1 -130L-1 -121zM10 -124L6 -134L1 -130L1 -121z" fill="${shade(coat, 1.12)}" ${ol}/>`;
  const shirtTie = o.dress
    ? `<path d="M-9 -121Q0 -112 9 -121" stroke="${shade(coat, 0.6)}" stroke-width="2" fill="none"/>`
    : `${o.tie ? `<path d="M-8 -124L0 -106L8 -124z" fill="#f4f2ea" ${ol}/><path d="M-2 -118H3L5 -84L0 -78L-5 -84z" fill="${o.tie}" ${ol}/>` : ''}`;
  const buttons = o.dress || o.tie ? '' : rep(3, (i) => `<circle cx="0" cy="${-108 + i * 16}" r="1.9" fill="#a8a8b2" ${ol}/>`);
  const medals = o.medals
    ? `${rep(3, (i) => `<circle cx="${-14 + i * 9}" cy="${-100 + (i % 2) * 2}" r="3.8" fill="${['#e8c14a', '#c23b3b', '#e8c14a'][i]}" ${ol}/>`)}`
    : '';

  return `
<g transform="translate(${o.x} ${o.y}) scale(${o.flip ? -s : s} ${s})">
  <defs>
    ${grad(gid, coat, false, 1.25, 0.62)}
    ${grad(hid, hatC, true, 1.25, 0.75)}
    ${grad(pg, pants, false, 1.2, 0.6)}
    <radialGradient id="${skg}" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="${shade(skin, 1.14)}"/><stop offset=".55" stop-color="${skin}"/><stop offset="1" stop-color="${shade(skin, 0.7)}"/></radialGradient>
    <radialGradient id="${nsg}" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="${shade(noseCol, 1.18)}"/><stop offset="1" stop-color="${shade(noseCol, 0.76)}"/></radialGradient>
  </defs>
  <ellipse cx="0" cy="1" rx="${36 + belly * 0.6}" ry="6" fill="#000" opacity=".22"/>
  ${legs}
  ${shoes}
  ${belt}
  <path d="M${-hw + 3} -120Q${-hw - 3} -116 ${-hw - 2} -96L${-hw} ${hemY}H${hw}L${hw + 2} -96Q${hw + 3} -116 ${hw - 3} -120Q${hw / 2} -127 0 -124Q${-hw / 2} -127 ${-hw + 3} -120z" fill="url(#${gid})" ${OL}/>
  <path d="M0 -122V${hemY}" stroke="${coatD}" stroke-width="1.4" opacity=".7"/>
  ${arm(-1)}
  ${arm(1)}
  <rect x="-5" y="-136" width="10" height="14" fill="${skinD}"/>
  ${shirtTie}
  ${collarStyle}
  ${buttons}
  ${pocket}
  ${medals}
  ${apron}
  <g transform="translate(0 -124) scale(${head}) translate(0 124)">
    ${hairBack}
    <ellipse cx="-22" cy="-158" rx="6.5" ry="10" fill="${skinD}" ${ol}/><ellipse cx="-22" cy="-158" rx="3" ry="6" fill="${shade(skin, 0.62)}" opacity=".55"/>
    <ellipse cx="22" cy="-158" rx="6.5" ry="10" fill="${skinD}" ${ol}/><ellipse cx="22" cy="-158" rx="3" ry="6" fill="${shade(skin, 0.62)}" opacity=".55"/>
    <path d="M-19 -172Q-22 -150 -13 -140Q-6 -129 0 -128Q6 -129 13 -140Q22 -150 19 -172Q0 -182 -19 -172z" fill="url(#${skg})" ${OL}/>
    <path d="M-13 -140Q-6 -129 0 -128Q6 -129 13 -140Q4 -132 0 -133Q-4 -132 -13 -140z" fill="${skinD}" opacity=".5"/>
    ${stubble}
    ${beard}
    <circle cx="${-5.5 * n}" cy="-143" r="${5.2 * n}" fill="url(#${nsg})" ${OL}/>
    <circle cx="${5.5 * n}" cy="-143" r="${5.2 * n}" fill="url(#${nsg})" ${OL}/>
    <ellipse cx="0" cy="-149" rx="${6.6 * n}" ry="${9.4 * n}" fill="url(#${nsg})" ${OL}/>
    <ellipse cx="${-2.8 * n}" cy="-141.4" rx="1.4" ry="1" fill="#7a3a2a"/><ellipse cx="${2.8 * n}" cy="-141.4" rx="1.4" ry="1" fill="#7a3a2a"/>
    <ellipse cx="${-1.6 * n}" cy="${-152 * 1}" rx="2" ry="3.2" fill="#fff" opacity=".25"/>
    ${eye(-9.5)}
    ${eye(9.5)}
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
 * Patrik podle předlohy: čelní pohled, plochá tmavá čepice s kulatým znakem,
 * hnědé vlasy i oči, velký bulvovitý nos, velké uši, tmavě šedá košile
 * s náprsní kapsou a vyhrnutým rukávem.
 */
export function pankrac(x: number, y: number, s = 1, flip = false): string {
  return person({
    x,
    y,
    s,
    flip,
    skin: '#e58d4c',
    hair: '#7a3a1a',
    eyes: '#6a3018',
    coat: '#4e4e56',
    pants: '#2e2e36',
    hat: 'police',
    hatColor: '#34343c',
    nose: 1.1,
    head: 1.3,
    sleeves: 'short',
    pocket: true,
    brows: 'normal',
    mouth: 'open',
  });
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
