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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Appearance & Branding
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <select
                  id="theme"
                  value={form.settings.theme}
                  onChange={(e) => updateFormSettings({ theme: e.target.value as 'light' | 'dark' | 'custom' })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {form.settings.branding && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="branding-enabled"
                      checked={form.settings.branding.enabled}
                      onCheckedChange={(enabled) => updateFormSettings({ 
                        branding: { ...form.settings.branding, enabled } 
                      })}
                    />
                    <Label htmlFor="branding-enabled">Enable custom branding</Label>
                  </div>
                  
                  {form.settings.branding.enabled && (
                    <>
                      {/* Global Branding Inheritance */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Link className="h-4 w-4 text-blue-600" />
                            <Label className="text-sm font-medium text-blue-800">
                              Global Brand Inheritance
                            </Label>
                          </div>
                          {!isUsingGlobalBranding && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={inheritGlobalBranding}
                              className="h-8 text-xs"
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Use Global
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="use-global-branding"
                            checked={isUsingGlobalBranding}
                            onCheckedChange={(useGlobalBranding) => updateFormSettings({ 
                              branding: { 
                                ...form.settings.branding, 
                                useGlobalBranding,
                                ...(useGlobalBranding && {
                                  brandName: brand.name,
                                  logo: brand.logo,
                                  colors: brand.colors
                                })
                              } as any
                            })}
                          />
                          <Label htmlFor="use-global-branding" className="text-sm">
                            Inherit from global brand identity
                          </Label>
                        </div>
                        
                        {isUsingGlobalBranding && (
                          <div className="mt-3 p-3 bg-white rounded border text-sm">
                            <div className="flex items-center gap-2 mb-2">
                              <Info className="h-4 w-4 text-blue-600" />
                              <span className="font-medium text-blue-800">Using Global Settings:</span>
                            </div>
                            <div className="space-y-1 text-gray-600">
                              <div>• Name: <span className="font-medium">{brand.name}</span></div>
                              <div>• Logo: {brand.logo ? <span className="text-green-600">✓ Configured</span> : <span className="text-gray-400">Not set</span>}</div>
                              <div>• Colors: <span className="text-green-600">✓ Configured</span></div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Separator />
                      
                      {/* Custom Branding Override Section */}
                      <div className={isUsingGlobalBranding ? 'opacity-50' : ''}>
                        <div className="flex items-center gap-2 mb-4">
                          <Palette className="h-4 w-4" />
                          <Label className="text-base font-medium">
                            {isUsingGlobalBranding ? 'Custom Overrides (Disabled)' : 'Custom Branding'}
                          </Label>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="brand-name">Organization Name</Label>
                            <Input
                              id="brand-name"
                              value={isUsingGlobalBranding ? effectiveBrandName : (form.settings.branding.brandName || '')}
                              onChange={(e) => updateFormSettings({ 
                                branding: { 
                                  ...form.settings.branding, 
                                  brandName: e.target.value 
                                } 
                              })}
                              placeholder="Enter your organization name"
                              disabled={isUsingGlobalBranding}
                            />
                            {isUsingGlobalBranding && (
                              <p className="text-xs text-muted-foreground">
                                Using global brand name. Disable inheritance to customize.
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="brand-logo">Organization Logo URL</Label>
                            <Input
                              id="brand-logo"
                              value={isUsingGlobalBranding ? (effectiveLogo || '') : (form.settings.branding.logo || '')}
                              onChange={(e) => updateFormSettings({ 
                                branding: { 
                                  ...form.settings.branding, 
                                  logo: e.target.value 
                                } 
                              })}
                              placeholder="https://example.com/logo.png"
                              disabled={isUsingGlobalBranding}
                            />
                            {isUsingGlobalBranding && (
                              <p className="text-xs text-muted-foreground">
                                Using global logo. Disable inheritance to customize.
                              </p>
                            )}
                            
                            {effectiveLogo && (
                              <div className="mt-2">
                                <img 
                                  src={effectiveLogo} 
                                  alt="Logo preview" 
                                  className="h-12 w-auto object-contain border rounded-md p-2"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                                {isUsingGlobalBranding && (
                                  <Badge variant="secondary" className="text-xs mt-1">
                                    From Global Settings
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="show-logo"
                              checked={form.settings.branding.showLogo}
                              onCheckedChange={(showLogo) => updateFormSettings({ 
                                branding: { ...form.settings.branding, showLogo } 
                              })}
                            />
                            <Label htmlFor="show-logo">Show organization logo</Label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="show-brand-colors"
                              checked={form.settings.branding.showBrandColors}
                              onCheckedChange={(showBrandColors) => updateFormSettings({ 
                                branding: { ...form.settings.branding, showBrandColors } 
                              })}
                            />
                            <Label htmlFor="show-brand-colors">Use brand colors</Label>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};