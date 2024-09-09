import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../features/async/authSlice';
import logo from '../assets/logo.svg';
import styles from '../styles/components/Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const { userName, userId, userType} = useSelector(state => state.auth);
  const [showLogOut, setShowLogOut] = useState(false);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo"/>
        <h1>IT-Jobs International</h1>
      </div>
      <nav className={styles.nav}>
        {userName ? (
          <div className={styles.userBlock}>
            <span
              className={styles.userName}
              onClick={() => setShowLogOut(!showLogOut)}
            >
              {userName}
            </span>
            {showLogOut && (
              <button
                className={styles.logOutButton}
                onClick={handleLogOut}
              >
                Log Out
              </button>
            )}
          </div>
        ) : (
          <div>
            <Link to="/login" className={styles.navButton}>Log In</Link>
            <Link to="/sign_up" className={styles.navButton}>Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
