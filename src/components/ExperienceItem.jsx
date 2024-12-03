import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { countWorkExperience } from '../features/sync/cvFormSlice';
import MyInput from './inputs/MyInput';
import MyCheckbox from './inputs/MyCheckbox';
import MyTextarea from './inputs/MyTextarea';

const ExperienceItem = ({ item, index, properties }) => {
  const dispatch = useDispatch();
  const [isStillOngoing, setIsStillOngoing] = useState(false);
  let from = item.from,
    to = item.to;

  useEffect(() => {
    if (properties.experienceType === 'work' && from && (to || isStillOngoing)) {
      dispatch(countWorkExperience());
    }
  }, [properties.experienceType, from, to, isStillOngoing]);

  return (
    <>
      <label>
        From
        <MyInput
          type="month"
          name={`${properties.experienceType}_from_${index}`}
          initialValue={item.from}
          getVal={target => (from = target.value)}
          required
        />
      </label>
      <label>
        To
        <MyInput
          type="month"
          name={`${properties.experienceType}_to_${index}`}
          initialValue={item.to}
          getVal={target => (to = target.value)}
          required
          disabled={isStillOngoing}
        />
      </label>
      {!index && (
        <label>
          <MyCheckbox
            name={`${properties.experienceType}_${properties.stillOngoing.name}`}
            initialState={item[properties.stillOngoing.name]}
            getVal={isChecked => setIsStillOngoing(isChecked)}
          />
          {properties.stillOngoing.label} {/* 'Still working' or 'Still studying' */}
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
