import LinksList from './LinksList';

const CompanyPublicTemplate = ({ profile, activeJobs }) => {
  return (
    <>
      <h2>{profile.companyName}</h2>
      <p>{profile.location}</p>
      {profile.employeesNumber && <h5>Number of employees: {profile.employeesNumber}</h5>}
      {profile.website && (
        <h5>
          Website:
          <a href={profile.website} target="_blank">
            {profile.website}
          </a>
        </h5>
      )}
      {profile.description && (
        <>
          <h5>Company description:</h5>
          <p>{profile.description}</p>
        </>
      )}
      {activeJobs.length && (
        <>
          <h4>Current jobs</h4>
          <LinksList cvsOrJobs={activeJobs} type="job" />
        </>
      )}
    </>
  );
};

export default CompanyPublicTemplate;
