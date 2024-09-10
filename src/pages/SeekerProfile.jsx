import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeekerProfile } from '../features/async/seekerProfileSlice';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/pages/SeekerProfile.module.css';

const SeekerProfile = () => {
  const { seekerid } = useParams();
  const dispatch = useDispatch();
  const seekerProfile = {} //useSelector

  useEffect(() => {
    dispatch(fetchSeekerProfile(seekerid));
  }, [dispatch, seekerid]);

  if (!seekerProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="routesWrapper">
      <h2>{seekerProfile.firstName} {seekerProfile.lastName}'s Profile</h2>
      <p>Email: {seekerProfile.email}</p>
      <p>Country: {seekerProfile.country}</p>
      <p>City: {seekerProfile.city}</p>
      <p>Skills: {seekerProfile.skills.join(', ')}</p>
      <Link to={`/job_seeker_profile/${seekerid}/edit_reg_data`} className={styles.button}>Edit Profile</Link>
      <Link to={`/job_seeker_profile/${seekerid}/chat_list`} className={styles.button}>Correspondence</Link>
      <Link to={`/public_cv/${seekerid}`} className={styles.button}>Public CV</Link>
      <Link to={`/full_cv/${seekerid}`} className={styles.button}>Full CV</Link>
    </div>
  );
};

export default SeekerProfile;
