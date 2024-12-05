import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/user/login', credentials);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred during login');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
export const editProfile = createAsyncThunk(
  'user/editProfile',
  async (user: any, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/user${user.id}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred during login');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (userData: { username: string; email: string; password: string,confirmPassword:string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/user/register', userData);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message || 'An error occurred during registration');
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
export const logout = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('token');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      }).addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
      }).addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }).addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      }).addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;

