import { wrap, rep, grad, noise, person, shade, OL, ol } from '../art';

/**
 * Vnitřek domku sběratele Ctibora Kocoura. Příšeří s teplými lampami.
 *
 * Hotspoty (pevné souřadnice):
 *  sberatel (270,90,120,230) · klicky (40,50,210,190) · stul (440,190,120,80)
 *  vychod (580,110,60,210)
 */

const brass = (id: string): string =>
  `<radialGradient id="${id}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff2b0"/><stop offset=".45" stop-color="#e0b040"/><stop offset="1" stop-color="#8a6418"/></radialGradient>`;

/** Dveřní klika: kulatá hlavice s růžicí. */
const knob = (x: number, y: number, r: number, fill = 'url(#sbbrass)'): string =>
  `<circle cx="${x}" cy="${y}" r="${r * 1.35}" fill="#b8902c" ${ol}/><circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${ol}/><circle cx="${x - r * 0.3}" cy="${y - r * 0.35}" r="${r * 0.28}" fill="#fffbe0" opacity=".85"/>`;

const wall = `
<rect width="560" height="270" fill="url(#sbwall)"/>
<rect width="560" height="270" fill="url(#sbpat)"/>
<!-- trámy -->
<rect width="560" height="14" fill="#2f1c0e" ${ol}/>
<rect x="0" y="0" width="560" height="5" fill="#4a2e18"/>
<!-- boční stěna -->
<polygon points="560,22 640,0 640,330 560,270" fill="url(#sbside)" ${OL}/>
<polygon points="560,22 640,0 640,10 560,32" fill="#2f1c0e" ${ol}/>
<!-- lištovka -->
<rect y="238" width="560" height="32" fill="#3e2814" ${ol}/>
${rep(7, (i) => `<rect x="${i * 80 + 8}" y="246" width="64" height="18" rx="2" fill="#4d3219" ${ol}/>`)}
<rect y="234" width="560" height="7" fill="#7a5530" ${ol}/>
<polygon points="560,234 640,296 640,306 560,244" fill="#5a3a1c" ${ol}/>
<!-- podlaha -->
<polygon points="0,270 560,270 640,330 640,360 0,360" fill="url(#sbfloor)"/>
${rep(14, (i) => `<path d="M${i * 62 - 20} 270L${i * 100 - 250} 360" stroke="#1a0f06" stroke-width="2" opacity=".5"/>`)}
<path d="M0 298H600M0 326H640M0 348H640" stroke="#1a0f06" stroke-width="1.6" opacity=".35"/>
<polygon points="560,270 640,330 640,360 560,360" fill="#000" opacity=".1"/>
`;

/* ---------------- koberec ---------------- */
const rug = `
<ellipse cx="318" cy="322" rx="214" ry="36" fill="#6e1c26" ${OL}/>
<ellipse cx="318" cy="322" rx="198" ry="30" fill="none" stroke="#e0b868" stroke-width="3"/>
<ellipse cx="318" cy="322" rx="178" ry="25" fill="#8a2a32"/>
${rep(11, (i) => `<path d="M${156 + i * 32} 322l8 -9 8 9 -8 9z" fill="${i % 2 ? '#e0b868' : '#2f4a6a'}" opacity=".85"/>`)}
<ellipse cx="318" cy="322" rx="214" ry="36" fill="url(#sbglowfloor)"/>
`;

/* ---------------- vitrína s klikami ---------------- */
const keyShape = (x: number, y: number, len: number, col: string): string =>
  `<g transform="translate(${x} ${y})"><path d="M0 -3V${len}" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/><circle cx="0" cy="-7" r="5" fill="none" stroke="${col}" stroke-width="2.4"/><path d="M0 ${len}h6M0 ${len - 5}h4M0 ${len - 10}h6" stroke="${col}" stroke-width="2.2" stroke-linecap="round"/><circle cx="-1.4" cy="-8.6" r="1.2" fill="#fff" opacity=".6"/></g>`;

