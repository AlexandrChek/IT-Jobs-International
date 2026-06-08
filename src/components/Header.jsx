import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUnreadCount, logOut } from '../features/async/authSlice';
import { clearRegData } from '../features/async/userRegDataSlice';
import useDetectScreenSize from '../hooks/useDetectScreenSize';
import logo from '../assets/logo.svg';
import DropdownMenu from './menus/DropdownMenu';
import PrimaryMenu from './menus/PrimaryMenu';
import styles from '../styles/components/Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSmallScreen } = useDetectScreenSize();
  const { userName, userId, userType, unreadCount } = useSelector(state => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isCompany = userType === 'company';

  useEffect(() => {
    const interval = setInterval(() => {
      if (userId) {
        const url = `/user_unread_msg_count/${userType}/${userId}`;
        dispatch(updateUnreadCount({ url }));
      }
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => setIsMenuOpen(false), [userName]);

  const goToProfile = () => {
    const routeStart = isCompany ? '/company' : '/job_seeker';
    navigate(`${routeStart}_profile/${userId}`);
  };

  const goToChatList = () => {
    const routeStart = isCompany ? '/company_profile/' : '/job_seeker_profile/';
    navigate(`${routeStart}${userId}/chat_list`);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(clearRegData());
    navigate('/');
  };

  const menuData = [
    { fn: goToProfile, text: 'My profile' },
    { fn: goToChatList, text: 'Correspondence' },
    { fn: handleLogOut, text: 'Log out' },
  ];

  return (
    <header className={isSmallScreen ? styles.headerInColumn : styles.headerInline}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" />
        <h1>IT-Jobs International</h1>
      </Link>
      {userName ? (
        <div>
          <span className={styles.userNameWrapper}>
            <span className={styles.unreadIndicator}>{unreadCount}</span>
            <span className={styles.userName} onClick={() => setIsMenuOpen(true)}>
              {userName}
            </span>
          </span>
          {isMenuOpen && (
            <DropdownMenu
              menuData={menuData}
              setIsMenuOpen={setIsMenuOpen}
              externalClass={styles.userMenu}
            />
          )}
        </div>
      ) : (
        <PrimaryMenu />
      )}
    </header>
  );
};

export default Header;
