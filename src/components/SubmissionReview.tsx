import { useState } from "react";
import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, BarChart3 } from "lucide-react";
import { SubmissionsList } from "./submissions/SubmissionsList";
import { SubmissionDetails } from "./submissions/SubmissionDetails";
import { SubmissionActions } from "./submissions/SubmissionActions";
import { Analytics } from "./Analytics";
import { ReportGeneration } from "./ReportGeneration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck } from "lucide-react";

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
    <div className="space-y-6">
      <Tabs defaultValue="submissions" className="w-full">
        <TabsList className="grid w-auto grid-cols-3">
          <TabsTrigger value="submissions" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Submissions
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Report Generation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="mt-4">
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-250px)]">
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
                  <CardContent className="space-y-6 overflow-auto max-h-[calc(100vh-350px)]">
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
        </TabsContent>

        <TabsContent value="analytics" className="mt-4">
          <Analytics />
        </TabsContent>

        <TabsContent value="reports" className="mt-4">
          <ReportGeneration submissions={submissions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
