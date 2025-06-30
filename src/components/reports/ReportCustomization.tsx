
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
  includeCharts?: boolean;
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
    includeCharts: true,
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

  const sectionOptions = [
    { key: 'overview', label: 'Overview' },
    { key: 'submissionStats', label: 'Submission Stats' },
    { key: 'riskAnalysis', label: 'Risk Analysis' },
    { key: 'complianceStatus', label: 'Compliance Status' },
    { key: 'detailedResponses', label: 'Detailed Responses' },
    { key: 'recommendations', label: 'Recommendations' },
  ];

  const chartOptions = [
    { key: 'submissionTrends', label: 'Submission Trends', options: ['bar', 'line', 'pie'] },
    { key: 'riskDistribution', label: 'Risk Distribution', options: ['bar', 'pie', 'donut'] },
    { key: 'complianceStatus', label: 'Compliance Status', options: ['bar', 'pie'] },
  ];

  const filterOptions = [
    { key: 'submissionType', label: 'Submission Type', options: ['all', 'vendor', 'internal'] },
    { key: 'status', label: 'Status', options: ['all', 'submitted', 'approved', 'rejected', 'under_review'] },
    { key: 'riskLevel', label: 'Risk Level', options: ['all', 'low', 'medium', 'high', 'critical'] },
  ];

  return (
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

        {/* Chart Options */}
        <div>
          <Label className="text-base font-semibold">Chart Options</Label>
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="include-charts"
              checked={config.includeCharts || false}
              onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeCharts: !!checked }))}
            />
            <Label htmlFor="include-charts">Include Charts in Report</Label>
          </div>
        </div>

        {/* Report Sections */}
        <div>
          <Label className="text-base font-semibold">Include Sections</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {sectionOptions.map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={config.includeSections[key as keyof ReportConfig['includeSections']]}
                  onCheckedChange={(checked) => updateSection(key as keyof ReportConfig['includeSections'], !!checked)}
                />
                <Label htmlFor={key}>{label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Types - Only show if charts are enabled */}
        {config.includeCharts && (
          <div>
            <Label className="text-base font-semibold">Chart Types</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {chartOptions.map(({ key, label, options }) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Select 
                    value={config.chartTypes[key as keyof ReportConfig['chartTypes']]} 
                    onValueChange={(value) => updateChartType(key as keyof ReportConfig['chartTypes'], value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map(option => (
                        <SelectItem key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)} Chart
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div>
          <Label className="text-base font-semibold">Filters</Label>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
            {filterOptions.map(({ key, label, options }) => (
              <div key={key}>
                <Label>{label}</Label>
                <Select 
                  value={config.filterBy[key as keyof ReportConfig['filterBy']] as string} 
                  onValueChange={(value) => updateFilter(key as keyof ReportConfig['filterBy'], value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map(option => (
                      <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
            
            <div>
              <Label>Export Format</Label>
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
          Generate {config.format.toUpperCase()} Report {config.includeCharts && '(with Charts)'}
        </Button>
      </CardContent>
    </Card>
  );
};
