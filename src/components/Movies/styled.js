import styled from 'styled-components';
import { Typography, Button, Avatar } from 'antd';

const { Title } = Typography;

// Cast Section Styles
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

export const SectionTitle = styled(Title)`
  color: #ffffff !important;
  margin-top: 48px !important;
  margin-bottom: 24px !important;
`;

// Backdrop Styles
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

// User Rating Styles
export const UserRatingSection = styled.div`
  background: #1f1f1f;
  padding: 20px;
  border-radius: 12px;
  margin-top: 24px;
`;
