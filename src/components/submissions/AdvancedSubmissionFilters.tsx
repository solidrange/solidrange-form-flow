
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon,
  ChevronDown,
  X,
  SortAsc,
  SortDesc,
  Building,
  User,
  Shield,
  Clock,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FilterState {
  searchTerm: string;
  status: string[];
  approvalType: string[];
  riskLevel: string[];
  submissionType: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  scoreRange: {
    min: number;
    max: number;
  };
  company: string;
  submitter: string;
  sortBy: 'date' | 'score' | 'company' | 'status' | 'risk';
  sortOrder: 'asc' | 'desc';
  timeSpentRange: {
    min: number;
    max: number;
  };
  hasDocuments: boolean | null;
}

interface AdvancedSubmissionFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onReset: () => void;
  submissionCount: number;
  filteredCount: number;
}

export const AdvancedSubmissionFilters = ({
  filters,
  onFiltersChange,
  onReset,
  submissionCount,
  filteredCount
}: AdvancedSubmissionFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const updateArrayFilter = (key: keyof FilterState, value: string, checked: boolean) => {
    const currentArray = filters[key] as string[];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    onFiltersChange({ ...filters, [key]: newArray });
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'searchTerm' || key === 'company' || key === 'submitter') return value !== '';
    if (key === 'status' || key === 'approvalType' || key === 'riskLevel' || key === 'submissionType') 
      return (value as string[]).length > 0;
    if (key === 'dateRange') return (value as any).start || (value as any).end;
    if (key === 'scoreRange') return (value as any).min > 0 || (value as any).max < 100;
    if (key === 'timeSpentRange') return (value as any).min > 0 || (value as any).max < 3600;
    if (key === 'hasDocuments') return value !== null;
    return false;
  }).length;

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount} active</Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {filteredCount} of {submissionCount} submissions
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Quick Search */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search submissions..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="score">Score</SelectItem>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="risk">Risk Level</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {filters.sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent className="space-y-6">
            {/* Status and Type Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Status</Label>
                <div className="space-y-2">
                  {['submitted', 'under_review', 'approved', 'rejected'].map(status => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={status}
                        checked={filters.status.includes(status)}
                        onCheckedChange={(checked) => updateArrayFilter('status', status, !!checked)}
                      />
                      <Label htmlFor={status} className="text-sm capitalize">
                        {status.replace('_', ' ')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Submission Type</Label>
                <div className="space-y-2">
                  {['vendor', 'internal', 'external'].map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={filters.submissionType.includes(type)}
                        onCheckedChange={(checked) => updateArrayFilter('submissionType', type, !!checked)}
                      />
                      <Label htmlFor={type} className="text-sm capitalize">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Risk Level</Label>
                <div className="space-y-2">
                  {['low', 'medium', 'high', 'critical'].map(risk => (
                    <div key={risk} className="flex items-center space-x-2">
                      <Checkbox
                        id={risk}
                        checked={filters.riskLevel.includes(risk)}
                        onCheckedChange={(checked) => updateArrayFilter('riskLevel', risk, !!checked)}
                      />
                      <Label htmlFor={risk} className="text-sm capitalize">
                        {risk}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Approval Type</Label>
                <div className="space-y-2">
                  {['fully', 'partially'].map(approval => (
                    <div key={approval} className="flex items-center space-x-2">
                      <Checkbox
                        id={approval}
                        checked={filters.approvalType.includes(approval)}
                        onCheckedChange={(checked) => updateArrayFilter('approvalType', approval, !!checked)}
                      />
                      <Label htmlFor={approval} className="text-sm capitalize">
                        {approval}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Date Range</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange.start ? format(filters.dateRange.start, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.start || undefined}
                        onSelect={(date) => updateFilter('dateRange', { ...filters.dateRange, start: date })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange.end ? format(filters.dateRange.end, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={filters.dateRange.end || undefined}
                        onSelect={(date) => updateFilter('dateRange', { ...filters.dateRange, end: date })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Score Range */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Score Range: {filters.scoreRange.min}% - {filters.scoreRange.max}%
              </Label>
              <Slider
                value={[filters.scoreRange.min, filters.scoreRange.max]}
                onValueChange={([min, max]) => updateFilter('scoreRange', { min, max })}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            {/* Time Spent Range */}
            <div>
              <Label className="text-sm font-medium mb-2 block">
                Time Spent: {Math.floor(filters.timeSpentRange.min / 60)}min - {Math.floor(filters.timeSpentRange.max / 60)}min
              </Label>
              <Slider
                value={[filters.timeSpentRange.min, filters.timeSpentRange.max]}
                onValueChange={([min, max]) => updateFilter('timeSpentRange', { min, max })}
                max={3600}
                min={0}
                step={60}
                className="w-full"
              />
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="company-filter" className="text-sm font-medium mb-2 block">Company</Label>
                <div className="relative">
                  <Building className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company-filter"
                    placeholder="Filter by company..."
                    value={filters.company}
                    onChange={(e) => updateFilter('company', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="submitter-filter" className="text-sm font-medium mb-2 block">Submitter</Label>
                <div className="relative">
                  <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="submitter-filter"
                    placeholder="Filter by submitter..."
                    value={filters.submitter}
                    onChange={(e) => updateFilter('submitter', e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Documents</Label>
                <Select 
                  value={filters.hasDocuments === null ? 'all' : filters.hasDocuments ? 'yes' : 'no'} 
                  onValueChange={(value) => updateFilter('hasDocuments', value === 'all' ? null : value === 'yes')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="yes">With Documents</SelectItem>
                    <SelectItem value="no">Without Documents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
