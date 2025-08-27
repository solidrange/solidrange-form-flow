
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandSettings } from "./BrandSettings";
import { DocumentationResources } from "./DocumentationResources";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="general">{t('generalSettings') || 'General Settings'}</TabsTrigger>
        <TabsTrigger value="resources">{t('resources') || 'Resources'}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="space-y-6">
        {/* Language Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t('languageSettings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{t('selectLanguage')}</Label>
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

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t('theme')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>{t('globalTheme')}</Label>
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

        {/* Brand Identity Settings */}
        <Card>
          <CardHeader>
            <CardTitle>{t('brandIdentity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <BrandSettings />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="resources">
        <DocumentationResources />
      </TabsContent>
    </Tabs>
  );
};
