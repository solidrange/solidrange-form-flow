import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

interface MultiSelectCategoryProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  disabled?: boolean;
}

const categoryOptions = [
  "survey", "assessment", "registration", "feedback", "compliance", 
  "risk", "vendor-risk", "external-assessment", "hr", "customer", 
  "finance", "it", "security", "quality", "operations", "procurement", 
  "marketing", "sales", "project", "training", "legal", "audit", "business"
];

export const MultiSelectCategory = ({ 
  selectedCategories, 
  onCategoryChange, 
  disabled = false 
}: MultiSelectCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const removeCategory = (category: string) => {
    onCategoryChange(selectedCategories.filter(c => c !== category));
  };

  const formatCategoryLabel = (category: string) => {
    switch (category) {
      case "vendor-risk": return "Vendor Risk";
      case "external-assessment": return "External Assessment";
      case "hr": return "HR";
      case "it": return "IT";
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">Categories</Label>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between border focus:border-primary h-auto min-h-[40px] p-2"
            disabled={disabled}
          >
            <div className="flex flex-wrap gap-1">
              {selectedCategories.length === 0 ? (
                <span className="text-gray-500">Select categories...</span>
              ) : (
                selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="flex items-center gap-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCategory(category);
                    }}
                  >
                    {formatCategoryLabel(category)}
                    <span className="ml-1 cursor-pointer hover:bg-gray-300 rounded-full w-3 h-3 flex items-center justify-center text-xs">×</span>
                  </Badge>
                ))
              )}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-full p-2 max-h-60 overflow-y-auto">
          <div className="space-y-2">
            {categoryOptions.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label 
                  htmlFor={`category-${category}`} 
                  className="text-sm cursor-pointer"
                >
                  {formatCategoryLabel(category)}
                </Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};