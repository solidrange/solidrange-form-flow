
import React, { useState } from 'react';
import { FormTemplate, FormField, DocumentAttachment } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { BrandedButton } from './BrandedButton';
import { FormLibrary } from './FormLibrary';
import { FieldPalette } from './FieldPalette';
import { FormCanvas } from './FormCanvas';
import { FieldEditor } from './FieldEditor';
import { FormPreview } from './FormPreview';

interface FormBuilderProps {
  formFields: FormField[];
  onAddField: (field: FormField) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
  selectedFieldId: string | null;
  onSelectField: (fieldId: string | null) => void;
  title: string;
  onUpdateTitle: (title: string) => void;
  description: string;
  onUpdateDescription: (description: string) => void;
  onSaveForm: () => void;
  onPreviewForm: () => void;
  attachments: DocumentAttachment[];
  onUpdateAttachments: (attachments: DocumentAttachment[]) => void;
  onSaveToLibrary: () => void;
  isPublished: boolean;
  onMoveToDraft: () => void;
}

export const FormBuilder = ({
  formFields,
  onAddField,
  onUpdateField,
  onRemoveField,
  selectedFieldId,
  onSelectField,
  title,
  onUpdateTitle,
  description,
  onUpdateDescription,
  onSaveForm,
  onPreviewForm,
  attachments,
  onUpdateAttachments,
  onSaveToLibrary,
  isPublished,
  onMoveToDraft
}: FormBuilderProps) => {
  const [activeTab, setActiveTab] = useState('builder');

  console.log('FormBuilder: Current form fields:', formFields);

  const handleUseTemplate = (template: FormTemplate) => {
    console.log('FormBuilder: Received template:', template.name);
    console.log('FormBuilder: Template fields:', template.fields);
    
    onUpdateTitle(template.name);
    onUpdateDescription(template.description);
    
    // Clear existing fields first
    formFields.forEach(field => onRemoveField(field.id));
    
    // Add template fields with unique IDs
    const processedFields = template.fields.map((field, index) => ({
      ...field,
      id: `field-${Date.now()}-${index}`
    }));
    
    console.log('FormBuilder: Processed fields:', processedFields);
    processedFields.forEach(field => onAddField(field));
    onSelectField(null);
    
    // Switch to builder tab after applying template
    setActiveTab('builder');
  };

  const handleReorderFields = (dragIndex: number, hoverIndex: number) => {
    console.log('FormBuilder: Reordering fields:', dragIndex, hoverIndex);
    // This would need to be implemented in the parent component
    // For now, we'll just log it
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="builder">Builder</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2">
            {isPublished && (
              <Button
                onClick={onMoveToDraft}
                variant="outline"
                size="sm"
              >
                Move to Draft
              </Button>
            )}
            <BrandedButton
              onClick={onSaveForm}
              variant="outline"
              size="sm"
            >
              Save Draft
            </BrandedButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Templates Tab - Full Width */}
        {activeTab === 'templates' && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <FormLibrary onUseTemplate={handleUseTemplate} />
            </div>
          </div>
        )}

        {/* Preview Tab - Full Width */}
        {activeTab === 'preview' && (
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="p-6">
              <FormPreview
                formTitle={title}
                formDescription={description}
                formFields={formFields}
                attachments={attachments}
              />
            </div>
          </div>
        )}

        {/* Builder Tab - Three Column Layout */}
        {activeTab === 'builder' && (
          <>
            {/* Left Sidebar - Field Palette */}
            <div className="w-80 border-r bg-white overflow-y-auto">
              <div className="p-4">
                <FieldPalette onAddField={onAddField} />
              </div>
            </div>

            {/* Center - Form Canvas */}
            <div className="flex-1 flex flex-col">
              {/* Form Header */}
              <div className="p-6 border-b bg-gray-50">
                <Input
                  placeholder="Form Title"
                  value={title}
                  onChange={(e) => onUpdateTitle(e.target.value)}
                  className="text-2xl font-bold border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-400"
                />
                <Textarea
                  placeholder="Form Description (optional)"
                  value={description}
                  onChange={(e) => onUpdateDescription(e.target.value)}
                  className="mt-2 border-none bg-transparent p-0 resize-none focus-visible:ring-0 placeholder:text-gray-400"
                  rows={2}
                />
              </div>

              {/* Form Fields */}
              <div className="flex-1 p-6 overflow-y-auto">
                <FormCanvas
                  fields={formFields}
                  selectedField={selectedFieldId}
                  onSelectField={onSelectField}
                  onUpdateField={onUpdateField}
                  onRemoveField={onRemoveField}
                  onAddField={onAddField}
                  onReorderFields={handleReorderFields}
                  readOnly={isPublished}
                />
              </div>
            </div>

            {/* Right Sidebar - Field Editor */}
            <div className="w-80 border-l bg-white">
              <FieldEditor
                selectedField={selectedFieldId ? formFields.find(f => f.id === selectedFieldId) || null : null}
                onUpdateField={onUpdateField}
                onClose={() => onSelectField(null)}
                readOnly={isPublished}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
