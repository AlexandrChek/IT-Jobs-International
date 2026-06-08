import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { clearProfileError } from '../features/async/userProfileSlice';
import { closeModal } from '../features/sync/modalSlice';
import { clearJob } from '../features/async/jobSlice';
import useFetchProfile from '../hooks/useFetchProfile';
import useSaveProfile from '../hooks/useSaveProfile';
import Loading from '../components/Loading';
import ProfileMenu from '../components/menus/ProfileMenu';
import ProfileAndJobTitle from '../components/ProfileAndJobTitle';
import EmployeesNumberSelect from '../components/specific_inputs/EmployeesNumberSelect';
import UrlInput from '../components/specific_inputs/UrlInput';
import InputBox from '../components/InputBox';
import MyTextarea from '../components/inputs/MyTextarea';
import PreviewButton from '../components/buttons/PreviewButton';
import SubmitButton from '../components/buttons/SubmitButton';
import LinksList from '../components/LinksList';
import Modal from '../components/modals/Modal';
import ErrorModal from '../components/modals/ErrorModal';
import styles from '../styles/pages/CompanyProfile.module.css';

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyid } = useParams() || {};
  const { profile, pending, error } = useSelector(state => state.userProfile);
  const profileNotCreated = !profile?.employeesNumber && !pending && !error;
  const form = useRef();
  const fetchProfile = useFetchProfile();
  const { saveData, savingMessage } = useSaveProfile();

  useEffect(() => fetchProfile(companyid, 'company'), [companyid]);

  const handleSubmit = e => {
    e.preventDefault();
    saveData({ formElem: form.current, userId: companyid, userType: 'company' });
  };

  const goToAddJob = () => {
    dispatch(clearJob());
    navigate(`/company_profile/${companyid}/save_job`);
  };

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      <ProfileMenu userId={companyid} userType="company" />
      <ProfileAndJobTitle>Profile</ProfileAndJobTitle>
      <form ref={form} onSubmit={handleSubmit} className={`flexColumnBox ${styles.profileForm}`}>
        <EmployeesNumberSelect initialValue={profile?.employeesNumber} isRequired={true} />
        <UrlInput label="Website" initialValue={profile?.website} />
        <InputBox id="description" startLabel="Company description">
          <MyTextarea id="description" name="description" initialValue={profile?.description} />
        </InputBox>
        <div className="inlineCenteredFlexBox">
          <PreviewButton
            formElem={form.current}
            route={`/company_profile/${companyid}/preview`}
            companyName={profile?.companyName}
            location={profile?.location}
            jobs={profile?.jobs || []}
          />
          <SubmitButton newClass={profileNotCreated ? styles.blinkingBorder : ''}>
            Save
          </SubmitButton>
        </div>
      </form>
      {profile?.jobs?.length ? (
        <div className={styles.jobListBox}>
          <h4 className={styles.jobsTitle}>Current Jobs</h4>
          <LinksList cvsOrJobs={profile.jobs} type="job" itemsPerPage={5} />
        </div>
      ) : null}
      <button className="standardButton" onClick={goToAddJob} disabled={!profile?.employeesNumber}>
        Add job
      </button>
      <Modal modalNameProp="CompanyProfile" message={savingMessage}>
        <button className="standardButton" onClick={() => dispatch(closeModal())}>
          Close
        </button>
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
