import { wrap, rep, grad, noise, OL, ol } from '../art';

/**
 * Dvorek sběratele Ctibora Kocoura, odpoledne. Dům vpravo, plot vzadu,
 * vlevo otevřená branka zpět do městečka.
 *
 * Hotspoty (pevné souřadnice):
 *  pes (70,220,130,110) · dvere (400,130,100,170) · schranka (560,190,50,80)
 *  hromada (230,210,140,100) · vychod (0,140,50,200)
 */

const sky = `
<rect width="640" height="240" fill="url(#dsky)"/>
<circle cx="116" cy="54" r="46" fill="url(#dsun)"/>
<circle cx="116" cy="54" r="20" fill="#fff4b8"/>
<g opacity=".95">
  <ellipse cx="248" cy="64" rx="48" ry="14" fill="#fff" ${ol}/><ellipse cx="276" cy="52" rx="30" ry="13" fill="#fff" ${ol}/><ellipse cx="226" cy="56" rx="22" ry="10" fill="#fff" ${ol}/>
  <ellipse cx="470" cy="46" rx="40" ry="12" fill="#fff8ec" ${ol}/><ellipse cx="494" cy="37" rx="24" ry="10" fill="#fff8ec" ${ol}/>
</g>
<path d="M0 176Q70 130 150 158T300 150T440 164T640 140V240H0z" fill="#9dbf86" opacity=".9"/>
<path d="M0 196Q90 160 190 184T380 176T640 172V240H0z" fill="#7fa86a"/>
${rep(11, (i) => `<g transform="translate(${20 + i * 58} ${176 + ((i * 13) % 14)})"><rect x="-2" y="0" width="4" height="16" fill="#6b4a2a"/><circle cx="0" cy="-6" r="${13 + (i % 3) * 3}" fill="${i % 2 ? '#4f9a4c' : '#5fae58'}"/><circle cx="-4" cy="-10" r="6" fill="#7fc874" opacity=".7"/></g>`)}
<!-- kostelní věž daleko -->
<rect x="300" y="132" width="16" height="48" fill="#e8dcb8" ${ol}/><path d="M297 132l11 -26 11 26z" fill="#a44a34" ${ol}/>
<path d="M176 162h46v26h-46z" fill="#d8b890" ${ol}/><path d="M172 162l27 -18 27 18z" fill="#b25a3c" ${ol}/>
`;

/* ---------------- plot vzadu ---------------- */
const fence = `
<rect x="54" y="206" width="330" height="5" fill="#7a5530" ${ol}/>
<rect x="54" y="228" width="330" height="5" fill="#7a5530" ${ol}/>
${rep(24, (i) => {
  const x = 56 + i * 13.7;
  const h = 40 + ((i * 7) % 9) - (i % 5 === 0 ? 8 : 0);
  const col = ['#c89a5e', '#bd8f54', '#d3a66a', '#b98a4e'][i % 4];
  return `<path d="M${x} 242V${242 - h}l5.5 -7 5.5 7V242z" fill="${col}" ${ol}/><path d="M${x + 2} ${236 - h}V240" stroke="#fff" stroke-width="1" opacity=".25"/>`;
})}
<ellipse cx="220" cy="242" rx="170" ry="4" fill="#000" opacity=".18"/>
<!-- slunečnice u plotu -->
${[
  [246, 150],
  [290, 164],
  [352, 154],
]
  .map(
    ([x, y]) => `
<path d="M${x} 244V${y}" stroke="#4a8a3a" stroke-width="3"/>
<path d="M${x} 214q-16 -4 -20 -14q14 -2 20 10zM${x} 224q14 -4 18 -14q-14 -2 -18 10z" fill="#4a9a40" ${ol}/>
${rep(12, (i) => `<ellipse cx="${x}" cy="${y - 12}" rx="3.4" ry="8" fill="#f2c21a" ${ol} transform="rotate(${i * 30} ${x} ${y})"/>`)}
<circle cx="${x}" cy="${y}" r="8" fill="#6a3d1a" ${ol}/><circle cx="${(x as number) - 2}" cy="${(y as number) - 2}" r="3" fill="#8a5a2a" opacity=".7"/>`,
  )
  .join('')}
`;

