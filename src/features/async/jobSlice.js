import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';

export const fetchJob = createAsyncThunk(
    'job/fetchJob',
    async (options) => {return fetchData(options)}
);

export const saveJobData = createAsyncThunk(
  'job/saveJobData',
  async (options) => {return fetchData(options)}
);

export const disableJob = createAsyncThunk(
  'job/disableJob',
  async (options) => {return fetchData(options)}
);

export const anableJob = createAsyncThunk(
  'job/anableJob',
  async (options) => {return fetchData(options)}
);

export const removeJob = createAsyncThunk(
  'job/removeJob',
  async (options) => {return fetchData(options)}
);

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobData: null,
    pending: false
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
      })
  }
});

export default jobSlice.reducer;
