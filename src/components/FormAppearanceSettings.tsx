import React, { useState } from 'react';
import { useBrand, BrandColors } from '@/contexts/BrandContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Palette, RotateCcw, Paintbrush } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Form } from '@/types/form';

interface FormAppearanceSettingsProps {
  form: Form;
  onUpdateForm: (updates: Partial<Form>) => void;
}

export const FormAppearanceSettings: React.FC<FormAppearanceSettingsProps> = ({ 
  form, 
  onUpdateForm 
}) => {
  const { brand, getCurrentThemeColors } = useBrand();
  
  // Get current form branding settings with fallbacks
  const formBranding = form.settings.branding || {
    enabled: true,
    useGlobalBranding: true,
    showLogo: true,
    showBrandColors: true,
    brandName: brand.name,
    logo: brand.logo,
    colors: getCurrentThemeColors()
  };
  
  const [useGlobalBranding, setUseGlobalBranding] = useState(formBranding.useGlobalBranding ?? true);
  const [customColors, setCustomColors] = useState<BrandColors>(() => {
    // Ensure we always have a valid BrandColors object
    const currentThemeColors = getCurrentThemeColors();
    const savedColors = formBranding.colors;
    
    // Type guard to check if savedColors has all required BrandColors properties
    const isValidBrandColors = (colors: any): colors is BrandColors => {
      return colors && 
             colors.primary && colors.secondary && 
             colors.background && colors.surface && 
             colors.text && colors.button;
    };
    
    // If savedColors is incomplete or in old format, use current theme colors
    if (!isValidBrandColors(savedColors)) {
      return currentThemeColors;
    }
    
    return savedColors as BrandColors;
  });

  const handleToggleGlobalBranding = (enabled: boolean) => {
    setUseGlobalBranding(enabled);
    const updatedBranding = {
      ...formBranding,
      useGlobalBranding: enabled,
      ...(enabled && {
        brandName: brand.name,
        logo: brand.logo,
        colors: getCurrentThemeColors()
      })
    };
    
    onUpdateForm({
      settings: {
        ...form.settings,
        branding: updatedBranding
      }
    });
    
    if (enabled) {
      setCustomColors(getCurrentThemeColors());
    }
    toast({
      title: enabled ? "Global Branding Enabled" : "Custom Branding Enabled",
      description: enabled 
        ? "This form will use global brand settings."
        : "This form will use custom appearance settings.",
    });
  };

  const handleColorChange = (colorPath: string, value: string) => {
    const hslValue = hexToHsl(value);
    const keys = colorPath.split('.');
    
    setCustomColors(prev => {
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = hslValue;
      return updated;
    });
  };

  const hexToHsl = (hex: string): string => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

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
      if (idx === 0) return parseInt(val);
      return parseInt(val.replace('%', '')) / 100;
    });

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;
    
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const handleSaveCustomColors = () => {
    const updatedBranding = {
      ...formBranding,
      colors: customColors
    };
    
    onUpdateForm({
      settings: {
        ...form.settings,
        branding: updatedBranding
      }
    });
    
    toast({
      title: "Form Appearance Updated",
      description: "Custom appearance settings have been saved for this form.",
    });
  };

  const handleResetToGlobal = () => {
    setCustomColors(getCurrentThemeColors());
    setUseGlobalBranding(true);
    
    const updatedBranding = {
      ...formBranding,
      useGlobalBranding: true,
      brandName: brand.name,
      logo: brand.logo,
      colors: getCurrentThemeColors()
    };
    
    onUpdateForm({
      settings: {
        ...form.settings,
        branding: updatedBranding
      }
    });
    
    toast({
      title: "Reset to Global Settings",
      description: "Form appearance has been reset to use global brand settings.",
    });
  };

  const ColorInput = ({ colorPath, label }: { colorPath: string, label: string }) => (
    <div className="space-y-2">
      <Label className="text-xs sm:text-sm font-medium">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={hslToHex(colorPath.split('.').reduce((obj, key) => obj[key], customColors))}
          onChange={(e) => handleColorChange(colorPath, e.target.value)}
          disabled={useGlobalBranding}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded border border-input cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <Badge variant="outline" className="text-xs flex-1 min-w-0">
          <span className="truncate">{colorPath.split('.').reduce((obj, key) => obj[key], customColors)}</span>
        </Badge>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Branding Mode Toggle */}
      <Card className="modern-card">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-mobile-base">
            <Paintbrush className="h-4 w-4 sm:h-5 sm:w-5" />
            Form Branding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-mobile-sm font-medium">Use Global Branding</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Use the global brand settings for this form
              </p>
            </div>
            <Switch
              checked={useGlobalBranding}
              onCheckedChange={handleToggleGlobalBranding}
            />
          </div>

          {!useGlobalBranding && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Custom branding is enabled. Configure the colors below to override global settings for this form only.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Custom Color Configuration */}
      {!useGlobalBranding && (
        <Card className="modern-card">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-mobile-base">
              <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
              Custom Colors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* Primary Colors */}
            <div className="space-y-3">
              <Label className="text-sm sm:text-base font-medium">Primary Colors</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <ColorInput colorPath="primary.main" label="Main" />
                <ColorInput colorPath="primary.light" label="Light" />
                <ColorInput colorPath="primary.dark" label="Dark" />
              </div>
            </div>

            <Separator />

            {/* Secondary Colors */}
            <div className="space-y-3">
              <Label className="text-sm sm:text-base font-medium">Secondary Colors</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <ColorInput colorPath="secondary.main" label="Main" />
                <ColorInput colorPath="secondary.light" label="Light" />
                <ColorInput colorPath="secondary.dark" label="Dark" />
              </div>
            </div>

            <Separator />

            {/* Form Specific Colors */}
            <div className="space-y-3">
              <Label className="text-sm sm:text-base font-medium">Form Colors</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <ColorInput colorPath="background" label="Form Background" />
                <ColorInput colorPath="surface" label="Card Background" />
                <ColorInput colorPath="text.primary" label="Primary Text" />
                <ColorInput colorPath="text.secondary" label="Secondary Text" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button onClick={handleSaveCustomColors} className="flex-1 btn-mobile">
                Save Custom Appearance
              </Button>
              <Button 
                variant="outline" 
                onClick={handleResetToGlobal}
                className="flex-1 btn-mobile"
              >
                <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Reset to Global
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview Section */}
      <Card className="modern-card">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-mobile-base">Form Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 p-4 rounded-lg border" style={{
            backgroundColor: useGlobalBranding 
              ? `hsl(${getCurrentThemeColors().surface})` 
              : `hsl(${customColors.surface})`,
            borderColor: useGlobalBranding 
              ? `hsl(${getCurrentThemeColors().primary.light})` 
              : `hsl(${customColors.primary.light})`
          }}>
            <h3 className="font-medium text-mobile-sm" style={{
              color: useGlobalBranding 
                ? `hsl(${getCurrentThemeColors().text.primary})` 
                : `hsl(${customColors.text.primary})`
            }}>
              Sample Form Title
            </h3>
            <p className="text-xs sm:text-sm" style={{
              color: useGlobalBranding 
                ? `hsl(${getCurrentThemeColors().text.secondary})` 
                : `hsl(${customColors.text.secondary})`
            }}>
              This is how your form will look with the current settings.
            </p>
            <Button 
              size="sm" 
              className="btn-mobile"
              style={{
                backgroundColor: useGlobalBranding 
                  ? `hsl(${getCurrentThemeColors().primary.main})` 
                  : `hsl(${customColors.primary.main})`,
                borderColor: useGlobalBranding 
                  ? `hsl(${getCurrentThemeColors().primary.main})` 
                  : `hsl(${customColors.primary.main})`
              }}
            >
              Sample Button
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};