
import React from 'react';
import { FormTemplate } from '@/types/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormPreview } from './FormPreview';

interface FormTemplatePreviewProps {
  template: FormTemplate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FormTemplatePreview: React.FC<FormTemplatePreviewProps> = ({
  template,
  isOpen,
  onClose,
}) => {
  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Template Preview: {template.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <FormPreview
            formTitle={template.name}
            formDescription={template.description}
            formFields={template.fields}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
