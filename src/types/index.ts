export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  text: string;
  rating: number;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface Portfolio {
  id: string;
  personalInfo: PersonalInfo;
  bio: string;
  projects: Project[];
  skills: Skills;
  testimonials: Testimonial[];
  socialLinks: SocialLinks;
  template: 'modern' | 'creative';
  createdAt: Date;
  updatedAt: Date;
}

export interface PortfolioFormData {
  personalInfo: PersonalInfo;
  bio: string;
  projects: Project[];
  skills: Skills;
  testimonials: Testimonial[];
  socialLinks: SocialLinks;
  template: 'modern' | 'creative';
}

export interface ValidationErrors {
  [key: string]: string | ValidationErrors;
}