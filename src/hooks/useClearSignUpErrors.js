import { useDispatch } from 'react-redux';
import { clearError } from '../features/async/userRegDataSlice';
import { clearLogInError } from '../features/async/authSlice';

const useClearSignUpErrors = () => {
  const dispatch = useDispatch();

  return (error, logInError) => {
    error && dispatch(clearError());
    logInError && dispatch(clearLogInError());
  };
};

export default useClearSignUpErrors;
