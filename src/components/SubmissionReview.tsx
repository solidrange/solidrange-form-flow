
import { useState } from "react";
import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { SubmissionsList } from "./submissions/SubmissionsList";
import { SubmissionDetails } from "./submissions/SubmissionDetails";
import { SubmissionActions } from "./submissions/SubmissionActions";

interface SubmissionReviewProps {
  submissions: FormSubmission[];
  form: Form;
  onUpdateSubmission: (submissionId: string, updates: Partial<FormSubmission>) => void;
}

export const SubmissionReview = ({ submissions, form, onUpdateSubmission }: SubmissionReviewProps) => {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const selectedSub = submissions.find(s => s.id === selectedSubmission);

  const handleResendForm = (submissionId: string, comments: string) => {
    console.log('Resending form to submission:', submissionId, 'with comments:', comments);
    // Here you would implement the actual resend logic
    // This could involve sending an email with the form link and comments
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Submissions List */}
      <div className="col-span-4">
        <SubmissionsList
          submissions={submissions}
          form={form}
          selectedSubmission={selectedSubmission}
          filterStatus={filterStatus}
          onSelectSubmission={setSelectedSubmission}
          onFilterChange={setFilterStatus}
        />
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
            <CardContent className="space-y-6 overflow-auto max-h-[calc(100vh-300px)]">
              <SubmissionDetails submission={selectedSub} form={form} />
              <SubmissionActions 
                submission={selectedSub} 
                form={form}
                onUpdateSubmission={onUpdateSubmission}
                onResendForm={handleResendForm}
              />
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
