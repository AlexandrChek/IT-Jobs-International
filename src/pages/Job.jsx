import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJob, removeJob } from '../features/async/jobSlice';
import { useParams, useNavigate } from 'react-router-dom';
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
  const { jobData, pending, error, togglePending } = useSelector(state => state.job);
  const { userId, userType } = useSelector(state => state.auth);
  const urlEnd = `/${companyid}/${jobid}`;

  useEffect(() => {
    const url = `/job${urlEnd}`;
    dispatch(fetchJob({ url }));
  }, [companyid, jobid]);

  const handleRemoveJob = async () => {
    const remUrl = `/remove/job${urlEnd}`;

    try {
      await dispatch(removeJob({ remUrl })).unwrap();
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
              <DisableButton
                whatToDisable="job"
                params={{ companyid, jobid }}
                buttonIsDisabled={togglePending}
              />
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
