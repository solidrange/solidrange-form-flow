
import { useState } from "react";
import { FormField } from "@/types/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, GripVertical, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormCanvasProps {
  fields: FormField[];
  selectedField: string | null;
  onSelectField: (fieldId: string | null) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
  onAddField: (field: FormField) => void;
  onReorderFields: (dragIndex: number, hoverIndex: number) => void;
  readOnly?: boolean;
}

export const FormCanvas = ({
  fields,
  selectedField,
  onSelectField,
  onRemoveField,
  onAddField,
  onReorderFields,
  readOnly = false,
}: FormCanvasProps) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  console.log('FormCanvas rendering with fields:', fields);

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
    if (readOnly) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (readOnly) return;
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (readOnly) return;
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
    if (readOnly) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('application/json', JSON.stringify({
      source: 'field',
      fieldId
    }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleFieldDragOver = (e: React.DragEvent, index: number) => {
    if (readOnly) return;
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(index);
  };

  const handleEditClick = (fieldId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!readOnly) {
      onSelectField(fieldId);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent field selection when clicking on the card itself
    // Selection should only happen when clicking the edit button
    e.preventDefault();
  };

  if (!fields || fields.length === 0) {
    return (
      <div 
        className={cn(
          "h-64 flex items-center justify-center border-2 border-dashed rounded-lg transition-colors",
          readOnly ? "border-gray-200" : (isDragOver ? "border-indigo-500 bg-indigo-50" : "border-gray-300")
        )}
        onDragOver={!readOnly ? handleDragOver : undefined}
        onDragLeave={!readOnly ? handleDragLeave : undefined}
        onDrop={!readOnly ? handleDrop : undefined}
      >
        <div className="text-center">
          {readOnly ? (
            <>
              <Lock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg mb-2">Published Form</p>
              <p className="text-gray-400 text-sm">No fields to display</p>
            </>
          ) : (
            <>
              <p className="text-gray-500 text-lg mb-2">No fields added yet</p>
              <p className="text-gray-400 text-sm">Drag fields from the palette to start building your form</p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "space-y-4 min-h-[200px] p-2 rounded-lg transition-colors",
        !readOnly && isDragOver && "bg-indigo-50"
      )}
      onDragOver={!readOnly ? handleDragOver : undefined}
      onDragLeave={!readOnly ? handleDragLeave : undefined}
      onDrop={!readOnly ? handleDrop : undefined}
    >
      {fields.map((field, index) => (
        <Card
          key={field.id}
          className={cn(
            "p-2 sm:p-4 transition-all group",
            selectedField === field.id && "ring-2 ring-indigo-500 bg-indigo-50",
            !readOnly && dragOverIndex === index && "border-t-2 border-indigo-500",
            readOnly && "opacity-75"
          )}
          draggable={!readOnly}
          onDragStart={(e) => handleFieldDragStart(e, field.id)}
          onDragOver={(e) => !readOnly && handleFieldDragOver(e, index)}
          onClick={handleCardClick}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
              {readOnly ? (
                <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
              ) : (
                <GripVertical className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 cursor-grab group-hover:text-gray-600 flex-shrink-0" />
              )}
              <span className="font-medium text-sm sm:text-base truncate">{field.label}</span>
              {field.required && <span className="text-red-500 flex-shrink-0">*</span>}
            </div>
            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => handleEditClick(field.id, e)}
                disabled={readOnly}
                className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-3"
              >
                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only sm:not-sr-only sm:ml-1 hidden sm:inline">Edit</span>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!readOnly) onRemoveField(field.id);
                }}
                disabled={readOnly}
                className="h-8 w-8 p-0 sm:h-auto sm:w-auto sm:px-3"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="sr-only sm:not-sr-only sm:ml-1 hidden sm:inline">Delete</span>
              </Button>
            </div>
          </div>
          
          {/* Field Preview */}
          <div className="space-y-2">
            {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
              <input
                type={field.type}
                placeholder={field.placeholder || `Enter ${field.type}`}
                className="w-full p-2 sm:p-2 text-xs sm:text-sm border rounded disabled:bg-gray-50"
                disabled
              />
            ) : field.type === 'textarea' ? (
              <textarea
                placeholder={field.placeholder || 'Enter text'}
                className="w-full p-2 sm:p-2 text-xs sm:text-sm border rounded disabled:bg-gray-50"
                rows={2}
                disabled
              />
            ) : field.type === 'select' ? (
              <select className="w-full p-2 sm:p-2 text-xs sm:text-sm border rounded disabled:bg-gray-50" disabled>
                <option>Select an option</option>
                {field.options?.slice(0, 2).map((option, idx) => (
                  <option key={idx}>{option.length > 15 ? `${option.slice(0, 15)}...` : option}</option>
                ))}
                {field.options && field.options.length > 2 && <option>...</option>}
              </select>
            ) : field.type === 'radio' || field.type === 'checkbox' ? (
              <div className="space-y-1 sm:space-y-2">
                {field.options?.slice(0, 2).map((option, idx) => (
                  <label key={idx} className="flex items-center gap-1 sm:gap-2">
                    <input type={field.type} disabled className="flex-shrink-0" />
                    <span className="text-xs sm:text-sm truncate">{option}</span>
                  </label>
                ))}
                {field.options && field.options.length > 2 && (
                  <span className="text-xs text-gray-400">+{field.options.length - 2} more</span>
                )}
              </div>
            ) : field.type === 'date' ? (
              <input type="date" className="w-full p-2 sm:p-2 text-xs sm:text-sm border rounded disabled:bg-gray-50" disabled />
            ) : field.type === 'file' ? (
              <div className="w-full p-2 sm:p-2 border rounded disabled:bg-gray-50">
                <span className="text-gray-500 text-xs sm:text-sm">File upload</span>
                {field.acceptedFileTypes && (
                  <span className="text-xs text-gray-400 ml-1 sm:ml-2 hidden sm:inline">
                    ({field.acceptedFileTypes.slice(0, 2).join(', ')}{field.acceptedFileTypes.length > 2 ? '...' : ''})
                  </span>
                )}
              </div>
            ) : field.type === 'rating' ? (
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-gray-300 text-sm sm:text-xl cursor-pointer hover:text-yellow-400">★</span>
                ))}
              </div>
            ) : field.type === 'signature' ? (
              <div className="w-full h-16 sm:h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center">
                <span className="text-gray-500 text-xs sm:text-sm">Signature Area</span>
              </div>
            ) : null}
          </div>
        </Card>
      ))}
    </div>
  );
};
