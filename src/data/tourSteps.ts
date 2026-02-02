import { Tour, HelpTip, UserRole } from '@/types/tour';

// Complete tour for full application walkthrough
export const tours: Tour[] = [
  {
    id: 'welcome-tour',
    name: 'Welcome to SolidForm',
    description: 'A quick introduction to the application and its main features.',
    roles: ['admin', 'user'],
    category: 'complete',
    steps: [
      {
        id: 'welcome-1',
        targetSelector: '[data-tour-id="brand-logo"]',
        title: 'Welcome to SolidForm',
        content: 'This is your form management platform. Let\'s take a quick tour of the main features.',
        position: 'right',
        roles: ['admin', 'user'],
        order: 1
      },
      {
        id: 'welcome-2',
        targetSelector: '[data-tour-id="nav-dashboard"]',
        title: 'Dashboard',
        content: 'Your command center! View analytics, recent activity, and quick access to your forms.',
        position: 'right',
        roles: ['admin', 'user'],
        order: 2
      },
      {
        id: 'welcome-3',
        targetSelector: '[data-tour-id="nav-review"]',
        title: 'Review Submissions',
        content: 'Review and manage form submissions. Filter, search, and take action on responses.',
        position: 'right',
        roles: ['admin', 'user'],
        order: 3
      },
      {
        id: 'welcome-4',
        targetSelector: '[data-tour-id="nav-forms"]',
        title: 'Forms Library',
        content: 'Access all your forms - drafts, published, and templates. Organize and manage your form collection.',
        position: 'right',
        roles: ['admin', 'user'],
        order: 4
      },
      {
        id: 'welcome-5',
        targetSelector: '[data-tour-id="nav-build"]',
        title: 'Form Builder',
        content: 'Create and customize forms with our drag-and-drop builder. Add fields, logic, and styling.',
        position: 'right',
        roles: ['admin', 'user'],
        order: 5
      },
      {
        id: 'welcome-6',
        targetSelector: '[data-tour-id="nav-settings"]',
        title: 'Settings',
        content: 'Configure global settings, branding, language preferences, and more.',
        position: 'right',
        roles: ['admin'],
        order: 6
      },
      {
        id: 'welcome-7',
        targetSelector: '[data-tour-id="nav-help"]',
        title: 'Help & Support',
        content: 'Access help resources, quick tips, and guided tours anytime from here.',
        position: 'right',
        roles: ['admin', 'user'],
        order: 7
      }
    ]
  },
  {
    id: 'dashboard-tour',
    name: 'Dashboard Overview',
    description: 'Learn how to use the dashboard effectively.',
    roles: ['admin', 'user'],
    category: 'navigation',
    steps: [
      {
        id: 'dash-1',
        targetSelector: '[data-tour-id="dashboard-stats"]',
        title: 'Quick Statistics',
        content: 'See your key metrics at a glance - total forms, submissions, and completion rates.',
        position: 'bottom',
        roles: ['admin', 'user'],
        order: 1
      },
      {
        id: 'dash-2',
        targetSelector: '[data-tour-id="dashboard-recent"]',
        title: 'Recent Activity',
        content: 'Track recent form submissions and actions in real-time.',
        position: 'top',
        roles: ['admin', 'user'],
        order: 2
      },
      {
        id: 'dash-3',
        targetSelector: '[data-tour-id="dashboard-charts"]',
        title: 'Analytics Charts',
        content: 'Visual insights into your form performance and submission trends.',
        position: 'top',
        roles: ['admin'],
        order: 3
      }
    ]
  },
  {
    id: 'form-builder-tour',
    name: 'Form Builder',
    description: 'Learn how to create and customize forms.',
    roles: ['admin', 'user'],
    category: 'forms',
    steps: [
      {
        id: 'builder-1',
        targetSelector: '[data-tour-id="field-palette"]',
        title: 'Field Palette',
        content: 'Drag fields from here to add them to your form. Choose from text, numbers, dropdowns, and more.',
        position: 'right',
        roles: ['admin', 'user'],
        order: 1
      },
      {
        id: 'builder-2',
        targetSelector: '[data-tour-id="form-canvas"]',
        title: 'Form Canvas',
        content: 'This is where your form takes shape. Drag, drop, and reorder fields to build your form.',
        position: 'left',
        roles: ['admin', 'user'],
        order: 2
      },
      {
        id: 'builder-3',
        targetSelector: '[data-tour-id="form-title"]',
        title: 'Form Title',
        content: 'Give your form a clear, descriptive title that users will see.',
        position: 'bottom',
        roles: ['admin', 'user'],
        order: 3
      },
      {
        id: 'builder-4',
        targetSelector: '[data-tour-id="save-form"]',
        title: 'Save Your Work',
        content: 'Save your form as a draft or template. Don\'t lose your progress!',
        position: 'bottom',
        roles: ['admin', 'user'],
        order: 4
      },
      {
        id: 'builder-5',
        targetSelector: '[data-tour-id="preview-form"]',
        title: 'Preview Form',
        content: 'See how your form will look to users before publishing.',
        position: 'bottom',
        roles: ['admin', 'user'],
        order: 5
      },
      {
        id: 'builder-6',
        targetSelector: '[data-tour-id="form-settings-tab"]',
        title: 'Form Settings',
        content: 'Configure advanced options like scoring, approvals, and email distribution.',
        position: 'bottom',
        roles: ['admin'],
        order: 6
      }
    ]
  },
  {
    id: 'submissions-tour',
    name: 'Submission Review',
    description: 'Learn how to review and manage form submissions.',
    roles: ['admin', 'user'],
    category: 'submissions',
    steps: [
      {
        id: 'sub-1',
        targetSelector: '[data-tour-id="submission-filters"]',
        title: 'Filter Submissions',
        content: 'Narrow down submissions by status, risk level, audience, or approval type.',
        position: 'bottom',
        roles: ['admin', 'user'],
        order: 1
      },
      {
        id: 'sub-2',
        targetSelector: '[data-tour-id="submission-list"]',
        title: 'Submission List',
        content: 'Browse all submissions. Click on any submission to view details.',
        position: 'right',
        roles: ['admin', 'user'],
        order: 2
      },
      {
        id: 'sub-3',
        targetSelector: '[data-tour-id="submission-actions"]',
        title: 'Take Action',
        content: 'Approve, reject, or request changes on submissions that need review.',
        position: 'left',
        roles: ['admin'],
        order: 3
      }
    ]
  },
  {
    id: 'reports-tour',
    name: 'Reports & Analytics',
    description: 'Learn how to generate and customize reports.',
    roles: ['admin'],
    category: 'reports',
    steps: [
      {
        id: 'rep-1',
        targetSelector: '[data-tour-id="report-type"]',
        title: 'Report Type',
        content: 'Choose from summary, detailed, or comparison reports.',
        position: 'right',
        roles: ['admin'],
        order: 1
      },
      {
        id: 'rep-2',
        targetSelector: '[data-tour-id="report-filters"]',
        title: 'Report Filters',
        content: 'Filter your report by date range, form, or submission status.',
        position: 'right',
        roles: ['admin'],
        order: 2
      },
      {
        id: 'rep-3',
        targetSelector: '[data-tour-id="report-export"]',
        title: 'Export Report',
        content: 'Download your report as PDF or Excel for sharing and offline access.',
        position: 'left',
        roles: ['admin'],
        order: 3
      }
    ]
  },
  {
    id: 'settings-tour',
    name: 'Settings & Configuration',
    description: 'Learn how to configure global settings.',
    roles: ['admin'],
    category: 'settings',
    steps: [
      {
        id: 'set-1',
        targetSelector: '[data-tour-id="language-settings"]',
        title: 'Language Settings',
        content: 'Change the application language and enable RTL support.',
        position: 'right',
        roles: ['admin'],
        order: 1
      },
      {
        id: 'set-2',
        targetSelector: '[data-tour-id="brand-settings"]',
        title: 'Brand Identity',
        content: 'Customize colors, logos, and branding to match your organization.',
        position: 'right',
        roles: ['admin'],
        order: 2
      },
      {
        id: 'set-3',
        targetSelector: '[data-tour-id="developer-settings"]',
        title: 'Developer Settings',
        content: 'Access advanced options and development resources.',
        position: 'right',
        roles: ['admin'],
        order: 3
      }
    ]
  }
];

