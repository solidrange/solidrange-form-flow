
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Download, FileText, BarChart3, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sampleSubmissions } from "@/data/sampleSubmissions";

export const ReportGeneration = () => {
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
      submissionType: 'all' as 'all' | 'vendor' | 'internal',
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

  const generateQuickReport = (type: string) => {
    console.log(`Generating quick ${type} report...`);
    // Simulate report generation
    setTimeout(() => {
      console.log(`${type} report generated successfully!`);
    }, 2000);
  };

  const generateCustomReport = () => {
    console.log("Generating custom report with config:", reportConfig);
    // Simulate report generation with custom configuration
    setTimeout(() => {
      console.log("Custom report generated successfully!");
    }, 3000);
  };

  // Calculate statistics for quick reports
  const stats = {
    total: sampleSubmissions.length,
    approved: sampleSubmissions.filter(s => s.status === 'approved').length,
    rejected: sampleSubmissions.filter(s => s.status === 'rejected').length,
    underReview: sampleSubmissions.filter(s => s.status === 'under_review').length,
    highRisk: sampleSubmissions.filter(s => s.score?.riskLevel === 'high' || s.score?.riskLevel === 'critical').length,
    avgScore: Math.round(sampleSubmissions.reduce((sum, s) => sum + (s.score?.percentage || 0), 0) / sampleSubmissions.length)
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Report Generation</h2>
        <p className="text-gray-600">Generate comprehensive reports and analytics for your form submissions.</p>
      </div>

      <Tabs defaultValue="quick" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quick">Quick Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="quick" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Executive Summary Report */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Executive Summary</CardTitle>
                    <p className="text-sm text-gray-500">High-level overview</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Submissions</span>
                    <Badge variant="secondary">{stats.total}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Approval Rate</span>
                    <Badge variant="default">{Math.round((stats.approved / stats.total) * 100)}%</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Score</span>
                    <Badge variant="outline">{stats.avgScore}%</Badge>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => generateQuickReport('executive')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Risk Analysis Report */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Risk Analysis</CardTitle>
                    <p className="text-sm text-gray-500">Risk assessment overview</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>High Risk</span>
                    <Badge variant="destructive">{stats.highRisk}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Under Review</span>
                    <Badge variant="secondary">{stats.underReview}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Rejected</span>
                    <Badge variant="outline">{stats.rejected}</Badge>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => generateQuickReport('risk')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Compliance Report */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Compliance Status</CardTitle>
                    <p className="text-sm text-gray-500">Regulatory compliance</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Compliant</span>
                    <Badge variant="default">{stats.approved}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Non-Compliant</span>
                    <Badge variant="destructive">{stats.rejected}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Compliance Rate</span>
                    <Badge variant="outline">{Math.round((stats.approved / stats.total) * 100)}%</Badge>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => generateQuickReport('compliance')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
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
                    <Label>Submission Type</Label>
                    <Select 
                      value={reportConfig.filterBy.submissionType} 
                      onValueChange={(value) => handleFilterChange('submissionType', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
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
