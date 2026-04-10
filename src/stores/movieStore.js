import { create } from 'zustand';
import apiService from '@/services/apiService';

export const useMovieStore = create((set, get) => ({
  // 狀態
  movies: [],
  currentMovie: null,
  trendingMovies: [],
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    totalPages: 0,
    totalResults: 0,
  },

  // 設定載入狀態
  setLoading: (isLoading) => set({ isLoading }),

  // 設定錯誤
  setError: (error) => set({ error, isLoading: false }),

  // 清除錯誤
  clearError: () => set({ error: null }),

  // 取得熱門電影
  fetchPopularMovies: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const data = await apiService.movie.getPopularMovies(page);
      set({
        movies: data.results,
        pagination: {
          page: data.page,
          totalPages: data.total_pages,
          totalResults: data.total_results,
        },
        isLoading: false,
      });
      return data;
    } catch (error) {
      set({ error: error.message || '取得熱門電影失敗', isLoading: false });
      return null;
    }
  },

  // 取得正在上映電影
  fetchNowPlayingMovies: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const data = await apiService.movie.getNowPlayingMovies(page);
      set({
        movies: data.results,
        pagination: {
          page: data.page,
          totalPages: data.total_pages,
          totalResults: data.total_results,
        },
        isLoading: false,
      });
      return data;
    } catch (error) {
      set({ error: error.message || '取得正在上映電影失敗', isLoading: false });
      return null;
    }
  },

  // 取得即將上映電影
  fetchUpcomingMovies: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const data = await apiService.movie.getUpcomingMovies(page);
      set({
        movies: data.results,
        pagination: {
          page: data.page,
          totalPages: data.total_pages,
          totalResults: data.total_results,
        },
        isLoading: false,
      });
      return data;
    } catch (error) {
      set({ error: error.message || '取得即將上映電影失敗', isLoading: false });
      return null;
    }
  },

  // 取得最高評分電影
  fetchTopRatedMovies: async (page = 1) => {
    set({ isLoading: true, error: null });
    try {
      const data = await apiService.movie.getTopRatedMovies(page);
      set({
        movies: data.results,
        pagination: {
          page: data.page,
          totalPages: data.total_pages,
          totalResults: data.total_results,
        },
        isLoading: false,
      });
      return data;
    } catch (error) {
      set({ error: error.message || '取得最高評分電影失敗', isLoading: false });
      return null;
    }
  },

  // 取得趨勢電影
  fetchTrendingMovies: async (timeWindow = 'day') => {
    set({ isLoading: true, error: null });
    try {
      const data = await apiService.movie.getTrendingMovies(timeWindow);
      set({
        trendingMovies: data.results,
        isLoading: false,
      });
      return data;
    } catch (error) {
      set({ error: error.message || '取得趨勢電影失敗', isLoading: false });
      return null;
    }
  },

  // 取得電影詳情
  fetchMovieDetails: async (movieId) => {
    set({ isLoading: true, error: null, currentMovie: null });
    try {
      const data = await apiService.movie.getMovieDetails(movieId);
      set({
        currentMovie: data,
        isLoading: false,
      });
      return data;
    } catch (error) {
      set({ error: error.message || '取得電影詳情失敗', isLoading: false });
      return null;
    }
  },

  // 取得相似電影
  fetchSimilarMovies: async (movieId, page = 1) => {
    try {
      const data = await apiService.movie.getSimilarMovies(movieId, page);
      return data;
    } catch (error) {
      console.error('取得相似電影失敗:', error);
      return null;
    }
  },

  // 取得電影推薦
  fetchMovieRecommendations: async (movieId, page = 1) => {
    try {
      const data = await apiService.movie.getMovieRecommendations(movieId, page);
      return data;
    } catch (error) {
      console.error('取得電影推薦失敗:', error);
      return null;
    }
  },

  // 清除當前電影
  clearCurrentMovie: () => set({ currentMovie: null }),

  // 清除電影列表
  clearMovies: () => set({ movies: [], pagination: { page: 1, totalPages: 0, totalResults: 0 } }),

  // 重設全部狀態
  reset: () => set({
    movies: [],
    currentMovie: null,
    trendingMovies: [],
    isLoading: false,
    error: null,
    pagination: {
      page: 1,
      totalPages: 0,
      totalResults: 0,
    },
  }),
}));

export default useMovieStore;
