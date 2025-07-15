
import { Form, FormSubmission } from '@/types/form';

export const sampleForm: Form = {
  id: 'sample-form-1',
  title: 'Vendor Risk Assessment Form',
  description: 'A comprehensive risk assessment form for vendor evaluation',
  fields: [
    {
      id: 'company-name',
      type: 'text',
      label: 'Company Name',
      required: true,
      placeholder: 'Enter company name'
    },
    {
      id: 'risk-level',
      type: 'select',
      label: 'Risk Level',
      required: true,
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'medium', label: 'Medium Risk' },
        { value: 'high', label: 'High Risk' },
        { value: 'critical', label: 'Critical Risk' }
      ]
    }
  ],
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  status: 'published',
  settings: {
    allowMultipleSubmissions: false,
    requireLogin: false,
    showProgressBar: true,
    branding: {
      enabled: true,
      showLogo: true,
      showBrandColors: true,
      brandName: 'FormFlow',
      logo: null,
      colors: null
    },
    scoring: {
      enabled: true,
      maxTotalPoints: 100,
      showScoreToUser: false,
      passingScore: 70,
      riskThresholds: {
        low: 30,
        medium: 60,
        high: 90
      }
    },
    approval: {
      enabled: false,
      requireApproval: false,
      approvers: [],
      autoApproveScore: 80
    },
    documents: {
      enabled: false,
      allowedTypes: [],
      maxSize: 10,
      requiredDocuments: [],
      allowUserUploads: true
    },
    expiration: {
      enabled: false,
      expirationDate: new Date(),
      message: 'This form has expired.'
    },
    emailDistribution: {
      enabled: false,
      recipients: [],
      reminderEnabled: false,
      reminderIntervalDays: 7,
      maxReminders: 3
    }
  },
  analytics: {
    enabled: true,
    trackingPixel: false,
    googleAnalytics: undefined,
    customEvents: false,
    views: 0,
    submissions: 0,
    emailsSent: 0,
    completionRate: 0
  }
};

export const sampleSubmissions: FormSubmission[] = [
  {
    id: 'submission-1',
    formId: 'sample-form-1',
    submitterEmail: 'john@techcorp.com',
    submitterName: 'John Smith',
    companyName: 'TechCorp Solutions',
    data: {},
    status: 'submitted',
    submittedAt: new Date('2025-03-19'),
    submissionType: 'vendor',
    timeSpent: 1200,
    score: {
      total: 85,
      maxTotal: 100,
      percentage: 85,
      riskLevel: 'low'
    },
    documents: []
  },
  {
    id: 'submission-2',
    formId: 'sample-form-1',
    submitterEmail: 'sarah@globalfinance.com',
    submitterName: 'Sarah Johnson',
    companyName: 'Global Finance Inc',
    data: {},
    status: 'rejected',
    submittedAt: new Date('2024-03-21'),
    submissionType: 'external',
    timeSpent: 900,
    score: {
      total: 45,
      maxTotal: 100,
      percentage: 45,
      riskLevel: 'high'
    },
    documents: []
  }
];
