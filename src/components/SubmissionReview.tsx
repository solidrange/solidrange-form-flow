
import { useState, useEffect } from "react";
import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  User, 
  Building, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Award,
  X,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  ChevronDown
} from "lucide-react";
import { SubmissionsList } from "./submissions/SubmissionsList";
import { SubmissionDetails } from "./submissions/SubmissionDetails";
import { SubmissionActions } from "./submissions/SubmissionActions";

interface SubmissionReviewProps {
  submissions: FormSubmission[];
  form: Form;
  initialFilters?: {
    status?: string;
    approvalType?: string;
    riskLevel?: string;
    submissionType?: string;
  };
  onUpdateSubmission: (submissionId: string, updates: Partial<FormSubmission>) => void;
}

interface FilterState {
  status: string[];
  approvalType: string[];
  riskLevel: string[];
  submissionType: string[];
  dateRange: string;
  scoreRange: { min: number; max: number };
  searchTerm: string;
  company: string;
  submitter: string;
  sortBy: 'date' | 'score' | 'company' | 'status';
  sortOrder: 'asc' | 'desc';
}

export const SubmissionReview = ({ submissions, form, initialFilters, onUpdateSubmission }: SubmissionReviewProps) => {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: [],
    approvalType: [],
    riskLevel: [],
    submissionType: [],
    dateRange: 'all',
    scoreRange: { min: 0, max: 100 },
    searchTerm: '',
    company: '',
    submitter: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const selectedSub = submissions.find(s => s.id === selectedSubmission);

  // Apply initial filters from dashboard CTA
  useEffect(() => {
    if (initialFilters) {
      setFilters(prev => ({
        ...prev,
        status: initialFilters.status ? [initialFilters.status] : [],
        approvalType: initialFilters.approvalType ? [initialFilters.approvalType] : [],
        riskLevel: initialFilters.riskLevel ? [initialFilters.riskLevel] : [],
        submissionType: initialFilters.submissionType ? [initialFilters.submissionType] : []
      }));
      if (initialFilters.status || initialFilters.approvalType || initialFilters.riskLevel || initialFilters.submissionType) {
        setShowAdvancedFilters(true);
      }
    }
  }, [initialFilters]);

  // Filter submissions based on all criteria
  const filteredSubmissions = submissions.filter(submission => {
    // Basic status filter (legacy)
    if (filterStatus !== 'all' && submission.status !== filterStatus) return false;

    // Advanced status filter
    if (filters.status.length > 0 && !filters.status.includes(submission.status)) return false;

    // Approval type filter
    if (filters.approvalType.length > 0) {
      if (submission.status !== 'approved') return false;
      if (!filters.approvalType.includes(submission.approvalType || '')) return false;
    }

    // Risk level filter
    if (filters.riskLevel.length > 0 && !filters.riskLevel.includes(submission.score?.riskLevel || '')) return false;

    // Submission type filter
    if (filters.submissionType.length > 0 && !filters.submissionType.includes(submission.submissionType)) return false;

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const companyMatch = submission.companyName?.toLowerCase().includes(searchLower);
      const submitterMatch = submission.submitterName?.toLowerCase().includes(searchLower);
      const emailMatch = submission.submitterEmail?.toLowerCase().includes(searchLower);
      if (!companyMatch && !submitterMatch && !emailMatch) return false;
    }

    // Company filter
    if (filters.company && !submission.companyName?.toLowerCase().includes(filters.company.toLowerCase())) return false;

    // Submitter filter
    if (filters.submitter && !submission.submitterName?.toLowerCase().includes(filters.submitter.toLowerCase())) return false;

    // Score range filter
    if (submission.score) {
      if (submission.score.percentage < filters.scoreRange.min || submission.score.percentage > filters.scoreRange.max) return false;
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const submissionDate = new Date(submission.submittedAt);
      const daysDiff = Math.floor((now.getTime() - submissionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (filters.dateRange) {
        case '7d': if (daysDiff > 7) return false; break;
        case '30d': if (daysDiff > 30) return false; break;
        case '90d': if (daysDiff > 90) return false; break;
        case '1y': if (daysDiff > 365) return false; break;
      }
    }

    return true;
  });

  // Sort submissions
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    let compareValue = 0;
    
    switch (filters.sortBy) {
      case 'date':
        compareValue = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
        break;
      case 'score':
        compareValue = (a.score?.percentage || 0) - (b.score?.percentage || 0);
        break;
      case 'company':
        compareValue = (a.companyName || '').localeCompare(b.companyName || '');
        break;
      case 'status':
        compareValue = a.status.localeCompare(b.status);
        break;
    }
    
    return filters.sortOrder === 'asc' ? compareValue : -compareValue;
  });

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleFilterValue = (key: 'status' | 'approvalType' | 'riskLevel' | 'submissionType', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value) 
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      status: [],
      approvalType: [],
      riskLevel: [],
      submissionType: [],
      dateRange: 'all',
      scoreRange: { min: 0, max: 100 },
      searchTerm: '',
      company: '',
      submitter: '',
      sortBy: 'date',
      sortOrder: 'desc'
    });
    setFilterStatus('all');
  };

  const activeFiltersCount = 
    filters.status.length + 
    filters.approvalType.length + 
    filters.riskLevel.length + 
    filters.submissionType.length + 
    (filters.searchTerm ? 1 : 0) + 
    (filters.company ? 1 : 0) + 
    (filters.submitter ? 1 : 0) + 
    (filters.dateRange !== 'all' ? 1 : 0) + 
    (filters.scoreRange.min > 0 || filters.scoreRange.max < 100 ? 1 : 0);

  const handleResendForm = (submissionId: string, comments: string) => {
    console.log('Resending form to submission:', submissionId, 'with comments:', comments);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header with Search and Filters */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Submissions ({sortedSubmissions.length})</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by company, submitter, or email..."
            value={filters.searchTerm}
            onChange={(e) => updateFilter('searchTerm', e.target.value)}
            className="pl-10 h-12 text-sm"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40 h-10">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent className="z-50 bg-background border shadow-lg">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="submitted">New</SelectItem>
              <SelectItem value="under_review">Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="relative h-10 px-4"
          >
            <MoreHorizontal className="h-4 w-4 mr-2" />
            Advanced Filters
            {activeFiltersCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {activeFiltersCount > 0 && (
            <Button variant="outline" size="sm" onClick={clearAllFilters} className="h-10">
              <X className="h-4 w-4 mr-2" />
              Clear All ({activeFiltersCount})
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
          <CollapsibleContent className="space-y-6 pt-4 border rounded-lg p-6 bg-muted/20">
            {/* Row 1: Status and Approval Type */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Status Filter */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Status</Label>
                <div className="space-y-2">
                  {[
                    { value: 'submitted', label: 'Submitted', icon: <FileText className="h-3 w-3" /> },
                    { value: 'under_review', label: 'Review', icon: <Clock className="h-3 w-3" /> },
                    { value: 'approved', label: 'Approved', icon: <CheckCircle className="h-3 w-3" /> },
                    { value: 'rejected', label: 'Rejected', icon: <XCircle className="h-3 w-3" /> }
                  ].map(({ value, label, icon }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${value}`}
                        checked={filters.status.includes(value)}
                        onCheckedChange={() => toggleFilterValue('status', value)}
                      />
                      <Label htmlFor={`status-${value}`} className="flex items-center gap-2 text-sm cursor-pointer">
                        {icon}
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approval Type */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Approval Type</Label>
                <div className="space-y-2">
                  {[
                    { value: 'fully', label: 'Fully', icon: <Award className="h-3 w-3" /> },
                    { value: 'partially', label: 'Partially', icon: <Shield className="h-3 w-3" /> }
                  ].map(({ value, label, icon }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`approval-${value}`}
                        checked={filters.approvalType.includes(value)}
                        onCheckedChange={() => toggleFilterValue('approvalType', value)}
                      />
                      <Label htmlFor={`approval-${value}`} className="flex items-center gap-2 text-sm cursor-pointer">
                        {icon}
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Level */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Risk Level</Label>
                <div className="space-y-2">
                  {[
                    { value: 'low', label: 'Low', color: 'green' },
                    { value: 'medium', label: 'Medium', color: 'yellow' },
                    { value: 'high', label: 'High', color: 'orange' },
                    { value: 'critical', label: 'Critical', color: 'red' }
                  ].map(({ value, label, color }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`risk-${value}`}
                        checked={filters.riskLevel.includes(value)}
                        onCheckedChange={() => toggleFilterValue('riskLevel', value)}
                      />
                      <Label htmlFor={`risk-${value}`} className="flex items-center gap-2 text-sm cursor-pointer">
                        <div className={`w-3 h-3 rounded-full bg-${color}-500`}></div>
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Type and Sort */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Type</Label>
                  <div className="space-y-2">
                    {[
                      { value: 'vendor', label: 'Vendor', icon: <Building className="h-3 w-3" /> },
                      { value: 'internal', label: 'Internal', icon: <User className="h-3 w-3" /> }
                    ].map(({ value, label, icon }) => (
                      <div key={value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${value}`}
                          checked={filters.submissionType.includes(value)}
                          onCheckedChange={() => toggleFilterValue('submissionType', value)}
                        />
                        <Label htmlFor={`type-${value}`} className="flex items-center gap-2 text-sm cursor-pointer">
                          {icon}
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Sort</Label>
                  <div className="flex gap-2">
                    <Select value={filters.sortBy} onValueChange={(value: any) => updateFilter('sortBy', value)}>
                      <SelectTrigger className="flex-1 h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-50 bg-background border shadow-lg">
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="score">Score</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="px-3 h-9"
                    >
                      {filters.sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-2 sm:gap-4 lg:gap-6 h-auto lg:h-[calc(100vh-400px)]">
        {/* Submissions List */}
        <div className="lg:col-span-4 order-1 lg:order-1 animate-slide-in-left">
          <SubmissionsList
            submissions={sortedSubmissions}
            form={form}
            selectedSubmission={selectedSubmission}
            onSelectSubmission={setSelectedSubmission}
          />
        </div>

        {/* Submission Details */}
        <div className="lg:col-span-8 order-2 lg:order-2 animate-slide-in-right">
          {selectedSub ? (
            <Card className="h-full hover:shadow-modern-lg transition-all duration-300">
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                  <CardTitle className="text-sm sm:text-base lg:text-lg truncate">
                    Review Submission
                  </CardTitle>
                  <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1 whitespace-nowrap hover:scale-105 transition-transform duration-200">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline ml-1">Export</span>
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs px-2 py-1 whitespace-nowrap hover:scale-105 transition-transform duration-200">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline ml-1">Print</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 lg:space-y-6 overflow-auto max-h-[60vh] sm:max-h-[70vh] lg:max-h-[calc(100vh-300px)] p-3 sm:p-4 lg:p-6">
                <SubmissionDetails submission={selectedSub} form={form} />
                <SubmissionActions 
                  submission={selectedSub} 
                  form={form}
                  onUpdateSubmission={onUpdateSubmission}
                  onResendForm={handleResendForm}
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
              <CardContent className="text-center p-4">
                <FileText className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
                <p className="text-xs sm:text-sm text-gray-500">Select a submission to review</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
