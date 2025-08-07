
import { useState } from "react";
import { EmailRecipient } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  Plus,
  Trash2,
  RotateCcw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface EmailTrackingProps {
  recipients: EmailRecipient[];
  onUpdateRecipients: (recipients: EmailRecipient[]) => void;
  formTitle: string;
  reminderEnabled: boolean;
  reminderIntervalDays: number;
  maxReminders: number;
  onUpdateEmailSettings: (settings: {
    reminderEnabled: boolean;
    reminderIntervalDays: number;
    maxReminders: number;
  }) => void;
}

export const EmailTracking = ({
  recipients,
  onUpdateRecipients,
  formTitle,
  reminderEnabled,
  reminderIntervalDays,
  maxReminders,
  onUpdateEmailSettings
}: EmailTrackingProps) => {
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [bulkEmails, setBulkEmails] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const addRecipient = () => {
    if (!newEmail || !newEmail.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    const newRecipient: EmailRecipient = {
      id: Date.now().toString(),
      email: newEmail,
      name: newName || undefined,
      status: 'pending',
      remindersSent: 0
    };

    onUpdateRecipients([...recipients, newRecipient]);
    setNewEmail("");
    setNewName("");
    
    toast({
      title: "Recipient Added",
      description: `${newEmail} has been added to the recipient list.`,
    });
  };

  const addBulkRecipients = () => {
    const emails = bulkEmails
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line.includes('@'));

    if (emails.length === 0) {
      toast({
        title: "No Valid Emails",
        description: "Please enter valid email addresses, one per line.",
        variant: "destructive",
      });
      return;
    }

    const newRecipients: EmailRecipient[] = emails.map(email => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      email,
      status: 'pending' as const,
      remindersSent: 0
    }));

    onUpdateRecipients([...recipients, ...newRecipients]);
    setBulkEmails("");
    
    toast({
      title: "Recipients Added",
      description: `${emails.length} recipients have been added.`,
    });
  };

  const removeRecipient = (id: string) => {
    onUpdateRecipients(recipients.filter(r => r.id !== id));
  };

  const sendToAll = () => {
    const pendingRecipients = recipients.filter(r => r.status === 'pending');
    
    if (pendingRecipients.length === 0) {
      toast({
        title: "No Recipients",
        description: "No pending recipients to send to.",
        variant: "destructive",
      });
      return;
    }

    const updatedRecipients = recipients.map(recipient => 
      recipient.status === 'pending' 
        ? { ...recipient, status: 'sent' as const, sentAt: new Date() }
        : recipient
    );

    onUpdateRecipients(updatedRecipients);
    
    toast({
      title: "Form Sent",
      description: `Form sent to ${pendingRecipients.length} recipients.`,
    });
  };

  const sendReminders = () => {
    const reminderCandidates = recipients.filter(r => 
      r.status === 'sent' && 
      r.remindersSent < maxReminders
    );

    if (reminderCandidates.length === 0) {
      toast({
        title: "No Reminders Needed",
        description: "No recipients need reminders at this time.",
      });
      return;
    }

    const updatedRecipients = recipients.map(recipient => 
      reminderCandidates.includes(recipient)
        ? { 
            ...recipient, 
            remindersSent: recipient.remindersSent + 1,
            lastReminderAt: new Date()
          }
        : recipient
    );

    onUpdateRecipients(updatedRecipients);
    
    toast({
      title: "Reminders Sent",
      description: `Reminders sent to ${reminderCandidates.length} recipients.`,
    });
  };

  const getStatusIcon = (status: EmailRecipient['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'sent':
        return <Mail className="h-4 w-4 text-foreground" />;
      case 'opened':
        return <Mail className="h-4 w-4 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: EmailRecipient['status']) => {
    const variants = {
      pending: 'secondary',
      sent: 'default',
      opened: 'secondary',
      completed: 'default',
      expired: 'destructive'
    } as const;

    return (
      <Badge variant={variants[status]} className="text-xs">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const completionRate = recipients.length > 0 
    ? (recipients.filter(r => r.status === 'completed').length / recipients.length * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Recipients</p>
                <p className="text-xl font-semibold">{recipients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Sent</p>
                <p className="text-xl font-semibold">
                  {recipients.filter(r => ['sent', 'opened', 'completed'].includes(r.status)).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-semibold">
                  {recipients.filter(r => r.status === 'completed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-xl font-semibold">{completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Email Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reminder-enabled"
              checked={reminderEnabled}
              onCheckedChange={(checked) => 
                onUpdateEmailSettings({
                  reminderEnabled: !!checked,
                  reminderIntervalDays,
                  maxReminders
                })
              }
            />
            <Label htmlFor="reminder-enabled">Enable automatic reminders</Label>
          </div>

          {reminderEnabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reminder-interval">Reminder Interval (days)</Label>
                <Input
                  id="reminder-interval"
                  type="number"
                  value={reminderIntervalDays}
                  onChange={(e) => 
                    onUpdateEmailSettings({
                      reminderEnabled,
                      reminderIntervalDays: parseInt(e.target.value) || 1,
                      maxReminders
                    })
                  }
                  min="1"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="max-reminders">Max Reminders</Label>
                <Input
                  id="max-reminders"
                  type="number"
                  value={maxReminders}
                  onChange={(e) => 
                    onUpdateEmailSettings({
                      reminderEnabled,
                      reminderIntervalDays,
                      maxReminders: parseInt(e.target.value) || 1
                    })
                  }
                  min="1"
                  max="10"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="custom-message">Custom Email Message (optional)</Label>
            <Textarea
              id="custom-message"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Add a personal message to include in the email..."
              className="mt-1"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Recipients */}
      <Card>
        <CardHeader>
          <CardTitle>Add Recipients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="vendor@example.com"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="name">Name (optional)</Label>
              <Input
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Vendor Name"
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addRecipient} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Recipient
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="bulk-emails">Bulk Add (one email per line)</Label>
            <Textarea
              id="bulk-emails"
              value={bulkEmails}
              onChange={(e) => setBulkEmails(e.target.value)}
              placeholder={`vendor1@example.com\nvendor2@example.com\nvendor3@example.com`}
              className="mt-1"
              rows={4}
            />
            <Button onClick={addBulkRecipients} className="mt-2">
              Add All Emails
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recipients List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recipients ({recipients.length})</CardTitle>
            <div className="flex gap-2">
              <Button onClick={sendReminders} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Send Reminders
              </Button>
              <Button onClick={sendToAll} size="sm">
                <Send className="h-4 w-4 mr-2" />
                Send to All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {recipients.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No recipients added yet. Add email addresses above to get started.
            </p>
          ) : (
            <div className="space-y-2">
              {recipients.map((recipient) => (
                <div
                  key={recipient.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(recipient.status)}
                    <div>
                      <p className="font-medium">{recipient.email}</p>
                      {recipient.name && (
                        <p className="text-sm text-gray-600">{recipient.name}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusBadge(recipient.status)}
                        {recipient.remindersSent > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {recipient.remindersSent} reminder{recipient.remindersSent > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {recipient.sentAt && (
                      <div className="text-xs text-gray-500">
                        Sent: {recipient.sentAt.toLocaleDateString()}
                      </div>
                    )}
                    {recipient.completedAt && (
                      <div className="text-xs text-green-600">
                        Completed: {recipient.completedAt.toLocaleDateString()}
                      </div>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};
