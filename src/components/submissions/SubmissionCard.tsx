
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

  const getCompletionStatus = (submission: FormSubmission) => {
    const percentage = calculateCompletionPercentage(submission);
    
    if (submission.status === 'approved') return 'Completed';
    if (submission.status === 'under_review') return 'Under Processing';
    if (percentage < 100) return 'Not Completed';
    return 'Completed';
  };

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

  const completionPercentage = calculateCompletionPercentage(submission);
  const completionStatus = getCompletionStatus(submission);

  return (
    <Card 
      className={`cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {submission.submissionType === 'vendor' ? (
              <Building className="h-4 w-4 text-gray-500" />
            ) : (
              <User className="h-4 w-4 text-gray-500" />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {submission.companyName || submission.recipientId || 'Anonymous'}
              </span>
              {submission.submissionType === 'vendor' && submission.companyName && (
                <span className="text-xs text-gray-500">{submission.recipientId}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {getStatusIcon(submission.status, completionPercentage)}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Completion</span>
            <span className="text-xs font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Status</span>
            <Badge variant="outline" className="text-xs">
              {completionStatus}
            </Badge>
          </div>
          
          {submission.score && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Score</span>
              <Badge variant="outline">
                {submission.score.total}/{submission.score.maxTotal}
              </Badge>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <Badge className={getStatusColor(submission.status, completionPercentage)}>
              {submission.status.replace('_', ' ')}
            </Badge>
            <span className="text-xs text-gray-500">
              {new Date(submission.submittedAt).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {submission.submissionType === 'vendor' ? 'Vendor' : 'Internal'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
