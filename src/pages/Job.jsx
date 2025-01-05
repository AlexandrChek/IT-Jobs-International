import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJob } from '../features/async/jobSlice';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import JobOwnerMenu from '../components/JobOwnerMenu';
import JobPublicTemplate from '../components/JobPublicTemplate';
import CreateChatForm from '../components/CreateChatForm';
import styles from '../styles/pages/Job.module.css';

const Job = () => {
  const dispatch = useDispatch();
  const { companyid, jobid } = useParams();
  const { jobData, pending, error } = useSelector(state => state.job);
  const { userId, userName, userType } = useSelector(state => state.auth);

  useEffect(() => {
    const url = `/job/${companyid}/${jobid}`;
    dispatch(fetchJob({ url }));
  }, [companyid, jobid]);

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
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
