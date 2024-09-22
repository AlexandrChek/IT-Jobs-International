import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import SignUpSeeker from './pages/SignUpSeeker';
import SignUpCompany from './pages/SignUpCompany';
import SeekerProfile from './pages/SeekerProfile';
import SeekerChatList from './pages/SeekerChatList';
import SeekerChat from './pages/SeekerChat';
import PublicCv from './pages/PublicCv';
import FullCv from './pages/FullCv';
import CompanyProfile from './pages/CompanyProfile';
import CompanyChatList from './pages/CompanyChatList';
import CompanyChat from './pages/CompanyChat';
import SaveJob from './pages/SaveJob';
import JobPreview from './pages/JobPreview';
import Job from './pages/Job';
import CompanyProfilePublic from './pages/CompanyProfilePublic';
import SearchResults from './pages/SearchResults';
import AboutUs from './pages/AboutUs';
import Contacts from './pages/Contacts';
import Privacy from './pages/Privacy';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/sign_up/job-seeker" element={<SignUpSeeker />} />
      <Route path="/sign_up/company" element={<SignUpCompany />} />
      <Route path="/job_seeker_profile/:seekerid" element={<SeekerProfile />} />
      <Route path="/job_seeker_profile/:seekerid/chat_list" element={<SeekerChatList />} />
      <Route path="/job_seeker_profile/:seekerid/chat/:chatid" element={<SeekerChat />} />
      <Route path="/job_seeker_profile/:seekerid/edit_reg_data" element={<SignUpSeeker />} />
      <Route path="/public_cv/:seekerid" element={<PublicCv />} />
      <Route path="/full_cv/:seekerid" element={<FullCv />} />
      <Route path="/company_profile/:companyid" element={<CompanyProfile />} />
      <Route path="/company_profile/:companyid/chat_list" element={<CompanyChatList />} />
      <Route path="/company_profile/:companyid/chat/:chatid" element={<CompanyChat />} />
      <Route path="/company_profile/:companyid/edit_reg_data" element={<SignUpCompany />} />
      <Route path="/company_profile/:companyid/save_job" element={<SaveJob />} />
      <Route path="/company_profile/:companyid/public" element={<CompanyProfilePublic />} />
      <Route path="/job_preview" element={<JobPreview />} />
      <Route path="/:companyid/job/:jobid" element={<Job />} />
      <Route path="/search_res" element={<SearchResults />} />
      <Route path="/about_us" element={<AboutUs />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  );
};

export default AppRoutes;
