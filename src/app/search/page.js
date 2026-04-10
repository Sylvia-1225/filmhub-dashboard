'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchMovies } from '@/hooks/useMovies';
import MovieList from '@/components/Movies/MovieList';
import { PageContainer, PageHeader, PageTitle, SubTitle } from '@/styles/common';
import { SearchContainer, StyledInput, ResultInfo } from './styled';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const urlQuery = useMemo(() => searchParams.get('q') || '', [searchParams]);

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(urlQuery);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSearchMovies(debouncedQuery, page);

  // Sync with URL when it changes externally
  useEffect(() => {
    setSearchQuery(urlQuery);
    setDebouncedQuery(urlQuery);
  }, [urlQuery]);

  // Debounce user input
  useEffect(() => {
    if (searchQuery === urlQuery) return;
    
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, urlQuery]);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle level={2}>🔍 搜尋電影</PageTitle>
        <SubTitle>輸入關鍵字搜尋你想找的電影</SubTitle>
      </PageHeader>

      <SearchContainer>
        <StyledInput
          prefix={<SearchOutlined />}
          placeholder="輸入電影名稱..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          allowClear
        />
      </SearchContainer>

      {debouncedQuery && (
        <ResultInfo>
          搜尋 &ldquo;{debouncedQuery}&rdquo; 的結果
          {data?.total_results !== undefined && ` - 共找到 ${data.total_results} 部電影`}
        </ResultInfo>
      )}

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Spin size="large" />
        </div>
      ) : (
        <MovieList
          movies={data?.results}
          loading={false}
          showPagination={data?.total_pages > 1}
          currentPage={page}
          totalPages={data?.total_pages || 1}
          onPageChange={setPage}
          emptyText={debouncedQuery ? `找不到與「${debouncedQuery}」相關的電影` : '開始搜尋你喜愛的電影'}
        />
      )}
    </PageContainer>
  );
}
