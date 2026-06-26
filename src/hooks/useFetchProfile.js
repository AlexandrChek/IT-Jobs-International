import { useDispatch } from 'react-redux';
import { fetchProfile, clearProfile } from '../features/async/userProfileSlice';

const useFetchProfile = () => {
  const dispatch = useDispatch();

  return (userId, userType) => {
    if (userId) {
      const url = `/${userType}_profile/${userId}`;
      dispatch(fetchProfile({ url }));
    } else {
      dispatch(clearProfile());
    }
  };
};

export default useFetchProfile;
