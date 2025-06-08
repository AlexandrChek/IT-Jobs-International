import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchJob, clearJobError } from '../features/async/jobSlice';
import useShowErrorPage from '../hooks/useShowErrorPage';
import Loading from '../components/Loading';
import JobOwnerMenu from '../components/JobOwnerMenu';
import JobPublicTemplate from '../components/JobPublicTemplate';
import CreateChatForm from '../components/CreateChatForm';
import styles from '../styles/pages/Job.module.css';

const Job = () => {
  const { companyid, jobid } = useParams() || {};
  const dispatch = useDispatch();
  const showErrorPage = useShowErrorPage();
  const { jobData, pending, error } = useSelector(state => state.job);
  const { userId, userName, userType } = useSelector(state => state.auth);

  useEffect(() => {
    const url = `/job/${companyid}/${jobid}`;
    dispatch(fetchJob({ url }));
  }, [companyid, jobid]);

  useEffect(() => {
    if (error?.actionCausedError === 'fetch') {
      showErrorPage(error.message, clearJobError);
    }
  }, [error?.actionCausedError, error?.message]);

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      {jobData && (
        <>
          {userType === 'company' && <JobOwnerMenu jobData={jobData} />}
          {jobData.isDisabled && <h3>Disabled</h3>}
          <JobPublicTemplate job={jobData} />
          {userType === 'seeker' && (
            <CreateChatForm
              seekerId={userId}
              companyId={companyid}
              userName={userName}
              userType={userType}
              jobId={jobid}
              position={jobData.position}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Job;
