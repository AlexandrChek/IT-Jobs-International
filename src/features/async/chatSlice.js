import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData, createBasicInitialState } from '../../methods';

export const createChat = createAsyncThunk('chat/createChat', async settings => {
  return fetchData(settings);
});

export const fetchChat = createAsyncThunk('chat/fetchChat', async settings => {
  return fetchData(settings);
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async settings => {
  return fetchData(settings);
});

const initialState = createBasicInitialState('chat');

const chatSlice = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {
    addMessageLocally: (state, action) => {
      state.chat.messages.unshift(action.payload);
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchChat.pending, () => ({ ...initialState, pending: true }))
      .addCase(fetchChat.fulfilled, (state, action) => {
        state.pending = false;
        state.chat = action.payload;
      })
      .addCase(fetchChat.rejected, (state, action) => {
        state.pending = false;
        state.error = { message: action.error.message, actionCausedError: 'fetch' };
      })
      .addCase(createChat.rejected, (state, action) => {
        let error = { message: action.error.message, actionCausedError: 'create' };
        if (action.error.name === 'MulterError') {
          error.multerError = true;
        }
        state.error = error;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = { message: action.error.message, actionCausedError: 'send' };
      });
  },
});

export default chatSlice.reducer;
export const { addMessageLocally, clearError } = chatSlice.actions;
