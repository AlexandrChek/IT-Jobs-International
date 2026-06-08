import { Link } from 'react-router-dom';

const UserProfilePublicLink = ({ userId, userName, userType, ...rest }) => {
  const route =
    userType === 'seeker' ? `/cv/${userId}/public` : `/company_profile/${userId}/public`;

  return (
    <Link to={route}>
      <h4 {...rest}>{userName}</h4>
    </Link>
  );
};

export default UserProfilePublicLink;
