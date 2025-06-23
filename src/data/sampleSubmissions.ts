
import { FormSubmission } from "@/types/form";

export const sampleSubmissions: FormSubmission[] = [
  {
    id: "sub-001",
    formId: "form-001",
    responses: {
      "company_name": "TechCorp Solutions",
      "contact_email": "john.doe@techcorp.com",
      "company_size": "100-500",
      "industry": "Technology",
      "risk_assessment": "Medium"
    },
    submittedAt: new Date("2024-01-15T10:30:00Z"),
    submittedBy: "john.doe@techcorp.com",
    status: "under_review",
    score: {
      total: 75,
      maxTotal: 100,
      riskLevel: "medium",
      reviewedBy: "Admin User",
      reviewedAt: new Date("2024-01-16T09:15:00Z"),
      reviewComments: "Initial review completed, needs additional documentation"
    },
    activityLog: [
      {
        id: "act-001",
        action: "under_review",
        comments: "Initial review completed, needs additional documentation for security compliance",
        reviewedBy: "Admin User",
        reviewedAt: new Date("2024-01-16T09:15:00Z"),
        metadata: {
          urgency: "medium",
          specificFields: ["security_compliance", "data_handling"],
          requiredDocuments: ["Security Certificate", "Data Privacy Policy"]
        }
      }
    ]
  },
  {
    id: "sub-002",
    formId: "form-001",
    responses: {
      "company_name": "StartupInc",
      "contact_email": "sarah@startupinc.com",
      "company_size": "1-50",
      "industry": "Fintech",
      "risk_assessment": "High"
    },
    submittedAt: new Date("2024-01-14T14:20:00Z"),
    submittedBy: "sarah@startupinc.com",
    status: "approved",
    score: {
      total: 90,
      maxTotal: 100,
      riskLevel: "low",
      reviewedBy: "Admin User",
      reviewedAt: new Date("2024-01-15T11:30:00Z"),
      reviewComments: "Excellent compliance record, approved for partnership"
    },
    activityLog: [
      {
        id: "act-002",
        action: "under_review",
        comments: "Reviewing fintech compliance requirements",
        reviewedBy: "Compliance Officer",
        reviewedAt: new Date("2024-01-14T16:00:00Z"),
        metadata: {
          urgency: "high",
          specificFields: ["financial_licenses"]
        }
      },
      {
        id: "act-003",
        action: "approved",
        comments: "All requirements met, excellent compliance record",
        reviewedBy: "Admin User",
        reviewedAt: new Date("2024-01-15T11:30:00Z"),
        metadata: {
          urgency: "medium"
        }
      }
    ]
  },
  {
    id: "sub-003",
    formId: "form-001",
    responses: {
      "company_name": "Global Enterprises",
      "contact_email": "mike@globalent.com",
      "company_size": "1000+",
      "industry": "Manufacturing"
    },
    submittedAt: new Date("2024-01-13T09:45:00Z"),
    submittedBy: "mike@globalent.com",
    status: "rejected",
    score: {
      total: 45,
      maxTotal: 100,
      riskLevel: "high",
      reviewedBy: "Risk Manager",
      reviewedAt: new Date("2024-01-14T08:20:00Z"),
      reviewComments: "High risk profile, multiple compliance issues identified"
    },
    activityLog: [
      {
        id: "act-004",
        action: "under_review",
        comments: "Reviewing large enterprise compliance requirements",
        reviewedBy: "Risk Manager",
        reviewedAt: new Date("2024-01-13T15:00:00Z"),
        metadata: {
          urgency: "medium",
          specificFields: ["environmental_compliance", "safety_records"]
        }
      },
      {
        id: "act-005",
        action: "rejected",
        comments: "Multiple compliance violations found in environmental and safety records",
        reviewedBy: "Risk Manager",
        reviewedAt: new Date("2024-01-14T08:20:00Z"),
        metadata: {
          reason: "policy_violation",
          urgency: "high",
          specificFields: ["environmental_compliance", "safety_records"],
          requiredDocuments: ["Updated Environmental Certificate", "Safety Audit Report"]
        }
      }
    ]
  },
  {
    id: "sub-004",
    formId: "form-001",
    responses: {
      "company_name": "HealthTech Pro",
      "contact_email": "anna@healthtech.com",
      "company_size": "50-100"
    },
    submittedAt: new Date("2024-01-12T16:15:00Z"),
    submittedBy: "anna@healthtech.com",
    status: "submitted",
    activityLog: [
      {
        id: "act-006",
        action: "reminder_sent",
        comments: "Reminder sent to complete missing required fields",
        reviewedBy: "System",
        reviewedAt: new Date("2024-01-13T10:00:00Z"),
        metadata: {
          urgency: "low",
          specificFields: ["industry", "risk_assessment"]
        }
      }
    ]
  },
  {
    id: "sub-005",
    formId: "form-001",
    responses: {
      "company_name": "EcoSolutions Ltd",
      "contact_email": "david@ecosolutions.com",
      "company_size": "200-500",
      "industry": "Environmental Services",
      "risk_assessment": "Low"
    },
    submittedAt: new Date("2024-01-11T11:30:00Z"),
    submittedBy: "david@ecosolutions.com",
    status: "under_review",
    score: {
      total: 85,
      maxTotal: 100,
      riskLevel: "low",
      reviewedBy: "Environmental Specialist",
      reviewedAt: new Date("2024-01-12T14:45:00Z"),
      reviewComments: "Strong environmental compliance, reviewing operational procedures"
    },
    activityLog: [
      {
        id: "act-007",
        action: "under_review",
        comments: "Excellent environmental compliance record, reviewing operational procedures",
        reviewedBy: "Environmental Specialist",
        reviewedAt: new Date("2024-01-12T14:45:00Z"),
        metadata: {
          urgency: "low",
          specificFields: ["operational_procedures"]
        }
      },
      {
        id: "act-008",
        action: "resent",
        comments: "Please provide additional details about waste management procedures",
        reviewedBy: "Environmental Specialist",
        reviewedAt: new Date("2024-01-13T09:30:00Z"),
        metadata: {
          urgency: "medium",
          specificFields: ["waste_management"],
          requiredDocuments: ["Waste Management Plan", "Environmental Impact Assessment"]
        }
      }
    ]
  }
];
