import { h } from './dom';
import { settings, blip, ring, click, chime, sad, playVoice, stopVoice } from './audio';
import { speakers } from './speakers';
import { voiceKey } from './voice';
import { backgrounds } from './backgrounds';
import { items, itemIcon } from './game/items';
import { locations } from './game/locations';
import { convs } from './game/convs';
import { intro } from './game/story';
import type { BgId, Ending, Game, Hotspot, Line, Step } from './types';

const SAVE_KEY = 'zvb-save';

interface SaveData {
  inv: string[];
  flags: string[];
  loc: string;
}

export function hasSave(): boolean {
  try {
    return !!localStorage.getItem(SAVE_KEY);
  } catch {
    return false;
  }
}

function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* nic */
  }
}

type Verb = 'look' | 'talk' | 'use';
const VERBS: { id: Verb; label: string }[] = [
  { id: 'look', label: 'Prohlédnout' },
  { id: 'talk', label: 'Mluvit' },
  { id: 'use', label: 'Použít' },
];

const GENERIC: Record<Verb | 'item', string[]> = {
  look: ['Nic zvláštního.', 'Nic, co by mi pomohlo.', 'Vypadá to jako věc. Prostě věc.'],
  talk: ['Odpověď bych asi nedostal.', 'Tomu nemám co říct.', 'Mluvit s tím je k ničemu.'],
  use: ['To nejde.', 'Tohle teď nepotřebuju.', 'Ne, to nepomůže.'],
  item: ['Tohle tam nepasuje.', 'S tím bych to nezkoušel.', 'To nevypadá jako dobrý nápad.'],
};

const ENDINGS: Record<Ending, { banner: string; cls: string }> = {
  bad: { banner: 'ŠPATNÝ KONEC', cls: 'bad' },
  arrest: { banner: 'HOŘKÝ KONEC: případ vyřešen, ale chutná to divně', cls: 'arrest' },
  mercy: { banner: 'DOBRÝ KONEC: Zlatý rohlík', cls: 'mercy' },
};

export class Engine implements Game {
  inv: string[] = ['prukaz', 'rizek', 'koruna'];
  flags = new Set<string>();
  loc = 'square';

  private mode: 'cut' | 'explore' = 'cut';
  private verb: Verb = 'look';
  private sel: string | null = null;
  private queue: Step[] = [];

  // typewriter
  private typing: number | undefined;
  private typingDone = true;
  private finishTyping: (() => void) | null = null;
  private awaitClick: (() => void) | null = null;

  // DOM
  readonly screen = h('div', 'screen game cut');
  private scene = h('div', 'scene');
  private hots = h('div', 'hots');
  private shield = h('div', 'shield');
  private bar = h('div', 'bar');
  private who = h('div', 'who');
  private msg = h('p', 'msg');
  private more = h('span', 'more', '▼');
  private choices = h('div', 'choices');
  private status = h('div', 'status');
  private verbsEl = h('div', 'verbs');
  private invEl = h('div', 'inv');
  private toasts = h('div', 'toasts');

  constructor(private onMenu: () => void) {
    const stage = h('div', 'stage');
    stage.append(this.scene, this.hots, this.shield, this.toasts);
    const top = h('div', 'topbar');
    const menuBtn = h('button', 'btn ghost', 'Menu');
    menuBtn.onclick = (e) => {
      e.stopPropagation();
      this.dispose();
      this.onMenu();
    };
    top.append(menuBtn);

    const ctrl = h('div', 'ctrl');
    for (const v of VERBS) {
      const b = h('button', 'verb', v.label);
      b.dataset.verb = v.id;
      b.onclick = (e) => {
        e.stopPropagation();
        click();
        this.setVerb(v.id);
      };
      this.verbsEl.append(b);
    }
    ctrl.append(this.verbsEl, this.invEl);

    const text = h('div', 'text');
    text.append(this.who, this.msg, this.more, this.choices);
    this.bar.append(this.status, text, ctrl);
    this.screen.append(stage, top, this.bar);

    this.shield.onclick = () => this.advance();
    this.bar.onclick = () => this.advance();
    this.setVerb('look');
  }

  dispose(): void {
    this.stopTyping();
    stopVoice();
  }

  /* ---------------- Game ---------------- */

  has(item: string): boolean {
    return this.inv.includes(item);
  }
  flag(f: string): boolean {
    return this.flags.has(f);
  }

  /* ---------------- Start / načtení ---------------- */

  newGame(): void {
    clearSave();
    this.inv = ['prukaz', 'rizek', 'koruna'];
    this.flags.clear();
    this.mode = 'cut';
    this.renderMode();
    this.renderInv();
    this.exec(intro);
  }

