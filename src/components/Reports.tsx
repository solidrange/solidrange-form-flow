
import React from 'react';
import { ReportGeneration } from './reports/ReportGeneration';
import { FormSubmission } from '@/types/form';

interface ReportsProps {
  submissions: FormSubmission[];
}

export const Reports: React.FC<ReportsProps> = ({ submissions }) => {
  return <ReportGeneration submissions={submissions} />;
};

export default Reports;
