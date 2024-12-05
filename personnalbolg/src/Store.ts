import { configureStore } from '@reduxjs/toolkit';
import postReducer from './PostSlice';
import userReducer from './UserSlice';


export const store = configureStore({
  reducer: {
    user:userReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;