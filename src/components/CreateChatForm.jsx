import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createChat } from '../features/async/chatSlice';
import { getRequestSettings } from '../methods';
import MyTextarea from './MyTextarea';
import UrlInput from './UrlInput';

const CreateChatForm = ({ seekerId, companyId, userType, jobId = '' }) => {
  const dispatch = useDispatch();
  const form = useRef();
  const isCompany = userType === 'Company';

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(form.current);
    formData.append('seekerId', seekerId);
    formData.append('companyId', companyId);
    if (jobId) {
      formData.append('jobId', jobId);
    }

    const settings = getRequestSettings('/api/createChat', formData);

    try {
      await dispatch(createChat(settings)).unwrap();
      alert('Message sent successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <h5>{isCompany ? 'Offer a job' : 'Apply for a job'}</h5>
      <form ref={form} onSubmit={handleSubmit}>
        <MyTextarea name="message" placeholder="Write a message" required />
        {isCompany ? (
          <UrlInput labelAndName={{ label: 'Job link:', name: 'jobLink' }} isRequired={true} />
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
