
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { saveJobData } from '../features/async/jobSlice';
import { saveFormData } from '../features/sync/formDataSlice';
import { convertFormDataToObj } from '../methods';
import PositionInput from '../components/PositionInput';
import LevelsField from '../components/LevelsField';
import SalaryInput from '../components/SalaryInput';
import CountryCityInputs from '../components/CountryCityInputs';
import WorkplacesField from '../components/WorkplacesField';
import ExperienceFromField from '../components/ExperienceFromField';
import EnglishLevelSelect from '../components/EnglishLevelSelect';
import MyCheckbox from '../components/MyCheckbox';
import MyTextarea from '../components/MyTextarea';
import { relocationFrom, experienceIsNotRequired, jobTextareas, savingMessage } from '../constants';
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
    let action = 'createJob';

    if (state) {
      action = 'editJob';
      formData.append('id', state.id);
    } else {
      action = 'createJob';
    };

    formData.append('action', action);
    formData.append('companyId', companyid);
    formData.append('status', 'active');

    const options = {
      method: 'POST',
      body: formData
    };

    try {
      await dispatch(saveJobData(options)).unwrap();
      alert(savingMessage);
      navigate(`/company_profile/${companyid}`);
    } catch (error) {
      alert(error.message);
    };

  };

  return (
    <div className={styles.saveJob}>
      <h3>Job Properties</h3>

      <form ref={form} onSubmit={handleSubmit}>
        <PositionInput initialPosition={state && state.position} isRequired={true} />
        <LevelsField initialLevels={state && state.levels} />
        <SalaryInput initialSalary={state && state.salary} />
        <CountryCityInputs
          initialCountry={state && state.country}
          initialCity={state && state.city}
        />
        <WorkplacesField initialWorkplaces={state && state.workplaces} />
        <MyCheckbox
          name="isRelocationPossible"
          initialState={state && state.isRelocationPossible}
        /> {relocationFrom}
        <ExperienceFromField
          initialExperience={state && state.experienceFrom}
          initialUnit={state && state.experienceUnit}
        />
        <MyCheckbox
          name="isExperienceRequired"
          initialState={state && state.isExperienceRequired}
        /> {experienceIsNotRequired}
        <EnglishLevelSelect initialLevel={state && state.englishLevel} />
        {jobTextareas.map(area => (
          <div key={area.name}>
            <label htmlFor={area.name}>{area.label}</label>
            <MyTextarea
              id={area.name}
              name={area.name}
              initialValue={state && state[area.name]}
            />
          </div>
        ))}
        <div>
          <button type="button" onClick={showPreview}>Preview</button>
          <button type="submit">Save Job</button>
        </div>
      </form>
    </div>
  );
};

export default SaveJob;
