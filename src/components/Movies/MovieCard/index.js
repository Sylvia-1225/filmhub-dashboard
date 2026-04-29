'use client';

import { useState, useCallback, memo } from 'react';
import { Rate, Tag, Tooltip } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useFavoriteStore } from '@/stores/favoriteStore';
import { getImageUrl } from '@/services/imageService';
import LoginModal from '@/components/Common/LoginModal';
import {
  StyledCard,
  PosterContainer,
  Poster,
  PosterOverlay,
  PlayIcon,
  FavoriteButton,
  RatingBadge,
  MovieTitle,
  MovieInfo,
  GenreTags,
} from './styled';

const MovieCard = memo(function MovieCard({ movie, showGenres = false }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavoriteStore();
  
  const isFavorited = favorites.some((item) => item.id === movie.id);

  const handleClick = useCallback(() => {
    router.push(`/movies/${movie.id}`);
  }, [movie.id, router]);

  const handleFavoriteClick = useCallback((e) => {
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
  }, [session, movie, toggleFavorite]);

  const handleCloseModal = useCallback(() => {
    setLoginModalOpen(false);
  }, []);

  const releaseYear = movie.release_date ? 
    new Date(movie.release_date).getFullYear() : 
    'N/A';
  const rating = movie.vote_average ? 
    movie.vote_average.toFixed(1) : 
    'N/A';

  return (
    <StyledCard
      hoverable
      onClick={handleClick}
      cover={
        <PosterContainer>
          <Poster
            src={getImageUrl(movie.poster_path, 'medium')}
            alt={movie.title}
            loading="lazy"
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
        <Rate 
          disabled 
          defaultValue={movie.vote_average / 2} 
          count={5} 
          style={{ fontSize: 12 }} 
        />
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
      
      <LoginModal open={loginModalOpen} onClose={handleCloseModal} />
    </StyledCard>
  );
});

export default MovieCard;
