import api from './api';

const searchService = {
  // 搜尋電影
  searchMovies: async (query, page = 1) => {
    return api.get('/search/movie', { params: { query, page } });
  },

  // 搜尋多類型內容（電影、電視劇、人物）
  searchMulti: async (query, page = 1) => {
    return api.get('/search/multi', { params: { query, page } });
  },

  // 搜尋人物
  searchPerson: async (query, page = 1) => {
    return api.get('/search/person', { params: { query, page } });
  },
};

export default searchService;
