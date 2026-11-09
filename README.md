# Záhada v Brdýmově

Česká detektivní adventura s humorem v prohlížeči. Rok 1999, nepovedený detektiv Patrik dostane poslední šanci: v Brdýmově zmizel obří železný rohlík, ve kterém prý je zlato a diamanty.

**Hrát:** https://austy246.github.io/brdym-mystery/

Chodíš po městečku, vyslýcháš lidi, sbíráš předměty a skládáš pravdu. Hra má tři konce.

## Vývoj

```bash
npm install
npm run dev
```

- `npm run build` sestaví hru do `dist/`.
- `npm run voices` namluví všechny repliky do `public/voices/` (Microsoft Edge TTS, neoficiální koncový bod; `-- --force` přegeneruje všechno). Po změně textu replik spusť znovu: soubory se pojmenovávají podle obsahu, takže se namluví jen nové.
- Push do `main` hru automaticky nasadí na GitHub Pages.

## Struktura

- `src/game/`: příběh jako data (`story.ts` úvod a konec, `convs.ts` rozhovory, `locations.ts` místa a klikací plochy, `items.ts` předměty).
- `src/engine.ts`: průzkum, inventář, rozhovory.
- `src/bg/`, `src/backgrounds.ts`, `src/art.ts`: kreslené scény (SVG) a postavy.
