
import { useState } from "react";
import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Eye, RefreshCw, AlertTriangle, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SubmissionActionsProps {
  submission: FormSubmission;
  form: Form;
  onUpdateSubmission: (submissionId: string, updates: Partial<FormSubmission>) => void;
  onResendForm: (submissionId: string, comments: string) => void;
}

export const SubmissionActions = ({ submission, form, onUpdateSubmission, onResendForm }: SubmissionActionsProps) => {
  const [reviewComments, setReviewComments] = useState("");

  const calculateCompletionPercentage = (submission: FormSubmission) => {
    if (form.fields.length === 0) return 0;
    
    const requiredFields = form.fields.filter(field => field.required);
    if (requiredFields.length === 0) return 100;
    
    const completedRequiredFields = requiredFields.filter(field => {
      const value = submission.responses[field.id];
      return value !== null && value !== undefined && value !== '' && 
             !(Array.isArray(value) && value.length === 0);
    }).length;
    
    return Math.round((completedRequiredFields / requiredFields.length) * 100);
  };

  const isFormComplete = () => {
    const completionPercentage = calculateCompletionPercentage(submission);
    return completionPercentage === 100 || submission.status === 'approved' || submission.status === 'under_review';
  };

  const handleStatusChange = (status: 'approved' | 'rejected' | 'under_review') => {
    onUpdateSubmission(submission.id, {
      status,
      score: {
        ...submission.score,
        reviewedBy: 'Current User',
        reviewedAt: new Date(),
        reviewComments
      } as any
    });
    
    const statusMessages = {
      approved: "Submission Approved",
      rejected: "Submission Rejected", 
      under_review: "Submission Under Review"
    };
    
    toast({
      title: statusMessages[status],
      description: `The submission has been marked as ${status.replace('_', ' ')}.`,
    });

    setReviewComments("");
  };

  const handleResendForm = () => {
    if (!reviewComments.trim()) {
      toast({
        title: "Comments Required",
        description: "Please add comments before resending the form.",
        variant: "destructive"
      });
      return;
    }

    onResendForm(submission.id, reviewComments);
    onUpdateSubmission(submission.id, { status: 'under_review' });
    
    toast({
      title: "Form Resent",
      description: "The form has been resent to the user with your comments.",
    });

    setReviewComments("");
  };

  const handleSendReminder = () => {
    toast({
      title: "Reminder Sent",
      description: "A reminder email has been sent to complete the form.",
    });
  };

  const renderActionButtons = () => {
    // If form is not complete, only show Send Reminder
    if (!isFormComplete() && submission.status === 'submitted') {
      return (
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleSendReminder}
            variant="outline"
            className="bg-blue-50 hover:bg-blue-100"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Reminder
          </Button>
        </div>
      );
    }

    switch (submission.status) {
      case 'approved':
        return (
          <div className="flex items-center gap-3 flex-wrap">
            <Button 
              onClick={() => handleStatusChange('rejected')}
              variant="destructive"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button 
              onClick={() => handleStatusChange('under_review')}
              variant="outline"
            >
              <Eye className="h-4 w-4 mr-2" />
              Request More Info
            </Button>
            <Button 
              onClick={handleResendForm}
              variant="outline"
              className="bg-blue-50 hover:bg-blue-100"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Resend Form
            </Button>
          </div>
        );
        
      case 'rejected':
        return (
          <div className="flex items-center gap-3 flex-wrap">
            <Button 
              onClick={() => handleStatusChange('approved')}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button 
              onClick={() => handleStatusChange('under_review')}
              variant="outline"
            >
              <Eye className="h-4 w-4 mr-2" />
              Request More Info
            </Button>
            <Button 
              onClick={handleResendForm}
              variant="outline"
              className="bg-blue-50 hover:bg-blue-100"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Resend Form
            </Button>
          </div>
        );
        
      default: // submitted, under_review (when complete)
        return (
          <div className="flex items-center gap-3 flex-wrap">
            <Button 
              onClick={() => handleStatusChange('approved')}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button 
              onClick={() => handleStatusChange('rejected')}
              variant="destructive"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button 
              onClick={() => handleStatusChange('under_review')}
              variant="outline"
            >
              <Eye className="h-4 w-4 mr-2" />
              Request More Info
            </Button>
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Review Actions
          {!isFormComplete() && submission.status === 'submitted' && (
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          )}
        </CardTitle>
        {!isFormComplete() && submission.status === 'submitted' && (
          <p className="text-sm text-orange-600">
            This form is incomplete. Only reminder can be sent until all required fields are completed.
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="review-comments">
            {!isFormComplete() && submission.status === 'submitted' ? 'Reminder Message' : 'Review Comments'}
          </Label>
          <Textarea
            id="review-comments"
            value={reviewComments}
            onChange={(e) => setReviewComments(e.target.value)}
            placeholder={
              !isFormComplete() && submission.status === 'submitted' 
                ? "Add a message to remind the user to complete the form..."
                : "Add comments about this submission..."
            }
            className="mt-1"
            rows={3}
          />
        </div>
        
        {renderActionButtons()}
      </CardContent>
    </Card>
  );
};
