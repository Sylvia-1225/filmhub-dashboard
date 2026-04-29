
// 導出圖片服務
export {
  IMAGE_BASE_URL,
  POSTER_SIZES,
  BACKDROP_SIZES,
  getImageUrl,
} from './imageService';

export { default as movieService } from './movieService';
export { default as searchService } from './searchService';


import movieService from './movieService';
import searchService from './searchService';

const tmdbService = {
  ...movieService,
  ...searchService,
};

export default tmdbService;
