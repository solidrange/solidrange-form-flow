
import { useState } from "react";
import { FormField, DocumentAttachment, FormTemplate } from "@/types/form";
import { FieldPalette } from "./FieldPalette";
import { FieldEditor } from "./FieldEditor";
import { FormCanvas } from "./FormCanvas";
import { FileAttachmentManager } from "./FileAttachmentManager";
import { FormLibrary } from "./FormLibrary";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Library, Plus, Paperclip } from "lucide-react";

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
}

/**
 * FormBuilder Component
 * 
 * Main component for building forms with drag-and-drop functionality.
 * Provides tools palette, form canvas, and field editor in a three-column layout.
 * 
 * Features:
 * - Field palette with available form field types
 * - Template library for quick form setup
 * - File attachment management
 * - Real-time form editing with preview
 */
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
  onUseTemplate
}: FormBuilderProps) => {
  // State for managing selected field and active tool tab
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [activeBuilderTab, setActiveBuilderTab] = useState("fields");

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Left Panel: Tools (Field Palette & Template Library) */}
      <div className="col-span-3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg">Form Builder Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={activeBuilderTab} onValueChange={setActiveBuilderTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fields" className="flex items-center gap-1">
                  <Plus className="h-3 w-3" />
                  Fields
                </TabsTrigger>
                <TabsTrigger value="library" className="flex items-center gap-1">
                  <Library className="h-3 w-3" />
                  Templates
                </TabsTrigger>
              </TabsList>
              
              {/* Field Palette Tab */}
              <TabsContent value="fields" className="mt-4">
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Drag and drop fields to build your form:
                  </p>
                  <FieldPalette onAddField={onAddField} />
                </div>
              </TabsContent>
              
              {/* Template Library Tab */}
              <TabsContent value="library" className="mt-4">
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Choose from pre-built templates to quickly set up your form:
                  </p>
                  <FormLibrary onUseTemplate={onUseTemplate} compact={true} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Center Panel: Form Canvas & Attachments */}
      <div className="col-span-6">
        <Card className="h-full">
          <CardHeader>
            {/* Form Title and Description Inputs */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="form-title" className="text-sm font-medium">
                  Form Title
                </Label>
                <Input
                  id="form-title"
                  value={formTitle}
                  onChange={(e) => onUpdateTitle(e.target.value)}
                  placeholder="Enter a descriptive title for your form"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="form-description" className="text-sm font-medium">
                  Form Description
                </Label>
                <Textarea
                  id="form-description"
                  value={formDescription}
                  onChange={(e) => onUpdateDescription(e.target.value)}
                  placeholder="Provide instructions or context for form users"
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            {/* Form Canvas and Attachments Tabs */}
            <Tabs defaultValue="fields" className="h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fields">Form Fields</TabsTrigger>
                <TabsTrigger value="attachments" className="flex items-center gap-2">
                  <Paperclip className="h-4 w-4" />
                  Attachments
                </TabsTrigger>
              </TabsList>
              
              {/* Form Fields Canvas */}
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
              
              {/* File Attachments Manager */}
              <TabsContent value="attachments" className="mt-4">
                <FileAttachmentManager
                  attachments={attachments}
                  onUpdateAttachments={onUpdateAttachments}
                  allowedTypes={allowedFileTypes}
                  maxSize={maxFileSize}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel: Field Editor */}
      <div className="col-span-3">
        <FieldEditor
          selectedField={selectedField ? formFields.find(f => f.id === selectedField) : null}
          onUpdateField={onUpdateField}
        />
      </div>
    </div>
  );
};
