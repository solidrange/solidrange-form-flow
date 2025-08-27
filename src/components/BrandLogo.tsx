import React from 'react';
import { useBrand } from '@/contexts/BrandContext';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  showText = true,
  className,
  onClick
}) => {
  const { brand } = useBrand();

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-bold',
    xl: 'text-3xl font-bold'
  };

  const DefaultLogo = () => (
    <div 
      className={cn(
        sizeClasses[size],
        'rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold shadow-lg',
        size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-xl'
      )}
      style={{
        background: `linear-gradient(135deg, hsl(${brand.lightTheme.colors.primary.main}), hsl(${brand.lightTheme.colors.secondary.main}))`
      }}
    >
      {brand.name.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <div 
      className={cn(
        'flex items-center gap-2 cursor-pointer select-none',
        className
      )}
      onClick={onClick}
    >
      {brand.logo ? (
        <img 
          src={brand.logo} 
          alt={`${brand.name} logo`}
          className={cn(sizeClasses[size], 'object-contain')}
        />
      ) : (
        <DefaultLogo />
      )}
      
      {showText && (
        <div className="flex flex-col">
          <span 
            className={cn(
              textSizeClasses[size],
              'text-foreground leading-tight'
            )}
            style={{ color: `hsl(${brand.lightTheme.colors.primary.main})` }}
          >
            {brand.name}
          </span>
          {brand.tagline && (
            <span className="text-xs text-muted-foreground leading-tight">
              {brand.tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );
};