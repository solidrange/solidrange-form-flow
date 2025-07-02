# Form Builder & Submission Management API Documentation

## Overview
This document outlines the complete API specification and database schema required for implementing the backend of this Form Builder and Submission Management system using .NET Core Web API.

## Technology Stack
- **Framework**: .NET 8 Web API
- **Database**: SQL Server / PostgreSQL
- **ORM**: Entity Framework Core
- **Authentication**: JWT Bearer Token
- **File Storage**: Azure Blob Storage / AWS S3
- **Email Service**: SendGrid / SMTP

## Database Schema

### 1. Users Table
```sql
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Email NVARCHAR(255) NOT NULL UNIQUE,
    Name NVARCHAR(255) NOT NULL,
    PasswordHash NVARCHAR(500) NOT NULL,
    Role NVARCHAR(50) NOT NULL DEFAULT 'User', -- Admin, User, Reviewer
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    IsActive BIT NOT NULL DEFAULT 1
);
```

### 2. Forms Table
```sql
CREATE TABLE Forms (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Title NVARCHAR(500) NOT NULL,
    Description NTEXT,
    Status NVARCHAR(20) NOT NULL DEFAULT 'draft', -- draft, published
    CreatedBy UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Users(Id),
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    SubmissionCount INT NOT NULL DEFAULT 0,
    
    -- Settings (JSON stored as NVARCHAR(MAX))
    Settings NVARCHAR(MAX), -- JSON: allowMultipleSubmissions, requireLogin, etc.
    
    -- Analytics (JSON stored as NVARCHAR(MAX))
    Analytics NVARCHAR(MAX), -- JSON: views, submissions, completionRate, etc.
    
    INDEX IX_Forms_CreatedBy (CreatedBy),
    INDEX IX_Forms_Status (Status)
);
```

### 3. FormFields Table
```sql
CREATE TABLE FormFields (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    FormId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Forms(Id) ON DELETE CASCADE,
    FieldType NVARCHAR(50) NOT NULL, -- text, email, number, select, checkbox, etc.
    Label NVARCHAR(500) NOT NULL,
    IsRequired BIT NOT NULL DEFAULT 0,
    OrderIndex INT NOT NULL,
    DefaultValue NVARCHAR(MAX),
    Placeholder NVARCHAR(500),
    Description NTEXT,
    ValidationRegex NVARCHAR(500),
    ErrorMessage NVARCHAR(500),
    Weightage DECIMAL(5,2) DEFAULT 0,
    
    -- Options for select/radio fields (JSON array)
    Options NVARCHAR(MAX),
    
    -- Scoring configuration (JSON)
    ScoringConfig NVARCHAR(MAX),
    
    -- Validation rules (JSON)
    ValidationRules NVARCHAR(MAX),
    
    INDEX IX_FormFields_FormId (FormId),
    INDEX IX_FormFields_OrderIndex (OrderIndex)
);
```

### 4. FormTemplates Table
```sql
CREATE TABLE FormTemplates (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(255) NOT NULL,
    Description NTEXT,
    Category NVARCHAR(100) NOT NULL,
    PreviewUrl NVARCHAR(500),
    RiskCategories NVARCHAR(MAX), -- JSON array
    ScoringModel NVARCHAR(100),
    CreatedBy UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Users(Id),
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    IsActive BIT NOT NULL DEFAULT 1,
    
    INDEX IX_FormTemplates_Category (Category)
);
```

### 5. FormTemplateFields Table
```sql
CREATE TABLE FormTemplateFields (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    TemplateId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES FormTemplates(Id) ON DELETE CASCADE,
    FieldType NVARCHAR(50) NOT NULL,
    Label NVARCHAR(500) NOT NULL,
    IsRequired BIT NOT NULL DEFAULT 0,
    OrderIndex INT NOT NULL,
    DefaultValue NVARCHAR(MAX),
    Placeholder NVARCHAR(500),
    Description NTEXT,
    Options NVARCHAR(MAX), -- JSON array
    ScoringConfig NVARCHAR(MAX), -- JSON
    ValidationRules NVARCHAR(MAX), -- JSON
    
    INDEX IX_FormTemplateFields_TemplateId (TemplateId)
);
```

