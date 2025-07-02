
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, BarChart3, Users, Shield, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportCustomization, ReportConfig } from "./reports/ReportCustomization";
import { ReportCharts } from "./reports/ReportCharts";
import { ReportGenerator } from "@/utils/reportGenerator";
import { FormSubmission } from "@/types/form";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
   * Calculates comprehensive statistics for display in report cards and analytics
   * Provides immediate insights into submission data without full report generation
   * 
   * @returns Object containing key metrics and detailed analytics
   */
  const getComprehensiveStats = () => {
    const total = submissions.length;
    const approved = submissions.filter(s => s.status === 'approved').length;
    const rejected = submissions.filter(s => s.status === 'rejected').length;
    const underReview = submissions.filter(s => s.status === 'under_review').length;
    const submitted = submissions.filter(s => s.status === 'submitted').length;
    
    // Risk analysis
    const highRisk = submissions.filter(s => {
      if (s.score && typeof s.score === 'object') {
        const riskLevel = (s.score as any)?.riskLevel;
        return riskLevel === 'high' || riskLevel === 'critical';
      }
      return false;
    }).length;
    
    const criticalRisk = submissions.filter(s => {
      if (s.score && typeof s.score === 'object') {
        return (s.score as any)?.riskLevel === 'critical';
      }
      return false;
    }).length;
    
    const mediumRisk = submissions.filter(s => {
      if (s.score && typeof s.score === 'object') {
        return (s.score as any)?.riskLevel === 'medium';
      }
      return false;
    }).length;
    
    const lowRisk = submissions.filter(s => {
      if (s.score && typeof s.score === 'object') {
        return (s.score as any)?.riskLevel === 'low';
      }
      return false;
    }).length;
    
    // Calculate average score from submissions with valid score objects
    const submissionsWithScores = submissions.filter(s => s.score && typeof s.score === 'object');
    const averageScore = submissionsWithScores.length > 0 
      ? submissionsWithScores.reduce((sum, s) => sum + ((s.score as any)?.percentage || 0), 0) / submissionsWithScores.length
      : 0;

    // Time-based analytics
    const last30Days = submissions.filter(s => {
      const submissionDate = new Date(s.submittedAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return submissionDate >= thirtyDaysAgo;
    }).length;

    const thisMonth = submissions.filter(s => {
      const submissionDate = new Date(s.submittedAt);
      const now = new Date();
      return submissionDate.getMonth() === now.getMonth() && submissionDate.getFullYear() === now.getFullYear();
    }).length;

    // Compliance rate
    const complianceRate = total > 0 ? ((approved / total) * 100) : 0;
    
    // Response time analysis (mock data for demonstration)
    const avgResponseTime = 2.5; // days
    const fastestResponse = 0.5; // days
    const slowestResponse = 7; // days

    return { 
      total, 
      approved, 
      rejected, 
      underReview, 
      submitted,
      highRisk, 
      criticalRisk,
      mediumRisk,
      lowRisk,
      averageScore: Math.round(averageScore),
      last30Days,
      thisMonth,
      complianceRate: Math.round(complianceRate * 10) / 10,
      avgResponseTime,
      fastestResponse,
      slowestResponse
    };
  };

  const stats = getComprehensiveStats();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Report Generation Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <TrendingUp className="h-5 w-5" />
            Report Generation Tool
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="quick-reports" className="w-full">
            {/* Tab Navigation */}
            <TabsList className="grid w-full grid-cols-3 h-9 sm:h-10">
              <TabsTrigger value="quick-reports" className="text-xs sm:text-sm px-2 sm:px-3">Quick Reports</TabsTrigger>
              <TabsTrigger value="custom-reports" className="text-xs sm:text-sm px-2 sm:px-3">Custom Reports</TabsTrigger>
              <TabsTrigger value="analytics-preview" className="text-xs sm:text-sm px-2 sm:px-3">Analytics Preview</TabsTrigger>
            </TabsList>

            {/* Quick Reports Tab - Pre-configured report templates */}
            <TabsContent value="quick-reports" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Executive Summary Report Card */}
                <Card className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Executive Summary Report</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    Comprehensive overview with key statistics, risk analysis, executive recommendations, and visual charts.
                  </p>
                  
                  {/* Quick Stats Display */}
                  <div className="text-xs sm:text-sm space-y-1 mb-4">
                    <div>Total Submissions: <span className="font-medium">{stats.total}</span></div>
                    <div>Approved: <span className="font-medium text-green-600">{stats.approved}</span></div>
                    <div>High Risk: <span className="font-medium text-red-600">{stats.highRisk}</span></div>
                    <div>Avg Score: <span className="font-medium">{stats.averageScore}%</span></div>
                  </div>
                  
                  {/* Report Generation Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 text-xs sm:text-sm h-8 sm:h-9" 
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
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
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
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Excel
                    </Button>
                  </div>
                </Card>

                {/* Risk Assessment Report Card */}
                <Card className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Risk Assessment Report</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    Detailed risk analysis with scoring breakdowns, compliance status, charts, and actionable insights.
                  </p>
                  
                  {/* Risk Assessment Details */}
                  <div className="text-xs sm:text-sm space-y-1 mb-4">
                    <div>Critical Risk: <span className="font-medium text-red-600">{stats.criticalRisk}</span></div>
                    <div>High Risk: <span className="font-medium text-orange-600">{stats.highRisk}</span></div>
                    <div>Medium Risk: <span className="font-medium text-yellow-600">{stats.mediumRisk}</span></div>
                    <div>Low Risk: <span className="font-medium text-green-600">{stats.lowRisk}</span></div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
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
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
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
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Excel
                    </Button>
                  </div>
                </Card>

                {/* Vendor Compliance Report Card */}
                <Card className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Vendor Compliance Report</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    Compliance-focused report for vendor submissions with regulatory requirements analysis and visual data.
                  </p>
                  
                  <div className="text-xs sm:text-sm space-y-1 mb-4">
                    <div>Compliance Rate: <span className="font-medium text-blue-600">{stats.complianceRate}%</span></div>
                    <div>Under Review: <span className="font-medium text-yellow-600">{stats.underReview}</span></div>
                    <div>This Month: <span className="font-medium">{stats.thisMonth}</span></div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
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
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
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
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Excel
                    </Button>
                  </div>
                </Card>

                {/* Management Dashboard Report Card */}
                <Card className="p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Management Dashboard</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    Executive summary with interactive graphs, KPIs, and strategic recommendations for leadership.
                  </p>
                  
                  <div className="text-xs sm:text-sm space-y-1 mb-4">
                    <div>Avg Response Time: <span className="font-medium">{stats.avgResponseTime} days</span></div>
                    <div>Last 30 Days: <span className="font-medium">{stats.last30Days} submissions</span></div>
                    <div>Performance: <Badge variant="secondary" className="text-xs">Excellent</Badge></div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
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
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 text-xs sm:text-sm h-8 sm:h-9"
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
                      <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Excel
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Custom Reports Tab - Fully customizable report builder */}
            <TabsContent value="custom-reports" className="space-y-4 mt-4">
              <ReportCustomization 
                submissions={submissions} 
                onGenerateReport={handleGenerateReport}
              />
            </TabsContent>

            {/* Analytics Preview Tab - Comprehensive analytics dashboard */}
            <TabsContent value="analytics-preview" className="space-y-4 mt-4">
              {/* Overview Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                <Card className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Total</span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</div>
                  <div className="text-xs text-gray-500">Submissions</div>
                </Card>

                <Card className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Approved</span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-green-600">{stats.approved}</div>
                  <div className="text-xs text-gray-500">{stats.complianceRate}% rate</div>
                </Card>

                <Card className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Review</span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-yellow-600">{stats.underReview}</div>
                  <div className="text-xs text-gray-500">Pending</div>
                </Card>

                <Card className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-red-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-600">High Risk</span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-red-600">{stats.highRisk}</div>
                  <div className="text-xs text-gray-500">Critical: {stats.criticalRisk}</div>
                </Card>

                <Card className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Avg Score</span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-purple-600">{stats.averageScore}%</div>
                  <div className="text-xs text-gray-500">Performance</div>
                </Card>

                <Card className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-indigo-600" />
                    <span className="text-xs sm:text-sm font-medium text-gray-600">This Month</span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-indigo-600">{stats.thisMonth}</div>
                  <div className="text-xs text-gray-500">+{Math.round((stats.thisMonth / stats.total) * 100)}%</div>
                </Card>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {/* Submission Trends Chart */}
                <Card className="col-span-1 lg:col-span-2 xl:col-span-1">
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Submission Trends
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
                <Card>
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Risk Distribution
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
                <Card>
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Compliance Status
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

              {/* Detailed Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Response Time Analytics */}
                <Card>
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Response Time Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-600">Average Response Time</span>
                      <span className="font-semibold text-sm sm:text-base">{stats.avgResponseTime} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-600">Fastest Response</span>
                      <span className="font-semibold text-green-600 text-sm sm:text-base">{stats.fastestResponse} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-600">Slowest Response</span>
                      <span className="font-semibold text-red-600 text-sm sm:text-base">{stats.slowestResponse} days</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500">65% of responses within 3 days</p>
                  </CardContent>
                </Card>

                {/* Risk Breakdown */}
                <Card>
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Risk Level Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        <span className="text-xs sm:text-sm">Critical Risk</span>
                      </div>
                      <span className="font-semibold text-sm sm:text-base">{stats.criticalRisk}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-xs sm:text-sm">High Risk</span>
                      </div>
                      <span className="font-semibold text-sm sm:text-base">{stats.highRisk - stats.criticalRisk}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs sm:text-sm">Medium Risk</span>
                      </div>
                      <span className="font-semibold text-sm sm:text-base">{stats.mediumRisk}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs sm:text-sm">Low Risk</span>
                      </div>
                      <span className="font-semibold text-sm sm:text-base">{stats.lowRisk}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Indicators */}
              <Card>
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Key Performance Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">{stats.complianceRate}%</div>
                      <div className="text-xs sm:text-sm text-gray-600">Compliance Rate</div>
                      <Badge variant="secondary" className="mt-1 text-xs">Excellent</Badge>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">{stats.averageScore}%</div>
                      <div className="text-xs sm:text-sm text-gray-600">Average Score</div>
                      <Badge variant="secondary" className="mt-1 text-xs">Good</Badge>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">{stats.avgResponseTime}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Days Response</div>
                      <Badge variant="secondary" className="mt-1 text-xs">Fast</Badge>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1">{Math.round((stats.highRisk / stats.total) * 100)}%</div>
                      <div className="text-xs sm:text-sm text-gray-600">Risk Exposure</div>
                      <Badge variant="outline" className="mt-1 text-xs">Monitor</Badge>
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
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-gray-900 mx-auto mb-3 sm:mb-4"></div>
              <p className="text-sm sm:text-base">Generating your report with charts...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
