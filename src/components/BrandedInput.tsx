
import React from 'react';
import { Input } from '@/components/ui/input';
import { useBranding } from './BrandingProvider';
import { cn } from '@/lib/utils';

interface BrandedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  useBranding?: boolean;
}

export const BrandedInput: React.FC<BrandedInputProps> = ({
  className,
  useBranding = true,
  ...props
}) => {
  const brandingContext = useBranding();

  const getBrandedStyles = () => {
    if (!useBranding || !brandingContext) return {};
    
    return {
      '--ring-color': brandingContext.getPrimaryColor(),
      '--border-color': brandingContext.getPrimaryColor(),
    } as React.CSSProperties;
  };

  return (
    <Input
      className={cn(
        useBranding && 'brand-focus brand-border',
        'transition-all duration-200',
        className
      )}
      style={getBrandedStyles()}
      {...props}
    />
  );
};
