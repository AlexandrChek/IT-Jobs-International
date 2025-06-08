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
  pending: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState,
    changeUserName: (state, action) => {
      state.userName = action.payload;
    },
    clearLogInError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logIn.pending, () => ({ ...initialState, pending: true }))
      .addCase(logIn.fulfilled, (state, action) => {
        if (action.payload.userName) {
          return {
            ...initialState,
            userName: action.payload.userName,
            userId: action.payload.userId,
            userType: action.payload.userType,
            pending: false,
          };
        }
        if (action.payload.authFailureMessage) {
          return {
            ...initialState,
            authFailureMessage: action.payload.authFailureMessage,
            pending: false,
          };
        }
      })
      .addCase(logIn.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export const { logOut, changeUserName, clearLogInError } = authSlice.actions;
export default authSlice.reducer;
