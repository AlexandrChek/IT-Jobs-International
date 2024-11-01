import { useDispatch } from 'react-redux';
import { fetchProfile } from '../features/async/userProfileSlice';
import { getRequestSettings } from '../methods';

const useFetchProfile = () => {
  const dispatch = useDispatch();

  const runFetchProfile = (userId, userType) => {
    const url = userType === 'Company' ? '/api/companyProfile' : '/api/seekerProfile';

    const settings = getRequestSettings(url, userId);

    dispatch(fetchProfile(settings));
  };

  return runFetchProfile;
};

export default useFetchProfile;
