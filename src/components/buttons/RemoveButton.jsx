import { useState } from 'react';
import Modal from '../Modal';

const RemoveButton = ({ whatToRemove, remove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Remove {whatToRemove}</button>
      <Modal isOpen={isModalOpen} close={closeModal}>
        <p>Are you sure you wont to remove this {whatToRemove}?</p>
        <div>
          <button onClick={remove}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>
    </>
  );
};

export default RemoveButton;
