import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

const JobOwnerMenu = ({ jobData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isNotLargeScreen } = useDetectScreenSize();
  const { isDisabled, toggleStatus, toggleError, clearToggleError } = useToggleStatus('job');
  const { question, removeAndExit } = useRemovalFeatures('job');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuData = [
    { fn: () => navigate(`/company_profile/${jobData.companyId}/save_job`), text: 'Edit Job' },
    {
      fn: () => toggleStatus(`/toggle_status/job/${jobData.companyId}/${jobData.jobId}`),
      text: `${isDisabled ? 'Enable' : 'Disable'} job`,
    },
    { fn: () => dispatch(openModal('JobOwnerMenu')), text: 'Remove job' },
  ];

  const removalModalBtnData = [
    {
      fn: () => {
        const url = `/remove/job/${jobData.companyId}/${jobData.jobId}`;
        const routeAfterRemoving = `/company_profile/${jobData.companyId}`;
        removeAndExit(url, routeAfterRemoving);
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
        parentName="JobOwnerMenu"
        actionAfterClosing={clearToggleError}
      />
      <QuestionModal
        modalNameProp="JobOwnerMenu"
        question={question}
        btnData={removalModalBtnData}
      />
    </div>
  );
};

export default JobOwnerMenu;
