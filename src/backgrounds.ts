import type { BgId } from './types';
import hospoda from './bg/hospoda';
import trafika from './bg/trafika';
import urad from './bg/urad';
import dvur from './bg/dvur';
import sbirka from './bg/sbirka';
import zbrojnice from './bg/zbrojnice';
import zbrojnice2 from './bg/zbrojnice2';
import { OL, ol, wrap, rep, shade, grad, person, patrik, carpet, noise, nid } from './art';
import type { PersonOpts } from './art';

/* ------------------------------------------------------------------ */
/*  KANCELÁŘ                                                           */
/* ------------------------------------------------------------------ */

const office = wrap(`
<defs>
  <linearGradient id="ow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7b883"/><stop offset="1" stop-color="#e88f5c"/></linearGradient>
  <linearGradient id="ows" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9703f"/><stop offset="1" stop-color="#a95a32"/></linearGradient>
  <linearGradient id="ocar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8262e"/><stop offset="1" stop-color="#8a1a22"/></linearGradient>
  <linearGradient id="owood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c98745"/><stop offset=".5" stop-color="#b9763a"/><stop offset="1" stop-color="#8f5628"/></linearGradient>
  <linearGradient id="owoodt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d99c5a"/><stop offset="1" stop-color="#a8692f"/></linearGradient>
  <linearGradient id="osky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6d8fa8"/><stop offset="1" stop-color="#b6ccd8"/></linearGradient>
  <linearGradient id="ocurt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8b43e"/><stop offset=".5" stop-color="#f4cc5e"/><stop offset="1" stop-color="#c8922a"/></linearGradient>
  <radialGradient id="oglobe" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#7fd0ee"/><stop offset=".6" stop-color="#2d7fb8"/><stop offset="1" stop-color="#1d4f80"/></radialGradient>
  <radialGradient id="olamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff2a8" stop-opacity=".9"/><stop offset="1" stop-color="#fff2a8" stop-opacity="0"/></radialGradient>
  <radialGradient id="ovig" cx=".5" cy=".5" r=".78"><stop offset=".65" stop-color="#3a1a08" stop-opacity="0"/><stop offset="1" stop-color="#3a1a08" stop-opacity=".4"/></radialGradient>
  <clipPath id="ofloor"><polygon points="0,236 560,236 640,300 640,360 0,360"/></clipPath>
  ${noise('onoise')}
</defs>

<!-- zadní stěna a boční stěna -->
<rect width="560" height="240" fill="url(#ow)"/>
<polygon points="560,16 640,0 640,300 560,236" fill="url(#ows)" ${ol}/>
<rect y="226" width="560" height="14" fill="#8f5628" ${ol}/>
<polygon points="560,226 640,290 640,300 560,240" fill="#6e3f1c" ${ol}/>
<!-- dveře na boční stěně -->
<polygon points="580,60 628,48 628,282 580,232" fill="#8a4f26" ${OL}/>
<polygon points="588,72 620,64 620,262 588,228" fill="#a8672f" ${ol}/>
<circle cx="612" cy="170" r="3.5" fill="#f0c860" ${ol}/>

<!-- podlaha / koberec -->
<polygon points="0,236 560,236 640,300 640,360 0,360" fill="url(#ocar)"/>
<g clip-path="url(#ofloor)">${carpet(0, 640, 238, 360, '#e0585c')}
  <polygon points="250,238 420,238 520,360 140,360" fill="#fff2c0" opacity=".1"/>
</g>
<path d="M0 236H560L640 300" stroke="#3b2214" stroke-width="1.6" fill="none"/>

<!-- KNIHOVNA -->
<ellipse cx="116" cy="238" rx="96" ry="9" fill="#000" opacity=".22"/>
<rect x="24" y="36" width="184" height="202" rx="3" fill="url(#owood)" ${OL}/>
<rect x="34" y="46" width="164" height="144" fill="#6e3d1a" ${ol}/>
<rect x="34" y="46" width="164" height="144" fill="#000" opacity=".08"/>
<rect x="30" y="96" width="172" height="9" fill="url(#owoodt)" ${ol}/>
<rect x="30" y="146" width="172" height="9" fill="url(#owoodt)" ${ol}/>
<rect x="30" y="190" width="172" height="8" fill="url(#owoodt)" ${ol}/>
<rect x="30" y="198" width="172" height="38" fill="url(#owood)" ${OL}/>
<path d="M116 198V236" stroke="#3b2214" stroke-width="1.8"/>
<circle cx="110" cy="216" r="2.6" fill="#f0c860" ${ol}/><circle cx="122" cy="216" r="2.6" fill="#f0c860" ${ol}/>
<!-- globus -->
<path d="M76 96h22v-4q-11 -3 -22 0z" fill="#7a4a22" ${ol}/><rect x="84" y="86" width="6" height="10" fill="#7a4a22"/>
<circle cx="87" cy="70" r="19" fill="url(#oglobe)" ${OL}/>
<path d="M76 62q8-6 14 2q-2 8 -8 8q-8 -2 -6 -10zM94 72q8 0 8 8q-6 6 -10 0z" fill="#5fb56a" opacity=".9"/>
<path d="M70 58Q87 80 100 82" stroke="#e8c14a" stroke-width="2" fill="none"/>
<!-- sklenice -->
${rep(4, (i) => `<g transform="translate(${126 + i * 17} 96)"><path d="M-5 -26Q-6 -12 0 -10Q6 -12 5 -26z" fill="#e9dcae" opacity=".85" ${ol}/><path d="M0 -10V-2M-5 -2H5" stroke="#3b2214" stroke-width="1.6"/></g>`)}
<!-- knihy 2. police -->
${[
  ['#2f5fa8', 46, 30],
  ['#c23b3b', 56, 34],
  ['#e0b13a', 66, 28],
  ['#2f8a4f', 75, 32],
  ['#7a3a8a', 84, 30],
]
  .map(([c, x, h]) => `<rect x="${x}" y="${146 - (h as number)}" width="9" height="${h}" fill="${c}" ${ol}/><path d="M${(x as number) + 2} ${146 - (h as number) + 5}h5" stroke="#fff" stroke-width="1" opacity=".5"/>`)
  .join('')}
<g transform="rotate(-14 104 146)"><rect x="98" y="116" width="9" height="30" fill="#c26a2a" ${ol}/></g>
<rect x="128" y="130" width="64" height="8" fill="#2f5fa8" ${ol}/><rect x="132" y="138" width="58" height="8" fill="#b23b3b" ${ol}/>
<!-- knihy 3. police a láhev -->
${rep(7, (i) => `<rect x="${44 + i * 10}" y="${i % 2 ? 160 : 156}" width="9" height="${i % 2 ? 30 : 34}" fill="${['#8a3a1a', '#2f6aa8', '#e0b13a', '#3a8a5a', '#a83a5a', '#4a4a8a', '#c28a3a'][i]}" ${ol}/>`)}
<path d="M158 190V160h5v-8h6v8h5v30z" fill="#4fa860" opacity=".9" ${ol}/>
<!-- horní police -->
<rect x="40" y="52" width="150" height="40" fill="#5a3014" opacity=".35"/>
${rep(6, (i) => `<rect x="${44 + i * 8}" y="${i % 2 ? 62 : 58}" width="7" height="${i % 2 ? 30 : 34}" fill="${['#a83a3a', '#e0b13a', '#2f6aa8', '#3a8a5a', '#8a4a2a', '#5a3a8a'][i]}" ${ol}/>`)}

<!-- OKNO -->
<rect x="258" y="34" width="150" height="118" rx="2" fill="#f4ead0" ${OL}/>
<rect x="266" y="42" width="134" height="102" fill="url(#osky)" ${ol}/>
<ellipse cx="300" cy="66" rx="26" ry="9" fill="#eef3f6" opacity=".9"/><ellipse cx="365" cy="58" rx="22" ry="8" fill="#e6eef3" opacity=".85"/>
<path d="M266 128l24-16 18 8 24-20 22 16 46-14v52H266z" fill="#5e8a62" opacity=".9"/>
<path d="M333 42V144M266 93H400" stroke="#f4ead0" stroke-width="6"/>
<rect x="266" y="42" width="134" height="102" fill="none" ${OL}/>
${rep(22, (i) => `<path d="M${270 + ((i * 41) % 126)} ${46 + ((i * 59) % 92)}l-4 11" stroke="#f2f8fc" stroke-width="1.4" opacity=".8"/>`)}
<rect x="252" y="150" width="162" height="9" fill="#e4d4a8" ${OL}/>
<!-- závěsy -->
<path d="M256 30h34c8 40 4 84 -6 126h-28z" fill="url(#ocurt)" ${OL}/>
<path d="M266 34c4 40 2 80 -4 118M276 34c3 40 2 80 -2 118" stroke="#b07a1e" stroke-width="1.4" fill="none" opacity=".7"/>
<path d="M410 30h-34c-8 40 -4 84 6 126h28z" fill="url(#ocurt)" ${OL}/>
<path d="M400 34c-4 40 -2 80 4 118" stroke="#b07a1e" stroke-width="1.4" fill="none" opacity=".7"/>
<rect x="248" y="26" width="172" height="7" rx="3" fill="#7a4a22" ${ol}/>

<!-- obrazy a hodiny -->
<rect x="426" y="48" width="70" height="52" fill="#d9a05a" ${OL}/>
<rect x="432" y="54" width="58" height="40" fill="#9fd4ef"/>
<path d="M432 94V80Q448 66 461 78T490 74V94z" fill="#5fae5a"/><path d="M432 94V86Q450 80 466 88T490 84V94z" fill="#3f8f48"/>
<circle cx="474" cy="64" r="5" fill="#ffe27a"/>
<rect x="506" y="58" width="40" height="52" fill="#d9a05a" ${OL}/>
<rect x="511" y="63" width="30" height="42" fill="#f5e6b8"/>
<path d="M526 98v-14" stroke="#4a7a3a" stroke-width="2"/><ellipse cx="526" cy="78" rx="6" ry="9" fill="#f0a020" ${ol}/>
<circle cx="230" cy="62" r="17" fill="#f6ecd0" ${OL}/><path d="M230 62V51M230 62l8 4" stroke="#3b2214" stroke-width="2.2" stroke-linecap="round"/>
<circle cx="230" cy="62" r="1.8" fill="#3b2214"/>
<!-- plakát -->
<rect x="430" y="118" width="60" height="78" fill="#f8f1d8" transform="rotate(-2 460 157)" ${OL}/>
<text x="460" y="140" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="14" fill="#b52a2a" transform="rotate(-2 460 157)">HLEDÁN</text>
<circle cx="460" cy="166" r="14" fill="#e8b98c" ${ol} transform="rotate(-2 460 157)"/>
<path d="M452 162h6M464 162h6M454 172q6 4 12 0" stroke="#3b2214" stroke-width="1.6" fill="none" transform="rotate(-2 460 157)"/>
<text x="460" y="190" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="#555" transform="rotate(-2 460 157)">ODMĚNA 500 Kč</text>
<!-- květina v rohu -->
<path d="M600 8h40v10h-34z" fill="#7a4a22" ${ol}/>
<path d="M610 10q-24 -4 -30 14M620 10q-4 -22 10 -34M628 10q18 -2 30 12" stroke="#2f7a3a" stroke-width="8" fill="none" stroke-linecap="round"/>

<!-- ISP: rostlina v květináči vpravo dole -->
<ellipse cx="520" cy="338" rx="34" ry="6" fill="#000" opacity=".25"/>
<path d="M500 338l-5 -44h50l-5 44z" fill="#c26a2a" ${OL}/><rect x="493" y="288" width="54" height="9" rx="2" fill="#d98238" ${OL}/>
<path d="M520 290q-34 -26 -10 -62q12 28 10 62zM520 290q-4 -50 22 -76q8 36 -22 76zM520 290q40 -16 42 -54q-30 6 -42 54zM520 290q-48 -4 -52 -42q32 -4 52 42z" fill="#3f9a48" ${OL}/>
<path d="M520 290q-14 -18 -8 -44M520 290q12 -26 22 -54" stroke="#2a7a34" stroke-width="1.4" fill="none"/>
<ellipse cx="478" cy="258" rx="12" ry="9" fill="#ee6c9a" ${OL}/><ellipse cx="478" cy="258" rx="4" ry="3.5" fill="#ffd54a"/>

<!-- ŽIDLE a NÁČELNÍK -->
<path d="M280 232V150Q280 112 330 112Q380 112 380 150V232z" fill="#6a3517" ${OL}/>
<path d="M290 232V152Q290 124 330 124Q370 124 370 152V232z" fill="#8a4a24" opacity=".8"/>
<circle cx="296" cy="146" r="2" fill="#e0b060"/><circle cx="364" cy="146" r="2" fill="#e0b060"/><circle cx="296" cy="176" r="2" fill="#e0b060"/><circle cx="364" cy="176" r="2" fill="#e0b060"/>
${person({ x: 330, y: 300, s: 0.92, coat: '#2f4f8f', pants: '#1f2f5a', hat: 'none', hairStyle: 'combover', mustache: true, belly: 14, tie: '#b8262e', hair: '#6a6a6a', skin: '#f2a888', nose: 1.15, redNose: true, glasses: true, medals: true, brows: 'angry', mouth: 'frown' })}

<!-- PSACÍ STŮL -->
<ellipse cx="330" cy="312" rx="134" ry="9" fill="#000" opacity=".22"/>
<polygon points="236,226 424,226 452,248 208,248" fill="url(#owoodt)" ${OL}/>
<path d="M240 232H420" stroke="#f0c486" stroke-width="1.5" opacity=".7"/>
<rect x="208" y="248" width="244" height="64" fill="url(#owood)" ${OL}/>
<rect x="216" y="256" width="102" height="48" fill="#9a5f2c" ${ol}/><rect x="342" y="256" width="102" height="48" fill="#9a5f2c" ${ol}/>
<circle cx="267" cy="280" r="3.4" fill="#f0c860" ${ol}/><circle cx="393" cy="280" r="3.4" fill="#f0c860" ${ol}/>
<rect x="302" y="232" width="56" height="10" rx="2" fill="#e8c14a" ${ol}/>
<text x="330" y="240" text-anchor="middle" font-family="Arial, sans-serif" font-size="7" font-weight="bold" fill="#5a3a0a">NÁČELNÍK</text>
<!-- lampa -->
<ellipse cx="238" cy="232" rx="15" ry="4.5" fill="#2f6a46" ${ol}/>
<path d="M238 230l10 -30 20 -10" stroke="#2f6a46" stroke-width="5" fill="none" stroke-linecap="round"/>
<path d="M262 184l22 8 -7 12 -22 -8z" fill="#3f9a62" ${OL}/>
<ellipse cx="270" cy="212" rx="28" ry="20" fill="url(#olamp)"/>
<!-- papíry a hrnek -->
<path d="M272 234l34 -2 4 7 -36 2z" fill="#f4eed8" ${ol}/><path d="M278 230l30 -3 3 6 -31 3z" fill="#e8e0c2" ${ol}/>
<rect x="396" y="214" width="19" height="17" rx="3" fill="#f2f2f2" ${OL}/><path d="M415 219q8 1 0 9" stroke="#3b2214" stroke-width="2" fill="none"/>
<path d="M402 210q-4 -8 1 -13M409 210q4 -8 -1 -13" stroke="#fff" stroke-width="2" fill="none" opacity=".75"/>
<!-- telefon -->
<path d="M418 236h42l4 -14h-52z" fill="#1c1c1c" ${OL}/>
<path d="M420 222q22 -16 40 0" stroke="#1c1c1c" stroke-width="7" fill="none" stroke-linecap="round"/>
<rect x="414" y="214" width="12" height="7" rx="3.5" fill="#2a2a2a" ${ol}/><rect x="454" y="214" width="12" height="7" rx="3.5" fill="#2a2a2a" ${ol}/>
<circle cx="438" cy="229" r="6.5" fill="#efefef" ${ol}/><circle cx="438" cy="229" r="2.2" fill="#1c1c1c"/>
<path d="M464 232q16 8 8 28t-4 34" stroke="#1c1c1c" stroke-width="2.4" fill="none"/>

<!-- VONDRA -->
${patrik(150, 352, 1.0)}

<rect width="640" height="360" fill="url(#onoise)"/>
<rect width="640" height="360" fill="url(#ovig)"/>
`);

