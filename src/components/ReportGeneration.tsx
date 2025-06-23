
import { useState } from "react";
import { Form, FormSubmission } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, BarChart3 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateSubmissionReport, generateFormAnalytics } from "@/utils/reportGenerator";

interface ReportGenerationProps {
  form: Form;
  submissions: FormSubmission[];
}

export const ReportGeneration = ({ form, submissions }: ReportGenerationProps) => {
  const [reportType, setReportType] = useState<'submissions' | 'analytics'>('submissions');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    try {
      if (reportType === 'submissions') {
        await generateSubmissionReport(form, submissions);
      } else {
        await generateFormAnalytics(form, submissions);
      }
      
      toast({
        title: "Report Generated",
        description: "Your report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getReportStats = () => {
    const totalSubmissions = submissions.length;
    const completedSubmissions = submissions.filter(s => s.status === 'approved' || s.status === 'submitted').length;
    const averageScore = submissions.length > 0 
      ? submissions.reduce((acc, sub) => acc + (sub.score?.percentage || 0), 0) / submissions.length 
      : 0;

    return {
      totalSubmissions,
      completedSubmissions,
      averageScore: Math.round(averageScore)
    };
  };

  const stats = getReportStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Report Generation</h2>
          <p className="text-gray-600 mt-1">Generate detailed reports for form submissions and analytics</p>
        </div>
        <Badge variant="default" className="bg-green-100 text-green-800">
          {stats.totalSubmissions} Submissions
        </Badge>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Submissions</p>
                <p className="text-xl font-semibold">{stats.totalSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-semibold">{stats.completedSubmissions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-xl font-semibold">{stats.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Report Type</label>
            <Select value={reportType} onValueChange={(value: 'submissions' | 'analytics') => setReportType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="submissions">Submission Details Report</SelectItem>
                <SelectItem value="analytics">Form Analytics Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">
              {reportType === 'submissions' ? 'Submission Details Report' : 'Form Analytics Report'}
            </h4>
            <p className="text-sm text-gray-600">
              {reportType === 'submissions' 
                ? 'Detailed breakdown of all submissions including responses, scores, and review status.'
                : 'Statistical analysis including completion rates, average scores, and submission trends.'
              }
            </p>
          </div>

          <Button 
            onClick={handleGenerateReport} 
            disabled={isGenerating || submissions.length === 0}
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
