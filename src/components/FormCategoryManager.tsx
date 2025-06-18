
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Tag, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export interface FormCategory {
  id: string;
  name: string;
  color?: string;
}

interface FormCategoryManagerProps {
  selectedCategory?: string;
  onCategoryChange: (categoryId: string) => void;
  onSaveToLibrary: (shouldSave: boolean) => void;
  saveToLibrary?: boolean;
  categories?: FormCategory[];
  onAddCategory?: (category: FormCategory) => void;
}

// Default categories
const defaultCategories: FormCategory[] = [
  { id: 'survey', name: 'Survey', color: 'bg-blue-100 text-blue-800' },
  { id: 'assessment', name: 'Assessment', color: 'bg-green-100 text-green-800' },
  { id: 'registration', name: 'Registration', color: 'bg-purple-100 text-purple-800' },
  { id: 'feedback', name: 'Feedback', color: 'bg-orange-100 text-orange-800' },
  { id: 'compliance', name: 'Compliance', color: 'bg-red-100 text-red-800' },
  { id: 'vendor-risk', name: 'Vendor Risk', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'others', name: 'Others', color: 'bg-gray-100 text-gray-800' }
];

export const FormCategoryManager = ({
  selectedCategory,
  onCategoryChange,
  onSaveToLibrary,
  saveToLibrary = false,
  categories = defaultCategories,
  onAddCategory
}: FormCategoryManagerProps) => {
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddNewCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Invalid Category",
        description: "Please enter a category name.",
        variant: "destructive",
      });
      return;
    }

    const newCategory: FormCategory = {
      id: newCategoryName.toLowerCase().replace(/\s+/g, '-'),
      name: newCategoryName,
      color: 'bg-indigo-100 text-indigo-800'
    };

    if (onAddCategory) {
      onAddCategory(newCategory);
    }

    onCategoryChange(newCategory.id);
    setNewCategoryName("");
    setShowNewCategoryInput(false);

    toast({
      title: "Category Added",
      description: `"${newCategoryName}" category has been created and selected.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Form Library Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Save to Library Option */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="save-to-library"
            checked={saveToLibrary}
            onCheckedChange={onSaveToLibrary}
          />
          <Label htmlFor="save-to-library" className="text-sm font-medium">
            Save this form to the library for future use
          </Label>
        </div>

        {/* Category Selection */}
        {saveToLibrary && (
          <div className="space-y-3">
            <Label htmlFor="category-select">Form Category</Label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-category">No Category</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={category.color}>
                        {category.name}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Selected Category Display */}
            {selectedCategory && selectedCategory !== "no-category" && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Selected:</span>
                <Badge 
                  variant="secondary" 
                  className={categories.find(c => c.id === selectedCategory)?.color}
                >
                  {categories.find(c => c.id === selectedCategory)?.name}
                </Badge>
              </div>
            )}

            {/* Add New Category */}
            <div className="space-y-2">
              {!showNewCategoryInput ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewCategoryInput(true)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Category
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Enter category name"
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddNewCategory()}
                  />
                  <Button onClick={handleAddNewCategory} size="sm">
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setShowNewCategoryInput(false);
                      setNewCategoryName("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
