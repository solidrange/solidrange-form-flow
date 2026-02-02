import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  showDevelopmentResources: boolean;
  setShowDevelopmentResources: (show: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [showDevelopmentResources, setShowDevelopmentResourcesState] = useState<boolean>(() => {
    const saved = localStorage.getItem('showDevelopmentResources');
    return saved ? JSON.parse(saved) : false;
  });

  const setShowDevelopmentResources = (show: boolean) => {
    setShowDevelopmentResourcesState(show);
    localStorage.setItem('showDevelopmentResources', JSON.stringify(show));
  };

  return (
    <SettingsContext.Provider value={{ showDevelopmentResources, setShowDevelopmentResources }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
