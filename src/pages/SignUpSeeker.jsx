import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetchRegData from '../hooks/useFetchRegData';
import useSaveRegData from '../hooks/useSaveRegData';
import RegistrationTitle from '../components/RegistrationTitle';
import Loading from '../components/Loading';
import FullNameInputs from '../components/FullNameInputs';
import DateOfBirthInput from '../components/DateOfBirthInput';
import CountryCityInputs from '../components/CountryCityInputs';
import CommonFieldsInRegForms from '../components/CommonFieldsInRegForms';
import SignUpButton from '../components/buttons/SignUpButton';

const SignUpSeeker = () => {
  const { regData, pending, error } = useSelector(state => state.userRegData);
  const form = useRef();
  const { seekerid } = useParams() || {};
  const saveRegData = useSaveRegData();

  useFetchRegData(seekerid, 'Job seeker');

  const handleSubmit = e => {
    e.preventDefault();

    let formData = new FormData(form.current);
    let url = '/api/';

    if (seekerid) {
      url += 'editSeekerRegData';
      formData.append('id', seekerid);
    } else {
      url += 'signUpSeeker';
    }

    saveRegData({ savingUrl: url, formData, userId: seekerid, userType: 'Job seeker' });
  };

  return (
    <div className="routesWrapper">
      <RegistrationTitle />
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      <form ref={form} onSubmit={handleSubmit}>
        <FullNameInputs
          initialFirstName={regData && regData.firstName}
          initialLastName={regData && regData.lastName}
        />
        <DateOfBirthInput initialValue={regData && regData.dateOfBirth} />
        <CountryCityInputs
          initialCountry={regData && regData.country}
          initialCity={regData && regData.city}
          areRequired={true}
        />
        <CommonFieldsInRegForms
          initialPhone={regData && regData.phone}
          initialEmail={regData && regData.email}
        />
        <SignUpButton userId={seekerid} />
      </form>
    </div>
  );
};

export default SignUpSeeker;
