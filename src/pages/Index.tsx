import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { 
  FileText, 
  Plus, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Building,
  Globe,
  Shield,
  Award,
  BarChart3,
  Settings,
  Bell,
  Search,
  Filter,
  Zap
} from "lucide-react";
import { FormBuilder } from "@/components/FormBuilder";
import { SubmissionReview } from "@/components/SubmissionReview";
import Analytics from "@/components/Analytics";
import { GlobalSettings } from "@/components/GlobalSettings";
import { sampleSubmissions } from "@/data/sampleSubmissions";
import { Form, FormField, DocumentAttachment } from "@/types/form";
import { ReportGeneration } from "@/components/reports/ReportGeneration";
import { expandedSampleSubmissions } from "@/data/expandedSampleSubmissions";
import { AppSidebar } from "@/components/AppSidebar";
import { NotificationPanel } from "@/components/NotificationPanel";

// Sample form data for testing
const sampleForm: Form = {
  id: "form-1",
  title: "Vendor Risk Assessment Form",
  description: "Comprehensive risk assessment form for vendor evaluation",
  fields: [
    {
      id: "company_name",
      type: "text",
      label: "Company Name",
      required: true,
      placeholder: "Enter company name"
    },
    {
      id: "business_type",
      type: "select",
      label: "Business Type",
      required: true,
      options: ["Technology", "Healthcare", "Finance", "Manufacturing", "Other"]
    },
    {
      id: "annual_revenue",
      type: "number",
      label: "Annual Revenue",
      required: true,
      placeholder: "Enter annual revenue"
    },
    {
      id: "risk_assessment",
      type: "textarea",
      label: "Risk Assessment Details",
      required: true,
      placeholder: "Provide detailed risk assessment"
    },
    {
      id: "compliance_certifications",
      type: "checkbox",
      label: "Compliance Certifications",
      required: false,
      options: ["ISO 27001", "SOC 2", "GDPR", "HIPAA", "PCI DSS"]
    }
  ],
  settings: {
    allowMultipleSubmissions: false,
    requireLogin: true,
    showProgressBar: true,
    theme: 'light',
    scoring: {
      enabled: true,
      maxTotalPoints: 100,
      showScoreToUser: true,
      passingScore: 70,
      riskThresholds: {
        low: 80,
        medium: 60,
        high: 40
      }
    },
    approval: {
      enabled: true,
      requireApproval: true,
      approvers: ['admin@company.com'],
      autoApproveScore: 85
    },
    documents: {
      enabled: true,
      allowedTypes: ['pdf', 'docx', 'xlsx'],
      maxSize: 10485760, // 10MB
      requiredDocuments: ['Business License', 'Insurance Certificate'],
      allowUserUploads: true
    },
    emailDistribution: {
      enabled: true,
      recipients: [
        {
          id: "1",
          email: "vendor1@example.com",
          name: "Vendor One",
          status: "completed",
          remindersSent: 1,
          sentAt: new Date('2024-01-15'),
          completedAt: new Date('2024-01-20'),
          lastReminderAt: new Date('2024-01-18')
        },
        {
          id: "2", 
          email: "vendor2@example.com",
          name: "Vendor Two",
          status: "pending",
          remindersSent: 0
        }
      ],
      reminderEnabled: true,
      reminderIntervalDays: 7,
      maxReminders: 3
    }
  },
  createdAt: new Date('2024-01-10'),
  updatedAt: new Date('2024-01-20'),
  status: 'published',
  analytics: {
    enabled: true,
    trackingPixel: true,
    googleAnalytics: 'GA-123456789',
    customEvents: true,
    views: 245,
    submissions: 42,
    emailsSent: 156,
    completionRate: 78.5
  }
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [submissions, setSubmissions] = useState(expandedSampleSubmissions);
  
  // Form Builder state
  const [formFields, setFormFields] = useState<FormField[]>(sampleForm.fields);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState(sampleForm.title);
  const [formDescription, setFormDescription] = useState(sampleForm.description);
  const [formAttachments, setFormAttachments] = useState<DocumentAttachment[]>([]);

  const handleUpdateSubmission = (submissionId: string, updates: any) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === submissionId ? { ...sub, ...updates } : sub
    ));
  };

  const handleResendForm = (submissionId: string, comments: string) => {
    console.log(`Resending form to submission ${submissionId} with comments: ${comments}`);
  };

  // Form Builder handlers
  const handleAddField = (field: FormField) => {
    setFormFields(prev => [...prev, field]);
  };

  const handleUpdateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const handleRemoveField = (fieldId: string) => {
    setFormFields(prev => prev.filter(field => field.id !== fieldId));
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };

  const handleSaveForm = () => {
    console.log('Saving form...', { formTitle, formDescription, formFields });
  };

  const handlePreviewForm = () => {
    console.log('Previewing form...', { formTitle, formDescription, formFields });
  };

  const handleSaveToLibrary = () => {
    console.log('Saving to library...', { formTitle, formDescription, formFields });
  };

  const handleMoveToDraft = () => {
    console.log('Moving to draft...', { formTitle, formDescription, formFields });
  };

  // Dashboard stats
  const totalSubmissions = submissions.length;
  const pendingSubmissions = submissions.filter(s => s.status === 'submitted').length;
  const approvedSubmissions = submissions.filter(s => s.status === 'approved').length;
  const rejectedSubmissions = submissions.filter(s => s.status === 'rejected').length;
  const underReviewSubmissions = submissions.filter(s => s.status === 'under_review').length;

  const avgCompletionRate = submissions.length > 0 
    ? Math.round((submissions.filter(s => s.status !== 'submitted').length / submissions.length) * 100)
    : 0;

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Form Management Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 hidden sm:block">Monitor and manage your form submissions</p>
        </div>
        <div className="flex gap-2">
          <NotificationPanel 
            onNavigate={(tab, filters) => {
              setActiveTab(tab);
              if (filters) {
                setTimeout(() => {
                  const event = new CustomEvent('setSubmissionFilter', { 
                    detail: filters 
                  });
                  window.dispatchEvent(event);
                }, 100);
              }
            }}
          />
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("submissions")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold">{totalSubmissions}</p>
                <p className="text-xs text-gray-500 mt-1">Click to view all</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
          setActiveTab("submissions");
          // Set filter for pending submissions
          setTimeout(() => {
            const event = new CustomEvent('setSubmissionFilter', { 
              detail: { status: ['submitted'] } 
            });
            window.dispatchEvent(event);
          }, 100);
        }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{pendingSubmissions}</p>
                <p className="text-xs text-gray-500 mt-1">Click to review</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
          setActiveTab("submissions");
          // Set filter for approved submissions
          setTimeout(() => {
            const event = new CustomEvent('setSubmissionFilter', { 
              detail: { status: ['approved'] } 
            });
            window.dispatchEvent(event);
          }, 100);
        }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedSubmissions}</p>
                <p className="text-xs text-gray-500 mt-1">Click to view</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveTab("analytics")}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold">{avgCompletionRate}%</p>
                <p className="text-xs text-gray-500 mt-1">View analytics</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {submissions.slice(0, 5).map((submission) => (
              <div 
                key={submission.id} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setActiveTab("submissions");
                  // Select the submission after navigation
                  setTimeout(() => {
                    const event = new CustomEvent('selectSubmission', { 
                      detail: { submissionId: submission.id } 
                    });
                    window.dispatchEvent(event);
                  }, 100);
                }}
              >
                <div className="flex items-center gap-3">
                  {submission.submissionType === 'vendor' ? (
                    <Building className="h-4 w-4 text-blue-500" />
                  ) : submission.submissionType === 'external' ? (
                    <Globe className="h-4 w-4 text-purple-500" />
                  ) : (
                    <Users className="h-4 w-4 text-gray-500" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{submission.companyName || submission.submitterName}</p>
                    <p className="text-xs text-gray-600">{new Date(submission.submittedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <Badge variant={
                  submission.status === 'approved' ? 'default' :
                  submission.status === 'rejected' ? 'destructive' :
                  submission.status === 'under_review' ? 'secondary' :
                  'outline'
                }>
                  {submission.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              Risk Assessment Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { level: 'Critical', count: submissions.filter(s => s.score?.riskLevel === 'critical').length, color: 'bg-red-500' },
                { level: 'High', count: submissions.filter(s => s.score?.riskLevel === 'high').length, color: 'bg-orange-500' },
                { level: 'Medium', count: submissions.filter(s => s.score?.riskLevel === 'medium').length, color: 'bg-yellow-500' },
                { level: 'Low', count: submissions.filter(s => s.score?.riskLevel === 'low').length, color: 'bg-green-500' }
              ].map((risk) => (
                <div 
                  key={risk.level} 
                  className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                  onClick={() => {
                    setActiveTab("submissions");
                    // Set filter for risk level
                    setTimeout(() => {
                      const event = new CustomEvent('setSubmissionFilter', { 
                        detail: { riskLevel: [risk.level.toLowerCase()] } 
                      });
                      window.dispatchEvent(event);
                    }, 100);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${risk.color}`}></div>
                    <span className="text-sm">{risk.level} Risk</span>
                  </div>
                  <Badge variant="outline">{risk.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveTab("submissions")}
            >
              <FileText className="h-6 w-6" />
              Review Submissions
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveTab("builder")}
            >
              <Plus className="h-6 w-6" />
              Create Form
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveTab("reports")}
            >
              <BarChart3 className="h-6 w-6" />
              View Reports
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => setActiveTab("analytics")}
            >
              <Zap className="h-6 w-6" />
              Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const handleGenerateReport = (config: any) => {
    console.log('Generating report with config:', config);
    // Here you would implement the actual report generation logic
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard();
      case "submissions":
        return (
          <SubmissionReview 
            submissions={submissions}
            form={sampleForm}
            onUpdateSubmission={handleUpdateSubmission}
            onResendForm={handleResendForm}
          />
        );
      case "builder":
        return (
          <FormBuilder 
            formFields={formFields}
            onAddField={handleAddField}
            onUpdateField={handleUpdateField}
            onRemoveField={handleRemoveField}
            selectedFieldId={selectedFieldId}
            onSelectField={setSelectedFieldId}
            title={formTitle}
            description={formDescription}
            onUpdateTitle={setFormTitle}
            onUpdateDescription={setFormDescription}
            onSaveForm={handleSaveForm}
            onPreviewForm={handlePreviewForm}
            attachments={formAttachments}
            onUpdateAttachments={setFormAttachments}
            onSaveToLibrary={handleSaveToLibrary}
            isPublished={sampleForm.status === 'published'}
            onMoveToDraft={handleMoveToDraft}
          />
        );
      case "reports":
        return (
          <ReportGeneration 
            submissions={submissions}
            onGenerateReport={handleGenerateReport}
          />
        );
      case "analytics":
        return (
          <Analytics 
            submissions={submissions}
            onFilterSubmissions={(filters) => {
              setActiveTab("submissions");
              // Apply filters to submissions
              setTimeout(() => {
                const event = new CustomEvent('setSubmissionFilter', { 
                  detail: filters 
                });
                window.dispatchEvent(event);
              }, 100);
            }}
          />
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hasUnpublishedDrafts={false}
        />
        <SidebarInset>
          <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between px-4 h-full">
              <SidebarTrigger />
              <div className="flex gap-2">
                <NotificationPanel 
                  onNavigate={(tab, filters) => {
                    setActiveTab(tab);
                    if (filters) {
                      setTimeout(() => {
                        const event = new CustomEvent('setSubmissionFilter', { 
                          detail: filters 
                        });
                        window.dispatchEvent(event);
                      }, 100);
                    }
                  }}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    console.log('Opening settings...');
                    // TODO: Implement settings panel
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 bg-gray-50">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
