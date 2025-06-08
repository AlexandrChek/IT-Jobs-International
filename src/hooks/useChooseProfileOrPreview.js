import { useMemo } from 'react';
import { getPreviewData } from '../methods';

const useChooseProfileOrPreview = (isPreview, profile, profileType) => {
  const getProfileWithActiveJobs = profileData => {
    const activeJobs = profileData.jobs?.filter(job => !job.isDisabled) || [];
    return { ...profileData, jobs: activeJobs };
  };

  const currentProfileData = useMemo(() => {
    const isCompanyData = profileType === 'company';

    if (isPreview) {
      const previewData = getPreviewData();
      return isCompanyData ? getProfileWithActiveJobs(previewData) : previewData;
    } else if (profile) {
      return isCompanyData ? getProfileWithActiveJobs(profile) : profile;
    } else return null;
  }, [isPreview, profileType, profile?.userName]);

  return currentProfileData;
};

export default useChooseProfileOrPreview;
