import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyProfile } from '../features/async/companyProfileSlice';
import { useParams } from 'react-router-dom';
import { companyPublicFields } from '../constants';
import { getFetchingSettings } from '../methods';
import Loading from '../components/Loading';
import LinksList from '../components/LinksList';
import styles from '../styles/pages/CompanyProfilePublic.module.css';

const CompanyProfilePublic = () => {
  const { companyid } = useParams();
  const dispatch = useDispatch();
  const { profile, pending, error } = useSelector((state) => state.companyProfile);
  const { employeesNumberLabel, websiteLabel, descriptionLabel } = companyPublicFields;

  useEffect(() => {
    const settings = getFetchingSettings('/api/companyProfile', companyid);
    dispatch(fetchCompanyProfile(settings));
  }, [dispatch, companyid]);

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      {profile && (
        <>
          <h2>{profile.companyName}</h2>
          <p>{profile.location}</p>
          {profile.employeesNumber && (
            <h5>
              {employeesNumberLabel} {profile.employeesNumber}
            </h5>
          )}
          {profile.website && (
            <h5>
              {websiteLabel}{' '}
              <a href={profile.website} target="_blank">
                {profile.website}
              </a>
            </h5>
          )}
          {profile.description && (
            <>
              <h5>{descriptionLabel}</h5>
              <p>{profile.description}</p>
            </>
          )}
          {profile.jobs(
            <>
              <h4>Current jobs</h4>
              <LinksList cvsOrJobs={profile.jobs} type="job" />
            </>,
          )}
        </>
      )}
    </div>
  );
};

export default CompanyProfilePublic;
