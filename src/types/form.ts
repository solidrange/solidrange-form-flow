
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
    weightMultiplier?: number; // 1x, 2x, 3x, 4x, 5x
    maxPoints?: number;
  };
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
    };
    expiration?: {
      enabled: boolean;
      expirationDate?: Date;
      message?: string;
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
  };
}

export interface FormTemplate {
  id: string;
  name: string;
  description: string;
  category: 'survey' | 'assessment' | 'registration' | 'feedback' | 'compliance' | 'risk';
  fields: Omit<FormField, 'id'>[];
  preview: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  responses: Record<string, any>;
  score?: {
    total: number;
    maxTotal: number;
    percentage: number;
    passed: boolean;
    manualReviewRequired: boolean;
    reviewedBy?: string;
    reviewedAt?: Date;
  };
  submittedAt: Date;
  status: 'submitted' | 'under_review' | 'reviewed' | 'approved' | 'rejected';
}