/* ------------------------------------------------------------------ */
/*  KOŠ                                                                */
/* ------------------------------------------------------------------ */

const trash = wrap(`
<defs>
  <linearGradient id="tn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16214a"/><stop offset="1" stop-color="#4a3d78"/></linearGradient>
  <linearGradient id="tb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f7a4c"/><stop offset=".5" stop-color="#58b078"/><stop offset="1" stop-color="#2a6a42"/></linearGradient>
  <radialGradient id="tg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".85"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient>
  <radialGradient id="tvig" cx=".5" cy=".5" r=".78"><stop offset=".65" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>
  ${noise('tnoise')}
</defs>
<rect width="640" height="360" fill="url(#tn)"/>
${rep(26, (i) => `<circle cx="${(i * 97) % 640}" cy="${(i * 41) % 100}" r="${1 + (i % 2)}" fill="#fff" opacity=".85"/>`)}
<circle cx="560" cy="50" r="26" fill="#f6efc2" ${ol}/><circle cx="550" cy="44" r="5" fill="#d8cf98"/><circle cx="568" cy="58" r="3" fill="#d8cf98"/>
<!-- cihlová zeď -->
<rect x="0" y="100" width="640" height="170" fill="#8a4a3a" ${OL}/>
${rep(8, (r) => rep(14, (c) => `<rect x="${c * 50 + (r % 2) * 25 - 10}" y="${102 + r * 21}" width="48" height="19" fill="${(r + c) % 3 === 0 ? '#9a5644' : '#7e4234'}" stroke="#4a261c" stroke-width="1.4"/>`))}
<rect y="266" width="640" height="94" fill="#3b3636" ${OL}/>
<ellipse cx="320" cy="304" rx="270" ry="30" fill="url(#tg)"/>
<!-- odpadky -->
<ellipse cx="60" cy="276" rx="26" ry="10" fill="#c9c9c9" ${OL}/><rect x="40" y="252" width="40" height="24" rx="4" fill="#bdbdbd" ${OL}/><path d="M44 262h32" stroke="#888" stroke-width="2"/>
<ellipse cx="592" cy="278" rx="30" ry="10" fill="#3a3a55" ${OL}/><path d="M566 278l8-30 14 8 10-14 14 36z" fill="#5a5a7a" ${OL}/>
<!-- popelnice -->
<path d="M118 90h404l-22 178q-2 10-12 10H152q-10 0-12-10z" fill="url(#tb)" ${OL}/>
<path d="M200 98l-6 170M440 98l6 170M320 98v170" stroke="#1d4a2e" stroke-width="2.4" opacity=".55"/>
<rect x="106" y="74" width="428" height="24" rx="8" fill="#2d7a4a" ${OL}/>
<path d="M124 74l20 -44h352l20 44z" fill="#2a6a42" ${OL}/>
<!-- girlanda -->
<path d="M140 118q90 38 180 0t180 0" stroke="#3b2214" stroke-width="2" fill="none"/>
${rep(9, (i) => `<circle cx="${150 + i * 42}" cy="${126 + Math.sin(i * 1.5) * 8 + 8}" r="6" fill="${['#ff5252', '#ffd740', '#69f0ae', '#40c4ff'][i % 4]}" ${ol}/>`)}
<rect x="212" y="142" width="216" height="30" rx="6" fill="#f8e7a0" ${OL}/>
<text x="320" y="164" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="19" fill="#8a2a22" letter-spacing="1">ŽIVOT JE KRÁSNÝ</text>
<!-- televize -->
<rect x="346" y="176" width="108" height="76" rx="8" fill="#4a4a4a" ${OL}/>
<rect x="356" y="184" width="70" height="58" rx="6" fill="#8ae0ee" ${ol}/>
<path d="M366 232l16-24 12 12 14-20 14 32z" fill="#3a9a62"/>
<circle cx="440" cy="196" r="5" fill="#ccc" ${ol}/><circle cx="440" cy="214" r="5" fill="#ccc" ${ol}/>
<path d="M390 176l-14 -22M406 176l16 -24" stroke="#3b2214" stroke-width="2.4" stroke-linecap="round"/>
<!-- Patrik na pohovce -->
<rect x="150" y="196" width="150" height="40" rx="14" fill="#b2352f" ${OL}/>
${patrik(225, 256, 0.56, { coat: '#4a7ac2', hat: 'none', tie: undefined, collarUp: false, mouth: 'smile', brows: 'normal', tired: false })}
<rect x="150" y="212" width="150" height="46" rx="12" fill="#c83e38" ${OL}/>
<path d="M172 226h106" stroke="#8e2622" stroke-width="2.4"/>
<rect x="142" y="206" width="22" height="50" rx="10" fill="#9e2a26" ${OL}/><rect x="286" y="206" width="22" height="50" rx="10" fill="#9e2a26" ${OL}/>
<rect x="250" y="192" width="14" height="22" rx="3" fill="#e8b020" ${ol}/><path d="M250 195h14" stroke="#fff" stroke-width="2"/>
<!-- rostlina -->
<path d="M486 252l-6 -34h36l-6 34z" fill="#c26a2a" ${OL}/>
<path d="M498 218q-18 -30 -4 -44M498 218q8 -34 26 -40M498 218q22 -14 30 -34" stroke="#2f8a3a" stroke-width="6" fill="none" stroke-linecap="round"/>
<rect width="640" height="360" fill="url(#tnoise)"/>
<rect width="640" height="360" fill="url(#tvig)"/>
`);

