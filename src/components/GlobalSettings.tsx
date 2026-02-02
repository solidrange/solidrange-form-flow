import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { BrandSettings } from "./BrandSettings";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";

export const GlobalSettings = () => {
  const { language, setLanguage, t } = useLanguage();
  const { showDevelopmentResources, setShowDevelopmentResources } = useSettings();

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
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

      {/* Brand Identity Settings */}
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-foreground">{t('brandIdentity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandSettings />
        </CardContent>
      </Card>

      {/* Developer Settings */}
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-foreground">Developer Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-foreground">Show Development Resources</Label>
              <p className="text-xs text-muted-foreground">
                Enable access to technical documentation and development resources in the sidebar.
              </p>
            </div>
            <Switch
              checked={showDevelopmentResources}
              onCheckedChange={setShowDevelopmentResources}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
