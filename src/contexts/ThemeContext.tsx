import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  resolvedMode: ResolvedTheme;
  setThemeMode: (mode: ThemeMode) => void;
  // Legacy alias for compatibility
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
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
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

/**
 * Get the system color scheme preference
 */
const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Resolve theme mode to actual light/dark value
 */
const resolveTheme = (mode: ThemeMode): ResolvedTheme => {
  if (mode === 'system') {
    return getSystemTheme();
  }
  return mode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children,
  defaultTheme = 'system',
  storageKey = 'solidform-theme'
}) => {
  // Initialize theme mode from storage or default
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        return stored as ThemeMode;
      }
    } catch (e) {
      console.warn('Failed to read theme from localStorage:', e);
    }
    return defaultTheme;
  });

  // Track the resolved theme (actual light or dark)
  const [resolvedMode, setResolvedMode] = useState<ResolvedTheme>(() => 
    resolveTheme(themeMode)
  );

  /**
   * Apply theme to DOM by adding/removing 'dark' class
   */
  const applyTheme = useCallback((resolved: ResolvedTheme) => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the resolved class
    root.classList.add(resolved);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        resolved === 'dark' ? 'hsl(222, 47%, 7%)' : 'hsl(0, 0%, 100%)'
      );
    }
  }, []);

  /**
   * Set theme mode and persist to storage
   */
  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    
    try {
      localStorage.setItem(storageKey, mode);
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
  }, [storageKey]);

  // Update resolved mode when theme mode changes
  useEffect(() => {
    const resolved = resolveTheme(themeMode);
    setResolvedMode(resolved);
    applyTheme(resolved);
  }, [themeMode, applyTheme]);

  // Listen for system preference changes when in 'system' mode
  useEffect(() => {
    if (themeMode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newResolved: ResolvedTheme = e.matches ? 'dark' : 'light';
      setResolvedMode(newResolved);
      applyTheme(newResolved);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode, applyTheme]);

  // Apply theme on initial mount
  useEffect(() => {
    applyTheme(resolvedMode);
  }, []);

  return (
    <ThemeContext.Provider 
      value={{ 
        themeMode,
        resolvedMode,
        setThemeMode,
        // Legacy aliases for backward compatibility
        theme: themeMode,
        setTheme: setThemeMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
