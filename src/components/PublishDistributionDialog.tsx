import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Upload, Users, Mail, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PublishDistributionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (distribution: DistributionConfig) => void;
  formTitle: string;
}

export interface DistributionConfig {
  method: 'none' | 'adfs' | 'email';
  adfsGroup?: string;
  emails: string[];
}

const ADFS_GROUPS = [
  { id: 'all-employees', name: 'All Employees' },
  { id: 'management', name: 'Management Team' },
  { id: 'engineering', name: 'Engineering Department' },
  { id: 'finance', name: 'Finance Department' },
  { id: 'hr', name: 'Human Resources' },
  { id: 'compliance', name: 'Compliance Team' },
  { id: 'vendors', name: 'External Vendors' },
  { id: 'contractors', name: 'Contractors' },
];

export function PublishDistributionDialog({ isOpen, onClose, onPublish, formTitle }: PublishDistributionDialogProps) {
  const [method, setMethod] = useState<'none' | 'adfs' | 'email'>('none');
  const [adfsGroup, setAdfsGroup] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [bulkEmails, setBulkEmails] = useState('');

  const addEmail = () => {
    const email = emailInput.trim();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !emails.includes(email)) {
      setEmails(prev => [...prev, email]);
      setEmailInput('');
    } else if (email) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
    }
  };

  const removeEmail = (email: string) => {
    setEmails(prev => prev.filter(e => e !== email));
  };

  const handleBulkAdd = () => {
    const newEmails = bulkEmails
      .split(/[,;\n]+/)
      .map(e => e.trim())
      .filter(e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && !emails.includes(e));
    
    if (newEmails.length > 0) {
      setEmails(prev => [...prev, ...newEmails]);
      setBulkEmails('');
      toast({ title: "Emails Added", description: `${newEmails.length} email(s) added to distribution list.` });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const newEmails = text
        .split(/[,;\n\r]+/)
        .map(e => e.trim())
        .filter(e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && !emails.includes(e));
      
      setEmails(prev => [...prev, ...newEmails]);
      toast({ title: "File Processed", description: `${newEmails.length} email(s) imported from file.` });
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handlePublish = () => {
    onPublish({
      method,
      adfsGroup: method === 'adfs' ? adfsGroup : undefined,
      emails: method === 'email' ? emails : [],
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Publish & Distribute: {formTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Distribution Method</Label>
            <Tabs value={method} onValueChange={(v) => setMethod(v as any)} className="mt-2">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="none" className="text-xs">
                  <Globe className="h-3 w-3 mr-1" />
                  Public
                </TabsTrigger>
                <TabsTrigger value="adfs" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  ADFS Group
                </TabsTrigger>
                <TabsTrigger value="email" className="text-xs">
                  <Mail className="h-3 w-3 mr-1" />
                  Email List
                </TabsTrigger>
              </TabsList>

              <TabsContent value="none" className="mt-3">
                <p className="text-sm text-muted-foreground">
                  Publish the form without targeting a specific group. The form will be available via its sharing link.
                </p>
              </TabsContent>

              <TabsContent value="adfs" className="mt-3 space-y-3">
                <div>
                  <Label className="text-sm">Select ADFS Group</Label>
                  <Select value={adfsGroup} onValueChange={setAdfsGroup}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose a group..." />
                    </SelectTrigger>
                    <SelectContent>
                      {ADFS_GROUPS.map(group => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    The form will be distributed to all members of the selected ADFS group.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="email" className="mt-3 space-y-3">
                {/* Manual email entry */}
                <div>
                  <Label className="text-sm">Add Email</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addEmail())}
                      placeholder="user@example.com"
                      className="flex-1"
                    />
                    <Button size="sm" onClick={addEmail} variant="outline">Add</Button>
                  </div>
                </div>

                {/* Bulk paste */}
                <div>
                  <Label className="text-sm">Bulk Add (comma/newline separated)</Label>
                  <Textarea 
                    value={bulkEmails}
                    onChange={(e) => setBulkEmails(e.target.value)}
                    placeholder="email1@example.com, email2@example.com..."
                    rows={3}
                    className="mt-1"
                  />
                  <Button size="sm" onClick={handleBulkAdd} variant="outline" className="mt-1">
                    Add All
                  </Button>
                </div>

                {/* File upload */}
                <div>
                  <Label className="text-sm">Upload Email List (CSV/TXT)</Label>
                  <div className="mt-1">
                    <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Choose file...</span>
                      <input type="file" accept=".csv,.txt" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Email list */}
                {emails.length > 0 && (
                  <div>
                    <Label className="text-sm">Recipients ({emails.length})</Label>
                    <div className="flex flex-wrap gap-1 mt-1 max-h-32 overflow-y-auto p-2 border border-border rounded-lg">
                      {emails.map(email => (
                        <Badge key={email} variant="secondary" className="gap-1 text-xs">
                          {email}
                          <button onClick={() => removeEmail(email)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handlePublish}
            disabled={method === 'adfs' && !adfsGroup}
          >
            <Globe className="h-4 w-4 mr-1" />
            Publish {method !== 'none' ? '& Distribute' : 'Form'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}