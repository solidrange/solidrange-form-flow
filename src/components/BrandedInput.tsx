
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
  const { getPrimaryColor } = useBranding();

  const getBrandedStyles = () => {
    if (!useBranding) return {};
    
    return {
      '--ring-color': getPrimaryColor(),
      '--border-color': getPrimaryColor(),
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
