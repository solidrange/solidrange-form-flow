import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Users, TrendingUp, Clock, Plus, Eye, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sampleSubmissions } from "@/data/sampleSubmissions";

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Mock data - in real app this would come from API/context
  const stats = {
    totalForms: 12,
    activeForms: 8,
    totalSubmissions: sampleSubmissions.length,
    avgCompletionRate: 85,
  };

  const recentForms = [
    { id: 1, title: "Employee Feedback Survey", submissions: 23, status: "active", lastModified: "2 hours ago" },
    { id: 2, title: "Customer Satisfaction Form", submissions: 45, status: "active", lastModified: "1 day ago" },
    { id: 3, title: "Event Registration", submissions: 12, status: "draft", lastModified: "3 days ago" },
  ];

  const recentSubmissions = sampleSubmissions.slice(0, 3).map(submission => ({
    id: submission.id,
    formTitle: `Form #${submission.formId}`,
    submitter: submission.submitterName,
    status: submission.status,
    date: new Date(submission.submittedAt).toLocaleString(),
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your forms and submissions.</p>
        </div>
        <Button onClick={() => navigate("/forms")} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Form
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalForms}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Forms</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeForms}</div>
            <p className="text-xs text-muted-foreground">Currently published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgCompletionRate}%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Forms */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Forms
              <Button variant="ghost" size="sm" onClick={() => navigate("/forms")}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentForms.map((form) => (
                <div key={form.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{form.title}</h4>
                    <p className="text-sm text-muted-foreground">{form.submissions} submissions</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={form.status === "active" ? "default" : "secondary"}>
                      {form.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Submissions
              <Button variant="ghost" size="sm" onClick={() => navigate("/submissions")}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{submission.formTitle}</h4>
                    <p className="text-sm text-muted-foreground">by {submission.submitter}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={submission.status === "approved" ? "default" : "secondary"}>
                      {submission.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{submission.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}