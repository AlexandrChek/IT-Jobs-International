import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './features/sync/formDataSlice';
import cvFormReducer from './features/sync/cvFormSlice';
import authReducer from './features/async/authSlice';
import chatListReducer from './features/async/chatListSlice';
import chatReducer from './features/async/chatSlice';
import userProfileReducer from './features/async/userProfileSlice';
import userRegDataReducer from './features/async/userRegDataSlice';
import jobReducer from './features/async/jobSlice';
import searchReducer from './features/async/searchSlice';

const store = configureStore({
  reducer: {
    formData: formDataReducer,
    cvForm: cvFormReducer,
    auth: authReducer,
    chatList: chatListReducer,
    chat: chatReducer,
    userProfile: userProfileReducer,
    userRegData: userRegDataReducer,
    job: jobReducer,
    search: searchReducer,
  },
});

export default store;
