import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveRegData } from '../features/async/userRegDataSlice';
import { logIn, changeUserName } from '../features/async/authSlice';
import { createPostReqSettings } from '../methods';
import useShowSavingMessage from './useShowSavingMessage';

const useSaveRegData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSavingMessage, savingMessage } = useShowSavingMessage();
  const { emailDoesAlreadyExist } = useSelector(state => state.userRegData);
  const { userId, userName } = useSelector(state => state.auth);
  const emailDoesAlreadyExistRef = useRef(emailDoesAlreadyExist);
  const userIdRef = useRef(userId);
  const userNameRef = useRef(userName);

  useEffect(() => {
    emailDoesAlreadyExistRef.current = emailDoesAlreadyExist;
    userIdRef.current = userId;
    userNameRef.current = userName;
  }, [emailDoesAlreadyExist, userId, userName]);

  const saveData = async ({ url, formData, userType }) => {
    const savingSettings = createPostReqSettings(url, formData);
    const isCompany = userType === 'company';

    const savingResult = await dispatch(saveRegData(savingSettings));

    if (saveRegData.fulfilled.match(savingResult)) {
      if (!emailDoesAlreadyExistRef.current) {
        // User is automatically logged to his account upon registration
        if (!userIdRef.current) {
          const body = new FormData();
          body.append('userType', userType);
          body.append('email', formData.get('email'));
          body.append('password', formData.get('password'));

          const logInSettings = createPostReqSettings('/login', body);

          const logInResult = await dispatch(logIn(logInSettings));

          if (logIn.fulfilled.match(logInResult)) {
            let route = isCompany ? '/company_profile/' : '/job_seeker_profile/';
            route += userIdRef.current;
            navigate(route);
          }
        } else {
          // Show to a logged user that the changes have been saved
          const modalName = isCompany ? 'SignUpCompany' : 'SignUpSeeker';
          showSavingMessage(modalName);
          // If a logged user has changed his name(s), then change auth.userName
          const newUserName = isCompany
            ? formData.get('companyName')
            : `${formData.get('firstName')} ${formData.get('lastName')}`;

          if (userNameRef.current !== newUserName) {
            dispatch(changeUserName(newUserName));
          }
        }
      }
    }
  };

  return { saveData, savingMessage };
};

export default useSaveRegData;
