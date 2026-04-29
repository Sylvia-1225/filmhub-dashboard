import styled from 'styled-components';
import { Card } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

export const StyledCard = styled(Card)`
  background: #1f1f1f;
  border: none;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(229, 9, 20, 0.3);

    .poster-overlay {
      opacity: 1;
    }

    .play-icon {
      transform: scale(1);
    }
  }

  .ant-card-cover {
    position: relative;
    overflow: hidden;

    img {
      transition: transform 0.3s ease;
    }
  }

  &:hover .ant-card-cover img {
    transform: scale(1.05);
  }

  .ant-card-body {
    padding: 16px;
  }
`;

export const PosterContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;
  overflow: hidden;
`;

export const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PosterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlayIcon = styled(PlayCircleOutlined)`
  font-size: 64px;
  color: #ffffff;
  transform: scale(0.8);
  transition: transform 0.3s ease;
`;

export const FavoriteButton = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: rgba(229, 9, 20, 0.8);
    transform: scale(1.1);
  }
`;

export const RatingBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.8);
  padding: 4px 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => 
    props.$rating >= 7 ? '#4caf50' : 
    props.$rating >= 5 ? '#ff9800' : 
    '#f44336'
  };
`;

export const MovieTitle = styled.h3`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MovieInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #b3b3b3;
  font-size: 13px;
`;

export const GenreTags = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 8px;
`;