### 6. FormSubmissions Table
```sql
CREATE TABLE FormSubmissions (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    FormId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Forms(Id),
    SubmittedBy UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    SubmittedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    Status NVARCHAR(50) NOT NULL DEFAULT 'submitted', -- submitted, under_review, approved, rejected
    
    -- Submitter Information
    SubmitterEmail NVARCHAR(255) NOT NULL,
    SubmitterName NVARCHAR(255) NOT NULL,
    CompanyName NVARCHAR(255),
    RecipientId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES EmailRecipients(Id),
    
    -- Classification
    SubmissionType NVARCHAR(20) NOT NULL, -- vendor, internal
    
    -- Performance Metrics
    CompletionPercentage DECIMAL(5,2),
    TimeSpent INT, -- seconds
    
    -- Responses (JSON)
    Responses NVARCHAR(MAX) NOT NULL, -- JSON object with field responses
    
    INDEX IX_FormSubmissions_FormId (FormId),
    INDEX IX_FormSubmissions_Status (Status),
    INDEX IX_FormSubmissions_SubmittedAt (SubmittedAt)
);
```

### 7. SubmissionScores Table
```sql
CREATE TABLE SubmissionScores (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SubmissionId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES FormSubmissions(Id) ON DELETE CASCADE,
    TotalScore DECIMAL(10,2) NOT NULL,
    MaxTotalScore DECIMAL(10,2) NOT NULL,
    Percentage DECIMAL(5,2) NOT NULL,
    RiskLevel NVARCHAR(20) NOT NULL, -- low, medium, high, critical
    RiskScore DECIMAL(5,2),
    ReviewedBy UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Users(Id),
    ReviewedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    ReviewComments NTEXT,
    
    -- Detailed scoring (JSON)
    CategoryScores NVARCHAR(MAX), -- JSON object
    ScoreBreakdown NVARCHAR(MAX), -- JSON object
    
    INDEX IX_SubmissionScores_SubmissionId (SubmissionId),
    INDEX IX_SubmissionScores_RiskLevel (RiskLevel)
);
```

### 8. ReviewActivities Table
```sql
CREATE TABLE ReviewActivities (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SubmissionId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES FormSubmissions(Id) ON DELETE CASCADE,
    Action NVARCHAR(50) NOT NULL, -- approved, rejected, under_review, resent, reminder_sent, info_requested
    Comments NTEXT,
    ReviewedBy UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Users(Id),
    ReviewedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    -- Additional metadata (JSON)
    Metadata NVARCHAR(MAX),
    
    INDEX IX_ReviewActivities_SubmissionId (SubmissionId),
    INDEX IX_ReviewActivities_Action (Action)
);
```

### 9. DocumentAttachments Table
```sql
CREATE TABLE DocumentAttachments (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SubmissionId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES FormSubmissions(Id) ON DELETE CASCADE,
    FileName NVARCHAR(255) NOT NULL,
    FileType NVARCHAR(50) NOT NULL,
    FileSize BIGINT NOT NULL,
    FileUrl NVARCHAR(1000) NOT NULL,
    UploadedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UploadedBy UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    
    INDEX IX_DocumentAttachments_SubmissionId (SubmissionId)
);
```

### 10. EmailRecipients Table
```sql
CREATE TABLE EmailRecipients (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    FormId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Forms(Id) ON DELETE CASCADE,
    Email NVARCHAR(255) NOT NULL,
    Name NVARCHAR(255),
    Status NVARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, sent, opened, completed, expired
    RemindersSent INT NOT NULL DEFAULT 0,
    SentAt DATETIME2,
    CompletedAt DATETIME2,
    LastReminderAt DATETIME2,
    UniqueToken UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(), -- For tracking
    
    INDEX IX_EmailRecipients_FormId (FormId),
    INDEX IX_EmailRecipients_Status (Status),
    INDEX IX_EmailRecipients_UniqueToken (UniqueToken)
);
```

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/login
```csharp
// Request
public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
}

// Response
public class LoginResponse
{
    public string Token { get; set; }
    public UserDto User { get; set; }
    public DateTime ExpiresAt { get; set; }
}
```

#### POST /api/auth/register
```csharp
// Request
public class RegisterRequest
{
    public string Email { get; set; }
    public string Name { get; set; }
    public string Password { get; set; }
    public string Role { get; set; } = "User";
}
```

