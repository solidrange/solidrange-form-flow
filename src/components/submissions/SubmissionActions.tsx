
import { useState } from "react";
import { FormSubmission, Form, ReviewActivity } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, XCircle, Eye, RefreshCw, AlertTriangle, Mail, Clock, FileText, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SubmissionActionsProps {
  submission: FormSubmission;
  form: Form;
  onUpdateSubmission: (submissionId: string, updates: Partial<FormSubmission>) => void;
  onResendForm: (submissionId: string, comments: string) => void;
}

export const SubmissionActions = ({ submission, form, onUpdateSubmission, onResendForm }: SubmissionActionsProps) => {
  const [reviewComments, setReviewComments] = useState("");
  const [actionType, setActionType] = useState<'simple' | 'advanced'>('simple');
  const [rejectionReason, setRejectionReason] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [requiredDocuments, setRequiredDocuments] = useState<string[]>([]);
  const [specificFields, setSpecificFields] = useState<string[]>([]);
  const [approvalType, setApprovalType] = useState<'fully' | 'partially'>('fully');

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

  // AI suggestion logic based on scoring
  const getApprovalSuggestion = (submission: FormSubmission) => {
    if (!submission.score) return { type: 'fully' as const, reason: 'No scoring data available' };
    
    const score = submission.score.percentage;
    const riskLevel = submission.score.riskLevel;
    
    if (score >= 85 && (riskLevel === 'low' || riskLevel === 'medium')) {
      return { 
        type: 'fully' as const, 
        reason: `High score (${score}%) with ${riskLevel} risk level indicates full compliance` 
      };
    } else if (score >= 60 && score < 85) {
      return { 
        type: 'partially' as const, 
        reason: `Moderate score (${score}%) suggests partial approval with conditions` 
      };
    } else if (score < 60 || riskLevel === 'high' || riskLevel === 'critical') {
      return { 
        type: 'partially' as const, 
        reason: `Low score (${score}%) or ${riskLevel} risk requires conditional approval` 
      };
    }
    
    return { type: 'fully' as const, reason: 'Standard approval criteria met' };
  };

  const isFormComplete = () => {
    const completionPercentage = calculateCompletionPercentage(submission);
    return completionPercentage === 100 || submission.status === 'approved' || submission.status === 'under_review';
  };

  const addActivityLog = (action: ReviewActivity['action'], comments: string, metadata?: ReviewActivity['metadata']) => {
    const newActivity: ReviewActivity = {
      id: Date.now().toString(),
      action,
      comments,
      reviewedBy: 'Current User',
      reviewedAt: new Date(),
      metadata
    };

    const updatedActivityLog = [...(submission.activityLog || []), newActivity];
    return updatedActivityLog;
  };

  const handleStatusChange = (status: 'approved' | 'rejected' | 'under_review') => {
    if (!reviewComments.trim()) {
      toast({
        title: "Comments Required",
        description: "Please add comments before changing the status.",
        variant: "destructive"
      });
      return;
    }

    if (status === 'approved' && !approvalType) {
      toast({
        title: "Approval Type Required",
        description: "Please select whether this is a full or partial approval.",
        variant: "destructive"
      });
      return;
    }

    const metadata = status === 'rejected' ? {
      reason: rejectionReason,
      urgency: urgencyLevel
    } : status === 'under_review' ? {
      urgency: urgencyLevel,
      specificFields: specificFields.length > 0 ? specificFields : undefined,
      requiredDocuments: requiredDocuments.length > 0 ? requiredDocuments : undefined
    } : status === 'approved' ? {
      approvalType: approvalType,
      urgency: urgencyLevel
    } : undefined;

    const activityLog = addActivityLog(status, reviewComments, metadata);

    onUpdateSubmission(submission.id, {
      status,
      approvalType: status === 'approved' ? approvalType : undefined,
      activityLog,
      score: {
        ...submission.score,
        reviewedBy: 'Current User',
        reviewedAt: new Date(),
        reviewComments
      } as any
    });
    
    const statusMessages = {
      approved: `Submission ${approvalType === 'fully' ? 'Fully' : 'Partially'} Approved`,
      rejected: "Submission Rejected", 
      under_review: "Submission Under Review"
    };
    
    toast({
      title: statusMessages[status],
      description: `The submission has been marked as ${status.replace('_', ' ')}.`,
    });

    resetForm();
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

    const metadata = {
      urgency: urgencyLevel,
      specificFields: specificFields.length > 0 ? specificFields : undefined,
      requiredDocuments: requiredDocuments.length > 0 ? requiredDocuments : undefined
    };

    const activityLog = addActivityLog('resent', reviewComments, metadata);

    onResendForm(submission.id, reviewComments);
    onUpdateSubmission(submission.id, { 
      status: 'under_review',
      activityLog
    });
    
    toast({
      title: "Form Resent",
      description: "The form has been resent to the user with your comments.",
    });

    resetForm();
  };

  const handleSendReminder = () => {
    if (!reviewComments.trim()) {
      toast({
        title: "Message Required",
        description: "Please add a reminder message.",
        variant: "destructive"
      });
      return;
    }

    const activityLog = addActivityLog('reminder_sent', reviewComments, { urgency: urgencyLevel });
    
    onUpdateSubmission(submission.id, { activityLog });

    toast({
      title: "Reminder Sent",
      description: "A reminder email has been sent to complete the form.",
    });

    resetForm();
  };

  const resetForm = () => {
    setReviewComments("");
    setRejectionReason("");
    setUrgencyLevel('medium');
    setRequiredDocuments([]);
    setSpecificFields([]);
    setActionType('simple');
    setApprovalType('fully');
  };

  const renderAdvancedOptions = () => {
    if (actionType !== 'advanced') return null;

    return (
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <Label htmlFor="urgency-select">Urgency Level</Label>
          <Select value={urgencyLevel} onValueChange={(value: 'low' | 'medium' | 'high') => setUrgencyLevel(value)}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="rejection-reason">Rejection Reason (if applicable)</Label>
          <Select value={rejectionReason} onValueChange={setRejectionReason}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select reason..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="incomplete_information">Incomplete Information</SelectItem>
              <SelectItem value="invalid_documents">Invalid Documents</SelectItem>
              <SelectItem value="policy_violation">Policy Violation</SelectItem>
              <SelectItem value="technical_issues">Technical Issues</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Specific Fields Needing Attention</Label>
          <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
            {form.fields.map((field) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`field-${field.id}`}
                  checked={specificFields.includes(field.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSpecificFields([...specificFields, field.id]);
                    } else {
                      setSpecificFields(specificFields.filter(id => id !== field.id));
                    }
                  }}
                />
                <Label htmlFor={`field-${field.id}`} className="text-sm">
                  {field.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="required-docs">Required Documents</Label>
          <Textarea
            id="required-docs"
            value={requiredDocuments.join('\n')}
            onChange={(e) => setRequiredDocuments(e.target.value.split('\n').filter(doc => doc.trim()))}
            placeholder="Enter required documents (one per line)"
            className="mt-1"
            rows={3}
          />
        </div>
      </div>
    );
  };

  const renderActionButtons = () => {
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
        
      default:
        return (
          <div className="flex items-center gap-3 flex-wrap">
            <Button 
              onClick={() => handleStatusChange('approved')}
              className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-transform duration-200 animate-bounce-in"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
            <Button 
              onClick={() => handleStatusChange('rejected')}
              variant="destructive"
              className="hover:scale-105 transition-transform duration-200"
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

  const renderActivityLog = () => {
    if (!submission.activityLog || submission.activityLog.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          <Clock className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No previous activity</p>
        </div>
      );
    }

    return (
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {submission.activityLog.map((activity) => (
          <div key={activity.id} className="p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium capitalize">
                    {activity.action.replace('_', ' ')}
                  </span>
                  {activity.metadata?.urgency && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      activity.metadata.urgency === 'high' ? 'bg-red-100 text-red-800' :
                      activity.metadata.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {activity.metadata.urgency} priority
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-2">{activity.comments}</p>
                {activity.metadata?.reason && (
                  <p className="text-xs text-gray-600">Reason: {activity.metadata.reason.replace('_', ' ')}</p>
                )}
                {activity.metadata?.specificFields && activity.metadata.specificFields.length > 0 && (
                  <p className="text-xs text-gray-600">
                    Fields: {activity.metadata.specificFields.map(fieldId => 
                      form.fields.find(f => f.id === fieldId)?.label || fieldId
                    ).join(', ')}
                  </p>
                )}
                {activity.metadata?.requiredDocuments && activity.metadata.requiredDocuments.length > 0 && (
                  <p className="text-xs text-gray-600">
                    Required docs: {activity.metadata.requiredDocuments.join(', ')}
                  </p>
                )}
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>{activity.reviewedBy}</p>
                <p>{activity.reviewedAt.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Activity Log */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-500" />
            Activity Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderActivityLog()}
        </CardContent>
      </Card>

      {/* Review Actions */}
      <Card className="animate-slide-up">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            Review Actions
            {!isFormComplete() && submission.status === 'submitted' && (
              <AlertTriangle className="h-5 w-5 text-orange-500 animate-bounce" />
            )}
          </CardTitle>
          {!isFormComplete() && submission.status === 'submitted' && (
            <p className="text-sm text-orange-600">
              This form is incomplete. Only reminder can be sent until all required fields are completed.
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              variant={actionType === 'simple' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActionType('simple')}
            >
              Simple
            </Button>
            <Button
              variant={actionType === 'advanced' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActionType('advanced')}
            >
              Advanced Options
            </Button>
          </div>

          {renderAdvancedOptions()}

          {/* AI Suggestion Box */}
          {submission.score && isFormComplete() && submission.status !== 'approved' && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 animate-fade-in">
              <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4" />
                AI Recommendation
              </h4>
              {(() => {
                const suggestion = getApprovalSuggestion(submission);
                return (
                  <div className="space-y-2">
                    <p className="text-sm text-blue-700">
                      Suggested: <span className="font-medium capitalize">{suggestion.type} Approval</span>
                    </p>
                    <p className="text-xs text-blue-600">{suggestion.reason}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setApprovalType(suggestion.type)}
                      className="text-blue-700 border-blue-300 hover:bg-blue-100"
                    >
                      Apply Suggestion
                    </Button>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Approval Type Selection for Approved Submissions */}
          {(submission.status === 'submitted' || submission.status === 'under_review') && isFormComplete() && (
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="approval-type">Approval Type (Required for Approval)</Label>
              <Select value={approvalType} onValueChange={(value: 'fully' | 'partially') => setApprovalType(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fully">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Fully Approved - Complete implementation
                    </div>
                  </SelectItem>
                  <SelectItem value="partially">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Partially Approved - Conditional implementation
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                {approvalType === 'fully' 
                  ? 'Full approval means all requirements are met and can be implemented as-is.'
                  : 'Partial approval means implementation with conditions or limitations.'
                }
              </p>
            </div>
          )}

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
    </div>
  );
};
