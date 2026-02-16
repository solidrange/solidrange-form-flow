import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AuthRole = 'admin' | 'user';

export interface AuthUser {
  email: string;
  name: string;
  role: AuthRole;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const DEMO_CREDENTIALS: { email: string; password: string; user: AuthUser }[] = [
  {
    email: 'admin@solidform.com',
    password: 'admin123',
    user: { email: 'admin@solidform.com', name: 'Admin User', role: 'admin' }
  },
  {
    email: 'user@solidform.com',
    password: 'user123',
    user: { email: 'user@solidform.com', name: 'Form User', role: 'user' }
  }
];

const SESSION_KEY = 'solidform_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [currentUser]);

  const login = (email: string, password: string) => {
    const match = DEMO_CREDENTIALS.find(
      c => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );
    if (match) {
      setCurrentUser(match.user);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
