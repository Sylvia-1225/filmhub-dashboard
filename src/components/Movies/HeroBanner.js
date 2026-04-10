'use client';

import { useState } from 'react';
import { Button, Typography, Space, Tag } from 'antd';
import { PlayCircleOutlined, InfoCircleOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { getImageUrl } from '@/services/tmdbService';
import { useFavoriteStore } from '@/stores/favoriteStore';
import LoginModal from '@/components/Common/LoginModal';

const { Title, Paragraph } = Typography;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  margin-bottom: 40px;
  border-radius: 16px;
  overflow: hidden;
`;

const BackdropImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center top;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(20, 20, 20, 0.95) 0%,
    rgba(20, 20, 20, 0.7) 40%,
    rgba(20, 20, 20, 0.3) 100%
  );
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  max-width: 600px;
`;

const MovieTitle = styled(Title)`
  color: #ffffff !important;
  font-size: 48px !important;
  font-weight: 700 !important;
  margin-bottom: 16px !important;
  line-height: 1.2 !important;
`;

const MovieOverview = styled(Paragraph)`
  color: #b3b3b3 !important;
  font-size: 16px !important;
  line-height: 1.6 !important;
  margin-bottom: 24px !important;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const Rating = styled.span`
  color: #4caf50;
  font-weight: 600;
  font-size: 18px;
`;

const Year = styled.span`
  color: #b3b3b3;
  font-size: 16px;
`;

const StyledButton = styled(Button)`
  height: 48px;
  padding: 0 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;

  &.ant-btn-primary {
    background: #e50914;
    border-color: #e50914;

    &:hover {
      background: #ff1a1a !important;
      border-color: #ff1a1a !important;
    }
  }

  &.ant-btn-default {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    color: #ffffff;

    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.5) !important;
    }
  }
`;

export default function HeroBanner({ movie }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorited = favorites.some((item) => item.id === movie?.id);

  if (!movie) return null;

  const handleDetailClick = () => {
    router.push(`/movies/${movie.id}`);
  };

  const handleFavoriteClick = () => {
    if (!session) {
      setLoginModalOpen(true);
      return;
    }
    toggleFavorite({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
    });
  };

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

  return (
    <HeroContainer>
      <BackdropImage $src={getImageUrl(movie.backdrop_path, 'large', 'backdrop')} />
      <Overlay />
      <Content>
        <Tag color="#e50914" style={{ width: 'fit-content', marginBottom: 12 }}>
          🔥 熱門推薦
        </Tag>
        <MovieTitle level={1}>{movie.title}</MovieTitle>
        <MetaInfo>
          <Rating>⭐ {movie.vote_average?.toFixed(1)}</Rating>
          <Year>{releaseYear}</Year>
        </MetaInfo>
        <MovieOverview>{movie.overview || '暫無劇情簡介'}</MovieOverview>
        <Space size="middle">
          <StyledButton
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={handleDetailClick}
          >
            查看詳情
          </StyledButton>
          <StyledButton
            icon={isFavorited ? <HeartFilled style={{ color: '#e50914' }} /> : <HeartOutlined />}
            onClick={handleFavoriteClick}
          >
            {isFavorited ? '已收藏' : '加入收藏'}
          </StyledButton>
        </Space>
      </Content>
      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </HeroContainer>
  );
}
