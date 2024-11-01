import { useEffect } from 'react';

const useSaveWindowHeight = () => {
  useEffect(() => {
    const saveHeight = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      window.addEventListener('load', saveHeight);
      window.addEventListener('resize', saveHeight);
    }

    return () => {
      window.removeEventListener('load', saveHeight);
      window.removeEventListener('resize', saveHeight);
    };
  }, []);
};

export default useSaveWindowHeight;
