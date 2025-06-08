import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.svg';
import UserMenu from './UserMenu';
import styles from '../styles/components/Header.module.css';

const Header = () => {
  const { userName } = useSelector(state => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLogIn = location.pathname === '/login';
  const isSignUp = location.pathname.includes('sign_up');

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" />
        <h1>IT-Jobs International</h1>
      </Link>
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
            {!isLogIn && (
              <Link to="/login" className={`button ${styles.logInLink}`}>
                Log In
              </Link>
            )}
            {!isSignUp && (
              <Link to="/sign_up" className="button">
                Sign Up
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
