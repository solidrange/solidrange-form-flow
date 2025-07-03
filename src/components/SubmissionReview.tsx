
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
  initialFilters?: {
    status?: string;
    approvalType?: string;
    riskLevel?: string;
    submissionType?: string;
  };
  onUpdateSubmission: (submissionId: string, updates: Partial<FormSubmission>) => void;
}

export const SubmissionReview = ({ submissions, form, initialFilters, onUpdateSubmission }: SubmissionReviewProps) => {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const selectedSub = submissions.find(s => s.id === selectedSubmission);

  const handleResendForm = (submissionId: string, comments: string) => {
    console.log('Resending form to submission:', submissionId, 'with comments:', comments);
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 sm:gap-4 lg:gap-6 h-auto lg:h-[calc(100vh-200px)] animate-fade-in">
      {/* Submissions List - Full width on mobile, left column on desktop */}
      <div className="lg:col-span-4 order-1 lg:order-1 animate-slide-in-left">
        <SubmissionsList
          submissions={submissions}
          form={form}
          selectedSubmission={selectedSubmission}
          filterStatus={filterStatus}
          initialFilters={initialFilters}
          onSelectSubmission={setSelectedSubmission}
          onFilterChange={setFilterStatus}
        />
      </div>

      {/* Submission Details - Full width on mobile, right column on desktop */}
      <div className="lg:col-span-8 order-2 lg:order-2 animate-slide-in-right">
        {selectedSub ? (
          <Card className="h-full hover:shadow-modern-lg transition-all duration-300">
            <CardHeader className="pb-2 sm:pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                <CardTitle className="text-sm sm:text-base lg:text-lg truncate">
                  Review Submission
                </CardTitle>
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
                  <Button variant="outline" size="sm" className="text-xs px-2 py-1 whitespace-nowrap hover:scale-105 transition-transform duration-200">
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline ml-1">Export</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs px-2 py-1 whitespace-nowrap hover:scale-105 transition-transform duration-200">
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline ml-1">Print</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 lg:space-y-6 overflow-auto max-h-[60vh] sm:max-h-[70vh] lg:max-h-[calc(100vh-300px)] p-3 sm:p-4 lg:p-6">
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
          <Card className="h-full flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
            <CardContent className="text-center p-4">
              <FileText className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
              <p className="text-xs sm:text-sm text-gray-500">Select a submission to review</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
