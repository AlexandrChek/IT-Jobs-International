import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../features/sync/modalSlice';

const useShowEmailExistModal = (emailDoesAlreadyExist, modalName) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (emailDoesAlreadyExist) {
      dispatch(openModal(modalName));
    }
  }, [emailDoesAlreadyExist]);
};

export default useShowEmailExistModal;
