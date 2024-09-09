import MyInput from "./MyInput";

const CountryCityInputs = ({initialCountry = '', initialCity = '', areRequired = false}) => {
    return (
        <div>
          <label htmlFor="country">Country</label>
          <MyInput
            id="country"
            type="text"
            name="country"
            initialValue={initialCountry}
            required={areRequired}
          />
          <label htmlFor="city">City</label>
          <MyInput
            id="city"
            type="text"
            name="city"
            initialValue={initialCity}
            required={areRequired}
          />
        </div>
    );
};

export default CountryCityInputs;