import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../features/sync/modalSlice';
import { serverErrorMessage } from '../../constants';
import Modal from './Modal';

const ErrorModal = ({ error, parentName, actionAfterClosing, additionalMsg = null }) => {
  const dispatch = useDispatch();

  const message = useMemo(() => {
    return additionalMsg ? `${additionalMsg} ${serverErrorMessage}` : serverErrorMessage;
  }, [additionalMsg]);

  useEffect(() => {
    if (error) {
      dispatch(openModal(`${parentName}Error`));
      console.error(error);
    }
  }, [error, parentName]);

  const closeModalWindow = () => {
    dispatch(closeModal());
    runActionAfterClosing();
  };

  const runActionAfterClosing = () => {
    actionAfterClosing && actionAfterClosing();
  };

  return (
    <Modal
      modalNameProp={`${parentName}Error`}
      message={message}
      actionAfterClickOnBackdrop={runActionAfterClosing}
    >
      <button onClick={closeModalWindow}>Close</button>
    </Modal>
  );
};

export default ErrorModal;
