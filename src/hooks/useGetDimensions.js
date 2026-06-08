import { useEffect } from 'react';
import { checkIsMobileDedice } from '../methods';

const useGetDimensions = () => {
  useEffect(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    const saveHeights = () => {
      const headerHeight = header.getBoundingClientRect().height;
      const footerHeight = footer.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
      document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
    };

    const saveVh = e => {
      const isMobileDevice = checkIsMobileDedice();

      if (isMobileDevice) {
        const vh = window.innerHeight / 100;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      } else if (e.type === 'resize') {
        document.documentElement.style.removeProperty('--vh');
      }
    };

    const resizeObserver = new ResizeObserver(saveHeights);
    [header, footer].forEach(el => resizeObserver.observe(el));

    window.addEventListener('load', saveVh);
    window.addEventListener('resize', saveVh);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('load', saveVh);
      window.removeEventListener('resize', saveVh);
    };
  }, []);
};

export default useGetDimensions;
