export interface User {
  id: string;
  email: string;
  name: string;
  type: 'job_seeker' | 'job_creator';
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  achievements: string[];
  template: string;
  atsScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  portfolio?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  salary?: string;
  postedDate: Date;
  deadline?: Date;
  isActive: boolean;
}

export interface ATSResult {
  score: number;
  recommendations: Recommendation[];
  keywordMatch: number;
  formatScore: number;
  sectionScore: number;
}

export interface Recommendation {
  type: 'critical' | 'warning' | 'suggestion';
  title: string;
  description: string;
  action: string;
}