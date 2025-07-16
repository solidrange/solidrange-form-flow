
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useBranding } from './BrandingProvider';
import { cn } from '@/lib/utils';

interface BrandedButtonProps extends ButtonProps {
  brandVariant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  enableBranding?: boolean;
}

export const BrandedButton: React.FC<BrandedButtonProps> = ({ 
  children, 
  className, 
  brandVariant = 'primary',
  enableBranding = true,
  ...props 
}) => {
  const brandingContext = useBranding();

  const getBrandedStyles = () => {
    if (!enableBranding || !brandingContext) return {};
    
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
    if (!enableBranding || !brandingContext) return {};
    
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
        enableBranding && 'brand-focus',
        className
      )}
      style={getBrandedStyles()}
      onMouseEnter={(e) => {
        if (enableBranding && brandingContext) {
          Object.assign(e.currentTarget.style, getBrandedHoverStyles());
        }
      }}
      onMouseLeave={(e) => {
        if (enableBranding && brandingContext) {
          Object.assign(e.currentTarget.style, getBrandedStyles());
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
