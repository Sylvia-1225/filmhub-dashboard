'use client';

import React from 'react';
import { Button, Result } from 'antd';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // 重新載入頁面
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <Result
            status="error"
            title="哎呀！出了點問題"
            subTitle="應用程式發生了一個錯誤，請嘗試重新載入頁面。"
            extra={[
              <Button type="primary" key="reload" onClick={this.handleReset}>
                重新載入
              </Button>,
              <Button key="home" onClick={() => (window.location.href = '/')}>
                返回首頁
              </Button>,
            ]}
          />
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
