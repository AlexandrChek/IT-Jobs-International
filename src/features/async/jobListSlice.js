import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';

export const fetchJobs = createAsyncThunk('jobList/fetchJobs', async settings => {
  return fetchData(settings);
});

const jobListSlice = createSlice({
  name: 'jobList',
  initialState: {
    jobs: null,
  },
  reducers: {
    clearJobs: () => ({ jobs: null }),
  },
  extraReducers: builder => {
    builder
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, action => {
        console.log(action.error.message);
      });
  },
});

export const { clearJobs } = jobListSlice.actions;
export default jobListSlice.reducer;
