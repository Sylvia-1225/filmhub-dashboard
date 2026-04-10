import styled from 'styled-components';
import { Button } from 'antd';

export const ClearButton = styled(Button)`
  background: transparent;
  border-color: #ff4d4f;
  color: #ff4d4f;

  &:hover {
    background: #ff4d4f !important;
    border-color: #ff4d4f !important;
    color: #ffffff !important;
  }
`;
