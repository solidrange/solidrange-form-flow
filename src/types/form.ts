
export interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'file' | 'rating' | 'signature';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  conditionalLogic?: {
    dependsOn: string;
    condition: 'equals' | 'not_equals' | 'contains';
    value: string;
  };
  scoring?: {
    enabled: boolean;
    weights?: Record<string, number>;
    correctAnswers?: string[];
    requiresManualReview?: boolean;
    weightMultiplier?: number;
    maxPoints?: number;
    riskLevel?: 'low' | 'medium' | 'high' | 'critical';
    scoringCriteria?: Record<string, number>;
  };
}

export interface EmailRecipient {
  id: string;
  email: string;
  name?: string;
  companyName?: string;
  sentAt?: Date;
  completedAt?: Date;
  status: 'pending' | 'sent' | 'opened' | 'completed' | 'expired';
  remindersSent: number;
  lastReminderAt?: Date;
}

export interface DocumentAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface Form {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  settings: {
    allowMultipleSubmissions: boolean;
    requireLogin: boolean;
    showProgressBar: boolean;
    theme: 'light' | 'dark' | 'custom';
    customCss?: string;
    scoring?: {
      enabled: boolean;
      maxTotalPoints: number;
      passingScore?: number;
      showScoreToUser: boolean;
      riskThresholds?: {
        low: number;
        medium: number;
        high: number;
      };
    };
    expiration?: {
      enabled: boolean;
      expirationDate?: Date;
      message?: string;
    };
    emailDistribution?: {
      enabled: boolean;
      recipients: EmailRecipient[];
      reminderEnabled: boolean;
      reminderIntervalDays: number;
      maxReminders: number;
      customEmailTemplate?: string;
    };
    approval?: {
      enabled: boolean;
      requireApproval: boolean;
      approvers: string[];
      autoApproveScore?: number;
      escalationRules?: {
        timeLimit: number;
        escalateTo: string;
      };
    };
    documents?: {
      enabled: boolean;
      allowedTypes: string[];
      maxSize: number;
      requiredDocuments: DocumentAttachment[];
      allowUserUploads: boolean;
    };
    notifications?: {
      onSubmission: boolean;
      onApproval: boolean;
      emailRecipients: string[];
      webhookUrl?: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
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

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: 'survey' | 'assessment' | 'registration' | 'feedback' | 'compliance' | 'risk' | 'vendor-risk';
  fields: Omit<FormField, 'id'>[];
  preview: string;
  riskCategories?: string[];
  scoringModel?: 'weighted' | 'percentage' | 'risk-matrix';
}

export interface FormSubmission {
  id: string;
  formId: string;
  recipientId?: string;
  companyName?: string;
  submissionType: 'vendor' | 'internal';
  responses: Record<string, any>;
  attachments?: DocumentAttachment[];
  completionPercentage: number;
  timeSpent: number;
  score?: {
    total: number;
    maxTotal: number;
    percentage: number;
    passed: boolean;
    riskLevel?: 'low' | 'medium' | 'high' | 'critical';
    riskScore: number;
    categoryScores?: Record<string, number>;
    manualReviewRequired: boolean;
    reviewedBy?: string;
    reviewedAt?: Date;
    reviewComments?: string;
  };
  submittedAt: Date;
  status: 'submitted' | 'under_review' | 'reviewed' | 'approved' | 'rejected';
  lastModifiedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}
