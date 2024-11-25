import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.svg';
import UserMenu from './UserMenu';
import styles from '../styles/components/Header.module.css';

const Header = () => {
  const userName = useSelector(state => state.auth.userName);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
        <h1>IT-Jobs International</h1>
      </div>
      <nav className={styles.nav}>
        {userName ? (
          <>
            <span className={styles.userName} onClick={() => setIsMenuOpen(true)}>
              {userName}
            </span>
            {isMenuOpen && <UserMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
          </>
        ) : (
          <div>
            <Link to="/login" className={`button ${styles.logInLink}`}>
              Log In
            </Link>
            <Link to="/sign_up" className="button">
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
