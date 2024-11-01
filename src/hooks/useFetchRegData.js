import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRegData } from '../features/async/userRegDataSlice';
import { getRequestSettings } from '../methods';

const useFetchRegData = (userId, userType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      const url = userType === 'Company' ? '/api/companyRegData' : '/api/seekerRegData';

      const settings = getRequestSettings(url, userId);

      dispatch(fetchRegData(settings));
    }
  }, [userId, userType]);
};

export default useFetchRegData;
