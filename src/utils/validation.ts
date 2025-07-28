import { PortfolioFormData, ValidationErrors } from '../types';

export const validatePortfolio = (data: PortfolioFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Personal Info validation
  const personalErrors: ValidationErrors = {};
  if (!data.personalInfo.name.trim()) {
    personalErrors.name = 'Name is required';
  }
  if (!data.personalInfo.title.trim()) {
    personalErrors.title = 'Title is required';
  }
  if (!data.personalInfo.email.trim()) {
    personalErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.personalInfo.email)) {
    personalErrors.email = 'Invalid email format';
  }

  if (Object.keys(personalErrors).length > 0) {
    errors.personalInfo = personalErrors;
  }

  // Bio validation
  if (!data.bio.trim()) {
    errors.bio = 'Bio is required';
  } else if (data.bio.length > 500) {
    errors.bio = 'Bio must be less than 500 characters';
  }

  return errors;
};