/* ---------------- otevřená branka vlevo ---------------- */
const gate = `
<path d="M0 252Q30 264 62 276L34 296Q16 292 0 292z" fill="#d6b27a" opacity=".9"/>
<rect x="38" y="168" width="14" height="86" fill="#8a6038" ${OL}/><path d="M36 168l9 -10 9 10z" fill="#a47a48" ${ol}/>
<path d="M38 196L6 210V268L38 252z" fill="#c8985c" ${OL}/>
<path d="M38 214L6 226M38 234L6 246" stroke="#8a6038" stroke-width="3"/>
<path d="M6 210V268" stroke="#6f4a28" stroke-width="3"/>
<ellipse cx="46" cy="256" rx="22" ry="4" fill="#000" opacity=".2"/>
<path d="M0 200h26v-18l12 -12v30" fill="#d9b88a" opacity=".6"/>
`;

/* ---------------- dům sběratele ---------------- */
const house = `
<rect x="368" y="84" width="272" height="212" fill="url(#dwall)" ${OL}/>
<rect x="368" y="268" width="272" height="28" fill="#8a6a48" ${OL}/>
${rep(11, (i) => `<path d="M${368 + i * 26} 268v28" stroke="#6d5238" stroke-width="1.4"/>`)}
<ellipse cx="540" cy="112" rx="30" ry="12" fill="#cdb97a" opacity=".7"/><ellipse cx="404" cy="236" rx="26" ry="14" fill="#cdb97a" opacity=".6"/>
<path d="M388 100l12 6 -2 12 -10 -4zM596 244l16 4 -4 14 -14 -6z" fill="#c4ad6c" opacity=".7"/>
<path d="M348 96L494 20H640V96z" fill="url(#droof)" ${OL}/>
<g clip-path="url(#droofclip)">
${rep(6, (i) => `<path d="M340 ${86 - i * 12}H640" stroke="#6a2a1c" stroke-width="1.6" opacity=".55"/>`)}
${rep(26, (i) => `<path d="M${350 + i * 12} 92l6 -14" stroke="#6a2a1c" stroke-width="1.2" opacity=".35"/>`)}
</g>
<rect x="344" y="92" width="296" height="8" fill="#7a4a2a" ${OL}/>
<rect x="566" y="0" width="30" height="46" fill="#b25a3c" ${OL}/><rect x="562" y="-2" width="38" height="8" fill="#8a3e2a" ${ol}/>
<path d="M580 -2q-12 -14 -2 -26" stroke="#e6e6e6" stroke-width="7" fill="none" opacity=".55" stroke-linecap="round"/>
<rect x="516" y="122" width="68" height="66" fill="#f4ead0" ${OL}/>
<rect x="522" y="128" width="56" height="54" fill="#8fc6e8" ${ol}/>
<path d="M550 128v54M522 155h56" stroke="#f4ead0" stroke-width="4"/>
<path d="M524 130l16 12M562 160l12 16" stroke="#fff" stroke-width="2" opacity=".6"/>
<rect x="500" y="124" width="14" height="62" fill="#4a7a5a" ${OL}/><rect x="586" y="124" width="14" height="62" fill="#4a7a5a" ${OL}/>
<path d="M505 130h4M505 140h4M505 150h4M591 130h4M591 140h4M591 150h4" stroke="#335a42" stroke-width="2"/>
<rect x="512" y="188" width="76" height="12" fill="#8a5a30" ${OL}/>
${rep(7, (i) => `<circle cx="${520 + i * 10}" cy="186" r="5" fill="${['#e8456a', '#ffd24a', '#ff8a3a', '#f06a9a'][i % 4]}" ${ol}/><path d="M${520 + i * 10} 192v-4" stroke="#3a8a3a" stroke-width="2"/>`)}
<rect x="398" y="288" width="98" height="12" fill="#b3a68c" ${OL}/>
<rect x="404" y="136" width="88" height="154" rx="2" fill="#f0e4c0" ${OL}/>
<rect x="412" y="144" width="72" height="146" rx="34" ry="30" fill="url(#ddoor)" ${OL}/>
<path d="M448 144V290M412 214H484" stroke="#4a2c14" stroke-width="2.4"/>
<rect x="420" y="168" width="22" height="34" rx="4" fill="#5e3a1c" ${ol}/><rect x="454" y="168" width="22" height="34" rx="4" fill="#5e3a1c" ${ol}/>
<rect x="420" y="226" width="22" height="52" rx="4" fill="#5e3a1c" ${ol}/><rect x="454" y="226" width="22" height="52" rx="4" fill="#5e3a1c" ${ol}/>
<g>
  <circle cx="434" cy="244" r="7" fill="#e0b040" ${OL}/><circle cx="432" cy="242" r="2.4" fill="#fff3b0"/>
  <path d="M462 212h20q6 0 6 6t-6 6h-20z" fill="#9aa4aa" ${OL}/><circle cx="465" cy="218" r="4" fill="#6a7278" ${ol}/>
  <circle cx="470" cy="262" r="9" fill="#c9a888" ${OL}/><circle cx="470" cy="262" r="4" fill="#8a5a3a" ${ol}/>
  <rect x="424" y="262" width="8" height="14" rx="3" fill="#c47a3a" ${ol}/>
</g>
<rect x="404" y="106" width="88" height="22" rx="3" fill="#6a4a2a" ${OL}/>
<text x="448" y="116" text-anchor="middle" font-family="Georgia, serif" font-size="7.4" font-weight="bold" fill="#fff0c0">C. KOCOUR</text>
<text x="448" y="125" text-anchor="middle" font-family="Georgia, serif" font-size="7.4" fill="#fff0c0">– SBĚRATEL –</text>
<path d="M412 106v-6M484 106v-6" stroke="#3b2214" stroke-width="1.6"/>
<rect x="410" y="300" width="76" height="12" rx="3" fill="#8a3a2a" ${ol}/><path d="M416 306h64" stroke="#d8a070" stroke-width="2" stroke-dasharray="6 4"/>
<ellipse cx="450" cy="314" rx="62" ry="5" fill="#000" opacity=".16"/>
`;

