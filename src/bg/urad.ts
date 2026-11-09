import { wrap, person, carpet, rep, noise, OL, ol } from '../art';

/**
 * OBECNÍ ÚŘAD – kancelář starosty Pelikána.
 * Hotspoty (640x360): starosta (270,100,120,190), upominky (160,200,100,50),
 * model (40,60,170,130), vychod (580,110,60,210).
 */

/** Upomínka / složenka (x,y = levý horní roh). */
const bill = (x: number, y: number, rot: number, word: string): string => `
<g transform="rotate(${rot} ${x + 18} ${y + 12})">
  <rect x="${x}" y="${y}" width="36" height="24" fill="#f8f1dc" ${ol}/>
  <rect x="${x}" y="${y}" width="36" height="6" fill="#c8302b"/>
  <text x="${x + 18}" y="${y + 5}" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="4.6" fill="#fff">UPOMÍNKA</text>
  <text x="${x + 18}" y="${y + 15}" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="6.4" fill="#c8302b">${word}</text>
  <path d="M${x + 4} ${y + 19}h28" stroke="#9a8a6a" stroke-width="1"/>
</g>`;

const urad = wrap(`
<defs>
  <linearGradient id="uw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7e29a"/><stop offset="1" stop-color="#e2bb6c"/></linearGradient>
  <linearGradient id="uws" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cf9c52"/><stop offset="1" stop-color="#a97a3a"/></linearGradient>
  <linearGradient id="upan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a30"/><stop offset="1" stop-color="#5a3818"/></linearGradient>
  <linearGradient id="udesk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a6234"/><stop offset=".5" stop-color="#b57a44"/><stop offset="1" stop-color="#7a4a22"/></linearGradient>
  <linearGradient id="udeskt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9a05a"/><stop offset="1" stop-color="#9a6232"/></linearGradient>
  <linearGradient id="ucar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f6a52"/><stop offset="1" stop-color="#1c4434"/></linearGradient>
  <linearGradient id="uchair" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3f8a6a"/><stop offset="1" stop-color="#245a42"/></linearGradient>
  <linearGradient id="usky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ec0ee"/><stop offset="1" stop-color="#e8f4fa"/></linearGradient>
  <linearGradient id="ugold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#d9a020"/></linearGradient>
  <radialGradient id="uglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff2a8" stop-opacity=".75"/><stop offset="1" stop-color="#fff2a8" stop-opacity="0"/></radialGradient>
  <radialGradient id="uvig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#3a2008" stop-opacity="0"/><stop offset="1" stop-color="#3a2008" stop-opacity=".45"/></radialGradient>
  <clipPath id="ufloor"><polygon points="0,240 580,240 640,300 640,360 0,360"/></clipPath>
  ${noise('unoise')}
</defs>

<!-- zadní stěna -->
<rect width="580" height="242" fill="url(#uw)"/>
${rep(21, (i) => `<rect x="${i * 28}" y="0" width="14" height="178" fill="#c8a050" opacity=".13"/>`)}
<rect y="176" width="580" height="66" fill="url(#upan)" ${OL}/>
${rep(7, (i) => `<rect x="${12 + i * 82}" y="186" width="64" height="46" rx="2" fill="#7a4a26" ${ol}/><path d="M${18 + i * 82} 190h52" stroke="#a87a48" stroke-width="1.6" opacity=".8"/>`)}
<rect y="171" width="580" height="8" fill="#c9985a" ${ol}/>
<rect width="640" height="10" fill="#6a4020" ${ol}/>

<!-- boční stěna a dveře -->
<polygon points="580,16 640,0 640,300 580,240" fill="url(#uws)" ${ol}/>
<polygon points="594,86 632,74 632,298 594,258" fill="#5a3418" ${OL}/>
<polygon points="599,92 627,84 627,286 599,252" fill="#8a5a2e" ${ol}/>
<polygon points="604,100 622,95 622,150 604,155" fill="#d7ecd6" opacity=".8" ${ol}/>
<text x="613" y="130" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="5" fill="#3a4a3a" transform="rotate(-9 613 128)">VÝCHOD</text>
<circle cx="600" cy="196" r="3" fill="#f0c860" ${ol}/>
<polygon points="580,240 640,300 640,306 580,246" fill="#4a2c14" opacity=".5"/>

<!-- podlaha: zelený koberec -->
<polygon points="0,240 580,240 640,300 640,360 0,360" fill="url(#ucar)"/>
<g clip-path="url(#ufloor)">${carpet(0, 640, 242, 360, '#58a07e')}
  <polygon points="290,242 430,242 560,360 180,360" fill="#fff2b0" opacity=".08"/>
</g>
<path d="M0 240H580L640 300" stroke="#1c1408" stroke-width="1.6" fill="none"/>

<!-- stropní lampa -->
<path d="M330 10V40" stroke="#3a2a14" stroke-width="2"/>
<ellipse cx="330" cy="86" rx="150" ry="70" fill="url(#uglow)"/>
<path d="M308 56Q330 28 352 56z" fill="url(#ugold)" ${OL}/><ellipse cx="330" cy="58" rx="22" ry="4" fill="#fff6c0" ${ol}/>

<!-- plakát / model Brdýmov – město budoucnosti (vlevo) -->
<rect x="38" y="62" width="168" height="130" rx="2" fill="#5a3418" ${OL}/>
<rect x="44" y="68" width="156" height="118" fill="url(#usky)" ${ol}/>
<path d="M44 152Q90 124 130 142T200 134V186H44z" fill="#6ab85a"/>
<path d="M44 168Q100 148 160 164T200 158V186H44z" fill="#4a9a44"/>
<path d="M60 130q40-50 80 0" stroke="#e8543a" stroke-width="3" fill="none"/><path d="M64 130q36-44 72 0" stroke="#ffd23a" stroke-width="3" fill="none"/><path d="M68 130q32-38 64 0" stroke="#4aa84a" stroke-width="3" fill="none"/><path d="M72 130q28-32 56 0" stroke="#3aa8e0" stroke-width="3" fill="none"/>
${rep(5, (i) => `<rect x="${140 + i * 11}" y="${108 - (i % 3) * 12}" width="9" height="${46 + (i % 3) * 12}" fill="${['#a8c8e8', '#8ab0d8', '#c8d8f0'][i % 3]}" ${ol}/><path d="M${142 + i * 11} ${112 - (i % 3) * 12}h5M${142 + i * 11} ${122 - (i % 3) * 12}h5" stroke="#fff" stroke-width="1.2"/>`)}
<g transform="translate(66 144)">
  <rect x="0" y="-8" width="28" height="12" rx="2" fill="url(#ugold)" ${ol}/>
  <rect x="4" y="-18" width="14" height="10" fill="#ffe27a" ${ol}/><rect x="7" y="-16" width="8" height="6" fill="#9fd4ef"/>
  <path d="M20 -10L36 -30L46 -22" stroke="#d9a020" stroke-width="4" fill="none" stroke-linejoin="round"/>
  <path d="M44 -22l8 4l-4 8z" fill="#d9a020" ${ol}/>
  <circle cx="6" cy="6" r="5" fill="#2a2a2a" ${ol}/><circle cx="22" cy="6" r="5" fill="#2a2a2a" ${ol}/>
</g>
<rect x="44" y="68" width="156" height="20" fill="#2f5fa8" opacity=".9"/>
<text x="122" y="82" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="9.4" fill="#ffe27a" letter-spacing=".5">BRDÝMOV – MĚSTO BUDOUCNOSTI</text>
<text x="122" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-size="6" fill="#fff" stroke="#2a5a22" stroke-width=".4">Zde vyroste: zlatý bagr, mrakodrap a vodovod.</text>
<rect x="44" y="68" width="156" height="118" fill="#fff" opacity=".06"/>

<!-- vlajky a portrét -->
<rect x="262" y="26" width="5" height="212" fill="#6a4020" ${ol}/><circle cx="264" cy="24" r="4.4" fill="url(#ugold)" ${ol}/>
<g><path d="M262 34L212 40Q214 62 212 84L262 80z" fill="#f4f4f4" ${OL}/><path d="M262 59L213 62Q214 74 212 84L262 80z" fill="#d9302b" ${OL}/><path d="M262 34L224 62L262 80z" fill="#1f4a9a" ${OL}/></g>
<rect x="394" y="26" width="5" height="212" fill="#6a4020" ${ol}/><circle cx="396" cy="24" r="4.4" fill="url(#ugold)" ${ol}/>
<g><path d="M399 34L450 40Q448 62 450 84L399 80z" fill="#2f5fa8" ${OL}/><path d="M410 70q12-30 28-12q-6 16 -28 12z" fill="url(#ugold)" ${ol}/></g>
<ellipse cx="330" cy="62" rx="32" ry="38" fill="#a8762e" ${OL}/>
<ellipse cx="330" cy="62" rx="27" ry="33" fill="#d9ccaa" ${ol}/>
<ellipse cx="330" cy="58" rx="12" ry="15" fill="#e4b890"/><path d="M318 52q12-14 24 0q-12-4-24 0z" fill="#9a9a9a"/><path d="M308 96q22 -22 44 0v-6q-22-20 -44 0z" fill="#2a3a5a"/><path d="M326 80l4 10 4-10z" fill="#f4f4f4"/>
<circle cx="326" cy="58" r="1.4" fill="#2a1a10"/><circle cx="335" cy="58" r="1.4" fill="#2a1a10"/>

<!-- městský znak -->
<g transform="translate(0 -12)">
<path d="M468 46h72v50q0 28-36 40q-36-12-36-40z" fill="#2f5fa8" ${OL}/>
<path d="M480 94q10-26 24-14q14-12 24 14q-24 -8 -48 0z" fill="url(#ugold)" ${ol}/>
<path d="M480 100q24 -8 48 0q-24 8 -48 0" fill="url(#ugold)" ${ol} opacity=".0"/>
<path d="M476 112q8-6 14 0t14 0t14 0t10 0" stroke="#9fd4ef" stroke-width="2.4" fill="none"/>
<path d="M476 122q8-6 14 0t14 0t14 0t10 0" stroke="#9fd4ef" stroke-width="2.4" fill="none"/>
<path d="M498 58l6-8l6 8l6-8l6 8z" fill="url(#ugold)" ${ol}/>
</g>

<!-- příborník s archivem a rostlinou -->
<rect x="470" y="168" width="100" height="76" fill="url(#udesk)" ${OL}/>
<rect x="476" y="176" width="42" height="60" fill="#8a5a2e" ${ol}/><rect x="522" y="176" width="42" height="60" fill="#8a5a2e" ${ol}/>
<circle cx="514" cy="206" r="2.8" fill="#f0c860" ${ol}/><circle cx="526" cy="206" r="2.8" fill="#f0c860" ${ol}/>
<rect x="466" y="162" width="108" height="9" fill="url(#udeskt)" ${OL}/>
${rep(7, (i) => `<rect x="${478 + i * 13}" y="${130 + (i % 2) * 3}" width="11" height="${32 - (i % 2) * 3}" fill="${['#7a2b2b', '#2b4a7a', '#2f6b3a', '#8a6a1e'][i % 4]}" ${ol}/><path d="M${480 + i * 13} ${136 + (i % 2) * 3}h7" stroke="#f4e8c0" stroke-width="1.2"/>`)}
<rect x="502" y="186" width="40" height="11" fill="#f0d890" ${ol}/><text x="522" y="194.6" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="6.4" fill="#6a4a1a">ARCHIV</text>

<!-- ŽIDLE starosty -->
<path d="M276 232V146Q276 110 330 110Q384 110 384 146V232z" fill="url(#uchair)" ${OL}/>
<path d="M288 232V150Q288 124 330 124Q372 124 372 150V232z" fill="#2f7a58" opacity=".7"/>
${rep(3, (i) => `<circle cx="${294 + i * 36}" cy="142" r="2" fill="#e0b060"/>`)}

<!-- STAROSTA Pelikán -->
${person({ x: 330, y: 296, s: 1.0, coat: '#6a707a', pants: '#3a3e4a', tie: '#b8262e', hairStyle: 'short', hair: '#1f1a16', skin: '#f0b488', glasses: true, medals: false, brows: 'sad', mouth: 'frown', nose: 1.05, tired: false })}
<path d="M314 154Q330 192 348 154" stroke="#e8c14a" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M314 154Q330 192 348 154" stroke="#fff4b0" stroke-width="1" fill="none" opacity=".6"/>
<circle cx="331" cy="184" r="7" fill="url(#ugold)" ${OL}/><path d="M327 184q4-6 8 0q-4 4-8 0z" fill="#fff4b0"/>
<path d="M300 120q4 10 0 14q-4-4 0-14zM358 116q4 10 0 14q-4-4 0-14zM354 142q3 8 0 11q-3-3 0-11z" fill="#bfe4f6" ${ol}/>
<g transform="rotate(-10 366 210)"><rect x="354" y="204" width="22" height="14" fill="#fff" ${ol}/><path d="M358 208h14M358 212h10" stroke="#c8d8e8" stroke-width="1.2"/></g>

<!-- psací stůl -->
<ellipse cx="326" cy="326" rx="190" ry="10" fill="#000" opacity=".26"/>
<rect x="146" y="224" width="360" height="16" rx="3" fill="url(#udeskt)" ${OL}/>
<path d="M152 229H500" stroke="#f0c486" stroke-width="1.6" opacity=".7"/>
<rect x="150" y="240" width="352" height="82" fill="url(#udesk)" ${OL}/>
<rect x="160" y="250" width="110" height="62" fill="#8a5a2e" ${ol}/><rect x="382" y="250" width="110" height="62" fill="#8a5a2e" ${ol}/>
<rect x="282" y="250" width="88" height="62" fill="#4a2c14" opacity=".5" ${ol}/>
<path d="M170 262h90M170 282h90M392 262h90M392 282h90" stroke="#5a3418" stroke-width="1.8"/>
<circle cx="215" cy="272" r="3.4" fill="#f0c860" ${ol}/><circle cx="437" cy="272" r="3.4" fill="#f0c860" ${ol}/>
<rect x="150" y="240" width="352" height="7" fill="#000" opacity=".14"/>

<!-- hromada upomínek -->
<g>
  <rect x="166" y="212" width="52" height="14" fill="#f6efd8" ${ol}/>
  <rect x="170" y="206" width="52" height="10" fill="#efe6c8" ${ol} transform="rotate(-3 196 211)"/>
  <rect x="174" y="200" width="46" height="8" fill="#f8f1dc" ${ol} transform="rotate(4 197 204)"/>
  <rect x="166" y="212" width="52" height="3" fill="#c8302b"/><rect x="170" y="206" width="52" height="3" fill="#c8302b" transform="rotate(-3 196 211)"/>
  ${bill(200, 194, -6, 'VODA')}
  ${bill(222, 206, 12, 'ELEKTŘINA')}
  ${bill(160, 202, -14, 'PLYN')}
  <circle cx="190" cy="199" r="7" fill="none" stroke="#c8302b" stroke-width="2" opacity=".85"/>
  <text x="190" y="201.4" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="5.4" fill="#c8302b" transform="rotate(-10 190 200)">DLUH</text>
</g>

<!-- ostatní věci na stole -->
<rect x="296" y="214" width="68" height="12" rx="2" fill="url(#ugold)" ${OL}/>
<text x="330" y="223.4" text-anchor="middle" font-family="Georgia, serif" font-size="5.4" font-weight="bold" fill="#4a2c0a">Ing. PELIKÁN, STAROSTA</text>
<rect x="418" y="208" width="18" height="18" rx="3" fill="#2a4a6a" ${ol}/>${rep(3, (i) => `<path d="M${424 + i * 4} 208l${-2 + i}-14" stroke="${['#c23b3b', '#2a2a2a', '#2f5fa8'][i]}" stroke-width="1.8"/>`)}
<path d="M456 226V204l12-10" stroke="#9a7a2a" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="456" cy="226" rx="14" ry="4" fill="#b8962e" ${ol}/><path d="M464 188l22 8l-8 12l-18-8z" fill="#d9a020" ${OL}/>
<ellipse cx="474" cy="206" rx="22" ry="14" fill="url(#uglow)" opacity=".6"/>
<rect x="388" y="214" width="14" height="12" rx="3" fill="#8a3a2a" ${ol}/><rect x="386" y="210" width="18" height="5" rx="2" fill="#c8302b" ${ol}/>

<!-- koš plný složenek a uschlá palma -->
<ellipse cx="116" cy="338" rx="26" ry="5" fill="#000" opacity=".25"/>
<path d="M94 296h44l-6 42h-32z" fill="#7a8a8c" ${OL}/>
${rep(4, (i) => `<path d="M${102 + i * 9} 298v38" stroke="#5a6a6c" stroke-width="1.2"/>`)}
<circle cx="104" cy="292" r="8" fill="#f4eed8" ${ol}/><circle cx="118" cy="288" r="9" fill="#efe6c8" ${ol}/><circle cx="130" cy="293" r="7" fill="#f6efd8" ${ol}/>
<path d="M98 290h12M114 285h14" stroke="#c8302b" stroke-width="2"/>
<ellipse cx="52" cy="340" rx="30" ry="6" fill="#000" opacity=".24"/>
<path d="M30 300h44l-6 40h-32z" fill="#c26a2a" ${OL}/><rect x="26" y="292" width="52" height="10" rx="2" fill="#d98238" ${OL}/>
<path d="M52 294q-26 -30 -22 -60M52 294q-4 -42 20 -66M52 294q30 -22 38 -52" stroke="#9a8a3a" stroke-width="6" fill="none" stroke-linecap="round"/>
<path d="M30 234q-8 10 -2 14M72 228q10 4 8 14M90 242q8 6 4 12" stroke="#7a6a2a" stroke-width="5" fill="none" stroke-linecap="round"/>

<rect width="640" height="360" fill="url(#unoise)"/>
<rect width="640" height="360" fill="url(#uvig)"/>
`);

export default urad;
