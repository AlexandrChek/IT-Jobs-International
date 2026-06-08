import { useState, useEffect } from 'react';

const useDetectScreenSize = () => {
  const getScreenData = () => ({
    isSmallScreen: window.matchMedia('(max-width: 575px)').matches,
    isNotLargeScreen: window.matchMedia('(max-width: 991px)').matches,
  });
  const [screenData, setScreenData] = useState(getScreenData);
  const updateScreenData = () => setScreenData(getScreenData());

  useEffect(() => {
    window.addEventListener('resize', updateScreenData);
    return () => window.removeEventListener('resize', updateScreenData);
  }, []);

  return screenData;
};

export default useDetectScreenSize;
