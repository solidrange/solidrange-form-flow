
import { FormField, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, Target } from "lucide-react";

interface FormPreviewProps {
  formTitle: string;
  formDescription: string;
  formFields: FormField[];
  formSettings?: Form['settings'];
}

export const FormPreview = ({ formTitle, formDescription, formFields, formSettings }: FormPreviewProps) => {
  const isExpired = formSettings?.expiration?.enabled && 
    formSettings.expiration.expirationDate && 
    new Date() > new Date(formSettings.expiration.expirationDate);

  const totalPossiblePoints = formFields
    .filter(field => field.scoring?.enabled)
    .reduce((sum, field) => {
      const points = (field.scoring?.maxPoints || 10) * (field.scoring?.weightMultiplier || 1);
      return sum + points;
    }, 0);

  if (isExpired) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Form Expired</h3>
            <p className="text-red-600">
              {formSettings.expiration?.message || "This form has expired and is no longer accepting submissions."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl">{formTitle || "Untitled Form"}</CardTitle>
              {formDescription && (
                <p className="text-gray-600 mt-2">{formDescription}</p>
              )}
            </div>
            
            <div className="flex flex-col gap-2 ml-4">
              {formSettings?.scoring?.enabled && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  Max: {totalPossiblePoints} pts
                </Badge>
              )}
              
              {formSettings?.expiration?.enabled && formSettings.expiration.expirationDate && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Expires: {new Date(formSettings.expiration.expirationDate).toLocaleDateString()}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={field.id} className="flex items-center gap-1">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
                
                {field.scoring?.enabled && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Badge variant="outline" size="sm">
                      {(field.scoring.maxPoints || 10) * (field.scoring.weightMultiplier || 1)} pts
                    </Badge>
                    {field.scoring.weightMultiplier && field.scoring.weightMultiplier > 1 && (
                      <Badge variant="secondary" size="sm">
                        {field.scoring.weightMultiplier}x
                      </Badge>
                    )}
                    {field.scoring.requiresManualReview && (
                      <Badge variant="destructive" size="sm">
                        Manual Review
                      </Badge>
                    )}
                  </div>
                )}
              </div>

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
                      {field.scoring?.correctAnswers?.includes(option) && " ✓"}
                    </option>
                  ))}
                </select>
              ) : field.type === 'radio' ? (
                <RadioGroup>
                  {field.options?.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${field.id}-${idx}`} />
                      <Label htmlFor={`${field.id}-${idx}`} className="flex items-center gap-1">
                        {option}
                        {field.scoring?.correctAnswers?.includes(option) && (
                          <span className="text-green-600 text-sm">✓</span>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : field.type === 'checkbox' ? (
                <div className="space-y-2">
                  {field.options?.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox id={`${field.id}-${idx}`} />
                      <Label htmlFor={`${field.id}-${idx}`} className="flex items-center gap-1">
                        {option}
                        {field.scoring?.correctAnswers?.includes(option) && (
                          <span className="text-green-600 text-sm">✓</span>
                        )}
                      </Label>
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
            <div className="pt-4 border-t">
              {formSettings?.scoring?.enabled && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Target className="h-4 w-4" />
                    <span>
                      This form will be scored out of {totalPossiblePoints} points
                      {formSettings.scoring.passingScore && 
                        ` (${formSettings.scoring.passingScore} points required to pass)`
                      }
                    </span>
                  </div>
                </div>
              )}
              
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
