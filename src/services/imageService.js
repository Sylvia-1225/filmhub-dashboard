// 圖片基礎 URL
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const POSTER_SIZES = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original',
};

export const BACKDROP_SIZES = {
  small: 'w300',
  medium: 'w780',
  large: 'w1280',
  original: 'original',
};

// 取得圖片完整 URL
export const getImageUrl = (path, size = 'medium', type = 'poster') => {
  if (!path) return '/placeholder.svg';
  const sizes = type === 'poster' ? POSTER_SIZES : BACKDROP_SIZES;
  return `${IMAGE_BASE_URL}/${sizes[size]}${path}`;
};
