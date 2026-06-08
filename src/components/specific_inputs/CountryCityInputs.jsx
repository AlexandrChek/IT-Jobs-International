import { useState, useEffect } from 'react';
import { getAsterisk } from '../../methods';
import MyInput from '../inputs/MyInput';
import InputBox from '../InputBox';
import styles from '../../styles/components/specific_inputs/CountryCityInputs.module.css';

const CountryCityInputs = ({ initialCountry = '', initialCity = '', areRequired = false }) => {
  const [country, setCountry] = useState(initialCountry || '');
  const asterisk = getAsterisk(areRequired);

  useEffect(() => setCountry(initialCountry || ''), [initialCountry]);

  return (
    <div className={styles.countryCityBox}>
      <InputBox id="country" startLabel={`Country${asterisk}`}>
        <MyInput
          type="text"
          id="country"
          name="country"
          initialValue={initialCountry}
          required={areRequired}
          getTargetOnChange={target => setCountry(target.value)}
        />
      </InputBox>
      <InputBox id="city" startLabel={`City${asterisk}`}>
        <MyInput
          type="text"
          id="city"
          name="city"
          initialValue={initialCity}
          required={areRequired}
          disabled={country.length < 3}
        />
      </InputBox>
    </div>
  );
};

export default CountryCityInputs;
