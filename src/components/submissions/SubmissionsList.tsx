
import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmissionCard } from "./SubmissionCard";

interface SubmissionsListProps {
  submissions: FormSubmission[];
  form: Form;
  selectedSubmission: string | null;
  filterStatus: string;
  onSelectSubmission: (submissionId: string) => void;
  onFilterChange: (status: string) => void;
}

export const SubmissionsList = ({ 
  submissions, 
  form, 
  selectedSubmission, 
  filterStatus, 
  onSelectSubmission, 
  onFilterChange 
}: SubmissionsListProps) => {
  const filteredSubmissions = submissions.filter(submission => {
    if (filterStatus === 'all') return true;
    return submission.status === filterStatus;
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
          <Select value={filterStatus} onValueChange={onFilterChange}>
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
      <CardContent className="space-y-3 overflow-auto max-h-[calc(100vh-300px)]">
        {filteredSubmissions.map((submission) => (
          <SubmissionCard
            key={submission.id}
            submission={submission}
            form={form}
            isSelected={selectedSubmission === submission.id}
            onClick={() => onSelectSubmission(submission.id)}
          />
        ))}
      </CardContent>
    </Card>
  );
};
