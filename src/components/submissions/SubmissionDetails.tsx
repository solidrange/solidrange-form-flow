
import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface SubmissionDetailsProps {
  submission: FormSubmission;
  form: Form;
}

export const SubmissionDetails = ({ submission, form }: SubmissionDetailsProps) => {
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
    <div className="space-y-6">
      {/* Submission Info */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <Label className="text-sm font-medium text-gray-500">Submitted By</Label>
          <p className="text-sm">{submission.companyName || submission.recipientId || 'Anonymous'}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Submitted At</Label>
          <p className="text-sm">{new Date(submission.submittedAt).toLocaleString()}</p>
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

      {/* Completion Warning */}
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
          {form.fields.map((field) => {
            const response = submission.responses[field.id];
            const hasResponse = response !== null && response !== undefined && response !== '' && 
                               !(Array.isArray(response) && response.length === 0);
            
            return (
              <div key={field.id} className="border-b pb-3 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <Label className="font-medium flex items-center gap-2">
                    {field.label}
                    {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  <div className="flex items-center gap-2">
                    {hasResponse ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : field.required ? (
                      <XCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                    {field.scoring?.enabled && (
                      <Badge variant="outline">
                        {field.scoring.maxPoints} pts
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {hasResponse ? (
                    <span>{Array.isArray(response) ? response.join(', ') : String(response)}</span>
                  ) : (
                    <span className={`italic ${field.required ? 'text-red-400' : 'text-gray-400'}`}>
                      {field.required ? 'Required - No response' : 'No response'}
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
