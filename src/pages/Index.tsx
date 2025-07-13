import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormField, DocumentAttachment } from '@/types/form';
import { BrandProvider } from '@/contexts/BrandContext';
import { BrandingProvider } from '@/components/BrandingProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { FormBuilder } from '@/components/FormBuilder';
import { ResponsiveLayout } from '@/components/ResponsiveLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { FormsListView } from '@/components/forms/FormsListView';
import { useIsMobile } from '@/hooks/use-mobile';

interface IndexProps {
  // Add any props you need here
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('');
  const [attachments, setAttachments] = useState<DocumentAttachment[]>([]);
  const [hasUnpublishedDrafts, setHasUnpublishedDrafts] = useState(true);
  const [currentFormStatus, setCurrentFormStatus] = useState<'draft' | 'published'>('draft');

  const handleAddField = (field: FormField) => {
    const newField = { ...field, id: uuidv4() };
    setFormFields([...formFields, newField]);
  };

  const handleUpdateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormFields(formFields.map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const handleRemoveField = (fieldId: string) => {
    setFormFields(formFields.filter(field => field.id !== fieldId));
    setSelectedFieldId(null);
  };

  const handleSaveForm = () => {
    // Implement your save logic here
    alert('Form saved!');
  };

  const handlePreviewForm = () => {
    // Implement your preview logic here
    alert('Previewing form...');
  };

  const handleSaveToLibrary = () => {
    // Implement your save to library logic here
    alert('Form saved to library!');
  };

  const handleMoveToDraft = () => {
    setCurrentFormStatus('draft');
    alert('Form moved to draft!');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      
      case 'forms':
        return (
          <FormsListView
            onCreateForm={() => setActiveTab('build-form')}
            onEditForm={(formId) => {
              // Load form data and switch to builder
              setActiveTab('build-form');
            }}
          />
        );
      
      case 'build-form':
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
            attachments={attachments}
            onUpdateAttachments={setAttachments}
            onSaveToLibrary={handleSaveToLibrary}
            isPublished={currentFormStatus === 'published'}
            onMoveToDraft={handleMoveToDraft}
          />
        );
      
      case 'review-submissions':
        return <div>Review Submissions Content</div>;
      
      case 'global-settings':
        return <div>Global Settings Content</div>;
      
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <BrandProvider>
      <BrandingProvider>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/20">
            <AppSidebar 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              hasUnpublishedDrafts={hasUnpublishedDrafts}
            />
            
            <main className="flex-1 overflow-auto">
              <div className="animate-fade-in">
                {renderActiveTab()}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </BrandingProvider>
    </BrandProvider>
  );
};

export default Index;
