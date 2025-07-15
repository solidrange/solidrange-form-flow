
import { FormSubmission } from "@/types/form";

export interface ReportData {
  totalSubmissions: number;
  approvedSubmissions: number;
  rejectedSubmissions: number;
  pendingSubmissions: number;
  averageScore: number;
  completionRate: number;
}

export const generateReport = (submissions: FormSubmission[]): ReportData => {
  const totalSubmissions = submissions.length;
  const approvedSubmissions = submissions.filter(s => s.status === 'approved').length;
  const rejectedSubmissions = submissions.filter(s => s.status === 'rejected').length;
  const pendingSubmissions = submissions.filter(s => s.status === 'under_review').length;
  
  const submissionsWithScores = submissions.filter(s => s.score?.percentage);
  const averageScore = submissionsWithScores.length > 0 
    ? submissionsWithScores.reduce((acc, sub) => acc + (sub.score?.percentage || 0), 0) / submissionsWithScores.length
    : 0;
  
  const completionRate = totalSubmissions > 0 ? (approvedSubmissions / totalSubmissions) * 100 : 0;

  return {
    totalSubmissions,
    approvedSubmissions,
    rejectedSubmissions,
    pendingSubmissions,
    averageScore,
    completionRate
  };
};

export const exportToCSV = (submissions: FormSubmission[]): string => {
  const headers = ['ID', 'Submitter', 'Company', 'Status', 'Score', 'Submitted At'];
  const rows = submissions.map(submission => [
    submission.id,
    submission.submitterName || '',
    submission.companyName || '',
    submission.status,
    submission.score?.percentage || '',
    submission.submittedAt.toISOString()
  ]);

  return [headers, ...rows].map(row => row.join(',')).join('\n');
};
