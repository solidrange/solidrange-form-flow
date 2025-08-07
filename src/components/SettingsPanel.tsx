import { useState } from "react";
import { Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { WeightageAndScoringSettings } from "./WeightageAndScoringSettings";
import { Badge } from "@/components/ui/badge";
import { Upload, Palette, X, Eye } from "lucide-react";
import { useBrand } from "@/contexts/BrandContext";
import { BrandLogo } from "./BrandLogo";
import { toast } from "@/hooks/use-toast";

import { useTheme } from "@/contexts/ThemeContext";

interface SettingsPanelProps {
  form: Form;
  onUpdate: (form: Form) => void;
}

export const SettingsPanel = ({ form, onUpdate }: SettingsPanelProps) => {
  const { theme: globalTheme, setTheme } = useTheme();
  const { brand } = useBrand();
  const [isExpirationEnabled, setIsExpirationEnabled] = useState(form.settings.expiration?.enabled || false);
  const [isEmailDistributionEnabled, setIsEmailDistributionEnabled] = useState(form.settings.emailDistribution?.enabled || false);
  const [isApprovalEnabled, setIsApprovalEnabled] = useState(form.settings.approval?.enabled || false);
  const [isDocumentsEnabled, setIsDocumentsEnabled] = useState(form.settings.documents?.enabled || false);
  const [isBrandingEnabled, setIsBrandingEnabled] = useState(form.settings.branding?.enabled ?? true);

  const handleSettingChange = (field: string, value: any) => {
    onUpdate({
      ...form,
      settings: {
        ...form.settings,
        [field]: value
      }
    });
  };

  const handleFieldUpdate = (fieldId: string, updates: any) => {
    const updatedFields = form.fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    );
    onUpdate({
      ...form,
      fields: updatedFields
    });
  };

  const handleSettingsUpdate = (updates: any) => {
    onUpdate({
      ...form,
      settings: {
        ...form.settings,
        ...updates
      }
    });
  };

  const handleExpirationChange = (field: string, value: any) => {
    const currentExpiration = form.settings.expiration || {
      enabled: false,
      expirationDate: new Date(),
      message: 'This form has expired.'
    };

    onUpdate({
      ...form,
      settings: {
        ...form.settings,
        expiration: {
          ...currentExpiration,
          [field]: value
        }
      }
    });
  };

  const handleEmailDistributionChange = (field: string, value: any) => {
    const currentEmailDistribution = form.settings.emailDistribution || {
      enabled: false,
      recipients: [],
      reminderEnabled: false,
      reminderIntervalDays: 7,
      maxReminders: 3
    };

    onUpdate({
      ...form,
      settings: {
        ...form.settings,
        emailDistribution: {
          ...currentEmailDistribution,
          [field]: value
        }
      }
    });
  };

  const handleApprovalChange = (field: string, value: any) => {
    const currentApproval = form.settings.approval || {
      enabled: false,
      requireApproval: false,
      approvers: [],
      autoApproveScore: 80
    };

    onUpdate({
      ...form,
      settings: {
        ...form.settings,
        approval: {
          ...currentApproval,
          [field]: value
        }
      }
    });
  };

  const handleDocumentChange = (field: string, value: any) => {
    const currentDocuments = form.settings.documents || {
      enabled: false,
      allowedTypes: [],
      maxSize: 10,
      requiredDocuments: [],
      allowUserUploads: true
    };

    onUpdate({
      ...form,
      settings: {
        ...form.settings,
        documents: {
          ...currentDocuments,
          [field]: value
        }
      }
    });
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'custom' | 'inherit') => {
    // Update form settings
    onUpdate({
      ...form,
      settings: {
        ...form.settings,
        theme: theme === 'inherit' ? undefined : theme
      }
    });
  };

  const handleCustomCssChange = (customCss: string) => {
    if (form.settings.theme === 'custom') {
      onUpdate({
        ...form,
        settings: {
          ...form.settings,
          customCss
        }
      });
    }
  };

  // Branding handler functions
  const handleBrandingChange = (field: string, value: any) => {
    const currentBranding = form.settings.branding || {
      enabled: true,
      showLogo: true,
      showBrandColors: true,
      brandName: brand.name,
      logo: brand.logo,
      colors: brand.lightTheme.colors
    };

    onUpdate({
      ...form,
      settings: {
        ...form.settings,
        branding: {
          ...currentBranding,
          [field]: value
        }
      }
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        handleBrandingChange('logo', logoUrl);
        toast({
          title: "Logo Updated",
          description: "Form logo has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    handleBrandingChange('logo', null);
    toast({
      title: "Logo Removed",
      description: "Form logo has been removed.",
    });
  };

  const handleUseBrandDefaults = () => {
    handleBrandingChange('brandName', brand.name);
    handleBrandingChange('logo', brand.logo);
    handleBrandingChange('colors', brand.lightTheme.colors);
    toast({
      title: "Brand Applied",
      description: "Global brand settings have been applied to this form.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Multiple submissions toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Allow Multiple Submissions</Label>
              <p className="text-sm text-gray-500">Allow users to submit the form multiple times</p>
            </div>
            <Switch
              checked={form.settings.allowMultipleSubmissions}
              onCheckedChange={(checked) => handleSettingChange('allowMultipleSubmissions', checked)}
            />
          </div>

          {/* Login requirement toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Require Login</Label>
              <p className="text-sm text-gray-500">Users must be logged in to access the form</p>
            </div>
            <Switch
              checked={form.settings.requireLogin}
              onCheckedChange={(checked) => handleSettingChange('requireLogin', checked)}
            />
          </div>

          {/* Progress bar toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Show Progress Bar</Label>
              <p className="text-sm text-gray-500">Display progress indicator to users</p>
            </div>
            <Switch
              checked={form.settings.showProgressBar}
              onCheckedChange={(checked) => handleSettingChange('showProgressBar', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Theme Override */}
      <Card>
        <CardHeader>
          <CardTitle>Form Theme Override</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Theme Override</Label>
            <Select value={form.settings.theme || 'inherit'} onValueChange={handleThemeChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inherit">Inherit Global Theme</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Override global theme for this specific form
            </p>
          </div>

          {/* Custom CSS editor for custom theme */}
          {form.settings.theme === 'custom' && (
            <div>
              <Label>Custom CSS</Label>
              <Textarea
                value={form.settings.customCss || ''}
                onChange={(e) => handleCustomCssChange(e.target.value)}
                placeholder="Enter custom CSS rules..."
                className="mt-1 font-mono text-sm"
                rows={6}
              />
              <p className="text-xs text-gray-500 mt-1">
                Add custom CSS to style your form
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Branding Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Form Branding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Enable branding toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Branding</Label>
              <p className="text-sm text-gray-500">Show your organization's branding on this form</p>
            </div>
            <Switch
              checked={form.settings.branding?.enabled ?? true}
              onCheckedChange={(checked) => {
                setIsBrandingEnabled(checked);
                handleBrandingChange('enabled', checked);
              }}
            />
          </div>

          {/* Branding configuration options */}
          {isBrandingEnabled && (
            <>
              {/* Brand Preview */}
              <div>
                <Label className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </Label>
                <div className="mt-2 p-4 bg-muted/30 rounded-lg border flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    {form.settings.branding?.logo && (
                      <img 
                        src={form.settings.branding.logo} 
                        alt="Form Logo"
                        className="h-8 w-8 object-contain"
                      />
                    )}
                    <span className="font-medium text-sm">
                      {form.settings.branding?.brandName || 'FormFlow'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Use Global Brand Settings */}
              <div className="p-3 bg-muted border border-border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium text-foreground">Use Global Brand</Label>
                    <p className="text-xs text-muted-foreground">Apply your global brand settings to this form</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUseBrandDefaults}
                    className="border-border text-foreground hover:bg-muted"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              {/* Show logo toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Logo</Label>
                  <p className="text-sm text-gray-500">Display logo on the form</p>
                </div>
                <Switch
                  checked={form.settings.branding?.showLogo ?? true}
                  onCheckedChange={(checked) => handleBrandingChange('showLogo', checked)}
                />
              </div>

              {/* Brand name */}
              <div>
                <Label>Brand Name</Label>
                <Input
                  value={form.settings.branding?.brandName || ''}
                  onChange={(e) => handleBrandingChange('brandName', e.target.value)}
                  placeholder="Enter organization name"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Organization name to display on the form
                </p>
              </div>

              {/* Logo upload */}
              {form.settings.branding?.showLogo && (
                <div>
                  <Label className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Logo
                  </Label>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload PNG, JPG, or SVG files. Recommended size: 200x200px
                      </p>
                    </div>
                    {form.settings.branding?.logo && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveLogo}
                        className="flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Show brand colors toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>Apply Brand Colors</Label>
                  <p className="text-sm text-gray-500">Use your brand colors on the form</p>
                </div>
                <Switch
                  checked={form.settings.branding?.showBrandColors ?? true}
                  onCheckedChange={(checked) => handleBrandingChange('showBrandColors', checked)}
                />
              </div>

              {/* Color preview */}
              {form.settings.branding?.showBrandColors && form.settings.branding?.colors && (
                <div>
                  <Label>Brand Colors</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="space-y-1">
                      <span className="text-xs text-gray-600">Primary</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: `hsl(${form.settings.branding.colors.primary.main})` }}
                        />
                        <Badge variant="outline" className="text-xs">
                          {form.settings.branding.colors.primary.main}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-gray-600">Secondary</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: `hsl(${form.settings.branding.colors.secondary.main})` }}
                        />
                        <Badge variant="outline" className="text-xs">
                          {form.settings.branding.colors.secondary.main}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Colors are inherited from global brand settings. Change them in Global Settings → Brand.
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Scoring and Weightage Settings */}
      <WeightageAndScoringSettings
        fields={form.fields}
        settings={form.settings}
        onUpdateField={handleFieldUpdate}
        onUpdateSettings={handleSettingsUpdate}
      />

      {/* Approval Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Workflow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Enable approval workflow */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Approval Workflow</Label>
              <p className="text-sm text-gray-500">Require manual approval for submissions</p>
            </div>
            <Switch
              checked={form.settings.approval?.enabled || false}
              onCheckedChange={(checked) => handleApprovalChange('enabled', checked)}
            />
          </div>

          {/* Auto-approve threshold */}
          {form.settings.approval?.enabled && (
            <>
              <div>
                <Label>Auto-Approve Score Threshold</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={form.settings.approval.autoApproveScore || 80}
                  onChange={(e) => handleApprovalChange('autoApproveScore', parseInt(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Submissions with scores above this threshold will be auto-approved
                </p>
              </div>

              {/* Approvers list */}
              <div>
                <Label>Approvers</Label>
                <div className="space-y-2 mt-2">
                  {(form.settings.approval.approvers || []).map((approver, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={approver}
                        onChange={(e) => {
                          const newApprovers = [...(form.settings.approval?.approvers || [])];
                          newApprovers[index] = e.target.value;
                          handleApprovalChange('approvers', newApprovers);
                        }}
                        placeholder="Enter approver email"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newApprovers = (form.settings.approval?.approvers || []).filter((_, i) => i !== index);
                          handleApprovalChange('approvers', newApprovers);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newApprovers = [...(form.settings.approval?.approvers || []), ''];
                      handleApprovalChange('approvers', newApprovers);
                    }}
                  >
                    Add Approver
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Document Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Document Attachments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Enable document uploads */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Document Uploads</Label>
              <p className="text-sm text-gray-500">Allow users to upload documents</p>
            </div>
            <Switch
              checked={form.settings.documents?.enabled || false}
              onCheckedChange={(checked) => handleDocumentChange('enabled', checked)}
            />
          </div>

          {/* Document configuration */}
          {form.settings.documents?.enabled && (
            <>
              {/* Allowed file types */}
              <div>
                <Label>Allowed File Types</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['pdf', 'doc', 'docx', 'jpg', 'png', 'xlsx'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={(form.settings.documents?.allowedTypes || []).includes(type)}
                        onCheckedChange={(checked) => {
                          const currentTypes = form.settings.documents?.allowedTypes || [];
                          const newTypes = checked 
                            ? [...currentTypes, type]
                            : currentTypes.filter(t => t !== type);
                          handleDocumentChange('allowedTypes', newTypes);
                        }}
                      />
                      <Label htmlFor={type} className="text-sm uppercase">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Max file size */}
              <div>
                <Label>Maximum File Size (MB)</Label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={form.settings.documents.maxSize || 10}
                  onChange={(e) => handleDocumentChange('maxSize', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>

              {/* Required documents */}
              <div>
                <Label>Required Documents</Label>
                <Textarea
                  value={(form.settings.documents.requiredDocuments || []).join('\n')}
                  onChange={(e) => handleDocumentChange('requiredDocuments', e.target.value.split('\n').filter(doc => doc.trim()))}
                  placeholder="Enter required document names (one per line)"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Expiration Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Expiration Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Enable expiration */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Expiration</Label>
              <p className="text-sm text-gray-500">Set an expiration date for this form</p>
            </div>
            <Switch
              checked={form.settings.expiration?.enabled || false}
              onCheckedChange={(checked) => {
                setIsExpirationEnabled(checked);
                handleExpirationChange('enabled', checked);
              }}
            />
          </div>

          {/* Expiration configuration options */}
          {isExpirationEnabled && (
            <>
              {/* Expiration date */}
              <div>
                <Label>Expiration Date</Label>
                <Input
                  type="date"
                  value={(form.settings.expiration?.expirationDate || new Date()).toISOString().split('T')[0]}
                  onChange={(e) => handleExpirationChange('expirationDate', new Date(e.target.value))}
                  className="mt-1"
                />
              </div>

              {/* Expiration message */}
              <div>
                <Label>Expiration Message</Label>
                <Textarea
                  value={form.settings.expiration?.message || 'This form has expired.'}
                  onChange={(e) => handleExpirationChange('message', e.target.value)}
                  placeholder="Enter expiration message..."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Email Distribution Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Email Distribution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Enable email distribution */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Email Distribution</Label>
              <p className="text-sm text-gray-500">Distribute this form via email</p>
            </div>
            <Switch
              checked={form.settings.emailDistribution?.enabled || false}
              onCheckedChange={(checked) => {
                setIsEmailDistributionEnabled(checked);
                handleEmailDistributionChange('enabled', checked);
              }}
            />
          </div>

          {/* Email distribution configuration options */}
          {isEmailDistributionEnabled && (
            <>
              {/* Reminder settings */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Reminders</Label>
                  <p className="text-sm text-gray-500">Send reminder emails to recipients</p>
                </div>
                <Switch
                  checked={form.settings.emailDistribution?.reminderEnabled || false}
                  onCheckedChange={(checked) => handleEmailDistributionChange('reminderEnabled', checked)}
                />
              </div>

              {/* Reminder interval */}
              {form.settings.emailDistribution?.reminderEnabled && (
                <div>
                  <Label>Reminder Interval (days)</Label>
                  <Input
                    type="number"
                    min="1"
                    value={form.settings.emailDistribution?.reminderIntervalDays || 7}
                    onChange={(e) => handleEmailDistributionChange('reminderIntervalDays', parseInt(e.target.value))}
                    className="mt-1"
                  />
                </div>
              )}

              {/* Max reminders */}
              {form.settings.emailDistribution?.reminderEnabled && (
                <div>
                  <Label>Max Reminders</Label>
                  <Input
                    type="number"
                    min="1"
                    value={form.settings.emailDistribution?.maxReminders || 3}
                    onChange={(e) => handleEmailDistributionChange('maxReminders', parseInt(e.target.value))}
                    className="mt-1"
                  />
                </div>
              )}

              {/* Recipients list */}
              <div>
                <Label>Recipients</Label>
                <Textarea
                  value={(form.settings.emailDistribution?.recipients || []).map(r => r.email).join('\n')}
                  onChange={(e) => {
                    const newRecipients = e.target.value.split('\n').filter(email => email.trim() !== '').map(email => ({ id: Date.now().toString(), email, status: 'pending', remindersSent: 0 }));
                    handleEmailDistributionChange('recipients', newRecipients);
                  }}
                  placeholder="Enter recipient emails (one per line)"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
