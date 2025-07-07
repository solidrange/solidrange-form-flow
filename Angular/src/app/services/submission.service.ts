import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FormSubmission } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiUrl = '/api/submissions'; // Would be a real API endpoint in production

  constructor(private http: HttpClient) {}

  getSubmissions(filters?: any): Observable<FormSubmission[]> {
    // In a real app, this would be an HTTP request with query params
    return of([
      {
        id: '1',
        formId: 'form-1',
        submittedBy: 'John Doe',
        submitterEmail: 'john.doe@example.com',
        submitterName: 'John Doe',
        companyName: 'Acme Corp',
        submissionType: 'vendor',
        submittedAt: new Date(),
        status: 'approved',
        approvalType: 'fully',
        responses: {
          company_name: 'Acme Corp',
          contact_email: 'john.doe@example.com',
          industry: 'Technology'
        },
        score: {
          total: 85,
          maxTotal: 100,
          percentage: 85,
          riskLevel: 'low',
          reviewedBy: 'Jane Smith',
          reviewedAt: new Date(),
          reviewComments: 'Good vendor with strong security practices.'
        },
        activityLog: [
          {
            id: '1',
            action: 'approved',
            comments: 'Approved based on strong security posture.',
            reviewedBy: 'Jane Smith',
            reviewedAt: new Date()
          }
        ]
      },
      {
        id: '2',
        formId: 'form-1',
        submittedBy: 'Alice Johnson',
        submitterEmail: 'alice@example.com',
        submitterName: 'Alice Johnson',
        companyName: 'Tech Solutions',
        submissionType: 'vendor',
        submittedAt: new Date(),
        status: 'under_review',
        responses: {
          company_name: 'Tech Solutions',
          contact_email: 'alice@example.com',
          industry: 'Technology'
        },
        score: {
          total: 65,
          maxTotal: 100,
          percentage: 65,
          riskLevel: 'medium',
          reviewedBy: 'System',
          reviewedAt: new Date(),
          reviewComments: 'Pending final review.'
        },
        activityLog: [
          {
            id: '2',
            action: 'under_review',
            comments: 'Initial review completed, awaiting final approval.',
            reviewedBy: 'System',
            reviewedAt: new Date()
          }
        ]
      }
    ]);
  }

  getSubmission(id: string): Observable<FormSubmission> {
    // In a real app, this would be an HTTP request
    return of({
      id,
      formId: 'form-1',
      submittedBy: 'John Doe',
      submitterEmail: 'john.doe@example.com',
      submitterName: 'John Doe',
      companyName: 'Acme Corp',
      submissionType: 'vendor',
      submittedAt: new Date(),
      status: 'approved',
      approvalType: 'fully',
      responses: {
        company_name: 'Acme Corp',
        contact_email: 'john.doe@example.com',
        industry: 'Technology'
      },
      score: {
        total: 85,
        maxTotal: 100,
        percentage: 85,
        riskLevel: 'low',
        reviewedBy: 'Jane Smith',
        reviewedAt: new Date(),
        reviewComments: 'Good vendor with strong security practices.'
      },
      activityLog: [
        {
          id: '1',
          action: 'approved',
          comments: 'Approved based on strong security posture.',
          reviewedBy: 'Jane Smith',
          reviewedAt: new Date()
        }
      ]
    });
  }

  updateSubmission(id: string, updates: Partial<FormSubmission>): Observable<FormSubmission> {
    // In a real app, this would be an HTTP request
    return of({
      id,
      formId: 'form-1',
      submittedBy: 'John Doe',
      submitterEmail: 'john.doe@example.com',
      submitterName: 'John Doe',
      companyName: 'Acme Corp',
      submissionType: 'vendor',
      submittedAt: new Date(),
      ...updates,
      responses: {
        company_name: 'Acme Corp',
        contact_email: 'john.doe@example.com',
        industry: 'Technology'
      },
      activityLog: [
        {
          id: '1',
          action: 'approved',
          comments: 'Approved based on strong security posture.',
          reviewedBy: 'Jane Smith',
          reviewedAt: new Date()
        }
      ]
    });
  }
}