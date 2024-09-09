import { useState } from 'react'

const MyTextarea = ({initialValue, ...rest}) => {
    const [val, setVal] = useState(initialValue || '')

    return (
        <textarea
            {...rest}
            value={val}
            onChange={e => setVal(e.target.value)}
        />
    )
}

export default MyTextarea