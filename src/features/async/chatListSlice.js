import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';
import BasicInitialState from './BasicInitialState';

export const fetchChatList = createAsyncThunk('chatList/fetchChatList', async (settings) => {
  return fetchData(settings);
});

const initialState = new BasicInitialState('chats');

const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatList.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchChatList.fulfilled, (state, action) => {
        state.pending = false;
        state.chats = action.payload;
      })
      .addCase(fetchChatList.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export default chatListSlice.reducer;