const lock = (x: number, y: number, col: string): string =>
  `<g transform="translate(${x} ${y})"><path d="M-7 0V-9Q-7 -17 0 -17T7 -9V0" fill="none" stroke="#b8bcc0" stroke-width="3.2"/><rect x="-10" y="-1" width="20" height="16" rx="3" fill="${col}" ${ol}/><circle cx="0" cy="6" r="2.4" fill="#1c1208"/><rect x="-1" y="6" width="2" height="6" fill="#1c1208"/><rect x="-8" y="1" width="16" height="3" rx="1.5" fill="#fff" opacity=".22"/></g>`;

const horseshoe = (x: number, y: number): string =>
  `<g transform="translate(${x} ${y})"><path d="M-9 0Q-13 -17 0 -19T9 0" fill="none" stroke="#9aa0a6" stroke-width="5" stroke-linecap="round"/><path d="M-9 0Q-13 -17 0 -19T9 0" fill="none" stroke="#d4dade" stroke-width="1.6" stroke-linecap="round" transform="translate(-1 -1)"/>${rep(3, (i) => `<circle cx="${-9 + i * 3 + (i === 2 ? 12 : 0)}" cy="${-7 - i}" r="1" fill="#2a2a2a"/>`)}</g>`;

const lever = (x: number, y: number, col: string): string =>
  `<g transform="translate(${x} ${y})"><rect x="-8" y="-14" width="7" height="14" rx="2" fill="${shade(col, 0.8)}" ${ol}/><path d="M-4 -10H16" stroke="${col}" stroke-width="6" stroke-linecap="round"/><path d="M-4 -11H16" stroke="#fff" stroke-width="1.4" opacity=".4" stroke-linecap="round"/></g>`;

const cabinet = `
<ellipse cx="146" cy="246" rx="124" ry="7" fill="#000" opacity=".35"/>
<rect x="38" y="48" width="214" height="196" rx="4" fill="url(#sbwood)" ${OL}/>
<rect x="48" y="58" width="194" height="176" fill="#3a1e1c" ${ol}/>
<rect x="48" y="58" width="194" height="176" fill="url(#sbvel)"/>
<!-- police / popisky -->
${[
  { y: 108, t: 'klika 1923   klika 1924   klika 1924 (jiná)' },
  { y: 154, t: 'klika, kterou držel nějaký pan Novák' },
  { y: 200, t: 'zámky (dobré)  zámky (podezřelé)' },
  { y: 232, t: 'klika (nejhezčí)' },
]
  .map(
    (r) => `<rect x="46" y="${r.y}" width="198" height="9" fill="#d9b878" ${ol}/><rect x="48" y="${r.y + 1}" width="194" height="3" fill="#f2dca4" opacity=".65"/>
<text x="54" y="${r.y + 7}" font-family="'Segoe Script', 'Comic Sans MS', cursive" font-size="6" fill="#4a2a10">${r.t}</text>`,
  )
  .join('')}
<!-- 1. řada: kliky -->
${rep(7, (i) => knob(62 + i * 28, 98 - (i % 3), 7 + (i % 2) * 1.5, ['url(#sbbrass)', '#c8cdd2', 'url(#sbbrass)', '#e8e0d0', '#7a4a2a', 'url(#sbbrass)', '#2a6a8a'][i]))}
<!-- 2. řada: visící klíče + podkovy -->
<path d="M52 122H238" stroke="#7a5530" stroke-width="3"/>
${rep(11, (i) => keyShape(60 + i * 17, 130, 8 + (i % 4) * 5, ['#c8a040', '#9aa0a6', '#d8b050', '#8a8e94'][i % 4]))}
<!-- 3. řada: zámky -->
${rep(6, (i) => lock(66 + i * 33, 198 - 15, ['#7a8a98', '#a08a4a', '#6a6a72', '#8a4a3a', '#5a7a6a', '#9a8a6a'][i]))}
<!-- 4. řada: kliky pákové -->
${rep(6, (i) => lever(66 + i * 32, 230, ['#c8a040', '#b8bcc0', '#c07a3a', '#d8d0b8', '#9aa0a6', '#d0a850'][i]))}
<!-- sklo -->
<polygon points="52,60 130,60 90,232 52,232" fill="#fff" opacity=".07"/>
<polygon points="150,60 190,60 150,232 110,232" fill="#fff" opacity=".05"/>
<rect x="48" y="58" width="194" height="176" fill="none" stroke="#2a1608" stroke-width="2.4"/>
<path d="M145 58V234" stroke="#2a1608" stroke-width="2.6"/>
<circle cx="146" cy="146" r="3.4" fill="#e0b040" ${ol}/>
`;

