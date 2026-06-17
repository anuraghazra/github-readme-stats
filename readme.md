# github-readme-stats

GitHub README に動的な Stats カードを表示するサービス。[anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats) の fork で、chktkd のプロフィール用にカスタム Vercel デプロイ済み。

## 技術スタック

- Node.js — ランタイム
- Express — ローカル開発サーバー
- Vercel — ホスティング（Serverless Functions）
- Jest — テスト

## セットアップ

前提: Node.js がインストール済みであること。

```bash
git clone https://github.com/chktkd/github-readme-stats.git
cd github-readme-stats
npm install
```

## クイックスタート

```bash
# ローカル開発サーバーを起動
npm run dev
```

http://localhost:9000 でカードの確認ができる。

## 使用方法

### Stats カードの埋め込み

```markdown
![github stats](https://github-readme-stats-gamma-opal-53.vercel.app/api?username=chktkd)
```

### 言語カードの埋め込み

```markdown
![Top Langs](https://github-readme-stats-gamma-opal-53.vercel.app/api/top-langs/?username=chktkd&layout=compact)
```

### デプロイ

Vercel に接続済み。main ブランチへのプッシュで自動デプロイされる。

## ドキュメント

- [docs/](docs/) — 詳細設定・テーマ一覧・高度な使い方

## ディレクトリ構成

```text
github-readme-stats/
├── api/         # Vercel Serverless Functions（stats, pin, top-langs など）
├── src/         # コアロジック（カード生成・テーマ）
├── themes/      # テーマ定義
├── tests/       # テストスイート
├── docs/        # 追加ドキュメント
└── express.js   # ローカル開発サーバー
```

## ライセンス

MIT License — [LICENSE](LICENSE)
