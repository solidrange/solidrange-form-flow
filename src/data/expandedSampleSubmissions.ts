
import { FormSubmission } from "@/types/form";

// Helper function to generate random dates within a range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper function to generate random score
const generateScore = (riskLevel: 'low' | 'medium' | 'high' | 'critical') => {
  const ranges = {
    low: [80, 100],
    medium: [60, 79],
    high: [40, 59],
    critical: [0, 39]
  };
  const [min, max] = ranges[riskLevel];
  const total = min + Math.random() * (max - min);
  return {
    total: Math.round(total),
    maxTotal: 100,
    percentage: Math.round(total),
    riskLevel,
    categoryScores: {
      security: Math.round(total * 0.3),
      compliance: Math.round(total * 0.25),
      financial: Math.round(total * 0.2),
      operational: Math.round(total * 0.25)
    },
    reviewedBy: ['admin@company.com', 'reviewer1@company.com', 'reviewer2@company.com'][Math.floor(Math.random() * 3)],
    reviewedAt: randomDate(new Date(2024, 0, 1), new Date()),
    reviewComments: [
      'All requirements met, low risk assessment.',
      'Some concerns identified, requires monitoring.',
      'High risk factors present, needs immediate attention.',
      'Critical issues found, immediate action required.'
    ][Math.floor(Math.random() * 4)]
  };
};

// Company names and data
const companies = [
  { name: 'TechCorp Solutions', type: 'vendor', industry: 'Technology' },
  { name: 'Global Finance Inc', type: 'vendor', industry: 'Finance' },
  { name: 'MedTech Industries', type: 'vendor', industry: 'Healthcare' },
  { name: 'SecureCloud Systems', type: 'vendor', industry: 'Technology' },
  { name: 'Manufacturing Plus', type: 'vendor', industry: 'Manufacturing' },
  { name: 'Legal Associates', type: 'external', industry: 'Legal' },
  { name: 'Marketing Dynamics', type: 'external', industry: 'Marketing' },
  { name: 'Consulting Group', type: 'external', industry: 'Consulting' },
  { name: 'Internal IT Team', type: 'internal', industry: 'IT' },
  { name: 'HR Department', type: 'internal', industry: 'Human Resources' },
  { name: 'Finance Team', type: 'internal', industry: 'Finance' },
  { name: 'Operations Unit', type: 'internal', industry: 'Operations' },
  { name: 'DataFlow Analytics', type: 'vendor', industry: 'Analytics' },
  { name: 'CloudSafe Security', type: 'vendor', industry: 'Security' },
  { name: 'Logistics Partners', type: 'vendor', industry: 'Logistics' },
  { name: 'Energy Solutions', type: 'vendor', industry: 'Energy' },
  { name: 'Construction Corp', type: 'vendor', industry: 'Construction' },
  { name: 'Retail Systems', type: 'vendor', industry: 'Retail' },
  { name: 'Education Tech', type: 'vendor', industry: 'Education' },
  { name: 'Transport Solutions', type: 'vendor', industry: 'Transportation' }
];

// Generate comprehensive sample responses
const generateResponses = (companyType: string, industry: string) => {
  const baseResponses = {
    company_name: companies.find(c => c.industry === industry)?.name || 'Sample Company',
    business_type: industry,
    annual_revenue: Math.floor(Math.random() * 10000000) + 1000000,
    risk_assessment: [
      'Low risk profile with established security protocols',
      'Medium risk with some areas requiring attention',
      'High risk profile requiring immediate remediation',
      'Critical risk factors identified across multiple domains'
    ][Math.floor(Math.random() * 4)],
    compliance_certifications: [
      ['ISO 27001', 'SOC 2'],
      ['GDPR', 'HIPAA'],
      ['PCI DSS', 'ISO 27001'],
      ['SOC 2', 'GDPR', 'HIPAA']
    ][Math.floor(Math.random() * 4)]
  };

  // Add industry-specific responses
  if (industry === 'Technology') {
    return {
      ...baseResponses,
      technology_stack: ['AWS', 'Docker', 'Kubernetes', 'React'],
      security_measures: 'Multi-factor authentication, encryption at rest and in transit',
      data_handling: 'GDPR compliant data processing with regular audits'
    };
  } else if (industry === 'Healthcare') {
    return {
      ...baseResponses,
      hipaa_compliance: 'Fully HIPAA compliant with regular assessments',
      patient_data_security: 'End-to-end encryption with access controls',
      medical_certifications: ['FDA Approved', 'CE Marked']
    };
  } else if (industry === 'Finance') {
    return {
      ...baseResponses,
      financial_regulations: 'SOX, PCI DSS, and banking regulations compliant',
      audit_frequency: 'Quarterly internal audits, annual external audits',
      risk_management: 'Comprehensive risk management framework implemented'
    };
  }

  return baseResponses;
};