/* ---------------- pravá část zdi: police, diplom, kočka ---------------- */
const rightWall = `
<!-- diplom -->
<rect x="446" y="44" width="82" height="58" fill="#7a4a22" ${OL}/>
<rect x="452" y="50" width="70" height="46" fill="#f4ebcc" ${ol}/>
<text x="487" y="62" text-anchor="middle" font-family="Georgia, serif" font-size="6.6" font-weight="bold" fill="#8a1c1c">DIPLOM</text>
<text x="487" y="71" text-anchor="middle" font-family="Georgia, serif" font-size="4.6" fill="#4a3a20">NEJVĚTŠÍ SBĚRATEL KLIK</text>
<text x="487" y="78" text-anchor="middle" font-family="Georgia, serif" font-size="4.6" fill="#4a3a20">OKRESU 1987</text>
<circle cx="487" cy="88" r="5.4" fill="#d02a2a" ${ol}/><path d="M484 92l-3 8 6 -3 M490 92l3 8 -6 -3" fill="#d02a2a" ${ol}/>
<!-- police se sklenicemi šroubů -->
<rect x="434" y="132" width="132" height="8" fill="#7a5530" ${OL}/>
${rep(5, (i) => `<g transform="translate(${446 + i * 25} 132)"><rect x="-8" y="-24" width="16" height="24" rx="3" fill="#bfe0e8" opacity=".55" ${ol}/><rect x="-9" y="-27" width="18" height="4" rx="1.6" fill="#a08a4a" ${ol}/>${rep(4, (j) => `<rect x="${-5 + (j % 2) * 5}" y="${-18 + j * 4}" width="4" height="2.6" fill="${['#8a8e94', '#c07a3a', '#d8b050', '#6a6a72'][(i + j) % 4]}"/>`)}</g>`)}
<!-- spící kočka -->
<g transform="translate(542 132)">
  <path d="M-20 0Q-24 -16 -6 -18Q14 -22 22 -8Q26 0 20 0z" fill="#b8b0a4" ${OL}/>
  <path d="M-12 -12q8 -3 14 2M-4 -16q8 -2 14 3" stroke="#6a625a" stroke-width="2.2" fill="none"/>
  <circle cx="-18" cy="-10" r="8" fill="#c4bcb0" ${OL}/><path d="M-24 -17l2 -7 5 5zM-14 -18l4 -6 3 7z" fill="#c4bcb0" ${ol}/>
  <path d="M-22 -10q3 2 6 0" stroke="#2a2a2a" stroke-width="1.6" fill="none"/>
  <path d="M20 -2Q34 -2 32 6" stroke="#9a9288" stroke-width="5" fill="none" stroke-linecap="round"/>
  <text x="-6" y="-26" font-family="Arial" font-size="7" fill="#fff" opacity=".7">z</text><text x="2" y="-32" font-family="Arial" font-size="9" fill="#fff" opacity=".6">Z</text>
</g>
<!-- nástěnné svítidlo -->
<path d="M552 78h14v28h-14z" fill="#7a5530" ${ol}/><path d="M546 78q13 -22 26 0z" fill="#e8c860" ${ol}/>
<circle cx="559" cy="86" r="40" fill="url(#sbglow)"/>
`;

