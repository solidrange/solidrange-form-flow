import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Download } from 'lucide-react';

interface MarkdownViewerProps {
  filename: string;
}

// Sample markdown content for each file (in production, these would be fetched from actual files)
const markdownContent: Record<string, string> = {
  'BRD_DOCUMENT.md': `# Business Requirements Document (BRD)
## SolidForm - Enterprise Form Builder & Submission Management System

### Executive Summary

SolidForm is a comprehensive enterprise-grade form builder and submission management system designed to revolutionize how organizations create, distribute, and manage digital forms. The current React implementation features an extensive template library with over 169 industry-specific templates and advanced AI-powered review capabilities.

### Current System Capabilities

- **Advanced Form Builder**: Drag-and-drop interface with 20+ field types
- **Template Library**: 169 industry-specific templates across multiple sectors
- **AI Review System**: Intelligent scoring and evaluation algorithms
- **Analytics Dashboard**: Comprehensive reporting and data visualization
- **Multi-language Support**: RTL and LTR language compatibility

### Business Objectives

\`\`\`mermaid
graph TD
    A[Digital Transformation] --> B[Operational Efficiency]
    A --> C[Data Quality Enhancement]
    A --> D[User Experience Leadership]
    B --> E[Process Automation]
    C --> F[Standardized Data Collection]
    D --> G[Intuitive Interface Design]
\`\`\`

### Key Features

1. **Form Creation & Management**
   - Visual form builder with real-time preview
   - Industry-specific templates
   - Custom field validation rules
   - Multi-step form support

2. **Distribution & Communication**
   - Email campaign management
   - Automated notifications
   - Custom branding options
   - Multiple distribution channels

3. **AI-Enhanced Review**
   - Automated scoring algorithms
   - Intelligent submission categorization
   - Quality assessment metrics
   - Compliance checking

### Success Metrics

- **User Adoption**: 95% user satisfaction rate
- **Efficiency**: 75% reduction in form processing time
- **ROI**: 300% return on investment within first year
- **Compliance**: 100% adherence to data protection standards`,

  'SRS_DOCUMENT.md': `# Software Requirements Specification (SRS)
## SolidForm v1.0.0

### System Architecture

\`\`\`mermaid
graph TB
    UI[User Interface Layer]
    APP[Application Layer]
    DATA[Data Layer]
    
    UI --> |React Components| APP
    APP --> |State Management| DATA
    DATA --> |Local Storage| DB[(Database)]
    
    subgraph "Frontend Stack"
        UI
        APP
        DATA
    end
    
    subgraph "External Services"
        EMAIL[Email Service]
        ANALYTICS[Analytics]
        AI[AI Processing]
    end
    
    APP --> EMAIL
    APP --> ANALYTICS
    APP --> AI
\`\`\`

### Technical Requirements

#### Frontend Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Shadcn/UI with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Query + Context API
- **Form Handling**: React Hook Form with Zod validation

#### Performance Requirements
- Initial page load: < 2 seconds
- Form submission: < 500ms response time
- Template loading: < 1 second
- Real-time preview updates: < 100ms

#### Security Requirements
- Data encryption at rest and in transit
- Input validation and sanitization
- CSRF protection
- XSS prevention
- Regular security audits

### Component Architecture

\`\`\`mermaid
graph LR
    APP[App.tsx] --> SIDEBAR[AppSidebar]
    APP --> MAIN[Main Content]
    
    MAIN --> DASHBOARD[Dashboard]
    MAIN --> FORMS[Form Library]
    MAIN --> BUILDER[Form Builder]
    MAIN --> REVIEW[Submission Review]
    MAIN --> SETTINGS[Global Settings]
    
    BUILDER --> CANVAS[Form Canvas]
    BUILDER --> PALETTE[Field Palette]
    BUILDER --> PREVIEW[Form Preview]
    
    FORMS --> TEMPLATES[Template Gallery]
    FORMS --> MANAGEMENT[Form Management]
    
    REVIEW --> SUBMISSIONS[Submission List]
    REVIEW --> DETAILS[Submission Details]
    REVIEW --> SCORING[AI Scoring]
\`\`\`

### Data Requirements

#### Form Structure
- Form metadata (title, description, category)
- Field definitions with validation rules
- Styling and layout configurations
- Submission handling settings

#### Template System
- Industry categorization
- Template versioning
- Custom template creation
- Template sharing capabilities

#### Submission Processing
- Real-time validation
- File attachment handling
- Automated scoring
- Audit trail maintenance`,

  'COMPREHENSIVE_SYSTEM_OVERVIEW.md': `# Comprehensive System Overview
## SolidForm Enterprise Platform

### System Architecture Overview

\`\`\`mermaid
graph TB
    subgraph "User Interfaces"
        WEB[Web Application]
        MOBILE[Mobile Interface]
        EMAIL[Email Templates]
    end
    
    subgraph "Application Core"
        BUILDER[Form Builder Engine]
        LIBRARY[Template Library]
        REVIEW[Review System]
        ANALYTICS[Analytics Engine]
        EMAIL_MGR[Email Management]
    end
    
    subgraph "Data Management"
        LOCAL[Local Storage]
        TEMPLATE[Template Storage]
        SUBMISSION[Submission Data]
        ANALYTICS_DATA[Analytics Storage]
    end
    
    subgraph "AI & Processing"
        AI_SCORE[AI Scoring Engine]
        WORKFLOW[Workflow Processor]
        REPORT[Report Generator]
    end
    
    WEB --> BUILDER
    MOBILE --> LIBRARY
    EMAIL --> EMAIL_MGR
    
    BUILDER --> LOCAL
    LIBRARY --> TEMPLATE
    REVIEW --> SUBMISSION
    ANALYTICS --> ANALYTICS_DATA
    
    REVIEW --> AI_SCORE
    EMAIL_MGR --> WORKFLOW
    ANALYTICS --> REPORT
\`\`\`

### Technology Stack Breakdown

#### Frontend Architecture
- **React 18**: Component-based UI development
- **TypeScript**: Type-safe development environment
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first styling framework
- **Shadcn/UI**: Modern component library

#### State Management
- **React Query**: Server state management and caching
- **React Hook Form**: Performant form handling
- **Context API**: Global application state
- **Zod**: Runtime type validation

### Performance Metrics

\`\`\`mermaid
pie title Performance Distribution
    "Initial Load" : 15
    "Form Rendering" : 25
    "Data Processing" : 20
    "UI Interactions" : 30
    "Network Requests" : 10
\`\`\`

### Component Deep Dive

#### Form Builder System
\`\`\`mermaid
stateDiagram-v2
    [*] --> EmptyCanvas
    EmptyCanvas --> AddingFields
    AddingFields --> ConfiguringField
    ConfiguringField --> AddingFields
    AddingFields --> PreviewMode
    PreviewMode --> AddingFields
    AddingFields --> SaveForm
    SaveForm --> [*]
\`\`\`

### Security Architecture

\`\`\`mermaid
graph TD
    INPUT[Input Layer] --> |Validation| FILTER[Security Filter]
    FILTER --> |Sanitization| APP[Application Layer]
    APP --> |Encryption| DATA[Data Layer]
    DATA --> |Secure Storage| STORAGE[Storage Layer]
    
    FILTER --> |Threat Detection| MONITOR[Security Monitor]
    MONITOR --> |Alerts| ADMIN[Admin Dashboard]
\`\`\`

### Integration Capabilities

- **Email Services**: SMTP, SendGrid, Mailgun integration
- **Storage Services**: Cloud storage for file attachments
- **Analytics Services**: Custom analytics and reporting
- **Enterprise Systems**: SSO, LDAP, and API integrations`,

  'API_DOCUMENTATION.md': `# API Documentation
## SolidForm REST API v1.0

### Base URL
\`\`\`
https://api.solidform.com/v1
\`\`\`

### Authentication
All API requests require authentication using Bearer tokens.

\`\`\`http
Authorization: Bearer <your-access-token>
Content-Type: application/json
\`\`\`

### API Endpoints Overview

\`\`\`mermaid
graph LR
    CLIENT[Client Application] --> AUTH[Authentication]
    CLIENT --> FORMS[Forms API]
    CLIENT --> TEMPLATES[Templates API]
    CLIENT --> SUBMISSIONS[Submissions API]
    CLIENT --> ANALYTICS[Analytics API]
    
    AUTH --> |JWT Token| FORMS
    FORMS --> |CRUD Operations| DB[(Database)]
    TEMPLATES --> |Template Data| DB
    SUBMISSIONS --> |Submission Data| DB
    ANALYTICS --> |Reports| DB
\`\`\`

### Forms Management

#### Create Form
\`\`\`http
POST /forms
Content-Type: application/json

{
  "title": "Customer Feedback Form",
  "description": "Collect customer feedback and suggestions",
  "category": "customer-service",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "validation": {
        "minLength": 2,
        "maxLength": 50
      }
    }
  ],
  "settings": {
    "allowMultipleSubmissions": false,
    "requireAuthentication": true,
    "notificationEmail": "admin@company.com"
  }
}
\`\`\`

#### Response
\`\`\`json
{
  "id": "form_123456",
  "title": "Customer Feedback Form",
  "status": "draft",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z",
  "url": "https://forms.solidform.com/f/form_123456"
}
\`\`\`

### Template Management

#### Get Templates
\`\`\`http
GET /templates?category=healthcare&limit=20&offset=0
\`\`\`

#### Response
\`\`\`json
{
  "templates": [
    {
      "id": "template_001",
      "title": "Patient Registration Form",
      "category": "healthcare",
      "description": "Comprehensive patient intake form",
      "fields": [...],
      "popularity": 95,
      "lastUpdated": "2024-01-10T08:00:00Z"
    }
  ],
  "total": 169,
  "page": 1,
  "totalPages": 9
}
\`\`\`

### Submission Processing

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant AI
    participant Database
    
    User->>Frontend: Submit Form
    Frontend->>API: POST /submissions
    API->>Database: Store Submission
    API->>AI: Process for Scoring
    AI->>Database: Store Score
    API->>Frontend: Return Submission ID
    Frontend->>User: Show Confirmation
\`\`\`

### Error Handling

#### Standard Error Response
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
\`\`\`

### Rate Limiting
- **Standard Plan**: 1000 requests per hour
- **Premium Plan**: 5000 requests per hour
- **Enterprise Plan**: 20000 requests per hour

### Webhooks

Configure webhooks to receive real-time notifications:

\`\`\`http
POST /webhooks
{
  "url": "https://your-app.com/webhook",
  "events": ["form.submitted", "form.updated"],
  "secret": "your-webhook-secret"
}
\`\`\``,

  'FILE_STRUCTURE_AND_FLOW.md': `# File Structure and Application Flow
## SolidForm Codebase Architecture

### Directory Structure

\`\`\`
src/
├── components/           # React components
│   ├── ui/              # Base UI components (Shadcn)
│   ├── forms/           # Form-related components
│   ├── reports/         # Reporting components
│   └── submissions/     # Submission management
├── contexts/            # React contexts
├── data/               # Static data and mock data
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
├── lib/                # Utility libraries
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
\`\`\`

### Application Flow

\`\`\`mermaid
graph TD
    START[Application Start] --> INIT[Initialize Contexts]
    INIT --> LOAD[Load User Preferences]
    LOAD --> RENDER[Render Main Layout]
    
    RENDER --> SIDEBAR[Sidebar Navigation]
    RENDER --> CONTENT[Main Content Area]
    
    SIDEBAR --> DASHBOARD[Dashboard]
    SIDEBAR --> FORMS[Forms Library]
    SIDEBAR --> BUILDER[Form Builder]
    SIDEBAR --> REVIEW[Submission Review]
    SIDEBAR --> SETTINGS[Global Settings]
    SIDEBAR --> RESOURCES[Resources]
    
    BUILDER --> CANVAS[Form Canvas]
    CANVAS --> PALETTE[Field Palette]
    PALETTE --> PREVIEW[Live Preview]
    
    FORMS --> TEMPLATES[Template Gallery]
    TEMPLATES --> SELECT[Template Selection]
    SELECT --> CUSTOMIZE[Customize Template]
    
    REVIEW --> LIST[Submission List]
    LIST --> DETAIL[Submission Detail]
    DETAIL --> SCORE[AI Scoring]
\`\`\`

### Component Hierarchy

\`\`\`mermaid
graph TD
    APP[App.tsx] --> PROVIDERS[Context Providers]
    PROVIDERS --> LAYOUT[Main Layout]
    
    LAYOUT --> SIDEBAR[AppSidebar]
    LAYOUT --> MAIN[Main Content]
    
    MAIN --> INDEX[Index Page]
    INDEX --> DASHBOARD[Dashboard Component]
    INDEX --> FORMS[FormLibrary Component]
    INDEX --> BUILDER[FormBuilder Component]
    INDEX --> REVIEW[SubmissionReview Component]
    INDEX --> SETTINGS[GlobalSettings Component]
    INDEX --> RESOURCES[Resources Component]
    
    BUILDER --> CANVAS[FormCanvas]
    BUILDER --> PALETTE[FieldPalette]
    BUILDER --> PREVIEW[FormPreview]
    BUILDER --> SETTINGS_PANEL[FormSettingsPanel]
    
    FORMS --> LIBRARY[Form Library Grid]
    FORMS --> FILTERS[Category Filters]
    FORMS --> SEARCH[Search Functionality]
    
    REVIEW --> SUBMISSIONS_LIST[SubmissionsList]
    REVIEW --> SUBMISSION_CARD[SubmissionCard]
    REVIEW --> SUBMISSION_DETAILS[SubmissionDetails]
    
    RESOURCES --> FILE_LIST[Resource File List]
    RESOURCES --> MARKDOWN_VIEWER[MarkdownViewer]
\`\`\`

### Data Flow Architecture

\`\`\`mermaid
graph LR
    subgraph "Input Layer"
        UI[User Interface]
        API[API Calls]
        FILES[File Uploads]
    end
    
    subgraph "Processing Layer"
        VALIDATION[Data Validation]
        FORM_ENGINE[Form Engine]
        AI_ENGINE[AI Processing]
        EMAIL_ENGINE[Email Engine]
    end
    
    subgraph "Storage Layer"
        LOCAL_STORAGE[Local Storage]
        SESSION_STORAGE[Session Storage]
        CACHE[Memory Cache]
    end
    
    subgraph "Output Layer"
        DASHBOARD[Dashboard Views]
        EXPORTS[Data Exports]
        NOTIFICATIONS[Notifications]
        REPORTS[Generated Reports]
    end
    
    UI --> VALIDATION
    API --> VALIDATION
    FILES --> VALIDATION
    
    VALIDATION --> FORM_ENGINE
    VALIDATION --> AI_ENGINE
    VALIDATION --> EMAIL_ENGINE
    
    FORM_ENGINE --> LOCAL_STORAGE
    AI_ENGINE --> CACHE
    EMAIL_ENGINE --> SESSION_STORAGE
    
    LOCAL_STORAGE --> DASHBOARD
    CACHE --> EXPORTS
    SESSION_STORAGE --> NOTIFICATIONS
    FORM_ENGINE --> REPORTS
\`\`\`

### Key Component Responsibilities

#### Core Application Files
- **App.tsx** (420 lines): Main application shell, routing, and provider setup
- **Index.tsx** (380 lines): Primary interface component with tab-based navigation
- **AppSidebar.tsx** (139 lines): Navigation sidebar with collapsible design

#### Form Building Components
- **FormBuilder.tsx** (650 lines): Main form building interface
- **FormCanvas.tsx** (420 lines): Drag-and-drop form canvas
- **FieldPalette.tsx** (380 lines): Available form fields palette
- **FormPreview.tsx** (290 lines): Real-time form preview

#### Template System
- **FormLibrary.tsx** (450 lines): Template gallery and management
- **formTemplates.ts** (3200+ lines): 169 industry-specific templates

#### Submission Management
- **SubmissionReview.tsx** (520 lines): Submission review interface
- **SubmissionsList.tsx** (340 lines): List view of all submissions
- **SubmissionDetails.tsx** (280 lines): Detailed submission view

### Performance Optimizations

\`\`\`mermaid
pie title Bundle Size Distribution
    "Core React" : 25
    "UI Components" : 30
    "Business Logic" : 20
    "Templates Data" : 15
    "Assets & Icons" : 10
\`\`\`

### Integration Points

1. **External Libraries**
   - Recharts for data visualization
   - React Hook Form for form management
   - Zod for validation
   - Tailwind CSS for styling

2. **Design System Integration**
   - Shadcn/UI component library
   - Custom design tokens
   - Responsive design patterns

3. **State Management**
   - React Query for server state
   - Context API for global state
   - Local state for component-specific data`,

  'DEPLOYMENT_GUIDE.md': `# Deployment Guide
## SolidForm Enterprise Application

### Deployment Architecture Overview

\`\`\`mermaid
graph TB
    DEV[Development Environment] --> BUILD[Build Process]
    BUILD --> DEPLOY[Deployment Platform]
    DEPLOY --> PROD[Production Environment]
    
    subgraph "Development"
        LOCAL[Local Development]
        GIT[Git Repository]
        CI[CI/CD Pipeline]
    end
    
    subgraph "Production Infrastructure"
        CDN[Global CDN]
        LOAD_BALANCER[Load Balancer]
        APP_SERVERS[Application Servers]
        MONITORING[Monitoring & Analytics]
    end
    
    DEV --> LOCAL
    LOCAL --> GIT
    GIT --> CI
    CI --> BUILD
    
    DEPLOY --> CDN
    CDN --> LOAD_BALANCER
    LOAD_BALANCER --> APP_SERVERS
    APP_SERVERS --> MONITORING
\`\`\`

### Quick Deployment (Recommended)

#### Lovable Platform Deployment
The fastest way to deploy SolidForm is using the Lovable Platform:

1. **One-Click Deployment**
   \`\`\`bash
   # Already configured for Lovable deployment
   # Simply click "Publish" in the Lovable interface
   \`\`\`

2. **Benefits**
   - Zero configuration required
   - Instant SSL certificates
   - Global CDN distribution
   - Automatic scaling
   - Built-in monitoring

### Build Process Details

#### Development Setup
\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

#### Vite Build Configuration
\`\`\`typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-tabs', '@radix-ui/react-dialog'],
          charts: ['recharts'],
          forms: ['react-hook-form', 'zod']
        }
      }
    }
  }
})
\`\`\`

### Performance Optimization

\`\`\`mermaid
graph LR
    CODE[Source Code] --> SPLIT[Code Splitting]
    SPLIT --> MINIFY[Minification]
    MINIFY --> COMPRESS[Compression]
    COMPRESS --> CACHE[Caching Strategy]
    
    CACHE --> BROWSER[Browser Cache]
    CACHE --> CDN_CACHE[CDN Cache]
    CACHE --> SERVER_CACHE[Server Cache]
\`\`\`

#### Optimization Strategies
- **Code Splitting**: Automatic route-based splitting
- **Asset Optimization**: Image compression and lazy loading
- **Caching**: Aggressive browser and CDN caching
- **Bundle Analysis**: Regular bundle size monitoring

### Alternative Deployment Options

#### Vercel Deployment
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
\`\`\`

#### Netlify Deployment
\`\`\`toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
\`\`\`

#### AWS S3 + CloudFront
\`\`\`bash
# Build the application
npm run build

# Deploy to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
\`\`\`

### Environment Configuration

#### Production Environment Variables
\`\`\`bash
# Build-time configuration
VITE_APP_TITLE="SolidForm Enterprise"
VITE_APP_VERSION="1.0.0"
VITE_ENVIRONMENT="production"
\`\`\`

### Custom Domain Setup

#### Lovable Platform Custom Domain
1. Navigate to Project → Settings → Domains
2. Add your custom domain
3. Update DNS records:
   \`\`\`
   Type: CNAME
   Name: your-subdomain
   Value: your-app.lovable.app
   \`\`\`

### Performance Monitoring

\`\`\`mermaid
graph TD
    USER[User Interaction] --> METRICS[Performance Metrics]
    METRICS --> CORE_WEB_VITALS[Core Web Vitals]
    METRICS --> CUSTOM_METRICS[Custom Metrics]
    
    CORE_WEB_VITALS --> LCP[Largest Contentful Paint]
    CORE_WEB_VITALS --> FID[First Input Delay]
    CORE_WEB_VITALS --> CLS[Cumulative Layout Shift]
    
    CUSTOM_METRICS --> FORM_LOAD[Form Load Time]
    CUSTOM_METRICS --> SUBMISSION_TIME[Submission Processing]
    CUSTOM_METRICS --> TEMPLATE_RENDER[Template Rendering]
\`\`\`

### CI/CD Pipeline

#### GitHub Actions Workflow
\`\`\`yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to Lovable
        run: echo "Deployment handled by Lovable Platform"
\`\`\`

### Security Deployment

#### Security Headers Configuration
\`\`\`javascript
// Security headers for production
{
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
\`\`\`

### Troubleshooting

#### Common Deployment Issues
1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review TypeScript compilation errors

2. **Performance Issues**
   - Analyze bundle size
   - Check for memory leaks
   - Monitor Core Web Vitals

3. **Asset Loading Problems**
   - Verify CDN configuration
   - Check cache headers
   - Review asset optimization

### Maintenance and Updates

#### Regular Maintenance Tasks
- **Security Updates**: Monthly dependency updates
- **Performance Monitoring**: Weekly performance reviews
- **Backup Verification**: Daily backup checks
- **Error Monitoring**: Real-time error tracking

#### Update Strategy
\`\`\`mermaid
graph LR
    DEV[Development] --> STAGING[Staging Environment]
    STAGING --> UAT[User Acceptance Testing]
    UAT --> PROD[Production Deployment]
    
    PROD --> ROLLBACK[Rollback Plan]
    ROLLBACK --> STAGING
\`\`\``,

  'SCOPE.md': `# Project Scope Document
## SolidForm Enterprise Form Builder & Submission Management System

### Executive Summary

This document defines the comprehensive scope of work for migrating and enhancing the SolidForm enterprise application from React to Angular, while maintaining full feature parity and implementing additional enterprise-grade capabilities. The project encompasses both frontend migration and backend development using .NET technologies.

### Project Overview

\`\`\`mermaid
graph TB
    CURRENT[Current React Application] --> MIGRATE[Migration Process]
    MIGRATE --> ANGULAR[Angular Frontend]
    MIGRATE --> DOTNET[.NET Backend]
    
    ANGULAR --> FEATURES[Enhanced Features]
    DOTNET --> API[REST API Layer]
    
    FEATURES --> ENTERPRISE[Enterprise Integration]
    API --> DATABASE[Database Layer]
    
    ENTERPRISE --> DEPLOYMENT[Production Deployment]
    DATABASE --> DEPLOYMENT
\`\`\`

### Frontend Deliverables (Angular)

#### 1. Angular Module Structure
\`\`\`
src/
├── app/
│   ├── core/                 # Core services and guards
│   ├── shared/               # Shared components and utilities
│   ├── features/             # Feature modules
│   │   ├── form-builder/     # Form building functionality
│   │   ├── form-library/     # Template management
│   │   ├── submissions/      # Submission review system
│   │   ├── analytics/        # Reporting and analytics
│   │   └── settings/         # Configuration management
│   ├── layout/               # Application layout components
│   └── guards/               # Route guards and security
\`\`\`

#### 2. UI Components Migration
- **Component Library**: Material Design or PrimeNG implementation
- **Responsive Design**: Mobile-first responsive layouts
- **Accessibility**: WCAG 2.1 AA compliance
- **Theme System**: Dynamic theming with CSS custom properties
- **Form Controls**: Custom form field components with validation

#### 3. State Management
- **NgRx Implementation**: Complete state management solution
- **Effects Management**: Asynchronous operations handling
- **Entity Management**: Normalized state structure
- **Selectors**: Optimized data selection and memoization

#### 4. Routing Architecture
\`\`\`typescript
const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'forms', loadChildren: () => import('./features/form-library/form-library.module').then(m => m.FormLibraryModule) },
  { path: 'builder', loadChildren: () => import('./features/form-builder/form-builder.module').then(m => m.FormBuilderModule) },
  { path: 'submissions', loadChildren: () => import('./features/submissions/submissions.module').then(m => m.SubmissionsModule) },
  { path: 'analytics', loadChildren: () => import('./features/analytics/analytics.module').then(m => m.AnalyticsModule) }
];
\`\`\`

#### 5. Integration Points
- **HTTP Client**: Angular HTTP client with interceptors
- **WebSocket Integration**: Real-time updates for collaborative editing
- **File Upload**: Multi-file upload with progress tracking
- **Internationalization**: Angular i18n implementation
- **PWA Support**: Service worker and offline capabilities

### Backend Deliverables (.NET)

#### 1. .NET Architecture
\`\`\`mermaid
graph TB
    API[ASP.NET Core Web API] --> BLL[Business Logic Layer]
    BLL --> DAL[Data Access Layer]
    DAL --> DB[(SQL Server Database)]
    
    API --> AUTH[Authentication Service]
    API --> EMAIL[Email Service]
    API --> FILE[File Management Service]
    API --> AI[AI Processing Service]
    
    AUTH --> IDENTITY[Identity Server]
    EMAIL --> SMTP[SMTP Provider]
    FILE --> STORAGE[Cloud Storage]
    AI --> ML[ML.NET Models]
\`\`\`

#### 2. API Endpoints Structure
\`\`\`csharp
[ApiController]
[Route("api/v1/[controller]")]
public class FormsController : ControllerBase
{
    // GET: api/v1/forms
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FormDto>>> GetForms();
    
    // POST: api/v1/forms
    [HttpPost]
    public async Task<ActionResult<FormDto>> CreateForm(CreateFormRequest request);
    
    // PUT: api/v1/forms/{id}
    [HttpPut("{id}")]
    public async Task<ActionResult<FormDto>> UpdateForm(int id, UpdateFormRequest request);
    
    // DELETE: api/v1/forms/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteForm(int id);
}
\`\`\`

#### 3. Authentication & Authorization
- **JWT Token Implementation**: Secure token-based authentication
- **Role-Based Access Control**: Granular permission system
- **OAuth 2.0 Integration**: Third-party authentication providers
- **API Rate Limiting**: Request throttling and abuse prevention
- **Audit Logging**: Comprehensive security event logging

#### 4. Database Integration
\`\`\`sql
-- Core database schema
CREATE TABLE Forms (
    Id int IDENTITY(1,1) PRIMARY KEY,
    Title nvarchar(255) NOT NULL,
    Description nvarchar(max),
    Category nvarchar(100),
    FieldsJson nvarchar(max),
    SettingsJson nvarchar(max),
    CreatedBy int,
    CreatedAt datetime2,
    UpdatedAt datetime2,
    IsActive bit DEFAULT 1
);

CREATE TABLE Submissions (
    Id int IDENTITY(1,1) PRIMARY KEY,
    FormId int FOREIGN KEY REFERENCES Forms(Id),
    DataJson nvarchar(max),
    SubmittedBy int,
    SubmittedAt datetime2,
    Status nvarchar(50),
    Score decimal(5,2),
    ProcessedAt datetime2
);
\`\`\`

#### 5. Error Handling & Logging
- **Global Exception Handling**: Centralized error management
- **Structured Logging**: Serilog implementation with multiple sinks
- **Health Checks**: Application and dependency health monitoring
- **Performance Monitoring**: Application insights and metrics collection

### Integration Guidelines

#### 1. Frontend-Backend Communication
\`\`\`mermaid
sequenceDiagram
    participant Angular as Angular Frontend
    participant API as .NET Web API
    participant DB as SQL Server
    participant AI as AI Service
    
    Angular->>API: HTTP Request (JSON)
    API->>DB: Query/Command
    DB->>API: Data Response
    API->>AI: Process Data (if needed)
    AI->>API: Processed Result
    API->>Angular: HTTP Response (JSON)
\`\`\`

#### 2. Data Transfer Objects (DTOs)
\`\`\`csharp
public class FormDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public List<FormFieldDto> Fields { get; set; }
    public FormSettingsDto Settings { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
\`\`\`

#### 3. Error Response Format
\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      }
    ]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

### Testing and QA Requirements

#### 1. Unit Testing
- **Frontend**: Jasmine and Karma for Angular unit tests
  - Component testing with TestBed
  - Service testing with HTTP mocking
  - Pipe and directive testing
  - Coverage target: 80% minimum

- **Backend**: xUnit for .NET unit tests
  - Controller testing with mock dependencies
  - Service layer testing
  - Repository pattern testing
  - Coverage target: 85% minimum

#### 2. Integration Testing
- **API Integration**: Automated API testing with Postman/Newman
- **Database Integration**: Entity Framework testing with in-memory database
- **End-to-End Testing**: Cypress for full user journey testing
- **Performance Testing**: Load testing with Artillery or K6

#### 3. User Acceptance Testing (UAT)
- **Test Environment Setup**: Staging environment identical to production
- **User Story Validation**: Complete feature validation against requirements
- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge compatibility
- **Mobile Responsiveness**: Testing on various device sizes
- **Accessibility Testing**: Screen reader and keyboard navigation testing

### Deployment and Delivery Requirements

#### 1. Deployment Architecture
\`\`\`mermaid
graph TB
    DEV[Development Environment] --> STAGING[Staging Environment]
    STAGING --> UAT[UAT Environment]
    UAT --> PROD[Production Environment]
    
    subgraph "Production Stack"
        FRONTEND[Angular App]
        API[.NET API]
        DATABASE[(SQL Server)]
        REDIS[(Redis Cache)]
    end
    
    PROD --> FRONTEND
    PROD --> API
    API --> DATABASE
    API --> REDIS
\`\`\`

#### 2. CI/CD Pipeline
\`\`\`yaml
# Azure DevOps Pipeline
stages:
- stage: Build
  jobs:
  - job: BuildAngular
    steps:
    - task: NodeTool@0
    - script: npm install && npm run build:prod
    
  - job: BuildDotNet
    steps:
    - task: DotNetCoreCLI@2
      inputs:
        command: 'build'
        projects: '**/*.csproj'

- stage: Test
  jobs:
  - job: UnitTests
  - job: IntegrationTests
  
- stage: Deploy
  jobs:
  - deployment: DeployToStaging
  - deployment: DeployToProduction
\`\`\`

#### 3. Infrastructure Requirements
- **Web Server**: IIS or Nginx for Angular static files
- **Application Server**: ASP.NET Core hosting
- **Database Server**: SQL Server 2019 or later
- **Cache Layer**: Redis for session and data caching
- **File Storage**: Azure Blob Storage or AWS S3
- **CDN**: Content delivery network for static assets

#### 4. Security Implementation
- **HTTPS**: SSL/TLS encryption for all communications
- **CORS**: Proper cross-origin resource sharing configuration
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries and ORM usage
- **XSS Protection**: Content Security Policy implementation

#### 5. Monitoring and Logging
- **Application Monitoring**: Application Insights or similar
- **Error Tracking**: Centralized error logging and alerting
- **Performance Metrics**: Response time and throughput monitoring
- **User Analytics**: User behavior and feature usage tracking

### Deliverable Timeline

\`\`\`mermaid
gantt
    title Project Timeline
    dateFormat  YYYY-MM-DD
    section Analysis & Design
    Requirements Analysis    :done, req, 2024-01-01, 2024-01-15
    Technical Design        :done, design, 2024-01-15, 2024-01-30
    
    section Frontend Development
    Angular Setup          :active, ng-setup, 2024-02-01, 2024-02-15
    Core Components        :ng-core, 2024-02-15, 2024-03-15
    Form Builder Migration :ng-builder, 2024-03-15, 2024-04-15
    Integration            :ng-int, 2024-04-15, 2024-05-01
    
    section Backend Development
    .NET API Setup         :api-setup, 2024-02-01, 2024-02-15
    Core Services          :api-core, 2024-02-15, 2024-03-30
    Database Implementation :db-impl, 2024-03-01, 2024-04-01
    Integration Testing    :api-test, 2024-04-01, 2024-04-15
    
    section Testing & Deployment
    System Testing         :testing, 2024-04-15, 2024-05-15
    UAT                   :uat, 2024-05-15, 2024-05-30
    Production Deployment  :deploy, 2024-05-30, 2024-06-15
\`\`\`

### Acceptance Criteria

#### 1. Functional Requirements
- ✅ Complete feature parity with existing React application
- ✅ All 169 form templates successfully migrated
- ✅ Form builder functionality fully operational
- ✅ Submission review system with AI scoring
- ✅ Analytics and reporting capabilities
- ✅ Multi-language support (RTL/LTR)

#### 2. Performance Requirements
- ✅ Page load time < 2 seconds
- ✅ Form submission response < 500ms
- ✅ Support for 10,000+ concurrent users
- ✅ 99.9% uptime availability

#### 3. Security Requirements
- ✅ OWASP Top 10 compliance
- ✅ Data encryption at rest and in transit
- ✅ Secure authentication and authorization
- ✅ Regular security vulnerability assessments

#### 4. Compatibility Requirements
- ✅ Modern browser support (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsiveness (iOS/Android)
- ✅ Cross-platform compatibility
- ✅ API backward compatibility during transition

### Project Constraints

#### 1. Technical Constraints
- Must maintain existing data structure compatibility
- Zero-downtime migration requirement
- Existing integrations must continue to function
- Performance must not degrade from current system

#### 2. Business Constraints
- Project budget: $XXX,XXX
- Timeline: 6 months maximum
- User training: Minimal required due to identical UI/UX
- Compliance: Must maintain current regulatory compliance

### Success Metrics

#### 1. Technical Metrics
- Code coverage: >80% frontend, >85% backend
- Performance: All pages load within 2 seconds
- Security: Zero critical vulnerabilities
- Uptime: 99.9% availability

#### 2. Business Metrics
- User adoption: 100% migration from React version
- Performance improvement: 20% faster form processing
- Cost reduction: 30% infrastructure cost savings
- User satisfaction: >95% satisfaction rating

### Support and Maintenance

#### 1. Post-Deployment Support
- 3 months of comprehensive support included
- Bug fixes and minor enhancements
- Performance optimization
- User training and documentation

#### 2. Documentation Deliverables
- Technical architecture documentation
- API documentation with interactive examples
- User manuals and training materials
- Deployment and maintenance guides
- Source code with comprehensive comments

This scope document serves as the definitive guide for external development teams undertaking the SolidForm migration and enhancement project. All deliverables, timelines, and acceptance criteria outlined herein form the basis of the contractual agreement and project success evaluation.`,

  'REACT_TO_ANGULAR_MIGRATION.md': `# React to Angular Migration Guide
## SolidForm Platform Migration Strategy

### Migration Overview

\`\`\`mermaid
graph LR
    REACT[React Application] --> ANALYSIS[Migration Analysis]
    ANALYSIS --> MAPPING[Component Mapping]
    MAPPING --> ANGULAR[Angular Implementation]
    ANGULAR --> TESTING[Testing & Validation]
    TESTING --> DEPLOYMENT[Production Deployment]
    
    subgraph "Migration Phases"
        PHASE1[Phase 1: Core Infrastructure]
        PHASE2[Phase 2: Component Migration]
        PHASE3[Phase 3: State Management]
        PHASE4[Phase 4: Feature Completion]
    end
    
    ANALYSIS --> PHASE1
    PHASE1 --> PHASE2
    PHASE2 --> PHASE3
    PHASE3 --> PHASE4
\`\`\`

### Component Mapping Strategy

#### 1. React to Angular Component Conversion

\`\`\`typescript
// React Component Example
export const FormBuilder: React.FC<FormBuilderProps> = ({ onSave }) => {
  const [fields, setFields] = useState<FormField[]>([]);
  
  const handleAddField = (field: FormField) => {
    setFields(prev => [...prev, field]);
  };
  
  return (
    <div className="form-builder">
      <FieldPalette onAddField={handleAddField} />
      <FormCanvas fields={fields} />
    </div>
  );
};

// Angular Component Equivalent
@Component({
  selector: 'app-form-builder',
  template: \`
    <div class="form-builder">
      <app-field-palette (addField)="handleAddField($event)"></app-field-palette>
      <app-form-canvas [fields]="fields"></app-form-canvas>
    </div>
  \`
})
export class FormBuilderComponent {
  @Input() onSave!: (form: Form) => void;
  fields: FormField[] = [];
  
  handleAddField(field: FormField): void {
    this.fields = [...this.fields, field];
  }
}
\`\`\`

#### 2. Hook to Service Migration

\`\`\`typescript
// React Custom Hook
export const useFormData = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(false);
  
  const fetchForms = async () => {
    setLoading(true);
    try {
      const response = await api.getForms();
      setForms(response.data);
    } finally {
      setLoading(false);
    }
  };
  
  return { forms, loading, fetchForms };
};

// Angular Service Equivalent
@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formsSubject = new BehaviorSubject<Form[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  forms$ = this.formsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  async fetchForms(): Promise<void> {
    this.loadingSubject.next(true);
    try {
      const response = await this.api.getForms().toPromise();
      this.formsSubject.next(response.data);
    } finally {
      this.loadingSubject.next(false);
    }
  }
}
\`\`\`

### State Management Migration

#### 1. Context API to NgRx Migration

\`\`\`typescript
// React Context
interface BrandContextType {
  brand: Brand;
  updateBrand: (brand: Brand) => void;
}

export const BrandContext = createContext<BrandContextType | undefined>(undefined);

// NgRx State Management
// State
export interface BrandState {
  brand: Brand;
  loading: boolean;
  error: string | null;
}

// Actions
export const updateBrand = createAction(
  '[Brand] Update Brand',
  props<{ brand: Brand }>()
);

// Reducer
export const brandReducer = createReducer(
  initialState,
  on(updateBrand, (state, { brand }) => ({
    ...state,
    brand
  }))
);

// Effects
@Injectable()
export class BrandEffects {
  updateBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateBrand),
      switchMap(({ brand }) =>
        this.brandService.updateBrand(brand).pipe(
          map(() => updateBrandSuccess({ brand })),
          catchError(error => of(updateBrandFailure({ error })))
        )
      )
    )
  );
}
\`\`\`

### Routing Migration

\`\`\`typescript
// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/forms" element={<FormLibrary />} />
        <Route path="/builder" element={<FormBuilder />} />
        <Route path="/submissions" element={<SubmissionReview />} />
      </Routes>
    </BrowserRouter>
  );
}

// Angular Router
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'forms', component: FormLibraryComponent },
  { path: 'builder', component: FormBuilderComponent },
  { path: 'submissions', component: SubmissionReviewComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
\`\`\`

### Styling Migration

#### 1. Tailwind CSS to Angular Material

\`\`\`scss
// Current Tailwind Classes
.form-card {
  @apply bg-white rounded-lg shadow-md p-6 border border-gray-200;
}

.primary-button {
  @apply bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700;
}

// Angular Material Equivalent
.form-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.primary-button {
  @extend .mat-raised-button;
  @extend .mat-primary;
}
\`\`\`

### Component Architecture Mapping

\`\`\`mermaid
graph TB
    subgraph "React Architecture"
        REACT_APP[App.tsx]
        REACT_SIDEBAR[AppSidebar]
        REACT_BUILDER[FormBuilder]
        REACT_LIBRARY[FormLibrary]
        REACT_REVIEW[SubmissionReview]
    end
    
    subgraph "Angular Architecture"
        NG_APP[AppComponent]
        NG_SIDEBAR[SidebarComponent]
        NG_BUILDER[FormBuilderComponent]
        NG_LIBRARY[FormLibraryComponent]
        NG_REVIEW[SubmissionReviewComponent]
    end
    
    REACT_APP --> NG_APP
    REACT_SIDEBAR --> NG_SIDEBAR
    REACT_BUILDER --> NG_BUILDER
    REACT_LIBRARY --> NG_LIBRARY
    REACT_REVIEW --> NG_REVIEW
\`\`\`

### Migration Phases

#### Phase 1: Core Infrastructure (Weeks 1-2)

\`\`\`mermaid
gantt
    title Phase 1: Core Infrastructure
    dateFormat  YYYY-MM-DD
    section Setup
    Angular CLI Setup        :2024-02-01, 3d
    Module Architecture      :2024-02-04, 4d
    Routing Configuration    :2024-02-08, 3d
    Base Components         :2024-02-11, 4d
\`\`\`

**Deliverables:**
- Angular project structure
- Core modules (Core, Shared, Feature modules)
- Routing configuration
- Base layout components
- Development environment setup

#### Phase 2: Component Migration (Weeks 3-6)

**Priority 1 Components:**
1. **AppSidebar** → **SidebarComponent**
2. **BrandLogo** → **LogoComponent**
3. **FormCanvas** → **FormCanvasComponent**
4. **FieldPalette** → **FieldPaletteComponent**

**Priority 2 Components:**
1. **FormLibrary** → **FormLibraryComponent**
2. **SubmissionReview** → **SubmissionReviewComponent**
3. **Analytics** → **AnalyticsComponent**
4. **GlobalSettings** → **SettingsComponent**

#### Phase 3: State Management (Weeks 7-8)

**NgRx Implementation:**
- Forms state management
- Template state management
- Submission state management
- User preferences state
- Application settings state

#### Phase 4: Feature Completion (Weeks 9-12)

**Advanced Features:**
- AI scoring integration
- Real-time collaboration
- Advanced analytics
- Email campaign management
- Export functionality

### Testing Strategy

#### 1. Component Testing Migration

\`\`\`typescript
// React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { FormBuilder } from './FormBuilder';

test('should add field when palette item is clicked', () => {
  render(<FormBuilder />);
  const textFieldButton = screen.getByText('Text Field');
  fireEvent.click(textFieldButton);
  expect(screen.getByTestId('form-field')).toBeInTheDocument();
});

// Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilderComponent } from './form-builder.component';

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderComponent]
    });
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
  });

  it('should add field when palette item is clicked', () => {
    const textFieldButton = fixture.debugElement.nativeElement.querySelector('[data-testid="text-field-button"]');
    textFieldButton.click();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('[data-testid="form-field"]')).toBeTruthy();
  });
});
\`\`\`

### Performance Optimization

#### 1. Bundle Size Optimization

\`\`\`typescript
// Lazy Loading Implementation
const routes: Routes = [
  {
    path: 'forms',
    loadChildren: () => import('./features/forms/forms.module').then(m => m.FormsModule)
  },
  {
    path: 'builder',
    loadChildren: () => import('./features/builder/builder.module').then(m => m.BuilderModule)
  }
];
\`\`\`

#### 2. Change Detection Optimization

\`\`\`typescript
@Component({
  selector: 'app-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div class="form-field">
      <label>{{ field.label }}</label>
      <input [value]="field.value" (input)="onValueChange($event)" />
    </div>
  \`
})
export class FormFieldComponent {
  @Input() field!: FormField;
  @Output() valueChange = new EventEmitter<string>();
  
  onValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }
}
\`\`\`

### Data Flow Migration

\`\`\`mermaid
graph TD
    subgraph "React Data Flow"
        REACT_PROPS[Props Down]
        REACT_EVENTS[Events Up]
        REACT_CONTEXT[Context API]
        REACT_HOOKS[Custom Hooks]
    end
    
    subgraph "Angular Data Flow"
        NG_INPUTS[Input Properties]
        NG_OUTPUTS[Output Events]
        NG_SERVICES[Services]
        NG_NGRX[NgRx Store]
    end
    
    REACT_PROPS --> NG_INPUTS
    REACT_EVENTS --> NG_OUTPUTS
    REACT_CONTEXT --> NG_SERVICES
    REACT_HOOKS --> NG_NGRX
\`\`\`

### Migration Checklist

#### Pre-Migration
- [ ] Analyze current React codebase
- [ ] Identify reusable business logic
- [ ] Plan component hierarchy
- [ ] Design state management strategy
- [ ] Set up Angular development environment

#### During Migration
- [ ] Create Angular project structure
- [ ] Implement core services
- [ ] Migrate components systematically
- [ ] Implement NgRx state management
- [ ] Set up testing framework
- [ ] Configure build and deployment

#### Post-Migration
- [ ] Performance testing and optimization
- [ ] User acceptance testing
- [ ] Documentation updates
- [ ] Team training
- [ ] Production deployment
- [ ] Monitor and maintain

### Risk Mitigation

#### 1. Technical Risks

**Risk**: Component functionality loss during migration
**Mitigation**: Parallel development with feature parity testing

**Risk**: Performance degradation
**Mitigation**: Continuous performance monitoring and optimization

**Risk**: Integration issues
**Mitigation**: Incremental migration with thorough testing

#### 2. Business Risks

**Risk**: User adoption resistance
**Mitigation**: Identical UI/UX design to minimize user impact

**Risk**: Project timeline delays
**Mitigation**: Agile development with regular checkpoints

**Risk**: Data migration issues
**Mitigation**: Comprehensive backup and rollback strategies

### Success Metrics

#### Technical Metrics
- 100% feature parity achieved
- Performance improvement of 20%+
- Test coverage >85%
- Zero critical bugs in production

#### Business Metrics
- Smooth user transition (>95% satisfaction)
- Reduced development time for new features
- Improved maintainability score
- Successful production deployment

This migration guide provides a comprehensive roadmap for successfully transitioning the SolidForm application from React to Angular while maintaining all existing functionality and improving overall system architecture.`
};

