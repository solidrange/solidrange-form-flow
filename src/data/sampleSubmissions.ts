
import { FormSubmission } from "@/types/form";

export const sampleSubmissions: FormSubmission[] = [
  {
    id: '1',
    formId: 'form1',
    recipientId: 'vendor@techcorp.com',
    responses: {
      'company-name': 'TechCorp Solutions',
      'security-certification': 'ISO 27001, SOC 2',
      'data-encryption': 'Yes',
      'backup-frequency': 'Daily'
    },
    completionPercentage: 100,
    timeSpent: 450,
    score: {
      total: 85,
      maxTotal: 100,
      percentage: 85,
      passed: true,
      riskLevel: 'low',
      riskScore: 15,
      categoryScores: {
        'Security': 90,
        'Financial': 80,
        'Compliance': 85
      },
      manualReviewRequired: false
    },
    submittedAt: new Date('2024-06-01'),
    lastModifiedAt: new Date('2024-06-01'),
    status: 'approved'
  },
  {
    id: '2',
    formId: 'form1',
    recipientId: 'supplier@globalmanufacturing.com',
    responses: {
      'company-name': 'Global Manufacturing Ltd',
      'security-certification': 'None',
      'data-encryption': 'Partial'
    },
    completionPercentage: 60,
    timeSpent: 180,
    score: {
      total: 45,
      maxTotal: 100,
      percentage: 45,
      passed: false,
      riskLevel: 'high',
      riskScore: 55,
      categoryScores: {
        'Security': 30,
        'Financial': 60,
        'Compliance': 45
      },
      manualReviewRequired: true
    },
    submittedAt: new Date('2024-06-02'),
    lastModifiedAt: new Date('2024-06-02'),
    status: 'under_review'
  },
  {
    id: '3',
    formId: 'form1',
    recipientId: 'partner@financialservices.com',
    responses: {
      'company-name': 'Financial Services Inc',
      'security-certification': 'SOC 2, PCI DSS',
      'data-encryption': 'Yes',
      'backup-frequency': 'Real-time',
      'insurance-coverage': '$10M',
      'compliance-framework': 'GDPR, CCPA'
    },
    completionPercentage: 100,
    timeSpent: 720,
    score: {
      total: 95,
      maxTotal: 100,
      percentage: 95,
      passed: true,
      riskLevel: 'low',
      riskScore: 5,
      categoryScores: {
        'Security': 98,
        'Financial': 92,
        'Compliance': 95
      },
      manualReviewRequired: false
    },
    submittedAt: new Date('2024-06-03'),
    lastModifiedAt: new Date('2024-06-03'),
    status: 'approved'
  },
  {
    id: '4',
    formId: 'form1',
    recipientId: 'vendor@startuptech.com',
    responses: {
      'company-name': 'Startup Tech',
      'security-certification': '',
      'data-encryption': 'No'
    },
    completionPercentage: 30,
    timeSpent: 90,
    score: {
      total: 25,
      maxTotal: 100,
      percentage: 25,
      passed: false,
      riskLevel: 'critical',
      riskScore: 75,
      categoryScores: {
        'Security': 10,
        'Financial': 40,
        'Compliance': 25
      },
      manualReviewRequired: true
    },
    submittedAt: new Date('2024-06-04'),
    lastModifiedAt: new Date('2024-06-04'),
    status: 'rejected'
  },
  {
    id: '5',
    formId: 'form1',
    recipientId: 'contractor@consultingfirm.com',
    responses: {
      'company-name': 'Consulting Firm LLC',
      'security-certification': 'ISO 27001',
      'data-encryption': 'Yes',
      'backup-frequency': 'Weekly',
      'insurance-coverage': '$5M'
    },
    completionPercentage: 80,
    timeSpent: 360,
    score: {
      total: 72,
      maxTotal: 100,
      percentage: 72,
      passed: true,
      riskLevel: 'medium',
      riskScore: 28,
      categoryScores: {
        'Security': 75,
        'Financial': 70,
        'Compliance': 72
      },
      manualReviewRequired: false
    },
    submittedAt: new Date('2024-06-05'),
    lastModifiedAt: new Date('2024-06-05'),
    status: 'submitted'
  },
  {
    id: '6',
    formId: 'form1',
    recipientId: 'employee@healthcareorg.com',
    responses: {
      'employee-name': 'Sarah Johnson',
      'department': 'IT Security',
      'training-completed': 'Yes',
      'security-awareness': 'Advanced'
    },
    completionPercentage: 100,
    timeSpent: 240,
    score: {
      total: 88,
      maxTotal: 100,
      percentage: 88,
      passed: true,
      riskLevel: 'low',
      riskScore: 12,
      categoryScores: {
        'Knowledge': 90,
        'Practical': 85,
        'Compliance': 90
      },
      manualReviewRequired: false
    },
    submittedAt: new Date('2024-06-06'),
    lastModifiedAt: new Date('2024-06-06'),
    status: 'approved'
  }
];
