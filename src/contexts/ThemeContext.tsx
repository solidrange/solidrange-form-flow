import React, { createContext, useContext } from 'react';

/**
 * Simplified Theme Context - Light Theme Only
 * SolidForms uses a single light theme aligned with SolidRange.com
 * No dark mode toggle in this version.
 */

interface ThemeContextType {
  theme: 'light';
  // Legacy compatibility - always returns 'light'
  themeMode: 'light';
  resolvedMode: 'light';
  setThemeMode: (mode: 'light') => void;
  setTheme: (theme: 'light') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light';
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Always light theme - no state management needed
  const noopSetTheme = () => {
    // No-op: Only light theme is supported
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme: 'light',
        themeMode: 'light',
        resolvedMode: 'light',
        setThemeMode: noopSetTheme,
        setTheme: noopSetTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Type exports for backward compatibility
export type ThemeMode = 'light';
export type ResolvedTheme = 'light';
