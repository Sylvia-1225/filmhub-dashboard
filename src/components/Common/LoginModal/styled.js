import styled from 'styled-components';
import { Button, Divider, Modal } from 'antd';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: #141414 !important;
    border: 1px solid #303030 !important;
    border-radius: 16px !important;
    padding: 32px 28px !important;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6) !important;
  }

  .ant-modal-header {
    background: transparent !important;
    border-bottom: none !important;
    padding: 0 0 24px 0 !important;
    margin-bottom: 0 !important;
  }

  .ant-modal-title {
    color: #ffffff !important;
    font-size: 24px !important;
    font-weight: 700 !important;
    text-align: center !important;
    padding: 20px;
  }

  .ant-modal-close {
    color: #666666 !important;
    top: 24px !important;
    right: 24px !important;
    width: 32px !important;
    height: 32px !important;

    &:hover {
      color: #ffffff !important;
      background: rgba(255, 255, 255, 0.1) !important;
      border-radius: 50% !important;
    }
  }

  .ant-modal-body {
    padding: 10px 20px 30px !important;
  }

  .ant-form-item {
    margin-bottom: 16px !important;
  }

  .ant-form-item-label > label {
    color: #b3b3b3 !important;
  }
`;

export const GoogleButton = styled(Button)`
  width: 100%;
  height: 52px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #ffffff !important;
  color: #1a1a1a !important;
  border: none !important;
  transition: all 0.2s ease !important;

  &:hover {
    background: #f5f5f5 !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  .anticon {
    font-size: 20px;
  }
`;

export const LoginButton = styled(Button)`
  width: 100%;
  height: 52px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #e50914 0%, #b20710 100%) !important;
  border: none !important;
  color: #ffffff !important;
  transition: all 0.2s ease !important;

  &:hover {
    background: linear-gradient(135deg, #ff1a1a 0%, #cc0000 100%) !important;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(229, 9, 20, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #404040 !important;
    transform: none;
    box-shadow: none;
  }
`;

export const StyledDivider = styled(Divider)`
  &.ant-divider {
    border-color: #303030 !important;
    margin: 28px 0 !important;

    &::before,
    &::after {
      border-color: #303030 !important;
    }

    .ant-divider-inner-text {
      color: #666666 !important;
      font-size: 13px !important;
      padding: 0 16px !important;
    }
  }
`;

export const DemoInfo = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #262626 100%);
  border: 1px solid #303030;
  border-radius: 10px;
  padding: 16px 20px;
  margin-top: 24px;
  text-align: center;
`;

