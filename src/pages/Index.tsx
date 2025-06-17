
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
import { FormCategoryManager } from "@/components/FormCategoryManager";
import { 
  Settings, 
  BarChart3, 
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
  FolderPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [formStatus, setFormStatus] = useState<'draft' | 'published'>('draft');
  const [formCategory, setFormCategory] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('');
  
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
    console.log("Saving form:", { 
      formTitle, 
      formDescription, 
      formFields, 
      formSettings, 
      attachments: formAttachments,
      status: formStatus,
      category: formCategory || customCategory
    });
    toast({
      title: "Form Saved",
      description: "Your form has been saved successfully.",
    });
  };

  const publishForm = () => {
    if (formFields.length === 0) {
      toast({
        title: "Cannot Publish",
        description: "Please add at least one field before publishing.",
        variant: "destructive"
      });
      return;
    }
    
    setFormStatus('published');
    saveForm();
    toast({
      title: "Form Published",
      description: "Your form is now live and ready to receive submissions.",
    });
  };

  const useTemplate = (template: FormTemplate) => {
    setFormTitle(template.name);
    setFormDescription(template.description);
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
    
    toast({
      title: "Template Applied",
      description: `${template.name} template has been applied to your form.`,
    });
  };

  const handleCategoryUpdate = (category: string, isCustom: boolean = false) => {
    if (isCustom) {
      setCustomCategory(category);
      setFormCategory('');
    } else {
      setFormCategory(category);
      setCustomCategory('');
    }
  };

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
                <TabsList className="grid w-auto grid-cols-6">
                  <TabsTrigger value="builder" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Builder
                  </TabsTrigger>
                  <TabsTrigger value="scoring" className="flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Scoring
                  </TabsTrigger>
                  <TabsTrigger value="weightage" className="flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    Weightage
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="category" className="flex items-center gap-2">
                    <FolderPlus className="h-4 w-4" />
                    Category
                  </TabsTrigger>
                  {formStatus === 'published' && (
                    <TabsTrigger value="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </TabsTrigger>
                  )}
                </TabsList>
                
                <div className="flex items-center gap-3">
                  <Button onClick={saveForm} variant="outline" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button onClick={publishForm} className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Publish Form
                  </Button>
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
                  onUseTemplate={useTemplate}
                />
              </TabsContent>

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

              <TabsContent value="category" className="mt-4">
                <FormCategoryManager
                  currentCategory={formCategory}
                  customCategory={customCategory}
                  onCategoryUpdate={handleCategoryUpdate}
                  formTitle={formTitle}
                />
              </TabsContent>

              {formStatus === 'published' && (
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
                    status: formStatus,
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
