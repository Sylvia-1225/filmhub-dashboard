'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Row, Col, Typography, Tag, Spin, Button } from 'antd';
import { HeartOutlined, HeartFilled, PlayCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/Common/LoginModal';
import { useMovieDetails, useSimilarMovies } from '@/hooks/useMovies';
import { useFavoriteStore } from '@/stores/favoriteStore';
import { useRatingStore } from '@/stores/ratingStore';
import { getImageUrl } from '@/services/tmdbService';
import MovieList from '@/components/Movies/MovieList';
import MovieBackdrop from '@/components/Movies/MovieBackdrop';
import CastSection from '@/components/Movies/CastSection';
import UserRating from '@/components/Movies/UserRating';
import {
  PageContainer,
  ContentContainer,
  PosterImage,
  MovieInfo,
  MovieTitle,
  MetaInfo,
  RatingContainer,
  RatingValue,
  GenreTags,
  Overview,
  InfoItem,
  ActionButtons,
  StyledButton,
  LoadingContainer,
} from './styled';

const { Text } = Typography;

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = params.id;
  const { data: session } = useSession();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const { data: movie, isLoading } = useMovieDetails(movieId);
  const { data: similarData } = useSimilarMovies(movieId);

  const { favorites, toggleFavorite } = useFavoriteStore();
  const { getRating, setRating } = useRatingStore();

  const isFavorited = favorites.some((item) => item.id === Number(movieId));
  const userRating = getRating(movieId);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  if (!movie) {
    return (
      <PageContainer>
        <Text style={{ color: '#ffffff', fontSize: 18 }}>找不到該電影</Text>
        <Button onClick={() => router.back()}>返回</Button>
      </PageContainer>
    );
  }

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

  const handleRatingChange = (value) => {
    if (!session) {
      setLoginModalOpen(true);
      return;
    }
    setRating(movieId, value);
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}小時 ${mins}分鐘`;
  };

  const formatMoney = (amount) => {
    if (!amount) return 'N/A';
    return `$${(amount / 1000000).toFixed(1)}M`;
  };

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const cast = movie.credits?.cast?.slice(0, 10) || [];
  const trailer = movie.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <PageContainer>
      <MovieBackdrop backdropPath={movie.backdrop_path} />

      <ContentContainer>
        <Row gutter={[40, 32]}>
          <Col xs={24} md={8} lg={6}>
            <PosterImage
              src={getImageUrl(movie.poster_path, 'large')}
              alt={movie.title}
              onError={(e) => {
                e.target.src = '/placeholder.svg';
              }}
            />
          </Col>

          <Col xs={24} md={16} lg={18}>
            <MovieInfo>
              <MovieTitle level={1}>{movie.title}</MovieTitle>

              {movie.tagline && (
                <Text
                  style={{
                    color: '#b3b3b3',
                    fontStyle: 'italic',
                    fontSize: 18,
                    display: 'block',
                    marginBottom: 16,
                  }}
                >
                  &ldquo;{movie.tagline}&rdquo;
                </Text>
              )}

              <MetaInfo>
                <RatingContainer>
                  <RatingValue>⭐ {movie.vote_average?.toFixed(1)}</RatingValue>
                  <Text style={{ color: '#808080' }}>
                    ({movie.vote_count?.toLocaleString()} 評分)
                  </Text>
                </RatingContainer>
                <Text style={{ color: '#b3b3b3' }}>{releaseYear}</Text>
                {movie.runtime && (
                  <Text style={{ color: '#b3b3b3' }}>{formatRuntime(movie.runtime)}</Text>
                )}
              </MetaInfo>

              <GenreTags>
                {movie.genres?.map((genre) => (
                  <Tag key={genre.id} color="#e50914" style={{ fontSize: 14, padding: '4px 12px' }}>
                    {genre.name}
                  </Tag>
                ))}
              </GenreTags>

              <Overview>{movie.overview || '暫無劇情簡介'}</Overview>

              <Row gutter={[24, 12]}>
                <Col span={12}>
                  <InfoItem>
                    <span className="label">製作公司：</span>
                    <span className="value">
                      {movie.production_companies?.map((c) => c.name).join(', ') || 'N/A'}
                    </span>
                  </InfoItem>
                </Col>
                <Col span={12}>
                  <InfoItem>
                    <span className="label">製作國家：</span>
                    <span className="value">
                      {movie.production_countries?.map((c) => c.name).join(', ') || 'N/A'}
                    </span>
                  </InfoItem>
                </Col>
                <Col span={12}>
                  <InfoItem>
                    <span className="label">預算：</span>
                    <span className="value">{formatMoney(movie.budget)}</span>
                  </InfoItem>
                </Col>
                <Col span={12}>
                  <InfoItem>
                    <span className="label">票房：</span>
                    <span className="value">{formatMoney(movie.revenue)}</span>
                  </InfoItem>
                </Col>
              </Row>

              <ActionButtons>
                {trailer && (
                  <StyledButton
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={() =>
                      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')
                    }
                  >
                    觀看預告片
                  </StyledButton>
                )}
                <StyledButton
                  icon={
                    isFavorited ? (
                      <HeartFilled style={{ color: '#e50914' }} />
                    ) : (
                      <HeartOutlined />
                    )
                  }
                  onClick={handleFavoriteClick}
                >
                  {isFavorited ? '已收藏' : '加入收藏'}
                </StyledButton>
              </ActionButtons>

              <UserRating value={userRating} onChange={handleRatingChange} />
            </MovieInfo>
          </Col>
        </Row>

        <CastSection cast={cast} />

        {similarData?.results?.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <MovieList
              title="相似電影"
              movies={similarData.results.slice(0, 6)}
              emptyText="暫無相似電影"
            />
          </div>
        )}
      </ContentContainer>

      <LoginModal open={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </PageContainer>
  );
}
