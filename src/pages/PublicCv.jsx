import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetchProfile from '../hooks/useFetchProfile';
import Loading from '../components/Loading';
import CvPublicTemplate from '../components/CvPublicTemplate';
import CreateChatForm from '../components/CreateChatForm';
import styles from '../styles/pages/PublicCv.module.css';

const PublicCv = () => {
  const { seekerid } = useParams();
  const profilePreviewData = useSelector(state => state.cvForm.cvPreviewObj);
  const { profile, pending, error } = useSelector(state => state.userProfile);
  const { userId, userType } = useSelector(state => state.auth);
  const fetchProfile = useFetchProfile();

  useEffect(() => {
    if (!profilePreviewData?.userName && !profile) {
      fetchProfile(seekerid, 'Job seeker');
    }
  }, [profilePreviewData?.userName, profile, seekerid]);

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      {(profile || profilePreviewData?.userName) && (
        <CvPublicTemplate profile={profilePreviewData?.userName ? profilePreviewData : profile} />
      )}
      {userType === 'Company' && (
        <CreateChatForm seekerId={seekerid} companyId={userId} userType="Company" />
      )}
    </div>
  );
};

export default PublicCv;
