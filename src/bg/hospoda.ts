import { wrap, person, rep, noise, OL, ol } from '../art';

/**
 * HOSPODA U ROHLÍKU – vnitřek venkovské hospody.
 * Hotspoty (640x360): hospodsky (270,120,110,170), stamgasti (50,150,200,180),
 * tabule (440,50,130,100), pipy (390,170,90,80), vychod (580,110,60,210).
 */

/** Půllitr (základna v bodě x,y). */
const mug = (x: number, y: number, level = 1): string => `
<g transform="translate(${x} ${y})">
  <path d="M-7 -17h14l-1.6 17h-10.8z" fill="#e9b52a" ${ol}/>
  <path d="M-5.5 -17h4l-.8 17h-2.4z" fill="#fff3b0" opacity=".55"/>
  <path d="M-7 -17h14l-.3 ${-4 * level}h-13.4z" fill="#fffdf0" ${ol}/>
  <circle cx="-3" cy="${-19 - 2 * level}" r="3" fill="#fffdf0" ${ol}/><circle cx="3" cy="${-19 - 2 * level}" r="3.4" fill="#fffdf0" ${ol}/>
  <path d="M7 -13q8 0 7 6.5q-1 5 -7.4 4" fill="none" stroke="#3b2214" stroke-width="2.2" stroke-linecap="round"/>
</g>`;

const bottle = (x: number, y: number, c: string, h = 34): string => `
<g transform="translate(${x} ${y})">
  <path d="M-4.5 0V${-h * 0.55}Q-4.5 ${-h * 0.68} -2 ${-h * 0.76}V${-h}h4V${-h * 0.76}Q4.5 ${-h * 0.68} 4.5 ${-h * 0.55}V0z" fill="${c}" ${ol}/>
  <rect x="-4.5" y="${-h * 0.42}" width="9" height="${h * 0.22}" fill="#f4ead0" opacity=".9"/>
  <path d="M-3 ${-h * 0.5}V-3" stroke="#fff" stroke-width="1.2" opacity=".45"/>
</g>`;

