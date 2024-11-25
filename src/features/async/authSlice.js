import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';

export const logIn = createAsyncThunk('auth/logIn', async settings => {
  return fetchData(settings);
});

const initialState = {
  userName: null,
  userId: null,
  userType: null,
  authFailureMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(logIn.fulfilled, (action) => {
      if (action.payload.userName) {
        return {
          ...initialState,
          userName: action.payload.userName,
          userId: action.payload.userId,
          userType: action.payload.userType,
        };
      }
      if (action.payload.authFailureMessage) {
        return {
          ...initialState,
          authFailureMessage: action.payload.authFailureMessage,
        };
      }
    });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
