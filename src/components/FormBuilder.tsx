/**
 * FORM BUILDER COMPONENT
 * =======================
 * 
 * This is the main interface where users create and edit forms.
 * Think of this as a digital form designer with three main areas:
 * 1. Field Palette (left) - Tools to add new fields
 * 2. Form Canvas (center) - The actual form being built
 * 3. Field Editor (right) - Settings for the selected field
 * 
 * Business Context:
 * This component handles the entire form creation process, from adding
 * basic fields to configuring advanced settings like scoring and validation.
 * It's designed to work on both desktop and mobile devices.
 * 
 * Key Features:
 * - Drag & drop interface for building forms
 * - Real-time preview of how the form will look
 * - Field configuration and validation setup
 * - File attachment management
 * - Category management for organizing forms
 * - Read-only mode for published forms
 */

import { useState } from "react";
import { FormField, DocumentAttachment } from "@/types/form";    // Data type definitions
import { FieldPalette } from "./FieldPalette";     // Left panel: Available form fields
import { FieldEditor } from "./FieldEditor";       // Right panel: Field configuration
import { FormCanvas } from "./FormCanvas";         // Center panel: Form preview and editing
import { FileAttachmentManager } from "./FileAttachmentManager";  // File upload management
import { FormCategoryManager } from "./FormCategoryManager";      // Form categorization
import { Input } from "@/components/ui/input";         // Text input component
import { Textarea } from "@/components/ui/textarea";   // Multi-line text input
import { Label } from "@/components/ui/label";         // Form labels
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";  // Card layout
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";  // Tab navigation
import { Badge } from "@/components/ui/badge";         // Status indicators
import { Button } from "@/components/ui/button";       // Clickable buttons
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Select dropdown
import { MultiSelectAudience } from "./MultiSelectAudience";  // Multi-select audience component
import { MultiSelectCategory } from "./MultiSelectCategory";  // Multi-select category component
import { toast } from "@/hooks/use-toast";             // Notification messages
import { Lock, ArrowLeft, Sparkles, Layout, Paperclip, Menu, X, Plus } from "lucide-react";  // Icons

/**
 * FormBuilder Component Properties
 * ================================
 * 
 * These are all the data and functions that the FormBuilder needs to work.
 * The parent component (usually the main dashboard) provides these.
 */
interface FormBuilderProps {
  // Current form data
  formFields: FormField[];           // All fields currently in the form
  formTitle: string;                 // Title of the form being built
  formDescription: string;           // Description of what the form is for
  
  // Functions to modify the form (callbacks to parent component)
  onAddField: (field: FormField) => void;                              // Add a new field
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;  // Modify existing field
  onRemoveField: (fieldId: string) => void;                            // Delete a field
  onUpdateTitle: (title: string) => void;                              // Change form title
  onUpdateDescription: (description: string) => void;                  // Change form description
  onReorderFields: (dragIndex: number, hoverIndex: number) => void;    // Rearrange field order
  
  // File attachment settings (optional)
  attachments?: DocumentAttachment[];                    // Currently attached files
  onUpdateAttachments?: (attachments: DocumentAttachment[]) => void;  // Update file list
  allowedFileTypes?: string[];                          // What file types are allowed
  maxFileSize?: number;                                 // Maximum file size in MB
  
  // Form organization (optional)
  formCategory?: string | string[];                    // Category(s) this form belongs to
  formTargetAudience?: string | string[];              // Target audience(s) (vendor, external, internal)
  onCategoryChange?: (category: string | string[]) => void;       // Function to change category
  onTargetAudienceChange?: (audience: string | string[]) => void; // Function to change target audience
  onSaveToLibrary?: () => void;                        // Function to save as template
  
  // Form state control (optional)
  isPublished?: boolean;                               // Whether form is published (read-only)
  onMoveToDraft?: () => void;                         // Function to move back to draft mode
}

/**
 * Main FormBuilder Component
 * ==========================
 * 
 * This component provides a comprehensive interface for building forms.
 * It automatically adapts between desktop (3-column layout) and mobile (stacked layout).
 * 
 * The component manages its own internal state for:
 * - Which field is currently selected for editing
 * - Whether mobile panels are shown/hidden
 * - Input validation and error handling
 */
