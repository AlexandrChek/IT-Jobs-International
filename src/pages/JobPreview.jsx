import { useSelector } from 'react-redux';
import JobPublicTemplate from '../components/JobPublicTemplate';

const JobPreview = () => {
  const jobData = useSelector(state => state.formData);
  const { userId, userName } = useSelector(state => state.auth);
  const job = { ...jobData, companyId: userId, companyName: userName };

  return (
    <div className="routesWrapper">
      <JobPublicTemplate job={job} />
    </div>
  );
};

export default JobPreview;
