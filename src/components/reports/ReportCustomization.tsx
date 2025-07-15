
import { useState } from "react";
import { FormSubmission } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, Filter } from "lucide-react";

interface ReportCustomizationProps {
  submissions: FormSubmission[];
  onGenerateReport: (config: ReportConfig) => void;
}

export interface ReportConfig {
  dateRange: string;
  includeStatus: string[];
  includeScores: boolean;
  format: 'pdf' | 'csv' | 'excel';
}

export const ReportCustomization = ({ submissions, onGenerateReport }: ReportCustomizationProps) => {
  const [config, setConfig] = useState<ReportConfig>({
    dateRange: '30d',
    includeStatus: ['approved', 'rejected', 'under_review'],
    includeScores: true,
    format: 'pdf'
  });

  const handleStatusChange = (status: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      includeStatus: checked 
        ? [...prev.includeStatus, status]
        : prev.includeStatus.filter(s => s !== status)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Report Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
                <Label htmlFor={status} className="capitalize">{status.replace('_', ' ')}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="include-scores"
            checked={config.includeScores}
            onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeScores: !!checked }))}
          />
          <Label htmlFor="include-scores">Include Score Details</Label>
        </div>

        <div>
          <Label htmlFor="format">Export Format</Label>
          <Select value={config.format} onValueChange={(value: 'pdf' | 'csv' | 'excel') => setConfig(prev => ({ ...prev, format: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => onGenerateReport(config)} className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </CardContent>
    </Card>
  );
};
