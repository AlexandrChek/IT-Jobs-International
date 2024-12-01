import { useDispatch } from 'react-redux';
import { fetchProfile } from '../features/async/userProfileSlice';

const useFetchProfile = () => {
  const dispatch = useDispatch();

  const runFetchProfile = (userId, userType) => {
    const url = userType === 'Company' ? `/company_profile/${userId}` : `/seeker_profile/${userId}`;

    dispatch(fetchProfile({ url }));
  };

  return runFetchProfile;
};

export default useFetchProfile;
