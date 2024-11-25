import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, clearJobs } from '../features/async/jobListSlice';
import { getRequestSettings } from '../methods';

const JobSelect = ({ companyId, getJobId, isRequired = true }) => {
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.jobList.jobs);
    const [selected, setSelected] = useState('');

    const getJobs = () => {
        const settings = getRequestSettings('/company_job_list', companyId);
        dispatch(fetchJobs(settings));
    }

    useEffect(() => {
        window.addEventListener('load', getJobs);

        return () => {
            window.removeEventListener('load', getJobs);
            dispatch(clearJobs());
        }
    }, [])

    const handleChange = e => {
        setSelected(e.target.value);

        const jobId = e.target.selectedOptions[0].dataset.jobId;
        getJobId(jobId);
    }

    return (
        <label>
            Select proposed job
            <select name="position" value={selected} onChange={handleChange} required={isRequired}>
                {jobs.map(job => (
                    <option key={job.jobId} value={job.position} data-job-id={job.jobId}>
                        {job.position}
                    </option>
                ))}
            </select>
        </label>
    )
}

export default JobSelect;