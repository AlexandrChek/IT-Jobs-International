import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal, closeModal } from '../features/sync/modalSlice';
import { calculateAge } from '../methods';
import MyInput from './inputs/MyInput';
import Modal from './modals/Modal';

const DateOfBirthInput = ({ initialValue = '' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = 'Only adult users can register!';

  const ageControl = target => {
    const fullYears = calculateAge(target.value);

    if (fullYears < 18) {
      dispatch(openModal('DateOfBirthInput'));
    }
  };

  const closeModalWindow = () => {
    dispatch(closeModal());
    navigate('/');
  };

  const actionAfterClickOnBackdrop = () => navigate('/');

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
      </label>
      <Modal
        modalNameProp="DateOfBirthInput"
        message={message}
        actionAfterClickOnBackdrop={actionAfterClickOnBackdrop}
      >
        <button onClick={closeModalWindow}>Close</button>
      </Modal>
    </>
  );
};

export default DateOfBirthInput;
