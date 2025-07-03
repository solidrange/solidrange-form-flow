
/**
 * FORM BUILDER TYPE DEFINITIONS
 * ==============================
 * 
 * This file defines the structure and types of all data used in our Form Builder application.
 * Think of these as blueprints or templates that describe what information each piece of data should contain.
 * 
 * Why do we need this?
 * - Ensures consistency: All parts of the app use the same data structure
 * - Prevents errors: TypeScript checks that we use data correctly
 * - Documentation: Serves as a reference for what each data piece contains
 * - Code completion: Helps developers by suggesting available fields
 */

/**
 * FormField Interface
 * ===================
 * 
 * Represents a single field in a form (like a text input, dropdown, checkbox, etc.)
 * 
 * Business Context:
 * When someone creates a form, they add various fields to collect information.
 * Each field has properties that control how it looks and behaves.
 * 
 * Example: A "Name" field might be:
 * - type: "text" (it's a text input box)
 * - label: "Full Name" (what users see)
 * - required: true (users must fill it out)
 * - placeholder: "Enter your full name" (helpful hint text)
 */
export interface FormField {
  id: string;                    // Unique identifier for this field (like a fingerprint)
  type: string;                  // What kind of field: "text", "email", "select", "checkbox", etc.
  label: string;                 // The text that users see above the field
  required: boolean;             // Whether users must fill out this field or it's optional
  options?: string[];            // For dropdowns/checkboxes: the list of choices available
  defaultValue?: string | boolean | number | string[];  // Pre-filled value when form loads
  placeholder?: string;          // Helpful hint text shown inside empty fields
  description?: string;          // Additional explanation about what this field is for
  validationRegex?: string;      // Pattern that the input must match (like email format)
  errorMessage?: string;         // Custom message shown when validation fails
  weightage?: number;            // How important this field is for scoring (0-100)
  
  /**
   * Scoring Configuration
   * =====================
   * 
   * For forms that need to be scored (like risk assessments), this controls
   * how this field contributes to the overall score.
   * 
   * Business Context:
   * In vendor risk assessments, different questions have different importance.
   * A question about security might be worth more points than one about company size.
   */
  scoring?: {
    enabled: boolean;                      // Whether this field participates in scoring
    maxPoints?: number;                    // Maximum points this field can contribute
    weightMultiplier?: number;             // How much to multiply the score by
    correctAnswers?: string[];             // For multiple choice: which answers are "correct"
    scoringCriteria?: Record<string, number>;  // Custom scoring rules for different answers
    requiresManualReview?: boolean;        // Whether a human needs to review this answer
    riskLevel?: 'low' | 'medium' | 'high' | 'critical';  // Risk category for this field
  };
  
  /**
   * Validation Rules
   * ================
   * 
   * Controls what input is acceptable for this field.
   */
  validation?: {
    message?: string;    // Custom error message to show users
    regex?: string;      // Pattern the input must match
  };
}

/**
 * FormTemplate Interface
 * ======================
 * 
 * Represents a pre-built form template that can be reused to create new forms.
 * 
 * Business Context:
 * Instead of building every form from scratch, users can choose from templates
 * like "Vendor Risk Assessment", "Employee Survey", "Customer Feedback", etc.
 * Templates save time and ensure consistency across similar forms.
 */
export interface FormTemplate {
  id: string;                    // Unique identifier for this template
  name: string;                  // Template name (e.g., "Vendor Risk Assessment")
  description: string;           // What this template is used for
  category: string;              // Template category (e.g., "vendor-risk", "hr", "customer")
  targetAudience?: string[];     // Target audience for this template (vendor, external, internal)
  fields: FormField[];           // All the fields included in this template
  preview?: string;              // Optional preview image or description
  riskCategories?: string[];     // For risk templates: categories of risk covered
  scoringModel?: string;         // How scoring works for this template
}

/**
 * DocumentAttachment Interface
 * ============================
 * 
 * Represents a file that was uploaded with a form submission.
 * 
 * Business Context:
 * Users often need to attach supporting documents to their form submissions,
 * like contracts, certificates, or proof of compliance.
 */
export interface DocumentAttachment {
  id: string;           // Unique identifier for this file
  name: string;         // Original filename (e.g., "contract.pdf")
  type: string;         // File type (e.g., "application/pdf", "image/jpeg")
  size: number;         // File size in bytes
  url: string;          // Where the file is stored (for downloading/viewing)
  uploadedAt: Date;     // When this file was uploaded
}

