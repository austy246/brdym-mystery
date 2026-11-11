/**
 * Pixelový renderer: SVG scénu zmenší na nízké rozlišení, zesytí barvy,
 * přidá zrno, kvantizuje na omezenou paletu s uspořádaným rozptylem a zvětší
 * bez vyhlazování. Výsledek vypadá jako předrenderovaná 256barevná grafika.
 */

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const LEVELS = [14, 16, 12]; // úrovně R, G, B

const ANIM_CSS: Array<[string, string]> = [
  ['.car', 'bump .5s ease-in-out infinite alternate'],
  ['.poles', 'scroll 1.6s linear infinite'],
  ['.dashes', 'dash .5s linear infinite'],
  ['.cloud1', 'drift 40s linear infinite alternate'],
  ['.cloud2', 'drift 55s linear infinite alternate-reverse'],
];

function prepare(svg: string, t: number | null, overlay = ''): string {
  let s = svg
    .replace(/<rect width="\d+" height="\d+" fill="url\(#\w*(?:vig|noise)\w*\)"\/>/g, '')
    .replace('<svg ', '<svg width="640" height="360" ');
  const vb = /viewBox="0 0 (\d+) (\d+)"/.exec(svg);
  if (vb) s = s.replace('width="640" height="360"', `width="${vb[1]}" height="${vb[2]}"`);
  if (overlay) s = s.replace(/<\/svg>\s*$/, `${overlay}</svg>`);
  if (t !== null) {
    const css =
      `@keyframes bump{to{transform:translateY(-3px)}}@keyframes scroll{to{transform:translateX(-120px)}}` +
      `@keyframes dash{to{stroke-dashoffset:-74}}@keyframes drift{to{transform:translateX(90px)}}` +
      ANIM_CSS.map(([sel, a]) => `${sel}{animation:${a};animation-play-state:paused;animation-delay:-${t.toFixed(2)}s}`).join('');
    s = s.replace(/(<svg[^>]*>)/, `$1<style>${css}</style>`);
  }
  return s;
}

function grade(data: Uint8ClampedArray, w: number, h: number): void {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      const l = 0.3 * r + 0.59 * g + 0.11 * b;
      const k = 1.4; // sytost
      r = l + (r - l) * k;
      g = l + (g - l) * k;
      b = l + (b - l) * k;
      // kontrast a zvednuté stíny
      r = (r - 128) * 1.08 + 134;
      g = (g - 128) * 1.08 + 134;
      b = (b - 128) * 1.08 + 134;
      // zrno (pevné podle pozice)
      const hs = ((x * 73856093) ^ (y * 19349663)) >>> 0;
      const n = ((hs % 1000) / 1000 - 0.5) * 3;
      const d = BAYER[(y & 3) * 4 + (x & 3)] / 16 - 0.5;
      const q = (v: number, lv: number): number => {
        const step = 255 / (lv - 1);
        const u = (Math.max(0, Math.min(255, v + n)) / step) + d * 0.6;
        return Math.max(0, Math.min(lv - 1, Math.round(u))) * step;
      };
      data[i] = q(r, LEVELS[0]);
      data[i + 1] = q(g, LEVELS[1]);
      data[i + 2] = q(b, LEVELS[2]);
    }
  }
}

export interface PixelView {
  el: HTMLCanvasElement;
  set(svg: string, overlay?: () => string): void;
  refresh(): void;
  stop(): void;
}

/** Vytvoří plátno, které zobrazuje SVG scény v pixelovém stylu. */
export function pixelView(width = 320): PixelView {
  const el = document.createElement('canvas');
  el.className = 'pixel';
  const low = document.createElement('canvas');
  let timer: number | undefined;
  let token = 0;

  const draw = (img: HTMLImageElement): void => {
    const ar = (img.naturalHeight || 360) / (img.naturalWidth || 640);
    const w = width;
    const h = Math.round(width * ar);
    if (low.width !== w || low.height !== h) {
      low.width = w;
      low.height = h;
      el.width = w;
      el.height = h;
    }
    const c = low.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
    c.imageSmoothingEnabled = true;
    c.imageSmoothingQuality = 'high';
    c.drawImage(img, 0, 0, w, h);
    const data = c.getImageData(0, 0, w, h);
    grade(data.data, w, h);
    (el.getContext('2d') as CanvasRenderingContext2D).putImageData(data, 0, 0);
  };

  let busy = false;
  let dirty = false;
  let cur = '';
  let overlayFn: (() => string) | null = null;
  let t0 = 0;
  let animated = false;

  const render = (): void => {
    if (busy) {
      dirty = true;
      return;
    }
    busy = true;
    const my = token;
    const t = animated ? (performance.now() - t0) / 1000 : null;
    const img = new Image();
    const done = (): void => {
      busy = false;
      if (dirty && my === token) {
        dirty = false;
        render();
      }
    };
    img.onload = () => {
      if (my === token) draw(img);
      done();
    };
    img.onerror = done;
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(prepare(cur, t, overlayFn ? overlayFn() : ''))}`;
  };

  return {
    el,
    set(svg: string, overlay?: () => string): void {
      this.stop();
      token++;
      cur = svg;
      overlayFn = overlay ?? null;
      animated = /class="(?:car|poles|dashes|cloud1)"/.test(svg);
      t0 = performance.now();
      render();
      if (animated) timer = window.setInterval(render, 110);
    },
    refresh(): void {
      if (!animated) render();
    },
    stop(): void {
      token++;
      busy = false;
      dirty = false;
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
    },
  };
}
