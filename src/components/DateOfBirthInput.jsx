import { useDispatch } from 'react-redux';
import { openModal } from '../features/sync/modalSlice';
import { calculateAge } from '../methods';
import MyInput from './inputs/MyInput';

const DateOfBirthInput = ({ initialValue = '' }) => {
  const dispatch = useDispatch();

  const ageControl = target => {
    const fullYears = calculateAge(target.value);

    if (fullYears < 18) {
      const message = 'Only adult users can register!';
      dispatch(openModal({ modalNameInSlice: 'modalInfo', message, routeAfterClosing: '/' }));
    }
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
      </label>
    </>
  );
};

export default DateOfBirthInput;
