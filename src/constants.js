// Common things:
export const serverUrl = 'https://it-jobs-international-back.glitch.me';

export const baseUrl = '/IT-Jobs-International/';

export const savingMessage = 'Changes saved successfully';
export const serverErrorMessage = 'Sorry! Failed to get server response. Please try again later.';
export const logInErrorMessage = 'There was an error logging into your account.';

// Company profile:
export const employeesNumbers = [
  '<10',
  '>=10',
  '>=50',
  '>=100',
  '>=200',
  '>=300',
  '>=400',
  '>=500',
  '>=600',
  '>=700',
  '>=800',
  '>=900',
  '>=1000',
];

// Job/CV options:
export const workplaces = ['office', 'remote', 'mixed'];

export const relocationFrom = 'Relocation from another country is possible';
export const relocationTo = 'Consider relocation to another country';

export const experienceFromLabel = 'Work experience: from';
export const totalExperienceLabel = 'Total work experience:';
export const zeroTotalWorkExperience = { totalYears: 0 };
export const requiredExperienceProps = [
  { name: 'experienceFromYears', label: 'years' },
  { name: 'experienceFromMonths', label: 'months' },
];
export const experienceIsNotRequired = 'Work experience is not a mandatory requirement';

export const emptyWorkItem = {
  from: '',
  to: '',
  isStillOngoing: false,
  position: '',
  organization: '',
  functions: '',
};
export const emptyEducationItem = {
  from: '',
  to: '',
  isStillOngoing: false,
  specialty: '',
  institution: '',
  achivements: '',
};

export const workProperties = {
  experienceType: 'work',
  stillOngoingLabel: '...Still working',
  direction: { label: 'Position', name: 'position' },
  organization: { label: 'Organization', name: 'organization' },
  functionsAndAchivements: {
    label: 'Functions and accomplishments',
    name: 'functions',
  },
};
export const educationProperties = {
  experienceType: 'education',
  stillOngoingLabel: '...Still studying',
  direction: { label: 'Speciality', name: 'speciality' },
  organization: { label: 'Institution', name: 'institution' },
  functionsAndAchivements: {
    label: 'Achivements',
    name: 'achivements',
  },
};

export const englishLabel = 'English proficiency level:';
export const englishLevels = [
  'Elementary',
  'Pre-Intermediate',
  'Intermediate',
  'Upper-Intermediate',
  'Advanced',
  'Proficiency',
];

export const jobTextareas = [
  {
    name: 'description',
    label: 'Job description:',
  },
  {
    name: 'requirements',
    label: 'Requirements:',
  },
  {
    name: 'offers',
    label: 'Our offers:',
  },
  {
    name: 'additionalInfo',
    label: 'Additional information:',
  },
];

// Sign up
export const userTypes = [
  { label: 'Company', value: 'company' },
  { label: 'Job seeker', value: 'seeker' },
];

// Search
export const searchTypes = [
  { label: 'Find Jobs', type: 'job' },
  { label: 'Find CVs', type: 'cv' },
];
