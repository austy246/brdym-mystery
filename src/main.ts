import './style.css';
import { settings, saveSettings, click, previewVolume, stopVoice } from './audio';
import { mapBackground } from './backgrounds';
import { h } from './dom';
import { Engine, hasSave } from './engine';
import { pixelView } from './render';

const app = document.getElementById('app') as HTMLElement;

function mount(screen: HTMLElement): void {
  stopVoice();
  app.replaceChildren(screen);
}

/* ---------------- Menu ---------------- */

function startGame(resume: boolean): void {
  const engine = new Engine(showMenu);
  mount(engine.screen);
  if (resume && engine.load()) return;
  engine.newGame();
}

function showMenu(): void {
  const screen = h('div', 'screen menuscreen');
  const mapEl = h('div', 'map');
  const mv = pixelView(320);
  mapEl.append(mv.el);
  mv.set(mapBackground);
  const menu = h('div', 'menu');
  menu.append(
    mapEl,
    h('p', 'subtitle', 'Detektivní adventura'),
    h('h1', 'title', 'Záhada<br>v Brdýmově'),
  );
  if (hasSave()) {
    const cont = h('button', 'btn', 'Pokračovat');
    cont.onclick = () => {
      click();
      startGame(true);
    };
    menu.append(cont);
  }
  const play = h('button', hasSave() ? 'btn ghost' : 'btn', hasSave() ? 'Nová hra' : 'Hrát');
  const opts = h('button', 'btn ghost', 'Nastavení');
  play.onclick = () => {
    click();
    startGame(false);
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
  const screen = h('div', 'screen menuscreen');
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

showMenu();
