'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginFormData, SignupFormData } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  logout: () => void;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'pokedex_user';
const USERS_KEY = 'pokedex_users';

function getStoredUsers(): Record<string, { password: string; user: User }> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setState({ user: JSON.parse(stored), isLoading: false, error: null });
      } else {
        setState(s => ({ ...s, isLoading: false }));
      }
    } catch {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const persistUser = (user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setState({ user, isLoading: false, error: null });
  };

  const login = async ({ email, password }: LoginFormData) => {
    setState(s => ({ ...s, isLoading: true, error: null }));
    await new Promise(r => setTimeout(r, 800));
    const users = getStoredUsers();
    const entry = users[email.toLowerCase()];
    if (!entry || entry.password !== password) {
      setState(s => ({ ...s, isLoading: false, error: 'Invalid email or password.' }));
      return;
    }
    persistUser(entry.user);
  };

  const signup = async ({ username, email, password, confirmPassword }: SignupFormData) => {
    setState(s => ({ ...s, isLoading: true, error: null }));
    await new Promise(r => setTimeout(r, 800));
    if (password !== confirmPassword) {
      setState(s => ({ ...s, isLoading: false, error: 'Passwords do not match.' }));
      return;
    }
    const users = getStoredUsers();
    if (users[email.toLowerCase()]) {
      setState(s => ({ ...s, isLoading: false, error: 'Email already registered.' }));
      return;
    }
    const user: User = {
      id: Date.now().toString(),
      username,
      email,
      provider: 'credentials',
      avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`,
    };
    users[email.toLowerCase()] = { password, user };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    persistUser(user);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, isLoading: false, error: null });
  };

  const loginWithGoogle = async () => {
    setState(s => ({ ...s, isLoading: true, error: null }));
    await new Promise(r => setTimeout(r, 1000));
    const user: User = {
      id: 'google-' + Date.now(),
      username: 'TrainerRed',
      email: 'trainer@pokemon.com',
      provider: 'google',
      avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=google`,
    };
    persistUser(user);
  };

  const loginWithGithub = async () => {
    setState(s => ({ ...s, isLoading: true, error: null }));
    await new Promise(r => setTimeout(r, 1000));
    const user: User = {
      id: 'github-' + Date.now(),
      username: 'DevTrainer',
      email: 'dev@pokemon.com',
      provider: 'github',
      avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=github`,
    };
    persistUser(user);
  };

  const clearError = () => setState(s => ({ ...s, error: null }));

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, loginWithGoogle, loginWithGithub, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
