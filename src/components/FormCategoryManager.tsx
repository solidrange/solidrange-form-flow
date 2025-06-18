
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderPlus, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FormCategoryManagerProps {
  currentCategory: string;
  customCategory: string;
  onCategoryUpdate: (category: string, isCustom?: boolean) => void;
  formTitle: string;
}

/**
 * Predefined categories for form organization
 * These categories help users organize forms by their purpose
 */
const DEFAULT_CATEGORIES = [
  'survey',
  'assessment', 
  'registration',
  'feedback',
  'compliance',
  'risk',
  'vendor-risk'
] as const;

/**
 * Category guidelines for user reference
 * Helps users understand when to use each category
 */
const CATEGORY_GUIDELINES = {
  survey: 'Customer feedback, satisfaction surveys',
  assessment: 'Skills testing, evaluations',
  registration: 'Event sign-ups, onboarding',
  'vendor-risk': 'Risk assessment forms for vendors',
  compliance: 'Regulatory and policy compliance',
  feedback: 'General feedback collection',
  risk: 'Risk assessment and management'
} as const;

/**
 * FormCategoryManager Component
 * 
 * Manages form categorization for library organization.
 * Allows users to assign forms to predefined categories or create custom ones.
 * 
 * Features:
 * - Predefined category selection
 * - Custom category creation and management
 * - Category guidelines and descriptions
 * - Real-time category assignment
 */
export const FormCategoryManager = ({
  currentCategory,
  customCategory,
  onCategoryUpdate,
  formTitle
}: FormCategoryManagerProps) => {
  // Local state for managing custom categories and UI interactions
  const [newCategoryName, setNewCategoryName] = useState("");
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);

  /**
   * Handles category selection from dropdown
   * Updates the form's category and shows success feedback
   */
  const handleCategorySelect = (category: string) => {
    // Handle the special "no-category" value
    const actualCategory = category === "no-category" ? "" : category;
    onCategoryUpdate(actualCategory, false);
    toast({
      title: "Category Updated",
      description: category === "no-category" 
        ? `Form "${formTitle}" removed from all categories.`
        : `Form "${formTitle}" assigned to ${category} category.`,
    });
  };

  /**
   * Validates and adds a new custom category
   * Prevents duplicates and empty names
   */
  const handleAddCustomCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Invalid Category",
        description: "Please enter a valid category name.",
        variant: "destructive"
      });
      return;
    }

    const trimmedName = newCategoryName.trim().toLowerCase();
    
    // Check for duplicates in both default and custom categories
    if (DEFAULT_CATEGORIES.includes(trimmedName as any) || customCategories.includes(trimmedName)) {
      toast({
        title: "Category Exists",
        description: "This category already exists.",
        variant: "destructive"
      });
      return;
    }

    // Add new category and assign it to the current form
    setCustomCategories(prev => [...prev, trimmedName]);
    onCategoryUpdate(trimmedName, true);
    setNewCategoryName("");
    setShowAddCategory(false);
    
    toast({
      title: "Category Created",
      description: `New category "${trimmedName}" created and assigned to form.`,
    });
  };

  /**
   * Removes a custom category
   * Resets form category if it was using the removed category
   */
  const removeCustomCategory = (category: string) => {
    setCustomCategories(prev => prev.filter(cat => cat !== category));
    if (customCategory === category) {
      onCategoryUpdate('', false);
    }
    toast({
      title: "Category Removed",
      description: `Category "${category}" has been removed.`,
    });
  };

  /**
   * Formats category name for display
   * Handles special cases like 'vendor-risk'
   */
  const formatCategoryName = (category: string): string => {
    if (category === 'vendor-risk') return 'Vendor Risk';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Combine all available categories
  const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];
  const selectedCategory = currentCategory || customCategory || "no-category";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5" />
            Form Category Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Form Display */}
          <div>
            <Label className="text-base font-medium">Current Form</Label>
            <p className="text-sm text-gray-600 mt-1">{formTitle}</p>
          </div>

          {/* Category Selection */}
          <div>
            <Label htmlFor="category-select" className="text-base font-medium">
              Select Category
            </Label>
            <Select value={selectedCategory} onValueChange={handleCategorySelect}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose a category for this form" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-category">No Category</SelectItem>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {formatCategoryName(category)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCategory && selectedCategory !== "no-category" && (
              <div className="mt-2">
                <Badge variant="secondary">
                  Currently in: {formatCategoryName(selectedCategory)}
                </Badge>
              </div>
            )}
          </div>

          {/* Custom Category Management */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-medium">Custom Categories</Label>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowAddCategory(!showAddCategory)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>

            {/* Add New Category Form */}
            {showAddCategory && (
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Enter new category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomCategory()}
                />
                <Button onClick={handleAddCustomCategory}>Add</Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategoryName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}

            {/* Custom Categories List */}
            {customCategories.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Custom categories:</p>
                <div className="flex flex-wrap gap-2">
                  {customCategories.map((category) => (
                    <Badge key={category} variant="outline" className="flex items-center gap-1">
                      {formatCategoryName(category)}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => removeCustomCategory(category)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category Guidelines */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Category Guidelines</h4>
            <div className="text-sm text-gray-600 space-y-1">
              {Object.entries(CATEGORY_GUIDELINES).map(([category, description]) => (
                <p key={category}>
                  <strong>{formatCategoryName(category)}:</strong> {description}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
