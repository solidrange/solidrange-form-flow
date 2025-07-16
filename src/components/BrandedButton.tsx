
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
  const { getPrimaryColor, getSecondaryColor } = useBranding();

  const getBrandedStyles = () => {
    if (!useBranding) return {};
    
    switch (brandVariant) {
      case 'primary':
        return {
          backgroundColor: getPrimaryColor(),
          borderColor: getPrimaryColor(),
          color: 'white',
        };
      case 'secondary':
        return {
          backgroundColor: getSecondaryColor(),
          borderColor: getSecondaryColor(),
          color: 'white',
        };
      case 'outline':
        return {
          borderColor: getPrimaryColor(),
          color: getPrimaryColor(),
          backgroundColor: 'transparent',
        };
      case 'ghost':
        return {
          color: getPrimaryColor(),
          backgroundColor: 'transparent',
        };
      default:
        return {};
    }
  };

  const getBrandedHoverStyles = () => {
    if (!useBranding) return {};
    
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
        if (useBranding) {
          Object.assign(e.currentTarget.style, getBrandedHoverStyles());
        }
      }}
      onMouseLeave={(e) => {
        if (useBranding) {
          Object.assign(e.currentTarget.style, getBrandedStyles());
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
};
