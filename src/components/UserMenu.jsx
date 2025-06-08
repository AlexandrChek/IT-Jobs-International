import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../features/async/authSlice';
import { clearRegData } from '../features/async/userRegDataSlice';
import styles from '../styles/components/UserMenu.module.css';

const UserMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, userType } = useSelector(state => state.auth);
  const menuRef = useRef();

  const handleClickOutside = e => {
    if (!menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isMenuOpen) {
        document.addEventListener('click', handleClickOutside);
      }
    }, 0);

    return () => {
      clearInterval(timer);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const goToProfile = () => {
    setIsMenuOpen(false);
    const routeStart = userType === 'company' ? '/company' : '/job_seeker';
    const route = `${routeStart}_profile/${userId}`;
    navigate(route);
  };

  const handleLogOut = () => {
    setIsMenuOpen(false);
    dispatch(logOut());
    dispatch(clearRegData());
    navigate('/');
  };

  return (
    <div ref={menuRef} className={styles.userMenu}>
      <div onClick={goToProfile}>My profile</div>
      <div onClick={handleLogOut}>Log out</div>
    </div>
  );
};

export default UserMenu;
