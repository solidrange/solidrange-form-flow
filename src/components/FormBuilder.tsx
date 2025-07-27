import React, { useState } from 'react';
import { FormTemplate, FormField } from '@/types/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrandedButton } from './BrandedButton';
import { FormLibrary } from './FormLibrary';
import { FieldPalette } from './FieldPalette';
import { FormCanvas } from './FormCanvas';
import { FieldEditor } from './FieldEditor';

export const FormBuilder = () => {
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('build');

  console.log('FormBuilder: Current form fields:', formFields);

  const handleUseTemplate = (template: FormTemplate) => {
    console.log('FormBuilder: Received template:', template.name);
    console.log('FormBuilder: Template fields:', template.fields);
    
    setFormTitle(template.name);
    setFormDescription(template.description);
    
    // Ensure fields have proper structure and unique IDs
    const processedFields = template.fields.map((field, index) => ({
      ...field,
      id: `field-${Date.now()}-${index}` // Ensure unique IDs
    }));
    
    console.log('FormBuilder: Processed fields:', processedFields);
    setFormFields(processedFields);
    setSelectedField(null);
    setActiveTab('build');
  };

  const handleAddField = (field: FormField) => {
    console.log('FormBuilder: Adding field:', field);
    const newField = {
      ...field,
      id: `field-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setFormFields(prev => {
      const updated = [...prev, newField];
      console.log('FormBuilder: Updated fields after add:', updated);
      return updated;
    });
  };

  const handleUpdateField = (fieldId: string, updates: Partial<FormField>) => {
    console.log('FormBuilder: Updating field:', fieldId, updates);
    setFormFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const handleRemoveField = (fieldId: string) => {
    console.log('FormBuilder: Removing field:', fieldId);
    setFormFields(prev => prev.filter(field => field.id !== fieldId));
    if (selectedField === fieldId) {
      setSelectedField(null);
    }
  };

  const handleReorderFields = (dragIndex: number, hoverIndex: number) => {
    console.log('FormBuilder: Reordering fields:', dragIndex, hoverIndex);
    setFormFields(prev => {
      const draggedField = prev[dragIndex];
      const newFields = [...prev];
      newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, draggedField);
      return newFields;
    });
  };

  const handleSave = () => {
    console.log('FormBuilder: Saving form:', {
      title: formTitle,
      description: formDescription,
      fields: formFields
    });
    // TODO: Implement actual save functionality
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
              <span className="px-3 py-1 text-sm font-medium text-gray-900 bg-white rounded-full shadow-sm">
                Build
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BrandedButton
              onClick={handleSave}
              variant="outline"
              size="sm"
            >
              Save Draft
            </BrandedButton>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Form Library or Field Palette */}
        <div className="w-80 border-r bg-white overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="build">Fields</TabsTrigger>
              <TabsTrigger value="library">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="build" className="p-4 space-y-4">
              <FieldPalette />
            </TabsContent>
            
            <TabsContent value="library" className="p-0">
              <div className="h-full overflow-y-auto">
                <FormLibrary onUseTemplate={handleUseTemplate} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Center - Form Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Form Header */}
          <div className="p-6 border-b bg-gray-50">
            <Input
              placeholder="Form Title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="text-2xl font-bold border-none bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-400"
            />
            <Textarea
              placeholder="Form Description (optional)"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="mt-2 border-none bg-transparent p-0 resize-none focus-visible:ring-0 placeholder:text-gray-400"
              rows={2}
            />
          </div>

          {/* Form Fields */}
          <div className="flex-1 p-6 overflow-y-auto">
            <FormCanvas
              fields={formFields}
              selectedField={selectedField}
              onSelectField={setSelectedField}
              onUpdateField={handleUpdateField}
              onRemoveField={handleRemoveField}
              onAddField={handleAddField}
              onReorderFields={handleReorderFields}
            />
          </div>
        </div>

        {/* Right Sidebar - Field Editor */}
        <div className="w-80 border-l bg-white">
          <FieldEditor
            field={selectedField ? formFields.find(f => f.id === selectedField) : null}
            onUpdate={(updates) => selectedField && handleUpdateField(selectedField, updates)}
            onClose={() => setSelectedField(null)}
          />
        </div>
      </div>
    </div>
  );
};
