import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { turnOnExperienceUpdate } from '../features/sync/totalExperienceSlice';
import MyInput from './inputs/MyInput';
import MyCheckbox from './inputs/MyCheckbox';
import MyTextarea from './inputs/MyTextarea';

const ExperienceItem = ({ item, index, properties }) => {
  const dispatch = useDispatch();
  const fromRef = useRef(item.from);
  const toRef = useRef(item.to || '');
  const [isStillOngoing, setIsStillOngoing] = useState(item.isStillOngoing || false);

  const updateTotalExperience = isStillOngoingArg => {
    if (fromRef.current && (toRef.current || isStillOngoingArg)) {
      dispatch(turnOnExperienceUpdate());
    }
  };

  const updateFromTo = target => {
    if (properties.experienceType === 'work') {
      if (target.name.startsWith('work_from')) {
        fromRef.current = target.value;
      } else {
        toRef.current = target.value;
      }
      updateTotalExperience(isStillOngoing);
    }
  };

  const updateIsStillOngoing = isChecked => {
    if (properties.experienceType === 'work') {
      setIsStillOngoing(isChecked);
      updateTotalExperience(isChecked);
    }
  };

  return (
    <div>
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
      {!isStillOngoing && (
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
      )}
      {!(properties.experienceType === 'work' && index) && (
        <label>
          <MyCheckbox
            name={`${properties.experienceType}_isStillOngoing_${index}`}
            initialState={item.isStillOngoing}
            getVal={updateIsStillOngoing}
          />
          {properties.stillOngoingLabel} {/* 'Still working' or 'Still studying' */}
        </label>
      )}
      <label>
        {properties.organization.label} {/* organization or institution */}
        <MyInput
          type="text"
          name={`${properties.experienceType}_${properties.organization.name}_${index}`}
          initialValue={item[properties.organization.name]}
          required
        />
      </label>
      <label>
        {properties.direction.label} {/* position or speciality */}
        <MyInput
          type="text"
          name={`${properties.experienceType}_${properties.direction.name}_${index}`}
          initialValue={item[properties.direction.name]}
          required
        />
      </label>
      <label>
        {properties.functionsAndAchivements.label}
        <MyTextarea
          name={`${properties.experienceType}_${properties.functionsAndAchivements.name}_${index}`}
          initialValue={item[properties.functionsAndAchivements.name]}
        />
      </label>
    </div>
  );
};

export default ExperienceItem;
