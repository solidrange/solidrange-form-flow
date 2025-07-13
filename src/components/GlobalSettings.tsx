
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandSettings } from "./BrandSettings";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Palette, Settings } from "lucide-react";

export const GlobalSettings = () => {
  const { theme: globalTheme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setTheme(theme);
  };

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
  };

  return (
    <div className="space-y-6">
      {/* Language & Localization Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language & Localization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Application Language</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t('english')}</SelectItem>
                <SelectItem value="ar">{t('arabic')}</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {t('languageDescription')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Application Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Application Theme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Global Theme</Label>
            <Select value={globalTheme} onValueChange={handleThemeChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t('light')}</SelectItem>
                <SelectItem value="dark">{t('dark')}</SelectItem>
                <SelectItem value="system">{t('system')}</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {t('themeDescription')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Brand Identity & Customization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Brand Identity & Customization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <BrandSettings />
        </CardContent>
      </Card>
    </div>
  );
};
