// Common things:
export const serverUrl = 'url';

export const baseUrl = '/IT-Jobs-International/';

export const savingMessage = 'Changes saved successfully';

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
export const experienceUnits = ['years', 'months'];

export const relocationFrom = 'Relocation from another country is possible';
export const relocationTo = 'Consider relocation to another country';

export const experienceFromLabel = 'Work experience: from';
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
  stillOngoing: { label: 'Still working', name: 'isStillOngoing' },
  direction: { label: 'Position', name: 'position' },
  organization: { label: 'Organization', name: 'organization' },
  functionsAndAchivements: {
    label: 'Functions and accomplishments',
    name: 'functions',
  },
};
export const educationProperties = {
  experienceType: 'education',
  stillOngoing: { label: 'Still studying', name: 'isStillOngoing' },
  direction: { label: 'Specialty', name: 'specialty' },
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
export const shortPassWarning = 'The password must be at least three characters long.';
export const passwordsDontMatchWarning = 'Passwords in both fields must match.';
export const userTypes = [
  { label: 'Company', value: 'company' },
  { label: 'Job seeker', value: 'seeker' },
];

// Search
export const searchTypes = [
  { label: 'Find Jobs', type: 'job' },
  { label: 'Find CVs', type: 'cv' },
];
