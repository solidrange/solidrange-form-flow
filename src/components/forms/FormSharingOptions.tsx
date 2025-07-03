import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Globe, 
  Code, 
  ExternalLink, 
  Copy, 
  FileDown, 
  Monitor, 
  Smartphone, 
  Tablet 
} from "lucide-react";
import { Form } from "@/types/form";
import { toast } from "@/hooks/use-toast";

interface FormSharingOptionsProps {
  form: Form;
}

export const FormSharingOptions = ({ form }: FormSharingOptionsProps) => {
  const generateFormUrl = () => {
    return `${window.location.origin}/form/${form.id}`;
  };

  const generateEmbedCode = (width = "100%", height = "600px") => {
    const formUrl = generateFormUrl();
    return `<iframe src="${formUrl}" width="${width}" height="${height}" frameborder="0" title="${form.title}" style="border: none;"></iframe>`;
  };

  const generateResponsiveEmbedCode = () => {
    const formUrl = generateFormUrl();
    return `<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
  <iframe src="${formUrl}" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
    title="${form.title}">
  </iframe>
</div>`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  const exportToPDF = () => {
    // PDF export functionality will be implemented here
    toast({
      title: "PDF Export",
      description: "PDF export functionality coming soon.",
    });
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
};