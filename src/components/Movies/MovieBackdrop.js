'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { getImageUrl } from '@/services/tmdbService';
import {
  BackdropContainer,
  BackdropImage,
  BackdropOverlay,
  BackButton,
} from './styled';

export default function MovieBackdrop({ backdropPath }) {
  const router = useRouter();

  return (
    <BackdropContainer>
      <BackdropImage $src={getImageUrl(backdropPath, 'large', 'backdrop')} />
      <BackdropOverlay />
      <BackButton icon={<ArrowLeftOutlined />} onClick={() => router.back()}>
        返回
      </BackButton>
    </BackdropContainer>
  );
}
