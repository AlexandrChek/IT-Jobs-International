import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetchProfile from '../hooks/useFetchProfile';
import Loading from '../components/Loading';
import CompanyPublicTemplate from '../components/CompanyPublicTemplate';
import styles from '../styles/pages/CompanyProfilePublic.module.css';

const CompanyProfilePublic = () => {
  const { companyid } = useParams();
  const profilePreviewData = useSelector(state => state.formData);
  const { profile, pending, error } = useSelector(state => state.userProfile);
  const fetchProfile = useFetchProfile();

  useEffect(() => {
    if (!profilePreviewData?.companyName && !profile) {
      fetchProfile(companyid, 'Company');
    }
  }, [profilePreviewData?.companyName, profile, companyid]);

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      {(profile || profilePreviewData?.companyName) && (
        <CompanyPublicTemplate
          profile={profilePreviewData?.companyName ? profilePreviewData : profile}
        />
      )}
    </div>
  );
};

export default CompanyProfilePublic;
