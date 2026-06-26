import { useDispatch } from 'react-redux';
import { saveProfile, clearProfile } from '../features/async/userProfileSlice';
import useFetchProfile from './useFetchProfile';
import useShowSavingMessage from './useShowSavingMessage';
import { createPostReqSettings, convertFormDataToObj } from '../methods';

const useSaveProfile = () => {
  const dispatch = useDispatch();
  const fetchProfile = useFetchProfile();
  const { showSavingMessage, savingMessage } = useShowSavingMessage();

  const saveData = async ({ formElem, userId, userType }) => {
    if (userId) {
      const formData = new FormData(formElem);
      const url = `/save/${userType}_profile/${userId}`;
      const settings = createPostReqSettings(url, formData);

      const savingResult = await dispatch(saveProfile(settings));

      if (saveProfile.fulfilled.match(savingResult)) {
        fetchProfile(userId, userType);

        const modalName = userType === 'company' ? 'CompanyProfile' : 'SeekerProfile';
        showSavingMessage(modalName);
      }
    } else {
      dispatch(clearProfile());
    }
  };

  return { saveData, savingMessage };
};

export default useSaveProfile;
