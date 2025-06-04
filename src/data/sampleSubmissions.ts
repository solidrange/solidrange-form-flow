
import { FormSubmission } from "@/types/form";

export const sampleSubmissions: FormSubmission[] = [
  {
    id: "1",
    formId: "vendor-risk-assessment",
    recipientId: "vendor@techcorp.com",
    companyName: "TechCorp Solutions",
    submissionType: "vendor",
    responses: {
      "company_name": "TechCorp Solutions",
      "primary_contact": "John Smith",
      "email": "vendor@techcorp.com",
      "data_handling": "We encrypt all data using AES-256",
      "security_certifications": ["SOC 2", "ISO 27001"],
      "backup_procedures": "Daily automated backups with 30-day retention",
      "incident_response": "24/7 incident response team with 2-hour SLA"
    },
    attachments: [],
    completionPercentage: 100,
    timeSpent: 1800,
    score: {
      total: 85,
      maxTotal: 100,
      percentage: 85,
      passed: true,
      riskLevel: "low",
      riskScore: 15,
      categoryScores: {
        "Security": 90,
        "Financial": 80,
        "Compliance": 85
      },
      manualReviewRequired: false,
      reviewedBy: "Security Team",
      reviewedAt: new Date('2024-12-01T10:30:00Z'),
      reviewComments: "Strong security posture with proper certifications."
    },
    submittedAt: new Date('2024-12-01T09:15:00Z'),
    status: "approved",
    lastModifiedAt: new Date('2024-12-01T10:30:00Z'),
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: "2",
    formId: "employee-feedback",
    recipientId: "internal@company.com",
    companyName: "Internal",
    submissionType: "internal",
    responses: {
      "employee_name": "Sarah Johnson",
      "department": "Marketing",
      "satisfaction_rating": "4",
      "work_environment": "The office environment is collaborative and supportive",
      "improvement_suggestions": "Better coffee in the break room and more flexible working hours",
      "manager_feedback": "My manager provides clear guidance and regular feedback"
    },
    attachments: [],
    completionPercentage: 85,
    timeSpent: 900,
    score: {
      total: 78,
      maxTotal: 100,
      percentage: 78,
      passed: true,
      riskLevel: "low",
      riskScore: 22,
      manualReviewRequired: false
    },
    submittedAt: new Date('2024-12-02T14:20:00Z'),
    status: "under_review",
    lastModifiedAt: new Date('2024-12-02T14:20:00Z'),
    ipAddress: "10.0.0.45",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
  },
  {
    id: "3",
    formId: "vendor-onboarding",
    recipientId: "vendor@datacorp.com",
    companyName: "DataCorp Analytics",
    submissionType: "vendor",
    responses: {
      "company_name": "DataCorp Analytics",
      "business_license": "Yes, valid until 2025",
      "insurance_coverage": "General liability $2M, Professional liability $1M",
      "references": ["Reference 1: ABC Corp", "Reference 2: XYZ Inc"],
      "payment_terms": "Net 30 days",
      "service_description": "Data analytics and business intelligence services"
    },
    attachments: [],
    completionPercentage: 90,
    timeSpent: 1200,
    submittedAt: new Date('2024-12-03T11:45:00Z'),
    status: "submitted",
    lastModifiedAt: new Date('2024-12-03T11:45:00Z'),
    ipAddress: "203.0.113.45",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: "4",
    formId: "compliance-assessment",
    recipientId: "vendor@securetech.com",
    companyName: "SecureTech Industries",
    submissionType: "vendor",
    responses: {
      "company_name": "SecureTech Industries",
      "gdpr_compliance": "Partially compliant",
      "data_retention": "We retain data for 5 years",
      "privacy_policy": "Available on our website",
      "employee_training": "Annual security training for all employees"
    },
    attachments: [],
    completionPercentage: 60,
    timeSpent: 600,
    score: {
      total: 25,
      maxTotal: 100,
      percentage: 25,
      passed: false,
      riskLevel: "critical",
      riskScore: 75,
      categoryScores: {
        "Security": 10,
        "Financial": 40,
        "Compliance": 25
      },
      manualReviewRequired: true,
      reviewedBy: "Compliance Team",
      reviewedAt: new Date('2024-12-04T16:00:00Z'),
      reviewComments: "Multiple compliance gaps identified. Requires immediate attention."
    },
    submittedAt: new Date('2024-12-04T15:30:00Z'),
    status: "rejected",
    lastModifiedAt: new Date('2024-12-04T16:00:00Z'),
    ipAddress: "198.51.100.23",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"
  },
  {
    id: "5",
    formId: "customer-satisfaction",
    recipientId: "internal@company.com",
    companyName: "Internal",
    submissionType: "internal",
    responses: {
      "customer_name": "Michael Chen",
      "service_rating": "5",
      "product_quality": "Excellent",
      "support_experience": "Very responsive and helpful",
      "recommendation_likelihood": "10",
      "additional_comments": "Outstanding service, will definitely recommend to others"
    },
    attachments: [],
    completionPercentage: 100,
    timeSpent: 450,
    score: {
      total: 95,
      maxTotal: 100,
      percentage: 95,
      passed: true,
      riskLevel: "low",
      riskScore: 5,
      manualReviewRequired: false
    },
    submittedAt: new Date('2024-12-05T09:12:00Z'),
    status: "approved",
    lastModifiedAt: new Date('2024-12-05T09:12:00Z'),
    ipAddress: "172.16.0.100",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15"
  },
  {
    id: "6",
    formId: "it-security-assessment",
    recipientId: "vendor@cloudprovider.com",
    companyName: "CloudProvider Inc",
    submissionType: "vendor",
    responses: {
      "company_name": "CloudProvider Inc",
      "network_security": "Multi-layered firewall and intrusion detection",
      "access_controls": "Role-based access with multi-factor authentication",
      "vulnerability_management": "Monthly vulnerability scans and quarterly penetration testing",
      "incident_procedures": "Documented incident response plan with 1-hour notification SLA"
    },
    attachments: [],
    completionPercentage: 95,
    timeSpent: 2100,
    score: {
      total: 88,
      maxTotal: 100,
      percentage: 88,
      passed: true,
      riskLevel: "low",
      riskScore: 12,
      categoryScores: {
        "Security": 92,
        "Compliance": 85,
        "Operations": 87
      },
      manualReviewRequired: false
    },
    submittedAt: new Date('2024-12-06T13:25:00Z'),
    status: "under_review",
    lastModifiedAt: new Date('2024-12-06T13:25:00Z'),
    ipAddress: "203.0.113.67",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: "7",
    formId: "event-registration",
    recipientId: "internal@company.com",
    companyName: "Internal",
    submissionType: "internal",
    responses: {
      "participant_name": "Emily Rodriguez",
      "department": "Human Resources",
      "event_preference": "Virtual",
      "dietary_restrictions": "Vegetarian",
      "accessibility_needs": "None",
      "emergency_contact": "555-0123"
    },
    attachments: [],
    completionPercentage: 100,
    timeSpent: 300,
    submittedAt: new Date('2024-12-07T10:45:00Z'),
    status: "submitted",
    lastModifiedAt: new Date('2024-12-07T10:45:00Z'),
    ipAddress: "10.0.0.78",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
  },
  {
    id: "8",
    formId: "financial-assessment",
    recipientId: "vendor@financetech.com",
    companyName: "FinanceTech Solutions",
    submissionType: "vendor",
    responses: {
      "company_name": "FinanceTech Solutions",
      "annual_revenue": "$5-10 million",
      "years_in_business": "8 years",
      "financial_statements": "Audited statements available",
      "credit_rating": "A-",
      "insurance_coverage": "Professional liability and cyber insurance"
    },
    attachments: [],
    completionPercentage: 75,
    timeSpent: 1800,
    score: {
      total: 72,
      maxTotal: 100,
      percentage: 72,
      passed: true,
      riskLevel: "medium",
      riskScore: 28,
      categoryScores: {
        "Financial": 75,
        "Stability": 70,
        "Risk": 71
      },
      manualReviewRequired: true,
      reviewedBy: "Finance Team",
      reviewedAt: new Date('2024-12-08T14:30:00Z'),
      reviewComments: "Good financial standing but requires additional documentation."
    },
    submittedAt: new Date('2024-12-08T12:15:00Z'),
    status: "under_review",
    lastModifiedAt: new Date('2024-12-08T14:30:00Z'),
    ipAddress: "198.51.100.89",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  }
];
