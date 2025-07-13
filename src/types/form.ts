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
    | 'file';
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
  status: 'pending' | 'sent' | 'failed';
  remindersSent: number;
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
}
