import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './features/sync/formDataSlice';
import authReducer from './features/async/authSlice';
import companyprofileReducer from './features/async/companyProfileSlice';
import companyRegDataReducer from './features/async/companyRegDataSlice';
import jobReducer from './features/async/jobSlice';
import searchReducer from './features/async/searchSlice';

const store = configureStore({
    reducer: {
        formData: formDataReducer,
        auth: authReducer,
        companyprofile: companyprofileReducer,
        companyRegData: companyRegDataReducer,
        job: jobReducer,
        search: searchReducer,
        
    }
});

export default store;