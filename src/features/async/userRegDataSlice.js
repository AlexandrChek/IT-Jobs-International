import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, createBasicInitialState } from '../../methods';

export const fetchRegData = createAsyncThunk('userRegData/fetchRegData', async settings => {
  return fetchData(settings);
});

export const saveRegData = createAsyncThunk('userRegData/saveRegData', async settings => {
  return fetchData(settings);
});

export const removeAccount = createAsyncThunk('userRegData/removeAccount', async settings => {
  return fetchData(settings);
});

const initialState = createBasicInitialState('regData');
initialState.emailDoesAlreadyExist = null;

const userRegDataSlice = createSlice({
  name: 'userRegData',
  initialState,
  reducers: {
    clearEmailExist: state => {
      state.emailDoesAlreadyExist = null;
    },
    clearError: state => {
      state.error = null;
    },
    clearRegData: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRegData.pending, () => ({ ...initialState, pending: true }))
      .addCase(fetchRegData.fulfilled, (state, action) => {
        state.pending = false;
        state.regData = action.payload;
      })
      .addCase(fetchRegData.rejected, (state, action) => {
        state.pending = false;
        state.error = { message: action.error.message, actionCausedError: 'fetch' };
      })
      .addCase(saveRegData.pending, state => {
        state.pending = true;
        state.emailDoesAlreadyExist = null;
      })
      .addCase(saveRegData.fulfilled, (state, action) => {
        state.pending = false;
        if (action.payload.emailDoesAlreadyExist) {
          state.emailDoesAlreadyExist = action.payload.emailDoesAlreadyExist;
        }
      })
      .addCase(saveRegData.rejected, (state, action) => {
        state.pending = false;
        state.error = { message: action.error.message, actionCausedError: 'save' };
      })
      .addCase(removeAccount.rejected, (state, action) => {
        state.error = { message: action.error.message, actionCausedError: 'remove' };
      });
  },
});

export default userRegDataSlice.reducer;
export const { clearEmailExist, clearError, clearRegData } = userRegDataSlice.actions;
