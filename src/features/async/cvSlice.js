import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';

export const fetchCv = createAsyncThunk('cv/fetchCv', async (options) => {
  return fetchData(options);
});
