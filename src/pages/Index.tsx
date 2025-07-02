
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormBuilder } from "@/components/FormBuilder";
import { SubmissionReview } from "@/components/SubmissionReview";
import { ReportGeneration } from "@/components/ReportGeneration";
import { Analytics } from "@/components/Analytics";
import { FormLibraryManager } from "@/components/FormLibraryManager";
import { sampleSubmissions } from "@/data/sampleSubmissions";
import { FormSubmission, Form } from "@/types/form";
import { 
  Hammer, 
  FileCheck, 
  BarChart3, 
  TrendingUp, 
  FolderOpen
} from "lucide-react";

export default function Index() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>(sampleSubmissions);

  const handleUpdateSubmission = (submissionId: string, updates: Partial<FormSubmission>) => {
    setSubmissions(prev => 
      prev.map(submission => 
        submission.id === submissionId 
          ? { ...submission, ...updates }
          : submission
      )
    );
  };

  // Create a sample form object with all required properties
  const sampleForm: Form = {
    id: "1",
    title: "Sample Form",
    description: "A sample form for review",
    fields: [],
    settings: {
      allowMultipleSubmissions: false,
      requireLogin: false,
      showProgressBar: true,
      theme: 'light',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'published',
    submissions: submissions.length,
    analytics: {
      views: 0,
      submissions: submissions.length,
      completionRate: 0,
      emailsSent: 0,
      emailsCompleted: 0,
      averageCompletionTime: 0,
      dropoffRate: 0,
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Form Management Platform
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 sm:mt-2">
            Build, manage, and analyze your forms with ease
          </p>
        </header>

        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4 sm:mb-6">
            <TabsTrigger value="builder" className="text-xs sm:text-sm px-2 py-2">
              <Hammer className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Builder</span>
              <span className="sm:hidden">Build</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="text-xs sm:text-sm px-2 py-2">
              <FolderOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Library</span>
              <span className="sm:hidden">Forms</span>
            </TabsTrigger>
            <TabsTrigger value="review" className="text-xs sm:text-sm px-2 py-2">
              <FileCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Review</span>
              <span className="sm:hidden">Review</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-xs sm:text-sm px-2 py-2">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Reports</span>
              <span className="sm:hidden">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs sm:text-sm px-2 py-2">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Charts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-4 sm:space-y-6">
            <FormBuilder />
          </TabsContent>

          <TabsContent value="library" className="space-y-4 sm:space-y-6">
            <FormLibraryManager />
          </TabsContent>

          <TabsContent value="review" className="space-y-4 sm:space-y-6">
            <SubmissionReview 
              submissions={submissions} 
              form={sampleForm}
              onUpdateSubmission={handleUpdateSubmission}
            />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4 sm:space-y-6">
            <ReportGeneration submissions={submissions} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
