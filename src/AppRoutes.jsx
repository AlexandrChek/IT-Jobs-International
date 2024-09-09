import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react'
import Home from './pages/Home';
const LogIn = lazy(() => import('./pages/LogIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SignUpSeeker = lazy(() => import('./pages/SignUpSeeker'));
const SignUpCompany = lazy(() => import('./pages/SignUpCompany'));
const SeekerProfile = lazy(() => import('./pages/SeekerProfile'));
const SeekerChatList = lazy(() => import('./pages/SeekerChatList'));
const SeekerChat = lazy(() => import('./pages/SeekerChat'));
const PublicCv = lazy(() => import('./pages/PublicCv'));
const FullCv = lazy(() => import('./pages/FullCv'));
const CompanyProfile = lazy(() => import('./pages/CompanyProfile'));
const CompanyChatList = lazy(() => import('./pages/CompanyChatList'));
const CompanyChat = lazy(() => import('./pages/CompanyChat'));
const SaveJob = lazy(() => import('./pages/SaveJob'));
const JobPreview = lazy(() => import('./pages/JobPreview'));
const Job = lazy(() => import('./pages/Job'));
const CompanyProfilePublic = lazy(() => import('./pages/CompanyProfilePublic'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Privacy = lazy(() => import('./pages/Privacy'));

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