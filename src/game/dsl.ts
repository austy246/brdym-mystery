import type { Cond, Line, SpeakerId } from '../types';

export const say = (who: SpeakerId, text: string, extra: Partial<Line> = {}): Line => ({ who, text, ...extra });

// Zkratky pro řečníky
export const k = (t: string, extra: Partial<Line> = {}): Line => say('karel', t, extra);
export const narr = (t: string, extra: Partial<Line> = {}): Line => say('vypravec', t, extra);
export const nac = (t: string, extra: Partial<Line> = {}): Line => say('nacelnik', t, extra);
export const pepa = (t: string, extra: Partial<Line> = {}): Line => say('pepa', t, extra);
export const sta = (t: string, extra: Partial<Line> = {}): Line => say('starosta', t, extra);
export const loj = (t: string, extra: Partial<Line> = {}): Line => say('hospodsky', t, extra);
export const stam = (t: string, extra: Partial<Line> = {}): Line => say('stamgasti', t, extra);
export const pani = (t: string, extra: Partial<Line> = {}): Line => say('pani', t, extra);
export const ctib = (t: string, extra: Partial<Line> = {}): Line => say('sberatel', t, extra);
export const pek = (t: string, extra: Partial<Line> = {}): Line => say('pekar', t, extra);

// Podmínky
export const flag = (f: string): Cond => (g) => g.flag(f);
export const noflag = (f: string): Cond => (g) => !g.flag(f);
export const has = (i: string): Cond => (g) => g.has(i);
export const hasnt = (i: string): Cond => (g) => !g.has(i);
export const allOf = (...cs: Cond[]): Cond => (g) => cs.every((c) => c(g));
