'use client';

import { Empty, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useFavoriteStore } from '@/stores/favoriteStore';
import MovieList from '@/components/Movies/MovieList';
import {
  PageContainer,
  PageHeaderWithActions,
  HeaderLeft,
  PageTitle,
  SubTitle,
  EmptyContainer,
} from '@/styles/common';
import { ClearButton } from './styled';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavoriteStore();

  const handleClearAll = () => {
    Modal.confirm({
      title: '確認清空收藏',
      icon: <ExclamationCircleOutlined />,
      content: '確定要清空所有收藏的電影嗎？此操作無法復原。',
      okText: '確認清空',
      cancelText: '取消',
      okButtonProps: { danger: true },
      onOk: () => {
        clearFavorites();
      },
    });
  };

  if (favorites.length === 0) {
    return (
      <PageContainer>
        <PageHeaderWithActions>
          <HeaderLeft>
            <PageTitle level={2}>我的收藏</PageTitle>
            <SubTitle>收藏你喜愛的電影</SubTitle>
          </HeaderLeft>
        </PageHeaderWithActions>

        <EmptyContainer>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span style={{ color: '#b3b3b3', fontSize: 16 }}>
                你還沒有收藏任何電影
                <br />
                瀏覽電影並點擊愛心圖示來收藏
              </span>
            }
          />
        </EmptyContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeaderWithActions>
        <HeaderLeft>
          <PageTitle level={2}>我的收藏</PageTitle>
          <SubTitle>共 {favorites.length} 部電影</SubTitle>
        </HeaderLeft>
        <ClearButton icon={<DeleteOutlined />} onClick={handleClearAll}>
          清空全部
        </ClearButton>
      </PageHeaderWithActions>

      <MovieList movies={favorites} emptyText="暫無收藏電影" />
    </PageContainer>
  );
}
