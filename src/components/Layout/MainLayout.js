'use client';

import { useState, useMemo } from 'react';
import { Layout, Badge, Avatar, Dropdown, Button } from 'antd';
import {
  HomeOutlined,
  FireOutlined,
  PlayCircleOutlined,
  CalendarOutlined,
  HeartOutlined,
  SearchOutlined,
  UserOutlined,
  StarOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useFavoriteStore } from '@/stores/favoriteStore';
import LoginModal from '@/components/Common/LoginModal';
import {
  StyledLayout,
  StyledHeader,
  Logo,
  HeaderRight,
  StyledSider,
  StyledContent,
  StyledMenu,
  SearchInput,
} from './styled';

export default function MainLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const favorites = useFavoriteStore((state) => state.favorites);
  const { data: session, status } = useSession();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const menuItems = useMemo(() => {
    const baseItems = [
      {
        key: '/',
        icon: <HomeOutlined />,
        label: '首頁',
      },
      {
        key: '/popular',
        icon: <FireOutlined />,
        label: '熱門電影',
      },
      {
        key: '/now-playing',
        icon: <PlayCircleOutlined />,
        label: '正在上映',
      },
      {
        key: '/upcoming',
        icon: <CalendarOutlined />,
        label: '即將上映',
      },
      {
        key: '/top-rated',
        icon: <StarOutlined />,
        label: '最高評分',
      },
    ];

    if (session) {
      baseItems.push({
        key: '/favorites',
        icon: <HeartOutlined />,
        label: '我的收藏',
      });
    }

    return baseItems;
  }, [session]);

  const handleMenuClick = ({ key }) => {
    router.push(key);
  };

  const handleSearch = (value) => {
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleLogout = () => {
    signOut({ redirect: false });
  };

  const userMenuItems = [
    {
      key: 'favorites',
      label: '我的收藏',
      icon: <HeartOutlined />,
      onClick: () => router.push('/favorites'),
    },
    {
      key: 'ratings',
      label: '我的評分',
      icon: <StarOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: '登出',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <StyledLayout>
      <StyledHeader>
        <Logo onClick={() => router.push('/')}>
          <PlayCircleOutlined />
          <span>FilmHub</span>
        </Logo>

        <HeaderRight>
          <SearchInput
            prefix={<SearchOutlined />}
            placeholder="搜尋電影..."
            onPressEnter={(e) => handleSearch(e.target.value)}
            allowClear
          />

          <Badge count={favorites.length} size="small" offset={[-5, 5]}>
            <HeartOutlined
              style={{ fontSize: 20, color: '#b3b3b3', cursor: 'pointer' }}
              onClick={() => router.push('/favorites')}
            />
          </Badge>

          {session ? (
            <Dropdown
              menu={{
                items: userMenuItems,
                style: {
                  background: 'transparent',
                  boxShadow: 'none',
                  border: 'none',
                },
              }}
              placement="bottomRight"
              overlayStyle={{
                minWidth: 160,
              }}
              dropdownRender={(menu) => (
                <div style={{
                  background: '#1f1f1f',
                  borderRadius: 8,
                  padding: 8,
                  border: '1px solid #303030',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
                }}>
                  {menu}
                </div>
              )}
            >
              <Avatar
                style={{ backgroundColor: '#e50914', cursor: 'pointer' }}
                src={session.user?.image}
                icon={!session.user?.image && <UserOutlined />}
              />
            </Dropdown>
          ) : (
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => setLoginModalOpen(true)}
              style={{ borderRadius: 8, padding: '5px 20px' }}
            >
              登入
            </Button>
          )}
        </HeaderRight>
      </StyledHeader>

      <Layout>
        <StyledSider width={200}>
          <StyledMenu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            theme="dark"
          />
        </StyledSider>

        <StyledContent>{children}</StyledContent>
      </Layout>

      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </StyledLayout>
  );
}
