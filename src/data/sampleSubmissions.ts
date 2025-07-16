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

// External organizations for external submissions
const externalOrganizations = [
  "City Government", "Healthcare Partners", "University Research", "Non-Profit Alliance", "Community Foundation",
  "Public School District", "Regional Hospital", "Environmental Agency", "Social Services", "Legal Aid Society"
];

const externalFormFields = [
  "organization_name", "contact_person", "organization_type", "project_purpose", "data_requirements",
  "privacy_compliance", "data_sharing_scope", "access_duration", "security_measures", "reporting_frequency",
  "stakeholder_groups", "public_benefit", "compliance_framework", "audit_requirements"
];

const generateExternalResponses = (orgName: string) => ({
  organization_name: orgName,
  contact_person: submitters[Math.floor(Math.random() * submitters.length)],
  organization_type: ["Government Agency", "Educational Institution", "Healthcare Organization", "Non-Profit", "Research Institution"][Math.floor(Math.random() * 5)],
  project_purpose: [
    "Public health data analysis for community wellness programs",
    "Educational research to improve student outcomes",
    "Environmental monitoring and reporting initiatives", 
    "Social services optimization and resource allocation",
    "Community development and planning projects"
  ][Math.floor(Math.random() * 5)],
  data_requirements: [
    "Aggregated demographic data without personal identifiers",
    "Statistical reports on service utilization patterns",
    "Anonymized performance metrics for benchmarking",
    "Public dataset for research and policy development"
  ][Math.floor(Math.random() * 4)],
  privacy_compliance: [
    "HIPAA compliant data handling procedures",
    "FERPA educational privacy requirements", 
    "Local government privacy policies",
    "Research ethics board approval obtained"
  ][Math.floor(Math.random() * 4)],
  data_sharing_scope: [
    "Limited to specific project duration",
    "Ongoing partnership with quarterly reviews",
    "One-time data export for analysis",
    "Continuous access with usage monitoring"
  ][Math.floor(Math.random() * 4)],
  access_duration: `${Math.floor(Math.random() * 24) + 6} months`,
  security_measures: "Encrypted transmission, secure storage, access controls, audit logging",
  reporting_frequency: ["Monthly", "Quarterly", "Semi-annually", "Annually"][Math.floor(Math.random() * 4)],
  stakeholder_groups: "Community leaders, government officials, research teams, service providers",
  public_benefit: "Improved public services, evidence-based policy making, community health outcomes",
  compliance_framework: ["Local government regulations", "Federal privacy laws", "Industry standards", "Research ethics guidelines"][Math.floor(Math.random() * 4)],
  audit_requirements: "Annual compliance review, security assessment, data usage audit"
});

// Enhanced form field responses for realistic data
const vendorFormFields = [
  "company_name", "business_type", "annual_revenue", "employee_count", "data_security_measures",
  "compliance_certifications", "previous_incidents", "insurance_coverage", "primary_contact",
  "business_address", "years_in_business", "key_clients", "service_description", "technology_stack",
  "backup_procedures", "disaster_recovery", "privacy_policy", "data_retention", "third_party_vendors"
];

const internalFormFields = [
  "department", "project_name", "data_classification", "access_requirements", "retention_period",
  "third_party_integrations", "security_measures", "project_manager", "budget_allocation",
  "timeline", "stakeholders", "risk_assessment", "compliance_requirements", "data_sources"
];