const hospoda = wrap(`
<defs>
  <linearGradient id="hw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0c68c"/><stop offset="1" stop-color="#d9995c"/></linearGradient>
  <linearGradient id="hws" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bd7440"/><stop offset="1" stop-color="#9a5a30"/></linearGradient>
  <linearGradient id="hpan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6334"/><stop offset="1" stop-color="#6d4220"/></linearGradient>
  <linearGradient id="hbar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c98a47"/><stop offset=".5" stop-color="#b87a3c"/><stop offset="1" stop-color="#8f5628"/></linearGradient>
  <linearGradient id="hbart" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0a860"/><stop offset="1" stop-color="#a8692f"/></linearGradient>
  <linearGradient id="hfl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6c4426"/><stop offset="1" stop-color="#37220f"/></linearGradient>
  <linearGradient id="hdoor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6cf"/><stop offset="1" stop-color="#f1dd96"/></linearGradient>
  <linearGradient id="hchalk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34523f"/><stop offset="1" stop-color="#22382c"/></linearGradient>
  <linearGradient id="hstove" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4f9a6a"/><stop offset=".5" stop-color="#6cb886"/><stop offset="1" stop-color="#3a7a52"/></linearGradient>
  <radialGradient id="hglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff0a0" stop-opacity=".75"/><stop offset="1" stop-color="#fff0a0" stop-opacity="0"/></radialGradient>
  <radialGradient id="hvig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#2a1004" stop-opacity="0"/><stop offset="1" stop-color="#2a1004" stop-opacity=".5"/></radialGradient>
  <clipPath id="hfloor"><polygon points="0,238 580,238 640,300 640,360 0,360"/></clipPath>
  ${noise('hnoise')}
</defs>

<!-- zadní stěna, trámy, lambrusy -->
<rect width="580" height="240" fill="url(#hw)"/>
${rep(14, (i) => `<path d="M${i * 44 + 10} 20v150" stroke="#b9803f" stroke-width="1.2" opacity=".25"/>`)}
<rect width="640" height="18" fill="#4a2c14" ${ol}/>
<rect x="0" y="14" width="580" height="8" fill="#6a4020" ${ol}/>
<rect x="0" y="22" width="14" height="216" fill="#6a4020" ${ol}/>
<rect x="232" y="14" width="10" height="226" fill="#6a4020" ${ol}/>
<rect x="566" y="14" width="14" height="226" fill="#5a3418" ${ol}/>
<rect y="170" width="580" height="70" fill="url(#hpan)" ${OL}/>
${rep(29, (i) => `<path d="M${i * 20} 172v66" stroke="#3b2214" stroke-width="1.4" opacity=".55"/>`)}
<rect y="166" width="580" height="8" fill="#c28a4c" ${ol}/>

<!-- boční stěna s dveřmi -->
<polygon points="580,16 640,0 640,300 580,240" fill="url(#hws)" ${ol}/>
<polygon points="594,86 632,74 632,298 594,258" fill="#4a2c14" ${OL}/>
<polygon points="599,92 628,83 628,288 599,254" fill="url(#hdoor)"/>
<path d="M599 240l29 38v10l-29-34z" fill="#8fc26a" opacity=".8"/>
<path d="M599 215q10-18 29-30v-70l-29 8z" fill="#9fd4ef" opacity=".7"/>
<path d="M600 160q8-10 16-4q6-10 12-6" stroke="#6ea255" stroke-width="3" fill="none" opacity=".7"/>
<polygon points="594,258 632,298 640,300 600,260" fill="#f2dfa0" opacity=".5"/>
<circle cx="596" cy="176" r="2.6" fill="#f0c860" ${ol}/>

<!-- podlaha -->
<polygon points="0,238 580,238 640,300 640,360 0,360" fill="url(#hfl)"/>
<g clip-path="url(#hfloor)">
  ${rep(11, (i) => `<path d="M${i * 62 - 20} 238L${i * 98 - 170} 360" stroke="#1d1209" stroke-width="1.6" opacity=".55"/>`)}
  <path d="M0 270h640M0 308h640M0 340h640" stroke="#1d1209" stroke-width="1.4" opacity=".35"/>
  <ellipse cx="150" cy="332" rx="90" ry="12" fill="#f4d79a" opacity=".12"/>
  <ellipse cx="330" cy="268" rx="40" ry="5" fill="#f4d79a" opacity=".08"/>
  <ellipse cx="380" cy="344" rx="22" ry="4" fill="#2a160a" opacity=".5"/>
  ${rep(10, (i) => `<circle cx="${40 + ((i * 53) % 540)}" cy="${300 + ((i * 29) % 54)}" r="1.6" fill="#e8c890" opacity=".5"/>`)}
</g>
<path d="M0 238H580L640 300" stroke="#2d1a0a" stroke-width="1.6" fill="none"/>

<!-- kachlová kamna -->
<rect x="2" y="104" width="44" height="134" rx="4" fill="url(#hstove)" ${OL}/>
${rep(4, (r) => rep(2, (c) => `<rect x="${6 + c * 19}" y="${110 + r * 22}" width="17" height="18" rx="2" fill="none" stroke="#2d5a3e" stroke-width="1.4"/><path d="M${8 + c * 19} ${113 + r * 22}h8" stroke="#a8e0bc" stroke-width="1.6" opacity=".6"/>`))}
<rect x="2" y="96" width="44" height="10" rx="3" fill="#3a7a52" ${OL}/>
<rect x="14" y="196" width="20" height="26" rx="3" fill="#2a2a2a" ${ol}/><path d="M17 205h14M17 212h14" stroke="#e8602a" stroke-width="2.4" opacity=".8"/>
<rect x="18" y="60" width="10" height="40" fill="#555" ${ol}/>

<!-- trofej, hodiny, obrázky -->
<path d="M120 100q-14-10-12-34M120 100q-4-22 2-38M118 74q-12 2-18-8M122 80q-8-2-12-12M154 100q14-10 12-34M154 100q4-22-2-38M156 74q12 2 18-8M152 80q8-2 12-12" stroke="#e6d4a8" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M120 100q-14-10-12-34M154 100q14-10 12-34" stroke="#3b2214" stroke-width="1.4" fill="none" opacity=".5"/>
<ellipse cx="137" cy="112" rx="18" ry="22" fill="#a8764a" ${OL}/>
<ellipse cx="137" cy="124" rx="9" ry="7" fill="#d9b890" ${ol}/><circle cx="137" cy="124" r="2.6" fill="#2a1a10"/>
<circle cx="129" cy="106" r="3" fill="#2a1a10"/><circle cx="145" cy="106" r="3" fill="#2a1a10"/>
<ellipse cx="121" cy="98" rx="5" ry="9" fill="#8a5a36" ${ol} transform="rotate(-24 121 98)"/><ellipse cx="153" cy="98" rx="5" ry="9" fill="#8a5a36" ${ol} transform="rotate(24 153 98)"/>
<path d="M120 138h34l-4 14h-26z" fill="#e4b868" ${OL}/><text x="137" y="149" text-anchor="middle" font-family="Georgia, serif" font-size="7" fill="#4a2c0a">1987</text>
<circle cx="208" cy="62" r="17" fill="#f6ecd0" ${OL}/><path d="M208 62V50M208 62l8 4" stroke="#3b2214" stroke-width="2.2" stroke-linecap="round"/><circle cx="208" cy="62" r="1.8" fill="#3b2214"/>
${rep(12, (i) => `<path d="M${208 + Math.sin((i * Math.PI) / 6) * 14} ${62 - Math.cos((i * Math.PI) / 6) * 14}L${208 + Math.sin((i * Math.PI) / 6) * 16} ${62 - Math.cos((i * Math.PI) / 6) * 16}" stroke="#3b2214" stroke-width="1.2"/>`)}
<rect x="60" y="62" width="40" height="52" fill="#d9a05a" ${OL}/><rect x="65" y="67" width="30" height="42" fill="#c6dfe8"/>
<path d="M65 109V92Q80 80 95 90V109z" fill="#6aae6a"/><circle cx="82" cy="78" r="5" fill="#ffe27a"/>

<!-- police s lahvemi za barem -->
<rect x="246" y="36" width="190" height="8" fill="#6b4a2a" ${OL}/>
<rect x="246" y="88" width="190" height="8" fill="#6b4a2a" ${OL}/>
<rect x="252" y="44" width="178" height="44" fill="#000" opacity=".1"/>
${rep(11, (i) => bottle(260 + i * 16, 88, ['#3a8a4a', '#8a3a2a', '#e0b13a', '#2f5f9a', '#a8603a', '#4a7a4a'][i % 6], 28 + (i % 3) * 3))}
${rep(9, (i) => bottle(266 + i * 18, 36, ['#c23b3b', '#3a6a9a', '#e8d070', '#6a4a8a'][i % 4], 22 + (i % 2) * 4))}
<rect x="246" y="96" width="190" height="14" fill="#4a2c14" opacity=".2"/>

<!-- křídová tabule: jídelní lístek -->
<rect x="440" y="48" width="132" height="102" rx="3" fill="#8a5a2e" ${OL}/>
<rect x="447" y="55" width="118" height="88" fill="url(#hchalk)" ${ol}/>
<g font-family="Segoe Print, Bradley Hand, Comic Sans MS, cursive" fill="#f4f1e6">
  <text x="506" y="71" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffe27a">DNES NABÍZÍME</text>
  <path d="M458 75h96" stroke="#f4f1e6" stroke-width="1" opacity=".6" stroke-dasharray="3 3"/>
  <text x="456" y="88" font-size="10">PIVO ............ 9 Kč</text>
  <text x="456" y="101" font-size="10">PÁREK ......... 7 Kč</text>
  <text x="456" y="114" font-size="10">ŘÍZEK – DNES NE</text>
  <text x="456" y="128" font-size="10">ROHLÍK –</text>
  <text x="503" y="128" font-size="10" fill="#ffd0c0">ZADARMO</text>
  <path d="M502 125h50" stroke="#ff8a6a" stroke-width="2"/>
  <text x="506" y="139" text-anchor="middle" font-size="7" fill="#c8d8c0">(i pivo bylo zadarmo, jednou)</text>
</g>

<!-- závěsné lampy -->
<path d="M150 18V46M380 18V30" stroke="#2a1a10" stroke-width="2"/>
<ellipse cx="150" cy="90" rx="90" ry="90" fill="url(#hglow)"/>
<path d="M132 58Q150 36 168 58z" fill="#3f8a5a" ${OL}/><ellipse cx="150" cy="62" rx="20" ry="4" fill="#fff0a0" ${ol}/>
<ellipse cx="400" cy="110" rx="90" ry="76" fill="url(#hglow)"/>
<path d="M366 40Q380 22 394 40z" fill="#b8302b" ${OL}/><ellipse cx="380" cy="44" rx="14" ry="3" fill="#fff0a0" ${ol}/>

<!-- stolek štamgastů + štamgasti -->
<ellipse cx="150" cy="342" rx="130" ry="9" fill="#000" opacity=".24"/>
<g transform="rotate(-6 88 300)">${person({ x: 88, y: 312, s: 0.78, hat: 'beret', hatColor: '#3a5a9a', hairStyle: 'short', hair: '#8a8a8a', coat: '#6a8a5a', pants: '#4a4a5a', skin: '#f0a888', redNose: true, brows: 'sad', mouth: 'open', nose: 1.25, tired: true, stubble: true })}</g>
<g transform="rotate(9 152 300)">${person({ x: 152, y: 314, s: 0.76, hat: 'cap', hatColor: '#8a3a2a', hatTilt: 12, mustache: true, hair: '#4a3a2a', coat: '#8a7a5a', pants: '#3a3a4a', skin: '#e8a888', redNose: true, brows: 'sad', mouth: 'flat', nose: 1.1, tired: true })}</g>
${person({ x: 218, y: 314, s: 0.8, flip: true, hairStyle: 'bald', beard: true, hair: '#6a5a4a', coat: '#a85a3a', pants: '#3a4a6a', skin: '#f2b090', belly: 8, redNose: true, brows: 'sad', mouth: 'open', nose: 1.3, tired: true })}
<path d="M30 262h232l18 20H12z" fill="url(#hbart)" ${OL}/>
<rect x="22" y="282" width="236" height="10" fill="#8a5a2e" ${OL}/>
<rect x="34" y="292" width="10" height="46" fill="#6d4220" ${OL}/><rect x="246" y="292" width="10" height="46" fill="#6d4220" ${OL}/>
<rect x="44" y="318" width="202" height="6" fill="#5a3418" ${ol}/>
${mug(70, 272, 1)}${mug(116, 276, 0.4)}${mug(178, 274, 1)}${mug(229, 272, 0.7)}${mug(128, 266, 0.2)}
<ellipse cx="206" cy="268" rx="11" ry="3.4" fill="#9aa4a8" ${ol}/><path d="M200 266l12-2" stroke="#f4f4f4" stroke-width="2.6"/>
<path d="M192 258q-4-10 2-14t0-12" stroke="#ddd" stroke-width="2" fill="none" opacity=".55"/>
<ellipse cx="100" cy="272" rx="14" ry="4" fill="#f4f1e6" ${ol}/><path d="M92 270h14" stroke="#c8602a" stroke-width="2.6"/>
<rect x="150" y="268" width="14" height="9" fill="#fffdf0" ${ol} transform="rotate(-12 157 272)"/><rect x="158" y="270" width="14" height="9" fill="#f3e9c8" ${ol} transform="rotate(8 165 274)"/>
<text x="152" y="242" text-anchor="middle" font-family="Segoe Print, Comic Sans MS, cursive" font-size="13" fill="#6b4a2a" opacity=".9">Z z z . . .</text>

<!-- HOSPODSKÝ Lojza za pultem -->
${person({ x: 322, y: 296, s: 0.95, hat: 'none', hairStyle: 'bald', hair: '#b09070', mustache: true, belly: 16, apron: '#f4f1e6', coat: '#8a3a2a', pants: '#3a3a4a', skin: '#f0a888', redNose: true, brows: 'normal', mouth: 'smile', nose: 1.2 })}
${mug(358, 227, 0.8)}
<path d="M346 216q-9 7 -5 18l11-2z" fill="#f6f6f2" ${ol}/>

<!-- pult -->
<rect x="240" y="226" width="342" height="14" rx="2" fill="url(#hbart)" ${OL}/>
<path d="M246 230H576" stroke="#f0c486" stroke-width="1.6" opacity=".7"/>
<rect x="244" y="240" width="334" height="76" fill="url(#hbar)" ${OL}/>
${rep(16, (i) => `<path d="M${262 + i * 20} 242v72" stroke="#3b2214" stroke-width="1.5" opacity=".5"/>`)}
<rect x="244" y="240" width="334" height="8" fill="#000" opacity=".12"/>
<path d="M248 296H574" stroke="#e8c14a" stroke-width="5" stroke-linecap="round"/><path d="M248 294H574" stroke="#fff4b0" stroke-width="1.6" opacity=".7"/>
<ellipse cx="410" cy="330" rx="150" ry="9" fill="#000" opacity=".22"/>

<!-- výčep s pipami -->
<rect x="398" y="206" width="8" height="20" fill="#d9a84a" ${ol}/><rect x="466" y="206" width="8" height="20" fill="#d9a84a" ${ol}/>
<rect x="396" y="198" width="80" height="9" rx="4" fill="#e8c14a" ${OL}/><path d="M400 201h72" stroke="#fff4b0" stroke-width="1.6" opacity=".7"/>
${[
  [418, '#c23b3b'],
  [436, '#3a8a4a'],
  [454, '#e8c14a'],
]
  .map(
    ([x, c]) => `<rect x="${(x as number) - 2.5}" y="206" width="5" height="12" fill="#d9a84a" ${ol}/>
<rect x="${(x as number) - 4}" y="215" width="8" height="5" rx="2" fill="#b8862e" ${ol}/>
<path d="M${x} 198V176" stroke="#c8c8c8" stroke-width="5" stroke-linecap="round"/><ellipse cx="${x}" cy="172" rx="6" ry="9" fill="${c}" ${OL}/><path d="M${(x as number) - 2} 169v6" stroke="#fff" stroke-width="1.6" opacity=".6"/>`,
  )
  .join('')}
<rect x="404" y="224" width="64" height="3" fill="#5a5a5a" ${ol}/>

<!-- barové stoličky -->
${[480, 548]
  .map(
    (x) => `<ellipse cx="${x}" cy="340" rx="14" ry="4" fill="#000" opacity=".25"/>
<path d="M${x - 2} 304V338M${x - 12} 348l12-8 12 8" stroke="#555" stroke-width="3.4" fill="none" stroke-linecap="round"/>
<ellipse cx="${x}" cy="304" rx="17" ry="6" fill="#b8302b" ${OL}/><path d="M${x - 13} 304q13 8 26 0v5q-13 8-26 0z" fill="#8a2420" ${ol}/>`,
  )
  .join('')}

<rect width="640" height="360" fill="url(#hnoise)"/>
<rect width="640" height="360" fill="url(#hvig)"/>
`);

export default hospoda;
