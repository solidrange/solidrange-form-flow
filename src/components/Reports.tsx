
import React from 'react';
import { ReportGeneration } from './reports/ReportGeneration';
import { FormSubmission } from '@/types/form';

interface ReportsProps {
  submissions: FormSubmission[];
}

export const Reports: React.FC<ReportsProps> = ({ submissions }) => {
  const handleGenerateReport = (config: any) => {
    console.log('Generating report with config:', config);
    // Report generation logic would go here
  };

  return <ReportGeneration submissions={submissions} onGenerateReport={handleGenerateReport} />;
};

export default Reports;
