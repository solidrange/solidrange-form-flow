
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  className
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "min-h-screen bg-background transition-all duration-300",
      isMobile ? "pb-16" : "pb-4",
      className
    )}>
      <div className={cn(
        "container mx-auto transition-all duration-300",
        isMobile ? "px-2 py-2" : "px-4 py-4 lg:px-6 lg:py-6"
      )}>
        {children}
      </div>
    </div>
  );
};