#### POST /api/auth/refresh
```csharp
// Request
public class RefreshTokenRequest
{
    public string RefreshToken { get; set; }
}
```

### Form Management Endpoints

#### GET /api/forms
```csharp
// Query Parameters
public class GetFormsQuery
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
    public string Status { get; set; } // draft, published
    public string Search { get; set; }
    public DateTime? CreatedAfter { get; set; }
}

// Response
public class PagedResult<T>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}
```

#### GET /api/forms/{id}
```csharp
// Response: FormDto with complete form data including fields
```

#### POST /api/forms
```csharp
// Request
public class CreateFormRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
    public List<FormFieldDto> Fields { get; set; }
    public FormSettingsDto Settings { get; set; }
}
```

#### PUT /api/forms/{id}
```csharp
// Request: Same as CreateFormRequest
```

#### DELETE /api/forms/{id}
```csharp
// No request body, returns 204 No Content
```

#### POST /api/forms/{id}/publish
```csharp
// No request body, changes status to 'published'
```

#### POST /api/forms/{id}/duplicate
```csharp
// Request
public class DuplicateFormRequest
{
    public string NewTitle { get; set; }
}
```

### Form Fields Endpoints

#### GET /api/forms/{formId}/fields
```csharp
// Response: List<FormFieldDto>
```

#### POST /api/forms/{formId}/fields
```csharp
// Request: FormFieldDto
```

#### PUT /api/forms/{formId}/fields/{fieldId}
```csharp
// Request: FormFieldDto
```

#### DELETE /api/forms/{formId}/fields/{fieldId}
```csharp
// No request body
```

#### PUT /api/forms/{formId}/fields/reorder
```csharp
// Request
public class ReorderFieldsRequest
{
    public List<FieldOrderDto> Fields { get; set; }
}

public class FieldOrderDto
{
    public Guid FieldId { get; set; }
    public int OrderIndex { get; set; }
}
```

### Form Templates Endpoints

#### GET /api/templates
```csharp
// Query Parameters
public class GetTemplatesQuery
{
    public string Category { get; set; }
    public string Search { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}
```

#### GET /api/templates/{id}
```csharp
// Response: FormTemplateDto
```

#### POST /api/templates
```csharp
// Request: CreateTemplateRequest
```

#### PUT /api/templates/{id}
```csharp
// Request: UpdateTemplateRequest
```

#### DELETE /api/templates/{id}
```csharp
// No request body
```

#### POST /api/templates/{id}/create-form
```csharp
// Request
public class CreateFormFromTemplateRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
}
```

### Form Submissions Endpoints

#### GET /api/submissions
```csharp
// Query Parameters
public class GetSubmissionsQuery
{
    public Guid? FormId { get; set; }
    public string Status { get; set; }
    public string SubmissionType { get; set; }
    public DateTime? SubmittedAfter { get; set; }
    public DateTime? SubmittedBefore { get; set; }
    public string Search { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}
```

#### GET /api/submissions/{id}
```csharp
// Response: FormSubmissionDto with complete data
```

#### POST /api/submissions
```csharp
// Request
public class CreateSubmissionRequest
{
    public Guid FormId { get; set; }
    public string SubmitterEmail { get; set; }
    public string SubmitterName { get; set; }
    public string CompanyName { get; set; }
    public string SubmissionType { get; set; }
    public Dictionary<string, object> Responses { get; set; }
    public List<DocumentUploadDto> Attachments { get; set; }
}
```

#### PUT /api/submissions/{id}/status
```csharp
// Request
public class UpdateSubmissionStatusRequest
{
    public string Status { get; set; }
    public string Comments { get; set; }
}
```

#### POST /api/submissions/{id}/score
```csharp
// Request
public class ScoreSubmissionRequest
{
    public decimal TotalScore { get; set; }
    public decimal MaxTotalScore { get; set; }
    public string RiskLevel { get; set; }
    public decimal? RiskScore { get; set; }
    public string ReviewComments { get; set; }
    public Dictionary<string, decimal> CategoryScores { get; set; }
    public Dictionary<string, decimal> ScoreBreakdown { get; set; }
}
```

#### POST /api/submissions/{id}/review
```csharp
// Request
public class AddReviewActivityRequest
{
    public string Action { get; set; }
    public string Comments { get; set; }
    public object Metadata { get; set; }
}
```

