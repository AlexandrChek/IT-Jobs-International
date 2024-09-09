import { useSelector } from 'react-redux';
import JobPublicView from '../components/JobPublicView';

const JobPreview = () => {
    const jobData = useSelector(state => state.formData);
    const { userId, userName } = useSelector(state => state.auth);
    let job = {...jobData, companyId: userId, companyName: userName};

    if (typeof(job.levels) === 'string') {
        job.levels = [job.levels];
    };
    if (typeof(job.workplaces) === 'string') {
        job.workplaces = [job.workplaces];
    };

    return <JobPublicView job={job} />;
};

export default JobPreview;