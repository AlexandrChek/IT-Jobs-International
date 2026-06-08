import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, createBasicInitialState } from '../../methods';

export const fetchJob = createAsyncThunk('job/fetchJob', fetchData);
export const saveJobData = createAsyncThunk('job/saveJobData', fetchData);
export const toggleJobStatus = createAsyncThunk('job/toggleStatus', fetchData);
export const removeJob = createAsyncThunk('job/removeJob', fetchData);

const initialState = createBasicInitialState('jobData');

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    clearJob: () => initialState,
    clearJobError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchJob.pending, () => ({ ...initialState, pending: true }))
      .addCase(fetchJob.fulfilled, (state, action) => {
        state.pending = false;
        state.jobData = action.payload;
      })
      .addCase(fetchJob.rejected, (state, action) => {
        state.pending = false;
        state.error = { message: action.error.message, actionCausedError: 'fetch' };
      })
      .addCase(saveJobData.pending, state => {
        state.pending = true;
      })
      .addCase(saveJobData.fulfilled, () => initialState)
      .addCase(saveJobData.rejected, (state, action) => {
        state.pending = false;
        state.error = { message: action.error.message, actionCausedError: 'save' };
      })
      .addCase(toggleJobStatus.pending, state => {
        state.pending = true;
      })
      .addCase(toggleJobStatus.fulfilled, state => {
        if (state.jobData.isDisabled) {
          state.jobData.isDisabled = false;
        } else {
          state.jobData.isDisabled = true;
        }

        state.pending = false;
      })
      .addCase(toggleJobStatus.rejected, state => {
        state.pending = false;
        state.error = { message: action.error.message, actionCausedError: 'toggle' };
      });
  },
});

export default jobSlice.reducer;
export const { clearJob, clearJobError } = jobSlice.actions;
