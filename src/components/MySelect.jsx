import { useState } from 'react'

const MySelect = ({options, initialValue, ...rest}) => {
    const [selected, setSelected] = useState(initialValue || '')

    return (
        <select value={selected} {...rest} onChange={e => setSelected(e.target.value)}>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default MySelect