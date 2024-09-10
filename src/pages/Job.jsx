import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJob, disableJob, anableJob, removeJob } from '../features/async/jobSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { getFetchingOptions } from '../methods';
import JobPublicView from '../components/JobPublicView';
import Modal from '../components/Modal';
import styles from '../styles/pages/Job.module.css';

const Job = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyid, jobid } = useParams();
  const [isDisabled, setIsDisabled] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const { jobData, pending } = useSelector(state => state.job);
  const userId = useSelector(state => state.auth.userId);
  const [fetchError, setFetchError] = useState(null);
  const options = getFetchingOptions('fetchJob', companyid, jobid);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const result = await dispatch(fetchJob(options)).unwrap();
  
        if (result.status === 'disabled') {
          setIsDisabled(true);
        };
      } catch (error) {
        setFetchError(error.message);
      };
    };

    fetchJobData();
  }, [dispatch, options]);

  const toggleJobStatus = async () => {
    if (!isDisabled) {
      const disablingOptions = getFetchingOptions('disableJob', companyid, jobid);

      try {
        await dispatch(disableJob(disablingOptions)).unwrap();
        setIsDisabled(true);
      } catch (error) {
        alert(error.message);
      };

    } else {
      const anablingOptions = getFetchingOptions('anableJob', companyid, jobid);

      try {
        await dispatch(anableJob(anablingOptions)).unwrap();
        setIsDisabled(false);
      } catch (error) {
        alert(error.message);
      };

    };
  };

  const close = () => setIsRemoveModalOpen(false);

  const handleRemoveJob = async () => {
    const removingOptions = getFetchingOptions('removeJob', companyid, jobid);

    try {
      await dispatch(removeJob(removingOptions)).unwrap();
      navigate(`/company_profile/${companyid}`);
    } catch (error) {
      alert(error.message);
    };

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
