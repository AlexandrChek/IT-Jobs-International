import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './features/sync/formDataSlice';
import cvFormReducer from './features/sync/cvFormSlice';
import passwordsMatchReducer from './features/sync/passwordsMatchSlice';
import modalReducer from './features/sync/modalSlice';
import authReducer from './features/async/authSlice';
import jobListReducer from './features/async/jobListSlice';
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
    passwordsMatch: passwordsMatchReducer,
    modalState: modalReducer,
    auth: authReducer,
    jobList: jobListReducer,
    chatList: chatListReducer,
    currentChat: chatReducer,
    userProfile: userProfileReducer,
    userRegData: userRegDataReducer,
    job: jobReducer,
    searchResults: searchReducer,
  },
});

export default store;