/* ------------------------------------------------------------------ */
/*  CESTA AUTEM                                                        */
/* ------------------------------------------------------------------ */

const car = wrap(`
<defs>
  <linearGradient id="csky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa6e0"/><stop offset="1" stop-color="#d6ecf8"/></linearGradient>
  <linearGradient id="ccar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0524a"/><stop offset="1" stop-color="#9a2a22"/></linearGradient>
  <linearGradient id="chill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5f9a58"/><stop offset="1" stop-color="#3f7a44"/></linearGradient>
  <radialGradient id="cvig" cx=".5" cy=".5" r=".78"><stop offset=".65" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
  ${noise('cnoise')}
</defs>
<rect width="640" height="360" fill="url(#csky)"/>
<circle cx="540" cy="58" r="30" fill="#fff6b0"/><circle cx="540" cy="58" r="42" fill="#fff6b0" opacity=".28"/>
<g class="cloud1"><ellipse cx="120" cy="60" rx="46" ry="16" fill="#fff" ${ol}/><ellipse cx="150" cy="50" rx="30" ry="14" fill="#fff" ${ol}/></g>
<g class="cloud2"><ellipse cx="380" cy="94" rx="40" ry="13" fill="#fff" ${ol}/><ellipse cx="404" cy="86" rx="26" ry="11" fill="#fff" ${ol}/></g>
<path d="M0 190q80-70 170-30t170-20q90 24 160-12t140 40v110H0z" fill="url(#chill)" ${OL}/>
${rep(16, (i) => `<path d="M${20 + i * 40} ${180 + ((i * 17) % 20)}l-8 20h16z" fill="#2c6a3c" ${ol}/>`)}
<path d="M0 232q150-56 300-8t340-22v146H0z" fill="#77b45e" ${OL}/>
${rep(5, (i) => `<rect x="${60 + i * 130}" y="196" width="8" height="30" fill="#6b4220" ${ol}/><circle cx="${64 + i * 130}" cy="186" r="22" fill="#3d9a4c" ${OL}/><circle cx="${54 + i * 130}" cy="194" r="14" fill="#55b261" ${ol}/>`)}
<path d="M0 262h640v98H0z" fill="#5b5b64" ${OL}/>
<path d="M0 262h640" stroke="#e0e0e0" stroke-width="3"/>
<path class="dashes" d="M0 316h640" stroke="#f4f4f4" stroke-width="5" stroke-dasharray="44 30"/>
<g class="poles">${rep(8, (i) => `<g transform="translate(${i * 120})"><rect x="0" y="130" width="7" height="132" fill="#6b4220" ${ol}/><rect x="-14" y="138" width="36" height="6" fill="#6b4220" ${ol}/></g>`)}</g>
<g class="car">
  <path d="M200 252h250q16 0 16-16v-18q0-12-12-16l-52-12-34-38h-92l-34 38-44 12q-14 4-14 16v18q0 16 16 16z" fill="url(#ccar)" ${OL}/>
  <path d="M258 168h82l28 32H236z" fill="#a8d0e4" ${OL}/>
  <path d="M302 168v32" stroke="#3b2214" stroke-width="2"/>
  <circle cx="276" cy="186" r="9" fill="#f0b488" ${ol}/><path d="M266 182q10-12 20 0z" fill="#6a5a3a" ${ol}/>
  <circle cx="330" cy="186" r="9" fill="#f0b488" ${ol}/><path d="M321 182q9-12 18 0z" fill="#5a3a1a" ${ol}/>
  <rect x="218" y="214" width="244" height="6" fill="#fff" opacity=".35"/>
  <rect x="440" y="214" width="20" height="12" rx="3" fill="#ffd76a" ${ol}/>
  <rect x="200" y="222" width="14" height="10" rx="3" fill="#e84030" ${ol}/>
  <rect x="290" y="150" width="36" height="14" rx="3" fill="#fff" ${ol}/><text x="308" y="161" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="9" fill="#1a3a9a">POLICIE</text>
  <circle cx="246" cy="254" r="24" fill="#222" ${OL}/><circle cx="246" cy="254" r="10" fill="#c8c8c8" ${ol}/>
  <circle cx="412" cy="254" r="24" fill="#222" ${OL}/><circle cx="412" cy="254" r="10" fill="#c8c8c8" ${ol}/>
  <path d="M196 226q-26 2-34 14M190 232q-24 8-30 22" stroke="#d8d8d8" stroke-width="7" fill="none" opacity=".5" stroke-linecap="round"/>
</g>
<rect x="548" y="150" width="6" height="112" fill="#666" ${ol}/>
<rect x="506" y="122" width="92" height="46" rx="4" fill="#f4f4f4" ${OL}/>
<text x="552" y="144" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="14" fill="#1a3a9a">BRDÝMOV</text>
<text x="552" y="160" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#333">17 km</text>
<rect width="640" height="360" fill="url(#cnoise)"/>
<rect width="640" height="360" fill="url(#cvig)"/>
`);

