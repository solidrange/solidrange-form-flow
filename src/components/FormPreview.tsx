
import { FormField, Form, DocumentAttachment } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, Target, Download, FileText } from "lucide-react";
import { useBrand } from "@/contexts/BrandContext";

interface FormPreviewProps {
  formTitle: string;
  formDescription: string;
  formFields: FormField[];
  formSettings?: Form['settings'];
  attachments?: DocumentAttachment[];
}

export const FormPreview = ({ 
  formTitle, 
  formDescription, 
  formFields, 
  formSettings,
  attachments = []
}: FormPreviewProps) => {
  const { brand } = useBrand();
  
  const isExpired = formSettings?.expiration?.enabled && 
    formSettings.expiration.expirationDate && 
    new Date() > new Date(formSettings.expiration.expirationDate);

  const totalPossiblePoints = formFields
    .filter(field => field.scoring?.enabled)
    .reduce((sum, field) => {
      const points = (field.scoring?.maxPoints || 10) * (field.scoring?.weightMultiplier || 1);
      return sum + points;
    }, 0);

  const downloadFile = (attachment: DocumentAttachment) => {
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get branding settings - prioritize form-specific branding over global
  const brandingEnabled = formSettings?.branding?.enabled ?? true;
  const brandName = formSettings?.branding?.brandName || brand.name;
  const brandLogo = formSettings?.branding?.logoUrl || brand.logo;
  const brandColors = formSettings?.branding?.colors || brand.colors;

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
      <Card style={brandingEnabled ? {
        '--brand-primary': `hsl(${brandColors.primary.main})`,
        '--brand-secondary': `hsl(${brandColors.secondary.main})`,
      } as React.CSSProperties : {}}>
        <CardHeader>
          {/* Branding Section */}
          {brandingEnabled && (brandLogo || brandName) && (
            <div className="flex items-center gap-3 mb-4 pb-4 border-b">
              {brandLogo && (
                <img 
                  src={brandLogo} 
                  alt={brandName || 'Brand Logo'} 
                  className="h-12 w-auto object-contain"
                />
              )}
              <div>
                <h3 className="font-semibold text-lg" style={{ color: `hsl(${brandColors.primary.main})` }}>
                  {brandName}
                </h3>
                {brand.tagline && (
                  <p className="text-sm text-gray-600">{brand.tagline}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl" style={brandingEnabled ? { color: `hsl(${brandColors.primary.main})` } : {}}>
                {formTitle || "Untitled Form"}
              </CardTitle>
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
          {/* File Attachments Section */}
          {attachments.length > 0 && (
            <div className="border-b pb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Reference Documents
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Download and review these documents before filling out the form:
              </p>
              <div className="grid gap-3">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{attachment.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(attachment.size)}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadFile(attachment)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form Fields */}
          {formFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={field.id} className="flex items-center gap-1">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
                
                {field.scoring?.enabled && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Badge variant="outline" className="text-xs">
                      {(field.scoring.maxPoints || 10) * (field.scoring.weightMultiplier || 1)} pts
                    </Badge>
                    {field.scoring.weightMultiplier && field.scoring.weightMultiplier > 1 && (
                      <Badge variant="secondary" className="text-xs">
                        {field.scoring.weightMultiplier}x
                      </Badge>
                    )}
                    {field.scoring.requiresManualReview && (
                      <Badge variant="destructive" className="text-xs">
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
                  style={brandingEnabled ? { 
                    '--ring-offset-shadow': 'none',
                    '--ring-shadow': `0 0 0 2px hsl(${brandColors.primary.main} / 0.2)`,
                    borderColor: `hsl(${brandColors.primary.main})` 
                  } as React.CSSProperties : {}}
                />
              ) : field.type === 'textarea' ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={3}
                  style={brandingEnabled ? { 
                    borderColor: `hsl(${brandColors.primary.main})` 
                  } as React.CSSProperties : {}}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.id}
                  required={field.required}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  style={brandingEnabled ? { 
                    borderColor: `hsl(${brandColors.primary.main})` 
                  } as React.CSSProperties : {}}
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
                  style={brandingEnabled ? { 
                    borderColor: `hsl(${brandColors.primary.main})` 
                  } as React.CSSProperties : {}}
                />
              ) : field.type === 'file' ? (
                <Input
                  id={field.id}
                  type="file"
                  required={field.required}
                  style={brandingEnabled ? { 
                    borderColor: `hsl(${brandColors.primary.main})` 
                  } as React.CSSProperties : {}}
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
              
              <Button 
                type="submit" 
                className="w-full"
                style={brandingEnabled ? {
                  backgroundColor: `hsl(${brandColors.primary.main})`,
                  borderColor: `hsl(${brandColors.primary.main})`,
                } as React.CSSProperties : {}}
              >
                Submit Form
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
