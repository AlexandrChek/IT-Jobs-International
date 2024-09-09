import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCompanyRegData, saveCompanyRegData } from '../features/async/companyRegDataSlice';
import { logIn } from '../features/async/authSlice';
import { getFetchingOptions } from '../methods';
import MyInput from '../components/MyInput';
import CountryCityInputs from '../components/CountryCityInputs';
import PhoneInput from '../components/PhoneInput';
import EmailInput from '../components/EmailInput';
import RegFormPassword from '../components/RegFormPassword';
import PrivacyAcceptanceCheckbox from '../components/PrivacyAcceptanceCheckbox';
import styles from '../styles/pages/SignUpCompany.module.css';

const SignUpCompany = () => {
  const dispatch = useDispatch();
  const { regData, pending, error } = useSelector(state => state.companyRegData);
  const userId = useSelector(state => state.auth.userId);
  const form = useRef();
  const { companyid } = useParams() || {};
  const isEditing = typeof(companyid) === 'string';
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const options = getFetchingOptions('fetchCompanyRegData', companyid);
      dispatch(fetchCompanyRegData(options));
    };
  }, [companyid, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData(form.current);
    if (isEditing) {
      formData.append('action', 'editCompanyRegData');
      formData.append('id', companyid);
    } else {
      formData.append('action', 'signUpCompany');
    };

    const savingOptions = {
      method: 'POST',
      body: formData
    };
    
    try {
      await dispatch(saveCompanyRegData(savingOptions)).unwrap();

      if (!isEditing) {
        const logInOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            action: 'logInCompany',
            email: formData.get('email'),
            password: formData.get('password')
          })
        };

        await dispatch(logIn(logInOptions)).unwrap();

        navigate(`/company_profile/${userId}`);

      } else {
        navigate(`/company_profile/${companyid}`);
      };
    } catch (error) {
      alert(error.message);
    };
  };

  return (
    <>
      <h2>Registration data</h2>
      <p>All fields are required</p>
      {pending && <h3>Loading...</h3>}
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
        <button type="submit">
          {isEditing ? 'Save' : 'Sign Up'}
        </button>
      </form>
    </>
  );
};

export default SignUpCompany;
