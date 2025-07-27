import React, { createContext, useContext, ReactNode } from 'react';
import { FormTemplate, FormField } from '@/types/form';
import { useTemplateApplication } from '@/hooks/useTemplateApplication';

interface TemplateContextType {
  applyTemplate: (template: FormTemplate, setSelectedCategories?: (categories: string[]) => void, setSelectedSectors?: (sectors: string[]) => void) => void;
  isApplying: boolean;
}

const TemplateContext = createContext<TemplateContextType | null>(null);

interface TemplateManagerProps {
  children: ReactNode;
  onAddField: (field: FormField) => void;
  onRemoveField: (fieldId: string) => void;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onSelectField: (fieldId: string | null) => void;
  formFields: FormField[];
}

export const TemplateManager: React.FC<TemplateManagerProps> = ({
  children,
  onAddField,
  onRemoveField,
  onUpdateTitle,
  onUpdateDescription,
  onSelectField,
  formFields
}) => {
  const { applyTemplate, isApplying } = useTemplateApplication({
    onAddField,
    onRemoveField,
    onUpdateTitle,
    onUpdateDescription,
    onSelectField,
    formFields
  });

  const contextValue: TemplateContextType = {
    applyTemplate,
    isApplying
  };

  return (
    <TemplateContext.Provider value={contextValue}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplateManager = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplateManager must be used within a TemplateManager');
  }
  return context;
};