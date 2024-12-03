import { useDispatch } from 'react-redux';
import { fetchProfile } from '../features/async/userProfileSlice';

const useFetchProfile = () => {
  const dispatch = useDispatch();

  const runFetchProfile = (userId, userType) => {
    const url = `/${userType}_profile/${userId}`;
    dispatch(fetchProfile({ url }));
  };

  return runFetchProfile;
};

export default useFetchProfile;
