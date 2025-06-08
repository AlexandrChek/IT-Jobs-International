import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../features/sync/modalSlice';
import { savingMessage } from '../constants';

const useShowSavingMessage = () => {
  const dispatch = useDispatch();

  const showSavingMessage = modalName => {
    dispatch(openModal(modalName));
    setTimeout(() => dispatch(closeModal()), 5000);
  };

  return { showSavingMessage, savingMessage };
};

export default useShowSavingMessage;
