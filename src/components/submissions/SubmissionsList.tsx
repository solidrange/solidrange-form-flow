
import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmissionCard } from "./SubmissionCard";
import { Filter } from "lucide-react";

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
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-base sm:text-lg">
            <span className="hidden sm:inline">Submissions ({filteredSubmissions.length})</span>
            <span className="sm:hidden">Sub ({filteredSubmissions.length})</span>
          </CardTitle>
          <Select value={filterStatus} onValueChange={onFilterChange}>
            <SelectTrigger className="w-full sm:w-32 h-9">
              <div className="flex items-center gap-2">
                <Filter className="h-3 w-3" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="submitted">New</SelectItem>
              <SelectItem value="under_review">Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3 overflow-auto max-h-[calc(100vh-250px)] sm:max-h-[calc(100vh-300px)] p-3 sm:p-4">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No submissions found</p>
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              form={form}
              isSelected={selectedSubmission === submission.id}
              onClick={() => onSelectSubmission(submission.id)}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};
