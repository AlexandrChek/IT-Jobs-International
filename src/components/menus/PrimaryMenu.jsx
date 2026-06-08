import { useLocation, useNavigate } from 'react-router-dom';
import InlineBtnMenu from './InlineBtnMenu';

const PrimaryMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogInRoute = location.pathname === '/login';
  const isSignUpRoute = location.pathname.includes('sign_up');

  const menuData = [
    ...(!isLogInRoute ? [{ fn: () => navigate('/login'), text: 'Log In' }] : []),
    ...(!isSignUpRoute ? [{ fn: () => navigate('/sign_up'), text: 'Sign Up' }] : []),
  ];

  return <InlineBtnMenu menuData={menuData} />;
};
export default PrimaryMenu;
