
import { useState } from "react";
import { FormBuilder } from "@/components/FormBuilder";
import { FormPreview } from "@/components/FormPreview";
import { FormLibrary } from "@/components/FormLibrary";
import { Analytics } from "@/components/Analytics";
import { Settings, BarChart3, Library, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormField } from "@/types/form";

const Index = () => {
  const [activeTab, setActiveTab] = useState("builder");
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");

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

  const saveForm = () => {
    console.log("Saving form:", { formTitle, formDescription, formFields });
    // Here you would integrate with your .NET backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SF</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Solidrange Form Builder</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={saveForm} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Form
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Form Builder
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Library className="h-4 w-4" />
              Library
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="mt-6">
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
            />
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <FormPreview
              formTitle={formTitle}
              formDescription={formDescription}
              formFields={formFields}
            />
          </TabsContent>

          <TabsContent value="library" className="mt-6">
            <FormLibrary />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
