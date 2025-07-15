import { useState } from "react";
import { FormSubmission } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatedCard } from "@/components/AnimatedCard";
import { Download, Filter, Search } from "lucide-react";

interface ReportCustomizationProps {
  submissions: FormSubmission[];
  onGenerateReport: (config: ReportConfig) => void;
}

export interface ReportConfig {
  reportType: 'single' | 'multi';
  formSearch: string;
  selectedForms: string[];
  categories: string[];
  dateRange: string;
  includeStatus: string[];
  includeScores: boolean;
  format: 'pdf' | 'csv' | 'excel';
  customizations: {
    includeCharts: boolean;
    includeRiskAnalysis: boolean;
    includeComplianceDetails: boolean;
    includeRecommendations: boolean;
  };
}

export const ReportCustomization = ({ submissions, onGenerateReport }: ReportCustomizationProps) => {
  const [config, setConfig] = useState<ReportConfig>({
    reportType: 'single',
    formSearch: '',
    selectedForms: [],
    categories: [],
    dateRange: '30d',
    includeStatus: ['approved', 'rejected', 'under_review'],
    includeScores: true,
    format: 'pdf',
    customizations: {
      includeCharts: true,
      includeRiskAnalysis: true,
      includeComplianceDetails: true,
      includeRecommendations: true
    }
  });

  const handleStatusChange = (status: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      includeStatus: checked 
        ? [...prev.includeStatus, status]
        : prev.includeStatus.filter(s => s !== status)
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handleCustomizationChange = (key: keyof ReportConfig['customizations'], checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [key]: checked
      }
    }));
  };

  // Mock form names for search - in real app, this would come from a forms API
  const availableForms = [
    'Vendor Risk Assessment Form',
    'Internal Compliance Review',
    'External Partner Evaluation',
    'Security Assessment Survey',
    'Financial Risk Analysis'
  ];

  const filteredForms = availableForms.filter(form => 
    form.toLowerCase().includes(config.formSearch.toLowerCase())
  );

  const formCategories = [
    'Risk Assessment',
    'Compliance',
    'Security',
    'Financial',
    'Vendor Management'
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AnimatedCard title="Report Configuration" icon={Filter} className="h-fit">
        <div className="space-y-4">
          {/* Report Type Selection */}
          <div>
            <Label htmlFor="report-type">Report Type</Label>
            <Select value={config.reportType} onValueChange={(value: 'single' | 'multi') => setConfig(prev => ({ ...prev, reportType: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Form Report</SelectItem>
                <SelectItem value="multi">Multi-Form Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Single Form Search */}
          {config.reportType === 'single' && (
            <div>
              <Label htmlFor="form-search">Search Form</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="form-search"
                  placeholder="Search form by name..."
                  value={config.formSearch}
                  onChange={(e) => setConfig(prev => ({ ...prev, formSearch: e.target.value }))}
                  className="pl-10"
                />
              </div>
              {config.formSearch && (
                <div className="mt-2 max-h-40 overflow-y-auto border rounded-md">
                  {filteredForms.map(form => (
                    <div 
                      key={form}
                      className="p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      onClick={() => setConfig(prev => ({ ...prev, formSearch: form }))}
                    >
                      {form}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Multi-Form Categories */}
          {config.reportType === 'multi' && (
            <div>
              <Label>Form Categories</Label>
              <div className="space-y-2 mt-2">
                {formCategories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={config.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                    />
                    <Label htmlFor={category} className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Date Range */}
          <div>
            <Label htmlFor="date-range">Date Range</Label>
            <Select value={config.dateRange} onValueChange={(value) => setConfig(prev => ({ ...prev, dateRange: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Format */}
          <div>
            <Label htmlFor="format">Export Format</Label>
            <Select value={config.format} onValueChange={(value: 'pdf' | 'csv' | 'excel') => setConfig(prev => ({ ...prev, format: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
                <SelectItem value="excel">Excel Spreadsheet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </AnimatedCard>

      <AnimatedCard title="Customization Options" icon={Filter} delay={200} className="h-fit">
        <div className="space-y-4">
          {/* Include Status Types */}
          <div>
            <Label>Include Status Types</Label>
            <div className="space-y-2 mt-2">
              {['approved', 'rejected', 'under_review', 'submitted'].map(status => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={status}
                    checked={config.includeStatus.includes(status)}
                    onCheckedChange={(checked) => handleStatusChange(status, !!checked)}
                  />
                  <Label htmlFor={status} className="capitalize text-sm">{status.replace('_', ' ')}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Report Customizations */}
          <div>
            <Label>Report Sections</Label>
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-charts"
                  checked={config.customizations.includeCharts}
                  onCheckedChange={(checked) => handleCustomizationChange('includeCharts', !!checked)}
                />
                <Label htmlFor="include-charts" className="text-sm">Include Charts & Graphs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-risk"
                  checked={config.customizations.includeRiskAnalysis}
                  onCheckedChange={(checked) => handleCustomizationChange('includeRiskAnalysis', !!checked)}
                />
                <Label htmlFor="include-risk" className="text-sm">Risk Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-compliance"
                  checked={config.customizations.includeComplianceDetails}
                  onCheckedChange={(checked) => handleCustomizationChange('includeComplianceDetails', !!checked)}
                />
                <Label htmlFor="include-compliance" className="text-sm">Compliance Details</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-recommendations"
                  checked={config.customizations.includeRecommendations}
                  onCheckedChange={(checked) => handleCustomizationChange('includeRecommendations', !!checked)}
                />
                <Label htmlFor="include-recommendations" className="text-sm">Recommendations</Label>
              </div>
            </div>
          </div>

          {/* Include Scores */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="include-scores"
              checked={config.includeScores}
              onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeScores: !!checked }))}
            />
            <Label htmlFor="include-scores" className="text-sm">Include Score Details</Label>
          </div>

          <Button onClick={() => onGenerateReport(config)} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </AnimatedCard>
    </div>
  );
};