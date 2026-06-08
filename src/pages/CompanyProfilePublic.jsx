import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearProfileError } from '../features/async/userProfileSlice';
import useFetchProfile from '../hooks/useFetchProfile';
import useChooseProfileOrPreview from '../hooks/useChooseProfileOrPreview';
import useShowErrorPage from '../hooks/useShowErrorPage';
import Loading from '../components/Loading';
import CompanyPublicTemplate from '../components/public_templates/CompanyPublicTemplate';

const CompanyProfilePublic = () => {
  const { companyid, viewType } = useParams() || {};
  const isPreview = viewType === 'preview';
  const { profile, pending, error } = useSelector(state => state.userProfile);
  const fetchProfile = useFetchProfile();
  const currentProfile = useChooseProfileOrPreview(isPreview, profile, 'company');
  const showErrorPage = useShowErrorPage();

  useEffect(() => {
    !isPreview && fetchProfile(companyid, 'company');
  }, [isPreview, companyid]);

  useEffect(() => {
    if (error?.actionCausedError === 'fetch') {
      showErrorPage(error.message, 'profileNotFounde', clearProfileError);
    }
  }, [error?.actionCausedError, error?.message]);

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      {currentProfile && <CompanyPublicTemplate profile={currentProfile} />}
    </div>
  );
};

export default CompanyProfilePublic;
