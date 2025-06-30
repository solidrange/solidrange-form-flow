import { FormSubmission } from "@/types/form";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";

/**
 * Configuration interface for report generation
 * Defines all available options for customizing reports
 */
export interface ReportConfig {
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
    submissionType: 'all' | 'vendor' | 'internal';
    status: 'all' | 'submitted' | 'under_review' | 'approved' | 'rejected';
    riskLevel: 'all' | 'low' | 'medium' | 'high' | 'critical';
  };
  customRecommendations: string;
  format: 'pdf' | 'excel';
  includeCharts?: boolean;
}

/**
 * Interface for chart data that will be rendered in reports
 */
interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'donut';
  title: string;
  data: any[];
  elementId?: string;
}

/**
 * Main class for generating reports from form submissions
 * Handles both PDF and Excel report generation with customizable sections and charts
 */
export class ReportGenerator {
  private submissions: FormSubmission[];
  private config: ReportConfig;

  constructor(submissions: FormSubmission[], config: ReportConfig) {
    this.submissions = submissions;
    this.config = { ...config, includeCharts: config.includeCharts ?? true };
  }

  /**
   * Main method to generate and download the report
   * Determines format and calls appropriate generation method
   */
  async generate(): Promise<void> {
    if (this.config.format === 'pdf') {
      await this.generatePDF();
    } else {
      await this.generateExcel();
    }
  }

