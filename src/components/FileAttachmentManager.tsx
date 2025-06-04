
import { useState } from "react";
import { DocumentAttachment } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, Upload, FileText, Download, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FileAttachmentManagerProps {
  attachments: DocumentAttachment[];
  onUpdateAttachments: (attachments: DocumentAttachment[]) => void;
  allowedTypes: string[];
  maxSize: number;
}

export const FileAttachmentManager = ({
  attachments,
  onUpdateAttachments,
  allowedTypes,
  maxSize
}: FileAttachmentManagerProps) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    const newAttachments: DocumentAttachment[] = [];

    for (const file of Array.from(files)) {
      // Validate file type
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension || '')) {
        toast({
          title: "Invalid File Type",
          description: `File type .${fileExtension} is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
          variant: "destructive"
        });
        continue;
      }

      // Validate file size (convert MB to bytes)
      if (file.size > maxSize * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `File ${file.name} exceeds the maximum size of ${maxSize}MB`,
          variant: "destructive"
        });
        continue;
      }

      // Create object URL for the file (in a real app, you'd upload to a server)
      const url = URL.createObjectURL(file);
      
      const attachment: DocumentAttachment = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        url: url,
        uploadedAt: new Date()
      };

      newAttachments.push(attachment);
    }

    onUpdateAttachments([...attachments, ...newAttachments]);
    setUploading(false);
    
    if (newAttachments.length > 0) {
      toast({
        title: "Files Uploaded",
        description: `${newAttachments.length} file(s) uploaded successfully`,
      });
    }

    // Reset input
    event.target.value = '';
  };

  const removeAttachment = (attachmentId: string) => {
    const attachment = attachments.find(a => a.id === attachmentId);
    if (attachment) {
      // Revoke object URL to free memory
      URL.revokeObjectURL(attachment.url);
    }
    onUpdateAttachments(attachments.filter(a => a.id !== attachmentId));
    
    toast({
      title: "File Removed",
      description: "The file has been removed from the form",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadFile = (attachment: DocumentAttachment) => {
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          File Attachments
        </CardTitle>
        <p className="text-sm text-gray-600">
          Attach files that form users can download and view. 
          Allowed types: {allowedTypes.join(', ')} | Max size: {maxSize}MB per file
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="file-upload">Upload Files</Label>
          <Input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
            className="mt-1"
            accept={allowedTypes.map(type => `.${type}`).join(',')}
          />
        </div>

        {attachments.length > 0 && (
          <div className="space-y-3">
            <Label>Uploaded Files</Label>
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{attachment.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{formatFileSize(attachment.size)}</span>
                      <Badge variant="secondary" className="text-xs">
                        {attachment.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => downloadFile(attachment)}
                    title="Download file"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeAttachment(attachment.id)}
                    title="Remove file"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {uploading && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Upload className="h-4 w-4 animate-pulse" />
            Uploading files...
          </div>
        )}
      </CardContent>
    </Card>
  );
};
