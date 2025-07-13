
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useBranding } from './BrandingProvider';
import { cn } from '@/lib/utils';

interface BrandedButtonProps extends ButtonProps {
  brandVariant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  useBranding?: boolean;
}

export const BrandedButton: React.FC<BrandedButtonProps> = ({ 
  children, 
  className, 
  brandVariant = 'primary',
  useBranding = true,
  ...props 
}) => {
  const brandingContext = useBranding();

  const getBrandedStyles = () => {
    if (!useBranding || !brandingContext) return {};
    
    switch (brandVariant) {
      case 'primary':
        return {
          backgroundColor: brandingContext.getPrimaryColor(),
          borderColor: brandingContext.getPrimaryColor(),
          color: 'white',
        };
      case 'secondary':
        return {
          backgroundColor: brandingContext.getSecondaryColor(),
          borderColor: brandingContext.getSecondaryColor(),
          color: 'white',
        };
      case 'outline':
        return {
          borderColor: brandingContext.getPrimaryColor(),
          color: brandingContext.getPrimaryColor(),
          backgroundColor: 'transparent',
        };
      case 'ghost':
        return {
          color: brandingContext.getPrimaryColor(),
          backgroundColor: 'transparent',
        };
      default:
        return {};
    }
  };

  const getBrandedHoverStyles = () => {
    if (!useBranding || !brandingContext) return {};
    
    const baseStyle = getBrandedStyles();
    return {
      ...baseStyle,
      filter: 'brightness(0.9)',
    };
  };

  return (
    <Button
      className={cn(
        'transition-all duration-200 hover:brightness-90',
        useBranding && 'brand-focus',
        className
      )}
      style={getBrandedStyles()}
      onMouseEnter={(e) => {
        if (useBranding && brandingContext) {
          Object.assign(e.currentTarget.style, getBrandedHoverStyles());
        }
      }}
      onMouseLeave={(e) => {
        if (useBranding && brandingContext) {
          Object.assign(e.currentTarget.style, getBrandedStyles());
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
