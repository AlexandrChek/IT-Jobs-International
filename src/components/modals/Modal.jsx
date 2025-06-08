import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../features/sync/modalSlice';
import classes from '../../styles/components/modals/Modal.module.css';

const Modal = ({ modalNameProp, message, actionAfterClickOnBackdrop, children }) => {
  const dispatch = useDispatch();
  const { modalName } = useSelector(state => state.modalState);
  const dialog = useRef();

  useEffect(() => {
    if (modalName === modalNameProp) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [modalName, modalNameProp]);

  const checkWhereClicked = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      dispatch(closeModal());
      actionAfterClickOnBackdrop && actionAfterClickOnBackdrop();
    }
  };

  return (
    <dialog ref={dialog} onClick={checkWhereClicked}>
      <div className={classes.modalWrapper}>
        <h4>{message}</h4>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
