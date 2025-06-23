
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Library, Plus } from "lucide-react";

interface FormCategoryManagerProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSaveToLibrary: () => void;
  canSaveToLibrary: boolean;
  readOnly?: boolean;
}

const defaultCategories = [
  "General Forms",
  "Contact Forms", 
  "Survey Forms",
  "Registration Forms",
  "Feedback Forms",
  "Application Forms",
  "Vendor Risk Assessment",
  "Security Assessment",
  "Compliance Forms",
  "HR Forms",
  "Customer Onboarding",
  "Others"
];

export const FormCategoryManager = ({
  selectedCategory,
  onCategoryChange,
  onSaveToLibrary,
  canSaveToLibrary,
  readOnly = false
}: FormCategoryManagerProps) => {
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const allCategories = [...defaultCategories, ...customCategories];

  const handleAddCategory = () => {
    if (newCategory.trim() && !allCategories.includes(newCategory.trim())) {
      const trimmedCategory = newCategory.trim();
      setCustomCategories(prev => [...prev, trimmedCategory]);
      onCategoryChange(trimmedCategory);
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="form-category">Category</Label>
        <div className="flex gap-2 mt-1">
          <Select 
            value={selectedCategory} 
            onValueChange={onCategoryChange}
            disabled={readOnly}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {!readOnly && (
            <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-category">Category Name</Label>
                    <Input
                      id="new-category"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter category name"
                      className="mt-1"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddCategory} className="flex-1">
                      Add Category
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsAddingCategory(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      <Button 
        onClick={onSaveToLibrary}
        className="w-full flex items-center gap-2"
        disabled={!canSaveToLibrary || readOnly}
        variant={readOnly ? "secondary" : "default"}
      >
        <Library className="h-4 w-4" />
        {readOnly ? "Published Form" : "Save to Library"}
      </Button>
    </div>
  );
};
