'use client';

import { useState } from 'react';
import { Card, Rate, Tag, Tooltip } from 'antd';
import { HeartOutlined, HeartFilled, PlayCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { useFavoriteStore } from '@/stores/favoriteStore';
import { getImageUrl } from '@/services/tmdbService';
import LoginModal from '@/components/Common/LoginModal';

const StyledCard = styled(Card)`
  background: #1f1f1f;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(229, 9, 20, 0.3);

    .poster-overlay {
      opacity: 1;
    }

    .play-icon {
      transform: scale(1);
    }
  }

  .ant-card-cover {
    position: relative;
    overflow: hidden;

    img {
      transition: transform 0.3s ease;
    }
  }

  &:hover .ant-card-cover img {
    transform: scale(1.05);
  }

  .ant-card-body {
    padding: 16px;
  }
`;

const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  overflow: hidden;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PosterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayIcon = styled(PlayCircleOutlined)`
  font-size: 64px;
  color: #ffffff;
  transform: scale(0.8);
  transition: transform 0.3s ease;
`;

const FavoriteButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(229, 9, 20, 0.8);
    transform: scale(1.1);
  }
`;

const RatingBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.8);
  padding: 4px 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.$rating >= 7 ? '#4caf50' : props.$rating >= 5 ? '#ff9800' : '#f44336')};
`;

const MovieTitle = styled.h3`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #b3b3b3;
  font-size: 13px;
`;

const GenreTags = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export default function MovieCard({ movie, showGenres = false }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavoriteStore();
  const isFavorited = favorites.some((item) => item.id === movie.id);

  const handleClick = () => {
    router.push(`/movies/${movie.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
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

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <StyledCard
      hoverable
      onClick={handleClick}
      cover={
        <PosterContainer>
          <Poster
            src={getImageUrl(movie.poster_path, 'medium')}
            alt={movie.title}
            onError={(e) => {
              e.target.src = '/placeholder.svg';
            }}
          />
          <PosterOverlay className="poster-overlay">
            <PlayIcon className="play-icon" />
          </PosterOverlay>
          <FavoriteButton onClick={handleFavoriteClick}>
            {isFavorited ? (
              <HeartFilled style={{ color: '#e50914', fontSize: 18 }} />
            ) : (
              <HeartOutlined style={{ color: '#ffffff', fontSize: 18 }} />
            )}
          </FavoriteButton>
          <RatingBadge $rating={movie.vote_average}>
            ⭐ {rating}
          </RatingBadge>
        </PosterContainer>
      }
    >
      <Tooltip title={movie.title}>
        <MovieTitle>{movie.title}</MovieTitle>
      </Tooltip>
      <MovieInfo>
        <span>{releaseYear}</span>
        <Rate disabled defaultValue={movie.vote_average / 2} count={5} style={{ fontSize: 12 }} />
      </MovieInfo>
      {showGenres && movie.genre_ids && (
        <GenreTags>
          {movie.genre_ids.slice(0, 2).map((genreId) => (
            <Tag key={genreId} color="default" style={{ margin: 0 }}>
              {genreId}
            </Tag>
          ))}
        </GenreTags>
      )}
      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </StyledCard>
  );
}
