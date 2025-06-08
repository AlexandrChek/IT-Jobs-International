import MyTextarea from './inputs/MyTextarea';

const SkillsTextarea = ({ initialValue = '' }) => {
  return (
    <label>
      Your skills
      <MyTextarea
        name="skills"
        initialValue={initialValue}
        placeholder={
          !initialValue ? 'Enter your skills separated by commas, for example: React, Vue,...' : ''
        }
      />
    </label>
  );
};

export default SkillsTextarea;
