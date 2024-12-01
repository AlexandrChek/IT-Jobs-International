import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';
import BasicInitialState from './BasicInitialState';

export const fetchJob = createAsyncThunk('job/fetchJob', async settings => {
  return fetchData(settings);
});

export const saveJobData = createAsyncThunk('job/saveJobData', async settings => {
  return fetchData(settings);
});

export const toggleJobStatus = createAsyncThunk('job/toggleStatus', async settings => {
  return fetchData(settings);
});

export const removeJob = createAsyncThunk('job/removeJob', async settings => {
  return fetchData(settings);
});

const initialState = new BasicInitialState('jobData');
initialState.togglePending = false;

const jobSlice = createSlice({
  name: 'job',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchJob.pending, state => {
        state.pending = true;
      })
      .addCase(fetchJob.fulfilled, (state, action) => {
        state.pending = false;
        state.jobData = action.payload;
      })
      .addCase(fetchJob.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      })
      .addCase(toggleJobStatus.pending, state => {
        state.togglePending = true;
      })
      .addCase(toggleJobStatus.fulfilled, state => {
        if (state.jobData.isDisabled) {
          state.jobData.isDisabled = false;
        } else {
          state.jobData.isDisabled = true;
        }

        state.togglePending = false;
      })
      .addCase(toggleJobStatus.rejected, state => {
        state.togglePending = false;
      });
  },
});

export default jobSlice.reducer;