import api from './api';
import { handleApiError } from './apiUtils';

const searchService = {
  async searchMovies(query, page = 1) {
    try {
      if (!query || query.trim().length === 0) {
        return {
          success: false,
          message: 'Search query cannot be empty',
          data: null,
        };
      }
      const response = await api.get('/search/movie', { params: { query, page } });
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to search movies');
    }
  },

  // 搜尋電影、電視劇、人物
  async searchMulti(query, page = 1) {
    try {
      if (!query || query.trim().length === 0) {
        return {
          success: false,
          message: 'Search query cannot be empty',
          data: null,
        };
      }
      const response = await api.get('/search/multi', { params: { query, page } });
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to search multi content');
    }
  },

  async searchPerson(query, page = 1) {
    try {
      if (!query || query.trim().length === 0) {
        return {
          success: false,
          message: 'Search query cannot be empty',
          data: null,
        };
      }
      const response = await api.get('/search/person', { params: { query, page } });
      return response;
    } catch (error) {
      return handleApiError(error, 'Failed to search person');
    }
  },
};

export default searchService;
