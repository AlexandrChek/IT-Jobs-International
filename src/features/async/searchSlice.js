import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, createBasicInitialState } from '../../methods';

export const fetchSearchResults = createAsyncThunk(
  'searchResults/fetchSearchResults',
  async settings => {
    return fetchData(settings);
  },
);

const initialState = createBasicInitialState('searchRes');

const searchSlice = createSlice({
  name: 'searchResults',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchSearchResults.pending, () => ({ ...initialState, pending: true }))
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.pending = false;
        state.searchRes = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
