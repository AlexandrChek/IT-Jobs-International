import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';

export const fetchSearchResults = createAsyncThunk(
  'searchResults/fetchSearchResults',
  async (settings) => {
    return fetchData(settings);
  },
);

const searchSlice = createSlice({
  name: 'searchResults',
  initialState: {
    searchRes: null,
    pending: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.pending = false;
        state.searchRes = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.pending = false;
      });
  },
});

export default searchSlice.reducer;
