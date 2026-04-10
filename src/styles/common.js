import styled from 'styled-components';
import { Typography } from 'antd';

const { Title, Text } = Typography;

// 頁面基礎容器
export const PageContainer = styled.div`
  max-width: 100%;
`;

// 頁面標題區塊
export const PageHeader = styled.div`
  margin-bottom: 32px;
`;

export const PageHeaderWithActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const HeaderLeft = styled.div``;

// 標題樣式
export const PageTitle = styled(Title)`
  color: #ffffff !important;
  margin-bottom: 8px !important;
`;

export const SubTitle = styled(Text)`
  color: #b3b3b3;
  font-size: 16px;
`;

// 區塊容器
export const SectionContainer = styled.div`
  margin-bottom: 48px;
`;

// 載入中容器
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

// 空狀態容器
export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
`;
