
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
import { Lock, ArrowLeft, Sparkles, Layout, Paperclip } from "lucide-react";

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

/**
 * Modern Form Builder Component
 * Enterprise-ready form builder with modern design inspired by Linear and Vanta
 * Features glassmorphism effects, smooth animations, and intuitive UX
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
  formCategory = "",
  onCategoryChange = () => {},
  onSaveToLibrary = () => {},
  isPublished = false,
  onMoveToDraft = () => {}
}: FormBuilderProps) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  /**
   * Handles saving form to library with validation
   */
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

  /**
   * Handles read-only actions for published forms
   */
  const handleReadOnlyAction = () => {
    toast({
      title: "Form is Published",
      description: "This published form is in read-only mode. Move it to draft to enable editing.",
      variant: "destructive",
    });
  };

  // Create safe handlers for published forms
  const safeOnAddField = isPublished ? handleReadOnlyAction : onAddField;
  const safeOnUpdateField = isPublished ? () => handleReadOnlyAction() : onUpdateField;
  const safeOnRemoveField = isPublished ? () => handleReadOnlyAction() : onRemoveField;
  const safeOnUpdateTitle = isPublished ? () => handleReadOnlyAction() : onUpdateTitle;
  const safeOnUpdateDescription = isPublished ? () => handleReadOnlyAction() : onUpdateDescription;
  const safeOnReorderFields = isPublished ? () => handleReadOnlyAction() : onReorderFields;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 to-blue-50/40">
      <div className="grid grid-cols-12 gap-8 p-6 h-[calc(100vh-120px)]">
        {/* Field Palette - Left Sidebar */}
        <div className="col-span-3 animate-fade-in">
          {isPublished ? (
            <Card className="modern-card h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Lock className="h-5 w-5 text-brand-secondary" />
                  Published Form
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Lock className="h-10 w-10 text-brand-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Form is Published</h3>
                  <p className="text-sm text-gray-500 mb-6">This form is in read-only mode and cannot be edited</p>
                  <Button 
                    onClick={onMoveToDraft}
                    className="btn-modern gradient-primary text-white hover:shadow-glow"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Move to Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full">
              <FieldPalette onAddField={safeOnAddField} />
            </div>
          )}
        </div>

        {/* Form Canvas - Center */}
        <div className="col-span-6 animate-slide-up">
          <Card className="modern-card h-full">
            <CardHeader className="pb-6">
              <div className="space-y-6">
                {/* Published Status Banner */}
                {isPublished && (
                  <div className="glass p-4 rounded-xl border border-blue-200/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-secondary rounded-full animate-pulse-glow"></div>
                        <Badge className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white border-0">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Published - Read Only
                        </Badge>
                      </div>
                      <Button 
                        onClick={onMoveToDraft}
                        variant="outline"
                        size="sm"
                        className="hover-lift"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Move to Draft
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Form Title Input */}
                <div className="space-y-2">
                  <Label htmlFor="form-title" className="text-sm font-medium text-gray-700">
                    Form Title
                  </Label>
                  <Input
                    id="form-title"
                    value={formTitle}
                    onChange={(e) => safeOnUpdateTitle(e.target.value)}
                    placeholder="Enter form title"
                    className="text-lg font-semibold border-gray-200 focus:border-brand-secondary focus:ring-brand-secondary/20"
                    readOnly={isPublished}
                    disabled={isPublished}
                  />
                </div>

                {/* Form Description Input */}
                <div className="space-y-2">
                  <Label htmlFor="form-description" className="text-sm font-medium text-gray-700">
                    Form Description
                  </Label>
                  <Textarea
                    id="form-description"
                    value={formDescription}
                    onChange={(e) => safeOnUpdateDescription(e.target.value)}
                    placeholder="Enter form description"
                    className="resize-none border-gray-200 focus:border-brand-secondary focus:ring-brand-secondary/20"
                    rows={2}
                    readOnly={isPublished}
                    disabled={isPublished}
                  />
                </div>
                
                {/* Category Manager */}
                <FormCategoryManager
                  selectedCategory={formCategory}
                  onCategoryChange={onCategoryChange}
                  onSaveToLibrary={handleSaveToLibrary}
                  canSaveToLibrary={formFields.length > 0}
                  readOnly={isPublished}
                />
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden">
              <Tabs defaultValue="fields" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-xl">
                  <TabsTrigger 
                    value="fields" 
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
                  >
                    <Layout className="h-4 w-4" />
                    Form Fields
                  </TabsTrigger>
                  <TabsTrigger 
                    value="attachments"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
                  >
                    <Paperclip className="h-4 w-4" />
                    File Attachments
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="fields" className="flex-1 overflow-auto">
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
                
                <TabsContent value="attachments" className="flex-1 overflow-auto">
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

        {/* Field Editor - Right Sidebar */}
        <div className="col-span-3 animate-fade-in">
          <FieldEditor
            selectedField={selectedField ? formFields.find(f => f.id === selectedField) : null}
            onUpdateField={safeOnUpdateField}
            readOnly={isPublished}
          />
        </div>
      </div>
    </div>
  );
};
