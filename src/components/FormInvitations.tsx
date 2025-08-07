import { Form } from "@/types/form";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Share } from "lucide-react";
import { FormInvitationStatistics } from "./forms/FormInvitationStatistics";
import { EmailDistributionSettings } from "./forms/EmailDistributionSettings";
import { RecipientManagement } from "./forms/RecipientManagement";
import { EmailTemplateCustomization } from "./forms/EmailTemplateCustomization";
import { FormSharingOptions } from "./forms/FormSharingOptions";

interface FormInvitationsProps {
  form: Form;
  onUpdateForm: (updates: Partial<Form>) => void;
}

/**
 * FormInvitations Component - Refactored for better maintainability
 * Manages email invitations and sharing options for published forms
 * Includes recipient management, reminder settings, and share link generation
 */
export const FormInvitations = ({ form, onUpdateForm }: FormInvitationsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Form Invitations & Sharing</h2>
          <p className="text-muted-foreground mt-1">Manage email invitations and sharing options for your published form</p>
        </div>
        <Badge variant="default" className="bg-green-100 text-green-800">
          Published Form
        </Badge>
      </div>

      <Tabs defaultValue="invite" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="invite" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Invitations
          </TabsTrigger>
          <TabsTrigger value="share" className="flex items-center gap-2">
            <Share className="h-4 w-4" />
            Share & Embed
          </TabsTrigger>
        </TabsList>

        {/* Invitations Tab */}
        <TabsContent value="invite" className="space-y-6">
          {form.status === 'published' ? (
            <>
              <FormInvitationStatistics form={form} />
              <EmailDistributionSettings form={form} onUpdateForm={onUpdateForm} />
              <RecipientManagement form={form} onUpdateForm={onUpdateForm} />
              <EmailTemplateCustomization form={form} />
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Invitations Available for Published Forms Only
                </h3>
                <p className="text-gray-500 mb-4">
                  Publish your form to enable email invitations and track recipient responses.
                </p>
                <p className="text-sm text-muted-foreground">
                  Note: All invitation data will be preserved when switching between draft and published states.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Share & Embed Tab */}
        <TabsContent value="share" className="space-y-6">
          <FormSharingOptions form={form} />
        </TabsContent>
      </Tabs>
    </div>
  );
};