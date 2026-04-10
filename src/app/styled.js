import styled from 'styled-components';
import { Tabs } from 'antd';

export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 24px;

    &::before {
      border-bottom-color: #404040;
    }
  }

  .ant-tabs-tab {
    color: #b3b3b3;
    font-size: 16px;
    padding: 12px 0;

    &:hover {
      color: #ffffff;
    }
  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #e50914 !important;
    }
  }

  .ant-tabs-ink-bar {
    background: #e50914;
  }
`;
