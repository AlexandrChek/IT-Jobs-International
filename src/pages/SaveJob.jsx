import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { saveJobData, clearJobError } from '../features/async/jobSlice';
import { createPostReqSettings } from '../methods';
import { workplaces, jobTextareas } from '../constants';
import useFormValidation from '../hooks/useFormValidation';
import Loading from '../components/Loading';
import ProfileAndJobTitle from '../components/ProfileAndJobTitle';
import InputBox from '../components/InputBox';
import MyInput from '../components/inputs/MyInput';
import CountryCityInputs from '../components/specific_inputs/CountryCityInputs';
import CheckboxGroup from '../components/specific_inputs/CheckboxGroup';
import RelocationPossibilityCheckbox from '../components/specific_inputs/RelocationPossibilityCheckbox';
import ExperienceFromField from '../components/specific_inputs/ExperienceFromField';
import ExperienceIsNotRequiredCheckbox from '../components/specific_inputs/ExperienceIsNotRequiredCheckbox';
import SkillsTextarea from '../components/specific_inputs/SkillsTextarea';
import EnglishLevelSelect from '../components/specific_inputs/EnglishLevelSelect';
import MyTextarea from '../components/inputs/MyTextarea';
import PreviewButton from '../components/buttons/PreviewButton';
import SubmitButton from '../components/buttons/SubmitButton';
import ErrorModal from '../components/modals/ErrorModal';

const SaveJob = () => {
  const { companyid } = useParams() || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobData, pending, error } = useSelector(state => state.job);
  const { isValid, checkFormValidity } = useFormValidation(Boolean(jobData?.position));
  const form = useRef();
  const [currentForm, setCurrentForm] = useState(form.current);

  useEffect(() => {
    setCurrentForm(form.current);
  }, [form.current]);

  const handleChanges = () => {
    form.current && checkFormValidity(form.current);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const url = jobData ? `/edit/job/${companyid}/${jobData.jobId}` : `/create/job/${companyid}`;
    const settings = createPostReqSettings(url, formData);

    const savingResult = await dispatch(saveJobData(settings));

    if (saveJobData.fulfilled.match(savingResult)) {
      navigate(`/company_profile/${companyid}`);
    }
  };

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      <ProfileAndJobTitle>Job Properties</ProfileAndJobTitle>
      <form ref={form} onSubmit={handleSubmit} onChange={handleChanges} className="flexColumnBox">
        <InputBox id="positionJob" startLabel="Position*">
          <MyInput
            type="text"
            name="position"
            id="positionJob"
            initialValue={jobData?.position}
            required
          />
        </InputBox>
        <InputBox id="salaryJob" startLabel="Salary" endLabel=" $">
          <MyInput
            type="number"
            id="salaryJob"
            name="salary"
            width="170px"
            initialValue={jobData?.salary}
          />
        </InputBox>
        <CountryCityInputs initialCountry={jobData?.country} initialCity={jobData?.city} />
        <CheckboxGroup
          groupName="workplaces"
          legend="Workplace"
          allValues={workplaces}
          initialCheckedItems={jobData?.workplaces}
          isDirectionInline={true}
        />
        <RelocationPossibilityCheckbox docType="job" initialState={jobData?.isRelocationPossible} />
        <ExperienceFromField
          experienceFromYears={jobData?.experienceFromYears}
          experienceFromMonths={jobData?.experienceFromMonths}
        />
        <ExperienceIsNotRequiredCheckbox initialState={jobData?.experienceIsNotRequired} />
        <SkillsTextarea
          id="keySkillsInJob"
          label="Key skills (for searching)"
          initialValue={jobData?.skills}
        />
        <EnglishLevelSelect initialLevel={jobData?.englishLevel} />
        {jobTextareas.map(area => (
          <InputBox key={area.name} id={area.name} startLabel={area.label}>
            <MyTextarea
              id={area.name}
              name={area.name}
              initialValue={jobData && jobData[area.name]}
            />
          </InputBox>
        ))}
        <div className="inlineCenteredFlexBox">
          <PreviewButton formElem={currentForm} route="/job_preview" isDisabled={!isValid} />
          <SubmitButton disabled={!isValid}>Save Job</SubmitButton>
        </div>
      </form>
      <ErrorModal
        error={['fetch', 'save'].includes(error?.actionCausedError) && error.message}
        parentName="SaveJob"
        actionAfterClosing={() => dispatch(clearJobError())}
      />
    </div>
  );
};

export default SaveJob;
