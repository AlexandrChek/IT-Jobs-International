import MyTextarea from './MyTextarea';

const SkillsTextarea = ({ initialValue = '' }) => {
  return (
    <label>
      Your skills
      <MyTextarea
        initialValue={initialValue}
        placeholder={!initialValue ? 'Enter your skills separated by commas' : ''}
      />
    </label>
  );
};

export default SkillsTextarea;
