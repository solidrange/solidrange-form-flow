
import React, { useState } from 'react';
import { AnimatedCard } from '../AnimatedCard';
import { ResponsiveLayout } from '../ResponsiveLayout';
import { BrandedButton } from '../BrandedButton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FileText,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  Users,
  BarChart3,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface FormItem {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  responses: number;
  created: string;
  lastModified: string;
}

interface FormsListViewProps {
  onCreateForm: () => void;
  onEditForm: (formId: string) => void;
}

export const FormsListView: React.FC<FormsListViewProps> = ({
  onCreateForm,
  onEditForm
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');
  const isMobile = useIsMobile();

  const sampleForms: FormItem[] = [
    {
      id: '1',
      title: 'Customer Satisfaction Survey',
      description: 'Collect feedback from our customers about their experience',
      status: 'published',
      responses: 245,
      created: '2024-01-15',
      lastModified: '2024-01-20'
    },
    {
      id: '2', 
      title: 'Employee Onboarding Form',
      description: 'New employee information and documentation',
      status: 'draft',
      responses: 0,
      created: '2024-01-18',
      lastModified: '2024-01-18'
    },
    {
      id: '3',
      title: 'Product Feedback Collection',
      description: 'Gather insights about our latest product features',
      status: 'published',
      responses: 89,
      created: '2024-01-10',
      lastModified: '2024-01-16'
    }
  ];

  const getStatusColor = (status: FormItem['status']) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredForms = sampleForms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || form.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedCard className="border-none shadow-sm bg-gradient-to-r from-background to-muted/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 lg:p-3 bg-primary/10 rounded-xl">
              <FileText className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold">Form Management</h1>
              <p className="text-xs lg:text-sm text-muted-foreground">
                Manage and organize your forms
              </p>
            </div>
          </div>
          
          <BrandedButton
            onClick={onCreateForm}
            className="gap-2 hover-scale"
            brandVariant="primary"
          >
            <Plus className="h-4 w-4" />
            {!isMobile && "Create New Form"}
          </BrandedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          {(['all', 'published', 'draft', 'archived'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize",
                selectedFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredForms.map((form, index) => (
          <AnimatedCard
            key={form.id}
            className="group hover:shadow-lg transition-all duration-300"
            delay={index * 100}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base lg:text-lg truncate group-hover:text-primary transition-colors">
                    {form.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {form.description}
                  </p>
                </div>
                <Badge className={cn("ml-2", getStatusColor(form.status))}>
                  {form.status}
                </Badge>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{form.responses}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(form.created).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <BrandedButton
                  size="sm"
                  variant="ghost"
                  onClick={() => onEditForm(form.id)}
                  className="flex-1 gap-2 hover-scale"
                >
                  <Edit className="h-4 w-4" />
                  {!isMobile && "Edit"}
                </BrandedButton>
                <BrandedButton
                  size="sm"
                  variant="ghost"
                  className="gap-2 hover-scale"
                >
                  <Eye className="h-4 w-4" />
                  {!isMobile && "View"}
                </BrandedButton>
                <BrandedButton
                  size="sm"
                  variant="ghost"
                  className="gap-2 hover-scale"
                >
                  <BarChart3 className="h-4 w-4" />
                  {!isMobile && "Stats"}
                </BrandedButton>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredForms.length === 0 && (
        <AnimatedCard className="text-center py-12">
          <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold mb-2">No forms found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? "Try adjusting your search criteria" : "Create your first form to get started"}
          </p>
          <BrandedButton onClick={onCreateForm} brandVariant="primary">
            <Plus className="h-4 w-4 mr-2" />
            Create New Form
          </BrandedButton>
        </AnimatedCard>
      )}
    </div>
  );
};
