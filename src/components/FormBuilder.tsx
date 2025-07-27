import React, { useState } from 'react';
import { FormTemplate, FormField, DocumentAttachment, Form } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from '@/components/ui/button';
import { BrandedButton } from './BrandedButton';
import { FormLibrary } from './FormLibrary';
import { FieldPalette } from './FieldPalette';
import { FormCanvas } from './FormCanvas';
import { FieldEditor } from './FieldEditor';
import { FormPreview } from './FormPreview';
import { FormSettingsPanel } from './FormSettingsPanel';
import { MultiSelectCategory } from './MultiSelectCategory';
import { MultiSelectFilter } from './MultiSelectFilter';
import { FileAttachmentManager } from './FileAttachmentManager';
import { Label } from '@/components/ui/label';

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

const sectorOptions = [
  'Government', 'Insurance', 'Fintech', 'Health', 'Energy', 
  'Telecom', 'Startups', 'SME', 'Multi-Sector'
];

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  console.log('FormBuilder: Current form fields:', formFields);

  // Create a form object for components that need it
  const form: Form = {
    id: 'current-form',
    title,
    description,
    fields: formFields,
    settings: {
      allowMultipleSubmissions: false,
      requireLogin: false,
      showProgressBar: true,
      theme: 'light',
      branding: {
        enabled: true,
        showLogo: true,
        showBrandColors: true,
        brandName: 'FormFlow',
        logo: null,
        colors: {
          primary: {
            main: '208 100% 47%',
            light: '210 100% 70%',
            dark: '208 100% 35%'
          },
          secondary: {
            main: '262 83% 58%',
            light: '262 83% 75%',
            dark: '262 83% 45%'
          }
        }
      },
      scoring: {
        enabled: false,
        maxTotalPoints: 100,
        showScoreToUser: false,
        passingScore: 70,
        riskThresholds: {
          low: 80,
          medium: 60,
          high: 40
        }
      },
      expiration: {
        enabled: false
      },
      emailDistribution: {
        enabled: false,
        recipients: [],
        reminderEnabled: true,
        reminderIntervalDays: 7,
        maxReminders: 3
      },
      approval: {
        enabled: false,
        requireApproval: false,
        approvers: [],
        autoApproveScore: 80
      }
    },
    status: isPublished ? 'published' : 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    submissions: 0,
    category: selectedCategories[0],
    targetAudience: selectedSectors,
    attachments: attachments,
    analytics: {
      views: 0,
      submissions: 0,
      completionRate: 0,
      emailsSent: 0,
      emailsCompleted: 0,
      averageCompletionTime: 0,
      dropoffRate: 0
    }
  };

  const handleUseTemplate = (template: FormTemplate) => {
    console.log('FormBuilder: Received template:', template.name);
    console.log('FormBuilder: Template fields:', template.fields);
    
    // Clear field selection first
    onSelectField(null);
    
    // Update form details
    onUpdateTitle(template.name);
    onUpdateDescription(template.description);
    
    // Set categories and sectors from template
    if (template.category) {
      setSelectedCategories([template.category]);
    }
    if (template.sector) {
      const sectors = Array.isArray(template.sector) ? template.sector : [template.sector];
      setSelectedSectors(sectors);
    }
    
    // Create template fields with unique IDs - ensure deep copy
    const templateFields = template.fields.map((field, index) => ({
      ...field,
      id: `template-${template.id}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      // Ensure options are properly copied if they exist
      ...(field.options && { options: [...field.options] }),
      // Ensure acceptedFileTypes are properly copied if they exist
      ...(field.acceptedFileTypes && { acceptedFileTypes: [...field.acceptedFileTypes] })
    }));
    
    console.log('FormBuilder: Applying template with fields:', templateFields.length);
    console.log('FormBuilder: Template fields to add:', templateFields);
    
    // Clear all existing fields first
    const currentFieldIds = [...formFields.map(field => field.id)];
    currentFieldIds.forEach(fieldId => onRemoveField(fieldId));
    
    // Add all template fields at once after clearing
    setTimeout(() => {
      templateFields.forEach((field, index) => {
        console.log(`FormBuilder: Adding field ${index + 1}:`, field.label, field.type);
        onAddField(field);
      });
    }, 50);
    
    // Switch to builder tab after applying template
    setActiveTab('builder');
  };

  const handleReorderFields = (dragIndex: number, hoverIndex: number) => {
    console.log('FormBuilder: Reordering fields:', dragIndex, hoverIndex);
    // This would need to be implemented in the parent component
    // For now, we'll just log it
  };

  const handleUpdateForm = (updates: Partial<Form>) => {
    if (updates.title !== undefined) {
      onUpdateTitle(updates.title);
    }
    if (updates.description !== undefined) {
      onUpdateDescription(updates.description);
    }
    // Handle other form updates as needed
  };

  const formatSectorLabel = (sector: string) => {
    switch (sector) {
      case 'sme': return 'SME';
      case 'multi-sector': return 'Multi-Sector';
      default: return sector.charAt(0).toUpperCase() + sector.slice(1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="builder">Builder</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
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

        {/* Settings Tab - Full Width */}
        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <FormSettingsPanel 
                form={form} 
                onUpdateForm={handleUpdateForm} 
                isPublished={isPublished}
              />
            </div>
          </div>
        )}

        {/* Builder Tab - Resizable Three Column Layout */}
        {activeTab === 'builder' && (
          <ResizablePanelGroup direction="horizontal" className="flex-1">
            {/* Left Sidebar - Field Palette */}
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
              <div className="h-full border-r bg-white overflow-y-auto">
                <div className="p-4">
                  <FieldPalette onAddField={onAddField} />
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />

            {/* Center - Form Canvas */}
            <ResizablePanel defaultSize={selectedFieldId ? 50 : 75} minSize={40}>
              <div className="h-full flex flex-col">
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
                  
                  {/* Category and Sector Selection */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MultiSelectCategory
                      selectedCategories={selectedCategories}
                      onCategoryChange={setSelectedCategories}
                      disabled={isPublished}
                    />
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Sectors</Label>
                      <MultiSelectFilter
                        options={sectorOptions}
                        selectedValues={selectedSectors}
                        onSelectionChange={setSelectedSectors}
                        placeholder="Select sectors..."
                        formatLabel={formatSectorLabel}
                      />
                    </div>
                  </div>

                  {/* File Attachments Section */}
                  <div className="mt-6">
                    <FileAttachmentManager
                      attachments={attachments}
                      onUpdateAttachments={onUpdateAttachments}
                      allowedTypes={['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']}
                      maxSize={10}
                      readOnly={isPublished}
                    />
                  </div>
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
            </ResizablePanel>

            {/* Right Sidebar - Field Editor - Only show when a field is selected */}
            {selectedFieldId && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
                  <div className="h-full border-l bg-white">
                    <FieldEditor
                      selectedField={selectedFieldId ? formFields.find(f => f.id === selectedFieldId) || null : null}
                      onUpdateField={onUpdateField}
                      onClose={() => onSelectField(null)}
                      readOnly={isPublished}
                    />
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};