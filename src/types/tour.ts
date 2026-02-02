// Tour System Types
export type UserRole = 'admin' | 'user';
export type LayoutMode = 'desktop' | 'mobile' | 'both';

export interface TourStep {
  id: string;
  targetSelector: string; // data-tour-id selector
  title: string;
  content: string;
  route?: string; // Optional route this step should appear on
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  roles: UserRole[]; // Which roles can see this step
  layout: LayoutMode; // Which layout mode this step applies to
  order: number;
}

export interface Tour {
  id: string;
  name: string;
  description: string;
  roles: UserRole[]; // Which roles can access this tour
  category: 'navigation' | 'forms' | 'submissions' | 'reports' | 'settings' | 'complete';
  steps: TourStep[];
}

export interface TourState {
  activeTourId: string | null;
  currentStepIndex: number;
  isPaused: boolean;
  completedTours: string[];
  startedAt: string | null;
}

export interface TourAnalytics {
  tourId: string;
  startedAt: string;
  completedAt?: string;
  stepsVisited: number[];
  skippedSteps: number[];
  feedback?: 'positive' | 'negative';
  completed: boolean;
}

export interface HelpTip {
  id: string;
  title: string;
  content: string;
  category: string;
  roles: UserRole[];
}
