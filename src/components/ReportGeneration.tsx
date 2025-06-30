import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportCustomization, ReportConfig } from "./reports/ReportCustomization";
import { ReportCharts } from "./reports/ReportCharts";
import { ReportGenerator } from "@/utils/reportGenerator";
import { FormSubmission } from "@/types/form";
import { toast } from "@/hooks/use-toast";

/**
 * Props interface for the ReportGeneration component
 */
interface ReportGenerationProps {
  submissions: FormSubmission[];
}

/**
 * ReportGeneration Component
 * 
 * A comprehensive report generation tool that provides:
 * - Quick pre-configured report templates (Executive Summary, Risk Assessment, etc.)
 * - Custom report builder with flexible configuration options
 * - Real-time analytics preview with interactive charts
 * - Support for both PDF and Excel export formats
 * 
 * The component is organized into three main tabs:
 * 1. Quick Reports: Pre-built templates for common use cases
 * 2. Custom Reports: Fully customizable report builder
 * 3. Analytics Preview: Live charts and visualizations
 * 
 * @param submissions - Array of form submissions to generate reports from
 */
export const ReportGeneration = ({ submissions }: ReportGenerationProps) => {
  // State for managing report generation process
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewConfig, setPreviewConfig] = useState<ReportConfig | null>(null);

  /**
   * Handles the report generation process
   * Creates a new ReportGenerator instance and processes the report based on configuration
   * Provides user feedback through toast notifications
   * 
   * @param config - Report configuration object defining structure and content
   */
  const handleGenerateReport = async (config: ReportConfig) => {
    setIsGenerating(true);
    try {
      const generator = new ReportGenerator(submissions, config);
      await generator.generate();
      
      toast({
        title: "Report Generated Successfully",
        description: `Your ${config.format.toUpperCase()} report has been downloaded.`,
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error Generating Report",
        description: "There was an error generating your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Calculates quick statistics for display in report cards
   * Provides immediate insights into submission data without full report generation
   * 
   * @returns Object containing key metrics (total, approved, high risk, average score)
   */
  const getQuickReportStats = () => {
    const total = submissions.length;
    const approved = submissions.filter(s => s.status === 'approved').length;
    
    // Count high-risk submissions based on score object structure
    const highRisk = submissions.filter(s => {
      if (s.score && typeof s.score === 'object') {
        const riskLevel = (s.score as any)?.riskLevel;
        return riskLevel === 'high' || riskLevel === 'critical';
      }
      return false;
    }).length;
    
    // Calculate average score from submissions with valid score objects
    const submissionsWithScores = submissions.filter(s => s.score && typeof s.score === 'object');
    const averageScore = submissionsWithScores.length > 0 
      ? submissionsWithScores.reduce((sum, s) => sum + ((s.score as any)?.percentage || 0), 0) / submissionsWithScores.length
      : 0;

    return { total, approved, highRisk, averageScore: Math.round(averageScore) };
  };

  const stats = getQuickReportStats();

  return (
    <div className="space-y-6">
      {/* Main Report Generation Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Report Generation Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="quick-reports" className="w-full">
            {/* Tab Navigation */}
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quick-reports">Quick Reports</TabsTrigger>
              <TabsTrigger value="custom-reports">Custom Reports</TabsTrigger>
              <TabsTrigger value="analytics-preview">Analytics Preview</TabsTrigger>
            </TabsList>

            {/* Quick Reports Tab - Pre-configured report templates */}
            <TabsContent value="quick-reports" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Executive Summary Report Card */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Executive Summary Report</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Comprehensive overview with key statistics, risk analysis, executive recommendations, and visual charts.
                  </p>
                  
                  {/* Quick Stats Display */}
                  <div className="text-sm space-y-1 mb-4">
                    <div>Total Submissions: <span className="font-medium">{stats.total}</span></div>
                    <div>Approved: <span className="font-medium">{stats.approved}</span></div>
                    <div>High Risk: <span className="font-medium text-red-600">{stats.highRisk}</span></div>
                    <div>Avg Score: <span className="font-medium">{stats.averageScore}%</span></div>
                  </div>
                  
                  {/* Report Generation Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => handleGenerateReport({
                        title: "Executive Summary Report",
                        description: "Comprehensive analysis of form submissions and risk assessment",
                        includeSections: {
                          overview: true,
                          submissionStats: true,
                          riskAnalysis: true,
                          complianceStatus: true,
                          detailedResponses: false,
                          recommendations: true,
                        },
                        chartTypes: {
                          submissionTrends: 'bar',
                          riskDistribution: 'pie',
                          complianceStatus: 'bar',
                        },
                        filterBy: {
                          dateRange: { start: '', end: '' },
                          submissionType: 'all',
                          status: 'all',
                          riskLevel: 'all',
                        },
                        customRecommendations: "",
                        format: 'pdf',
                        includeCharts: true,
                      })}
                      disabled={isGenerating}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      PDF Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleGenerateReport({
                        title: "Executive Summary Report",
                        description: "Comprehensive analysis of form submissions and risk assessment",
                        includeSections: {
                          overview: true,
                          submissionStats: true,
                          riskAnalysis: true,
                          complianceStatus: true,
                          detailedResponses: true,
                          recommendations: true,
                        },
                        chartTypes: {
                          submissionTrends: 'bar',
                          riskDistribution: 'pie',
                          complianceStatus: 'bar',
                        },
                        filterBy: {
                          dateRange: { start: '', end: '' },
                          submissionType: 'all',
                          status: 'all',
                          riskLevel: 'all',
                        },
                        customRecommendations: "",
                        format: 'excel',
                        includeCharts: true,
                      })}
                      disabled={isGenerating}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Excel Report
                    </Button>
                  </div>
                </Card>

                {/* Risk Assessment Report Card */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Risk Assessment Report</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Detailed risk analysis with scoring breakdowns, compliance status, charts, and actionable insights.
                  </p>
                  
                  {/* Risk Assessment Details */}
                  <div className="text-sm space-y-1 mb-4">
                    <div>Risk Categories: <span className="font-medium">Data Security, Compliance, Operations</span></div>
                    <div>Scoring Model: <span className="font-medium">Weighted Risk Matrix</span></div>
                    <div>Assessment Framework: <span className="font-medium">ISO 27001, GDPR, SOC 2</span></div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleGenerateReport({
                        title: "Risk Assessment Report",
                        description: "Detailed risk analysis and compliance assessment",
                        includeSections: {
                          overview: true,
                          submissionStats: false,
                          riskAnalysis: true,
                          complianceStatus: true,
                          detailedResponses: true,
                          recommendations: true,
                        },
                        chartTypes: {
                          submissionTrends: 'line',
                          riskDistribution: 'donut',
                          complianceStatus: 'bar',
                        },
                        filterBy: {
                          dateRange: { start: '', end: '' },
                          submissionType: 'all',
                          status: 'all',
                          riskLevel: 'all',
                        },
                        customRecommendations: "",
                        format: 'pdf',
                        includeCharts: true,
                      })}
                      disabled={isGenerating}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      PDF Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleGenerateReport({
                        title: "Risk Assessment Report",
                        description: "Detailed risk analysis and compliance assessment",
                        includeSections: {
                          overview: true,
                          submissionStats: false,
                          riskAnalysis: true,
                          complianceStatus: true,
                          detailedResponses: true,
                          recommendations: true,
                        },
                        chartTypes: {
                          submissionTrends: 'line',
                          riskDistribution: 'donut',
                          complianceStatus: 'bar',
                        },
                        filterBy: {
                          dateRange: { start: '', end: '' },
                          submissionType: 'all',
                          status: 'all',
                          riskLevel: 'all',
                        },
                        customRecommendations: "",
                        format: 'excel',
                        includeCharts: true,
                      })}
                      disabled={isGenerating}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Excel Report
                    </Button>
                  </div>
                </Card>

                {/* Vendor Compliance Report Card */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Vendor Compliance Report</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Compliance-focused report for vendor submissions with regulatory requirements analysis and visual data.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleGenerateReport({
                        title: "Vendor Compliance Report",
                        description: "Compliance analysis for vendor submissions",
                        includeSections: {
                          overview: true,
                          submissionStats: true,
                          riskAnalysis: false,
                          complianceStatus: true,
                          detailedResponses: true,
                          recommendations: true,
                        },
                        chartTypes: {
                          submissionTrends: 'bar',
                          riskDistribution: 'pie',
                          complianceStatus: 'bar',
                        },
                        filterBy: {
                          dateRange: { start: '', end: '' },
                          submissionType: 'vendor',
                          status: 'all',
                          riskLevel: 'all',
                        },
                        customRecommendations: "",
                        format: 'pdf',
                        includeCharts: true,
                      })}
                      disabled={isGenerating}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      PDF Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleGenerateReport({
                        title: "Vendor Compliance Report",
                        description: "Compliance analysis for vendor submissions",
                        includeSections: {
                          overview: true,
                          submissionStats: true,
                          riskAnalysis: true,
                          complianceStatus: true,
                          detailedResponses: true,
                          recommendations: true,
                        },
                        chartTypes: {
                          submissionTrends: 'bar',
                          riskDistribution: 'pie',
                          complianceStatus: 'bar',
                        },
                        filterBy: {
                          dateRange: { start: '', end: '' },
                          submissionType: 'vendor',
                          status: 'all',
                          riskLevel: 'all',
                        },
                        customRecommendations: "",
                        format: 'excel',
                        includeCharts: true,
                      })}
                      disabled={isGenerating}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Excel Report
                    </Button>
                  </div>
                </Card>

                {/* Management Dashboard Report Card */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Management Dashboard</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Executive summary with interactive graphs, KPIs, and strategic recommendations for leadership.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleGenerateReport({
                        title: "Management Dashboard Report",
                        description: "Executive dashboard with key performance indicators",
                        includeSections: {
                          overview: true,
                          submissionStats: true,
                          riskAnalysis: true,
                          complianceStatus: true,
                          detailedResponses: false,
                          recommendations: true,
                        },
                        chartTypes: {
                          submissionTrends: 'line',
                          riskDistribution: 'pie',
                          complianceStatus: 'bar',
                        },
                        filterBy: {
                          dateRange: { start: '', end: '' },
                          submissionType: 'all',
                          status: 'all',
                          riskLevel: 'all',
                        },
                        customRecommendations: "Focus on process automation and vendor relationship management to improve efficiency and reduce risk exposure.",
                        format: 'pdf',
                        includeCharts: true,
                      })}
                      disabled={isGenerating}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      PDF Dashboard
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleGenerateReport({
                        title: "Management Dashboard Report",
                        description: "Executive dashboard with key performance indicators",
                        includeSections: {
                          overview: true,
                          submissionStats: true,
                          riskAnalysis: true,
                          complianceStatus: true,
                          detailedResponses: true,
                          recommendations: true,
                        },
                        chartTypes: {
                          submissionTrends: 'line',
                          riskDistribution: 'pie',
                          complianceStatus: 'bar',
                        },
                        filterBy: {
                          dateRange: { start: '', end: '' },
                          submissionType: 'all',
                          status: 'all',
                          riskLevel: 'all',
                        },
                        customRecommendations: "Focus on process automation and vendor relationship management to improve efficiency and reduce risk exposure.",
                        format: 'excel',
                        includeCharts: true,
                      })}
                      disabled={isGenerating}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Excel Data
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Custom Reports Tab - Fully customizable report builder */}
            <TabsContent value="custom-reports" className="space-y-4">
              <ReportCustomization 
                submissions={submissions} 
                onGenerateReport={handleGenerateReport}
              />
            </TabsContent>

            {/* Analytics Preview Tab - Live charts and visualizations */}
            <TabsContent value="analytics-preview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Submission Trends Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Submission Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ReportCharts 
                      submissions={submissions} 
                      chartType="bar" 
                      dataType="submissionTrends" 
                    />
                  </CardContent>
                </Card>

                {/* Risk Distribution Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Risk Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ReportCharts 
                      submissions={submissions} 
                      chartType="pie" 
                      dataType="riskDistribution" 
                    />
                  </CardContent>
                </Card>

                {/* Compliance Status Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ReportCharts 
                      submissions={submissions} 
                      chartType="bar" 
                      dataType="complianceStatus" 
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Loading State Display */}
      {isGenerating && (
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p>Generating your report with charts...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
