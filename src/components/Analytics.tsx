
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
  Shield,
  Award
} from "lucide-react";

interface AnalyticsProps {
  submissions: FormSubmission[];
  onFilterSubmissions?: (filters: {
    status?: string;
    approvalType?: string;
    riskLevel?: string;
    audience?: string;
  }) => void;
  isAdmin?: boolean;
}

const Analytics = ({ submissions, onFilterSubmissions, isAdmin = true }: AnalyticsProps) => {
  // For users, filter to only show their personal submissions (demo: show subset)
  const displaySubmissions = isAdmin ? submissions : submissions.filter(s => 
    s.submittedBy?.toLowerCase().includes('user') || 
    s.companyName?.toLowerCase().includes('acme')
  ).slice(0, 8);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Calculate analytics metrics based on actual sample data
  const totalSubmissions = displaySubmissions.length;
  const approvedSubmissions = displaySubmissions.filter(s => s.status === 'approved').length;
  const rejectedSubmissions = displaySubmissions.filter(s => s.status === 'rejected').length;
  const pendingSubmissions = displaySubmissions.filter(s => s.status === 'under_review').length;
  const submittedSubmissions = displaySubmissions.filter(s => s.status === 'submitted').length;

  // Approval type analytics - only count approved submissions
  const fullyApprovedSubmissions = displaySubmissions.filter(s => s.status === 'approved' && s.approvalType === 'fully').length;
  const partiallyApprovedSubmissions = displaySubmissions.filter(s => s.status === 'approved' && s.approvalType === 'partially').length;

  // Calculate rates based on actual data
  const approvalRate = totalSubmissions > 0 ? (approvedSubmissions / totalSubmissions) * 100 : 0;
  const rejectionRate = totalSubmissions > 0 ? (rejectedSubmissions / totalSubmissions) * 100 : 0;
  const fullApprovalRate = approvedSubmissions > 0 ? (fullyApprovedSubmissions / approvedSubmissions) * 100 : 0;

  // Risk level analytics - count all submissions with scores
  const riskLevels = displaySubmissions.reduce((acc, sub) => {
    const risk = sub.score?.riskLevel || 'medium';
    acc[risk] = (acc[risk] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Audience analytics
  const audienceTypes = displaySubmissions.reduce((acc, sub) => {
    acc[sub.audience] = (acc[sub.audience] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Average scores - calculate from actual data
  const submissionsWithScores = displaySubmissions.filter(s => s.score?.percentage);
  const avgScore = submissionsWithScores.length > 0 
    ? submissionsWithScores.reduce((acc, sub) => acc + (sub.score?.percentage || 0), 0) / submissionsWithScores.length
    : 0;

  // Monthly submission trends - accurate month calculation
  const monthlyData = displaySubmissions.reduce((acc, sub) => {
    const date = new Date(sub.submittedAt);
    const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
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

  // Status distribution data with approval types
  const statusData = [
    { name: 'Fully Approved', value: fullyApprovedSubmissions, color: '#22c55e' },
    { name: 'Partially Approved', value: partiallyApprovedSubmissions, color: '#84cc16' },
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
  const companyScores = displaySubmissions.reduce((acc, sub) => {
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
    <div className="space-y-4 md:space-y-6">
      {/* Overview Cards - Mobile: 2 cols, Tablet: 3 cols, Desktop: 6 cols */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 animate-fade-in" data-tour-id="dashboard-stats">
        <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in cursor-pointer touch-manipulation"
              onClick={() => onFilterSubmissions?.({})}
        >
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Total</p>
                <p className="text-lg sm:text-2xl font-bold text-foreground">{totalSubmissions}</p>
              </div>
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={100} className="h-1.5 sm:h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in cursor-pointer touch-manipulation"
              style={{ animationDelay: '0.1s' }}
              onClick={() => onFilterSubmissions?.({ status: 'approved' })}
        >
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Approved</p>
                <p className="text-lg sm:text-2xl font-bold text-green-600">{approvedSubmissions}</p>
              </div>
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={approvalRate} className="h-1.5 sm:h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in cursor-pointer touch-manipulation" 
              style={{ animationDelay: '0.2s' }}
              onClick={() => onFilterSubmissions?.({ status: 'approved', approvalType: 'fully' })}
        >
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Fully OK</p>
                <p className="text-lg sm:text-2xl font-bold text-emerald-600">{fullyApprovedSubmissions}</p>
              </div>
              <div className="flex-shrink-0">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={fullApprovalRate} className="h-1.5 sm:h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in cursor-pointer touch-manipulation" 
              style={{ animationDelay: '0.3s' }}
              onClick={() => onFilterSubmissions?.({ status: 'approved', approvalType: 'partially' })}
        >
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Partial</p>
                <p className="text-lg sm:text-2xl font-bold text-orange-600">{partiallyApprovedSubmissions}</p>
              </div>
              <div className="flex-shrink-0">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={100 - fullApprovalRate} className="h-1.5 sm:h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in cursor-pointer touch-manipulation" 
              style={{ animationDelay: '0.4s' }}
              onClick={() => onFilterSubmissions?.({ status: 'rejected' })}
        >
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Rejected</p>
                <p className="text-lg sm:text-2xl font-bold text-red-600">{rejectedSubmissions}</p>
              </div>
              <div className="flex-shrink-0">
                <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={rejectionRate} className="h-1.5 sm:h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-modern-lg transition-all duration-300 animate-scale-in cursor-pointer touch-manipulation" 
              style={{ animationDelay: '0.5s' }}
              onClick={() => onFilterSubmissions?.({ status: 'under_review' })}
        >
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">Pending</p>
                <p className="text-lg sm:text-2xl font-bold text-foreground">{pendingSubmissions}</p>
              </div>
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500 animate-pulse" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={(pendingSubmissions / totalSubmissions) * 100} className="h-1.5 sm:h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4" data-tour-id="dashboard-charts">
        {/* Mobile: Horizontal scrolling tabs */}
        <div className="overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
          <TabsList className="inline-flex w-max sm:grid sm:w-full sm:grid-cols-6 min-w-full">
            <TabsTrigger value="overview" className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">Overview</TabsTrigger>
            <TabsTrigger value="approvals" className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">Approvals</TabsTrigger>
            <TabsTrigger value="submissions" className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">Submissions</TabsTrigger>
            <TabsTrigger value="risk" className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">Risk</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">Performance</TabsTrigger>
            <TabsTrigger value="trends" className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">Trends</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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

        {/* Approvals Tab */}
        <TabsContent value="approvals" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Approval Types Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-500" />
                  Approval Types Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Visual breakdown */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                        <span className="font-medium text-emerald-700">Fully Approved</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-emerald-600">{fullyApprovedSubmissions}</span>
                        <span className="text-sm text-gray-500 ml-2">({fullApprovalRate.toFixed(1)}%)</span>
                      </div>
                    </div>
                    <Progress value={fullApprovalRate} className="h-3" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        <span className="font-medium text-orange-700">Partially Approved</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-orange-600">{partiallyApprovedSubmissions}</span>
                        <span className="text-sm text-gray-500 ml-2">({(100 - fullApprovalRate).toFixed(1)}%)</span>
                      </div>
                    </div>
                    <Progress value={100 - fullApprovalRate} className="h-3" />
                  </div>

                  {/* Pie chart */}
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Fully Approved', value: fullyApprovedSubmissions, color: '#22c55e' },
                          { name: 'Partially Approved', value: partiallyApprovedSubmissions, color: '#f59e0b' }
                        ].filter(item => item.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[
                          { name: 'Fully Approved', value: fullyApprovedSubmissions, color: '#22c55e' },
                          { name: 'Partially Approved', value: partiallyApprovedSubmissions, color: '#f59e0b' }
                        ].filter(item => item.value > 0).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Approval Quality Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Approval Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Quality Score */}
                  <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      {fullApprovalRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-emerald-700 font-medium">Quality Approval Rate</div>
                    <div className="text-xs text-gray-600 mt-1">
                      Percentage of approvals that are full approvals
                    </div>
                  </div>

                  {/* Metrics breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm font-medium">Total Approved</span>
                      <span className="text-sm font-bold">{approvedSubmissions}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-emerald-50 rounded">
                      <span className="text-sm font-medium text-emerald-700">Full Implementation</span>
                      <span className="text-sm font-bold text-emerald-600">{fullyApprovedSubmissions}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <span className="text-sm font-medium text-orange-700">Conditional Implementation</span>
                      <span className="text-sm font-bold text-orange-600">{partiallyApprovedSubmissions}</span>
                    </div>
                  </div>

                  {/* Trend indicator */}
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-green-600">Quality improving with {fullApprovalRate.toFixed(1)}% full approvals</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Submissions Tab */}
        <TabsContent value="submissions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Audience Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Audience Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(audienceTypes).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          type === 'vendor' ? 'default' : 
                          type === 'external' ? 'outline' : 
                          'secondary'
                        }>
                          {type === 'vendor' ? 'Vendor' : 
                           type === 'external' ? 'External' : 
                           'Internal'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{count}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              type === 'vendor' ? 'bg-blue-500' :
                              type === 'external' ? 'bg-purple-500' :
                              'bg-green-500'
                            }`}
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
                  {displaySubmissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{submission.companyName || submission.submitterName}</p>
                        <p className="text-xs text-gray-500">{submission.submittedAt.toLocaleDateString()}</p>
                      </div>
                        <Badge 
                          variant={
                            submission.status === 'approved' && submission.approvalType === 'fully' ? 'default' :
                            submission.status === 'approved' && submission.approvalType === 'partially' ? 'secondary' :
                            submission.status === 'rejected' ? 'destructive' :
                            'outline'
                          }
                        >
                          {submission.status === 'approved' 
                            ? `${submission.approvalType === 'fully' ? 'Fully' : 'Partially'} Approved`
                            : submission.status.replace('_', ' ')
                          }
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

export default Analytics;
