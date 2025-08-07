
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
    
    // Additional theme-specific overrides
    root.style.setProperty('--popover', currentColors.surface);
    root.style.setProperty('--popover-foreground', currentColors.text.primary);
    root.style.setProperty('--secondary', isDark ? '215 27.9% 16.9%' : '220 14.3% 95.9%');
    root.style.setProperty('--secondary-foreground', currentColors.text.primary);
    root.style.setProperty('--accent', isDark ? '215 27.9% 16.9%' : '220 14.3% 95.9%');
    root.style.setProperty('--accent-foreground', currentColors.text.primary);
    root.style.setProperty('--border', isDark ? '215 27.9% 16.9%' : '220 13% 91%');
    root.style.setProperty('--input', isDark ? '215 27.9% 16.9%' : '220 13% 91%');
    
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
      
      /* DARK MODE STYLING */
      .dark { color: hsl(210 20% 98%) !important; }
      .dark body { color: hsl(210 20% 98%) !important; background-color: hsl(224 71.4% 4.1%) !important; }
      .dark .text-foreground { color: hsl(210 20% 98%) !important; }
      .dark .text-muted-foreground { color: hsl(210 20% 98%) !important; }
      .dark .text-card-foreground { color: hsl(210 20% 98%) !important; }
      .dark h1, .dark h2, .dark h3, .dark h4, .dark h5, .dark h6 { color: hsl(210 20% 98%) !important; }
      .dark p, .dark span, .dark div { color: hsl(210 20% 98%) !important; }
      .dark label { color: hsl(210 20% 98%) !important; }
      .dark small { color: hsl(210 20% 98%) !important; }
      
      /* Dark theme cards and surfaces */
      .dark .bg-card { background-color: hsl(215 27.9% 16.9%) !important; }
      .dark .bg-background { background-color: hsl(224 71.4% 4.1%) !important; }
      .dark .bg-muted { background-color: hsl(215 27.9% 16.9%) !important; }
      .dark .bg-accent { background-color: hsl(215 27.9% 16.9%) !important; }
      .dark .bg-muted\\/50 { background-color: hsl(215 27.9% 16.9% / 0.5) !important; }
      .dark .bg-muted\\/30 { background-color: hsl(215 27.9% 16.9% / 0.3) !important; }
      .dark .border-b { border-color: hsl(215 27.9% 16.9%) !important; }
      .dark .bg-white { background-color: hsl(215 27.9% 16.9%) !important; }
      
      /* LIGHT MODE STYLING */
      .light { color: hsl(224 71.4% 4.1%) !important; }
      .light body { color: hsl(224 71.4% 4.1%) !important; background-color: hsl(0 0% 100%) !important; }
      .light .text-foreground { color: hsl(224 71.4% 4.1%) !important; }
      .light .text-muted-foreground { color: hsl(220 8.9% 46.1%) !important; }
      .light .text-card-foreground { color: hsl(224 71.4% 4.1%) !important; }
      .light h1, .light h2, .light h3, .light h4, .light h5, .light h6 { color: hsl(224 71.4% 4.1%) !important; }
      .light p, .light span, .light div { color: hsl(224 71.4% 4.1%) !important; }
      .light label { color: hsl(224 71.4% 4.1%) !important; }
      .light small { color: hsl(224 71.4% 4.1%) !important; }
      
      /* Light theme cards and surfaces */
      .light .bg-card { background-color: hsl(0 0% 100%) !important; }
      .light .bg-background { background-color: hsl(0 0% 100%) !important; }
      .light .bg-muted { background-color: hsl(220 14.3% 95.9%) !important; }
      .light .bg-accent { background-color: hsl(220 14.3% 95.9%) !important; }
      .light .bg-muted\\/50 { background-color: hsl(220 14.3% 95.9% / 0.5) !important; }
      .light .bg-muted\\/30 { background-color: hsl(220 14.3% 95.9% / 0.3) !important; }
      .light .border-b { border-color: hsl(220 13% 91%) !important; }
      .light .bg-white { background-color: hsl(0 0% 100%) !important; }
      
      /* Light theme button and interactive elements */
      .light button { color: hsl(224 71.4% 4.1%) !important; }
      .light .btn-outline { 
        color: hsl(224 71.4% 4.1%) !important; 
        border-color: hsl(220 13% 91%) !important; 
        background-color: hsl(0 0% 100%) !important; 
      }
      .light .btn-outline:hover { 
        background-color: hsl(220 14.3% 95.9%) !important; 
        color: hsl(224 71.4% 4.1%) !important; 
      }
      
      /* Light theme form elements */
      .light input, .light textarea, .light select { 
        background-color: hsl(0 0% 100%) !important; 
        color: hsl(224 71.4% 4.1%) !important; 
        border-color: hsl(220 13% 91%) !important;
      }
      .light input::placeholder, .light textarea::placeholder { 
        color: hsl(220 8.9% 46.1%) !important; 
      }
      
      /* Light/Dark toggle styling for both themes */
      .dark .bg-muted\\/50 button { 
        color: hsl(210 20% 98%) !important; 
        background-color: transparent !important; 
        border: 1px solid transparent !important;
      }
      .dark .bg-muted\\/50 button.bg-primary { 
        background-color: hsl(${currentColors.primary.main}) !important; 
        color: hsl(224 71.4% 4.1%) !important; 
        border-color: hsl(${currentColors.primary.main}) !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
      }
      .dark .bg-muted\\/50 button:hover:not(.bg-primary) { 
        background-color: hsl(215 27.9% 16.9%) !important; 
        color: hsl(210 20% 98%) !important;
      }
      
      .light .bg-muted\\/50 button { 
        color: hsl(224 71.4% 4.1%) !important; 
        background-color: transparent !important; 
        border: 1px solid transparent !important;
      }
      .light .bg-muted\\/50 button.bg-primary { 
        background-color: hsl(${currentColors.primary.main}) !important; 
        color: hsl(0 0% 100%) !important; 
        border-color: hsl(${currentColors.primary.main}) !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
      }
      .light .bg-muted\\/50 button:hover:not(.bg-primary) { 
        background-color: hsl(220 14.3% 95.9%) !important; 
        color: hsl(224 71.4% 4.1%) !important;
      }
      
      /* Text color overrides for all text sizes and types */
      .light .text-xs, .light .text-sm, .light .text-base, .light .text-lg { color: hsl(224 71.4% 4.1%) !important; }
      .light .text-gray-500, .light .text-gray-600 { color: hsl(220 8.9% 46.1%) !important; }
      .light .text-gray-700, .light .text-gray-800, .light .text-gray-900 { color: hsl(224 71.4% 4.1%) !important; }
      
      .dark .text-xs, .dark .text-sm, .dark .text-base, .dark .text-lg { color: hsl(210 20% 98%) !important; }
      .dark .text-gray-500, .dark .text-gray-600 { color: hsl(210 20% 98%) !important; }
      .dark .text-gray-700, .dark .text-gray-800, .dark .text-gray-900 { color: hsl(210 20% 98%) !important; }
      
      /* DROPDOWN AND SELECT MENUS - CRITICAL FIX */
      /* Dark theme dropdowns */
      .dark [data-radix-select-content] { 
        background-color: hsl(215 27.9% 16.9%) !important; 
        color: hsl(210 20% 98%) !important; 
        border-color: hsl(215 27.9% 16.9%) !important;
      }
      .dark [data-radix-select-item] { 
        color: hsl(210 20% 98%) !important; 
        background-color: transparent !important;
      }
      .dark [data-radix-select-item]:hover,
      .dark [data-radix-select-item][data-highlighted] { 
        background-color: hsl(224 71.4% 4.1%) !important; 
        color: hsl(210 20% 98%) !important; 
      }
      .dark .bg-popover { background-color: hsl(215 27.9% 16.9%) !important; }
      .dark .text-popover-foreground { color: hsl(210 20% 98%) !important; }
      
      /* Light theme dropdowns */
      .light [data-radix-select-content] { 
        background-color: hsl(0 0% 100%) !important; 
        color: hsl(224 71.4% 4.1%) !important; 
        border-color: hsl(220 13% 91%) !important;
      }
      .light [data-radix-select-item] { 
        color: hsl(224 71.4% 4.1%) !important; 
        background-color: transparent !important;
      }
      .light [data-radix-select-item]:hover,
      .light [data-radix-select-item][data-highlighted] { 
        background-color: hsl(220 14.3% 95.9%) !important; 
        color: hsl(224 71.4% 4.1%) !important; 
      }
      .light .bg-popover { background-color: hsl(0 0% 100%) !important; }
      .light .text-popover-foreground { color: hsl(224 71.4% 4.1%) !important; }
      
      /* Dropdown menu components */
      .dark [data-radix-dropdown-menu-content] { 
        background-color: hsl(215 27.9% 16.9%) !important; 
        color: hsl(210 20% 98%) !important; 
        border-color: hsl(215 27.9% 16.9%) !important;
      }
      .dark [data-radix-dropdown-menu-item] { 
        color: hsl(210 20% 98%) !important; 
      }
      .dark [data-radix-dropdown-menu-item]:hover { 
        background-color: hsl(224 71.4% 4.1%) !important; 
        color: hsl(210 20% 98%) !important; 
      }
      
      .light [data-radix-dropdown-menu-content] { 
        background-color: hsl(0 0% 100%) !important; 
        color: hsl(224 71.4% 4.1%) !important; 
        border-color: hsl(220 13% 91%) !important;
      }
      .light [data-radix-dropdown-menu-item] { 
        color: hsl(224 71.4% 4.1%) !important; 
      }
      .light [data-radix-dropdown-menu-item]:hover { 
        background-color: hsl(220 14.3% 95.9%) !important; 
        color: hsl(224 71.4% 4.1%) !important; 
      }
      
      /* FORM BUILDER COMPONENTS - CRITICAL FIXES */
      /* Dark theme form builder */
      .dark .border-r { border-color: hsl(215 27.9% 16.9%) !important; }
      .dark .border-l { border-color: hsl(215 27.9% 16.9%) !important; }
      .dark .border-b { border-color: hsl(215 27.9% 16.9%) !important; }
      .dark .bg-gray-50 { background-color: hsl(215 27.9% 16.9%) !important; }
      .dark .text-gray-400 { color: hsl(210 20% 98%) !important; }
      .dark .text-gray-500 { color: hsl(210 20% 98%) !important; }
      .dark .text-gray-600 { color: hsl(210 20% 98%) !important; }
      .dark .text-gray-700 { color: hsl(210 20% 98%) !important; }
      .dark .placeholder\\:text-gray-400::placeholder { color: hsl(217.9 10.6% 64.9%) !important; }
      
      /* Dark theme drag and drop states */
      .dark .bg-indigo-50 { background-color: hsl(215 27.9% 16.9%) !important; }
      .dark .border-indigo-500 { border-color: hsl(${currentColors.primary.main}) !important; }
      .dark .ring-indigo-500 { --tw-ring-color: hsl(${currentColors.primary.main}) !important; }
      .dark .border-dashed { border-color: hsl(215 27.9% 16.9%) !important; }
      .dark .text-indigo-600 { color: hsl(${currentColors.primary.main}) !important; }
      
      /* Dark theme field cards and buttons */
      .dark .disabled\\:bg-gray-50:disabled { background-color: hsl(215 27.9% 16.9%) !important; }
      .dark .bg-blue-50 { background-color: hsl(215 27.9% 16.9%) !important; }
      .dark .text-blue-700 { color: hsl(${currentColors.primary.main}) !important; }
      .dark .border-blue-200 { border-color: hsl(${currentColors.primary.main}) !important; }
      
      /* Light theme form builder */
      .light .border-r { border-color: hsl(220 13% 91%) !important; }
      .light .border-l { border-color: hsl(220 13% 91%) !important; }
      .light .border-b { border-color: hsl(220 13% 91%) !important; }
      .light .bg-gray-50 { background-color: hsl(220 14.3% 95.9%) !important; }
      .light .text-gray-400 { color: hsl(220 8.9% 46.1%) !important; }
      .light .text-gray-500 { color: hsl(220 8.9% 46.1%) !important; }
      .light .text-gray-600 { color: hsl(220 8.9% 46.1%) !important; }
      .light .text-gray-700 { color: hsl(224 71.4% 4.1%) !important; }
      .light .placeholder\\:text-gray-400::placeholder { color: hsl(220 8.9% 46.1%) !important; }
      
      /* Light theme drag and drop states */
      .light .bg-indigo-50 { background-color: hsl(220 14.3% 95.9%) !important; }
      .light .border-indigo-500 { border-color: hsl(${currentColors.primary.main}) !important; }
      .light .ring-indigo-500 { --tw-ring-color: hsl(${currentColors.primary.main}) !important; }
      .light .border-dashed { border-color: hsl(220 13% 91%) !important; }
      .light .text-indigo-600 { color: hsl(${currentColors.primary.main}) !important; }
      
      /* Light theme field cards and buttons */
      .light .disabled\\:bg-gray-50:disabled { background-color: hsl(220 14.3% 95.9%) !important; }
      .light .bg-blue-50 { background-color: hsl(220 14.3% 95.9%) !important; }
      .light .text-blue-700 { color: hsl(${currentColors.primary.main}) !important; }
      .light .border-blue-200 { border-color: hsl(${currentColors.primary.main}) !important; }
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
