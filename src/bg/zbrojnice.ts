import { wrap, rep, grad, noise, OL, ol } from '../art';

/**
 * Hasičská zbrojnice (vnitřek). Společný základ pro dvě varianty:
 *  - 'tarp'   (zbrojnice.ts)  – rohlík je překrytý plachtou
 *  - 'rohlik' (zbrojnice2.ts) – plachta je stažená, stojí tam železný rohlík s poklopem
 *
 * Hotspoty (pevné souřadnice):
 *  plachta / rohlík (60,70,300,190) · auto (400,130,200,170)
 *  hadice (20,235,110,70) · vychod (580,110,60,210)
 */

export type ZbrojniceVariant = 'tarp' | 'rohlik';

/* ------------------------------------------------------------------ */
/*  Kostra místnosti                                                   */
/* ------------------------------------------------------------------ */

const room = `
<!-- zadní stěna: omítka + cihly -->
<rect width="560" height="272" fill="url(#zbplaster)"/>
<rect y="146" width="560" height="126" fill="url(#zbbrick)"/>
${rep(9, (r) => rep(15, (c) => `<rect x="${c * 40 + (r % 2) * 20 - 12}" y="${148 + r * 14}" width="38" height="12" fill="${(r * 3 + c) % 5 === 0 ? '#a8523a' : (r + c) % 3 === 0 ? '#9a4a34' : '#b05a40'}" stroke="#5a2a1c" stroke-width="1.2" opacity=".92"/>`))}
<rect y="140" width="560" height="9" fill="#f4ead0" ${ol}/>
<rect width="560" height="8" fill="#3a2410"/>
<!-- trámy -->
${rep(5, (i) => `<rect x="${i * 120 - 6}" y="0" width="16" height="30" fill="#4a2e18" ${ol}/>`)}
<!-- boční stěna -->
<polygon points="560,20 640,0 640,330 560,272" fill="url(#zbside)" ${OL}/>
<polygon points="560,20 640,0 640,10 560,30" fill="#3a2410" ${ol}/>
${rep(7, (i) => `<path d="M560 ${58 + i * 28}L640 ${44 + i * 40}" stroke="#7a3a28" stroke-width="1.6" opacity=".55"/>`)}
<!-- podlaha -->
<polygon points="0,272 560,272 640,330 640,360 0,360" fill="url(#zbfloor)"/>
${rep(14, (i) => `<path d="M${i * 62 - 20} 272L${i * 104 - 260} 360" stroke="#3a3a3e" stroke-width="1.6" opacity=".5"/>`)}
<path d="M0 300H610M0 328H640" stroke="#3a3a3e" stroke-width="1.4" opacity=".4"/>
<polygon points="0,338 600,338 640,352 640,360 0,360" fill="#f0c830" opacity=".85"/>
${rep(24, (i) => `<polygon points="${i * 28},338 ${i * 28 + 14},338 ${i * 28 + 8},360 ${i * 28 - 6},360" fill="#2a2a2e" opacity=".85"/>`)}
<ellipse cx="450" cy="320" rx="46" ry="7" fill="#1a1a1e" opacity=".35"/>
`;

/* ---------------- rolovací vrata vzadu ---------------- */
const shutter = `
<rect x="136" y="46" width="270" height="212" fill="#cfd4d8" ${OL}/>
<rect x="148" y="58" width="246" height="190" fill="url(#zbmetal)" ${ol}/>
${rep(27, (i) => `<path d="M148 ${64 + i * 7}H394" stroke="#7a8288" stroke-width="1.2" opacity=".7"/>`)}
<rect x="190" y="70" width="60" height="9" fill="#e8f0f4" opacity=".55" ${ol}/><rect x="270" y="70" width="60" height="9" fill="#e8f0f4" opacity=".55" ${ol}/>
<rect x="136" y="46" width="12" height="212" fill="#8a9298" ${ol}/><rect x="394" y="46" width="12" height="212" fill="#8a9298" ${ol}/>
<rect x="136" y="38" width="270" height="12" fill="#5a6268" ${OL}/>
<polygon points="148,58 220,58 160,248 148,248" fill="#fff" opacity=".07"/>
`;