/**
 * SubmissionScore Interface
 * =========================
 * 
 * Represents the calculated score for a form submission.
 * 
 * Business Context:
 * For forms that require evaluation (like risk assessments), this tracks
 * the scoring results and risk classification.
 */
export interface SubmissionScore {
  total: number;                         // Total points earned
  maxTotal: number;                      // Maximum possible points
  percentage: number;                    // Score as a percentage (0-100)
  riskLevel: 'low' | 'medium' | 'high' | 'critical';  // Overall risk classification
  riskScore?: number;                    // Calculated risk score
  reviewedBy: string;                    // Who reviewed and scored this submission
  reviewedAt: Date;                      // When the scoring was completed
  reviewComments: string;                // Comments from the reviewer
  categoryScores?: Record<string, number>;  // Scores by category (security, financial, etc.)
  breakdown?: Record<string, number>;    // Detailed scoring breakdown by field
}

/**
 * EmailRecipient Interface
 * ========================
 * 
 * Represents someone who was invited to fill out a form via email.
 * 
 * Business Context:
 * When distributing forms via email, we need to track who was invited,
 * whether they've started/completed the form, and how many reminders were sent.
 */
export interface EmailRecipient {
  id: string;                    // Unique identifier for this recipient
  email: string;                 // Email address where invitation was sent
  name?: string;                 // Optional name of the recipient
  status: 'pending' | 'sent' | 'opened' | 'completed' | 'expired';  // Current status
  remindersSent: number;         // How many reminder emails have been sent
  sentAt?: Date;                 // When the invitation was first sent
  completedAt?: Date;            // When they completed the form (if they did)
  lastReminderAt?: Date;         // When the last reminder was sent
}

/**
 * FormSettings Interface
 * ======================
 * 
 * Configuration options that control how a form behaves and appears.
 * 
 * Business Context:
 * Different forms have different requirements. Some need user authentication,
 * others allow multiple submissions, some expire after a certain date, etc.
 * These settings control all those behaviors.
 */
export interface FormSettings {
  allowMultipleSubmissions: boolean;     // Can the same person submit multiple times?
  requireLogin: boolean;                 // Must users be logged in to access this form?
  showProgressBar: boolean;              // Show completion progress to users?
  theme: 'light' | 'dark' | 'custom';    // Visual appearance of the form
  customCss?: string;                    // Custom styling code for advanced users
  
  /**
   * Scoring Configuration
   * =====================
   * 
   * Controls how the entire form is scored and what risk thresholds to use.
   * 
   * Business Context:
   * For risk assessments, we need to define what scores indicate different
   * risk levels and whether users should see their scores.
   */
  scoring?: {
    enabled: boolean;              // Whether this form uses scoring at all
    maxTotalPoints: number;        // Maximum possible total score
    showScoreToUser: boolean;      // Whether to show the score to people who submit
    passingScore: number;          // Minimum score needed to "pass"
    riskThresholds: {              // Score ranges that define risk levels
      low: number;                 // Scores above this are low risk
      medium: number;              // Scores above this are medium risk
      high: number;                // Scores above this are high risk
    };                             // Scores below high threshold are critical risk
  };
  
  /**
   * Form Expiration Settings
   * ========================
   * 
   * Controls when and how forms become unavailable.
   */
  expiration?: {
    enabled: boolean;              // Whether this form expires
    expirationDate?: Date;         // When the form becomes unavailable
    message?: string;              // Message to show when form is expired
  };
  
  /**
   * Email Distribution Settings
   * ===========================
   * 
   * Controls how forms are distributed via email invitations.
   */
  emailDistribution?: {
    enabled: boolean;              // Whether email distribution is active
    recipients: EmailRecipient[];  // List of people to invite
    reminderEnabled: boolean;      // Whether to send reminder emails
    reminderIntervalDays: number;  // How many days between reminders
    maxReminders: number;          // Maximum number of reminders to send
  };
  
  /**
   * Approval Workflow Settings
   * ===========================
   * 
   * Controls whether submissions need approval and who can approve them.
   */
  approval?: {
    enabled: boolean;              // Whether approval workflow is active
    requireApproval: boolean;      // Whether all submissions need approval
    approvers: string[];           // List of people who can approve submissions
    autoApproveScore?: number;     // Score above which submissions auto-approve
  };
  
  /**
   * Document Attachment Settings
   * ============================
   * 
   * Controls what files users can attach to their submissions.
   */
  documents?: {
    enabled: boolean;              // Whether file attachments are allowed
    allowedTypes: string[];        // File types that are permitted (pdf, jpg, etc.)
    maxSize: number;               // Maximum file size in MB
    requiredDocuments: string[];   // Documents that users must attach
    allowUserUploads: boolean;     // Whether users can upload their own files
  };
}

