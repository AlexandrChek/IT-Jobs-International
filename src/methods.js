import { serverUrl } from './constants';

// Function to fetch data that is an argument to createAsyncThunk:
export const fetchData = async ({ url, options = null }) => {
  const fullUrl = serverUrl + url;
  const response = options ? await fetch(fullUrl, options) : await fetch(fullUrl);

  if (!response.ok) throw new Error('Failed to get server response');

  let data = null;
  const contentType = response.headers.get('content-type');

  if (contentType.includes('application/json')) {
    data = await response.json();
  } else if (contentType.includes('text/')) {
    data = await response.text();
  } else if (contentType.includes('image/') || contentType.includes('application/pdf')) {
    const blob = await response.blob();
    data = URL.createObjectURL(blob);
  }

  return data;
};

// Fn to get settings for POST-requests:
export const createPostReqSettings = (url, body) => {
  const settings = {
    url,
    options: {
      method: 'POST',
    },
  };

  if (body instanceof FormData) {
    settings.options.body = body;
  } else {
    settings.options.headers = { 'Content-Type': 'application/json' };
    settings.options.body = JSON.stringify(body);
  }

  return settings;
};

// Fn to create basic initial state object for asynchronous slices:
export const createBasicInitialState = key => {
  return {
    [key]: null,
    pending: false,
    error: null,
  };
};

// Fn to convert FormData to normal JS-object:
export const convertFormDataToObj = formData => {
  let obj = {};

  formData.forEach((value, key) => {
    if (formData.getAll(key).length > 1) {
      obj[key] = formData.getAll(key);
    } else {
      obj[key] = value;
    }
  });

  if (obj.workplaces && typeof obj.workplaces === 'string') {
    obj.workplaces = [obj.workplaces];
  }

  return obj;
};

// Fn to calculate age, taking date of birth in "YYYY-MM-DD" format:
export const calculateAge = standartDateOfBirth => {
  const birthDate = new Date(standartDateOfBirth);
  const ageInMilliseconds = Date.now() - birthDate.getTime();
  return Math.floor(ageInMilliseconds / 31536000000);
};

// Fn to normalize properties of work experience or education in object AFTER convertion
// (by convertFormDataToObj method) of CV FormData to object.
//It returns a CV object with work experience or education data as an array of objects.:
export const normalizeExperienceInPreviewData = (profilePreviewData, experienceType) => {
  const necessaryProperties = Object.fromEntries(
    Object.entries(profilePreviewData).filter(([key]) => key.startsWith(`${experienceType}_`)),
  );

  let necessaryKeys = Object.keys(necessaryProperties);
  let numberOfItems = necessaryKeys.filter(key => key.startsWith(`${experienceType}_from`)).length;
  let arrayOfObjects = [];

  for (let i = 0; i < numberOfItems; i++) {
    let itemObj = Object.fromEntries(
      Object.entries(necessaryProperties)
        .filter(([key]) => key.endsWith(`${i}`))
        .map(([key, value]) => {
          let cutKey = key.slice(experienceType.length + 1, key.length - 1 - String(i).length);
          return [cutKey, value];
        }),
    );

    arrayOfObjects.push(itemObj);
  }

  let normalizedPreviewData = { ...profilePreviewData };

  necessaryKeys.forEach(key => {
    delete normalizedPreviewData[key];
  });

  normalizedPreviewData[experienceType] = arrayOfObjects;

  return normalizedPreviewData;
};

// Fn to count total work experience in years and months:
export const countTotalExperience = experienceArr => {
  let totalYears = 0,
    totalMonths = 0;

  experienceArr.forEach(item => {
    const fromDate = new Date(item.from);
    const toDate = item.isStillOngoing ? new Date() : new Date(item.to);
    let years = toDate.getFullYear() - fromDate.getFullYear();
    let months = toDate.getMonth() - fromDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    totalYears += years;
    totalMonths += months;
  });

  if (totalMonths >= 12) {
    totalYears += Math.floor(totalMonths / 12);
    totalMonths = totalMonths % 12;
  }

  return { totalYears, totalMonths };
};

// Fn to get preview data (for new tab) from the localStorage, save it to the sessionStorage
// and remove it from the localStorage or just get it from the sessionStorage (after reload)
export const getPreviewData = () => {
  let previewData = JSON.parse(localStorage.getItem('previewData')) || null;

  if (previewData) {
    sessionStorage.setItem('previewData', JSON.stringify(previewData));
    localStorage.removeItem('previewData');
  }

  if (!previewData && sessionStorage.getItem('previewData')) {
    previewData = JSON.parse(sessionStorage.getItem('previewData'));
  }

  return previewData;
};
