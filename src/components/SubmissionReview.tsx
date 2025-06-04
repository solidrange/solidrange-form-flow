import { useState } from "react";
import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, Clock, User, FileText, Download, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SubmissionReviewProps {
  submissions: FormSubmission[];
  form: Form;
  onUpdateSubmission: (submissionId: string, updates: Partial<FormSubmission>) => void;
}

export const SubmissionReview = ({ submissions, form, onUpdateSubmission }: SubmissionReviewProps) => {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [reviewComments, setReviewComments] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const calculateCompletionPercentage = (submission: FormSubmission) => {
    if (form.fields.length === 0) return 0;
    
    const completedFields = form.fields.filter(field => {
      const value = submission.responses[field.id];
      return value !== null && value !== undefined && value !== '' && 
             !(Array.isArray(value) && value.length === 0);
    }).length;
    
    return Math.min(100, Math.round((completedFields / form.fields.length) * 100));
  };

  const getStatusIcon = (status: FormSubmission['status']) => {
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

  const getStatusColor = (status: FormSubmission['status']) => {
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

  const handleApproval = (submissionId: string, status: 'approved' | 'rejected') => {
    onUpdateSubmission(submissionId, {
      status,
      score: {
        ...submissions.find(s => s.id === submissionId)?.score,
        reviewedBy: 'Current User',
        reviewedAt: new Date()
      } as any
    });
    
    toast({
      title: status === 'approved' ? "Submission Approved" : "Submission Rejected",
      description: `The submission has been ${status}.`,
    });
  };

  const filteredSubmissions = submissions.filter(submission => {
    if (filterStatus === 'all') return true;
    return submission.status === filterStatus;
  });

  const selectedSub = submissions.find(s => s.id === selectedSubmission);

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Submissions List */}
      <div className="col-span-4">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 overflow-auto">
            {filteredSubmissions.map((submission) => {
              const completionPercentage = calculateCompletionPercentage(submission);
              
              return (
                <Card 
                  key={submission.id}
                  className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedSubmission === submission.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedSubmission(submission.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">
                          {submission.recipientId || 'Anonymous'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(submission.status)}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Completion</span>
                        <span className="text-xs font-medium">{completionPercentage}%</span>
                      </div>
                      <Progress value={completionPercentage} className="h-2" />
                      
                      {submission.score && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Score</span>
                          <Badge variant="outline">
                            {submission.score.total}/{submission.score.maxTotal}
                          </Badge>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(submission.status)}>
                          {submission.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Submission Details */}
      <div className="col-span-8">
        {selectedSub ? (
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Submission Review</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 overflow-auto">
              {/* Submission Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Submitted By</Label>
                  <p className="text-sm">{selectedSub.recipientId || 'Anonymous'}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Submitted At</Label>
                  <p className="text-sm">{new Date(selectedSub.submittedAt).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Completion</Label>
                  <p className="text-sm">{calculateCompletionPercentage(selectedSub)}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedSub.status)}>
                    {selectedSub.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>

              {/* Score Information */}
              {selectedSub.score && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Score Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Total Score</Label>
                        <p className="text-2xl font-bold">
                          {selectedSub.score.total}/{selectedSub.score.maxTotal}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Percentage</Label>
                        <p className="text-2xl font-bold">{selectedSub.score.percentage}%</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Risk Level</Label>
                        <Badge variant={selectedSub.score.riskLevel === 'critical' ? 'destructive' : 'outline'}>
                          {selectedSub.score.riskLevel}
                        </Badge>
                      </div>
                    </div>

                    {selectedSub.score.categoryScores && (
                      <div>
                        <Label className="text-sm font-medium text-gray-500 mb-2 block">Category Scores</Label>
                        <div className="space-y-2">
                          {Object.entries(selectedSub.score.categoryScores).map(([category, score]) => (
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
                    const response = selectedSub.responses[field.id];
                    const hasResponse = response !== null && response !== undefined && response !== '';
                    
                    return (
                      <div key={field.id} className="border-b pb-3 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="font-medium">{field.label}</Label>
                          <div className="flex items-center gap-2">
                            {hasResponse ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500" />
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
                            <span className="italic text-gray-400">No response</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Approval Actions */}
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
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      onClick={() => handleApproval(selectedSub.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      onClick={() => handleApproval(selectedSub.id, 'rejected')}
                      variant="destructive"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Request More Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <CardContent>
              <div className="text-center text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a submission to review</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
