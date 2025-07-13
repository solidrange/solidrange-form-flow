
import React, { createContext, useContext, useEffect } from 'react';
import { useBrand } from '@/contexts/BrandContext';

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
    // Apply dynamic CSS variables for comprehensive theming
    const root = document.documentElement;
    
    // Primary color variations
    root.style.setProperty('--brand-primary', brand.colors.primary.main);
    root.style.setProperty('--brand-primary-light', brand.colors.primary.light);
    root.style.setProperty('--brand-primary-dark', brand.colors.primary.dark);
    
    // Secondary color variations
    root.style.setProperty('--brand-secondary', brand.colors.secondary.main);
    root.style.setProperty('--brand-secondary-light', brand.colors.secondary.light);
    root.style.setProperty('--brand-secondary-dark', brand.colors.secondary.dark);
    
    // Override default primary for buttons and interactive elements
    root.style.setProperty('--primary', brand.colors.primary.main);
    
    // Form-specific branding
    root.style.setProperty('--form-accent', brand.colors.primary.main);
    root.style.setProperty('--form-border', brand.colors.primary.light);
    root.style.setProperty('--form-focus', brand.colors.primary.dark);
    
    // Button variations
    root.style.setProperty('--btn-primary', brand.colors.primary.main);
    root.style.setProperty('--btn-primary-hover', brand.colors.primary.dark);
    root.style.setProperty('--btn-secondary', brand.colors.secondary.main);
    root.style.setProperty('--btn-secondary-hover', brand.colors.secondary.dark);

    // Create dynamic CSS for branded components
    const brandingCSS = `
      .brand-primary { background-color: hsl(${brand.colors.primary.main}); }
      .brand-primary-hover:hover { background-color: hsl(${brand.colors.primary.dark}); }
      .brand-secondary { background-color: hsl(${brand.colors.secondary.main}); }
      .brand-secondary-hover:hover { background-color: hsl(${brand.colors.secondary.dark}); }
      .brand-border { border-color: hsl(${brand.colors.primary.main}); }
      .brand-text { color: hsl(${brand.colors.primary.main}); }
      .brand-focus:focus { border-color: hsl(${brand.colors.primary.main}); box-shadow: 0 0 0 2px hsl(${brand.colors.primary.main} / 0.2); }
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
    element.style.setProperty('--primary', brand.colors.primary.main);
    element.style.setProperty('--secondary', brand.colors.secondary.main);
  };

  const getBrandingClasses = () => {
    return 'brand-primary brand-primary-hover';
  };

  const getPrimaryColor = () => `hsl(${brand.colors.primary.main})`;
  const getSecondaryColor = () => `hsl(${brand.colors.secondary.main})`;

  const getBrandingCSS = () => {
    return `
      --brand-primary: ${brand.colors.primary.main};
      --brand-secondary: ${brand.colors.secondary.main};
      --primary: ${brand.colors.primary.main};
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
