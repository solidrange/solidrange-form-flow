import React, { useState, useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useBrand } from '@/contexts/BrandContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Palette, RotateCcw, Eye, X, Sun, Moon, Type, Info, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { toast } from '@/hooks/use-toast';
import { ContrastPanel } from './ContrastIndicator';
import { evaluateContrast, clampLightnessForAccessibility, getAccessibleDefaults } from '@/utils/colorContrast';

const colorExplanations = {
  primary: {
    main: 'Main brand color used for primary buttons, links, and key interactive elements',
    light: 'Lighter variant for hover states, backgrounds, and secondary elements',
    dark: 'Darker variant for pressed states, borders, and emphasis'
  },
  secondary: {
    main: 'Secondary brand color for accent elements, badges, and complementary features',
    light: 'Light secondary for subtle backgrounds and muted elements',
    dark: 'Dark secondary for secondary button hover states and borders'
  },
  background: 'Main page background color',
  surface: 'Card backgrounds, modals, and elevated surface colors',
  text: {
    primary: 'Main text color for headings and important content',
    secondary: 'Secondary text color for descriptions and less important content'
  },
  button: {
    primary: 'Primary action button colors (submit, save, create)',
    secondary: 'Secondary action button colors (cancel, back, optional actions)',
    destructive: 'Destructive action button colors (delete, remove, warning actions)'
  }
};

