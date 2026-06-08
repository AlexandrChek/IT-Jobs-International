import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearProfileError } from '../features/async/userProfileSlice';
import useFetchProfile from '../hooks/useFetchProfile';
import useChooseProfileOrPreview from '../hooks/useChooseProfileOrPreview';
import useShowErrorPage from '../hooks/useShowErrorPage';
import Loading from '../components/Loading';
import CvPublicTemplate from '../components/public_templates/CvPublicTemplate';
import CreateChatForm from '../components/CreateChatForm';
import CreateChatFormAlt from '../components/CreateChatFormAlt';
import styles from '../styles/pages/PublicCv.module.css';

const PublicCv = () => {
  const { seekerid, viewType } = useParams() || {};
  const isPreview = viewType === 'preview';
  const { profile, pending, error } = useSelector(state => state.userProfile);
  const { userId, userName, userType } = useSelector(state => state.auth);
  const fetchProfile = useFetchProfile();
  const currentCv = useChooseProfileOrPreview(isPreview, profile, 'seeker');
  const showErrorPage = useShowErrorPage();

  useEffect(() => {
    !isPreview && fetchProfile(seekerid, 'seeker');
  }, [isPreview, seekerid]);

  useEffect(() => {
    if (error?.actionCausedError === 'fetch') {
      showErrorPage(error.message, 'profileNotFounde', clearProfileError);
    }
  }, [error?.actionCausedError, error?.message]);

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      {currentCv && <CvPublicTemplate cv={currentCv} viewType={viewType} />}
      {userType === 'company' && (
        <CreateChatForm
          seekerId={seekerid}
          companyId={userId}
          userName={userName}
          userType={userType}
        />
      )}
      {!userType && <CreateChatFormAlt offerType="cv" />}
    </div>
  );
};

export default PublicCv;
