
import { useState } from "react";
import { FormSubmission } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertTriangle,
  Star,
  Target,
  Calendar,
  Building,
  Shield
} from "lucide-react";

interface AnalyticsProps {
  submissions?: FormSubmission[];
}

export const Analytics = ({ submissions = [] }: AnalyticsProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Calculate analytics metrics
  const totalSubmissions = submissions.length;
  const approvedSubmissions = submissions.filter(s => s.status === 'approved').length;
  const rejectedSubmissions = submissions.filter(s => s.status === 'rejected').length;
  const pendingSubmissions = submissions.filter(s => s.status === 'under_review').length;
  const submittedSubmissions = submissions.filter(s => s.status === 'submitted').length;

  const approvalRate = totalSubmissions > 0 ? (approvedSubmissions / totalSubmissions) * 100 : 0;
  const rejectionRate = totalSubmissions > 0 ? (rejectedSubmissions / totalSubmissions) * 100 : 0;

  // Risk level analytics
  const riskLevels = submissions.reduce((acc, sub) => {
    const risk = sub.score?.riskLevel || 'medium';
    acc[risk] = (acc[risk] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Submission type analytics
  const submissionTypes = submissions.reduce((acc, sub) => {
    acc[sub.submissionType] = (acc[sub.submissionType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Average scores
  const avgScore = submissions.length > 0 
    ? submissions.reduce((acc, sub) => acc + (sub.score?.percentage || 0), 0) / submissions.length
    : 0;

  // Monthly submission trends
  const monthlyData = submissions.reduce((acc, sub) => {
    const month = sub.submittedAt.toLocaleString('default', { month: 'short', year: '2-digit' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.submissions += 1;
      if (sub.status === 'approved') existing.approved += 1;
      if (sub.status === 'rejected') existing.rejected += 1;
    } else {
      acc.push({
        month,
        submissions: 1,
        approved: sub.status === 'approved' ? 1 : 0,
        rejected: sub.status === 'rejected' ? 1 : 0
      });
    }
    return acc;
  }, [] as Array<{ month: string; submissions: number; approved: number; rejected: number }>);

  // Status distribution data
  const statusData = [
    { name: 'Approved', value: approvedSubmissions, color: '#22c55e' },
    { name: 'Rejected', value: rejectedSubmissions, color: '#ef4444' },
    { name: 'Under Review', value: pendingSubmissions, color: '#f59e0b' },
    { name: 'Submitted', value: submittedSubmissions, color: '#3b82f6' }
  ].filter(item => item.value > 0);

  // Risk level data
  const riskData = [
    { name: 'Low Risk', value: riskLevels.low || 0, color: '#22c55e' },
    { name: 'Medium Risk', value: riskLevels.medium || 0, color: '#f59e0b' },
    { name: 'High Risk', value: riskLevels.high || 0, color: '#ef4444' },
    { name: 'Critical Risk', value: riskLevels.critical || 0, color: '#dc2626' }
  ].filter(item => item.value > 0);

  // Top performing companies
  const companyScores = submissions.reduce((acc, sub) => {
    if (sub.companyName && sub.score) {
      if (!acc[sub.companyName]) {
        acc[sub.companyName] = { total: 0, count: 0, scores: [] };
      }
      acc[sub.companyName].total += sub.score.percentage;
      acc[sub.companyName].count += 1;
      acc[sub.companyName].scores.push(sub.score.percentage);
    }
    return acc;
  }, {} as Record<string, { total: number; count: number; scores: number[] }>);

  const topCompanies = Object.entries(companyScores)
    .map(([company, data]) => ({
      company,
      avgScore: data.total / data.count,
      submissions: data.count,
      status: data.total / data.count >= 80 ? 'excellent' : data.total / data.count >= 60 ? 'good' : 'needs_improvement'
    }))
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold">{totalSubmissions}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approval Rate</p>
                <p className="text-2xl font-bold">{approvalRate.toFixed(1)}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2">
              <Progress value={approvalRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold">{avgScore.toFixed(1)}/100</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-2">
              <Progress value={avgScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">{pendingSubmissions}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
            <div className="mt-2 flex items-center text-sm text-orange-600">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>Needs attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submission Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Submission Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {statusData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Level Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Level Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={riskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Submissions Tab */}
        <TabsContent value="submissions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submission Type Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Submission Types
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(submissionTypes).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={type === 'vendor' ? 'default' : 'secondary'}>
                          {type === 'vendor' ? 'Vendor' : 'Internal'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{count}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${(count / totalSubmissions) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {submissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{submission.companyName || submission.submitterName}</p>
                        <p className="text-xs text-gray-500">{submission.submittedAt.toLocaleDateString()}</p>
                      </div>
                      <Badge 
                        variant={
                          submission.status === 'approved' ? 'default' :
                          submission.status === 'rejected' ? 'destructive' :
                          'secondary'
                        }
                      >
                        {submission.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risk Analysis Tab */}
        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Analysis Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Risk Distribution</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={riskData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                      >
                        {riskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Risk Metrics</h4>
                  <div className="space-y-3">
                    {riskData.map((risk, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{risk.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{risk.value}</span>
                          <span className="text-xs text-gray-500">
                            ({((risk.value / totalSubmissions) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Performing Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{company.company}</p>
                        <p className="text-xs text-gray-500">{company.submissions} submissions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{company.avgScore.toFixed(1)}%</p>
                      <Badge 
                        variant={
                          company.status === 'excellent' ? 'default' :
                          company.status === 'good' ? 'secondary' :
                          'destructive'
                        }
                        className="text-xs"
                      >
                        {company.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Submission Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="submissions" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="approved" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="rejected" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
