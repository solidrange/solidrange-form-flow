
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Copy, 
  Trash2, 
  Eye, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Form {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published';
  createdAt: Date;
  lastModified: Date;
  submissions: number;
  category: string;
}

// Sample data - in a real app this would come from props or a data source
const sampleForms: Form[] = [
  {
    id: '1',
    title: 'Employee Onboarding Form',
    description: 'Complete onboarding process for new employees',
    status: 'published',
    createdAt: new Date('2024-01-15'),
    lastModified: new Date('2024-02-10'),
    submissions: 45,
    category: 'HR'
  },
  {
    id: '2',
    title: 'Customer Feedback Survey',
    description: 'Collect customer satisfaction and feedback',
    status: 'published',
    createdAt: new Date('2024-02-01'),
    lastModified: new Date('2024-02-05'),
    submissions: 128,
    category: 'Customer Service'
  },
  {
    id: '3',
    title: 'Vendor Risk Assessment',
    description: 'Comprehensive vendor evaluation form',
    status: 'draft',
    createdAt: new Date('2024-02-20'),
    lastModified: new Date('2024-02-25'),
    submissions: 0,
    category: 'Procurement'
  },
  {
    id: '4',
    title: 'IT Equipment Request',
    description: 'Request form for IT equipment and software',
    status: 'draft',
    createdAt: new Date('2024-02-22'),
    lastModified: new Date('2024-02-28'),
    submissions: 0,
    category: 'IT'
  }
];

const FormCard = ({ form, onEdit, onCopy, onDelete, onPreview }: {
  form: Form;
  onEdit: (id: string) => void;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
}) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200 group">
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm sm:text-base font-semibold truncate group-hover:text-blue-600 transition-colors">
              {form.title}
            </CardTitle>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
              {form.description}
            </p>
          </div>
          <Badge 
            variant={form.status === 'published' ? 'default' : 'secondary'}
            className="text-xs px-2 py-1 shrink-0"
          >
            {form.status === 'published' ? (
              <><CheckCircle className="h-3 w-3 mr-1" />Published</>
            ) : (
              <><Clock className="h-3 w-3 mr-1" />Draft</>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0">
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {form.createdAt.toLocaleDateString()}
            </span>
            {form.status === 'published' && (
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {form.submissions} submissions
              </span>
            )}
          </div>
          <Badge variant="outline" className="text-xs px-2 py-1">
            {form.category}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(form.id)} className="flex-1 text-xs px-2 py-1">
            <Edit className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button size="sm" variant="outline" onClick={() => onPreview(form.id)} className="flex-1 text-xs px-2 py-1">
            <Eye className="h-3 w-3 mr-1" />
            <span className="hidden sm:inline">Preview</span>
          </Button>
          <Button size="sm" variant="outline" onClick={() => onCopy(form.id)} className="px-2 py-1">
            <Copy className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(form.id)} className="px-2 py-1 text-red-600 hover:text-red-700">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const FormLibraryManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [forms] = useState<Form[]>(sampleForms);

  const handleEdit = (id: string) => {
    console.log('Edit form:', id);
  };

  const handleCopy = (id: string) => {
    console.log('Copy form:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete form:', id);
  };

  const handlePreview = (id: string) => {
    console.log('Preview form:', id);
  };

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || form.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const draftForms = filteredForms.filter(form => form.status === 'draft');
  const publishedForms = filteredForms.filter(form => form.status === 'published');

  const categories = ['all', ...Array.from(new Set(forms.map(form => form.category)))];

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader className="pb-2 sm:pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <CardTitle className="text-base sm:text-lg">
              <span className="hidden sm:inline">Form Library Manager</span>
              <span className="sm:hidden">Forms</span>
            </CardTitle>
            <Button className="text-xs px-3 py-2">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">New Form</span>
              <span className="xs:hidden">New</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-xs sm:text-sm"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <div className="flex items-center gap-2">
                  <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="text-xs sm:text-sm">
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tabs for Drafts and Published */}
          <Tabs defaultValue="published" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="published" className="text-xs sm:text-sm">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Published ({publishedForms.length})</span>
                <span className="sm:hidden">Published ({publishedForms.length})</span>
              </TabsTrigger>
              <TabsTrigger value="drafts" className="text-xs sm:text-sm">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Drafts ({draftForms.length})</span>
                <span className="sm:hidden">Drafts ({draftForms.length})</span>
              </TabsTrigger>
            </TabsList>

            {/* Published Forms Tab */}
            <TabsContent value="published" className="space-y-4 mt-4 sm:mt-6">
              {publishedForms.length === 0 ? (
                <Card className="p-6 sm:p-8 text-center">
                  <CheckCircle className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
                  <p className="text-sm sm:text-base text-gray-500">No published forms found</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Create and publish your first form to get started</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {publishedForms.map((form) => (
                    <FormCard
                      key={form.id}
                      form={form}
                      onEdit={handleEdit}
                      onCopy={handleCopy}
                      onDelete={handleDelete}
                      onPreview={handlePreview}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Draft Forms Tab */}
            <TabsContent value="drafts" className="space-y-4 mt-4 sm:mt-6">
              {draftForms.length === 0 ? (
                <Card className="p-6 sm:p-8 text-center">
                  <Clock className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
                  <p className="text-sm sm:text-base text-gray-500">No draft forms found</p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Start building a new form to see it here</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                  {draftForms.map((form) => (
                    <FormCard
                      key={form.id}
                      form={form}
                      onEdit={handleEdit}
                      onCopy={handleCopy}
                      onDelete={handleDelete}
                      onPreview={handlePreview}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
