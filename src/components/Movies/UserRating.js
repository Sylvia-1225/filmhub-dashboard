'use client';

import { Typography, Rate } from 'antd';
import { UserRatingSection } from './styled';

const { Text } = Typography;

export default function UserRating({ value, onChange }) {
  return (
    <UserRatingSection>
      <Text style={{ color: '#ffffff', fontSize: 16, marginRight: 16 }}>
        我的評分：
      </Text>
      <Rate
        value={value}
        onChange={onChange}
        style={{ fontSize: 24 }}
      />
      {value > 0 && (
        <Text style={{ color: '#b3b3b3', marginLeft: 12 }}>
          {value} / 5 顆星
        </Text>
      )}
    </UserRatingSection>
  );
}
