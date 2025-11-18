import { create } from 'zustand';
import Article from '../models/Article';

interface CartState {
  articles: Article[];
  addArticle: (article: Article) => void;
  removeArticle: (articleId: string) => void;
  clearCart: () => void;
  getCartAmount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  articles: [],

  addArticle: (article) => set((state) => ({
    articles: [...state.articles, article]
  })),

  removeArticle: (articleId) => set((state) => ({
    articles: state.articles.filter(item => item.id !== articleId)
  })),

  clearCart: () => set({ articles: [] }),

  getCartAmount: () => {
    const articles = get().articles;
    if (articles.length === 0) return 0;
    return articles.map(item => item.price).reduce((prev, next) => prev + next);
  },
}));
