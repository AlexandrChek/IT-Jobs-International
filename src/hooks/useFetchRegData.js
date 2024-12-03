import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRegData } from '../features/async/userRegDataSlice';

const useFetchRegData = (userId, userType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      const url = `/${userType}_reg_data/${userId}`;
      dispatch(fetchRegData({ url }));
    }
  }, [userId, userType]);
};

export default useFetchRegData;
