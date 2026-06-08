import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, createBasicInitialState } from '../../methods';

export const fetchAboutUsData = createAsyncThunk('aboutUs/fetchAboutUsData', fetchData);

const initialState = createBasicInitialState('aboutUsData');

const aboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAboutUsData.pending, state => {
        state.pending = true;
      })
      .addCase(fetchAboutUsData.fulfilled, (state, action) => {
        state.pending = false;
        state.aboutUsData = action.payload;
      })
      .addCase(fetchAboutUsData.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export default aboutUsSlice.reducer;
export const { clearError } = aboutUsSlice.actions;
