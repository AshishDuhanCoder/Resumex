import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthUser, AuthState, LoginCredentials, SignupCredentials } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  loginWithProvider: (provider: 'google' | 'github' | 'linkedin') => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: AuthUser }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return { 
        ...state, 
        isLoading: false, 
        isAuthenticated: true, 
        user: action.payload, 
        error: null 
      };
    case 'AUTH_ERROR':
      return { 
        ...state, 
        isLoading: false, 
        isAuthenticated: false, 
        user: null, 
        error: action.payload 
      };
    case 'AUTH_LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null, 
        error: null 
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Mock user database
const mockUsers: AuthUser[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    type: 'job_seeker',
    provider: 'email',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date()
  },
  {
    id: '2',
    email: 'jane@company.com',
    name: 'Jane Smith',
    type: 'job_creator',
    provider: 'email',
    createdAt: new Date('2024-01-02'),
    lastLogin: new Date()
  },
  {
    id: '3',
    email: 'demo@rezume.com',
    name: 'Demo User',
    type: 'job_seeker',
    provider: 'email',
    createdAt: new Date('2024-01-03'),
    lastLogin: new Date()
  }
];

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('rezume_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('rezume_user');
      }
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in mock database
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('User not found. Please check your email or sign up.');
      }
      
      // In a real app, you'd verify the password here
      if (credentials.password.length < 6) {
        throw new Error('Invalid password. Password must be at least 6 characters.');
      }
      
      // Update last login
      const updatedUser = { ...user, lastLogin: new Date() };
      
      // Store in localStorage
      localStorage.setItem('rezume_user', JSON.stringify(updatedUser));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: updatedUser });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: (error as Error).message });
      throw error;
    }
  };

  const signup = async (credentials: SignupCredentials): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === credentials.email);
      if (existingUser) {
        throw new Error('User already exists with this email. Please login instead.');
      }
      
      // Create new user
      const newUser: AuthUser = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.name,
        type: credentials.userType,
        provider: 'email',
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      // Add to mock database
      mockUsers.push(newUser);
      
      // Store in localStorage
      localStorage.setItem('rezume_user', JSON.stringify(newUser));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: newUser });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: (error as Error).message });
      throw error;
    }
  };

  const loginWithProvider = async (provider: 'google' | 'github' | 'linkedin'): Promise<void> => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // Simulate OAuth flow delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock user for social login
      const socialUser: AuthUser = {
        id: Date.now().toString(),
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        type: 'job_seeker',
        provider,
        avatar: `https://ui-avatars.com/api/?name=${provider}&background=3B82F6&color=fff`,
        createdAt: new Date(),
        lastLogin: new Date()
      };
      
      // Store in localStorage
      localStorage.setItem('rezume_user', JSON.stringify(socialUser));
      
      dispatch({ type: 'AUTH_SUCCESS', payload: socialUser });
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: (error as Error).message });
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('rezume_user');
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        loginWithProvider,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};