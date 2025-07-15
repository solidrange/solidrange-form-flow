
import React from 'react';
import { FormSubmission } from '@/types/form';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  User, 
  Building, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeAwareSubmissionCardProps {
  submission: FormSubmission;
  isSelected: boolean;
  isSelectedForBulk: boolean;
  onSelect: () => void;
  onSelectForBulk: (checked: boolean) => void;
}

export const ThemeAwareSubmissionCard: React.FC<ThemeAwareSubmissionCardProps> = ({
  submission,
  isSelected,
  isSelectedForBulk,
  onSelect,
  onSelectForBulk
}) => {
  const getStatusBadge = (status: string) => {
    const baseClasses = "submission-badge";
    
    switch (status) {
      case 'submitted':
        return (
          <Badge className={cn(baseClasses, "submission-badge-pending")}>
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'under_review':
        return (
          <Badge className={cn(baseClasses, "submission-badge-under-review")}>
            <AlertTriangle className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        );
      case 'approved':
        return (
          <Badge className={cn(baseClasses, "submission-badge-approved")}>
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className={cn(baseClasses, "submission-badge-rejected")}>
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className={cn(baseClasses, "submission-badge-pending")}>
            <FileText className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
    }
  };

  const getRiskBadge = (riskLevel?: string) => {
    if (!riskLevel) return null;
    
    const riskColors = {
      low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    };

    return (
      <Badge className={cn("submission-badge", riskColors[riskLevel as keyof typeof riskColors])}>
        {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
      </Badge>
    );
  };

  return (
    <Card 
      className={cn(
        "submission-item",
        isSelected && "submission-item-selected"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={isSelectedForBulk}
              onCheckedChange={onSelectForBulk}
              onClick={(e) => e.stopPropagation()}
              className="focus-enhanced"
            />
            <div>
              {getStatusBadge(submission.status)}
              {submission.score?.riskLevel && (
                <div className="mt-1">
                  {getRiskBadge(submission.score.riskLevel)}
                </div>
              )}
            </div>
          </div>
          {submission.score && (
            <div className="text-right">
              <div className="stats-card-value text-lg">
                {submission.score.percentage}%
              </div>
              <div className="text-muted text-xs">Score</div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {submission.companyName && (
            <div className="flex items-center text-sm">
              <Building className="themed-icon w-4 h-4 mr-2" />
              <span className="text-body font-medium">{submission.companyName}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <User className="themed-icon w-4 h-4 mr-2" />
            <span className="text-body">
              {submission.submitterName || submission.submitterEmail}
            </span>
          </div>
          
          <div className="flex items-center text-sm">
            <Calendar className="themed-icon w-4 h-4 mr-2" />
            <span className="text-muted">
              {submission.submittedAt.toLocaleDateString()}
            </span>
          </div>
        </div>

        {submission.score?.details && (
          <div className="pt-2 border-t border-border">
            <div className="text-muted text-xs">
              Completed: {submission.score.details.completedFields}/{submission.score.details.totalFields} fields
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
