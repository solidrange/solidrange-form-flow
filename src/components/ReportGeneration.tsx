
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CalendarIcon, 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Users,
  PieChart,
  Target,
  Zap,
  Shield,
  Award,
  Activity,
  Calendar,
  Clock,
  LineChart,
  Building,
  Briefcase,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { BrandedButton } from "./BrandedButton";
import { BrandedCard } from "./BrandedCard";
import { BrandLogo } from "./BrandLogo";
import { useBrand } from "@/contexts/BrandContext";
import { useBranding } from "./BrandingProvider";

interface ReportGenerationProps {
  submissions: any[];
}

export const ReportGeneration = ({ submissions }: ReportGenerationProps) => {
  const { brand } = useBrand();
  const brandingContext = useBranding();
  
  const [reportConfig, setReportConfig] = useState({
    title: "Form Submission Report",
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
      submissionTrends: 'bar' as 'bar' | 'line' | 'pie',
      riskDistribution: 'pie' as 'pie' | 'donut' | 'bar',
      complianceStatus: 'bar' as 'bar' | 'line' | 'pie',
    },
    filterBy: {
      dateRange: { start: '2024-01-01', end: '2024-12-31' },
      audience: 'all' as 'all' | 'vendor' | 'internal' | 'external',
      status: 'all' as 'all' | 'submitted' | 'under_review' | 'approved' | 'rejected',
      riskLevel: 'all' as 'all' | 'low' | 'medium' | 'high' | 'critical',
    },
    customRecommendations: "",
    format: 'pdf' as 'pdf' | 'excel',
    includeCharts: true
  });

  const handleSectionToggle = (section: keyof typeof reportConfig.includeSections) => {
    setReportConfig(prev => ({
      ...prev,
      includeSections: {
        ...prev.includeSections,
        [section]: !prev.includeSections[section]
      }
    }));
  };

  const handleChartTypeChange = (chart: keyof typeof reportConfig.chartTypes, type: string) => {
    setReportConfig(prev => ({
      ...prev,
      chartTypes: {
        ...prev.chartTypes,
        [chart]: type
      }
    }));
  };

  const handleFilterChange = (filter: keyof typeof reportConfig.filterBy, value: any) => {
    setReportConfig(prev => ({
      ...prev,
      filterBy: {
        ...prev.filterBy,
        [filter]: value
      }
    }));
  };

  const generateQuickReport = async (type: string, variant?: string) => {
    console.log(`Generating quick ${type} report...`);
    
    toast({
      title: "Generating Report",
      description: `Starting ${type} ${variant ? `(${variant})` : ''} report generation...`,
    });
    
    try {
      // Import the ReportGenerator
      const { ReportGenerator } = await import('@/utils/reportGenerator');
      
      // Create different configs based on report type and variant
      let quickConfig;
      
      switch (type) {
        case 'executive-summary':
          quickConfig = {
            title: `Executive Summary Report ${variant ? `- ${variant}` : ''}`,
            description: 'High-level overview of all form submissions and key metrics',
            includeSections: {
              overview: true,
              submissionStats: true,
              riskAnalysis: true,
              complianceStatus: true,
              detailedResponses: false,
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: variant === 'detailed' ? 'line' as const : 'bar' as const,
              riskDistribution: 'pie' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { start: '2024-01-01', end: '2024-12-31' },
              audience: 'all' as const,
              status: 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: variant === 'detailed' ? 
              "Detailed executive recommendations based on comprehensive analysis of all submission data and trends." : "",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;
          
        case 'risk-analysis':
          quickConfig = {
            title: `Risk Analysis Report ${variant ? `- ${variant}` : ''}`,
            description: 'Comprehensive risk assessment of all form submissions',
            includeSections: {
              overview: variant !== 'focused',
              submissionStats: variant === 'comprehensive',
              riskAnalysis: true,
              complianceStatus: variant === 'comprehensive',
              detailedResponses: variant === 'detailed',
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: 'bar' as const,
              riskDistribution: variant === 'donut' ? 'donut' as const : 'pie' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { start: '2024-01-01', end: '2024-12-31' },
              audience: 'all' as const,
              status: 'all' as const,
              riskLevel: variant === 'high-risk-only' ? 'high' as const : 'all' as const,
            },
            customRecommendations: "Risk mitigation strategies and recommendations for improving overall risk profile.",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;
          
        case 'compliance':
          quickConfig = {
            title: `Compliance Report ${variant ? `- ${variant}` : ''}`,
            description: 'Compliance status and regulatory adherence analysis',
            includeSections: {
              overview: true,
              submissionStats: true,
              riskAnalysis: variant === 'comprehensive',
              complianceStatus: true,
              detailedResponses: variant === 'detailed',
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: 'line' as const,
              riskDistribution: 'bar' as const,
              complianceStatus: variant === 'pie-chart' ? 'pie' as const : 'bar' as const,
            },
            filterBy: {
              dateRange: { start: '2024-01-01', end: '2024-12-31' },
              audience: 'all' as const,
              status: variant === 'approved-only' ? 'approved' as const : 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: "Compliance improvement recommendations and regulatory adherence strategies.",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;
          
        case 'performance-analytics':
          quickConfig = {
            title: `Performance Analytics Report ${variant ? `- ${variant}` : ''}`,
            description: 'Performance metrics and analytics across all submissions',
            includeSections: {
              overview: true,
              submissionStats: true,
              riskAnalysis: true,
              complianceStatus: true,
              detailedResponses: variant === 'detailed',
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: variant === 'line-trends' ? 'line' as const : 'bar' as const,
              riskDistribution: 'pie' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { start: '2024-01-01', end: '2024-12-31' },
              audience: 'all' as const,
              status: 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: "Performance optimization recommendations based on submission analytics.",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;
          
        case 'submission-trends':
          quickConfig = {
            title: `Submission Trends Report ${variant ? `- ${variant}` : ''}`,
            description: 'Temporal analysis of submission patterns and trends',
            includeSections: {
              overview: variant !== 'trends-only',
              submissionStats: true,
              riskAnalysis: variant === 'comprehensive',
              complianceStatus: variant === 'comprehensive',
              detailedResponses: false,
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: variant === 'bar-chart' ? 'bar' as const : 'line' as const,
              riskDistribution: 'pie' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { start: '2024-01-01', end: '2024-12-31' },
              audience: 'all' as const,
              status: 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: "Trend-based recommendations for improving submission processes.",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;
          
        case 'vendor-analysis':
          quickConfig = {
            title: `Vendor Analysis Report ${variant ? `- ${variant}` : ''}`,
            description: 'Analysis of vendor submissions and performance',
            includeSections: {
              overview: true,
              submissionStats: true,
              riskAnalysis: true,
              complianceStatus: true,
              detailedResponses: variant === 'detailed',
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: 'bar' as const,
              riskDistribution: variant === 'donut' ? 'donut' as const : 'pie' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { start: '2024-01-01', end: '2024-12-31' },
              audience: 'vendor' as const,
              status: 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: "Vendor management recommendations and performance improvement strategies.",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;
          
        case 'score-analysis':
          quickConfig = {
            title: `Score Analysis Report ${variant ? `- ${variant}` : ''}`,
            description: 'Detailed analysis of submission scores and ratings',
            includeSections: {
              overview: true,
              submissionStats: true,
              riskAnalysis: true,
              complianceStatus: variant === 'comprehensive',
              detailedResponses: variant === 'detailed',
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: 'line' as const,
              riskDistribution: 'pie' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { start: '2024-01-01', end: '2024-12-31' },
              audience: 'all' as const,
              status: 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: "Score improvement recommendations and quality enhancement strategies.",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;
          
        case 'monthly-summary':
          quickConfig = {
            title: `Monthly Summary Report ${variant ? `- ${variant}` : ''}`,
            description: 'Monthly breakdown of submission activities and performance',
            includeSections: {
              overview: true,
              submissionStats: true,
              riskAnalysis: variant === 'comprehensive',
              complianceStatus: true,
              detailedResponses: false,
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: 'line' as const,
              riskDistribution: 'pie' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { 
                start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0], 
                end: new Date().toISOString().split('T')[0] 
              },
              audience: 'all' as const,
              status: 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: "Monthly performance recommendations and next month action items.",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;

        case 'quality-assurance':
          quickConfig = {
            title: `Quality Assurance Report ${variant ? `- ${variant}` : ''}`,
            description: 'Quality assessment and assurance metrics',
            includeSections: {
              overview: true,
              submissionStats: true,
              riskAnalysis: true,
              complianceStatus: true,
              detailedResponses: variant === 'detailed',
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: 'bar' as const,
              riskDistribution: 'pie' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { start: '2024-01-01', end: '2024-12-31' },
              audience: 'all' as const,
              status: 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: "Quality improvement recommendations and assurance strategies.",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;

        case 'process-efficiency':
          quickConfig = {
            title: `Process Efficiency Report ${variant ? `- ${variant}` : ''}`,
            description: 'Analysis of process efficiency and bottlenecks',
            includeSections: {
              overview: true,
              submissionStats: true,
              riskAnalysis: variant === 'comprehensive',
              complianceStatus: true,
              detailedResponses: variant === 'bottlenecks',
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: 'line' as const,
              riskDistribution: 'bar' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { start: '2024-01-01', end: '2024-12-31' },
              audience: 'all' as const,
              status: 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: "Process optimization recommendations and efficiency improvements.",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;

        case 'quarterly-review':
          quickConfig = {
            title: `Quarterly Review Report ${variant ? `- ${variant}` : ''}`,
            description: 'Comprehensive quarterly performance review',
            includeSections: {
              overview: true,
              submissionStats: true,
              riskAnalysis: true,
              complianceStatus: true,
              detailedResponses: variant === 'detailed',
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: 'line' as const,
              riskDistribution: 'pie' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { 
                start: new Date(new Date().getFullYear(), Math.floor(new Date().getMonth() / 3) * 3, 1).toISOString().split('T')[0], 
                end: new Date().toISOString().split('T')[0] 
              },
              audience: 'all' as const,
              status: 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: "Quarterly strategic recommendations and next quarter planning.",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;

        case 'regulatory-audit':
          quickConfig = {
            title: `Regulatory Audit Report ${variant ? `- ${variant}` : ''}`,
            description: 'Comprehensive regulatory compliance audit',
            includeSections: {
              overview: true,
              submissionStats: variant === 'comprehensive',
              riskAnalysis: true,
              complianceStatus: true,
              detailedResponses: variant === 'findings',
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: 'bar' as const,
              riskDistribution: 'pie' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { start: '2024-01-01', end: '2024-12-31' },
              audience: 'all' as const,
              status: 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: "Regulatory compliance recommendations and audit findings resolution.",
            format: 'pdf' as const,
            includeCharts: true
          };
          break;
          
        default:
          // Default executive summary
          quickConfig = {
            title: `Quick Summary Report`,
            description: 'Basic overview of form submissions',
            includeSections: {
              overview: true,
              submissionStats: true,
              riskAnalysis: false,
              complianceStatus: true,
              detailedResponses: false,
              recommendations: true,
            },
            chartTypes: {
              submissionTrends: 'bar' as const,
              riskDistribution: 'pie' as const,
              complianceStatus: 'bar' as const,
            },
            filterBy: {
              dateRange: { start: '2024-01-01', end: '2024-12-31' },
              audience: 'all' as const,
              status: 'all' as const,
              riskLevel: 'all' as const,
            },
            customRecommendations: "",
            format: 'pdf' as const,
            includeCharts: true
          };
      }

      const generator = new ReportGenerator(submissions, quickConfig);
      await generator.generate();
      
      console.log(`${type} report generated successfully!`);
      toast({
        title: "Report Generated",
        description: `${type.replace('-', ' ').charAt(0).toUpperCase() + type.replace('-', ' ').slice(1)} report has been downloaded successfully!`,
      });
    } catch (error) {
      console.error('Error generating quick report:', error);
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating the report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateCustomReport = async () => {
    console.log("Generating custom report with config:", reportConfig);
    
    toast({
      title: "Generating Custom Report",
      description: "Starting custom report generation with your settings...",
    });
    
    try {
      // Import the ReportGenerator
      const { ReportGenerator } = await import('@/utils/reportGenerator');
      
      const generator = new ReportGenerator(submissions, reportConfig);
      await generator.generate();
      
      console.log("Custom report generated successfully!");
      toast({
        title: "Custom Report Generated",
        description: "Your custom report has been downloaded successfully!",
      });
    } catch (error) {
      console.error('Error generating custom report:', error);
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating the custom report. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Calculate statistics for quick reports
  const stats = {
    total: submissions.length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    underReview: submissions.filter(s => s.status === 'under_review').length,
    highRisk: submissions.filter(s => s.score?.riskLevel === 'high' || s.score?.riskLevel === 'critical').length,
    avgScore: submissions.length > 0 ? Math.round(submissions.reduce((sum, s) => sum + (s.score?.percentage || 0), 0) / submissions.length) : 0
  };

  return (
      <div className="space-y-6 animate-fade-in">
        <div className="animate-slide-up">
          <h2 className="text-2xl font-bold mb-2 text-foreground">
            Report Generation
          </h2>
          <p className="text-muted-foreground">Generate comprehensive reports and analytics for your form submissions.</p>
        </div>

      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quick">Quick Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Executive & Summary Reports */}
            <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in">
              <CardHeader className="bg-muted rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Executive & Summary Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('executive-summary')} 
                      className="w-full justify-start hover:scale-105 transition-transform duration-200 bg-primary hover:bg-primary/90 text-primary-foreground border-0"
                      variant="outline"
                    >
                      <Award className="mr-2 h-4 w-4" />
                      Executive Summary
                    </Button>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('executive-summary', 'detailed')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Detailed
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('executive-summary', 'concise')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Concise
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('monthly-summary')} 
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Monthly Summary
                    </Button>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('monthly-summary', 'comprehensive')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Comprehensive
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('monthly-summary', 'basic')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Basic
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk & Compliance Reports */}
            <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <Shield className="h-5 w-5 text-red-500" />
                  Risk & Compliance Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('risk-analysis')} 
                      className="w-full justify-start hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white border-0"
                      variant="outline"
                    >
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Risk Analysis
                    </Button>
                    <div className="grid grid-cols-3 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('risk-analysis', 'comprehensive')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Comprehensive
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('risk-analysis', 'focused')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Focused
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('risk-analysis', 'high-risk-only')} 
                        size="sm" 
                        variant="ghost"
                      >
                        High Risk
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('compliance')} 
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Compliance Report
                    </Button>
                    <div className="grid grid-cols-3 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('compliance', 'comprehensive')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Comprehensive
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('compliance', 'approved-only')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Approved Only
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('compliance', 'pie-chart')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Pie Charts
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance & Analytics Reports */}
            <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  Performance & Analytics Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('performance-analytics')} 
                      className="w-full justify-start hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
                      variant="outline"
                    >
                      <Activity className="mr-2 h-4 w-4" />
                      Performance Analytics
                    </Button>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('performance-analytics', 'detailed')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Detailed
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('performance-analytics', 'line-trends')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Line Trends
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('score-analysis')} 
                      className="w-full justify-start hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
                      variant="outline"
                    >
                      <Target className="mr-2 h-4 w-4" />
                      Score Analysis
                    </Button>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('score-analysis', 'comprehensive')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Comprehensive
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('score-analysis', 'detailed')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Detailed
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submission & Trend Analysis */}
            <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <LineChart className="h-5 w-5 text-purple-500" />
                  Submission & Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('submission-trends')} 
                      className="w-full justify-start hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white border-0"
                      variant="outline"
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Submission Trends
                    </Button>
                    <div className="grid grid-cols-3 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('submission-trends', 'comprehensive')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Comprehensive
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('submission-trends', 'trends-only')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Trends Only
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('submission-trends', 'bar-chart')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Bar Chart
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('vendor-analysis')} 
                      className="w-full justify-start hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 text-white border-0"
                      variant="outline"
                    >
                      <Building className="mr-2 h-4 w-4" />
                      Vendor Analysis
                    </Button>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('vendor-analysis', 'detailed')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Detailed
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('vendor-analysis', 'donut')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Donut Charts
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Operational & Quality Reports */}
            <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <Briefcase className="h-5 w-5 text-amber-500" />
                  Operational & Quality Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('quality-assurance')} 
                      className="w-full justify-start hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
                      variant="outline"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Quality Assurance
                    </Button>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('quality-assurance', 'detailed')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Detailed
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('quality-assurance', 'summary')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Summary
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('process-efficiency')} 
                      className="w-full justify-start hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white border-0"
                      variant="outline"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Process Efficiency
                    </Button>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('process-efficiency', 'comprehensive')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Comprehensive
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('process-efficiency', 'bottlenecks')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Bottlenecks
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time-based & Regulatory Reports */}
            <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-teal-700">
                  <Calendar className="h-5 w-5 text-teal-500" />
                  Time-based & Regulatory Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('quarterly-review')} 
                      className="w-full justify-start hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white border-0"
                      variant="outline"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Quarterly Review
                    </Button>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('quarterly-review', 'detailed')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Detailed
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('quarterly-review', 'executive')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Executive
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={() => generateQuickReport('regulatory-audit')} 
                      className="w-full justify-start hover:scale-105 transition-transform duration-200 bg-secondary hover:bg-secondary/90 text-secondary-foreground border-0"
                      variant="outline"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Regulatory Audit
                    </Button>
                    <div className="grid grid-cols-2 gap-2 pl-4">
                      <Button 
                        onClick={() => generateQuickReport('regulatory-audit', 'comprehensive')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Comprehensive
                      </Button>
                      <Button 
                        onClick={() => generateQuickReport('regulatory-audit', 'findings')} 
                        size="sm" 
                        variant="ghost"
                      >
                        Findings
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Statistics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                  <div className="text-sm text-gray-600">Total Submissions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{stats.highRisk}</div>
                  <div className="text-sm text-gray-600">High Risk</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{stats.avgScore}%</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          {/* Report Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Report Title</Label>
                  <Input
                    id="title"
                    value={reportConfig.title}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="format">Format</Label>
                  <Select 
                    value={reportConfig.format} 
                    onValueChange={(value) => setReportConfig(prev => ({ ...prev, format: value as 'pdf' | 'excel' }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={reportConfig.description}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1"
                  rows={2}
                />
              </div>

              {/* Sections to Include */}
              <div>
                <Label className="text-base font-medium">Sections to Include</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                  {Object.entries(reportConfig.includeSections).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={() => handleSectionToggle(key as keyof typeof reportConfig.includeSections)}
                      />
                      <Label htmlFor={key} className="text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart Configuration */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Checkbox
                    id="includeCharts"
                    checked={reportConfig.includeCharts}
                    onCheckedChange={(checked) => setReportConfig(prev => ({ ...prev, includeCharts: !!checked }))}
                  />
                  <Label htmlFor="includeCharts" className="text-base font-medium">Include Charts</Label>
                </div>
                
                {reportConfig.includeCharts && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
                    <div>
                      <Label>Submission Trends</Label>
                      <Select 
                        value={reportConfig.chartTypes.submissionTrends} 
                        onValueChange={(value) => handleChartTypeChange('submissionTrends', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Risk Distribution</Label>
                      <Select 
                        value={reportConfig.chartTypes.riskDistribution} 
                        onValueChange={(value) => handleChartTypeChange('riskDistribution', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                          <SelectItem value="donut">Donut Chart</SelectItem>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Compliance Status</Label>
                      <Select 
                        value={reportConfig.chartTypes.complianceStatus} 
                        onValueChange={(value) => handleChartTypeChange('complianceStatus', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Filters */}
              <div>
                <Label className="text-base font-medium">Filters</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                  <div>
                    <Label htmlFor="dateStart">Start Date</Label>
                    <Input
                      id="dateStart"
                      type="date"
                      value={reportConfig.filterBy.dateRange.start}
                      onChange={(e) => handleFilterChange('dateRange', { ...reportConfig.filterBy.dateRange, start: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateEnd">End Date</Label>
                    <Input
                      id="dateEnd"
                      type="date"
                      value={reportConfig.filterBy.dateRange.end}
                      onChange={(e) => handleFilterChange('dateRange', { ...reportConfig.filterBy.dateRange, end: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Audience</Label>
                    <Select 
                      value={reportConfig.filterBy.audience} 
                      onValueChange={(value) => handleFilterChange('audience', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="external">External</SelectItem>
                        <SelectItem value="internal">Internal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Select 
                      value={reportConfig.filterBy.status} 
                      onValueChange={(value) => handleFilterChange('status', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Custom Recommendations */}
              <div>
                <Label htmlFor="recommendations">Custom Recommendations</Label>
                <Textarea
                  id="recommendations"
                  value={reportConfig.customRecommendations}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, customRecommendations: e.target.value }))}
                  placeholder="Enter custom recommendations for the report..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              {/* Generate Button */}
              <div className="flex gap-3 pt-4">
                <Button onClick={generateCustomReport} className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Custom Report
                </Button>
                <Button variant="outline" onClick={() => console.log("Previewing report...")}>
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
