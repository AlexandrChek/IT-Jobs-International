import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';

export const fetchSeekerChat = createAsyncThunk(
    'seekerChat/fetchSeekerChat',
    async (options) => {return fetchData(options)}
);

export const fetchSeekerChats = createAsyncThunk(
    'seekerChat/fetchSeekerChats',
    async (options) => {return fetchData(options)}
);

export const sendMessage = createAsyncThunk(
    'seekerChat/sendMessage',
    async (options) => {return fetchData(options)}
);