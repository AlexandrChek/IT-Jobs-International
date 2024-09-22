import { Link } from 'react-router-dom';
import styles from '../styles/components/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/about_us" className={styles.footerLink}>
        About us
      </Link>
      <Link to="/contacts" className={styles.footerLink}>
        Contacts
      </Link>
      <Link to="/privacy" className={styles.footerLink}>
        Privacy
      </Link>
    </footer>
  );
};

export default Footer;