### Email Management Endpoints

#### GET /api/forms/{formId}/recipients
```csharp
// Response: List<EmailRecipientDto>
```

#### POST /api/forms/{formId}/recipients
```csharp
// Request
public class AddRecipientsRequest
{
    public List<EmailRecipientDto> Recipients { get; set; }
}
```

#### PUT /api/forms/{formId}/recipients/{recipientId}
```csharp
// Request: EmailRecipientDto
```

#### DELETE /api/forms/{formId}/recipients/{recipientId}
```csharp
// No request body
```

#### POST /api/forms/{formId}/send-invitations
```csharp
// Request
public class SendInvitationsRequest
{
    public List<Guid> RecipientIds { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
}
```

#### POST /api/forms/{formId}/send-reminders
```csharp
// Request
public class SendRemindersRequest
{
    public List<Guid> RecipientIds { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
}
```

### File Management Endpoints

#### POST /api/files/upload
```csharp
// Request: IFormFile
// Response
public class FileUploadResponse
{
    public string FileId { get; set; }
    public string FileName { get; set; }
    public string FileUrl { get; set; }
    public long FileSize { get; set; }
    public string FileType { get; set; }
}
```

#### GET /api/files/{fileId}
```csharp
// Response: File stream
```

#### DELETE /api/files/{fileId}
```csharp
// No request body
```

### Analytics Endpoints

#### GET /api/forms/{formId}/analytics
```csharp
// Response
public class FormAnalyticsDto
{
    public int Views { get; set; }
    public int Submissions { get; set; }
    public decimal CompletionRate { get; set; }
    public int EmailsSent { get; set; }
    public int EmailsCompleted { get; set; }
    public double AverageCompletionTime { get; set; }
    public decimal DropoffRate { get; set; }
    public List<AnalyticsDataPoint> SubmissionsTrend { get; set; }
    public List<AnalyticsDataPoint> CompletionRateTrend { get; set; }
}
```

#### GET /api/analytics/dashboard
```csharp
// Response
public class DashboardAnalyticsDto
{
    public int TotalForms { get; set; }
    public int TotalSubmissions { get; set; }
    public int PendingReviews { get; set; }
    public decimal AverageCompletionRate { get; set; }
    public List<FormAnalyticsSummary> TopForms { get; set; }
    public List<AnalyticsDataPoint> SubmissionsTrend { get; set; }
}
```

### Reports Endpoints

#### GET /api/reports/quick/{reportType}
```csharp
// Path Parameters: reportType (executive-summary, risk-analysis, etc.)
// Query Parameters
public class QuickReportQuery
{
    public Guid? FormId { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string Format { get; set; } = "json"; // json, pdf, excel
}
```

#### POST /api/reports/custom
```csharp
// Request
public class CustomReportRequest
{
    public string Title { get; set; }
    public List<Guid> FormIds { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public List<string> Metrics { get; set; }
    public List<string> ChartTypes { get; set; }
    public string Format { get; set; } = "json";
}
```

#### GET /api/reports/{reportId}/download
```csharp
// Response: File stream (PDF/Excel)
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
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int SubmissionCount { get; set; }
    public List<FormFieldDto> Fields { get; set; }
    public FormSettingsDto Settings { get; set; }
    public FormAnalyticsDto Analytics { get; set; }
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
    public object DefaultValue { get; set; }
    public string Placeholder { get; set; }
    public string Description { get; set; }
    public string ValidationRegex { get; set; }
    public string ErrorMessage { get; set; }
    public decimal? Weightage { get; set; }
    public List<string> Options { get; set; }
    public ScoringConfigDto ScoringConfig { get; set; }
    public ValidationRulesDto ValidationRules { get; set; }
}
```

### FormSettingsDto
```csharp
public class FormSettingsDto
{
    public bool AllowMultipleSubmissions { get; set; }
    public bool RequireLogin { get; set; }
    public bool ShowProgressBar { get; set; }
    public string Theme { get; set; }
    public string CustomCss { get; set; }
    public ScoringSettingsDto Scoring { get; set; }
    public ExpirationSettingsDto Expiration { get; set; }
    public EmailDistributionSettingsDto EmailDistribution { get; set; }
    public ApprovalSettingsDto Approval { get; set; }
    public DocumentSettingsDto Documents { get; set; }
}
```

