import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJob, disableJob, anableJob, removeJob } from '../features/async/jobSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { getFetchingSettings } from '../methods';
import JobPublicView from '../components/JobPublicView';
import Modal from '../components/Modal';
import styles from '../styles/pages/Job.module.css';

const Job = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyid, jobid } = useParams();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const { jobData, pending } = useSelector((state) => state.job);
  const userId = useSelector((state) => state.auth.userId);
  const [fetchError, setFetchError] = useState(null);
  const settings = getFetchingSettings('/api/job', companyid, jobid);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const result = await dispatch(fetchJob(settings)).unwrap();

        if (result.status === 'disabled') {
          setIsDisabled(true);
        }
      } catch (error) {
        setFetchError(error.message);
      }
    };

    fetchJobData();
  }, [dispatch, settings]);

  const toggleJobStatus = async () => {
    if (!isDisabled) {
      const disablingSettings = getFetchingSettings('/api/disableJob', companyid, jobid);

      try {
        await dispatch(disableJob(disablingSettings)).unwrap();
        setIsDisabled(true);
      } catch (error) {
        alert(error.message);
      }
    } else {
      const anablingSettings = getFetchingSettings('/api/anableJob', companyid, jobid);

      try {
        await dispatch(anableJob(anablingSettings)).unwrap();
        setIsDisabled(false);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const close = () => setIsRemoveModalOpen(false);

  const handleRemoveJob = async () => {
    const removingSettings = getFetchingSettings('/api/removeJob', companyid, jobid);

    try {
      await dispatch(removeJob(removingSettings)).unwrap();
      navigate(`/company_profile/${companyid}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="routesWrapper">
      {pending && <h3>Loading...</h3>}
      {jobData && (
        <>
          {isDisabled && <h3>Disabled</h3>}
          <JobPublicView job={jobData} />
          {jobData.companyId === userId && (
            <>
              <Link to={`/company_profile/${companyid}/save_job`} state={jobData}>
                <button>Edit Job</button>
              </Link>
              <button onClick={toggleJobStatus}>
                {!isDisabled ? 'Disable this job' : 'Anable this job'}
              </button>
              <button onClick={() => setIsRemoveModalOpen(true)}>Remove this job</button>
              <Modal isOpen={isRemoveModalOpen} close={close}>
                <p>Are you sure you want to delete this job?</p>
                <div>
                  <button onClick={handleRemoveJob}>Yes</button>
                  <button onClick={() => close()}>No</button>
                </div>
              </Modal>
            </>
          )}
        </>
      )}
      {fetchError && <h3>{fetchError}</h3>}
    </div>
  );
};

export default Job;
