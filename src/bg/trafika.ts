import { wrap, person, carpet, rep, noise, OL, ol } from '../art';

/**
 * TRAFIKA paní Dvořáčkové.
 * Hotspoty (640x360): pani (250,110,130,180), kavovar (460,150,100,120),
 * noviny (40,60,170,200), lizatka (400,70,70,60), vychod (580,110,60,210).
 */

/** Noviny/časopis: x,y = levý horní roh, w x h. */
const paper = (x: number, y: number, w: number, h: number, band: string, title: string, tilt = 0): string => `
<g transform="rotate(${tilt} ${x + w / 2} ${y + h})">
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f6efd8" ${ol}/>
  <rect x="${x}" y="${y}" width="${w}" height="${h * 0.3}" fill="${band}" ${ol}/>
  <text x="${x + w / 2}" y="${y + h * 0.22}" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="${Math.min(8, w / 6.2)}" fill="#fff">${title}</text>
  <rect x="${x + 3}" y="${y + h * 0.38}" width="${w * 0.42}" height="${h * 0.3}" fill="#c9b894" opacity=".8"/>
  <path d="M${x + w * 0.52} ${y + h * 0.42}h${w * 0.4}M${x + w * 0.52} ${y + h * 0.52}h${w * 0.4}M${x + w * 0.52} ${y + h * 0.62}h${w * 0.3}M${x + 3} ${y + h * 0.78}h${w - 6}M${x + 3} ${y + h * 0.88}h${w - 12}" stroke="#7a6a50" stroke-width=".9" opacity=".7"/>
</g>`;

const jar = (x: number, y: number, colors: string[]): string => `
<g transform="translate(${x} ${y})">
  <rect x="-10" y="-34" width="20" height="34" rx="4" fill="#dff1f4" opacity=".6" ${ol}/>
  ${colors.map((c, i) => `<path d="M${-5 + (i % 3) * 5} ${-8 - (i % 2) * 10}l${-3 + (i % 2) * 6} -18" stroke="#f4f1e6" stroke-width="1.4"/><circle cx="${-5 + (i % 3) * 5}" cy="${-8 - (i % 2) * 10}" r="4.4" fill="${c}" ${ol}/>`).join('')}
  <rect x="-11" y="-40" width="22" height="7" rx="2" fill="#d9a84a" ${ol}/>
</g>`;

