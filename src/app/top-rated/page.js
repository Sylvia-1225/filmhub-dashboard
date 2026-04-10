'use client';

import { useState } from 'react';
import { useTopRatedMovies } from '@/hooks/useMovies';
import MovieList from '@/components/Movies/MovieList';
import { PageContainer, PageHeader, PageTitle, SubTitle } from '@/styles/common';

export default function TopRatedPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useTopRatedMovies(page);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle level={2}>⭐ 最高評分</PageTitle>
        <SubTitle>獲得最高評分的經典電影</SubTitle>
      </PageHeader>

      <MovieList
        movies={data?.results}
        loading={isLoading}
        showPagination
        currentPage={page}
        totalPages={data?.total_pages || 1}
        onPageChange={setPage}
        emptyText="暫無最高評分電影"
      />
    </PageContainer>
  );
}
