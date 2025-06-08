import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeJob } from '../features/async/jobSlice';
import DisableButton from './buttons/DisableButton';
import RemoveButton from './buttons/RemoveButton';

const JobOwnerMenu = ({ jobData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pending } = useSelector(state => state.job);

  const removeAndExit = async () => {
    const url = `/remove/job/${jobData.companyId}/${jobData.jobId}`;
    const routeAfterRemoving = `/company_profile/${jobData.companyId}`;

    const removeResult = await dispatch(removeJob({ url }));

    if (removeJob.fulfilled.match(removeResult)) {
      navigate(routeAfterRemoving);
    }
  };

  return (
    <nav>
      <Link to={`/company_profile/${jobData.companyId}/save_job`} className="button">
        Edit Job
      </Link>
      <DisableButton
        whatToDisable="job"
        params={{ companyId: jobData.companyId, jobId: jobData.jobId }}
        buttonIsDisabled={pending}
      />
      <RemoveButton whatToRemove="job" removeAction={removeAndExit} />
    </nav>
  );
};

export default JobOwnerMenu;
