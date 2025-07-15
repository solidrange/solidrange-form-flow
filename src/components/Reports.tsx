
import React from 'react';
import { ReportGeneration } from './reports/ReportGeneration';
import { FormSubmission, Form } from '@/types/form';

interface ReportsProps {
  submissions: FormSubmission[];
  forms: Form[];
}

export const Reports: React.FC<ReportsProps> = ({ submissions, forms }) => {
  return <ReportGeneration submissions={submissions} forms={forms} />;
};

export default Reports;
