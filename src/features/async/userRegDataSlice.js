import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';
import BasicInitialState from './BasicInitialState';

export const fetchRegData = createAsyncThunk('userRegData/fetchRegData', async settings => {
  return fetchData(settings);
});

export const saveRegData = createAsyncThunk('userRegData/saveRegData', async settings => {
  return fetchData(settings);
});

const initialState = new BasicInitialState('regData');

const userRegDataSlice = createSlice({
  name: 'userRegData',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchRegData.pending, state => {
        state.pending = true;
      })
      .addCase(fetchRegData.fulfilled, (state, action) => {
        state.pending = false;
        state.regData = action.payload;
      })
      .addCase(fetchRegData.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export default userRegDataSlice.reducer;
