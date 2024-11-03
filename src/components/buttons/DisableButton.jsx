import { useDispatch, useSelector } from 'react-redux';
import { toggleJobStatus } from '../../features/async/jobSlice';
import { toggleProfileStatus } from '../../features/async/userProfileSlice';
import { getRequestSettings } from '../../methods';

const DisableButton = ({ whatToDisable, body }) => {
  const dispatch = useDispatch();
  const isJobDisabled = useSelector(state => state.job.jobData?.isDisabled);
  const isProfileDisabled = useSelector(state => state.userProfile.profile?.isDisabled);
  const isDisabled = whatToDisable === 'job' ? isJobDisabled : isProfileDisabled;

  const toggleStatus = async () => {
    const url = isDisabled ? `/api/anable_${whatToDisable}` : `/api/disable_${whatToDisable}`;

    const toggleMethod = whatToDisable === 'job' ? toggleJobStatus : toggleProfileStatus;

    const settings = getRequestSettings(url, body);

    try {
      await dispatch(toggleMethod(settings)).unwrap();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {isDisabled !== undefined && (
        <button onClick={toggleStatus}>
          {!isDisabled ? `Disable this ${whatToDisable}` : `Anable this ${whatToDisable}`}
        </button>
      )}
    </>
  );
};

export default DisableButton;
