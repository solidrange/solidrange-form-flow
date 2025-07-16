
import React from 'react';
import { Card } from '@/components/ui/card';
import { useBranding } from './BrandingProvider';
import { cn } from '@/lib/utils';

interface BrandedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  enableBranding?: boolean;
  brandAccent?: boolean;
}

export const BrandedCard: React.FC<BrandedCardProps> = ({
  children,
  className,
  enableBranding = true,
  brandAccent = false,
  ...props
}) => {
  let brandingContext = null;
  
  try {
    brandingContext = useBranding();
  } catch (error) {
    // If branding context is not available, fall back to default styling
    console.warn('BrandedCard: BrandingProvider not available, using default styling');
  }

  const getBrandedStyles = () => {
    if (!enableBranding || !brandingContext) return {};
    
    return brandAccent ? {
      borderTopColor: brandingContext.getPrimaryColor(),
      borderTopWidth: '3px',
      borderTopStyle: 'solid' as const,
    } : {};
  };

  return (
    <Card
      className={cn(
        enableBranding && brandAccent && brandingContext && 'border-t-3',
        'transition-all duration-200',
        className
      )}
      style={getBrandedStyles()}
      {...props}
    >
      {children}
    </Card>
  );
};
