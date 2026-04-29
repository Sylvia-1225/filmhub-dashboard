import api from './api';
import { handleApiError } from './apiUtils';

const movieService = {
  async getPopularMovies(page = 1) {
    try {
      const response = await api.get('/movie/popular', { params: { page } });
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch popular movies');
    }
  },

  async getNowPlayingMovies(page = 1) {
    try {
      const response = await api.get('/movie/now_playing', { params: { page } });
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch now playing movies');
    }
  },

  async getUpcomingMovies(page = 1) {
    try {
      const response = await api.get('/movie/upcoming', { params: { page } });
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch upcoming movies');
    }
  },

  async getTopRatedMovies(page = 1) {
    try {
      const response = await api.get('/movie/top_rated', { params: { page } });
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch top rated movies');
    }
  },

  // 電影詳情 + 演員 + 預告 + 相似電影
  async getMovieDetails(movieId) {
    try {
      const response = await api.get(`/movie/${movieId}`, {
        params: { append_to_response: 'credits,videos,similar' },
      });
      return response;
    } catch (err) {
      return handleApiError(err, 'Failed to fetch movie details');
    }
  },

  async getGenres() {
    try {
      const response = await api.get('/genre/movie/list');
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch movie genres');
    }
  },

  async getMoviesByGenre(genreId, page = 1) {
    try {
      const response = await api.get('/discover/movie', {
        params: { with_genres: genreId, page },
      });
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch movies by genre');
    }
  },

  async getMovieCredits(movieId) {
    try {
      const response = await api.get(`/movie/${movieId}/credits`);
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch credits');
    }
  },

  async getMovieVideos(movieId) {
    try {
      const response = await api.get(`/movie/${movieId}/videos`);
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch videos');
    }
  },

  async getSimilarMovies(movieId, page = 1) {
    try {
      const response = await api.get(`/movie/${movieId}/similar`, { params: { page } });
      return response;
    } catch (error) {
      return handleApiError(error, `Failed to fetch similar movies for ID: ${movieId}`);
    }
  },

  async getMovieRecommendations(movieId, page = 1) {
    try {
      const response = await api.get(`/movie/${movieId}/recommendations`, { params: { page } });
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch recommendations');
    }
  },

  async getTrendingMovies(timeWindow = 'day') {
    try {
      const response = await api.get(`/trending/movie/${timeWindow}`);
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to fetch trending movies');
    }
  },
};

export default movieService;
