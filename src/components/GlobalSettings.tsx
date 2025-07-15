
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BrandSettings } from "./BrandSettings";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCard } from "./AnimatedCard";
import { ResponsiveLayout } from "./ResponsiveLayout";
import { 
  Globe, 
  Palette, 
  Settings, 
  Shield, 
  Database, 
  Mail, 
  Bell, 
  Users, 
  FileText, 
  Zap, 
  Lock,
  Eye,
  Sliders,
  MessageSquare,
  BarChart3,
  UserCheck,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const GlobalSettings = () => {
  const { theme: globalTheme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("general");

  // Application Settings State
  const [appSettings, setAppSettings] = useState({
    autoSave: true,
    notifications: {
      email: true,
      push: true,
      sms: false,
      desktop: true
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      ipWhitelist: "",
      auditLog: true
    },
    performance: {
      cacheEnabled: true,
      compressionEnabled: true,
      analyticsEnabled: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 30
    },
    integrations: {
      googleAnalytics: '',
      zapier: false,
      slack: false,
      teams: false
    }
  });

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setTheme(theme);
    toast({
      title: "Theme Updated",
      description: `Theme changed to ${theme}`,
    });
  };

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    setLanguage(lang);
    toast({
      title: "Language Updated",
      description: `Language changed to ${lang === 'en' ? 'English' : 'Arabic'}`,
    });
  };

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setAppSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as object),
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully saved.",
    });
  };

  const handleResetSettings = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <ResponsiveLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Application Settings</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 hidden sm:block">
              Configure your application preferences and system settings
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleResetSettings}>
              <span className="hidden sm:inline">Reset All</span>
              <span className="sm:hidden">Reset</span>
            </Button>
            <Button size="sm" onClick={handleSaveSettings}>
              <span className="hidden sm:inline">Save Changes</span>
              <span className="sm:hidden">Save</span>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="general" className="text-xs sm:text-sm">
              <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs sm:text-sm">
              <Palette className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Theme</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs sm:text-sm">
              <Bell className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Alerts</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="text-xs sm:text-sm">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="branding" className="text-xs sm:text-sm">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Brand</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedCard title="Language & Localization" icon={Globe}>
                <div className="space-y-4">
                  <div>
                    <Label>Application Language</Label>
                    <Select value={language} onValueChange={handleLanguageChange}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Choose your preferred language for the application interface
                    </p>
                  </div>
                  <div>
                    <Label>Date Format</Label>
                    <Select defaultValue="mm/dd/yyyy">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Time Zone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="gmt">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard title="Application Behavior" icon={Sliders} delay={200}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Save</Label>
                      <p className="text-xs text-muted-foreground">Automatically save changes</p>
                    </div>
                    <Switch
                      checked={appSettings.autoSave}
                      onCheckedChange={(checked) => setAppSettings(prev => ({ ...prev, autoSave: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Analytics</Label>
                      <p className="text-xs text-muted-foreground">Enable usage analytics</p>
                    </div>
                    <Switch
                      checked={appSettings.performance.analyticsEnabled}
                      onCheckedChange={(checked) => handleSettingChange('performance', 'analyticsEnabled', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Performance Cache</Label>
                      <p className="text-xs text-muted-foreground">Cache data for better performance</p>
                    </div>
                    <Switch
                      checked={appSettings.performance.cacheEnabled}
                      onCheckedChange={(checked) => handleSettingChange('performance', 'cacheEnabled', checked)}
                    />
                  </div>
                  <div>
                    <Label>Default Form View</Label>
                    <Select defaultValue="grid">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid View</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                        <SelectItem value="table">Table View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedCard title="Theme Settings" icon={Palette}>
                <div className="space-y-4">
                  <div>
                    <Label>Application Theme</Label>
                    <Select value={globalTheme} onValueChange={handleThemeChange}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light Theme</SelectItem>
                        <SelectItem value="dark">Dark Theme</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Choose your preferred color scheme
                    </p>
                  </div>
                  <div>
                    <Label>Density</Label>
                    <Select defaultValue="comfortable">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Animation Speed</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="fast">Fast</SelectItem>
                        <SelectItem value="none">No Animation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard title="Display Options" icon={Eye} delay={200}>
                <div className="space-y-4">
                  <div>
                    <Label>Sidebar Width</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="narrow">Narrow</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="wide">Wide</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Font Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Reduce Motion</Label>
                      <p className="text-xs text-muted-foreground">Reduce animations for accessibility</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedCard title="Authentication & Access" icon={Shield}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-xs text-muted-foreground">Enable 2FA for enhanced security</p>
                    </div>
                    <Switch
                      checked={appSettings.security.twoFactor}
                      onCheckedChange={(checked) => handleSettingChange('security', 'twoFactor', checked)}
                    />
                  </div>
                  <div>
                    <Label>Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={appSettings.security.sessionTimeout}
                      onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>IP Whitelist</Label>
                    <Textarea
                      placeholder="Enter IP addresses (one per line)"
                      value={appSettings.security.ipWhitelist}
                      onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Audit Logging</Label>
                      <p className="text-xs text-muted-foreground">Log all user actions</p>
                    </div>
                    <Switch
                      checked={appSettings.security.auditLog}
                      onCheckedChange={(checked) => handleSettingChange('security', 'auditLog', checked)}
                    />
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard title="Data Protection" icon={Lock} delay={200}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Backup</Label>
                      <p className="text-xs text-muted-foreground">Automatically backup data</p>
                    </div>
                    <Switch
                      checked={appSettings.backup.autoBackup}
                      onCheckedChange={(checked) => handleSettingChange('backup', 'autoBackup', checked)}
                    />
                  </div>
                  <div>
                    <Label>Backup Frequency</Label>
                    <Select 
                      value={appSettings.backup.backupFrequency}
                      onValueChange={(value) => handleSettingChange('backup', 'backupFrequency', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Retention Period (days)</Label>
                    <Input
                      type="number"
                      value={appSettings.backup.retentionDays}
                      onChange={(e) => handleSettingChange('backup', 'retentionDays', parseInt(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedCard title="Notification Preferences" icon={Bell}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={appSettings.notifications.email}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-xs text-muted-foreground">Browser push notifications</p>
                    </div>
                    <Switch
                      checked={appSettings.notifications.push}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'push', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-xs text-muted-foreground">Text message notifications</p>
                    </div>
                    <Switch
                      checked={appSettings.notifications.sms}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'sms', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Desktop Notifications</Label>
                      <p className="text-xs text-muted-foreground">Desktop system notifications</p>
                    </div>
                    <Switch
                      checked={appSettings.notifications.desktop}
                      onCheckedChange={(checked) => handleSettingChange('notifications', 'desktop', checked)}
                    />
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard title="Alert Settings" icon={AlertTriangle} delay={200}>
                <div className="space-y-4">
                  <div>
                    <Label>Form Submission Alerts</Label>
                    <Select defaultValue="immediate">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="hourly">Hourly Digest</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Digest</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Approval Alerts</Label>
                    <Select defaultValue="immediate">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>System Alerts</Label>
                    <Select defaultValue="immediate">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="important">Important Only</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnimatedCard title="Analytics & Tracking" icon={BarChart3}>
                <div className="space-y-4">
                  <div>
                    <Label>Google Analytics ID</Label>
                    <Input
                      placeholder="GA-XXXXXXXXX-X"
                      value={appSettings.integrations.googleAnalytics}
                      onChange={(e) => handleSettingChange('integrations', 'googleAnalytics', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Tracking Domain</Label>
                    <Input
                      placeholder="example.com"
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enhanced Tracking</Label>
                      <p className="text-xs text-muted-foreground">Track user interactions</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </AnimatedCard>

              <AnimatedCard title="Third-Party Services" icon={Zap} delay={200}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Zapier Integration</Label>
                      <p className="text-xs text-muted-foreground">Connect with Zapier workflows</p>
                    </div>
                    <Switch
                      checked={appSettings.integrations.zapier}
                      onCheckedChange={(checked) => handleSettingChange('integrations', 'zapier', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Slack Integration</Label>
                      <p className="text-xs text-muted-foreground">Send notifications to Slack</p>
                    </div>
                    <Switch
                      checked={appSettings.integrations.slack}
                      onCheckedChange={(checked) => handleSettingChange('integrations', 'slack', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Microsoft Teams</Label>
                      <p className="text-xs text-muted-foreground">Send notifications to Teams</p>
                    </div>
                    <Switch
                      checked={appSettings.integrations.teams}
                      onCheckedChange={(checked) => handleSettingChange('integrations', 'teams', checked)}
                    />
                  </div>
                  <div>
                    <Label>Webhook URL</Label>
                    <Input
                      placeholder="https://your-webhook-url.com"
                      className="mt-1"
                    />
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <AnimatedCard title="Brand Identity & Customization" icon={Eye}>
              <BrandSettings />
            </AnimatedCard>
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveLayout>
  );
};
