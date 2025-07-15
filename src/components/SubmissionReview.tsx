import { useState, useEffect, useMemo } from "react";
import { FormSubmission, Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Building,
  User,
  Calendar,
  Shield,
  Award,
  Eye,
  Download,
  Users,
  X
} from "lucide-react";
import { SubmissionsList } from "./submissions/SubmissionsList";
import { SubmissionDetails } from "./submissions/SubmissionDetails";
import { AdvancedSubmissionFilters } from "./submissions/AdvancedSubmissionFilters";
import { BulkActions } from "./submissions/BulkActions";

interface SubmissionReviewProps {
  submissions: FormSubmission[];
  form: Form;
  onUpdateSubmission: (submissionId: string, updates: any) => void;
  onResendForm: (submissionId: string, comments: string) => void;
}

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

export const SubmissionReview = ({ 
  submissions, 
  form, 
  onUpdateSubmission,
  onResendForm
}: SubmissionReviewProps) => {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    status: [],
    approvalType: [],
    riskLevel: [],
    submissionType: [],
    dateRange: {
      start: null,
      end: null
    },
    scoreRange: {
      min: 0,
      max: 100
    },
    company: '',
    submitter: '',
    sortBy: 'date',
    sortOrder: 'desc',
    timeSpentRange: {
      min: 0,
      max: 3600
    },
    hasDocuments: null
  });

  
  // Listen for custom events from dashboard
  useEffect(() => {
    const handleSetFilter = (event: CustomEvent) => {
      const { detail } = event;
      if (detail.status) {
        setFilters(prev => ({ ...prev, status: detail.status }));
      }
      if (detail.riskLevel) {
        setFilters(prev => ({ ...prev, riskLevel: detail.riskLevel }));
      }
    };

    const handleSelectSubmission = (event: CustomEvent) => {
      const { detail } = event;
      if (detail.submissionId) {
        setSelectedSubmission(detail.submissionId);
      }
    };

    window.addEventListener('setSubmissionFilter', handleSetFilter as EventListener);
    window.addEventListener('selectSubmission', handleSelectSubmission as EventListener);

    return () => {
      window.removeEventListener('setSubmissionFilter', handleSetFilter as EventListener);
      window.removeEventListener('selectSubmission', handleSelectSubmission as EventListener);
    };
  }, []);

  // Filter and sort submissions
  const filteredSubmissions = useMemo(() => {
    let filtered = submissions.filter(submission => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          submission.companyName?.toLowerCase().includes(searchLower) ||
          submission.submitterName?.toLowerCase().includes(searchLower) ||
          submission.submitterEmail.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(submission.status)) {
        return false;
      }

      // Approval type filter
      if (filters.approvalType.length > 0 && submission.approvalType) {
        if (!filters.approvalType.includes(submission.approvalType)) {
          return false;
        }
      }

      // Risk level filter
      if (filters.riskLevel.length > 0 && submission.score?.riskLevel) {
        if (!filters.riskLevel.includes(submission.score.riskLevel)) {
          return false;
        }
      }

      // Submission type filter
      if (filters.submissionType.length > 0 && !filters.submissionType.includes(submission.submissionType)) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.start && submission.submittedAt < filters.dateRange.start) {
        return false;
      }
      if (filters.dateRange.end && submission.submittedAt > filters.dateRange.end) {
        return false;
      }

      // Score range filter
      if (submission.score) {
        if (submission.score.percentage < filters.scoreRange.min || 
            submission.score.percentage > filters.scoreRange.max) {
          return false;
        }
      }

      // Time spent filter
      if (submission.timeSpent) {
        if (submission.timeSpent < filters.timeSpentRange.min || 
            submission.timeSpent > filters.timeSpentRange.max) {
          return false;
        }
      }

      // Company filter
      if (filters.company && submission.companyName) {
        if (!submission.companyName.toLowerCase().includes(filters.company.toLowerCase())) {
          return false;
        }
      }

      // Submitter filter
      if (filters.submitter && submission.submitterName) {
        if (!submission.submitterName.toLowerCase().includes(filters.submitter.toLowerCase())) {
          return false;
        }
      }

      // Documents filter
      if (filters.hasDocuments !== null) {
        const hasDocuments = submission.documents && submission.documents.length > 0;
        if (filters.hasDocuments && !hasDocuments) return false;
        if (!filters.hasDocuments && hasDocuments) return false;
      }

      return true;
    });

    // Sort submissions
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'date':
          aValue = a.submittedAt.getTime();
          bValue = b.submittedAt.getTime();
          break;
        case 'score':
          aValue = a.score?.percentage || 0;
          bValue = b.score?.percentage || 0;
          break;
        case 'company':
          aValue = a.companyName || '';
          bValue = b.companyName || '';
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'risk':
          const riskOrder = { low: 1, medium: 2, high: 3, critical: 4 };
          aValue = riskOrder[a.score?.riskLevel as keyof typeof riskOrder] || 0;
          bValue = riskOrder[b.score?.riskLevel as keyof typeof riskOrder] || 0;
          break;
        default:
          aValue = a.submittedAt.getTime();
          bValue = b.submittedAt.getTime();
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [submissions, filters]);

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      status: [],
      approvalType: [],
      riskLevel: [],
      submissionType: [],
      dateRange: {
        start: null,
        end: null
      },
      scoreRange: {
        min: 0,
        max: 100
      },
      company: '',
      submitter: '',
      sortBy: 'date',
      sortOrder: 'desc',
      timeSpentRange: {
        min: 0,
        max: 3600
      },
      hasDocuments: null
    });
  };

  // Stats calculation
  const stats = useMemo(() => {
    const total = filteredSubmissions.length;
    const pending = filteredSubmissions.filter(s => s.status === 'submitted').length;
    const underReview = filteredSubmissions.filter(s => s.status === 'under_review').length;
    const approved = filteredSubmissions.filter(s => s.status === 'approved').length;
    const rejected = filteredSubmissions.filter(s => s.status === 'rejected').length;
    
    const avgScore = filteredSubmissions.length > 0 
      ? Math.round(filteredSubmissions.reduce((sum, s) => sum + (s.score?.percentage || 0), 0) / filteredSubmissions.length)
      : 0;

    const riskDistribution = {
      low: filteredSubmissions.filter(s => s.score?.riskLevel === 'low').length,
      medium: filteredSubmissions.filter(s => s.score?.riskLevel === 'medium').length,
      high: filteredSubmissions.filter(s => s.score?.riskLevel === 'high').length,
      critical: filteredSubmissions.filter(s => s.score?.riskLevel === 'critical').length
    };

    return {
      total,
      pending,
      underReview,
      approved,
      rejected,
      avgScore,
      riskDistribution
    };
  }, [filteredSubmissions]);

  const selectedSubmissionData = selectedSubmission 
    ? filteredSubmissions.find(s => s.id === selectedSubmission)
    : null;

  const handleBulkUpdate = (submissionIds: string[], updates: any) => {
    submissionIds.forEach(id => {
      onUpdateSubmission(id, updates);
    });
    setSelectedSubmissions([]);
    setShowBulkActions(false);
  };

  const handleBulkDelete = (submissionIds: string[]) => {
    // In a real app, this would delete from the database
    console.log('Deleting submissions:', submissionIds);
    setSelectedSubmissions([]);
    setShowBulkActions(false);
  };

  const handleSelectSubmission = (submissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedSubmissions(prev => [...prev, submissionId]);
    } else {
      setSelectedSubmissions(prev => prev.filter(id => id !== submissionId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubmissions(filteredSubmissions.map(sub => sub.id));
    } else {
      setSelectedSubmissions([]);
    }
  };

  const isAllSelected = filteredSubmissions.length > 0 && 
    selectedSubmissions.length === filteredSubmissions.length;
  const isPartiallySelected = selectedSubmissions.length > 0 && 
    selectedSubmissions.length < filteredSubmissions.length;

  if (showBulkActions) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Bulk Actions</h1>
            <p className="text-gray-600">Manage multiple submissions at once</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setShowBulkActions(false)}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
        </div>
        
        <BulkActions
          selectedSubmissions={selectedSubmissions}
          submissions={filteredSubmissions}
          onBulkUpdate={handleBulkUpdate}
          onBulkDelete={handleBulkDelete}
          onClose={() => setShowBulkActions(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Submission Review</h1>
          <p className="text-gray-600">Review and manage form submissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowBulkActions(true)}
            disabled={selectedSubmissions.length === 0}
          >
            <Users className="h-4 w-4 mr-2" />
            Bulk Actions ({selectedSubmissions.length})
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-blue-600">{stats.underReview}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold">{stats.avgScore}%</p>
              </div>
              <Award className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters */}
      <AdvancedSubmissionFilters
        filters={filters}
        onFiltersChange={setFilters}
        onReset={resetFilters}
        submissionCount={submissions.length}
        filteredCount={filteredSubmissions.length}
      />

      {/* Bulk Selection Controls */}
      {filteredSubmissions.length > 0 && (
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={handleSelectAll}
                  className={isPartiallySelected ? "data-[state=checked]:bg-primary/50" : ""}
                />
                <span className="text-sm">
                  {selectedSubmissions.length === 0 
                    ? "Select submissions" 
                    : `${selectedSubmissions.length} of ${filteredSubmissions.length} selected`}
                </span>
              </div>
              {selectedSubmissions.length > 0 && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setSelectedSubmissions([])}
                  >
                    Clear Selection
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setShowBulkActions(true)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Bulk Actions
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SubmissionsList
            submissions={filteredSubmissions}
            form={form}
            selectedSubmission={selectedSubmission}
            selectedSubmissions={selectedSubmissions}
            onSelectSubmission={setSelectedSubmission}
            onSelectForBulk={handleSelectSubmission}
          />
        </div>
        
        <div className="lg:col-span-2">
          {selectedSubmissionData ? (
            <SubmissionDetails
              submission={selectedSubmissionData}
              form={form}
              onUpdateSubmission={onUpdateSubmission}
              onResendForm={onResendForm}
            />
          ) : (
            <Card className="h-full">
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select a submission to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