// Generate activity logs
const generateActivityLog = (status: FormSubmission['status']) => {
  const activities = [];
  
  activities.push({
    id: `activity-${Date.now()}-1`,
    action: 'submitted' as const,
    comments: 'Initial submission received',
    reviewedBy: 'system',
    reviewedAt: randomDate(new Date(2024, 0, 1), new Date()),
    metadata: {
      reason: 'Initial submission',
      urgency: 'medium' as const
    }
  });

  if (status !== 'submitted') {
    activities.push({
      id: `activity-${Date.now()}-2`,
      action: 'under_review' as const,
      comments: 'Review process initiated',
      reviewedBy: 'reviewer@company.com',
      reviewedAt: randomDate(new Date(2024, 0, 1), new Date()),
      metadata: {
        reason: 'Standard review process',
        urgency: 'medium' as const
      }
    });
  }

  if (status === 'approved') {
    activities.push({
      id: `activity-${Date.now()}-3`,
      action: 'approved' as const,
      comments: 'All requirements met, approved for processing',
      reviewedBy: 'admin@company.com',
      reviewedAt: randomDate(new Date(2024, 0, 1), new Date()),
      metadata: {
        reason: 'Meets all compliance requirements',
        urgency: 'low' as const,
        approvalType: 'fully' as const
      }
    });
  } else if (status === 'rejected') {
    activities.push({
      id: `activity-${Date.now()}-3`,
      action: 'rejected' as const,
      comments: 'Does not meet minimum requirements',
      reviewedBy: 'admin@company.com',
      reviewedAt: randomDate(new Date(2024, 0, 1), new Date()),
      metadata: {
        reason: 'Compliance issues identified',
        urgency: 'high' as const,
        specificFields: ['risk_assessment', 'compliance_certifications']
      }
    });
  }

  return activities;
};

// Generate documents
const generateDocuments = () => {
  const docs = [
    { name: 'Business License', type: 'pdf' },
    { name: 'Insurance Certificate', type: 'pdf' },
    { name: 'Financial Statement', type: 'xlsx' },
    { name: 'Compliance Report', type: 'docx' },
    { name: 'Security Assessment', type: 'pdf' }
  ];

  return docs.slice(0, Math.floor(Math.random() * 3) + 1).map((doc, index) => ({
    id: `doc-${Date.now()}-${index}`,
    name: doc.name,
    url: `/documents/${doc.name.toLowerCase().replace(/\s+/g, '-')}.${doc.type}`,
    type: doc.type,
    size: Math.floor(Math.random() * 5000000) + 100000,
    uploadedAt: randomDate(new Date(2024, 0, 1), new Date())
  }));
};

// Generate 50+ comprehensive sample submissions
export const expandedSampleSubmissions: FormSubmission[] = Array.from({ length: 55 }, (_, index) => {
  const company = companies[index % companies.length];
  const submissionTypes = ['vendor', 'internal', 'external'] as const;
  const statuses = ['submitted', 'under_review', 'approved', 'rejected'] as const;
  const riskLevels = ['low', 'medium', 'high', 'critical'] as const;
  
  const submissionType = submissionTypes[Math.floor(Math.random() * submissionTypes.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];
  
  const submittedAt = randomDate(new Date(2024, 0, 1), new Date());
  
  return {
    id: `submission-${index + 1}`,
    formId: 'form-1',
    submitterName: `${['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa', 'Tom', 'Emma'][Math.floor(Math.random() * 8)]} ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'][Math.floor(Math.random() * 8)]}`,
    submitterEmail: `user${index + 1}@${company.name.toLowerCase().replace(/\s+/g, '')}.com`,
    companyName: company.name,
    submissionType,
    responses: generateResponses(company.type, company.industry),
    submittedAt,
    status,
    approvalType: status === 'approved' ? (Math.random() > 0.5 ? 'fully' : 'partially') : undefined,
    timeSpent: Math.floor(Math.random() * 3600) + 300, // 5 minutes to 1 hour
    score: generateScore(riskLevel),
    activityLog: generateActivityLog(status),
    documents: generateDocuments()
  };
});
