# Form Builder & Submission Management API Documentation

## Overview
This document outlines the complete API specification and database schema for implementing the backend of the Form Builder and Submission Management system. The current frontend is built with React 18, TypeScript, and modern web technologies, requiring a robust backend to support its enterprise-grade features.

## Current Frontend Architecture
The application is currently a React-based SPA with the following capabilities:
- **169 Industry-Specific Templates** across 8 major sectors with advanced filtering
- **AI-Powered Review System** with intelligent approval recommendations  
- **Multi-Select Filtering** with real-time counts and smart categorization
- **Dynamic Form Building** with drag & drop interface and live preview
- **Email Campaign Management** with automated reminders and engagement tracking
- **Advanced Analytics** with PDF/Excel export and trend analysis
- **Weighted Scoring System** with risk assessment and automated workflows

## Technology Stack
- **Framework**: .NET 8 Web API (Recommended)
- **Database**: SQL Server / PostgreSQL
- **ORM**: Entity Framework Core
- **Authentication**: JWT Bearer Token
- **File Storage**: Azure Blob Storage / AWS S3
- **Email Service**: SendGrid / SMTP
- **Caching**: Redis
- **Message Queue**: Azure Service Bus / RabbitMQ

## Database Schema

### 1. Users Table
```sql
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Email NVARCHAR(255) NOT NULL UNIQUE,
    Name NVARCHAR(255) NOT NULL,
    PasswordHash NVARCHAR(500) NOT NULL,
    Role NVARCHAR(50) NOT NULL DEFAULT 'User', -- Admin, User, Reviewer
    Department NVARCHAR(100),
    CompanyId UNIQUEIDENTIFIER,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    LastLoginAt DATETIME2,
    IsActive BIT NOT NULL DEFAULT 1,
    
    INDEX IX_Users_Email (Email),
    INDEX IX_Users_CompanyId (CompanyId),
    INDEX IX_Users_Role (Role)
);
```

### 2. Forms Table
```sql
CREATE TABLE Forms (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Title NVARCHAR(500) NOT NULL,
    Description NTEXT,
    Status NVARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, published, archived
    CreatedBy UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Users(Id),
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    PublishedAt DATETIME2,
    ExpiresAt DATETIME2,
    SubmissionCount INT NOT NULL DEFAULT 0,
    ViewCount INT NOT NULL DEFAULT 0,
    
    -- Form Configuration (JSON stored as NVARCHAR(MAX))
    Settings NVARCHAR(MAX), -- allowMultipleSubmissions, requireLogin, progressBar, theme
    
    -- Analytics Data (JSON stored as NVARCHAR(MAX))
    Analytics NVARCHAR(MAX), -- views, submissions, completionRate, averageTime
    
    -- Category and Classification
    Category NVARCHAR(100),
    Sector NVARCHAR(100),
    IsTemplate BIT NOT NULL DEFAULT 0,
    ParentTemplateId UNIQUEIDENTIFIER,
    
    INDEX IX_Forms_CreatedBy (CreatedBy),
    INDEX IX_Forms_Status (Status),
    INDEX IX_Forms_Category (Category),
    INDEX IX_Forms_Sector (Sector),
    INDEX IX_Forms_PublishedAt (PublishedAt)
);
```

### 3. FormFields Table
```sql
CREATE TABLE FormFields (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    FormId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Forms(Id) ON DELETE CASCADE,
    FieldType NVARCHAR(50) NOT NULL, -- text, email, number, select, checkbox, radio, date, file, textarea, rating
    Label NVARCHAR(500) NOT NULL,
    IsRequired BIT NOT NULL DEFAULT 0,
    OrderIndex INT NOT NULL,
    DefaultValue NVARCHAR(MAX),
    Placeholder NVARCHAR(500),
    Description NTEXT,
    ValidationRegex NVARCHAR(500),
    ErrorMessage NVARCHAR(500),
    Weightage DECIMAL(5,2) DEFAULT 0,
    
    -- Field-specific configuration (JSON)
    Options NVARCHAR(MAX), -- For select/radio/checkbox fields
    ScoringConfig NVARCHAR(MAX), -- Scoring rules and criteria
    ValidationRules NVARCHAR(MAX), -- Complex validation rules
    ConditionalLogic NVARCHAR(MAX), -- Show/hide conditions
    
    -- File field specific
    AcceptedFileTypes NVARCHAR(500),
    MaxFileSize BIGINT,
    
    INDEX IX_FormFields_FormId (FormId),
    INDEX IX_FormFields_OrderIndex (OrderIndex),
    INDEX IX_FormFields_FieldType (FieldType)
);
```

