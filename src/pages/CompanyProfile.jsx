import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import useFetchProfile from '../hooks/useFetchProfile';
import useSaveProfile from '../hooks/useSaveProfile';
import Loading from '../components/Loading';
import ProfileMenu from '../components/ProfileMenu';
import EmployeesNumberSelect from '../components/EmployeesNumberSelect';
import UrlInput from '../components/UrlInput';
import MyTextarea from '../components/MyTextarea';
import PreviewButton from '../components/PreviewButton';
import LinksList from '../components/LinksList';
import styles from '../styles/pages/CompanyProfile.module.css';

const CompanyProfile = () => {
  const { companyid } = useParams();
  const { profile, pending, error } = useSelector(state => state.userProfile);
  const form = useRef();
  const fetchProfile = useFetchProfile();
  const saveProfile = useSaveProfile();

  useEffect(() => {
    fetchProfile(companyid, 'Company');
  }, [companyid]);

  const handleSubmit = e => {
    e.preventDefault();
    saveProfile({ formElem: form.current, userId: companyid, userType: 'Company' });
  };

  return (
    <div className="routesWrapper">
      <ProfileMenu userId={companyid} userType="Company" />
      <h3>Profile</h3>
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      <form ref={form} onSubmit={handleSubmit}>
        <EmployeesNumberSelect initialValue={profile?.employeesNumber} />
        <UrlInput
          labelAndName={{ label: 'Website:', name: 'website' }}
          initialValue={profile?.website}
        />
        <div>
          <label htmlFor="description">Company description:</label>
          <MyTextarea id="description" name="description" initialValue={profile?.description} />
        </div>
        <div>
          <PreviewButton
            formElem={form.current}
            route={`/company_profile/${companyid}/public`}
            companyName={profile?.companyName}
            location={profile?.location}
          />
          <button type="submit">Save</button>
        </div>
      </form>
      {profile?.jobs && <LinksList cvsOrJobs={profile.jobs} type="job" />}
      <Link to={`/company_profile/${companyid}/save_job`} className="button">
        Add job
      </Link>
    </div>
  );
};

export default CompanyProfile;
