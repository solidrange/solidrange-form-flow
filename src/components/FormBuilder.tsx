
import { useState } from "react";
import { FormField, DocumentAttachment } from "@/types/form";
import { FieldPalette } from "./FieldPalette";
import { FieldEditor } from "./FieldEditor";
import { FormCanvas } from "./FormCanvas";
import { FileAttachmentManager } from "./FileAttachmentManager";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  maxFileSize = 10
}: FormBuilderProps) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Field Palette */}
      <div className="col-span-3">
        <FieldPalette onAddField={onAddField} />
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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="fields">Form Fields</TabsTrigger>
                <TabsTrigger value="attachments">File Attachments</TabsTrigger>
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
