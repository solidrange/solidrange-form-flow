
import { useState } from "react";
import { FormSubmission } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Eye, RefreshCw, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SubmissionActionsProps {
  submission: FormSubmission;
  onUpdateSubmission: (submissionId: string, updates: Partial<FormSubmission>) => void;
  onResendForm: (submissionId: string, comments: string) => void;
}

export const SubmissionActions = ({ submission, onUpdateSubmission, onResendForm }: SubmissionActionsProps) => {
  const [reviewComments, setReviewComments] = useState("");

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

  const renderActionButtons = () => {
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
        
      default: // submitted, under_review
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
        <CardTitle className="text-lg">Review Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="review-comments">Review Comments</Label>
          <Textarea
            id="review-comments"
            value={reviewComments}
            onChange={(e) => setReviewComments(e.target.value)}
            placeholder="Add comments about this submission..."
            className="mt-1"
            rows={3}
          />
        </div>
        
        {renderActionButtons()}
      </CardContent>
    </Card>
  );
};
