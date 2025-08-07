import { Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Share2, Users, CheckCircle, Clock, AlertCircle, Copy } from "lucide-react";
import { FormInvitationStatistics } from "./forms/FormInvitationStatistics";
import { EmailDistributionSettings } from "./forms/EmailDistributionSettings";
import { RecipientManagement } from "./forms/RecipientManagement";
import { EmailTemplateCustomization } from "./forms/EmailTemplateCustomization";
import { FormSharingOptions } from "./forms/FormSharingOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface FormManagementDialogProps {
  form: Form;
  isOpen: boolean;
  onClose: () => void;
  onUpdateForm: (updates: Partial<Form>) => void;
  generateFormUrl: (formId: string) => string;
  generateEmbedCode: (formId: string) => string;
}

/**
 * FormManagementDialog - A comprehensive dialog for managing published forms
 * Combines invitations, sharing, and statistics in a clean, organized interface
 */
export const FormManagementDialog = ({ 
  form, 
  isOpen, 
  onClose, 
  onUpdateForm,
  generateFormUrl,
  generateEmbedCode
}: FormManagementDialogProps) => {
  const { toast } = useToast();

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  // Calculate quick stats
  const totalRecipients = form.settings.emailDistribution?.recipients?.length || 0;
  const completedResponses = form.submissions || 0;
  const pendingInvites = totalRecipients - completedResponses;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">{form.title}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage invitations, sharing, and view form statistics
              </p>
            </div>
            <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Published
            </Badge>
          </div>
        </DialogHeader>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto mb-2">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">{totalRecipients}</div>
              <div className="text-xs text-muted-foreground">Total Invites</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-300" />
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-300">{completedResponses}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 mx-auto mb-2">
                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-300">{pendingInvites}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto mb-2">
                <AlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">
                {totalRecipients > 0 ? Math.round((completedResponses / totalRecipients) * 100) : 0}%
              </div>
              <div className="text-xs text-muted-foreground">Completion Rate</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="invitations" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="invitations" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Invitations
            </TabsTrigger>
            <TabsTrigger value="sharing" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share & Embed
            </TabsTrigger>
          </TabsList>

          {/* Invitations Tab */}
          <TabsContent value="invitations" className="space-y-6 mt-6">
            <FormInvitationStatistics form={form} />
            <EmailDistributionSettings form={form} onUpdateForm={onUpdateForm} />
            <RecipientManagement form={form} onUpdateForm={onUpdateForm} />
            <EmailTemplateCustomization form={form} />
          </TabsContent>

          {/* Sharing Tab */}
          <TabsContent value="sharing" className="space-y-6 mt-6">
            {/* Quick Share Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Share</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Public Form URL</label>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      value={generateFormUrl(form.id)} 
                      readOnly 
                      className="flex-1"
                    />
                    <Button 
                      size="sm" 
                      onClick={() => handleCopyToClipboard(generateFormUrl(form.id), "Form URL")}
                      className="gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Embed Code</label>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      value={generateEmbedCode(form.id)} 
                      readOnly 
                      className="flex-1"
                    />
                    <Button 
                      size="sm" 
                      onClick={() => handleCopyToClipboard(generateEmbedCode(form.id), "Embed code")}
                      className="gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Sharing Options */}
            <FormSharingOptions form={form} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};