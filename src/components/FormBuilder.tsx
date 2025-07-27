
import React, { useState } from 'react';
import { FormTemplate, FormField, DocumentAttachment, Form } from '@/types/form';
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
import { FormSettingsPanel } from './FormSettingsPanel';

interface FormBuilderProps {
  form: Form;
  onAddField: (field: FormField) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
  selectedFieldId: string | null;
  onSelectField: (fieldId: string | null) => void;
  onUpdateForm: (updates: Partial<Form>) => void;
  onSaveForm: () => void;
  onPreviewForm: () => void;
  attachments: DocumentAttachment[];
  onUpdateAttachments: (attachments: DocumentAttachment[]) => void;
  onSaveToLibrary: () => void;
  isPublished: boolean;
  onMoveToDraft: () => void;
}

export const FormBuilder = ({
  form,
  onAddField,
  onUpdateField,
  onRemoveField,
  selectedFieldId,
  onSelectField,
  onUpdateForm,
  onSaveForm,
  onPreviewForm,
  attachments,
  onUpdateAttachments,
  onSaveToLibrary,
  isPublished,
  onMoveToDraft
}: FormBuilderProps) => {
  const [activeTab, setActiveTab] = useState('builder');
  const [builderSubTab, setBuilderSubTab] = useState('fields');

  console.log('FormBuilder: Current form fields:', form.fields);

  const handleUseTemplate = (template: FormTemplate) => {
    console.log('FormBuilder: Received template:', template.name);
    console.log('FormBuilder: Template fields:', template.fields);
    
    onUpdateForm({
      title: template.name,
      description: template.description
    });
    
    // Clear existing fields first
    form.fields.forEach(field => onRemoveField(field.id));
    
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
    setBuilderSubTab('fields');
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
                formTitle={form.title}
                formDescription={form.description}
                formFields={form.fields}
                attachments={attachments}
              />
            </div>
          </div>
        )}

        {/* Builder Tab - Three Column Layout with Sub-tabs */}
        {activeTab === 'builder' && (
          <>
            {/* Left Sidebar - Fields/Settings Toggle */}
            <div className="w-80 border-r bg-white overflow-y-auto">
              <div className="p-4">
                <Tabs value={builderSubTab} onValueChange={setBuilderSubTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="fields">Fields</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="fields" className="mt-4">
                    <FieldPalette onAddField={onAddField} />
                  </TabsContent>
                  
                  <TabsContent value="settings" className="mt-4">
                    <FormSettingsPanel 
                      form={form} 
                      onUpdateForm={onUpdateForm} 
                      isPublished={isPublished}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Center - Form Canvas */}
            <div className="flex-1 flex flex-col">
              {/* Form Header */}
              <div className="p-6 border-b bg-gray-50">
                <Input
                  placeholder="Form Title"
                  value={form.title}
                  onChange={(e) => onUpdateForm({ title: e.target.value })}
                  className="text-2xl font-bold border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-400"
                />
                <Textarea
                  placeholder="Form Description (optional)"
                  value={form.description}
                  onChange={(e) => onUpdateForm({ description: e.target.value })}
                  className="mt-2 border-none bg-transparent p-0 resize-none focus-visible:ring-0 placeholder:text-gray-400"
                  rows={2}
                />
              </div>

              {/* Form Fields */}
              <div className="flex-1 p-6 overflow-y-auto">
                <FormCanvas
                  fields={form.fields}
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
                selectedField={selectedFieldId ? form.fields.find(f => f.id === selectedFieldId) || null : null}
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
