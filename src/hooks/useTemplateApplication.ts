import { useState, useCallback } from 'react';
import { FormTemplate, FormField } from '@/types/form';

interface UseTemplateApplicationProps {
  onAddField: (field: FormField) => void;
  onRemoveField: (fieldId: string) => void;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onSelectField: (fieldId: string | null) => void;
  formFields: FormField[];
}

export const useTemplateApplication = ({
  onAddField,
  onRemoveField,
  onUpdateTitle,
  onUpdateDescription,
  onSelectField,
  formFields
}: UseTemplateApplicationProps) => {
  const [isApplying, setIsApplying] = useState(false);

  const clearAllFields = useCallback(() => {
    console.log('TemplateApplication: Clearing all existing fields');
    const currentFieldIds = formFields.map(field => field.id);
    currentFieldIds.forEach(fieldId => {
      onRemoveField(fieldId);
    });
  }, [formFields, onRemoveField]);

  const createTemplateFields = useCallback((template: FormTemplate): FormField[] => {
    console.log('TemplateApplication: Creating template fields for:', template.name);
    
    return template.fields.map((field, index) => {
      const newField: FormField = {
        ...field,
        id: `template-${template.id}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        // Ensure proper deep copy of arrays
        options: field.options ? [...field.options] : undefined,
        acceptedFileTypes: field.acceptedFileTypes ? [...field.acceptedFileTypes] : undefined
      };
      
      console.log(`TemplateApplication: Created field ${index + 1}:`, {
        id: newField.id,
        type: newField.type,
        label: newField.label,
        required: newField.required
      });
      
      return newField;
    });
  }, []);

  const addTemplateFields = useCallback((templateFields: FormField[]) => {
    console.log('TemplateApplication: Adding template fields sequentially');
    
    // Add fields one by one with proper timing
    templateFields.forEach((field, index) => {
      setTimeout(() => {
        console.log(`TemplateApplication: Adding field ${index + 1}/${templateFields.length}:`, field.label);
        onAddField(field);
        
        if (index === templateFields.length - 1) {
          console.log('TemplateApplication: All template fields added successfully');
          setIsApplying(false);
        }
      }, index * 50);
    });
  }, [onAddField]);

  const applyTemplate = useCallback((template: FormTemplate, setSelectedCategories?: (categories: string[]) => void, setSelectedSectors?: (sectors: string[]) => void) => {
    if (isApplying) {
      console.log('TemplateApplication: Already applying template, skipping');
      return;
    }

    console.log('=== TEMPLATE APPLICATION START ===');
    console.log('TemplateApplication: Applying template:', template.name);
    console.log('TemplateApplication: Template has', template.fields.length, 'fields');
    
    setIsApplying(true);
    
    // Clear field selection
    onSelectField(null);
    
    // Update form metadata
    onUpdateTitle(template.name);
    onUpdateDescription(template.description);
    
    // Update categories and sectors if setters provided
    if (setSelectedCategories && template.category) {
      setSelectedCategories([template.category]);
    }
    
    if (setSelectedSectors && template.sector) {
      const sectors = Array.isArray(template.sector) ? template.sector : [template.sector];
      setSelectedSectors(sectors);
    }
    
    // Create new template fields
    const templateFields = createTemplateFields(template);
    
    // Clear existing fields first
    clearAllFields();
    
    // Add template fields after clearing is complete
    setTimeout(() => {
      console.log('TemplateApplication: Starting to add template fields after clearing');
      addTemplateFields(templateFields);
    }, 150);
    
    console.log('=== TEMPLATE APPLICATION END ===');
  }, [isApplying, onSelectField, onUpdateTitle, onUpdateDescription, createTemplateFields, clearAllFields, addTemplateFields]);

  return {
    applyTemplate,
    isApplying
  };
};