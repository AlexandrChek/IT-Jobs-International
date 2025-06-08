const SignUpButton = ({ userId }) => {
  return <button type="submit">{userId ? 'Save' : 'Sign Up'}</button>;
};

export default SignUpButton;
