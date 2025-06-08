import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import SignUpSeeker from './pages/SignUpSeeker';
import SignUpCompany from './pages/SignUpCompany';
import SeekerProfile from './pages/SeekerProfile';
import PublicCv from './pages/PublicCv';
import CompanyProfile from './pages/CompanyProfile';
import SaveJob from './pages/SaveJob';
import JobPreview from './pages/JobPreview';
import Job from './pages/Job';
import CompanyProfilePublic from './pages/CompanyProfilePublic';
import ChatList from './pages/ChatList';
import Chat from './pages/Chat';
import SearchResults from './pages/SearchResults';
import AboutUs from './pages/AboutUs';
import Contacts from './pages/Contacts';
import Privacy from './pages/Privacy';
import ServerError from './pages/ServerError';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/sign_up/job-seeker" element={<SignUpSeeker />} />
      <Route path="/sign_up/company" element={<SignUpCompany />} />
      <Route path="/job_seeker_profile/:seekerid" element={<SeekerProfile />} />
      <Route path="/job_seeker_profile/:seekerid/chat_list" element={<ChatList />} />
      <Route path="/job_seeker_profile/:seekerid/edit_reg_data" element={<SignUpSeeker />} />
      <Route path="/cv/:seekerid/:viewType" element={<PublicCv />} />{' '}
      {/*viewTypes: 'public', 'preview'*/}
      <Route path="/company_profile/:companyid" element={<CompanyProfile />} />
      <Route path="/company_profile/:companyid/chat_list" element={<ChatList />} />
      <Route path="/company_profile/:companyid/edit_reg_data" element={<SignUpCompany />} />
      <Route path="/company_profile/:companyid/save_job" element={<SaveJob />} />
      <Route path="/company_profile/:companyid/:viewType" element={<CompanyProfilePublic />} />
      <Route path="/job_preview" element={<JobPreview />} />
      <Route path="/:companyid/job/:jobid" element={<Job />} />
      <Route path="/chat/:companyid/:seekerid/:jobid" element={<Chat />} />
      <Route path="/search_res/:searchtype" element={<SearchResults />} />
      <Route path="/about_us" element={<AboutUs />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/error" element={<ServerError />} />
    </Routes>
  );
};

export default AppRoutes;
