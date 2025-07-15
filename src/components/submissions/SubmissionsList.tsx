
import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Building,
  User,
  Calendar,
  Star,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmissionsListProps {
  submissions: FormSubmission[];
  form: Form;
  selectedSubmission: string | null;
  selectedSubmissions?: string[];
  onSelectSubmission: (submissionId: string) => void;
  onSelectForBulk?: (submissionId: string, checked: boolean) => void;
}

export const SubmissionsList = ({ 
  submissions, 
  form, 
  selectedSubmission,
  selectedSubmissions = [],
  onSelectSubmission,
  onSelectForBulk
}: SubmissionsListProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "under_review":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-orange-100 text-orange-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Submissions ({submissions.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="p-4 space-y-3">
            {submissions.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No submissions found</p>
              </div>
            ) : (
              submissions.map((submission) => (
                <div
                  key={submission.id}
                  className={cn(
                    "p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                    selectedSubmission === submission.id 
                      ? "border-primary bg-primary/5 shadow-md" 
                      : "border-gray-200 hover:border-gray-300",
                    selectedSubmissions.includes(submission.id) && "ring-2 ring-primary/20"
                  )}
                  onClick={() => onSelectSubmission(submission.id)}
                >
                  <div className="flex items-start gap-3">
                    {/* Bulk Selection Checkbox */}
                    {onSelectForBulk && (
                      <Checkbox
                        checked={selectedSubmissions.includes(submission.id)}
                        onCheckedChange={(checked) => onSelectForBulk(submission.id, !!checked)}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1"
                      />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      {/* Header with Company/User and Status */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {submission.companyName ? (
                            <>
                              <Building className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <span className="font-medium text-sm truncate">
                                {submission.companyName}
                              </span>
                            </>
                          ) : (
                            <>
                              <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              <span className="font-medium text-sm truncate">
                                {submission.submitterName || submission.submitterEmail}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(submission.status)}
                        </div>
                      </div>

                      {/* Email */}
                      <p className="text-xs text-gray-600 mb-2 truncate">
                        {submission.submitterEmail}
                      </p>

                      {/* Status and Risk Badges */}
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`text-xs ${getStatusColor(submission.status)}`}>
                          {submission.status.replace('_', ' ')}
                        </Badge>
                        {submission.score?.riskLevel && (
                          <Badge className={`text-xs ${getRiskColor(submission.score.riskLevel)}`}>
                            {submission.score.riskLevel} risk
                          </Badge>
                        )}
                      </div>

                      {/* Score and Date */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          {submission.score && (
                            <>
                              <Star className="h-3 w-3" />
                              <span>{submission.score.percentage}%</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{submission.submittedAt.toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Additional Info */}
                      {submission.submissionType && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            {submission.submissionType}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
