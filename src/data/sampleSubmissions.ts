import { FormSubmission } from "@/types/form";

// Base submissions with detailed data
const baseSubmissions: FormSubmission[] = [
  {
    id: "sub-001",
    formId: "form-vendor-assessment",
    submittedBy: "Noura Al-Harbi",
    submitterEmail: "noura.alharbi@najdtech.com.sa",
    submitterName: "Noura Al-Harbi",
    companyName: "Najd Technology Co.",
    audience: "vendor",
    submittedAt: new Date("2024-01-15T10:30:00Z"),
    status: "approved",
    approvalType: "fully",
    responses: {
      "company_name": "Najd Technology Co.",
      "business_type": "Technology Services",
      "annual_revenue": "SAR 18M - SAR 37M",
      "employee_count": "50-100",
      "data_security_measures": "ISO 27001 certified, SOC 2 Type II compliant",
      "compliance_certifications": ["ISO 27001", "SOC 2", "PDPL"],
      "previous_incidents": "None in the past 3 years",
      "insurance_coverage": "SAR 7.5M Cyber Liability Insurance",
      "references": [
        { company: "Al Rajhi Capital", contact: "khalid.aldossari@alrajhicapital.com.sa" },
        { company: "Saudi Health Network", contact: "fatima.alsaud@saudihealth.com.sa" }
      ]
    },
    score: {
      total: 92,
      maxTotal: 100,
      percentage: 92,
      riskLevel: "low",
      reviewedBy: "Ahmed Al-Qahtani",
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
        reviewedBy: "Ahmed Al-Qahtani",
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
    submittedBy: "Faisal Al-Otaibi",
    submitterEmail: "faisal.alotaibi@riyadhventures.com.sa",
    submitterName: "Faisal Al-Otaibi",
    companyName: "Riyadh Ventures Ltd",
    audience: "vendor",
    submittedAt: new Date("2024-01-20T14:15:00Z"),
    status: "under_review",
    responses: {
      "company_name": "Riyadh Ventures Ltd",
      "business_type": "Software Development",
      "annual_revenue": "SAR 3.7M - SAR 18M",
      "employee_count": "10-25",
      "data_security_measures": "Basic security protocols, working towards SOC 2",
      "compliance_certifications": ["PDPL"],
      "previous_incidents": "Minor data breach resolved in 2023",
      "insurance_coverage": "SAR 1.8M Professional Liability",
      "references": [
        { company: "Alinma Bank", contact: "omar.alshammari@alinma.com.sa" }
      ]
    },
    score: {
      total: 68,
      maxTotal: 100,
      percentage: 68,
      riskLevel: "medium",
      reviewedBy: "Reem Al-Dosari",
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
        reviewedBy: "Reem Al-Dosari",
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
    submittedBy: "Layla Al-Rashid",
    submitterEmail: "layla.alrashid@alharamainsecure.com.sa",
    submitterName: "Layla Al-Rashid",
    companyName: "Al Haramain Secure Systems",
    audience: "vendor",
    submittedAt: new Date("2024-01-25T09:45:00Z"),
    status: "approved",
    approvalType: "fully",
    responses: {
      "company_name": "Al Haramain Secure Systems",
      "business_type": "Cybersecurity Services",
      "annual_revenue": "SAR 93M+",
      "employee_count": "500+",
      "data_security_measures": "Multi-layered security, zero-trust architecture, 24/7 SOC",
      "compliance_certifications": ["ISO 27001", "SOC 2", "SAMA CSF", "PCI DSS"],
      "previous_incidents": "No security incidents reported",
      "insurance_coverage": "SAR 37M Cyber Liability + Errors & Omissions",
      "references": [
        { company: "Saudi National Bank", contact: "secure@snb.com.sa" },
        { company: "Ministry of Finance", contact: "procurement@mof.gov.sa" },
        { company: "King Faisal Hospital", contact: "ciso@kfsh.med.sa" }
      ]
    },
    score: {
      total: 98,
      maxTotal: 100,
      percentage: 98,
      riskLevel: "low",
      reviewedBy: "Ahmed Al-Qahtani",
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
        reviewedBy: "Ahmed Al-Qahtani",
        reviewedAt: new Date("2024-01-26T08:15:00Z")
      }
    ],
    attachments: [
      {
        id: "att-004",
        name: "SAMA_CSF_Authorization.pdf",
        url: "/documents/sama-csf-auth.pdf",
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
    submittedBy: "Turki Al-Ghamdi",
    submitterEmail: "turki.alghamdi@alwatan.com.sa",
    submitterName: "Turki Al-Ghamdi",
    companyName: "Al Watan Data LLC",
    audience: "vendor",
    submittedAt: new Date("2024-02-01T16:20:00Z"),
    status: "rejected",
    responses: {
      "company_name": "Al Watan Data LLC",
      "business_type": "Data Processing",
      "annual_revenue": "SAR 1.8M - SAR 3.7M",
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
      reviewedBy: "Risk Committee Lead",
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
        reviewedBy: "Risk Committee Lead",
        reviewedAt: new Date("2024-02-02T11:00:00Z")
      }
    ],
    attachments: []
  },
  {
    id: "sub-005",
    formId: "form-internal-assessment",
    submittedBy: "Maha Al-Zahrani",
    submitterEmail: "maha.alzahrani@ourcompany.com.sa",
    submitterName: "Maha Al-Zahrani",
    companyName: "Our Company",
    audience: "internal",
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
      reviewedBy: "Internal Review Team",
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
        reviewedBy: "Internal Review Team",
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
// Saudi-style company names for vendors
const companies = [
  "Riyadh Financial Services", "Najd Technology Co.", "Al Haramain Logistics", "Arabian Compliance Solutions", "Jeddah Cloud Systems",
  "NEOM Digital Solutions", "Al Faisaliah Tech", "Dhahran Data Corp", "Makkah Security Group", "Dammam IT Services",
  "Al Khobar Consulting", "Taif Software House", "Madinah Analytics", "Qassim Tech Ventures", "Abha Digital Labs",
  "Jubail Industrial IT", "Yanbu Systems Co.", "Tabuk Cloud Services", "Hail Data Solutions", "Jazan Tech Partners",
  "Al Ahsa Innovations", "Sakaka Digital", "Buraydah Systems", "Hofuf Technology", "Khamis Mushait IT"
];

const departments = ["Engineering", "Sales", "Marketing", "Finance", "HR", "Operations", "Legal", "IT"];

// Saudi-style person names (mix of male and female)
const submitters = [
  "Ahmed Al-Saud", "Noura Al-Harbi", "Faisal Al-Otaibi", "Reem Al-Qahtani", 
  "Khalid Al-Dosari", "Fatima Al-Rashid", "Omar Al-Shammari", "Layla Al-Zahrani"
];

const statuses: Array<"approved" | "rejected" | "under_review"> = ["approved", "rejected", "under_review"];
const approvalTypes: Array<"fully" | "partially"> = ["fully", "partially"];
const riskLevels: Array<"low" | "medium" | "high" | "critical"> = ["low", "medium", "high", "critical"];

// Saudi external organizations for external submissions
const externalOrganizations = [
  "Riyadh Municipality", "King Faisal Hospital", "King Saud University", "Saudi Red Crescent", "Makeen Foundation",
  "Jeddah Schools District", "King Fahd Medical City", "NECC Environmental", "Saudi Social Development", "Legal Aid Association"
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
    "Environmental monitoring aligned with Vision 2030", 
    "Social services optimization for Saudi citizens",
    "Community development and urban planning projects"
  ][Math.floor(Math.random() * 5)],
  data_requirements: [
    "Aggregated demographic data without personal identifiers",
    "Statistical reports on service utilization patterns",
    "Anonymized performance metrics for benchmarking",
    "Public dataset for research and policy development"
  ][Math.floor(Math.random() * 4)],
  privacy_compliance: [
    "PDPL compliant data handling procedures",
    "MOE educational privacy requirements", 
    "Government privacy policies and NCA guidelines",
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
  compliance_framework: ["NCA regulations", "SAMA guidelines", "Industry standards", "Research ethics guidelines"][Math.floor(Math.random() * 4)],
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
  annual_revenue: ["SAR 1.8M - SAR 3.7M", "SAR 3.7M - SAR 18M", "SAR 18M - SAR 37M", "SAR 37M - SAR 93M", "SAR 93M+"][Math.floor(Math.random() * 5)],
  employee_count: ["1-10", "10-25", "25-50", "50-100", "100-500", "500+"][Math.floor(Math.random() * 6)],
  data_security_measures: [
    "Basic security protocols, firewall protection",
    "ISO 27001 certified, multi-factor authentication",
    "SOC 2 Type II compliant, encrypted databases",
    "Zero-trust architecture, 24/7 monitoring",
    "Advanced threat detection, SIEM implementation"
  ][Math.floor(Math.random() * 5)],
  compliance_certifications: [
    ["PDPL"],
    ["ISO 27001", "PDPL"],
    ["SOC 2", "ISO 27001", "PDPL"],
    ["SOC 2", "ISO 27001", "PDPL", "PCI DSS"],
    ["SOC 2", "ISO 27001", "PDPL", "PCI DSS", "SAMA CSF"]
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
    "SAR 1.8M Professional Liability",
    "SAR 3.7M Cyber Liability Insurance",
    "SAR 7.5M Cyber Liability + Errors & Omissions",
    "SAR 37M Comprehensive Coverage"
  ][Math.floor(Math.random() * 5)],
  primary_contact: `${submitters[Math.floor(Math.random() * submitters.length)]}`,
  business_address: `${Math.floor(Math.random() * 9999) + 1} King Fahd Road, Riyadh ${Math.floor(Math.random() * 90000) + 10000}`,
  years_in_business: Math.floor(Math.random() * 20) + 1,
  key_clients: ["Saudi Aramco", "SABIC", "Saudi Government Entities", "GCC Financial Institutions"][Math.floor(Math.random() * 4)],
  service_description: "Comprehensive technology solutions tailored to Saudi enterprise needs",
  technology_stack: ["Cloud-native", "Microservices", "AI/ML", "Blockchain"][Math.floor(Math.random() * 4)],
  backup_procedures: "Daily automated backups with 99.9% recovery guarantee",
  disaster_recovery: "RTO: 4 hours, RPO: 1 hour, tested quarterly",
  privacy_policy: "PDPL compliant privacy policy updated annually",
  data_retention: "Data retained per regulatory requirements, secure deletion after retention period",
  third_party_vendors: ["AWS Middle East", "Microsoft Azure UAE", "Google Cloud Dammam"][Math.floor(Math.random() * 3)]
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
  const audienceRand = Math.random();
  const isVendor = audienceRand > 0.5; // 50% vendor
  const isExternal = !isVendor && audienceRand > 0.25; // 25% external  
  const isInternal = !isVendor && !isExternal; // 25% internal
  
  const audience: 'vendor' | 'internal' | 'external' = 
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
    audience: audience,
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
      reviewedBy: "Assessment Review Team",
      reviewedAt: reviewDate,
      reviewComments: `Auto-generated review for ${company}`,
      breakdown: {}
    },
    activityLog: [{
      id: `act-${i.toString().padStart(3, '0')}`,
      action: status,
      comments: `${status.replace('_', ' ')} - Auto generated`,
      reviewedBy: "Assessment Review Team",
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
    audience: "external",
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