/* ---------------- nástěnné rekvizity ---------------- */
const wallProps = `
<!-- hodiny -->
<circle cx="270" cy="24" r="14" fill="#f6ecd0" ${OL}/><path d="M270 24v-8M270 24l6 3" stroke="#3b2214" stroke-width="2" stroke-linecap="round"/><circle cx="270" cy="24" r="1.6" fill="#3b2214"/>
<!-- nástěnka se službami -->
<rect x="18" y="38" width="112" height="94" fill="#8a5a30" ${OL}/>
<rect x="24" y="44" width="100" height="82" fill="#d4a86a" ${ol}/>
<rect x="30" y="50" width="88" height="14" fill="#f8f0d8" ${ol}/>
<text x="74" y="60" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="9" fill="#b01c1c">SLUŽBY – ZÁŘÍ</text>
<rect x="30" y="68" width="88" height="52" fill="#f8f0d8" ${ol}/>
${['PO – Pepa', 'ÚT – Pepa', 'ST – Pepa', 'ČT – Pepa', 'PÁ – Pepa (kdo jiný?)']
  .map((t, i) => `<text x="34" y="${77 + i * 10}" font-family="'Segoe Script','Comic Sans MS',cursive" font-size="6.2" fill="#2a3a6a">${t}</text>`)
  .join('')}
<circle cx="30" cy="48" r="2.4" fill="#d02a2a"/><circle cx="118" cy="48" r="2.4" fill="#d02a2a"/>
<!-- plakát o požární ochraně -->
<rect x="150" y="14" width="64" height="26" fill="#d82a22" ${OL}/>
<text x="182" y="25" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="8" fill="#fff">KDYŽ HOŘÍ,</text>
<text x="182" y="35" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="8" fill="#ffd830">VOLEJ 150</text>
<!-- hasicí přístroje a sekera -->
<g transform="translate(26 150)">
  <rect x="0" y="0" width="14" height="46" rx="6" fill="#d82a22" ${OL}/><rect x="3" y="-6" width="8" height="8" fill="#2a2a2e" ${ol}/><path d="M11 -2q8 0 10 10" stroke="#2a2a2e" stroke-width="2.4" fill="none"/>
  <rect x="2" y="16" width="10" height="14" fill="#f8f0d8" opacity=".85"/>
  <rect x="22" y="6" width="14" height="40" rx="6" fill="#c81c18" ${OL}/><rect x="25" y="0" width="8" height="8" fill="#2a2a2e" ${ol}/>
</g>
<g transform="translate(76 156)">
  <rect x="-2" y="0" width="5" height="52" rx="2" fill="#8a5a30" ${ol}/>
  <path d="M3 4q22 -2 20 12q-18 4 -20 -2z" fill="#aab0b6" ${OL}/><path d="M6 6q10 -1 14 3" stroke="#fff" stroke-width="1.4" fill="none" opacity=".7"/>
</g>
<rect x="64" y="196" width="40" height="40" fill="#e8d8a0" opacity=".0"/>
<!-- stropní lampy -->
${[
  [130, 50],
  [300, 38],
  [470, 50],
]
  .map(
    ([x, h]) => `
<path d="M${x} 8V${h}" stroke="#2a1a0c" stroke-width="2"/>
<path d="M${(x as number) - 22} ${(h as number) + 16}Q${x} ${(h as number) - 8} ${(x as number) + 22} ${(h as number) + 16}z" fill="#3a5a4a" ${OL}/>
<ellipse cx="${x}" cy="${(h as number) + 16}" rx="22" ry="4" fill="#fff0b0" ${ol}/>
<ellipse cx="${x}" cy="${(h as number) + 60}" rx="80" ry="64" fill="url(#zbglow)"/>`,
  )
  .join('')}
`;

/* ---------------- východ vpravo ---------------- */
const exitDoor = `
<polygon points="586,108 638,94 638,328 586,292" fill="#1e1208" ${OL}/>
<polygon points="594,118 630,108 630,320 594,288" fill="url(#zbdoor)" ${ol}/>
<path d="M594 204L630 196" stroke="#2a4a3a" stroke-width="2"/>
<polygon points="600,224 624,218 624,236 600,242" fill="#b8bcc0" ${ol}/>
<polygon points="600,134 624,128 624,172 600,178" fill="#9fd0e0" opacity=".5" ${ol}/>
<polygon points="596,84 630,76 630,92 596,100" fill="#1f9a4a" ${OL}/>
<text x="613" y="92" text-anchor="middle" font-family="Arial, sans-serif" font-size="6.6" font-weight="bold" fill="#fff" transform="rotate(-14 613 90)">VÝCHOD</text>
<polygon points="590,296 636,330 636,334 590,300" fill="#000" opacity=".2"/>
`;

