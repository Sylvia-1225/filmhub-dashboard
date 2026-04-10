import api from './api';

const movieService = {
  // 取得熱門電影
  getPopularMovies: async (page = 1) => {
    return api.get('/movie/popular', { params: { page } });
  },

  // 取得正在上映電影
  getNowPlayingMovies: async (page = 1) => {
    return api.get('/movie/now_playing', { params: { page } });
  },

  // 取得即將上映電影
  getUpcomingMovies: async (page = 1) => {
    return api.get('/movie/upcoming', { params: { page } });
  },

  // 取得最高評分電影
  getTopRatedMovies: async (page = 1) => {
    return api.get('/movie/top_rated', { params: { page } });
  },

  // 取得電影詳情
  getMovieDetails: async (movieId) => {
    return api.get(`/movie/${movieId}`, {
      params: { append_to_response: 'credits,videos,similar' },
    });
  },

  // 取得電影類型列表
  getGenres: async () => {
    return api.get('/genre/movie/list');
  },

  // 依類型取得電影
  getMoviesByGenre: async (genreId, page = 1) => {
    return api.get('/discover/movie', {
      params: { with_genres: genreId, page },
    });
  },

  // 取得電影演員資訊
  getMovieCredits: async (movieId) => {
    return api.get(`/movie/${movieId}/credits`);
  },

  // 取得電影預告片
  getMovieVideos: async (movieId) => {
    return api.get(`/movie/${movieId}/videos`);
  },

  // 取得相似電影
  getSimilarMovies: async (movieId, page = 1) => {
    return api.get(`/movie/${movieId}/similar`, { params: { page } });
  },

  // 取得電影推薦
  getMovieRecommendations: async (movieId, page = 1) => {
    return api.get(`/movie/${movieId}/recommendations`, { params: { page } });
  },

  // 取得趨勢電影 (今日/本週)
  getTrendingMovies: async (timeWindow = 'day') => {
    return api.get(`/trending/movie/${timeWindow}`);
  },
};

export default movieService;
