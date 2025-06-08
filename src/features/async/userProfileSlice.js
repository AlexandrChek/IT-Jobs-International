import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData, createBasicInitialState } from '../../methods';

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

const initialState = createBasicInitialState('profile');

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    clearProfileError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, () => ({ ...initialState, pending: true }))
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.pending = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.pending = false;
        state.error = { message: action.error.message, actionCausedError: 'fetch' };
      })
      .addCase(toggleProfileStatus.pending, state => {
        state.pending = true;
      })
      .addCase(toggleProfileStatus.fulfilled, state => {
        if (state.profile?.isDisabled) {
          state.profile.isDisabled = false;
        } else if (state.profile) {
          state.profile.isDisabled = true;
        }

        state.pending = false;
      })
      .addCase(toggleProfileStatus.rejected, state => {
        state.pending = false;
        state.error = { message: action.error.message, actionCausedError: 'toggle' };
      })
      .addCase(saveProfile.pending, state => {
        state.pending = true;
      })
      .addCase(saveProfile.fulfilled, state => {
        state.pending = false;
      })
      .addCase(saveProfile.rejected, state => {
        state.pending = false;
        state.error = { message: action.error.message, actionCausedError: 'save' };
      });
  },
});

export default userProfileSlice.reducer;
export const { clearProfileError } = userProfileSlice.actions;
