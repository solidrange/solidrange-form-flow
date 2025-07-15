
import { useState } from "react";
import { FormSubmission } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Download, 
  Trash2,
  Users,
  AlertTriangle,
  FileText
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BulkActionsProps {
  selectedSubmissions: string[];
  submissions: FormSubmission[];
  onBulkUpdate: (submissionIds: string[], updates: any) => void;
  onBulkDelete: (submissionIds: string[]) => void;
  onClose: () => void;
}

export const BulkActions = ({ 
  selectedSubmissions, 
  submissions, 
  onBulkUpdate, 
  onBulkDelete, 
  onClose 
}: BulkActionsProps) => {
  const [action, setAction] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedSubmissionData = submissions.filter(sub => 
    selectedSubmissions.includes(sub.id)
  );

  const handleBulkAction = async () => {
    if (!action) {
      toast({
        title: "Action Required",
        description: "Please select an action to perform.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      switch (action) {
        case "approve":
          onBulkUpdate(selectedSubmissions, { 
            status: "approved", 
            approvedAt: new Date(),
            comments: comments || "Bulk approved"
          });
          toast({
            title: "Submissions Approved",
            description: `Successfully approved ${selectedSubmissions.length} submissions.`,
          });
          break;
          
        case "reject":
          onBulkUpdate(selectedSubmissions, { 
            status: "rejected",
            rejectedAt: new Date(),
            comments: comments || "Bulk rejected"
          });
          toast({
            title: "Submissions Rejected",
            description: `Successfully rejected ${selectedSubmissions.length} submissions.`,
          });
          break;
          
        case "under_review":
          onBulkUpdate(selectedSubmissions, { 
            status: "under_review",
            reviewStartedAt: new Date(),
            comments: comments || "Moved to review"
          });
          toast({
            title: "Submissions Under Review",
            description: `Successfully moved ${selectedSubmissions.length} submissions to review.`,
          });
          break;
          
        case "change_status":
          if (!status) {
            toast({
              title: "Status Required",
              description: "Please select a status to change to.",
              variant: "destructive"
            });
            return;
          }
          onBulkUpdate(selectedSubmissions, { 
            status,
            updatedAt: new Date(),
            comments: comments || `Status changed to ${status}`
          });
          toast({
            title: "Status Updated",
            description: `Successfully updated status for ${selectedSubmissions.length} submissions.`,
          });
          break;
          
        case "send_email":
          // Simulate email sending
          await new Promise(resolve => setTimeout(resolve, 2000));
          toast({
            title: "Emails Sent",
            description: `Successfully sent emails to ${selectedSubmissions.length} submitters.`,
          });
          break;
          
        case "export":
          const csvContent = generateCSV(selectedSubmissionData);
          downloadCSV(csvContent, 'bulk-submissions-export.csv');
          toast({
            title: "Export Complete",
            description: `Successfully exported ${selectedSubmissions.length} submissions.`,
          });
          break;
          
        case "delete":
          if (window.confirm(`Are you sure you want to delete ${selectedSubmissions.length} submissions? This action cannot be undone.`)) {
            onBulkDelete(selectedSubmissions);
            toast({
              title: "Submissions Deleted",
              description: `Successfully deleted ${selectedSubmissions.length} submissions.`,
            });
            onClose();
          }
          break;
          
        default:
          toast({
            title: "Unknown Action",
            description: "The selected action is not supported.",
            variant: "destructive"
          });
      }
      
      if (action !== "delete") {
        onClose();
      }
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "An error occurred while performing the bulk action.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateCSV = (data: FormSubmission[]) => {
    const headers = ['ID', 'Company', 'Submitter', 'Email', 'Status', 'Score', 'Risk Level', 'Submitted At'];
    const rows = data.map(sub => [
      sub.id,
      sub.companyName || '',
      sub.submitterName || '',
      sub.submitterEmail,
      sub.status,
      sub.score?.percentage || '',
      sub.score?.riskLevel || '',
      sub.submittedAt.toISOString()
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-500" />;
      case "under_review": return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "under_review": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Bulk Actions - {selectedSubmissions.length} Selected
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Selected Submissions Preview */}
        <div>
          <Label className="text-base font-medium">Selected Submissions</Label>
          <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg p-3 bg-gray-50">
            <div className="grid gap-2">
              {selectedSubmissionData.slice(0, 5).map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(submission.status)}
                    <span className="text-sm font-medium">{submission.companyName || submission.submitterEmail}</span>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(submission.status)}`}>
                    {submission.status}
                  </Badge>
                </div>
              ))}
              {selectedSubmissionData.length > 5 && (
                <div className="text-center text-sm text-gray-500 py-2">
                  ... and {selectedSubmissionData.length - 5} more
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Action Selection */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="bulk-action">Select Action</Label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Choose an action to perform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approve">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Approve All
                  </div>
                </SelectItem>
                <SelectItem value="reject">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Reject All
                  </div>
                </SelectItem>
                <SelectItem value="under_review">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    Move to Review
                  </div>
                </SelectItem>
                <SelectItem value="change_status">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Change Status
                  </div>
                </SelectItem>
                <SelectItem value="send_email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-purple-500" />
                    Send Email Notification
                  </div>
                </SelectItem>
                <SelectItem value="export">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-indigo-500" />
                    Export to CSV
                  </div>
                </SelectItem>
                <SelectItem value="delete">
                  <div className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-red-600" />
                    Delete Submissions
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Selection for Change Status Action */}
          {action === "change_status" && (
            <div>
              <Label htmlFor="new-status">New Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Comments/Notes */}
          {(action === "approve" || action === "reject" || action === "under_review" || action === "change_status" || action === "send_email") && (
            <div>
              <Label htmlFor="comments">
                {action === "send_email" ? "Email Message" : "Comments/Notes"} (Optional)
              </Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder={
                  action === "send_email" 
                    ? "Enter email message..."
                    : "Add comments or notes for this bulk action..."
                }
                rows={3}
                className="mt-1"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button 
            onClick={handleBulkAction} 
            disabled={!action || isProcessing}
            variant={action === "delete" ? "destructive" : "default"}
          >
            {isProcessing ? "Processing..." : `Execute Action`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
