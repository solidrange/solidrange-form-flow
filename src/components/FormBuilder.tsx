
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Eye,
  Save,
  Share,
  Plus,
  X,
  GripVertical,
  Text,
  List,
  CheckSquare,
  Radio,
  Calendar,
  ChevronDown,
} from "lucide-react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface FormField {
  id: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio"
    | "date";
  label: string;
  placeholder?: string;
  options?: string[];
  required: boolean;
}

const initialFields: FormField[] = [
  {
    id: "text",
    type: "text",
    label: "Text Field",
    placeholder: "Enter text",
    required: false,
  },
  {
    id: "textarea",
    type: "textarea",
    label: "Text Area",
    placeholder: "Enter long text",
    required: false,
  },
  {
    id: "select",
    type: "select",
    label: "Select Dropdown",
    options: ["Option 1", "Option 2", "Option 3"],
    required: false,
  },
  {
    id: "checkbox",
    type: "checkbox",
    label: "Checkbox",
    required: false,
  },
  {
    id: "radio",
    type: "radio",
    label: "Radio Button",
    options: ["Option A", "Option B"],
    required: false,
  },
  {
    id: "date",
    type: "date",
    label: "Date Picker",
    required: false,
  },
];

const FieldPalette = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-sm sm:text-base lg:text-lg">
          <span className="hidden sm:inline">Field Palette</span>
          <span className="sm:hidden">Fields</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-3 sm:p-4 lg:p-6 overflow-auto max-h-[calc(100vh-250px)]">
        {initialFields.map((field) => (
          <Button
            key={field.id}
            variant="outline"
            className="w-full justify-start text-xs sm:text-sm"
          >
            {field.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

const FormCanvas = ({
  fields,
  onSelectField,
  onUpdateFields,
  title,
  description,
  onUpdateTitle,
  onUpdateDescription,
}: {
  fields: FormField[];
  onSelectField: (field: FormField) => void;
  onUpdateFields: (fields: FormField[]) => void;
  title: string;
  description: string;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
}) => {
  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onUpdateFields(items);
  };

  return (
    <div className="space-y-4">
      {/* Form Header */}
      <div className="space-y-2">
        <Input
          placeholder="Form Title"
          className="text-lg font-semibold"
          value={title}
          onChange={(e) => onUpdateTitle(e.target.value)}
        />
        <Textarea
          placeholder="Form Description"
          className="text-sm"
          value={description}
          onChange={(e) => onUpdateDescription(e.target.value)}
        />
      </div>

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-gray-50 border border-gray-200 rounded-md p-3 hover:bg-gray-100 cursor-move"
                      onClick={() => onSelectField(field)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium">{field.label}</span>
                        </div>
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                      </div>
                      {/* Render Field Preview Based on Type */}
                      {field.type === "text" && (
                        <Input
                          type="text"
                          placeholder={field.placeholder || "Enter text"}
                          className="mt-2 text-xs"
                          readOnly
                        />
                      )}
                      {field.type === "textarea" && (
                        <Textarea
                          placeholder={field.placeholder || "Enter long text"}
                          className="mt-2 text-xs"
                          readOnly
                        />
                      )}
                      {field.type === "select" && (
                        <Select disabled>
                          <SelectTrigger className="text-xs">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {field.type === "checkbox" && (
                        <div className="flex items-center space-x-2 mt-2">
                          <Checkbox id={`checkbox-${field.id}`} disabled />
                          <Label htmlFor={`checkbox-${field.id}`} className="text-xs">
                            {field.label}
                          </Label>
                        </div>
                      )}
                      {field.type === "radio" && (
                        <RadioGroup className="mt-2" disabled>
                          {field.options?.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`radio-${field.id}-${option}`} />
                              <Label htmlFor={`radio-${field.id}-${option}`} className="text-xs">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}
                      {field.type === "date" && (
                        <Input
                          type="date"
                          className="mt-2 text-xs"
                          readOnly
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add New Field Button */}
      <Button variant="ghost" className="w-full justify-start text-xs sm:text-sm">
        <Plus className="h-4 w-4 mr-2" />
        Add New Field
      </Button>
    </div>
  );
};

const SettingsPanel = ({
  selectedField,
  onUpdateField,
}: {
  selectedField: FormField | null;
  onUpdateField: (field: FormField) => void;
}) => {
  if (!selectedField) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base lg:text-lg">
            Settings Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-500 p-4">
          Select a field to view its settings.
        </CardContent>
      </Card>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    const updatedField = {
      ...selectedField,
      [name]: type === "checkbox" ? checked : value,
    };

    onUpdateField(updatedField);
  };

  const handleOptionChange = (index: number, value: string) => {
    if (selectedField.options) {
      const updatedOptions = [...selectedField.options];
      updatedOptions[index] = value;

      const updatedField = {
        ...selectedField,
        options: updatedOptions,
      };

      onUpdateField(updatedField);
    }
  };

  const addOption = () => {
    if (selectedField.options) {
      const updatedField = {
        ...selectedField,
        options: [...selectedField.options, "New Option"],
      };
      onUpdateField(updatedField);
    } else {
      const updatedField = {
        ...selectedField,
        options: ["New Option"],
      };
      onUpdateField(updatedField);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-sm sm:text-base lg:text-lg">
          <span className="hidden sm:inline">Field Settings</span>
          <span className="sm:hidden">Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-3 sm:p-4 lg:p-6 overflow-auto max-h-[calc(100vh-250px)]">
        <div>
          <Label htmlFor="label" className="text-xs sm:text-sm">
            Label
          </Label>
          <Input
            type="text"
            id="label"
            name="label"
            value={selectedField.label}
            onChange={handleChange}
            className="text-xs sm:text-sm"
          />
        </div>

        {selectedField.type !== "checkbox" &&
          selectedField.type !== "radio" && (
            <div>
              <Label htmlFor="placeholder" className="text-xs sm:text-sm">
                Placeholder
              </Label>
              <Input
                type="text"
                id="placeholder"
                name="placeholder"
                value={selectedField.placeholder || ""}
                onChange={handleChange}
                className="text-xs sm:text-sm"
              />
            </div>
          )}

        {(selectedField.type === "select" || selectedField.type === "radio") && (
          <div>
            <Label className="text-xs sm:text-sm">Options</Label>
            <div className="space-y-2">
              {selectedField.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="text-xs sm:text-sm"
                  />
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={addOption}
              >
                Add Option
              </Button>
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="required" className="text-xs sm:text-sm">
            Required
          </Label>
          <Checkbox
            id="required"
            name="required"
            checked={selectedField.required || false}
            onCheckedChange={(checked) =>
              handleChange({
                target: {
                  name: "required",
                  value: checked,
                  type: "checkbox",
                  checked: !!checked,
                },
              } as any)
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

export const FormBuilder = () => {
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [formDescription, setFormDescription] = useState("");

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 h-auto lg:h-[calc(100vh-200px)]">
      {/* Left Sidebar - Field Palette */}
      <div className="lg:col-span-3 order-2 lg:order-1">
        <FieldPalette />
      </div>

      {/* Main Canvas Area */}
      <div className="lg:col-span-6 order-1 lg:order-2">
        <Card className="h-full">
          <CardHeader className="pb-2 sm:pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <CardTitle className="text-sm sm:text-base lg:text-lg">
                <span className="hidden sm:inline">Form Builder</span>
                <span className="sm:hidden">Builder</span>
              </CardTitle>
              <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
                <Button variant="outline" size="sm" className="text-xs px-2 py-1 whitespace-nowrap">
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline ml-1">Preview</span>
                </Button>
                <Button variant="outline" size="sm" className="text-xs px-2 py-1 whitespace-nowrap">
                  <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline ml-1">Save</span>
                </Button>
                <Button size="sm" className="text-xs px-2 py-1 whitespace-nowrap">
                  <Share className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline ml-1">Publish</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <FormCanvas 
              fields={formFields}
              onSelectField={setSelectedField}
              onUpdateFields={setFormFields}
              title={formTitle}
              description={formDescription}
              onUpdateTitle={setFormTitle}
              onUpdateDescription={setFormDescription}
            />
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar - Settings Panel */}
      <div className="lg:col-span-3 order-3 lg:order-3">
        <SettingsPanel 
          selectedField={selectedField}
          onUpdateField={(updatedField) => {
            setFormFields(prev => 
              prev.map(field => 
                field.id === updatedField.id ? updatedField : field
              )
            );
          }}
        />
      </div>
    </div>
  );
};
