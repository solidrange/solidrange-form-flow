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
    layoutMode,
    nextStep,
    prevStep,
    skipStep,
    pauseTour,
    endTour,
    submitFeedback
  } = useTour();

  const [position, setPosition] = useState<OverlayPosition>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const isMobile = layoutMode === 'mobile';

  useEffect(() => {
    if (!isTourActive || !currentStep) return;

    const calculatePosition = () => {
      const target = document.querySelector(currentStep.targetSelector);
      
      // Card dimensions - smaller on mobile
      const overlayWidth = isMobile ? Math.min(340, window.innerWidth - 32) : 380;
      const overlayHeight = 250;
      const margin = isMobile ? 12 : 16;

      if (!target) {
        // Center the overlay if target not found
        // On mobile, position at bottom for easier reach
        if (isMobile) {
          setPosition({
            bottom: `${margin + 80}px`, // Above bottom nav
            left: '50%',
            transform: 'translateX(-50%)'
          });
        } else {
          setPosition({
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          });
        }
        return;
      }

      const rect = target.getBoundingClientRect();
      let newPosition: OverlayPosition = {};

      // On mobile, prefer top/bottom positioning for better visibility
      if (isMobile) {
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom - 80; // Account for bottom nav

        if (spaceBelow >= overlayHeight + margin) {
          // Position below target
          newPosition = {
            top: `${rect.bottom + margin}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          };
        } else if (spaceAbove >= overlayHeight + margin) {
          // Position above target
          newPosition = {
            bottom: `${window.innerHeight - rect.top + margin}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          };
        } else {
          // Center in available space, favoring bottom
          newPosition = {
            bottom: `${margin + 80}px`,
            left: '50%',
            transform: 'translateX(-50%)'
          };
        }
      } else {
        // Desktop positioning logic
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

        // Bounds checking for desktop
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
  }, [isTourActive, currentStep, isMobile]);

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
      <Card className={cn(
        "shadow-2xl border-2 border-primary/20 bg-card",
        isMobile ? "w-[calc(100vw-32px)] max-w-[340px]" : "w-[380px]"
      )}>
        <CardHeader className={cn("pb-2", isMobile && "p-3 pb-1")}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn(
                "text-muted-foreground font-medium",
                isMobile ? "text-[10px]" : "text-xs"
              )}>
                {currentTour.name}
              </span>
              <span className={cn(
                "text-muted-foreground",
                isMobile ? "text-[10px]" : "text-xs"
              )}>
                • Step {tourState.currentStepIndex + 1} of {totalSteps}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  isMobile ? "h-8 w-8" : "h-7 w-7"
                )}
                onClick={pauseTour}
                title="Pause tour"
              >
                <Pause className={cn(isMobile ? "h-4 w-4" : "h-4 w-4")} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  isMobile ? "h-8 w-8" : "h-7 w-7"
                )}
                onClick={() => endTour(false)}
                title="Close tour"
              >
                <X className={cn(isMobile ? "h-4 w-4" : "h-4 w-4")} />
              </Button>
            </div>
          </div>
          <Progress value={progressPercent} className="h-1 mt-2" />
          <CardTitle className={cn(
            "mt-3",
            isMobile ? "text-base" : "text-lg"
          )}>
            {currentStep.title}
          </CardTitle>
        </CardHeader>

        <CardContent className={cn("pt-0", isMobile && "p-3 pt-0")}>
          {showFeedback ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Was this tour helpful?
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className={cn("flex-1", isMobile && "min-h-[44px]")}
                  onClick={() => handleFeedback('positive')}
                >
                  <ThumbsUp className="h-5 w-5 mr-2" />
                  Yes
                </Button>
                <Button
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className={cn("flex-1", isMobile && "min-h-[44px]")}
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
            <p className={cn(
              "text-muted-foreground leading-relaxed",
              isMobile ? "text-sm" : "text-sm"
            )}>
              {currentStep.content}
            </p>
          )}
        </CardContent>

        {!showFeedback && (
          <CardFooter className={cn(
            "flex justify-between pt-0",
            isMobile && "p-3 pt-0 gap-2"
          )}>
            <div className={cn("flex gap-2", isMobile && "gap-1")}>
              <Button
                variant="outline"
                size={isMobile ? "default" : "sm"}
                onClick={prevStep}
                disabled={isFirstStep}
                className={cn(isMobile && "min-h-[44px] px-3")}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {!isMobile && "Back"}
              </Button>
              {!isLastStep && (
                <Button
                  variant="ghost"
                  size={isMobile ? "default" : "sm"}
                  onClick={skipStep}
                  className={cn(
                    "text-muted-foreground",
                    isMobile && "min-h-[44px] px-3"
                  )}
                >
                  <SkipForward className="h-4 w-4 mr-1" />
                  {!isMobile && "Skip"}
                </Button>
              )}
            </div>
            
            {isLastStep ? (
              <Button 
                size={isMobile ? "default" : "sm"} 
                onClick={handleComplete}
                className={cn(isMobile && "min-h-[44px]")}
              >
                Complete
              </Button>
            ) : (
              <Button 
                size={isMobile ? "default" : "sm"} 
                onClick={nextStep}
                className={cn(isMobile && "min-h-[44px]")}
              >
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
