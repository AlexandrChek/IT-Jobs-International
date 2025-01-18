import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, createBasicInitialState } from '../../methods';

export const fetchRegData = createAsyncThunk('userRegData/fetchRegData', async settings => {
  return fetchData(settings);
});

export const saveRegData = createAsyncThunk('userRegData/saveRegData', async settings => {
  return fetchData(settings);
});

const initialState = createBasicInitialState('regData');
initialState.suchUserAlreadyExists = null;

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

        if (action.payload.suchUserAlreadyExists) {
          state.suchUserAlreadyExists = action.payload.suchUserAlreadyExists;
        } else {
          state.regData = action.payload;
        }
      })
      .addCase(fetchRegData.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export default userRegDataSlice.reducer;
