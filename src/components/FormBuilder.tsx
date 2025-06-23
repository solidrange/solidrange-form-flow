
import { useState } from "react";
import { FormField, DocumentAttachment } from "@/types/form";
import { FieldPalette } from "./FieldPalette";
import { FieldEditor } from "./FieldEditor";
import { FormCanvas } from "./FormCanvas";
import { FileAttachmentManager } from "./FileAttachmentManager";
import { FormCategoryManager } from "./FormCategoryManager";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Lock, ArrowLeft } from "lucide-react";

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
  formCategory?: string;
  onCategoryChange?: (category: string) => void;
  onSaveToLibrary?: () => void;
  isPublished?: boolean;
  onMoveToDraft?: () => void;
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
  formCategory = "",
  onCategoryChange = () => {},
  onSaveToLibrary = () => {},
  isPublished = false,
  onMoveToDraft = () => {}
}: FormBuilderProps) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const handleSaveToLibrary = () => {
    if (!formCategory) {
      toast({
        title: "Category Required",
        description: "Please select a category before saving to library.",
        variant: "destructive",
      });
      return;
    }

    if (!formTitle.trim()) {
      toast({
        title: "Title Required", 
        description: "Please add a title before saving to library.",
        variant: "destructive",
      });
      return;
    }

    onSaveToLibrary();
    toast({
      title: "Saved to Library",
      description: "Form has been saved to the library successfully.",
    });
  };

  const handleReadOnlyAction = () => {
    toast({
      title: "Form is Published",
      description: "This published form is in read-only mode. Move it to draft to enable editing.",
      variant: "destructive",
    });
  };

  const safeOnAddField = isPublished ? handleReadOnlyAction : onAddField;
  const safeOnUpdateField = isPublished ? () => handleReadOnlyAction() : onUpdateField;
  const safeOnRemoveField = isPublished ? () => handleReadOnlyAction() : onRemoveField;
  const safeOnUpdateTitle = isPublished ? () => handleReadOnlyAction() : onUpdateTitle;
  const safeOnUpdateDescription = isPublished ? () => handleReadOnlyAction() : onUpdateDescription;
  const safeOnReorderFields = isPublished ? () => handleReadOnlyAction() : onReorderFields;

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Field Palette */}
      <div className="col-span-3">
        {isPublished ? (
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Published Form
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="text-center text-gray-500">
                <Lock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-sm font-medium mb-2">Form is Published</p>
                <p className="text-xs text-gray-400 mb-4">This form is in read-only mode and cannot be edited</p>
                <Button 
                  onClick={onMoveToDraft}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Move to Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <FieldPalette onAddField={safeOnAddField} />
        )}
      </div>

      {/* Form Canvas */}
      <div className="col-span-6">
        <Card className="h-full">
          <CardHeader>
            <div className="space-y-4">
              {isPublished && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-blue-600" />
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Published - Read Only
                    </Badge>
                  </div>
                  <Button 
                    onClick={onMoveToDraft}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Move to Draft
                  </Button>
                </div>
              )}
              
              <div>
                <Label htmlFor="form-title">Form Title</Label>
                <Input
                  id="form-title"
                  value={formTitle}
                  onChange={(e) => safeOnUpdateTitle(e.target.value)}
                  placeholder="Enter form title"
                  className="mt-1"
                  readOnly={isPublished}
                  disabled={isPublished}
                />
              </div>
              <div>
                <Label htmlFor="form-description">Form Description</Label>
                <Textarea
                  id="form-description"
                  value={formDescription}
                  onChange={(e) => safeOnUpdateDescription(e.target.value)}
                  placeholder="Enter form description"
                  className="mt-1"
                  rows={2}
                  readOnly={isPublished}
                  disabled={isPublished}
                />
              </div>
              
              <FormCategoryManager
                selectedCategory={formCategory}
                onCategoryChange={onCategoryChange}
                onSaveToLibrary={handleSaveToLibrary}
                canSaveToLibrary={formFields.length > 0}
                readOnly={isPublished}
              />
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
                  onUpdateField={safeOnUpdateField}
                  onRemoveField={safeOnRemoveField}
                  onAddField={safeOnAddField}
                  onReorderFields={safeOnReorderFields}
                  readOnly={isPublished}
                />
              </TabsContent>
              
              <TabsContent value="attachments" className="mt-4">
                <FileAttachmentManager
                  attachments={attachments}
                  onUpdateAttachments={isPublished ? () => handleReadOnlyAction() : onUpdateAttachments}
                  allowedTypes={allowedFileTypes}
                  maxSize={maxFileSize}
                  readOnly={isPublished}
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
          onUpdateField={safeOnUpdateField}
          readOnly={isPublished}
        />
      </div>
    </div>
  );
};
