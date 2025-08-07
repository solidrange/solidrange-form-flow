import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { FormTemplate } from "@/types/form";
import { toast } from "@/hooks/use-toast";

interface SaveTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Omit<FormTemplate, 'id'>) => void;
  currentTemplate?: {
    name: string;
    description: string;
    category?: string;
    sector?: string | string[];
  };
  originalTags?: string[]; // Add original tags prop
}

export const SaveTemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSave, 
  currentTemplate,
  originalTags = []
}: SaveTemplateDialogProps) => {
  const [templateName, setTemplateName] = useState(currentTemplate?.name || '');
  const [templateDescription, setTemplateDescription] = useState(currentTemplate?.description || '');
  const [templateTags, setTemplateTags] = useState<string[]>(originalTags);
  const [currentTag, setCurrentTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Update tags when originalTags prop changes
  React.useEffect(() => {
    setTemplateTags(originalTags);
  }, [originalTags]);

  const addTag = () => {
    if (currentTag.trim() && !templateTags.includes(currentTag.trim())) {
      setTemplateTags([...templateTags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTemplateTags(templateTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSave = async () => {
    if (!templateName.trim()) {
      toast({
        title: "Template Name Required",
        description: "Please enter a name for your template.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const template: Omit<FormTemplate, 'id'> = {
        name: templateName.trim(),
        description: templateDescription.trim(),
        category: currentTemplate?.category || '',
        sector: currentTemplate?.sector || '',
        fields: [], // This will be populated by the parent component
        tags: templateTags
      };

      onSave(template);
      onClose();
      
      toast({
        title: "Template Saved",
        description: `"${templateName}" has been saved to your template library.`,
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setTemplateName(currentTemplate?.name || '');
    setTemplateDescription(currentTemplate?.description || '');
    setTemplateTags(originalTags);
    setCurrentTag('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save as Template</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name..."
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Choose a unique name to avoid conflicts with existing templates
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="template-description">Description (Optional)</Label>
            <Textarea
              id="template-description"
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
              placeholder="Describe what this template is for..."
              className="w-full"
              rows={3}
            />
          </div>

          
          <div className="space-y-2">
            <Label htmlFor="template-tags">Tags</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  id="template-tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add tags (press Enter)"
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  onClick={addTag} 
                  variant="outline" 
                  size="sm"
                  disabled={!currentTag.trim()}
                >
                  Add
                </Button>
              </div>
              
              {templateTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {templateTags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-gray-500">
                {originalTags.length > 0 
                  ? "Original template tags are pre-populated. Remove or add tags as needed."
                  : "Add relevant tags to make your template easier to find in the library"
                }
              </p>
            </div>
          </div>

          {currentTemplate?.category && (
            <div className="text-sm text-gray-600">
              <strong>Category:</strong> {currentTemplate.category}
            </div>
          )}

          {currentTemplate?.sector && (
            <div className="text-sm text-gray-600">
              <strong>Sector:</strong> {
                Array.isArray(currentTemplate.sector) 
                  ? currentTemplate.sector.join(', ') 
                  : currentTemplate.sector
              }
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Template'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};