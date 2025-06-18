
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Tag } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DEFAULT_CATEGORIES = [
  "survey",
  "assessment", 
  "registration",
  "feedback",
  "compliance",
  "risk",
  "vendor-risk",
  "others"
];

interface FormCategoryManagerProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSaveToLibrary: () => void;
  canSaveToLibrary: boolean;
}

export const FormCategoryManager = ({
  selectedCategory,
  onCategoryChange,
  onSaveToLibrary,
  canSaveToLibrary
}: FormCategoryManagerProps) => {
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);

  const allCategories = [...DEFAULT_CATEGORIES, ...customCategories];

  const handleAddNewCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Invalid Category",
        description: "Please enter a valid category name.",
        variant: "destructive",
      });
      return;
    }

    if (allCategories.includes(newCategoryName.toLowerCase())) {
      toast({
        title: "Category Exists",
        description: "This category already exists.",
        variant: "destructive",
      });
      return;
    }

    const newCategory = newCategoryName.toLowerCase().trim();
    setCustomCategories([...customCategories, newCategory]);
    onCategoryChange(newCategory);
    setNewCategoryName("");
    setShowNewCategoryDialog(false);
    
    toast({
      title: "Category Added",
      description: `"${newCategoryName}" category has been created.`,
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4" />
        <Label className="font-medium">Form Category</Label>
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "vendor-risk" ? "Vendor Risk" : 
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Dialog open={showNewCategoryDialog} onOpenChange={setShowNewCategoryDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddNewCategory} className="flex-1">
                  Add Category
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewCategoryDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {canSaveToLibrary && (
        <Button 
          onClick={onSaveToLibrary}
          variant="outline"
          className="w-full"
          disabled={!selectedCategory}
        >
          Save to Library
        </Button>
      )}
    </div>
  );
};