export const FormBuilder = ({
  formFields,              // Current list of fields in the form
  formTitle,               // Current form title
  formDescription,         // Current form description
  onAddField,              // Function to call when adding a new field
  onUpdateField,           // Function to call when modifying a field
  onRemoveField,           // Function to call when removing a field
  onUpdateTitle,           // Function to call when changing the title
  onUpdateDescription,     // Function to call when changing the description
  onReorderFields,         // Function to call when rearranging fields
  attachments = [],        // List of attached files (default: empty)
  onUpdateAttachments = () => {},  // Function to call when files change (default: do nothing)
  allowedFileTypes = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png'],  // Allowed file types
  maxFileSize = 10,        // Maximum file size in MB (default: 10MB)
  formCategory = [],       // Current form categories (default: none)
  formTargetAudience = [], // Current target audiences (default: none)
  onCategoryChange = () => {},     // Function to call when category changes
  onTargetAudienceChange = () => {}, // Function to call when target audience changes
  onSaveToLibrary = () => {},      // Function to call when saving to library
  isPublished = false,     // Whether form is published (default: draft mode)
  onMoveToDraft = () => {}         // Function to call when moving to draft
}: FormBuilderProps) => {
  
  // ===========================
  // COMPONENT STATE MANAGEMENT
  // ===========================
  
  // Track which field is currently selected for editing (null = none selected)
  const [selectedField, setSelectedField] = useState<string | null>(null);
  
  // Mobile-specific state: control visibility of popup panels
  const [showFieldPalette, setShowFieldPalette] = useState(false);  // Show field selection panel
  const [showFieldEditor, setShowFieldEditor] = useState(false);    // Show field editing panel

  // ===========================
  // UTILITY FUNCTIONS
  // ===========================
  
  /**
   * Save Form to Template Library
   * ==============================
   * 
   * This function handles saving the current form as a reusable template.
   * 
   * Business Context:
   * Users often create similar forms repeatedly. By saving successful forms
   * as templates, they can quickly create new forms without starting from scratch.
   * 
   * Validation Rules:
   * - Form must have a title (users need to identify it)
   * - Form must have a category (for organization)
   * - These rules ensure templates are useful and findable
   */
  const handleSaveToLibrary = () => {
    // Check if user selected a category for organization
    const categories = Array.isArray(formCategory) ? formCategory : formCategory ? [formCategory] : [];
    if (categories.length === 0) {
      toast({
        title: "Category Required",
        description: "Please select at least one category before saving to library.",
        variant: "destructive",
      });
      return;
    }

    // Check if form has a title for identification
    if (!formTitle.trim()) {
      toast({
        title: "Title Required", 
        description: "Please add a title before saving to library.",
        variant: "destructive",
      });
      return;
    }

    // All validation passed - save the template
    onSaveToLibrary();
    toast({
      title: "Saved to Library",
      description: "Form has been saved to the library successfully.",
    });
  };

  /**
   * Handle Read-Only Mode Actions
   * ==============================
   * 
   * When a form is published, it becomes read-only to prevent accidental changes.
   * This function shows an informative message when users try to edit published forms.
   * 
   * Business Context:
   * Published forms might already have submissions or be shared with users.
   * Changing them could break existing data or confuse people who have the link.
   * Users must explicitly move forms back to draft mode to edit them.
   */
  const handleReadOnlyAction = () => {
    toast({
      title: "Form is Published",
      description: "This published form is in read-only mode. Move it to draft to enable editing.",
      variant: "destructive",
    });
  };

  // ===========================
  // SAFE FUNCTION WRAPPERS
  // ===========================
  // 
  // These create "safe" versions of the editing functions that respect the published status.
  // When a form is published, these functions show the read-only message instead of editing.
  
  const safeOnAddField = isPublished ? handleReadOnlyAction : onAddField;
  const safeOnUpdateField = isPublished ? () => handleReadOnlyAction() : onUpdateField;
  const safeOnRemoveField = isPublished ? () => handleReadOnlyAction() : onRemoveField;
  const safeOnUpdateTitle = isPublished ? () => handleReadOnlyAction() : onUpdateTitle;
  const safeOnUpdateDescription = isPublished ? () => handleReadOnlyAction() : onUpdateDescription;
  const safeOnReorderFields = isPublished ? () => handleReadOnlyAction() : onReorderFields;

  // ===========================
  // USER INTERFACE LAYOUT
  // ===========================
  // 
  // The FormBuilder has two different layouts that automatically switch based on screen size:
  // 1. Desktop Layout: Three-column design with side panels
  // 2. Mobile Layout: Stacked design with popup overlays
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/80 to-blue-50/40">
      
      {/* ===========================
           MOBILE-ONLY HEADER BAR
           ===========================
           
           This header appears only on mobile devices (hidden on desktop).
           It provides quick access to the field palette and editor panels.
           
           Business Context:
           Mobile users need easy access to form building tools, but screen space
           is limited. This header provides essential controls without cluttering
           the main work area.
      */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold text-gray-900 truncate">Form Builder</h1>
          <div className="flex items-center gap-2">
            {/* Only show editing buttons if form is not published */}
            {!isPublished && (
              <>
                {/* Button to show field selection popup */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFieldPalette(!showFieldPalette)}
                  className="p-2"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                {/* Button to show field editing popup */}
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

      {/* ===========================
           DESKTOP LAYOUT (3-COLUMN)
           ===========================
           
           This layout appears only on large screens (desktop/tablet landscape).
           It uses a three-column grid system:
           - Column 1 (left): Field Palette or Published Form Notice
           - Column 2 (center): Form Canvas with title, description, and fields
           - Column 3 (right): Field Editor for configuring selected fields
           
           Business Context:
           Desktop users have more screen space and typically use mouse interaction.
           This layout optimizes for productivity with all tools visible at once.
      */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6 p-6 h-[calc(100vh-120px)]">
        
        {/* ===========================
             LEFT COLUMN: FIELD PALETTE
             ===========================
             
             For draft forms: Shows available field types to add
             For published forms: Shows read-only notice with option to edit
        */}
        <div className="col-span-3 animate-fade-in">
          {isPublished ? (
            /* Published Form Notice - Replace field palette with information panel */
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
            /* Draft Form - Show field palette for adding new fields */
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
                
                {/* Category and Target Audience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MultiSelectCategory
                    selectedCategories={Array.isArray(formCategory) ? formCategory : formCategory ? [formCategory] : []}
                    onCategoryChange={(categories) => onCategoryChange(categories)}
                    disabled={isPublished}
                  />
                  
                  <MultiSelectAudience
                    selectedAudiences={Array.isArray(formTargetAudience) ? formTargetAudience : formTargetAudience ? [formTargetAudience] : []}
                    onAudienceChange={(audiences) => onTargetAudienceChange(audiences)}
                    disabled={isPublished}
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden">
              <Tabs defaultValue="fields" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 p-1 rounded-lg h-9">
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
      <div className="lg:hidden p-3 space-y-3">
        {/* Form Header */}
        <Card className="modern-card">
          <CardHeader className="pb-3">
            {/* Published Status Banner */}
            {isPublished && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-3">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-600 text-white border-0 text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Published
                  </Badge>
                  <Button 
                    onClick={onMoveToDraft}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 px-2"
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
              
              <div className="space-y-3">
                <MultiSelectCategory
                  selectedCategories={Array.isArray(formCategory) ? formCategory : formCategory ? [formCategory] : []}
                  onCategoryChange={(categories) => onCategoryChange(categories)}
                  disabled={isPublished}
                />
                
                <MultiSelectAudience
                  selectedAudiences={Array.isArray(formTargetAudience) ? formTargetAudience : formTargetAudience ? [formTargetAudience] : []}
                  onAudienceChange={(audiences) => onTargetAudienceChange(audiences)}
                  disabled={isPublished}
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Mobile Tabs */}
        <Tabs defaultValue="fields" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg h-9">
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
          
          <TabsContent value="fields" className="mt-3">
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
          
          <TabsContent value="attachments" className="mt-3">
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
