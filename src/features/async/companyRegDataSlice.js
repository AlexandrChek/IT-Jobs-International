import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../methods';
import BasicInitialState from './BasicInitialState';

export const fetchCompanyRegData = createAsyncThunk(
    'companyRegData/fetchCompanyRegData',
    async (options) => {return fetchData(options)}
);

export const saveCompanyRegData = createAsyncThunk(
    'companyRegData/saveCompanyRegData',
    async (options) => {return fetchData(options)}
);

const initialState = new BasicInitialState('regData');

const companyRegDataSlice = createSlice({
    name: 'companyRegData',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanyRegData.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchCompanyRegData.fulfilled, (state, action) => {
                state.pending = false;
                state.regData = action.payload;
            })
            .addCase(fetchCompanyRegData.rejected, (state, action) => {
                state.pending = false;
                state.error = action.error.message;
            })
    }
});

export default companyRegDataSlice.reducer;