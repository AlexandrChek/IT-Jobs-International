import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { saveJobData, clearJobError } from '../features/async/jobSlice';
import { closeModal } from '../features/sync/modalSlice';
import { createPostReqSettings } from '../methods';
import { jobTextareas } from '../constants';
import useFormValidation from '../hooks/useFormValidation';
import Loading from '../components/Loading';
import PositionInput from '../components/PositionInput';
import SalaryInput from '../components/SalaryInput';
import CountryCityInputs from '../components/CountryCityInputs';
import WorkplacesField from '../components/WorkplacesField';
import RelocationPossibilityCheckbox from '../components/RelocationPossibilityCheckbox';
import ExperienceFromField from '../components/ExperienceFromField';
import ExperienceIsNotRequiredCheckbox from '../components/ExperienceIsNotRequiredCheckbox';
import EnglishLevelSelect from '../components/EnglishLevelSelect';
import MyTextarea from '../components/inputs/MyTextarea';
import PreviewButton from '../components/buttons/PreviewButton';
import ErrorModal from '../components/modals/ErrorModal';
import styles from '../styles/pages/SaveJob.module.css';

const SaveJob = () => {
  const { companyid } = useParams() || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobData, pending, error } = useSelector(state => state.job);
  const { isValid, checkFormValidity } = useFormValidation(jobData?.position ? true : false);
  const form = useRef();
  const [currentForm, setCurrentForm] = useState(form.current);

  useEffect(() => {
    setCurrentForm(form.current);
  }, [form.current]);

  const handleInputs = () => {
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
      <h3>Job Properties</h3>
      {pending && <Loading />}
      <form ref={form} onSubmit={handleSubmit} onInput={handleInputs}>
        <PositionInput initialPosition={jobData?.position} isRequired={true} />
        <SalaryInput initialSalary={jobData?.salary} />
        <CountryCityInputs initialCountry={jobData?.country} initialCity={jobData?.city} />
        <WorkplacesField initialWorkplaces={jobData?.workplaces} />
        <RelocationPossibilityCheckbox docType="job" initialState={jobData?.isRelocationPossible} />
        <ExperienceFromField
          experienceFromYears={jobData?.experienceFromYears}
          experienceFromMonths={jobData?.experienceFromMonths}
        />
        <ExperienceIsNotRequiredCheckbox initialState={jobData?.experienceIsNotRequired} />
        <EnglishLevelSelect initialLevel={jobData?.englishLevel} />
        {jobTextareas.map(area => (
          <div key={area.name}>
            <label htmlFor={area.name}>{area.label}</label>
            <MyTextarea
              id={area.name}
              name={area.name}
              initialValue={jobData && jobData[area.name]}
            />
          </div>
        ))}
        <div>
          <PreviewButton formElem={currentForm} route="/job_preview" isDisabled={!isValid} />
          <button type="submit" disabled={!isValid}>
            Save Job
          </button>
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
