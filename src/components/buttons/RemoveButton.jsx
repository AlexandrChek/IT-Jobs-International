import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../features/sync/modalSlice';
import Modal from '../modals/Modal';

const RemoveButton = ({ whatToRemove, removeAction }) => {
  const dispatch = useDispatch();
  const message = `Are you sure you want to remove this ${whatToRemove}?`;

  const runRemoveAction = () => {
    removeAction();
    dispatch(closeModal());
  };

  return (
    <>
      <button onClick={() => dispatch(openModal('RemoveButton'))}>Remove {whatToRemove}</button>
      <Modal modalNameProp="RemoveButton" message={message}>
        <div>
          <button onClick={runRemoveAction}>Yes</button>
          <button onClick={() => dispatch(closeModal())}>No</button>
        </div>
      </Modal>
    </>
  );
};

export default RemoveButton;
