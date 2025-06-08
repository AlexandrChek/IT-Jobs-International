import { Link } from 'react-router-dom';

const LinksList = ({ cvsOrJobs, type }) => {
  const getRoute = item => {
    return type === 'cv' ? `/cv/${item.seekerId}/public` : `/${item.companyId}/job/${item.jobId}`;
  };

  return (
    <div>
      {cvsOrJobs.map((item, index) => (
        <div key={index}>
          <Link to={getRoute(item)}>
            <h3>
              {item.position}
              {item.salary && `, ${item.salary}$`}
            </h3>
            {item.country && <p>{`${item.country}${item.city ? `, ${item.city}` : ''}`}</p>}
            {type === 'job' && item.isDisabled && <h4>Disabled</h4>}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LinksList;
