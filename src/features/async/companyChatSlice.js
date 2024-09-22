import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';

export const fetchCompanyChat = createAsyncThunk(
  'companyChat/fetchCompanyChat',
  async (options) => {
    return fetchData(options);
  },
);

export const fetchCompanyChats = createAsyncThunk(
  'companyChat/fetchCompanyChats',
  async (options) => {
    return fetchData(options);
  },
);

export const sendCompanyMessage = createAsyncThunk(
  'companyChat/sendCompanyMessage',
  async (options) => {
    return fetchData(options);
  },
);
