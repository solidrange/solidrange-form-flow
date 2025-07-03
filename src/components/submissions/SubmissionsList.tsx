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
  onSelectSubmission: (submissionId: string) => void;
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
  onSelectSubmission
}: SubmissionsListProps) => {

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
        <CardTitle className="text-xs sm:text-sm lg:text-base leading-tight">
          Submissions ({submissions.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 overflow-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[calc(100vh-200px)] p-2 sm:p-3 lg:p-4">
        {submissions.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500">
            <Filter className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-xs sm:text-sm">No submissions found</p>
          </div>
        ) : (
          submissions.map((submission) => (
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