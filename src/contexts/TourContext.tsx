import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { TourState, TourAnalytics, Tour, UserRole } from '@/types/tour';
import { tours, getToursForRole, getStepsForRole } from '@/data/tourSteps';
import { toast } from '@/hooks/use-toast';

interface TourContextType {
  // State
  tourState: TourState;
  currentTour: Tour | null;
  currentStep: Tour['steps'][0] | null;
  totalSteps: number;
  userRole: UserRole;
  analytics: TourAnalytics[];
  
  // Actions
  startTour: (tourId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  skipStep: () => void;
  pauseTour: () => void;
  resumeTour: () => void;
  endTour: (completed?: boolean) => void;
  restartTour: (tourId: string) => void;
  setUserRole: (role: UserRole) => void;
  submitFeedback: (tourId: string, feedback: 'positive' | 'negative') => void;
  
  // Queries
  isTourActive: boolean;
  canAccessTour: (tourId: string) => boolean;
  getTourProgress: (tourId: string) => { completed: boolean; stepsCompleted: number; totalSteps: number };
  getAvailableTours: () => Tour[];
}

const TourContext = createContext<TourContextType | undefined>(undefined);

const TOUR_STATE_KEY = 'solidform_tour_state';
const TOUR_ANALYTICS_KEY = 'solidform_tour_analytics';
const USER_ROLE_KEY = 'solidform_user_role';

const defaultTourState: TourState = {
  activeTourId: null,
  currentStepIndex: 0,
  isPaused: false,
  completedTours: [],
  startedAt: null
};

export const TourProvider = ({ children }: { children: ReactNode }) => {
  const [tourState, setTourState] = useState<TourState>(() => {
    const saved = localStorage.getItem(TOUR_STATE_KEY);
    return saved ? JSON.parse(saved) : defaultTourState;
  });
  
  const [analytics, setAnalytics] = useState<TourAnalytics[]>(() => {
    const saved = localStorage.getItem(TOUR_ANALYTICS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(USER_ROLE_KEY);
    return (saved as UserRole) || 'admin';
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem(TOUR_STATE_KEY, JSON.stringify(tourState));
  }, [tourState]);
  
  useEffect(() => {
    localStorage.setItem(TOUR_ANALYTICS_KEY, JSON.stringify(analytics));
  }, [analytics]);
  
  useEffect(() => {
    localStorage.setItem(USER_ROLE_KEY, userRole);
  }, [userRole]);

  // Derived state
  const currentTour = tourState.activeTourId 
    ? tours.find(t => t.id === tourState.activeTourId) || null 
    : null;
    
  const roleFilteredSteps = currentTour 
    ? getStepsForRole(currentTour, userRole) 
    : [];
    
  const currentStep = roleFilteredSteps[tourState.currentStepIndex] || null;
  const totalSteps = roleFilteredSteps.length;
  const isTourActive = !!tourState.activeTourId && !tourState.isPaused;

  const setUserRole = useCallback((role: UserRole) => {
    setUserRoleState(role);
    // If a tour is active, end it when role changes
    if (tourState.activeTourId) {
      endTour(false);
      toast({
        title: 'Tour ended',
        description: 'Role changed during tour. Please restart the tour.',
      });
    }
  }, [tourState.activeTourId]);

  const startTour = useCallback((tourId: string) => {
    const tour = tours.find(t => t.id === tourId);
    if (!tour || !tour.roles.includes(userRole)) {
      toast({
        title: 'Tour unavailable',
        description: 'This tour is not available for your role.',
        variant: 'destructive'
      });
      return;
    }

    setTourState({
      activeTourId: tourId,
      currentStepIndex: 0,
      isPaused: false,
      completedTours: tourState.completedTours,
      startedAt: new Date().toISOString()
    });

    // Record analytics
    const newAnalytic: TourAnalytics = {
      tourId,
      startedAt: new Date().toISOString(),
      stepsVisited: [0],
      skippedSteps: [],
      completed: false
    };
    setAnalytics(prev => [...prev.filter(a => a.tourId !== tourId), newAnalytic]);

    toast({
      title: 'Tour started',
      description: `Starting: ${tour.name}`,
    });
  }, [userRole, tourState.completedTours]);

  const nextStep = useCallback(() => {
    if (!currentTour) return;
    
    const nextIndex = tourState.currentStepIndex + 1;
    if (nextIndex >= totalSteps) {
      endTour(true);
      return;
    }

    setTourState(prev => ({
      ...prev,
      currentStepIndex: nextIndex
    }));

    // Update analytics
    setAnalytics(prev => prev.map(a => 
      a.tourId === tourState.activeTourId 
        ? { ...a, stepsVisited: [...a.stepsVisited, nextIndex] }
        : a
    ));
  }, [currentTour, tourState.currentStepIndex, tourState.activeTourId, totalSteps]);

  const prevStep = useCallback(() => {
    if (tourState.currentStepIndex > 0) {
      setTourState(prev => ({
        ...prev,
        currentStepIndex: prev.currentStepIndex - 1
      }));
    }
  }, [tourState.currentStepIndex]);

  const skipStep = useCallback(() => {
    // Record skipped step
    setAnalytics(prev => prev.map(a => 
      a.tourId === tourState.activeTourId 
        ? { ...a, skippedSteps: [...a.skippedSteps, tourState.currentStepIndex] }
        : a
    ));
    nextStep();
  }, [tourState.activeTourId, tourState.currentStepIndex, nextStep]);

  const pauseTour = useCallback(() => {
    setTourState(prev => ({ ...prev, isPaused: true }));
    toast({
      title: 'Tour paused',
      description: 'You can resume from the Help panel.',
    });
  }, []);

  const resumeTour = useCallback(() => {
    setTourState(prev => ({ ...prev, isPaused: false }));
    toast({
      title: 'Tour resumed',
      description: 'Continuing where you left off.',
    });
  }, []);

  const endTour = useCallback((completed: boolean = false) => {
    if (completed && tourState.activeTourId) {
      // Mark tour as completed
      setTourState(prev => ({
        ...defaultTourState,
        completedTours: [...new Set([...prev.completedTours, tourState.activeTourId!])]
      }));

      // Update analytics
      setAnalytics(prev => prev.map(a => 
        a.tourId === tourState.activeTourId 
          ? { ...a, completedAt: new Date().toISOString(), completed: true }
          : a
      ));

      toast({
        title: 'Tour completed! 🎉',
        description: 'Great job! You can restart this tour anytime from the Help panel.',
      });
    } else {
      setTourState(prev => ({
        ...prev,
        activeTourId: null,
        currentStepIndex: 0,
        isPaused: false,
        startedAt: null
      }));
    }
  }, [tourState.activeTourId]);

  const restartTour = useCallback((tourId: string) => {
    // Remove from completed and start fresh
    setTourState(prev => ({
      ...prev,
      completedTours: prev.completedTours.filter(id => id !== tourId)
    }));
    startTour(tourId);
  }, [startTour]);

  const submitFeedback = useCallback((tourId: string, feedback: 'positive' | 'negative') => {
    setAnalytics(prev => prev.map(a => 
      a.tourId === tourId ? { ...a, feedback } : a
    ));
    toast({
      title: 'Thank you!',
      description: 'Your feedback helps us improve the experience.',
    });
  }, []);

  const canAccessTour = useCallback((tourId: string) => {
    const tour = tours.find(t => t.id === tourId);
    return tour ? tour.roles.includes(userRole) : false;
  }, [userRole]);

  const getTourProgress = useCallback((tourId: string) => {
    const tour = tours.find(t => t.id === tourId);
    if (!tour) return { completed: false, stepsCompleted: 0, totalSteps: 0 };
    
    const steps = getStepsForRole(tour, userRole);
    const completed = tourState.completedTours.includes(tourId);
    const analytic = analytics.find(a => a.tourId === tourId);
    
    return {
      completed,
      stepsCompleted: analytic?.stepsVisited.length || 0,
      totalSteps: steps.length
    };
  }, [userRole, tourState.completedTours, analytics]);

  const getAvailableTours = useCallback(() => {
    return getToursForRole(userRole);
  }, [userRole]);

  return (
    <TourContext.Provider value={{
      tourState,
      currentTour,
      currentStep,
      totalSteps,
      userRole,
      analytics,
      startTour,
      nextStep,
      prevStep,
      skipStep,
      pauseTour,
      resumeTour,
      endTour,
      restartTour,
      setUserRole,
      submitFeedback,
      isTourActive,
      canAccessTour,
      getTourProgress,
      getAvailableTours
    }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};
