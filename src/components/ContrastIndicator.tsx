import React from 'react';
import { evaluateContrast, ContrastResult } from '@/utils/colorContrast';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContrastIndicatorProps {
  foreground: string;
  background: string;
  label?: string;
  requirement?: 'normal' | 'large';
  showRatio?: boolean;
  compact?: boolean;
}

export const ContrastIndicator: React.FC<ContrastIndicatorProps> = ({
  foreground,
  background,
  label,
  requirement = 'normal',
  showRatio = true,
  compact = false
}) => {
  const result = evaluateContrast(foreground, background);
  const passes = requirement === 'normal' ? result.passesAA : result.passesAALarge;
  
  const getIcon = () => {
    if (result.passesAAA) return <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />;
    if (result.passesAA) return <CheckCircle className="h-3 w-3 text-green-500 dark:text-green-500" />;
    if (result.passesAALarge) return <AlertCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />;
    return <XCircle className="h-3 w-3 text-red-600 dark:text-red-400" />;
  };
  
  const getBadgeVariant = (): 'default' | 'secondary' | 'destructive' | 'outline' => {
    if (result.passesAA) return 'default';
    if (result.passesAALarge) return 'secondary';
    return 'destructive';
  };
  
  const getLevelLabel = () => {
    if (result.passesAAA) return 'AAA';
    if (result.passesAA) return 'AA';
    if (result.passesAALarge) return 'AA Large';
    return 'Fail';
  };
  
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        {getIcon()}
        <span className="text-xs text-muted-foreground">{result.ratio}:1</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {label && <span className="text-xs text-muted-foreground">{label}:</span>}
      <Badge variant={getBadgeVariant()} className="text-xs flex items-center gap-1">
        {getIcon()}
        <span>{getLevelLabel()}</span>
        {showRatio && <span className="opacity-75">({result.ratio}:1)</span>}
      </Badge>
    </div>
  );
};

interface ContrastPanelProps {
  colorPairs: Array<{
    name: string;
    foreground: string;
    background: string;
    requirement?: 'normal' | 'large';
  }>;
  title?: string;
}

export const ContrastPanel: React.FC<ContrastPanelProps> = ({ colorPairs, title }) => {
  const allPass = colorPairs.every(pair => {
    const result = evaluateContrast(pair.foreground, pair.background);
    return pair.requirement === 'large' ? result.passesAALarge : result.passesAA;
  });
  
  return (
    <div className="space-y-3 p-3 rounded-lg border bg-card">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">{title || 'Contrast Check'}</h4>
        <Badge variant={allPass ? 'default' : 'destructive'} className="text-xs">
          {allPass ? 'All Pass' : 'Issues Found'}
        </Badge>
      </div>
      
      <div className="space-y-2">
        {colorPairs.map((pair, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{pair.name}</span>
            <ContrastIndicator
              foreground={pair.foreground}
              background={pair.background}
              requirement={pair.requirement}
              compact
            />
          </div>
        ))}
      </div>
    </div>
  );
};
