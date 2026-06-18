import { useState, useEffect } from 'react';
import styles from '../../styles/components/buttons/DownButton.module.css';

const DownButton = ({ isDataLoaded, targetRef, goDown }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollDetection = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      const targetTop = targetRef.current.getBoundingClientRect().top;
      const invisibleZone = scrollHeight - scrollTop - targetTop;

      if (scrollTop + clientHeight < scrollHeight - invisibleZone) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    isDataLoaded && setTimeout(scrollDetection, 1000);

    window.addEventListener('resize', scrollDetection);
    window.addEventListener('scroll', scrollDetection);
    window.addEventListener('touchmove', scrollDetection);

    return () => {
      window.removeEventListener('resize', scrollDetection);
      window.removeEventListener('scroll', scrollDetection);
      window.removeEventListener('touchmove', scrollDetection);
    };
  }, [isDataLoaded, targetRef]);

  return (
    <>
      {isVisible && (
        <button className={styles.downButton} onClick={goDown}>
          &#9660;
        </button>
      )}
    </>
  );
};

export default DownButton;
