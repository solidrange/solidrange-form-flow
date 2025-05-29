
import { FormField } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface FormPreviewProps {
  formTitle: string;
  formDescription: string;
  formFields: FormField[];
}

export const FormPreview = ({ formTitle, formDescription, formFields }: FormPreviewProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{formTitle || "Untitled Form"}</CardTitle>
          {formDescription && (
            <p className="text-gray-600">{formDescription}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="flex items-center gap-1">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </Label>

              {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
                <Input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                />
              ) : field.type === 'textarea' ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={3}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.id}
                  required={field.required}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select an option</option>
                  {field.options?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === 'radio' ? (
                <RadioGroup>
                  {field.options?.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${field.id}-${idx}`} />
                      <Label htmlFor={`${field.id}-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : field.type === 'checkbox' ? (
                <div className="space-y-2">
                  {field.options?.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox id={`${field.id}-${idx}`} />
                      <Label htmlFor={`${field.id}-${idx}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              ) : field.type === 'date' ? (
                <Input
                  id={field.id}
                  type="date"
                  required={field.required}
                />
              ) : field.type === 'file' ? (
                <Input
                  id={field.id}
                  type="file"
                  required={field.required}
                />
              ) : field.type === 'rating' ? (
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-2xl text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      ★
                    </button>
                  ))}
                </div>
              ) : field.type === 'signature' ? (
                <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Click to sign</span>
                </div>
              ) : null}
            </div>
          ))}

          {formFields.length > 0 && (
            <div className="pt-4">
              <Button type="submit" className="w-full">
                Submit Form
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
