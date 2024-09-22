import { useEffect } from 'react';
import { serverUrl } from './constants';

// Determine the height of a window and save it as a variable in the <html>-element's style object:
export const saveWindowHeight = () => {
  useEffect(() => {
    const saveHeight = () => {
      const vh = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      window.addEventListener('load', saveHeight);
      window.addEventListener('resize', saveHeight);
    }

    return () => {
      window.removeEventListener('load', saveHeight);
      window.removeEventListener('resize', saveHeight);
    };
  }, []);
};

// Function to fetch data that is an argument to createAsyncThunk:
export const fetchData = async ({ url, options }) => {
  const fullUrl = serverUrl + url;
  const response = await fetch(fullUrl, options);

  if (!response.ok) throw new Error('Failed to get server response');

  let data = null;
  const contentType = response.headers.get('content-type');

  if (contentType.includes('application/json')) {
    data = await response.json();
  } else if (contentType.includes('text/')) {
    data = await response.text();
  } else if (contentType.includes('image/' || 'application/pdf')) {
    const blob = await response.blob();
    data = URL.createObjectURL(blob);
  }

  return data;
};

// Fn to get settings for common fetching data from server:
export const getFetchingSettings = (url, userId, jobId = null) => {
  const settings = {
    url,
    options: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, jobId }),
    },
  };

  return settings;
};

// Fn to get settings for sending FormData to server:
export const getSendingSettings = (url, body) => {
  const settings = {
    url,
    options: {
      method: 'POST',
      body,
    },
  };

  return settings;
};

// Fn to convert FormData to normal JS-object:
export const convertFormDataToObj = (formData) => {
  let obj = {};

  formData.forEach((value, key) => {
    if (formData.getAll(key).length > 1) {
      obj[key] = formData.getAll(key);
    } else {
      obj[key] = value;
    }
  });

  return obj;
};
