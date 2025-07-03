import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Send, Trash2, Clock, Mail, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import { EmailRecipient, Form } from "@/types/form";
import { toast } from "@/hooks/use-toast";

interface RecipientManagementProps {
  form: Form;
  onUpdateForm: (updates: Partial<Form>) => void;
}

export const RecipientManagement = ({ form, onUpdateForm }: RecipientManagementProps) => {
  const [newRecipientEmail, setNewRecipientEmail] = useState("");
  const [newRecipientName, setNewRecipientName] = useState("");

  const emailSettings = form.settings.emailDistribution || {
    enabled: false,
    recipients: [],
    reminderEnabled: true,
    reminderIntervalDays: 7,
    maxReminders: 3
  };

  const addRecipient = () => {
    if (!newRecipientEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    const existingRecipient = emailSettings.recipients.find(
      r => r.email.toLowerCase() === newRecipientEmail.toLowerCase()
    );

    if (existingRecipient) {
      toast({
        title: "Email Already Added",
        description: "This email address is already in the recipient list.",
        variant: "destructive",
      });
      return;
    }

    const newRecipient: EmailRecipient = {
      id: Date.now().toString(),
      email: newRecipientEmail.trim(),
      name: newRecipientName.trim() || undefined,
      status: 'pending',
      remindersSent: 0
    };

    const updatedRecipients = [...emailSettings.recipients, newRecipient];
    
    onUpdateForm({
      settings: {
        ...form.settings,
        emailDistribution: {
          ...emailSettings,
          recipients: updatedRecipients
        }
      }
    });

    setNewRecipientEmail("");
    setNewRecipientName("");

    toast({
      title: "Recipient Added",
      description: `${newRecipient.email} has been added to the invitation list.`,
    });
  };

  const removeRecipient = (recipientId: string) => {
    const updatedRecipients = emailSettings.recipients.filter(r => r.id !== recipientId);
    
    onUpdateForm({
      settings: {
        ...form.settings,
        emailDistribution: {
          ...emailSettings,
          recipients: updatedRecipients
        }
      }
    });

    toast({
      title: "Recipient Removed",
      description: "Recipient has been removed from the invitation list.",
    });
  };

  const sendInvitations = () => {
    const pendingRecipients = emailSettings.recipients.filter(r => r.status === 'pending');
    
    if (pendingRecipients.length === 0) {
      toast({
        title: "No Pending Invitations",
        description: "All recipients have already been sent invitations.",
        variant: "destructive",
      });
      return;
    }

    const updatedRecipients = emailSettings.recipients.map(recipient => {
      if (recipient.status === 'pending') {
        return {
          ...recipient,
          status: 'sent' as const,
          sentAt: new Date()
        };
      }
      return recipient;
    });

    onUpdateForm({
      settings: {
        ...form.settings,
        emailDistribution: {
          ...emailSettings,
          recipients: updatedRecipients
        }
      }
    });

    toast({
      title: "Invitations Sent",
      description: `Sent invitations to ${pendingRecipients.length} recipients.`,
    });
  };

  const getStatusIcon = (status: EmailRecipient['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'sent':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'opened':
        return <ExternalLink className="h-4 w-4 text-purple-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'expired':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: EmailRecipient['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'opened':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!emailSettings.enabled) {
    return null;
  }

  return (
    <>
      {/* Add Recipients */}
      <Card>
        <CardHeader>
          <CardTitle>Add Recipients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="recipient-email">Email Address *</Label>
              <Input
                id="recipient-email"
                type="email"
                placeholder="user@example.com"
                value={newRecipientEmail}
                onChange={(e) => setNewRecipientEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
              />
            </div>
            <div>
              <Label htmlFor="recipient-name">Name (Optional)</Label>
              <Input
                id="recipient-name"
                placeholder="John Doe"
                value={newRecipientName}
                onChange={(e) => setNewRecipientName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addRecipient} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Recipient
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recipients List */}
      {emailSettings.recipients.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recipients ({emailSettings.recipients.length})</CardTitle>
              <Button onClick={sendInvitations} className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Invitations
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emailSettings.recipients.map((recipient) => (
                <div key={recipient.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(recipient.status)}
                    <div>
                      <div className="font-medium">{recipient.name || recipient.email}</div>
                      {recipient.name && (
                        <div className="text-sm text-gray-500">{recipient.email}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(recipient.status)}>
                      {recipient.status.charAt(0).toUpperCase() + recipient.status.slice(1)}
                    </Badge>
                    {recipient.remindersSent > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {recipient.remindersSent} reminders
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRecipient(recipient.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};