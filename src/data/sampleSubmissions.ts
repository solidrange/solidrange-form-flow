
import { FormSubmission } from "@/types/form";

export const sampleSubmissions: FormSubmission[] = [
  {
    id: "sub-1",
    formId: "form-1",
    submitterName: "John Smith",
    submitterEmail: "john.smith@techcorp.com",
    companyName: "TechCorp Solutions",
    submissionType: "vendor",
    responses: {
      company_name: "TechCorp Solutions",
      business_type: "Technology",
      annual_revenue: "5000000",
      risk_assessment: "Low risk technology vendor with established security protocols and compliance certifications. Company has been in business for 10+ years with stable financial performance.",
      compliance_certifications: ["ISO 27001", "SOC 2", "GDPR"],
      primary_contact: "John Smith",
      phone_number: "+1-555-0123",
      business_address: "123 Tech Street, San Francisco, CA 94105",
      service_description: "Cloud-based software solutions for enterprise clients",
      data_handling: "Yes, we handle customer data with strict security protocols",
      security_measures: "Multi-factor authentication, encryption, regular security audits",
      insurance_coverage: "General liability, cyber liability, professional indemnity",
      financial_stability: "Stable revenue growth, audited financial statements available"
    },
    submittedAt: new Date("2024-01-20T14:30:00Z"),
    status: "approved",
    approvalType: "fully",
    timeSpent: 25,
    score: {
      total: 85,
      maxTotal: 100,
      percentage: 85,
      riskLevel: "low",
      categoryScores: {
        "Financial Stability": 90,
        "Security & Compliance": 85,
        "Operational Risk": 80,
        "Data Protection": 88
      },
      reviewedBy: "Sarah Johnson",
      reviewedAt: new Date("2024-01-21T09:15:00Z"),
      reviewComments: "Excellent compliance record and security posture. Approved for full engagement."
    },
    activityLog: [
      {
        id: "act-1",
        action: "approved",
        comments: "Excellent compliance record and security posture. All requirements met for full approval.",
        reviewedBy: "Sarah Johnson",
        reviewedAt: new Date("2024-01-21T09:15:00Z"),
        metadata: {
          approvalType: "fully",
          urgency: "medium"
        }
      },
      {
        id: "act-2",
        action: "under_review",
        comments: "Initial review completed. Requesting additional documentation for compliance verification.",
        reviewedBy: "Mike Chen",
        reviewedAt: new Date("2024-01-20T16:45:00Z"),
        metadata: {
          urgency: "medium",
          requiredDocuments: ["ISO 27001 Certificate", "SOC 2 Report"]
        }
      }
    ],
    documents: [
      {
        id: "doc-1",
        name: "ISO_27001_Certificate.pdf",
        url: "/documents/iso-cert.pdf",
        type: "application/pdf",
        size: 1024000,
        uploadedAt: new Date("2024-01-20T14:35:00Z")
      },
      {
        id: "doc-2",
        name: "SOC2_Report_2024.pdf",
        url: "/documents/soc2-report.pdf",
        type: "application/pdf",
        size: 2048000,
        uploadedAt: new Date("2024-01-20T14:40:00Z")
      }
    ]
  },
  {
    id: "sub-2",
    formId: "form-1",
    submitterName: "Emma Davis",
    submitterEmail: "emma.davis@healthplus.com",
    companyName: "HealthPlus Medical",
    submissionType: "vendor",
    responses: {
      company_name: "HealthPlus Medical",
      business_type: "Healthcare",
      annual_revenue: "12000000",
      risk_assessment: "Medium risk healthcare vendor requiring HIPAA compliance verification. Strong financial position but needs additional security documentation.",
      compliance_certifications: ["HIPAA", "SOC 2"],
      primary_contact: "Emma Davis",
      phone_number: "+1-555-0234",
      business_address: "456 Health Ave, Boston, MA 02101",
      service_description: "Healthcare IT solutions and patient management systems",
      data_handling: "Yes, we handle sensitive patient health information",
      security_measures: "HIPAA-compliant infrastructure, encrypted databases, access controls",
      insurance_coverage: "Professional liability, cyber security, malpractice insurance",
      financial_stability: "Strong revenue growth, publicly traded company"
    },
    submittedAt: new Date("2024-01-19T11:20:00Z"),
    status: "under_review",
    timeSpent: 32,
    score: {
      total: 72,
      maxTotal: 100,
      percentage: 72,
      riskLevel: "medium",
      categoryScores: {
        "Financial Stability": 85,
        "Security & Compliance": 70,
        "Operational Risk": 75,
        "Data Protection": 68
      },
      reviewedBy: "Alex Rodriguez",
      reviewedAt: new Date("2024-01-19T15:30:00Z"),
      reviewComments: "Good overall score but needs additional HIPAA compliance documentation."
    },
    activityLog: [
      {
        id: "act-3",
        action: "under_review",
        comments: "Additional HIPAA compliance documentation required. Please provide current BAA templates and security audit reports.",
        reviewedBy: "Alex Rodriguez",
        reviewedAt: new Date("2024-01-19T15:30:00Z"),
        metadata: {
          urgency: "high",
          specificFields: ["compliance_certifications", "security_measures"],
          requiredDocuments: ["HIPAA BAA Template", "Security Audit Report"]
        }
      },
      {
        id: "act-4",
        action: "reminder_sent",
        comments: "Reminder sent for pending HIPAA documentation. Please respond within 48 hours.",
        reviewedBy: "System",
        reviewedAt: new Date("2024-01-22T10:00:00Z"),
        metadata: {
          urgency: "high"
        }
      }
    ],
    documents: [
      {
        id: "doc-3",
        name: "HIPAA_Compliance_Overview.pdf",
        url: "/documents/hipaa-overview.pdf",
        type: "application/pdf",
        size: 1536000,
        uploadedAt: new Date("2024-01-19T11:25:00Z")
      }
    ]
  },
  {
    id: "sub-3",
    formId: "form-1",
    submitterName: "Robert Wilson",
    submitterEmail: "robert.wilson@financeplus.com",
    companyName: "FinancePlus Services",
    submissionType: "vendor",
    responses: {
      company_name: "FinancePlus Services",
      business_type: "Finance",
      annual_revenue: "8500000",
      risk_assessment: "High risk financial services vendor due to regulatory requirements and data sensitivity. Requires comprehensive compliance review.",
      compliance_certifications: ["PCI DSS", "SOC 2"],
      primary_contact: "Robert Wilson",
      phone_number: "+1-555-0345",
      business_address: "789 Finance Blvd, New York, NY 10001",
      service_description: "Financial data processing and payment solutions",
      data_handling: "Yes, we process financial transactions and sensitive payment data",
      security_measures: "PCI DSS compliance, tokenization, fraud detection systems",
      insurance_coverage: "Errors & omissions, cyber liability, fidelity bond",
      financial_stability: "Stable financials with regulatory oversight"
    },
    submittedAt: new Date("2024-01-18T13:45:00Z"),
    status: "rejected",
    timeSpent: 28,
    score: {
      total: 45,
      maxTotal: 100,
      percentage: 45,
      riskLevel: "high",
      categoryScores: {
        "Financial Stability": 60,
        "Security & Compliance": 35,
        "Operational Risk": 40,
        "Data Protection": 45
      },
      reviewedBy: "Lisa Thompson",
      reviewedAt: new Date("2024-01-18T17:20:00Z"),
      reviewComments: "Insufficient security documentation and compliance gaps identified. Rejection due to high risk assessment."
    },
    activityLog: [
      {
        id: "act-5",
        action: "rejected",
        comments: "Application rejected due to insufficient security documentation and compliance gaps. PCI DSS certification expired and security audit findings not addressed.",
        reviewedBy: "Lisa Thompson",
        reviewedAt: new Date("2024-01-18T17:20:00Z"),
        metadata: {
          reason: "policy_violation",
          urgency: "high",
          specificFields: ["compliance_certifications", "security_measures"]
        }
      },
      {
        id: "act-6",
        action: "under_review",
        comments: "Initial review flagged multiple compliance concerns. Requesting additional documentation before final decision.",
        reviewedBy: "Mark Davis",
        reviewedAt: new Date("2024-01-18T14:15:00Z"),
        metadata: {
          urgency: "high",
          requiredDocuments: ["Current PCI DSS Certificate", "Security Audit Report", "Penetration Test Results"]
        }
      }
    ],
    documents: [
      {
        id: "doc-4",
        name: "PCI_DSS_Certificate_Expired.pdf",
        url: "/documents/pci-cert-expired.pdf",
        type: "application/pdf",
        size: 896000,
        uploadedAt: new Date("2024-01-18T13:50:00Z")
      }
    ]
  },
  {
    id: "sub-4",
    formId: "form-1",
    submitterName: "Maria Garcia",
    submitterEmail: "maria.garcia@globalmanufacturing.com",
    companyName: "Global Manufacturing Inc",
    submissionType: "vendor",
    responses: {
      company_name: "Global Manufacturing Inc",
      business_type: "Manufacturing",
      annual_revenue: "25000000",
      risk_assessment: "Medium risk manufacturing vendor with good operational history. Environmental compliance verification needed.",
      compliance_certifications: ["ISO 27001", "ISO 14001"],
      primary_contact: "Maria Garcia",
      phone_number: "+1-555-0456",
      business_address: "321 Industrial Way, Detroit, MI 48201",
      service_description: "Industrial manufacturing and supply chain solutions",
      data_handling: "Limited data handling, primarily operational and logistics data",
      security_measures: "Standard industrial security protocols, facility access controls",
      insurance_coverage: "General liability, product liability, environmental coverage",
      financial_stability: "Strong financial performance with diverse client base"
    },
    submittedAt: new Date("2024-01-17T10:30:00Z"),
    status: "submitted",
    timeSpent: 22,
    score: {
      total: 68,
      maxTotal: 100,
      percentage: 68,
      riskLevel: "medium",
      categoryScores: {
        "Financial Stability": 78,
        "Security & Compliance": 62,
        "Operational Risk": 65,
        "Data Protection": 70
      }
    },
    activityLog: [],
    documents: [
      {
        id: "doc-5",
        name: "ISO_27001_Certificate.pdf",
        url: "/documents/iso-27001.pdf",
        type: "application/pdf",
        size: 1200000,
        uploadedAt: new Date("2024-01-17T10:35:00Z")
      },
      {
        id: "doc-6",
        name: "Environmental_Compliance_Report.pdf",
        url: "/documents/env-compliance.pdf",
        type: "application/pdf",
        size: 1800000,
        uploadedAt: new Date("2024-01-17T10:40:00Z")
      }
    ]
  },
  {
    id: "sub-5",
    formId: "form-1",
    submitterName: "David Kim",
    submitterEmail: "david.kim@startupventures.com",
    companyName: "Startup Ventures LLC",
    submissionType: "external",
    responses: {
      company_name: "Startup Ventures LLC",
      business_type: "Technology",
      annual_revenue: "1200000",
      risk_assessment: "Higher risk due to startup nature and limited operational history. Requires enhanced due diligence.",
      compliance_certifications: ["SOC 2"],
      primary_contact: "David Kim",
      phone_number: "+1-555-0567",
      business_address: "555 Startup Lane, Austin, TX 78701",
      service_description: "Innovative software solutions for small businesses",
      data_handling: "Yes, we handle customer business data and analytics",
      security_measures: "Cloud-based security, regular updates, basic access controls",
      insurance_coverage: "General liability, professional indemnity",
      financial_stability: "Early-stage startup with venture capital funding"
    },
    submittedAt: new Date("2024-01-16T09:15:00Z"),
    status: "approved",
    approvalType: "partially",
    timeSpent: 35,
    score: {
      total: 58,
      maxTotal: 100,
      percentage: 58,
      riskLevel: "high",
      categoryScores: {
        "Financial Stability": 45,
        "Security & Compliance": 65,
        "Operational Risk": 55,
        "Data Protection": 68
      },
      reviewedBy: "Jennifer Lee",
      reviewedAt: new Date("2024-01-16T16:45:00Z"),
      reviewComments: "Partial approval granted with conditions. Limited engagement scope due to startup risk profile."
    },
    activityLog: [
      {
        id: "act-7",
        action: "approved",
        comments: "Partial approval granted with conditions. Limited to non-critical services with enhanced monitoring. Six-month review required.",
        reviewedBy: "Jennifer Lee",
        reviewedAt: new Date("2024-01-16T16:45:00Z"),
        metadata: {
          approvalType: "partially",
          urgency: "medium",
          specificFields: ["financial_stability", "operational_risk"]
        }
      },
      {
        id: "act-8",
        action: "under_review",
        comments: "Extended review required for startup vendor. Evaluating financial stability and operational maturity.",
        reviewedBy: "Tom Anderson",
        reviewedAt: new Date("2024-01-16T11:30:00Z"),
        metadata: {
          urgency: "medium",
          requiredDocuments: ["Financial Statements", "Reference Letters"]
        }
      }
    ],
    documents: [
      {
        id: "doc-7",
        name: "SOC2_Report_2024.pdf",
        url: "/documents/soc2-startup.pdf",
        type: "application/pdf",
        size: 1024000,
        uploadedAt: new Date("2024-01-16T09:20:00Z")
      },
      {
        id: "doc-8",
        name: "Funding_Letter.pdf",
        url: "/documents/funding-letter.pdf",
        type: "application/pdf",
        size: 512000,
        uploadedAt: new Date("2024-01-16T09:25:00Z")
      }
    ]
  }
];
