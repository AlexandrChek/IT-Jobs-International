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

    const formData = new FormData(form.current);
    const url = seekerid ? `/edit/seeker_reg_data/${seekerid}` : '/sign_up/seeker';

    saveRegData({ url, formData, userId: seekerid, userType: 'Job seeker' });
  };

  return (
    <div className="routesWrapper">
      <RegistrationTitle />
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      <form ref={form} onSubmit={handleSubmit}>
        <FullNameInputs initialFirstName={regData?.firstName} initialLastName={regData?.lastName} />
        <DateOfBirthInput initialValue={regData?.dateOfBirth} />
        <CountryCityInputs
          initialCountry={regData?.country}
          initialCity={regData?.city}
          areRequired={true}
        />
        <CommonFieldsInRegForms initialPhone={regData?.phone} initialEmail={regData?.email} />
        <SignUpButton userId={seekerid} />
      </form>
    </div>
  );
};

export default SignUpSeeker;
