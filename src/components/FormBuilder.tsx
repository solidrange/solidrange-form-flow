
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
import { Lock, ArrowLeft, Sparkles, Layout, Paperclip, Menu, X } from "lucide-react";

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
 * Modern Form Builder Component - Fully Mobile Responsive
 * Enterprise-ready form builder with modern design and mobile-first approach
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
  const [showFieldPalette, setShowFieldPalette] = useState(false);
  const [showFieldEditor, setShowFieldEditor] = useState(false);

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
      {/* Mobile Header with Controls */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900 truncate">Form Builder</h1>
          <div className="flex items-center gap-2">
            {!isPublished && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFieldPalette(!showFieldPalette)}
                  className="p-2"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFieldEditor(!showFieldEditor)}
                  className="p-2"
                >
                  <Layout className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6 p-6 h-[calc(100vh-120px)]">
        {/* Field Palette - Left Sidebar */}
        <div className="col-span-3 animate-fade-in">
          {isPublished ? (
            <Card className="modern-card h-full">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900 text-base">
                  <Lock className="h-5 w-5 text-blue-600" />
                  Published Form
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <Lock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Form is Published</h3>
                  <p className="text-sm text-gray-500 mb-4">This form is in read-only mode</p>
                  <Button 
                    onClick={onMoveToDraft}
                    className="btn-modern bg-blue-600 text-white hover:bg-blue-700 text-sm"
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
            <CardHeader className="pb-4">
              <div className="space-y-4">
                {/* Published Status Banner */}
                {isPublished && (
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                        <Badge className="bg-blue-600 text-white border-0 text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Published - Read Only
                        </Badge>
                      </div>
                      <Button 
                        onClick={onMoveToDraft}
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                      >
                        <ArrowLeft className="h-3 w-3 mr-1" />
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
                    className="text-base font-semibold border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
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
                    className="resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 text-sm"
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
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="fields" 
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all text-sm"
                  >
                    <Layout className="h-4 w-4" />
                    Fields
                  </TabsTrigger>
                  <TabsTrigger 
                    value="attachments"
                    className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all text-sm"
                  >
                    <Paperclip className="h-4 w-4" />
                    Files
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

      {/* Mobile Layout */}
      <div className="lg:hidden p-4 space-y-4">
        {/* Form Header */}
        <Card className="modern-card">
          <CardHeader className="pb-3">
            {/* Published Status Banner */}
            {isPublished && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600 text-white border-0 text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Published
                  </Badge>
                  <Button 
                    onClick={onMoveToDraft}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7"
                  >
                    <ArrowLeft className="h-3 w-3 mr-1" />
                    Draft
                  </Button>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="mobile-form-title" className="text-sm font-medium text-gray-700">
                  Title
                </Label>
                <Input
                  id="mobile-form-title"
                  value={formTitle}
                  onChange={(e) => safeOnUpdateTitle(e.target.value)}
                  placeholder="Form title"
                  className="text-sm font-semibold mt-1"
                  readOnly={isPublished}
                  disabled={isPublished}
                />
              </div>

              <div>
                <Label htmlFor="mobile-form-description" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="mobile-form-description"
                  value={formDescription}
                  onChange={(e) => safeOnUpdateDescription(e.target.value)}
                  placeholder="Form description"
                  className="resize-none text-sm mt-1"
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
        </Card>

        {/* Mobile Tabs */}
        <Tabs defaultValue="fields" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="fields" 
              className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md text-sm"
            >
              <Layout className="h-4 w-4" />
              Fields
            </TabsTrigger>
            <TabsTrigger 
              value="attachments"
              className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md text-sm"
            >
              <Paperclip className="h-4 w-4" />
              Files
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="fields" className="mt-4">
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
      </div>

      {/* Mobile Field Palette Overlay */}
      {showFieldPalette && !isPublished && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[70vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Add Field</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFieldPalette(false)}
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 overflow-y-auto">
              <FieldPalette onAddField={(field) => {
                safeOnAddField(field);
                setShowFieldPalette(false);
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Field Editor Overlay */}
      {showFieldEditor && selectedField && !isPublished && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-[70vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Edit Field</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFieldEditor(false)}
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 overflow-y-auto">
              <FieldEditor
                selectedField={formFields.find(f => f.id === selectedField) || null}
                onUpdateField={safeOnUpdateField}
                readOnly={isPublished}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
