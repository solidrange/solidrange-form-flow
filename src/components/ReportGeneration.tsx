
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp } from "lucide-react";

export const ReportGeneration = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Report Generation Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Submission Summary Report</h3>
              <p className="text-sm text-gray-600 mb-4">
                Generate a comprehensive report with submission statistics, completion rates, and approval status.
              </p>
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate PDF Report
              </Button>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Risk Assessment Report</h3>
              <p className="text-sm text-gray-600 mb-4">
                Create detailed risk analysis reports with scoring breakdowns and recommendations.
              </p>
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Generate Risk Report
              </Button>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Vendor Compliance Report</h3>
              <p className="text-sm text-gray-600 mb-4">
                Generate compliance reports for vendor submissions with customizable criteria.
              </p>
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Compliance Report
              </Button>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Management Dashboard</h3>
              <p className="text-sm text-gray-600 mb-4">
                Create executive summary reports with graphs, statistics, and recommendations.
              </p>
              <Button className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Generate Dashboard
              </Button>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
