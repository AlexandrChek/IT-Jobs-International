import { serverUrl } from './constants'

//An asynchronous function to fetch data that is an argument to createAsyncThunk:
export const fetchData = async (options) => {
    const response = await fetch(serverUrl, options)

    if (!response.ok) throw new Error(
        'Failed to get server response'
    )
    
    let data = null
    const contentType = response.headers.get('content-type')

    if (contentType.includes('application/json')) {
        data = await response.json()
    } else if (contentType.includes('text/')) {
        data = await response.text()
    } else if (contentType.includes('image/' || 'application/pdf')) {
        const blob = await response.blob()
        data = URL.createObjectURL(blob)
    }
    
    return data
}

//Fn to get options for common fetching data from server:
export const getFetchingOptions = (action, userId, jobId = null) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          action: action,
          userId: userId,
          jobId: jobId
        })
    }

    return options
}

//Fn to convert FormData to normal JS-object:
export const convertFormDataToObj = (formData) => {
    let obj = {}

    formData.forEach((value, key) => {
        if (formData.getAll(key).length > 1) {
            obj[key] = formData.getAll(key)
        } else {
            obj[key] = value
        }
    })

    return obj
}