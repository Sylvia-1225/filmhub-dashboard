'use client';

import HeroBanner from '@/components/Movies/HeroBanner';
import MovieList from '@/components/Movies/MovieList';
import {
  useTrendingMovies,
  usePopularMovies,
  useNowPlayingMovies,
  useTopRatedMovies,
} from '@/hooks/useMovies';
import { PageContainer, SectionContainer } from '@/styles/common';
import { StyledTabs } from './styled';

export default function HomePage() {
  const { data: trendingData, isLoading: trendingLoading } = useTrendingMovies('day');
  const { data: popularData, isLoading: popularLoading } = usePopularMovies(1);
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useNowPlayingMovies(1);
  const { data: topRatedData, isLoading: topRatedLoading } = useTopRatedMovies(1);

  const featuredMovie = trendingData?.results?.[0];

  const tabItems = [
    {
      key: 'popular',
      label: '熱門電影',
      children: (
        <MovieList
          movies={popularData?.results}
          loading={popularLoading}
          emptyText="暫無熱門電影"
        />
      ),
    },
    {
      key: 'now_playing',
      label: '正在上映',
      children: (
        <MovieList
          movies={nowPlayingData?.results}
          loading={nowPlayingLoading}
          emptyText="暫無正在上映電影"
        />
      ),
    },
    {
      key: 'top_rated',
      label: '最高評分',
      children: (
        <MovieList
          movies={topRatedData?.results}
          loading={topRatedLoading}
          emptyText="暫無最高評分電影"
        />
      ),
    },
  ];

  return (
    <PageContainer>
      <SectionContainer>
        <HeroBanner movie={featuredMovie} />
      </SectionContainer>

      <SectionContainer>
        <MovieList
          title="🔥 今日趨勢"
          movies={trendingData?.results?.slice(1, 7)}
          loading={trendingLoading}
          emptyText="暫無趨勢電影"
        />
      </SectionContainer>

      <SectionContainer>
        <StyledTabs items={tabItems} size="large" />
      </SectionContainer>
    </PageContainer>
  );
}
