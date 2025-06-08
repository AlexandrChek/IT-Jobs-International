import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPreviewData } from '../methods';
import JobPublicTemplate from '../components/JobPublicTemplate';

const JobPreview = () => {
  const { userId, userName } = useSelector(state => state.auth);
  const [job, setJob] = useState(null);

  useEffect(() => {
    let previewData = getPreviewData();
    previewData = { ...previewData, companyId: userId, companyName: userName };
    setJob(previewData);
  }, [userId, userName]);

  return <div className="routesWrapper">{job && <JobPublicTemplate job={job} />}</div>;
};

export default JobPreview;
