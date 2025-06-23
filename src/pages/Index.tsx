
import React, { useState } from "react";
import { Form, FormField, FormSubmission } from "@/types/form";
import { FormBuilder } from "@/components/FormBuilder";
import { FormPreview } from "@/components/FormPreview";
import { SubmissionsList } from "@/components/submissions/SubmissionsList";
import { ReportGeneration } from "@/components/ReportGeneration";
import { FormInvitations } from "@/components/FormInvitations";
import { SettingsPanel } from "@/components/SettingsPanel";
import { FormLibrary } from "@/components/FormLibrary";
import { Analytics } from "@/components/Analytics";
import { FormTable } from "@/components/FormTable";
import { FormDetails } from "@/components/FormDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { 
  Plus, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  Eye,
  Edit,
  Send,
  Mail
} from "lucide-react";

const mockForms: Form[] = [
  {
    id: "form-001",
    title: "Vendor Onboarding Form",
    description: "Complete this form to begin the vendor onboarding process",
    fields: [
      {
        id: "field-001",
        type: "text",
        label: "Company Name",
        required: true,
        placeholder: "Enter your company name"
      },
      {
        id: "field-002", 
        type: "email",
        label: "Contact Email",
        required: true,
        placeholder: "contact@company.com"
      },
      {
        id: "field-003",
        type: "select",
        label: "Business Type",
        required: true,
        options: ["Technology", "Manufacturing", "Services", "Retail"]
      }
    ],
    settings: {
      allowMultipleSubmissions: false,
      requireLogin: false,
      showProgressBar: true,
      theme: 'light',
      scoring: {
        enabled: true,
        maxTotalPoints: 100,
        showScoreToUser: true,
        passingScore: 70,
        riskThresholds: {
          low: 30,
          medium: 60,
          high: 90
        }
      },
      emailDistribution: {
        enabled: true,
        recipients: [
          {
            id: "rec-001",
            email: "vendor1@example.com",
            name: "Acme Corp",
            status: 'sent',
            remindersSent: 1,
            sentAt: new Date('2024-01-15')
          },
          {
            id: "rec-002", 
            email: "vendor2@example.com",
            name: "Tech Solutions",
            status: 'completed',
            remindersSent: 0,
            sentAt: new Date('2024-01-14'),
            completedAt: new Date('2024-01-16')
          }
        ],
        reminderEnabled: true,
        reminderIntervalDays: 7,
        maxReminders: 3
      }
    },
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15"),
    status: "published",
    submissions: [],
    analytics: {
      views: 245,
      submissions: 23,
      completionRate: 87,
      emailsSent: 45,
      emailsCompleted: 23,
      averageCompletionTime: 12,
      dropoffRate: 13
    }
  },
  {
    id: "form-002",
    title: "Employee Survey",
    description: "Annual employee satisfaction survey",
    fields: [
      {
        id: "field-004",
        type: "radio",
        label: "Overall Satisfaction",
        required: true,
        options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]
      }
    ],
    settings: {
      allowMultipleSubmissions: true,
      requireLogin: true,
      showProgressBar: false,
      theme: 'light',
      emailDistribution: {
        enabled: false,
        recipients: [],
        reminderEnabled: false,
        reminderIntervalDays: 7,
        maxReminders: 3
      }
    },
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    status: "draft",
    submissions: [],
    analytics: {
      views: 0,
      submissions: 0,
      completionRate: 0,
      emailsSent: 0,
      emailsCompleted: 0,
      averageCompletionTime: 0,
      dropoffRate: 0
    }
  }
];

const mockSubmissions: FormSubmission[] = [
  {
    id: "sub-001",
    formId: "form-001",
    submittedAt: new Date("2024-01-15T10:30:00"),
    submittedBy: "vendor-001",
    submitterEmail: "john.doe@acmecorp.com",
    submitterName: "John Doe",
    companyName: "ACME Corporation",
    recipientId: "vendor-001",
    submissionType: "vendor",
    status: "under_review",
    completionPercentage: 95,
    timeSpent: 25,
    score: {
      total: 85,
      maxTotal: 100,
      percentage: 85,
      riskLevel: "medium",
      riskScore: 65,
      reviewedBy: "Sarah Wilson",
      reviewedAt: new Date("2024-01-16T09:15:00"),
      reviewComments: "Good overall compliance, minor issues with documentation.",
      categoryScores: {
        "Security": 90,
        "Compliance": 80,
        "Financial": 85
      }
    },
    responses: {
      "company-name": "ACME Corporation",
      "business-type": "Technology Services",
      "annual-revenue": "$10M - $50M"
    },
    activityLog: [
      {
        id: "activity-001",
        action: "under_review",
        comments: "Starting initial review process",
        reviewedBy: "Sarah Wilson",
        reviewedAt: new Date("2024-01-16T09:15:00"),
        metadata: {
          urgency: "medium"
        }
      }
    ]
  }
];

