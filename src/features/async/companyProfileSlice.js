import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';
import BasicInitialState from './BasicInitialState';

export const fetchCompanyProfile = createAsyncThunk(
  'companyProfile/fetchCompanyProfile',
  async (options) => {return fetchData(options)}
);

export const saveCompanyProfile = createAsyncThunk(
  'companyProfile/saveCompanyProfile',
  async (options) => {return fetchData(options)}
);

const initialState = new BasicInitialState('profile');

const companyProfileSlice = createSlice({
  name: 'companyProfile',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyProfile.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchCompanyProfile.fulfilled, (state, action) => {
        state.pending = false;
        state.profile = action.payload;
      })
      .addCase(fetchCompanyProfile.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      })
  }
});

export default companyProfileSlice.reducer;
