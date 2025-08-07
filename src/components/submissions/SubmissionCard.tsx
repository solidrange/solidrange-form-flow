import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, CheckCircle, XCircle, Clock, Building, AlertTriangle } from "lucide-react";

interface SubmissionCardProps {
  submission: FormSubmission;
  form: Form;
  isSelected: boolean;
  onClick: () => void;
}

export const SubmissionCard = ({ submission, form, isSelected, onClick }: SubmissionCardProps) => {
  /**
   * Calculate completion percentage based on required fields
   */
  const calculateCompletionPercentage = (submission: FormSubmission) => {
    if (form.fields.length === 0) return 0;
    
    // If approved or under review, show 100% completion
    if (submission.status === 'approved' || submission.status === 'under_review') {
      return 100;
    }
    
    const requiredFields = form.fields.filter(field => field.required);
    if (requiredFields.length === 0) return 100;
    
    const completedRequiredFields = requiredFields.filter(field => {
      const value = submission.responses[field.id];
      return value !== null && value !== undefined && value !== '' && 
             !(Array.isArray(value) && value.length === 0);
    }).length;
    
    return Math.round((completedRequiredFields / requiredFields.length) * 100);
  };

  /**
   * Get user-friendly completion status
   */
  const getCompletionStatus = (submission: FormSubmission) => {
    const percentage = calculateCompletionPercentage(submission);
    
    if (submission.status === 'approved') return 'Completed';
    if (submission.status === 'under_review') return 'Under Processing';
    if (percentage < 100) return 'Not Completed';
    return 'Completed';
  };

  /**
   * Get appropriate icon for submission status
   */
  const getStatusIcon = (status: FormSubmission['status'], completionPercentage: number) => {
    if (completionPercentage < 100 && status === 'submitted') {
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    }
    
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'under_review':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  /**
   * Get appropriate color styling for status badges
   */
  const getStatusColor = (status: FormSubmission['status'], completionPercentage: number) => {
    if (completionPercentage < 100 && status === 'submitted') {
      return 'bg-orange-100 text-orange-800';
    }
    
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Get display information for the submitter
   */
  const getSubmitterDisplay = (submission: FormSubmission) => {
    if (submission.audience === 'vendor') {
      return {
        primary: submission.companyName || 'Unknown Company',
        secondary: submission.submitterName || 'Unknown User',
        email: submission.submitterEmail
      };
    } else if (submission.audience === 'external') {
      return {
        primary: submission.companyName || 'External Organization',
        secondary: submission.submitterName || 'External User',
        email: submission.submitterEmail
      };
    } else {
      return {
        primary: submission.submitterName || 'Internal User',
        secondary: submission.submitterEmail,
        email: submission.submitterEmail
      };
    }
  };

  const completionPercentage = calculateCompletionPercentage(submission);
  const completionStatus = getCompletionStatus(submission);
  const submitterInfo = getSubmitterDisplay(submission);

  return (
    <Card 
      className={`cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? 'ring-1 sm:ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-2 sm:p-3 lg:p-4">
        {/* Header with submitter info and status */}
        <div className="flex items-start justify-between mb-2 gap-2">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
            {submission.audience === 'vendor' ? (
              <Building className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 shrink-0" />
            ) : submission.audience === 'external' ? (
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 shrink-0" />
            ) : (
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 shrink-0" />
            )}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs sm:text-sm font-medium truncate leading-tight">
                {submitterInfo.primary}
              </span>
              {submitterInfo.secondary && (
                <span className="text-xs text-gray-500 truncate leading-tight">
                  {submitterInfo.secondary}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center shrink-0">
            {getStatusIcon(submission.status, completionPercentage)}
          </div>
        </div>
        
        {/* Progress and status information */}
        <div className="space-y-1 sm:space-y-2">
          {/* Completion progress */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-1 sm:h-2" />
          
          {/* Status badges row */}
          <div className="flex items-center justify-between gap-1 flex-wrap">
            <Badge variant="outline" className="text-xs px-1 sm:px-2 py-0 sm:py-1 leading-tight">
              {completionStatus}
            </Badge>
            <Badge className={`text-xs px-1 sm:px-2 py-0 sm:py-1 leading-tight ${getStatusColor(submission.status, completionPercentage)}`}>
              {submission.status.replace('_', ' ')}
            </Badge>
          </div>
          
          {/* Score and type row */}
          <div className="flex items-center justify-between gap-1 text-xs">
            {submission.score && (
              <Badge variant="outline" className="text-xs px-1 py-0 leading-tight">
                {submission.score.total}/{submission.score.maxTotal}
              </Badge>
            )}
            <Badge variant="outline" className="text-xs px-1 py-0 leading-tight">
              {submission.audience === 'vendor' ? 'Vendor' : 
               submission.audience === 'external' ? 'External' : 'Internal'}
            </Badge>
          </div>
          
          {/* Date and time row */}
          <div className="flex items-center justify-between gap-1 text-xs text-gray-500">
            <span className="truncate">
              {new Date(submission.submittedAt).toLocaleDateString()}
            </span>
            {submission.timeSpent && (
              <span className="whitespace-nowrap">
                {submission.timeSpent}min
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
