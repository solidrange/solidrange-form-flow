import { Tour, HelpTip, UserRole, LayoutMode } from '@/types/tour';

// Route mappings for each tab
export const routeMap: Record<string, string> = {
  'dashboard': 'dashboard',
  'review-submissions': 'review-submissions',
  'forms': 'forms',
  'build-form': 'build-form',
  'global-settings': 'global-settings',
  'resources': 'resources'
};

// Complete tour for full application walkthrough
export const tours: Tour[] = [
  {
    id: 'welcome-tour',
    name: 'Welcome to SolidForm',
    description: 'A quick introduction to the application and its main features.',
    roles: ['admin', 'user'],
    category: 'complete',
    steps: [
      // Desktop steps - sidebar navigation
      {
        id: 'welcome-1-desktop',
        targetSelector: '[data-tour-id="brand-logo"]',
        title: 'Welcome to SolidForm',
        content: 'This is your enterprise assessment platform by SolidRange. Let\'s take a quick tour of the main features.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin', 'user'],
        layout: 'desktop',
        order: 1
      },
      {
        id: 'welcome-2-desktop',
        targetSelector: '[data-tour-id="nav-dashboard"]',
        title: 'Dashboard',
        content: 'Your command center! Click here to view analytics, submission statistics, and performance metrics.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin', 'user'],
        layout: 'desktop',
        order: 2
      },
      {
        id: 'welcome-3-desktop',
        targetSelector: '[data-tour-id="nav-review"]',
        title: 'Review Submissions',
        content: 'Review and manage form submissions. Filter by status, risk level, and take approval actions.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin', 'user'],
        layout: 'desktop',
        order: 3
      },
      {
        id: 'welcome-4-desktop',
        targetSelector: '[data-tour-id="nav-forms"]',
        title: 'Forms Library',
        content: 'Access all your forms - drafts, published, and templates. Organize and manage your form collection.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin', 'user'],
        layout: 'desktop',
        order: 4
      },
      {
        id: 'welcome-5-desktop',
        targetSelector: '[data-tour-id="nav-build"]',
        title: 'Form Builder',
        content: 'Create and customize forms with our drag-and-drop builder. Add fields, logic, and styling.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin', 'user'],
        layout: 'desktop',
        order: 5
      },
      {
        id: 'welcome-6-desktop',
        targetSelector: '[data-tour-id="nav-settings"]',
        title: 'Global Settings',
        content: 'Configure language, branding, and developer options for your SolidForm instance.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin'],
        layout: 'desktop',
        order: 6
      },
      {
        id: 'welcome-7-desktop',
        targetSelector: '[data-tour-id="nav-help"]',
        title: 'Help & Support',
        content: 'Access guided tours, quick tips, and help resources anytime from here.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin', 'user'],
        layout: 'desktop',
        order: 7
      },
      // Mobile steps - bottom navigation
      {
        id: 'welcome-1-mobile',
        targetSelector: '[data-tour-id="mobile-brand-logo"]',
        title: 'Welcome to SolidForm',
        content: 'This is your enterprise assessment platform by SolidRange. Let\'s explore the mobile interface.',
        route: 'dashboard',
        position: 'bottom',
        roles: ['admin', 'user'],
        layout: 'mobile',
        order: 1
      },
      {
        id: 'welcome-2-mobile',
        targetSelector: '[data-tour-id="mobile-nav-dashboard"]',
        title: 'Dashboard',
        content: 'Tap here to view your analytics and submission statistics.',
        route: 'dashboard',
        position: 'top',
        roles: ['admin', 'user'],
        layout: 'mobile',
        order: 2
      },
      {
        id: 'welcome-3-mobile',
        targetSelector: '[data-tour-id="mobile-nav-review"]',
        title: 'Review Submissions',
        content: 'Tap here to review and manage form submissions on the go.',
        route: 'dashboard',
        position: 'top',
        roles: ['admin', 'user'],
        layout: 'mobile',
        order: 3
      },
      {
        id: 'welcome-4-mobile',
        targetSelector: '[data-tour-id="mobile-nav-forms"]',
        title: 'Forms Library',
        content: 'Access all your forms - drafts, published, and templates.',
        route: 'dashboard',
        position: 'top',
        roles: ['admin', 'user'],
        layout: 'mobile',
        order: 4
      },
      {
        id: 'welcome-5-mobile',
        targetSelector: '[data-tour-id="mobile-nav-build"]',
        title: 'Form Builder',
        content: 'Tap here to create and customize assessment forms.',
        route: 'dashboard',
        position: 'top',
        roles: ['admin', 'user'],
        layout: 'mobile',
        order: 5
      },
      {
        id: 'welcome-6-mobile',
        targetSelector: '[data-tour-id="mobile-nav-more"]',
        title: 'More Options',
        content: 'Tap here to access Settings, Resources, and Help.',
        route: 'dashboard',
        position: 'top',
        roles: ['admin', 'user'],
        layout: 'mobile',
        order: 6
      },
      {
        id: 'welcome-7-mobile',
        targetSelector: '[data-tour-id="mobile-menu-button"]',
        title: 'Navigation Menu',
        content: 'Tap the menu icon to open the full navigation drawer for quick access to all sections.',
        route: 'dashboard',
        position: 'bottom',
        roles: ['admin', 'user'],
        layout: 'mobile',
        order: 7
      }
    ]
  },
  {
    id: 'dashboard-tour',
    name: 'Dashboard Overview',
    description: 'Learn how to use the analytics dashboard effectively.',
    roles: ['admin', 'user'],
    category: 'navigation',
    steps: [
      {
        id: 'dash-1',
        targetSelector: '[data-tour-id="dashboard-stats"]',
        title: 'Key Statistics',
        content: 'See your key metrics at a glance - total submissions, approval rates, and risk levels. Click any card to filter submissions.',
        route: 'dashboard',
        position: 'bottom',
        roles: ['admin', 'user'],
        layout: 'both',
        order: 1
      },
      {
        id: 'dash-2',
        targetSelector: '[data-tour-id="dashboard-charts"]',
        title: 'Analytics Charts',
        content: 'Visual insights into your form performance. Use the tabs to explore different views: Overview, Approvals, Risk Analysis, and Trends.',
        route: 'dashboard',
        position: 'top',
        roles: ['admin', 'user'],
        layout: 'both',
        order: 2
      }
    ]
  },
  {
    id: 'form-builder-tour',
    name: 'Form Builder',
    description: 'Learn how to create and customize assessment forms.',
    roles: ['admin', 'user'],
    category: 'forms',
    steps: [
      // Desktop steps
      {
        id: 'builder-1-desktop',
        targetSelector: '[data-tour-id="field-palette"]',
        title: 'Field Palette',
        content: 'Choose from various field types: text, numbers, dropdowns, checkboxes, ratings, and more. Click a field to add it to your form.',
        route: 'build-form',
        position: 'right',
        roles: ['admin', 'user'],
        layout: 'desktop',
        order: 1
      },
      {
        id: 'builder-2',
        targetSelector: '[data-tour-id="form-title"]',
        title: 'Form Title & Description',
        content: 'Give your form a clear, descriptive title. Add a description to help respondents understand the purpose.',
        route: 'build-form',
        position: 'bottom',
        roles: ['admin', 'user'],
        layout: 'both',
        order: 2
      },
      {
        id: 'builder-3',
        targetSelector: '[data-tour-id="form-canvas"]',
        title: 'Form Canvas',
        content: 'This is where your form takes shape. Fields appear here as you add them. Click any field to edit its properties.',
        route: 'build-form',
        position: 'left',
        roles: ['admin', 'user'],
        layout: 'both',
        order: 3
      },
      {
        id: 'builder-4',
        targetSelector: '[data-tour-id="save-form"]',
        title: 'Save Your Work',
        content: 'Save your form as a draft or template. You can also save it to the form library for reuse.',
        route: 'build-form',
        position: 'bottom',
        roles: ['admin', 'user'],
        layout: 'both',
        order: 4
      },
      // Mobile-specific step for add field button
      {
        id: 'builder-1-mobile',
        targetSelector: '[data-tour-id="mobile-add-field"]',
        title: 'Add Fields',
        content: 'Tap this button to open the field palette and add fields to your form.',
        route: 'build-form',
        position: 'top',
        roles: ['admin', 'user'],
        layout: 'mobile',
        order: 1
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
        title: 'Filter & Search',
        content: 'Use the search bar and filters to find specific submissions. Filter by status, risk level, audience, or approval type.',
        route: 'review-submissions',
        position: 'bottom',
        roles: ['admin', 'user'],
        layout: 'both',
        order: 1
      },
      {
        id: 'sub-2',
        targetSelector: '[data-tour-id="submission-list"]',
        title: 'Submission List',
        content: 'Browse all submissions here. Each card shows key details like company, status, score, and risk level. Click to view full details.',
        route: 'review-submissions',
        position: 'right',
        roles: ['admin', 'user'],
        layout: 'both',
        order: 2
      },
      {
        id: 'sub-3-desktop',
        targetSelector: '[data-tour-id="submission-actions"]',
        title: 'Review & Take Action',
        content: 'View complete submission details and take actions: approve, reject, request changes, or export to PDF/Excel.',
        route: 'review-submissions',
        position: 'left',
        roles: ['admin'],
        layout: 'desktop',
        order: 3
      },
      {
        id: 'sub-3-mobile',
        targetSelector: '[data-tour-id="submission-actions"]',
        title: 'Review & Take Action',
        content: 'Tap any submission card to view details. Use the action buttons to approve, reject, or export.',
        route: 'review-submissions',
        position: 'top',
        roles: ['admin'],
        layout: 'mobile',
        order: 3
      }
    ]
  },
  {
    id: 'settings-tour',
    name: 'Settings & Configuration',
    description: 'Learn how to configure global settings and branding.',
    roles: ['admin'],
    category: 'settings',
    steps: [
      {
        id: 'set-1',
        targetSelector: '[data-tour-id="language-settings"]',
        title: 'Language Settings',
        content: 'Change the application language between English and Arabic. Selecting Arabic enables right-to-left (RTL) layout.',
        route: 'global-settings',
        position: 'right',
        roles: ['admin'],
        layout: 'both',
        order: 1
      },
      {
        id: 'set-2',
        targetSelector: '[data-tour-id="brand-settings"]',
        title: 'Brand Identity',
        content: 'Customize your organization\'s branding: product name, tagline, and color scheme. Changes apply across the entire application.',
        route: 'global-settings',
        position: 'right',
        roles: ['admin'],
        layout: 'both',
        order: 2
      },
      {
        id: 'set-3',
        targetSelector: '[data-tour-id="developer-settings"]',
        title: 'Developer Settings',
        content: 'Toggle visibility of development resources and technical documentation. Enable this to access the Resources section.',
        route: 'global-settings',
        position: 'right',
        roles: ['admin'],
        layout: 'both',
        order: 3
      }
    ]
  },
  {
    id: 'forms-library-tour',
    name: 'Forms Library',
    description: 'Learn how to manage your forms collection.',
    roles: ['admin', 'user'],
    category: 'forms',
    steps: [
      {
        id: 'lib-1',
        targetSelector: '[data-tour-id="forms-tabs"]',
        title: 'Forms Organization',
        content: 'Your forms are organized into three sections: Templates (reusable starting points), Drafts (work in progress), and Published (active forms).',
        route: 'forms',
        position: 'bottom',
        roles: ['admin', 'user'],
        layout: 'both',
        order: 1
      },
      {
        id: 'lib-2',
        targetSelector: '[data-tour-id="forms-list"]',
        title: 'Form Cards',
        content: 'Each card shows the form name, description, category, and status. Tap to select a form for editing or viewing.',
        route: 'forms',
        position: 'right',
        roles: ['admin', 'user'],
        layout: 'both',
        order: 2
      },
      {
        id: 'lib-3-desktop',
        targetSelector: '[data-tour-id="forms-actions"]',
        title: 'Form Actions',
        content: 'Use the actions menu to edit, duplicate, publish, or delete forms. Published forms can be moved back to drafts for editing.',
        route: 'forms',
        position: 'left',
        roles: ['admin'],
        layout: 'desktop',
        order: 3
      },
      {
        id: 'lib-3-mobile',
        targetSelector: '[data-tour-id="forms-actions"]',
        title: 'Form Actions',
        content: 'Tap the action button on any form card to edit, duplicate, publish, or delete it.',
        route: 'forms',
        position: 'top',
        roles: ['admin'],
        layout: 'mobile',
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
    title: 'Drag & Drop Fields',
    content: 'Click on any field type in the palette to add it to your form canvas.',
    category: 'forms',
    roles: ['admin', 'user']
  },
  {
    id: 'tip-3',
    title: 'Field Properties',
    content: 'Click any field on the canvas to open the editor panel and customize its properties.',
    category: 'forms',
    roles: ['admin', 'user']
  },
  {
    id: 'tip-4',
    title: 'Save as Template',
    content: 'After building a form, save it as a template to reuse the structure for future assessments.',
    category: 'forms',
    roles: ['admin', 'user']
  },
  {
    id: 'tip-5',
    title: 'Form Scoring',
    content: 'Enable scoring in form settings to automatically calculate risk levels based on responses.',
    category: 'advanced',
    roles: ['admin']
  },
  {
    id: 'tip-6',
    title: 'Email Distribution',
    content: 'Set up email distribution to automatically send assessment forms to recipients with reminders.',
    category: 'advanced',
    roles: ['admin']
  },
  {
    id: 'tip-7',
    title: 'Dashboard Filters',
    content: 'Click any statistic card on the dashboard to filter submissions by that criteria.',
    category: 'submissions',
    roles: ['admin', 'user']
  },
  {
    id: 'tip-8',
    title: 'Export Data',
    content: 'Export submissions to Excel or PDF for offline analysis and reporting.',
    category: 'reports',
    roles: ['admin', 'user']
  },
  {
    id: 'tip-9',
    title: 'Risk Levels',
    content: 'Submissions are automatically categorized by risk: Low (green), Medium (amber), High (orange), Critical (red).',
    category: 'submissions',
    roles: ['admin', 'user']
  },
  {
    id: 'tip-10',
    title: 'Developer Resources',
    content: 'Enable "Show Development Resources" in Settings to access technical documentation.',
    category: 'advanced',
    roles: ['admin']
  }
];

// Get tours available for a specific role
export const getToursForRole = (role: UserRole): Tour[] => {
  return tours.filter(tour => tour.roles.includes(role));
};

// Get steps for a tour filtered by role only (legacy support)
export const getStepsForRole = (tour: Tour, role: UserRole): Tour['steps'] => {
  return tour.steps.filter(step => step.roles.includes(role)).sort((a, b) => a.order - b.order);
};

// Get steps for a tour filtered by role AND layout
export const getStepsForRoleAndLayout = (tour: Tour, role: UserRole, layout: 'desktop' | 'mobile'): Tour['steps'] => {
  return tour.steps
    .filter(step => step.roles.includes(role) && (step.layout === layout || step.layout === 'both'))
    .sort((a, b) => a.order - b.order);
};

// Get tips for a specific role
export const getTipsForRole = (role: UserRole): HelpTip[] => {
  return helpTips.filter(tip => tip.roles.includes(role));
};

// Get the required route for a step
export const getStepRoute = (step: Tour['steps'][0]): string | undefined => {
  return step.route;
};
