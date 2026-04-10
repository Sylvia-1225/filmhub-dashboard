'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Form, Input, Typography, App, ConfigProvider, theme } from 'antd';
import { GoogleOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { StyledModal, GoogleButton, LoginButton, StyledDivider, DemoInfo } from './styled';

const { Text } = Typography;

export default function LoginModal({ open, onClose }) {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCredentialsLogin = async (values) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        message.error('電子郵件或密碼錯誤');
      } else {
        message.success('登入成功！');
        form.resetFields();
        onClose();
      }
    } catch (error) {
      message.error('登入失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await signIn('google', { callbackUrl: window.location.pathname });
    } catch (error) {
      message.error('Google 登入失敗');
      setGoogleLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <StyledModal
      title="登入 FilmHub"
      open={open}
      onCancel={handleCancel}
      footer={null}
      centered
      width={420}
    >
      {/* Google 登入 */}
      <GoogleButton
        icon={<GoogleOutlined />}
        onClick={handleGoogleLogin}
        loading={googleLoading}
      >
        使用 Google 帳號登入
      </GoogleButton>

      <StyledDivider>或使用電子郵件登入</StyledDivider>

      {/* 帳號密碼登入 */}
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: '#e50914',
            borderRadius: 8,
          },
        }}
      >
        <Form form={form} onFinish={handleCredentialsLogin} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '請輸入電子郵件' },
              { type: 'email', message: '請輸入有效的電子郵件' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="電子郵件"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '請輸入密碼' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密碼"
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <LoginButton type="primary" htmlType="submit" loading={loading}>
              登入
            </LoginButton>
          </Form.Item>
        </Form>
      </ConfigProvider>

      {/* Demo 帳號資訊 */}
      <DemoInfo>
        <Text style={{ fontSize: 12, color: '#666666' }}>
          Demo 帳號測試用
        </Text>
        <div style={{ marginTop: 6 }}>
          <Text style={{ color: '#e50914', fontSize: 14, fontWeight: 500 }}>
            demo@filmhub.com
          </Text>
          <Text style={{ color: '#666666', fontSize: 14 }}> / </Text>
          <Text style={{ color: '#e50914', fontSize: 14, fontWeight: 500 }}>
            demo123
          </Text>
        </div>
      </DemoInfo>
    </StyledModal>
  );
}
