
import { useState } from "react";
import { FormTemplate } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Eye } from "lucide-react";

interface FormLibraryProps {
  onSelectTemplate: (template: FormTemplate) => void;
}

// Sample templates for demonstration
const sampleTemplates: FormTemplate[] = [
  {
    id: "vendor-onboarding",
    name: "Vendor Onboarding",
    description: "Complete vendor registration and compliance form",
    category: "Business",
    fields: [],
    settings: {},
    tags: ["vendor", "onboarding", "compliance"]
  },
  {
    id: "employee-feedback",
    name: "Employee Feedback",
    description: "Annual employee satisfaction survey",
    category: "HR",
    fields: [],
    settings: {},
    tags: ["hr", "feedback", "survey"]
  }
];

export const FormLibrary = ({ onSelectTemplate }: FormLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTemplates = sampleTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "all" || template.category === selectedCategory)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <Badge variant="outline">{template.category}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {template.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={() => onSelectTemplate(template)}>
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