### 4. FormTemplates Table
```sql
CREATE TABLE FormTemplates (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(255) NOT NULL,
    Description NTEXT,
    Category NVARCHAR(100) NOT NULL,
    Sector NVARCHAR(100) NOT NULL,
    PreviewUrl NVARCHAR(500),
    IconName NVARCHAR(100),
    IsActive BIT NOT NULL DEFAULT 1,
    IsBuiltIn BIT NOT NULL DEFAULT 0,
    UsageCount INT NOT NULL DEFAULT 0,
    
    -- Template Classification
    Tags NVARCHAR(MAX), -- JSON array of tags
    ComplexityLevel NVARCHAR(20), -- Simple, Medium, Complex
    EstimatedCompletionTime INT, -- Minutes
    
    -- Template Metadata
    CreatedBy UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Users(Id),
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    INDEX IX_FormTemplates_Category (Category),
    INDEX IX_FormTemplates_Sector (Sector),
    INDEX IX_FormTemplates_IsBuiltIn (IsBuiltIn),
    INDEX IX_FormTemplates_UsageCount (UsageCount)
);
```

### 5. FormSubmissions Table
```sql
CREATE TABLE FormSubmissions (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    FormId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Forms(Id),
    SubmittedBy UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    SubmittedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    Status NVARCHAR(50) NOT NULL DEFAULT 'submitted', -- submitted, under_review, approved, rejected, partially_approved
    
    -- Submitter Information
    SubmitterEmail NVARCHAR(255) NOT NULL,
    SubmitterName NVARCHAR(255) NOT NULL,
    SubmitterCompany NVARCHAR(255),
    SubmitterPhone NVARCHAR(50),
    RecipientId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES EmailRecipients(Id),
    
    -- Submission Classification
    SubmissionType NVARCHAR(20) NOT NULL DEFAULT 'external', -- external, internal
    Priority NVARCHAR(20) DEFAULT 'normal', -- low, normal, high, urgent
    
    -- Performance Metrics
    CompletionPercentage DECIMAL(5,2),
    TimeSpent INT, -- seconds
    StartedAt DATETIME2,
    LastSavedAt DATETIME2,
    
    -- Form Responses (JSON)
    Responses NVARCHAR(MAX) NOT NULL, -- JSON object with field responses
    
    -- Review Information
    ReviewedBy UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    ReviewedAt DATETIME2,
    ReviewComments NTEXT,
    
    INDEX IX_FormSubmissions_FormId (FormId),
    INDEX IX_FormSubmissions_Status (Status),
    INDEX IX_FormSubmissions_SubmittedAt (SubmittedAt),
    INDEX IX_FormSubmissions_ReviewedBy (ReviewedBy),
    INDEX IX_FormSubmissions_Priority (Priority)
);
```

### 6. SubmissionScores Table
```sql
CREATE TABLE SubmissionScores (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SubmissionId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES FormSubmissions(Id) ON DELETE CASCADE,
    TotalScore DECIMAL(10,2) NOT NULL,
    MaxTotalScore DECIMAL(10,2) NOT NULL,
    Percentage DECIMAL(5,2) NOT NULL,
    RiskLevel NVARCHAR(20) NOT NULL, -- low, medium, high, critical
    RiskScore DECIMAL(5,2),
    
    -- AI Analysis
    AIRecommendation NVARCHAR(50), -- approve, reject, partially_approve
    AIConfidenceScore DECIMAL(5,2), -- AI confidence percentage
    AIAnalysisData NVARCHAR(MAX), -- JSON with AI insights
    
    -- Scoring Details
    CategoryScores NVARCHAR(MAX), -- JSON object with category breakdowns
    FieldScores NVARCHAR(MAX), -- JSON object with individual field scores
    
    -- Review Information
    ReviewedBy UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Users(Id),
    ReviewedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ReviewComments NTEXT,
    
    INDEX IX_SubmissionScores_SubmissionId (SubmissionId),
    INDEX IX_SubmissionScores_RiskLevel (RiskLevel),
    INDEX IX_SubmissionScores_AIConfidenceScore (AIConfidenceScore)
);
```