### FormSubmissionDto
```csharp
public class FormSubmissionDto
{
    public Guid Id { get; set; }
    public Guid FormId { get; set; }
    public DateTime SubmittedAt { get; set; }
    public string Status { get; set; }
    public string SubmitterEmail { get; set; }
    public string SubmitterName { get; set; }
    public string CompanyName { get; set; }
    public string SubmissionType { get; set; }
    public decimal? CompletionPercentage { get; set; }
    public int? TimeSpent { get; set; }
    public Dictionary<string, object> Responses { get; set; }
    public SubmissionScoreDto Score { get; set; }
    public List<ReviewActivityDto> ActivityLog { get; set; }
    public List<DocumentAttachmentDto> Attachments { get; set; }
    public FormDto Form { get; set; }
}
```

## Implementation Notes

### Entity Framework Configuration
```csharp
// Program.cs
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// ApplicationDbContext.cs
public class ApplicationDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Form> Forms { get; set; }
    public DbSet<FormField> FormFields { get; set; }
    public DbSet<FormSubmission> FormSubmissions { get; set; }
    // ... other DbSets

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure JSON columns
        modelBuilder.Entity<Form>()
            .Property(e => e.Settings)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                v => JsonSerializer.Deserialize<FormSettingsDto>(v, (JsonSerializerOptions)null));
        
        // Configure relationships
        modelBuilder.Entity<FormField>()
            .HasOne<Form>()
            .WithMany()
            .HasForeignKey(f => f.FormId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
```

### Authentication Configuration
```csharp
// Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
```

### File Storage Service
```csharp
public interface IFileStorageService
{
    Task<string> UploadFileAsync(IFormFile file, string containerName);
    Task<Stream> DownloadFileAsync(string fileUrl);
    Task DeleteFileAsync(string fileUrl);
}

// Azure Blob Storage Implementation
public class AzureBlobStorageService : IFileStorageService
{
    private readonly BlobServiceClient _blobServiceClient;
    
    public async Task<string> UploadFileAsync(IFormFile file, string containerName)
    {
        var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
        var blobName = $"{Guid.NewGuid()}-{file.FileName}";
        var blobClient = containerClient.GetBlobClient(blobName);
        
        await blobClient.UploadAsync(file.OpenReadStream(), true);
        return blobClient.Uri.ToString();
    }
}
```

### Email Service
```csharp
public interface IEmailService
{
    Task SendFormInvitationAsync(EmailRecipient recipient, Form form, string invitationUrl);
    Task SendReminderAsync(EmailRecipient recipient, Form form, string formUrl);
    Task SendFormCompletionNotificationAsync(FormSubmission submission);
}
```

### Background Services
```csharp
// Reminder service to send email reminders
public class EmailReminderService : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await ProcessEmailReminders();
            await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
        }
    }
}
```

## Security Considerations

1. **Authentication**: Use JWT tokens with proper expiration
2. **Authorization**: Implement role-based access control
3. **Input Validation**: Validate all inputs using Data Annotations and FluentValidation
4. **SQL Injection**: Use Entity Framework parameterized queries
5. **File Upload**: Validate file types and sizes, scan for malware
6. **CORS**: Configure proper CORS policies for frontend domains
7. **Rate Limiting**: Implement rate limiting for API endpoints
8. **HTTPS**: Enforce HTTPS in production

## Performance Optimizations

1. **Database Indexing**: Add indexes on frequently queried columns
2. **Caching**: Use Redis for caching frequently accessed data
3. **Pagination**: Implement proper pagination for large datasets
4. **Async Operations**: Use async/await throughout the application
5. **Connection Pooling**: Configure Entity Framework connection pooling
6. **Background Processing**: Use Hangfire for heavy operations like report generation

## Deployment Checklist

1. **Database Migration**: Set up Entity Framework migrations
2. **Environment Variables**: Configure connection strings and secrets
3. **Logging**: Set up structured logging with Serilog
4. **Health Checks**: Implement health check endpoints
5. **Monitoring**: Set up Application Insights or similar monitoring
6. **Load Balancing**: Configure load balancer if needed
7. **SSL Certificate**: Set up SSL certificate for HTTPS
8. **Backup Strategy**: Implement database backup strategy

This documentation provides a complete foundation for implementing the .NET backend for your Form Builder and Submission Management system.
