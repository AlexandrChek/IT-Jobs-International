const CvFileInput = () => {
  return (
    <fieldset>
      <legend>Upload your CV file</legend>
      <input type="file" name="cvFile" />
      <p>File size should not exceed 200 KB. Acceptable file types: PDF, DOC, DOCX, RTF.</p>
    </fieldset>
  );
};

export default CvFileInput;
