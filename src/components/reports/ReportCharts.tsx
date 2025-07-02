
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { FormSubmission } from '@/types/form';

interface ReportChartsProps {
  submissions: FormSubmission[];
  chartType: 'bar' | 'line' | 'pie' | 'donut';
  dataType: 'submissionTrends' | 'riskDistribution' | 'complianceStatus';
}

export const ReportCharts = ({ submissions, chartType, dataType }: ReportChartsProps) => {
  const COLORS = ['#70CDFF', '#39A8F7', '#0C75D1', '#C474F2', '#042C75'];

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
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="#39A8F7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#39A8F7" 
                strokeWidth={3}
                dot={{ fill: '#0C75D1', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#70CDFF' }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
      case 'donut':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={chartType === 'donut' ? 100 : 120}
                innerRadius={chartType === 'donut' ? 60 : 0}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-soft border border-gray-100">
      {renderChart()}
    </div>
  );
};