/* ---------------- poštovní schránka ---------------- */
const mailbox = `
<rect x="580" y="214" width="8" height="84" fill="#6a4a2a" ${OL}/>
<ellipse cx="584" cy="298" rx="14" ry="4" fill="#000" opacity=".2"/>
<path d="M560 196Q560 188 584 188Q610 188 610 196V220H560z" fill="#d0432e" ${OL}/>
<path d="M566 194Q584 190 604 194" stroke="#f08a70" stroke-width="3" fill="none" opacity=".7"/>
<rect x="562" y="206" width="46" height="4" fill="#8a2a1c" opacity=".5"/>
<rect x="606" y="180" width="3" height="20" fill="#f0c030" ${ol}/><rect x="606" y="176" width="12" height="8" fill="#f0c030" ${ol}/>
<rect x="560" y="226" width="52" height="38" rx="2" fill="#f4ecc8" ${OL}/>
<text x="586" y="236" text-anchor="middle" font-family="Arial, sans-serif" font-size="5.2" font-weight="bold" fill="#a11">NEVHAZOVAT</text>
<text x="586" y="243" text-anchor="middle" font-family="Arial, sans-serif" font-size="5.2" font-weight="bold" fill="#a11">REKLAMU.</text>
<text x="586" y="251" text-anchor="middle" font-family="Arial, sans-serif" font-size="5.2" font-weight="bold" fill="#a11">NEVHAZOVAT</text>
<text x="586" y="258" text-anchor="middle" font-family="Arial, sans-serif" font-size="5.2" font-weight="bold" fill="#a11">NIC.</text>
<path d="M564 228v-4M608 228v-4" stroke="#3b2214" stroke-width="1.4"/>
`;

