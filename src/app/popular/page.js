'use client';

import { useState } from 'react';
import { usePopularMovies } from '@/hooks/useMovies';
import MovieList from '@/components/Movies/MovieList';
import { PageContainer, PageHeader, PageTitle, SubTitle } from '@/styles/common';

export default function PopularPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePopularMovies(page);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle level={2}>🔥 熱門電影</PageTitle>
        <SubTitle>探索當前最受歡迎的電影</SubTitle>
      </PageHeader>

      <MovieList
        movies={data?.results}
        loading={isLoading}
        showPagination
        currentPage={page}
        totalPages={data?.total_pages || 1}
        onPageChange={setPage}
        emptyText="暫無熱門電影"
      />
    </PageContainer>
  );
}
