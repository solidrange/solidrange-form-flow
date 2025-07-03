import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";
import { Form } from "@/types/form";

interface EmailDistributionSettingsProps {
  form: Form;
  onUpdateForm: (updates: Partial<Form>) => void;
}

export const EmailDistributionSettings = ({ form, onUpdateForm }: EmailDistributionSettingsProps) => {
  const emailSettings = form.settings.emailDistribution || {
    enabled: false,
    recipients: [],
    reminderEnabled: true,
    reminderIntervalDays: 7,
    maxReminders: 3
  };

  const updateEmailSettings = (updates: Partial<typeof emailSettings>) => {
    onUpdateForm({
      settings: {
        ...form.settings,
        emailDistribution: {
          ...emailSettings,
          ...updates
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Email Distribution Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="email-enabled"
            checked={emailSettings.enabled}
            onCheckedChange={(enabled) => updateEmailSettings({ enabled })}
          />
          <Label htmlFor="email-enabled">Enable email distribution</Label>
        </div>

        {emailSettings.enabled && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reminder-enabled">Enable Reminders</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    id="reminder-enabled"
                    checked={emailSettings.reminderEnabled}
                    onCheckedChange={(reminderEnabled) => updateEmailSettings({ reminderEnabled })}
                  />
                  <span className="text-sm text-gray-600">Send reminder emails</span>
                </div>
              </div>
              <div>
                <Label htmlFor="reminder-interval">Reminder Interval (days)</Label>
                <Input
                  id="reminder-interval"
                  type="number"
                  min="1"
                  max="30"
                  value={emailSettings.reminderIntervalDays}
                  onChange={(e) => updateEmailSettings({ reminderIntervalDays: parseInt(e.target.value) || 7 })}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="max-reminders">Maximum Reminders</Label>
              <Input
                id="max-reminders"
                type="number"
                min="0"
                max="10"
                value={emailSettings.maxReminders}
                onChange={(e) => updateEmailSettings({ maxReminders: parseInt(e.target.value) || 3 })}
                className="mt-2 w-32"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};