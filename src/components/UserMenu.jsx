import { userMenu } from '../constants';
import styles from '../styles/components/UserMenu.module.css';

const UserMenu = () => {
  return (
    <nav>
      {userMenu.map((item) => {
        <div key={item} className={styles.menuItem}>
          {item}
        </div>;
      })}
    </nav>
  );
};

export default UserMenu;
