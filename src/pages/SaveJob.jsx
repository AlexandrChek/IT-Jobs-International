import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { saveJobData } from '../features/async/jobSlice';
import { saveFormData } from '../features/sync/formDataSlice';
import { convertFormDataToObj, getSendingSettings } from '../methods';
import PositionInput from '../components/PositionInput';
import SalaryInput from '../components/SalaryInput';
import CountryCityInputs from '../components/CountryCityInputs';
import WorkplacesField from '../components/WorkplacesField';
import RelocationPossibilityCheckbox from '../components/RelocationPossibilityCheckbox';
import ExperienceFromField from '../components/ExperienceFromField';
import ExperienceIsNotRequiredCheckbox from '../components/ExperienceIsNotRequiredCheckbox';
import EnglishLevelSelect from '../components/EnglishLevelSelect';
import MyTextarea from '../components/MyTextarea';
import { jobTextareas, savingMessage } from '../constants';
import styles from '../styles/pages/SaveJob.module.css';

const SaveJob = () => {
  const { companyid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const form = useRef();

  const showPreview = () => {
    const formData = new FormData(form.current);
    const jobObj = convertFormDataToObj(formData);
    dispatch(saveFormData(jobObj));
    window.open('/job_preview', '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData(form.current);
    let url = '/api/';

    if (state) {
      url += 'editJob';
      formData.append('id', state.id);
    } else {
      url += 'createJob';
    }

    formData.append('companyId', companyid);
    formData.append('status', 'active');

    const settings = getSendingSettings(url, formData);

    try {
      await dispatch(saveJobData(settings)).unwrap();
      alert(savingMessage);
      navigate(`/company_profile/${companyid}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="routesWrapper">
      <h3>Job Properties</h3>

      <form ref={form} onSubmit={handleSubmit}>
        <PositionInput initialPosition={state && state.position} isRequired={true} />
        <SalaryInput initialSalary={state && state.salary} />
        <CountryCityInputs
          initialCountry={state && state.country}
          initialCity={state && state.city}
        />
        <WorkplacesField initialWorkplaces={state && state.workplaces} />
        <RelocationPossibilityCheckbox
          docType="job"
          initialState={state && state.isRelocationPossible}
        />
        <ExperienceFromField
          initialExperience={state && state.experienceFrom}
          initialUnit={state && state.experienceUnit}
        />
        <ExperienceIsNotRequiredCheckbox initialState={state && state.experienceIsNotRequired} />
        <EnglishLevelSelect initialLevel={state && state.englishLevel} />
        {jobTextareas.map((area) => (
          <div key={area.name}>
            <label htmlFor={area.name}>{area.label}</label>
            <MyTextarea id={area.name} name={area.name} initialValue={state && state[area.name]} />
          </div>
        ))}
        <div>
          <button type="button" onClick={showPreview}>
            Preview
          </button>
          <button type="submit">Save Job</button>
        </div>
      </form>
    </div>
  );
};

export default SaveJob;
