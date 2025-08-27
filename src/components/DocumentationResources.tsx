import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Eye, Calendar, Users, Code, BookOpen, FileCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DocumentResource {
  id: string;
  title: string;
  description: string;
  category: "Business" | "Technical" | "Architecture" | "Process";
  lastModified: string;
  content?: string;
  fileName: string;
}

export const DocumentationResources = () => {
  const { t } = useLanguage();
  const [selectedDocument, setSelectedDocument] = useState<DocumentResource | null>(null);

  const documentResources: DocumentResource[] = [
    {
      id: "brd",
      title: "Business Requirements Document (BRD)",
      description: "Comprehensive business requirements and objectives for the Enterprise Integration Platform",
      category: "Business",
      lastModified: "2025-08-20",
      fileName: "BRD_DOCUMENT.md"
    },
    {
      id: "srs",
      title: "Software Requirements Specification (SRS)",
      description: "Detailed technical requirements and specifications for the Enterprise Integration Platform",
      category: "Technical",
      lastModified: "2025-08-20",
      fileName: "SRS_DOCUMENT.md"
    },
    {
      id: "system-overview",
      title: "System Architecture Document",
      description: "Technical architecture and design patterns for the platform",
      category: "Architecture",
      lastModified: "2025-08-20",
      fileName: "COMPREHENSIVE_SYSTEM_OVERVIEW.md"
    },
    {
      id: "api-docs",
      title: "API Documentation",
      description: "Complete API endpoints and integration guidelines",
      category: "Technical",
      lastModified: "2025-08-20",
      fileName: "API_DOCUMENTATION.md"
    },
    {
      id: "system-flow",
      title: "System Flow Documentation",
      description: "Detailed system workflows and process flows for all platform operations",
      category: "Process",
      lastModified: "2025-08-20",
      fileName: "FILE_STRUCTURE_AND_FLOW.md"
    },
    {
      id: "deployment",
      title: "Deployment Guide",
      description: "Step-by-step deployment instructions and environment setup",
      category: "Process",
      lastModified: "2025-08-20",
      fileName: "DEPLOYMENT_GUIDE.md"
    },
    {
      id: "scope",
      title: "Project Scope Document",
      description: "Detailed scope and deliverables for external development teams",
      category: "Business",
      lastModified: "2025-08-20",
      fileName: "SCOPE.md"
    },
    {
      id: "migration",
      title: "React to Angular Migration Guide",
      description: "Complete migration strategy from React to Angular implementation",
      category: "Technical",
      lastModified: "2025-08-20",
      fileName: "REACT_TO_ANGULAR_MIGRATION.md"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Business": return <Users className="h-4 w-4" />;
      case "Technical": return <Code className="h-4 w-4" />;
      case "Architecture": return <BookOpen className="h-4 w-4" />;
      case "Process": return <FileCheck className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Business": return "bg-blue-50 text-blue-700 border-blue-200";
      case "Technical": return "bg-green-50 text-green-700 border-green-200";
      case "Architecture": return "bg-purple-50 text-purple-700 border-purple-200";
      case "Process": return "bg-orange-50 text-orange-700 border-orange-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const categoryStats = documentResources.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalDocuments = documentResources.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Documentation Resources</h2>
        <p className="text-muted-foreground">
          Comprehensive documentation for the Enterprise Integration Platform
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{totalDocuments}</div>
            <div className="text-sm text-muted-foreground">Total Documents</div>
          </CardContent>
        </Card>

        {Object.entries(categoryStats).map(([category, count]) => (
          <Card key={category} className="text-center">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                {getCategoryIcon(category)}
              </div>
              <div className="text-2xl font-bold text-foreground">{count}</div>
              <div className="text-sm text-muted-foreground">{category}</div>
              <div className="text-sm text-muted-foreground">Documents</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(
          documentResources.reduce((acc, doc) => {
            if (!acc[doc.category]) acc[doc.category] = [];
            acc[doc.category].push(doc);
            return acc;
          }, {} as Record<string, DocumentResource[]>)
        ).map(([category, docs]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-2">
              {getCategoryIcon(category)}
              <h3 className="text-lg font-semibold text-foreground">{category}</h3>
            </div>

            <div className="space-y-3">
              {docs.map((doc) => (
                <Card key={doc.id} className="transition-all hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-medium leading-tight">
                        {doc.title}
                      </CardTitle>
                      <Badge className={`${getCategoryColor(doc.category)} text-xs`}>
                        {doc.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {doc.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Last modified: {doc.lastModified}</span>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8"
                            onClick={() => setSelectedDocument(doc)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {getCategoryIcon(doc.category)}
                              {doc.title}
                            </DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="h-[60vh] mt-4">
                            <div className="space-y-4">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground border-b pb-3">
                                <Badge className={getCategoryColor(doc.category)}>
                                  {doc.category}
                                </Badge>
                                <span>•</span>
                                <span>File: {doc.fileName}</span>
                                <span>•</span>
                                <span>Modified: {doc.lastModified}</span>
                              </div>
                              <div className="prose prose-sm max-w-none">
                                <p>{doc.description}</p>
                                <div className="mt-4 p-4 bg-muted rounded-lg">
                                  <p className="text-sm text-muted-foreground">
                                    This document contains detailed information about {doc.title.toLowerCase()}. 
                                    The full content includes technical specifications, implementation details, 
                                    and comprehensive guidelines for development teams.
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-2">
                                    <strong>Note:</strong> The complete document is available in the Resources folder 
                                    at <code>Resources/{doc.fileName}</code>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};