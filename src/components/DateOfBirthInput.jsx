import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateAge } from '../methods';
import MyInput from './inputs/MyInput';
import Modal from './Modal';

const DateOfBirthInput = ({ initialValue = '' }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ageControl = target => {
    const fullYears = calculateAge(target.value);

    if (fullYears < 18) {
      setIsModalOpen(true);
    }
  };

  const close = () => {
    isModalOpen(false);
    navigate('/');
  };

  return (
    <>
      <label>
        Date of birth
        <MyInput
          type="date"
          name="dateOfBirth"
          initialValue={initialValue}
          getVal={ageControl}
          required
        />
        <Modal isOpen={isModalOpen} close={close}>
          <p>Only adult users can register!</p>
          <button onClick={close}>Ok</button>
        </Modal>
      </label>
    </>
  );
};

export default DateOfBirthInput;