const trafika = wrap(`
<defs>
  <linearGradient id="tw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f9d9a4"/><stop offset="1" stop-color="#eab878"/></linearGradient>
  <linearGradient id="tws" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d99a62"/><stop offset="1" stop-color="#b87844"/></linearGradient>
  <linearGradient id="ttile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#63b0a0"/><stop offset="1" stop-color="#3f8a7c"/></linearGradient>
  <linearGradient id="twood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c98a47"/><stop offset=".5" stop-color="#b87a3c"/><stop offset="1" stop-color="#8f5628"/></linearGradient>
  <linearGradient id="twoodt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0a860"/><stop offset="1" stop-color="#a8692f"/></linearGradient>
  <linearGradient id="tfl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bd5b3e"/><stop offset="1" stop-color="#8a3a26"/></linearGradient>
  <linearGradient id="tglass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eaf8fa" stop-opacity=".65"/><stop offset="1" stop-color="#bfe0e6" stop-opacity=".35"/></linearGradient>
  <linearGradient id="tcof" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d9433a"/><stop offset=".5" stop-color="#ef6a5a"/><stop offset="1" stop-color="#a82a24"/></linearGradient>
  <linearGradient id="tdoor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6efff"/><stop offset="1" stop-color="#9ccf9a"/></linearGradient>
  <radialGradient id="tlight" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbd0" stop-opacity=".7"/><stop offset="1" stop-color="#fffbd0" stop-opacity="0"/></radialGradient>
  <radialGradient id="tvig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#3a1a08" stop-opacity="0"/><stop offset="1" stop-color="#3a1a08" stop-opacity=".42"/></radialGradient>
  <clipPath id="tfloor"><polygon points="0,240 580,240 640,300 640,360 0,360"/></clipPath>
  ${noise('tnoise')}
</defs>

<!-- zadní stěna -->
<rect width="580" height="242" fill="url(#tw)"/>
${rep(22, (i) => `<rect x="${i * 28}" y="0" width="14" height="178" fill="#c88a50" opacity=".1"/>`)}
<rect y="176" width="580" height="66" fill="url(#ttile)" ${OL}/>
${rep(21, (i) => `<path d="M${i * 28} 178v62" stroke="#2f6e62" stroke-width="1.2" opacity=".55"/>`)}
<path d="M0 208h580M0 226h580" stroke="#2f6e62" stroke-width="1.2" opacity=".5"/>
<rect y="172" width="580" height="8" fill="#e8d4a0" ${ol}/>

<!-- boční stěna a dveře -->
<polygon points="580,16 640,0 640,300 580,240" fill="url(#tws)" ${ol}/>
<polygon points="594,86 632,74 632,298 594,258" fill="#5a3418" ${OL}/>
<polygon points="599,92 627,84 627,200 599,208" fill="url(#tdoor)" ${ol}/>
<polygon points="599,214 627,206 627,288 599,254" fill="#a06a36" ${ol}/>
<path d="M606 102q8-6 14-2M604 150q6 10 18 0" stroke="#fff" stroke-width="3" opacity=".55" fill="none"/>
<circle cx="598" cy="206" r="2.8" fill="#f0c860" ${ol}/>
<g transform="rotate(-8 612 160)"><rect x="602" y="136" width="22" height="16" rx="2" fill="#d9302b" ${OL}/><text x="613" y="147" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="4.4" fill="#fff">OTEVŘENO</text></g>
<path d="M594 74q12-8 26-14" stroke="#e8c14a" stroke-width="4" fill="none"/><circle cx="612" cy="68" r="4" fill="#e8c14a" ${ol}/>

<!-- podlaha: linoleum -->
<polygon points="0,240 580,240 640,300 640,360 0,360" fill="url(#tfl)"/>
<g clip-path="url(#tfloor)">${carpet(0, 640, 242, 360, '#f4d9a8')}
  <polygon points="250,244 440,244 520,360 150,360" fill="#fff6c8" opacity=".1"/>
</g>
<path d="M0 240H580L640 300" stroke="#3a1c0c" stroke-width="1.6" fill="none"/>

<!-- zářivka -->
<rect x="210" y="10" width="230" height="10" rx="4" fill="#f4f4f4" ${OL}/>
<rect x="216" y="13" width="218" height="4" rx="2" fill="#fffde0"/>
<ellipse cx="325" cy="60" rx="190" ry="70" fill="url(#tlight)"/>
<path d="M230 10v-10M420 10v-10" stroke="#555" stroke-width="1.6"/>

<!-- stojan s novinami (vlevo) -->
<rect x="104" y="36" width="94" height="22" rx="3" fill="#d9302b" ${OL}/>
<text x="151" y="46" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="8.6" fill="#fff" letter-spacing=".6">NOVINY • ČASOPISY</text>
<text x="151" y="55" text-anchor="middle" font-family="Arial, sans-serif" font-size="6.4" fill="#ffe27a">LOSY • DÁLNIČNÍ ZNÁMKY</text>
<rect x="38" y="60" width="170" height="204" rx="3" fill="#a8692f" ${OL}/>
<rect x="44" y="66" width="158" height="192" fill="#7a4620" ${ol}/>
${rep(4, (r) => `<rect x="42" y="${100 + r * 42}" width="162" height="6" fill="url(#twoodt)" ${ol}/>`)}
${paper(48, 70, 44, 30, '#c23b3b', 'ROHLÍK PRYČ?!', -3)}${paper(95, 71, 42, 29, '#2f5fa8', 'BLESK', 2)}${paper(140, 70, 44, 30, '#e8a020', 'SLEVA PÁREK', -2)}
${paper(48, 112, 44, 30, '#2f8a4f', 'ZLATO V ROHLÍKU', 2)}${paper(95, 113, 42, 29, '#7a3a8a', 'KŘÍŽOVKY', -3)}${paper(140, 112, 44, 30, '#c23b3b', 'DRB TÝDNE', 3)}
${paper(48, 154, 44, 30, '#2f5fa8', 'AUTO MOTO', -2)}${paper(95, 155, 42, 29, '#e8a020', 'TV TÝDEN', 2)}${paper(140, 154, 44, 30, '#2f8a4f', 'ZAHRADA', -3)}
${paper(48, 196, 44, 30, '#c23b3b', 'PLAYBOY?', 3)}${paper(95, 197, 42, 29, '#7a3a8a', 'HORÓSKOP', -2)}${paper(140, 196, 44, 30, '#2f5fa8', 'RYBÁŘ', 2)}
<rect x="48" y="232" width="150" height="26" fill="#d9b070" ${ol}/>
${rep(5, (i) => `<rect x="${52 + i * 29}" y="${236 - (i % 2) * 3}" width="24" height="${20 + (i % 2) * 3}" fill="${['#c23b3b', '#2f5fa8', '#e8a020', '#2f8a4f', '#7a3a8a'][i]}" ${ol}/>`)}
<ellipse cx="123" cy="268" rx="90" ry="7" fill="#000" opacity=".2"/>

<!-- regály za pultem -->
<rect x="212" y="36" width="260" height="8" fill="url(#twoodt)" ${OL}/>
<rect x="212" y="78" width="260" height="8" fill="url(#twoodt)" ${OL}/>
<rect x="212" y="126" width="260" height="8" fill="url(#twoodt)" ${OL}/>
<rect x="216" y="44" width="252" height="34" fill="#000" opacity=".08"/>
${rep(20, (i) => `<rect x="${220 + i * 12}" y="${48 + (i % 3)}" width="10" height="${28 - (i % 3)}" fill="${['#c23b3b', '#2f5fa8', '#e8c14a', '#2f8a4f', '#f4f1e6'][i % 5]}" ${ol}/><path d="M${222 + i * 12} ${52 + (i % 3)}h6" stroke="#fff" stroke-width="1.2" opacity=".6"/>`)}
${rep(6, (i) => `<rect x="${222 + i * 28}" y="${92}" width="22" height="32" fill="${['#e8a020', '#c23b3b', '#2f8a4f'][i % 3]}" ${ol}/><circle cx="${233 + i * 28}" cy="108" r="6" fill="#f6efd8" ${ol}/>`)}
${jar(412, 126, ['#e8532a', '#ffd23a', '#4aa84a', '#a05ac8', '#ff7aa8', '#3aa8e0'])}
${jar(436, 126, ['#ffd23a', '#e8532a', '#ff7aa8', '#4aa84a', '#3aa8e0', '#a05ac8'])}
${jar(460, 126, ['#4aa84a', '#a05ac8', '#e8532a', '#ffd23a', '#ff7aa8', '#3aa8e0'])}
<g transform="rotate(-3 440 70)"><rect x="404" y="52" width="66" height="14" rx="2" fill="#ffe27a" ${OL}/><text x="437" y="62.6" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="7.4" fill="#c2301f">LÍZÁTKA 1 Kč</text></g>
<rect x="212" y="134" width="260" height="8" fill="#000" opacity=".12"/>

<!-- kalendář a plakát -->
<rect x="480" y="38" width="86" height="104" fill="#f8f0d8" ${OL}/>
<rect x="480" y="38" width="86" height="18" fill="#c23b3b" ${ol}/><text x="523" y="51" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="11" fill="#fff">SRPEN 1999</text>
<path d="M494 112q12-26 24-8q10-14 22 6" fill="#e8a840" stroke="#8a5a1e" stroke-width="1.4"/>
<path d="M486 72h74v36h-74z" fill="#a9d6a0" opacity=".6"/><circle cx="548" cy="82" r="6" fill="#ffd23a"/>
<path d="M494 124h58M494 132h58" stroke="#8a7a60" stroke-width="1" stroke-dasharray="3 2"/>

<!-- PANÍ DVOŘÁČKOVÁ -->
<g transform="rotate(7 315 296)">${person({ x: 312, y: 296, s: 0.95, dress: true, apron: '#f4efd8', coat: '#c25a6a', skin: '#efc09a', hairStyle: 'bun', hair: '#8a7a6a', glasses: true, nose: 1.3, mouth: 'open', brows: 'normal' })}</g>

<!-- pult s vitrínou -->
<ellipse cx="330" cy="326" rx="140" ry="9" fill="#000" opacity=".24"/>
<rect x="206" y="226" width="248" height="14" rx="2" fill="url(#twoodt)" ${OL}/>
<path d="M212 230H448" stroke="#f0c486" stroke-width="1.6" opacity=".7"/>
<rect x="208" y="240" width="244" height="78" fill="url(#twood)" ${OL}/>
<rect x="216" y="246" width="228" height="62" fill="#e9d6a8" ${ol}/>
${rep(3, (r) => rep(15, (c) => `<rect x="${220 + c * 15}" y="${250 + r * 18}" width="12" height="15" fill="${['#c23b3b', '#2f5fa8', '#e8c14a', '#2f8a4f', '#f4f1e6', '#7a3a8a'][(r * 5 + c) % 6]}" ${ol}/><path d="M${222 + c * 15} ${253 + r * 18}h8" stroke="#fff" stroke-width="1" opacity=".5"/>`))}
<rect x="216" y="246" width="228" height="62" fill="url(#tglass)"/>
<path d="M216 300L440 252" stroke="#fff" stroke-width="2" opacity=".4"/>
<rect x="208" y="308" width="244" height="10" fill="#6d4220" ${ol}/>

<!-- pokladna, kočka, drobnosti na pultu -->
<g>
  <rect x="236" y="204" width="52" height="22" rx="3" fill="#8a8a82" ${OL}/>
  <rect x="242" y="190" width="40" height="18" rx="2" fill="#bdbdb4" ${OL}/><rect x="246" y="194" width="32" height="8" fill="#f4e9a8" ${ol}/>
  <text x="262" y="200.6" text-anchor="middle" font-family="monospace" font-size="6.4" fill="#2a2a2a">20,00</text>
  ${rep(4, (i) => `<rect x="${241 + i * 10}" y="210" width="8" height="6" rx="1.4" fill="#e8e8e0" ${ol}/>`)}
  <rect x="244" y="217" width="36" height="6" rx="1" fill="#6a6a60" ${ol}/>
</g>
<g transform="translate(404 226)">
  <ellipse cx="0" cy="-8" rx="21" ry="10" fill="#e8923a" ${OL}/>
  <circle cx="14" cy="-14" r="9" fill="#e8923a" ${OL}/>
  <path d="M10 -22l-2 -6 6 3zM18 -22l2 -6 -6 3z" fill="#e8923a" ${ol}/>
  <path d="M10 -15q3 2 5 0M17 -15q3 2 5 0" stroke="#3b2214" stroke-width="1.4" fill="none" stroke-linecap="round"/>
  <path d="M-18 -8q-14 -2 -8 8" stroke="#e8923a" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M-8 -16q4 2 8 0M-2 -18q4 2 8 0" stroke="#b86a1a" stroke-width="1.6" fill="none"/>
  <text x="18" y="-26" font-family="Segoe Print, Comic Sans MS, cursive" font-size="8" fill="#6b4a2a">z</text>
</g>
<rect x="320" y="216" width="36" height="10" fill="#f6efd8" ${ol}/><rect x="324" y="210" width="36" height="8" fill="#e8dec0" ${ol} transform="rotate(4 340 214)"/>

<!-- kávovar -->
<ellipse cx="510" cy="316" rx="62" ry="7" fill="#000" opacity=".24"/>
<rect x="455" y="262" width="110" height="10" rx="2" fill="url(#twoodt)" ${OL}/>
<rect x="462" y="272" width="8" height="42" fill="#6d4220" ${ol}/><rect x="550" y="272" width="8" height="42" fill="#6d4220" ${ol}/>
<rect x="466" y="152" width="88" height="110" rx="6" fill="url(#tcof)" ${OL}/>
<rect x="472" y="140" width="76" height="14" rx="4" fill="#c8c8c8" ${OL}/>
${rep(5, (i) => `<path d="M${480 + i * 2} ${126 + i * 2}h${-2 + 0}l2 14h-4z" fill="#f4f4f4"/>`)}
<path d="M482 140l-3 -24h20l-3 24z" fill="#f4f4f4" ${ol}/><path d="M482 130h14M481 122h16" stroke="#c8c8c8" stroke-width="1.4"/>
<rect x="480" y="158" width="62" height="18" rx="2" fill="#ffe27a" ${ol}/>
<text x="511" y="171" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="9" fill="#3a1a08">KÁVA 20 Kč</text>
${rep(6, (i) => `<circle cx="${486 + (i % 3) * 13}" cy="${186 + Math.floor(i / 3) * 12}" r="4.4" fill="${['#f4f4f4', '#ffd23a', '#7ab8e8', '#f4f4f4', '#ffd23a', '#3aa84a'][i]}" ${ol}/>`)}
<rect x="528" y="182" width="12" height="22" rx="2" fill="#2a2a2a" ${ol}/><rect x="531" y="186" width="6" height="2.4" fill="#f4e9a8"/>
<rect x="480" y="210" width="62" height="42" rx="3" fill="#2a1a10" ${ol}/>
<rect x="480" y="210" width="62" height="42" rx="3" fill="url(#tglass)" opacity=".35"/>
<rect x="506" y="214" width="10" height="9" fill="#9a9a9a" ${ol}/>
<path d="M511 224v8" stroke="#6a3a1a" stroke-width="2.4"/>
<path d="M500 252l2 -18h18l2 18z" fill="#fffdf0" ${ol}/><ellipse cx="511" cy="235" rx="9" ry="2" fill="#6a3a1a"/>
<path d="M504 226q-4 -8 1 -14t-1 -12M516 226q4 -8 -1 -14t1 -12" stroke="#fff" stroke-width="2.2" fill="none" opacity=".6"/>
<rect x="470" y="256" width="80" height="6" fill="#8a1f1a" opacity=".6"/>

<!-- podlahové drobnosti -->
<g>
  <ellipse cx="150" cy="334" rx="40" ry="6" fill="#000" opacity=".22"/>
  <path d="M110 300h80l-6 36h-68z" fill="#b8862e" ${OL}/>
  ${rep(5, (i) => `<path d="M${118 + i * 14} 302v32" stroke="#8a6020" stroke-width="1.4"/>`)}
  <rect x="116" y="284" width="68" height="18" fill="#f6efd8" ${ol}/><rect x="120" y="278" width="62" height="12" fill="#e8dec0" ${ol} transform="rotate(-3 150 284)"/>
  <path d="M116 296h68" stroke="#c23b3b" stroke-width="2"/>
</g>
<ellipse cx="610" cy="338" rx="22" ry="5" fill="#2a2a2a" opacity=".35"/>
<rect x="590" y="334" width="40" height="8" fill="#6a4a2a" ${ol}/>

<rect width="640" height="360" fill="url(#tnoise)"/>
<rect width="640" height="360" fill="url(#tvig)"/>
`);

export default trafika;
