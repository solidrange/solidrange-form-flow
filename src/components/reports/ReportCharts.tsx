import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { FormSubmission } from '@/types/form';

interface ReportChartsProps {
  submissions: FormSubmission[];
  chartType: 'bar' | 'line' | 'pie' | 'donut';
  dataType: 'submissionTrends' | 'riskDistribution' | 'complianceStatus';
}

export const ReportCharts = ({ submissions, chartType, dataType }: ReportChartsProps) => {
  // Enhanced color palette with better contrast and accessibility
  const COLORS = [
    '#0ea5e9', // Blue 500
    '#3b82f6', // Blue 500
    '#06b6d4', // Cyan 500
    '#8b5cf6', // Violet 500
    '#f59e0b', // Amber 500
    '#ef4444', // Red 500
    '#22c55e', // Green 500
    '#f97316'  // Orange 500
  ];

  const getChartData = () => {
    switch (dataType) {
      case 'submissionTrends':
        const monthlyData = submissions.reduce((acc, sub) => {
          const month = new Date(sub.submittedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        return Object.entries(monthlyData).map(([month, count]) => ({
          name: month,
          value: count,
          submissions: count
        }));

      case 'riskDistribution':
        const riskData = submissions.reduce((acc, sub) => {
          const risk = sub.score?.riskLevel || 'unknown';
          acc[risk] = (acc[risk] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        return Object.entries(riskData).map(([risk, count]) => ({
          name: risk.charAt(0).toUpperCase() + risk.slice(1),
          value: count
        }));

      case 'complianceStatus':
        const statusData = submissions.reduce((acc, sub) => {
          acc[sub.status] = (acc[sub.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        return Object.entries(statusData).map(([status, count]) => ({
          name: status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1),
          value: count
        }));

      default:
        return [];
    }
  };

  const data = getChartData();

  const renderChart = () => {
    const commonTooltipStyle = {
      backgroundColor: 'hsl(var(--card))',
      border: '1px solid hsl(var(--border))',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      color: 'hsl(var(--foreground))',
    };

    const gridColor = 'hsl(var(--border))';
    const textColor = 'hsl(var(--muted-foreground))';
    const axisColor = 'hsl(var(--border))';

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: axisColor }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: axisColor }}
              />
              <Tooltip contentStyle={commonTooltipStyle} />
              <Legend />
              <Bar 
                dataKey="value" 
                fill={COLORS[0]}
                radius={[4, 4, 0, 0]}
                name="Count"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: axisColor }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fill: textColor, fontSize: 12 }}
                axisLine={{ stroke: axisColor }}
              />
              <Tooltip contentStyle={commonTooltipStyle} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={COLORS[0]}
                strokeWidth={3}
                dot={{ fill: COLORS[1], strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: COLORS[2] }}
                name="Count"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
      case 'donut':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={chartType === 'donut' ? '70%' : '80%'}
                innerRadius={chartType === 'donut' ? '40%' : 0}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={commonTooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-card rounded-lg p-4 shadow-soft border border-border chart-container">
      {renderChart()}
    </div>
  );
};
