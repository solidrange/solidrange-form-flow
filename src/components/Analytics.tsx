
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, FileText, Clock, Eye, CheckCircle } from "lucide-react";

const submissionData = [
  { name: 'Mon', submissions: 12, views: 45 },
  { name: 'Tue', submissions: 19, views: 52 },
  { name: 'Wed', submissions: 15, views: 38 },
  { name: 'Thu', submissions: 22, views: 61 },
  { name: 'Fri', submissions: 18, views: 55 },
  { name: 'Sat', submissions: 8, views: 25 },
  { name: 'Sun', submissions: 10, views: 30 },
];

const formData = [
  { name: 'Employee Onboarding', submissions: 45, completionRate: 85 },
  { name: 'Customer Survey', submissions: 32, completionRate: 92 },
  { name: 'Event Registration', submissions: 28, completionRate: 78 },
  { name: 'Incident Report', submissions: 15, completionRate: 95 },
  { name: 'Risk Assessment', submissions: 22, completionRate: 88 },
];

const deviceData = [
  { name: 'Desktop', value: 65, color: '#8884d8' },
  { name: 'Mobile', value: 25, color: '#82ca9d' },
  { name: 'Tablet', value: 10, color: '#ffc658' },
];

export const Analytics = () => {
  const totalSubmissions = submissionData.reduce((acc, day) => acc + day.submissions, 0);
  const totalViews = submissionData.reduce((acc, day) => acc + day.views, 0);
  const conversionRate = ((totalSubmissions / totalViews) * 100).toFixed(1);
  const avgCompletionRate = (formData.reduce((acc, form) => acc + form.completionRate, 0) / formData.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Form Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +8% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2.1% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCompletionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +1.5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Submissions & Views This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={submissionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="submissions" fill="#8884d8" name="Submissions" />
                <Bar dataKey="views" fill="#82ca9d" name="Views" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Form Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Form Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formData.map((form, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{form.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-600">{form.submissions} submissions</span>
                    <Badge variant={form.completionRate >= 90 ? "default" : form.completionRate >= 80 ? "secondary" : "destructive"}>
                      {form.completionRate}% completion
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${form.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
