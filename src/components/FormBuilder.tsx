
import React, { useState } from 'react';
import { FormField, DocumentAttachment } from '@/types/form';
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
import { Save, Eye, Library, FileText, Palette, Settings, Upload, Plus } from 'lucide-react';
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
    theme: 'light',
    enableScoring: false,
    enableApprovalWorkflow: false,
    enableDocumentUploads: false,
    enableExpiration: false,
    enableEmailDistribution: false
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

  return (
    <div className="h-full flex flex-col">
      {/* Single Navigation Tabs Row */}
      <div className="border-b bg-background px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent h-12">
            <TabsTrigger value="builder" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Plus className="h-4 w-4" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="library" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Library className="h-4 w-4" />
              Library
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
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
            <div className="col-span-3">
              <FieldPalette onAddField={onAddField} />
            </div>

            {/* Center - Form Canvas */}
            <div className="col-span-6">
              <Card className="h-full">
                <CardHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="form-title">Form Title</Label>
                      <Input
                        id="form-title"
                        value={title || 'Untitled Form'}
                        onChange={(e) => onUpdateTitle(e.target.value)}
                        placeholder="Untitled Form"
                        className="font-semibold"
                      />
                    </div>
                    <div>
                      <Label htmlFor="form-description">Form Description</Label>
                      <Textarea
                        id="form-description"
                        value={description}
                        onChange={(e) => onUpdateDescription(e.target.value)}
                        placeholder="Enter form description"
                        className="resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="categories">Categories</Label>
                        <Select>
                          <SelectTrigger>
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
                          <SelectTrigger>
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
                </CardHeader>
                <CardContent className="flex-1">
                  <Tabs value={activeCanvasTab} onValueChange={setActiveCanvasTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
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
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Field Properties */}
            <div className="col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Field Properties</CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="flex-1 p-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Library</CardTitle>
                <p className="text-sm text-muted-foreground">Browse and manage your saved forms</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Form library will be available here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="flex-1 p-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Preview</CardTitle>
                <p className="text-sm text-muted-foreground">Preview how your form will look to users</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>Form preview will be available here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 p-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Basic Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Basic Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allow-multiple">Allow Multiple Submissions</Label>
                        <p className="text-sm text-muted-foreground">Allow users to submit the form multiple times</p>
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
                        <p className="text-sm text-muted-foreground">Users must be logged in to access the form</p>
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
                  </div>
                </div>

                {/* Theme & Appearance */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Theme & Appearance</h3>
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={formSettings.theme} onValueChange={(value) => setFormSettings({...formSettings, theme: value})}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Scoring Configuration */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Scoring Configuration</h3>
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
                </div>

                {/* Approval Workflow */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Approval Workflow</h3>
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
                </div>

                {/* Document Attachments */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Document Attachments</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-documents">Enable Document Uploads</Label>
                      <p className="text-sm text-muted-foreground">Allow users to upload documents</p>
                    </div>
                    <Switch
                      id="enable-documents"
                      checked={formSettings.enableDocumentUploads}
                      onCheckedChange={(checked) => setFormSettings({...formSettings, enableDocumentUploads: checked})}
                    />
                  </div>
                </div>

                {/* Expiration Settings */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Expiration Settings</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-expiration">Enable Expiration</Label>
                      <p className="text-sm text-muted-foreground">Set an expiration date for this form</p>
                    </div>
                    <Switch
                      id="enable-expiration"
                      checked={formSettings.enableExpiration}
                      onCheckedChange={(checked) => setFormSettings({...formSettings, enableExpiration: checked})}
                    />
                  </div>
                </div>

                {/* Email Distribution */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Distribution</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-email">Enable Email Distribution</Label>
                      <p className="text-sm text-muted-foreground">Distribute this form via email</p>
                    </div>
                    <Switch
                      id="enable-email"
                      checked={formSettings.enableEmailDistribution}
                      onCheckedChange={(checked) => setFormSettings({...formSettings, enableEmailDistribution: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
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
