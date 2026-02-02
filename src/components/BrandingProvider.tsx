import React, { createContext, useContext, useEffect } from 'react';
import { useBrand } from '@/contexts/BrandContext';

/**
 * Branding Provider - Light Theme Only
 * Applies brand colors dynamically for the single light theme
 */

interface BrandingContextType {
  applyBrandingStyles: (element: HTMLElement) => void;
  getBrandingClasses: () => string;
  getPrimaryColor: () => string;
  getSecondaryColor: () => string;
  getBrandingCSS: () => string;
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within a BrandingProvider');
  }
  return context;
};

interface BrandingProviderProps {
  children: React.ReactNode;
}

export const BrandingProvider: React.FC<BrandingProviderProps> = ({ children }) => {
  const { brand } = useBrand();

  useEffect(() => {
    const root = document.documentElement;
    const colors = brand.colors;
    
    // Primary color variations
    root.style.setProperty('--brand-primary', colors.primary.main);
    root.style.setProperty('--brand-primary-light', colors.primary.light);
    root.style.setProperty('--brand-primary-dark', colors.primary.dark);
    
    // Secondary color variations
    root.style.setProperty('--brand-secondary', colors.secondary.main);
    root.style.setProperty('--brand-secondary-light', colors.secondary.light);
    root.style.setProperty('--brand-secondary-dark', colors.secondary.dark);
    
    // Override default primary for buttons and interactive elements
    root.style.setProperty('--primary', colors.primary.main);
    
    // Form-specific branding
    root.style.setProperty('--form-accent', colors.primary.main);
    root.style.setProperty('--form-border', colors.primary.light);
    root.style.setProperty('--form-focus', colors.primary.dark);
    
    // Button variations
    root.style.setProperty('--btn-primary', colors.primary.main);
    root.style.setProperty('--btn-primary-hover', colors.primary.dark);
    root.style.setProperty('--btn-secondary', colors.secondary.main);
    root.style.setProperty('--btn-secondary-hover', colors.secondary.dark);

    // Create dynamic CSS for branded components
    const brandingCSS = `
      .brand-primary { background-color: hsl(${colors.primary.main}); }
      .brand-primary-hover:hover { background-color: hsl(${colors.primary.dark}); }
      .brand-secondary { background-color: hsl(${colors.secondary.main}); }
      .brand-secondary-hover:hover { background-color: hsl(${colors.secondary.dark}); }
      .brand-border { border-color: hsl(${colors.primary.main}); }
      .brand-text { color: hsl(${colors.primary.main}); }
      .brand-focus:focus { border-color: hsl(${colors.primary.main}); box-shadow: 0 0 0 2px hsl(${colors.primary.main} / 0.2); }
    `;

    // Inject or update style element
    let styleElement = document.getElementById('brand-dynamic-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'brand-dynamic-styles';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = brandingCSS;

  }, [brand]);

  const applyBrandingStyles = (element: HTMLElement) => {
    const colors = brand.colors;
    element.style.setProperty('--primary', colors.primary.main);
    element.style.setProperty('--secondary', colors.secondary.main);
  };

  const getBrandingClasses = () => {
    return 'brand-primary brand-primary-hover';
  };

  const getPrimaryColor = () => {
    return `hsl(${brand.colors.primary.main})`;
  };
  
  const getSecondaryColor = () => {
    return `hsl(${brand.colors.secondary.main})`;
  };

  const getBrandingCSS = () => {
    const colors = brand.colors;
    return `
      --brand-primary: ${colors.primary.main};
      --brand-secondary: ${colors.secondary.main};
      --primary: ${colors.primary.main};
    `;
  };

  return (
    <BrandingContext.Provider value={{
      applyBrandingStyles,
      getBrandingClasses,
      getPrimaryColor,
      getSecondaryColor,
      getBrandingCSS
    }}>
      {children}
    </BrandingContext.Provider>
  );
};
