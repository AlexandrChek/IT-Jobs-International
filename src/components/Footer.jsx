import { Link } from 'react-router-dom';
import { footerMenuData } from '../constants';
import styles from '../styles/components/Footer.module.css';

const Footer = () => {
  return (
    <footer>
      {footerMenuData.map(item => (
        <Link key={item.label} to={item.to} className={styles.footerLink}>
          {item.label}
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
