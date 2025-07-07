import { useState } from "react";
import { ReportGeneration } from "@/components/ReportGeneration";
import Analytics from "@/components/Analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Download, TrendingUp, Users, Clock, Target } from "lucide-react";
import { sampleSubmissions } from "@/data/sampleSubmissions";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("analytics");

  // Mock data for demonstration
  const reportStats = {
    totalReports: 24,
    scheduledReports: 8,
    avgGenerationTime: "2.3s",
    mostPopularReport: "Monthly Submission Summary",
  };

  const recentReports = [
    { id: 1, name: "Monthly Submission Report", type: "PDF", generated: "2 hours ago", size: "2.1 MB" },
    { id: 2, name: "Employee Feedback Analysis", type: "Excel", generated: "1 day ago", size: "1.8 MB" },
    { id: 3, name: "Customer Satisfaction Trends", type: "PDF", generated: "3 days ago", size: "3.2 MB" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate insights and reports from your form data</p>
        </div>
        <Button className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Generate New Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.totalReports}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.scheduledReports}</div>
            <p className="text-xs text-muted-foreground">Auto-generated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Generation Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportStats.avgGenerationTime}</div>
            <p className="text-xs text-muted-foreground">-15% faster</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">{reportStats.mostPopularReport}</div>
            <p className="text-xs text-muted-foreground">12 generations</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate Reports
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Report History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-4">
          <Analytics 
            submissions={sampleSubmissions} 
            onFilterSubmissions={(filters) => console.log('Filter submissions:', filters)}
          />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <ReportGeneration submissions={sampleSubmissions} />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{report.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>Type: {report.type}</span>
                        <span>Size: {report.size}</span>
                        <span>Generated: {report.generated}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {recentReports.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No reports generated yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}