  /**
   * Generates chart data for different report sections
   */
  private generateChartData(): ChartData[] {
    const charts: ChartData[] = [];

    // Submission Trends Chart
    if (this.config.includeSections.submissionStats) {
      const monthlyData = this.submissions.reduce((acc, sub) => {
        const month = new Date(sub.submittedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const trendData = Object.entries(monthlyData).map(([month, count]) => ({
        name: month,
        value: count,
        submissions: count
      }));

      charts.push({
        type: this.config.chartTypes.submissionTrends,
        title: 'Submission Trends',
        data: trendData
      });
    }

    // Risk Distribution Chart
    if (this.config.includeSections.riskAnalysis) {
      const riskData = this.submissions.reduce((acc, sub) => {
        const risk = sub.score?.riskLevel || 'unknown';
        acc[risk] = (acc[risk] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const riskChartData = Object.entries(riskData).map(([risk, count]) => ({
        name: risk.charAt(0).toUpperCase() + risk.slice(1),
        value: count
      }));

      charts.push({
        type: this.config.chartTypes.riskDistribution,
        title: 'Risk Distribution',
        data: riskChartData
      });
    }

    // Compliance Status Chart
    if (this.config.includeSections.complianceStatus) {
      const statusData = this.submissions.reduce((acc, sub) => {
        acc[sub.status] = (acc[sub.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const complianceChartData = Object.entries(statusData).map(([status, count]) => ({
        name: status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1),
        value: count
      }));

      charts.push({
        type: this.config.chartTypes.complianceStatus,
        title: 'Compliance Status',
        data: complianceChartData
      });
    }

    return charts;
  }

  /**
   * Captures chart as image for PDF embedding
   */
  private async captureChartAsImage(chartElement: HTMLElement): Promise<string> {
    try {
      const canvas = await html2canvas(chartElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Error capturing chart:', error);
      return '';
    }
  }

  /**
   * Creates a temporary chart element for image capture
   */
  private createTemporaryChart(chartData: ChartData): HTMLElement {
    const container = document.createElement('div');
    container.style.width = '600px';
    container.style.height = '400px';
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.backgroundColor = '#ffffff';
    container.id = `temp-chart-${Date.now()}`;
    
    document.body.appendChild(container);
    
    // This would be replaced with actual chart rendering logic
    // For now, creating a placeholder
    container.innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 2px solid #e2e8f0; border-radius: 8px;">
        <div style="text-align: center;">
          <h3 style="margin: 0; color: #1f2937; font-size: 18px; margin-bottom: 10px;">${chartData.title}</h3>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">${chartData.type.toUpperCase()} Chart</p>
          <p style="margin: 5px 0 0 0; color: #9ca3af; font-size: 12px;">${chartData.data.length} data points</p>
        </div>
      </div>
    `;
    
    return container;
  }

  /**
   * Generates a PDF report with all selected sections and charts
   * Uses jsPDF and autoTable for structured document creation
   */
  private async generatePDF(): Promise<void> {
    const doc = new jsPDF();
    let yPosition = 20;

    // Title and description
    doc.setFontSize(20);
    doc.text(this.config.title, 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    doc.text(this.config.description, 20, yPosition);
    yPosition += 20;

    // Generate charts if enabled
    if (this.config.includeCharts) {
      const chartData = this.generateChartData();
      
      for (const chart of chartData) {
        // Check if we need a new page
        if (yPosition > 200) {
          doc.addPage();
          yPosition = 20;
        }

        // Add chart title
        doc.setFontSize(16);
        doc.text(chart.title, 20, yPosition);
        yPosition += 15;

        // Create and capture chart
        const tempChart = this.createTemporaryChart(chart);
        const chartImage = await this.captureChartAsImage(tempChart);
        
        if (chartImage) {
          // Add chart image to PDF
          doc.addImage(chartImage, 'PNG', 20, yPosition, 160, 100);
          yPosition += 110;
        }

        // Clean up temporary chart
        document.body.removeChild(tempChart);
        
        yPosition += 10;
      }
    }

    // Generate each section based on configuration
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

    if (this.config.includeSections.detailedResponses) {
      yPosition = this.addDetailedResponsesSection(doc, yPosition);
    }

    if (this.config.includeSections.recommendations) {
      yPosition = this.addRecommendationsSection(doc, yPosition);
    }

    // Save the PDF
    doc.save(`${this.config.title.replace(/\s+/g, '_')}.pdf`);
  }

  /**
   * Generates an Excel report with multiple worksheets
   * Creates separate sheets for different data types
   */
  private async generateExcel(): Promise<void> {
    const workbook = XLSX.utils.book_new();

    // Summary worksheet
    const summaryData = this.generateSummaryData();
    const summaryWS = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summaryWS, "Summary");

    // Submissions worksheet
    const submissionsData = this.generateSubmissionsData();
    const submissionsWS = XLSX.utils.json_to_sheet(submissionsData);
    XLSX.utils.book_append_sheet(workbook, submissionsWS, "Submissions");

    // Risk analysis worksheet
    if (this.config.includeSections.riskAnalysis) {
      const riskData = this.generateRiskData();
      const riskWS = XLSX.utils.json_to_sheet(riskData);
      XLSX.utils.book_append_sheet(workbook, riskWS, "Risk Analysis");
    }

    // Chart data worksheets
    if (this.config.includeCharts) {
      const chartData = this.generateChartData();
      chartData.forEach((chart, index) => {
        const chartWS = XLSX.utils.json_to_sheet(chart.data);
        XLSX.utils.book_append_sheet(workbook, chartWS, `Chart_${index + 1}_${chart.title.replace(/\s+/g, '_')}`);
      });
    }

    // Save the Excel file
    XLSX.writeFile(workbook, `${this.config.title.replace(/\s+/g, '_')}.xlsx`);
  }

  /**
   * Adds overview section to PDF with key metrics
   */
  private addOverviewSection(doc: jsPDF, yPosition: number): number {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.text("Executive Overview", 20, yPosition);
    yPosition += 15;

    const stats = this.calculateOverallStats();
    doc.setFontSize(12);
    doc.text(`Total Submissions: ${stats.total}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Approval Rate: ${stats.approvalRate}%`, 20, yPosition);
    yPosition += 8;
    doc.text(`Average Risk Score: ${stats.avgRiskScore}%`, 20, yPosition);
    yPosition += 20;

    return yPosition;
  }

  /**
   * Adds submission statistics section to PDF
   */
  private addSubmissionStatsSection(doc: jsPDF, yPosition: number): number {
    // Check if we need a new page
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.text("Submission Statistics", 20, yPosition);
    yPosition += 15;

    const statsData = [
      ['Metric', 'Value'],
      ['Total Submissions', this.submissions.length.toString()],
      ['Approved', this.submissions.filter(s => s.status === 'approved').length.toString()],
      ['Under Review', this.submissions.filter(s => s.status === 'under_review').length.toString()],
      ['Rejected', this.submissions.filter(s => s.status === 'rejected').length.toString()],
    ];

    autoTable(doc, {
      head: [statsData[0]],
      body: statsData.slice(1),
      startY: yPosition,
      margin: { left: 20 },
    });

    return (doc as any).lastAutoTable.finalY + 20;
  }

  /**
   * Adds risk analysis section to PDF
   */
  private addRiskAnalysisSection(doc: jsPDF, yPosition: number): number {
    // Check if we need a new page
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.text("Risk Analysis", 20, yPosition);
    yPosition += 15;

    const riskData = this.calculateRiskDistribution();
    const riskTableData = [
      ['Risk Level', 'Count', 'Percentage'],
      ['Critical', riskData.critical.toString(), `${((riskData.critical / this.submissions.length) * 100).toFixed(1)}%`],
      ['High', riskData.high.toString(), `${((riskData.high / this.submissions.length) * 100).toFixed(1)}%`],
      ['Medium', riskData.medium.toString(), `${((riskData.medium / this.submissions.length) * 100).toFixed(1)}%`],
      ['Low', riskData.low.toString(), `${((riskData.low / this.submissions.length) * 100).toFixed(1)}%`],
    ];

    autoTable(doc, {
      head: [riskTableData[0]],
      body: riskTableData.slice(1),
      startY: yPosition,
      margin: { left: 20 },
    });

    return (doc as any).lastAutoTable.finalY + 20;
  }

  /**
   * Adds compliance status section to PDF
   */
  private addComplianceSection(doc: jsPDF, yPosition: number): number {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.text("Compliance Status", 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    const complianceRate = (this.submissions.filter(s => s.status === 'approved').length / this.submissions.length * 100).toFixed(1);
    doc.text(`Overall Compliance Rate: ${complianceRate}%`, 20, yPosition);
    yPosition += 20;

    return yPosition;
  }

  /**
   * Adds detailed responses section to PDF
   */
  private addDetailedResponsesSection(doc: jsPDF, yPosition: number): number {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.text("Detailed Responses", 20, yPosition);
    yPosition += 15;

    // Add a summary of responses
    doc.setFontSize(12);
    doc.text("This section contains detailed submission data available in Excel format.", 20, yPosition);
    yPosition += 20;

    return yPosition;
  }

  /**
   * Adds recommendations section to PDF
   */
  private addRecommendationsSection(doc: jsPDF, yPosition: number): number {
    // Check if we need a new page
    if (yPosition > 200) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(16);
    doc.text("Recommendations", 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    const recommendations = this.config.customRecommendations || this.generateDefaultRecommendations();
    const lines = doc.splitTextToSize(recommendations, 170);
    doc.text(lines, 20, yPosition);

    return yPosition + (lines.length * 8) + 20;
  }

  /**
   * Calculates overall statistics for the report
   */
  private calculateOverallStats() {
    const total = this.submissions.length;
    const approved = this.submissions.filter(s => s.status === 'approved').length;
    const approvalRate = total > 0 ? ((approved / total) * 100).toFixed(1) : '0';
    
    // Calculate average risk score if available
    const submissionsWithScores = this.submissions.filter(s => s.score && typeof s.score === 'object');
    const avgRiskScore = submissionsWithScores.length > 0 
      ? (submissionsWithScores.reduce((sum, s) => sum + ((s.score as any)?.percentage || 0), 0) / submissionsWithScores.length).toFixed(1)
      : '0';

    return { total, approved, approvalRate, avgRiskScore };
  }

  /**
   * Calculates risk distribution across submissions
   */
  private calculateRiskDistribution() {
    const distribution = { critical: 0, high: 0, medium: 0, low: 0 };
    
    this.submissions.forEach(submission => {
      if (submission.score && typeof submission.score === 'object') {
        const riskLevel = (submission.score as any)?.riskLevel;
        if (riskLevel && distribution.hasOwnProperty(riskLevel)) {
          distribution[riskLevel as keyof typeof distribution]++;
        }
      }
    });

    return distribution;
  }

  /**
   * Generates summary data for Excel export
   */
  private generateSummaryData() {
    const stats = this.calculateOverallStats();
    return [
      { Metric: 'Total Submissions', Value: stats.total },
      { Metric: 'Approved Submissions', Value: stats.approved },
      { Metric: 'Approval Rate (%)', Value: stats.approvalRate },
      { Metric: 'Average Risk Score (%)', Value: stats.avgRiskScore },
    ];
  }

  /**
   * Generates detailed submissions data for Excel export
   */
  private generateSubmissionsData() {
    return this.submissions.map(submission => ({
      'Submission ID': submission.id,
      'Submitted By': submission.submittedBy,
      'Submitter Email': submission.submitterEmail,
      'Company': (submission as any).companyName || 'N/A',
      'Type': (submission as any).submissionType || 'N/A',
      'Status': submission.status,
      'Submitted At': submission.submittedAt.toLocaleDateString(),
      'Score': typeof submission.score === 'object' ? (submission.score as any)?.total : 'N/A',
      'Risk Level': typeof submission.score === 'object' ? (submission.score as any)?.riskLevel : 'N/A',
    }));
  }

  /**
   * Generates risk analysis data for Excel export
   */
  private generateRiskData() {
    const distribution = this.calculateRiskDistribution();
    return [
      { 'Risk Level': 'Critical', Count: distribution.critical, 'Percentage': ((distribution.critical / this.submissions.length) * 100).toFixed(1) + '%' },
      { 'Risk Level': 'High', Count: distribution.high, 'Percentage': ((distribution.high / this.submissions.length) * 100).toFixed(1) + '%' },
      { 'Risk Level': 'Medium', Count: distribution.medium, 'Percentage': ((distribution.medium / this.submissions.length) * 100).toFixed(1) + '%' },
      { 'Risk Level': 'Low', Count: distribution.low, 'Percentage': ((distribution.low / this.submissions.length) * 100).toFixed(1) + '%' },
    ];
  }

  /**
   * Generates default recommendations based on submission data
   */
  private generateDefaultRecommendations(): string {
    const stats = this.calculateOverallStats();
    const riskDistribution = this.calculateRiskDistribution();
    
    let recommendations = "Based on the analysis of form submissions:\n\n";
    
    if (parseInt(stats.approvalRate) < 70) {
      recommendations += "• Consider reviewing approval criteria as approval rate is below 70%\n";
    }
    
    if (riskDistribution.high + riskDistribution.critical > this.submissions.length * 0.3) {
      recommendations += "• High risk submissions exceed 30% - implement additional screening measures\n";
    }
    
    recommendations += "• Regular monitoring and review processes should be maintained\n";
    recommendations += "• Consider automating routine compliance checks for efficiency";
    
    return recommendations;
  }
}
