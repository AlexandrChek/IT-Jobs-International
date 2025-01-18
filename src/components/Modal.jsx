import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useCloseModal from '../hooks/useCloseModal';
import classes from '../styles/components/Modal.module.css';

const Modal = ({ children, modalName }) => {
  const closeModal = useCloseModal();
  const { modalNameInSlice, isOpen, message } = useSelector(state => state.modalState);
  const dialog = useRef();

  useEffect(() => {
    if (modalName === modalNameInSlice && isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [modalName, modalNameInSlice, isOpen]);

  const checkWhereClicked = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      closeModal();
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
