
/**
 * Represents a single form field with all its configuration options
 */
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
  /**
   * Scoring configuration for the field
   */
  scoring?: {
    enabled: boolean;
    maxPoints?: number;
    weightMultiplier?: number;
    correctAnswers?: string[];
    scoringCriteria?: Record<string, number>;
    requiresManualReview?: boolean;
    riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  };
  /**
   * Validation rules for the field
   */
  validation?: {
    message?: string;
    regex?: string;
  };
}

/**
 * Represents a form template that can be used to create new forms
 */
export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: FormField[];
  preview?: string;
  riskCategories?: string[];
  scoringModel?: string;
}

/**
 * Represents a document attachment in a submission
 */
export interface DocumentAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

/**
 * Represents the score assigned to a form submission
 */
export interface SubmissionScore {
  total: number;
  maxTotal: number;
  percentage: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskScore?: number;
  reviewedBy: string;
  reviewedAt: Date;
  reviewComments: string;
  categoryScores?: Record<string, number>;
}

/**
 * Represents an email recipient for form distribution
 */
export interface EmailRecipient {
  id: string;
  email: string;
  name?: string;
  status: 'pending' | 'sent' | 'opened' | 'completed' | 'expired';
  remindersSent: number;
  sentAt?: Date;
  completedAt?: Date;
  lastReminderAt?: Date;
}

/**
 * Configuration settings for a form
 */
export interface FormSettings {
  allowMultipleSubmissions: boolean;
  requireLogin: boolean;
  showProgressBar: boolean;
  theme: 'light' | 'dark' | 'custom';
  customCss?: string;
  /**
   * Scoring configuration for the entire form
   */
  scoring?: {
    enabled: boolean;
    maxTotalPoints: number;
    showScoreToUser: boolean;
    passingScore: number;
    riskThresholds: {
      low: number;
      medium: number;
      high: number;
    };
  };
  /**
   * Form expiration settings
   */
  expiration?: {
    enabled: boolean;
    expirationDate?: Date;
    message?: string;
  };
  /**
   * Email distribution settings
   */
  emailDistribution?: {
    enabled: boolean;
    recipients: EmailRecipient[];
    reminderEnabled: boolean;
    reminderIntervalDays: number;
    maxReminders: number;
  };
  /**
   * Approval workflow settings
   */
  approval?: {
    enabled: boolean;
    requireApproval: boolean;
    approvers: string[];
    autoApproveScore?: number;
  };
  /**
   * Document attachment settings
   */
  documents?: {
    enabled: boolean;
    allowedTypes: string[];
    maxSize: number;
    requiredDocuments: string[];
    allowUserUploads: boolean;
  };
}

/**
 * Represents vendor information for a submission
 */
export interface VendorInfo {
  isVendor: boolean;
  companyName: string;
}

/**
 * Represents a review activity performed on a submission
 */
export interface ReviewActivity {
  id: string;
  action: 'approved' | 'rejected' | 'under_review' | 'resent' | 'reminder_sent' | 'info_requested';
  comments: string;
  reviewedBy: string;
  reviewedAt: Date;
  /**
   * Additional metadata for the review action
   */
  metadata?: {
    reason?: string;
    urgency?: 'low' | 'medium' | 'high';
    followUpDate?: Date;
    requiredDocuments?: string[];
    specificFields?: string[];
    rejectionReason?: string;
    infoRequestType?: string;
    customInstructions?: string;
  };
}

/**
 * Represents a form submission with all related data
 */
export interface FormSubmission {
  id: string;
  formId: string;
  responses: Record<string, any>;
  submittedAt: Date;
  submitterEmail: string;
  submitterName: string;
  /**
   * Submission type - vendor or internal
   */
  submissionType: 'vendor' | 'internal';
  /**
   * Company name for vendor submissions
   */
  companyName?: string;
  /**
   * Vendor information for the submission
   */
  vendorInfo: VendorInfo;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'pending';
  /**
   * Score object with detailed scoring information
   */
  score?: SubmissionScore;
  /**
   * Activity log for tracking review activities
   */
  activityLog?: ReviewActivity[];
  // Additional tracking fields
  completionPercentage?: number;
  timeSpent?: number;
}

/**
 * Represents a complete form with all its configuration
 */
export interface Form {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  settings: FormSettings;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published';
  /**
   * Array of form submissions
   */
  submissions: FormSubmission[];
  /**
   * Analytics data for the form
   */
  analytics?: {
    views: number;
    submissions: number;
    completionRate: number;
    emailsSent: number;
    emailsCompleted: number;
    averageCompletionTime: number;
    dropoffRate: number;
  };
}
