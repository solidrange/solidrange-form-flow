import React, { useEffect, useState, useRef } from 'react';
import { useTour } from '@/contexts/TourContext';
import { cn } from '@/lib/utils';

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const TourSpotlight: React.FC = () => {
  const { isTourActive, currentStep } = useTour();
  const [targetRect, setTargetRect] = useState<SpotlightRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!isTourActive || !currentStep) {
      setIsVisible(false);
      setTargetRect(null);
      return;
    }

    const findAndHighlightTarget = () => {
      const target = document.querySelector(currentStep.targetSelector);
      
      if (target) {
        const rect = target.getBoundingClientRect();
        const padding = 8;
        
        setTargetRect({
          top: rect.top - padding + window.scrollY,
          left: rect.left - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2
        });
        setIsVisible(true);

        // Scroll element into view if needed
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Set up resize observer
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
        observerRef.current = new ResizeObserver(() => {
          const newRect = target.getBoundingClientRect();
          setTargetRect({
            top: newRect.top - padding + window.scrollY,
            left: newRect.left - padding,
            width: newRect.width + padding * 2,
            height: newRect.height + padding * 2
          });
        });
        observerRef.current.observe(target);
      } else {
        // Target not found - show centered overlay
        setTargetRect(null);
        setIsVisible(true);
      }
    };

    // Small delay to allow DOM to update
    const timeout = setTimeout(findAndHighlightTarget, 100);

    // Also update on scroll/resize
    const handleUpdate = () => findAndHighlightTarget();
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
  }, [isTourActive, currentStep]);

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
          className="absolute border-2 border-primary rounded-lg animate-pulse"
          style={{
            top: targetRect.top,
            left: targetRect.left,
            width: targetRect.width,
            height: targetRect.height,
            boxShadow: '0 0 20px rgba(var(--primary), 0.5)'
          }}
        />
      )}
    </div>
  );
};
