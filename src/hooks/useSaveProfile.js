import { useDispatch } from 'react-redux';
import { saveProfile } from '../features/async/userProfileSlice';
import { createPostReqSettings } from '../methods';
import { savingMessage } from '../constants';

const useSaveProfile = () => {
  const dispatch = useDispatch();

  return async ({ formElem, userId, userType }) => {
    const formData = new FormData(formElem);
    const url = `/save/${userType}_profile/${userId}`;
    const settings = createPostReqSettings(url, formData);

    try {
      await dispatch(saveProfile(settings)).unwrap();

      alert(savingMessage);
    } catch (error) {
      console.error(error.message);
    }
  };
};

export default useSaveProfile;
