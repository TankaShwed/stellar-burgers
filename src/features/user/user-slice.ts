import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export interface UserState {
  isInit: boolean;
  isLoading: boolean;
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
  }
});

// export const {init} = userSlice.actions;

export default userSlice.reducer;
