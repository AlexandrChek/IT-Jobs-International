import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeProfile } from '../features/async/userProfileSlice';
import { getRequestSettings } from '../methods';
import RemoveButton from './RemoveButton';

const ProfileMenu = ({ userId, userType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let searchLinkText = 'Find ';
  let profileRouteStart = '';
  if ((userType = 'Company')) {
    searchLinkText += 'CVs';
    profileRouteStart = '/company_profile';
  } else {
    searchLinkText += 'jobs';
    profileRouteStart = '/job_seeker_profile';
  }

  const menuData = [
    { to: '/', text: searchLinkText },
    { to: `${profileRouteStart}/${userId}/chat_list`, text: 'Correspondence' },
    { to: `${profileRouteStart}/${userId}/edit_reg_data`, text: 'Edit registration data' },
  ];

  const handleRemove = async () => {
    let url = '/api/remove';
    url += userType === 'Company' ? 'CompanyProfile' : 'SeekerProfile';

    const settings = getRequestSettings(url, userId);

    try {
      await dispatch(removeProfile(settings)).unwrap();
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
      {userType === 'Job seeker' && <DisableButton whatToDisable="profile" body={userId} />}
      <RemoveButton whatToRemove="profile" remove={handleRemove} />
    </nav>
  );
};

export default ProfileMenu;
