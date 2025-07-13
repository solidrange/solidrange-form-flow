
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AnimatedCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: LucideIcon;
  iconColor?: string;
  hover?: boolean;
  delay?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  children,
  className,
  icon: Icon,
  iconColor = "text-primary",
  hover = true,
  delay = 0
}) => {
  return (
    <Card 
      className={cn(
        "animate-fade-in transition-all duration-300",
        hover && "hover:shadow-lg hover:-translate-y-1 hover:border-primary/20",
        "border-l-4 border-l-primary/20",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
            {Icon && (
              <Icon className={cn("h-4 w-4 lg:h-5 lg:w-5", iconColor)} />
            )}
            <span className="truncate">{title}</span>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(title ? "pt-0" : "pt-6")}>
        {children}
      </CardContent>
    </Card>
  );
};