const generateVendorResponses = (companyName: string) => ({
  company_name: companyName,
  business_type: ["Technology Services", "Software Development", "Consulting", "Cloud Services", "Cybersecurity", "Data Analytics"][Math.floor(Math.random() * 6)],
  annual_revenue: ["$500K - $1M", "$1M - $5M", "$5M - $10M", "$10M - $25M", "$25M+"][Math.floor(Math.random() * 5)],
  employee_count: ["1-10", "10-25", "25-50", "50-100", "100-500", "500+"][Math.floor(Math.random() * 6)],
  data_security_measures: [
    "Basic security protocols, firewall protection",
    "ISO 27001 certified, multi-factor authentication",
    "SOC 2 Type II compliant, encrypted databases",
    "Zero-trust architecture, 24/7 monitoring",
    "Advanced threat detection, SIEM implementation"
  ][Math.floor(Math.random() * 5)],
  compliance_certifications: [
    ["GDPR"],
    ["ISO 27001", "GDPR"],
    ["SOC 2", "ISO 27001", "GDPR"],
    ["SOC 2", "ISO 27001", "GDPR", "PCI DSS"],
    ["SOC 2", "ISO 27001", "GDPR", "PCI DSS", "FedRAMP"]
  ][Math.floor(Math.random() * 5)],
  previous_incidents: [
    "No security incidents reported",
    "Minor incident resolved quickly in 2023",
    "One data breach in 2022, fully remediated",
    "Multiple incidents, improvements implemented",
    "Critical security breach, ongoing concerns"
  ][Math.floor(Math.random() * 5)],
  insurance_coverage: [
    "None",
    "$500K Professional Liability",
    "$1M Cyber Liability Insurance",
    "$2M Cyber Liability + Errors & Omissions",
    "$10M Comprehensive Coverage"
  ][Math.floor(Math.random() * 5)],
  primary_contact: `${submitters[Math.floor(Math.random() * submitters.length)]}`,
  business_address: `${Math.floor(Math.random() * 9999) + 1} Business Ave, Tech City, TC ${Math.floor(Math.random() * 90000) + 10000}`,
  years_in_business: Math.floor(Math.random() * 20) + 1,
  key_clients: ["Fortune 500 Companies", "Government Agencies", "Healthcare Organizations", "Financial Institutions"][Math.floor(Math.random() * 4)],
  service_description: "Comprehensive technology solutions tailored to enterprise needs",
  technology_stack: ["Cloud-native", "Microservices", "AI/ML", "Blockchain"][Math.floor(Math.random() * 4)],
  backup_procedures: "Daily automated backups with 99.9% recovery guarantee",
  disaster_recovery: "RTO: 4 hours, RPO: 1 hour, tested quarterly",
  privacy_policy: "GDPR compliant privacy policy updated annually",
  data_retention: "Data retained per regulatory requirements, secure deletion after retention period",
  third_party_vendors: ["AWS", "Microsoft Azure", "Google Cloud"][Math.floor(Math.random() * 3)]
});

const generateInternalResponses = (department: string) => ({
  department: department,
  project_name: `${department} Digital Transformation Initiative`,
  data_classification: ["Public", "Internal", "Confidential", "Restricted"][Math.floor(Math.random() * 4)],
  access_requirements: `${department} staff only, role-based access controls`,
  retention_period: `${Math.floor(Math.random() * 7) + 1} years per company policy`,
  third_party_integrations: ["CRM System", "ERP Platform", "HR Management", "Financial System"][Math.floor(Math.random() * 4)],
  security_measures: "Multi-factor authentication, encrypted storage, audit logging",
  project_manager: submitters[Math.floor(Math.random() * submitters.length)],
  budget_allocation: `$${Math.floor(Math.random() * 500) + 50}K allocated for Q${Math.floor(Math.random() * 4) + 1}`,
  timeline: `${Math.floor(Math.random() * 12) + 3} months implementation`,
  stakeholders: `${department} leadership, IT department, compliance team`,
  risk_assessment: ["Low risk - standard procedures", "Medium risk - enhanced monitoring", "High risk - additional controls"][Math.floor(Math.random() * 3)],
  compliance_requirements: ["SOX compliance", "GDPR requirements", "Industry regulations"][Math.floor(Math.random() * 3)],
  data_sources: ["Internal databases", "Third-party APIs", "Legacy systems"][Math.floor(Math.random() * 3)]
});

const additionalSubmissions: FormSubmission[] = [];

