import { useState, useEffect } from 'react';
import MyInput from './inputs/MyInput';

const CountryCityInputs = ({ initialCountry = '', initialCity = '', areRequired = false }) => {
  const [country, setCountry] = useState(initialCountry || '');

  useEffect(() => setCountry(initialCountry || ''), [initialCountry]);

  return (
    <div>
      <label htmlFor="country">Country</label>
      <MyInput
        id="country"
        type="text"
        name="country"
        initialValue={initialCountry}
        required={areRequired}
        getVal={target => setCountry(target.value)}
      />
      <label htmlFor="city">City</label>
      <MyInput
        id="city"
        type="text"
        name="city"
        initialValue={initialCity}
        required={areRequired}
        disabled={!country}
      />
    </div>
  );
};

export default CountryCityInputs;
