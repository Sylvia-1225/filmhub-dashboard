// 統一導出所有 API services
import movieService from './movieService';
import searchService from './searchService';
import * as imageService from './imageService';

export const apiService = {
  movie: movieService,
  search: searchService,
  image: imageService,
};

export default apiService;
