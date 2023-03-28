import { configureStore } from '@reduxjs/toolkit';
import { postAPI } from '../services/posts';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import postsReducer from './postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    [postAPI.reducerPath]: postAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


setupListeners(store.dispatch);