/* ---------------- hromada železa ---------------- */
const junk = `
<ellipse cx="300" cy="308" rx="84" ry="10" fill="#000" opacity=".25"/>
<path d="M240 292Q244 268 276 266L330 268Q356 270 358 292Q300 304 240 292z" fill="#9aa8ae" ${OL}/>
<path d="M252 278Q300 270 346 278" stroke="#d8e4e8" stroke-width="3" fill="none" opacity=".7"/>
<path d="M258 296l-4 10M340 296l4 10" stroke="#5a5a5a" stroke-width="4" stroke-linecap="round"/>
<g stroke="#3b2214" stroke-width="1.6">
<rect x="232" y="258" width="104" height="12" rx="6" fill="#a8603a" transform="rotate(-14 232 258)"/>
<rect x="250" y="240" width="96" height="10" rx="5" fill="#8a4e30" transform="rotate(22 250 240)"/>
<rect x="278" y="226" width="80" height="11" rx="5" fill="#b87040" transform="rotate(-34 278 226)"/>
</g>
<circle cx="266" cy="284" r="27" fill="none" stroke="#7a3a22" stroke-width="7"/>
<circle cx="266" cy="284" r="27" fill="none" stroke="#3b2214" stroke-width="1.6"/>
<circle cx="266" cy="284" r="5" fill="#a8603a" ${ol}/>
${rep(8, (i) => `<path d="M266 284L${266 + Math.cos((i * Math.PI) / 4) * 25} ${284 + Math.sin((i * Math.PI) / 4) * 25}" stroke="#a8603a" stroke-width="2"/>`)}
<rect x="326" y="244" width="30" height="30" rx="4" fill="#8a4a2a" ${OL}/><rect x="330" y="250" width="22" height="14" fill="#4a2a18" ${ol}/>
<path d="M322 240h38l-4 8h-30z" fill="#b8703c" ${ol}/>
<path d="M300 232h24l-3 20h-18z" fill="#6a7a8a" ${OL}/><ellipse cx="312" cy="232" rx="12" ry="3.4" fill="#2a3a4a" ${ol}/>
<path d="M300 233q12 -12 24 0" stroke="#3b2214" stroke-width="1.6" fill="none"/>
<g transform="translate(340 282)">
  <path d="M-12 22q-2 -26 12 -28t12 28z" fill="#3a6ab8" ${OL}/>
  <circle cx="0" cy="-12" r="9" fill="#f4c4a0" ${OL}/>
  <path d="M-10 -8q10 20 20 0q-2 14 -10 16q-8 -2 -10 -16z" fill="#f4f4f4" ${ol}/>
  <path d="M-11 -14q11 -30 22 0z" fill="#d0262a" ${OL}/>
  <circle cx="-3" cy="-13" r="1.7" fill="#111"/><circle cx="4" cy="-13" r="1.7" fill="#111"/>
  <ellipse cx="0.5" cy="-9" rx="2.8" ry="2.2" fill="#e68a6a" ${ol}/>
  <path d="M-12 -8l-9 12M12 -8l12 8" stroke="#3a6ab8" stroke-width="4" stroke-linecap="round"/>
  <path d="M24 8l8 -18" stroke="#8a5a2a" stroke-width="2.4"/><circle cx="33" cy="-12" r="3.6" fill="#8a5a2a" ${ol}/>
</g>
${rep(9, (i) => `<rect x="${236 + i * 15}" y="${302 + (i % 3) * 2}" width="6" height="3" fill="#7a3a22" transform="rotate(${i * 21} ${236 + i * 15} 303)"/>`)}
`;

