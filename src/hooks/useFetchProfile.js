import { useDispatch } from 'react-redux';
import { fetchProfile } from '../features/async/userProfileSlice';

const useFetchProfile = () => {
  const dispatch = useDispatch();

  return (userId, userType) => {
    const url = `/${userType}_profile/${userId}`;
    dispatch(fetchProfile({ url }));
  };
};

export default useFetchProfile;
