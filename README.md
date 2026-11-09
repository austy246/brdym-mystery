# Záhada v Brdýmově

Česká detektivní adventura s humorem v prohlížeči. Rok 1999, nepovedený detektiv Patrik dostane poslední šanci: v Brdýmově zmizel obří železný rohlík.

**Hrát:** https://austy246.github.io/brdym-mystery/

## Vývoj

```bash
npm install
npm run dev
```

- `npm run build` sestaví hru do `dist/`.
- `npm run voices` namluví repliky ze `src/story.ts` do `public/voices/` (Microsoft Edge TTS; `-- --force` přegeneruje všechny).
- Push do `main` hru automaticky nasadí na GitHub Pages.