const fontOptions = [
  { name: 'Inter', value: 'Inter' },
  { name: 'DM Sans', value: 'DM Sans' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
  { name: 'Lato', value: 'Lato' },
  { name: 'Montserrat', value: 'Montserrat' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro' }
];

export const BrandSettings: React.FC = () => {
  const { resolvedMode } = useTheme();
  const { brand, updateBrand, updateLogo, updateThemeColors, updateFonts, resetToDefaults, getCurrentThemeColors } = useBrand();
  const [tempName, setTempName] = useState(brand.name);
  const [tempTagline, setTempTagline] = useState(brand.tagline || '');
  // Initialize activeTheme based on actual resolved theme mode
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>(resolvedMode);
  const [previewColors, setPreviewColors] = useState(() => 
    resolvedMode === 'light' ? brand.lightTheme.colors : brand.darkTheme.colors
  );

  // Sync activeTheme with resolved theme when it changes
  React.useEffect(() => {
    setActiveTheme(resolvedMode);
    setPreviewColors(resolvedMode === 'light' ? brand.lightTheme.colors : brand.darkTheme.colors);
  }, [resolvedMode, brand.lightTheme.colors, brand.darkTheme.colors]);

  const handleSaveBasicInfo = () => {
    updateBrand({
      name: tempName,
      tagline: tempTagline
    });
    toast({
      title: "Brand Updated",
      description: "Your brand information has been saved.",
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        updateLogo(logoUrl);
        toast({
          title: "Logo Updated",
          description: "Your brand logo has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    updateLogo(null);
    toast({
      title: "Logo Removed",
      description: "Your brand logo has been removed.",
    });
  };

  const handleThemeSwitch = (newTheme: 'light' | 'dark') => {
    setActiveTheme(newTheme);
    setPreviewColors(newTheme === 'light' ? brand.lightTheme.colors : brand.darkTheme.colors);
  };

  const handleColorChange = (colorPath: string, value: string) => {
    const hslValue = hexToHsl(value);
    const keys = colorPath.split('.');
    
    setPreviewColors(prev => {
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = hslValue;
      
      // Apply changes immediately to the theme
      updateThemeColors(activeTheme, updated);
      
      return updated;
    });
  };

  const handleFontChange = (fontType: 'heading' | 'body' | 'mono', fontValue: string) => {
    updateFonts({ [fontType]: fontValue });
    toast({
      title: "Font Updated",
      description: `${fontType.charAt(0).toUpperCase() + fontType.slice(1)} font has been updated.`,
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
    // Handle undefined or invalid input
    if (!hsl || typeof hsl !== 'string') {
      return '#000000'; // Default to black
    }
    
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

  const handleReset = () => {
    resetToDefaults();
    setTempName('SolidForm');
    setTempTagline('Enterprise Assessment Simplified');
    // Reset to original default colors
    const originalDefaultColors = {
      primary: { main: '208 100% 47%', light: '210 100% 70%', dark: '208 100% 35%' },
      secondary: { main: '262 83% 58%', light: '262 83% 75%', dark: '262 83% 45%' },
      background: '0 0% 100%',
      surface: '0 0% 98%',
      text: { primary: '224 71.4% 4.1%', secondary: '220 8.9% 46.1%' },
      button: { primary: '208 100% 47%', secondary: '220 14.3% 95.9%', destructive: '0 84.2% 60.2%' }
    };
    setPreviewColors(originalDefaultColors);
    toast({
      title: "Brand Reset",
      description: "Your brand has been reset to original defaults.",
    });
  };

  const ColorInput = ({ colorPath, label, explanation }: { colorPath: string, label: string, explanation: string }) => {
    // Safely get the color value with fallback
    const getColorValue = (path: string) => {
      try {
        const value = path.split('.').reduce((obj, key) => obj && obj[key], previewColors);
        return value || '208 100% 47%'; // Default HSL value
      } catch (error) {
        console.warn(`Error accessing color path ${path}:`, error);
        return '208 100% 47%'; // Default HSL value
      }
    };
    
    const colorValue = getColorValue(colorPath);
    
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label className="text-xs sm:text-sm font-medium">{label}</Label>
          <div className="group relative">
            <Info className="h-3 w-3 text-muted-foreground cursor-help" />
            <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-50 max-w-xs">
              {explanation}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={hslToHex(colorValue)}
            onChange={(e) => handleColorChange(colorPath, e.target.value)}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded border border-input cursor-pointer"
          />
          <Badge variant="outline" className="text-xs flex-1 min-w-0">
            <span className="truncate">{colorValue}</span>
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4 lg:px-6">
      {/* Preview Section */}
      <Card className="modern-card">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-mobile-base">
            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
            Brand Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-muted/30 rounded-lg">
            <BrandLogo size="xl" showText={true} />
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="modern-card">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-mobile-base">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brand-name" className="text-mobile-sm">Application Name</Label>
            <Input
              id="brand-name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter your application name"
              className="form-input"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand-tagline" className="text-mobile-sm">Tagline (Optional)</Label>
            <Textarea
              id="brand-tagline"
              value={tempTagline}
              onChange={(e) => setTempTagline(e.target.value)}
              placeholder="Enter a brief tagline or description"
              rows={2}
              className="form-input resize-none"
            />
          </div>

          <Button onClick={handleSaveBasicInfo} className="w-full btn-mobile">
            Save Basic Information
          </Button>
        </CardContent>
      </Card>

      {/* Logo Section */}
      <Card className="modern-card">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-mobile-base">
            <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
            Logo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex-1 w-full">
              <Input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="cursor-pointer form-input"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Upload PNG, JPG, or SVG files. Recommended size: 200x200px
              </p>
            </div>
            {brand.logo && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveLogo}
                className="flex items-center gap-2 btn-mobile"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="mobile-hidden">Remove</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Typography Section */}
      <Card className="modern-card">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-mobile-base">
            <Type className="h-4 w-4 sm:h-5 sm:w-5" />
            Typography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label className="text-mobile-sm font-medium">Heading Font</Label>
              <Select value={brand.fonts.heading} onValueChange={(value) => handleFontChange('heading', value)}>
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map(font => (
                    <SelectItem key={font.value} value={font.value}>{font.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-mobile-sm font-medium">Body Font</Label>
              <Select value={brand.fonts.body} onValueChange={(value) => handleFontChange('body', value)}>
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontOptions.map(font => (
                    <SelectItem key={font.value} value={font.value}>{font.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-mobile-sm font-medium">Monospace Font</Label>
              <Select value={brand.fonts.mono} onValueChange={(value) => handleFontChange('mono', value)}>
                <SelectTrigger className="form-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
                  <SelectItem value="Fira Code">Fira Code</SelectItem>
                  <SelectItem value="Consolas">Consolas</SelectItem>
                  <SelectItem value="Monaco">Monaco</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Scheme */}
      <Card className="modern-card">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-mobile-base">
              <Palette className="h-4 w-4 sm:h-5 sm:w-5" />
              Color Scheme
            </CardTitle>
            
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
              <Button
                variant={activeTheme === 'light' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleThemeSwitch('light')}
                className="flex items-center gap-1 sm:gap-2 btn-mobile"
              >
                <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Light</span>
              </Button>
              <Button
                variant={activeTheme === 'dark' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleThemeSwitch('dark')}
                className="flex items-center gap-1 sm:gap-2 btn-mobile"
              >
                <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Dark</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Primary Colors */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium">Primary Colors</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <ColorInput 
                colorPath="primary.main" 
                label="Main" 
                explanation={colorExplanations.primary.main}
              />
              <ColorInput 
                colorPath="primary.light" 
                label="Light" 
                explanation={colorExplanations.primary.light}
              />
              <ColorInput 
                colorPath="primary.dark" 
                label="Dark" 
                explanation={colorExplanations.primary.dark}
              />
            </div>
          </div>

          <Separator />

          {/* Secondary Colors */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium">Secondary Colors</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <ColorInput 
                colorPath="secondary.main" 
                label="Main" 
                explanation={colorExplanations.secondary.main}
              />
              <ColorInput 
                colorPath="secondary.light" 
                label="Light" 
                explanation={colorExplanations.secondary.light}
              />
              <ColorInput 
                colorPath="secondary.dark" 
                label="Dark" 
                explanation={colorExplanations.secondary.dark}
              />
            </div>
          </div>

          <Separator />

          {/* Surface Colors */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium">Surface Colors</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <ColorInput 
                colorPath="background" 
                label="Background" 
                explanation={colorExplanations.background}
              />
              <ColorInput 
                colorPath="surface" 
                label="Surface" 
                explanation={colorExplanations.surface}
              />
            </div>
          </div>

          <Separator />

          {/* Text Colors */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium">Text Colors</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <ColorInput 
                colorPath="text.primary" 
                label="Primary Text" 
                explanation={colorExplanations.text.primary}
              />
              <ColorInput 
                colorPath="text.secondary" 
                label="Secondary Text" 
                explanation={colorExplanations.text.secondary}
              />
            </div>
          </div>

          <Separator />

          {/* Button Colors */}
          <div className="space-y-3">
            <Label className="text-sm sm:text-base font-medium">Button Colors</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <ColorInput 
                colorPath="button.primary" 
                label="Primary" 
                explanation={colorExplanations.button.primary}
              />
              <ColorInput 
                colorPath="button.secondary" 
                label="Secondary" 
                explanation={colorExplanations.button.secondary}
              />
              <ColorInput 
                colorPath="button.destructive" 
                label="Destructive" 
                explanation={colorExplanations.button.destructive}
              />
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              Changes are applied automatically as you modify colors
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Contrast Check */}
      <Card className="modern-card">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-mobile-base text-foreground">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
            Accessibility Contrast Check
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Validating contrast for: <Badge variant="outline" className="text-xs ml-1">
              {activeTheme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </Badge>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current theme contrast check */}
          <ContrastPanel
            title={`${activeTheme === 'light' ? 'Light' : 'Dark'} Theme - WCAG AA`}
            colorPairs={[
              {
                name: 'Body text on background',
                foreground: previewColors.text?.primary || (activeTheme === 'light' ? '224 71% 4%' : '0 0% 100%'),
                background: previewColors.background || (activeTheme === 'light' ? '0 0% 100%' : '222 47% 7%'),
                requirement: 'normal'
              },
              {
                name: 'Secondary text on background',
                foreground: previewColors.text?.secondary || (activeTheme === 'light' ? '220 9% 35%' : '210 10% 75%'),
                background: previewColors.background || (activeTheme === 'light' ? '0 0% 100%' : '222 47% 7%'),
                requirement: 'normal'
              },
              {
                name: 'Primary button text',
                foreground: '0 0% 100%',
                background: previewColors.primary?.main || '208 100% 47%',
                requirement: 'normal'
              },
              {
                name: 'Secondary text on surface',
                foreground: previewColors.text?.secondary || (activeTheme === 'light' ? '220 9% 35%' : '210 10% 75%'),
                background: previewColors.surface || (activeTheme === 'light' ? '0 0% 98%' : '222 30% 12%'),
                requirement: 'normal'
              },
              {
                name: 'Destructive button text',
                foreground: '0 0% 100%',
                background: previewColors.button?.destructive || '0 84% 55%',
                requirement: 'large'
              }
            ]}
          />
          
          {/* Validate the OTHER theme too */}
          <div className="pt-2 border-t">
            <ContrastPanel
              title={`${activeTheme === 'light' ? 'Dark' : 'Light'} Theme - WCAG AA`}
              colorPairs={(() => {
                const otherTheme = activeTheme === 'light' ? brand.darkTheme.colors : brand.lightTheme.colors;
                const isLight = activeTheme !== 'light';
                return [
                  {
                    name: 'Body text on background',
                    foreground: otherTheme.text?.primary || (isLight ? '224 71% 4%' : '0 0% 100%'),
                    background: otherTheme.background || (isLight ? '0 0% 100%' : '222 47% 7%'),
                    requirement: 'normal' as const
                  },
                  {
                    name: 'Secondary text on background',
                    foreground: otherTheme.text?.secondary || (isLight ? '220 9% 35%' : '210 10% 75%'),
                    background: otherTheme.background || (isLight ? '0 0% 100%' : '222 47% 7%'),
                    requirement: 'normal' as const
                  },
                  {
                    name: 'Primary button text',
                    foreground: '0 0% 100%',
                    background: otherTheme.primary?.main || '208 100% 47%',
                    requirement: 'normal' as const
                  }
                ];
              })()}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const defaults = getAccessibleDefaults();
                const themeDefaults = activeTheme === 'light' ? defaults.light : defaults.dark;
                const accessibleColors = {
                  ...previewColors,
                  text: {
                    primary: themeDefaults.textPrimary,
                    secondary: themeDefaults.textSecondary
                  },
                  background: themeDefaults.bgPrimary,
                  surface: themeDefaults.bgElevated
                };
                setPreviewColors(accessibleColors);
                updateThemeColors(activeTheme, accessibleColors);
                toast({
                  title: "Accessible Defaults Applied",
                  description: `${activeTheme === 'light' ? 'Light' : 'Dark'} mode colors reset to WCAG AA compliant values.`,
                });
              }}
              className="flex-1 btn-mobile"
            >
              Reset {activeTheme === 'light' ? 'Light' : 'Dark'} to Accessible Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reset Section */}
      <Card className="modern-card border-destructive/20">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-destructive text-mobile-base">
            <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
            Reset Brand
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
            This will reset all brand settings to their default values.
          </p>
          <Button variant="destructive" onClick={handleReset} className="w-full btn-mobile">
            Reset to Defaults
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};