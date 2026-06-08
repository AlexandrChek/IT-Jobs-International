import { useEffect } from 'react';
import styles from '../../styles/components/menus/DropdownMenu.module.css';

const DropdownMenu = ({ menuData, setIsMenuOpen, externalClass = null }) => {
  const handleClick = () => setIsMenuOpen(false);

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 0);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={styles.relativeBox}>
      <nav className={`${styles.menuWrapper} ${externalClass}`}>
        {menuData.map(item => (
          <div key={item.text} onClick={item.fn}>
            {item.text}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default DropdownMenu;