for (let i = 6; i <= 100; i++) {
  const submissionTypeRand = Math.random();
  const isVendor = submissionTypeRand > 0.5; // 50% vendor
  const isExternal = !isVendor && submissionTypeRand > 0.25; // 25% external  
  const isInternal = !isVendor && !isExternal; // 25% internal
  
  const submissionType: 'vendor' | 'internal' | 'external' = 
    isVendor ? 'vendor' : isExternal ? 'external' : 'internal';
    
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const approvalType = status === "approved" ? approvalTypes[Math.floor(Math.random() * approvalTypes.length)] : undefined;
  const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
  const submitter = submitters[Math.floor(Math.random() * submitters.length)];
  
  const company = isVendor ? companies[Math.floor(Math.random() * companies.length)] : 
                  isExternal ? externalOrganizations[Math.floor(Math.random() * externalOrganizations.length)] :
                  "Our Company";
                  
  const department = isInternal ? departments[Math.floor(Math.random() * departments.length)] : undefined;
  
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
    formId: isVendor ? "form-vendor-assessment" : 
             isExternal ? "form-external-assessment" : 
             "form-internal-assessment",
    submittedBy: submitter,
    submitterEmail: `${submitter.toLowerCase().replace(' ', '.')}@${
      isVendor ? company.toLowerCase().replace(/[^a-z]/g, '') :
      isExternal ? company.toLowerCase().replace(/[^a-z]/g, '') + '.org' :
      'ourcompany'
    }.com`,
    submitterName: submitter,
    companyName: company,
    submissionType: submissionType,
    submittedAt: submissionDate,
    status,
    approvalType,
    responses: isVendor ? generateVendorResponses(company) :
               isExternal ? generateExternalResponses(company) :
               generateInternalResponses(department || departments[0]),
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

// Add 70 additional external submissions for better data representation (up to 200 total)
const additionalExternalSubmissions: FormSubmission[] = [];

for (let i = 101; i <= 200; i++) {
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const approvalType = status === "approved" ? approvalTypes[Math.floor(Math.random() * approvalTypes.length)] : undefined;
  const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
  const submitter = submitters[Math.floor(Math.random() * submitters.length)];
  const organization = externalOrganizations[Math.floor(Math.random() * externalOrganizations.length)];
  
  // Score distribution based on risk level for external submissions
  let score: number;
  switch (riskLevel) {
    case "low": score = 75 + Math.floor(Math.random() * 25); break;
    case "medium": score = 55 + Math.floor(Math.random() * 25); break;
    case "high": score = 25 + Math.floor(Math.random() * 35); break;
    case "critical": score = 5 + Math.floor(Math.random() * 25); break;
    default: score = 65;
  }

  const submissionDate = new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  const reviewDate = new Date(submissionDate.getTime() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000);

  additionalExternalSubmissions.push({
    id: `sub-ext-${i.toString().padStart(3, '0')}`,
    formId: "form-external-assessment",
    submittedBy: submitter,
    submitterEmail: `${submitter.toLowerCase().replace(' ', '.')}@${organization.toLowerCase().replace(/[^a-z]/g, '')}.org`,
    submitterName: submitter,
    companyName: organization,
    submissionType: "external",
    submittedAt: submissionDate,
    status,
    approvalType,
    responses: generateExternalResponses(organization),
    score: {
      total: score,
      maxTotal: 100,
      percentage: score,
      riskLevel,
      reviewedBy: "External Review Team",
      reviewedAt: reviewDate,
      reviewComments: `External partnership assessment for ${organization}`,
      breakdown: {
        compliance: Math.max(0, score + Math.floor(Math.random() * 20) - 10),
        security: Math.max(0, score + Math.floor(Math.random() * 20) - 10),
        partnership: Math.max(0, score + Math.floor(Math.random() * 20) - 10),
        public_benefit: Math.max(0, score + Math.floor(Math.random() * 20) - 10)
      }
    },
    activityLog: [{
      id: `act-ext-${i.toString().padStart(3, '0')}`,
      action: status,
      comments: `External submission ${status.replace('_', ' ')} - Partnership assessment completed`,
      reviewedBy: "External Review Team",
      reviewedAt: reviewDate
    }],
    attachments: Math.random() > 0.5 ? [{
      id: `att-ext-${i}`,
      name: `${organization.replace(/[^a-zA-Z]/g, '')}_Partnership_Agreement.pdf`,
      url: `/documents/external/${organization.toLowerCase().replace(/[^a-z]/g, '')}-agreement.pdf`,
      size: 150000 + Math.floor(Math.random() * 500000),
      type: "application/pdf",
      uploadedAt: submissionDate
    }] : []
  });
}

export const sampleSubmissions: FormSubmission[] = [
  ...baseSubmissions,
  ...additionalSubmissions,
  ...additionalExternalSubmissions
];