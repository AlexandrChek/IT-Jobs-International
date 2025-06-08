import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleJobStatus, clearJobError } from '../../features/async/jobSlice';
import { toggleProfileStatus, clearProfileError } from '../../features/async/userProfileSlice';
import ErrorModal from '../modals/ErrorModal';

const DisableButton = ({ whatToDisable, params, buttonIsDisabled }) => {
  const dispatch = useDispatch();
  const isJobDisabled = useSelector(state => state.job.jobData?.isDisabled);
  const isProfileDisabled = useSelector(state => state.userProfile.profile?.isDisabled);
  const jobError = useSelector(state => state.job.error);
  const profileError = useSelector(state => state.userProfile.error);
  const isJobToDisable = whatToDisable === 'job';

  const isDisabled = useMemo(() => {
    return isJobToDisable ? (isJobDisabled ?? false) : (isProfileDisabled ?? false);
  }, [isJobToDisable, isJobDisabled, isProfileDisabled]);

  const error = useMemo(() => {
    if (jobError || profileError) {
      const currentError = isJobToDisable ? { ...jobError } : { ...profileError };

      if (currentError.actionCausedError === 'toggle') {
        return currentError.message;
      }
    } else return null;
  }, [isJobToDisable, jobError, profileError]);

  const toggleStatus = () => {
    const urlEnd = isJobToDisable ? `${params.companyId}/${params.jobId}` : params;
    const toggleMethod = isJobToDisable ? toggleJobStatus : toggleProfileStatus;
    const url = `/toggle_status/${whatToDisable}/${urlEnd}`;

    dispatch(toggleMethod({ url }));
  };

  const clearError = () => {
    const clearErrorMethod = isJobToDisable ? clearJobError : clearProfileError;
    dispatch(clearErrorMethod());
  };

  return (
    <>
      <button onClick={toggleStatus} disabled={buttonIsDisabled}>
        {!isDisabled ? `Disable this ${whatToDisable}` : `Enable this ${whatToDisable}`}
      </button>
      <ErrorModal error={error} parentName="DisableButton" actionAfterClosing={clearError} />
    </>
  );
};

export default DisableButton;
