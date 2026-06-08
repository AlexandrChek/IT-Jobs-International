import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { turnOnExperienceUpdate } from '../features/sync/totalExperienceSlice';
import InputBox from './InputBox';
import MyInput from './inputs/MyInput';
import MyCheckbox from './inputs/MyCheckbox';
import MyTextarea from './inputs/MyTextarea';
import styles from '../styles/components/ExperienceItem.module.css';

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
    <div className={`flexColumnBox ${styles.itemWrapper}`}>
      <div className={styles.fromTo}>
        <InputBox id="ei1" startLabel="From*">
          <MyInput
            id="ei1"
            type="month"
            name={`${properties.experienceType}_from_${index}`}
            initialValue={item.from}
            getTargetOnChange={updateFromTo}
            required
          />
        </InputBox>
        {!isStillOngoing && (
          <InputBox id="ei2" startLabel="To*">
            <MyInput
              id="ei2"
              type="month"
              name={`${properties.experienceType}_to_${index}`}
              initialValue={item.to}
              getTargetOnChange={updateFromTo}
              required
              disabled={isStillOngoing}
            />
          </InputBox>
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
      </div>
      <InputBox id="ei3" startLabel={`${properties.organization.label}*`}>
        <MyInput
          id="ei3"
          type="text"
          name={`${properties.experienceType}_${properties.organization.name}_${index}`}
          initialValue={item[properties.organization.name]}
          required
        />
      </InputBox>
      <InputBox id="ei4" startLabel={`${properties.direction.label}*`}>
        <MyInput
          id="ei4"
          type="text"
          name={`${properties.experienceType}_${properties.direction.name}_${index}`}
          initialValue={item[properties.direction.name]}
          required
        />
      </InputBox>
      <InputBox id="ei5" startLabel={properties.functionsAndAchivements.label}>
        <MyTextarea
          id="ei5"
          name={`${properties.experienceType}_${properties.functionsAndAchivements.name}_${index}`}
          initialValue={item[properties.functionsAndAchivements.name]}
        />
      </InputBox>
    </div>
  );
};

export default ExperienceItem;
