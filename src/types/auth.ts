export interface AuthUser {
  id: string;
  email: string;
  name: string;
  type: 'job_seeker' | 'job_creator';
  avatar?: string;
  provider: 'email' | 'google' | 'github' | 'linkedin';
  createdAt: Date;
  lastLogin: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'job_seeker' | 'job_creator';
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}