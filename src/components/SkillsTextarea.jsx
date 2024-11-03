import MyTextarea from './inputs/MyTextarea';

const SkillsTextarea = ({ initialValue = '' }) => {
  return (
    <label>
      Your skills
      <MyTextarea
        name="skills"
        initialValue={initialValue}
        placeholder={!initialValue ? 'Enter your skills separated by commas' : ''}
      />
    </label>
  );
};

export default SkillsTextarea;
