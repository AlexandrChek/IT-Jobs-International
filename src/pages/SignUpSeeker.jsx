import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSeekerProfile, updateSeekerProfile } from '../features/async/seekerProfileSlice';
import styles from '../styles/pages/SignUpSeeker.module.css';

const SignUpSeeker = () => {
  const { seekerid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const seekerProfile = useSelector((state) => state.seekerProfile.profile);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    city: '',
    skills: '',
  });

  useEffect(() => {
    if (!seekerProfile) {
      dispatch(fetchSeekerProfile(seekerid));
    } else {
      setFormData({
        firstName: seekerProfile.firstName,
        lastName: seekerProfile.lastName,
        email: seekerProfile.email,
        country: seekerProfile.country,
        city: seekerProfile.city,
        skills: seekerProfile.skills.join(', '),
      });
    }
  }, [dispatch, seekerProfile, seekerid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      ...formData,
      skills: formData.skills.split(',').map((skill) => skill.trim()),
    };
    const response = await dispatch(updateSeekerProfile({ seekerid, updatedProfile }));
    if (response.meta.requestStatus === 'fulfilled') {
      navigate(`/job_seeker_profile/${seekerid}`);
    }
  };

  return (
    <div className="routesWrapper">
      <h2>Edit Registration Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
          required
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default SignUpSeeker;
