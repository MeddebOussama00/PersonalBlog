import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Blog from './interfaces/Blog';

interface BlogState {
  posts: Blog[];
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  loading: false,
  error: null,
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/post/`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while fetching posts');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getSinglePost = createAsyncThunk(
  'posts/getSinglePost',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while fetching the post');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const getPostsByCategory = createAsyncThunk(
  'posts/getPostsByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/category/${category}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred while fetching posts by category');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

const blogSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSinglePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSinglePost.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.loading = false;
        state.posts = [action.payload];
        state.error = null;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getPostsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostsByCategory.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getPostsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;

