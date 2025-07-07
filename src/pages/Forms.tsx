import { useState } from "react";
import { FormBuilder } from "@/components/FormBuilder";
import { FormPreview } from "@/components/FormPreview";
import { FormLibrary } from "@/components/FormLibrary";
import { FormInvitations } from "@/components/FormInvitations";
import { SettingsPanel } from "@/components/SettingsPanel";
import { useFormStatus } from "@/hooks/useFormStatus";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Save, Settings, Library, Eye, Mail, Wrench } from "lucide-react";
import { FormField, FormTemplate, Form, DocumentAttachment } from "@/types/form";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Forms() {
  const [activeTab, setActiveTab] = useState("builder");
  
  // Form state management
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [formAttachments, setFormAttachments] = useState<DocumentAttachment[]>([]);
  const [formCategory, setFormCategory] = useState<string | string[]>("");
  const [formTargetAudience, setFormTargetAudience] = useState<string | string[]>("");
  const [savedDrafts, setSavedDrafts] = useState<Form[]>([]);
  const [publishedForms, setPublishedForms] = useState<Form[]>([]);
  const [currentFormId, setCurrentFormId] = useState<string | null>(null);
  
  // Form status hook for managing published/draft state
  const { status, isPublished, isDraft, publishForm, setToDraft } = useFormStatus();
  
  // Form settings with comprehensive defaults
  const [formSettings, setFormSettings] = useState<Form['settings']>({
    allowMultipleSubmissions: false,
    requireLogin: false,
    showProgressBar: true,
    theme: 'light',
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

  /**
   * Add a new field to the current form
   */
  const addField = (field: FormField) => {
    setFormFields([...formFields, { ...field, id: Date.now().toString() }]);
  };

  /**
   * Update an existing field in the form
   */
  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormFields(fields => 
      fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
  };

  /**
   * Remove a field from the form
   */
  const removeField = (fieldId: string) => {
    setFormFields(fields => fields.filter(field => field.id !== fieldId));
  };

  /**
   * Reorder fields in the form using drag and drop
   */
  const reorderFields = (dragIndex: number, hoverIndex: number) => {
    const draggedField = formFields[dragIndex];
    const newFields = [...formFields];
    newFields.splice(dragIndex, 1);
    newFields.splice(hoverIndex, 0, draggedField);
    setFormFields(newFields);
  };

  /**
   * Update form settings with partial updates
   */
  const updateFormSettings = (updates: Partial<Form['settings']>) => {
    setFormSettings(prev => ({ ...prev, ...updates }));
  };

  /**
   * Create a new blank form and reset all state
   */
  const createNewForm = () => {
    setFormFields([]);
    setFormTitle("Untitled Form");
    setFormDescription("");
    setFormCategory("");
    setFormTargetAudience("");
    setFormAttachments([]);
    setCurrentFormId(null);
    setToDraft();
    setActiveTab("builder");
    toast({
      title: "New Form Created",
      description: "Started with a blank form.",
    });
  };

  /**
   * Save the current form as a draft
   */
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
      id: currentFormId || Date.now().toString(),
      title: formTitle,
      description: formDescription,
      fields: formFields,
      settings: formSettings,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
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

    if (currentFormId) {
      setSavedDrafts(prev => prev.map(draft => 
        draft.id === currentFormId ? formData : draft
      ));
    } else {
      setSavedDrafts(prev => [...prev, formData]);
      setCurrentFormId(formData.id);
    }
    
    setToDraft();
    
    toast({
      title: "Draft Saved",
      description: "Your form has been saved as a draft.",
    });
  };

  /**
   * Apply a template to the current form
   */
  const useTemplate = (template: FormTemplate) => {
    setFormTitle(template.name);
    setFormDescription(template.description);
    setFormCategory(template.category);
    setFormTargetAudience(template.targetAudience?.[0] || "");
    const fieldsWithIds = template.fields.map(field => ({
      ...field,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }));
    setFormFields(fieldsWithIds);
    
    // Enable scoring for vendor risk templates
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
    
    setActiveTab("builder");
    toast({
      title: "Template Applied",
      description: `${template.name} template has been applied to your form.`,
    });
  };

  /**
   * Check if current form is published
   */
  const currentFormIsPublished = () => {
    if (currentFormId) {
      const publishedForm = publishedForms.find(form => form.id === currentFormId);
      return !!publishedForm;
    }
    return isPublished;
  };

  /**
   * Get current form data for invitations
   */
  const getCurrentForm = (): Form | null => {
    if (currentFormId) {
      return publishedForms.find(form => form.id === currentFormId) || null;
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Form Builder</h1>
            <Badge variant={isDraft ? "secondary" : "default"}>
              {status}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={createNewForm} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Form
            </Button>
            <Button onClick={saveForm} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save to Draft
            </Button>
          </div>
        </div>
      </div>

      {/* Form Builder Content */}
      <div className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Library className="h-4 w-4" />
              Library
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            {currentFormIsPublished() && (
              <TabsTrigger value="invitations" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Invitations
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="builder" className="flex-1">
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
              formCategory={formCategory}
              formTargetAudience={formTargetAudience}
              onCategoryChange={setFormCategory}
              onTargetAudienceChange={setFormTargetAudience}
            />
          </TabsContent>

          <TabsContent value="library" className="flex-1">
            <FormLibrary onUseTemplate={useTemplate} />
          </TabsContent>

          <TabsContent value="preview" className="flex-1">
            <FormPreview
              formFields={formFields}
              formTitle={formTitle}
              formDescription={formDescription}
              formSettings={formSettings}
              attachments={formAttachments}
            />
          </TabsContent>

          <TabsContent value="settings" className="flex-1">
            <SettingsPanel
              form={{
                id: currentFormId || Date.now().toString(),
                title: formTitle,
                description: formDescription,
                fields: formFields,
                settings: formSettings,
                createdAt: new Date(),
                updatedAt: new Date(),
                status: isDraft ? 'draft' : 'published',
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
              }}
              onUpdate={(updatedForm) => {
                setFormTitle(updatedForm.title);
                setFormDescription(updatedForm.description);
                setFormFields(updatedForm.fields);
                setFormSettings(updatedForm.settings);
              }}
            />
          </TabsContent>

          {currentFormIsPublished() && (
            <TabsContent value="invitations" className="flex-1">
              <FormInvitations
                form={getCurrentForm()}
                onUpdateForm={(updates) => {
                  if (currentFormId) {
                    setPublishedForms(prev => prev.map(form => 
                      form.id === currentFormId ? { ...form, ...updates, updatedAt: new Date() } : form
                    ));
                  }
                }}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}