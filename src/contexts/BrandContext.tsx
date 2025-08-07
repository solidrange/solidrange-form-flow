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

export interface BrandIdentity {
  name: string;
  logo: string | null;
  colors: BrandColors;
  tagline?: string;
}

interface BrandContextType {
  brand: BrandIdentity;
  updateBrand: (updates: Partial<BrandIdentity>) => void;
  updateLogo: (logoUrl: string | null) => void;
  updateColors: (colors: Partial<BrandColors>) => void;
  resetToDefaults: () => void;
}

const defaultBrand: BrandIdentity = {
  name: 'FormFlow',
  logo: null,
  tagline: 'Build, Share, Analyze Forms with Intelligence',
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
    return stored ? JSON.parse(stored) : defaultBrand;
  });

  // Apply brand colors to CSS variables when brand changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply primary colors
    root.style.setProperty('--brand-primary', brand.colors.primary.main);
    root.style.setProperty('--brand-primary-light', brand.colors.primary.light);
    root.style.setProperty('--brand-primary-dark', brand.colors.primary.dark);
    
    // Apply secondary colors
    root.style.setProperty('--brand-secondary', brand.colors.secondary.main);
    root.style.setProperty('--brand-secondary-light', brand.colors.secondary.light);
    root.style.setProperty('--brand-secondary-dark', brand.colors.secondary.dark);
    
    // Update primary theme color to match brand
    root.style.setProperty('--primary', brand.colors.primary.main);
    
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
        primary: { ...prev.colors.primary, ...colors.primary },
        secondary: { ...prev.colors.secondary, ...colors.secondary }
      }
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
        resetToDefaults 
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};