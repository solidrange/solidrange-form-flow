
import { useState, useEffect } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Form } from '@/types/form';
import { mockForms } from '@/data/mock-data';
import { FormTable } from '@/components/FormTable';
import { FormDetails } from '@/components/FormDetails';
import { SettingsPanel } from '@/components/SettingsPanel';
import { ReportGeneration } from '@/components/ReportGeneration';

/**
 * Main Index page component that manages the form management application
 * Handles form listing, selection, settings, and navigation between different tabs
 */
export default function Index() {
  // State for managing forms data
  const [forms, setForms] = useState<Form[]>([]);
  
  // State for tracking selected form for details view
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  
  // State for controlling form details modal/panel visibility
  const [isFormDetailsOpen, setIsFormDetailsOpen] = useState(false);
  
  // State for managing form settings - stores the form being configured
  const [formSettings, setFormSettings] = useState<Form | null>(null);

  // Effect to load initial forms data (simulates API call)
  useEffect(() => {
    // Simulate fetching forms from an API
    setForms(mockForms);
  }, []);

  /**
   * Handler for when a form is selected from the forms table
   * Opens the form details view for the selected form
   * @param formId - ID of the selected form
   */
  const handleFormSelect = (formId: string) => {
    setSelectedFormId(formId);
    setIsFormDetailsOpen(true);
  };

  /**
   * Handler for closing the form details view
   * Clears the selected form and closes the details panel
   */
  const handleFormClose = () => {
    setIsFormDetailsOpen(false);
    setSelectedFormId(null);
  };

  /**
   * Handler for when settings button is clicked for a form
   * Opens the settings panel for the specified form
   * @param form - The form object to configure settings for
   */
  const handleSettingsClick = (form: Form) => {
    setFormSettings(form);
  };

  /**
   * Handler for updating form settings
   * Updates the form in the forms list and closes the settings panel
   * @param updatedSettings - The updated form object with new settings
   */
  const handleSettingsUpdate = (updatedSettings: Form) => {
    setForms(forms.map(form => form.id === updatedSettings.id ? updatedSettings : form));
    setFormSettings(null);
  };

  // Find the currently selected form object
  const selectedForm = forms.find(form => form.id === selectedFormId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main header section */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Form Management
          </h1>
        </div>
      </header>
      
      {/* Main content area */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tab navigation and content */}
          <Tabs defaultValue="forms" className="w-full">
            {/* Tab navigation buttons */}
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="details" disabled={!selectedFormId}>Details</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings" disabled={!formSettings}>Settings</TabsTrigger>
            </TabsList>
            
            {/* Forms list tab - displays all forms in a table */}
            <TabsContent value="forms" className="space-y-6">
              <FormTable 
                forms={forms} 
                onFormSelect={handleFormSelect} 
                onSettingsClick={handleSettingsClick} 
              />
            </TabsContent>
            
            {/* Form details tab - shows detailed view of selected form */}
            <TabsContent value="details" className="space-y-6">
              {selectedForm && (
                <FormDetails form={selectedForm} onClose={handleFormClose} />
              )}
            </TabsContent>
            
            {/* Reports tab - generates reports for selected form submissions */}
            <TabsContent value="reports" className="space-y-6">
              {selectedForm && selectedForm.submissions && (
                <ReportGeneration submissions={selectedForm.submissions} />
              )}
            </TabsContent>
            
            {/* Settings tab - configure form settings */}
            <TabsContent value="settings" className="space-y-6">
              {formSettings && (
                <SettingsPanel 
                  form={formSettings}
                  onUpdate={handleSettingsUpdate}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
