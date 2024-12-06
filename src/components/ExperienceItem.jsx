import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { countWorkExperience } from '../features/sync/cvFormSlice';
import MyInput from './inputs/MyInput';
import MyCheckbox from './inputs/MyCheckbox';
import MyTextarea from './inputs/MyTextarea';

const ExperienceItem = ({ item, index, properties }) => {
  const dispatch = useDispatch();
  const [from, setFrom] = useState(item.from);
  const [to, setTo] = useState(item.to || '');
  const [isStillOngoing, setIsStillOngoing] = useState(item.isStillOngoing || false);

  const updateTotalWorkExperience = (from, to, isStillOngoing) => {
    if (from && (to || isStillOngoing)) {
      dispatch(countWorkExperience());
    }
  };

  const updateFromTo = target => {
    if (properties.experienceType === 'work') {
      if (target.name.startsWith('work_from')) {
        setFrom(target.value);
        updateTotalWorkExperience(target.value, to, isStillOngoing);
      } else {
        setTo(target.value);
        updateTotalWorkExperience(from, target.value, isStillOngoing);
      }
    }
  };

  const updateIsStillOngoing = isChecked => {
    if (properties.experienceType === 'work') {
      setIsStillOngoing(isChecked);
      updateTotalWorkExperience(from, to, isChecked);
    }
  };

  return (
    <>
      <label>
        From
        <MyInput
          type="month"
          name={`${properties.experienceType}_from_${index}`}
          initialValue={item.from}
          getVal={updateFromTo}
          required
        />
      </label>
      <label>
        To
        <MyInput
          type="month"
          name={`${properties.experienceType}_to_${index}`}
          initialValue={item.to}
          getVal={updateFromTo}
          required
          disabled={isStillOngoing}
        />
      </label>
      {!index && (
        <label>
          <MyCheckbox
            name={`${properties.experienceType}_isStillOngoing`}
            initialState={item.isStillOngoing}
            getVal={updateIsStillOngoing}
          />
          {properties.stillOngoingLabel} {/* 'Still working' or 'Still studying' */}
        </label>
      )}
      <label>
        {properties.direction.label} {/* position or specialty */}
        <MyInput
          type="text"
          name={`${properties.experienceType}${properties.direction.name}_${index}`}
          initialValue={item[properties.direction.name]}
          required
        />
      </label>
      <label>
        {properties.organization.label} {/* organization or institution */}
        <MyInput
          type="text"
          name={`${properties.experienceType}${properties.organization.name}_${index}`}
          initialValue={item[properties.organization.name]}
          required
        />
      </label>
      <label>
        {properties.functionsAndAchivements.label}
        <MyTextarea
          name={`${properties.experienceType}${properties.functionsAndAchivements.name}_${index}`}
          initialValue={item[properties.functionsAndAchivements.name]}
        />
      </label>
    </>
  );
};

export default ExperienceItem;
