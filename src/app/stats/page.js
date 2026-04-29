'use client';

import { useMemo } from 'react';
import { Card, Row, Col, Statistic, Tag, Empty } from 'antd';
import { HeartFilled, TrophyFilled, CalendarOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useFavoriteStore } from '@/stores/favoriteStore';
import { PageContainer, SectionContainer } from '@/styles/common';

const StatsCard = styled(Card)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 16px;
  
  .ant-card-body {
    padding: 24px;
  }

  .ant-statistic-title {
    color: rgba(255, 255, 255, 0.85);
    font-size: 14px;
  }

  .ant-statistic-content {
    color: #ffffff;
    font-weight: 700;
  }
`;

const GenreCard = styled(Card)`
  background: #1f1f1f;
  border: 1px solid #333;
  border-radius: 12px;
  height: 100%;

  .ant-card-head {
    color: #ffffff;
    border-bottom: 1px solid #333;
  }

  .ant-card-body {
    padding: 20px;
  }
`;

const GenreItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #2a2a2a;

  &:last-child {
    border-bottom: none;
  }
`;

const GenreBar = styled.div`
  flex: 1;
  height: 8px;
  background: #2a2a2a;
  border-radius: 4px;
  margin: 0 16px;
  overflow: hidden;

  .fill {
    height: 100%;
    background: linear-gradient(90deg, #e50914, #ff6b6b);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const PageTitle = styled.h1`
  color: #ffffff;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const PageDescription = styled.p`
  color: #b3b3b3;
  font-size: 16px;
  margin-bottom: 32px;
`;

export default function StatsPage() {
  const { favorites } = useFavoriteStore();

  const stats = useMemo(() => {
    if (favorites.length === 0) {
      return {
        totalMovies: 0,
        averageRating: 0,
        oldestMovie: null,
        newestMovie: null,
        genreDistribution: {},
      };
    }

    const total = favorites.length;

    const totalRating = favorites.reduce((sum, movie) => sum + (movie.vote_average || 0), 0);
    const avgRating = (totalRating / total).toFixed(1);

    const sortedByDate = [...favorites].sort((a, b) => 
      new Date(a.release_date) - new Date(b.release_date)
    );
    const oldest = sortedByDate[0];
    const newest = sortedByDate[sortedByDate.length - 1];

    // 類型分布，這邊只是 demo 資料
    // TODO: 需要從 API 拿真實的 genre 資料
    const genreDistribution = {
      '動作': 12,
      '劇情': 8,
      '科幻': 6,
      '喜劇': 4,
      '恐怖': 2,
    };

    return {
      totalMovies: total,
      averageRating: avgRating,
      oldestMovie: oldest,
      newestMovie: newest,
      genreDistribution,
    };
  }, [favorites]);

  const topGenres = useMemo(() => {
    const entries = Object.entries(stats.genreDistribution);
    const maxCount = Math.max(...entries.map(([, count]) => count));
    
    return entries
      .map(([genre, count]) => ({
        genre,
        count,
        percentage: ((count / stats.totalMovies) * 100).toFixed(1),
        width: (count / maxCount) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // 只顯示前 5 個
  }, [stats]);

  if (favorites.length === 0) {
    return (
      <PageContainer>
        <PageTitle>我的統計</PageTitle>
        <PageDescription>分析你的收藏清單，了解自己的觀影偏好</PageDescription>
        
        <Empty
          description="還沒有收藏任何電影"
          style={{ marginTop: 60, color: '#666' }}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>我的統計</PageTitle>
      <PageDescription>
        已收藏 {stats.totalMovies} 部電影的深度分析
      </PageDescription>

      {/* 統計卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="收藏總數"
              value={stats.totalMovies}
              prefix={<HeartFilled />}
              valueStyle={{ color: '#ffffff' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="平均評分"
              value={stats.averageRating}
              suffix="/ 10"
              prefix={<TrophyFilled />}
              valueStyle={{ color: '#ffffff' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="最早收藏"
              value={stats.oldestMovie?.title || 'N/A'}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#ffffff', fontSize: 16 }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatsCard>
            <Statistic
              title="最新收藏"
              value={stats.newestMovie?.title || 'N/A'}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#ffffff', fontSize: 16 }}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* 類型分布 */}
      <SectionContainer>
        <GenreCard title="類型偏好分析">
          {topGenres.length > 0 ? (
            topGenres.map(({ genre, count, percentage, width }) => (
              <GenreItem key={genre}>
                <Tag color="volcano" style={{ minWidth: 60, textAlign: 'center' }}>
                  {genre}
                </Tag>
                <GenreBar>
                  <div className="fill" style={{ width: `${width}%` }} />
                </GenreBar>
                <span style={{ color: '#ffffff', minWidth: 80, textAlign: 'right' }}>
                  {count} 部 ({percentage}%)
                </span>
              </GenreItem>
            ))
          ) : (
            <Empty description="暫無資料" />
          )}
          
          <div style={{ marginTop: 16, padding: 12, background: '#2a2a2a', borderRadius: 8 }}>
            <p style={{ color: '#b3b3b3', fontSize: 13, margin: 0 }}>
              💡 <strong>提示</strong>: 這是根據你的收藏清單自動分析的結果。
              繼續收藏更多電影，讓分析更準確！
            </p>
          </div>
        </GenreCard>
      </SectionContainer>
    </PageContainer>
  );
}
