import React, { useState } from 'react';
import { useBrand } from '@/contexts/BrandContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Upload, Palette, RotateCcw, Eye, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { toast } from '@/hooks/use-toast';

export const BrandSettings: React.FC = () => {
  const { brand, updateBrand, updateLogo, updateColors, resetToDefaults } = useBrand();
  const [tempName, setTempName] = useState(brand.name);
  const [tempTagline, setTempTagline] = useState(brand.tagline || '');
  const [previewColors, setPreviewColors] = useState(brand.colors);

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

  const handleColorChange = (type: 'primary' | 'secondary', shade: 'main' | 'light' | 'dark', value: string) => {
    // Convert hex to HSL
    const hslValue = hexToHsl(value);
    setPreviewColors(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [shade]: hslValue
      }
    }));
  };

  const hexToHsl = (hex: string): string => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert hex to RGB
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

  const handleSaveColors = () => {
    updateColors(previewColors);
    toast({
      title: "Colors Updated",
      description: "Your brand colors have been saved.",
    });
  };

  const handleReset = () => {
    resetToDefaults();
    setTempName('FormFlow');
    setTempTagline('Build, Share, Analyze Forms with Intelligence');
    setPreviewColors({
      primary: {
        main: '208 100% 47%',
        light: '210 100% 70%',
        dark: '208 100% 35%'
      },
      secondary: {
        main: '262 83% 58%',
        light: '262 83% 75%',
        dark: '262 83% 45%'
      }
    });
    toast({
      title: "Brand Reset",
      description: "Your brand has been reset to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Brand Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Brand Preview</CardTitle>
          <p className="text-sm text-gray-600">See how your brand identity looks across the platform</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Main Brand Display */}
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
              {brand.logo && (
                <img 
                  src={brand.logo} 
                  alt="Brand Logo" 
                  className="h-12 w-auto object-contain"
                />
              )}
              <div>
                <h3 className="font-semibold text-lg brand-text">{brand.name}</h3>
                {brand.tagline && (
                  <p className="text-sm text-gray-600">{brand.tagline}</p>
                )}
              </div>
            </div>
            
            {/* Brand Application Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <h4 className="text-sm font-medium mb-2">Navigation & UI</h4>
                <div className="space-y-2">
                  <div className="h-8 rounded-md" style={{ backgroundColor: `hsl(${brand.colors.primary.main})` }}>
                    <div className="h-full flex items-center px-3 text-white text-xs">Primary Buttons</div>
                  </div>
                  <div className="h-6 rounded border-2" style={{ borderColor: `hsl(${brand.colors.primary.main})` }}>
                    <div className="h-full flex items-center px-2 text-xs" style={{ color: `hsl(${brand.colors.primary.main})` }}>Focus States</div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="text-sm font-medium mb-2">Forms & Content</h4>
                <div className="space-y-2">
                  <div className="h-6 rounded-md" style={{ backgroundColor: `hsl(${brand.colors.secondary.main})` }}>
                    <div className="h-full flex items-center px-2 text-white text-xs">Secondary Elements</div>
                  </div>
                  <div className="h-6 rounded border" style={{ borderColor: `hsl(${brand.colors.primary.light})` }}>
                    <div className="h-full flex items-center px-2 text-xs">Form Borders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brand-name">Application Name</Label>
            <Input
              id="brand-name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter your application name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand-tagline">Tagline (Optional)</Label>
            <Textarea
              id="brand-tagline"
              value={tempTagline}
              onChange={(e) => setTempTagline(e.target.value)}
              placeholder="Enter a brief tagline or description"
              rows={2}
            />
          </div>

          <Button onClick={handleSaveBasicInfo} className="w-full">
            Save Basic Information
          </Button>
        </CardContent>
      </Card>

      {/* Logo Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Logo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
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
            {brand.logo && (
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
        </CardContent>
      </Card>

      {/* Color Scheme & Application */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Color Scheme & Application</CardTitle>
          <p className="text-sm text-gray-600">Customize your brand colors and see how they apply across the platform</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Color Section */}
          <div>
            <h4 className="font-medium mb-3">Primary Colors</h4>
            <p className="text-xs text-gray-500 mb-4">
              Used for: Main buttons, navigation active states, form focus borders, primary CTAs, brand logo text
            </p>
            <div className="grid gap-4">
              {(['main', 'light', 'dark'] as const).map((shade) => (
                <div key={shade} className="flex items-center gap-3">
                  <Label className="w-16 text-sm capitalize">{shade}</Label>
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="color"
                      value={hslToHex(previewColors.primary[shade])}
                      onChange={(e) => handleColorChange('primary', shade, e.target.value)}
                      className="w-10 h-10 rounded border border-gray-300"
                    />
                    <Badge variant="outline" className="text-xs">
                      {previewColors.primary[shade]}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">
                    {shade === 'main' && 'Primary buttons, brand text'}
                    {shade === 'light' && 'Form borders, subtle backgrounds'}
                    {shade === 'dark' && 'Hover states, active buttons'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Color Section */}
          <div>
            <h4 className="font-medium mb-3">Secondary Colors</h4>
            <p className="text-xs text-gray-500 mb-4">
              Used for: Secondary buttons, badges, highlights, accent elements, progress indicators
            </p>
            <div className="grid gap-4">
              {(['main', 'light', 'dark'] as const).map((shade) => (
                <div key={shade} className="flex items-center gap-3">
                  <Label className="w-16 text-sm capitalize">{shade}</Label>
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="color"
                      value={hslToHex(previewColors.secondary[shade])}
                      onChange={(e) => handleColorChange('secondary', shade, e.target.value)}
                      className="w-10 h-10 rounded border border-gray-300"
                    />
                    <Badge variant="outline" className="text-xs">
                      {previewColors.secondary[shade]}
                    </Badge>
                  </div>
                  <span className="text-xs text-gray-500">
                    {shade === 'main' && 'Secondary buttons, badges'}
                    {shade === 'light' && 'Soft backgrounds, subtle accents'}
                    {shade === 'dark' && 'Secondary hover states'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Color Application Guide */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Color Application Reference</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <h5 className="font-medium text-sm mb-1">Light Theme</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• Background: White (#ffffff)</li>
                  <li>• Text: Dark gray (#111827)</li>
                  <li>• Cards: White with light borders</li>
                  <li>• Buttons: Primary/Secondary colors</li>
                  <li>• Forms: Light gray backgrounds</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-1">Dark Theme</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• Background: Dark slate (#0f172a)</li>
                  <li>• Text: Light gray (#f8fafc)</li>
                  <li>• Cards: Dark with subtle borders</li>
                  <li>• Buttons: Primary/Secondary colors</li>
                  <li>• Forms: Dark gray backgrounds</li>
                </ul>
              </div>
            </div>
          </div>

          <Button onClick={handleSaveColors} className="w-full">
            Save Color Scheme
          </Button>
        </CardContent>
      </Card>

      {/* Font Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Typography</CardTitle>
          <p className="text-sm text-gray-600">Configure fonts for your brand</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label className="text-sm font-medium">Primary Font Family</Label>
              <select 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                defaultValue="inter"
              >
                <option value="inter">Inter (Default)</option>
                <option value="dm-sans">DM Sans</option>
                <option value="system">System UI</option>
                <option value="arial">Arial</option>
                <option value="helvetica">Helvetica</option>
                <option value="times">Times New Roman</option>
                <option value="georgia">Georgia</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Used for all body text and interface elements</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Heading Font Family</Label>
              <select 
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                defaultValue="inter"
              >
                <option value="inter">Inter (Default)</option>
                <option value="dm-sans">DM Sans</option>
                <option value="system">System UI</option>
                <option value="playfair">Playfair Display</option>
                <option value="roboto-slab">Roboto Slab</option>
                <option value="montserrat">Montserrat</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Used for headings and titles</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-sm">Font Preview</h4>
              <div className="space-y-2">
                <h1 className="text-xl font-bold">This is a heading (H1)</h1>
                <h2 className="text-lg font-semibold">This is a subheading (H2)</h2>
                <p className="text-base">This is body text that shows how your content will look with the selected font.</p>
                <p className="text-sm text-gray-600">This is smaller text used for descriptions and captions.</p>
              </div>
            </div>
          </div>
          
          <Button variant="default" className="w-full">
            Save Typography
          </Button>
        </CardContent>
      </Card>

      {/* Reset Section */}
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <RotateCcw className="h-5 w-5" />
            Reset Brand
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This will reset all brand settings to their default values.
          </p>
          <Button variant="destructive" onClick={handleReset} className="w-full">
            Reset to Defaults
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};