/* ---------------- hadice, helmy, vědra ---------------- */
const gear = `
<ellipse cx="72" cy="304" rx="62" ry="9" fill="#000" opacity=".3"/>
<!-- stojan s helmami -->
<rect x="102" y="258" width="5" height="46" fill="#4a4a50" ${ol}/><rect x="92" y="300" width="26" height="5" rx="2" fill="#3a3a40" ${ol}/>
<path d="M98 250q6 -22 24 -4l-2 10h-22z" fill="#e8c030" ${OL}/><path d="M94 256h32" stroke="#a88a18" stroke-width="3"/><path d="M102 238q6 -6 14 -2" stroke="#fff6b0" stroke-width="2" fill="none" opacity=".8"/>
<path d="M104 262q6 -16 20 -4l-2 8h-18z" fill="#d82a22" ${OL}/><path d="M100 268h28" stroke="#8a1a16" stroke-width="3"/>
<circle cx="116" cy="248" r="3" fill="#d8d8d8" ${ol}/>
<!-- vědra -->
<path d="M52 272h28l-4 30H56z" fill="#d82a22" ${OL}/><ellipse cx="66" cy="272" rx="14" ry="3.4" fill="#6a1210" ${ol}/>
<path d="M52 274q14 -20 28 0" stroke="#3b2214" stroke-width="1.6" fill="none"/>
<path d="M56 282h20" stroke="#fff" stroke-width="3" opacity=".6"/>
<!-- svinuté hadice -->
${[
  [34, 286, 26],
  [38, 292, 20],
]
  .map(
    ([x, y, r]) => `
<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${(r as number) * 0.5}" fill="#c4a468" ${OL}/>
<ellipse cx="${x}" cy="${y}" rx="${(r as number) * 0.62}" ry="${(r as number) * 0.31}" fill="#a88a4e" ${ol}/>
<ellipse cx="${x}" cy="${y}" rx="${(r as number) * 0.28}" ry="${(r as number) * 0.14}" fill="#3a2a14"/>
<path d="M${(x as number) - (r as number) + 2} ${y}q${(r as number) * 0.6} ${(r as number) * 0.4} ${(r as number) * 1.6} 0" stroke="#e0c486" stroke-width="2" fill="none" opacity=".6"/>`,
  )
  .join('')}
<rect x="8" y="294" width="14" height="10" rx="3" fill="#d4a030" ${OL}/>
<path d="M22 298q20 8 42 6" stroke="#c4a468" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M22 298q20 8 42 6" stroke="#8a6c34" stroke-width="1.4" fill="none"/>
`;

/* ---------------- hasičské auto (Tatra) ---------------- */
const wheel = (x: number): string =>
  `<circle cx="${x}" cy="290" r="27" fill="#1c1c20" ${OL}/><circle cx="${x}" cy="290" r="19" fill="#2e2e34"/><circle cx="${x}" cy="290" r="11" fill="#b8bcc0" ${ol}/><circle cx="${x}" cy="290" r="4" fill="#5a5a60"/>${rep(6, (i) => `<circle cx="${x + Math.cos((i * Math.PI) / 3) * 7.4}" cy="${290 + Math.sin((i * Math.PI) / 3) * 7.4}" r="1.3" fill="#3a3a40"/>`)}<path d="M${x - 24} 278q24 -14 48 0" stroke="#fff" stroke-width="1.6" fill="none" opacity=".18"/>`;

