// TMDB 圖片服務
// 圖片不是直接給完整 URL，需要自己組合：base_url + size + path

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// MovieCard 用 w342 就夠了，不要用 original 會很慢
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

export const getImageUrl = (path, size = 'medium', type = 'poster') => {
  if (!path) return '/placeholder.svg';
  
  const sizes = type === 'poster' ? POSTER_SIZES : BACKDROP_SIZES;
  return `${IMAGE_BASE_URL}/${sizes[size]}${path}`;
};

