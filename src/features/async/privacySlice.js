import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, createBasicInitialState } from '../../methods';

export const fetchPrivacyPolicy = createAsyncThunk('privacy/fetchPrivacyPolicy', fetchData);

const initialState = createBasicInitialState('privacyData');

const privacySlice = createSlice({
  name: 'privacy',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPrivacyPolicy.pending, state => {
        state.pending = true;
      })
      .addCase(fetchPrivacyPolicy.fulfilled, (state, action) => {
        state.pending = false;
        state.privacyData = action.payload;
      })
      .addCase(fetchPrivacyPolicy.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      });
  },
});

export default privacySlice.reducer;
export const { clearError } = privacySlice.actions;
