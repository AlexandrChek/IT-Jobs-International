import { createSlice } from '@reduxjs/toolkit';

const searchTypeSlice = createSlice({
  name: 'searchTypeState',
  initialState: { searchType: null },
  reducers: {
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
  },
});

export const { setSearchType } = searchTypeSlice.actions;
export default searchTypeSlice.reducer;
