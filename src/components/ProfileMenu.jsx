import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeAccount } from '../features/async/userRegDataSlice';
import { logOut } from '../features/async/authSlice';
import DisableButton from './buttons/DisableButton';
import RemoveButton from './buttons/RemoveButton';

const ProfileMenu = ({ userId, userType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pending } = useSelector(state => state.userProfile);
  const isCompany = userType === 'company';
  const searchLinkText = 'Find ' + `${isCompany ? 'CVs' : 'jobs'}`;
  const profileRouteStart = isCompany ? '/company_profile/' : '/job_seeker_profile/';

  const menuData = [
    { to: '/', text: searchLinkText },
    { to: `${profileRouteStart}${userId}/chat_list`, text: 'Correspondence' },
    { to: `${profileRouteStart}${userId}/edit_reg_data`, text: 'Edit registration data' },
  ];

  const removeAccountAndExit = async () => {
    const url = `/remove${profileRouteStart}${userId}`;
    const removeResult = await dispatch(removeAccount({ url }));

    if (removeAccount.fulfilled.match(removeResult)) {
      dispatch(logOut());
      navigate('/');
    }
  };

  return (
    <nav>
      {menuData.map((item, index) => (
        <Link key={index} to={item.to} className="button">
          {item.text}
        </Link>
      ))}
      {!isCompany && (
        <DisableButton whatToDisable="profile" params={userId} buttonIsDisabled={pending} />
      )}
      <RemoveButton whatToRemove="account" removeAction={removeAccountAndExit} />
    </nav>
  );
};

export default ProfileMenu;
