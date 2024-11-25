import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJob, removeJob } from '../features/async/jobSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { getRequestSettings } from '../methods';
import Loading from '../components/Loading';
import JobPublicTemplate from '../components/JobPublicTemplate';
import DisableButton from '../components/buttons/DisableButton';
import RemoveButton from '../components/buttons/RemoveButton';
import CreateChatForm from '../components/CreateChatForm';
import styles from '../styles/pages/Job.module.css';

const Job = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyid, jobid } = useParams();
  const { jobData, pending, error } = useSelector(state => state.job);
  const { userId, userType } = useSelector(state => state.auth);
  const body = { companyid, jobid };

  useEffect(() => {
    const settings = getRequestSettings('/job', body);
    dispatch(fetchJob(settings));
  }, [companyid, jobid]);

  const handleRemoveJob = async () => {
    const removingSettings = getRequestSettings('/remove/job', body);

    try {
      await dispatch(removeJob(removingSettings)).unwrap();
      navigate(`/company_profile/${companyid}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      {jobData && (
        <>
          {jobData.isDisabled && <h3>Disabled</h3>}
          <JobPublicTemplate job={jobData} />
          {userType === 'Company' && (
            <nav>
              <Link
                to={`/company_profile/${companyid}/save_job`}
                state={jobData}
                className="button"
              >
                Edit Job
              </Link>
              <DisableButton whatToDisable="job" body={body} />
              <RemoveButton whatToRemove="job" remove={handleRemoveJob} />
            </nav>
          )}
          {userType === 'Job seeker' && (
            <CreateChatForm
              seekerId={userId}
              companyId={companyid}
              userType="Job seeker"
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
