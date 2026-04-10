'use client';

import { useState } from 'react';
import { useUpcomingMovies } from '@/hooks/useMovies';
import MovieList from '@/components/Movies/MovieList';
import { PageContainer, PageHeader, PageTitle, SubTitle } from '@/styles/common';

export default function UpcomingPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUpcomingMovies(page);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle level={2}>📅 即將上映</PageTitle>
        <SubTitle>即將在電影院上映的電影</SubTitle>
      </PageHeader>

      <MovieList
        movies={data?.results}
        loading={isLoading}
        showPagination
        currentPage={page}
        totalPages={data?.total_pages || 1}
        onPageChange={setPage}
        emptyText="暫無即將上映電影"
      />
    </PageContainer>
  );
}
