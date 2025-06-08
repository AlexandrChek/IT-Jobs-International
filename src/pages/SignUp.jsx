import { Link } from 'react-router-dom';
import styles from '../styles/pages/SignUp.module.css';

const SignUp = () => {
  const logInLink = <Link to="/login">log in</Link>;

  return (
    <div className="routesWrapper">
      <h2>Sign Up</h2>
      <div className={styles.options}>
        <Link to="/sign_up/job-seeker" className={styles.signupButton}>
          Job Seeker
        </Link>
        <Link to="/sign_up/company" className={styles.signupButton}>
          Company
        </Link>
      </div>
      <p>If you already have an account, please {logInLink}.</p>
    </div>
  );
};

export default SignUp;
