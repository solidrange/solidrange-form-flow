
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import { FormSubmission } from '@/types/form';
import { ReportConfig } from '@/components/reports/ReportCustomization';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export class ReportGenerator {
  private submissions: FormSubmission[];
  private config: ReportConfig;

  constructor(submissions: FormSubmission[], config: ReportConfig) {
    this.submissions = this.filterSubmissions(submissions, config.filterBy);
    this.config = config;
  }

  private filterSubmissions(submissions: FormSubmission[], filters: ReportConfig['filterBy']): FormSubmission[] {
    return submissions.filter(submission => {
      // Filter by submission type
      if (filters.submissionType !== 'all' && submission.submissionType !== filters.submissionType) {
        return false;
      }

      // Filter by status
      if (filters.status !== 'all' && submission.status !== filters.status) {
        return false;
      }

      // Filter by risk level
      if (filters.riskLevel !== 'all' && submission.score?.riskLevel !== filters.riskLevel) {
        return false;
      }

      // Filter by date range
      if (filters.dateRange.start || filters.dateRange.end) {
        const submissionDate = new Date(submission.submittedAt);
        if (filters.dateRange.start && submissionDate < new Date(filters.dateRange.start)) {
          return false;
        }
        if (filters.dateRange.end && submissionDate > new Date(filters.dateRange.end)) {
          return false;
        }
      }

      return true;
    });
  }

  private getStatistics() {
    const total = this.submissions.length;
    const approved = this.submissions.filter(s => s.status === 'approved').length;
    const rejected = this.submissions.filter(s => s.status === 'rejected').length;
    const underReview = this.submissions.filter(s => s.status === 'under_review').length;
    
    const riskLevels = this.submissions.reduce((acc, s) => {
      const risk = s.score?.riskLevel || 'unknown';
      acc[risk] = (acc[risk] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const averageScore = this.submissions.reduce((sum, s) => sum + (s.score?.percentage || 0), 0) / total;
    const averageRiskScore = this.submissions.reduce((sum, s) => sum + (s.score?.riskScore || 0), 0) / total;

    return {
      total,
      approved,
      rejected,
      underReview,
      riskLevels,
      averageScore: Math.round(averageScore * 100) / 100,
      averageRiskScore: Math.round(averageRiskScore * 100) / 100,
      approvalRate: Math.round((approved / total) * 100),
      submissionTypes: {
        vendor: this.submissions.filter(s => s.submissionType === 'vendor').length,
        internal: this.submissions.filter(s => s.submissionType === 'internal').length,
      }
    };
  }

  async generatePDF(): Promise<void> {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    let yPosition = 20;

    // Title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text(this.config.title, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Description
    if (this.config.description) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const splitDescription = pdf.splitTextToSize(this.config.description, pageWidth - 40);
      pdf.text(splitDescription, 20, yPosition);
      yPosition += splitDescription.length * 5 + 10;
    }

    const stats = this.getStatistics();

    // Overview Section
    if (this.config.includeSections.overview) {
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Executive Summary', 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const overviewData = [
        ['Total Submissions', stats.total.toString()],
        ['Approved', `${stats.approved} (${stats.approvalRate}%)`],
        ['Rejected', stats.rejected.toString()],
        ['Under Review', stats.underReview.toString()],
        ['Average Score', `${stats.averageScore}%`],
        ['Average Risk Score', stats.averageRiskScore.toString()],
      ];

      pdf.autoTable({
        startY: yPosition,
        head: [['Metric', 'Value']],
        body: overviewData,
        theme: 'striped',
        headStyles: { fillColor: [66, 139, 202] },
      });

      yPosition = (pdf as any).lastAutoTable.finalY + 15;
    }

    // Risk Analysis Section
    if (this.config.includeSections.riskAnalysis) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Risk Analysis', 20, yPosition);
      yPosition += 10;

      const riskData = Object.entries(stats.riskLevels).map(([risk, count]) => [
        risk.charAt(0).toUpperCase() + risk.slice(1),
        count.toString(),
        `${Math.round((count / stats.total) * 100)}%`
      ]);

      pdf.autoTable({
        startY: yPosition,
        head: [['Risk Level', 'Count', 'Percentage']],
        body: riskData,
        theme: 'striped',
        headStyles: { fillColor: [220, 53, 69] },
      });

      yPosition = (pdf as any).lastAutoTable.finalY + 15;
    }

    // Detailed Responses Section
    if (this.config.includeSections.detailedResponses) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Detailed Submissions', 20, yPosition);
      yPosition += 10;

      const detailedData = this.submissions.slice(0, 10).map(submission => [
        submission.companyName || 'N/A',
        submission.submissionType,
        submission.status,
        submission.score?.riskLevel || 'N/A',
        `${submission.score?.percentage || 0}%`,
        new Date(submission.submittedAt).toLocaleDateString()
      ]);

      pdf.autoTable({
        startY: yPosition,
        head: [['Company', 'Type', 'Status', 'Risk Level', 'Score', 'Submitted']],
        body: detailedData,
        theme: 'striped',
        headStyles: { fillColor: [40, 167, 69] },
        styles: { fontSize: 8 },
      });

      yPosition = (pdf as any).lastAutoTable.finalY + 15;
    }

    // Recommendations Section
    if (this.config.includeSections.recommendations) {
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Recommendations', 20, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');

      const recommendations = this.generateRecommendations(stats);
      if (this.config.customRecommendations) {
        recommendations.push(this.config.customRecommendations);
      }

      recommendations.forEach((rec, index) => {
        const splitRec = pdf.splitTextToSize(`${index + 1}. ${rec}`, pageWidth - 40);
        pdf.text(splitRec, 20, yPosition);
        yPosition += splitRec.length * 5 + 5;
      });
    }

    // Save the PDF
    pdf.save(`${this.config.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  }

  generateExcel(): void {
    const workbook = XLSX.utils.book_new();
    const stats = this.getStatistics();

    // Overview Sheet
    const overviewData = [
      ['Metric', 'Value'],
      ['Total Submissions', stats.total],
      ['Approved', stats.approved],
      ['Rejected', stats.rejected],
      ['Under Review', stats.underReview],
      ['Average Score (%)', stats.averageScore],
      ['Average Risk Score', stats.averageRiskScore],
      ['Approval Rate (%)', stats.approvalRate],
    ];

    const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview');

    // Submissions Data Sheet
    const submissionsData = [
      ['Company Name', 'Submission Type', 'Status', 'Risk Level', 'Score (%)', 'Risk Score', 'Submitted Date', 'Completion %', 'Time Spent (min)']
    ];

    this.submissions.forEach(submission => {
      submissionsData.push([
        submission.companyName || 'N/A',
        submission.submissionType,
        submission.status,
        submission.score?.riskLevel || 'N/A',
        submission.score?.percentage || 0,
        submission.score?.riskScore || 0,
        new Date(submission.submittedAt).toLocaleDateString(),
        submission.completionPercentage,
        Math.round(submission.timeSpent / 60)
      ]);
    });

    const submissionsSheet = XLSX.utils.aoa_to_sheet(submissionsData);
    XLSX.utils.book_append_sheet(workbook, submissionsSheet, 'Submissions');

    // Risk Analysis Sheet
    const riskData = [['Risk Level', 'Count', 'Percentage']];
    Object.entries(stats.riskLevels).forEach(([risk, count]) => {
      riskData.push([
        risk.charAt(0).toUpperCase() + risk.slice(1),
        count,
        Math.round((count / stats.total) * 100)
      ]);
    });

    const riskSheet = XLSX.utils.aoa_to_sheet(riskData);
    XLSX.utils.book_append_sheet(workbook, riskSheet, 'Risk Analysis');

    // Save the Excel file
    XLSX.writeFile(workbook, `${this.config.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

  private generateRecommendations(stats: any): string[] {
    const recommendations: string[] = [];

    if (stats.approvalRate < 70) {
      recommendations.push("Consider reviewing and improving vendor screening criteria as the approval rate is below 70%.");
    }

    if (stats.riskLevels.high > stats.total * 0.2) {
      recommendations.push("High number of high-risk submissions detected. Implement additional due diligence procedures.");
    }

    if (stats.riskLevels.critical > 0) {
      recommendations.push("Critical risk submissions require immediate attention and enhanced monitoring.");
    }

    if (stats.averageScore < 75) {
      recommendations.push("Average submission score is below acceptable threshold. Consider providing vendor training resources.");
    }

    if (stats.submissionTypes.vendor > stats.submissionTypes.internal * 3) {
      recommendations.push("High volume of vendor submissions. Consider implementing automated pre-screening tools.");
    }

    return recommendations;
  }

  async generate(): Promise<void> {
    if (this.config.format === 'pdf') {
      await this.generatePDF();
    } else {
      this.generateExcel();
    }
  }
}
