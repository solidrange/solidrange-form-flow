import React, { useState } from 'react';
import { FormField, DocumentAttachment, FormTemplate } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BrandedButton } from './BrandedButton';
import { BrandedInput } from './BrandedInput';
import { BrandedCard } from './BrandedCard';
import { useBranding } from './BrandingProvider';
import { FieldPalette } from './FieldPalette';
import { FieldEditor } from './FieldEditor';
import { FormCanvas } from './FormCanvas';
import { FileAttachmentManager } from './FileAttachmentManager';
import { FormLibrary } from './FormLibrary';
import { FormPreview } from './FormPreview';
import { GlobalSettings } from './GlobalSettings';
import { Save, Eye, Library, FileText, Palette, Settings, Upload, Plus, Wrench, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
  onUpdateAttachments: (attachments: DocumentAttachment[]) => void;
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
  onUpdateAttachments,
  onSaveToLibrary,
  isPublished,
  onMoveToDraft
}) => {
  const [activeTab, setActiveTab] = useState('builder');
  const [activeCanvasTab, setActiveCanvasTab] = useState('fields');
  const [libraryDialogOpen, setLibraryDialogOpen] = useState(false);
  const [libraryFormName, setLibraryFormName] = useState('');
  const [formSettings, setFormSettings] = useState({
    allowMultipleSubmissions: false,
    requireLogin: false,
    showProgressBar: true,
    theme: 'inherit' as 'light' | 'dark' | 'inherit' | 'custom',
    customCss: '',
    enableScoring: false,
    enableApprovalWorkflow: false,
    enableDocumentUploads: false,
    enableExpiration: false,
    enableEmailDistribution: false,
    expirationDate: '',
    expirationMessage: 'This form has expired.',
    autoApproveScore: 80,
    approvers: [] as string[],
    allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png'] as string[],
    maxFileSize: 10,
    emailRecipients: [] as string[],
    reminderEnabled: false,
    reminderInterval: 7,
    maxReminders: 3
  });
  const brandingContext = useBranding();

  const handleSaveToLibrary = () => {
    if (libraryFormName.trim()) {
      onSaveToLibrary();
      toast({
        title: "Form saved to library",
        description: `"${libraryFormName}" has been saved to your library.`,
      });
      setLibraryDialogOpen(false);
      setLibraryFormName('');
    }
  };

  const handleSaveForm = () => {
    setLibraryDialogOpen(true);
  };

  const handleUseTemplate = (template: FormTemplate) => {
    console.log('Applying template:', template.name);
    console.log('Template fields:', template.fields);
    
    // Clear existing fields first
    const existingFieldIds = [...formFields.map(f => f.id)];
    existingFieldIds.forEach(fieldId => {
      console.log('Removing field:', fieldId);
      onRemoveField(fieldId);
    });
    
    // Add template fields with proper unique IDs
    template.fields.forEach((templateField, index) => {
      const newField: FormField = {
        ...templateField,
        id: `field_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`
      };
      console.log('Adding field:', newField);
      onAddField(newField);
    });

    // Update form title and description
    onUpdateTitle(template.name);
    onUpdateDescription(template.description);

    // Switch to builder tab to show the applied template
    setActiveTab('builder');

    toast({
      title: "Template Applied Successfully",
      description: `"${template.name}" template has been loaded with ${template.fields.length} fields.`,
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header Section with pill style matching other modules */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
              <Wrench className="h-4 w-4 mr-2" />
              Build
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Form Builder</h1>
              <p className="text-sm text-muted-foreground">Create and customize your forms</p>
            </div>
          </div>
          <div className="flex gap-3">
            <BrandedButton 
              variant="outline" 
              onClick={handleSaveForm}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </BrandedButton>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b bg-background px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent h-12">
            <TabsTrigger value="builder" className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
              <Wrench className="h-4 w-4" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="library" className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
              <BookOpen className="h-4 w-4" />
              Library
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {activeTab === 'builder' && (
          <div className="flex-1 grid grid-cols-12 gap-6 p-6">
            {/* Left Sidebar - Form Fields */}
            <div className="col-span-3 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Form Fields</h3>
                <p className="text-sm text-muted-foreground mb-4">Drag fields to the canvas to add them</p>
                <FieldPalette onAddField={onAddField} />
              </div>
            </div>

            {/* Center - Form Canvas */}
            <div className="col-span-6 space-y-6">
              {/* Form Title and Description */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="form-title" className="text-lg font-semibold">Form Title</Label>
                  <Input
                    id="form-title"
                    value={title || 'Untitled Form'}
                    onChange={(e) => onUpdateTitle(e.target.value)}
                    placeholder="Untitled Form"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="form-description" className="text-lg font-semibold">Form Description</Label>
                  <Textarea
                    id="form-description"
                    value={description}
                    onChange={(e) => onUpdateDescription(e.target.value)}
                    placeholder="Enter form description"
                    className="resize-none mt-2"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="categories">Categories</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select categories..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="survey">Survey</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="target-audience">Target Audience</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select audiences..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="internal">Internal</SelectItem>
                        <SelectItem value="external">External</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Fields/Files Tabs */}
              <div>
                <Tabs value={activeCanvasTab} onValueChange={setActiveCanvasTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-muted">
                    <TabsTrigger value="fields" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Fields
                    </TabsTrigger>
                    <TabsTrigger value="files" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Files
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="fields" className="mt-4">
                    <div className="min-h-[400px] border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                      {formFields.length === 0 ? (
                        <div className="text-center text-muted-foreground">
                          <div className="mb-4">
                            <h3 className="text-lg font-medium">No fields added yet</h3>
                            <p className="text-sm">Drag fields from the palette to start building your form</p>
                          </div>
                        </div>
                      ) : (
                        <FormCanvas
                          fields={formFields}
                          selectedField={selectedFieldId}
                          onSelectField={onSelectField}
                          onUpdateField={onUpdateField}
                          onRemoveField={onRemoveField}
                          onAddField={onAddField}
                          onReorderFields={() => {}}
                        />
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="files" className="mt-4">
                    <FileAttachmentManager
                      attachments={attachments}
                      onUpdateAttachments={onUpdateAttachments}
                      allowedTypes={['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png']}
                      maxSize={10}
                      readOnly={isPublished}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right Sidebar - Field Properties */}
            <div className="col-span-3">
              <div>
                <h3 className="text-lg font-semibold mb-4">Field Properties</h3>
                {selectedFieldId ? (
                  <FieldEditor
                    selectedField={formFields.find(f => f.id === selectedFieldId) || null}
                    onUpdateField={onUpdateField}
                  />
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <p>Select a field to edit its properties</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="flex-1 p-6">
            <FormLibrary onUseTemplate={handleUseTemplate} />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="flex-1 p-6">
            <FormPreview
              formTitle={title || 'Untitled Form'}
              formDescription={description}
              formFields={formFields}
              attachments={attachments}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 p-6 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Form Settings</h2>
                <p className="text-muted-foreground">Configure settings for this specific form</p>
              </div>

              {/* Basic Form Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-multiple">Allow Multiple Submissions</Label>
                      <p className="text-sm text-muted-foreground">Allow users to submit this form multiple times</p>
                    </div>
                    <Switch
                      id="allow-multiple"
                      checked={formSettings.allowMultipleSubmissions}
                      onCheckedChange={(checked) => setFormSettings({...formSettings, allowMultipleSubmissions: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="require-login">Require Login</Label>
                      <p className="text-sm text-muted-foreground">Users must be logged in to access this form</p>
                    </div>
                    <Switch
                      id="require-login"
                      checked={formSettings.requireLogin}
                      onCheckedChange={(checked) => setFormSettings({...formSettings, requireLogin: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-progress">Show Progress Bar</Label>
                      <p className="text-sm text-muted-foreground">Display progress indicator to users</p>
                    </div>
                    <Switch
                      id="show-progress"
                      checked={formSettings.showProgressBar}
                      onCheckedChange={(checked) => setFormSettings({...formSettings, showProgressBar: checked})}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Theme Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Theme & Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="theme">Form Theme</Label>
                    <Select value={formSettings.theme} onValueChange={(value) => setFormSettings({...formSettings, theme: value as any})}>
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inherit">Inherit Global Theme</SelectItem>
                        <SelectItem value="light">Light Theme</SelectItem>
                        <SelectItem value="dark">Dark Theme</SelectItem>
                        <SelectItem value="custom">Custom Theme</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Choose whether this form uses the global theme or has its own theme
                    </p>
                  </div>

                  {formSettings.theme === 'custom' && (
                    <div>
                      <Label htmlFor="custom-css">Custom CSS</Label>
                      <Textarea
                        id="custom-css"
                        value={formSettings.customCss}
                        onChange={(e) => setFormSettings({...formSettings, customCss: e.target.value})}
                        placeholder="Enter custom CSS rules for this form..."
                        className="mt-1 font-mono text-sm"
                        rows={8}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Add custom CSS to style this form specifically
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Scoring Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Scoring Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-scoring">Enable Scoring</Label>
                      <p className="text-sm text-muted-foreground">Enable scoring for this form</p>
                    </div>
                    <Switch
                      id="enable-scoring"
                      checked={formSettings.enableScoring}
                      onCheckedChange={(checked) => setFormSettings({...formSettings, enableScoring: checked})}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Approval Workflow */}
              <Card>
                <CardHeader>
                  <CardTitle>Approval Workflow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-approval">Enable Approval Workflow</Label>
                      <p className="text-sm text-muted-foreground">Require manual approval for submissions</p>
                    </div>
                    <Switch
                      id="enable-approval"
                      checked={formSettings.enableApprovalWorkflow}
                      onCheckedChange={(checked) => setFormSettings({...formSettings, enableApprovalWorkflow: checked})}
                    />
                  </div>

                  {formSettings.enableApprovalWorkflow && (
                    <>
                      <div>
                        <Label htmlFor="auto-approve-score">Auto-Approve Score Threshold</Label>
                        <Input
                          id="auto-approve-score"
                          type="number"
                          min="0"
                          max="100"
                          value={formSettings.autoApproveScore}
                          onChange={(e) => setFormSettings({...formSettings, autoApproveScore: parseInt(e.target.value)})}
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Submissions with scores above this threshold will be auto-approved
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="approvers">Approvers (one email per line)</Label>
                        <Textarea
                          id="approvers"
                          value={formSettings.approvers.join('\n')}
                          onChange={(e) => setFormSettings({...formSettings, approvers: e.target.value.split('\n').filter(email => email.trim())})}
                          placeholder="Enter approver emails..."
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Document Uploads */}
              <Card>
                <CardHeader>
                  <CardTitle>Document Uploads</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-documents">Enable Document Uploads</Label>
                      <p className="text-sm text-muted-foreground">Allow users to upload documents with this form</p>
                    </div>
                    <Switch
                      id="enable-documents"
                      checked={formSettings.enableDocumentUploads}
                      onCheckedChange={(checked) => setFormSettings({...formSettings, enableDocumentUploads: checked})}
                    />
                  </div>

                  {formSettings.enableDocumentUploads && (
                    <>
                      <div>
                        <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                        <Input
                          id="max-file-size"
                          type="number"
                          min="1"
                          max="100"
                          value={formSettings.maxFileSize}
                          onChange={(e) => setFormSettings({...formSettings, maxFileSize: parseInt(e.target.value)})}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label>Allowed File Types</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'txt', 'xlsx'].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={type}
                                checked={formSettings.allowedFileTypes.includes(type)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setFormSettings({...formSettings, allowedFileTypes: [...formSettings.allowedFileTypes, type]});
                                  } else {
                                    setFormSettings({...formSettings, allowedFileTypes: formSettings.allowedFileTypes.filter(t => t !== type)});
                                  }
                                }}
                                className="rounded"
                              />
                              <Label htmlFor={type} className="text-sm uppercase">
                                {type}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Form Expiration */}
              <Card>
                <CardHeader>
                  <CardTitle>Form Expiration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-expiration">Enable Form Expiration</Label>
                      <p className="text-sm text-muted-foreground">Set an expiration date for this form</p>
                    </div>
                    <Switch
                      id="enable-expiration"
                      checked={formSettings.enableExpiration}
                      onCheckedChange={(checked) => setFormSettings({...formSettings, enableExpiration: checked})}
                    />
                  </div>

                  {formSettings.enableExpiration && (
                    <>
                      <div>
                        <Label htmlFor="expiration-date">Expiration Date</Label>
                        <Input
                          id="expiration-date"
                          type="date"
                          value={formSettings.expirationDate}
                          onChange={(e) => setFormSettings({...formSettings, expirationDate: e.target.value})}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="expiration-message">Expiration Message</Label>
                        <Textarea
                          id="expiration-message"
                          value={formSettings.expirationMessage}
                          onChange={(e) => setFormSettings({...formSettings, expirationMessage: e.target.value})}
                          placeholder="Enter message to show when form is expired..."
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Email Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-email">Enable Email Distribution</Label>
                      <p className="text-sm text-muted-foreground">Send this form via email to recipients</p>
                    </div>
                    <Switch
                      id="enable-email"
                      checked={formSettings.enableEmailDistribution}
                      onCheckedChange={(checked) => setFormSettings({...formSettings, enableEmailDistribution: checked})}
                    />
                  </div>

                  {formSettings.enableEmailDistribution && (
                    <>
                      <div>
                        <Label htmlFor="email-recipients">Email Recipients (one per line)</Label>
                        <Textarea
                          id="email-recipients"
                          value={formSettings.emailRecipients.join('\n')}
                          onChange={(e) => setFormSettings({...formSettings, emailRecipients: e.target.value.split('\n').filter(email => email.trim())})}
                          placeholder="Enter recipient emails..."
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="reminder-enabled">Enable Reminders</Label>
                          <p className="text-sm text-muted-foreground">Send reminder emails to recipients</p>
                        </div>
                        <Switch
                          id="reminder-enabled"
                          checked={formSettings.reminderEnabled}
                          onCheckedChange={(checked) => setFormSettings({...formSettings, reminderEnabled: checked})}
                        />
                      </div>

                      {formSettings.reminderEnabled && (
                        <>
                          <div>
                            <Label htmlFor="reminder-interval">Reminder Interval (days)</Label>
                            <Input
                              id="reminder-interval"
                              type="number"
                              min="1"
                              value={formSettings.reminderInterval}
                              onChange={(e) => setFormSettings({...formSettings, reminderInterval: parseInt(e.target.value)})}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="max-reminders">Maximum Reminders</Label>
                            <Input
                              id="max-reminders"
                              type="number"
                              min="1"
                              max="10"
                              value={formSettings.maxReminders}
                              onChange={(e) => setFormSettings({...formSettings, maxReminders: parseInt(e.target.value)})}
                              className="mt-1"
                            />
                          </div>
                        </>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Save to Library Dialog */}
      <Dialog open={libraryDialogOpen} onOpenChange={setLibraryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Form to Library</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="library-name">Form Name</Label>
              <Input
                id="library-name"
                value={libraryFormName}
                onChange={(e) => setLibraryFormName(e.target.value)}
                placeholder="Enter form name"
              />
            </div>
            <div className="flex justify-end gap-2">
              <BrandedButton
                variant="outline"
                onClick={() => setLibraryDialogOpen(false)}
                brandVariant="outline"
              >
                Cancel
              </BrandedButton>
              <BrandedButton
                onClick={handleSaveToLibrary}
                disabled={!libraryFormName.trim()}
                brandVariant="primary"
              >
                Save to Library
              </BrandedButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
