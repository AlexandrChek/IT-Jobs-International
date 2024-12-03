import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveRegData } from '../features/async/userRegDataSlice';
import { logIn } from '../features/async/authSlice';
import { createPostReqSettings } from '../methods';

const useSaveRegData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIdFromAuth = useSelector(state => state.auth.userId);

  return async ({ url, formData, userId, userType }) => {
    const savingSettings = createPostReqSettings(url, formData);

    try {
      await dispatch(saveRegData(savingSettings)).unwrap();

      // User is automatically logged to his account upon registration
      if (!userId) {
        const body = new FormData();
        body.append('userType', userType);
        body.append('email', formData.get('email'));
        body.append('password', formData.get('password'));

        const logInSettings = createPostReqSettings('/login', body);

        await dispatch(logIn(logInSettings)).unwrap();
      }

      let route = userType === 'company' ? '/company_profile/' : '/job_seeker_profile/';
      route += userIdFromAuth;
      navigate(route);
    } catch (error) {
      alert(error.message);
    }
  };
};

export default useSaveRegData;
