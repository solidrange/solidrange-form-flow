import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBrand } from "@/contexts/BrandContext";
import { BrandColors } from "@/contexts/BrandContext";

interface FormAppearanceSettingsProps {
  formId?: string;
  currentSettings?: {
    branding?: {
      enabled: boolean;
      showLogo: boolean;
      showBrandColors: boolean;
      useGlobalBranding?: boolean;
      brandName?: string;
      logo?: string;
      colors?: BrandColors;
    };
  };
  onSave?: (settings: any) => void;
}

export const FormAppearanceSettings: React.FC<FormAppearanceSettingsProps> = ({
  formId,
  currentSettings,
  onSave
}) => {
  const { brand } = useBrand();
  const [settings, setSettings] = useState({
    branding: {
      enabled: currentSettings?.branding?.enabled ?? true,
      showLogo: currentSettings?.branding?.showLogo ?? true,
      showBrandColors: currentSettings?.branding?.showBrandColors ?? true,
      useGlobalBranding: currentSettings?.branding?.useGlobalBranding ?? true,
      brandName: currentSettings?.branding?.brandName || brand.name,
      logo: currentSettings?.branding?.logo || brand.logo,
      colors: currentSettings?.branding?.colors || brand.colors,
    }
  });

  const [colorPreview, setColorPreview] = useState<{
    primary?: Partial<BrandColors['primary']>;
    secondary?: Partial<BrandColors['secondary']>;
  }>({});

  const handleColorChange = (type: 'primary' | 'secondary', shade: 'main' | 'light' | 'dark', value: string) => {
    setColorPreview(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [shade]: value
      }
    }));
  };

  const hexToHsl = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  };

  const hslToHex = (hsl: string): string => {
    const [h, s, l] = hsl.split(' ').map((val, idx) => {
      if (idx === 0) return parseInt(val) / 360;
      return parseInt(val.replace('%', '')) / 100;
    });

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 1/6) { r = c; g = x; b = 0; }
    else if (1/6 <= h && h < 2/6) { r = x; g = c; b = 0; }
    else if (2/6 <= h && h < 3/6) { r = 0; g = c; b = x; }
    else if (3/6 <= h && h < 4/6) { r = 0; g = x; b = c; }
    else if (4/6 <= h && h < 5/6) { r = x; g = 0; b = c; }
    else if (5/6 <= h && h < 1) { r = c; g = 0; b = x; }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        setSettings(prev => ({
          ...prev,
          branding: {
            ...prev.branding,
            logo: logoUrl
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCustomColors = () => {
    const updatedColors = {
      primary: {
        main: colorPreview.primary?.main || settings.branding.colors.primary.main,
        light: colorPreview.primary?.light || settings.branding.colors.primary.light,
        dark: colorPreview.primary?.dark || settings.branding.colors.primary.dark,
      },
      secondary: {
        main: colorPreview.secondary?.main || settings.branding.colors.secondary.main,
        light: colorPreview.secondary?.light || settings.branding.colors.secondary.light,
        dark: colorPreview.secondary?.dark || settings.branding.colors.secondary.dark,
      }
    };

    setSettings(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        colors: updatedColors
      }
    }));
    setColorPreview({});
  };

  const handleSave = () => {
    onSave?.(settings);
  };

  const activeColors = settings.branding.useGlobalBranding ? brand.colors : settings.branding.colors;
  const activeBrandName = settings.branding.useGlobalBranding ? brand.name : settings.branding.brandName;
  const activeLogo = settings.branding.useGlobalBranding ? brand.logo : settings.branding.logo;

  return (
    <div className="space-y-6">
      {/* Form Branding Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Form Appearance</CardTitle>
          <p className="text-sm text-gray-600">
            Configure how your form appears to users. You can use global branding or customize it specifically for this form.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="branding-enabled" className="text-sm font-medium">
                Enable Branding
              </Label>
              <p className="text-xs text-gray-500">Show brand elements on this form</p>
            </div>
            <Switch
              id="branding-enabled"
              checked={settings.branding.enabled}
              onCheckedChange={(checked) => 
                setSettings(prev => ({
                  ...prev,
                  branding: { ...prev.branding, enabled: checked }
                }))
              }
            />
          </div>

          {settings.branding.enabled && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="use-global" className="text-sm font-medium">
                    Use Global Branding
                  </Label>
                  <p className="text-xs text-gray-500">Inherit from global brand settings</p>
                </div>
                <Switch
                  id="use-global"
                  checked={settings.branding.useGlobalBranding}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      branding: { ...prev.branding, useGlobalBranding: checked }
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-logo" className="text-sm font-medium">
                    Show Logo
                  </Label>
                  <p className="text-xs text-gray-500">Display brand logo on form</p>
                </div>
                <Switch
                  id="show-logo"
                  checked={settings.branding.showLogo}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      branding: { ...prev.branding, showLogo: checked }
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-colors" className="text-sm font-medium">
                    Show Brand Colors
                  </Label>
                  <p className="text-xs text-gray-500">Apply brand colors to form elements</p>
                </div>
                <Switch
                  id="show-colors"
                  checked={settings.branding.showBrandColors}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({
                      ...prev,
                      branding: { ...prev.branding, showBrandColors: checked }
                    }))
                  }
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Custom Branding Settings */}
      {settings.branding.enabled && !settings.branding.useGlobalBranding && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Custom Brand Identity</CardTitle>
              <p className="text-sm text-gray-600">Override global settings for this form</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="form-brand-name" className="text-sm font-medium">
                  Brand Name
                </Label>
                <Input
                  id="form-brand-name"
                  value={settings.branding.brandName}
                  onChange={(e) => 
                    setSettings(prev => ({
                      ...prev,
                      branding: { ...prev.branding, brandName: e.target.value }
                    }))
                  }
                  placeholder="Enter brand name for this form"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="form-logo" className="text-sm font-medium">
                  Custom Logo
                </Label>
                <div className="mt-1 space-y-2">
                  <Input
                    id="form-logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  {settings.branding.logo && (
                    <div className="flex items-center gap-2">
                      <img 
                        src={settings.branding.logo} 
                        alt="Form Logo" 
                        className="h-8 w-auto object-contain"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => 
                          setSettings(prev => ({
                            ...prev,
                            branding: { ...prev.branding, logo: null }
                          }))
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Custom Colors</CardTitle>
              <p className="text-sm text-gray-600">Set specific colors for this form</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Colors */}
              <div>
                <h4 className="font-medium mb-3">Primary Colors</h4>
                <div className="grid gap-4">
                  {(['main', 'light', 'dark'] as const).map((shade) => (
                    <div key={shade} className="flex items-center gap-3">
                      <Label className="w-16 text-sm capitalize">{shade}</Label>
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="color"
                          value={hslToHex(`hsl(${colorPreview.primary?.[shade] || settings.branding.colors.primary[shade]})`)}
                          onChange={(e) => handleColorChange('primary', shade, hexToHsl(e.target.value))}
                          className="w-10 h-10 rounded border border-gray-300"
                        />
                        <Input
                          value={`hsl(${colorPreview.primary?.[shade] || settings.branding.colors.primary[shade]})`}
                          onChange={(e) => handleColorChange('primary', shade, e.target.value.replace('hsl(', '').replace(')', ''))}
                          className="flex-1"
                          placeholder={`Primary ${shade} color`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Colors */}
              <div>
                <h4 className="font-medium mb-3">Secondary Colors</h4>
                <div className="grid gap-4">
                  {(['main', 'light', 'dark'] as const).map((shade) => (
                    <div key={shade} className="flex items-center gap-3">
                      <Label className="w-16 text-sm capitalize">{shade}</Label>
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="color"
                          value={hslToHex(`hsl(${colorPreview.secondary?.[shade] || settings.branding.colors.secondary[shade]})`)}
                          onChange={(e) => handleColorChange('secondary', shade, hexToHsl(e.target.value))}
                          className="w-10 h-10 rounded border border-gray-300"
                        />
                        <Input
                          value={`hsl(${colorPreview.secondary?.[shade] || settings.branding.colors.secondary[shade]})`}
                          onChange={(e) => handleColorChange('secondary', shade, e.target.value.replace('hsl(', '').replace(')', ''))}
                          className="flex-1"
                          placeholder={`Secondary ${shade} color`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {Object.keys(colorPreview).length > 0 && (
                <Button onClick={handleSaveCustomColors} variant="outline">
                  Apply Color Changes
                </Button>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Form Preview</CardTitle>
          <p className="text-sm text-gray-600">Preview how your form will appear to users</p>
        </CardHeader>
        <CardContent>
          <div 
            className="border rounded-lg p-4 bg-white"
            style={settings.branding.enabled && settings.branding.showBrandColors ? {
              '--brand-primary': `hsl(${activeColors.primary.main})`,
              '--brand-secondary': `hsl(${activeColors.secondary.main})`,
            } as React.CSSProperties : {}}
          >
            {/* Form Header */}
            {settings.branding.enabled && (settings.branding.showLogo || activeBrandName) && (
              <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                {settings.branding.showLogo && activeLogo && (
                  <img 
                    src={activeLogo} 
                    alt={activeBrandName || 'Brand Logo'} 
                    className="h-10 w-auto object-contain"
                  />
                )}
                <div>
                  <h3 
                    className="font-semibold"
                    style={settings.branding.showBrandColors ? { 
                      color: `hsl(${activeColors.primary.main})` 
                    } : {}}
                  >
                    {activeBrandName}
                  </h3>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <h2 
                  className="text-xl font-bold mb-2"
                  style={settings.branding.enabled && settings.branding.showBrandColors ? { 
                    color: `hsl(${activeColors.primary.main})` 
                  } : {}}
                >
                  Sample Form Title
                </h2>
                <p className="text-gray-600 text-sm">
                  This is how your form will appear with the current branding settings.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Name *</Label>
                  <Input 
                    placeholder="Enter your name"
                    className={settings.branding.enabled && settings.branding.showBrandColors ? 'brand-focus' : ''}
                    style={settings.branding.enabled && settings.branding.showBrandColors ? {
                      borderColor: `hsl(${activeColors.primary.light})`,
                    } : {}}
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    style={settings.branding.enabled && settings.branding.showBrandColors ? {
                      backgroundColor: `hsl(${activeColors.primary.main})`,
                      borderColor: `hsl(${activeColors.primary.main})`,
                    } : {}}
                  >
                    Submit
                  </Button>
                  <Button 
                    variant="outline"
                    style={settings.branding.enabled && settings.branding.showBrandColors ? {
                      borderColor: `hsl(${activeColors.secondary.main})`,
                      color: `hsl(${activeColors.secondary.main})`,
                    } : {}}
                  >
                    Save Draft
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="px-6">
          Save Appearance Settings
        </Button>
      </div>
    </div>
  );
};