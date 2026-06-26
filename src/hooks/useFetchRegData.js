import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRegData, clearRegData } from '../features/async/userRegDataSlice';

const useFetchRegData = (userId, userType) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      const url = `/${userType}_reg_data/${userId}`;
      dispatch(fetchRegData({ url }));
    } else {
      dispatch(clearRegData());
    }
  }, [userId, userType]);
};

export default useFetchRegData;
