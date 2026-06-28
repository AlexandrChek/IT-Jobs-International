// Common things:
export const serverUrl = 'https://it-jobs-international-back.onrender.com';

export const savingMessage = 'Changes saved successfully';
export const serverErrorMessage = 'Sorry! Failed to get server response. Please try again later.';

export const footerMenuData = [
  { to: '/about_us', label: 'About us' },
  { to: '/contacts', label: 'Contacts' },
  { to: '/privacy', label: 'Privacy' },
];

export const contacts = {
  phones: '+38(066)1111111, +38(097)1111111',
  emails: [
    { label: 'Support service:', email: 'support@itjoint.com' },
    { label: 'Partnership:', email: 'partnership@itjoint.com' },
    { label: 'Reception:', email: 'reception@itjoint.com' },
    { label: 'Legal service:', email: 'legal@itjoint.com' },
  ],
};

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

export const experienceFromLabel = 'Work experience from:';
export const totalExperienceLabel = 'Total work experience:';
export const zeroTotalWorkExperience = { totalYears: 0 };
export const requiredExperienceProps = [
  { name: 'experienceFromYears', label: 'Years' },
  { name: 'experienceFromMonths', label: 'Months' },
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
  stillOngoingLabel: '...still working',
  organization: { label: 'Organization', name: 'organization' },
  direction: { label: 'Position', name: 'position' },
  functionsAndAchivements: {
    label: 'Functions & accomplishments',
    name: 'functions',
  },
};
export const educationProperties = {
  experienceType: 'education',
  stillOngoingLabel: '...still studying',
  organization: { label: 'Institution', name: 'institution' },
  direction: { label: 'Speciality', name: 'speciality' },
  functionsAndAchivements: {
    label: 'Achivements',
    name: 'achivements',
  },
};

export const englishLabel = 'English proficiency level';
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

export const uploadedFileRestrictions = [
  'File size should not exceed 200 KB. Acceptable file types: PDF, DOC, DOCX, RTF.',
  'File name should only use Latin alphabet, Arabic numbers (0-9) and symbols "-", "_".',
];

// Sign up & log in
export const userTypes = [
  { label: 'Company', value: 'company', signUpRoute: '/sign_up/company' },
  { label: 'Job seeker', value: 'seeker', signUpRoute: '/sign_up/job-seeker' },
];
export const logInErrorMessage = 'Sorry! There was an error logging into your account.';

// Search
export const searchTypes = [
  { label: 'Find Jobs', value: 'job' },
  { label: 'Find CVs', value: 'cv' },
];
