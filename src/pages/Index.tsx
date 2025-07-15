
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Bell, Menu } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { FormBuilder } from '@/components/FormBuilder';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import Analytics from '@/components/Analytics';
import { FormLibrary } from '@/components/FormLibrary';
import { SubmissionReview } from '@/components/SubmissionReview';
import { Reports } from '@/components/Reports';
import { GlobalSettings } from '@/components/GlobalSettings';
import { NotificationPanel } from '@/components/NotificationPanel';
import { Badge } from '@/components/ui/badge';
import { sampleSubmissions, sampleForm } from '@/data/sampleData';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form builder state
  const [formFields, setFormFields] = useState([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [attachments, setAttachments] = useState([]);

  // Form builder handlers
  const handleAddField = (field: any) => {
    console.log('Adding field:', field);
    setFormFields(prev => [...prev, field]);
  };

  const handleUpdateField = (fieldId: string, updatedField: any) => {
    console.log(`Updating field ${fieldId} with`, updatedField);
    setFormFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updatedField } : field
    ));
  };

  const handleRemoveField = (fieldId: string) => {
    console.log('Removing field:', fieldId);
    setFormFields(prev => prev.filter(field => field.id !== fieldId));
  };

  const handleSaveForm = () => {
    console.log('Saving form...');
    setShowFormBuilder(false);
  };

  const handlePreviewForm = () => {
    console.log('Previewing form...');
  };

  const handleSaveToLibrary = () => {
    console.log('Saving to library...');
  };

  const handleMoveToDraft = () => {
    console.log('Moving to draft...');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 w-full">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                FormFlow
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">Build, manage, and analyze forms with ease</p>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="gap-2 relative"
              >
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
                <Badge className="absolute -top-1 -right-1 h-2 w-2 p-0 bg-red-500"></Badge>
              </Button>

              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar - Mobile */}
            {isMobileMenuOpen && (
              <div className="lg:hidden">
                <AppSidebar 
                  activeTab={activeTab} 
                  onTabChange={setActiveTab}
                  hasUnpublishedDrafts={false}
                />
              </div>
            )}

            {/* Sidebar - Desktop */}
            <div className="hidden lg:block lg:w-64 flex-shrink-0">
              <AppSidebar 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
                hasUnpublishedDrafts={false}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <DashboardOverview />
                  <Analytics submissions={sampleSubmissions} />
                </div>
              )}

              {activeTab === 'builder' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <h2 className="text-xl sm:text-2xl font-semibold">Form Builder</h2>
                    <Button onClick={() => setShowFormBuilder(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Create Form</span>
                      <span className="sm:hidden">Create</span>
                    </Button>
                  </div>
                  <FormLibrary onSelectTemplate={() => setShowFormBuilder(true)} />
                </div>
              )}

              {activeTab === 'submissions' && (
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl font-semibold">Submissions</h2>
                  <SubmissionReview 
                    submissions={sampleSubmissions}
                    form={sampleForm}
                    onUpdateSubmission={() => {}}
                    onResendForm={() => {}}
                  />
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <Reports submissions={sampleSubmissions} />
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h2 className="text-xl sm:text-2xl font-semibold">Analytics</h2>
                  <Analytics submissions={sampleSubmissions} />
                </div>
              )}
            </div>
          </div>

          {/* Modals and Dialogs */}
          {showFormBuilder && (
            <Dialog open={showFormBuilder} onOpenChange={setShowFormBuilder}>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto p-0">
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
                  attachments={attachments}
                  onUpdateAttachments={setAttachments}
                  onSaveToLibrary={handleSaveToLibrary}
                  isPublished={false}
                  onMoveToDraft={handleMoveToDraft}
                />
              </DialogContent>
            </Dialog>
          )}

          {showSettings && (
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                <GlobalSettings />
              </DialogContent>
            </Dialog>
          )}

          {showNotifications && (
            <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
              <DialogContent className="max-w-md">
                <NotificationPanel />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
