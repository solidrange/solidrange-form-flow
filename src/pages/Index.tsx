import { useState } from "react";
import { FormBuilder } from "@/components/FormBuilder";
import { FormPreview } from "@/components/FormPreview";
import { FormLibrary } from "@/components/FormLibrary";
import { FormManagementDialog } from "@/components/FormManagementDialog";
import Analytics from "@/components/Analytics";
import { SettingsPanel } from "@/components/SettingsPanel";
import { FormSettingsPanel } from "@/components/FormSettingsPanel";
import { SaveTemplateDialog } from "@/components/SaveTemplateDialog";
import { SaveOptionsDialog } from "@/components/SaveOptionsDialog";
import { SubmissionReview } from "@/components/SubmissionReview";
import { ReportGeneration } from "@/components/ReportGeneration";
import { AppSidebar } from "@/components/AppSidebar";
import { 
  Settings, 
  Plus, 
  Save, 
  Eye,
  FileText,
  BookOpen,
  ClipboardList,
  Send,
  ExternalLink,
  Code,
  Globe,
  Trash2,
  Edit,
  ArrowLeft,
  Mail,
  Folder
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FormField, FormTemplate, Form, EmailRecipient, DocumentAttachment } from "@/types/form";
import { toast } from "@/hooks/use-toast";
import { sampleSubmissions } from "@/data/sampleSubmissions";
import { addCustomTemplate, isTemplateNameExists } from "@/data/formTemplates";
import { BrandLogo } from "@/components/BrandLogo";
import { GlobalSettings } from "@/components/GlobalSettings";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