/* ---------------- lampa ze stropu ---------------- */
const ceiling = `
<path d="M330 14V50" stroke="#3b2214" stroke-width="2.4"/>
<path d="M300 78Q330 36 360 78z" fill="#a8441e" ${OL}/>
<path d="M300 78Q330 36 360 78" fill="none" stroke="#f0a060" stroke-width="2.4" opacity=".6"/>
<ellipse cx="330" cy="78" rx="30" ry="5" fill="#ffe9a0" ${ol}/>
<ellipse cx="330" cy="82" rx="150" ry="120" fill="url(#sbglow)"/>
<!-- závěsné klíče a podkovy z trámů -->
${rep(5, (i) => keyShape(48 + i * 20, 14, 14 + (i % 3) * 8, '#c8a040'))}
${rep(3, (i) => horseshoe(470 + i * 34, 28 + (i % 2) * 6))}
`;

/* ---------------- bedny vlevo dole ---------------- */
const crates = `
<ellipse cx="62" cy="332" rx="58" ry="8" fill="#000" opacity=".3"/>
<rect x="14" y="288" width="86" height="44" fill="#b8844c" ${OL}/>
${rep(3, (i) => `<path d="M14 ${298 + i * 12}H100" stroke="#8a5a30" stroke-width="1.4"/>`)}
<rect x="24" y="298" width="48" height="14" fill="#f0e4b8" ${ol}/>
<text x="48" y="308" text-anchor="middle" font-family="Arial, sans-serif" font-size="4.6" font-weight="bold" fill="#8a1c1c">KLIKY – NEROZTŘÍDĚNÉ</text>
<rect x="30" y="256" width="62" height="32" fill="#c8945a" ${OL}/><path d="M30 268H92M30 278H92" stroke="#8a5a30" stroke-width="1.4"/>
<text x="61" y="274" text-anchor="middle" font-family="Arial, sans-serif" font-size="5" fill="#4a2a10">KLÍČE (HODNĚ)</text>
${knob(48, 252, 5)}${knob(64, 250, 4.6, '#c8cdd2')}${knob(80, 252, 5)}
`;

