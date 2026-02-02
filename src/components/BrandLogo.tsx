import React from 'react';
import { useBrand } from '@/contexts/BrandContext';
import { cn } from '@/lib/utils';
import solidRangeLogo from '@/assets/solidrange-logo.svg';
import solidFormLogo from '@/assets/solidform-logo.png';

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

  // Increased text sizes for better hierarchy - product name should be larger than nav items
  const textSizeClasses = {
    sm: 'text-lg',      // Was text-sm, now larger for sidebar
    md: 'text-xl',      // Was text-lg
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const solidRangeLogoSizes = {
    sm: 'h-4',          // Slightly larger
    md: 'h-5',
    lg: 'h-6',
    xl: 'h-7'
  };

  const DefaultLogo = () => (
    <div 
      className={cn(
        sizeClasses[size],
        'rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold shadow-lg',
        size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-xl'
      )}
      style={{
        background: `linear-gradient(135deg, hsl(${brand.colors.primary.main}), hsl(${brand.colors.secondary.main}))`
      }}
    >
      {brand.name.charAt(0).toUpperCase()}
    </div>
  );

  // Parse the brand name to style "Solid" regular and "Form/Range" bold
  const renderStyledName = () => {
    const name = brand.name;
    if (name.toLowerCase().startsWith('solid')) {
      const prefix = name.slice(0, 5); // "Solid"
      const suffix = name.slice(5); // "Form" or "Range" etc.
      return (
        <span className={cn(textSizeClasses[size], 'text-foreground leading-tight')}>
          <span className="font-normal">{prefix}</span>
          <span className="font-bold">{suffix}</span>
        </span>
      );
    }
    return (
      <span className={cn(textSizeClasses[size], 'font-bold text-foreground leading-tight')}>
        {name}
      </span>
    );
  };

  const solidRangeLogoSizesLarge = {
    sm: 'h-6',          // Slightly larger for better visibility
    md: 'h-7',
    lg: 'h-9',
    xl: 'h-11'
  };

  return (
    <div 
      className={cn(
        'flex flex-col items-center text-center cursor-pointer select-none',
        className
      )}
      onClick={onClick}
    >
      {/* Product name on top */}
      {renderStyledName()}
      
      {/* SolidRange parent company logo - larger size */}
      <img 
        src={solidRangeLogo} 
        alt="SolidRange" 
        className={cn(solidRangeLogoSizesLarge[size], 'w-auto object-contain mt-1')}
      />
      
      {/* Tagline at the bottom */}
      {showText && brand.tagline && (
        <span className="text-[10px] text-muted-foreground leading-tight mt-1">
          {brand.tagline}
        </span>
      )}
    </div>
  );
};