
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeAwareStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const ThemeAwareStatsCard: React.FC<ThemeAwareStatsCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'default',
  className
}) => {
  const getIconColor = () => {
    switch (color) {
      case 'success':
        return 'themed-icon-success';
      case 'warning':
        return 'themed-icon-warning';
      case 'error':
        return 'themed-icon-error';
      case 'info':
        return 'themed-icon-primary';
      default:
        return 'themed-icon';
    }
  };

  const getValueColor = () => {
    switch (color) {
      case 'success':
        return 'text-green-600 dark:text-green-400';
      case 'warning':
        return 'text-orange-600 dark:text-orange-400';
      case 'error':
        return 'text-red-600 dark:text-red-400';
      case 'info':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Card className={cn("stats-card", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="stats-card-label">{title}</p>
            <p className={cn("stats-card-value", getValueColor())}>{value}</p>
            {trend && (
              <div className={cn(
                "text-xs flex items-center",
                trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}>
                <span className="mr-1">
                  {trend.isPositive ? '↗' : '↘'}
                </span>
                {Math.abs(trend.value)}%
              </div>
            )}
          </div>
          <Icon className={cn("h-8 w-8", getIconColor())} />
        </div>
      </CardContent>
    </Card>
  );
};
