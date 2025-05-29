
import { useState } from "react";
import { FormTemplate } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

interface FormLibraryProps {
  onUseTemplate?: (template: FormTemplate) => void;
}

const formTemplates: FormTemplate[] = [
  {
    id: "1",
    name: "Employee Onboarding",
    description: "Complete employee information collection and documentation",
    category: "registration",
    preview: "Personal details, emergency contacts, documents",
    fields: [
      { type: "text", label: "Full Name", required: true },
      { type: "email", label: "Email Address", required: true },
      { type: "text", label: "Phone Number", required: true },
      { type: "date", label: "Start Date", required: true },
      { type: "select", label: "Department", required: true, options: ["HR", "IT", "Finance", "Operations"] },
      { type: "textarea", label: "Additional Notes", required: false }
    ]
  },
  {
    id: "2",
    name: "Customer Satisfaction Survey",
    description: "Gather feedback on products and services",
    category: "survey",
    preview: "Rating scales, feedback questions, recommendations",
    fields: [
      { type: "rating", label: "Overall Satisfaction", required: true },
      { type: "radio", label: "Would you recommend us?", required: true, options: ["Yes", "No", "Maybe"] },
      { type: "select", label: "How did you hear about us?", required: false, options: ["Social Media", "Website", "Referral", "Advertisement"] },
      { type: "textarea", label: "Additional Comments", required: false }
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
      { type: "textarea", label: "Description", required: true }
    ]
  },
  {
    id: "4",
    name: "Event Registration",
    description: "Comprehensive event signup and attendee management",
    category: "registration",
    preview: "Personal info, preferences, special requirements",
    fields: [
      { type: "text", label: "Full Name", required: true },
      { type: "email", label: "Email", required: true },
      { type: "checkbox", label: "Dietary Preferences", required: false, options: ["Vegetarian", "Vegan", "Gluten-free", "No restrictions"] },
      { type: "radio", label: "T-shirt Size", required: true, options: ["S", "M", "L", "XL"] }
    ]
  },
  {
    id: "5",
    name: "Risk Assessment",
    description: "Comprehensive risk evaluation and mitigation planning",
    category: "risk",
    preview: "Risk identification, impact analysis, mitigation strategies",
    fields: [
      { type: "text", label: "Risk Title", required: true },
      { type: "select", label: "Risk Category", required: true, options: ["Financial", "Operational", "Strategic", "Compliance"] },
      { type: "rating", label: "Probability", required: true },
      { type: "rating", label: "Impact", required: true },
      { type: "textarea", label: "Mitigation Plan", required: true }
    ]
  },
  {
    id: "6",
    name: "Training Feedback",
    description: "Training session evaluation and improvement feedback",
    category: "feedback",
    preview: "Session rating, content evaluation, suggestions",
    fields: [
      { type: "text", label: "Training Session", required: true },
      { type: "rating", label: "Content Quality", required: true },
      { type: "rating", label: "Instructor Effectiveness", required: true },
      { type: "checkbox", label: "Topics Covered", required: false, options: ["Theory", "Practical", "Case Studies", "Q&A"] },
      { type: "textarea", label: "Suggestions for Improvement", required: false }
    ]
  }
];

export const FormLibrary = ({ onUseTemplate }: FormLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "survey", "assessment", "registration", "feedback", "compliance", "risk"];

  const filteredTemplates = formTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: FormTemplate) => {
    console.log("Using template:", template);
    if (onUseTemplate) {
      onUseTemplate(template);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md bg-white"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="secondary" className="mt-2">
                    {template.category}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{template.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Preview:</p>
                  <p className="text-sm text-gray-500">{template.preview}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Fields ({template.fields.length}):</p>
                  <div className="flex flex-wrap gap-1 mt-1">
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
                  className="w-full mt-4" 
                  onClick={() => handleUseTemplate(template)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No templates found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
