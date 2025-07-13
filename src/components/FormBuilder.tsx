
import React, { useState } from 'react';
import { FormField, DocumentAttachment } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrandedButton } from './BrandedButton';
import { BrandedInput } from './BrandedInput';
import { BrandedCard } from './BrandedCard';
import { useBranding } from './BrandingProvider';
import { FieldPalette } from './FieldPalette';
import { FieldEditor } from './FieldEditor';
import { FormCanvas } from './FormCanvas';
import { FileAttachmentManager } from './FileAttachmentManager';
import { Save, Eye, Library, FileText, Palette, Settings, Upload } from 'lucide-react';

export interface FormBuilderProps {
  formFields: FormField[];
  onAddField: (field: FormField) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
  selectedFieldId: string | null;
  onSelectField: (fieldId: string | null) => void;
  title: string;
  description: string;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onSaveForm: () => void;
  onPreviewForm: () => void;
  attachments: DocumentAttachment[];
  onAddAttachment: (attachment: DocumentAttachment) => void;
  onRemoveAttachment: (attachmentId: string) => void;
  onSaveToLibrary: () => void;
  isPublished: boolean;
  onMoveToDraft: () => void;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  formFields,
  onAddField,
  onUpdateField,
  onRemoveField,
  selectedFieldId,
  onSelectField,
  title,
  description,
  onUpdateTitle,
  onUpdateDescription,
  onSaveForm,
  onPreviewForm,
  attachments,
  onAddAttachment,
  onRemoveAttachment,
  onSaveToLibrary,
  isPublished,
  onMoveToDraft
}) => {
  const [activeBuilderTab, setActiveBuilderTab] = useState('builder');
  const { getPrimaryColor } = useBranding();

  return (
    <div className="h-full flex flex-col">
      {/* Header with branded styling */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold brand-text">Form Builder</h1>
              <p className="text-sm text-muted-foreground">Design and customize your forms</p>
            </div>
            {isPublished && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Published
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <BrandedButton
              variant="outline"
              onClick={() => onSaveToLibrary()}
              className="gap-2"
              brandVariant="outline"
            >
              <Library className="h-4 w-4" />
              Save to Library
            </BrandedButton>
            
            <BrandedButton
              variant="outline"
              onClick={onPreviewForm}
              className="gap-2"
              brandVariant="outline"
            >
              <Eye className="h-4 w-4" />
              Preview
            </BrandedButton>
            
            {isPublished && (
              <BrandedButton
                variant="outline"
                onClick={onMoveToDraft}
                className="gap-2"
                brandVariant="secondary"
              >
                Move to Draft
              </BrandedButton>
            )}
            
            <BrandedButton
              onClick={onSaveForm}
              className="gap-2"
              brandVariant="primary"
            >
              <Save className="h-4 w-4" />
              Save Form
            </BrandedButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <Tabs value={activeBuilderTab} onValueChange={setActiveBuilderTab} className="flex-1 flex flex-col">
          <TabsList className="m-4 mb-0 w-fit" style={{ borderColor: getPrimaryColor() }}>
            <TabsTrigger value="builder" className="brand-focus">
              <Palette className="h-4 w-4 mr-2" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="attachments" className="brand-focus">
              <FileText className="h-4 w-4 mr-2" />
              Attachments
            </TabsTrigger>
            <TabsTrigger value="settings" className="brand-focus">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 p-4 pt-0">
            <TabsContent value="builder" className="h-full mt-4">
              <div className="grid grid-cols-12 gap-6 h-full">
                {/* Left Sidebar - Field Palette */}
                <div className="col-span-3">
                  <BrandedCard brandAccent>
                    <CardHeader>
                      <CardTitle className="brand-text">Field Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FieldPalette onAddField={onAddField} />
                    </CardContent>
                  </BrandedCard>
                </div>

                {/* Center - Form Canvas */}
                <div className="col-span-6">
                  <BrandedCard className="h-full">
                    <CardHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="form-title" className="brand-text">Form Title</Label>
                          <BrandedInput
                            id="form-title"
                            value={title}
                            onChange={(e) => onUpdateTitle(e.target.value)}
                            placeholder="Enter form title"
                            className="text-xl font-semibold"
                          />
                        </div>
                        <div>
                          <Label htmlFor="form-description" className="brand-text">Form Description</Label>
                          <Textarea
                            id="form-description"
                            value={description}
                            onChange={(e) => onUpdateDescription(e.target.value)}
                            placeholder="Enter form description"
                            className="brand-focus brand-border"
                            style={{ borderColor: getPrimaryColor() }}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <FormCanvas
                        fields={formFields}
                        selectedField={selectedFieldId ? formFields.find(f => f.id === selectedFieldId) : null}
                        onSelectField={onSelectField}
                        onUpdateField={onUpdateField}
                        onRemoveField={onRemoveField}
                      />
                    </CardContent>
                  </BrandedCard>
                </div>

                {/* Right Sidebar - Field Editor */}
                <div className="col-span-3">
                  <BrandedCard brandAccent>
                    <CardHeader>
                      <CardTitle className="brand-text">Field Properties</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FieldEditor
                        selectedField={selectedFieldId ? formFields.find(f => f.id === selectedFieldId) : null}
                        onUpdateField={onUpdateField}
                      />
                    </CardContent>
                  </BrandedCard>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attachments" className="mt-4">
              <BrandedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 brand-text">
                    <Upload className="h-5 w-5" />
                    Form Attachments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FileAttachmentManager
                    attachments={attachments}
                    onAddAttachment={onAddAttachment}
                    onRemoveAttachment={onRemoveAttachment}
                  />
                </CardContent>
              </BrandedCard>
            </TabsContent>

            <TabsContent value="settings" className="mt-4">
              <BrandedCard>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 brand-text">
                    <Settings className="h-5 w-5" />
                    Form Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Form settings will be available here
                  </div>
                </CardContent>
              </BrandedCard>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
