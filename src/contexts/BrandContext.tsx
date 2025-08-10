import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BrandColors {
  primary: {
    main: string;
    light: string;
    dark: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
  };
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
  };
  button: {
    primary: string;
    secondary: string;
    destructive: string;
  };
}

export interface BrandFonts {
  heading: string;
  body: string;
  mono: string;
}

export interface ThemeBrand {
  colors: BrandColors;
}

export interface BrandIdentity {
  name: string;
  logo: string | null;
  tagline?: string;
  fonts: BrandFonts;
  lightTheme: ThemeBrand;
  darkTheme: ThemeBrand;
}

interface BrandContextType {
  brand: BrandIdentity;
  updateBrand: (updates: Partial<BrandIdentity>) => void;
  updateLogo: (logoUrl: string | null) => void;
  updateThemeColors: (theme: 'light' | 'dark', colors: Partial<BrandColors>) => void;
  updateFonts: (fonts: Partial<BrandFonts>) => void;
  resetToDefaults: () => void;
  getCurrentThemeColors: () => BrandColors;
}

const defaultBrand: BrandIdentity = {
  name: 'FormFlow',
  logo: null,
  tagline: 'Build, Share, Analyze Forms with Intelligence',
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono'
  },
  lightTheme: {
    colors: {
      primary: {
        main: '208 100% 47%',
        light: '210 100% 70%',
        dark: '208 100% 35%'
      },
      secondary: {
        main: '262 83% 58%',
        light: '262 83% 75%',
        dark: '262 83% 45%'
      },
      background: '0 0% 100%',
      surface: '0 0% 98%',
      text: {
        primary: '224 71.4% 4.1%',
        secondary: '220 8.9% 46.1%'
      },
      button: {
        primary: '208 100% 47%',
        secondary: '220 14.3% 95.9%',
        destructive: '0 84.2% 60.2%'
      }
    }
  },
  darkTheme: {
    colors: {
      primary: {
        main: '208 100% 55%',
        light: '210 100% 75%',
        dark: '208 100% 40%'
      },
      secondary: {
        main: '262 83% 65%',
        light: '262 83% 80%',
        dark: '262 83% 50%'
      },
      background: '222.2 84% 4.9%',
      surface: '217.2 32.6% 17.5%',
      text: {
        primary: '210 40% 98%',
        secondary: '215 20.2% 65.1%'
      },
      button: {
        primary: '208 100% 55%',
        secondary: '217.2 32.6% 17.5%',
        destructive: '0 62.8% 50.6%'
      }
    }
  }
};

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};

interface BrandProviderProps {
  children: React.ReactNode;
}

