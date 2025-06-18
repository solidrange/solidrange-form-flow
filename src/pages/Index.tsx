import { useState } from "react";
import { FormBuilder } from "@/components/FormBuilder";
import { FormPreview } from "@/components/FormPreview";
import { FormLibrary } from "@/components/FormLibrary";
import { Analytics } from "@/components/Analytics";
import { ScoringSettings } from "@/components/ScoringSettings";
import { WeightageEditor } from "@/components/WeightageEditor";
import { EmailTracking } from "@/components/EmailTracking";
import { SettingsPanel } from "@/components/SettingsPanel";
import { SubmissionReview } from "@/components/SubmissionReview";
import { ReportGeneration } from "@/components/ReportGeneration";
import { useFormStatus } from "@/hooks/useFormStatus";
import { 
  Settings, 
  BarChart3, 
  Library, 
  Plus, 
  Save, 
  Target, 
  Scale, 
  Mail, 
  FileCheck, 
  Eye,
  FileText,
  Wrench,
  BookOpen,
  ClipboardList,
  Send,
  ExternalLink,
  Code,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormField, FormTemplate, Form, EmailRecipient, DocumentAttachment } from "@/types/form";
import { toast } from "@/hooks/use-toast";
import { sampleSubmissions } from "@/data/sampleSubmissions";

