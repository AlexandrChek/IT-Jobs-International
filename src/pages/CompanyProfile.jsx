import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyProfile, saveCompanyProfile } from '../features/async/companyProfileSlice';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import MySelect from '../components/MySelect';
import MyInput from '../components/MyInput';
import MyTextarea from '../components/MyTextarea';
import LinksList from '../components/LinksList';
import { getFetchingSettings, getSendingSettings } from '../methods';
import { companyPublicFields, employeesNumbers, savingMessage } from '../constants';
import styles from '../styles/pages/CompanyProfile.module.css';

const CompanyProfile = () => {
  const { companyid } = useParams();
  const dispatch = useDispatch();
  const { profile, pending, error } = useSelector((state) => state.companyProfile);
  const { employeesNumberLabel, websiteLabel, descriptionLabel } = companyPublicFields;
  const form = useRef();

  useEffect(() => {
    const settings = getFetchingSettings('/api/companyProfile', companyid);
    dispatch(fetchCompanyProfile(settings));
  }, [dispatch, companyid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData(form.current);
    formData.append('id', companyid);
    const savingSettings = getSendingSettings('/api/saveCompanyPublicInfo', formData);

    try {
      await dispatch(saveCompanyProfile(savingSettings)).unwrap();

      alert(savingMessage);
    } catch (error) {
      alert(error.message);
    }
  };

  const showProfilePreview = () => {
    window.open(`/company_profile/${companyid}/public`, '_blank');
  };

  return (
    <div className="routesWrapper">
      <Link to="/" className={styles.button}>
        Find CVs
      </Link>
      <Link to={`/company_profile/${companyid}/chat_list`} className={styles.button}>
        Correspondence
      </Link>
      <Link to={`/company_profile/${companyid}/edit_reg_data`} className={styles.button}>
        Edit registration data
      </Link>
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      <form ref={form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="employeesNumber">{employeesNumberLabel}</label>
          <MySelect
            id="employeesNumber"
            name="employeesNumber"
            options={employeesNumbers}
            initialValue={profile && profile.employeesNumber}
          />
        </div>
        <div>
          <label htmlFor="website">{websiteLabel}</label>
          <MyInput
            type="url"
            id="website"
            name="website"
            initialValue={profile && profile.website}
          />
        </div>
        <div>
          <label htmlFor="description">{descriptionLabel}</label>
          <MyTextarea
            id="description"
            name="description"
            initialValue={profile && profile.description}
          />
        </div>
        <button type="submit">Save</button>
      </form>
      {profile.jobs && <LinksList cvsOrJobs={profile.jobs} type="job" />}
      <Link to={`/company_profile/${companyid}/save_job`} className={styles.button}>
        Add job
      </Link>
      <button onClick={showProfilePreview}>Profile preview</button>
    </div>
  );
};

export default CompanyProfile;
