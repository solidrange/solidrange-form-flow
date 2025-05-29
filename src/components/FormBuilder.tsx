
import { useState } from "react";
import { FormField } from "@/types/form";
import { FieldPalette } from "./FieldPalette";
import { FieldEditor } from "./FieldEditor";
import { FormCanvas } from "./FormCanvas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormBuilderProps {
  formFields: FormField[];
  formTitle: string;
  formDescription: string;
  onAddField: (field: FormField) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
}

export const FormBuilder = ({
  formFields,
  formTitle,
  formDescription,
  onAddField,
  onUpdateField,
  onRemoveField,
  onUpdateTitle,
  onUpdateDescription,
}: FormBuilderProps) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Field Palette */}
      <div className="col-span-3">
        <FieldPalette onAddField={onAddField} />
      </div>

      {/* Form Canvas */}
      <div className="col-span-6">
        <Card className="h-full">
          <CardHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="form-title">Form Title</Label>
                <Input
                  id="form-title"
                  value={formTitle}
                  onChange={(e) => onUpdateTitle(e.target.value)}
                  placeholder="Enter form title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="form-description">Form Description</Label>
                <Textarea
                  id="form-description"
                  value={formDescription}
                  onChange={(e) => onUpdateDescription(e.target.value)}
                  placeholder="Enter form description"
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <FormCanvas
              fields={formFields}
              selectedField={selectedField}
              onSelectField={setSelectedField}
              onUpdateField={onUpdateField}
              onRemoveField={onRemoveField}
            />
          </CardContent>
        </Card>
      </div>

      {/* Field Editor */}
      <div className="col-span-3">
        <FieldEditor
          selectedField={selectedField ? formFields.find(f => f.id === selectedField) : null}
          onUpdateField={onUpdateField}
        />
      </div>
    </div>
  );
};
