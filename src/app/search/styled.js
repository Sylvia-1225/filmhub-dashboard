import styled from 'styled-components';
import { Input } from 'antd';

export const SearchContainer = styled.div`
  margin-bottom: 32px;
`;

export const StyledInput = styled(Input)`
  max-width: 500px;
  height: 48px;
  background: #2a2a2a;
  border: 1px solid #404040;
  border-radius: 8px;
  font-size: 16px;

  &:hover,
  &:focus {
    border-color: #e50914;
    box-shadow: none;
  }

  .ant-input {
    background: transparent;
    color: #ffffff;
    font-size: 16px;

    &::placeholder {
      color: #808080;
    }
  }

  .ant-input-prefix {
    color: #808080;
    font-size: 18px;
  }
`;

export const ResultInfo = styled.div`
  margin-bottom: 24px;
  color: #b3b3b3;
  font-size: 16px;
`;