// Quick tips for the help panel
export const helpTips: HelpTip[] = [
  {
    id: 'tip-1',
    title: 'Keyboard Shortcuts',
    content: 'Press Ctrl+S to quickly save your form. Press Esc to close dialogs.',
    category: 'productivity',
    roles: ['admin', 'user']
  },
  {
    id: 'tip-2',
    title: 'Drag & Drop',
    content: 'You can drag fields from the palette directly onto your form canvas.',
    category: 'forms',
    roles: ['admin', 'user']
  },
  {
    id: 'tip-3',
    title: 'Field Reordering',
    content: 'Drag fields up or down on the canvas to reorder them.',
    category: 'forms',
    roles: ['admin', 'user']
  },
  {
    id: 'tip-4',
    title: 'Save as Template',
    content: 'After building a form, save it as a template to reuse later.',
    category: 'forms',
    roles: ['admin', 'user']
  },
  {
    id: 'tip-5',
    title: 'Form Scoring',
    content: 'Enable scoring in form settings to calculate risk levels and scores automatically.',
    category: 'advanced',
    roles: ['admin']
  },
  {
    id: 'tip-6',
    title: 'Email Distribution',
    content: 'Set up email distribution to automatically send forms to recipients.',
    category: 'advanced',
    roles: ['admin']
  },
  {
    id: 'tip-7',
    title: 'Bulk Actions',
    content: 'Select multiple submissions to approve or reject them at once.',
    category: 'submissions',
    roles: ['admin']
  },
  {
    id: 'tip-8',
    title: 'Export Data',
    content: 'Export submissions and reports to Excel or PDF for offline analysis.',
    category: 'reports',
    roles: ['admin', 'user']
  }
];

// Get tours available for a specific role
export const getToursForRole = (role: UserRole): Tour[] => {
  return tours.filter(tour => tour.roles.includes(role));
};

// Get steps for a tour filtered by role
export const getStepsForRole = (tour: Tour, role: UserRole): Tour['steps'] => {
  return tour.steps.filter(step => step.roles.includes(role)).sort((a, b) => a.order - b.order);
};

// Get tips for a specific role
export const getTipsForRole = (role: UserRole): HelpTip[] => {
  return helpTips.filter(tip => tip.roles.includes(role));
};