  load(): boolean {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const s = JSON.parse(raw) as SaveData;
      this.inv = s.inv;
      this.flags = new Set(s.flags);
      this.loc = locations[s.loc] ? s.loc : 'square';
      this.mode = 'explore';
      this.renderMode();
      this.renderInv();
      this.showLocation(this.loc, false);
      return true;
    } catch {
      return false;
    }
  }

  private save(): void {
    if (this.mode !== 'explore') return;
    try {
      const s: SaveData = { inv: this.inv, flags: [...this.flags], loc: this.loc };
      localStorage.setItem(SAVE_KEY, JSON.stringify(s));
    } catch {
      /* nic */
    }
  }

  /* ---------------- Scéna a průzkum ---------------- */

  private setScene(bg: BgId): void {
    this.scene.innerHTML = backgrounds[bg];
  }

  private renderMode(): void {
    this.screen.classList.toggle('cut', this.mode === 'cut');
    this.screen.classList.toggle('explore', this.mode === 'explore');
  }

  private showLocation(id: string, runEnter = true): void {
    const loc = locations[id];
    this.loc = id;
    this.mode = 'explore';
    this.renderMode();
    this.setScene(typeof loc.bg === 'function' ? loc.bg(this) : loc.bg);
    this.hots.replaceChildren();
    for (const hs of loc.hotspots) {
      if (hs.show && !hs.show(this)) continue;
      const el = h('div', 'hot');
      const [x, y, w, hh] = hs.rect;
      el.style.left = `${(x / 640) * 100}%`;
      el.style.top = `${(y / 360) * 100}%`;
      el.style.width = `${(w / 640) * 100}%`;
      el.style.height = `${(hh / 360) * 100}%`;
      el.dataset.id = hs.id;
      el.onmouseenter = () => this.setStatus(this.verbText(hs));
      el.onmouseleave = () => this.setStatus('');
      el.onclick = (e) => {
        e.stopPropagation();
        this.clickHot(hs);
      };
      this.hots.append(el);
    }
    this.clearMsg();
    this.save();
    const visited = `visited_${id}`;
    if (runEnter && loc.enter && !this.flags.has(visited)) {
      this.flags.add(visited);
      this.save();
      this.queue.unshift(...loc.enter);
    }
  }

  private verbText(hs: Hotspot): string {
    if (this.sel) return `Použít ${items[this.sel].name} na: ${hs.name}`;
    if (hs.go) return `Jít: ${hs.name}`;
    const v = VERBS.find((x) => x.id === this.verb)!.label;
    return `${v}: ${hs.name}`;
  }

  private setVerb(v: Verb): void {
    this.verb = v;
    this.sel = null;
    this.verbsEl.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.verb === v));
    this.renderInv();
  }

  private setStatus(t: string): void {
    this.status.textContent = t;
  }

  private clickHot(hs: Hotspot): void {
    if (this.mode !== 'explore' || this.queue.length || this.awaitClick) return;
    click();
    if (this.sel) {
      const used = this.sel;
      this.sel = null;
      this.renderInv();
      const script = hs.item?.[used];
      this.exec(script ?? [this.generic('item')]);
      return;
    }
    if (hs.go) {
      if (hs.gate && !hs.gate.ok(this)) {
        this.exec(hs.gate.fail);
        return;
      }
      this.exec([{ go: hs.go }]);
      return;
    }
    const script = hs[this.verb];
    this.exec(script ?? [this.generic(this.verb)]);
  }

  private generic(kind: Verb | 'item'): Line {
    const pool = GENERIC[kind];
    return { who: 'karel', text: pool[Math.floor(Math.random() * pool.length)], silent: true };
  }

  /* ---------------- Inventář ---------------- */

  private renderInv(): void {
    this.invEl.replaceChildren();
    for (const id of this.inv) {
      const it = items[id];
      const slot = h('button', 'slot' + (this.sel === id ? ' on' : ''), itemIcon(id));
      slot.title = `${it.name}: ${it.desc}`;
      slot.onmouseenter = () => this.setStatus(`${it.name}: ${it.desc}`);
      slot.onmouseleave = () => this.setStatus('');
      slot.onclick = (e) => {
        e.stopPropagation();
        if (this.mode !== 'explore' || this.queue.length || this.awaitClick) return;
        click();
        this.sel = this.sel === id ? null : id;
        this.renderInv();
        this.setStatus(this.sel ? `Vybráno: ${it.name}. Klikni na věc ve scéně.` : '');
      };
      this.invEl.append(slot);
    }
  }

  private toast(t: string): void {
    const el = h('div', 'toast', t);
    this.toasts.append(el);
    window.setTimeout(() => el.remove(), 2600);
  }

  /* ---------------- Skripty ---------------- */

  private exec(steps: Step[]): void {
    this.queue.unshift(...steps);
    this.shield.classList.add('on');
    this.pump();
  }

  private pump(): void {
    this.awaitClick = null;
    while (this.queue.length) {
      const s = this.queue.shift() as Step;
      if ('who' in s) {
        this.sayLine(s);
        return;
      }
      if ('give' in s) {
        if (!this.inv.includes(s.give)) this.inv.push(s.give);
        this.renderInv();
        this.toast(`Získáno: ${items[s.give].name}`);
        chime();
        this.save();
      } else if ('take' in s) {
        this.inv = this.inv.filter((i) => i !== s.take);
        this.renderInv();
        this.save();
      } else if ('set' in s) {
        this.flags.add(s.set);
        this.save();
      } else if ('unset' in s) {
        this.flags.delete(s.unset);
      } else if ('toast' in s) {
        this.toast(s.toast);
      } else if ('bg' in s) {
        this.mode = 'cut';
        this.renderMode();
        this.setScene(s.bg);
      } else if ('go' in s) {
        this.showLocation(s.go);
      } else if ('when' in s) {
        this.queue.unshift(...(s.when(this) ? s.then : (s.else ?? [])));
      } else if ('choice' in s) {
        this.showChoices(s.choice.filter((c) => !c.if || c.if(this)).map((c) => ({ label: c.label, go: () => this.queue.unshift(...c.steps) })));
        return;
      } else if ('talk' in s) {
        this.showTopics(s.talk);
        return;
      } else if ('end' in s) {
        this.finish(s.end);
        return;
      }
    }
    // hotovo
    this.shield.classList.remove('on');
    this.clearMsg();
    this.save();
  }

  private advance(): void {
    if (!this.typingDone) {
      this.finishTyping?.();
      return;
    }
    const f = this.awaitClick;
    if (f) {
      this.awaitClick = null;
      click();
      f();
    }
  }

  private clearMsg(): void {
    this.stopTyping();
    stopVoice();
    this.who.style.display = 'none';
    this.msg.textContent = '';
    this.more.style.display = 'none';
    this.choices.replaceChildren();
    this.bar.classList.remove('talking');
  }

  private stopTyping(): void {
    if (this.typing !== undefined) window.clearInterval(this.typing);
    this.typing = undefined;
    this.typingDone = true;
    this.finishTyping = null;
  }

  private sayLine(l: Line): void {
    this.stopTyping();
    stopVoice();
    this.choices.replaceChildren();
    this.bar.classList.add('talking');
    const sp = speakers[l.who];
    this.who.textContent = sp.name;
    this.who.style.display = sp.name ? '' : 'none';
    this.msg.className = 'msg' + (sp.name ? '' : ' narr');
    this.more.style.display = 'none';

    if (l.sfx === 'ring') ring();
    if (l.sfx === 'sad') sad();
    if (l.sfx === 'chime') chime();

    const useVoice = settings.voices && !l.silent;
    const vp = useVoice
      ? playVoice(`${import.meta.env.BASE_URL}voices/${voiceKey(l)}.mp3`, sp.voice.effect)
      : null;

    const text = l.text;
    const delays = [0, 55, 32, 16, 0];
    const delay = delays[settings.textSpeed];
    let done = false;
    const finish = (): void => {
      if (done) return;
      done = true;
      this.stopTyping();
      this.msg.textContent = text;
      this.more.style.display = '';
      this.awaitClick = () => this.pump();
    };
    this.typingDone = false;
    if (delay === 0) {
      finish();
      return;
    }
    let i = 0;
    this.typing = window.setInterval(() => {
      i++;
      this.msg.textContent = text.slice(0, i);
      const ch = text[i - 1];
      if (sp.pitch && ch !== ' ' && i % 2 === 0 && (!vp || !vp.ok)) blip(sp.pitch);
      if (i >= text.length) finish();
    }, delay);
    this.finishTyping = finish;
  }

  private showChoices(opts: { label: string; go: () => void }[]): void {
    this.stopTyping();
    this.msg.textContent = '';
    this.who.style.display = 'none';
    this.more.style.display = 'none';
    this.choices.replaceChildren();
    opts.forEach((o, i) => {
      const b = h('button', 'btn ghost', `${i + 1}. ${o.label}`);
      b.onclick = (e) => {
        e.stopPropagation();
        click();
        this.choices.replaceChildren();
        o.go();
        this.pump();
      };
      this.choices.append(b);
    });
  }

  private showTopics(convId: string): void {
    const conv = convs[convId];
    const opts: { label: string; go: () => void }[] = [];
    conv.topics.forEach((t, i) => {
      const used = `t:${convId}:${i}`;
      if (t.once && this.flags.has(used)) return;
      if (t.if && !t.if(this)) return;
      opts.push({
        label: t.label,
        go: () => {
          if (t.once) this.flags.add(used);
          this.queue.unshift(...t.steps, { talk: convId });
        },
      });
    });
    opts.push({
      label: 'Nashle.',
      go: () => {
        if (conv.bye) this.queue.unshift(...conv.bye);
      },
    });
    this.showChoices(opts);
  }

  private finish(end: Ending): void {
    clearSave();
    this.shield.classList.remove('on');
    this.clearMsg();
    const e = ENDINGS[end];
    this.who.style.display = 'none';
    this.msg.textContent = '';
    this.choices.replaceChildren(
      h('div', `banner ${e.cls}`, e.banner),
    );
    const row = h('div', 'endrow');
    const again = h('button', 'btn', 'Hrát znovu');
    again.onclick = (ev) => {
      ev.stopPropagation();
      click();
      this.newGame();
    };
    const menu = h('button', 'btn ghost', 'Hlavní menu');
    menu.onclick = (ev) => {
      ev.stopPropagation();
      this.dispose();
      this.onMenu();
    };
    row.append(again, menu);
    this.choices.append(row);
  }
}