### 7. ReviewActivities Table
```sql
CREATE TABLE ReviewActivities (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SubmissionId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES FormSubmissions(Id) ON DELETE CASCADE,
    Action NVARCHAR(50) NOT NULL, -- approved, rejected, partially_approved, under_review, returned, escalated
    Comments NTEXT,
    
    -- AI Integration
    AIRecommendation NVARCHAR(MAX), -- JSON: AI suggestion details
    AIConfidenceScore DECIMAL(5,2), -- AI confidence percentage
    HumanOverride BIT DEFAULT 0, -- Whether human overrode AI
    
    -- Review Metadata
    ReviewedBy UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Users(Id),
    ReviewedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    TimeSpentOnReview INT, -- seconds
    
    -- Additional Data
    Metadata NVARCHAR(MAX), -- JSON with additional context
    PreviousStatus NVARCHAR(50),
    NewStatus NVARCHAR(50),
    
    INDEX IX_ReviewActivities_SubmissionId (SubmissionId),
    INDEX IX_ReviewActivities_Action (Action),
    INDEX IX_ReviewActivities_ReviewedBy (ReviewedBy),
    INDEX IX_ReviewActivities_ReviewedAt (ReviewedAt)
);
```

### 8. DocumentAttachments Table
```sql
CREATE TABLE DocumentAttachments (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SubmissionId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES FormSubmissions(Id) ON DELETE CASCADE,
    FieldId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES FormFields(Id),
    FileName NVARCHAR(255) NOT NULL,
    OriginalFileName NVARCHAR(255) NOT NULL,
    FileType NVARCHAR(50) NOT NULL,
    FileSize BIGINT NOT NULL,
    FileUrl NVARCHAR(1000) NOT NULL,
    MimeType NVARCHAR(100),
    
    -- Security
    VirusScanned BIT DEFAULT 0,
    ScanResult NVARCHAR(100),
    
    -- Metadata
    UploadedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UploadedBy UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    
    INDEX IX_DocumentAttachments_SubmissionId (SubmissionId),
    INDEX IX_DocumentAttachments_FieldId (FieldId),
    INDEX IX_DocumentAttachments_UploadedAt (UploadedAt)
);
```

### 9. EmailRecipients Table
```sql
CREATE TABLE EmailRecipients (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    FormId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Forms(Id) ON DELETE CASCADE,
    Email NVARCHAR(255) NOT NULL,
    Name NVARCHAR(255),
    Company NVARCHAR(255),
    Department NVARCHAR(100),
    
    -- Status Tracking
    Status NVARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, sent, opened, started, completed, expired
    RemindersSent INT NOT NULL DEFAULT 0,
    SentAt DATETIME2,
    OpenedAt DATETIME2,
    StartedAt DATETIME2,
    CompletedAt DATETIME2,
    LastReminderAt DATETIME2,
    ExpiresAt DATETIME2,
    
    -- Tracking
    UniqueToken UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(), -- For tracking
    AccessCount INT NOT NULL DEFAULT 0,
    LastAccessAt DATETIME2,
    
    -- Email Analytics
    EmailEngagement NVARCHAR(MAX), -- JSON with click tracking, etc.
    
    INDEX IX_EmailRecipients_FormId (FormId),
    INDEX IX_EmailRecipients_Status (Status),
    INDEX IX_EmailRecipients_UniqueToken (UniqueToken),
    INDEX IX_EmailRecipients_SentAt (SentAt)
);
```

