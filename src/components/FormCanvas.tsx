
import { useState } from "react";
import { FormField } from "@/types/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormCanvasProps {
  fields: FormField[];
  selectedField: string | null;
  onSelectField: (fieldId: string | null) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
  onAddField: (field: FormField) => void;
  onReorderFields: (dragIndex: number, hoverIndex: number) => void;
}

export const FormCanvas = ({
  fields,
  selectedField,
  onSelectField,
  onRemoveField,
  onAddField,
  onReorderFields,
}: FormCanvasProps) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const createFieldFromType = (type: FormField['type']): FormField => {
    const baseField = {
      id: Date.now().toString(),
      type,
      label: `New ${type} field`,
      required: false,
    };

    if (type === 'select' || type === 'radio' || type === 'checkbox') {
      return { ...baseField, options: ['Option 1', 'Option 2'] };
    }

    return baseField;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setDragOverIndex(null);

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (data.source === 'palette') {
        const newField = createFieldFromType(data.fieldType);
        onAddField(newField);
      } else if (data.source === 'field') {
        // Handle field reordering
        const dragIndex = fields.findIndex(f => f.id === data.fieldId);
        if (dragIndex !== -1 && dragOverIndex !== null && dragIndex !== dragOverIndex) {
          onReorderFields(dragIndex, dragOverIndex);
        }
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  const handleFieldDragStart = (e: React.DragEvent, fieldId: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      source: 'field',
      fieldId
    }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleFieldDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(index);
  };

  if (fields.length === 0) {
    return (
      <div 
        className={cn(
          "h-64 flex items-center justify-center border-2 border-dashed rounded-lg transition-colors",
          isDragOver ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-2">No fields added yet</p>
          <p className="text-gray-400 text-sm">Drag fields from the palette to start building your form</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "space-y-4 min-h-[200px] p-2 rounded-lg transition-colors",
        isDragOver && "bg-indigo-50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {fields.map((field, index) => (
        <Card
          key={field.id}
          className={cn(
            "p-4 cursor-pointer transition-all group",
            selectedField === field.id && "ring-2 ring-indigo-500 bg-indigo-50",
            dragOverIndex === index && "border-t-2 border-indigo-500"
          )}
          draggable
          onDragStart={(e) => handleFieldDragStart(e, field.id)}
          onDragOver={(e) => handleFieldDragOver(e, index)}
          onClick={() => onSelectField(field.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400 cursor-grab group-hover:text-gray-600" />
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
