import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

interface MultiSelectFilterProps {
  options: string[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder: string;
  formatLabel?: (value: string) => string;
  showCounts?: boolean;
  getCounts?: (value: string) => number;
}

export const MultiSelectFilter = ({ 
  options, 
  selectedValues, 
  onSelectionChange, 
  placeholder,
  formatLabel,
  showCounts,
  getCounts
}: MultiSelectFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleValue = (value: string) => {
    if (value === "all") {
      onSelectionChange([]);
      return;
    }
    
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter(v => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  const removeValue = (value: string) => {
    onSelectionChange(selectedValues.filter(v => v !== value));
  };

  const formatOptionLabel = (option: string) => {
    if (formatLabel) {
      return formatLabel(option);
    }
    
    switch (option) {
      case "all": return "All";
      case "vendor-risk": return "Vendor Risk";
      case "external-assessment": return "External Assessment";
      case "hr": return "HR";
      case "it": return "IT";
      case "sme": return "SME";
      case "telecom": return "Telecom";
      case "multi-sector": return "Multi-Sector";
      case "other": return "Other";
      default: return option.charAt(0).toUpperCase() + option.slice(1);
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return placeholder;
    }
    if (selectedValues.length === 1) {
      return formatOptionLabel(selectedValues[0]);
    }
    return `${selectedValues.length} selected`;
  };

  return (
    <div className="space-y-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between h-auto min-h-[40px] p-2"
          >
            <div className="flex flex-wrap gap-1">
              {selectedValues.length === 0 ? (
                <span className="text-gray-500">{placeholder}</span>
              ) : (
                <>
                  <span className="text-sm">{getDisplayText()}</span>
                  {selectedValues.length > 1 && (
                    <div className="flex gap-1 flex-wrap">
                      {selectedValues.slice(0, 2).map((value) => (
                        <Badge
                          key={value}
                          variant="secondary"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeValue(value);
                          }}
                        >
                          {formatOptionLabel(value)}
                          <span className="ml-1 cursor-pointer hover:bg-gray-300 rounded-full w-3 h-3 flex items-center justify-center text-xs">×</span>
                        </Badge>
                      ))}
                      {selectedValues.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{selectedValues.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-full p-2 max-h-60 overflow-y-auto">
          <div className="space-y-2">
            {options.map((option) => {
              const count = showCounts && getCounts ? getCounts(option) : null;
              return (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-${option}`}
                    checked={option === "all" ? selectedValues.length === 0 : selectedValues.includes(option)}
                    onCheckedChange={() => toggleValue(option)}
                  />
                  <Label 
                    htmlFor={`filter-${option}`} 
                    className="text-sm cursor-pointer flex-1"
                  >
                    {formatOptionLabel(option)}
                    {showCounts && count !== null && (
                      <span className="text-gray-500 ml-1">({count})</span>
                    )}
                  </Label>
                </div>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};