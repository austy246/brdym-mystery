import './style.css';
import {
  settings,
  saveSettings,
  blip,
  ring,
  click,
  chime,
  sad,
  previewVolume,
  playVoice,
  stopVoice,
  type VoicePlayback,
} from './audio';
import { story, speakers } from './story';
import { backgrounds, mapBackground } from './backgrounds';

const app = document.getElementById('app') as HTMLElement;

function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  cls = '',
  html = '',
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

function mount(screen: HTMLElement): void {
  stopTyping();
  stopVoice();
  app.replaceChildren(screen);
}

/* ---------------- Menu ---------------- */

function showMenu(): void {
  const screen = h('div', 'screen');
  const menu = h('div', 'menu');
  menu.append(
    h('div', 'map', mapBackground),
    h('p', 'subtitle', 'Detektivní adventura'),
    h('h1', 'title', 'Záhada<br>v Brdýmově'),
  );
  const play = h('button', 'btn', 'Hrát');
  const opts = h('button', 'btn ghost', 'Nastavení');
  play.onclick = () => {
    click();
    play_('start');
  };
  opts.onclick = () => {
    click();
    showSettings();
  };
  menu.append(play, opts, h('div', 'year', 'Brdýmov, 1999'));
  screen.append(menu);
  mount(screen);
}

/* ---------------- Nastavení ---------------- */

function showSettings(): void {
  const screen = h('div', 'screen');
  const menu = h('div', 'menu');
  const panel = h('div', 'panel');
  panel.append(h('h2', '', 'Nastavení'));

  const volRow = h('div', 'row');
  const volLabel = h('label', '', 'Hlasitost <output></output>');
  const volOut = volLabel.querySelector('output') as HTMLOutputElement;
  const vol = h('input');
  vol.type = 'range';
  vol.min = '0';
  vol.max = '100';
  vol.value = String(Math.round(settings.volume * 100));
  volOut.textContent = `${vol.value} %`;
  vol.oninput = () => {
    settings.volume = Number(vol.value) / 100;
    volOut.textContent = `${vol.value} %`;
    saveSettings();
  };
  vol.onchange = previewVolume;
  volRow.append(volLabel, vol);

  const spdRow = h('div', 'row');
  const spdLabel = h('label', '', 'Rychlost textu <output></output>');
  const spdOut = spdLabel.querySelector('output') as HTMLOutputElement;
  const names = ['', 'pomalu', 'normálně', 'rychle', 'okamžitě'];
  const spd = h('input');
  spd.type = 'range';
  spd.min = '1';
  spd.max = '4';
  spd.step = '1';
  spd.value = String(settings.textSpeed);
  spdOut.textContent = names[settings.textSpeed];
  spd.oninput = () => {
    settings.textSpeed = Number(spd.value);
    spdOut.textContent = names[settings.textSpeed];
    saveSettings();
  };
  spdRow.append(spdLabel, spd);

  const voiceRow = h('div', 'row');
  const voiceLabel = h('label', '', 'Mluvené hlasy <input type="checkbox">');
  const voiceBox = voiceLabel.querySelector('input') as HTMLInputElement;
  voiceBox.checked = settings.voices;
  voiceBox.onchange = () => {
    settings.voices = voiceBox.checked;
    saveSettings();
    click();
  };
  voiceRow.append(voiceLabel);

  const back = h('button', 'btn', 'Zpět');
  back.onclick = () => {
    click();
    showMenu();
  };
  panel.append(volRow, spdRow, voiceRow);
  menu.append(panel, back);
  screen.append(menu);
  mount(screen);
}

/* ---------------- Hra ---------------- */

let typingTimer: number | undefined;
let finishTyping: (() => void) | null = null;

function stopTyping(): void {
  if (typingTimer !== undefined) window.clearInterval(typingTimer);
  typingTimer = undefined;
  finishTyping = null;
}

function play_(id: string): void {
  const node = story[id];
  const sp = speakers[node.speaker];

  const screen = h('div', 'screen');
  const stage = h('div', 'stage', backgrounds[node.bg]);
  const top = h('div', 'topbar');
  const menuBtn = h('button', 'btn ghost', 'Menu');
  menuBtn.onclick = (e) => {
    e.stopPropagation();
    showMenu();
  };
  top.append(menuBtn);

  const dialog = h('div', 'dialog');
  if (sp.name) dialog.append(h('div', 'who', sp.name));
  const text = h('p', sp.name ? 'text' : 'text narr');
  dialog.append(text);
  screen.append(stage, top, dialog);
  mount(screen);

  if (node.sfx === 'ring') ring();
  if (node.sfx === 'sad') sad();
  if (node.sfx === 'chime') chime();

  // namluvená replika (id uzlu = název souboru); při chybě se vrátí pípání
  const voice: VoicePlayback | null = settings.voices
    ? playVoice(`${import.meta.env.BASE_URL}voices/${id}.mp3`, sp.voice.effect)
    : null;

  const afterText = (): void => {
    text.textContent = node.text;
    dialog.querySelector('.more')?.remove();
    if (node.choices) {
      const box = h('div', 'choices');
      node.choices.forEach((c, i) => {
        const b = h('button', 'btn ghost', `${i + 1}. ${c.label}`);
        b.onclick = (e) => {
          e.stopPropagation();
          click();
          play_(c.next);
        };
        box.append(b);
      });
      dialog.append(box);
    } else if (node.ending) {
      dialog.append(h('div', `banner ${node.ending}`, node.ending === 'bad' ? 'ŠPATNÝ KONEC' : 'KONEC UKÁZKY – pokračování příště'));
      const row = h('div', 'endrow');
      const again = h('button', 'btn', 'Zkusit znovu');
      again.onclick = (e) => {
        e.stopPropagation();
        click();
        play_('start');
      };
      const menu = h('button', 'btn ghost', 'Hlavní menu');
      menu.onclick = (e) => {
        e.stopPropagation();
        showMenu();
      };
      row.append(again, menu);
      dialog.append(row);
    } else {
      dialog.append(h('span', 'more', '▼'));
    }
  };

  // psací stroj + pípání podle postavy
  const delays = [0, 55, 32, 16, 0];
  const delay = delays[settings.textSpeed];
  let done = false;
  const finish = (): void => {
    if (done) return;
    done = true;
    stopTyping();
    afterText();
  };

  if (delay === 0) {
    finish();
  } else {
    let i = 0;
    typingTimer = window.setInterval(() => {
      i++;
      text.textContent = node.text.slice(0, i);
      const ch = node.text[i - 1];
      if (sp.pitch && ch !== ' ' && i % 2 === 0 && !(voice && voice.ok)) blip(sp.pitch);
      if (i >= node.text.length) finish();
    }, delay);
    finishTyping = finish;
  }

  dialog.onclick = () => {
    if (!done) {
      finishTyping?.();
      return;
    }
    if (node.next) {
      click();
      play_(node.next);
    }
  };
  stage.onclick = dialog.onclick;
}

showMenu();
