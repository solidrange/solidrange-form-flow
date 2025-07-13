
import React from 'react';
import { Card, CardProps } from '@/components/ui/card';
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
  const brandingContext = useBranding();

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
        enableBranding && brandAccent && 'border-t-3',
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
