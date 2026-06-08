import WebsiteOutput from '../output_components/WebsiteOutput';
import TextBlockOutput from '../output_components/TextBlockOutput';
import LinksList from '../LinksList';
import styles from '../../styles/components/public_templates/PublicTemplates.module.css';

const CompanyPublicTemplate = ({ profile }) => {
  return (
    <div>
      <h2 className={styles.companyNameInProfile}>{profile.companyName}</h2>
      <p className={styles.bigMb}>{profile.location}</p>
      <div className={`flexColumnBox ${profile.jobs?.length && styles.bigMb}`}>
        <div className={styles.nameValueBox}>
          <h5>Number of employees:</h5>
          <p>{profile.employeesNumber}</p>
        </div>
        {profile.website && (
          <WebsiteOutput
            title="Website:"
            siteUrl={profile.website}
            className={styles.nameValueBox}
          />
        )}
        {profile.description && (
          <TextBlockOutput
            newClass={styles.nameValueBox}
            title="Company description:"
            textContent={profile.description}
          />
        )}
      </div>
      {profile.jobs?.length ? (
        <>
          <h4 className={styles.standardMb}>Current Jobs</h4>
          <LinksList cvsOrJobs={profile.jobs} type="job" itemsPerPage={5} />
        </>
      ) : null}
    </div>
  );
};

export default CompanyPublicTemplate;
