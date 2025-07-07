import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Form, FormField, FormTemplate } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = '/api/forms'; // Would be a real API endpoint in production

  constructor(private http: HttpClient) {}

  getForms(): Observable<Form[]> {
    // In a real app, this would be an HTTP request
    return of([
      {
        id: '1',
        title: 'Vendor Risk Assessment',
        description: 'Evaluate vendor security and compliance posture',
        fields: [],
        settings: {
          allowMultipleSubmissions: false,
          requireLogin: true,
          showProgressBar: true,
          theme: 'light'
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'published',
        submissions: 24,
        analytics: {
          views: 56,
          submissions: 24,
          completionRate: 75,
          emailsSent: 40,
          emailsCompleted: 30,
          averageCompletionTime: 15,
          dropoffRate: 25
        }
      },
      {
        id: '2',
        title: 'Employee Onboarding',
        description: 'New employee information collection',
        fields: [],
        settings: {
          allowMultipleSubmissions: false,
          requireLogin: false,
          showProgressBar: true,
          theme: 'light'
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
        submissions: 0,
        analytics: {
          views: 0,
          submissions: 0,
          completionRate: 0,
          emailsSent: 0,
          emailsCompleted: 0,
          averageCompletionTime: 0,
          dropoffRate: 0
        }
      }
    ]);
  }

  getForm(id: string): Observable<Form> {
    // In a real app, this would be an HTTP request
    return of({
      id,
      title: 'Vendor Risk Assessment',
      description: 'Evaluate vendor security and compliance posture',
      fields: [
        {
          id: '1',
          type: 'text',
          label: 'Company Name',
          required: true,
          placeholder: 'Enter company name'
        },
        {
          id: '2',
          type: 'email',
          label: 'Contact Email',
          required: true,
          placeholder: 'Enter contact email'
        },
        {
          id: '3',
          type: 'select',
          label: 'Industry',
          required: true,
          options: ['Technology', 'Finance', 'Healthcare', 'Retail', 'Other']
        }
      ],
      settings: {
        allowMultipleSubmissions: false,
        requireLogin: true,
        showProgressBar: true,
        theme: 'light',
        scoring: {
          enabled: true,
          maxTotalPoints: 100,
          showScoreToUser: false,
          passingScore: 70,
          riskThresholds: {
            low: 80,
            medium: 60,
            high: 40
          }
        }
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'published',
      submissions: 24,
      analytics: {
        views: 56,
        submissions: 24,
        completionRate: 75,
        emailsSent: 40,
        emailsCompleted: 30,
        averageCompletionTime: 15,
        dropoffRate: 25
      }
    });
  }

  saveForm(form: Form): Observable<Form> {
    // In a real app, this would be an HTTP request
    return of({
      ...form,
      updatedAt: new Date()
    });
  }

  publishForm(form: Form): Observable<Form> {
    // In a real app, this would be an HTTP request
    return of({
      ...form,
      status: 'published',
      updatedAt: new Date()
    });
  }

  moveToDraft(form: Form): Observable<Form> {
    // In a real app, this would be an HTTP request
    return of({
      ...form,
      status: 'draft',
      updatedAt: new Date()
    });
  }

  deleteForm(id: string): Observable<void> {
    // In a real app, this would be an HTTP request
    return of(undefined);
  }

  getTemplates(): Observable<FormTemplate[]> {
    // In a real app, this would be an HTTP request
    return of([
      {
        id: '1',
        name: 'Vendor Risk Assessment',
        description: 'Comprehensive vendor security and compliance evaluation',
        category: 'vendor-risk',
        sector: 'all',
        targetAudience: ['vendor'],
        fields: []
      },
      {
        id: '2',
        name: 'Employee Onboarding',
        description: 'New employee information collection',
        category: 'hr',
        sector: 'all',
        targetAudience: ['internal'],
        fields: []
      },
      {
        id: '3',
        name: 'Customer Feedback',
        description: 'Collect customer feedback on products and services',
        category: 'feedback',
        sector: 'all',
        targetAudience: ['external'],
        fields: []
      }
    ]);
  }
}