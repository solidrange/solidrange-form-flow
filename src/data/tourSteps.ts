import { Tour, HelpTip, UserRole, LayoutMode } from '@/types/tour';

// Route mappings for each tab
export const routeMap: Record<string, string> = {
  'dashboard': 'dashboard',
  'forms': 'forms',
  'reports': 'reports',
  'global-settings': 'global-settings',
  'resources': 'resources'
};

export const tours: Tour[] = [
  {
    id: 'welcome-tour',
    name: 'Welcome to SolidForm',
    description: 'A quick introduction to the application and its main features.',
    roles: ['admin', 'user'],
    category: 'complete',
    steps: [
      // Admin Desktop steps
      {
        id: 'welcome-1-desktop-admin',
        targetSelector: '[data-tour-id="brand-logo"]',
        title: 'Welcome to SolidForm',
        content: 'This is your enterprise assessment platform by SolidRange. Let\'s take a quick tour of the main features.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin'],
        layout: 'desktop',
        order: 1
      },
      {
        id: 'welcome-2-desktop-admin',
        targetSelector: '[data-tour-id="nav-dashboard"]',
        title: 'Dashboard',
        content: 'Your command center! View analytics, submission statistics, and performance metrics across all forms.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin'],
        layout: 'desktop',
        order: 2
      },
      {
        id: 'welcome-3-desktop-admin',
        targetSelector: '[data-tour-id="nav-forms"]',
        title: 'Forms',
        content: 'Access all your forms - drafts, published, and templates. Create new forms, distribute them, and view submissions.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin'],
        layout: 'desktop',
        order: 3
      },
      {
        id: 'welcome-4-desktop-admin',
        targetSelector: '[data-tour-id="nav-reports"]',
        title: 'Reports',
        content: 'Generate and customize reports from all form submissions. Create custom reports, export data, and visualize trends.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin'],
        layout: 'desktop',
        order: 4
      },
      {
        id: 'welcome-5-desktop-admin',
        targetSelector: '[data-tour-id="nav-settings"]',
        title: 'Global Settings',
        content: 'Configure language, branding, and developer options for your SolidForm instance.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin'],
        layout: 'desktop',
        order: 5
      },
      {
        id: 'welcome-6-desktop-admin',
        targetSelector: '[data-tour-id="nav-help"]',
        title: 'Help & Support',
        content: 'Access guided tours, quick tips, and help resources anytime from here.',
        route: 'dashboard',
        position: 'right',
        roles: ['admin'],
        layout: 'desktop',
        order: 6
      },
      // User Desktop steps - only assigned forms and help
      {
        id: 'welcome-1-desktop-user',
        targetSelector: '[data-tour-id="brand-logo"]',
        title: 'Welcome to SolidForm',
        content: 'Welcome! SolidForm is where you\'ll find and complete forms assigned to you. Let\'s take a quick look.',
        route: 'forms',
        position: 'right',
        roles: ['user'],
        layout: 'desktop',
        order: 1
      },
      {
        id: 'welcome-2-desktop-user',
        targetSelector: '[data-tour-id="nav-forms"]',
        title: 'Assigned Forms',
        content: 'This is your main area. Navigate here to see all forms assigned to you. Click the "Assigned" tab to find forms waiting for your response.',
        route: 'forms',
        position: 'right',
        roles: ['user'],
        layout: 'desktop',
        order: 2
      },
      {
        id: 'welcome-3-desktop-user',
        targetSelector: '[data-tour-id="assigned-forms"]',
        title: 'Fill Your Assigned Forms',
        content: 'Your assigned forms appear here. Each card shows the form name, description, and number of fields. Click "Fill Form" to start completing an assessment.',
        route: 'forms',
        position: 'bottom',
        roles: ['user'],
        layout: 'desktop',
        order: 3
      },
      {
        id: 'welcome-4-desktop-user',
        targetSelector: '[data-tour-id="nav-help"]',
        title: 'Help & Support',
        content: 'Access guided tours, quick tips, and help resources anytime from here.',
        route: 'forms',
        position: 'right',
        roles: ['user'],
        layout: 'desktop',
        order: 4
      },
      // Admin Mobile steps
      {
        id: 'welcome-1-mobile-admin',
        targetSelector: '[data-tour-id="mobile-brand-logo"]',
        title: 'Welcome to SolidForm',
        content: 'This is your enterprise assessment platform by SolidRange. Let\'s explore the mobile interface.',
        route: 'dashboard',
        position: 'bottom',
        roles: ['admin'],
        layout: 'mobile',
        order: 1
      },
      {
        id: 'welcome-2-mobile-admin',
        targetSelector: '[data-tour-id="mobile-nav-dashboard"]',
        title: 'Dashboard',
        content: 'Tap here to view your analytics and submission statistics.',
        route: 'dashboard',
        position: 'top',
        roles: ['admin'],
        layout: 'mobile',
        order: 2
      },
      {
        id: 'welcome-3-mobile-admin',
        targetSelector: '[data-tour-id="mobile-nav-forms"]',
        title: 'Forms',
        content: 'Tap here to access all your forms, create new ones, and view submissions for published forms.',
        route: 'dashboard',
        position: 'top',
        roles: ['admin'],
        layout: 'mobile',
        order: 3
      },
      {
        id: 'welcome-4-mobile-admin',
        targetSelector: '[data-tour-id="mobile-nav-reports"]',
        title: 'Reports',
        content: 'Tap here to generate and view all organization reports from your form data.',
        route: 'dashboard',
        position: 'top',
        roles: ['admin'],
        layout: 'mobile',
        order: 4
      },
      {
        id: 'welcome-5-mobile-admin',
        targetSelector: '[data-tour-id="mobile-nav-more"]',
        title: 'More Options',
        content: 'Tap here to access Settings, Help, and Developer Resources.',
        route: 'dashboard',
        position: 'top',
        roles: ['admin'],
        layout: 'mobile',
        order: 5
      },
      {
        id: 'welcome-6-mobile-admin',
        targetSelector: '[data-tour-id="mobile-menu-button"]',
        title: 'Navigation Menu',
        content: 'Tap the menu icon to open the full navigation drawer for quick access to all sections.',
        route: 'dashboard',
        position: 'bottom',
        roles: ['admin'],
        layout: 'mobile',
        order: 6
      },
      // User Mobile steps - only assigned forms and help
      {
        id: 'welcome-1-mobile-user',
        targetSelector: '[data-tour-id="mobile-brand-logo"]',
        title: 'Welcome to SolidForm',
        content: 'Welcome! Let\'s explore the mobile interface and find your assigned forms.',
        route: 'forms',
        position: 'bottom',
        roles: ['user'],
        layout: 'mobile',
        order: 1
      },
      {
        id: 'welcome-2-mobile-user',
        targetSelector: '[data-tour-id="mobile-nav-forms"]',
        title: 'Assigned Forms',
        content: 'Tap here to see forms assigned to you. Navigate to the "Assigned" tab and tap "Fill Form" to start completing an assessment.',
        route: 'forms',
        position: 'top',
        roles: ['user'],
        layout: 'mobile',
        order: 2
      },
      {
        id: 'welcome-3-mobile-user',
        targetSelector: '[data-tour-id="assigned-forms"]',
        title: 'Your Forms to Complete',
        content: 'All forms assigned to you are listed here. Each card shows the form details. Tap "Fill Form" to begin.',
        route: 'forms',
        position: 'bottom',
        roles: ['user'],
        layout: 'mobile',
        order: 3
      },
      {
        id: 'welcome-4-mobile-user',
        targetSelector: '[data-tour-id="mobile-nav-more"]',
        title: 'More Options',
        content: 'Tap here to access Help and sign out.',
        route: 'forms',
        position: 'top',
        roles: ['user'],
        layout: 'mobile',
        order: 4
      }
    ]
  },
  {
    id: 'dashboard-tour',
    name: 'Dashboard Overview',
    description: 'Learn how to use the analytics dashboard effectively.',
    roles: ['admin'],
    category: 'navigation',
    steps: [
      {
        id: 'dash-1',
        targetSelector: '[data-tour-id="dashboard-stats"]',
        title: 'Key Statistics',
        content: 'See your key metrics at a glance - total submissions, approval rates, and risk levels. Click any card to filter submissions.',
        route: 'dashboard',
        position: 'bottom',
        roles: ['admin'],
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
        roles: ['admin'],
        layout: 'both',
        order: 2
      }
    ]
  },
  {
    id: 'form-builder-tour',
    name: 'Form Builder',
    description: 'Learn how to create and customize assessment forms.',
    roles: ['admin'],
    category: 'forms',
    steps: [
      {
        id: 'builder-1-desktop',
        targetSelector: '[data-tour-id="field-palette"]',
        title: 'Field Palette',
        content: 'Choose from various field types: text, numbers, dropdowns, checkboxes, ratings, and more. Click a field to add it to your form.',
        route: 'build-form',
        position: 'right',
        roles: ['admin'],
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
        roles: ['admin'],
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
        roles: ['admin'],
        layout: 'both',
        order: 3
      },
      {
        id: 'builder-4',
        targetSelector: '[data-tour-id="save-form"]',
        title: 'Save Your Work',
        content: 'Save your form as a draft or publish it. When publishing, you can distribute the form to ADFS groups or email recipients.',
        route: 'build-form',
        position: 'bottom',
        roles: ['admin'],
        layout: 'both',
        order: 4
      },
      {
        id: 'builder-1-mobile',
        targetSelector: '[data-tour-id="mobile-add-field"]',
        title: 'Add Fields',
        content: 'Tap this button to open the field palette and add fields to your form.',
        route: 'build-form',
        position: 'top',
        roles: ['admin'],
        layout: 'mobile',
        order: 1
      }
    ]
  },
  {
    id: 'filling-forms-tour',
    name: 'Filling Assigned Forms',
    description: 'Learn how to find the Assigned tab and fill out forms assigned to you.',
    roles: ['user'],
    category: 'forms',
    steps: [
      {
        id: 'fill-1',
        targetSelector: '[data-tour-id="forms-tabs"]',
        title: 'Navigate to Assigned Tab',
        content: 'Click the "Assigned" tab to see all forms that have been assigned to you for completion.',
        route: 'forms',
        position: 'bottom',
        roles: ['user'],
        layout: 'both',
        order: 1
      },
      {
        id: 'fill-2',
        targetSelector: '[data-tour-id="assigned-forms"]',
        title: 'Your Assigned Forms',
        content: 'All forms assigned to you appear here. Each card shows the form name, description, and number of fields.',
        route: 'forms',
        position: 'bottom',
        roles: ['user'],
        layout: 'both',
        order: 2
      },
      {
        id: 'fill-3',
        targetSelector: '[data-tour-id="assigned-forms"]',
        title: 'Fill a Form',
        content: 'Click the "Fill Form" button on any card to open the form. Complete all required fields and click "Submit Response" when done.',
        route: 'forms',
        position: 'bottom',
        roles: ['user'],
        layout: 'both',
        order: 3
      }
    ]
  },
  {
    id: 'submissions-tour',
    name: 'Form Submissions',
    description: 'Learn how to review submissions for each published form.',
    roles: ['admin'],
    category: 'submissions',
    steps: [
      {
        id: 'sub-0',
        targetSelector: '[data-tour-id="forms-tabs"]',
        title: 'Find Published Forms',
        content: 'Navigate to the Forms page and select the Published tab to see your active forms. Each published form has a Submissions button.',
        route: 'forms',
        position: 'bottom',
        roles: ['admin'],
        layout: 'both',
        order: 1
      },
      {
        id: 'sub-1',
        targetSelector: '[data-tour-id="submission-filters"]',
        title: 'Filter & Search',
        content: 'Use the search bar and filters to find specific submissions. Filter by status, risk level, audience, or approval type.',
        route: 'form-submissions',
        position: 'bottom',
        roles: ['admin'],
        layout: 'both',
        order: 2
      },
      {
        id: 'sub-2',
        targetSelector: '[data-tour-id="submission-list"]',
        title: 'Submission List',
        content: 'Browse all submissions for this form. Each card shows key details like company, status, score, and risk level. Click to view full details.',
        route: 'form-submissions',
        position: 'right',
        roles: ['admin'],
        layout: 'both',
        order: 3
      },
      {
        id: 'sub-3-desktop',
        targetSelector: '[data-tour-id="submission-actions"]',
        title: 'Review & Take Action',
        content: 'View complete submission details and take actions: approve, reject, request changes, or export to PDF/Excel.',
        route: 'form-submissions',
        position: 'left',
        roles: ['admin'],
        layout: 'desktop',
        order: 4
      },
      {
        id: 'sub-3-mobile',
        targetSelector: '[data-tour-id="submission-actions"]',
        title: 'Review & Take Action',
        content: 'Tap any submission card to view details. Use the action buttons to approve, reject, or export.',
        route: 'form-submissions',
        position: 'top',
        roles: ['admin'],
        layout: 'mobile',
        order: 4
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
        content: 'Toggle visibility of development resources and technical documentation. Enable this to access the Resources section below Help.',
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
    description: 'Learn how to manage your forms collection and access per-form submissions.',
    roles: ['admin'],
    category: 'forms',
    steps: [
      {
        id: 'lib-1',
        targetSelector: '[data-tour-id="forms-tabs"]',
        title: 'Forms Organization',
        content: 'Your forms are organized into two sections: Drafts (work in progress) and Published (active forms accepting submissions). Use the Templates button to start from a template.',
        route: 'forms',
        position: 'bottom',
        roles: ['admin'],
        layout: 'both',
        order: 1
      },
      {
        id: 'lib-2',
        targetSelector: '[data-tour-id="forms-list"]',
        title: 'Form Cards',
        content: 'Each card shows the form name, description, category, and status. Published forms have a Submissions button to review responses.',
        route: 'forms',
        position: 'right',
        roles: ['admin'],
        layout: 'both',
        order: 2
      },
      {
        id: 'lib-3-desktop',
        targetSelector: '[data-tour-id="forms-actions"]',
        title: 'Form Actions',
        content: 'Use the actions to edit, publish, or delete forms. Published forms show Share, Manage, Submissions, and Draft buttons.',
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
        content: 'Tap the action buttons on any form card to edit, publish, or delete it. Published forms have a Submissions button.',
        route: 'forms',
        position: 'top',
        roles: ['admin'],
        layout: 'mobile',
        order: 3
      }
    ]
  },
  {
    id: 'reports-tour',
    name: 'Reports & Analytics',
    description: 'Generate and customize comprehensive reports from all form data.',
    roles: ['admin'],
    category: 'reports',
    steps: [
      {
        id: 'rep-1',
        targetSelector: '[data-tour-id="reports-section"]',
        title: 'Report Generation',
        content: 'Generate comprehensive reports from all form submission data. Create custom reports, customize format, date ranges, and included metrics.',
        route: 'reports',
        position: 'bottom',
        roles: ['admin'],
        layout: 'both',
        order: 1
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
    roles: ['admin']
  },
  {
    id: 'tip-2',
    title: 'Drag & Drop Fields',
    content: 'Click on any field type in the palette to add it to your form canvas.',
    category: 'forms',
    roles: ['admin']
  },
  {
    id: 'tip-3',
    title: 'Field Properties',
    content: 'Click any field on the canvas to open the editor panel and customize its properties.',
    category: 'forms',
    roles: ['admin']
  },
  {
    id: 'tip-4',
    title: 'Save as Template',
    content: 'After building a form, save it as a template to reuse the structure for future assessments.',
    category: 'forms',
    roles: ['admin']
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
    title: 'Per-Form Submissions',
    content: 'View submissions for each published form by clicking the Submissions button on any published form card in the Forms page.',
    category: 'submissions',
    roles: ['admin']
  },
  {
    id: 'tip-8',
    title: 'Export Data',
    content: 'Export submissions to Excel or PDF for offline analysis and reporting.',
    category: 'reports',
    roles: ['admin']
  },
  {
    id: 'tip-9',
    title: 'Risk Levels',
    content: 'Submissions are automatically categorized by risk: Low (green), Medium (amber), High (orange), Critical (red).',
    category: 'submissions',
    roles: ['admin']
  },
  {
    id: 'tip-10',
    title: 'Developer Resources',
    content: 'Enable "Show Development Resources" in Settings to access technical documentation below the Help section.',
    category: 'advanced',
    roles: ['admin']
  },
  {
    id: 'tip-11',
    title: 'All Reports',
    content: 'Access the Reports section to generate customized reports from all form submission data. Create custom reports with specific filters and sections.',
    category: 'reports',
    roles: ['admin']
  },
  {
    id: 'tip-12',
    title: 'Form Workflow',
    content: 'After saving or publishing a form, you\'ll return to the Forms page. Published forms show a Submissions button for reviewing responses.',
    category: 'forms',
    roles: ['admin']
  },
  // User-specific tips
  {
    id: 'tip-13',
    title: 'Finding Your Assigned Forms',
    content: 'Navigate to the Forms page and click the "Assigned" tab to see all forms assigned to you. Click "Fill Form" to start completing an assessment.',
    category: 'forms',
    roles: ['user']
  },
  {
    id: 'tip-14',
    title: 'Submitting Responses',
    content: 'Complete all required fields and click "Submit Response" to send your completed form.',
    category: 'forms',
    roles: ['user']
  },
  {
    id: 'tip-15',
    title: 'Login & Logout',
    content: 'Use the Sign Out button in the sidebar or More menu to switch accounts or log out.',
    category: 'productivity',
    roles: ['admin', 'user']
  },
  {
    id: 'tip-16',
    title: 'Form Distribution',
    content: 'When publishing a form, you can distribute it to ADFS groups or enter/upload a list of email recipients.',
    category: 'forms',
    roles: ['admin']
  },
  {
    id: 'tip-17',
    title: 'Custom Reports',
    content: 'As an admin, you can create fully customized reports with specific sections, filters, and chart types.',
    category: 'reports',
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
