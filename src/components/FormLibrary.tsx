
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FormTemplate } from "@/types/form";
import { FileText, Users, Shield, BarChart3, ClipboardCheck, AlertTriangle } from "lucide-react";

const templates: FormTemplate[] = [
  {
    id: "1",
    name: "Vendor Risk Assessment",
    description: "Comprehensive vendor security and compliance assessment form",
    category: "risk",
    preview: "Security questionnaire with scoring system",
    fields: [
      { type: "text", label: "Company Name", required: true },
      { type: "email", label: "Contact Email", required: true },
      { type: "select", label: "Company Size", required: true, options: ["1-10", "11-50", "51-200", "200+"] },
      { type: "radio", label: "Data Classification", required: true, options: ["Public", "Internal", "Confidential", "Restricted"] },
    ]
  },
  {
    id: "2",
    name: "Compliance Survey",
    description: "Internal compliance assessment for regulatory frameworks",
    category: "compliance",
    preview: "ISO 27001, SAMA, NDMO compliance check",
    fields: [
      { type: "text", label: "Department", required: true },
      { type: "checkbox", label: "Compliance Frameworks", required: true, options: ["ISO 27001", "SAMA", "NDMO", "PDPL"] },
      { type: "textarea", label: "Current Measures", required: false },
    ]
  },
  {
    id: "3",
    name: "Incident Report",
    description: "Security incident reporting and case management",
    category: "assessment",
    preview: "Structured incident documentation",
    fields: [
      { type: "text", label: "Incident Title", required: true },
      { type: "date", label: "Incident Date", required: true },
      { type: "select", label: "Severity", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { type: "textarea", label: "Description", required: true },
    ]
  },
  {
    id: "4",
    name: "Employee Training Quiz",
    description: "Cybersecurity awareness training with automated scoring",
    category: "survey",
    preview: "Multiple choice questions with scoring",
    fields: [
      { type: "text", label: "Employee ID", required: true },
      { type: "radio", label: "What is phishing?", required: true, options: ["Fishing online", "Email scam", "Website design", "Network protocol"] },
      { type: "checkbox", label: "Good password practices", required: true, options: ["Use complex passwords", "Share with team", "Change regularly", "Use same password everywhere"] },
    ]
  },
  {
    id: "5",
    name: "Policy Exception Request",
    description: "Request approval for policy exceptions with workflow",
    category: "compliance",
    preview: "Exception request with approval routing",
    fields: [
      { type: "text", label: "Requestor Name", required: true },
      { type: "select", label: "Policy Type", required: true, options: ["Security", "Privacy", "Access Control", "Data Handling"] },
      { type: "textarea", label: "Business Justification", required: true },
      { type: "date", label: "Requested Duration", required: true },
    ]
  },
  {
    id: "6",
    name: "Business Impact Analysis",
    description: "Assess business continuity and recovery requirements",
    category: "assessment",
    preview: "BIA questionnaire with impact scoring",
    fields: [
      { type: "text", label: "Business Function", required: true },
      { type: "rating", label: "Criticality Level", required: true },
      { type: "number", label: "Maximum Tolerable Downtime (hours)", required: true },
      { type: "textarea", label: "Dependencies", required: false },
    ]
  }
];

const categoryIcons = {
  survey: Users,
  assessment: BarChart3,
  registration: FileText,
  feedback: ClipboardCheck,
  compliance: Shield,
  risk: AlertTriangle,
};

export const FormLibrary = () => {
  const handleUseTemplate = (template: FormTemplate) => {
    console.log("Using template:", template);
    // Here you would load the template into the form builder
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Form Templates</h2>
        <Badge variant="outline">6 templates available</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const IconComponent = categoryIcons[template.category];
          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-indigo-600" />
                    <Badge variant="secondary" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <p className="text-sm text-gray-600">{template.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Preview:</p>
                    <p className="text-sm italic">{template.preview}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-2">
                      {template.fields.length} fields included
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {template.fields.slice(0, 3).map((field, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {field.type}
                        </Badge>
                      ))}
                      {template.fields.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.fields.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleUseTemplate(template)}
                  >
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
