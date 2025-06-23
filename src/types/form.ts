export interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
  defaultValue?: string | boolean | number | string[];
  placeholder?: string;
  description?: string;
  validationRegex?: string;
  errorMessage?: string;
  weightage?: number;
}

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: FormField[];
}

export interface DocumentAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface SubmissionScore {
  total: number;
  maxTotal: number;
  riskLevel: 'low' | 'medium' | 'high';
  reviewedBy: string;
  reviewedAt: Date;
  reviewComments: string;
}

export interface EmailRecipient {
  id: string;
  email: string;
  name: string;
}

export interface FormSettings {
  allowMultipleSubmissions: boolean;
  requireLogin: boolean;
  showProgressBar: boolean;
  theme: 'light' | 'dark';
  scoring?: {
    enabled: boolean;
    maxTotalPoints: number;
    showScoreToUser: boolean;
    riskThresholds: {
      low: number;
      medium: number;
      high: number;
    };
  };
  expiration?: {
    enabled: boolean;
    expirationDate?: Date;
  };
  emailDistribution?: {
    enabled: boolean;
    recipients: EmailRecipient[];
    reminderEnabled: boolean;
    reminderIntervalDays: number;
    maxReminders: number;
  };
  approval?: {
    enabled: boolean;
    requireApproval: boolean;
    approvers: string[];
  };
  documents?: {
    enabled: boolean;
    allowedTypes: string[];
    maxSize: number;
    requiredDocuments: string[];
    allowUserUploads: boolean;
  };
}

export interface Form {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  settings: FormSettings;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published';
  submissions: number;
  analytics: {
    views: number;
    submissions: number;
    completionRate: number;
    emailsSent: number;
    emailsCompleted: number;
    averageCompletionTime: number;
    dropoffRate: number;
  };
}

export interface ReviewActivity {
  id: string;
  action: 'approved' | 'rejected' | 'under_review' | 'resent' | 'reminder_sent' | 'info_requested';
  comments: string;
  reviewedBy: string;
  reviewedAt: Date;
  metadata?: {
    reason?: string;
    urgency?: 'low' | 'medium' | 'high';
    followUpDate?: Date;
    requiredDocuments?: string[];
    specificFields?: string[];
  };
}

export interface FormSubmission {
  id: string;
  formId: string;
  responses: Record<string, any>;
  submittedAt: Date;
  submittedBy: string;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  score?: SubmissionScore;
  activityLog: ReviewActivity[];
}
