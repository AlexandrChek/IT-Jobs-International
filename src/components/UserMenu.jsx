import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../features/async/authSlice';
import styles from '../styles/components/UserMenu.module.css';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, userType } = useSelector(state => state.auth);

  const goToProfile = () => {
    let route = `_profile/${userId}`;
    route = userType === 'Company' ? '/company' + route : '/job_seeker' + route;
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
