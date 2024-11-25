import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveRegData } from '../features/async/userRegDataSlice';
import { logIn } from '../features/async/authSlice';
import { getRequestSettings } from '../methods';

const useSaveRegData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userIdFromAuth = useSelector(state => state.auth.userId);

  return async ({ savingUrl, formData, userId, userType }) => {
    const savingSettings = getRequestSettings(savingUrl, formData);

    try {
      await dispatch(saveRegData(savingSettings)).unwrap();

      let route = userType === 'Company' ? '/company_profile/' : '/job_seeker_profile/';
      let logInUrl = '/log_in/' + userType === 'Company' ? 'company' : 'seeker';

      if (!userId) {
        const body = {
          email: formData.get('email'),
          password: formData.get('password'),
        };

        const logInSettings = getRequestSettings(logInUrl, body);

        await dispatch(logIn(logInSettings)).unwrap();
      }

      route += userIdFromAuth;
      navigate(route);
    } catch (error) {
      alert(error.message);
    }
  };
};

export default useSaveRegData;
