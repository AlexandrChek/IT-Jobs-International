import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';
import BasicInitialState from './BasicInitialState';

export const fetchChat = createAsyncThunk('chat/fetchChat', async (settings) => {
  return fetchData(settings);
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async (settings) => {
  return fetchData(settings);
});

const initialState = new BasicInitialState('chat');

const chatSlice = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {
    addMessageLocally: (state, action) => {
      state.chat.messages.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChat.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchChat.fulfilled, (state, action) => {
        state.pending = false;
        state.chat = action.payload;
      })
      .addCase(fetchChat.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer;
export const { addMessageLocally } = chatSlice.actions;