/**
 * Form Interface
 * ==============
 * 
 * Represents a complete form with all its configuration and metadata.
 * 
 * Business Context:
 * This is the main data structure that represents a form in our system.
 * It includes everything: the form fields, settings, creation info, and analytics.
 */
export interface Form {
  id: string;                    // Unique identifier for this form
  title: string;                 // Form title (what users see at the top)
  description: string;           // Explanation of what this form is for
  fields: FormField[];           // All the input fields in this form
  settings: FormSettings;        // Configuration options for this form
  createdAt: Date;              // When this form was first created
  updatedAt: Date;              // When this form was last modified
  status: 'draft' | 'published'; // Whether the form is still being built or ready for use
  submissions: number;           // How many times this form has been submitted
  
  /**
   * Analytics Data
   * ==============
   * 
   * Tracks usage and performance metrics for this form.
   * 
   * Business Context:
   * Form owners need to know how their forms are performing:
   * - Are people actually filling them out?
   * - How many people start but don't finish?
   * - How effective are email invitations?
   */
  analytics: {
    views: number;                     // How many times the form was viewed
    submissions: number;               // How many completed submissions
    completionRate: number;            // Percentage who complete after starting
    emailsSent: number;                // How many email invitations were sent
    emailsCompleted: number;           // How many email recipients completed the form
    averageCompletionTime: number;     // Average time to complete (in minutes)
    dropoffRate: number;               // Percentage who start but don't finish
  };
}

/**
 * ReviewActivity Interface
 * ========================
 * 
 * Represents an action taken during the review process of a submission.
 * 
 * Business Context:
 * When someone submits a form, it often goes through a review process.
 * This tracks every action taken: approvals, rejections, requests for more info, etc.
 * This creates an audit trail of what happened and when.
 */
export interface ReviewActivity {
  id: string;                    // Unique identifier for this activity
  action: 'approved' | 'rejected' | 'under_review' | 'resent' | 'reminder_sent' | 'info_requested';
  comments: string;              // Reviewer's notes about this action
  reviewedBy: string;            // Who performed this action
  reviewedAt: Date;              // When this action was taken
  
  /**
   * Additional Action Metadata
   * ==========================
   * 
   * Extra information that might be relevant for specific types of actions.
   */
  metadata?: {
    reason?: string;                    // Why was this action taken?
    urgency?: 'low' | 'medium' | 'high'; // How urgent is this?
    followUpDate?: Date;                // When to follow up on this
    requiredDocuments?: string[];       // What documents are needed?
    specificFields?: string[];          // Which form fields need attention?
    rejectionReason?: string;           // Specific reason for rejection
    infoRequestType?: string;           // What kind of additional info is needed?
    customInstructions?: string;        // Special instructions for the submitter
    approvalType?: 'fully' | 'partially';  // Type of approval for approved submissions
  };
}

/**
 * FormSubmission Interface
 * ========================
 * 
 * Represents a completed form submission with all associated data.
 * 
 * Business Context:
 * When someone fills out and submits a form, this data structure holds
 * everything: their answers, who they are, the current review status, etc.
 */
export interface FormSubmission {
  id: string;                           // Unique identifier for this submission
  formId: string;                       // Which form this is a submission for
  responses: Record<string, any>;       // The actual answers to form questions
  submittedAt: Date;                    // When this was submitted
  submittedBy: string;                  // Who submitted this form
  status: 'submitted' | 'under_review' | 'approved' | 'rejected';  // Current review status
  approvalType?: 'fully' | 'partially';          // Type of approval granted
  score?: SubmissionScore;              // Calculated score (if form uses scoring)
  activityLog: ReviewActivity[];        // History of all review actions taken
  
  // Submitter Information
  // =====================
  // Details about the person who submitted the form
  submitterEmail: string;               // Email address of submitter
  submitterName: string;                // Full name of submitter
  companyName?: string;                 // Company they represent (optional)
  recipientId?: string;                 // If they were invited via email, this links to that invitation
  
  // Form Classification
  // ===================
  submissionType: 'vendor' | 'internal' | 'external';  // Whether this is from a vendor, internal user, or external user
  
  // Performance Tracking
  // ====================
  completionPercentage?: number;        // How much of the form was completed
  timeSpent?: number;                   // How long it took to complete (in minutes)
  
  // File Attachments
  // ================
  attachments?: DocumentAttachment[];   // Any files that were uploaded with this submission
}
