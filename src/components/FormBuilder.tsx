
import React, { useState } from 'react';
import { FormField, DocumentAttachment } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrandedButton } from './BrandedButton';
import { BrandedInput } from './BrandedInput';
import { BrandedCard } from './BrandedCard';
import { AnimatedCard } from './AnimatedCard';
import { ResponsiveLayout } from './ResponsiveLayout';
import { useBranding } from './BrandingProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import { FieldPalette } from './FieldPalette';
import { FieldEditor } from './FieldEditor';
import { FormCanvas } from './FormCanvas';
import { FileAttachmentManager } from './FileAttachmentManager';
import { 
  Save, 
  Eye, 
  Library, 
  FileText, 
  Palette, 
  Settings, 
  Upload,
  Smartphone,
  Monitor,
  Tablet,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FormBuilderProps {
  formFields: FormField[];
  onAddField: (field: FormField) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onRemoveField: (fieldId: string) => void;
  selectedFieldId: string | null;
  onSelectField: (fieldId: string | null) => void;
  title: string;
  description: string;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
  onSaveForm: () => void;
  onPreviewForm: () => void;
  attachments: DocumentAttachment[];
  onUpdateAttachments: (attachments: DocumentAttachment[]) => void;
  onSaveToLibrary: () => void;
  isPublished: boolean;
  onMoveToDraft: () => void;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  formFields,
  onAddField,
  onUpdateField,
  onRemoveField,
  selectedFieldId,
  onSelectField,
  title,
  description,
  onUpdateTitle,
  onUpdateDescription,
  onSaveForm,
  onPreviewForm,
  attachments,
  onUpdateAttachments,
  onSaveToLibrary,
  isPublished,
  onMoveToDraft
}) => {
  const [activeBuilderTab, setActiveBuilderTab] = useState('builder');
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const brandingContext = useBranding();
  const isMobile = useIsMobile();

  const actionButtons = [
    {
      label: "Save to Library",
      icon: Library,
      onClick: onSaveToLibrary,
      variant: "outline" as const,
      brandVariant: "outline" as const
    },
    {
      label: "Preview",
      icon: Eye,
      onClick: onPreviewForm,
      variant: "outline" as const,
      brandVariant: "outline" as const
    },
    ...(isPublished ? [{
      label: "Move to Draft",
      icon: FileText,
      onClick: onMoveToDraft,
      variant: "outline" as const,
      brandVariant: "secondary" as const
    }] : []),
    {
      label: "Save Form",
      icon: Save,
      onClick: onSaveForm,
      variant: "default" as const,
      brandVariant: "primary" as const
    }
  ];

  return (
    <ResponsiveLayout>
      <div className="h-full flex flex-col space-y-4 lg:space-y-6">
        {/* Header */}
        <AnimatedCard className="border-none shadow-sm bg-gradient-to-r from-background to-muted/20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="p-2 lg:p-3 bg-primary/10 rounded-xl">
                <Wrench className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold brand-text flex items-center gap-2">
                  Form Builder
                  <Zap className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-500 animate-pulse" />
                </h1>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  Design and customize your forms with ease
                </p>
              </div>
              {isPublished && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 animate-bounce">
                  Published
                </Badge>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {actionButtons.map((button, index) => (
                <BrandedButton
                  key={button.label}
                  variant={button.variant}
                  onClick={button.onClick}
                  className={cn(
                    "gap-2 animate-fade-in btn-mobile hover-scale",
                    isMobile && "text-xs px-2 py-1"
                  )}
                  brandVariant={button.brandVariant}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <button.icon className="h-3 w-3 lg:h-4 lg:w-4" />
                  {!isMobile && button.label}
                </BrandedButton>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Preview Mode Toggle */}
        <div className="flex justify-center animate-slide-up">
          <div className="flex items-center bg-muted rounded-lg p-1">
            {[
              { mode: 'mobile' as const, icon: Smartphone, label: 'Mobile' },
              { mode: 'tablet' as const, icon: Tablet, label: 'Tablet' },
              { mode: 'desktop' as const, icon: Monitor, label: 'Desktop' }
            ].map((item) => (
              <button
                key={item.mode}
                onClick={() => setPreviewMode(item.mode)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                  previewMode === item.mode
                    ? "bg-background shadow-sm text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!isMobile && <span className="text-sm">{item.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs value={activeBuilderTab} onValueChange={setActiveBuilderTab} className="h-full">
            <TabsList className={cn(
              "grid w-full grid-cols-3 mb-4 lg:mb-6",
              "bg-muted/50 backdrop-blur-sm"
            )}>
              <TabsTrigger value="builder" className="brand-focus gap-2">
                <Palette className="h-4 w-4" />
                {!isMobile && "Builder"}
              </TabsTrigger>
              <TabsTrigger value="attachments" className="brand-focus gap-2">
                <FileText className="h-4 w-4" />
                {!isMobile && "Attachments"}
              </TabsTrigger>
              <TabsTrigger value="settings" className="brand-focus gap-2">
                <Settings className="h-4 w-4" />
                {!isMobile && "Settings"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="h-full mt-0">
              <div className={cn(
                "grid gap-4 lg:gap-6 h-full",
                isMobile ? "grid-cols-1" : "grid-cols-12"
              )}>
                {/* Left Sidebar - Field Palette */}
                <div className={cn(
                  isMobile ? "order-2" : "col-span-3",
                  "animate-slide-in-left"
                )}>
                  <AnimatedCard 
                    title="Field Types" 
                    icon={Palette} 
                    iconColor="text-purple-500"
                    delay={100}
                  >
                    <FieldPalette onAddField={onAddField} />
                  </AnimatedCard>
                </div>

                {/* Center - Form Canvas */}
                <div className={cn(
                  isMobile ? "order-1" : "col-span-6",
                  "animate-fade-in"
                )}>
                  <AnimatedCard className="h-full" delay={200}>
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="form-title" className="brand-text font-medium">
                            Form Title
                          </Label>
                          <BrandedInput
                            id="form-title"
                            value={title}
                            onChange={(e) => onUpdateTitle(e.target.value)}
                            placeholder="Enter form title"
                            className="text-lg lg:text-xl font-semibold mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="form-description" className="brand-text font-medium">
                            Form Description
                          </Label>
                          <Textarea
                            id="form-description"
                            value={description}
                            onChange={(e) => onUpdateDescription(e.target.value)}
                            placeholder="Enter form description"
                            className="brand-focus brand-border mt-1 resize-none"
                            rows={3}
                            style={{ borderColor: brandingContext?.getPrimaryColor() }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <FormCanvas
                          fields={formFields}
                          selectedField={selectedFieldId}
                          onSelectField={onSelectField}
                          onUpdateField={onUpdateField}
                          onRemoveField={onRemoveField}
                          onAddField={onAddField}
                          onReorderFields={() => {}}
                        />
                      </div>
                    </div>
                  </AnimatedCard>
                </div>

                {/* Right Sidebar - Field Editor */}
                <div className={cn(
                  isMobile ? "order-3" : "col-span-3",
                  "animate-slide-in-right"
                )}>
                  <AnimatedCard 
                    title="Field Properties" 
                    icon={Settings} 
                    iconColor="text-blue-500"
                    delay={300}
                  >
                    <FieldEditor
                      selectedField={selectedFieldId ? formFields.find(f => f.id === selectedFieldId) || null : null}
                      onUpdateField={onUpdateField}
                    />
                  </AnimatedCard>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attachments" className="mt-0">
              <AnimatedCard 
                title="Form Attachments" 
                icon={Upload} 
                iconColor="text-green-500"
              >
                <FileAttachmentManager
                  attachments={attachments}
                  onUpdateAttachments={onUpdateAttachments}
                  allowedTypes={['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png']}
                  maxSize={10}
                  readOnly={isPublished}
                />
              </AnimatedCard>
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <AnimatedCard 
                title="Form Settings" 
                icon={Settings} 
                iconColor="text-gray-500"
              >
                <div className="text-center py-8 lg:py-12 text-muted-foreground">
                  <Settings className="h-12 w-12 lg:h-16 lg:w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm lg:text-base">Form settings will be available here</p>
                </div>
              </AnimatedCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ResponsiveLayout>
  );
};
