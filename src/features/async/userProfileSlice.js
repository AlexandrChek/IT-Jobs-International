import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';
import BasicInitialState from './BasicInitialState';

export const fetchProfile = createAsyncThunk('userProfile/fetchProfile', async settings => {
  return fetchData(settings);
});

export const saveProfile = createAsyncThunk('userProfile/saveProfile', async settings => {
  return fetchData(settings);
});

export const toggleProfileStatus = createAsyncThunk(
  'userProfile/toggleProfileStatus',
  async settings => {
    return fetchData(settings);
  },
);

export const removeProfile = createAsyncThunk('userProfile/removeProfile', async settings => {
  return fetchData(settings);
});

const initialState = new BasicInitialState('profile');

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.pending = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.pending = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.pending = false;
        state.error = action.error.message;
      })
      .addCase(toggleProfileStatus.fulfilled, state => {
        state.profile.isDisabled = !state.profile.isDisabled;
      });
  },
});

export default userProfileSlice.reducer;
