import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';

export const fetchSeekerProfile = createAsyncThunk(
  'seekerProfile/fetchSeekerProfile',
  async (options) => {
    return fetchData(options);
  },
);

export const updateSeekerProfile = createAsyncThunk(
  'seekerProfile/updateSeekerProfile',
  async (options) => {
    return fetchData(options);
  },
);
