import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';

export const fetchJobs = createAsyncThunk('jobList/fetchJobs', fetchData);

const initialState = { jobs: null };

const jobListSlice = createSlice({
  name: 'jobList',
  initialState,
  reducers: {
    clearJobs: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchJobs.pending, () => initialState)
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        console.error(action.error.message);
      });
  },
});

export const { clearJobs } = jobListSlice.actions;
export default jobListSlice.reducer;
