import { useDispatch } from 'react-redux';
import { saveProfile } from '../features/async/userProfileSlice';
import { getRequestSettings } from '../methods';
import { savingMessage } from '../constants';

const useSaveProfile = () => {
  const dispatch = useDispatch();

  return async ({ formElem, userId, userType }) => {
    let formData = new FormData(formElem);
    formData.append('id', userId);

    const url = userType === 'Company' ? '/api/saveCompanyProfile' : '/api/saveSeekerProfile';

    const settings = getRequestSettings(url, formData);

    try {
      await dispatch(saveProfile(settings)).unwrap();

      alert(savingMessage);
    } catch (error) {
      alert(error.message);
    }
  };
};

export default useSaveProfile;
