import styled from 'styled-components';
import { Layout, Menu, Input } from 'antd';

const { Header, Content, Sider } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: linear-gradient(to bottom, rgba(20, 20, 20, 1), rgba(20, 20, 20, 0.8));
  backdrop-filter: blur(10px);
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #e50914;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    background: linear-gradient(135deg, #e50914 0%, #ff6b6b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledSider = styled(Sider)`
  position: fixed !important;
  left: 0;
  top: 64px;
  bottom: 0;
  overflow: auto;
  height: calc(100vh - 64px);
  background: #1f1f1f !important;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`;

export const StyledContent = styled(Content)`
  margin-left: 200px;
  margin-top: 64px;
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: #141414;
`;

export const StyledMenu = styled(Menu)`
  background: transparent !important;
  border-right: none !important;

  .ant-menu-item {
    font-size: 15px;
    margin: 4px 8px;
    border-radius: 8px;
    color: #b3b3b3;

    &:hover {
      color: #ffffff !important;
      background: #2a2a2a !important;
    }

    &.ant-menu-item-selected {
      background: #e50914 !important;
      color: #ffffff !important;
    }

    .ant-menu-item-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }
`;

export const SearchInput = styled(Input)`
  width: 300px;
  background: #2a2a2a;
  border: 1px solid #404040;
  padding: 6px 12px;
  border-radius: 10rem;

  &:hover,
  &:focus {
    border-color: #e50914;
    box-shadow: none;
  }

  .ant-input {
    background: transparent;
    color: #ffffff;

    &::placeholder {
      color: #808080;
    }
  }

  .ant-input-prefix {
    margin-right: 8px;
    color: #808080;
  }
`;
