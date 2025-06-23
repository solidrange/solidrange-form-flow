
import React from 'react';
import { Form } from '@/types/form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Calendar, Users, FileText } from 'lucide-react';

/**
 * Props for the FormDetails component
 */
interface FormDetailsProps {
  /** The form to display details for */
  form: Form;
  /** Callback function when the close button is clicked */
  onClose: () => void;
}

/**
 * FormDetails component displays detailed information about a selected form
 * including its fields, settings, and submission statistics
 */
export function FormDetails({ form, onClose }: FormDetailsProps) {
  /**
   * Formats a date to a readable string
   * @param date - The date to format
   * @returns Formatted date string
   */
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header with title and close button */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{form.title}</h2>
          <p className="text-sm text-gray-500 mt-1">{form.description}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        {/* Form overview section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={getStatusVariant(form.status)}>
                {form.status}
              </Badge>
            </CardContent>
          </Card>

          {/* Submissions count card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <Users className="h-4 w-4" />
                Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{form.submissions.length}</div>
            </CardContent>
          </Card>

          {/* Fields count card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Fields
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{form.fields.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Form metadata section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Form Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Created</label>
                <p className="text-sm text-gray-900">{formatDate(form.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Last Updated</label>
                <p className="text-sm text-gray-900">{formatDate(form.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form fields section */}
        <Card>
          <CardHeader>
            <CardTitle>Form Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {form.fields.map((field, index) => (
                <div key={field.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div>
                    <div className="font-medium text-sm">{field.label}</div>
                    <div className="text-xs text-gray-500 capitalize">{field.type}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {field.required && (
                      <Badge variant="outline" className="text-xs">Required</Badge>
                    )}
                    <span className="text-xs text-gray-400">#{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form settings overview */}
        <Card>
          <CardHeader>
            <CardTitle>Settings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="font-medium text-gray-500">Multiple Submissions</label>
                <p className="text-gray-900">
                  {form.settings.allowMultipleSubmissions ? 'Allowed' : 'Not Allowed'}
                </p>
              </div>
              <div>
                <label className="font-medium text-gray-500">Login Required</label>
                <p className="text-gray-900">
                  {form.settings.requireLogin ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <label className="font-medium text-gray-500">Progress Bar</label>
                <p className="text-gray-900">
                  {form.settings.showProgressBar ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <div>
                <label className="font-medium text-gray-500">Theme</label>
                <p className="text-gray-900 capitalize">{form.settings.theme}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent submissions */}
        {form.submissions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {form.submissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <div className="text-sm font-medium">{submission.submitterName}</div>
                      <div className="text-xs text-gray-500">{submission.submitterEmail}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {submission.status}
                      </Badge>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatDate(submission.submittedAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
