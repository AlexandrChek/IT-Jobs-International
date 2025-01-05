import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeJob } from '../features/async/jobSlice';
import DisableButton from './buttons/DisableButton';
import RemoveButton from './buttons/RemoveButton';

const JobOwnerMenu = ({ jobData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleStatusPending } = useSelector(state => state.job);

  const handleRemoveJob = async () => {
    const url = `/remove/job/${jobData.companyId}/${jobData.jobId}`;

    try {
      await dispatch(removeJob({ url })).unwrap();
      navigate(`/company_profile/${jobData.companyId}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav>
      <Link
        to={`/company_profile/${jobData.companyId}/save_job`}
        state={jobData}
        className="button"
      >
        Edit Job
      </Link>
      <DisableButton
        whatToDisable="job"
        params={{ companyId: jobData.companyId, jobId: jobData.jobId }}
        buttonIsDisabled={toggleStatusPending}
      />
      <RemoveButton whatToRemove="job" remove={handleRemoveJob} />
    </nav>
  );
};

export default JobOwnerMenu;
