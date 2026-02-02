import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Brand Context - Light Theme Only
 * Single theme structure aligned with SolidRange visual style
 */

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

export interface BrandIdentity {
  name: string;
  logo: string | null;
  tagline?: string;
  fonts: BrandFonts;
  colors: BrandColors;
}

interface BrandContextType {
  brand: BrandIdentity;
  updateBrand: (updates: Partial<BrandIdentity>) => void;
  updateLogo: (logoUrl: string | null) => void;
  updateColors: (colors: Partial<BrandColors>) => void;
  updateFonts: (fonts: Partial<BrandFonts>) => void;
  resetToDefaults: () => void;
  getCurrentThemeColors: () => BrandColors;
}

// SolidRange.com aligned light theme defaults
const defaultBrand: BrandIdentity = {
  name: 'SolidForm',
  logo: null,
  tagline: 'Enterprise Assessment Simplified',
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'JetBrains Mono'
  },
  colors: {
    primary: {
      main: '199 89% 48%',      // SolidRange teal/cyan blue
      light: '199 75% 58%',
      dark: '199 89% 38%'
    },
    secondary: {
      main: '213 50% 23%',      // SolidRange navy blue
      light: '213 45% 35%',
      dark: '213 55% 18%'
    },
    background: '0 0% 100%',
    surface: '210 33% 98%',
    text: {
      primary: '213 50% 15%',   // Dark navy for headings
      secondary: '213 25% 40%'
    },
    button: {
      primary: '199 89% 48%',
      secondary: '210 20% 96%',
      destructive: '0 84% 60%'
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
      try {
        const parsedBrand = JSON.parse(stored);
        // Migrate old dual-theme structure to single theme
        if (parsedBrand.lightTheme && !parsedBrand.colors) {
          return {
            ...defaultBrand,
            name: parsedBrand.name || defaultBrand.name,
            logo: parsedBrand.logo || defaultBrand.logo,
            tagline: parsedBrand.tagline || defaultBrand.tagline,
            fonts: parsedBrand.fonts || defaultBrand.fonts,
            colors: parsedBrand.lightTheme.colors || defaultBrand.colors
          };
        }
        return { ...defaultBrand, ...parsedBrand };
      } catch (e) {
        console.warn('Failed to parse stored brand, using defaults');
        return defaultBrand;
      }
    }
    return defaultBrand;
  });

  const getCurrentThemeColors = (): BrandColors => {
    return brand.colors || defaultBrand.colors;
  };

  // Apply brand colors and fonts to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    const colors = brand.colors || defaultBrand.colors;
    
    // Apply brand colors
    root.style.setProperty('--brand-primary', colors.primary.main);
    root.style.setProperty('--brand-primary-light', colors.primary.light);
    root.style.setProperty('--brand-primary-dark', colors.primary.dark);
    root.style.setProperty('--brand-secondary', colors.secondary.main);
    root.style.setProperty('--brand-secondary-light', colors.secondary.light);
    root.style.setProperty('--brand-secondary-dark', colors.secondary.dark);
    
    // Apply to primary CSS variable
    root.style.setProperty('--primary', colors.primary.main);
    
    // Apply fonts
    const fonts = brand.fonts || defaultBrand.fonts;
    root.style.setProperty('--font-heading', fonts.heading);
    root.style.setProperty('--font-body', fonts.body);
    root.style.setProperty('--font-mono', fonts.mono);
    
    // Save to localStorage
    localStorage.setItem('brand-identity', JSON.stringify(brand));
  }, [brand]);

  const updateBrand = (updates: Partial<BrandIdentity>) => {
    setBrand(prev => ({ ...prev, ...updates }));
  };

  const updateLogo = (logoUrl: string | null) => {
    setBrand(prev => ({ ...prev, logo: logoUrl }));
  };

  const updateColors = (colors: Partial<BrandColors>) => {
    setBrand(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        ...colors,
        primary: colors.primary ? { ...prev.colors.primary, ...colors.primary } : prev.colors.primary,
        secondary: colors.secondary ? { ...prev.colors.secondary, ...colors.secondary } : prev.colors.secondary,
        text: colors.text ? { ...prev.colors.text, ...colors.text } : prev.colors.text,
        button: colors.button ? { ...prev.colors.button, ...colors.button } : prev.colors.button
      }
    }));
  };

  const updateFonts = (fonts: Partial<BrandFonts>) => {
    setBrand(prev => ({
      ...prev,
      fonts: { ...prev.fonts, ...fonts }
    }));
  };

  const resetToDefaults = () => {
    setBrand(defaultBrand);
    localStorage.removeItem('brand-identity');
  };

  return (
    <BrandContext.Provider 
      value={{ 
        brand, 
        updateBrand, 
        updateLogo, 
        updateColors, 
        updateFonts,
        resetToDefaults,
        getCurrentThemeColors
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};
