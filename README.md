# FilmHub Dashboard

電影資訊平台，整合 TMDB API 提供電影搜尋、收藏與詳細資訊。

## Features

- 電影瀏覽與搜尋
- 收藏清單管理
- 電影詳細資訊（演員、評分、相似電影）
- Google OAuth 登入

## Tech Stack

- Next.js 16 (App Router) + React 19
- Ant Design + styled-components
- TanStack Query + Zustand
- NextAuth + Axios

## Getting Started

安裝依賴：
```bash
npm install
```

設定環境變數（`.env.local`）：
```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key
```

取得 API Key：[TMDB API](https://www.themoviedb.org/settings/api)

啟動開發伺服器：
```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)

