
import React, { useState, useMemo } from 'react';
import { FormTemplate } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Building2, Shield, Zap, Heart, Activity, Smartphone, Lightbulb, Briefcase, Globe } from 'lucide-react';
import { BrandedButton } from './BrandedButton';
import { allTemplates } from '@/data/formTemplates';

interface FormLibraryProps {
  onUseTemplate: (template: FormTemplate) => void;
}

const sectorIcons = {
  'Government': Building2,
  'Insurance': Shield,
  'Fintech': Zap,
  'Health': Heart,
  'Energy': Activity,
  'Telecom': Smartphone,
  'Startups': Lightbulb,
  'SME': Briefcase,
  'Multi-Sector': Globe
};

const categoryOptions = [
  { value: 'all', label: 'All Categories', count: 270 },
  { value: 'Registration', label: 'Registration', count: 90 },
  { value: 'Assessment', label: 'Assessment', count: 60 },
  { value: 'Compliance', label: 'Compliance', count: 45 },
  { value: 'Feedback', label: 'Feedback', count: 30 },
  { value: 'Risk', label: 'Risk', count: 45 }
];

const sectorOptions = [
  { value: 'all', label: 'All Sectors', count: 270 },
  { value: 'Government', label: 'Government', count: 30 },
  { value: 'Insurance', label: 'Insurance', count: 30 },
  { value: 'Fintech', label: 'Fintech', count: 30 },
  { value: 'Health', label: 'Health', count: 30 },
  { value: 'Energy', label: 'Energy', count: 30 },
  { value: 'Telecom', label: 'Telecom', count: 30 },
  { value: 'Startups', label: 'Startups', count: 30 },
  { value: 'SME', label: 'SME', count: 30 },
  { value: 'Multi-Sector', label: 'Multi-Sector', count: 30 }
];

export const FormLibrary: React.FC<FormLibraryProps> = ({ onUseTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');

  console.log('FormLibrary: Available templates:', allTemplates.length);

  // Filter templates based on search, category, and sector
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesSector = selectedSector === 'all' || template.sector === selectedSector;
      
      return matchesSearch && matchesCategory && matchesSector;
    });
  }, [searchTerm, selectedCategory, selectedSector]);

  // Group templates by sector for display
  const templatesBySector = useMemo(() => {
    const grouped: Record<string, FormTemplate[]> = {};
    
    filteredTemplates.forEach(template => {
      const sector = template.sector as string;
      if (!grouped[sector]) {
        grouped[sector] = [];
      }
      grouped[sector].push(template);
    });
    
    return grouped;
  }, [filteredTemplates]);

  const handleUseTemplate = (template: FormTemplate) => {
    console.log('FormLibrary: Using template:', template.name);
    console.log('Template fields being passed:', template.fields);
    
    // Create a deep copy of the template to avoid reference issues
    const templateCopy = JSON.parse(JSON.stringify(template));
    console.log('Template copy fields:', templateCopy.fields);
    
    onUseTemplate(templateCopy);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Form Library</h2>
        <p className="text-muted-foreground">Choose from pre-built templates to get started quickly</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category..." />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label} ({option.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sector Filter */}
        <Select value={selectedSector} onValueChange={setSelectedSector}>
          <SelectTrigger>
            <SelectValue placeholder="Select sector..." />
          </SelectTrigger>
          <SelectContent>
            {sectorOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label} ({option.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Showing {filteredTemplates.length} templates</span>
        {searchTerm && <Badge variant="secondary">Search: {searchTerm}</Badge>}
        {selectedCategory !== 'all' && <Badge variant="secondary">Category: {selectedCategory}</Badge>}
        {selectedSector !== 'all' && <Badge variant="secondary">Sector: {selectedSector}</Badge>}
      </div>

      {/* Templates by Sector */}
      <div className="space-y-8">
        {Object.entries(templatesBySector).map(([sector, sectorTemplates]) => {
          const SectorIcon = sectorIcons[sector as keyof typeof sectorIcons] || Globe;
          
          return (
            <div key={sector}>
              <div className="flex items-center gap-2 mb-4">
                <SectorIcon className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{sector}</h3>
                <Badge variant="outline">{sectorTemplates.length} templates</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectorTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base font-medium leading-tight">
                          {template.name}
                        </CardTitle>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {template.sector}
                          </Badge>
                          {template.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          {template.fields.length} fields
                        </div>
                        
                        <BrandedButton
                          onClick={() => handleUseTemplate(template)}
                          className="w-full"
                          size="sm"
                        >
                          Use Template
                        </BrandedButton>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No templates found matching your criteria.</p>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};
