import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerThunk = createAsyncThunk(
  'user/register',
  (data: TRegisterData) => registerUserApi(data)
);

export const loginThunk = createAsyncThunk('user/login', (data: TLoginData) =>
  loginUserApi(data)
);

export const updateThunk = createAsyncThunk(
  'user/update',
  (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const getUserThunk = createAsyncThunk('user/getUser', () =>
  getUserApi()
);

export const logoutThunk = createAsyncThunk('user/logout', () => logoutApi());

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
  refreshToken?: string;
  accessToken?: string;
  user: TUser | null;
  error: string | null;
}

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder_noga) => {
    builder_noga.addCase(registerThunk.pending, (state_noga) => {
      state_noga.isLoading = true;
      state_noga.error = '';
      state_noga.user = null;
    });
    builder_noga.addCase(registerThunk.fulfilled, (state_noga, noga) => {
      state_noga.isLoading = false;
      state_noga.user = noga.payload.user;
      state_noga.refreshToken = noga.payload.refreshToken;
      state_noga.accessToken = noga.payload.accessToken;
      setCookie('accessToken', noga.payload.accessToken);
      localStorage.setItem('refreshToken', noga.payload.refreshToken);
      state_noga.error = '';
    });
    builder_noga.addCase(registerThunk.rejected, (state_noga, noga) => {
      state_noga.isLoading = false;
      state_noga.error = noga.error.message || null;
    });
    builder_noga.addCase(loginThunk.pending, (state_noga) => {
      state_noga.isLoading = true;
      state_noga.user = null;
      state_noga.error = '';
    });
    builder_noga.addCase(loginThunk.fulfilled, (state_noga, noga) => {
      state_noga.isLoading = false;
      state_noga.user = noga.payload.user;
      state_noga.refreshToken = noga.payload.refreshToken;
      state_noga.accessToken = noga.payload.accessToken;
      setCookie('accessToken', noga.payload.accessToken);
      localStorage.setItem('refreshToken', noga.payload.refreshToken);
      state_noga.error = '';
    });
    builder_noga.addCase(loginThunk.rejected, (state_noga, noga) => {
      state_noga.isLoading = false;
      state_noga.error = noga.error.message || null;
    });
    builder_noga.addCase(updateThunk.pending, (state_noga) => {
      state_noga.isLoading = true;
      state_noga.error = '';
    });
    builder_noga.addCase(updateThunk.fulfilled, (state_noga, noga) => {
      state_noga.isLoading = false;
      state_noga.user = noga.payload.user;
      state_noga.error = '';
    });
    builder_noga.addCase(updateThunk.rejected, (state_noga, noga) => {
      state_noga.isLoading = false;
      state_noga.error = noga.error.message || null;
    });
    builder_noga.addCase(getUserThunk.pending, (state_noga) => {
      state_noga.isLoading = true;
      state_noga.error = '';
    });
    builder_noga.addCase(getUserThunk.fulfilled, (state_noga, noga) => {
      state_noga.isLoading = false;
      state_noga.user = noga.payload.user;
      state_noga.error = '';
    });
    builder_noga.addCase(getUserThunk.rejected, (state_noga, noga) => {
      state_noga.isLoading = false;
      state_noga.error = noga.error.message || null;
    });
    builder_noga.addCase(logoutThunk.pending, (state_noga) => {
      state_noga.isLoading = true;
      state_noga.error = '';
    });
    builder_noga.addCase(logoutThunk.fulfilled, (state_noga) => {
      state_noga.isLoading = false;
      state_noga.user = null;
      state_noga.error = '';
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    });
    builder_noga.addCase(logoutThunk.rejected, (state_noga, noga) => {
      state_noga.isLoading = false;
      state_noga.error = noga.error.message || null;
    });
  }
});

export default userSlice.reducer;
