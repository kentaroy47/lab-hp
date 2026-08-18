# Keio CSG — Lab Website

慶應義塾大学 理工学部 吉岡研究室 (Computing and Sensing Group) の研究室サイト。
Google Sites 版 (https://sites.google.com/keio.jp/keio-csg/) の内容を保持しつつ刷新したもの。

## Important: where this project lives

**このプロジェクトは `C:\Users\kyosh\OneDrive\Documents\Codes\lab-hp` に置くこと。**
Google Drive 同期フォルダ (`G:\マイドライブ\...`) では npm install が `TAR_ENTRY_ERROR` で壊れ、
astro が無言で終了してビルドできない。元の Drive フォルダには `figs/` の原本が残っている。

## Stack

- **Astro 7** (静的出力) + **Tailwind CSS v4** (`@tailwindcss/vite`、設定ファイルなしで `src/styles/global.css` の `@theme` に定義)
- `@astrojs/sitemap` で sitemap 生成
- ビルド成果物は純粋な静的 HTML/CSS/JS

## Commands

```
npm run dev      # dev サーバー (Astro 7 は自動でバックグラウンド化)
npm run build    # 静的ビルド → dist/
npm run preview  # ビルド結果のプレビュー
npx astro dev status / stop / logs   # バックグラウンド dev サーバーの管理
```

## Routing / i18n

日英バイリンガル。Astro の i18n ルーティングで `prefixDefaultLocale: true`。

- `/lab-hp/ja/...`（既定）と `/lab-hp/en/...`
- ページは `src/pages/[locale]/*.astro`。各ページで `getStaticPaths()` が `locales` を回す
- `src/pages/index.astro` はルートから `/ja` への meta refresh リダイレクト
- UI 文言は `src/i18n/strings.ts`。**本文コンテンツは i18n ファイルではなくデータ層に `{ ja, en }` で持たせる**

## Content lives in data, not in templates

ページを触らずに内容を更新できるよう、コンテンツは全て `src/data/` に構造化データとして置く。

| ファイル | 内容 |
|---|---|
| `site.ts` | 研究室名・住所・連絡先・居室 |
| `research.ts` | 研究3テーマ（エッジ計算／自動運転セキュリティ／LiDAR 3Dセンシング） |
| `publications.ts` | 論文 78件 + 受賞・競争的資金・メディア掲載・特許 |
| `members.ts` | PI・博士・修士・学部生・共同研究員・スタッフ・卒業生 |
| `projects.ts` | プロジェクト5件（一覧＋詳細ページを自動生成） |
| `recruit.ts` | 説明会日程・研究トラック・文化・先輩の声・FAQ |
| `news.ts` | ニュース（年別にページ側でグループ化） |
| `highlights.ts` | **学生向け訴求**：CSGで得られるもの／学生受賞／進路／OSS／設備 |

`highlights.ts` は B3・新M1 の獲得を意識した差別化要素（実チップの試作、実車走行、国際共同研究、
メディア掲載、ゼロから始められる、研究費が潤沢）をまとめたもの。トップと Recruit の両方で使う。

## Design system

`figs/` の手描きアイソメトリック・イラストから採色した**暖色系ライトテーマ**。
以前ダークテーマだったが「冷たすぎる」との判断で全面変更した経緯がある。

- 背景 `paper-*`（クリーム）／文字 `navy-*`（基板の紺）／アクセント `coral-*`（車の色）
- 補助 `sand-*`（黄）・`sky-*`（空）
- 色は `src/styles/global.css` の `@theme` に定義。Tailwind の任意色ではなくこのトークンを使う
- `.paper-card` / `.paper-card-hover` / `.trace-grid` はそこに定義したユーティリティ

### Images

- イラスト原本は `figs/`。使うものだけ `src/assets/` にコピーして `astro:assets` の `<Image>` で読む（自動で webp 最適化＋レスポンシブ）
- `csg.png` はロゴ。ヘッダー・フッター・favicon（`public/csg.png`）に使用
- `public/og-cover.webp` は OGP 用

## Deploy

GitHub Pages 想定。`.github/workflows/deploy.yml` が `main` への push でビルド＆デプロイ。

**独自ドメイン (`csg.keio.jp` 等) に移す場合は `astro.config.mjs` の `site` と `base` を変更し、
`public/robots.txt` の Sitemap URL も合わせて更新すること。**

## SEO (旧サイトからの移行時の注意)

旧 Google Sites は Google 検索で上位にあるため、移行時は以下が必要:

1. Search Console に新サイトを登録し `sitemap-index.xml` を送信
2. 旧 Google Sites には自動リダイレクトが設定できないため、各ページ冒頭に移転告知リンクを手動設置
3. Google Scholar・researchmap・学内ディレクトリ等の外部参照 URL を更新
4. 順位が安定するまで旧サイトは残す

構造化データ (`ResearchOrganization` JSON-LD)、canonical、hreflang、OGP は `src/layouts/Layout.astro` で出力済み。

## Astro docs

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Components](https://docs.astro.build/en/basics/astro-components/)
- [Images](https://docs.astro.build/en/guides/images/)
- [i18n](https://docs.astro.build/en/guides/internationalization/)
