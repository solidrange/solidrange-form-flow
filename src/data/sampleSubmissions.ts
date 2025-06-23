
import { FormSubmission } from "@/types/form";

/**
 * Sample form submissions for testing and demonstration purposes
 * Includes both vendor and internal submission types with complete data
 */
export const sampleSubmissions: FormSubmission[] = [
  {
    id: "sub-001",
    formId: "form-001", 
    submittedAt: new Date("2024-01-15T10:30:00"),
    submitterEmail: "john.doe@acmecorp.com",
    submitterName: "John Doe",
    submissionType: "vendor",
    companyName: "ACME Corporation",
    vendorInfo: {
      isVendor: true,
      companyName: "ACME Corporation"
    },
    status: "under_review",
    completionPercentage: 95,
    timeSpent: 25,
    score: {
      total: 85,
      maxTotal: 100,
      percentage: 85,
      riskLevel: "medium",
      riskScore: 65,
      reviewedBy: "Sarah Wilson",
      reviewedAt: new Date("2024-01-16T09:15:00"),
      reviewComments: "Good overall compliance, minor issues with documentation.",
      categoryScores: {
        "Security": 90,
        "Compliance": 80,
        "Financial": 85
      }
    },
    responses: {
      "company-name": "ACME Corporation",
      "business-type": "Technology Services",
      "annual-revenue": "$10M - $50M",
      "employees": "100-500",
      "security-certification": ["ISO 27001", "SOC 2"],
      "data-handling": "Yes, we have comprehensive data handling procedures",
      "insurance-coverage": "$5M General Liability"
    },
    activityLog: [
      {
        id: "activity-001",
        action: "under_review",
        comments: "Starting initial review process",
        reviewedBy: "Sarah Wilson",
        reviewedAt: new Date("2024-01-16T09:15:00"),
        metadata: {
          urgency: "medium"
        }
      }
    ]
  },
  {
    id: "sub-002",
    formId: "form-001",
    submittedAt: new Date("2024-01-14T14:20:00"),
    submitterEmail: "mary.smith@techsolutions.com",
    submitterName: "Mary Smith",
    submissionType: "vendor",
    companyName: "Tech Solutions Ltd",
    vendorInfo: {
      isVendor: true,
      companyName: "Tech Solutions Ltd"
    },
    status: "approved",
    completionPercentage: 100,
    timeSpent: 32,
    score: {
      total: 92,
      maxTotal: 100,
      percentage: 92,
      riskLevel: "low",
      riskScore: 15,
      reviewedBy: "Mike Johnson",
      reviewedAt: new Date("2024-01-15T11:30:00"),
      reviewComments: "Excellent compliance record and documentation.",
      categoryScores: {
        "Security": 95,
        "Compliance": 90,
        "Financial": 91
      }
    },
    responses: {
      "company-name": "Tech Solutions Ltd",
      "business-type": "Software Development",
      "annual-revenue": "$5M - $10M",
      "employees": "50-100",
      "security-certification": ["ISO 27001", "SOC 2", "PCI DSS"],
      "data-handling": "Yes, we maintain strict data handling protocols with regular audits",
      "insurance-coverage": "$10M Professional Liability"
    },
    activityLog: [
      {
        id: "activity-002",
        action: "approved",
        comments: "All requirements met, approved for vendor partnership",
        reviewedBy: "Mike Johnson",
        reviewedAt: new Date("2024-01-15T11:30:00"),
        metadata: {
          urgency: "low"
        }
      }
    ]
  },
  {
    id: "sub-003", 
    formId: "form-001",
    submittedAt: new Date("2024-01-13T16:45:00"),
    submitterEmail: "bob.wilson@startupinc.com",
    submitterName: "Bob Wilson",
    submissionType: "vendor",
    companyName: "Startup Inc",
    vendorInfo: {
      isVendor: true,
      companyName: "Startup Inc"
    },
    status: "rejected",
    completionPercentage: 78,
    timeSpent: 18,
    score: {
      total: 45,
      maxTotal: 100,
      percentage: 45,
      riskLevel: "high",
      riskScore: 85,
      reviewedBy: "Sarah Wilson",
      reviewedAt: new Date("2024-01-14T10:00:00"),
      reviewComments: "Insufficient security measures and missing required certifications.",
      categoryScores: {
        "Security": 30,
        "Compliance": 50,
        "Financial": 55
      }
    },
    responses: {
      "company-name": "Startup Inc",
      "business-type": "Consulting",
      "annual-revenue": "$1M - $5M",
      "employees": "10-50",
      "security-certification": [],
      "data-handling": "Basic procedures in place",
      "insurance-coverage": "$1M General Liability"
    },
    activityLog: [
      {
        id: "activity-003",
        action: "rejected",
        comments: "Does not meet minimum security requirements",
        reviewedBy: "Sarah Wilson", 
        reviewedAt: new Date("2024-01-14T10:00:00"),
        metadata: {
          urgency: "high",
          rejectionReason: "insufficient_security",
          requiredDocuments: ["Security Audit Report", "ISO 27001 Certificate"]
        }
      }
    ]
  },
  {
    id: "sub-004",
    formId: "form-002",
    submittedAt: new Date("2024-01-12T09:15:00"),
    submitterEmail: "alice.brown@company.com",
    submitterName: "Alice Brown",
    submissionType: "internal",
    vendorInfo: {
      isVendor: false,
      companyName: "Internal"
    },
    status: "approved",
    completionPercentage: 100,
    timeSpent: 15,
    score: {
      total: 88,
      maxTotal: 100,
      percentage: 88,
      riskLevel: "low",
      riskScore: 20,
      reviewedBy: "HR Department",
      reviewedAt: new Date("2024-01-12T14:30:00"),
      reviewComments: "Internal assessment completed successfully.",
      categoryScores: {
        "Performance": 90,
        "Compliance": 85,
        "Training": 90
      }
    },
    responses: {
      "employee-id": "EMP-12345",
      "department": "Engineering",
      "role": "Senior Developer",
      "training-completed": ["Security Awareness", "GDPR Training"],
      "performance-rating": "Exceeds Expectations",
      "compliance-status": "Compliant"
    },
    activityLog: [
      {
        id: "activity-004",
        action: "approved",
        comments: "Internal review completed, all requirements met",
        reviewedBy: "HR Department",
        reviewedAt: new Date("2024-01-12T14:30:00"),
        metadata: {
          urgency: "low"
        }
      }
    ]
  }
];
