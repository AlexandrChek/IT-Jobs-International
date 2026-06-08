import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeJob } from '../features/async/jobSlice';
import { removeAccount } from '../features/async/userRegDataSlice';
import { logOut } from '../features/async/authSlice';

const useRemovalFeatures = whatToRemove => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const question = `Are you sure you want to remove this ${whatToRemove}?`;

  const removeAndExit = async (url, routeAfterRemoving) => {
    const removeMethod = whatToRemove === 'job' ? removeJob : removeAccount;
    const removeResult = await dispatch(removeMethod({ url }));

    if (removeMethod.fulfilled.match(removeResult)) {
      whatToRemove === 'account' && dispatch(logOut());
      navigate(routeAfterRemoving);
    }
  };

  return { question, removeAndExit };
};

export default useRemovalFeatures;