/* ---------------- stůl s dopisy ---------------- */
const desk = `
<ellipse cx="500" cy="318" rx="106" ry="10" fill="#000" opacity=".3"/>
<rect x="424" y="256" width="10" height="64" fill="#4a2a14" ${OL}/><rect x="568" y="256" width="10" height="64" fill="#4a2a14" ${OL}/>
<rect x="412" y="252" width="190" height="20" rx="2" fill="#6a3e1e" ${OL}/>
<polygon points="428,238 580,238 604,254 412,254" fill="url(#sbtop)" ${OL}/>
<path d="M434 242H576" stroke="#f0c486" stroke-width="1.4" opacity=".5"/>
<!-- lampa -->
<ellipse cx="560" cy="238" rx="16" ry="4" fill="#2a4a33" ${ol}/>
<path d="M560 236l-6 -26 14 -14" stroke="#c8a040" stroke-width="4" fill="none" stroke-linecap="round"/>
<path d="M556 186q16 -6 26 8l-12 12q-12 -2 -14 -20z" fill="#2f7a4a" ${OL}/>
<ellipse cx="572" cy="212" rx="40" ry="28" fill="url(#sbglow)"/>
<!-- hromádka dopisů -->
<rect x="444" y="226" width="40" height="12" fill="#f4eed8" ${ol}/><rect x="446" y="220" width="38" height="8" fill="#e8dfc0" ${ol} transform="rotate(-3 465 224)"/>
<rect x="448" y="214" width="34" height="8" fill="#f8f2dc" ${ol} transform="rotate(4 465 218)"/>
<!-- otevřená obálka s dopisem z obce -->
<path d="M490 236l14 -10 20 4 -2 12z" fill="#e8dcb4" ${ol}/>
<g transform="rotate(-6 508 218)">
  <rect x="488" y="198" width="50" height="38" fill="#fbf6e2" ${OL}/>
  <rect x="491" y="201" width="44" height="9" fill="#c43a2a"/>
  <text x="513" y="208" text-anchor="middle" font-family="Georgia, serif" font-size="5" font-weight="bold" fill="#fff">OBEC BRDÝMOV</text>
  <text x="513" y="217" text-anchor="middle" font-family="Georgia, serif" font-size="3.6" fill="#5a4a2a">starosta, Obecní úřad č. 1</text>
  <path d="M493 222h38M493 226h36M493 230h30" stroke="#8a7a5a" stroke-width="1.2"/>
  <ellipse cx="528" cy="228" rx="5" ry="3.4" fill="#c43a2a" opacity=".7"/>
</g>
<!-- lupa -->
<g transform="translate(466 232) rotate(-20)">
  <circle cx="0" cy="0" r="10" fill="#cfeaf2" opacity=".6" stroke="#8a6a2a" stroke-width="3"/>
  <path d="M7 7l12 12" stroke="#5a3a18" stroke-width="4.4" stroke-linecap="round"/>
  <path d="M-6 -4q2 -5 7 -6" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>
</g>
<!-- razítka -->
<g ${ol}>
  <rect x="534" y="228" width="12" height="9" rx="1.4" fill="#2a2a2a"/><rect x="537" y="217" width="6" height="12" rx="2" fill="#a8441e"/>
  <rect x="548" y="230" width="10" height="8" rx="1.4" fill="#2a2a2a"/><rect x="550" y="221" width="6" height="10" rx="2" fill="#a8441e"/>
</g>
<!-- hrnek -->
<rect x="418" y="224" width="16" height="15" rx="3" fill="#e9e9e9" ${OL}/><path d="M434 228q8 1 0 8" stroke="#3b2214" stroke-width="2" fill="none"/>
<path d="M423 220q-4 -8 1 -12M430 220q4 -8 -1 -12" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>
<!-- klika na stojánku -->
${knob(438, 216, 4.6)}
`;

/* ---------------- východ vpravo ---------------- */
const door = `
<polygon points="580,106 636,92 636,330 580,282" fill="#2f1c0e" ${OL}/>
<polygon points="588,116 628,106 628,318 588,278" fill="url(#sbdoor)" ${ol}/>
<polygon points="596,128 620,122 620,184 596,178" fill="#f4d890" opacity=".55" ${ol}/>
<path d="M608 125v57M596 152l24 -6" stroke="#4a2a12" stroke-width="2.4"/>
<polygon points="596,200 620,196 620,300 596,286" fill="#7a4a24" ${ol}/>
${knob(602, 224, 4.4, '#c8cdd2')}
<path d="M590 292L626 312" stroke="#000" stroke-width="6" opacity=".18"/>
`;

