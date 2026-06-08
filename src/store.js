import { configureStore } from '@reduxjs/toolkit';
import searchTypeReducer from './features/sync/searchTypeSlice';
import totalExperienceReducer from './features/sync/totalExperienceSlice';
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
import aboutUsReducer from './features/async/aboutUsSlice';
import privacyReducer from './features/async/privacySlice';

const loadState = () => {
  const state = JSON.parse(sessionStorage.getItem('reduxState')) || {};
  return state;
};

const saveState = state => {
  sessionStorage.setItem('reduxState', JSON.stringify(state));
};

const store = configureStore({
  reducer: {
    searchTypeState: searchTypeReducer,
    totalExperience: totalExperienceReducer,
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
    aboutUs: aboutUsReducer,
    privacy: privacyReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  const { searchTypeState, totalExperience, passwordsMatch, modalState, ...asyncState } =
    store.getState();
  saveState(asyncState);
});

export default store;
