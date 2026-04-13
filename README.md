# FilmHub Dashboard

電影資訊瀏覽平台，串接 TMDB API，提供電影搜尋、分類瀏覽、收藏清單等功能。

## 功能

- **電影瀏覽** - 首頁 Hero Banner、趨勢排行、分類 Tab 切換（熱門 / 上映中 / 高評分）
- **電影詳情** - 完整資訊、演員列表、相似推薦
- **搜尋** - 關鍵字即時搜尋
- **收藏** - 加入 / 移除我的最愛，資料存在 LocalStorage
- **評分** - 使用者可自訂評分
- **登入** - 支援 Google OAuth 與測試帳號

## 技術

| 類別 | 使用 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| UI | Ant Design 6 + styled-components |
| 狀態管理 | Zustand 5 (persist middleware) |
| 資料請求 | TanStack Query 5 |
| 認證 | NextAuth 5 (Google Provider) |

## 專案結構

```
src/
├── app/                  # 頁面路由
├── components/           # UI 元件
│   ├── Common/           # 共用（Modal 等）
│   ├── Layout/           # 版面配置
│   └── Movies/           # 電影相關元件
├── hooks/                # Custom Hooks
├── services/             # API 封裝
├── stores/               # Zustand stores
└── styles/               # 共用樣式
```

## 啟動

```bash
# 安裝
npm install

# 環境變數 (建立 .env.local)
TMDB_API_KEY=你的_TMDB_API_Key
GOOGLE_CLIENT_ID=你的_Google_Client_ID
GOOGLE_CLIENT_SECRET=你的_Google_Client_Secret
AUTH_SECRET=任意亂數字串

# 開發
npm run dev
```

打開 http://localhost:3000

**測試帳號：** `demo@filmhub.com` / `demo123`

## API Key 申請

TMDB API Key 可在 [TMDB 官網](https://www.themoviedb.org/settings/api) 免費申請。
