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
}

const Analytics = ({ submissions, onFilterSubmissions }: AnalyticsProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Calculate analytics metrics based on actual sample data
  const totalSubmissions = submissions.length; // Now 130 total submissions
  const approvedSubmissions = submissions.filter(s => s.status === 'approved').length;
  const rejectedSubmissions = submissions.filter(s => s.status === 'rejected').length;
  const pendingSubmissions = submissions.filter(s => s.status === 'under_review').length;
  const submittedSubmissions = submissions.filter(s => s.status === 'submitted').length;

  // Approval type analytics - only count approved submissions
  const fullyApprovedSubmissions = submissions.filter(s => s.status === 'approved' && s.approvalType === 'fully').length;
  const partiallyApprovedSubmissions = submissions.filter(s => s.status === 'approved' && s.approvalType === 'partially').length;

  // Calculate rates based on actual data
  const approvalRate = totalSubmissions > 0 ? (approvedSubmissions / totalSubmissions) * 100 : 0;
  const rejectionRate = totalSubmissions > 0 ? (rejectedSubmissions / totalSubmissions) * 100 : 0;
  const fullApprovalRate = approvedSubmissions > 0 ? (fullyApprovedSubmissions / approvedSubmissions) * 100 : 0;

  // Risk level analytics - count all submissions with scores
  const riskLevels = submissions.reduce((acc, sub) => {
    const risk = sub.score?.riskLevel || 'medium';
    acc[risk] = (acc[risk] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  // Dynamic calculation based on actual data

  // Audience analytics
  const audienceTypes = submissions.reduce((acc, sub) => {
    acc[sub.audience] = (acc[sub.audience] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  // Dynamic calculation: vendor: ~50, internal: ~40, external: ~40

  // Average scores - calculate from actual data
  const submissionsWithScores = submissions.filter(s => s.score?.percentage);
  const avgScore = submissionsWithScores.length > 0 
    ? submissionsWithScores.reduce((acc, sub) => acc + (sub.score?.percentage || 0), 0) / submissionsWithScores.length
    : 0;
  // Dynamic average based on actual submissions

  // Monthly submission trends - accurate month calculation
  const monthlyData = submissions.reduce((acc, sub) => {
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
  }, [] as Array<{ month: string; submissions: number; approved: number; rejected: number }>)
  .sort((a, b) => {
    // Sort by month order for proper chronological display
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const aMonth = a.month.split(' ')[0];
    const bMonth = b.month.split(' ')[0];
    return monthOrder.indexOf(aMonth) - monthOrder.indexOf(bMonth);
  });

  // Chart colors
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // Format data for charts - using actual submission data
  const statusData = [
    { name: 'Approved', value: approvedSubmissions, color: '#10b981' },
    { name: 'Pending', value: pendingSubmissions, color: '#f59e0b' },
    { name: 'Rejected', value: rejectedSubmissions, color: '#ef4444' },
    { name: 'Submitted', value: submittedSubmissions, color: '#6b7280' }
  ].filter(item => item.value > 0);

  const riskData = Object.entries(riskLevels).map(([level, count]) => ({
    name: level.charAt(0).toUpperCase() + level.slice(1),
    value: count,
    color: level === 'high' ? '#ef4444' : level === 'medium' ? '#f59e0b' : '#10b981'
  }));

  const audienceData = Object.entries(audienceTypes).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    color: type === 'vendor' ? '#3b82f6' : type === 'internal' ? '#10b981' : '#8b5cf6'
  }));

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{totalSubmissions}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span className="hidden sm:inline">Active forms receiving submissions</span>
              <span className="sm:hidden">Active forms</span>
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{approvedSubmissions}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span className="hidden sm:inline">{approvalRate.toFixed(1)}% approval rate</span>
              <span className="sm:hidden">{approvalRate.toFixed(1)}%</span>
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{pendingSubmissions}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              <span className="hidden sm:inline">Awaiting action</span>
              <span className="sm:hidden">Pending</span>
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-red-600">{rejectedSubmissions}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              <span className="hidden sm:inline">{rejectionRate.toFixed(1)}% rejection rate</span>
              <span className="sm:hidden">{rejectionRate.toFixed(1)}%</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <Tabs value={selectedTimeRange} onValueChange={(value) => setSelectedTimeRange(value as any)} className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Analytics Overview</h3>
          <TabsList className="grid w-full sm:w-[300px] grid-cols-4 text-xs sm:text-sm">
            <TabsTrigger value="7d" className="px-2 sm:px-4">7D</TabsTrigger>
            <TabsTrigger value="30d" className="px-2 sm:px-4">30D</TabsTrigger>
            <TabsTrigger value="90d" className="px-2 sm:px-4">90D</TabsTrigger>
            <TabsTrigger value="1y" className="px-2 sm:px-4">1Y</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={selectedTimeRange} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Submission Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  Submission Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="submissions" 
                        stroke="#2563eb" 
                        strokeWidth={2}
                        name="Total Submissions"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="approved" 
                        stroke="#16a34a" 
                        strokeWidth={2}
                        name="Approved"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rejected" 
                        stroke="#dc2626" 
                        strokeWidth={2}
                        name="Rejected"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                  Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
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
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {statusData.map((entry, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <div 
                        className="w-2 h-2 rounded-full mr-1" 
                        style={{ backgroundColor: entry.color }}
                      />
                      {entry.name}: {entry.value}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Risk Level Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                  Risk Levels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 sm:h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" fontSize={12} />
                      <YAxis dataKey="name" type="category" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Average Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                    {avgScore.toFixed(1)}%
                  </div>
                  <Progress value={avgScore} className="w-full mb-4" />
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Based on {submissionsWithScores.length} scored submissions
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Audience Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                  <Building className="h-4 w-4 sm:h-5 sm:w-5" />
                  Audience Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 sm:h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={audienceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {audienceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
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
                  {Object.entries(audienceTypes).map(([type, count]) => {
                    const percentage = totalSubmissions > 0 ? (count / totalSubmissions) * 100 : 0;
                    const color = type === 'vendor' ? 'bg-blue-500' : type === 'internal' ? 'bg-green-500' : 'bg-purple-500';
                    
                    return (
                      <div key={type} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize font-medium">{type}</span>
                          <span className="text-muted-foreground">{count} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${color} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div 
                  className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
                  onClick={() => onFilterSubmissions?.({ status: 'under_review' })}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-yellow-800">Pending Reviews</p>
                      <p className="text-sm text-yellow-600">{pendingSubmissions} submissions need attention</p>
                    </div>
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>

                <div 
                  className="p-3 bg-red-50 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
                  onClick={() => onFilterSubmissions?.({ riskLevel: 'high' })}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-800">High Risk Items</p>
                      <p className="text-sm text-red-600">{riskLevels.high || 0} high-risk submissions</p>
                    </div>
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                </div>

                <div 
                  className="p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => onFilterSubmissions?.({ approvalType: 'fully' })}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-800">Fully Approved</p>
                      <p className="text-sm text-blue-600">{fullyApprovedSubmissions} submissions fully approved</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;