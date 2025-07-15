
import { useState } from "react";
import { FormSubmission } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Download, 
  Filter, 
  Calendar as CalendarIcon,
  FileText,
  BarChart3,
  Shield,
  TrendingUp,
  Eye,
  PieChart,
  Activity
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ReportGenerationProps {
  submissions: FormSubmission[];
  onGenerateReport: (config: any) => void;
}

interface ReportConfig {
  title: string;
  description: string;
  format: 'pdf' | 'csv' | 'excel';
  sections: {
    overview: boolean;
    submissionStats: boolean;
    riskAnalysis: boolean;
    complianceStatus: boolean;
    detailedResponses: boolean;
    recommendations: boolean;
    includeCharts: boolean;
  };
  chartTypes: {
    submissionTrends: 'bar' | 'line' | 'pie';
    riskDistribution: 'pie' | 'bar' | 'donut';
    complianceStatus: 'bar' | 'pie' | 'horizontal';
  };
  filters: {
    startDate: Date | null;
    endDate: Date | null;
    submissionType: string;
    status: string;
  };
  customRecommendations: string;
}

export const ReportGeneration = ({ submissions, onGenerateReport }: ReportGenerationProps) => {
  const [config, setConfig] = useState<ReportConfig>({
    title: 'Form Submission Report',
    description: 'Comprehensive analysis of form submissions',
    format: 'pdf',
    sections: {
      overview: true,
      submissionStats: true,
      riskAnalysis: true,
      complianceStatus: true,
      detailedResponses: false,
      recommendations: true,
      includeCharts: true
    },
    chartTypes: {
      submissionTrends: 'bar',
      riskDistribution: 'pie',
      complianceStatus: 'bar'
    },
    filters: {
      startDate: null,
      endDate: null,
      submissionType: 'all',
      status: 'all'
    },
    customRecommendations: ''
  });

  const [activeTab, setActiveTab] = useState('quick');

  const quickReports = [
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      description: 'High-level overview for executives',
      color: 'bg-blue-500',
      icon: FileText,
      variants: ['Detailed', 'Concise']
    },
    {
      id: 'monthly-summary',
      title: 'Monthly Summary',
      description: 'Monthly performance overview',
      color: 'bg-blue-400',
      icon: BarChart3,
      variants: ['Comprehensive', 'Basic']
    },
    {
      id: 'risk-analysis',
      title: 'Risk Analysis',
      description: 'Risk assessment and compliance',
      color: 'bg-red-500',
      icon: Shield,
      variants: ['Comprehensive', 'Focused', 'High Risk']
    },
    {
      id: 'compliance-report',
      title: 'Compliance Report',
      description: 'Compliance status and requirements',
      color: 'bg-red-400',
      icon: Shield,
      variants: ['Comprehensive', 'Approved Only', 'Pie Charts']
    },
    {
      id: 'performance-analytics',
      title: 'Performance Analytics',
      description: 'Performance metrics and trends',
      color: 'bg-green-500',
      icon: TrendingUp,
      variants: ['Detailed', 'Line Trends']
    },
    {
      id: 'submission-trends',
      title: 'Submission Trends',
      description: 'Submission patterns and analytics',
      color: 'bg-purple-500',
      icon: Activity,
      variants: ['Comprehensive', 'Trends Only', 'Bar Chart']
    }
  ];

  const updateSection = (section: keyof ReportConfig['sections'], value: boolean) => {
    setConfig(prev => ({
      ...prev,
      sections: { ...prev.sections, [section]: value }
    }));
  };

  const updateChartType = (chart: keyof ReportConfig['chartTypes'], value: any) => {
    setConfig(prev => ({
      ...prev,
      chartTypes: { ...prev.chartTypes, [chart]: value }
    }));
  };

  const updateFilter = (filter: keyof ReportConfig['filters'], value: any) => {
    setConfig(prev => ({
      ...prev,
      filters: { ...prev.filters, [filter]: value }
    }));
  };

  const handleQuickReport = (reportId: string) => {
    // Generate quick report with predefined settings
    const quickConfig = {
      ...config,
      title: quickReports.find(r => r.id === reportId)?.title || config.title,
      description: quickReports.find(r => r.id === reportId)?.description || config.description
    };
    onGenerateReport(quickConfig);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Report Generation</h1>
          <p className="text-gray-600">Generate comprehensive reports and analytics for your form submissions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quick">Quick Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Executive & Summary Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <TrendingUp className="h-5 w-5" />
                  Executive & Summary Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickReports.filter(r => r.id.includes('executive') || r.id.includes('monthly')).map(report => (
                  <div key={report.id} className="space-y-2">
                    <Button
                      onClick={() => handleQuickReport(report.id)}
                      className={cn("w-full justify-start", report.color)}
                    >
                      <report.icon className="h-4 w-4 mr-2" />
                      {report.title}
                    </Button>
                    <div className="flex gap-2 ml-6">
                      {report.variants.map(variant => (
                        <Badge key={variant} variant="outline" className="text-xs">
                          {variant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Risk & Compliance Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Shield className="h-5 w-5" />
                  Risk & Compliance Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickReports.filter(r => r.id.includes('risk') || r.id.includes('compliance')).map(report => (
                  <div key={report.id} className="space-y-2">
                    <Button
                      onClick={() => handleQuickReport(report.id)}
                      className={cn("w-full justify-start", report.color)}
                    >
                      <report.icon className="h-4 w-4 mr-2" />
                      {report.title}
                    </Button>
                    <div className="flex gap-2 ml-6">
                      {report.variants.map(variant => (
                        <Badge key={variant} variant="outline" className="text-xs">
                          {variant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance & Analytics Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <BarChart3 className="h-5 w-5" />
                  Performance & Analytics Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickReports.filter(r => r.id.includes('performance')).map(report => (
                  <div key={report.id} className="space-y-2">
                    <Button
                      onClick={() => handleQuickReport(report.id)}
                      className={cn("w-full justify-start", report.color)}
                    >
                      <report.icon className="h-4 w-4 mr-2" />
                      {report.title}
                    </Button>
                    <div className="flex gap-2 ml-6">
                      {report.variants.map(variant => (
                        <Badge key={variant} variant="outline" className="text-xs">
                          {variant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Submission & Trend Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Activity className="h-5 w-5" />
                  Submission & Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickReports.filter(r => r.id.includes('submission')).map(report => (
                  <div key={report.id} className="space-y-2">
                    <Button
                      onClick={() => handleQuickReport(report.id)}
                      className={cn("w-full justify-start", report.color)}
                    >
                      <report.icon className="h-4 w-4 mr-2" />
                      {report.title}
                    </Button>
                    <div className="flex gap-2 ml-6">
                      {report.variants.map(variant => (
                        <Badge key={variant} variant="outline" className="text-xs">
                          {variant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="report-title">Report Title</Label>
                  <Input
                    id="report-title"
                    value={config.title}
                    onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="format">Format</Label>
                  <Select value={config.format} onValueChange={(value: 'pdf' | 'csv' | 'excel') => 
                    setConfig(prev => ({ ...prev, format: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={config.description}
                  onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter report description..."
                />
              </div>

              {/* Sections to Include */}
              <div>
                <Label className="text-base font-medium">Sections to Include</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {Object.entries(config.sections).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={value}
                        onCheckedChange={(checked) => updateSection(key as keyof ReportConfig['sections'], !!checked)}
                      />
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart Configuration */}
              {config.sections.includeCharts && (
                <div>
                  <Label className="text-base font-medium">Include Charts</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div>
                      <Label htmlFor="submission-trends">Submission Trends</Label>
                      <Select 
                        value={config.chartTypes.submissionTrends} 
                        onValueChange={(value) => updateChartType('submissionTrends', value)}
                      >
                        <SelectTrigger>
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
                      <Label htmlFor="risk-distribution">Risk Distribution</Label>
                      <Select 
                        value={config.chartTypes.riskDistribution} 
                        onValueChange={(value) => updateChartType('riskDistribution', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="donut">Donut Chart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="compliance-status">Compliance Status</Label>
                      <Select 
                        value={config.chartTypes.complianceStatus} 
                        onValueChange={(value) => updateChartType('complianceStatus', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                          <SelectItem value="horizontal">Horizontal Bar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Filters */}
              <div>
                <Label className="text-base font-medium">Filters</Label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                  <div>
                    <Label htmlFor="start-date">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {config.filters.startDate ? format(config.filters.startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={config.filters.startDate || undefined}
                          onSelect={(date) => updateFilter('startDate', date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {config.filters.endDate ? format(config.filters.endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={config.filters.endDate || undefined}
                          onSelect={(date) => updateFilter('endDate', date)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="submission-type">Submission Type</Label>
                    <Select 
                      value={config.filters.submissionType} 
                      onValueChange={(value) => updateFilter('submissionType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="internal">Internal</SelectItem>
                        <SelectItem value="external">External</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={config.filters.status} 
                      onValueChange={(value) => updateFilter('status', value)}
                    >
                      <SelectTrigger>
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
                <Label htmlFor="custom-recommendations">Custom Recommendations</Label>
                <Textarea
                  id="custom-recommendations"
                  value={config.customRecommendations}
                  onChange={(e) => setConfig(prev => ({ ...prev, customRecommendations: e.target.value }))}
                  placeholder="Enter custom recommendations for the report..."
                  rows={4}
                />
              </div>

              <div className="flex justify-between">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button onClick={() => onGenerateReport(config)}>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Custom Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