export default function Index() {
  const [forms, setForms] = useState<Form[]>(mockForms);
  const [submissions, setSubmissions] = useState<FormSubmission[]>(mockSubmissions);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLibrary, setShowLibrary] = useState(false);

  const createNewForm = () => {
    const newForm: Form = {
      id: `form-${Date.now()}`,
      title: "New Form",
      description: "Form description",
      fields: [],
      settings: {
        allowMultipleSubmissions: false,
        requireLogin: false,
        showProgressBar: true,
        theme: 'light',
        emailDistribution: {
          enabled: false,
          recipients: [],
          reminderEnabled: false,
          reminderIntervalDays: 7,
          maxReminders: 3
        }
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "draft",
      submissions: [],
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

    setForms([...forms, newForm]);
    setSelectedForm(newForm);
    setActiveTab('builder');
    
    toast({
      title: "New Form Created",
      description: "Your new form is ready to be configured.",
    });
  };

  const publishForm = (form: Form) => {
    if (form.fields.length === 0) {
      toast({
        title: "Cannot Publish",
        description: "Please add at least one field before publishing.",
        variant: "destructive",
      });
      return;
    }

    if (!form.title.trim()) {
      toast({
        title: "Cannot Publish",
        description: "Please add a form title before publishing.",
        variant: "destructive",
      });
      return;
    }

    const updatedForm = { ...form, status: 'published' as const, updatedAt: new Date() };
    setForms(forms.map(f => f.id === form.id ? updatedForm : f));
    if (selectedForm?.id === form.id) {
      setSelectedForm(updatedForm);
    }
    
    toast({
      title: "Form Published",
      description: "Your form is now live and can receive submissions.",
    });
  };

  const unpublishForm = (form: Form) => {
    const updatedForm = { ...form, status: 'draft' as const, updatedAt: new Date() };
    setForms(forms.map(f => f.id === form.id ? updatedForm : f));
    if (selectedForm?.id === form.id) {
      setSelectedForm(updatedForm);
    }
    
    toast({
      title: "Form Unpublished",
      description: "Your form is now in draft mode.",
    });
  };

  const deleteForm = (formId: string) => {
    setForms(forms.filter(f => f.id !== formId));
    if (selectedForm?.id === formId) {
      setSelectedForm(null);
      setActiveTab('dashboard');
    }
    
    toast({
      title: "Form Deleted",
      description: "The form has been permanently deleted.",
    });
  };

  const getTabsForForm = (form: Form) => {
    const baseTabs = [
      { value: 'builder', label: 'Builder', icon: Edit },
      { value: 'preview', label: 'Preview', icon: Eye },
      { value: 'settings', label: 'Settings', icon: Settings }
    ];

    if (form.status === 'published') {
      baseTabs.push(
        { value: 'invitations', label: 'Invitations', icon: Mail },
        { value: 'submissions', label: 'Submissions', icon: Users },
        { value: 'reports', label: 'Reports', icon: BarChart3 }
      );
    }

    return baseTabs;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Form Builder</h1>
              {selectedForm && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">→</span>
                  <span className="font-medium">{selectedForm.title}</span>
                  <Badge variant={selectedForm.status === 'published' ? 'default' : 'secondary'}>
                    {selectedForm.status}
                  </Badge>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {selectedForm && selectedForm.status === 'draft' && (
                <Button onClick={() => publishForm(selectedForm)} className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Publish Form
                </Button>
              )}
              {selectedForm && selectedForm.status === 'published' && (
                <Button 
                  onClick={() => unpublishForm(selectedForm)} 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Move to Draft
                </Button>
              )}
              <Button onClick={() => setShowLibrary(true)} variant="outline">
                Form Library
              </Button>
              <Button onClick={createNewForm} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Form
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      {selectedForm && (
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex items-center gap-2 px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                  onClick={() => setSelectedForm(null)}
                >
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </TabsTrigger>
                {getTabsForForm(selectedForm).map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger 
                      key={tab.value}
                      value={tab.value} 
                      className="flex items-center gap-2 px-4 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </nav>
      )}

      <main className="container mx-auto px-4 py-6">
        {selectedForm && activeTab === 'invitations' && selectedForm.status === 'published' ? (
          <FormInvitations 
            form={selectedForm} 
            onUpdateForm={(updates) => {
              const updatedForm = { ...selectedForm, ...updates };
              setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
              setSelectedForm(updatedForm);
            }}
          />
        ) : selectedForm && activeTab === 'settings' ? (
          <SettingsPanel 
            form={selectedForm} 
            onUpdate={(updatedForm) => {
              setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
              setSelectedForm(updatedForm);
            }}
          />
        ) : selectedForm && activeTab === 'reports' ? (
          <ReportGeneration 
            form={selectedForm} 
            submissions={submissions.filter(s => s.formId === selectedForm.id)} 
          />
        ) : selectedForm && activeTab === 'submissions' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Form Submissions</h2>
                <p className="text-gray-600 mt-1">Review and manage form submissions</p>
              </div>
              <Badge variant="default" className="bg-blue-100 text-blue-800">
                {submissions.filter(s => s.formId === selectedForm.id).length} Submissions
              </Badge>
            </div>
            
            <SubmissionsList 
              submissions={submissions.filter(s => s.formId === selectedForm.id)}
              onUpdateSubmission={(updatedSubmission) => {
                setSubmissions(submissions.map(s => 
                  s.id === updatedSubmission.id ? updatedSubmission : s
                ));
              }}
            />
          </div>
        ) : selectedForm && activeTab === 'preview' ? (
          <FormPreview form={selectedForm} />
        ) : selectedForm && activeTab === 'builder' ? (
          <FormBuilder
            formFields={selectedForm.fields}
            formTitle={selectedForm.title}
            formDescription={selectedForm.description}
            onAddField={(field) => {
              const updatedForm = {
                ...selectedForm,
                fields: [...selectedForm.fields, field]
              };
              setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
              setSelectedForm(updatedForm);
            }}
            onUpdateField={(fieldId, updates) => {
              const updatedForm = {
                ...selectedForm,
                fields: selectedForm.fields.map(f => 
                  f.id === fieldId ? { ...f, ...updates } : f
                )
              };
              setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
              setSelectedForm(updatedForm);
            }}
            onRemoveField={(fieldId) => {
              const updatedForm = {
                ...selectedForm,
                fields: selectedForm.fields.filter(f => f.id !== fieldId)
              };
              setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
              setSelectedForm(updatedForm);
            }}
            onUpdateTitle={(title) => {
              const updatedForm = { ...selectedForm, title };
              setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
              setSelectedForm(updatedForm);
            }}
            onUpdateDescription={(description) => {
              const updatedForm = { ...selectedForm, description };
              setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
              setSelectedForm(updatedForm);
            }}
            onReorderFields={(dragIndex, hoverIndex) => {
              const newFields = [...selectedForm.fields];
              const draggedField = newFields[dragIndex];
              newFields.splice(dragIndex, 1);
              newFields.splice(hoverIndex, 0, draggedField);
              
              const updatedForm = { ...selectedForm, fields: newFields };
              setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
              setSelectedForm(updatedForm);
            }}
            isPublished={selectedForm.status === 'published'}
            onMoveToDraft={() => {
              const updatedForm = { ...selectedForm, status: 'draft' as const };
              setForms(forms.map(f => f.id === selectedForm.id ? updatedForm : f));
              setSelectedForm(updatedForm);
              toast({
                title: "Moved to Draft",
                description: "Form has been moved to draft status and can now be edited.",
              });
            }}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Dashboard Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Recent Forms</h2>
                <Button onClick={createNewForm} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Form
                </Button>
              </div>
              
              <FormTable 
                forms={forms}
                onSelectForm={(form) => {
                  setSelectedForm(form);
                  setActiveTab('builder');
                }}
                onPublishForm={publishForm}
                onUnpublishForm={unpublishForm}
                onDeleteForm={deleteForm}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Analytics forms={forms} submissions={submissions} />
              
              {selectedForm && (
                <FormDetails 
                  form={selectedForm} 
                  submissionCount={submissions.filter(s => s.formId === selectedForm.id).length}
                />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Form Library Modal */}
      {showLibrary && (
        <FormLibrary 
          onClose={() => setShowLibrary(false)}
          onSelectTemplate={(template) => {
            const newForm: Form = {
              id: `form-${Date.now()}`,
              title: template.name,
              description: template.description,
              fields: template.fields,
              settings: {
                allowMultipleSubmissions: false,
                requireLogin: false,
                showProgressBar: true,
                theme: 'light',
                emailDistribution: {
                  enabled: false,
                  recipients: [],
                  reminderEnabled: false,
                  reminderIntervalDays: 7,
                  maxReminders: 3
                }
              },
              createdAt: new Date(),
              updatedAt: new Date(),
              status: "draft",
              submissions: [],
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

            setForms([...forms, newForm]);
            setSelectedForm(newForm);
            setActiveTab('builder');
            setShowLibrary(false);
            
            toast({
              title: "Template Applied",
              description: `Form created from ${template.name} template.`,
            });
          }}
        />
      )}
    </div>
  );
}
