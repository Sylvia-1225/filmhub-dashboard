/**
 * TMDB 服務統一導出
 * 保持向後兼容，同時支援模組化導入
 */

// 導出圖片服務
export {
  IMAGE_BASE_URL,
  POSTER_SIZES,
  BACKDROP_SIZES,
  getImageUrl,
} from './imageService';

// 導出電影服務
export { default as movieService } from './movieService';

// 導出搜尋服務
export { default as searchService } from './searchService';

// 向後兼容：導出整合的 tmdbService
import movieService from './movieService';
import searchService from './searchService';

const tmdbService = {
  ...movieService,
  ...searchService,
};

export default tmdbService;