export function MarkdownViewer({ filename }: MarkdownViewerProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });

    // Simulate loading content (in production, this would fetch from actual files)
    const loadContent = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading
      setContent(markdownContent[filename] || '# File not found\n\nThe requested documentation file could not be loaded.');
      setLoading(false);
    };

    loadContent();
  }, [filename]);

  useEffect(() => {
    if (!loading && content) {
      // Re-render mermaid diagrams after content is loaded
      const renderMermaid = async () => {
        const mermaidElements = document.querySelectorAll('.language-mermaid');
        for (const element of mermaidElements) {
          try {
            const graphDefinition = element.textContent || '';
            const { svg } = await mermaid.render(`mermaid-${Date.now()}`, graphDefinition);
            element.innerHTML = svg;
          } catch (error) {
            console.error('Mermaid rendering error:', error);
            element.innerHTML = '<p>Error rendering diagram</p>';
          }
        }
      };
      
      setTimeout(renderMermaid, 100);
    }
  }, [loading, content]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading documentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-none">
      <ScrollArea className="h-full">
        <div className="prose prose-slate dark:prose-invert max-w-none p-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                
                if (language === 'mermaid') {
                  return (
                    <div className={`language-mermaid bg-muted p-4 rounded-lg my-4`}>
                      {String(children).replace(/\n$/, '')}
                    </div>
                  );
                }
                
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              pre({ children }) {
                return (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                    {children}
                  </pre>
                );
              },
              h1({ children }) {
                return <h1 className="text-4xl font-bold mb-6 text-foreground border-b pb-4">{children}</h1>;
              },
              h2({ children }) {
                return <h2 className="text-3xl font-semibold mb-4 text-foreground mt-8">{children}</h2>;
              },
              h3({ children }) {
                return <h3 className="text-2xl font-semibold mb-3 text-foreground mt-6">{children}</h3>;
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-4 border-primary pl-4 py-2 bg-muted/50 rounded-r-lg my-4">
                    {children}
                  </blockquote>
                );
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border border-border rounded-lg">
                      {children}
                    </table>
                  </div>
                );
              },
              th({ children }) {
                return (
                  <th className="border border-border bg-muted px-4 py-2 text-left font-semibold">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="border border-border px-4 py-2">
                    {children}
                  </td>
                );
              }
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </ScrollArea>
    </div>
  );
}