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
}

export interface ThemeBranding {
  colors: BrandColors;
  background?: string;
  foreground?: string;
  cardBackground?: string;
  borderColor?: string;
}

export interface BrandIdentity {
  name: string;
  logo: string | null;
  tagline?: string;
  lightTheme: ThemeBranding;
  darkTheme: ThemeBranding;
  fontFamily?: string;
  headingFont?: string;
}

interface BrandContextType {
  brand: BrandIdentity & { colors?: BrandColors }; // Backward compatibility
  updateBrand: (updates: Partial<BrandIdentity>) => void;
  updateLogo: (logoUrl: string | null) => void;
  updateThemeBranding: (theme: 'lightTheme' | 'darkTheme', branding: Partial<ThemeBranding>) => void;
  updateColors: (colors: Partial<BrandColors>) => void; // Backward compatibility
  resetToDefaults: () => void;
  getCurrentThemeColors: () => BrandColors;
}

const defaultBrand: BrandIdentity = {
  name: 'FormFlow',
  logo: null,
  tagline: 'Build, Share, Analyze Forms with Intelligence',
  fontFamily: 'Inter',
  headingFont: 'Inter',
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
      }
    },
    background: '0 0% 100%',
    foreground: '224 71.4% 4.1%',
    cardBackground: '0 0% 100%',
    borderColor: '220 13% 91%'
  },
  darkTheme: {
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
      }
    },
    background: '222.2 84% 4.9%',
    foreground: '210 40% 98%',
    cardBackground: '222.2 84% 4.9%',
    borderColor: '217.2 32.6% 17.5%'
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
      try {
        const parsedBrand = JSON.parse(stored);
        
        // Migration logic: Convert old structure to new structure
        if (parsedBrand.colors && !parsedBrand.lightTheme && !parsedBrand.darkTheme) {
          console.log('Migrating old brand structure to new theme-based structure');
          return {
            ...parsedBrand,
            lightTheme: {
              colors: parsedBrand.colors,
              background: '0 0% 100%',
              foreground: '224 71.4% 4.1%',
              cardBackground: '0 0% 100%',
              borderColor: '220 13% 91%'
            },
            darkTheme: {
              colors: parsedBrand.colors,
              background: '222.2 84% 4.9%',
              foreground: '210 40% 98%',
              cardBackground: '222.2 84% 4.9%',
              borderColor: '217.2 32.6% 17.5%'
            }
          };
        }
        
        // Ensure the new structure has all required properties
        if (parsedBrand.lightTheme && parsedBrand.darkTheme) {
          return parsedBrand;
        }
      } catch (error) {
        console.error('Error parsing stored brand data:', error);
      }
    }
    
    return defaultBrand;
  });

  // Apply brand colors to CSS variables when brand changes
  useEffect(() => {
    const root = document.documentElement;
    const isDark = document.documentElement.classList.contains('dark');
    const currentTheme = isDark ? brand.darkTheme : brand.lightTheme;
    
    // Apply primary colors
    root.style.setProperty('--brand-primary', currentTheme.colors.primary.main);
    root.style.setProperty('--brand-primary-light', currentTheme.colors.primary.light);
    root.style.setProperty('--brand-primary-dark', currentTheme.colors.primary.dark);
    
    // Apply secondary colors
    root.style.setProperty('--brand-secondary', currentTheme.colors.secondary.main);
    root.style.setProperty('--brand-secondary-light', currentTheme.colors.secondary.light);
    root.style.setProperty('--brand-secondary-dark', currentTheme.colors.secondary.dark);
    
    // Update primary theme color to match brand
    root.style.setProperty('--primary', currentTheme.colors.primary.main);
    
    // Apply theme-specific styles
    if (currentTheme.background) root.style.setProperty('--background', currentTheme.background);
    if (currentTheme.foreground) root.style.setProperty('--foreground', currentTheme.foreground);
    if (currentTheme.cardBackground) root.style.setProperty('--card', currentTheme.cardBackground);
    if (currentTheme.borderColor) root.style.setProperty('--border', currentTheme.borderColor);
    
    // Save to localStorage
    localStorage.setItem('brand-identity', JSON.stringify(brand));
  }, [brand]);

  const updateBrand = (updates: Partial<BrandIdentity>) => {
    setBrand(prev => ({ ...prev, ...updates }));
  };

  const updateLogo = (logoUrl: string | null) => {
    setBrand(prev => ({ ...prev, logo: logoUrl }));
  };

  const updateThemeBranding = (theme: 'lightTheme' | 'darkTheme', branding: Partial<ThemeBranding>) => {
    setBrand(prev => ({
      ...prev,
      [theme]: {
        ...prev[theme],
        ...branding,
        colors: branding.colors ? {
          primary: { ...prev[theme].colors.primary, ...branding.colors.primary },
          secondary: { ...prev[theme].colors.secondary, ...branding.colors.secondary }
        } : prev[theme].colors
      }
    }));
  };

  // Backward compatibility function
  const updateColors = (colors: Partial<BrandColors>) => {
    const isDark = document.documentElement.classList.contains('dark');
    const currentTheme = isDark ? 'darkTheme' : 'lightTheme';
    updateThemeBranding(currentTheme, { 
      colors: {
        primary: { ...getCurrentThemeColors().primary, ...colors.primary },
        secondary: { ...getCurrentThemeColors().secondary, ...colors.secondary }
      }
    });
  };

  const getCurrentThemeColors = (): BrandColors => {
    const isDark = document.documentElement.classList.contains('dark');
    
    // Safety check: ensure theme objects exist
    if (!brand.lightTheme || !brand.darkTheme) {
      console.warn('Theme objects missing, using default colors');
      return defaultBrand.lightTheme.colors;
    }
    
    return isDark ? brand.darkTheme.colors : brand.lightTheme.colors;
  };

  const resetToDefaults = () => {
    setBrand(defaultBrand);
    localStorage.removeItem('brand-identity');
  };

  // Add backward compatibility for colors property
  const brandWithColors = {
    ...brand,
    colors: getCurrentThemeColors()
  };

  return (
    <BrandContext.Provider 
      value={{ 
        brand: brandWithColors, 
        updateBrand, 
        updateLogo, 
        updateThemeBranding, 
        updateColors,
        getCurrentThemeColors,
        resetToDefaults 
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};