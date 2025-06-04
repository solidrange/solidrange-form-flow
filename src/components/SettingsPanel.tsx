
import { useState } from "react";
import { Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, Trash2, Eye, FileText, Users, Settings2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SettingsPanelProps {
  formSettings: Form['settings'];
  onUpdateSettings: (updates: Partial<Form['settings']>) => void;
}

export const SettingsPanel = ({ formSettings, onUpdateSettings }: SettingsPanelProps) => {
  const [activeSection, setActiveSection] = useState("general");

  const updateGeneralSettings = (updates: Partial<Form['settings']>) => {
    onUpdateSettings(updates);
  };

  const updateApprovalSettings = (updates: Partial<NonNullable<Form['settings']['approval']>>) => {
    onUpdateSettings({
      approval: {
        ...formSettings.approval,
        enabled: formSettings.approval?.enabled || false,
        requireApproval: formSettings.approval?.requireApproval || false,
        approvers: formSettings.approval?.approvers || [],
        autoApproveScore: formSettings.approval?.autoApproveScore || undefined,
        ...updates
      }
    });
  };

  const updateDocumentSettings = (updates: Partial<NonNullable<Form['settings']['documents']>>) => {
    onUpdateSettings({
      documents: {
        ...formSettings.documents,
        enabled: formSettings.documents?.enabled || false,
        allowedTypes: formSettings.documents?.allowedTypes || ['pdf', 'doc', 'docx'],
        maxSize: formSettings.documents?.maxSize || 10,
        requiredDocuments: formSettings.documents?.requiredDocuments || [],
        ...updates
      }
    });
  };

  const sections = [
    { id: "general", label: "General", icon: Settings2 },
    { id: "approval", label: "Approval Process", icon: Users },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "notifications", label: "Notifications", icon: FileText },
  ];

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
      {/* Settings Navigation */}
      <div className="col-span-3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon className="h-4 w-4 mr-2" />
                {section.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Settings Content */}
      <div className="col-span-9">
        <Card className="h-full">
          <CardContent className="p-6 space-y-6 overflow-auto">
            {activeSection === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="multiple-submissions"
                        checked={formSettings.allowMultipleSubmissions}
                        onCheckedChange={(checked) => updateGeneralSettings({ allowMultipleSubmissions: !!checked })}
                      />
                      <Label htmlFor="multiple-submissions">Allow multiple submissions per user</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="require-login"
                        checked={formSettings.requireLogin}
                        onCheckedChange={(checked) => updateGeneralSettings({ requireLogin: !!checked })}
                      />
                      <Label htmlFor="require-login">Require user login</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-progress"
                        checked={formSettings.showProgressBar}
                        onCheckedChange={(checked) => updateGeneralSettings({ showProgressBar: !!checked })}
                      />
                      <Label htmlFor="show-progress">Show progress bar</Label>
                    </div>

                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select 
                        value={formSettings.theme} 
                        onValueChange={(value: 'light' | 'dark' | 'custom') => updateGeneralSettings({ theme: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formSettings.theme === 'custom' && (
                      <div>
                        <Label htmlFor="custom-css">Custom CSS</Label>
                        <Textarea
                          id="custom-css"
                          value={formSettings.customCss || ''}
                          onChange={(e) => updateGeneralSettings({ customCss: e.target.value })}
                          placeholder="Enter custom CSS..."
                          className="mt-1 font-mono text-sm"
                          rows={6}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "approval" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Approval Process</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enable-approval"
                        checked={formSettings.approval?.enabled || false}
                        onCheckedChange={(checked) => updateApprovalSettings({ enabled: !!checked })}
                      />
                      <Label htmlFor="enable-approval">Enable approval process for submissions</Label>
                    </div>

                    {formSettings.approval?.enabled && (
                      <>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="require-approval"
                            checked={formSettings.approval.requireApproval || false}
                            onCheckedChange={(checked) => updateApprovalSettings({ requireApproval: !!checked })}
                          />
                          <Label htmlFor="require-approval">All submissions require manual approval</Label>
                        </div>

                        <div>
                          <Label htmlFor="auto-approve-score">Auto-approve if score is above (%)</Label>
                          <Input
                            id="auto-approve-score"
                            type="number"
                            min="0"
                            max="100"
                            value={formSettings.approval.autoApproveScore || ''}
                            onChange={(e) => updateApprovalSettings({ 
                              autoApproveScore: e.target.value ? parseInt(e.target.value) : undefined 
                            })}
                            placeholder="e.g., 80"
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label>Approvers</Label>
                          <div className="mt-2 space-y-2">
                            {formSettings.approval.approvers?.map((approver, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input value={approver} readOnly />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newApprovers = formSettings.approval?.approvers?.filter((_, i) => i !== index) || [];
                                    updateApprovalSettings({ approvers: newApprovers });
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <div className="flex items-center gap-2">
                              <Input 
                                placeholder="Enter approver email"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && e.currentTarget.value) {
                                    const newApprovers = [...(formSettings.approval?.approvers || []), e.currentTarget.value];
                                    updateApprovalSettings({ approvers: newApprovers });
                                    e.currentTarget.value = '';
                                  }
                                }}
                              />
                              <Button variant="outline" size="sm">Add</Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "documents" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Document Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enable-documents"
                        checked={formSettings.documents?.enabled || false}
                        onCheckedChange={(checked) => updateDocumentSettings({ enabled: !!checked })}
                      />
                      <Label htmlFor="enable-documents">Allow document attachments</Label>
                    </div>

                    {formSettings.documents?.enabled && (
                      <>
                        <div>
                          <Label htmlFor="max-file-size">Maximum file size (MB)</Label>
                          <Input
                            id="max-file-size"
                            type="number"
                            min="1"
                            max="100"
                            value={formSettings.documents.maxSize || 10}
                            onChange={(e) => updateDocumentSettings({ 
                              maxSize: parseInt(e.target.value) || 10 
                            })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label>Allowed file types</Label>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {['pdf', 'doc', 'docx', 'jpg', 'png', 'xlsx', 'txt'].map((type) => (
                              <div key={type} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`type-${type}`}
                                  checked={formSettings.documents?.allowedTypes?.includes(type) || false}
                                  onCheckedChange={(checked) => {
                                    const currentTypes = formSettings.documents?.allowedTypes || [];
                                    const newTypes = checked 
                                      ? [...currentTypes, type]
                                      : currentTypes.filter(t => t !== type);
                                    updateDocumentSettings({ allowedTypes: newTypes });
                                  }}
                                />
                                <Label htmlFor={`type-${type}`} className="text-sm">
                                  .{type}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label>Required Documents (for submitters to view)</Label>
                          <div className="mt-2 space-y-2">
                            {formSettings.documents.requiredDocuments?.map((doc, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Input value={doc.name} readOnly />
                                <Badge variant="outline">{doc.type}</Badge>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const newDocs = formSettings.documents?.requiredDocuments?.filter((_, i) => i !== index) || [];
                                    updateDocumentSettings({ requiredDocuments: newDocs });
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button variant="outline" className="w-full">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Required Document
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-submissions" />
                      <Label htmlFor="notify-submissions">Notify on new submissions</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-approvals" />
                      <Label htmlFor="notify-approvals">Notify on approval requests</Label>
                    </div>

                    <div>
                      <Label htmlFor="notification-email">Notification email</Label>
                      <Input
                        id="notification-email"
                        type="email"
                        placeholder="admin@company.com"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
