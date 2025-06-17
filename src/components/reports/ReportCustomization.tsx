
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormSubmission } from "@/types/form";

interface ReportCustomizationProps {
  submissions: FormSubmission[];
  onGenerateReport: (config: ReportConfig) => void;
}

export interface ReportConfig {
  title: string;
  description: string;
  includeSections: {
    overview: boolean;
    submissionStats: boolean;
    riskAnalysis: boolean;
    complianceStatus: boolean;
    detailedResponses: boolean;
    recommendations: boolean;
  };
  chartTypes: {
    submissionTrends: 'bar' | 'line' | 'pie';
    riskDistribution: 'bar' | 'pie' | 'donut';
    complianceStatus: 'bar' | 'pie';
  };
  filterBy: {
    dateRange: { start: string; end: string };
    submissionType: 'all' | 'vendor' | 'internal';
    status: 'all' | 'submitted' | 'approved' | 'rejected' | 'under_review';
    riskLevel: 'all' | 'low' | 'medium' | 'high' | 'critical';
  };
  customRecommendations: string;
  format: 'pdf' | 'excel';
}

export const ReportCustomization = ({ submissions, onGenerateReport }: ReportCustomizationProps) => {
  const [config, setConfig] = useState<ReportConfig>({
    title: "Vendor Risk Assessment Report",
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
  });

  const updateSection = (section: keyof ReportConfig['includeSections'], value: boolean) => {
    setConfig(prev => ({
      ...prev,
      includeSections: { ...prev.includeSections, [section]: value }
    }));
  };

  const updateChartType = (chart: keyof ReportConfig['chartTypes'], type: string) => {
    setConfig(prev => ({
      ...prev,
      chartTypes: { ...prev.chartTypes, [chart]: type }
    }));
  };

  const updateFilter = (filter: keyof ReportConfig['filterBy'], value: any) => {
    setConfig(prev => ({
      ...prev,
      filterBy: { ...prev.filterBy, [filter]: value }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Report Customization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="report-title">Report Title</Label>
              <Input
                id="report-title"
                value={config.title}
                onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="report-description">Description</Label>
              <Textarea
                id="report-description"
                value={config.description}
                onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>

          {/* Report Sections */}
          <div>
            <Label className="text-base font-semibold">Include Sections</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {Object.entries(config.includeSections).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => updateSection(key as keyof ReportConfig['includeSections'], !!checked)}
                  />
                  <Label htmlFor={key} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Types */}
          <div>
            <Label className="text-base font-semibold">Chart Types</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <Label htmlFor="submission-trends">Submission Trends</Label>
                <Select value={config.chartTypes.submissionTrends} onValueChange={(value) => updateChartType('submissionTrends', value)}>
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
                <Select value={config.chartTypes.riskDistribution} onValueChange={(value) => updateChartType('riskDistribution', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="donut">Donut Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="compliance-status">Compliance Status</Label>
                <Select value={config.chartTypes.complianceStatus} onValueChange={(value) => updateChartType('complianceStatus', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div>
            <Label className="text-base font-semibold">Filters</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              <div>
                <Label htmlFor="submission-type">Submission Type</Label>
                <Select value={config.filterBy.submissionType} onValueChange={(value) => updateFilter('submissionType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={config.filterBy.status} onValueChange={(value) => updateFilter('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="risk-level">Risk Level</Label>
                <Select value={config.filterBy.riskLevel} onValueChange={(value) => updateFilter('riskLevel', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="format">Export Format</Label>
                <Select value={config.format} onValueChange={(value) => setConfig(prev => ({ ...prev, format: value as 'pdf' | 'excel' }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
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
              placeholder="Add custom recommendations for this report..."
              value={config.customRecommendations}
              onChange={(e) => setConfig(prev => ({ ...prev, customRecommendations: e.target.value }))}
            />
          </div>

          <Button onClick={() => onGenerateReport(config)} className="w-full">
            Generate {config.format.toUpperCase()} Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