const truck = `
<ellipse cx="492" cy="312" rx="106" ry="10" fill="#000" opacity=".35"/>
<!-- žebřík na střeše -->
<g>
  <rect x="408" y="150" width="176" height="5" fill="#d8dadc" ${ol}/><rect x="408" y="162" width="176" height="5" fill="#c4c6c8" ${ol}/>
  ${rep(19, (i) => `<path d="M${414 + i * 9} 155V162" stroke="#a4a6a8" stroke-width="2.4"/>`)}
  <rect x="446" y="166" width="5" height="12" fill="#6a6a70"/><rect x="520" y="166" width="5" height="12" fill="#6a6a70"/>
  <path d="M452 142q20 -14 56 -8t60 8" stroke="#2a2a2e" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M452 142q20 -14 56 -8t60 8" stroke="#5a5a62" stroke-width="1.6" fill="none"/>
</g>
<!-- podvozek -->
<rect x="398" y="268" width="188" height="14" rx="3" fill="#2a2a2e" ${OL}/>
<!-- skříň -->
<rect x="452" y="178" width="134" height="94" rx="4" fill="url(#zbtruck)" ${OL}/>
<rect x="452" y="262" width="134" height="6" fill="#fff" opacity=".9"/>
${rep(3, (i) => `<rect x="${460 + i * 42}" y="198" width="36" height="58" rx="2" fill="url(#zbmetal)" ${ol}/>${rep(7, (j) => `<path d="M${460 + i * 42} ${204 + j * 8}h36" stroke="#7a8288" stroke-width="1" opacity=".7"/>`)}<rect x="${474 + i * 42}" y="252" width="8" height="4" fill="#3a3a40"/>`)}
<text x="519" y="192" text-anchor="middle" font-family="Impact, Arial Black, sans-serif" font-size="9" fill="#fff" letter-spacing="1">HASIČI BRDÝMOV</text>
<path d="M452 180h134" stroke="#ff7a6a" stroke-width="2" opacity=".6"/>
<!-- kabina -->
<path d="M398 270V216L412 178H456V270z" fill="url(#zbtruck)" ${OL}/>
<path d="M414 184H450V214H406z" fill="#9fd0e0" ${OL}/><path d="M420 188l8 22M436 188l8 22" stroke="#fff" stroke-width="2" opacity=".5"/>
<path d="M404 222h50" stroke="#8a1c18" stroke-width="2"/>
<rect x="414" y="228" width="14" height="4" rx="2" fill="#d8d8d8" ${ol}/>
<rect x="396" y="236" width="10" height="26" rx="2" fill="#2e2e34" ${ol}/>
${rep(4, (i) => `<path d="M397 ${239 + i * 6}h8" stroke="#a8a8ae" stroke-width="1.6"/>`)}
<circle cx="404" cy="226" r="6.4" fill="#fff4b8" ${OL}/><circle cx="402" cy="224" r="2.4" fill="#fff"/>
<rect x="392" y="268" width="22" height="8" rx="3" fill="#d8dadc" ${OL}/>
<circle cx="437" cy="248" r="8" fill="#f8f4e8" ${ol}/><text x="437" y="251" text-anchor="middle" font-family="Georgia, serif" font-size="8" font-weight="bold" fill="#8a1c18">T</text>
<!-- majáček -->
<rect x="424" y="170" width="22" height="9" fill="#3a3a40" ${ol}/>
<path d="M426 170Q435 150 444 170z" fill="#3a8ae8" ${OL}/><path d="M429 168q4 -12 9 -14" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>
<circle cx="435" cy="164" r="26" fill="url(#zbblue)"/>
<!-- zrcátko a madla -->
<path d="M404 196l-10 -4" stroke="#2a2a2e" stroke-width="2.4"/><rect x="386" y="186" width="8" height="14" rx="2" fill="#2a2a2e" ${ol}/>
<!-- hadice na boku -->
<ellipse cx="560" cy="232" rx="16" ry="16" fill="#c4a468" ${OL}/><ellipse cx="560" cy="232" rx="9" ry="9" fill="#a88a4e" ${ol}/><circle cx="560" cy="232" r="3" fill="#3a2a14"/>
<!-- blatníky -->
${wheel(440)}
${wheel(548)}
<path d="M414 272q26 -34 52 0z" fill="#9a1c18" opacity=".0"/>
<rect x="508" y="296" width="6" height="18" fill="#1c1c20"/><rect x="578" y="300" width="4" height="12" fill="#1c1c20"/>
`;

/* ------------------------------------------------------------------ */
/*  Plachta                                                            */
/* ------------------------------------------------------------------ */

