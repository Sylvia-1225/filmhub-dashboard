import styled from 'styled-components';
import { Typography, Button, Avatar } from 'antd';

const { Title, Paragraph } = Typography;

export const PageContainer = styled.div`
  max-width: 100%;
`;

export const BackdropContainer = styled.div`
  position: relative;
  width: calc(100% + 48px);
  margin: -24px -24px 0 -24px;
  height: 500px;
  overflow: hidden;
`;

export const BackdropImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
`;

export const BackdropOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(20, 20, 20, 0.4) 0%,
    rgba(20, 20, 20, 0.8) 60%,
    rgba(20, 20, 20, 1) 100%
  );
`;

export const ContentContainer = styled.div`
  position: relative;
  margin-top: -200px;
  z-index: 1;
  padding: 0 24px;
`;

export const PosterImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
`;

export const MovieInfo = styled.div`
  color: #ffffff;
`;

export const MovieTitle = styled(Title)`
  color: #ffffff !important;
  font-size: 36px !important;
  margin-bottom: 16px !important;
`;

export const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RatingValue = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #4caf50;
`;

export const GenreTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const Overview = styled(Paragraph)`
  color: #b3b3b3 !important;
  font-size: 16px !important;
  line-height: 1.8 !important;
  max-width: 800px;
`;

export const InfoItem = styled.div`
  margin-bottom: 12px;

  .label {
    color: #808080;
    margin-right: 8px;
  }

  .value {
    color: #ffffff;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

export const StyledButton = styled(Button)`
  height: 48px;
  padding: 0 32px;
  font-size: 16px;
  border-radius: 8px;

  &.ant-btn-primary {
    background: #e50914;
    border-color: #e50914;

    &:hover {
      background: #ff1a1a !important;
      border-color: #ff1a1a !important;
    }
  }
`;

export const SectionTitle = styled(Title)`
  color: #ffffff !important;
  margin-top: 48px !important;
  margin-bottom: 24px !important;
`;

export const CastList = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 16px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #2a2a2a;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #404040;
    border-radius: 3px;
  }
`;

export const CastCard = styled.div`
  flex-shrink: 0;
  text-align: center;
  width: 120px;
`;

export const CastAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin-bottom: 8px;
`;

export const CastName = styled.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`;

export const CastCharacter = styled.div`
  color: #808080;
  font-size: 12px;
`;

export const BackButton = styled(Button)`
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #ffffff;

  &:hover {
    background: rgba(0, 0, 0, 0.7) !important;
    color: #ffffff !important;
  }
`;

export const UserRatingSection = styled.div`
  background: #1f1f1f;
  padding: 20px;
  border-radius: 12px;
  margin-top: 24px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;
