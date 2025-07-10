import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BrandSettings } from "./BrandSettings";
import { useTheme } from "@/contexts/ThemeContext";

export const GlobalSettings = () => {
  const { theme: globalTheme, setTheme } = useTheme();

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setTheme(theme);
  };

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Theme & Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Global Theme</Label>
            <Select value={globalTheme} onValueChange={handleThemeChange}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              Set the default theme for the entire application
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Brand Identity Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Identity</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandSettings />
        </CardContent>
      </Card>
    </div>
  );
};