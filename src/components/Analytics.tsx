
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, Users, FileText, Clock, Eye, CheckCircle, Mail, MousePointer, Activity } from "lucide-react";

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
  { name: 'Desktop', value: 65, color: '#70CDFF' },
  { name: 'Mobile', value: 25, color: '#39A8F7' },
  { name: 'Tablet', value: 10, color: '#0C75D1' },
];

const trendData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 900 },
];

/**
 * Modern KPI Card Component
 * Displays key performance indicators with modern styling inspired by Linear and Vanta
 */
const KPICard = ({ title, value, change, icon: Icon, trend, color = "blue" }: {
  title: string;
  value: string | number;
  change: string;
  icon: any;
  trend: "up" | "down";
  color?: string;
}) => {
  const isPositive = trend === "up";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <Card className="kpi-card group hover-lift animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-xl ${color === "blue" ? "bg-blue-50" : "bg-purple-50"} group-hover:scale-110 transition-transform duration-200`}>
          <Icon className={`h-4 w-4 ${color === "blue" ? "text-brand-secondary" : "text-brand-purple"}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900 mb-2">
          {value}
        </div>
        <div className="flex items-center text-sm">
          <TrendIcon className={`h-3 w-3 mr-1 ${isPositive ? "text-emerald-500" : "text-red-500"}`} />
          <span className={`font-medium ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
            {change}
          </span>
          <span className="text-muted-foreground ml-1">from last week</span>
        </div>
      </CardContent>
    </Card>
  );
};

/**
 * Modern Chart Card Component
 * Wrapper for charts with modern styling and glassmorphism effects
 */
const ChartCard = ({ title, children, className = "" }: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Card className={`modern-card hover-glow animate-slide-up ${className}`}>
    <CardHeader className="pb-4">
      <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

/**
 * Analytics Dashboard Component
 * Modern analytics dashboard with enterprise-ready design
 * Inspired by Vanta, Linear, and Pitch design systems
 */
export const Analytics = () => {
  const totalSubmissions = submissionData.reduce((acc, day) => acc + day.submissions, 0);
  const totalViews = submissionData.reduce((acc, day) => acc + day.views, 0);
  const conversionRate = ((totalSubmissions / totalViews) * 100).toFixed(1);
  const avgCompletionRate = (formData.reduce((acc, form) => acc + form.completionRate, 0) / formData.length).toFixed(1);

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/30 min-h-screen">
      {/* Header Section */}
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track your form performance and user engagement</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Submissions"
          value={totalSubmissions}
          change="+12%"
          icon={FileText}
          trend="up"
          color="blue"
        />
        <KPICard
          title="Form Views"
          value={totalViews}
          change="+8%"
          icon={Eye}
          trend="up"
          color="blue"
        />
        <KPICard
          title="Conversion Rate"
          value={`${conversionRate}%`}
          change="+2.1%"
          icon={MousePointer}
          trend="up"
          color="blue"
        />
        <KPICard
          title="Avg. Completion"
          value={`${avgCompletionRate}%`}
          change="+1.5%"
          icon={CheckCircle}
          trend="up"
          color="purple"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Submissions Over Time */}
        <ChartCard title="Weekly Performance">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={submissionData}>
              <defs>
                <linearGradient id="submissionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#70CDFF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#70CDFF" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#39A8F7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#39A8F7" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(8px)'
                }}
              />
              <Area
                type="monotone"
                dataKey="submissions"
                stroke="#70CDFF"
                strokeWidth={2}
                fill="url(#submissionsGradient)"
                name="Submissions"
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#39A8F7"
                strokeWidth={2}
                fill="url(#viewsGradient)"
                name="Views"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Device Usage */}
        <ChartCard title="Device Distribution">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                stroke="none"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(8px)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Form Performance Table */}
      <ChartCard title="Form Performance Overview" className="animate-scale-in">
        <div className="space-y-4">
          {formData.map((form, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-blue-50/30 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200 group">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-secondary transition-colors">
                  {form.name}
                </h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {form.submissions} submissions
                  </span>
                  <Badge 
                    variant={form.completionRate >= 90 ? "default" : form.completionRate >= 80 ? "secondary" : "destructive"}
                    className="px-3 py-1 text-xs font-medium"
                  >
                    {form.completionRate}% completion
                  </Badge>
                </div>
              </div>
              <div className="text-right min-w-[140px]">
                <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-brand-primary to-brand-secondary h-2 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${form.completionRate}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-1 block">
                  {form.completionRate}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Growth Trend */}
      <ChartCard title="Growth Trend" className="animate-slide-up">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(8px)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#70CDFF" 
              strokeWidth={3}
              dot={{ fill: '#39A8F7', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#0C75D1' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};
