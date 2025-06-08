import { useDispatch } from 'react-redux';
import { saveProfile } from '../features/async/userProfileSlice';
import useShowSavingMessage from './useShowSavingMessage';
import { createPostReqSettings, convertFormDataToObj } from '../methods';

const useSaveProfile = () => {
  const dispatch = useDispatch();
  const { showSavingMessage, savingMessage } = useShowSavingMessage();

  const saveData = async ({ formElem, userId, userType }) => {
    const formData = new FormData(formElem);
    const url = `/save/${userType}_profile/${userId}`;
    const settings = createPostReqSettings(url, formData);

    const savingResult = await dispatch(saveProfile(settings));

    if (saveProfile.fulfilled.match(savingResult)) {
      const modalName = userType === 'company' ? 'CompanyProfile' : 'SeekerProfile';
      showSavingMessage(modalName);
    }
  };

  return { saveData, savingMessage };
};

export default useSaveProfile;