### 10. EmailCampaigns Table
```sql
CREATE TABLE EmailCampaigns (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    FormId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Forms(Id),
    Name NVARCHAR(255) NOT NULL,
    Subject NVARCHAR(500) NOT NULL,
    EmailTemplate NTEXT NOT NULL,
    
    -- Campaign Settings
    ScheduledAt DATETIME2,
    SentAt DATETIME2,
    Status NVARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, scheduled, sending, sent, completed
    
    -- Reminder Configuration
    ReminderEnabled BIT NOT NULL DEFAULT 0,
    ReminderIntervalDays INT DEFAULT 7,
    MaxReminders INT DEFAULT 3,
    
    -- Campaign Performance
    TotalRecipients INT NOT NULL DEFAULT 0,
    SentCount INT NOT NULL DEFAULT 0,
    OpenedCount INT NOT NULL DEFAULT 0,
    ClickedCount INT NOT NULL DEFAULT 0,
    CompletedCount INT NOT NULL DEFAULT 0,
    
    -- Metadata
    CreatedBy UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Users(Id),
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    INDEX IX_EmailCampaigns_FormId (FormId),
    INDEX IX_EmailCampaigns_Status (Status),
    INDEX IX_EmailCampaigns_ScheduledAt (ScheduledAt),
    INDEX IX_EmailCampaigns_CreatedBy (CreatedBy)
);
```

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/login
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "refresh_token_here",
  "user": {
    "id": "guid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "User",
    "department": "IT"
  },
  "expiresAt": "2024-12-31T23:59:59Z"
}
```

#### POST /api/auth/refresh
```json
{
  "refreshToken": "refresh_token_here"
}
```

#### GET /api/auth/me
Returns current user information based on JWT token.

### Form Management Endpoints

#### GET /api/forms
Query Parameters:
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 20)
- `status`: Filter by status (draft, published, archived)
- `category`: Filter by category
- `sector`: Filter by sector
- `search`: Search in title and description

Response:
```json
{
  "items": [
    {
      "id": "guid",
      "title": "Vendor Risk Assessment",
      "description": "Comprehensive vendor evaluation form",
      "status": "published",
      "category": "Assessment",
      "sector": "Fintech",
      "submissionCount": 45,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-20T15:30:00Z"
    }
  ],
  "totalCount": 150,
  "page": 1,
  "pageSize": 20,
  "totalPages": 8
}
```

#### POST /api/forms
Create a new form:
```json
{
  "title": "New Assessment Form",
  "description": "Description here",
  "category": "Assessment",
  "sector": "Healthcare",
  "fields": [
    {
      "type": "text",
      "label": "Company Name",
      "required": true,
      "orderIndex": 1,
      "weightage": 10
    }
  ],
  "settings": {
    "allowMultipleSubmissions": false,
    "requireLogin": true,
    "showProgressBar": true,
    "theme": "light"
  }
}
```

#### GET /api/forms/{id}
Get form details including all fields and settings.

#### PUT /api/forms/{id}
Update existing form with same structure as POST.

#### DELETE /api/forms/{id}
Soft delete a form (set status to archived).

#### POST /api/forms/{id}/publish
Publish a draft form.

#### POST /api/forms/{id}/duplicate
```json
{
  "newTitle": "Copy of Original Form"
}
```

### Form Templates Endpoints

#### GET /api/templates
Query Parameters:
- `category`: Filter by category
- `sector`: Filter by sector  
- `search`: Search in name and description
- `complexity`: Filter by complexity level

Response includes 169 built-in templates categorized across 8 sectors.

#### POST /api/templates
Create custom template from existing form.

#### GET /api/templates/{id}
Get template details including all field configurations.

### Form Submissions Endpoints

#### GET /api/forms/{formId}/submissions
Get submissions for a specific form with filtering and pagination.

#### GET /api/submissions/{id}
Get detailed submission data including responses and attachments.

#### POST /api/submissions
Submit a form (typically called by form recipients):
```json
{
  "formId": "guid",
  "submitterEmail": "john@company.com",
  "submitterName": "John Doe",
  "submitterCompany": "ABC Corp",
  "responses": {
    "field_id_1": "Response value",
    "field_id_2": ["option1", "option2"]
  }
}
```

#### PUT /api/submissions/{id}/review
Review and score a submission:
```json
{
  "status": "approved", // approved, rejected, partially_approved
  "comments": "Approved with minor conditions",
  "score": {
    "totalScore": 85,
    "maxTotalScore": 100,
    "riskLevel": "low",
    "categoryScores": {},
    "aiOverride": false
  }
}
```

### Email Campaign Endpoints

#### POST /api/forms/{formId}/email-campaigns
Create and send email invitations:
```json
{
  "name": "Vendor Assessment Campaign",
  "subject": "Please complete our vendor assessment",
  "emailTemplate": "HTML email template",
  "recipients": [
    {
      "email": "vendor@company.com",
      "name": "Vendor Contact",
      "company": "Vendor Corp"
    }
  ],
  "reminderEnabled": true,
  "reminderIntervalDays": 7,
  "maxReminders": 3,
  "scheduledAt": "2024-02-01T09:00:00Z"
}
```

#### GET /api/email-campaigns/{id}/analytics
Get campaign performance metrics.

### Analytics Endpoints

#### GET /api/analytics/dashboard
Get dashboard summary data:
```json
{
  "totalForms": 45,
  "totalSubmissions": 1250,
  "completionRate": 78.5,
  "averageScore": 82.3,
  "riskDistribution": {
    "low": 60,
    "medium": 25,
    "high": 12,
    "critical": 3
  },
  "recentActivity": [],
  "topPerformingForms": []
}
```

#### GET /api/analytics/forms/{formId}
Get detailed analytics for a specific form.

#### POST /api/reports/generate
Generate custom reports:
```json
{
  "reportType": "submission_summary",
  "formIds": ["guid1", "guid2"],
  "dateRange": {
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
  },
  "format": "pdf", // pdf, excel, csv
  "includeCharts": true
}
```

## Data Transfer Objects (DTOs)

### FormDto
```csharp
public class FormDto
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
    public string Category { get; set; }
    public string Sector { get; set; }
    public List<FormFieldDto> Fields { get; set; }
    public FormSettingsDto Settings { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int SubmissionCount { get; set; }
    public UserDto CreatedBy { get; set; }
}
```

### FormFieldDto
```csharp
public class FormFieldDto
{
    public Guid Id { get; set; }
    public string Type { get; set; }
    public string Label { get; set; }
    public bool Required { get; set; }
    public int OrderIndex { get; set; }
    public string DefaultValue { get; set; }
    public string Placeholder { get; set; }
    public string Description { get; set; }
    public List<string> Options { get; set; }
    public decimal Weightage { get; set; }
    public ScoringConfigDto ScoringConfig { get; set; }
    public ValidationRulesDto ValidationRules { get; set; }
}
```

### SubmissionDto
```csharp
public class SubmissionDto
{
    public Guid Id { get; set; }
    public Guid FormId { get; set; }
    public string SubmitterName { get; set; }
    public string SubmitterEmail { get; set; }
    public string SubmitterCompany { get; set; }
    public string Status { get; set; }
    public DateTime SubmittedAt { get; set; }
    public Dictionary<string, object> Responses { get; set; }
    public List<DocumentAttachmentDto> Attachments { get; set; }
    public SubmissionScoreDto Score { get; set; }
    public List<ReviewActivityDto> ReviewHistory { get; set; }
}
```

## Security & Performance

### Authentication & Authorization
- JWT Bearer token authentication
- Role-based access control (Admin, User, Reviewer)
- Form-level permissions
- Rate limiting on API endpoints

### Data Protection
- AES-256 encryption for sensitive data
- HTTPS enforcement
- Input validation and sanitization
- SQL injection prevention
- File upload security (virus scanning)

### Performance Optimizations
- Database indexing on frequently queried columns
- Redis caching for frequently accessed data
- Pagination for large datasets
- Async operations for I/O bound tasks
- Connection pooling
- Background job processing for email campaigns

### Deployment Considerations
- Environment-specific configurations
- Health checks and monitoring
- Automated backups
- Load balancing support
- Docker containerization
- CI/CD pipeline integration

This API documentation provides a complete foundation for implementing a robust backend to support the React-based Form Builder application's advanced features and enterprise requirements.