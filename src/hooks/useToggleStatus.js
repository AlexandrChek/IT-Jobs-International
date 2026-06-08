import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleJobStatus, clearJobError } from '../features/async/jobSlice';
import { toggleProfileStatus, clearProfileError } from '../features/async/userProfileSlice';

const useToggleStatus = whatToChange => {
  const dispatch = useDispatch();
  const isJobDisabled = useSelector(state => state.job.jobData?.isDisabled);
  const isProfileDisabled = useSelector(state => state.userProfile.profile?.isDisabled);
  const jobError = useSelector(state => state.job.error);
  const profileError = useSelector(state => state.userProfile.error);
  const isJobToChange = whatToChange === 'job';

  const isDisabled = useMemo(() => {
    return isJobToChange ? (isJobDisabled ?? false) : (isProfileDisabled ?? false);
  }, [isJobToChange, isJobDisabled, isProfileDisabled]);

  const toggleStatus = url => {
    const toggleMethod = isJobToChange ? toggleJobStatus : toggleProfileStatus;
    dispatch(toggleMethod({ url }));
  };

  const toggleError = useMemo(() => {
    if (!jobError && !profileError) return null;

    const currentError = isJobToChange ? { ...jobError } : { ...profileError };

    if (currentError.actionCausedError === 'toggle') {
      return currentError.message;
    }
  }, [isJobToChange, jobError, profileError]);

  const clearToggleError = () => {
    const clearErrorMethod = isJobToChange ? clearJobError : clearProfileError;
    dispatch(clearErrorMethod());
  };

  return { isDisabled, toggleStatus, toggleError, clearToggleError };
};

export default useToggleStatus;
