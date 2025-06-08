import LinksList from './LinksList';

const CompanyPublicTemplate = ({ profile }) => {
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
          <p className="bigText">{profile.description}</p>
        </>
      )}
      {profile.jobs?.length ? (
        <>
          <h4>Current jobs</h4>
          <LinksList cvsOrJobs={profile.jobs} type="job" />
        </>
      ) : null}
    </>
  );
};

export default CompanyPublicTemplate;
