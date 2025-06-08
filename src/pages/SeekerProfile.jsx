import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearProfileError } from '../features/async/userProfileSlice';
import { countWorkExperience } from '../features/sync/totalExperienceSlice';
import { closeModal } from '../features/sync/modalSlice';
import { convertFormDataToObj } from '../methods';
import useFetchProfile from '../hooks/useFetchProfile';
import useSaveProfile from '../hooks/useSaveProfile';
import useFormValidation from '../hooks/useFormValidation';
import Loading from '../components/Loading';
import ProfileMenu from '../components/ProfileMenu';
import PositionInput from '../components/PositionInput';
import SalaryInput from '../components/SalaryInput';
import WorkplacesField from '../components/WorkplacesField';
import RelocationPossibilityCheckbox from '../components/RelocationPossibilityCheckbox';
import SkillsTextarea from '../components/SkillsTextarea';
import WorkExperienceBlock from '../components/WorkExperienceBlock';
import EducationBlock from '../components/EducationBlock';
import EnglishLevelSelect from '../components/EnglishLevelSelect';
import UrlInput from '../components/inputs/UrlInput';
import MyTextarea from '../components/inputs/MyTextarea';
import PreviewButton from '../components/buttons/PreviewButton';
import Modal from '../components/modals/Modal';
import ErrorModal from '../components/modals/ErrorModal';
import styles from '../styles/pages/SeekerProfile.module.css';

const SeekerProfile = () => {
  const dispatch = useDispatch();
  const { seekerid } = useParams() || {};
  const { profile, pending, error } = useSelector(state => state.userProfile);
  const { doesExperienceNeedAnUpdate } = useSelector(state => state.totalExperience);
  const form = useRef();
  const fetchProfile = useFetchProfile();
  const { saveData, savingMessage } = useSaveProfile();
  const { isValid, checkFormValidity } = useFormValidation(profile?.position ? true : false);

  useEffect(() => fetchProfile(seekerid, 'seeker'), [seekerid]);

  useEffect(() => {
    if (doesExperienceNeedAnUpdate) {
      const formData = new FormData(form.current);
      const cvObj = convertFormDataToObj(formData);
      dispatch(countWorkExperience(cvObj));
    }
  }, [doesExperienceNeedAnUpdate, form.current]);

  const handleInputs = () => {
    form.current && checkFormValidity(form.current);
  };

  const handleSubmit = e => {
    e.preventDefault();
    saveData({ formElem: form.current, userId: seekerid, userType: 'seeker' });
  };

  return (
    <div className="routesWrapper">
      <ProfileMenu userId={seekerid} userType="seeker" />
      <h3>Profile {profile?.isDisabled && '(disabled)'}</h3>
      {pending && <Loading />}
      <form ref={form} onSubmit={handleSubmit} onInput={handleInputs}>
        <PositionInput initialPosition={profile?.position} isRequired={true} />
        <SalaryInput initialSalary={profile?.salary} />
        <WorkplacesField initialWorkplaces={profile?.workplaces} />
        <RelocationPossibilityCheckbox docType="cv" initialState={profile?.isRelocationPossible} />
        <SkillsTextarea initialValue={profile?.skills} />
        <WorkExperienceBlock
          initialExperience={profile?.work}
          initialTotalExperience={profile?.totalWorkExperience}
        />
        <EducationBlock initialEducation={profile?.education} />
        <EnglishLevelSelect initialLevel={profile?.englishLevel} />
        <UrlInput
          labelAndName={{ label: 'Portfolio URL', name: 'portfolio' }}
          initialValue={profile?.portfolio}
        />
        <label>
          Additional information
          <MyTextarea name="additionalInfo" initialValue={profile?.additionalInfo} />
        </label>
        <div>
          <PreviewButton
            formElem={form.current}
            route={`/cv/${seekerid}/preview`}
            isDisabled={!isValid}
            userName={profile?.userName}
            location={profile?.location}
            dateOfBirth={profile?.dateOfBirth}
          />
          <button type="submit" disabled={!isValid}>
            Save
          </button>
        </div>
      </form>
      <Modal modalNameProp="SeekerProfile" message={savingMessage}>
        <button onClick={() => dispatch(closeModal())}>Close</button>
      </Modal>
      <ErrorModal
        error={['fetch', 'save'].includes(error?.actionCausedError) && error.message}
        parentName="SeekerProfile"
        actionAfterClosing={() => dispatch(clearProfileError())}
      />
    </div>
  );
};

export default SeekerProfile;