/* ------------------------------------------------------------------ */
/*  NÁMĚSTÍ V BRDÝMOVĚ                                                 */
/* ------------------------------------------------------------------ */

const house = (x: number, w: number, h: number, wall: string, roof: string, sign = ''): string => {
  const gw = nid('hw');
  const base = 262;
  return `
<defs>${grad(gw, wall, false, 1.12, 0.82)}</defs>
<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="url(#${gw})" ${OL}/>
<path d="M${x - 8} ${base - h}l${w / 2 + 8} -36 ${w / 2 + 8} 36z" fill="${roof}" ${OL}/>
<path d="M${x - 8} ${base - h}l${w / 2 + 8} -36" stroke="${shade(roof, 1.3)}" stroke-width="2" opacity=".6"/>
${rep(Math.max(1, Math.floor(w / 44)), (i) => `<g><rect x="${x + 12 + i * 42}" y="${base - h + 16}" width="24" height="30" fill="#9fd0ee" ${OL}/><path d="M${x + 24 + i * 42} ${base - h + 16}v30M${x + 12 + i * 42} ${base - h + 31}h24" stroke="#f4ead0" stroke-width="2.4"/><rect x="${x + 10 + i * 42}" y="${base - h + 46}" width="28" height="4" fill="#c9a06a" ${ol}/></g>`)}
<rect x="${x + w / 2 - 12}" y="${base - 46}" width="24" height="46" fill="#7a4a22" ${OL}/><circle cx="${x + w / 2 + 6}" cy="${base - 22}" r="2" fill="#f0c860"/>
${sign ? `<rect x="${x + w / 2 - 34}" y="${base - 68}" width="68" height="15" rx="2" fill="#6a3b1a" ${OL}/><text x="${x + w / 2}" y="${base - 57}" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="${sign.length > 8 ? 7 : 9}" fill="#f6e2a0">${sign}</text>` : ''}
`;
};

