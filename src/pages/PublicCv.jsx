import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCv } from '../features/async/cvSlice';
import { useParams } from 'react-router-dom';
import styles from '../styles/pages/PublicCv.module.css';

const PublicCv = () => {
  const { seekerid } = useParams();
  const dispatch = useDispatch();
  const publicCv = {}; //useSelector

  useEffect(() => {
    dispatch(fetchCv(seekerid));
  }, [dispatch, seekerid]);

  if (!publicCv) {
    return <p>Loading...</p>;
  }

  return (
    <div className="routesWrapper">
      <h2>
        {publicCv.firstName} {publicCv.lastName}'s Public CV
      </h2>
      <p>Summary: {publicCv.summary}</p>
      <p>Skills: {publicCv.skills.join(', ')}</p>
      <p>Experience: {publicCv.experience}</p>
      <p>Education: {publicCv.education}</p>
    </div>
  );
};

export default PublicCv;
