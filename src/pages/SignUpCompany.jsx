import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetchRegData from '../hooks/useFetchRegData';
import useSaveRegData from '../hooks/useSaveRegData';
import RegistrationTitle from '../components/RegistrationTitle';
import Loading from '../components/Loading';
import CompanyNameInput from '../components/CompanyNameInput';
import CountryCityInputs from '../components/CountryCityInputs';
import CommonFieldsInRegForms from '../components/CommonFieldsInRegForms';
import SignUpButton from '../components/buttons/SignUpButton';
import styles from '../styles/pages/SignUpCompany.module.css';

const SignUpCompany = () => {
  const { regData, pending, error } = useSelector(state => state.userRegData);
  const form = useRef();
  const { companyid } = useParams() || {};
  const saveRegData = useSaveRegData();

  useFetchRegData(companyid, 'Company');

  const handleSubmit = e => {
    e.preventDefault();

    let formData = new FormData(form.current);
    let url = '/api/';

    if (companyid) {
      url += 'editCompanyRegData';
      formData.append('id', companyid);
    } else {
      url += 'signUpCompany';
    }

    saveRegData({ savingUrl: url, formData, userId: companyid, userType: 'Company' });
  };

  return (
    <div className="routesWrapper">
      <RegistrationTitle />
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      <form ref={form} onSubmit={handleSubmit}>
        <CompanyNameInput initialValue={regData && regData.name} />
        <fieldset>
          <legend>Location of the main office</legend>
          <CountryCityInputs
            initialCountry={regData && regData.country}
            initialCity={regData && regData.city}
            areRequired={true}
          />
        </fieldset>
        <CommonFieldsInRegForms
          initialPhone={regData && regData.phone}
          initialEmail={regData && regData.email}
        />
        <SignUpButton userId={companyid} />
      </form>
    </div>
  );
};

export default SignUpCompany;
