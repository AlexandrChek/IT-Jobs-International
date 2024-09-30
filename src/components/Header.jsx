import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.svg';
import UserMenu from './UserMenu';
import styles from '../styles/components/Header.module.css';

const Header = () => {
  const userName = useSelector((state) => state.auth.userName);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userMenuRef = useRef();

  const handleClickOutside = (e) => {
    if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  const openUserMenu = () => {
    setIsMenuOpen(true);
    document.addEventListener('click', handleClickOutside);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
        <h1>IT-Jobs International</h1>
      </div>
      <nav className={styles.nav}>
        {userName ? (
          <>
            <span className={styles.userName} onClick={openUserMenu}>
              {userName}
            </span>
            {isMenuOpen && <UserMenu ref={userMenuRef} />}
          </>
        ) : (
          <div>
            <Link to="/login" className="button" style={{ marginRight: '0.5rem' }}>
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
