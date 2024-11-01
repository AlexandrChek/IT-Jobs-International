import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCvFormRef } from '../features/sync/cvFormSlice';
import useFetchProfile from '../hooks/useFetchProfile';
import useSaveProfile from '../hooks/useSaveProfile';
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
import UrlInput from '../components/UrlInput';
import MyTextarea from '../components/MyTextarea';
import PreviewButton from '../components/PreviewButton';
import styles from '../styles/pages/SeekerProfile.module.css';

const SeekerProfile = () => {
  const { seekerid } = useParams();
  const { profile, pending, error } = useSelector(state => state.userProfile);
  const dispatch = useDispatch();
  const form = useRef();
  const fetchProfile = useFetchProfile();
  const saveProfile = useSaveProfile();

  useEffect(() => {
    fetchProfile(seekerid, 'Job seeker');
    dispatch(setCvFormRef(form.current));
  }, [seekerid]);

  const handleSubmit = e => {
    e.preventDefault();
    saveProfile({ formElem: form.current, userId: seekerid, userType: 'Job seeker' });
  };

  return (
    <div className="routesWrapper">
      <ProfileMenu userId={seekerid} userType="Job seeker" />
      <h3>Profile</h3>
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      <form ref={form} onSubmit={handleSubmit}>
        <PositionInput initialPosition={profile?.position} isRequired={false} />
        <SalaryInput initialSalary={profile?.salary} />
        <WorkplacesField initialWorkplaces={profile?.workplaces} />
        <RelocationPossibilityCheckbox docType="cv" initialState={profile?.isRelocationPossible} />
        <SkillsTextarea />
        <WorkExperienceBlock initialExperience={profile?.work} />
        <EducationBlock initialEducation={profile?.education} />
        <EnglishLevelSelect initialLevel={profile?.englishLevel} />
        <UrlInput
          labelAndName={{ label: 'Portfolio URL', name: 'portfolio' }}
          initialValue={profile?.portfolio}
        />
        <label>
          Additional information
          <MyTextarea initialValue={profile?.additionalInfo} />
        </label>
        <div>
          <PreviewButton
            formElem={form.current}
            route={`/public_cv/${seekerid}`}
            userName={profile?.userName}
            location={profile?.location}
            dateOfBirth={profile?.dateOfBirth}
          />
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default SeekerProfile;
