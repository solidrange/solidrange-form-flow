
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { FormSubmission } from '@/types/form';

interface ReportConfig {
  title: string;
  description: string;
  includeSections: {
    overview: boolean;
    submissionStats: boolean;
    riskAnalysis: boolean;
    complianceStatus: boolean;
    detailedResponses: boolean;
    recommendations: boolean;
  };
  chartTypes: {
    submissionTrends: 'bar' | 'line' | 'pie';
    riskDistribution: 'pie' | 'donut' | 'bar';
    complianceStatus: 'bar' | 'line' | 'pie';
  };
  filterBy: {
    dateRange: { start: string; end: string };
    submissionType: 'all' | 'vendor' | 'internal' | 'external';
    status: 'all' | 'submitted' | 'under_review' | 'approved' | 'rejected';
    riskLevel: 'all' | 'low' | 'medium' | 'high' | 'critical';
  };
  customRecommendations: string;
  format: 'pdf' | 'excel';
  includeCharts: boolean;
}

export class ReportGenerator {
  private submissions: FormSubmission[];
  private config: ReportConfig;

  constructor(submissions: FormSubmission[], config: ReportConfig) {
    this.submissions = submissions;
    this.config = config;
  }

  async generate(): Promise<void> {
    try {
      if (this.config.format === 'pdf') {
        await this.generatePDF();
      } else {
        await this.generateExcel();
      }
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }

  private async generatePDF(): Promise<void> {
    const doc = new jsPDF();
    let yPosition = 20;

    // Add title
    doc.setFontSize(18);
    doc.text(this.config.title, 20, yPosition);
    yPosition += 15;

    // Add description
    if (this.config.description) {
      doc.setFontSize(12);
      const descLines = doc.splitTextToSize(this.config.description, 170);
      doc.text(descLines, 20, yPosition);
      yPosition += descLines.length * 6 + 10;
    }

    // Add sections based on configuration
    if (this.config.includeSections.overview) {
      yPosition = this.addOverviewSection(doc, yPosition);
    }

    if (this.config.includeSections.submissionStats) {
      yPosition = this.addSubmissionStatsSection(doc, yPosition);
    }

    if (this.config.includeSections.riskAnalysis) {
      yPosition = this.addRiskAnalysisSection(doc, yPosition);
    }

    if (this.config.includeSections.complianceStatus) {
      yPosition = this.addComplianceSection(doc, yPosition);
    }

    if (this.config.includeSections.recommendations) {
      yPosition = this.addRecommendationsSection(doc, yPosition);
    }

    // Save the PDF
    const fileName = `${this.config.title.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  }

  private addOverviewSection(doc: jsPDF, yPosition: number): number {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.text('Overview', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    const stats = this.calculateStats();
    
    doc.text(`Total Submissions: ${stats.total}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Approved: ${stats.approved}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Rejected: ${stats.rejected}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Under Review: ${stats.underReview}`, 20, yPosition);
    yPosition += 15;

    return yPosition;
  }

  private addSubmissionStatsSection(doc: jsPDF, yPosition: number): number {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.text('Submission Statistics', 20, yPosition);
    yPosition += 10;

    const stats = this.calculateStats();
    doc.setFontSize(10);
    
    doc.text(`Average Score: ${stats.avgScore}%`, 20, yPosition);
    yPosition += 6;
    doc.text(`High Risk Submissions: ${stats.highRisk}`, 20, yPosition);
    yPosition += 15;

    return yPosition;
  }

  private addRiskAnalysisSection(doc: jsPDF, yPosition: number): number {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.text('Risk Analysis', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    const riskDistribution = this.calculateRiskDistribution();
    
    Object.entries(riskDistribution).forEach(([risk, count]) => {
      doc.text(`${risk.toUpperCase()}: ${count}`, 20, yPosition);
      yPosition += 6;
    });
    
    yPosition += 10;
    return yPosition;
  }

  private addComplianceSection(doc: jsPDF, yPosition: number): number {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.text('Compliance Status', 20, yPosition);
    yPosition += 10;

    const stats = this.calculateStats();
    const complianceRate = stats.total > 0 ? Math.round((stats.approved / stats.total) * 100) : 0;
    
    doc.setFontSize(10);
    doc.text(`Compliance Rate: ${complianceRate}%`, 20, yPosition);
    yPosition += 15;

    return yPosition;
  }

  private addRecommendationsSection(doc: jsPDF, yPosition: number): number {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.text('Recommendations', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    if (this.config.customRecommendations) {
      const recLines = doc.splitTextToSize(this.config.customRecommendations, 170);
      doc.text(recLines, 20, yPosition);
      yPosition += recLines.length * 6;
    } else {
      doc.text('No custom recommendations provided.', 20, yPosition);
      yPosition += 6;
    }

    return yPosition;
  }

  private async generateExcel(): Promise<void> {
    const workbook = XLSX.utils.book_new();
    
    // Create overview sheet
    const overviewData = this.prepareOverviewData();
    const overviewSheet = XLSX.utils.json_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview');

    // Create submissions sheet
    const submissionsData = this.prepareSubmissionsData();
    const submissionsSheet = XLSX.utils.json_to_sheet(submissionsData);
    XLSX.utils.book_append_sheet(workbook, submissionsSheet, 'Submissions');

    // Save the file
    const fileName = `${this.config.title.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }

  private calculateStats() {
    return {
      total: this.submissions.length,
      approved: this.submissions.filter(s => s.status === 'approved').length,
      rejected: this.submissions.filter(s => s.status === 'rejected').length,
      underReview: this.submissions.filter(s => s.status === 'under_review').length,
      avgScore: this.submissions.length > 0 ? 
        Math.round(this.submissions.reduce((sum, s) => sum + (s.score?.percentage || 0), 0) / this.submissions.length) : 0,
      highRisk: this.submissions.filter(s => s.score?.riskLevel === 'high' || s.score?.riskLevel === 'critical').length
    };
  }

  private calculateRiskDistribution() {
    const distribution = { low: 0, medium: 0, high: 0, critical: 0 };
    
    this.submissions.forEach(submission => {
      const riskLevel = submission.score?.riskLevel || 'low';
      distribution[riskLevel]++;
    });

    return distribution;
  }

  private prepareOverviewData() {
    const stats = this.calculateStats();
    return [
      { Metric: 'Total Submissions', Value: stats.total },
      { Metric: 'Approved', Value: stats.approved },
      { Metric: 'Rejected', Value: stats.rejected },
      { Metric: 'Under Review', Value: stats.underReview },
      { Metric: 'Average Score', Value: `${stats.avgScore}%` },
      { Metric: 'High Risk', Value: stats.highRisk }
    ];
  }

  private prepareSubmissionsData() {
    return this.submissions.map(submission => ({
      ID: submission.id,
      'Submitter Name': submission.submitterName || 'N/A',
      'Submitter Email': submission.submitterEmail,
      'Company': submission.companyName || 'N/A',
      'Type': submission.submissionType,
      'Status': submission.status,
      'Score': submission.score ? `${submission.score.percentage}%` : 'N/A',
      'Risk Level': submission.score?.riskLevel || 'N/A',
      'Submitted At': new Date(submission.submittedAt).toLocaleDateString()
    }));
  }
}
