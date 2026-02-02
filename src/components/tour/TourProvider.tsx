import React from 'react';
import { TourProvider as TourContextProvider } from '@/contexts/TourContext';
import { TourSpotlight } from './TourSpotlight';
import { TourOverlay } from './TourOverlay';

interface TourProviderProps {
  children: React.ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  return (
    <TourContextProvider>
      {children}
      <TourSpotlight />
      <TourOverlay />
    </TourContextProvider>
  );
};
