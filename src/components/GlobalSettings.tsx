import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BrandSettings } from "./BrandSettings";
import { useTheme, ThemeMode } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon, Monitor, CheckCircle } from "lucide-react";

export const GlobalSettings = () => {
  const { themeMode, resolvedMode, setThemeMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const handleThemeChange = (theme: ThemeMode) => {
    setThemeMode(theme);
  };

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
  };

  const getThemeIcon = (theme: ThemeMode) => {
    switch (theme) {
      case 'light': return <Sun className="h-4 w-4" />;
      case 'dark': return <Moon className="h-4 w-4" />;
      case 'system': return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Language Settings */}
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-foreground">{t('languageSettings')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-foreground">{t('selectLanguage')}</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="mt-1 bg-background text-foreground border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
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

      {/* Theme Settings */}
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-foreground">{t('theme')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-foreground">{t('globalTheme')}</Label>
            <Select value={themeMode} onValueChange={handleThemeChange}>
              <SelectTrigger className="mt-1 bg-background text-foreground border-border">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {getThemeIcon(themeMode)}
                    <span>
                      {themeMode === 'light' ? t('light') : themeMode === 'dark' ? t('dark') : t('system')}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground">
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <span>{t('light')}</span>
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    <span>{t('dark')}</span>
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    <span>{t('system')}</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Active: {resolvedMode === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </Badge>
              {themeMode === 'system' && (
                <span className="text-xs text-muted-foreground">
                  (Following system preference)
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t('themeDescription')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Brand Identity Settings */}
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-foreground">{t('brandIdentity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandSettings />
        </CardContent>
      </Card>
    </div>
  );
};