const crowd = [
  // stará paní s šátkem a zástěrou
  person({ x: 92, y: 334, s: 0.62, dress: true, apron: '#f2ecd0', coat: '#6a8a5a', skin: '#efc09a', hair: '#c9c9c9', hairStyle: 'bun', hat: 'scarf', hatColor: '#b8426a', glasses: true, nose: 1.4, brows: 'normal', mouth: 'open' }),
  // kluk s kšiltovkou
  person({ x: 176, y: 326, s: 0.4, head: 1.5, coat: '#3a7ab8', pants: '#6a5a8a', skin: '#f6c8a0', hair: '#c27a3a', hairStyle: 'messy', hat: 'cap', hatColor: '#c23b3b', hatTilt: 10, nose: 0.8, mouth: 'open' }),
  // statkář se slamákem a plnovousem
  person({ x: 470, y: 336, s: 0.62, flip: true, belly: 16, coat: '#a85a3a', pants: '#3a4a6a', skin: '#f0a888', hair: '#8a5a2a', beard: true, hat: 'straw', hatColor: '#d8b84a', redNose: true, nose: 1.3, mouth: 'smile' }),
  // paní s dlouhými vlasy
  person({ x: 552, y: 338, s: 0.62, flip: true, dress: true, coat: '#8a4a9a', skin: '#f4c298', hair: '#3a2a1a', hairStyle: 'long', nose: 0.9, brows: 'sad', mouth: 'open' }),
].join('');