/* ---------------- bouda + pes ---------------- */
const dog = `
<ellipse cx="124" cy="326" rx="86" ry="9" fill="#000" opacity=".25"/>
<path d="M96 262L148 214L204 262z" fill="#9a4430" ${OL}/>
<path d="M96 262L148 214L204 262" fill="none" stroke="#e8a080" stroke-width="2" opacity=".4"/>
<rect x="104" y="260" width="92" height="62" fill="#b8844c" ${OL}/>
${rep(5, (i) => `<path d="M104 ${272 + i * 11}H196" stroke="#8a5a30" stroke-width="1.4"/>`)}
<path d="M128 322V290Q150 266 172 290V322z" fill="#1e120a" ${OL}/>
<path d="M134 316V294Q150 276 166 294" fill="none" stroke="#3a2214" stroke-width="3" opacity=".7"/>
<rect x="104" y="238" width="86" height="19" rx="2" fill="#f0e4b8" ${OL} transform="rotate(-2 148 248)"/>
<text x="148" y="248" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="8.4" fill="#b21e1e" transform="rotate(-2 148 248)">POZOR – PES (ZLÝ)</text>
<path d="M110 240l3 -6M184 236l3 -6" stroke="#3b2214" stroke-width="1.6"/>
<path d="M104 312Q96 334 78 328Q70 322 72 308" stroke="#8a8a92" stroke-width="3" fill="none" stroke-dasharray="4 2"/>
<ellipse cx="176" cy="326" rx="16" ry="5" fill="#cf3a2a" ${OL}/><ellipse cx="176" cy="324" rx="12" ry="3.4" fill="#e0a860"/>
<path d="M186 320l24 4" stroke="#f4ecd8" stroke-width="4" stroke-linecap="round"/><circle cx="185" cy="318" r="3" fill="#f4ecd8"/><circle cx="211" cy="326" r="3" fill="#f4ecd8"/>
<path d="M150 296Q174 280 168 262" stroke="#7a4a22" stroke-width="12" fill="none" stroke-linecap="round"/>
<path d="M150 296Q174 280 168 262" stroke="#9a6430" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>
<ellipse cx="136" cy="318" rx="13" ry="9" fill="#6a3e1a" ${OL}/>
<path d="M70 292Q74 262 112 262Q154 262 158 294Q160 316 140 322H84Q66 316 70 292z" fill="url(#dfur)" ${OL}/>
<path d="M82 270l-6 6 6 2 -4 7 8 -2 0 8M104 266l-4 7 7 1 -5 6 8 0M126 268l-5 6 7 1" stroke="#5a3214" stroke-width="1.6" fill="none"/>
<path d="M82 300q-2 20 -2 22h20q2 -2 -2 -22z" fill="#8a5428" ${OL}/>
<path d="M108 300q-2 20 -2 22h20q2 -2 -2 -22z" fill="#9a602e" ${OL}/>
<path d="M80 318h20M106 318h20" stroke="#4a2a14" stroke-width="1.6"/>
<path d="M68 284q10 12 30 -4" stroke="#c43a2a" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="82" cy="294" r="4.4" fill="#e8c040" ${ol}/>
<path d="M60 262Q56 238 80 232Q104 230 108 256Q112 280 92 288Q68 290 60 262z" fill="url(#dfur)" ${OL}/>
<path d="M66 238Q48 236 48 262Q56 272 70 254z" fill="#5a3214" ${OL}/>
<path d="M100 236Q120 238 116 264Q106 270 98 252z" fill="#5a3214" ${OL}/>
<path d="M58 262Q50 270 56 280Q70 292 92 286Q100 278 94 266z" fill="#c4966a" ${OL}/>
<path d="M60 276Q76 288 94 280" stroke="#4a1a14" stroke-width="2.4" fill="none"/>
<path d="M62 276l3 7 4 -5 4 7 4 -6 4 6 3 -6" fill="#fff" stroke="#3b2214" stroke-width="1.2"/>
<path d="M70 282Q76 300 86 290Q84 282 78 280z" fill="#f06a7a" ${ol}/>
<ellipse cx="55" cy="264" rx="7" ry="5.4" fill="#2a1a12" ${ol}/><ellipse cx="53" cy="262" rx="2" ry="1.4" fill="#fff" opacity=".7"/>
<circle cx="74" cy="250" r="8" fill="#fff" ${ol}/><circle cx="76" cy="253" r="3.4" fill="#111"/>
<circle cx="94" cy="252" r="7" fill="#fff" ${ol}/><circle cx="92" cy="249" r="3" fill="#111"/>
<path d="M64 240l18 6M102 240l-10 10" stroke="#3a2010" stroke-width="3.4" stroke-linecap="round"/>
<circle cx="96" cy="234" r="1.6" fill="#222"/><path d="M96 232l6 -8" stroke="#222" stroke-width=".8" stroke-dasharray="2 2"/>
`;

