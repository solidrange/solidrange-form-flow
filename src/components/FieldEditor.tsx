
import { FormField } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  const updateScoring = (updates: Partial<NonNullable<FormField['scoring']>>) => {
    updateField({
      scoring: {
        ...selectedField.scoring,
        enabled: selectedField.scoring?.enabled || false,
        ...updates
      }
    });
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

  const addCorrectAnswer = () => {
    const currentAnswers = selectedField.scoring?.correctAnswers || [];
    updateScoring({ correctAnswers: [...currentAnswers, ''] });
  };

  const updateCorrectAnswer = (index: number, value: string) => {
    const newAnswers = [...(selectedField.scoring?.correctAnswers || [])];
    newAnswers[index] = value;
    updateScoring({ correctAnswers: newAnswers });
  };

  const removeCorrectAnswer = (index: number) => {
    const newAnswers = selectedField.scoring?.correctAnswers?.filter((_, idx) => idx !== index);
    updateScoring({ correctAnswers: newAnswers });
  };

  return (
    <Card className="h-full overflow-auto">
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

        {/* Scoring Configuration */}
        <div className="border-t pt-4">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="enable-scoring"
              checked={selectedField.scoring?.enabled || false}
              onCheckedChange={(checked) => updateScoring({ enabled: !!checked })}
            />
            <Label htmlFor="enable-scoring">Enable scoring for this field</Label>
          </div>

          {selectedField.scoring?.enabled && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="max-points">Maximum Points</Label>
                <Input
                  id="max-points"
                  type="number"
                  value={selectedField.scoring.maxPoints || 10}
                  onChange={(e) => updateScoring({ maxPoints: parseInt(e.target.value) || 10 })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="weight-multiplier">Weight Multiplier</Label>
                <Select
                  value={selectedField.scoring.weightMultiplier?.toString() || "1"}
                  onValueChange={(value) => updateScoring({ weightMultiplier: parseInt(value) })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1x (Normal)</SelectItem>
                    <SelectItem value="2">2x (Double)</SelectItem>
                    <SelectItem value="3">3x (Triple)</SelectItem>
                    <SelectItem value="4">4x (Quadruple)</SelectItem>
                    <SelectItem value="5">5x (Quintuple)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(selectedField.type === 'select' || selectedField.type === 'radio' || selectedField.type === 'checkbox') && (
                <div>
                  <Label>Correct Answers</Label>
                  <div className="space-y-2 mt-2">
                    {selectedField.scoring.correctAnswers?.map((answer, index) => (
                      <div key={index} className="flex gap-2">
                        <Select
                          value={answer}
                          onValueChange={(value) => updateCorrectAnswer(index, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select correct answer" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedField.options?.map((option, optIndex) => (
                              <SelectItem key={optIndex} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeCorrectAnswer(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={addCorrectAnswer}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Correct Answer
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="manual-review"
                  checked={selectedField.scoring.requiresManualReview || false}
                  onCheckedChange={(checked) => updateScoring({ requiresManualReview: !!checked })}
                />
                <Label htmlFor="manual-review">Requires manual review</Label>
              </div>
            </div>
          )}
        </div>

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
