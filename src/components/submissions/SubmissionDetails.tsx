import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, AlertTriangle, Building, User } from "lucide-react";

interface SubmissionDetailsProps {
  submission: FormSubmission;
  form: Form;
}

export const SubmissionDetails = ({ submission, form }: SubmissionDetailsProps) => {
  /**
   * Calculate the completion percentage based on required fields
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
   * Get user-friendly completion status text
   */
  const getCompletionStatus = (submission: FormSubmission) => {
    const percentage = calculateCompletionPercentage(submission);
    
    if (submission.status === 'approved') return 'Completed';
    if (submission.status === 'under_review') return 'Under Processing';
    if (percentage < 100) return 'Not Completed';
    return 'Completed';
  };

  /**
   * Get appropriate styling for status badges
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
   * Format submitter display name based on submission type
   */
  const getSubmitterDisplay = (submission: FormSubmission) => {
    if (submission.submissionType === 'vendor') {
      return {
        name: submission.submitterName || 'Unknown User',
        email: submission.submitterEmail,
        company: submission.companyName || 'Unknown Company',
        type: 'Vendor Submission'
      };
    } else if (submission.submissionType === 'external') {
      return {
        name: submission.submitterName || 'External User',
        email: submission.submitterEmail,
        company: submission.companyName || 'External Organization',
        type: 'External Submission'
      };
    } else {
      return {
        name: submission.submitterName || 'Internal User',
        email: submission.submitterEmail,
        company: 'Internal',
        type: 'Internal Submission'
      };
    }
  };

  const completionPercentage = calculateCompletionPercentage(submission);
  const completionStatus = getCompletionStatus(submission);
  const submitterInfo = getSubmitterDisplay(submission);

  return (
    <div className="space-y-6">
      {/* Submitter Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            {submission.submissionType === 'vendor' ? (
              <Building className="h-5 w-5 text-blue-600" />
            ) : submission.submissionType === 'external' ? (
              <User className="h-5 w-5 text-purple-600" />
            ) : (
              <User className="h-5 w-5 text-blue-600" />
            )}
            Submitter Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-500">Name</Label>
              <p className="text-sm font-medium">{submitterInfo.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Email</Label>
              <p className="text-sm">{submitterInfo.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Organization</Label>
              <p className="text-sm">{submitterInfo.company}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-500">Submission Type</Label>
              <Badge variant={
                submission.submissionType === 'vendor' ? 'default' : 
                submission.submissionType === 'external' ? 'outline' : 
                'secondary'
              }>
                {submitterInfo.type}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submission Status Information */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <Label className="text-sm font-medium text-gray-500">Submitted At</Label>
          <p className="text-sm">{new Date(submission.submittedAt).toLocaleString()}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Time Spent</Label>
          <p className="text-sm">{submission.timeSpent ? `${submission.timeSpent} minutes` : 'Not tracked'}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Completion</Label>
          <div className="flex items-center gap-2">
            <p className="text-sm">{completionPercentage}%</p>
            <Badge variant="outline" className="text-xs">
              {completionStatus}
            </Badge>
          </div>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Status</Label>
          <Badge className={getStatusColor(submission.status, completionPercentage)}>
            {submission.status.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      {/* Completion Warning for incomplete submissions */}
      {completionPercentage < 100 && submission.status === 'submitted' && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <p className="text-sm text-orange-700">
                This submission is incomplete. {form.fields.filter(f => f.required).length - form.fields.filter(field => {
                  const value = submission.responses[field.id];
                  return field.required && (value !== null && value !== undefined && value !== '' && 
                         !(Array.isArray(value) && value.length === 0));
                }).length} required field(s) still need to be completed.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Score Information */}
      {submission.score && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Score Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Total Score</Label>
                <p className="text-2xl font-bold">
                  {submission.score.total}/{submission.score.maxTotal}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Percentage</Label>
                <p className="text-2xl font-bold">{submission.score.percentage}%</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Risk Level</Label>
                <Badge variant={submission.score.riskLevel === 'critical' ? 'destructive' : 'outline'}>
                  {submission.score.riskLevel}
                </Badge>
              </div>
            </div>

            {/* Category Scores Display */}
            {submission.score.categoryScores && (
              <div>
                <Label className="text-sm font-medium text-gray-500 mb-2 block">Category Scores</Label>
                <div className="space-y-2">
                  {Object.entries(submission.score.categoryScores).map(([category, score]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm">{category}</span>
                      <Badge variant="outline">{score}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Form Responses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Form Responses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(submission.responses).map(([fieldKey, response]) => {
            const hasResponse = response !== null && response !== undefined && response !== '' && 
                               !(Array.isArray(response) && response.length === 0);
            
            return (
              <div key={fieldKey} className="border-b pb-3 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <Label className="font-medium flex items-center gap-2">
                    {fieldKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Label>
                  <div className="flex items-center gap-2">
                    {hasResponse ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {hasResponse ? (
                    <span>
                      {Array.isArray(response) ? response.join(', ') : 
                       typeof response === 'object' ? JSON.stringify(response, null, 2) :
                       String(response)}
                    </span>
                  ) : (
                    <span className="italic text-gray-400">
                      No response provided
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
