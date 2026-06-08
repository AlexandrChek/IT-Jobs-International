import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearProfileError } from '../features/async/userProfileSlice';
import { countWorkExperience } from '../features/sync/totalExperienceSlice';
import { closeModal } from '../features/sync/modalSlice';
import { convertFormDataToObj } from '../methods';
import { workplaces } from '../constants';
import useFetchProfile from '../hooks/useFetchProfile';
import useSaveProfile from '../hooks/useSaveProfile';
import useFormValidation from '../hooks/useFormValidation';
import Loading from '../components/Loading';
import ProfileMenu from '../components/menus/ProfileMenu';
import ProfileAndJobTitle from '../components/ProfileAndJobTitle';
import InputBox from '../components/InputBox';
import MyInput from '../components/inputs/MyInput';
import CheckboxGroup from '../components/specific_inputs/CheckboxGroup';
import SkillsTextarea from '../components/specific_inputs/SkillsTextarea';
import RelocationPossibilityCheckbox from '../components/specific_inputs/RelocationPossibilityCheckbox';
import WorkExperienceBlock from '../components/WorkExperienceBlock';
import EducationBlock from '../components/EducationBlock';
import EnglishLevelSelect from '../components/specific_inputs/EnglishLevelSelect';
import UrlInput from '../components/specific_inputs/UrlInput';
import MyTextarea from '../components/inputs/MyTextarea';
import PreviewButton from '../components/buttons/PreviewButton';
import SubmitButton from '../components/buttons/SubmitButton';
import Modal from '../components/modals/Modal';
import ErrorModal from '../components/modals/ErrorModal';

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
      {pending && <Loading />}
      <ProfileMenu userId={seekerid} userType="seeker" />
      <ProfileAndJobTitle>Profile {profile?.isDisabled && '(disabled)'}</ProfileAndJobTitle>
      <form ref={form} onSubmit={handleSubmit} onInput={handleInputs} className="flexColumnBox">
        <InputBox id="positionCv" startLabel="Position*">
          <MyInput
            type="text"
            name="position"
            id="positionCv"
            initialValue={profile?.position}
            required
          />
        </InputBox>
        <InputBox id="salaryCv" startLabel="Salary" endLabel=" $">
          <MyInput
            type="number"
            id="salaryCv"
            name="salary"
            width="170px"
            initialValue={profile?.salary}
          />
        </InputBox>
        <CheckboxGroup
          groupName="workplaces"
          legend="Workplace"
          allValues={workplaces}
          initialCheckedItems={profile?.workplaces}
          isDirectionInline={true}
        />
        <RelocationPossibilityCheckbox docType="cv" initialState={profile?.isRelocationPossible} />
        <SkillsTextarea id="seekerSkills" label="Your skills" initialValue={profile?.skills} />
        <WorkExperienceBlock
          initialExperience={profile?.work}
          initialTotalExperience={profile?.totalWorkExperience}
        />
        <EducationBlock initialEducation={profile?.education} />
        <EnglishLevelSelect initialLevel={profile?.englishLevel} isRequired={true} />
        <UrlInput urlName="portfolio" label="Portfolio URL" initialValue={profile?.portfolio} />
        <InputBox id="additionalInfoCv" startLabel="Additional information">
          <MyTextarea
            id="additionalInfoCv"
            name="additionalInfo"
            initialValue={profile?.additionalInfo}
          />
        </InputBox>
        <div className="inlineCenteredFlexBox">
          <PreviewButton
            formElem={form.current}
            route={`/cv/${seekerid}/preview`}
            isDisabled={!isValid}
            userName={profile?.userName}
            location={profile?.location}
            dateOfBirth={profile?.dateOfBirth}
          />
          <SubmitButton disabled={!isValid}>Save</SubmitButton>
        </div>
      </form>
      <Modal modalNameProp="SeekerProfile" message={savingMessage}>
        <button className="standardButton" onClick={() => dispatch(closeModal())}>
          Close
        </button>
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
