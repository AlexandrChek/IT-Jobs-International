import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';

export const logIn = createAsyncThunk('auth/logIn', fetchData);
export const updateUnreadCount = createAsyncThunk('auth/updateUnreadCount', fetchData);
export const markMessagesAsRead = createAsyncThunk('auth/markMessagesAsRead', fetchData);

const initialState = {
  userName: null,
  userId: null,
  userType: null,
  unreadCount: 0,
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
            unreadCount: action.payload.unreadCount,
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
      })
      .addCase(updateUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload.unreadCount;
      })
      .addCase(markMessagesAsRead.fulfilled, (state, action) => {
        state.unreadCount = action.payload.unreadCount;
      });
  },
});

export const { logOut, changeUserName, clearLogInError } = authSlice.actions;
export default authSlice.reducer;
