
import { useState } from "react";
import { FormSubmission } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Eye, RefreshCw, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SubmissionActionsProps {
  submission: FormSubmission;
  onUpdateSubmission: (submissionId: string, updates: Partial<FormSubmission>) => void;
  onResendForm: (submissionId: string, comments: string) => void;
}

export const SubmissionActions = ({ submission, onUpdateSubmission, onResendForm }: SubmissionActionsProps) => {
  const [reviewComments, setReviewComments] = useState("");

  const handleApproval = (status: 'approved' | 'rejected') => {
    onUpdateSubmission(submission.id, {
      status,
      score: {
        ...submission.score,
        reviewedBy: 'Current User',
        reviewedAt: new Date(),
        reviewComments
      } as any
    });
    
    toast({
      title: status === 'approved' ? "Submission Approved" : "Submission Rejected",
      description: `The submission has been ${status}.`,
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
    toast({
      title: "Form Resent",
      description: "The form has been resent to the user with your comments.",
    });

    setReviewComments("");
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
        
        <div className="flex items-center gap-3 flex-wrap">
          <Button 
            onClick={() => handleApproval('approved')}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button 
            onClick={() => handleApproval('rejected')}
            variant="destructive"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Reject
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Request More Info
          </Button>
          {submission.status === 'rejected' && (
            <Button 
              onClick={handleResendForm}
              variant="outline"
              className="bg-blue-50 hover:bg-blue-100"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Resend Form
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
