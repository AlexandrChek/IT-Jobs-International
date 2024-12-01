import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeProfile } from '../features/async/userProfileSlice';
import DisableButton from './buttons/DisableButton';
import RemoveButton from './buttons/RemoveButton';

const ProfileMenu = ({ userId, userType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchLinkText = 'Find ' + userType === 'Company' ? 'CVs' : 'jobs';
  const profileRouteStart = userType === 'Company' ? '/company_profile/' : '/job_seeker_profile/';

  const menuData = [
    { to: '/', text: searchLinkText },
    { to: `${profileRouteStart}${userId}/chat_list`, text: 'Correspondence' },
    { to: `${profileRouteStart}${userId}/edit_reg_data`, text: 'Edit registration data' },
  ];

  const handleRemove = async () => {
    const url = `/remove${profileRouteStart}${userId}`;

    try {
      await dispatch(removeProfile({ url })).unwrap();
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav>
      {menuData.map((item, index) => (
        <Link key={index} to={item.to} className="button">
          {item.text}
        </Link>
      ))}
      {userType === 'Job seeker' && <DisableButton whatToDisable="profile" params={userId} />}
      <RemoveButton whatToRemove="profile" remove={handleRemove} />
    </nav>
  );
};

export default ProfileMenu;
