
import { useState } from "react";
import { FormField, DocumentAttachment, FormTemplate } from "@/types/form";
import { FieldPalette } from "./FieldPalette";
import { FieldEditor } from "./FieldEditor";
import { FormCanvas } from "./FormCanvas";
import { FileAttachmentManager } from "./FileAttachmentManager";
import { FormLibrary } from "./FormLibrary";
import { FormCategoryManager, FormCategory } from "./FormCategoryManager";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Library, Layers, Settings } from "lucide-react";

interface FormBuilderProps {
  formFields: FormField[];
  formTitle: string;
  formDescription: string;
  onAddField: (field: FormField) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onReorderFields: (dragIndex: number, hoverIndex: number) => void;
  attachments?: DocumentAttachment[];
  onUpdateAttachments?: (attachments: DocumentAttachment[]) => void;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  onUseTemplate?: (template: FormTemplate) => void;
  formCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
  saveToLibrary?: boolean;
  onSaveToLibraryChange?: (shouldSave: boolean) => void;
}

export const FormBuilder = ({
  formFields,
  formTitle,
  formDescription,
  onAddField,
  onUpdateField,
  onRemoveField,
  onUpdateTitle,
  onUpdateDescription,
  onReorderFields,
  attachments = [],
  onUpdateAttachments = () => {},
  allowedFileTypes = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png'],
  maxFileSize = 10,
  onUseTemplate,
  formCategory,
  onCategoryChange = () => {},
  saveToLibrary = false,
  onSaveToLibraryChange = () => {}
}: FormBuilderProps) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [categories, setCategories] = useState<FormCategory[]>([
    { id: 'survey', name: 'Survey', color: 'bg-blue-100 text-blue-800' },
    { id: 'assessment', name: 'Assessment', color: 'bg-green-100 text-green-800' },
    { id: 'registration', name: 'Registration', color: 'bg-purple-100 text-purple-800' },
    { id: 'feedback', name: 'Feedback', color: 'bg-orange-100 text-orange-800' },
    { id: 'compliance', name: 'Compliance', color: 'bg-red-100 text-red-800' },
    { id: 'vendor-risk', name: 'Vendor Risk', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'others', name: 'Others', color: 'bg-gray-100 text-gray-800' }
  ]);

  const handleAddCategory = (newCategory: FormCategory) => {
    setCategories(prev => [...prev, newCategory]);
  };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Field Palette */}
      <div className="col-span-3">
        <Tabs defaultValue="palette" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="palette" className="flex items-center gap-1">
              <Layers className="h-4 w-4" />
              Fields
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-1">
              <Library className="h-4 w-4" />
              Library
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="palette" className="mt-4 h-[calc(100%-60px)]">
            <FieldPalette onAddField={onAddField} />
          </TabsContent>
          
          <TabsContent value="library" className="mt-4 h-[calc(100%-60px)] overflow-auto">
            <FormLibrary onUseTemplate={onUseTemplate} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Form Canvas */}
      <div className="col-span-6">
        <Card className="h-full">
          <CardHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="form-title">Form Title</Label>
                <Input
                  id="form-title"
                  value={formTitle}
                  onChange={(e) => onUpdateTitle(e.target.value)}
                  placeholder="Enter form title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="form-description">Form Description</Label>
                <Textarea
                  id="form-description"
                  value={formDescription}
                  onChange={(e) => onUpdateDescription(e.target.value)}
                  placeholder="Enter form description"
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <Tabs defaultValue="fields" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="fields">Form Fields</TabsTrigger>
                <TabsTrigger value="attachments">File Attachments</TabsTrigger>
                <TabsTrigger value="category">
                  <Settings className="h-4 w-4 mr-1" />
                  Category
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="fields" className="mt-4 h-[calc(100%-60px)]">
                <FormCanvas
                  fields={formFields}
                  selectedField={selectedField}
                  onSelectField={setSelectedField}
                  onUpdateField={onUpdateField}
                  onRemoveField={onRemoveField}
                  onAddField={onAddField}
                  onReorderFields={onReorderFields}
                />
              </TabsContent>
              
              <TabsContent value="attachments" className="mt-4">
                <FileAttachmentManager
                  attachments={attachments}
                  onUpdateAttachments={onUpdateAttachments}
                  allowedTypes={allowedFileTypes}
                  maxSize={maxFileSize}
                />
              </TabsContent>

              <TabsContent value="category" className="mt-4">
                <FormCategoryManager
                  selectedCategory={formCategory}
                  onCategoryChange={onCategoryChange}
                  onSaveToLibrary={onSaveToLibraryChange}
                  saveToLibrary={saveToLibrary}
                  categories={categories}
                  onAddCategory={handleAddCategory}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Field Editor */}
      <div className="col-span-3">
        <FieldEditor
          selectedField={selectedField ? formFields.find(f => f.id === selectedField) : null}
          onUpdateField={onUpdateField}
        />
      </div>
    </div>
  );
};
