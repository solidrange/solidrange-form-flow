
export interface FormField {
  id: string;
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'textarea'
    | 'select'
    | 'radio'
    | 'checkbox'
    | 'date'
    | 'file'
    | 'rating'
    | 'signature';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: {
    regex?: string;
    message?: string;
  };
  scoring?: {
    enabled: boolean;
    maxPoints?: number;
    weightMultiplier?: number;
    correctAnswers?: string[];
    requiresManualReview?: boolean;
  };
}

export interface DocumentAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt?: Date;
}

export interface FormSettings {
  allowMultipleSubmissions: boolean;
  requireLogin: boolean;
  showProgressBar: boolean;
  theme?: 'light' | 'dark' | 'custom';
  customCss?: string;
  branding?: {
    enabled: boolean;
    showLogo: boolean;
    showBrandColors: boolean;
    brandName: string;
    logo: string | null;
    colors: {
      primary: { main: string; light: string; dark: string };
      secondary: { main: string; light: string; dark: string };
    } | null;
  };
  scoring?: {
    enabled: boolean;
    maxTotalPoints: number;
    showScoreToUser: boolean;
    passingScore?: number;
    riskThresholds?: {
      low: number;
      medium: number;
      high: number;
    };
  };
  approval?: {
    enabled: boolean;
    requireApproval: boolean;
    approvers: string[];
    autoApproveScore?: number;
  };
  documents?: {
    enabled: boolean;
    allowedTypes: string[];
    maxSize: number;
    requiredDocuments: string[];
    allowUserUploads: boolean;
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
  };
}

export interface EmailRecipient {
  id: string;
  email: string;
  name?: string;
  status: 'pending' | 'sent' | 'failed' | 'opened' | 'completed' | 'expired';
  remindersSent: number;
  sentAt?: Date;
  completedAt?: Date;
  lastReminderAt?: Date;
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
  analytics?: {
    enabled: boolean;
    trackingPixel: boolean;
    googleAnalytics?: string;
    customEvents: boolean;
  };
}

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: FormField[];
  settings: Partial<FormSettings>;
  previewImage?: string;
  tags: string[];
}

export interface FormSubmission {
  id: string;
  formId: string;
  submitterName?: string;
  submitterEmail: string;
  companyName?: string;
  submissionType: 'vendor' | 'internal' | 'external';
  responses: Record<string, any>;
  submittedAt: Date;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';
  approvalType?: 'fully' | 'partially';
  timeSpent?: number;
  score?: {
    total: number;
    maxTotal: number;
    percentage: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    categoryScores?: Record<string, number>;
    reviewedBy?: string;
    reviewedAt?: Date;
    reviewComments?: string;
  };
  activityLog?: ReviewActivity[];
  documents?: DocumentAttachment[];
}

export interface ReviewActivity {
  id: string;
  action: 'approved' | 'rejected' | 'under_review' | 'resent' | 'reminder_sent';
  comments: string;
  reviewedBy: string;
  reviewedAt: Date;
  metadata?: {
    reason?: string;
    urgency?: 'low' | 'medium' | 'high';
    specificFields?: string[];
    requiredDocuments?: string[];
    approvalType?: 'fully' | 'partially';
  };
}