const Index = () => {
  const [activeTab, setActiveTab] = useState("build-form");
  const [activeBuildTab, setActiveBuildTab] = useState("builder");
  
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [formAttachments, setFormAttachments] = useState<DocumentAttachment[]>([]);
  const [formCategory, setFormCategory] = useState<string>("");
  const [savedDrafts, setSavedDrafts] = useState<Form[]>([]);
  const [publishedForms, setPublishedForms] = useState<Form[]>([]);
  
  const { status, isPublished, isDraft, publishForm, setToDraft } = useFormStatus();
  
  const [formSettings, setFormSettings] = useState<Form['settings']>({
    allowMultipleSubmissions: false,
    requireLogin: false,
    showProgressBar: true,
    theme: 'light',
    scoring: {
      enabled: false,
      maxTotalPoints: 100,
      showScoreToUser: false,
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
      approvers: []
    },
    documents: {
      enabled: false,
      allowedTypes: ['pdf', 'doc', 'docx'],
      maxSize: 10,
      requiredDocuments: [],
      allowUserUploads: true
    }
  });

  const [submissions] = useState(sampleSubmissions);

  const addField = (field: FormField) => {
    setFormFields([...formFields, { ...field, id: Date.now().toString() }]);
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormFields(fields => 
      fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
  };

  const removeField = (fieldId: string) => {
    setFormFields(fields => fields.filter(field => field.id !== fieldId));
  };

  const reorderFields = (dragIndex: number, hoverIndex: number) => {
    const draggedField = formFields[dragIndex];
    const newFields = [...formFields];
    newFields.splice(dragIndex, 1);
    newFields.splice(hoverIndex, 0, draggedField);
    setFormFields(newFields);
  };

  const updateFormSettings = (updates: Partial<Form['settings']>) => {
    setFormSettings(prev => ({ ...prev, ...updates }));
  };

  const updateEmailRecipients = (recipients: EmailRecipient[]) => {
    setFormSettings(prev => ({
      ...prev,
      emailDistribution: {
        ...prev.emailDistribution!,
        recipients
      }
    }));
  };

  const updateEmailSettings = (emailSettings: {
    reminderEnabled: boolean;
    reminderIntervalDays: number;
    maxReminders: number;
  }) => {
    setFormSettings(prev => ({
      ...prev,
      emailDistribution: {
        ...prev.emailDistribution!,
        ...emailSettings
      }
    }));
  };

  const saveForm = () => {
    if (!formTitle.trim()) {
      toast({
        title: "Title Required",
        description: "Please add a title before saving the form.",
        variant: "destructive",
      });
      return;
    }

    const formData: Form = {
      id: Date.now().toString(),
      title: formTitle,
      description: formDescription,
      fields: formFields,
      settings: formSettings,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: status,
      submissions: 0,
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

    if (isDraft) {
      setSavedDrafts(prev => [...prev, formData]);
      toast({
        title: "Draft Saved",
        description: "Your form has been saved as a draft.",
      });
    } else {
      setPublishedForms(prev => [...prev, formData]);
      toast({
        title: "Form Saved",
        description: "Your published form has been saved.",
      });
    }
  };

  const handlePublishForm = () => {
    if (!formTitle.trim()) {
      toast({
        title: "Title Required",
        description: "Please add a title before publishing the form.",
        variant: "destructive",
      });
      return;
    }

    if (formFields.length === 0) {
      toast({
        title: "Fields Required",
        description: "Please add at least one field before publishing the form.",
        variant: "destructive",
      });
      return;
    }

    publishForm();
    
    // Save to published forms
    const formData: Form = {
      id: Date.now().toString(),
      title: formTitle,
      description: formDescription,
      fields: formFields,
      settings: formSettings,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'published',
      submissions: 0,
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
    
    setPublishedForms(prev => [...prev, formData]);
    
    toast({
      title: "Form Published",
      description: "Your form has been published successfully and can now receive email distributions.",
    });
  };

  const handleSaveToLibrary = () => {
    console.log("Saving form to library with category:", formCategory);
    // Implementation for saving to library would go here
  };

  const useTemplate = (template: FormTemplate) => {
    setFormTitle(template.name);
    setFormDescription(template.description);
    setFormCategory(template.category);
    const fieldsWithIds = template.fields.map(field => ({
      ...field,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }));
    setFormFields(fieldsWithIds);
    
    if (template.category === 'vendor-risk') {
      setFormSettings(prev => ({
        ...prev,
        scoring: {
          ...prev.scoring!,
          enabled: true,
          riskThresholds: {
            low: 80,
            medium: 60,
            high: 40
          }
        }
      }));
    }
    
    setActiveBuildTab("builder");
    toast({
      title: "Template Applied",
      description: `${template.name} template has been applied to your form.`,
    });
  };

  const generateFormUrl = (formId: string) => {
    return `${window.location.origin}/form/${formId}`;
  };

  const generateEmbedCode = (formId: string) => {
    const formUrl = generateFormUrl(formId);
    return `<iframe src="${formUrl}" width="100%" height="600" frameborder="0"></iframe>`;
  };

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  // Create tabs array based on form status
  const buildTabs = [
    { id: "builder", label: "Builder", icon: <Plus className="h-4 w-4" /> },
    { id: "library", label: "Library", icon: <Library className="h-4 w-4" /> },
    { id: "scoring", label: "Scoring", icon: <Target className="h-4 w-4" /> },
    { id: "weightage", label: "Weightage", icon: <Scale className="h-4 w-4" /> },
    { id: "preview", label: "Preview", icon: <Eye className="h-4 w-4" /> },
    { id: "drafts", label: "Drafts", icon: <FileText className="h-4 w-4" /> },
    { id: "published", label: "Published", icon: <BookOpen className="h-4 w-4" /> },
    ...(isPublished ? [{ id: "email", label: "Email", icon: <Mail className="h-4 w-4" /> }] : [])
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Solidrange Form Builder</h1>
            </div>
            
            {/* Form Status Display */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">Current Form:</span>
                <Badge 
                  variant={isDraft ? "secondary" : "default"}
                  className={isDraft ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}
                >
                  {isDraft ? "Draft" : "Published"}
                </Badge>
              </div>
              
              {isPublished && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Share Form
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Share Published Form</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Form URL</label>
                        <div className="flex gap-2 mt-1">
                          <Input 
                            value={generateFormUrl('current-form')} 
                            readOnly 
                            className="flex-1"
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCopyToClipboard(generateFormUrl('current-form'), 'Form URL')}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700">Embed Code</label>
                        <div className="flex gap-2 mt-1">
                          <textarea 
                            value={generateEmbedCode('current-form')} 
                            readOnly 
                            className="flex-1 min-h-[100px] p-2 border border-gray-300 rounded-md resize-none text-sm font-mono"
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCopyToClipboard(generateEmbedCode('current-form'), 'Embed code')}
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="build-form" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Build Form
            </TabsTrigger>
            <TabsTrigger value="review-submissions" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Review Submissions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="build-form" className="mt-6">
            <Tabs value={activeBuildTab} onValueChange={setActiveBuildTab} className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <TabsList className="grid w-auto" style={{ gridTemplateColumns: `repeat(${buildTabs.length}, minmax(0, 1fr))` }}>
                    {buildTabs.map((tab) => (
                      <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                        {tab.icon}
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button onClick={saveForm} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Form
                  </Button>
                  {isDraft && (
                    <Button onClick={handlePublishForm} className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Publish Form
                    </Button>
                  )}
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => setActiveBuildTab("settings")}>
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </div>

              <TabsContent value="builder" className="mt-4">
                <FormBuilder
                  formFields={formFields}
                  formTitle={formTitle}
                  formDescription={formDescription}
                  onAddField={addField}
                  onUpdateField={updateField}
                  onRemoveField={removeField}
                  onUpdateTitle={setFormTitle}
                  onUpdateDescription={setFormDescription}
                  onReorderFields={reorderFields}
                  attachments={formAttachments}
                  onUpdateAttachments={setFormAttachments}
                  allowedFileTypes={formSettings.documents?.allowedTypes || ['pdf', 'doc', 'docx']}
                  maxFileSize={formSettings.documents?.maxSize || 10}
                  formCategory={formCategory}
                  onCategoryChange={setFormCategory}
                  onSaveToLibrary={handleSaveToLibrary}
                  isPublished={isPublished}
                />
              </TabsContent>

              <TabsContent value="library" className="mt-4">
                <FormLibrary onUseTemplate={useTemplate} />
              </TabsContent>

              {isPublished && (
                <TabsContent value="email" className="mt-4">
                  <EmailTracking
                    recipients={formSettings.emailDistribution?.recipients || []}
                    onUpdateRecipients={updateEmailRecipients}
                    formTitle={formTitle}
                    reminderEnabled={formSettings.emailDistribution?.reminderEnabled || true}
                    reminderIntervalDays={formSettings.emailDistribution?.reminderIntervalDays || 7}
                    maxReminders={formSettings.emailDistribution?.maxReminders || 3}
                    onUpdateEmailSettings={updateEmailSettings}
                  />
                </TabsContent>
              )}

              <TabsContent value="scoring" className="mt-4">
                <ScoringSettings
                  formSettings={formSettings}
                  onUpdateSettings={updateFormSettings}
                />
              </TabsContent>

              <TabsContent value="weightage" className="mt-4">
                <WeightageEditor
                  fields={formFields}
                  onUpdateField={updateField}
                />
              </TabsContent>

              <TabsContent value="preview" className="mt-4">
                <FormPreview
                  formTitle={formTitle}
                  formDescription={formDescription}
                  formFields={formFields}
                  formSettings={formSettings}
                  attachments={formAttachments}
                />
              </TabsContent>

              <TabsContent value="drafts" className="mt-4">
                {savedDrafts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No draft forms available</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedDrafts.map((draft) => (
                      <Card key={draft.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-lg">{draft.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{draft.description || "No description"}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <p className="text-xs text-gray-500">
                                  Created: {draft.createdAt.toLocaleDateString()}
                                </p>
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                  Draft
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Load Draft
                              </Button>
                              <Button size="sm">
                                Publish
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="published" className="mt-4">
                {publishedForms.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No published forms available</p>
                    <p className="text-sm mt-2">Publish your first form to see it here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {publishedForms.map((form) => (
                      <Card key={form.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-lg">{form.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{form.description || "No description"}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <p className="text-xs text-gray-500">
                                  Published: {form.createdAt.toLocaleDateString()}
                                </p>
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  Published
                                </Badge>
                                <p className="text-xs text-gray-500">
                                  {form.submissions} submissions
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Globe className="h-4 w-4 mr-1" />
                                    Share
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Share Form: {form.title}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">Form URL</label>
                                      <div className="flex gap-2 mt-1">
                                        <Input value={generateFormUrl(form.id)} readOnly />
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleCopyToClipboard(generateFormUrl(form.id), 'Form URL')}
                                        >
                                          Copy
                                        </Button>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Embed Code</label>
                                      <div className="flex gap-2 mt-1">
                                        <textarea 
                                          value={generateEmbedCode(form.id)} 
                                          readOnly 
                                          className="flex-1 min-h-[80px] p-2 border rounded text-sm font-mono"
                                        />
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleCopyToClipboard(generateEmbedCode(form.id), 'Embed code')}
                                        >
                                          Copy
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button size="sm">
                                Manage
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="mt-4">
                <SettingsPanel
                  formSettings={formSettings}
                  onUpdateSettings={updateFormSettings}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="review-submissions" className="mt-6">
            <Tabs defaultValue="submissions" className="w-full">
              <TabsList className="grid w-auto grid-cols-3">
                <TabsTrigger value="submissions" className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4" />
                  Submissions
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Report Generation
                </TabsTrigger>
              </TabsList>

              <TabsContent value="submissions" className="mt-4">
                <SubmissionReview
                  submissions={submissions}
                  form={{
                    id: 'current-form',
                    title: formTitle,
                    description: formDescription,
                    fields: formFields,
                    settings: formSettings,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    status: status,
                    submissions: submissions.length,
                    analytics: {
                      views: 0,
                      submissions: submissions.length,
                      completionRate: 0,
                      emailsSent: 0,
                      emailsCompleted: 0,
                      averageCompletionTime: 0,
                      dropoffRate: 0
                    }
                  }}
                  onUpdateSubmission={(submissionId, updates) => {
                    console.log('Updating submission:', submissionId, updates);
                    toast({
                      title: "Submission Updated",
                      description: "The submission has been updated successfully.",
                    });
                  }}
                />
              </TabsContent>

              <TabsContent value="analytics" className="mt-4">
                <Analytics />
              </TabsContent>

              <TabsContent value="reports" className="mt-4">
                <ReportGeneration submissions={submissions} />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
