import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form } from "@/types/form";

interface EmailTemplateCustomizationProps {
  form: Form;
}

export const EmailTemplateCustomization = ({ form }: EmailTemplateCustomizationProps) => {
  const [emailSubject, setEmailSubject] = useState(`You're invited to complete: ${form.title}`);
  const [emailMessage, setEmailMessage] = useState(
    `Hello,\n\nYou have been invited to complete the form "${form.title}".\n\nPlease click the link below to get started:\n[FORM_LINK]\n\nThank you!`
  );

  const emailSettings = form.settings.emailDistribution || {
    enabled: false,
    recipients: [],
    reminderEnabled: true,
    reminderIntervalDays: 7,
    maxReminders: 3
  };

  if (!emailSettings.enabled) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Template</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email-subject">Subject Line</Label>
          <Input
            id="email-subject"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            placeholder="Email subject"
          />
        </div>
        <div>
          <Label htmlFor="email-message">Message</Label>
          <Textarea
            id="email-message"
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
            placeholder="Email message"
            rows={6}
          />
          <p className="text-xs text-gray-500 mt-1">
            Use [FORM_LINK] to insert the form link into your message
          </p>
        </div>
      </CardContent>
    </Card>
  );
};