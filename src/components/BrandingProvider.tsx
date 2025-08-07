
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
    
    // Get current theme colors
    const isDark = document.documentElement.classList.contains('dark');
    const currentColors = isDark ? brand.darkTheme.colors : brand.lightTheme.colors;
    
    // Primary color variations
    root.style.setProperty('--brand-primary', currentColors.primary.main);
    root.style.setProperty('--brand-primary-light', currentColors.primary.light);
    root.style.setProperty('--brand-primary-dark', currentColors.primary.dark);
    
    // Secondary color variations
    root.style.setProperty('--brand-secondary', currentColors.secondary.main);
    root.style.setProperty('--brand-secondary-light', currentColors.secondary.light);
    root.style.setProperty('--brand-secondary-dark', currentColors.secondary.dark);
    
    // Override default primary for buttons and interactive elements
    root.style.setProperty('--primary', currentColors.primary.main);
    
    // Apply theme-specific colors for proper contrast
    root.style.setProperty('--background', currentColors.background);
    root.style.setProperty('--card', currentColors.surface);
    root.style.setProperty('--foreground', currentColors.text.primary);
    root.style.setProperty('--card-foreground', currentColors.text.primary);
    root.style.setProperty('--muted-foreground', currentColors.text.secondary);
    root.style.setProperty('--primary-foreground', isDark ? '224 71.4% 4.1%' : '210 20% 98%');
    
    // Form-specific branding
    root.style.setProperty('--form-accent', currentColors.primary.main);
    root.style.setProperty('--form-border', currentColors.primary.light);
    root.style.setProperty('--form-focus', currentColors.primary.dark);
    
    // Button variations
    root.style.setProperty('--btn-primary', currentColors.primary.main);
    root.style.setProperty('--btn-primary-hover', currentColors.primary.dark);
    root.style.setProperty('--btn-secondary', currentColors.secondary.main);
    root.style.setProperty('--btn-secondary-hover', currentColors.secondary.dark);

    // Create dynamic CSS for branded components with proper contrast
    const brandingCSS = `
      .brand-primary { 
        background-color: hsl(${currentColors.primary.main}); 
        color: ${isDark ? 'hsl(224 71.4% 4.1%)' : 'hsl(210 20% 98%)'};
      }
      .brand-primary-hover:hover { 
        background-color: hsl(${currentColors.primary.dark}); 
        color: ${isDark ? 'hsl(224 71.4% 4.1%)' : 'hsl(210 20% 98%)'};
      }
      .brand-secondary { 
        background-color: hsl(${currentColors.secondary.main}); 
        color: ${isDark ? 'hsl(224 71.4% 4.1%)' : 'hsl(210 20% 98%)'};
      }
      .brand-secondary-hover:hover { 
        background-color: hsl(${currentColors.secondary.dark}); 
        color: ${isDark ? 'hsl(224 71.4% 4.1%)' : 'hsl(210 20% 98%)'};
      }
      .brand-border { border-color: hsl(${currentColors.primary.main}); }
      .brand-text { color: hsl(${currentColors.primary.main}); }
      .brand-focus:focus { 
        border-color: hsl(${currentColors.primary.main}); 
        box-shadow: 0 0 0 2px hsl(${currentColors.primary.main} / 0.2); 
      }
      
      /* Enhanced text contrast for dark mode */
      .dark .text-foreground { color: hsl(210 20% 98%); }
      .dark .text-muted-foreground { color: hsl(217.9 10.6% 64.9%); }
      .dark .text-card-foreground { color: hsl(210 20% 98%); }
      
      /* Button text contrast */
      .dark button { color: hsl(210 20% 98%); }
      .dark .btn-outline { color: hsl(210 20% 98%); border-color: hsl(215 27.9% 16.9%); }
      .dark .btn-outline:hover { background-color: hsl(215 27.9% 16.9%); color: hsl(210 20% 98%); }
      
      /* Input and form elements contrast */
      .dark input, .dark textarea, .dark select { 
        background-color: hsl(215 27.9% 16.9%); 
        color: hsl(210 20% 98%); 
        border-color: hsl(215 27.9% 16.9%);
      }
      .dark input::placeholder, .dark textarea::placeholder { 
        color: hsl(217.9 10.6% 64.9%); 
      }
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
    const isDark = document.documentElement.classList.contains('dark');
    const currentColors = isDark ? brand.darkTheme.colors : brand.lightTheme.colors;
    element.style.setProperty('--primary', currentColors.primary.main);
    element.style.setProperty('--secondary', currentColors.secondary.main);
  };

  const getBrandingClasses = () => {
    return 'brand-primary brand-primary-hover';
  };

  const getPrimaryColor = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const currentColors = isDark ? brand.darkTheme.colors : brand.lightTheme.colors;
    return `hsl(${currentColors.primary.main})`;
  };
  
  const getSecondaryColor = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const currentColors = isDark ? brand.darkTheme.colors : brand.lightTheme.colors;
    return `hsl(${currentColors.secondary.main})`;
  };

  const getBrandingCSS = () => {
    const isDark = document.documentElement.classList.contains('dark');
    const currentColors = isDark ? brand.darkTheme.colors : brand.lightTheme.colors;
    return `
      --brand-primary: ${currentColors.primary.main};
      --brand-secondary: ${currentColors.secondary.main};
      --primary: ${currentColors.primary.main};
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