const crowdExplore = [
  person({ x: 122, y: 334, s: 0.62, dress: true, apron: '#f2ecd0', coat: '#6a8a5a', skin: '#efc09a', hair: '#c9c9c9', hairStyle: 'bun', hat: 'scarf', hatColor: '#b8426a', glasses: true, nose: 1.4, brows: 'normal', mouth: 'open' }),
  person({ x: 164, y: 326, s: 0.4, head: 1.5, coat: '#3a7ab8', pants: '#6a5a8a', skin: '#f6c8a0', hair: '#c27a3a', hairStyle: 'messy', hat: 'cap', hatColor: '#c23b3b', hatTilt: 10, nose: 0.8, mouth: 'open' }),
  person({ x: 500, y: 336, s: 0.62, flip: true, belly: 16, coat: '#a85a3a', pants: '#3a4a6a', skin: '#f0a888', hair: '#8a5a2a', beard: true, hat: 'straw', hatColor: '#d8b84a', redNose: true, nose: 1.3, mouth: 'smile' }),
  person({ x: 606, y: 338, s: 0.62, flip: true, dress: true, coat: '#8a4a9a', skin: '#f4c298', hair: '#3a2a1a', hairStyle: 'long', nose: 0.9, brows: 'sad', mouth: 'open' }),
].join('');

