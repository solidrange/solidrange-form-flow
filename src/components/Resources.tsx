import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Eye, Calendar, BarChart3 } from 'lucide-react';
import { MarkdownViewer } from './MarkdownViewer';

interface ResourceFile {
  name: string;
  title: string;
  description: string;
  category: string;
  size: string;
  lastModified: string;
  content?: string;
}

const resourceFiles: ResourceFile[] = [
  {
    name: 'BRD_DOCUMENT.md',
    title: 'Business Requirements Document',
    description: 'Comprehensive business requirements and specifications',
    category: 'Business',
    size: '45.2 KB',
    lastModified: '2024-01-15'
  },
  {
    name: 'SRS_DOCUMENT.md',
    title: 'Software Requirements Specification',
    description: 'Technical requirements and system specifications',
    category: 'Technical',
    size: '38.7 KB',
    lastModified: '2024-01-15'
  },
  {
    name: 'COMPREHENSIVE_SYSTEM_OVERVIEW.md',
    title: 'System Overview',
    description: 'Complete system architecture and component overview',
    category: 'Architecture',
    size: '42.1 KB',
    lastModified: '2024-01-15'
  },
  {
    name: 'API_DOCUMENTATION.md',
    title: 'API Documentation',
    description: 'REST API endpoints and integration guidelines',
    category: 'Technical',
    size: '28.9 KB',
    lastModified: '2024-01-15'
  },
  {
    name: 'FILE_STRUCTURE_AND_FLOW.md',
    title: 'File Structure & Application Flow',
    description: 'Codebase structure and application flow documentation',
    category: 'Development',
    size: '35.6 KB',
    lastModified: '2024-01-15'
  },
  {
    name: 'DEPLOYMENT_GUIDE.md',
    title: 'Deployment Guide',
    description: 'Step-by-step deployment and configuration guide',
    category: 'Operations',
    size: '22.4 KB',
    lastModified: '2024-01-15'
  },
  {
    name: 'SCOPE.md',
    title: 'Project Scope Document',
    description: 'Formal scope definition for external development teams',
    category: 'Project',
    size: '31.8 KB',
    lastModified: '2024-01-15'
  },
  {
    name: 'REACT_TO_ANGULAR_MIGRATION.md',
    title: 'React to Angular Migration Guide',
    description: 'Migration strategy and implementation guidelines',
    category: 'Migration',
    size: '26.3 KB',
    lastModified: '2024-01-15'
  }
];

const categories = {
  Business: { color: 'bg-blue-100 text-blue-800', icon: BarChart3 },
  Technical: { color: 'bg-green-100 text-green-800', icon: FileText },
  Architecture: { color: 'bg-purple-100 text-purple-800', icon: Eye },
  Development: { color: 'bg-orange-100 text-orange-800', icon: Download },
  Operations: { color: 'bg-red-100 text-red-800', icon: Calendar },
  Project: { color: 'bg-indigo-100 text-indigo-800', icon: FileText },
  Migration: { color: 'bg-yellow-100 text-yellow-800', icon: Download }
};

export function Resources() {
  const [selectedFile, setSelectedFile] = useState<ResourceFile | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFiles = selectedCategory === 'all' 
    ? resourceFiles 
    : resourceFiles.filter(file => file.category === selectedCategory);

  const handleFileSelect = (file: ResourceFile) => {
    setSelectedFile(file);
  };

  const handleBackToList = () => {
    setSelectedFile(null);
  };

  if (selectedFile) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 p-6 border-b">
          <Button variant="outline" onClick={handleBackToList}>
            ← Back to Resources
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{selectedFile.title}</h1>
            <p className="text-muted-foreground">{selectedFile.description}</p>
          </div>
        </div>
        <div className="flex-1 p-6">
          <MarkdownViewer filename={selectedFile.name} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Documentation Resources</h1>
        <p className="text-muted-foreground">
          Comprehensive documentation for SolidForm enterprise application
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All Documents
        </Button>
        {Object.keys(categories).map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resourceFiles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(categories).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">270.9 KB</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 15</div>
          </CardContent>
        </Card>
      </div>

      {/* File List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredFiles.map((file) => {
          const categoryInfo = categories[file.category as keyof typeof categories];
          const IconComponent = categoryInfo.icon;
          
          return (
            <Card 
              key={file.name} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleFileSelect(file)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-muted-foreground" />
                    <Badge variant="secondary" className={categoryInfo.color}>
                      {file.category}
                    </Badge>
                  </div>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">{file.title}</CardTitle>
                <CardDescription className="text-sm">
                  {file.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{file.size}</span>
                  <span>{file.lastModified}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}