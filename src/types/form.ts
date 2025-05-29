
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
