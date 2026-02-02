import React, { useEffect, useState, useRef } from 'react';
import { useTour } from '@/contexts/TourContext';

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const MAX_WAIT_ATTEMPTS = 25; // Increased for mobile transitions
const WAIT_INTERVAL = 150;
const MOBILE_WAIT_INTERVAL = 200; // Slightly longer for mobile animations

export const TourSpotlight: React.FC = () => {
  const { isTourActive, currentStep, layoutMode } = useTour();
  const [targetRect, setTargetRect] = useState<SpotlightRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [elementNotFound, setElementNotFound] = useState(false);
  const observerRef = useRef<ResizeObserver | null>(null);
  const waitAttemptsRef = useRef(0);
  
  const isMobile = layoutMode === 'mobile';

  useEffect(() => {
    if (!isTourActive || !currentStep) {
      setIsVisible(false);
      setTargetRect(null);
      setElementNotFound(false);
      waitAttemptsRef.current = 0;
      return;
    }

    const findAndHighlightTarget = () => {
      const target = document.querySelector(currentStep.targetSelector);
      const waitInterval = isMobile ? MOBILE_WAIT_INTERVAL : WAIT_INTERVAL;
      
      if (target) {
        const rect = target.getBoundingClientRect();
        const padding = isMobile ? 6 : 8; // Slightly smaller padding on mobile
        
        // Check if element is visible (has dimensions)
        if (rect.width === 0 || rect.height === 0) {
          // Element exists but not visible, keep waiting
          if (waitAttemptsRef.current < MAX_WAIT_ATTEMPTS) {
            waitAttemptsRef.current++;
            setTimeout(findAndHighlightTarget, waitInterval);
            return;
          }
        }
        
        waitAttemptsRef.current = 0;
        setElementNotFound(false);
        setTargetRect({
          top: rect.top - padding + window.scrollY,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2
        });
        setIsVisible(true);

        // Scroll element into view if needed
        // On mobile, be more careful about scrolling to not conflict with bottom nav
        const shouldScroll = !currentStep.targetSelector.includes('nav-') && 
                            !currentStep.targetSelector.includes('mobile-nav-');
        if (shouldScroll) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Set up resize observer
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        const currentPadding = isMobile ? 6 : 8;
        observerRef.current = new ResizeObserver(() => {
          const newRect = target.getBoundingClientRect();
          if (newRect.width > 0 && newRect.height > 0) {
            setTargetRect({
              top: newRect.top - currentPadding + window.scrollY,
              left: newRect.left - currentPadding,
              width: newRect.width + currentPadding * 2,
              height: newRect.height + currentPadding * 2
            });
          }
        });
        observerRef.current.observe(target);
      } else {
        // Target not found - wait and retry
        const waitInterval = isMobile ? MOBILE_WAIT_INTERVAL : WAIT_INTERVAL;
        if (waitAttemptsRef.current < MAX_WAIT_ATTEMPTS) {
          waitAttemptsRef.current++;
          setTimeout(findAndHighlightTarget, waitInterval);
          return;
        }
        
        // Max attempts reached - show centered overlay with warning
        setTargetRect(null);
        setElementNotFound(true);
        setIsVisible(true);
      }
    };

    // Reset attempts when step changes
    waitAttemptsRef.current = 0;
    setElementNotFound(false);
    
    // Small delay to allow DOM/navigation to update
    // Mobile needs slightly longer delay for drawer/sheet animations
    const initialDelay = isMobile ? 300 : 200;
    const timeout = setTimeout(findAndHighlightTarget, initialDelay);

    // Also update on scroll/resize
    const handleUpdate = () => {
      if (waitAttemptsRef.current === 0) {
        findAndHighlightTarget();
      }
    };
    window.addEventListener('scroll', handleUpdate);
    window.addEventListener('resize', handleUpdate);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isTourActive, currentStep, isMobile]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      {/* Dark overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.left}
                y={targetRect.top}
                width={targetRect.width}
                height={targetRect.height}
                rx="8"
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0, 0, 0, 0.6)"
          mask="url(#spotlight-mask)"
          className="pointer-events-auto"
        />
      </svg>

      {/* Highlight ring */}
      {targetRect && (
        <div
          className="absolute border-2 border-primary rounded-lg transition-all duration-300"
          style={{
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
            boxShadow: '0 0 0 4px rgba(var(--primary), 0.3), 0 0 20px rgba(var(--primary), 0.4)',
            animation: 'pulse 2s infinite'
          }}
        />
      )}

      {/* Element not found indicator */}
      {elementNotFound && !targetRect && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-500/90 text-white px-4 py-2 rounded-lg text-sm">
          Element not found on this page
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};