/* ---------------- Ctibor Kocour ---------------- */
const collector = `
<ellipse cx="330" cy="324" rx="50" ry="7" fill="#000" opacity=".3"/>
${person({
  x: 330,
  y: 324,
  s: 1.04,
  coat: '#f1eee2',
  pants: '#6a5a4a',
  hat: 'none',
  hairStyle: 'messy',
  hair: '#e8e8e8',
  glasses: true,
  nose: 1.4,
  mouth: 'open',
  brows: 'normal',
  skin: '#f2c29a',
  tie: '#7a3b8a',
})}
<!-- kapsy a nářadí v plášti -->
<g ${ol}>
  <rect x="338" y="212" width="19" height="15" rx="2" fill="#000" opacity=".1"/><rect x="338" y="212" width="19" height="15" rx="2" fill="none"/>
  <rect x="300" y="226" width="18" height="15" rx="2" fill="#000" opacity=".08"/><rect x="300" y="226" width="18" height="15" rx="2" fill="none"/>
  <rect x="340" y="238" width="19" height="13" rx="2" fill="#000" opacity=".08"/><rect x="340" y="238" width="19" height="13" rx="2" fill="none"/>
  <rect x="338" y="186" width="14" height="12" rx="2" fill="#000" opacity=".08"/><rect x="338" y="186" width="14" height="12" rx="2" fill="none"/>
</g>
<rect x="341" y="177" width="2.6" height="12" fill="#2a5aa8"/><rect x="345" y="175" width="2.6" height="14" fill="#c43a2a"/><rect x="349" y="178" width="2.6" height="11" fill="#2a8a4a"/>
<path d="M345 210l6 -9 3 2 -5 9z" fill="#9aa0a6" ${ol}/>
<path d="M346 237l3 -10 3 1 -2 10z" fill="#c8a040" ${ol}/>
<path d="M304 226q6 -8 12 -2" stroke="#8a8e94" stroke-width="3" fill="none" stroke-linecap="round"/>
<!-- klíče na šňůrce kolem krku -->
<path d="M322 176Q320 210 336 232" stroke="#7a5530" stroke-width="1.6" fill="none"/>
<circle cx="336" cy="234" r="4.4" fill="none" stroke="#9aa0a6" stroke-width="1.8"/>
${keyShape(333, 238, 12, '#c8a040')}${keyShape(339, 238, 9, '#8a8e94')}
<!-- klika jako vzácný exponát v ruce -->
<g transform="translate(370 234)">
  <circle cx="0" cy="0" r="14" fill="url(#sbglow)"/>
  <rect x="-3" y="2" width="6" height="12" fill="#b8902c" ${ol}/>
  <circle cx="0" cy="-3" r="9" fill="url(#sbbrass)" ${OL}/>
  <circle cx="-3" cy="-6" r="2.6" fill="#fffbe0" opacity=".9"/>
  <path d="M-14 -16l4 4M14 -18l-4 5M0 -23v6" stroke="#fff6b0" stroke-width="1.8" stroke-linecap="round"/>
</g>
`;

export default wrap(`
<defs>
  <linearGradient id="sbwall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a44"/><stop offset="1" stop-color="#5a4028"/></linearGradient>
  <pattern id="sbpat" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M13 3l8 10 -8 10 -8 -10z" fill="#000" opacity=".07"/><circle cx="0" cy="0" r="2" fill="#000" opacity=".06"/><circle cx="26" cy="26" r="2" fill="#000" opacity=".06"/></pattern>
  <linearGradient id="sbside" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a4a2c"/><stop offset="1" stop-color="#4a321c"/></linearGradient>
  <linearGradient id="sbfloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4626"/><stop offset="1" stop-color="#2c1a0c"/></linearGradient>
  <linearGradient id="sbtop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b87a40"/><stop offset="1" stop-color="#8a5628"/></linearGradient>
  <linearGradient id="sbdoor" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a6a38"/><stop offset="1" stop-color="#6a4220"/></linearGradient>
  <linearGradient id="sbvel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a2a2c" stop-opacity=".85"/><stop offset="1" stop-color="#2a1210" stop-opacity=".9"/></linearGradient>
  ${grad('sbwood', '#a26a36', false, 1.15, 0.7)}
  ${brass('sbbrass')}
  <radialGradient id="sbglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".6"/><stop offset=".5" stop-color="#ffc860" stop-opacity=".18"/><stop offset="1" stop-color="#ffc860" stop-opacity="0"/></radialGradient>
  <radialGradient id="sbglowfloor" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".22"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient>
  <radialGradient id="sbvig" cx=".5" cy=".5" r=".78"><stop offset=".5" stop-color="#1a0a02" stop-opacity="0"/><stop offset="1" stop-color="#1a0a02" stop-opacity=".62"/></radialGradient>
  ${noise('sbnoise')}
</defs>
${wall}
${cabinet}
${rightWall}
${ceiling}
${door}
${rug}
${crates}
${desk}
${collector}
<rect width="640" height="360" fill="url(#sbnoise)"/>
<rect width="640" height="360" fill="url(#sbvig)"/>
`);
