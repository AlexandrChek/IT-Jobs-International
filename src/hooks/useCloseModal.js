import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal, clearRoute } from '../features/sync/modalSlice';

const useCloseModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { routeAfterClosing } = useSelector(state => state.modalState);

  return () => {
    dispatch(closeModal());

    if (routeAfterClosing) {
      navigate(routeAfterClosing);
      dispatch(clearRoute());
    }
  };
};

export default useCloseModal;
