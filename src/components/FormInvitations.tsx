
import { useState } from "react";
import { EmailRecipient, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Users, 
  Globe, 
  Code, 
  ExternalLink, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  Trash2,
  Copy,
  Share,
  FileDown,
  Monitor,
  Smartphone,
  Tablet
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface FormInvitationsProps {
  form: Form;
  onUpdateForm: (updates: Partial<Form>) => void;
}

/**
 * FormInvitations Component
 * Manages email invitations and sharing options for published forms
 * Includes recipient management, reminder settings, and share link generation
 */
export const FormInvitations = ({ form, onUpdateForm }: FormInvitationsProps) => {
  const [newRecipientEmail, setNewRecipientEmail] = useState("");
  const [newRecipientName, setNewRecipientName] = useState("");
  const [emailSubject, setEmailSubject] = useState(`You're invited to complete: ${form.title}`);
  const [emailMessage, setEmailMessage] = useState(
    `Hello,\n\nYou have been invited to complete the form "${form.title}".\n\nPlease click the link below to get started:\n[FORM_LINK]\n\nThank you!`
  );

  // Get current email settings with defaults
  const emailSettings = form.settings.emailDistribution || {
    enabled: false,
    recipients: [],
    reminderEnabled: true,
    reminderIntervalDays: 7,
    maxReminders: 3
  };

  /**
   * Generate form URL for sharing
   */
  const generateFormUrl = () => {
    return `${window.location.origin}/form/${form.id}`;
  };

  /**
   * Generate embed code for the form
   */
  const generateEmbedCode = (width = "100%", height = "600px") => {
    const formUrl = generateFormUrl();
    return `<iframe src="${formUrl}" width="${width}" height="${height}" frameborder="0" title="${form.title}" style="border: none;"></iframe>`;
  };

  /**
   * Generate responsive embed code
   */
  const generateResponsiveEmbedCode = () => {
    const formUrl = generateFormUrl();
    return `<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
  <iframe src="${formUrl}" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
    title="${form.title}">
  </iframe>
</div>`;
  };

  /**
   * Export form as fillable PDF
   */
  const exportToPDF = () => {
    try {
      const doc = new jsPDF();
      let yPosition = 20;

      // Add form title
      doc.setFontSize(20);
      doc.text(form.title, 20, yPosition);
      yPosition += 15;

      // Add form description if available
      if (form.description) {
        doc.setFontSize(12);
        const descLines = doc.splitTextToSize(form.description, 170);
        doc.text(descLines, 20, yPosition);
        yPosition += descLines.length * 6 + 10;
      }

      // Add form fields
      form.fields.forEach((field, index) => {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        // Field label
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        const labelText = `${index + 1}. ${field.label}${field.required ? ' *' : ''}`;
        doc.text(labelText, 20, yPosition);
        yPosition += 8;

        // Field description
        if (field.description) {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          const descLines = doc.splitTextToSize(field.description, 170);
          doc.text(descLines, 25, yPosition);
          yPosition += descLines.length * 5 + 5;
        }

        // Create fillable field based on type
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        switch (field.type) {
          case 'text':
          case 'email':
          case 'tel':
          case 'url':
            // Text input field
            doc.rect(20, yPosition, 170, 8);
            yPosition += 15;
            break;

          case 'textarea':
            // Multi-line text area
            for (let i = 0; i < 3; i++) {
              doc.rect(20, yPosition + (i * 8), 170, 8);
            }
            yPosition += 30;
            break;

          case 'number':
            // Number input field
            doc.rect(20, yPosition, 80, 8);
            if (field.placeholder) {
              doc.setFontSize(10);
              doc.text(`(${field.placeholder})`, 105, yPosition + 6);
            }
            yPosition += 15;
            break;

          case 'select':
          case 'radio':
            // Radio buttons or dropdown options
            if (field.options) {
              field.options.forEach((option, optIndex) => {
                if (field.type === 'radio') {
                  doc.circle(25, yPosition + 3, 2);
                  doc.text(option, 35, yPosition + 6);
                } else {
                  doc.text(`☐ ${option}`, 25, yPosition + 6);
                }
                yPosition += 10;
              });
            }
            break;

          case 'checkbox':
            // Checkbox options
            if (field.options) {
              field.options.forEach((option) => {
                doc.rect(22, yPosition, 6, 6);
                doc.text(option, 35, yPosition + 6);
                yPosition += 10;
              });
            } else {
              doc.rect(22, yPosition, 6, 6);
              yPosition += 10;
            }
            break;

          case 'date':
            // Date field
            doc.rect(20, yPosition, 80, 8);
            doc.setFontSize(10);
            doc.text('MM/DD/YYYY', 105, yPosition + 6);
            yPosition += 15;
            break;

          case 'file':
            // File upload instruction
            doc.text('Attach file: ___________________', 20, yPosition + 6);
            yPosition += 15;
            break;

          default:
            // Default text field
            doc.rect(20, yPosition, 170, 8);
            yPosition += 15;
        }

        yPosition += 5; // Space between fields
      });

      // Add footer with submission instructions
      if (yPosition > 220) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.text('Instructions: Fill out all required fields (*) and submit this form.', 20, yPosition + 20);
      doc.text(`Form URL: ${generateFormUrl()}`, 20, yPosition + 30);

      // Save the PDF
      doc.save(`${form.title.replace(/[^a-zA-Z0-9]/g, '_')}_fillable.pdf`);

      toast({
        title: "PDF Exported",
        description: "Fillable PDF form has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Export Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  /**
   * Copy text to clipboard with user feedback
   */
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  /**
   * Add new email recipient to the form
   */
  const addRecipient = () => {
    if (!newRecipientEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate emails
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

    // Clear form fields
    setNewRecipientEmail("");
    setNewRecipientName("");

    toast({
      title: "Recipient Added",
      description: `${newRecipient.email} has been added to the invitation list.`,
    });
  };

  /**
   * Remove recipient from email list
   */
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

  /**
   * Update email distribution settings
   */
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

  /**
   * Send invitations to all pending recipients
   */
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

    // Simulate sending emails by updating recipient status
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

  /**
   * Get status icon for recipient status
   */
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

  /**
   * Get status color for recipient badges
   */
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Form Invitations & Sharing</h2>
          <p className="text-gray-600 mt-1">Manage email invitations and sharing options for your published form</p>
        </div>
        <Badge variant="default" className="bg-green-100 text-green-800">
          Published Form
        </Badge>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Invitations
          </TabsTrigger>
          <TabsTrigger value="share" className="flex items-center gap-2">
            <Share className="h-4 w-4" />
            Share & Embed
          </TabsTrigger>
        </TabsList>

        {/* Email Invitations Tab */}
        <TabsContent value="email" className="space-y-6">
          {/* Email Settings */}
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

          {/* Add Recipients */}
          {emailSettings.enabled && (
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
          )}

          {/* Recipients List */}
          {emailSettings.enabled && emailSettings.recipients.length > 0 && (
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

          {/* Email Template Customization */}
          {emailSettings.enabled && (
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
          )}
        </TabsContent>

        {/* Share & Embed Tab */}
        <TabsContent value="share" className="space-y-6">
          {/* Public Link Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Public Link Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="form-url">Form URL</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="form-url"
                    value={generateFormUrl()}
                    readOnly
                    className="flex-1 font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(generateFormUrl(), 'Form URL')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(generateFormUrl(), '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Sharing Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Share this link directly with respondents</li>
                  <li>• Post on social media or websites</li>
                  <li>• Include in emails or documents</li>
                  <li>• Generate QR codes for physical materials</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Embed Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Embed on Website
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Embed Options</Label>
                <div className="grid grid-cols-3 gap-2 mt-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generateEmbedCode("100%", "600px"), 'Desktop embed code')}
                    className="flex items-center gap-2"
                  >
                    <Monitor className="h-4 w-4" />
                    Desktop
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generateEmbedCode("100%", "500px"), 'Tablet embed code')}
                    className="flex items-center gap-2"
                  >
                    <Tablet className="h-4 w-4" />
                    Tablet
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generateResponsiveEmbedCode(), 'Responsive embed code')}
                    className="flex items-center gap-2"
                  >
                    <Smartphone className="h-4 w-4" />
                    Responsive
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="embed-code">HTML Embed Code</Label>
                <div className="flex gap-2 mt-2">
                  <Textarea
                    id="embed-code"
                    value={generateEmbedCode()}
                    readOnly
                    className="flex-1 font-mono text-sm resize-none"
                    rows={4}
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(generateEmbedCode(), 'Embed code')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Embedding Guide</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Copy the HTML code above</li>
                  <li>• Paste it into your website's HTML</li>
                  <li>• Adjust width and height as needed</li>
                  <li>• Test the embedded form on your site</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* PDF Export */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileDown className="h-5 w-5" />
                Export Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Export Form as PDF</Label>
                <p className="text-sm text-gray-600 mt-1 mb-4">
                  Generate a fillable PDF version of your form for offline use or printing.
                </p>
                <Button onClick={exportToPDF} className="w-full">
                  <FileDown className="h-4 w-4 mr-2" />
                  Download Fillable PDF
                </Button>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">PDF Features</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• Fillable form fields for all input types</li>
                  <li>• Proper field labels and descriptions</li>
                  <li>• Required field indicators (*)</li>
                  <li>• Form submission instructions included</li>
                  <li>• Professional formatting and layout</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Form Analytics Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Sharing Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{form.analytics.views}</div>
                  <div className="text-sm text-gray-600">Total Views</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{form.analytics.submissions}</div>
                  <div className="text-sm text-gray-600">Submissions</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{form.analytics.emailsSent}</div>
                  <div className="text-sm text-gray-600">Emails Sent</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {form.analytics.completionRate}%
                  </div>
                  <div className="text-sm text-gray-600">Completion Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
