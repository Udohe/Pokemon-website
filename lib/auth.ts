export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  provider?: 'credentials' | 'google' | 'github';
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
