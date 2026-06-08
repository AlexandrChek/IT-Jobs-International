import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, clearJobs } from '../../features/async/jobListSlice';
import { getAsterisk } from '../../methods';
import MySelect from '../inputs/MySelect';
import SelectBox from '../SelectBox';

const JobSelect = ({ companyId, seekerId, getJobId, isRequired = true }) => {
  const dispatch = useDispatch();
  const jobs = useSelector(state => state.jobList.jobs);
  const label = `Select proposed job${getAsterisk(isRequired)}`;

  useEffect(() => {
    if (companyId) {
      const url = `/company_job_list/${companyId}/${seekerId}`;
      dispatch(fetchJobs({ url }));
    }

    return () => dispatch(clearJobs());
  }, [companyId]);

  return (
    <SelectBox selectId="jobSelect" label={label}>
      <MySelect
        selectId="jobSelect"
        name="position"
        options={jobs}
        emptyOption="Job list"
        getVal={job => getJobId(job.id)}
        isRequired={isRequired}
      />
    </SelectBox>
  );
};

export default JobSelect;
