import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCv } from '../features/async/cvSlice';
import { useParams } from 'react-router-dom';
import styles from '../styles/pages/FullCv.module.css';

const FullCv = () => {
  const { seekerid } = useParams();
  const dispatch = useDispatch();
  const fullCv = {}; //useSelector

  useEffect(() => {
    dispatch(fetchCv(seekerid));
  }, [dispatch, seekerid]);

  if (!fullCv) {
    return <p>Loading...</p>;
  }

  return (
    <div className="routesWrapper">
      <h2>
        {fullCv.firstName} {fullCv.lastName}'s Full CV
      </h2>
      <p>Summary: {fullCv.summary}</p>
      <p>Skills: {fullCv.skills.join(', ')}</p>
      <p>Experience: {fullCv.experience}</p>
      <p>Education: {fullCv.education}</p>
      <p>References: {fullCv.references}</p>
    </div>
  );
};

export default FullCv;
