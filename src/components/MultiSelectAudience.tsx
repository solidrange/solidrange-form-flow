import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Building, Users, Globe, ChevronDown } from "lucide-react";

interface MultiSelectAudienceProps {
  selectedAudiences: string[];
  onAudienceChange: (audiences: string[]) => void;
  disabled?: boolean;
}

const audienceOptions = [
  { value: 'vendor', label: 'Vendor', icon: <Building className="h-3 w-3" /> },
  { value: 'internal', label: 'Internal', icon: <Users className="h-3 w-3" /> },
  { value: 'external', label: 'External', icon: <Globe className="h-3 w-3" /> }
];

export const MultiSelectAudience = ({ 
  selectedAudiences, 
  onAudienceChange, 
  disabled = false 
}: MultiSelectAudienceProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAudience = (audience: string) => {
    if (selectedAudiences.includes(audience)) {
      onAudienceChange(selectedAudiences.filter(a => a !== audience));
    } else {
      onAudienceChange([...selectedAudiences, audience]);
    }
  };

  const removeAudience = (audience: string) => {
    onAudienceChange(selectedAudiences.filter(a => a !== audience));
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">Target Audience</Label>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between border-gray-200 focus:border-blue-500 h-auto min-h-[40px] p-2"
            disabled={disabled}
          >
            <div className="flex flex-wrap gap-1">
              {selectedAudiences.length === 0 ? (
                <span className="text-gray-500">Select audiences...</span>
              ) : (
                selectedAudiences.map((audience) => {
                  const option = audienceOptions.find(opt => opt.value === audience);
                  return (
                    <Badge
                      key={audience}
                      variant="secondary"
                      className="flex items-center gap-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAudience(audience);
                      }}
                    >
                      {option?.icon}
                      {option?.label}
                      <span className="ml-1 cursor-pointer hover:bg-gray-300 rounded-full w-3 h-3 flex items-center justify-center text-xs">×</span>
                    </Badge>
                  );
                })
              )}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-full p-2">
          <div className="space-y-2">
            {audienceOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`audience-${option.value}`}
                  checked={selectedAudiences.includes(option.value)}
                  onCheckedChange={() => toggleAudience(option.value)}
                />
                <Label 
                  htmlFor={`audience-${option.value}`} 
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  {option.icon}
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};