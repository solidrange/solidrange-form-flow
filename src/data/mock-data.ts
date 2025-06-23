
import { Form } from '@/types/form';

/**
 * Mock data for forms used in development and testing
 * This provides sample forms with various configurations and statuses
 */
export const mockForms: Form[] = [
  {
    id: 'form-001',
    title: 'Employee Onboarding Form',
    description: 'Complete onboarding process for new employees',
    status: 'published',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    fields: [
      {
        id: 'field-001',
        type: 'text',
        label: 'Full Name',
        required: true,
        placeholder: 'Enter your full name'
      },
      {
        id: 'field-002',
        type: 'email',
        label: 'Email Address',
        required: true,
        placeholder: 'Enter your email'
      },
      {
        id: 'field-003',
        type: 'select',
        label: 'Department',
        required: true,
        options: ['Engineering', 'Marketing', 'Sales', 'HR']
      }
    ],
    settings: {
      allowMultipleSubmissions: false,
      requireLogin: true,
      showProgressBar: true,
      theme: 'light' as const,
      scoring: {
        enabled: false,
        maxTotalPoints: 100,
        showScoreToUser: false,
        passingScore: 70,
        riskThresholds: {
          low: 30,
          medium: 60,
          high: 90
        }
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
      }
    },
    submissions: [
      {
        id: 'sub-001',
        formId: 'form-001',
        submittedAt: new Date('2024-01-21'),
        submitterEmail: 'john.doe@company.com',
        submitterName: 'John Doe',
        vendorInfo: {
          isVendor: false,
          companyName: 'Internal'
        },
        responses: {
          'field-001': 'John Doe',
          'field-002': 'john.doe@company.com',
          'field-003': 'Engineering'
        },
        status: 'pending',
        score: 85
      }
    ]
  },
  {
    id: 'form-002',
    title: 'Vendor Registration Form',
    description: 'Registration form for external vendors',
    status: 'draft',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    fields: [
      {
        id: 'field-004',
        type: 'text',
        label: 'Company Name',
        required: true,
        placeholder: 'Enter company name'
      },
      {
        id: 'field-005',
        type: 'email',
        label: 'Contact Email',
        required: true,
        placeholder: 'Enter contact email'
      }
    ],
    settings: {
      allowMultipleSubmissions: true,
      requireLogin: false,
      showProgressBar: false,
      theme: 'light' as const,
      scoring: {
        enabled: true,
        maxTotalPoints: 100,
        showScoreToUser: true,
        passingScore: 60,
        riskThresholds: {
          low: 25,
          medium: 50,
          high: 80
        }
      },
      expiration: {
        enabled: true,
        expirationDate: new Date('2024-12-31'),
        message: 'Vendor registration period has ended.'
      },
      emailDistribution: {
        enabled: true,
        recipients: [
          {
            id: 'rec-001',
            email: 'vendor@external.com',
            status: 'pending',
            remindersSent: 0
          }
        ],
        reminderEnabled: true,
        reminderIntervalDays: 5,
        maxReminders: 2
      },
      approval: {
        enabled: true,
        requireApproval: true,
        approvers: ['manager@company.com'],
        autoApproveScore: 90
      },
      documents: {
        enabled: true,
        allowedTypes: ['pdf', 'docx'],
        maxSize: 5,
        requiredDocuments: ['Business License', 'Insurance Certificate'],
        allowUserUploads: true
      }
    },
    submissions: [
      {
        id: 'sub-002',
        formId: 'form-002',
        submittedAt: new Date('2024-01-19'),
        submitterEmail: 'contact@vendorcompany.com',
        submitterName: 'Vendor Company Inc.',
        vendorInfo: {
          isVendor: true,
          companyName: 'Vendor Company Inc.'
        },
        responses: {
          'field-004': 'Vendor Company Inc.',
          'field-005': 'contact@vendorcompany.com'
        },
        status: 'approved',
        score: 92
      }
    ]
  },
  {
    id: 'form-003',
    title: 'Customer Feedback Survey',
    description: 'Collect customer feedback and satisfaction ratings',
    status: 'published',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-25'),
    fields: [
      {
        id: 'field-006',
        type: 'text',
        label: 'Customer Name',
        required: false,
        placeholder: 'Enter your name (optional)'
      },
      {
        id: 'field-007',
        type: 'select',
        label: 'Satisfaction Rating',
        required: true,
        options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied']
      }
    ],
    settings: {
      allowMultipleSubmissions: true,
      requireLogin: false,
      showProgressBar: true,
      theme: 'custom' as const,
      customCss: '.form-container { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }',
      scoring: {
        enabled: false,
        maxTotalPoints: 100,
        showScoreToUser: false,
        passingScore: 70,
        riskThresholds: {
          low: 30,
          medium: 60,
          high: 90
        }
      },
      expiration: {
        enabled: false,
        expirationDate: new Date(),
        message: 'Survey has ended.'
      },
      emailDistribution: {
        enabled: false,
        recipients: [],
        reminderEnabled: false,
        reminderIntervalDays: 7,
        maxReminders: 3
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
        allowUserUploads: false
      }
    },
    submissions: []
  }
];
