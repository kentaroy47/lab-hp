# AGENTS

**プロジェクトの手引きは [CLAUDE.md](./CLAUDE.md) にあります。** 作業前にそちらを読んでください。

内容が二重管理にならないよう、このファイルには要点だけを置いています。

## 特に注意すること

- **クラウド同期フォルダ（Google Drive）に移動しないこと。** `npm install` が壊れ、
  `astro` が終了コード0のまま何も生成せずに終わる
- dev サーバーは Astro 7 が自動でバックグラウンド化する。起動前に `npx astro dev status` を確認
- 色は Tailwind の任意色ではなく `src/styles/global.css` の `@theme` トークンを使う
- コンテンツはテンプレートに直書きせず `src/data/*.ts` か `src/content/projects/*.md` に置く
- 日本語版だけでなく**英語版の文言も必ず入れる**

## Astro docs

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Images](https://docs.astro.build/en/guides/images/)
- [Styling / Tailwind](https://docs.astro.build/en/guides/styling/)
- [i18n](https://docs.astro.build/en/guides/internationalization/)
