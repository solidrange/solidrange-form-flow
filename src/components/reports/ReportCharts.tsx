
import { FormSubmission } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { AnimatedCard } from "@/components/AnimatedCard";
import { PieChart as PieChartIcon, BarChart3 } from "lucide-react";

interface ReportChartsProps {
  submissions: FormSubmission[];
}

export const ReportCharts = ({ submissions }: ReportChartsProps) => {
  const statusData = [
    { name: 'Approved', value: submissions.filter(s => s.status === 'approved').length, color: '#22c55e' },
    { name: 'Rejected', value: submissions.filter(s => s.status === 'rejected').length, color: '#ef4444' },
    { name: 'Pending', value: submissions.filter(s => s.status === 'under_review').length, color: '#f59e0b' },
    { name: 'Submitted', value: submissions.filter(s => s.status === 'submitted').length, color: '#3b82f6' }
  ].filter(item => item.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <AnimatedCard title="Status Distribution" icon={PieChartIcon} delay={0}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </AnimatedCard>

      <AnimatedCard title="Submissions by Type" icon={BarChart3} delay={200}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { name: 'Vendor', value: submissions.filter(s => s.submissionType === 'vendor').length },
            { name: 'Internal', value: submissions.filter(s => s.submissionType === 'internal').length },
            { name: 'External', value: submissions.filter(s => s.submissionType === 'external').length }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </AnimatedCard>
    </div>
  );
};
