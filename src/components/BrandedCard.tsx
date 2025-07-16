
import React from 'react';
import { Card, CardProps } from '@/components/ui/card';
import { useBranding } from './BrandingProvider';
import { cn } from '@/lib/utils';

interface BrandedCardProps extends CardProps {
  useBranding?: boolean;
  brandAccent?: boolean;
}

export const BrandedCard: React.FC<BrandedCardProps> = ({
  children,
  className,
  useBranding = true,
  brandAccent = false,
  ...props
}) => {
  const { getPrimaryColor } = useBranding();

  const getBrandedStyles = () => {
    if (!useBranding) return {};
    
    return brandAccent ? {
      borderTopColor: getPrimaryColor(),
      borderTopWidth: '3px',
      borderTopStyle: 'solid',
    } : {};
  };

  return (
    <Card
      className={cn(
        useBranding && brandAccent && 'border-t-3',
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
