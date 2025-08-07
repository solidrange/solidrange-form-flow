import React from 'react';
import { FormTemplate, FormField, DocumentAttachment, Form } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from '@/components/ui/button';
import { BrandedButton } from './BrandedButton';
import { FieldPalette } from './FieldPalette';
import { FormCanvas } from './FormCanvas';
import { FieldEditor } from './FieldEditor';
import { MultiSelectCategory } from './MultiSelectCategory';
import { MultiSelectFilter } from './MultiSelectFilter';
import { MultiSelectAudience } from './MultiSelectAudience';
import { FileAttachmentManager } from './FileAttachmentManager';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Save } from 'lucide-react';
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
  formSettings: Form['settings'];
  onUpdateFormSettings: (settings: Form['settings']) => void;
  // Add these props to sync categories/sectors/tags
  formCategory: string | string[];
  onUpdateFormCategory: (category: string | string[]) => void;
  formTargetAudience: string | string[];
  onUpdateFormTargetAudience: (audience: string | string[]) => void;
  currentTemplateTags?: string[];
  // Add audience prop
  formAudience: string[];
  onUpdateFormAudience: (audience: string[]) => void;
}
const sectorOptions = ['Government', 'Insurance', 'Fintech', 'Health', 'Energy', 'Telecom', 'Startups', 'SME', 'Multi-Sector'];
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
  onMoveToDraft,
  formSettings,
  onUpdateFormSettings,
  formCategory,
  onUpdateFormCategory,
  formTargetAudience,
  onUpdateFormTargetAudience,
  currentTemplateTags = [],
  formAudience,
  onUpdateFormAudience
}: FormBuilderProps) => {
  // Convert parent state to local display format
  const selectedCategories = typeof formCategory === 'string' ? formCategory ? [formCategory] : [] : formCategory;
  const selectedSectors = typeof formTargetAudience === 'string' ? formTargetAudience ? [formTargetAudience] : [] : formTargetAudience;
  console.log('FormBuilder: Current form fields:', formFields);

  // Create a form object for components that need it
  const form: Form = {
    id: 'current-form',
    title,
    description,
    fields: formFields,
    settings: formSettings,
    status: isPublished ? 'published' : 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
    submissions: 0,
    category: selectedCategories[0] || '',
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
  const handleReorderFields = (dragIndex: number, hoverIndex: number) => {
    console.log('FormBuilder: Reordering fields:', dragIndex, hoverIndex);
    // This would need to be implemented in the parent component
    // For now, we'll just log it
  };
  const formatSectorLabel = (sector: string) => {
    switch (sector) {
      case 'sme':
        return 'SME';
      case 'multi-sector':
        return 'Multi-Sector';
      default:
        return sector.charAt(0).toUpperCase() + sector.slice(1);
    }
  };
  return <div className="h-full flex">
      {/* Resizable Three Column Layout */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 bg-white">
        {/* Left Sidebar - Field Palette */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="h-full border-r overflow-y-auto">
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
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <Input placeholder="Form Title" value={title} onChange={e => onUpdateTitle(e.target.value)} className="text-2xl font-bold border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-muted-foreground" />
                  <Textarea placeholder="Form Description (optional)" value={description} onChange={e => onUpdateDescription(e.target.value)} className="mt-2 border-none bg-transparent p-0 resize-none focus-visible:ring-0 placeholder:text-muted-foreground" rows={2} />
                </div>
                <div className="flex items-center gap-2">
                  {isPublished && <Button onClick={onMoveToDraft} variant="outline" size="sm">
                      Move to Draft
                    </Button>}
                  <BrandedButton onClick={onSaveForm} variant="outline" size="sm" className="gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </BrandedButton>
                </div>
              </div>
              
              {/* Category, Sector, and Audience Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MultiSelectCategory selectedCategories={selectedCategories} onCategoryChange={onUpdateFormCategory} disabled={isPublished} />
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Sectors</Label>
                  <MultiSelectFilter options={sectorOptions} selectedValues={selectedSectors} onSelectionChange={onUpdateFormTargetAudience} placeholder="Select sectors..." formatLabel={formatSectorLabel} />
                </div>

                <MultiSelectAudience selectedAudiences={formAudience} onAudienceChange={onUpdateFormAudience} disabled={isPublished} />
              </div>

              {/* Template Tags Display */}
              {currentTemplateTags.length > 0 && <div className="mt-4">
                  <Label className="text-sm font-medium text-foreground">Template Tags</Label>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {currentTemplateTags.map((tag, index) => <Badge key={index} variant="outline" className="text-xs bg-muted text-foreground border-border">
                        {tag}
                      </Badge>)}
                  </div>
                </div>}

              {/* File Attachments Section */}
              <div className="mt-6">
                <FileAttachmentManager attachments={attachments} onUpdateAttachments={onUpdateAttachments} allowedTypes={['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']} maxSize={10} readOnly={isPublished} />
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 p-6 overflow-y-auto">
              <FormCanvas fields={formFields} selectedField={selectedFieldId} onSelectField={onSelectField} onUpdateField={onUpdateField} onRemoveField={onRemoveField} onAddField={onAddField} onReorderFields={handleReorderFields} readOnly={isPublished} />
            </div>
          </div>
        </ResizablePanel>

        {/* Right Sidebar - Field Editor - Only show when a field is selected */}
        {selectedFieldId && <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
              <div className="h-full border-l">
                <FieldEditor selectedField={selectedFieldId ? formFields.find(f => f.id === selectedFieldId) || null : null} onUpdateField={onUpdateField} onClose={() => onSelectField(null)} readOnly={isPublished} />
              </div>
            </ResizablePanel>
          </>}
      </ResizablePanelGroup>
    </div>;
};