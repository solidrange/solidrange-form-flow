import { FormSubmission } from "@/types/form";

// Base submissions with detailed data
const baseSubmissions: FormSubmission[] = [
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
    approvalType: "fully",
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
    approvalType: "fully",
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
    approvalType: "partially",
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
  }
];

// Generate additional submissions programmatically
const companies = [
  "TechFlow Systems", "DataStream Corp", "CloudFirst Ltd", "SecureBase Inc", "AgileWorks Co",
  "NextGen Solutions", "SmartBridge Tech", "ProActive Systems", "FlexiCore Ltd", "ScaleUp Ventures",
  "RapidDeploy Inc", "OptimalPath Co", "StreamlineOps", "CoreLogic Systems", "PowerTech Solutions",
  "InnovateLab Inc", "QuantumLeap Co", "FutureProof Ltd", "ConnectWise Systems", "DataDriven Corp",
  "CloudNative Inc", "SecurePath Co", "AgileCore Systems", "TechAdvantage Ltd", "SmartFlow Inc"
];

const departments = ["Engineering", "Sales", "Marketing", "Finance", "HR", "Operations", "Legal", "IT"];
const submitters = ["John Smith", "Sarah Johnson", "Mike Chen", "Lisa Wong", "David Kim", "Emma Davis", "Alex Rodriguez", "Anna Lee"];
const statuses: Array<"approved" | "rejected" | "under_review"> = ["approved", "rejected", "under_review"];
const approvalTypes: Array<"fully" | "partially"> = ["fully", "partially"];
const riskLevels: Array<"low" | "medium" | "high" | "critical"> = ["low", "medium", "high", "critical"];

const additionalSubmissions: FormSubmission[] = [];

for (let i = 6; i <= 100; i++) {
  const isVendor = Math.random() > 0.25; // 75% vendor, 25% internal
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const approvalType = status === "approved" ? approvalTypes[Math.floor(Math.random() * approvalTypes.length)] : undefined;
  const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
  const submitter = submitters[Math.floor(Math.random() * submitters.length)];
  const company = isVendor ? companies[Math.floor(Math.random() * companies.length)] : "Our Company";
  const department = !isVendor ? departments[Math.floor(Math.random() * departments.length)] : undefined;
  
  // Score distribution based on risk level
  let score: number;
  switch (riskLevel) {
    case "low": score = 80 + Math.floor(Math.random() * 20); break;
    case "medium": score = 60 + Math.floor(Math.random() * 20); break;
    case "high": score = 30 + Math.floor(Math.random() * 30); break;
    case "critical": score = 10 + Math.floor(Math.random() * 20); break;
    default: score = 70;
  }

  const submissionDate = new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  const reviewDate = new Date(submissionDate.getTime() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000);

  additionalSubmissions.push({
    id: `sub-${i.toString().padStart(3, '0')}`,
    formId: isVendor ? "form-vendor-assessment" : "form-internal-assessment",
    submittedBy: submitter,
    submitterEmail: `${submitter.toLowerCase().replace(' ', '.')}@${isVendor ? company.toLowerCase().replace(/[^a-z]/g, '') : 'ourcompany'}.com`,
    submitterName: submitter,
    companyName: company,
    submissionType: isVendor ? "vendor" : "internal",
    submittedAt: submissionDate,
    status,
    approvalType,
    responses: isVendor 
      ? { "company_name": company, "business_type": "Technology Services" }
      : { "department": department, "project_name": `Project ${i}` },
    score: {
      total: score,
      maxTotal: 100,
      percentage: score,
      riskLevel,
      reviewedBy: "System Reviewer",
      reviewedAt: reviewDate,
      reviewComments: `Auto-generated review for ${company}`,
      breakdown: {}
    },
    activityLog: [{
      id: `act-${i.toString().padStart(3, '0')}`,
      action: status,
      comments: `${status.replace('_', ' ')} - Auto generated`,
      reviewedBy: "System Reviewer",
      reviewedAt: reviewDate
    }],
    attachments: []
  });
}

export const sampleSubmissions: FormSubmission[] = [
  ...baseSubmissions,
  ...additionalSubmissions
];