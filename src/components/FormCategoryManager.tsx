
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

const defaultCategories = [
  'survey',
  'assessment', 
  'registration',
  'feedback',
  'compliance',
  'risk',
  'vendor-risk'
];

export const FormCategoryManager = ({
  currentCategory,
  customCategory,
  onCategoryUpdate,
  formTitle
}: FormCategoryManagerProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const handleCategorySelect = (category: string) => {
    onCategoryUpdate(category, false);
    toast({
      title: "Category Updated",
      description: `Form "${formTitle}" assigned to ${category} category.`,
    });
  };

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
    
    if (defaultCategories.includes(trimmedName) || customCategories.includes(trimmedName)) {
      toast({
        title: "Category Exists",
        description: "This category already exists.",
        variant: "destructive"
      });
      return;
    }

    setCustomCategories(prev => [...prev, trimmedName]);
    onCategoryUpdate(trimmedName, true);
    setNewCategoryName("");
    setShowAddCategory(false);
    
    toast({
      title: "Category Created",
      description: `New category "${trimmedName}" created and assigned to form.`,
    });
  };

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

  const allCategories = [...defaultCategories, ...customCategories];
  const selectedCategory = currentCategory || customCategory;

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
          <div>
            <Label className="text-base font-medium">Current Form</Label>
            <p className="text-sm text-gray-600 mt-1">{formTitle}</p>
          </div>

          <div>
            <Label htmlFor="category-select" className="text-base font-medium">
              Select Category
            </Label>
            <Select value={selectedCategory} onValueChange={handleCategorySelect}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Choose a category for this form" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Category</SelectItem>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'vendor-risk' ? 'Vendor Risk' : 
                     category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCategory && (
              <div className="mt-2">
                <Badge variant="secondary">
                  Currently in: {selectedCategory === 'vendor-risk' ? 'Vendor Risk' : 
                                selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </Badge>
              </div>
            )}
          </div>

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

            {customCategories.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Custom categories:</p>
                <div className="flex flex-wrap gap-2">
                  {customCategories.map((category) => (
                    <Badge key={category} variant="outline" className="flex items-center gap-1">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
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

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Category Guidelines</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Survey:</strong> Customer feedback, satisfaction surveys</p>
              <p><strong>Assessment:</strong> Skills testing, evaluations</p>
              <p><strong>Registration:</strong> Event sign-ups, onboarding</p>
              <p><strong>Vendor Risk:</strong> Risk assessment forms for vendors</p>
              <p><strong>Compliance:</strong> Regulatory and policy compliance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
