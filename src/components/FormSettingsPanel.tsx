import React from 'react';
import { Form } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, Mail, Users, Shield, Eye, Link, RefreshCw, Info, Palette } from 'lucide-react';
import { EmailDistributionSettings } from './forms/EmailDistributionSettings';
import { FormAppearanceSettings } from './FormAppearanceSettings';
import { useBrand } from '@/contexts/BrandContext';

interface FormSettingsPanelProps {
  form: Form;
  onUpdateForm: (updates: Partial<Form>) => void;
  isPublished: boolean;
}

export const FormSettingsPanel = ({ form, onUpdateForm, isPublished }: FormSettingsPanelProps) => {
  const { brand } = useBrand();

  const updateFormSettings = (updates: Partial<Form['settings']>) => {
    onUpdateForm({
      settings: {
        ...form.settings,
        ...updates
      }
    });
  };

  // Function to inherit global brand settings
  const inheritGlobalBranding = () => {
    updateFormSettings({
      branding: {
        ...form.settings.branding,
        enabled: true,
        brandName: brand.name,
        logo: brand.logo,
        colors: brand.colors,
        showLogo: true,
        showBrandColors: true,
        useGlobalBranding: true
      }
    });
  };

  // Check if using global branding
  const isUsingGlobalBranding = (form.settings.branding as any)?.useGlobalBranding ?? false;
  
  // Get effective branding values (global or custom)
  const effectiveBrandName = isUsingGlobalBranding ? brand.name : (form.settings.branding?.brandName || brand.name);
  const effectiveLogo = isUsingGlobalBranding ? brand.logo : (form.settings.branding?.logo || brand.logo);
  const effectiveColors = isUsingGlobalBranding ? brand.colors : (form.settings.branding?.colors || brand.colors);

  const DraftStateWarning = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          Draft Mode
        </Badge>
        <span className="text-sm text-blue-700">
          Settings can be configured but will only take effect when the form is published
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Form Settings</h3>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="access">Access</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="multiple-submissions"
                  checked={form.settings.allowMultipleSubmissions}
                  onCheckedChange={(checked) => updateFormSettings({ allowMultipleSubmissions: checked })}
                />
                <Label htmlFor="multiple-submissions">Allow multiple submissions per user</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-progress"
                  checked={form.settings.showProgressBar}
                  onCheckedChange={(checked) => updateFormSettings({ showProgressBar: checked })}
                />
                <Label htmlFor="show-progress">Show progress bar</Label>
              </div>

              {form.settings.expiration && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="expiration-enabled"
                      checked={form.settings.expiration.enabled}
                      onCheckedChange={(enabled) => updateFormSettings({ 
                        expiration: { ...form.settings.expiration, enabled } 
                      })}
                    />
                    <Label htmlFor="expiration-enabled">Enable form expiration</Label>
                  </div>
                  
                  {form.settings.expiration.enabled && (
                    <div>
                      <Label htmlFor="expiration-date">Expiration Date</Label>
                      <Input
                        id="expiration-date"
                        type="datetime-local"
                        value={form.settings.expiration.expirationDate ? 
                          new Date(form.settings.expiration.expirationDate).toISOString().slice(0, 16) : ''}
                        onChange={(e) => updateFormSettings({ 
                          expiration: { 
                            ...form.settings.expiration, 
                            expirationDate: e.target.value ? new Date(e.target.value) : undefined 
                          } 
                        })}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Access Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="require-login"
                  checked={form.settings.requireLogin}
                  onCheckedChange={(checked) => updateFormSettings({ requireLogin: checked })}
                />
                <Label htmlFor="require-login">Require user authentication</Label>
              </div>

              {form.settings.approval && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="approval-enabled"
                      checked={form.settings.approval.enabled}
                      onCheckedChange={(enabled) => updateFormSettings({ 
                        approval: { ...form.settings.approval, enabled } 
                      })}
                    />
                    <Label htmlFor="approval-enabled">Enable approval workflow</Label>
                  </div>
                  
                  {form.settings.approval.enabled && (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="require-approval"
                        checked={form.settings.approval.requireApproval}
                        onCheckedChange={(requireApproval) => updateFormSettings({ 
                          approval: { ...form.settings.approval, requireApproval } 
                        })}
                      />
                      <Label htmlFor="require-approval">Require approval for all submissions</Label>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-4">
          {!isPublished && <DraftStateWarning />}
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Invitations
                {!isPublished && (
                  <Badge variant="outline" className="ml-2">
                    Applies when published
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <EmailDistributionSettings form={form} onUpdateForm={onUpdateForm} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <FormAppearanceSettings
            formId={form.id}
            currentSettings={form.settings}
            onSave={(settings) => updateFormSettings(settings)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};