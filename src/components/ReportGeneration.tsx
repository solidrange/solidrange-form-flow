
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

interface ReportGenerationProps {
  submissions: FormSubmission[];
}

export const ReportGeneration = ({ submissions }: ReportGenerationProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewConfig, setPreviewConfig] = useState<ReportConfig | null>(null);

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

  const getQuickReportStats = () => {
    const total = submissions.length;
    const approved = submissions.filter(s => s.status === 'approved').length;
    const highRisk = submissions.filter(s => {
      if (s.score && typeof s.score === 'object') {
        const riskLevel = (s.score as any)?.riskLevel;
        return riskLevel === 'high' || riskLevel === 'critical';
      }
      return false;
    }).length;
    const submissionsWithScores = submissions.filter(s => s.score && typeof s.score === 'object');
    const averageScore = submissionsWithScores.length > 0 
      ? submissionsWithScores.reduce((sum, s) => sum + ((s.score as any)?.percentage || 0), 0) / submissionsWithScores.length
      : 0;

    return { total, approved, highRisk, averageScore: Math.round(averageScore) };
  };

  const stats = getQuickReportStats();

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden xs:inline">Report Generation Tool</span>
            <span className="xs:hidden">Reports</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <Tabs defaultValue="quick-reports" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quick-reports" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Quick Reports</span>
                <span className="sm:hidden">Quick</span>
              </TabsTrigger>
              <TabsTrigger value="custom-reports" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Custom Reports</span>
                <span className="sm:hidden">Custom</span>
              </TabsTrigger>
              <TabsTrigger value="analytics-preview" className="text-xs sm:text-sm">
                <span className="hidden sm:inline">Analytics Preview</span>
                <span className="sm:hidden">Analytics</span>
              </TabsTrigger>
            </TabsList>

            {/* Quick Reports Tab */}
            <TabsContent value="quick-reports" className="space-y-3 sm:space-y-4 mt-3 sm:mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                
                <Card className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Executive Summary Report</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    Comprehensive overview with key statistics and analysis.
                  </p>
                  
                  <div className="text-xs sm:text-sm space-y-1 mb-3 sm:mb-4">
                    <div>Total: <span className="font-medium">{stats.total}</span></div>
                    <div>Approved: <span className="font-medium">{stats.approved}</span></div>
                    <div>High Risk: <span className="font-medium text-red-600">{stats.highRisk}</span></div>
                    <div>Avg Score: <span className="font-medium">{stats.averageScore}%</span></div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 text-xs px-2 py-1" 
                      size="sm"
                      onClick={() => handleGenerateReport({
                        title: "Executive Summary Report",
                        description: "Comprehensive analysis of form submissions",
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
                      <FileText className="h-3 w-3 mr-1" />
                      PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 text-xs px-2 py-1"
                      size="sm"
                      onClick={() => handleGenerateReport({
                        title: "Executive Summary Report",
                        description: "Comprehensive analysis of form submissions",
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
                      <Download className="h-3 w-3 mr-1" />
                      Excel
                    </Button>
                  </div>
                </Card>

                {/* Risk Assessment Report Card */}
                <Card className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Risk Assessment Report</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    Detailed risk analysis with scoring and compliance.
                  </p>
                  
                  <div className="text-xs sm:text-sm space-y-1 mb-3 sm:mb-4">
                    <div>Categories: <span className="font-medium">Security, Compliance</span></div>
                    <div>Model: <span className="font-medium">Risk Matrix</span></div>
                    <div>Framework: <span className="font-medium">ISO 27001, GDPR</span></div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 text-xs px-2 py-1"
                      size="sm"
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
                      <FileText className="h-3 w-3 mr-1" />
                      PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 text-xs px-2 py-1"
                      size="sm"
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
                      <Download className="h-3 w-3 mr-1" />
                      Excel
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Custom Reports Tab */}
            <TabsContent value="custom-reports" className="space-y-4 mt-3 sm:mt-6">
              <ReportCustomization 
                submissions={submissions} 
                onGenerateReport={handleGenerateReport}
              />
            </TabsContent>

            {/* Analytics Preview Tab - Fixed for mobile */}
            <TabsContent value="analytics-preview" className="space-y-3 sm:space-y-4 mt-3 sm:mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                
                {/* Submission Trends Chart */}
                <Card className="w-full">
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
                    <CardTitle className="text-xs sm:text-sm font-medium">
                      <span className="hidden sm:inline">Submission Trends</span>
                      <span className="sm:hidden">Trends</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4">
                    <div className="h-48 sm:h-64">
                      <ReportCharts 
                        submissions={submissions} 
                        chartType="bar" 
                        dataType="submissionTrends" 
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Distribution Chart */}
                <Card className="w-full">
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
                    <CardTitle className="text-xs sm:text-sm font-medium">
                      <span className="hidden sm:inline">Risk Distribution</span>
                      <span className="sm:hidden">Risk</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4">
                    <div className="h-48 sm:h-64">
                      <ReportCharts 
                        submissions={submissions} 
                        chartType="pie" 
                        dataType="riskDistribution" 
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance Status Chart */}
                <Card className="w-full lg:col-span-2 xl:col-span-1">
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
                    <CardTitle className="text-xs sm:text-sm font-medium">
                      <span className="hidden sm:inline">Compliance Status</span>
                      <span className="sm:hidden">Compliance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-4">
                    <div className="h-48 sm:h-64">
                      <ReportCharts 
                        submissions={submissions} 
                        chartType="bar" 
                        dataType="complianceStatus" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Stats for Analytics */}
              <Card>
                <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
                  <CardTitle className="text-xs sm:text-sm font-medium">Quick Statistics</CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-blue-600">{stats.total}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.approved}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Approved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-red-600">{stats.highRisk}</div>
                      <div className="text-xs sm:text-sm text-gray-600">High Risk</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-purple-600">{stats.averageScore}%</div>
                      <div className="text-xs sm:text-sm text-gray-600">Avg Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Loading State Display */}
      {isGenerating && (
        <Card>
          <CardContent className="flex items-center justify-center py-6 sm:py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-xs sm:text-sm">Generating your report with charts...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
