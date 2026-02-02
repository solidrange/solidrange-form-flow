import React, { useEffect, useState } from 'react';
import { useTour } from '@/contexts/TourContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { X, ChevronLeft, ChevronRight, SkipForward, Pause, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverlayPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
}

export const TourOverlay: React.FC = () => {
  const {
    isTourActive,
    currentTour,
    currentStep,
    totalSteps,
    tourState,
    nextStep,
    prevStep,
    skipStep,
    pauseTour,
    endTour,
    submitFeedback
  } = useTour();

  const [position, setPosition] = useState<OverlayPosition>({});
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (!isTourActive || !currentStep) return;

    const calculatePosition = () => {
      const target = document.querySelector(currentStep.targetSelector);
      
      if (!target) {
        // Center the overlay if target not found
        setPosition({
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        });
        return;
      }

      const rect = target.getBoundingClientRect();
      const overlayWidth = 380;
      const overlayHeight = 250;
      const margin = 16;

      let newPosition: OverlayPosition = {};

      switch (currentStep.position) {
        case 'top':
          newPosition = {
            bottom: `${window.innerHeight - rect.top + margin}px`,
            left: `${rect.left + rect.width / 2}px`,
            transform: 'translateX(-50%)'
          };
          break;
        case 'bottom':
          newPosition = {
            top: `${rect.bottom + margin}px`,
            left: `${rect.left + rect.width / 2}px`,
            transform: 'translateX(-50%)'
          };
          break;
        case 'left':
          newPosition = {
            top: `${rect.top + rect.height / 2}px`,
            right: `${window.innerWidth - rect.left + margin}px`,
            transform: 'translateY(-50%)'
          };
          break;
        case 'right':
        default:
          newPosition = {
            top: `${rect.top + rect.height / 2}px`,
            left: `${rect.right + margin}px`,
            transform: 'translateY(-50%)'
          };
          break;
      }

      // Bounds checking
      const tempTop = parseInt(newPosition.top || '0');
      const tempLeft = parseInt(newPosition.left || '0');

      if (tempTop < margin) {
        newPosition.top = `${margin}px`;
        newPosition.transform = newPosition.transform?.replace('translateY(-50%)', '') || '';
      }
      if (tempTop + overlayHeight > window.innerHeight - margin) {
        delete newPosition.top;
        newPosition.bottom = `${margin}px`;
        newPosition.transform = newPosition.transform?.replace('translateY(-50%)', '') || '';
      }
      if (tempLeft < margin) {
        newPosition.left = `${margin}px`;
        newPosition.transform = newPosition.transform?.replace('translateX(-50%)', '') || '';
      }
      if (tempLeft + overlayWidth > window.innerWidth - margin) {
        delete newPosition.left;
        newPosition.right = `${margin}px`;
        newPosition.transform = newPosition.transform?.replace('translateX(-50%)', '') || '';
      }

      setPosition(newPosition);
    };

    calculatePosition();
    
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', calculatePosition);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [isTourActive, currentStep]);

  // Check if this is the last step
  const isLastStep = tourState.currentStepIndex === totalSteps - 1;
  const isFirstStep = tourState.currentStepIndex === 0;
  const progressPercent = ((tourState.currentStepIndex + 1) / totalSteps) * 100;

  if (!isTourActive || !currentStep || !currentTour) return null;

  const handleComplete = () => {
    setShowFeedback(true);
  };

  const handleFeedback = (feedback: 'positive' | 'negative') => {
    submitFeedback(currentTour.id, feedback);
    setShowFeedback(false);
    endTour(true);
  };

  const handleSkipFeedback = () => {
    setShowFeedback(false);
    endTour(true);
  };

  return (
    <div className="fixed z-[9999]" style={position}>
      <Card className="w-[380px] shadow-2xl border-2 border-primary/20 bg-card">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">
                {currentTour.name}
              </span>
              <span className="text-xs text-muted-foreground">
                • Step {tourState.currentStepIndex + 1} of {totalSteps}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={pauseTour}
                title="Pause tour"
              >
                <Pause className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => endTour(false)}
                title="Close tour"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Progress value={progressPercent} className="h-1 mt-2" />
          <CardTitle className="text-lg mt-3">{currentStep.title}</CardTitle>
        </CardHeader>

        <CardContent className="pt-0">
          {showFeedback ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Was this tour helpful?
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => handleFeedback('positive')}
                >
                  <ThumbsUp className="h-5 w-5 mr-2" />
                  Yes
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => handleFeedback('negative')}
                >
                  <ThumbsDown className="h-5 w-5 mr-2" />
                  No
                </Button>
              </div>
              <Button
                variant="link"
                className="w-full text-xs"
                onClick={handleSkipFeedback}
              >
                Skip feedback
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {currentStep.content}
            </p>
          )}
        </CardContent>

        {!showFeedback && (
          <CardFooter className="flex justify-between pt-0">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={isFirstStep}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              {!isLastStep && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skipStep}
                  className="text-muted-foreground"
                >
                  <SkipForward className="h-4 w-4 mr-1" />
                  Skip
                </Button>
              )}
            </div>
            
            {isLastStep ? (
              <Button size="sm" onClick={handleComplete}>
                Complete Tour
              </Button>
            ) : (
              <Button size="sm" onClick={nextStep}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
