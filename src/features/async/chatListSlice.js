import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, createBasicInitialState } from '../../methods';

export const fetchChatList = createAsyncThunk('chatList/fetchChatList', async settings => {
  return fetchData(settings);
});

const initialState = createBasicInitialState('chats');

const chatListSlice = createSlice({
  name: 'chatList',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchChatList.pending, () => ({ ...initialState, pending: true }))
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
