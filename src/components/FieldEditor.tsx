
import { FormField } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface FieldEditorProps {
  selectedField: FormField | null;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
}

export const FieldEditor = ({ selectedField, onUpdateField }: FieldEditorProps) => {
  if (!selectedField) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">Field Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            Select a field to edit its properties
          </p>
        </CardContent>
      </Card>
    );
  }

  const updateField = (updates: Partial<FormField>) => {
    onUpdateField(selectedField.id, updates);
  };

  const addOption = () => {
    const currentOptions = selectedField.options || [];
    updateField({ options: [...currentOptions, `Option ${currentOptions.length + 1}`] });
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(selectedField.options || [])];
    newOptions[index] = value;
    updateField({ options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = selectedField.options?.filter((_, idx) => idx !== index);
    updateField({ options: newOptions });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Field Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="field-label">Label</Label>
          <Input
            id="field-label"
            value={selectedField.label}
            onChange={(e) => updateField({ label: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="field-placeholder">Placeholder</Label>
          <Input
            id="field-placeholder"
            value={selectedField.placeholder || ''}
            onChange={(e) => updateField({ placeholder: e.target.value })}
            className="mt-1"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="field-required"
            checked={selectedField.required}
            onCheckedChange={(checked) => updateField({ required: !!checked })}
          />
          <Label htmlFor="field-required">Required field</Label>
        </div>

        {(selectedField.type === 'select' || selectedField.type === 'radio' || selectedField.type === 'checkbox') && (
          <div>
            <Label>Options</Label>
            <div className="space-y-2 mt-2">
              {selectedField.options?.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={addOption}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </Button>
            </div>
          </div>
        )}

        {selectedField.type === 'rating' && (
          <div>
            <Label>Scoring</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Checkbox
                checked={selectedField.scoring?.enabled || false}
                onCheckedChange={(checked) => 
                  updateField({ 
                    scoring: { 
                      ...selectedField.scoring, 
                      enabled: !!checked 
                    } 
                  })
                }
              />
              <Label>Enable scoring for this field</Label>
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="validation-message">Validation Message</Label>
          <Textarea
            id="validation-message"
            value={selectedField.validation?.message || ''}
            onChange={(e) => updateField({ 
              validation: { 
                ...selectedField.validation, 
                message: e.target.value 
              } 
            })}
            placeholder="Custom validation message"
            className="mt-1"
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
};