/* ---------------- popředí ---------------- */
const fore = `
<path d="M0 334Q60 322 120 332T260 334T400 330T540 336T640 330V360H0z" fill="#8a6a3c" opacity=".55"/>
${rep(26, (i) => `<path d="M${(i * 53) % 640} ${340 + ((i * 11) % 18)}l-4 -12M${(i * 53) % 640} ${340 + ((i * 11) % 18)}l2 -14M${(i * 53) % 640} ${340 + ((i * 11) % 18)}l7 -10" stroke="#4a8a38" stroke-width="2.2" stroke-linecap="round"/>`)}
${[
  [30, 344, '#ffd24a'],
  [196, 350, '#fff'],
  [358, 346, '#f06a9a'],
  [528, 352, '#ffd24a'],
  [608, 340, '#fff'],
]
  .map(([x, y, c]) => `<path d="M${x} ${y}v-12" stroke="#3a8a3a" stroke-width="2"/><circle cx="${x}" cy="${(y as number) - 14}" r="4.4" fill="${c}" ${ol}/><circle cx="${x}" cy="${(y as number) - 14}" r="1.6" fill="#e08a1a"/>`)
  .join('')}
<ellipse cx="478" cy="336" rx="34" ry="9" fill="#2a2a2e" ${OL}/><ellipse cx="478" cy="332" rx="34" ry="9" fill="#3e3e44" ${OL}/><ellipse cx="478" cy="332" rx="16" ry="4" fill="#cfa86a"/>
`;

export default wrap(`
<defs>
  <linearGradient id="dsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6aa8e0"/><stop offset=".7" stop-color="#cfe6f4"/><stop offset="1" stop-color="#f8ecc8"/></linearGradient>
  <radialGradient id="dsun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff3a8" stop-opacity=".95"/><stop offset="1" stop-color="#fff3a8" stop-opacity="0"/></radialGradient>
  <linearGradient id="dgrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8cc060"/><stop offset=".5" stop-color="#6fa84e"/><stop offset="1" stop-color="#a08a4c"/></linearGradient>
  <clipPath id="droofclip"><path d="M348 96L494 20H640V96z"/></clipPath>
  ${grad('dwall', '#e6d6a0', true, 1.08, 0.78)}
  ${grad('droof', '#b2503a', true, 1.15, 0.7)}
  ${grad('ddoor', '#8a5a30', false, 1.1, 0.72)}
  <linearGradient id="dfur" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b87a3c"/><stop offset="1" stop-color="#6e4018"/></linearGradient>
  <radialGradient id="dvig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#3a2008" stop-opacity="0"/><stop offset="1" stop-color="#3a2008" stop-opacity=".38"/></radialGradient>
  ${noise('dnoise')}
</defs>
${sky}
<rect y="238" width="640" height="122" fill="url(#dgrass)"/>
${fence}
<path d="M0 262C60 276 130 290 220 300S400 316 470 306L520 300L540 360H0z" fill="#c9a46c" opacity=".55"/>
${gate}
${house}
${junk}
${dog}
${mailbox}
${fore}
<rect width="640" height="360" fill="url(#dnoise)"/>
<rect width="640" height="360" fill="url(#dvig)"/>
`);