export const BrandProvider: React.FC<BrandProviderProps> = ({ children }) => {
  const [brand, setBrand] = useState<BrandIdentity>(() => {
    const stored = localStorage.getItem('brand-identity');
    if (stored) {
      const parsedBrand = JSON.parse(stored);
      // Migrate old brand structure to new theme-based structure
      if (parsedBrand.colors && !parsedBrand.lightTheme) {
        return {
          ...defaultBrand,
          name: parsedBrand.name || defaultBrand.name,
          logo: parsedBrand.logo || defaultBrand.logo,
          tagline: parsedBrand.tagline || defaultBrand.tagline,
          lightTheme: {
            colors: {
              ...defaultBrand.lightTheme.colors,
              primary: parsedBrand.colors.primary || defaultBrand.lightTheme.colors.primary,
              secondary: parsedBrand.colors.secondary || defaultBrand.lightTheme.colors.secondary
            }
          },
          darkTheme: {
            colors: {
              ...defaultBrand.darkTheme.colors,
              primary: parsedBrand.colors.primary || defaultBrand.darkTheme.colors.primary,
              secondary: parsedBrand.colors.secondary || defaultBrand.darkTheme.colors.secondary
            }
          }
        };
      }
      return { ...defaultBrand, ...parsedBrand };
    }
    return defaultBrand;
  });

  const getCurrentThemeColors = (): BrandColors => {
    const isDark = document.documentElement.classList.contains('dark');
    const theme = isDark ? brand.darkTheme : brand.lightTheme;
    
    // Ensure theme and colors exist, fallback to default if not
    if (!theme || !theme.colors) {
      const fallbackTheme = isDark ? defaultBrand.darkTheme : defaultBrand.lightTheme;
      return fallbackTheme.colors;
    }
    
    return theme.colors;
  };

  // Apply brand colors and fonts to CSS variables when brand changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Ensure brand object is properly initialized
    if (!brand || !brand.lightTheme || !brand.darkTheme) {
      console.warn('Brand object not properly initialized, using defaults');
      setBrand(defaultBrand);
      return;
    }
    
    const currentColors = getCurrentThemeColors();
    
    // Apply brand colors with fallbacks
    root.style.setProperty('--brand-primary', currentColors.primary?.main || defaultBrand.lightTheme.colors.primary.main);
    root.style.setProperty('--brand-primary-light', currentColors.primary?.light || defaultBrand.lightTheme.colors.primary.light);
    root.style.setProperty('--brand-primary-dark', currentColors.primary?.dark || defaultBrand.lightTheme.colors.primary.dark);
    root.style.setProperty('--brand-secondary', currentColors.secondary?.main || defaultBrand.lightTheme.colors.secondary.main);
    root.style.setProperty('--brand-secondary-light', currentColors.secondary?.light || defaultBrand.lightTheme.colors.secondary.light);
    root.style.setProperty('--brand-secondary-dark', currentColors.secondary?.dark || defaultBrand.lightTheme.colors.secondary.dark);
    
    // Apply comprehensive color system
    root.style.setProperty('--primary', currentColors.primary?.main || defaultBrand.lightTheme.colors.primary.main);
    root.style.setProperty('--background', currentColors.background || defaultBrand.lightTheme.colors.background);
    root.style.setProperty('--card', currentColors.surface || defaultBrand.lightTheme.colors.surface);
    root.style.setProperty('--foreground', currentColors.text?.primary || defaultBrand.lightTheme.colors.text.primary);
    root.style.setProperty('--muted-foreground', currentColors.text?.secondary || defaultBrand.lightTheme.colors.text.secondary);
    
    // Apply fonts with fallbacks
    root.style.setProperty('--font-heading', brand.fonts?.heading || defaultBrand.fonts.heading);
    root.style.setProperty('--font-body', brand.fonts?.body || defaultBrand.fonts.body);
    root.style.setProperty('--font-mono', brand.fonts?.mono || defaultBrand.fonts.mono);
    
    // Save to localStorage
    localStorage.setItem('brand-identity', JSON.stringify(brand));
  }, [brand]);

  // Listen for theme changes and reapply colors
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Ensure brand is properly initialized before accessing colors
      if (!brand || !brand.lightTheme || !brand.darkTheme) {
        return;
      }
      
      const currentColors = getCurrentThemeColors();
      const root = document.documentElement;
      
      // Apply colors with fallbacks
      root.style.setProperty('--brand-primary', currentColors.primary?.main || defaultBrand.lightTheme.colors.primary.main);
      root.style.setProperty('--brand-primary-light', currentColors.primary?.light || defaultBrand.lightTheme.colors.primary.light);
      root.style.setProperty('--brand-primary-dark', currentColors.primary?.dark || defaultBrand.lightTheme.colors.primary.dark);
      root.style.setProperty('--brand-secondary', currentColors.secondary?.main || defaultBrand.lightTheme.colors.secondary.main);
      root.style.setProperty('--brand-secondary-light', currentColors.secondary?.light || defaultBrand.lightTheme.colors.secondary.light);
      root.style.setProperty('--brand-secondary-dark', currentColors.secondary?.dark || defaultBrand.lightTheme.colors.secondary.dark);
      root.style.setProperty('--primary', currentColors.primary?.main || defaultBrand.lightTheme.colors.primary.main);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [brand]);

  const updateBrand = (updates: Partial<BrandIdentity>) => {
    setBrand(prev => ({ ...prev, ...updates }));
  };

  const updateLogo = (logoUrl: string | null) => {
    setBrand(prev => ({ ...prev, logo: logoUrl }));
  };

  const updateThemeColors = (theme: 'light' | 'dark', colors: Partial<BrandColors>) => {
    setBrand(prev => {
      const themeKey = theme === 'light' ? 'lightTheme' : 'darkTheme';
      const currentTheme = prev[themeKey];
      
      return {
        ...prev,
        [themeKey]: {
          colors: {
            ...currentTheme.colors,
            ...colors,
            primary: colors.primary ? { ...currentTheme.colors.primary, ...colors.primary } : currentTheme.colors.primary,
            secondary: colors.secondary ? { ...currentTheme.colors.secondary, ...colors.secondary } : currentTheme.colors.secondary,
            text: colors.text ? { ...currentTheme.colors.text, ...colors.text } : currentTheme.colors.text,
            button: colors.button ? { ...currentTheme.colors.button, ...colors.button } : currentTheme.colors.button
          }
        }
      };
    });
  };

  const updateFonts = (fonts: Partial<BrandFonts>) => {
    setBrand(prev => ({
      ...prev,
      fonts: { ...prev.fonts, ...fonts }
    }));
  };

  const resetToDefaults = () => {
    // Get current brand from localStorage or use the stored default
    const currentBrand = localStorage.getItem('brand-identity');
    if (currentBrand) {
      const parsedBrand = JSON.parse(currentBrand);
      // Update the default to match current light theme
      const updatedDefault = {
        ...defaultBrand,
        lightTheme: parsedBrand.lightTheme || defaultBrand.lightTheme
      };
      setBrand(updatedDefault);
    } else {
      setBrand(defaultBrand);
    }
  };

  return (
    <BrandContext.Provider 
      value={{ 
        brand, 
        updateBrand, 
        updateLogo, 
        updateThemeColors, 
        updateFonts,
        resetToDefaults,
        getCurrentThemeColors
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};