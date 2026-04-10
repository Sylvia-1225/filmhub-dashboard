'use client';

import { Row, Col, Empty, Spin, Pagination } from 'antd';
import styled from 'styled-components';
import MovieCard from './MovieCard';

const ListContainer = styled.div`
  width: 100%;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ListTitle = styled.h2`
  color: #ffffff;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: #e50914;
    border-radius: 2px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  .ant-pagination-item {
    background: #2a2a2a;
    border-color: #404040;

    a {
      color: #ffffff;
    }

    &:hover {
      border-color: #e50914;
    }
  }

  .ant-pagination-item-active {
    background: #e50914;
    border-color: #e50914;

    a {
      color: #ffffff;
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      background: #2a2a2a;
      border-color: #404040;
      color: #ffffff;

      &:hover {
        border-color: #e50914;
        color: #e50914;
      }
    }
  }
`;

export default function MovieList({
  title,
  movies = [],
  loading = false,
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  emptyText = '暫無電影資料',
  extra,
}) {
  if (loading) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <ListContainer>
        {title && (
          <ListHeader>
            <ListTitle>{title}</ListTitle>
            {extra}
          </ListHeader>
        )}
        <Empty
          description={<span style={{ color: '#b3b3b3' }}>{emptyText}</span>}
          style={{ marginTop: 60 }}
        />
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {title && (
        <ListHeader>
          <ListTitle>{title}</ListTitle>
          {extra}
        </ListHeader>
      )}

      <Row gutter={[20, 20]}>
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={8} md={6} lg={4} xl={4}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>

      {showPagination && totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            current={currentPage}
            total={totalPages * 20}
            pageSize={20}
            onChange={onPageChange}
            showSizeChanger={false}
            showQuickJumper
          />
        </PaginationContainer>
      )}
    </ListContainer>
  );
}
