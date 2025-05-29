
import { FormField } from "@/types/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormCanvasProps {
  fields: FormField[];
  selectedField: string | null;
  onSelectField: (fieldId: string | null) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
}

export const FormCanvas = ({
  fields,
  selectedField,
  onSelectField,
  onRemoveField,
}: FormCanvasProps) => {
  if (fields.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-2">No fields added yet</p>
          <p className="text-gray-400 text-sm">Drag fields from the palette to start building your form</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <Card
          key={field.id}
          className={cn(
            "p-4 cursor-pointer transition-all",
            selectedField === field.id && "ring-2 ring-indigo-500 bg-indigo-50"
          )}
          onClick={() => onSelectField(field.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{field.label}</span>
              {field.required && <span className="text-red-500">*</span>}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectField(field.id);
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveField(field.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Field Preview */}
          <div className="space-y-2">
            {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
              <input
                type={field.type}
                placeholder={field.placeholder || `Enter ${field.type}`}
                className="w-full p-2 border rounded disabled:bg-gray-50"
                disabled
              />
            ) : field.type === 'textarea' ? (
              <textarea
                placeholder={field.placeholder || 'Enter text'}
                className="w-full p-2 border rounded disabled:bg-gray-50"
                rows={3}
                disabled
              />
            ) : field.type === 'select' ? (
              <select className="w-full p-2 border rounded disabled:bg-gray-50" disabled>
                <option>Select an option</option>
                {field.options?.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            ) : field.type === 'radio' || field.type === 'checkbox' ? (
              <div className="space-y-2">
                {field.options?.map((option, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input type={field.type} disabled />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            ) : field.type === 'date' ? (
              <input type="date" className="w-full p-2 border rounded disabled:bg-gray-50" disabled />
            ) : field.type === 'file' ? (
              <input type="file" className="w-full p-2 border rounded disabled:bg-gray-50" disabled />
            ) : field.type === 'rating' ? (
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-gray-300 text-xl">★</span>
                ))}
              </div>
            ) : field.type === 'signature' ? (
              <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                <span className="text-gray-500">Signature Area</span>
              </div>
            ) : null}
          </div>
        </Card>
      ))}
    </div>
  );
};
