import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { saveJobData } from '../features/async/jobSlice';
import { getRequestSettings } from '../methods';
import PositionInput from '../components/PositionInput';
import SalaryInput from '../components/SalaryInput';
import CountryCityInputs from '../components/CountryCityInputs';
import WorkplacesField from '../components/WorkplacesField';
import RelocationPossibilityCheckbox from '../components/RelocationPossibilityCheckbox';
import ExperienceFromField from '../components/ExperienceFromField';
import ExperienceIsNotRequiredCheckbox from '../components/ExperienceIsNotRequiredCheckbox';
import EnglishLevelSelect from '../components/EnglishLevelSelect';
import MyTextarea from '../components/MyTextarea';
import PreviewButton from '../components/PreviewButton';
import { jobTextareas, savingMessage } from '../constants';
import styles from '../styles/pages/SaveJob.module.css';

const SaveJob = () => {
  const { companyid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const form = useRef();

  const handleSubmit = async e => {
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

    const settings = getRequestSettings(url, formData);

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
        <PositionInput initialPosition={state?.position} isRequired={true} />
        <SalaryInput initialSalary={state?.salary} />
        <CountryCityInputs initialCountry={state?.country} initialCity={state?.city} />
        <WorkplacesField initialWorkplaces={state?.workplaces} />
        <RelocationPossibilityCheckbox docType="job" initialState={state?.isRelocationPossible} />
        <ExperienceFromField
          initialExperience={state?.experienceFrom}
          initialUnit={state?.experienceUnit}
        />
        <ExperienceIsNotRequiredCheckbox initialState={state?.experienceIsNotRequired} />
        <EnglishLevelSelect initialLevel={state?.englishLevel} />
        {jobTextareas.map(area => (
          <div key={area.name}>
            <label htmlFor={area.name}>{area.label}</label>
            <MyTextarea id={area.name} name={area.name} initialValue={state && state[area.name]} />
          </div>
        ))}
        <div>
          <PreviewButton formElem={form.current} route="/job_preview" />
          <button type="submit">Save Job</button>
        </div>
      </form>
    </div>
  );
};

export default SaveJob;
