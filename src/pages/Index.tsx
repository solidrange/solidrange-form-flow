import { useState } from "react";
import { FormBuilder } from "@/components/FormBuilder";
import { FormPreview } from "@/components/FormPreview";
import { FormLibrary } from "@/components/FormLibrary";
import { FormInvitations } from "@/components/FormInvitations";
import Analytics from "@/components/Analytics";
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
  Globe,
  Trash2,
  Edit,
  ArrowLeft,
  User,
  Zap,
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

const Index = () => {
  // Tab navigation state
  const [activeTab, setActiveTab] = useState("build-form");
  const [activeBuildTab, setActiveBuildTab] = useState("builder");
  const [submissionFilters, setSubmissionFilters] = useState<{
    status?: string;
    approvalType?: string;
    riskLevel?: string;
    submissionType?: string;
  }>({});
  
  // Form state management
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");
  const [formAttachments, setFormAttachments] = useState<DocumentAttachment[]>([]);
  const [formCategory, setFormCategory] = useState<string>("");
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

  // Sample submissions for testing
  const [submissions] = useState(sampleSubmissions);

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
    setFormAttachments([]);
    setCurrentFormId(null);
    setToDraft();
    setActiveBuildTab("builder");
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
    setCurrentFormId(form.id);
    
    // Set appropriate form status
    if (form.status === 'published') {
      publishForm();
    } else {
      setToDraft();
    }
    
    setActiveBuildTab("builder");
    toast({
      title: "Form Loaded",
      description: `"${form.title}" has been loaded for editing.`,
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
      status: 'draft', // Always save as draft
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
      // Create new draft
      setSavedDrafts(prev => [...prev, formData]);
      setCurrentFormId(formData.id);
    }
    
    setToDraft(); // Ensure we're in draft mode
    
    toast({
      title: "Draft Saved",
      description: "Your form has been saved as a draft.",
    });
  };

  /**
   * Publish a form from drafts
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
      publishForm();
      const formData: Form = {
        id: currentFormId || Date.now().toString(),
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
      
      if (currentFormId) {
        // Remove from drafts if it was there and add to published
        setSavedDrafts(prev => prev.filter(draft => draft.id !== currentFormId));
        setPublishedForms(prev => [...prev.filter(form => form.id !== currentFormId), formData]);
      } else {
        setPublishedForms(prev => [...prev, formData]);
        setCurrentFormId(formData.id);
      }
    }
    
    toast({
      title: "Form Published",
      description: "Your form has been published successfully and is now available for invitations.",
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
      setToDraft();
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
   * Apply a template to the current form
   */
  const useTemplate = (template: FormTemplate) => {
    setFormTitle(template.name);
    setFormDescription(template.description);
    setFormCategory(template.category);
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
    
    setActiveBuildTab("builder");
    toast({
      title: "Template Applied",
      description: `${template.name} template has been applied to your form.`,
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

  /**
   * Handle filter navigation from dashboard to review section
   */
  const handleFilterSubmissions = (filters: {
    status?: string;
    approvalType?: string;
    riskLevel?: string;
    submissionType?: string;
  }) => {
    setSubmissionFilters(filters);
    setActiveTab("review-submissions");
  };

  // Create mobile-friendly tabs array for build section
  const buildTabs = [
    { id: "builder", label: "Builder", icon: <Plus className="h-4 w-4" />, mobileLabel: "Build" },
    { id: "library", label: "Library", icon: <Library className="h-4 w-4" />, mobileLabel: "Lib" },
    { id: "preview", label: "Preview", icon: <Eye className="h-4 w-4" />, mobileLabel: "View" },
    ...(currentFormIsPublished() ? [{ id: "invitations", label: "Invitations", icon: <Mail className="h-4 w-4" />, mobileLabel: "Mail" }] : [])
  ];

  // Check if there are unpublished drafts for notification dot
  const hasUnpublishedDrafts = savedDrafts.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo - Responsive */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">SF</span>
              </div>
              <h1 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 truncate">
                <span className="hidden sm:inline">Solidrange Form Builder</span>
                <span className="sm:hidden">Form Builder</span>
              </h1>
            </div>
            
            
            {/* Quick Share Button for Published Forms */}
            {currentFormIsPublished() && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="p-2 sm:px-3">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline ml-1">Share</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl mx-2">
                  <DialogHeader>
                    <DialogTitle className="text-lg">Share Form</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Form URL</label>
                      <div className="flex gap-2 mt-1">
                        <Input 
                          value={generateFormUrl(currentFormId || 'current-form')} 
                          readOnly 
                          className="flex-1 text-sm"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopyToClipboard(generateFormUrl(currentFormId || 'current-form'), 'Form URL')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Embed Code</label>
                      <div className="flex gap-2 mt-1">
                        <textarea 
                          value={generateEmbedCode(currentFormId || 'current-form')} 
                          readOnly 
                          className="flex-1 min-h-[80px] p-2 border border-gray-300 rounded-md resize-none text-xs font-mono"
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopyToClipboard(generateEmbedCode(currentFormId || 'current-form'), 'Embed code')}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Main Tabs - Mobile Responsive */}
          <TabsList className="grid w-full grid-cols-4 mb-3 sm:mb-4 h-10 sm:h-11">
            <TabsTrigger value="dashboard" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="review-submissions" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <ClipboardList className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Review</span>
            </TabsTrigger>
            <TabsTrigger value="forms" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm relative">
              <Folder className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Forms</span>
              {hasUnpublishedDrafts && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </TabsTrigger>
            <TabsTrigger value="build-form" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <Wrench className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Build</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Section */}
          <TabsContent value="dashboard" className="mt-3 sm:mt-6">
            <Analytics submissions={submissions} onFilterSubmissions={handleFilterSubmissions} />
          </TabsContent>

          {/* Review Submissions Section */}
          <TabsContent value="review-submissions" className="mt-3 sm:mt-6">
            <Tabs defaultValue="submissions" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10 mb-3 sm:mb-4">
                <TabsTrigger value="submissions" className="flex items-center gap-1 text-xs sm:text-sm">
                  <FileCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Submissions</span>
                  <span className="sm:hidden">Sub</span>
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-1 text-xs sm:text-sm">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Reports</span>
                  <span className="sm:hidden">Rep</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="submissions" className="mt-3 sm:mt-4">
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
                  initialFilters={submissionFilters}
                  onUpdateSubmission={(id, updates) => {
                    // Handle submission updates
                    console.log('Updating submission:', id, updates);
                    toast({
                      title: "Submission Updated",
                      description: "The submission has been updated successfully.",
                    });
                  }}
                />
              </TabsContent>

              <TabsContent value="reports" className="mt-3 sm:mt-4">
                <ReportGeneration submissions={submissions} />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Forms Section */}
          <TabsContent value="forms" className="mt-3 sm:mt-6">
            <Tabs defaultValue="drafts" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-9 sm:h-10 mb-3 sm:mb-4">
                <TabsTrigger value="drafts" className="flex items-center gap-1 text-xs sm:text-sm">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Drafts</span>
                  <span className="sm:hidden">Draft</span>
                  {savedDrafts.length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">{savedDrafts.length}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="published" className="flex items-center gap-1 text-xs sm:text-sm">
                  <FileCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Published</span>
                  <span className="sm:hidden">Pub</span>
                  {publishedForms.length > 0 && (
                    <Badge variant="secondary" className="ml-1 text-xs">{publishedForms.length}</Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="drafts" className="mt-3 sm:mt-4">
                {savedDrafts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm">No draft forms available</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {savedDrafts.map((draft) => (
                      <Card key={draft.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm sm:text-lg truncate">{draft.title}</h3>
                              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{draft.description || "No description"}</p>
                              <div className="flex items-center gap-2 sm:gap-4 mt-2">
                                <p className="text-xs text-gray-500">
                                  {draft.createdAt.toLocaleDateString()}
                                </p>
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                                  Draft
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  loadForm(draft);
                                  setActiveTab("build-form");
                                }}
                                className="text-xs px-2 py-1"
                              >
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline ml-1">Load</span>
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handlePublishForm(draft)}
                                className="text-xs px-2 py-1"
                              >
                                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline ml-1">Publish</span>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="destructive" className="text-xs px-2 py-1">
                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="mx-2">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-lg">Delete Draft</AlertDialogTitle>
                                    <AlertDialogDescription className="text-sm">
                                      Are you sure you want to delete "{draft.title}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="text-sm">Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteDraft(draft.id)}
                                      className="bg-red-600 hover:bg-red-700 text-sm"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="published" className="mt-3 sm:mt-4">
                {publishedForms.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-sm">No published forms available</p>
                    <p className="text-xs mt-2">Publish your first form to see it here</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {publishedForms.map((form) => (
                      <Card key={form.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm sm:text-lg truncate">{form.title}</h3>
                              <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{form.description || "No description"}</p>
                              <div className="flex items-center gap-2 sm:gap-4 mt-2">
                                <p className="text-xs text-gray-500">
                                  {form.createdAt.toLocaleDateString()}
                                </p>
                                <Badge variant="default" className="bg-green-100 text-green-800 text-xs">
                                  Published
                                </Badge>
                                <p className="text-xs text-gray-500">
                                  {form.submissions} submissions
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-1 sm:gap-2 shrink-0 overflow-x-auto">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  loadForm(form);
                                  setActiveTab("build-form");
                                }}
                                className="text-xs px-2 py-1 whitespace-nowrap"
                              >
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline ml-1">Load</span>
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline" className="text-xs px-2 py-1 whitespace-nowrap">
                                    <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span className="hidden sm:inline ml-1">Share</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="mx-2">
                                  <DialogHeader>
                                    <DialogTitle className="text-lg">Share: {form.title}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium">Form URL</label>
                                      <div className="flex gap-2 mt-1">
                                        <Input value={generateFormUrl(form.id)} readOnly className="text-xs" />
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          onClick={() => handleCopyToClipboard(generateFormUrl(form.id), 'Form URL')}
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
                                onClick={() => handleMoveToDraft(form)}
                                className="text-xs px-2 py-1 whitespace-nowrap"
                              >
                                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="hidden sm:inline ml-1">Draft</span>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="destructive" className="text-xs px-2 py-1">
                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="mx-2">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-lg">Delete Published Form</AlertDialogTitle>
                                    <AlertDialogDescription className="text-sm">
                                      Are you sure you want to delete "{form.title}"? This will remove the form and all its data permanently.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel className="text-sm">Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeletePublished(form.id)}
                                      className="bg-red-600 hover:bg-red-700 text-sm"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Build Form Section */}
          <TabsContent value="build-form" className="mt-3 sm:mt-6">
            <Tabs value={activeBuildTab} onValueChange={setActiveBuildTab} className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3">
                {/* Build Tabs - Horizontal Scroll on Mobile */}
                <div className="overflow-x-auto">
                  <TabsList className="flex w-max sm:w-auto min-w-full sm:min-w-0 h-9 sm:h-10 p-1">
                    {buildTabs.map((tab) => (
                      <TabsTrigger 
                        key={tab.id} 
                        value={tab.id} 
                        className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm whitespace-nowrap"
                      >
                        {tab.icon}
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.mobileLabel}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {/* Action Buttons - Stack on Mobile */}
                <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
                  <Button onClick={saveForm} className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-3 py-2 whitespace-nowrap">
                    <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Save to Draft</span>
                    <span className="sm:hidden">Save</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-3 py-2 whitespace-nowrap" onClick={() => setActiveBuildTab("settings")}>
                    <Settings className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Settings</span>
                    <span className="sm:hidden">Config</span>
                  </Button>
                </div>
              </div>

              {/* Tab Contents */}
              <TabsContent value="builder" className="mt-3 sm:mt-4">
                {/* Status and New Button - moved from header */}
                <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">Status:</span>
                      <Badge 
                        variant={isDraft ? "secondary" : "default"}
                        className={`text-xs px-2 py-1 ${isDraft ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                      >
                        {isDraft ? "Draft" : "Live"}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button onClick={createNewForm} variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    <span>New Form</span>
                  </Button>
                </div>
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
                  isPublished={currentFormIsPublished()}
                  onMoveToDraft={() => handleMoveToDraft()}
                />
              </TabsContent>

              <TabsContent value="library" className="mt-3 sm:mt-4">
                <FormLibrary onUseTemplate={useTemplate} />
              </TabsContent>

              {currentFormIsPublished() && (
                <TabsContent value="invitations" className="mt-3 sm:mt-4">
                  {getCurrentForm() ? (
                    <FormInvitations
                      form={getCurrentForm()!}
                      onUpdateForm={(updates) => updatePublishedForm(getCurrentForm()!.id, updates)}
                    />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-sm">No published form selected</p>
                    </div>
                  )}
                </TabsContent>
              )}

              <TabsContent value="preview" className="mt-3 sm:mt-4">
                <FormPreview
                  formTitle={formTitle}
                  formDescription={formDescription}
                  formFields={formFields}
                  formSettings={formSettings}
                  attachments={formAttachments}
                />
              </TabsContent>

              <TabsContent value="settings" className="mt-3 sm:mt-4">
                <SettingsPanel
                  form={{
                    id: currentFormId || Date.now().toString(),
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
                  }}
                  onUpdate={(updatedForm) => {
                    setFormSettings(updatedForm.settings);
                    if (updatedForm.title !== formTitle) setFormTitle(updatedForm.title);
                    if (updatedForm.description !== formDescription) setFormDescription(updatedForm.description);
                  }}
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default Index;
