import { FormSubmission, Form } from "@/types/form";

/**
 * Generate comprehensive analytics report for form submissions
 */
export const generateAnalyticsReport = (submissions: FormSubmission[], form: Form) => {
  const totalSubmissions = submissions.length;
  const approvedSubmissions = submissions.filter(s => s.status === 'approved').length;
  const rejectedSubmissions = submissions.filter(s => s.status === 'rejected').length;
  const pendingSubmissions = submissions.filter(s => s.status === 'under_review' || s.status === 'submitted').length;

  // Calculate completion rates by submission type
  const vendorSubmissions = submissions.filter(s => s.submissionType === 'vendor').length;
  const internalSubmissions = submissions.filter(s => s.submissionType === 'internal').length;

  const averageScore = submissions
    .filter(s => s.score)
    .reduce((acc, s) => acc + (s.score?.total || 0), 0) / 
    submissions.filter(s => s.score).length || 0;

  // Risk analysis
  const riskDistribution = submissions.reduce((acc, submission) => {
    if (submission.score) {
      const risk = submission.score.riskLevel;
      acc[risk] = (acc[risk] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Average completion time analysis
  const avgCompletionTime = submissions
    .filter(s => s.timeSpent)
    .reduce((acc, s) => acc + (s.timeSpent || 0), 0) / 
    submissions.filter(s => s.timeSpent).length || 0;

  return {
    summary: {
      totalSubmissions,
      approvedSubmissions,
      rejectedSubmissions,
      pendingSubmissions,
      approvalRate: totalSubmissions > 0 ? (approvedSubmissions / totalSubmissions) * 100 : 0,
      averageScore: Math.round(averageScore * 100) / 100,
      averageCompletionTime: Math.round(avgCompletionTime * 100) / 100
    },
    submissionTypes: {
      vendor: vendorSubmissions,
      internal: internalSubmissions
    },
    riskDistribution,
    timeline: generateTimelineData(submissions),
    scoreDistribution: generateScoreDistribution(submissions)
  };
};

/**
 * Generate detailed submission report in various formats
 */
export const generateSubmissionReport = (submissions: FormSubmission[], form: Form, format: 'pdf' | 'excel' | 'csv') => {
  const reportData = submissions.map(submission => ({
    id: submission.id,
    submitterName: submission.submitterName || 'Unknown',
    submitterEmail: submission.submitterEmail,
    companyName: submission.submissionType === 'vendor' ? (submission.companyName || 'Unknown Company') : 'Internal',
    submissionType: submission.submissionType,
    status: submission.status,
    submittedAt: submission.submittedAt.toLocaleDateString(),
    score: submission.score ? `${submission.score.total}/${submission.score.maxTotal}` : 'Not scored',
    riskLevel: submission.score?.riskLevel || 'Not assessed',
    completionPercentage: submission.completionPercentage || 0,
    timeSpent: submission.timeSpent ? `${submission.timeSpent} minutes` : 'Not tracked',
    reviewedBy: submission.score?.reviewedBy || 'Not reviewed',
    reviewComments: submission.score?.reviewComments || 'No comments'
  }));

  switch (format) {
    case 'pdf':
      return generatePDFReport(reportData, form);
    case 'excel':
      return generateExcelReport(reportData, form);
    case 'csv':
      return generateCSVReport(reportData, form);
    default:
      throw new Error('Unsupported format');
  }
};

/**
 * Generate PDF report from submission data
 */
const generatePDFReport = (reportData: any[], form: Form) => {
  // Create PDF document structure
  const pdfContent = {
    title: `${form.title} - Submission Report`,
    generatedAt: new Date().toLocaleDateString(),
    data: reportData,
    summary: {
      totalSubmissions: reportData.length,
      vendorSubmissions: reportData.filter(r => r.submissionType === 'vendor').length,
      internalSubmissions: reportData.filter(r => r.submissionType === 'internal').length
    }
  };

  // In a real implementation, this would use a PDF library like jsPDF
  console.log('Generating PDF report:', pdfContent);
  return pdfContent;
};

/**
 * Generate Excel report from submission data
 */
const generateExcelReport = (reportData: any[], form: Form) => {
  // Create Excel workbook structure
  const excelContent = {
    worksheets: [
      {
        name: 'Submissions',
        data: reportData
      },
      {
        name: 'Summary',
        data: [
          { metric: 'Total Submissions', value: reportData.length },
          { metric: 'Vendor Submissions', value: reportData.filter(r => r.submissionType === 'vendor').length },
          { metric: 'Internal Submissions', value: reportData.filter(r => r.submissionType === 'internal').length }
        ]
      }
    ]
  };

  // In a real implementation, this would use a library like xlsx
  console.log('Generating Excel report:', excelContent);
  return excelContent;
};

/**
 * Generate CSV report from submission data
 */
const generateCSVReport = (reportData: any[], form: Form) => {
  const headers = Object.keys(reportData[0] || {});
  const csvRows = [
    headers.join(','),
    ...reportData.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV values
        return typeof value === 'string' && (value.includes(',') || value.includes('"')) 
          ? `"${value.replace(/"/g, '""')}"` 
          : value;
      }).join(',')
    )
  ];

  const csvContent = csvRows.join('\n');
  console.log('Generating CSV report:', csvContent);
  return csvContent;
};

/**
 * Generate timeline data for submissions over time
 */
const generateTimelineData = (submissions: FormSubmission[]) => {
  const timelineMap = submissions.reduce((acc, submission) => {
    const date = submission.submittedAt.toDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(timelineMap)
    .map(([date, count]) => ({ date, submissions: count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

/**
 * Generate score distribution data
 */
const generateScoreDistribution = (submissions: FormSubmission[]) => {
  const scoredSubmissions = submissions.filter(s => s.score);
  
  return {
    total: scoredSubmissions.length,
    averageScore: scoredSubmissions.reduce((acc, s) => acc + (s.score?.percentage || 0), 0) / scoredSubmissions.length || 0,
    distribution: {
      excellent: scoredSubmissions.filter(s => (s.score?.percentage || 0) >= 90).length,
      good: scoredSubmissions.filter(s => (s.score?.percentage || 0) >= 70 && (s.score?.percentage || 0) < 90).length,
      average: scoredSubmissions.filter(s => (s.score?.percentage || 0) >= 50 && (s.score?.percentage || 0) < 70).length,
      poor: scoredSubmissions.filter(s => (s.score?.percentage || 0) < 50).length
    }
  };
};

/**
 * Export submission data for external analysis
 */
export const exportSubmissionData = (submissions: FormSubmission[], format: 'json' | 'csv' | 'excel') => {
  const exportData = submissions.map(submission => ({
    submissionId: submission.id,
    formId: submission.formId,
    submitterName: submission.submitterName,
    submitterEmail: submission.submitterEmail,
    companyName: submission.companyName,
    submissionType: submission.submissionType,
    status: submission.status,
    submittedAt: submission.submittedAt.toISOString(),
    score: submission.score?.total,
    maxScore: submission.score?.maxTotal,
    percentage: submission.score?.percentage,
    riskLevel: submission.score?.riskLevel,
    completionPercentage: submission.completionPercentage,
    timeSpent: submission.timeSpent,
    responses: submission.responses
  }));

  switch (format) {
    case 'json':
      return JSON.stringify(exportData, null, 2);
    case 'csv':
      return generateCSVFromData(exportData);
    case 'excel':
      return generateExcelFromData(exportData);
    default:
      throw new Error('Unsupported export format');
  }
};

/**
 * Generate CSV from structured data
 */
const generateCSVFromData = (data: any[]) => {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (typeof value === 'object' && value !== null) {
          return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return typeof value === 'string' && (value.includes(',') || value.includes('"')) 
          ? `"${value.replace(/"/g, '""')}"` 
          : value;
      }).join(',')
    )
  ];

  return csvRows.join('\n');
};

/**
 * Generate Excel structure from structured data
 */
const generateExcelFromData = (data: any[]) => {
  return {
    worksheets: [
      {
        name: 'Submission Data',
        data: data
      }
    ],
    metadata: {
      generatedAt: new Date().toISOString(),
      totalRecords: data.length
    }
  };
};

/**
 * Generate risk assessment report
 */
export const generateRiskReport = (submissions: FormSubmission[]) => {
  const riskAnalysis = submissions
    .filter(s => s.score)
    .map(submission => ({
      id: submission.id,
      submitterName: submission.submitterName,
      companyName: submission.companyName,
      riskLevel: submission.score!.riskLevel,
      riskScore: submission.score!.riskScore || 0,
      totalScore: submission.score!.total,
      percentage: submission.score!.percentage,
      categoryScores: submission.score!.categoryScores || {}
    }));

  const riskSummary = {
    critical: riskAnalysis.filter(r => r.riskLevel === 'critical').length,
    high: riskAnalysis.filter(r => r.riskLevel === 'high').length,
    medium: riskAnalysis.filter(r => r.riskLevel === 'medium').length,
    low: riskAnalysis.filter(r => r.riskLevel === 'low').length
  };

  return {
    summary: riskSummary,
    details: riskAnalysis,
    recommendations: generateRiskRecommendations(riskSummary, riskAnalysis)
  };
};

/**
 * Generate risk-based recommendations
 */
const generateRiskRecommendations = (summary: any, details: any[]) => {
  const recommendations = [];

  if (summary.critical > 0) {
    recommendations.push({
      priority: 'critical',
      message: `${summary.critical} submission(s) require immediate attention due to critical risk level.`,
      action: 'Review and address critical issues immediately'
    });
  }

  if (summary.high > 0) {
    recommendations.push({
      priority: 'high',
      message: `${summary.high} submission(s) have high risk levels that need prompt review.`,
      action: 'Schedule detailed review within 24-48 hours'
    });
  }

  const lowPerformers = details.filter(d => d.percentage < 50);
  if (lowPerformers.length > 0) {
    recommendations.push({
      priority: 'medium',
      message: `${lowPerformers.length} submission(s) scored below 50% and may need additional support.`,
      action: 'Provide additional guidance or training'
    });
  }

  return recommendations;
};