const Index = () => {
  const { t, isRTL } = useLanguage();
  
  // Tab navigation state
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeBuildTab, setActiveBuildTab] = useState("builder");
  const [submissionFilters, setSubmissionFilters] = useState<{
    status?: string;
    approvalType?: string;
    riskLevel?: string;
    audience?: string;
  }>({});
  
  // Form state management
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [formAttachments, setFormAttachments] = useState<DocumentAttachment[]>([]);
  const [formCategory, setFormCategory] = useState<string | string[]>("");
  const [formTargetAudience, setFormTargetAudience] = useState<string | string[]>("");
  const [formAudience, setFormAudience] = useState<string[]>([]);
  const [savedDrafts, setSavedDrafts] = useState<Form[]>([]);
  const [publishedForms, setPublishedForms] = useState<Form[]>([]);
  const [currentFormId, setCurrentFormId] = useState<string | null>(null);
  const [selectedFormForManagement, setSelectedFormForManagement] = useState<Form | null>(null);
  const [showSaveOptionsDialog, setShowSaveOptionsDialog] = useState(false);
  const [showSaveTemplateDialog, setShowSaveTemplateDialog] = useState(false);
  const [currentTemplateTags, setCurrentTemplateTags] = useState<string[]>([]);
  
  // Form settings with comprehensive defaults
  const [formSettings, setFormSettings] = useState<Form['settings']>({
    allowMultipleSubmissions: false,
    requireLogin: false,
    showProgressBar: true,
    theme: 'light',
    branding: {
      enabled: true,
      showLogo: true,
      showBrandColors: true,
      useGlobalBranding: true,  // Start with global branding by default
      brandName: 'FormFlow',
      logo: null,
      colors: {
        primary: {
          main: '208 100% 47%',
          light: '210 100% 70%',
          dark: '216 14% 20%'
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

  // Sample submissions for testing
  const [submissions] = useState(sampleSubmissions);

  /**
   * Get the current form's status
   */
  const getCurrentFormStatus = (): 'draft' | 'published' | null => {
    if (!currentFormId) return null;
    
    const draftForm = savedDrafts.find(form => form.id === currentFormId);
    if (draftForm) return 'draft';
    
    const publishedForm = publishedForms.find(form => form.id === currentFormId);
    if (publishedForm) return 'published';
    
    return null;
  };

  /**
   * Check if current form exists in published forms
   */
  const currentFormIsPublished = (): boolean => {
    if (!currentFormId) return false;
    return publishedForms.some(form => form.id === currentFormId);
  };

  /**
   * Check if current form is in draft state
   */
  const currentFormIsDraft = (): boolean => {
    if (!currentFormId) return true; // New forms are considered drafts
    return savedDrafts.some(form => form.id === currentFormId);
  };

  /**
   * Add a new field to the current form
   */
  const addField = (field: FormField) => {
    console.log('Index: Adding field:', field.id, field.label, field.type);
    // Don't override the field ID if it already exists (important for templates)
    const fieldToAdd = field.id ? field : { ...field, id: Date.now().toString() };
    setFormFields(prev => {
      const updated = [...prev, fieldToAdd];
      console.log('Index: Updated form fields count:', updated.length);
      return updated;
    });
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
   * Create a new blank form and navigate to builder
   */
  const createNewForm = () => {
    setFormFields([]);
    setFormTitle("Untitled Form");
    setFormDescription("");
    setFormCategory("");
    setFormTargetAudience("");
    setFormAudience([]);
    setFormAttachments([]);
    setFormSettings({
      allowMultipleSubmissions: false,
      requireLogin: false,
      showProgressBar: true,
      theme: 'light',
      branding: {
        enabled: true,
        showLogo: true,
        showBrandColors: true,
        useGlobalBranding: true,  // Start with global branding by default
        brandName: 'FormFlow',
        logo: null,
        colors: {
          primary: {
            main: '208 100% 47%',
            light: '210 100% 70%',
            dark: '216 14% 20%'
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
    setCurrentFormId(null);
    setActiveBuildTab("builder");
    
    // Navigate to build-form tab
    setActiveTab("build-form");
    
    toast({
      title: "New Form Created",
      description: "Started with a blank form.",
    });
  };

  /**
   * Load an existing form for editing
   */
  const loadForm = (form: Form) => {
    setFormFields(form.fields);
    setFormTitle(form.title);
    setFormDescription(form.description);
    setFormSettings(form.settings);
    setFormCategory(form.category || "");
    setFormTargetAudience(form.targetAudience?.[0] || "");
    setFormAttachments(form.attachments || []);
    setCurrentFormId(form.id);
    
    setActiveBuildTab("builder");
    setActiveTab("build-form");
    toast({
      title: "Form Loaded",
      description: `"${form.title}" has been loaded for editing.`,
    });
  };

  /**
   * Save the current form as a draft - now shows options dialog first
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

    // Show save options dialog instead of saving immediately
    setShowSaveOptionsDialog(true);
  };

  /**
   * Actually save the form as draft (called from save options dialog)
   */
  const handleSaveDraft = () => {
    const formId = currentFormId || Date.now().toString();
    const formData: Form = {
      id: formId,
      title: formTitle,
      description: formDescription,
      fields: formFields,
      settings: formSettings,
      category: typeof formCategory === 'string' ? formCategory : formCategory[0] || '',
      targetAudience: typeof formTargetAudience === 'string' ? [formTargetAudience] : formTargetAudience,
      attachments: formAttachments,
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
      // Update existing draft
      setSavedDrafts(prev => prev.map(draft => 
        draft.id === currentFormId ? formData : draft
      ));
    } else {
      // Create new draft and set current form ID
      setSavedDrafts(prev => [...prev, formData]);
      setCurrentFormId(formId);
    }
    
    setShowSaveOptionsDialog(false);
    
    toast({
      title: "Draft Saved",
      description: "Your form has been saved as a draft.",
    });
  };

  /**
   * Show template saving dialog and also save as draft (called from save options dialog)
   */
  const handleShowSaveAsTemplate = () => {
    // First save as draft
    handleSaveDraft();
    // Then show template dialog
    setTimeout(() => {
      setShowSaveTemplateDialog(true);
    }, 100);
  };

  /**
   * Publish a form from drafts or current form
   */
  const handlePublishForm = (formToPublish?: Form) => {
    const titleToCheck = formToPublish?.title || formTitle;
    const fieldsToCheck = formToPublish?.fields || formFields;

    if (!titleToCheck.trim()) {
      toast({
        title: "Title Required",
        description: "Please add a title before publishing the form.",
        variant: "destructive",
      });
      return;
    }

    if (fieldsToCheck.length === 0) {
      toast({
        title: "Fields Required",
        description: "Please add at least one field before publishing the form.",
        variant: "destructive",
      });
      return;
    }

    if (formToPublish) {
      // Publishing from drafts tab
      const publishedForm = { 
        ...formToPublish, 
        status: 'published' as const, 
        updatedAt: new Date() 
      };
      setPublishedForms(prev => [...prev, publishedForm]);
      setSavedDrafts(prev => prev.filter(draft => draft.id !== formToPublish.id));
    } else {
      // Publishing current form
      const formId = currentFormId || Date.now().toString();
      const formData: Form = {
        id: formId,
        title: formTitle,
        description: formDescription,
        fields: formFields,
        settings: formSettings,
        category: typeof formCategory === 'string' ? formCategory : formCategory[0] || '',
        targetAudience: typeof formTargetAudience === 'string' ? [formTargetAudience] : formTargetAudience,
        attachments: formAttachments,
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
      
      if (currentFormId) {
        // Remove from drafts if it was there and add to published
        setSavedDrafts(prev => prev.filter(draft => draft.id !== currentFormId));
        setPublishedForms(prev => [...prev.filter(form => form.id !== currentFormId), formData]);
      } else {
        setPublishedForms(prev => [...prev, formData]);
        setCurrentFormId(formId);
      }
      
      // After publishing, create a new blank form so user can continue building
      setTimeout(() => {
        createNewForm();
      }, 100);
    }
    
    toast({
      title: "Form Published",
      description: "Your form has been published successfully. You can now build a new form.",
    });
  };

  /**
   * Move a published form back to draft status
   */
  const handleMoveToDraft = (form?: Form) => {
    if (form) {
      // Moving from published tab
      const draftForm = { ...form, status: 'draft' as const, updatedAt: new Date() };
      setSavedDrafts(prev => [...prev, draftForm]);
      setPublishedForms(prev => prev.filter(published => published.id !== form.id));
      
      toast({
        title: "Moved to Draft",
        description: `"${form.title}" has been moved to drafts.`,
      });
    } else {
      // Moving current form to draft
      if (currentFormId) {
        const currentForm = publishedForms.find(f => f.id === currentFormId);
        if (currentForm) {
          const draftForm = { ...currentForm, status: 'draft' as const, updatedAt: new Date() };
          setSavedDrafts(prev => [...prev, draftForm]);
          setPublishedForms(prev => prev.filter(f => f.id !== currentFormId));
        }
      }
      
      toast({
        title: "Moved to Draft",
        description: "Current form has been moved to draft state and can now be edited.",
      });
    }
  };

  /**
   * Delete a draft form
   */
  const handleDeleteDraft = (draftId: string) => {
    setSavedDrafts(prev => prev.filter(draft => draft.id !== draftId));
    
    // If this is the current form, create a new one
    if (currentFormId === draftId) {
      createNewForm();
    }
    
    toast({
      title: "Draft Deleted",
      description: "The draft form has been deleted.",
    });
  };

  /**
   * Delete a published form
   */
  const handleDeletePublished = (formId: string) => {
    setPublishedForms(prev => prev.filter(form => form.id !== formId));
    
    // If this is the current form, create a new one
    if (currentFormId === formId) {
      createNewForm();
    }
    
    toast({
      title: "Published Form Deleted",
      description: "The published form has been deleted.",
    });
  };

  /**
   * Update a published form (used for invitations)
   */
  const updatePublishedForm = (formId: string, updates: Partial<Form>) => {
    setPublishedForms(prev => prev.map(form => 
      form.id === formId ? { ...form, ...updates, updatedAt: new Date() } : form
    ));
  };

  /**
   * Save form template to library
   */
  const handleSaveToLibrary = () => {
    console.log("Saving form to library with category:", formCategory);
    // Implementation for saving to library would go here
  };

  /**
   * Apply a template to the current form - FIXED VERSION
   */
  const useTemplate = (template: FormTemplate) => {
    console.log('Index: Applying template:', template.name);
    console.log('Index: Template category:', template.category);
    console.log('Index: Template sector:', template.sector);
    
    // Clear field selection first
    onSelectField(null);
    
    // Update form details
    setFormTitle(template.name);
    setFormDescription(template.description);
    
    // FIXED: Properly set category and sectors
    setFormCategory(template.category || "");
    if (template.sector) {
      const sectors = Array.isArray(template.sector) ? template.sector : [template.sector];
      setFormTargetAudience(sectors);
    } else {
      setFormTargetAudience([]);
    }
    
    // Set template tags for display
    setCurrentTemplateTags(template.tags || []);
    
    // Create template fields with unique IDs - ensure deep copy
    const templateFields = template.fields.map((field, index) => {
      const newField = {
        ...field,
        id: `template-${template.id}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        // Ensure options are properly copied if they exist
        ...(field.options && { options: [...field.options] }),
        // Ensure acceptedFileTypes are properly copied if they exist
        ...(field.acceptedFileTypes && { acceptedFileTypes: [...field.acceptedFileTypes] })
      };
      return newField;
    });
    
    console.log('Index: Clearing existing fields...');
    // Clear all existing fields first
    setFormFields([]);
    
    // Add template fields immediately
    console.log('Index: Adding template fields...');
    setFormFields(templateFields);
    
    // Reset to default settings with branding enabled and enable scoring for vendor-risk templates
    setFormSettings({
      allowMultipleSubmissions: false,
      requireLogin: false,
      showProgressBar: true,
      theme: 'light',
      branding: {
        enabled: true,
        showLogo: true,
        showBrandColors: true,
        useGlobalBranding: true,
        brandName: 'FormFlow',
        logo: null,
        colors: {
          primary: {
            main: '208 100% 47%',
            light: '210 100% 70%',
            dark: '216 14% 20%'
          },
          secondary: {
            main: '262 83% 58%',
            light: '262 83% 75%',
            dark: '262 83% 45%'
          }
        }
      },
      scoring: {
        enabled: template.category === 'vendor-risk',
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
    
    setActiveBuildTab("builder");
    setActiveTab("build-form");
    
    toast({
      title: "Template Applied",
      description: `${template.name} template has been applied to your form with category "${template.category}" and sectors.`,
    });
  };

  /**
   * Generate URLs and embed codes for sharing
   */
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

  /**
   * Get current form data for invitations
   */
  const getCurrentForm = (): Form | null => {
    if (currentFormId) {
      return publishedForms.find(form => form.id === currentFormId) || null;
    }
    return null;
  };

  /**
   * Handle filter navigation from dashboard to review section
   */
  const handleFilterSubmissions = (filters: {
    status?: string;
    approvalType?: string;
    riskLevel?: string;
    audience?: string;
  }) => {
    setSubmissionFilters(filters);
    setActiveTab("review-submissions");
  };

  // Create mobile-friendly tabs array for build section
  const buildTabs = [
    { id: "builder", label: "Builder", icon: <Plus className="h-4 w-4" />, mobileLabel: "Build" },
    { id: "library", label: "Library", icon: <Folder className="h-4 w-4" />, mobileLabel: "Lib" },
    { id: "preview", label: "Preview", icon: <Eye className="h-4 w-4" />, mobileLabel: "View" },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" />, mobileLabel: "Set" }
  ];

  /**
   * Handle saving current form as a template
   */
  const handleSaveAsTemplate = (templateData: Omit<FormTemplate, 'id'>) => {
    const templateWithFields: Omit<FormTemplate, 'id'> = {
      ...templateData,
      fields: formFields.map(field => ({
        ...field,
        id: field.id // Keep original field structure for templates
      })),
      category: typeof formCategory === 'string' ? formCategory : formCategory[0] || '',
      sector: typeof formTargetAudience === 'string' ? formTargetAudience : formTargetAudience
    };

    const savedTemplate = addCustomTemplate(templateWithFields);
    
    toast({
      title: "Template Saved",
      description: `"${savedTemplate.name}" has been added to your template library.`,
    });
  };

  // Check if there are unpublished drafts for notification dot
  const hasUnpublishedDrafts = savedDrafts.length > 0;

  // Fixed onSelectField function
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  
  const onSelectField = (fieldId: string | null) => {
    setSelectedFieldId(fieldId);
  };

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full ${isRTL ? 'rtl' : ''}`}>
        {/* Sidebar */}
        <AppSidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hasUnpublishedDrafts={hasUnpublishedDrafts}
        />

        {/* Main Content */}
        <SidebarInset className="flex-1">
          {/* Header */}
          <div className="bg-white border-b shadow-sm sticky top-0 z-40">
            <div className="flex items-center justify-between h-14 px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <div className="h-4 w-px bg-border" />
                <h1 className="font-semibold text-lg">{t(activeTab.replace('-', ''))}</h1>
              </div>
              
              {/* Quick Share Button for Published Forms */}
              {currentFormIsPublished() && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Globe className="h-4 w-4" />
                      Share
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Share Form</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Form URL</label>
                        <div className="flex gap-2 mt-1">
                          <Input 
                            value={`${window.location.origin}/form/${currentFormId || 'current-form'}`} 
                            readOnly 
                            className="flex-1 text-sm"
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/form/${currentFormId || 'current-form'}`);
                              toast({
                                title: "Copied!",
                                description: "Form URL copied to clipboard.",
                              });
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            {activeTab === "dashboard" && (
              <Analytics submissions={submissions} onFilterSubmissions={(filters) => {
                setSubmissionFilters(filters);
                setActiveTab("review-submissions");
              }} />
            )}

            {activeTab === "review-submissions" && (
              <Tabs defaultValue="submissions" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="submissions" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Submissions
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    Reports
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="submissions">
                  <SubmissionReview
                    submissions={submissions}
                    form={{
                      id: currentFormId || 'current-form',
                      title: formTitle,
                      description: formDescription,
                      fields: formFields,
                      settings: formSettings,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      status: getCurrentFormStatus() || 'draft',
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
                    initialFilters={submissionFilters}
                    onUpdateSubmission={(id, updates) => {
                      console.log('Updating submission:', id, updates);
                      toast({
                        title: "Submission Updated",
                        description: "The submission has been updated successfully.",
                      });
                    }}
                  />
                </TabsContent>

                <TabsContent value="reports">
                  <ReportGeneration submissions={submissions} />
                </TabsContent>
              </Tabs>
            )}

            {activeTab === "forms" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Forms</h2>
                    <p className="text-gray-600">Manage your draft and published forms</p>
                  </div>
                  <Button onClick={createNewForm} className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Form
                  </Button>
                </div>

                <Tabs defaultValue="drafts" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="drafts" className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Drafts ({savedDrafts.length})
                    </TabsTrigger>
                    <TabsTrigger value="published" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Published ({publishedForms.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="drafts" className="space-y-4">
                    {savedDrafts.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No draft forms</h3>
                        <p className="text-muted-foreground mb-4">Create a new form to get started</p>
                        <Button onClick={createNewForm} className="gap-2">
                          <Plus className="h-4 w-4" />
                          Create Form
                        </Button>
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {savedDrafts.map((draft) => (
                          <Card key={draft.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <CardTitle className="text-lg truncate">{draft.title}</CardTitle>
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {draft.description || "No description"}
                                  </p>
                                </div>
                                <Badge variant="secondary">Draft</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                <span>{draft.fields.length} fields</span>
                                <span>{new Date(draft.updatedAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => {
                                    loadForm(draft);
                                    setActiveTab("build-form");
                                  }}
                                  className="flex-1 gap-1"
                                >
                                  <Edit className="h-3 w-3" />
                                  Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handlePublishForm(draft)}
                                  className="flex-1 gap-1"
                                >
                                  <Globe className="h-3 w-3" />
                                  Publish
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="px-2">
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Draft</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{draft.title}"? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteDraft(draft.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="published" className="space-y-4">
                    {publishedForms.length === 0 ? (
                      <div className="text-center py-12">
                        <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No published forms</h3>
                        <p className="text-muted-foreground">Publish a form to make it available to respondents</p>
                      </div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {publishedForms.map((form) => (
                          <Card key={form.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <CardTitle className="text-lg truncate">{form.title}</CardTitle>
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {form.description || "No description"}
                                  </p>
                                </div>
                                <Badge variant="default">Published</Badge>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                <span>{form.submissions} submissions</span>
                                <span>{new Date(form.updatedAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                                      <ExternalLink className="h-3 w-3" />
                                      Share
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Share Form</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <div>
                                        <label className="text-sm font-medium">Form URL</label>
                                        <div className="flex gap-2 mt-1">
                                          <Input 
                                            value={generateFormUrl(form.id)} 
                                            readOnly 
                                            className="flex-1"
                                          />
                                          <Button 
                                            size="sm" 
                                            onClick={() => handleCopyToClipboard(generateFormUrl(form.id), "URL")}
                                          >
                                            Copy
                                          </Button>
                                        </div>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Embed Code</label>
                                        <div className="flex gap-2 mt-1">
                                          <Input 
                                            value={generateEmbedCode(form.id)} 
                                            readOnly 
                                            className="flex-1"
                                          />
                                          <Button 
                                            size="sm" 
                                            onClick={() => handleCopyToClipboard(generateEmbedCode(form.id), "Embed code")}
                                          >
                                            Copy
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setSelectedFormForManagement(form)}
                                  className="flex-1 gap-1"
                                >
                                  <Mail className="h-3 w-3" />
                                  Manage
                                </Button>

                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleMoveToDraft(form)}
                                  className="gap-1"
                                >
                                  <ArrowLeft className="h-3 w-3" />
                                  Draft
                                </Button>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="px-2">
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Published Form</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete "{form.title}"? This will permanently remove the form and all its submissions. This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeletePublished(form.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "build-form" && (
              <Tabs value={activeBuildTab} onValueChange={setActiveBuildTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  {buildTabs.map((tab) => (
                    <TabsTrigger 
                      key={tab.id} 
                      value={tab.id} 
                      className="flex items-center gap-2"
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="inline sm:hidden">{tab.mobileLabel}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="builder">
                  <FormBuilder
                    formFields={formFields}
                    onAddField={addField}
                    onUpdateField={updateField}
                    onRemoveField={removeField}
                    selectedFieldId={selectedFieldId}
                    onSelectField={onSelectField}
                    title={formTitle}
                    onUpdateTitle={setFormTitle}
                    description={formDescription}
                    onUpdateDescription={setFormDescription}
                    onSaveForm={saveForm}
                    onPreviewForm={() => {}}
                    attachments={formAttachments}
                    onUpdateAttachments={setFormAttachments}
                    onSaveToLibrary={handleSaveToLibrary}
                    isPublished={currentFormIsPublished()}
                    onMoveToDraft={() => handleMoveToDraft()}
                    formSettings={formSettings}
                    onUpdateFormSettings={updateFormSettings}
                    formCategory={formCategory}
                    onUpdateFormCategory={setFormCategory}
                    formTargetAudience={formTargetAudience}
                    onUpdateFormTargetAudience={setFormTargetAudience}
                    currentTemplateTags={currentTemplateTags}
                    formAudience={formAudience}
                    onUpdateFormAudience={setFormAudience}
                  />
                </TabsContent>

                <TabsContent value="library">
                  <FormLibrary 
                    onUseTemplate={useTemplate}
                  />
                </TabsContent>

                <TabsContent value="preview">
                  <FormPreview
                    formFields={formFields}
                    formTitle={formTitle}
                    formDescription={formDescription}
                    formSettings={formSettings}
                    attachments={formAttachments}
                  />
                </TabsContent>

                <TabsContent value="settings">
                  <FormSettingsPanel 
                    form={{
                      id: currentFormId || 'current-form',
                      title: formTitle,
                      description: formDescription,
                      fields: formFields,
                      settings: formSettings,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      status: getCurrentFormStatus() || 'draft',
                      submissions: 0,
                      category: typeof formCategory === 'string' ? formCategory : formCategory[0] || '',
                      targetAudience: typeof formTargetAudience === 'string' ? [formTargetAudience] : formTargetAudience,
                      attachments: formAttachments,
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
                    onUpdateForm={(updates) => {
                      if (updates.title !== undefined) {
                        setFormTitle(updates.title);
                      }
                      if (updates.description !== undefined) {
                        setFormDescription(updates.description);
                      }
                      if (updates.settings !== undefined) {
                        updateFormSettings(updates.settings);
                      }
                    }} 
                    isPublished={currentFormIsPublished()}
                  />
                </TabsContent>
              </Tabs>
            )}

            {activeTab === "global-settings" && (
              <GlobalSettings />
            )}
          </div>
        </SidebarInset>

        {/* Save Options Dialog */}
        {showSaveOptionsDialog && (
          <SaveOptionsDialog
            isOpen={showSaveOptionsDialog}
            onClose={() => setShowSaveOptionsDialog(false)}
            onSaveDraft={handleSaveDraft}
            onSaveAsTemplate={handleShowSaveAsTemplate}
            formTitle={formTitle}
          />
        )}

        {/* Save Template Dialog */}
        {showSaveTemplateDialog && (
          <SaveTemplateDialog
            isOpen={showSaveTemplateDialog}
            onClose={() => setShowSaveTemplateDialog(false)}
            onSave={handleSaveAsTemplate}
            currentTemplate={{
              name: formTitle,
              description: formDescription,
              category: typeof formCategory === 'string' ? formCategory : formCategory[0] || '',
              sector: formTargetAudience
            }}
            originalTags={currentTemplateTags}
          />
        )}

        {/* Form Management Dialog */}
        {selectedFormForManagement && (
          <FormManagementDialog
            form={selectedFormForManagement}
            isOpen={!!selectedFormForManagement}
            onClose={() => setSelectedFormForManagement(null)}
            onUpdateForm={(updates) => updatePublishedForm(selectedFormForManagement.id, updates)}
            generateFormUrl={generateFormUrl}
            generateEmbedCode={generateEmbedCode}
          />
        )}
      </div>
    </SidebarProvider>
  );
};

export default Index;
