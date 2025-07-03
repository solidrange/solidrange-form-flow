import { useState, useEffect } from "react";
import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Search, 
  Filter, 
  Calendar, 
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
  ChevronDown,
  FileText
} from "lucide-react";
import { SubmissionCard } from "./SubmissionCard";

interface SubmissionsListProps {
  submissions: FormSubmission[];
  form: Form;
  selectedSubmission: string | null;
  filterStatus: string;
  initialFilters?: {
    status?: string;
    approvalType?: string;
    riskLevel?: string;
    submissionType?: string;
  };
  onSelectSubmission: (submissionId: string) => void;
  onFilterChange: (status: string) => void;
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

export const SubmissionsList = ({ 
  submissions, 
  form, 
  selectedSubmission, 
  filterStatus, 
  initialFilters,
  onSelectSubmission, 
  onFilterChange 
}: SubmissionsListProps) => {
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
    onFilterChange('all');
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

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-3">
            <CardTitle className="text-xs sm:text-sm lg:text-base leading-tight">
              <span className="hidden xs:inline">Submissions ({sortedSubmissions.length})</span>
              <span className="xs:hidden">Sub ({sortedSubmissions.length})</span>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={filterStatus} onValueChange={onFilterChange}>
                <SelectTrigger className="w-full xs:w-24 sm:w-28 lg:w-32 h-8 sm:h-9 text-xs">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Filter className="h-3 w-3" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All</SelectItem>
                  <SelectItem value="submitted" className="text-xs">New</SelectItem>
                  <SelectItem value="under_review" className="text-xs">Review</SelectItem>
                  <SelectItem value="approved" className="text-xs">Approved</SelectItem>
                  <SelectItem value="rejected" className="text-xs">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="relative h-8 px-2"
              >
                <MoreHorizontal className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by company, submitter, or email..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              className="pl-10 h-9 text-sm"
            />
          </div>

          {/* Advanced Filters */}
          <Collapsible open={showAdvancedFilters} onOpenChange={setShowAdvancedFilters}>
            <CollapsibleContent className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Status Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="space-y-2">
                    {[
                      { value: 'submitted', label: 'Submitted', icon: <FileText className="h-4 w-4" />, color: 'blue' },
                      { value: 'under_review', label: 'Under Review', icon: <Clock className="h-4 w-4" />, color: 'orange' },
                      { value: 'approved', label: 'Approved', icon: <CheckCircle className="h-4 w-4" />, color: 'green' },
                      { value: 'rejected', label: 'Rejected', icon: <XCircle className="h-4 w-4" />, color: 'red' }
                    ].map(({ value, label, icon, color }) => (
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

                {/* Approval Type Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Approval Type</Label>
                  <div className="space-y-2">
                    {[
                      { value: 'fully', label: 'Fully Approved', icon: <Award className="h-4 w-4" />, color: 'emerald' },
                      { value: 'partially', label: 'Partially Approved', icon: <Shield className="h-4 w-4" />, color: 'orange' }
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

                {/* Risk Level Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Risk Level</Label>
                  <div className="space-y-2">
                    {[
                      { value: 'low', label: 'Low Risk', color: 'green' },
                      { value: 'medium', label: 'Medium Risk', color: 'yellow' },
                      { value: 'high', label: 'High Risk', color: 'orange' },
                      { value: 'critical', label: 'Critical Risk', color: 'red' }
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

                {/* Submission Type Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Submission Type</Label>
                  <div className="space-y-2">
                    {[
                      { value: 'vendor', label: 'Vendor', icon: <Building className="h-4 w-4" /> },
                      { value: 'internal', label: 'Internal', icon: <User className="h-4 w-4" /> }
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

                {/* Date Range Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date Range</Label>
                  <Select value={filters.dateRange} onValueChange={(value) => updateFilter('dateRange', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last 90 Days</SelectItem>
                      <SelectItem value="1y">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Options */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Sort By</Label>
                  <div className="flex gap-2">
                    <Select value={filters.sortBy} onValueChange={(value: any) => updateFilter('sortBy', value)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
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
                      className="px-3"
                    >
                      {filters.sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {activeFiltersCount > 0 && `${activeFiltersCount} active filter${activeFiltersCount > 1 ? 's' : ''}`}
                </div>
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 overflow-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[calc(100vh-400px)] p-2 sm:p-3 lg:p-4">
        {sortedSubmissions.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500">
            <Filter className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-xs sm:text-sm">No submissions found</p>
            {activeFiltersCount > 0 && (
              <Button variant="link" size="sm" onClick={clearAllFilters} className="mt-2">
                Clear filters to see all submissions
              </Button>
            )}
          </div>
        ) : (
          sortedSubmissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              form={form}
              isSelected={selectedSubmission === submission.id}
              onClick={() => onSelectSubmission(submission.id)}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};