/** Pepa: školník, pošťák a dobrovolný hasič; přátelský, trochu kulatý, s knírem. */
const pepaFigure = person({ x: 252, y: 350, s: 0.7, coat: '#3a5a8a', pants: '#3a3a4a', hat: 'cap', hatColor: '#d9b13b', hair: '#8a5a2a', mustache: true, belly: 8, skin: '#f2b890', nose: 1.1, mouth: 'smile', brows: 'normal' });

const squareScene = (explore: boolean): string => wrap(`
<defs>
  <linearGradient id="ssky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#78b6e6"/><stop offset="1" stop-color="#eef6fa"/></linearGradient>
  <linearGradient id="sgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c6b898"/><stop offset="1" stop-color="#94876c"/></linearGradient>
  <radialGradient id="svig" cx=".5" cy=".5" r=".78"><stop offset=".65" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
  ${noise('snoise')}
</defs>
<rect width="640" height="360" fill="url(#ssky)"/>
<ellipse cx="110" cy="50" rx="46" ry="15" fill="#fff" ${ol}/><ellipse cx="520" cy="40" rx="40" ry="13" fill="#fff" ${ol}/>
<!-- kostel -->
<rect x="296" y="70" width="48" height="192" fill="#eadfb8" ${OL}/>
<rect x="296" y="70" width="14" height="192" fill="#000" opacity=".08"/>
<path d="M290 70l30-62 30 62z" fill="#8a3a2e" ${OL}/><circle cx="320" cy="98" r="12" fill="#f8f2da" ${OL}/><path d="M320 98v-8M320 98l6 3" stroke="#3b2214" stroke-width="2"/>
<rect x="308" y="128" width="24" height="32" rx="12" fill="#4a3322" ${ol}/>
<path d="M320 8V-4M314 2h12" stroke="#e8c14a" stroke-width="3"/>
${house(8, 120, 106, '#f0cf9e', '#b04a30', 'HOSPODA')}
${house(140, 140, 90, '#d6e8bc', '#963f2c', 'TRAFIKA')}
${house(372, 120, 96, '#f6dcbe', '#7a342a', 'HASIČI')}
${house(500, 134, 114, '#dcc4e6', '#b04a30', 'OBECNÍ ÚŘAD')}
<rect y="260" width="640" height="100" fill="url(#sgr)" ${OL}/>
${rep(14, (i) => `<path d="M${i * 50 - 20} 264L${i * 90 - 210} 360" stroke="#74694f" stroke-width="1.6" opacity=".5"/>`)}
<path d="M0 296h640M0 332h640" stroke="#74694f" stroke-width="1.6" opacity=".35"/>
<!-- lípa -->
<rect x="40" y="176" width="12" height="86" fill="#6b4220" ${OL}/>
<circle cx="46" cy="156" r="40" fill="#3d9a4c" ${OL}/><circle cx="26" cy="174" r="24" fill="#55b261" ${ol}/><circle cx="68" cy="176" r="24" fill="#55b261" ${ol}/>
<!-- lavička -->
<rect x="560" y="244" width="70" height="8" fill="#8a5a2a" ${OL}/><rect x="564" y="252" width="6" height="14" fill="#5a3a1a"/><rect x="620" y="252" width="6" height="14" fill="#5a3a1a"/>
<!-- transparent -->
<path d="M140 124q175 22 360 0" stroke="#3b2214" stroke-width="2" fill="none"/>
<rect x="190" y="122" width="260" height="26" fill="#d9302b" ${OL} transform="rotate(1 320 134)"/>
<text x="320" y="141" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="17" fill="#fff" letter-spacing="1.5" transform="rotate(1 320 134)">DNY ROHLÍKU – 3. SRPNA</text>
<!-- podstavec -->
<ellipse cx="320" cy="270" rx="112" ry="14" fill="#5a5240" opacity=".5"/>
<rect x="238" y="230" width="164" height="38" fill="#9a9a9a" ${OL}/>
<rect x="238" y="230" width="164" height="38" fill="#000" opacity=".06"/>
<rect x="250" y="208" width="140" height="24" fill="#b3b3b3" ${OL}/>
<path d="M262 208q58-96 116 0" stroke="#fff" stroke-width="4" fill="none" stroke-dasharray="9 7" opacity=".9"/>
<text x="320" y="254" text-anchor="middle" font-family="Georgia, serif" font-size="13" font-weight="bold" fill="#3a3a3a">ROHLÍK 1957</text>
<!-- páska -->
<path d="M214 204l212 46M214 250l212-46" stroke="#f4cc00" stroke-width="7" ${ol}/>
<path d="M214 204l212 46M214 250l212-46" stroke="#3b2214" stroke-width="3" stroke-dasharray="8 12"/>
<!-- ukazatel ke sběrateli -->
<rect x="22" y="276" width="6" height="76" fill="#6a3b1a" ${OL}/>
<polygon points="4,278 40,278 50,288 40,298 4,298" fill="#c9904a" ${OL}/>
<text x="22" y="291" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="7" fill="#3b2214">KOCOUR</text>
${explore ? crowdExplore : crowd}
${explore ? pepaFigure : patrik(300, 356, 0.82)}
<ellipse cx="420" cy="252" rx="11" ry="7" fill="#9a9aa8" ${ol}/><circle cx="430" cy="246" r="5" fill="#8a8a98" ${ol}/><path d="M435 246l5 2" stroke="#d98a1a" stroke-width="3"/>
<rect width="640" height="360" fill="url(#snoise)"/>
<rect width="640" height="360" fill="url(#svig)"/>
`);

