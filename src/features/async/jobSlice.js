import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';

export const fetchJob = createAsyncThunk('job/fetchJob', async (settings) => {
  return fetchData(settings);
});

export const saveJobData = createAsyncThunk('job/saveJobData', async (settings) => {
  return fetchData(settings);
});

export const disableJob = createAsyncThunk('job/disableJob', async (settings) => {
  return fetchData(settings);
});

export const anableJob = createAsyncThunk('job/anableJob', async (settings) => {
  return fetchData(settings);
});

export const removeJob = createAsyncThunk('job/removeJob', async (settings) => {
  return fetchData(settings);
});

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobData: null,
    pending: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJob.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchJob.fulfilled, (state, action) => {
        state.pending = false;
        state.jobData = action.payload;
      })
      .addCase(fetchJob.rejected, (state) => {
        state.pending = false;
      })
      .addCase(disableJob.fulfilled, (state) => {
        state.jobData.status = 'disabled';
      })
      .addCase(anableJob.fulfilled, (state) => {
        state.jobData.status = 'anabled';
      });
  },
});

export default jobSlice.reducer;
