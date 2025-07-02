
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { FormSubmission } from '@/types/form';

interface ReportChartsProps {
  submissions: FormSubmission[];
  chartType: 'bar' | 'line' | 'pie' | 'donut';
  dataType: 'submissionTrends' | 'riskDistribution' | 'complianceStatus';
}

export const ReportCharts = ({ submissions, chartType, dataType }: ReportChartsProps) => {
  // Vibrant and appealing color palette with gradients
  const COLORS = [
    '#FF6B6B', // Coral Red
    '#4ECDC4', // Turquoise
    '#45B7D1', // Ocean Blue
    '#96CEB4', // Mint Green
    '#FFEAA7', // Warm Yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Seafoam
    '#F7DC6F', // Golden Yellow
    '#BB8FCE', // Lavender
    '#85C1E9'  // Sky Blue
  ];

  // Gradient definitions for enhanced visual appeal
  const GRADIENTS = [
    ['#FF6B6B', '#FF8E53'],
    ['#4ECDC4', '#44A08D'],
    ['#45B7D1', '#2196F3'],
    ['#96CEB4', '#6AB04C'],
    ['#FFEAA7', '#FDCB6E'],
    ['#DDA0DD', '#A8E6CF'],
    ['#98D8C8', '#88D8A3'],
    ['#F7DC6F', '#F39C12'],
    ['#BB8FCE', '#9B59B6'],
    ['#85C1E9', '#3498DB']
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
      backgroundColor: '#ffffff',
      border: '2px solid #e3f2fd',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      color: '#2c3e50',
    };

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <defs>
                {GRADIENTS.map((gradient, index) => (
                  <linearGradient key={index} id={`barGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={gradient[0]} />
                    <stop offset="100%" stopColor={gradient[1]} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8f4f8" strokeWidth={1} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#5a6c7d', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#d0e7f0' }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fill: '#5a6c7d', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#d0e7f0' }}
              />
              <Tooltip 
                contentStyle={commonTooltipStyle} 
                cursor={{ fill: 'rgba(69, 183, 209, 0.1)' }}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                fill="url(#barGradient0)"
                radius={[8, 8, 0, 0]}
                name="Count"
                animationBegin={0}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#45B7D1" />
                  <stop offset="100%" stopColor="#96CEB4" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#45B7D1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#96CEB4" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8f4f8" strokeWidth={1} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#5a6c7d', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#d0e7f0' }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tick={{ fill: '#5a6c7d', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#d0e7f0' }}
              />
              <Tooltip 
                contentStyle={commonTooltipStyle}
                cursor={{ stroke: '#45B7D1', strokeWidth: 2 }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="url(#lineGradient)"
                strokeWidth={4}
                dot={{ fill: '#FF6B6B', strokeWidth: 3, r: 6, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
                activeDot={{ r: 10, fill: '#FF6B6B', stroke: '#ffffff', strokeWidth: 3, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                name="Count"
                animationBegin={0}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
      case 'donut':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                {GRADIENTS.map((gradient, index) => (
                  <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={gradient[0]} />
                    <stop offset="100%" stopColor={gradient[1]} />
                  </linearGradient>
                ))}
              </defs>
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
                animationBegin={0}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#pieGradient${index % GRADIENTS.length})`}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  ...commonTooltipStyle,
                  borderRadius: '16px',
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
    <div className="w-full bg-white rounded-2xl p-6 shadow-xl border border-blue-100 chart-container transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 rounded-2xl pointer-events-none" />
      <div className="relative z-10">
        {renderChart()}
      </div>
    </div>
  );
};
