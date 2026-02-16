
import React, { useState, useMemo } from 'react';
import { FormTemplate } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Building2, Shield, Zap, Heart, Activity, Smartphone, Lightbulb, Briefcase, Globe, Eye, Trash2 } from 'lucide-react';
import { BrandedButton } from './BrandedButton';
import { getAllTemplates, deleteCustomTemplate, isCustomTemplate } from '@/data/formTemplates';
import { MultiSelectFilter } from './MultiSelectFilter';
import { FormTemplatePreview } from './FormTemplatePreview';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

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
  'all', 'Registration', 'Assessment', 'Compliance', 'Feedback', 'Risk'
];

const sectorOptions = [
  'all', 'Government', 'Insurance', 'Fintech', 'Health', 'Energy', 
  'Telecom', 'Startups', 'SME', 'Multi-Sector'
];

export const FormLibrary: React.FC<FormLibraryProps> = ({ onUseTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [previewTemplate, setPreviewTemplate] = useState<FormTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // To force re-render after delete

  const allTemplates = getAllTemplates();
  console.log('FormLibrary: Available templates:', allTemplates.length);

  const handleDeleteTemplate = (templateId: string, templateName: string) => {
    const success = deleteCustomTemplate(templateId);
    if (success) {
      setRefreshKey(prev => prev + 1); // Force re-render
      toast({
        title: "Template Deleted",
        description: `"${templateName}" has been deleted from your template library.`,
      });
    } else {
      toast({
        title: "Delete Failed",
        description: "Template could not be deleted.",
        variant: "destructive",
      });
    }
  };

  // Move these functions inside the component so they have access to allTemplates
  const getCategoryCount = (category: string) => {
    if (category === 'all') return allTemplates.length;
    return allTemplates.filter(t => t.category === category).length;
  };

  const getSectorCount = (sector: string) => {
    if (sector === 'all') return allTemplates.length;
    return allTemplates.filter(t => {
      // Handle both string and string[] types for template.sector
      const templateSectors = Array.isArray(t.sector) ? t.sector : [t.sector];
      return templateSectors.includes(sector);
    }).length;
  };

  // Filter templates based on search, category, and sector
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategories.length === 0 || 
                            selectedCategories.includes('all') || 
                            selectedCategories.includes(template.category);
      
      const matchesSector = selectedSectors.length === 0 || 
                          selectedSectors.includes('all') || 
                          (() => {
                            // Handle both string and string[] types for template.sector
                            const templateSectors = Array.isArray(template.sector) ? template.sector : [template.sector];
                            return templateSectors.some(sector => selectedSectors.includes(sector));
                          })();
      
      return matchesSearch && matchesCategory && matchesSector;
    });
  }, [searchTerm, selectedCategories, selectedSectors, refreshKey]);

  // Group templates by sector for display - ensuring no duplicates
  const templatesBySector = useMemo(() => {
    const grouped: Record<string, FormTemplate[]> = {};
    
    // If no sector is selected or 'all' is selected, group all filtered templates by their sectors
    if (selectedSectors.length === 0 || selectedSectors.includes('all')) {
      filteredTemplates.forEach(template => {
        // Handle both string and string[] types for template.sector
        const templateSectors = Array.isArray(template.sector) ? template.sector : [template.sector];
        
        templateSectors.forEach(sector => {
          if (!grouped[sector]) {
            grouped[sector] = [];
          }
          // Only add template once per sector to avoid duplicates
          if (!grouped[sector].find(t => t.id === template.id)) {
            grouped[sector].push(template);
          }
        });
      });
    } else {
      // If specific sectors are selected, only show templates for those sectors
      selectedSectors.forEach(selectedSector => {
        const templatesForSector = filteredTemplates.filter(template => {
          const templateSectors = Array.isArray(template.sector) ? template.sector : [template.sector];
          return templateSectors.includes(selectedSector);
        });
        
        if (templatesForSector.length > 0) {
          grouped[selectedSector] = templatesForSector;
        }
      });
    }
    
    return grouped;
  }, [filteredTemplates, selectedSectors]);

  const handleUseTemplate = (template: FormTemplate) => {
    console.log('FormLibrary: Template selected:', template.name);
    console.log('FormLibrary: Template fields count:', template.fields.length);
    console.log('FormLibrary: Passing template to parent component');
    
    // Pass the original template without modification
    onUseTemplate(template);
  };

  const handlePreviewTemplate = (template: FormTemplate) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewTemplate(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Form Templates</h2>
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
        <MultiSelectFilter
          options={categoryOptions}
          selectedValues={selectedCategories}
          onSelectionChange={setSelectedCategories}
          placeholder="Select categories..."
          showCounts={true}
          getCounts={getCategoryCount}
        />

        {/* Sector Filter */}
        <MultiSelectFilter
          options={sectorOptions}
          selectedValues={selectedSectors}
          onSelectionChange={setSelectedSectors}
          placeholder="Select sectors..."
          showCounts={true}
          getCounts={getSectorCount}
        />
      </div>

      {/* Results Summary */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Showing {filteredTemplates.length} templates</span>
        {searchTerm && <Badge variant="secondary">Search: {searchTerm}</Badge>}
        {selectedCategories.length > 0 && !selectedCategories.includes('all') && (
          <Badge variant="secondary">Categories: {selectedCategories.length}</Badge>
        )}
        {selectedSectors.length > 0 && !selectedSectors.includes('all') && (
          <Badge variant="secondary">Sectors: {selectedSectors.length}</Badge>
        )}
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
                       <div className="flex items-start justify-between gap-2">
                         <CardTitle className="text-base font-medium leading-tight flex-1 min-w-0 pr-2">
                           {template.name}
                         </CardTitle>
                         <div className="flex items-center gap-1.5 flex-shrink-0">
                           <Badge variant="secondary" className="text-xs whitespace-nowrap">
                             {template.category}
                           </Badge>
                           <div className="flex items-center gap-1">
                             <BrandedButton
                               onClick={() => handlePreviewTemplate(template)}
                               size="sm"
                               brandVariant="outline"
                               className="p-1.5 h-8 w-8 flex-shrink-0"
                               aria-label="Preview template"
                             >
                               <Eye className="h-4 w-4" />
                             </BrandedButton>
                             {isCustomTemplate(template.id) && (
                               <AlertDialog>
                                 <AlertDialogTrigger asChild>
                                   <BrandedButton
                                     size="sm"
                                     brandVariant="outline"
                                     className="p-1.5 h-8 w-8 flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                     aria-label="Delete template"
                                   >
                                     <Trash2 className="h-4 w-4" />
                                   </BrandedButton>
                                 </AlertDialogTrigger>
                                 <AlertDialogContent className="sm:max-w-md">
                                   <AlertDialogHeader>
                                     <AlertDialogTitle>Delete Template</AlertDialogTitle>
                                     <AlertDialogDescription>
                                       Are you sure you want to delete "{template.name}"? This action cannot be undone.
                                     </AlertDialogDescription>
                                   </AlertDialogHeader>
                                   <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
                                     <AlertDialogCancel className="mt-2 sm:mt-0">Cancel</AlertDialogCancel>
                                     <AlertDialogAction 
                                       onClick={() => handleDeleteTemplate(template.id, template.name)}
                                       className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                     >
                                       Delete
                                     </AlertDialogAction>
                                   </AlertDialogFooter>
                                 </AlertDialogContent>
                               </AlertDialog>
                             )}
                           </div>
                         </div>
                       </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(template.sector) ? (
                            template.sector.map((s) => (
                              <Badge key={s} variant="outline" className="text-xs">
                                {s}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              {template.sector}
                            </Badge>
                          )}
                          {template.tags
                            .filter((tag) => {
                              // Filter out tags that match the sector name(s)
                              const sectors = Array.isArray(template.sector) ? template.sector : [template.sector];
                              return !sectors.includes(tag);
                            })
                            .slice(0, 2)
                            .map((tag) => (
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

      {/* Preview Modal */}
      <FormTemplatePreview
        template={previewTemplate}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />
    </div>
  );
};
