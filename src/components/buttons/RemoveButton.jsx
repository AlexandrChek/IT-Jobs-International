import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../features/sync/modalSlice';
import Modal from '../Modal';

const RemoveButton = ({ whatToRemove, remove }) => {
  const dispatch = useDispatch();
  const modalNameInSlice = 'modalYesNo';
  const message = `Are you sure you wont to remove this ${whatToRemove}?`;

  return (
    <>
      <button onClick={() => dispatch(openModal({ modalNameInSlice, message }))}>
        Remove {whatToRemove}
      </button>
      <Modal modalName={modalNameInSlice}>
        <div>
          <button onClick={remove}>Yes</button>
          <button onClick={() => dispatch(closeModal())}>No</button>
        </div>
      </Modal>
    </>
  );
};

export default RemoveButton;
