import { FormSubmission } from "@/types/form";

export const sampleSubmissions: FormSubmission[] = [
  {
    id: "sub-001",
    formId: "form-vendor-assessment",
    submittedBy: "Sarah Johnson",
    submitterEmail: "sarah.johnson@techcorp.com",
    submitterName: "Sarah Johnson",
    companyName: "TechCorp Solutions",
    submissionType: "vendor",
    submittedAt: new Date("2024-01-15T10:30:00Z"),
    status: "approved",
    responses: {
      "company_name": "TechCorp Solutions",
      "business_type": "Technology Services",
      "annual_revenue": "$5M - $10M",
      "employee_count": "50-100",
      "data_security_measures": "ISO 27001 certified, SOC 2 Type II compliant",
      "compliance_certifications": ["ISO 27001", "SOC 2", "GDPR"],
      "previous_incidents": "None in the past 3 years",
      "insurance_coverage": "$2M Cyber Liability Insurance",
      "references": [
        { company: "Global Finance Corp", contact: "mike.chen@globalfinance.com" },
        { company: "Healthcare Plus", contact: "lisa.wong@healthcareplus.com" }
      ]
    },
    score: {
      total: 92,
      maxTotal: 100,
      percentage: 92,
      riskLevel: "low",
      reviewedBy: "John Reviewer",
      reviewedAt: new Date("2024-01-16T09:00:00Z"),
      reviewComments: "Excellent security posture and compliance. Strong references. Approved for partnership.",
      breakdown: {
        security: 95,
        compliance: 90,
        financial: 88,
        operational: 94
      }
    },
    activityLog: [
      {
        id: "act-001",
        action: "approved",
        comments: "Excellent security posture and compliance. Strong references. Approved for partnership.",
        reviewedBy: "John Reviewer",
        reviewedAt: new Date("2024-01-16T09:00:00Z")
      }
    ],
    attachments: [
      {
        id: "att-001",
        name: "ISO_27001_Certificate.pdf",
        url: "/documents/iso-cert.pdf",
        size: 245760,
        type: "application/pdf",
        uploadedAt: new Date("2024-01-15T10:25:00Z")
      },
      {
        id: "att-002", 
        name: "SOC2_Report.pdf",
        url: "/documents/soc2-report.pdf",
        size: 512000,
        type: "application/pdf",
        uploadedAt: new Date("2024-01-15T10:26:00Z")
      }
    ]
  },
  {
    id: "sub-002",
    formId: "form-vendor-assessment",
    submittedBy: "Marcus Rodriguez",
    submitterEmail: "marcus@startupventures.io",
    submitterName: "Marcus Rodriguez",
    companyName: "StartupVentures Inc",
    submissionType: "vendor",
    submittedAt: new Date("2024-01-20T14:15:00Z"),
    status: "under_review",
    responses: {
      "company_name": "StartupVentures Inc",
      "business_type": "Software Development",
      "annual_revenue": "$1M - $5M",
      "employee_count": "10-25",
      "data_security_measures": "Basic security protocols, working towards SOC 2",
      "compliance_certifications": ["GDPR"],
      "previous_incidents": "Minor data breach resolved in 2023",
      "insurance_coverage": "$500K Professional Liability",
      "references": [
        { company: "Local Bank", contact: "jane.doe@localbank.com" }
      ]
    },
    score: {
      total: 68,
      maxTotal: 100,
      percentage: 68,
      riskLevel: "medium",
      reviewedBy: "Sarah Analyst",
      reviewedAt: new Date("2024-01-21T10:30:00Z"),
      reviewComments: "Adequate for small partnership. Recommend security improvements before larger engagement.",
      breakdown: {
        security: 60,
        compliance: 70,
        financial: 72,
        operational: 70
      }
    },
    activityLog: [
      {
        id: "act-002",
        action: "under_review",
        comments: "Adequate for small partnership. Recommend security improvements before larger engagement.",
        reviewedBy: "Sarah Analyst",
        reviewedAt: new Date("2024-01-21T10:30:00Z")
      }
    ],
    attachments: [
      {
        id: "att-003",
        name: "Company_Profile.pdf",
        url: "/documents/company-profile.pdf",
        size: 156000,
        type: "application/pdf",
        uploadedAt: new Date("2024-01-20T14:10:00Z")
      }
    ]
  },
  {
    id: "sub-003",
    formId: "form-vendor-assessment",
    submittedBy: "Amanda Chen",
    submitterEmail: "a.chen@globalsecure.com",
    submitterName: "Amanda Chen",
    companyName: "GlobalSecure Systems",
    submissionType: "vendor",
    submittedAt: new Date("2024-01-25T09:45:00Z"),
    status: "approved",
    responses: {
      "company_name": "GlobalSecure Systems",
      "business_type": "Cybersecurity Services",
      "annual_revenue": "$25M+",
      "employee_count": "500+",
      "data_security_measures": "Multi-layered security, zero-trust architecture, 24/7 SOC",
      "compliance_certifications": ["ISO 27001", "SOC 2", "FedRAMP", "PCI DSS"],
      "previous_incidents": "No security incidents reported",
      "insurance_coverage": "$10M Cyber Liability + Errors & Omissions",
      "references": [
        { company: "Fortune 500 Bank", contact: "secure@fortune500bank.com" },
        { company: "Government Agency", contact: "procurement@gov.agency" },
        { company: "Healthcare Network", contact: "ciso@healthnet.org" }
      ]
    },
    score: {
      total: 98,
      maxTotal: 100,
      percentage: 98,
      riskLevel: "low",
      reviewedBy: "John Reviewer",
      reviewedAt: new Date("2024-01-26T08:15:00Z"),
      reviewComments: "Premium vendor with exceptional security posture. Highly recommended for critical projects.",
      breakdown: {
        security: 100,
        compliance: 98,
        financial: 95,
        operational: 99
      }
    },
    activityLog: [
      {
        id: "act-003",
        action: "approved", 
        comments: "Premium vendor with exceptional security posture. Highly recommended for critical projects.",
        reviewedBy: "John Reviewer",
        reviewedAt: new Date("2024-01-26T08:15:00Z")
      }
    ],
    attachments: [
      {
        id: "att-004",
        name: "FedRAMP_Authorization.pdf",
        url: "/documents/fedramp-auth.pdf",
        size: 890000,
        type: "application/pdf",
        uploadedAt: new Date("2024-01-25T09:40:00Z")
      },
      {
        id: "att-005",
        name: "Security_Architecture.pdf",
        url: "/documents/security-arch.pdf",
        size: 1200000,
        type: "application/pdf",
        uploadedAt: new Date("2024-01-25T09:42:00Z")
      }
    ]
  },
  {
    id: "sub-004",
    formId: "form-vendor-assessment",
    submittedBy: "David Kim",
    submitterEmail: "dkim@riskycorp.com",
    submitterName: "David Kim",
    companyName: "RiskyCorp LLC",
    submissionType: "vendor",
    submittedAt: new Date("2024-02-01T16:20:00Z"),
    status: "rejected",
    responses: {
      "company_name": "RiskyCorp LLC",
      "business_type": "Data Processing",
      "annual_revenue": "$500K - $1M",
      "employee_count": "5-10",
      "data_security_measures": "Basic password protection, no formal policies",
      "compliance_certifications": [],
      "previous_incidents": "Multiple data breaches in 2022-2023",
      "insurance_coverage": "None",
      "references": []
    },
    score: {
      total: 25,
      maxTotal: 100,
      percentage: 25,
      riskLevel: "critical",
      reviewedBy: "Risk Team Lead",
      reviewedAt: new Date("2024-02-02T11:00:00Z"),
      reviewComments: "Unacceptable risk level. Multiple security incidents and no compliance measures. Rejected.",
      breakdown: {
        security: 15,
        compliance: 20,
        financial: 35,
        operational: 30
      }
    },
    activityLog: [
      {
        id: "act-004",
        action: "rejected",
        comments: "Unacceptable risk level. Multiple security incidents and no compliance measures. Rejected.",
        reviewedBy: "Risk Team Lead",
        reviewedAt: new Date("2024-02-02T11:00:00Z")
      }
    ],
    attachments: []
  },
  {
    id: "sub-005",
    formId: "form-internal-assessment",
    submittedBy: "Jennifer Walsh",
    submitterEmail: "j.walsh@ourcompany.com",
    submitterName: "Jennifer Walsh",
    companyName: "Our Company",
    submissionType: "internal",
    submittedAt: new Date("2024-02-05T11:00:00Z"),
    status: "approved",
    responses: {
      "department": "Human Resources",
      "project_name": "Employee Data Management System",
      "data_classification": "Confidential",
      "access_requirements": "HR staff only, role-based access",
      "retention_period": "7 years per policy",
      "third_party_integrations": ["Payroll System", "Benefits Platform"],
      "security_measures": "Encrypted database, audit logging, access controls"
    },
    score: {
      total: 88,
      maxTotal: 100,
      percentage: 88,
      riskLevel: "low",
      reviewedBy: "Internal Reviewer",
      reviewedAt: new Date("2024-02-06T09:30:00Z"),
      reviewComments: "Well-designed internal project with appropriate security controls. Approved.",
      breakdown: {
        security: 90,
        compliance: 85,
        privacy: 90,
        operational: 87
      }
    },
    activityLog: [
      {
        id: "act-005",
        action: "approved",
        comments: "Well-designed internal project with appropriate security controls. Approved.",
        reviewedBy: "Internal Reviewer",
        reviewedAt: new Date("2024-02-06T09:30:00Z")
      }
    ],
    attachments: [
      {
        id: "att-006",
        name: "Project_Specification.docx",
        url: "/documents/project-spec.docx",
        size: 245000,
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        uploadedAt: new Date("2024-02-05T10:55:00Z")
      }
    ]
  },
  {
    id: "sub-006",
    formId: "form-vendor-assessment",
    submittedBy: "Roberto Silva",
    submitterEmail: "r.silva@mediumrisk.com",
    submitterName: "Roberto Silva",
    companyName: "MediumRisk Solutions",
    submissionType: "vendor",
    submittedAt: new Date("2024-02-10T13:30:00Z"),
    status: "under_review",
    responses: {
      "company_name": "MediumRisk Solutions",
      "business_type": "Cloud Services",
      "annual_revenue": "$10M - $25M",
      "employee_count": "100-250",
      "data_security_measures": "SOC 2 Type I, working towards Type II",
      "compliance_certifications": ["SOC 2 Type I"],
      "previous_incidents": "One minor incident in 2023, promptly resolved",
      "insurance_coverage": "$3M Cyber Liability",
      "references": [
        { company: "Mid-size Corp", contact: "security@midsizecorp.com" },
        { company: "Regional Bank", contact: "vendor@regionalbank.com" }
      ]
    },
    score: {
      total: 75,
      maxTotal: 100,
      percentage: 75,
      riskLevel: "medium",
      reviewedBy: "Security Analyst",
      reviewedAt: new Date("2024-02-11T14:00:00Z"),
      reviewComments: "Reasonable security posture. Monitoring progress on SOC 2 Type II certification.",
      breakdown: {
        security: 72,
        compliance: 78,
        financial: 76,
        operational: 74
      }
    },
    activityLog: [
      {
        id: "act-006",
        action: "under_review",
        comments: "Reasonable security posture. Monitoring progress on SOC 2 Type II certification.",
        reviewedBy: "Security Analyst",
        reviewedAt: new Date("2024-02-11T14:00:00Z")
      }
    ],
    attachments: [
      {
        id: "att-007",
        name: "SOC2_TypeI_Report.pdf",
        url: "/documents/soc2-type1.pdf",
        size: 445000,
        type: "application/pdf",
        uploadedAt: new Date("2024-02-10T13:25:00Z")
      }
    ]
  },
  {
    id: "sub-007",
    formId: "form-vendor-assessment",
    submittedBy: "Emily Foster",
    submitterEmail: "e.foster@highriskco.net",
    submitterName: "Emily Foster",
    companyName: "HighRisk Co",
    submissionType: "vendor",
    submittedAt: new Date("2024-02-12T15:45:00Z"),
    status: "rejected",
    responses: {
      "company_name": "HighRisk Co",
      "business_type": "Data Analytics",
      "annual_revenue": "$2M - $5M",
      "employee_count": "25-50",
      "data_security_measures": "Outdated security systems, no regular updates",
      "compliance_certifications": [],
      "previous_incidents": "Major data breach in 2023, ongoing legal issues",
      "insurance_coverage": "$100K General Liability (insufficient)",
      "references": [
        { company: "Former Client", contact: "complaints@formerclient.com" }
      ]
    },
    score: {
      total: 35,
      maxTotal: 100,
      percentage: 35,
      riskLevel: "high",
      reviewedBy: "Risk Assessment Team",
      reviewedAt: new Date("2024-02-13T10:00:00Z"),
      reviewComments: "High risk due to recent breach and inadequate security measures. Rejected.",
      breakdown: {
        security: 25,
        compliance: 30,
        financial: 45,
        operational: 40
      }
    },
    activityLog: [
      {
        id: "act-007",
        action: "rejected",
        comments: "High risk due to recent breach and inadequate security measures. Rejected.",
        reviewedBy: "Risk Assessment Team",
        reviewedAt: new Date("2024-02-13T10:00:00Z")
      }
    ],
    attachments: []
  },
  {
    id: "sub-008",
    formId: "form-internal-assessment",
    submittedBy: "Michael Thompson",
    submitterEmail: "m.thompson@ourcompany.com",
    submitterName: "Michael Thompson",
    companyName: "Our Company",
    submissionType: "internal",
    submittedAt: new Date("2024-02-15T10:15:00Z"),
    status: "approved",
    responses: {
      "department": "Marketing",
      "project_name": "Customer Analytics Platform", 
      "data_classification": "Internal",
      "access_requirements": "Marketing team and approved analysts",
      "retention_period": "3 years",
      "third_party_integrations": ["Analytics Platform", "CRM System"],
      "security_measures": "Role-based access, data anonymization, regular backups"
    },
    score: {
      total: 82,
      maxTotal: 100,
      percentage: 82,
      riskLevel: "low",
      reviewedBy: "Security Compliance",
      reviewedAt: new Date("2024-02-16T11:30:00Z"),
      reviewComments: "Good project design with appropriate data handling. Approved with standard monitoring.",
      breakdown: {
        security: 80,
        compliance: 85,
        privacy: 82,
        operational: 81
      }
    },
    activityLog: [
      {
        id: "act-008",
        action: "approved",
        comments: "Good project design with appropriate data handling. Approved with standard monitoring.",
        reviewedBy: "Security Compliance",
        reviewedAt: new Date("2024-02-16T11:30:00Z")
      }
    ],
    attachments: [
      {
        id: "att-008",
        name: "Data_Flow_Diagram.pdf",
        url: "/documents/data-flow.pdf",
        size: 167000,
        type: "application/pdf",
        uploadedAt: new Date("2024-02-15T10:10:00Z")
      }
    ]
  },
  {
    id: "sub-009",
    formId: "form-vendor-assessment",
    submittedBy: "Lisa Park",
    submitterEmail: "l.park@excellentvendor.com",
    submitterName: "Lisa Park",
    companyName: "ExcellentVendor Inc",
    submissionType: "vendor",
    submittedAt: new Date("2024-02-18T12:00:00Z"),
    status: "approved",
    responses: {
      "company_name": "ExcellentVendor Inc",
      "business_type": "Enterprise Software",
      "annual_revenue": "$50M+",
      "employee_count": "1000+",
      "data_security_measures": "Enterprise-grade security, regular penetration testing, SIEM",
      "compliance_certifications": ["ISO 27001", "SOC 2 Type II", "ISO 9001", "PCI DSS"],
      "previous_incidents": "No incidents in 5+ years",
      "insurance_coverage": "$25M Comprehensive Coverage",
      "references": [
        { company: "Fortune 100 Corp", contact: "vendor.management@fortune100.com" },
        { company: "Global Manufacturing", contact: "procurement@globalmanuf.com" },
        { company: "International Bank", contact: "risk@intlbank.com" }
      ]
    },
    score: {
      total: 96,
      maxTotal: 100,
      percentage: 96,
      riskLevel: "low",
      reviewedBy: "Vendor Management",
      reviewedAt: new Date("2024-02-19T09:45:00Z"),
      reviewComments: "Top-tier vendor with exceptional track record. Highly recommended for strategic partnerships.",
      breakdown: {
        security: 98,
        compliance: 95,
        financial: 94,
        operational: 97
      }
    },
    activityLog: [
      {
        id: "act-009",
        action: "approved",
        comments: "Top-tier vendor with exceptional track record. Highly recommended for strategic partnerships.",
        reviewedBy: "Vendor Management",
        reviewedAt: new Date("2024-02-19T09:45:00Z")
      }
    ],
    attachments: [
      {
        id: "att-009",
        name: "Enterprise_Security_Overview.pdf",
        url: "/documents/enterprise-security.pdf",
        size: 1450000,
        type: "application/pdf",
        uploadedAt: new Date("2024-02-18T11:55:00Z")
      },
      {
        id: "att-010",
        name: "Compliance_Certificates.pdf",
        url: "/documents/compliance-certs.pdf",
        size: 890000,
        type: "application/pdf",
        uploadedAt: new Date("2024-02-18T11:57:00Z")
      }
    ]
  },
  {
    id: "sub-010",
    formId: "form-vendor-assessment",
    submittedBy: "Carlos Mendez",
    submitterEmail: "c.mendez@emergingtech.io",
    submitterName: "Carlos Mendez",
    companyName: "EmergingTech Solutions",
    submissionType: "vendor",
    submittedAt: new Date("2024-02-20T14:30:00Z"),
    status: "under_review",
    responses: {
      "company_name": "EmergingTech Solutions",
      "business_type": "AI/ML Services",
      "annual_revenue": "$3M - $10M",
      "employee_count": "75-100",
      "data_security_measures": "Modern security stack, AI-powered threat detection",
      "compliance_certifications": ["SOC 2 Type II", "GDPR"],
      "previous_incidents": "None reported",
      "insurance_coverage": "$5M Tech E&O + Cyber Coverage",
      "references": [
        { company: "Tech Startup Hub", contact: "partners@techstartup.com" },
        { company: "Innovation Corp", contact: "vendor.relations@innovationcorp.com" }
      ]
    },
    score: {
      total: 84,
      maxTotal: 100,
      percentage: 84,
      riskLevel: "low",
      reviewedBy: "Tech Review Team",
      reviewedAt: new Date("2024-02-21T10:15:00Z"),
      reviewComments: "Promising emerging vendor with strong technical capabilities. Conducting due diligence review.",
      breakdown: {
        security: 85,
        compliance: 82,
        financial: 80,
        operational: 89
      }
    },
    activityLog: [
      {
        id: "act-010",
        action: "under_review",
        comments: "Promising emerging vendor with strong technical capabilities. Conducting due diligence review.",
        reviewedBy: "Tech Review Team",
        reviewedAt: new Date("2024-02-21T10:15:00Z")
      }
    ],
    attachments: [
      {
        id: "att-011",
        name: "AI_Security_Framework.pdf",
        url: "/documents/ai-security.pdf",
        size: 678000,
        type: "application/pdf",
        uploadedAt: new Date("2024-02-20T14:25:00Z")
      }
    ]
  },
  {
    id: "sub-011",
    formId: "form-internal-assessment",
    submittedBy: "Rachel Green",
    submitterEmail: "r.green@ourcompany.com",
    submitterName: "Rachel Green",
    companyName: "Our Company",
    submissionType: "internal",
    submittedAt: new Date("2024-02-22T09:20:00Z"),
    status: "under_review",
    responses: {
      "department": "Finance",
      "project_name": "Financial Reporting Automation",
      "data_classification": "Highly Confidential",
      "access_requirements": "Finance executives and authorized auditors only",
      "retention_period": "10 years (regulatory requirement)",
      "third_party_integrations": ["ERP System", "Banking APIs", "Audit Platform"],
      "security_measures": "Multi-factor authentication, encryption at rest and in transit, audit trails"
    },
    score: {
      total: 91,
      maxTotal: 100,
      percentage: 91,
      riskLevel: "low",
      reviewedBy: "Finance Compliance",
      reviewedAt: new Date("2024-02-23T14:45:00Z"),
      reviewComments: "Critical financial system requiring additional security review. High compliance requirements.",
      breakdown: {
        security: 93,
        compliance: 90,
        privacy: 89,
        operational: 92
      }
    },
    activityLog: [
      {
        id: "act-011",
        action: "under_review",
        comments: "Critical financial system requiring additional security review. High compliance requirements.",
        reviewedBy: "Finance Compliance",
        reviewedAt: new Date("2024-02-23T14:45:00Z")
      }
    ],
    attachments: [
      {
        id: "att-012",
        name: "Security_Assessment.pdf",
        url: "/documents/security-assessment.pdf",
        size: 532000,
        type: "application/pdf",
        uploadedAt: new Date("2024-02-22T09:15:00Z")
      },
      {
        id: "att-013",
        name: "Compliance_Matrix.xlsx",
        url: "/documents/compliance-matrix.xlsx",
        size: 89000,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        uploadedAt: new Date("2024-02-22T09:17:00Z")
      }
    ]
  },
  {
    id: "sub-012",
    formId: "form-vendor-assessment",
    submittedBy: "Ahmed Hassan",
    submitterEmail: "a.hassan@criticalrisk.com",
    submitterName: "Ahmed Hassan",
    companyName: "CriticalRisk Systems",
    submissionType: "vendor",
    submittedAt: new Date("2024-02-25T16:45:00Z"),
    status: "rejected",
    responses: {
      "company_name": "CriticalRisk Systems",
      "business_type": "Legacy System Maintenance",
      "annual_revenue": "$250K - $500K",
      "employee_count": "1-5",
      "data_security_measures": "Basic antivirus, no formal security policies",
      "compliance_certifications": [],
      "previous_incidents": "Ransomware attack in 2023, systems compromised for 2 weeks",
      "insurance_coverage": "Basic general liability only",
      "references": []
    },
    score: {
      total: 18,
      maxTotal: 100,
      percentage: 18,
      riskLevel: "critical",
      reviewedBy: "Security Team",
      reviewedAt: new Date("2024-02-26T12:00:00Z"),
      reviewComments: "Critical security deficiencies and recent ransomware incident. Immediate rejection.",
      breakdown: {
        security: 10,
        compliance: 15,
        financial: 25,
        operational: 22
      }
    },
    activityLog: [
      {
        id: "act-012",
        action: "rejected",
        comments: "Critical security deficiencies and recent ransomware incident. Immediate rejection.",
        reviewedBy: "Security Team",
        reviewedAt: new Date("2024-02-26T12:00:00Z")
      }
    ],
    attachments: []
  }
];
