
import { FormField } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Type, 
  Mail, 
  Hash, 
  MessageSquare, 
  ChevronDown, 
  CheckCircle, 
  Calendar, 
  Upload, 
  Star,
  PenTool
} from "lucide-react";

interface FieldPaletteProps {
  onAddField: (field: FormField) => void;
}

const fieldTypes = [
  { type: 'text' as const, label: 'Text Input', icon: Type },
  { type: 'email' as const, label: 'Email', icon: Mail },
  { type: 'number' as const, label: 'Number', icon: Hash },
  { type: 'textarea' as const, label: 'Textarea', icon: MessageSquare },
  { type: 'select' as const, label: 'Dropdown', icon: ChevronDown },
  { type: 'radio' as const, label: 'Radio Button', icon: CheckCircle },
  { type: 'checkbox' as const, label: 'Checkbox', icon: CheckCircle },
  { type: 'date' as const, label: 'Date Picker', icon: Calendar },
  { type: 'file' as const, label: 'File Upload', icon: Upload },
  { type: 'rating' as const, label: 'Rating', icon: Star },
  { type: 'signature' as const, label: 'Signature', icon: PenTool },
];

export const FieldPalette = ({ onAddField }: FieldPaletteProps) => {
  const handleAddField = (type: FormField['type']) => {
    const newField: Omit<FormField, 'id'> = {
      type,
      label: `New ${type} field`,
      required: false,
      ...(type === 'select' || type === 'radio' || type === 'checkbox' ? { options: ['Option 1', 'Option 2'] } : {}),
    };
    
    onAddField(newField as FormField);
  };

  const handleDragStart = (e: React.DragEvent, type: FormField['type']) => {
    e.dataTransfer.setData('application/json', JSON.stringify({
      source: 'palette',
      fieldType: type
    }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Form Fields</CardTitle>
        <p className="text-sm text-gray-500">Drag fields to the canvas to add them</p>
      </CardHeader>
      <CardContent className="space-y-2">
        {fieldTypes.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            variant="outline"
            className="w-full justify-start gap-3 h-12 cursor-grab active:cursor-grabbing"
            draggable
            onDragStart={(e) => handleDragStart(e, type)}
            onClick={() => handleAddField(type)}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
