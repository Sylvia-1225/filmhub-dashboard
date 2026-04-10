'use client';

import { useState } from 'react';
import { useNowPlayingMovies } from '@/hooks/useMovies';
import MovieList from '@/components/Movies/MovieList';
import { PageContainer, PageHeader, PageTitle, SubTitle } from '@/styles/common';

export default function NowPlayingPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useNowPlayingMovies(page);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle level={2}>🎬 正在上映</PageTitle>
        <SubTitle>現在電影院正在播映的電影</SubTitle>
      </PageHeader>

      <MovieList
        movies={data?.results}
        loading={isLoading}
        showPagination
        currentPage={page}
        totalPages={data?.total_pages || 1}
        onPageChange={setPage}
        emptyText="暫無正在上映電影"
      />
    </PageContainer>
  );
}
