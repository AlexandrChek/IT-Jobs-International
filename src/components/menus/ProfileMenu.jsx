import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal, closeModal } from '../../features/sync/modalSlice';
import useDetectScreenSize from '../../hooks/useDetectScreenSize';
import useToggleStatus from '../../hooks/useToggleStatus';
import useRemovalFeatures from '../../hooks/useRemovalFeatures';
import BurgerButton from '../buttons/BurgerButton';
import DropdownMenu from './DropdownMenu';
import InlineBtnMenu from './InlineBtnMenu';
import ErrorModal from '../modals/ErrorModal';
import QuestionModal from '../modals/QuestionModal';
import styles from '../../styles/components/menus/ProfileAndJobMenu.module.css';

const ProfileMenu = ({ userId, userType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isNotLargeScreen } = useDetectScreenSize();
  const { isDisabled, toggleStatus, toggleError, clearToggleError } = useToggleStatus('profile');
  const { question, removeAndExit } = useRemovalFeatures('account');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isCompany = userType === 'company';
  const profileRouteStart = isCompany ? '/company_profile/' : '/job_seeker_profile/';

  const menuData = [
    { fn: () => navigate('/'), text: 'Find ' + `${isCompany ? 'CVs' : 'jobs'}` },
    {
      fn: () => navigate(`${profileRouteStart}${userId}/edit_reg_data`),
      text: 'Edit registration data',
    },
    ...(!isCompany
      ? [
          {
            fn: () => toggleStatus(`/toggle_status/profile/${userId}`),
            text: `${isDisabled ? 'Enable' : 'Disable'} profile`,
          },
        ]
      : []),
    { fn: () => dispatch(openModal('ProfileMenu')), text: 'Remove account' },
  ];

  const removalModalBtnData = [
    {
      fn: () => {
        removeAndExit(`/remove${profileRouteStart}${userId}`, '/');
        dispatch(closeModal());
      },
      text: 'Yes',
    },
    { fn: () => dispatch(closeModal()), text: 'No' },
  ];

  return (
    <div className={!isNotLargeScreen ? styles.inlineMenuMb : ''}>
      {isNotLargeScreen && <BurgerButton onClick={() => setIsMenuOpen(!isMenuOpen)} />}
      {isNotLargeScreen && isMenuOpen && (
        <DropdownMenu menuData={menuData} setIsMenuOpen={setIsMenuOpen} />
      )}
      {!isNotLargeScreen && <InlineBtnMenu menuData={menuData} />}
      <ErrorModal
        error={toggleError}
        parentName="ProfileMenu"
        actionAfterClosing={clearToggleError}
      />
      <QuestionModal
        modalNameProp="ProfileMenu"
        question={question}
        btnData={removalModalBtnData}
      />
    </div>
  );
};

export default ProfileMenu;
