import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCompanyRegData, saveCompanyRegData } from '../features/async/companyRegDataSlice';
import { logIn } from '../features/async/authSlice';
import { getFetchingSettings, getSendingSettings } from '../methods';
import Loading from '../components/Loading';
import MyInput from '../components/MyInput';
import CountryCityInputs from '../components/CountryCityInputs';
import PhoneInput from '../components/PhoneInput';
import EmailInput from '../components/EmailInput';
import RegFormPassword from '../components/RegFormPassword';
import PrivacyAcceptanceCheckbox from '../components/PrivacyAcceptanceCheckbox';
import styles from '../styles/pages/SignUpCompany.module.css';

const SignUpCompany = () => {
  const dispatch = useDispatch();
  const { regData, pending, error } = useSelector((state) => state.companyRegData);
  const userId = useSelector((state) => state.auth.userId);
  const form = useRef();
  const { companyid } = useParams() || {};
  const isEditing = typeof companyid === 'string';
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const settings = getFetchingSettings('/api/companyRegData', companyid);
      dispatch(fetchCompanyRegData(settings));
    }
  }, [companyid, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData(form.current);
    let url = '/api/';

    if (isEditing) {
      url += 'editCompanyRegData';
      formData.append('id', companyid);
    } else {
      url += 'signUpCompany';
    }

    const savingSettings = getSendingSettings(url, formData);

    try {
      await dispatch(saveCompanyRegData(savingSettings)).unwrap();

      if (!isEditing) {
        const logInOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password'),
          }),
        };

        const logInSettings = { url: '/api/logInCompany', logInOptions };

        await dispatch(logIn(logInSettings)).unwrap();

        navigate(`/company_profile/${userId}`);
      } else {
        navigate(`/company_profile/${companyid}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="routesWrapper">
      <h2>Registration data</h2>
      <p>All fields are required</p>
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      <form ref={form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Company name</label>
          <MyInput
            type="text"
            id="name"
            name="name"
            required
            initialValue={regData && regData.name}
          />
        </div>
        <fieldset>
          <legend>Location of the main office</legend>
          <CountryCityInputs
            initialCountry={regData && regData.country}
            initialCity={regData && regData.city}
            areRequired={true}
          />
        </fieldset>
        <PhoneInput initialPhone={regData && regData.phone} isRequired={true} />
        <EmailInput initialEmail={regData && regData.email} />
        <RegFormPassword />
        <PrivacyAcceptanceCheckbox />
        <button type="submit">{isEditing ? 'Save' : 'Sign Up'}</button>
      </form>
    </div>
  );
};

export default SignUpCompany;
