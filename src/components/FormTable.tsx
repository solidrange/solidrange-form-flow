
import React from 'react';
import { Form } from '@/types/form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Settings, Eye } from 'lucide-react';

/**
 * Props for the FormTable component
 */
interface FormTableProps {
  /** Array of forms to display in the table */
  forms: Form[];
  /** Callback function when a form is selected for viewing */
  onFormSelect: (formId: string) => void;
  /** Callback function when settings button is clicked for a form */
  onSettingsClick: (form: Form) => void;
}

/**
 * FormTable component displays a list of forms in a table format
 * with options to view details and configure settings
 */
export function FormTable({ forms, onFormSelect, onSettingsClick }: FormTableProps) {
  /**
   * Formats a date to a readable string
   * @param date - The date to format
   * @returns Formatted date string
   */
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  /**
   * Returns the appropriate badge variant for form status
   * @param status - The form status
   * @returns Badge variant
   */
  const getStatusVariant = (status: string) => {
    return status === 'published' ? 'default' : 'secondary';
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Table header with title */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Forms</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage and view your forms
        </p>
      </div>
      
      {/* Forms table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submissions</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form) => (
            <TableRow key={form.id} className="hover:bg-gray-50">
              {/* Form title and description */}
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">{form.title}</div>
                  <div className="text-sm text-gray-500">{form.description}</div>
                </div>
              </TableCell>
              
              {/* Form status badge */}
              <TableCell>
                <Badge variant={getStatusVariant(form.status)}>
                  {form.status}
                </Badge>
              </TableCell>
              
              {/* Number of submissions */}
              <TableCell>
                <span className="text-sm text-gray-900">
                  {form.submissions.length}
                </span>
              </TableCell>
              
              {/* Created date */}
              <TableCell>
                <span className="text-sm text-gray-500">
                  {formatDate(form.createdAt)}
                </span>
              </TableCell>
              
              {/* Updated date */}
              <TableCell>
                <span className="text-sm text-gray-500">
                  {formatDate(form.updatedAt)}
                </span>
              </TableCell>
              
              {/* Action buttons */}
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  {/* View form details button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onFormSelect(form.id)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-3 w-3" />
                    View
                  </Button>
                  
                  {/* Settings button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSettingsClick(form)}
                    className="flex items-center gap-1"
                  >
                    <Settings className="h-3 w-3" />
                    Settings
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Empty state when no forms exist */}
      {forms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No forms found</p>
        </div>
      )}
    </div>
  );
}
