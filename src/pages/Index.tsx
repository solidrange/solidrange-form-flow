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

export default function Index() {
  const [forms, setForms] = useState<Form[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [isFormDetailsOpen, setIsFormDetailsOpen] = useState(false);
  const [formSettings, setFormSettings] = useState<Form | null>(null);

  useEffect(() => {
    // Simulate fetching forms from an API
    setForms(mockForms);
  }, []);

  const handleFormSelect = (formId: string) => {
    setSelectedFormId(formId);
    setIsFormDetailsOpen(true);
  };

  const handleFormClose = () => {
    setIsFormDetailsOpen(false);
    setSelectedFormId(null);
  };

  const handleSettingsClick = (form: Form) => {
    setFormSettings(form);
  };

  const handleSettingsUpdate = (updatedSettings: Form) => {
    setForms(forms.map(form => form.id === updatedSettings.id ? updatedSettings : form));
    setFormSettings(null);
  };

  const selectedForm = forms.find(form => form.id === selectedFormId);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Form Management
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="forms" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="details" disabled={!selectedFormId}>Details</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings" disabled={!formSettings}>Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="forms" className="space-y-6">
              <FormTable forms={forms} onFormSelect={handleFormSelect} onSettingsClick={handleSettingsClick} />
            </TabsContent>
            <TabsContent value="details" className="space-y-6">
              {selectedForm && (
                <FormDetails form={selectedForm} onClose={handleFormClose} />
              )}
            </TabsContent>
            <TabsContent value="reports" className="space-y-6">
              {selectedForm && selectedForm.submissions && (
                <ReportGeneration submissions={[]} />
              )}
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <SettingsPanel 
                settings={formSettings}
                onUpdateSettings={handleSettingsUpdate}
              />
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  );
}
