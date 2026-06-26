import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrivacyPolicy, clearError } from '../features/async/privacySlice';
import useShowErrorPage from '../hooks/useShowErrorPage';
import Loading from '../components/Loading';
import LargeInfoText from '../components/LargeInfoText';
import styles from '../styles/pages/Privacy.module.css';

const Privacy = () => {
  const dispatch = useDispatch();
  const showErrorPage = useShowErrorPage();
  const { privacyData, pending, error } = useSelector(state => state.privacy);

  useEffect(() => {
    dispatch(fetchPrivacyPolicy({ url: '/privacy' }));
  }, []);

  useEffect(() => {
    error && showErrorPage(error, clearError);
  }, [error]);

  return (
    <div className={`routesWrapper ${styles.privacy}`}>
      {pending && <Loading />}
      <h2>Privacy Policy</h2>
      {privacyData && <LargeInfoText arrayOfStrings={privacyData} />}
    </div>
  );
};

export default Privacy;
