'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, App } from 'antd';
import { useState } from 'react';
import zhTW from 'antd/lib/locale/zh_TW';
import { StyleProvider } from '@ant-design/cssinjs';
import { SessionProvider } from 'next-auth/react';

// 電影主題配色
const filmTheme = {
  token: {
    colorPrimary: '#e50914', // Netflix 紅
    colorBgBase: '#141414',
    colorBgContainer: '#1f1f1f',
    colorBgElevated: '#2a2a2a',
    colorText: '#ffffff',
    colorTextSecondary: '#b3b3b3',
    colorBorder: '#404040',
    borderRadius: 8,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Layout: {
      bodyBg: '#141414',
      headerBg: '#141414',
      siderBg: '#1f1f1f',
    },
    Menu: {
      darkItemBg: '#1f1f1f',
      darkItemSelectedBg: '#e50914',
    },
    Card: {
      colorBgContainer: '#1f1f1f',
      colorBorderSecondary: '#404040',
    },
    Input: {
      colorBgContainer: '#2a2a2a',
      colorBorder: '#404040',
    },
    Button: {
      colorPrimaryHover: '#ff1a1a',
    },
    Rate: {
      colorFillContent: '#404040',
    },
  },
};

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000, // 5 分鐘
            gcTime: 10 * 60 * 1000, // 10 分鐘
            refetchOnMount: false,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <StyleProvider layer>
          <ConfigProvider locale={zhTW} theme={filmTheme}>
            <App>{children}</App>
          </ConfigProvider>
        </StyleProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
