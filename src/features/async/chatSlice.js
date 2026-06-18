import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData, createBasicInitialState } from '../../methods';

export const createChat = createAsyncThunk('chat/createChat', fetchData);
export const fetchChat = createAsyncThunk('chat/fetchChat', fetchData);
export const checkIfChatExists = createAsyncThunk('chat/checkIfChatExists', fetchData);
export const sendMessage = createAsyncThunk('chat/sendMessage', fetchData);

const initialState = createBasicInitialState('chat');
initialState.doesChatAlreadyExists = false;

const chatSlice = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {
    addMessageLocally: (state, action) => {
      state.chat.messages.push(action.payload);
    },
    clearError: state => {
      state.error = null;
    },
    setToZeroChatUnreadCount: state => {
      state.chat.unreadCount = 0;
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
        state.error = {
          message: action.error.message,
          actionCausedError: 'create',
          multerError: action.error.name === 'MulterError',
        };
      })
      .addCase(checkIfChatExists.fulfilled, (state, action) => {
        state.doesChatAlreadyExists = action.payload.doesChatAlreadyExists;
      })
      .addCase(checkIfChatExists.rejected, (state, action) => {
        console.error(action.error);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.error = { message: action.error.message, actionCausedError: 'send' };
      });
  },
});

export default chatSlice.reducer;
export const { addMessageLocally, clearError, setToZeroChatUnreadCount } = chatSlice.actions;