const tarpScene = `
<ellipse cx="210" cy="272" rx="162" ry="12" fill="#000" opacity=".34"/>
<!-- železná špička, která vykukuje zpod plachty -->
<path d="M44 266C40 244 46 222 62 208L96 230C86 242 82 254 86 266z" fill="url(#zbiron)" ${OL}/>
<path d="M54 252Q58 232 70 220" stroke="#e8eaec" stroke-width="2.4" fill="none" opacity=".7"/>
<path d="M52 236l22 10M50 246l24 10" stroke="#5a5e62" stroke-width="1.4" opacity=".7"/>
<circle cx="66" cy="244" r="1.6" fill="#8a4a2a"/>
<!-- plachta -->
<path d="M58 266C46 214 70 148 128 110C192 70 296 76 338 152C360 190 364 232 362 266C300 274 130 276 58 266z" fill="url(#zbtarp)" ${OL}/>
<path d="M58 266C130 276 300 274 362 266" stroke="#2f3f1c" stroke-width="3" fill="none"/>
<path d="M62 258C132 268 300 266 358 258" stroke="#8aa060" stroke-width="1.6" fill="none" opacity=".6" stroke-dasharray="7 5"/>
<!-- záhyby -->
${[
  'M124 114C120 160 100 210 92 262',
  'M158 94C156 150 150 210 146 270',
  'M200 82C204 150 196 214 200 272',
  'M244 82C246 150 262 214 256 272',
  'M290 96C300 150 316 214 312 268',
  'M326 134C340 180 348 224 346 264',
]
  .map((d) => `<path d="${d}" stroke="#2a3a18" stroke-width="3.2" fill="none" opacity=".5"/><path d="${d}" stroke="#a8bc78" stroke-width="1.4" fill="none" opacity=".45" transform="translate(3 -1)"/>`)
  .join('')}
<path d="M100 150Q150 110 210 98" stroke="#bccf88" stroke-width="7" fill="none" opacity=".25" stroke-linecap="round"/>
<!-- lana -->
<g stroke="#d4b878" stroke-width="3.4" fill="none" stroke-linecap="round">
  <path d="M64 232C120 160 252 150 358 236"/>
  <path d="M82 180C130 138 252 120 340 168"/>
  <path d="M174 80C176 150 170 214 176 270"/>
  <path d="M278 90C280 150 276 214 282 268"/>
</g>
<g stroke="#8a6a2c" stroke-width="1" fill="none" opacity=".8">
  <path d="M64 232C120 160 252 150 358 236" transform="translate(0 1.6)"/><path d="M174 80C176 150 170 214 176 270" transform="translate(1.6 0)"/>
</g>
${[
  [174, 152],
  [278, 154],
  [112, 176],
  [320, 196],
]
  .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#c4a060" ${OL}/><circle cx="${(x as number) - 1.4}" cy="${(y as number) - 1.4}" r="1.6" fill="#fff0b8" opacity=".8"/>`)
  .join('')}
<!-- očka na okraji -->
${rep(10, (i) => `<circle cx="${74 + i * 32}" cy="${267 + Math.sin(i) * 1.5}" r="2.6" fill="#c4a060" ${ol}/>`)}
<!-- cedulka na plachtě -->
<g transform="rotate(-4 218 188)">
  <rect x="160" y="170" width="116" height="34" rx="2" fill="#d4b078" ${OL}/>
  <rect x="164" y="174" width="108" height="26" fill="#ecd9a0" ${ol}/>
  <text x="218" y="184" text-anchor="middle" font-family="'Segoe Script','Comic Sans MS',cursive" font-size="8.6" font-weight="bold" fill="#a41c1c">VÁNOČNÍ DEKORACE</text>
  <text x="218" y="195" text-anchor="middle" font-family="'Segoe Script','Comic Sans MS',cursive" font-size="7.4" fill="#2a2a2e">(neotvírat, nesahat)</text>
  <path d="M158 176l8 -3 M278 198l-8 3" stroke="#e8e0c4" stroke-width="5" opacity=".85"/>
  <path d="M218 170V160" stroke="#3b2214" stroke-width="1.4"/>
