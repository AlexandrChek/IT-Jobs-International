import MyCheckbox from "./MyCheckbox"
import { levels } from '../constants'

const LevelsField = ({initialLevels = []}) => {
    return (
        <fieldset>
          <legend>Level</legend>
          {levels.map(level => (
            <>
              <MyCheckbox
                key={level}
                name="levels"
                value={level}
                initialState={initialLevels.includes(level)}
              /> {level}
            </>
          ))}
        </fieldset>
    )
}

export default LevelsField