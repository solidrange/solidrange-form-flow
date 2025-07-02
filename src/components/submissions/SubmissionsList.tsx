
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
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
        <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-3">
          <CardTitle className="text-xs sm:text-sm lg:text-base leading-tight">
            <span className="hidden xs:inline">Submissions ({filteredSubmissions.length})</span>
            <span className="xs:hidden">Sub ({filteredSubmissions.length})</span>
          </CardTitle>
          <Select value={filterStatus} onValueChange={onFilterChange}>
            <SelectTrigger className="w-full xs:w-24 sm:w-28 lg:w-32 h-8 sm:h-9 text-xs">
              <div className="flex items-center gap-1 sm:gap-2">
                <Filter className="h-3 w-3" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">All</SelectItem>
              <SelectItem value="submitted" className="text-xs">New</SelectItem>
              <SelectItem value="under_review" className="text-xs">Review</SelectItem>
              <SelectItem value="approved" className="text-xs">Approved</SelectItem>
              <SelectItem value="rejected" className="text-xs">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 overflow-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[calc(100vh-250px)] p-2 sm:p-3 lg:p-4">
        {filteredSubmissions.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500">
            <p className="text-xs sm:text-sm">No submissions found</p>
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