</g>
<!-- boty pod plachtou? ne, jen drobečky -->
${rep(7, (i) => `<ellipse cx="${100 + i * 33}" cy="${280 + (i % 3) * 3}" rx="2.2" ry="1.2" fill="#e8d4a0" opacity=".85"/>`)}
`;

/* ------------------------------------------------------------------ */
/*  Odhalený rohlík                                                    */
/* ------------------------------------------------------------------ */

type P = [number, number];

function bez(p0: P, p1: P, p2: P, p3: P, t: number): P {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}

const centre = (t: number): P =>
  t < 0.5
    ? bez([78, 262], [60, 184], [126, 116], [215, 116], t * 2)
    : bez([215, 116], [304, 116], [370, 184], [352, 262], (t - 0.5) * 2);

const thick = (t: number): number => 6 + 72 * Math.pow(Math.sin(Math.PI * t), 0.8);

function frame(t: number): { c: P; n: P; w: number } {
  const e = 0.004;
  const a = centre(Math.max(0, t - e));
  const b = centre(Math.min(1, t + e));
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  return { c: centre(t), n: [dy / l, -dx / l], w: thick(t) };
}

function croissant(): string {
  const N = 26;
  const fr = Array.from({ length: N + 1 }, (_, i) => frame(i / N));
  const outer = fr.map((f) => [f.c[0] + f.n[0] * f.w * 0.5, f.c[1] + f.n[1] * f.w * 0.5] as P);
  const inner = fr.map((f) => [f.c[0] - f.n[0] * f.w * 0.5, f.c[1] - f.n[1] * f.w * 0.5] as P);
  const f2 = (p: P): string => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  const outline = `M${outer.map(f2).join('L')}L${[...inner].reverse().map(f2).join('L')}z`;
  const segs = Array.from({ length: N }, (_, i) => {
    const col = i % 2 ? 'url(#zbrollA)' : 'url(#zbrollB)';
    return `<path d="M${f2(outer[i])}L${f2(outer[i + 1])}L${f2(inner[i + 1])}L${f2(inner[i])}z" fill="${col}" stroke="#4a4a52" stroke-width=".9"/>`;
  }).join('');
  const hl = fr.map((f) => `${(f.c[0] + f.n[0] * f.w * 0.3).toFixed(1)},${(f.c[1] + f.n[1] * f.w * 0.3).toFixed(1)}`).join(' ');
  const shd = fr.map((f) => `${(f.c[0] - f.n[0] * f.w * 0.34).toFixed(1)},${(f.c[1] - f.n[1] * f.w * 0.34).toFixed(1)}`).join(' ');
  const rust = [0.08, 0.27, 0.46, 0.7, 0.9]
    .map((t, i) => {
      const f = frame(t);
      return `<ellipse cx="${(f.c[0] + f.n[0] * f.w * 0.15).toFixed(1)}" cy="${(f.c[1] + f.n[1] * f.w * 0.15).toFixed(1)}" rx="${7 + (i % 3) * 3}" ry="${4 + (i % 2) * 2}" fill="#8a4a2a" opacity=".38"/>`;
    })
    .join('');
  // poklop na spodku levé nohy
  const h = frame(0.12);
  const ang = (Math.atan2(h.n[1], h.n[0]) * 180) / Math.PI + 90;
  const hatch = `
<g transform="translate(${h.c[0].toFixed(1)} ${h.c[1].toFixed(1)}) rotate(${ang.toFixed(1)})">
  <rect x="-15" y="-15" width="30" height="30" rx="2.6" fill="url(#zbiron)" ${OL}/>
  <rect x="-12" y="-12" width="24" height="24" fill="none" stroke="#3a3a42" stroke-width="1.2"/>
  ${[
    [-11, -11],
    [11, -11],
    [-11, 11],
    [11, 11],
  ]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.7" fill="#e8eaec" stroke="#3a3a42" stroke-width=".7"/>`)
    .join('')}
  <rect x="-9" y="-1.6" width="18" height="3.2" rx="1.2" fill="#18181c"/>
  <rect x="-7" y="-9" width="14" height="3" rx="1" fill="#c8a040" ${ol}/>
  <path d="M-14 14l28 0" stroke="#fff" stroke-width="1" opacity=".4"/>
</g>
<circle cx="${(h.c[0] - 2).toFixed(1)}" cy="${(h.c[1] - 2).toFixed(1)}" r="22" fill="url(#zbspark)"/>`;
  const trestle = (x: number): string =>
    `<path d="M${x - 28} 276L${x - 20} 256H${x + 20}L${x + 28} 276z" fill="#b8844c" ${OL}/><path d="M${x - 22} 262H${x + 22}" stroke="#7a5530" stroke-width="1.6"/><path d="M${x - 16} 276V266M${x + 16} 276V266" stroke="#6a4420" stroke-width="3"/>`;
  return `
