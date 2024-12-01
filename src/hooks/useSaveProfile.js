import { useDispatch } from 'react-redux';
import { saveProfile } from '../features/async/userProfileSlice';
import { createPostReqSettings } from '../methods';
import { savingMessage } from '../constants';

const useSaveProfile = () => {
  const dispatch = useDispatch();

  return async ({ formElem, userId, userType }) => {
    let formData = new FormData(formElem);

    const url =
      '/save/' + userType === 'Company' ? `company_profile/${userId}` : `seeker_profile/${userId}`;

    const settings = createPostReqSettings(url, formData);

    try {
      await dispatch(saveProfile(settings)).unwrap();

      alert(savingMessage);
    } catch (error) {
      alert(error.message);
    }
  };
};

export default useSaveProfile;