/* ------------------------------------------------------------------ */
/*  MAPA BRDÝMOVA SHORA (pozadí úvodní obrazovky)                      */
/* ------------------------------------------------------------------ */

const treeDots = rep(260, (i) => {
  const x = (i * 197 + (i % 7) * 53) % 640;
  const y = (i * 131 + (i % 11) * 37) % 500;
  const r = 5 + (i % 4);
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${i % 3 ? '#2a6a2a' : '#348034'}" opacity=".85"/><circle cx="${x - 1.5}" cy="${y - 1.5}" r="${r * 0.5}" fill="#4a9a44" opacity=".7"/>`;
});

const mapHouse = (x: number, y: number, w: number, h: number, c: string): string =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${OL}/><path d="M${x} ${y}h${w}" stroke="${shade(c, 1.3)}" stroke-width="3"/><path d="M${x + w / 2} ${y}V${y + h}" stroke="${shade(c, 0.7)}" stroke-width="1.5"/>`;

export const mapBackground = `<svg viewBox="0 0 640 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
<defs>
  <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3f8f3a"/><stop offset="1" stop-color="#2d7a34"/></linearGradient>
  <linearGradient id="ml" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7b8fb0"/><stop offset="1" stop-color="#52678c"/></linearGradient>
</defs>
<rect width="640" height="500" fill="url(#mg)"/>
${treeDots}
<!-- pole -->
<path d="M400 20l150 10-10 90-150-10z" fill="#c8b24a" opacity=".85"/><path d="M410 30l130 8M408 50l130 8M406 70l130 8M404 90l130 8" stroke="#a89430" stroke-width="2"/>
<!-- jezero -->
<path d="M330 250q10-34 70-38t110 14q40 20 20 50t-90 30-100-16q-20-16-10-40z" fill="url(#ml)" ${OL}/>
<path d="M370 244q30-10 60 0M410 262q30-8 60 2" stroke="#a8b8d4" stroke-width="2" fill="none" opacity=".7"/>
<!-- silnice -->
<path d="M-10 360Q120 330 200 280T330 120Q360 60 330 -10" stroke="#3b3b3b" stroke-width="22" fill="none"/>
<path d="M-10 360Q120 330 200 280T330 120Q360 60 330 -10" stroke="#a8a8a8" stroke-width="16" fill="none"/>
<path d="M200 280Q300 300 380 360T650 380" stroke="#3b3b3b" stroke-width="18" fill="none"/>
<path d="M200 280Q300 300 380 360T650 380" stroke="#a8a8a8" stroke-width="12" fill="none"/>
<path d="M-10 360Q120 330 200 280T330 120Q360 60 330 -10M200 280Q300 300 380 360T650 380" stroke="#fff" stroke-width="1.6" fill="none" stroke-dasharray="10 12" opacity=".8"/>
<!-- domy Brdýmova -->
${mapHouse(120, 380, 36, 22, '#c0442a')}${mapHouse(168, 392, 28, 20, '#d9a03a')}${mapHouse(214, 372, 32, 24, '#b8352a')}
${mapHouse(262, 332, 30, 22, '#c0442a')}${mapHouse(250, 392, 36, 24, '#e0c050')}${mapHouse(300, 398, 28, 20, '#b8352a')}
${mapHouse(60, 420, 34, 22, '#d9a03a')}${mapHouse(330, 330, 40, 26, '#c0442a')}
<!-- náměstí a kostel -->
<circle cx="236" cy="338" r="16" fill="#cbb98a" ${OL}/><rect x="231" y="330" width="10" height="16" fill="#8a3a2e" ${ol}/>
<!-- les v rohu -->
${rep(14, (i) => `<circle cx="${520 + (i % 5) * 20}" cy="${420 + Math.floor(i / 5) * 22}" r="12" fill="#1f5a24" ${ol}/><circle cx="${516 + (i % 5) * 20}" cy="${416 + Math.floor(i / 5) * 22}" r="6" fill="#3f8f3a" opacity=".7"/>`)}
<rect width="640" height="500" fill="url(#mshade)"/>
<defs><radialGradient id="mshade" cx=".5" cy=".45" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient></defs>
</svg>`;

export const backgrounds: Record<BgId, string> = {
  office,
  trash,
  car,
  square: squareScene(false),
  square2: squareScene(true),
  hospoda,
  trafika,
  urad,
  dvur,
  sbirka,
  zbrojnice,
  zbrojnice2,
};
