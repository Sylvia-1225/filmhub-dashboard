import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/providers';
import MainLayout from '@/components/Layout/MainLayout';
import StyledComponentsRegistry from '@/lib/registry';
import ErrorBoundary from '@/components/Common/ErrorBoundary';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'FilmHub - 電影探索與收藏平台',
  description: '探索熱門電影、收藏你喜愛的電影、分享你的評論',
  keywords: '電影, 影評, 收藏, TMDB, FilmHub',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" className={inter.className}>
      <body>
        <StyledComponentsRegistry>
          <ErrorBoundary>
            <Providers>
              <MainLayout>{children}</MainLayout>
            </Providers>
          </ErrorBoundary>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
