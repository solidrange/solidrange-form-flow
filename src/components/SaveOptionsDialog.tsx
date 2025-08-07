import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save, BookOpen, X } from "lucide-react";

interface SaveOptionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveDraft: () => void;
  onSaveAsTemplate: () => void;
  formTitle: string;
}

export const SaveOptionsDialog = ({ 
  isOpen, 
  onClose, 
  onSaveDraft, 
  onSaveAsTemplate,
  formTitle 
}: SaveOptionsDialogProps) => {
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save "{formTitle}"</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600 mb-6">
            Choose how you'd like to save your form:
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={onSaveDraft}
              className="w-full justify-start gap-3 h-12"
              variant="outline"
            >
              <Save className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Save as Draft</div>
                <div className="text-xs text-gray-500">Save your form to continue editing later</div>
              </div>
            </Button>
            
            <Button 
              onClick={onSaveAsTemplate}
              className="w-full justify-start gap-3 h-12"
              variant="outline"
            >
              <BookOpen className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Save as New Template</div>
                <div className="text-xs text-gray-500">Create a reusable template for future forms</div>
              </div>
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} className="gap-2">
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};