<ellipse cx="216" cy="276" rx="170" ry="12" fill="#000" opacity=".36"/>
${trestle(80)}${trestle(350)}
<path d="${outline}" fill="#6a6a74" ${OL}/>
${segs}
<polyline points="${hl}" fill="none" stroke="#fff" stroke-width="4" opacity=".38" stroke-linecap="round"/>
<polyline points="${shd}" fill="none" stroke="#1a1a22" stroke-width="4" opacity=".28" stroke-linecap="round"/>
${rust}
<path d="${outline}" fill="none" stroke="#2a2a32" stroke-width="2"/>
${hatch}
`;
}

/** Sklopená plachta na zemi vedle odhaleného rohlíku. */
const tarpPile = `
<ellipse cx="368" cy="306" rx="46" ry="8" fill="#000" opacity=".32"/>
<path d="M326 306C320 290 334 276 352 280C362 270 388 270 396 288C412 292 410 306 396 308C380 314 340 314 326 306z" fill="url(#zbtarp)" ${OL}/>
<path d="M340 296q12 -8 22 0M366 290q14 -6 22 4M346 304q18 4 36 0" stroke="#2a3a18" stroke-width="2.4" fill="none" opacity=".55"/>
<path d="M334 296C346 286 360 284 372 288" stroke="#bccf88" stroke-width="3" fill="none" opacity=".4"/>
<path d="M380 296q10 -2 14 8" stroke="#d4b878" stroke-width="3" fill="none" stroke-linecap="round"/>
<circle cx="338" cy="300" r="2.6" fill="#c4a060" ${ol}/>
`;

export function zbrojniceBase(variant: ZbrojniceVariant): string {
  return `
<defs>
  <linearGradient id="zbplaster" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2e6c2"/><stop offset="1" stop-color="#cdb88a"/></linearGradient>
  <linearGradient id="zbbrick" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a4a34"/><stop offset="1" stop-color="#6e3022"/></linearGradient>
  <linearGradient id="zbside" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b09a70"/><stop offset="1" stop-color="#7a6a4a"/></linearGradient>
  <linearGradient id="zbfloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a9a9e"/><stop offset="1" stop-color="#5a5a60"/></linearGradient>
  <linearGradient id="zbmetal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d8dcdf"/><stop offset=".5" stop-color="#b4babe"/><stop offset="1" stop-color="#8e969a"/></linearGradient>
  <linearGradient id="zbdoor" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a8a62"/><stop offset="1" stop-color="#2a5a42"/></linearGradient>
  ${grad('zbtruck', '#d4342a', true, 1.18, 0.72)}
  <linearGradient id="zbtarp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7a9450"/><stop offset=".55" stop-color="#58723a"/><stop offset="1" stop-color="#3a4e26"/></linearGradient>
  <linearGradient id="zbiron" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d2d6da"/><stop offset=".5" stop-color="#8e949a"/><stop offset="1" stop-color="#5a5e66"/></linearGradient>
  <linearGradient id="zbrollA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d0d4d8"/><stop offset="1" stop-color="#7a828a"/></linearGradient>
  <linearGradient id="zbrollB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#aab0b6"/><stop offset="1" stop-color="#5a626a"/></linearGradient>
  <radialGradient id="zbglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".5"/><stop offset=".55" stop-color="#ffd070" stop-opacity=".14"/><stop offset="1" stop-color="#ffd070" stop-opacity="0"/></radialGradient>
  <radialGradient id="zbblue" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#6ab4ff" stop-opacity=".55"/><stop offset="1" stop-color="#6ab4ff" stop-opacity="0"/></radialGradient>
  <radialGradient id="zbspark" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6b0" stop-opacity=".5"/><stop offset="1" stop-color="#fff6b0" stop-opacity="0"/></radialGradient>
  <radialGradient id="zbvig" cx=".5" cy=".5" r=".78"><stop offset=".55" stop-color="#1a0a02" stop-opacity="0"/><stop offset="1" stop-color="#1a0a02" stop-opacity=".5"/></radialGradient>
  ${noise('zbnoise')}
</defs>
${room}
${shutter}
${wallProps}
${exitDoor}
${gear}
${truck}
${variant === 'tarp' ? tarpScene : `${croissant()}${tarpPile}`}
<rect width="640" height="360" fill="url(#zbnoise)"/>
<rect width="640" height="360" fill="url(#zbvig)"/>
`;
}

export default wrap(zbrojniceBase('tarp'));
