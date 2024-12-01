import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createChat } from '../features/async/chatSlice';
import { createPostReqSettings } from '../methods';
import MyTextarea from './inputs/MyTextarea';
import JobSelect from './JobSelect';

const CreateChatForm = ({ seekerId, companyId, userType, jobId = '', position = '' }) => {
  const dispatch = useDispatch();
  const form = useRef();
  const isCompany = userType === 'Company';
  let realJobId = jobId;

  const getJobId = id => (realJobId = id);

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(form.current);
    formData.append('seekerId', seekerId);
    formData.append('companyId', companyId);
    formData.append('userType', userType);
    formData.append('jobRoute', `/${companyId}/job/${realJobId}`);
    if (position) {
      formData.append('position', position);
    }
    formData.append('date', new Date().toLocaleString());

    const settings = createPostReqSettings('/create_chat', formData);

    try {
      await dispatch(createChat(settings)).unwrap();
      alert('Message sent successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h4>{isCompany ? 'Offer a job' : 'Apply for a job'}</h4>
      <form ref={form} onSubmit={handleSubmit}>
        <MyTextarea name="message" placeholder="Write a message" required />
        {isCompany ? (
          <JobSelect companyId={companyId} getJobId={getJobId} />
        ) : (
          <label>
            Upload your CV file
            <input type="file" name="cvFile" />
          </label>
        )}
        <button type="submit">{isCompany ? 'Send the message' : 'Apply'}</button>
      </form>
    </>
  );
};

export default CreateChatForm;
