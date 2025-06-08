import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { clearProfileError } from '../features/async/userProfileSlice';
import { closeModal } from '../features/sync/modalSlice';
import { clearJob } from '../features/async/jobSlice';
import useFetchProfile from '../hooks/useFetchProfile';
import useSaveProfile from '../hooks/useSaveProfile';
import Loading from '../components/Loading';
import ProfileMenu from '../components/ProfileMenu';
import EmployeesNumberSelect from '../components/EmployeesNumberSelect';
import UrlInput from '../components/inputs/UrlInput';
import MyTextarea from '../components/inputs/MyTextarea';
import PreviewButton from '../components/buttons/PreviewButton';
import LinksList from '../components/LinksList';
import Modal from '../components/modals/Modal';
import ErrorModal from '../components/modals/ErrorModal';
import styles from '../styles/pages/CompanyProfile.module.css';

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const { companyid } = useParams() || {};
  const { profile, pending, error } = useSelector(state => state.userProfile);
  const form = useRef();
  const fetchProfile = useFetchProfile();
  const { saveData, savingMessage } = useSaveProfile();

  useEffect(() => fetchProfile(companyid, 'company'), [companyid]);

  const handleSubmit = e => {
    e.preventDefault();
    saveData({ formElem: form.current, userId: companyid, userType: 'company' });
  };

  const clearPrevJob = () => dispatch(clearJob());

  return (
    <div className="routesWrapper">
      <ProfileMenu userId={companyid} userType="company" />
      <h3>Profile</h3>
      {pending && <Loading />}
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
            route={`/company_profile/${companyid}/preview`}
            companyName={profile?.companyName}
            location={profile?.location}
            jobs={profile?.jobs || []}
          />
          <button type="submit">Save</button>
        </div>
      </form>
      {profile?.jobs?.length ? (
        <div>
          <h4>Current jobs</h4>
          <LinksList cvsOrJobs={profile.jobs} type="job" />
        </div>
      ) : null}
      <Link to={`/company_profile/${companyid}/save_job`} className="button" onClick={clearPrevJob}>
        Add job
      </Link>
      <Modal modalNameProp="CompanyProfile" message={savingMessage}>
        <button onClick={() => dispatch(closeModal())}>Close</button>
      </Modal>
      <ErrorModal
        error={['fetch', 'save'].includes(error?.actionCausedError) && error.message}
        parentName="CompanyProfile"
        actionAfterClosing={() => dispatch(clearProfileError())}
      />
    </div>
  );
};

export default CompanyProfile;
