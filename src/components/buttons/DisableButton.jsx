import { useDispatch, useSelector } from 'react-redux';
import { toggleJobStatus } from '../../features/async/jobSlice';
import { toggleProfileStatus } from '../../features/async/userProfileSlice';

const DisableButton = ({ whatToDisable, params, buttonIsDisabled = false }) => {
  const dispatch = useDispatch();
  const isJobDisabled = useSelector(state => state.job.jobData?.isDisabled);
  const isProfileDisabled = useSelector(state => state.userProfile.profile?.isDisabled);
  let isDisabled = false,
    urlEnd = '',
    toggleMethod = null;

  if (whatToDisable === 'job') {
    isDisabled = isJobDisabled;
    urlEnd = `${params.companyid}/${params.jobid}`;
    toggleMethod = toggleJobStatus;
  } else {
    isDisabled = isProfileDisabled;
    urlEnd = params;
    toggleMethod = toggleProfileStatus;
  }

  const toggleStatus = () => {
    const url = `/toggle_status/${whatToDisable}/${urlEnd}`;

    try {
      dispatch(toggleMethod({ url })).unwrap();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <button onClick={toggleStatus} disabled={buttonIsDisabled || isDisabled === undefined}>
      {!isDisabled ? `Disable this ${whatToDisable}` : `Enable this ${whatToDisable}`}
    </button>
  );
};

export default DisableButton;
