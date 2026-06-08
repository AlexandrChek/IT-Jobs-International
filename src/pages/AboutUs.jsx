import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutUsData, clearError } from '../features/async/aboutUsSlice';
import useShowErrorPage from '../hooks/useShowErrorPage';
import Loading from '../components/Loading';
import styles from '../styles/pages/AboutUs.module.css';

const AboutUs = () => {
  const dispatch = useDispatch();
  const showErrorPage = useShowErrorPage();
  const { aboutUsData, pending, error } = useSelector(state => state.aboutUs);

  useEffect(() => {
    dispatch(fetchAboutUsData({ url: '/about' }));
  }, []);

  useEffect(() => {
    error && showErrorPage(error, clearError);
  }, [error]);

  return (
    <div className={`routesWrapper ${styles.about}`}>
      {pending && <Loading />}
      <h2>About IT-Jobs International</h2>
      {aboutUsData && (
        <>
          {aboutUsData.introduction.map((item, index) => (
            <p key={index} className="largeText">
              {item}
            </p>
          ))}
          <h4>Our mission</h4>
          {aboutUsData.mission.map((item, index) => (
            <p key={index} className="largeText">
              {item}
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default AboutUs;
