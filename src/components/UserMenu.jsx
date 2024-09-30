import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../features/async/authSlice';
import styles from '../styles/components/UserMenu.module.css';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, userType } = useSelector((state) => state.auth);

  const goToProfile = () => {
    let route = '';
    if (userType === 'Company') {
      route = `/company_profile/${userId}`;
    } else {
      route = `/job_seeker_profile/${userId}`;
    }

    navigate(route);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  };

  return (
    <div className={styles.userMenu}>
      <div onClick={goToProfile}>My profile</div>
      <div onClick={handleLogOut}>Log out</div>
    </div>
  );
};

export default UserMenu;
