
import { useState } from "react";
import { FormTemplate } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Shield, AlertTriangle, Building, Users, User, Globe } from "lucide-react";

interface FormLibraryProps {
  onUseTemplate?: (template: FormTemplate) => void;
}

// Helper function to generate unique IDs for form fields
const generateFieldId = (index: number) => `field_${index}_${Date.now()}`;

/**
 * Form templates library containing predefined form structures
 * Includes basic forms, risk assessments, and vendor evaluation templates
 */
const formTemplates: FormTemplate[] = [
  {
    id: "1",
    name: "Employee Onboarding",
    description: "Complete employee information collection and documentation",
    category: "registration",
    targetAudience: ["internal"],
    preview: "Personal details, emergency contacts, documents",
    fields: [
      { id: generateFieldId(1), type: "text", label: "Full Name", required: true },
      { id: generateFieldId(2), type: "email", label: "Email Address", required: true },
      { id: generateFieldId(3), type: "text", label: "Phone Number", required: true },
      { id: generateFieldId(4), type: "date", label: "Start Date", required: true },
      { id: generateFieldId(5), type: "select", label: "Department", required: true, options: ["HR", "IT", "Finance", "Operations"] },
      { id: generateFieldId(6), type: "textarea", label: "Additional Notes", required: false }
    ]
  },
  {
    id: "2",
    name: "Customer Satisfaction Survey",
    description: "Gather feedback on products and services",
    category: "survey",
    targetAudience: ["external", "vendor"],
    preview: "Rating scales, feedback questions, recommendations",
    fields: [
      { id: generateFieldId(7), type: "rating", label: "Overall Satisfaction", required: true },
      { id: generateFieldId(8), type: "radio", label: "Would you recommend us?", required: true, options: ["Yes", "No", "Maybe"] },
      { id: generateFieldId(9), type: "select", label: "How did you hear about us?", required: false, options: ["Social Media", "Website", "Referral", "Advertisement"] },
      { id: generateFieldId(10), type: "textarea", label: "Additional Comments", required: false }
    ]
  },

  // Vendor Risk Assessment Templates
  {
    id: "vra-1",
    name: "Comprehensive Vendor Risk Assessment",
    description: "Complete risk evaluation covering financial, operational, security, and compliance aspects",
    category: "vendor-risk",
    targetAudience: ["vendor"],
    preview: "Multi-category risk scoring with weighted assessments",
    riskCategories: ["Financial Stability", "Operational Risk", "Security & Privacy", "Compliance", "Business Continuity"],
    scoringModel: "weighted",
    fields: [
      // Company Information Section
      { id: generateFieldId(11), type: "text", label: "Vendor Company Name", required: true },
      { id: generateFieldId(12), type: "text", label: "Primary Contact Name", required: true },
      { id: generateFieldId(13), type: "email", label: "Primary Contact Email", required: true },
      { id: generateFieldId(14), type: "text", label: "Vendor Address", required: true },
      { 
        id: generateFieldId(15), 
        type: "select", 
        label: "Company Size", 
        required: true, 
        options: ["< 50 employees", "50-200 employees", "200-1000 employees", "> 1000 employees"],
        scoring: { 
          enabled: true, 
          maxPoints: 10, 
          scoringCriteria: { "< 50 employees": 3, "50-200 employees": 6, "200-1000 employees": 8, "> 1000 employees": 10 },
          riskLevel: "medium"
        }
      },
      
      // Financial Stability Section (25% weight)
      { 
        id: generateFieldId(16), 
        type: "select", 
        label: "Annual Revenue", 
        required: true, 
        options: ["< $1M", "$1M-$10M", "$10M-$50M", "$50M-$100M", "> $100M"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 2,
          scoringCriteria: { "< $1M": 5, "$1M-$10M": 8, "$10M-$50M": 12, "$50M-$100M": 14, "> $100M": 15 },
          riskLevel: "high"
        }
      },
      { 
        id: generateFieldId(17), 
        type: "radio", 
        label: "Financial Audited Statements Available?", 
        required: true, 
        options: ["Yes - Current Year", "Yes - Prior Year Only", "No"],
        scoring: { 
          enabled: true, 
          maxPoints: 10, 
          weightMultiplier: 2,
          correctAnswers: ["Yes - Current Year"],
          riskLevel: "high"
        }
      },
      { 
        id: generateFieldId(18), 
        type: "select", 
        label: "Credit Rating", 
        required: true, 
        options: ["AAA/Aaa", "AA/Aa", "A", "BBB/Baa", "Below BBB", "Not Rated"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 2,
          scoringCriteria: { "AAA/Aaa": 15, "AA/Aa": 13, "A": 10, "BBB/Baa": 7, "Below BBB": 3, "Not Rated": 5 },
          riskLevel: "critical"
        }
      },
      { 
        id: generateFieldId(19), 
        type: "radio", 
        label: "Any bankruptcy or financial distress in last 5 years?", 
        required: true, 
        options: ["No", "Yes"],
        scoring: { 
          enabled: true, 
          maxPoints: 20, 
          weightMultiplier: 3,
          correctAnswers: ["No"],
          riskLevel: "critical"
        }
      },

      // Security & Privacy Section (30% weight)
      { 
        id: generateFieldId(20), 
        type: "checkbox", 
        label: "Security Certifications", 
        required: true, 
        options: ["ISO 27001", "SOC 2 Type II", "ISO 22301", "NIST Cybersecurity Framework", "None"],
        scoring: { 
          enabled: true, 
          maxPoints: 20, 
          weightMultiplier: 3,
          correctAnswers: ["ISO 27001", "SOC 2 Type II"],
          riskLevel: "critical"
        }
      },
      { 
        id: generateFieldId(21), 
        type: "radio", 
        label: "Data encryption at rest and in transit?", 
        required: true, 
        options: ["Yes - Both", "Yes - Transit Only", "Yes - Rest Only", "No"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 3,
          correctAnswers: ["Yes - Both"],
          riskLevel: "critical"
        }
      },
      { 
        id: generateFieldId(22), 
        type: "radio", 
        label: "Regular penetration testing conducted?", 
        required: true, 
        options: ["Quarterly", "Bi-annually", "Annually", "As needed", "Never"],
        scoring: { 
          enabled: true, 
          maxPoints: 10, 
          weightMultiplier: 2,
          scoringCriteria: { "Quarterly": 10, "Bi-annually": 8, "Annually": 6, "As needed": 3, "Never": 0 },
          riskLevel: "high"
        }
      },
      { 
        id: generateFieldId(23), 
        type: "radio", 
        label: "Incident response plan in place?", 
        required: true, 
        options: ["Yes - Documented and Tested", "Yes - Documented Only", "Informal", "No"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 2,
          correctAnswers: ["Yes - Documented and Tested"],
          riskLevel: "high"
        }
      },
      { 
        id: generateFieldId(24), 
        type: "radio", 
        label: "Security incidents in last 12 months?", 
        required: true, 
        options: ["None", "1-2 Minor", "3+ Minor", "1+ Major"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 3,
          scoringCriteria: { "None": 15, "1-2 Minor": 10, "3+ Minor": 5, "1+ Major": 0 },
          riskLevel: "critical"
        }
      },

      // Compliance Section (20% weight)
      { 
        id: generateFieldId(25), 
        type: "checkbox", 
        label: "Regulatory Compliance", 
        required: true, 
        options: ["GDPR", "CCPA", "HIPAA", "SOX", "PCI DSS", "Not Applicable"],
        scoring: { 
          enabled: true, 
          maxPoints: 20, 
          weightMultiplier: 2,
          requiresManualReview: true,
          riskLevel: "high"
        }
      },
      { 
        id: generateFieldId(26), 
        type: "radio", 
        label: "Regular compliance audits conducted?", 
        required: true, 
        options: ["Quarterly", "Bi-annually", "Annually", "As required", "Never"],
        scoring: { 
          enabled: true, 
          maxPoints: 10, 
          weightMultiplier: 2,
          scoringCriteria: { "Quarterly": 10, "Bi-annually": 8, "Annually": 6, "As required": 4, "Never": 0 },
          riskLevel: "medium"
        }
      },

      // Operational Risk Section (15% weight)
      { 
        id: generateFieldId(27), 
        type: "radio", 
        label: "Business continuity plan exists?", 
        required: true, 
        options: ["Yes - Tested regularly", "Yes - Not tested", "In development", "No"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 2,
          correctAnswers: ["Yes - Tested regularly"],
          riskLevel: "high"
        }
      },
      { 
        id: generateFieldId(28), 
        type: "select", 
        label: "Service availability SLA", 
        required: true, 
        options: ["99.9%+", "99.5-99.9%", "99-99.5%", "95-99%", "< 95%", "No SLA"],
        scoring: { 
          enabled: true, 
          maxPoints: 10, 
          weightMultiplier: 2,
          scoringCriteria: { "99.9%+": 10, "99.5-99.9%": 8, "99-99.5%": 6, "95-99%": 4, "< 95%": 2, "No SLA": 0 },
          riskLevel: "medium"
        }
      },
      { 
        id: generateFieldId(29), 
        type: "radio", 
        label: "Geographic location of primary operations", 
        required: true, 
        options: ["Domestic", "Allied countries", "Non-allied countries", "Restricted countries"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 2,
          scoringCriteria: { "Domestic": 15, "Allied countries": 10, "Non-allied countries": 5, "Restricted countries": 0 },
          riskLevel: "high"
        }
      },

      // Additional Risk Factors
      { 
        id: generateFieldId(30), 
        type: "radio", 
        label: "Key person dependency risk", 
        required: true, 
        options: ["Low", "Medium", "High"],
        scoring: { 
          enabled: true, 
          maxPoints: 10, 
          scoringCriteria: { "Low": 10, "Medium": 6, "High": 2 },
          riskLevel: "medium"
        }
      },
      { 
        id: generateFieldId(31), 
        type: "textarea", 
        label: "Additional Risk Considerations", 
        required: false,
        scoring: { 
          enabled: true, 
          requiresManualReview: true,
          maxPoints: 10,
          riskLevel: "medium"
        }
      }
    ]
  },

  // IT Vendor Security Assessment Template
  {
    id: "vra-2", 
    name: "IT Vendor Security Assessment",
    description: "Focused security and technology risk evaluation for IT service providers",
    category: "vendor-risk",
    targetAudience: ["vendor"],
    preview: "Technical security controls, data protection, and IT governance",
    riskCategories: ["Technical Security", "Data Protection", "Access Management", "Infrastructure"],
    scoringModel: "risk-matrix",
    fields: [
      { id: generateFieldId(32), type: "text", label: "Vendor Name", required: true },
      { id: generateFieldId(33), type: "text", label: "Service Type", required: true },
      
      // Technical Security Section
      { 
        id: generateFieldId(34), 
        type: "checkbox", 
        label: "Security Frameworks Implemented", 
        required: true, 
        options: ["NIST Cybersecurity Framework", "ISO 27001", "CIS Controls", "COBIT", "Custom Framework"],
        scoring: { 
          enabled: true, 
          maxPoints: 20, 
          weightMultiplier: 3,
          correctAnswers: ["NIST Cybersecurity Framework", "ISO 27001"],
          riskLevel: "critical"
        }
      },
      { 
        id: generateFieldId(35), 
        type: "radio", 
        label: "Multi-factor authentication enforced?", 
        required: true, 
        options: ["Yes - All users", "Yes - Admin only", "Yes - Some users", "No"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 3,
          correctAnswers: ["Yes - All users"],
          riskLevel: "critical"
        }
      },
      { 
        id: generateFieldId(36), 
        type: "radio", 
        label: "Vulnerability management program", 
        required: true, 
        options: ["Automated with rapid patching", "Automated with scheduled patching", "Manual process", "Ad-hoc"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 2,
          scoringCriteria: { 
            "Automated with rapid patching": 15, 
            "Automated with scheduled patching": 12, 
            "Manual process": 6, 
            "Ad-hoc": 2 
          },
          riskLevel: "high"
        }
      },
      
      // Data Protection Section
      { 
        id: generateFieldId(37), 
        type: "radio", 
        label: "Data classification system in place?", 
        required: true, 
        options: ["Yes - Comprehensive", "Yes - Basic", "In development", "No"],
        scoring: { 
          enabled: true, 
          maxPoints: 10, 
          weightMultiplier: 2,
          correctAnswers: ["Yes - Comprehensive"],
          riskLevel: "high"
        }
      },
      { 
        id: generateFieldId(38), 
        type: "radio", 
        label: "Data backup and recovery tested?", 
        required: true, 
        options: ["Monthly", "Quarterly", "Annually", "Never tested"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 2,
          scoringCriteria: { "Monthly": 15, "Quarterly": 12, "Annually": 8, "Never tested": 0 },
          riskLevel: "high"
        }
      },
      { 
        id: generateFieldId(39), 
        type: "select", 
        label: "Data retention policy", 
        required: true, 
        options: ["Documented and enforced", "Documented not enforced", "Informal", "None"],
        scoring: { 
          enabled: true, 
          maxPoints: 10, 
          weightMultiplier: 2,
          correctAnswers: ["Documented and enforced"],
          riskLevel: "medium"
        }
      },

      // Infrastructure Section
      { 
        id: generateFieldId(40), 
        type: "radio", 
        label: "Cloud infrastructure used?", 
        required: true, 
        options: ["Major providers (AWS/Azure/GCP)", "Tier 1 providers", "Tier 2/3 providers", "On-premise only"],
        scoring: { 
          enabled: true, 
          maxPoints: 10, 
          scoringCriteria: { 
            "Major providers (AWS/Azure/GCP)": 10, 
            "Tier 1 providers": 8, 
            "Tier 2/3 providers": 5, 
            "On-premise only": 6 
          },
          riskLevel: "medium"
        }
      },
      { 
        id: generateFieldId(41), 
        type: "radio", 
        label: "Network monitoring and logging", 
        required: true, 
        options: ["24/7 SOC", "Business hours monitoring", "Automated alerts only", "Basic logging"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 2,
          scoringCriteria: { 
            "24/7 SOC": 15, 
            "Business hours monitoring": 10, 
            "Automated alerts only": 6, 
            "Basic logging": 3 
          },
          riskLevel: "high"
        }
      }
    ]
  },

  // Financial Services Vendor Assessment Template
  {
    id: "vra-3",
    name: "Financial Services Vendor Assessment", 
    description: "Specialized assessment for financial services vendors focusing on regulatory compliance",
    category: "vendor-risk",
    targetAudience: ["vendor"],
    preview: "Regulatory compliance, financial stability, operational resilience",
    riskCategories: ["Regulatory Compliance", "Financial Health", "Operational Resilience", "Reputation Risk"],
    scoringModel: "weighted",
    fields: [
      { id: generateFieldId(42), type: "text", label: "Institution Name", required: true },
      { 
        id: generateFieldId(43), 
        type: "select", 
        label: "Institution Type", 
        required: true, 
        options: ["Bank", "Credit Union", "Investment Firm", "Insurance Company", "Fintech", "Other"],
        scoring: { 
          enabled: true, 
          maxPoints: 10, 
          riskLevel: "medium"
        }
      },
      
      // Regulatory Compliance Section (40% weight)
      { 
        id: generateFieldId(44), 
        type: "checkbox", 
        label: "Regulatory Registrations", 
        required: true, 
        options: ["FDIC Insured", "Fed Member", "State Licensed", "SEC Registered", "FINRA Member", "Not Applicable"],
        scoring: { 
          enabled: true, 
          maxPoints: 25, 
          weightMultiplier: 4,
          requiresManualReview: true,
          riskLevel: "critical"
        }
      },
      { 
        id: generateFieldId(45), 
        type: "radio", 
        label: "Anti-Money Laundering (AML) program", 
        required: true, 
        options: ["Comprehensive with regular training", "Basic program", "In development", "Not applicable"],
        scoring: { 
          enabled: true, 
          maxPoints: 20, 
          weightMultiplier: 4,
          correctAnswers: ["Comprehensive with regular training"],
          riskLevel: "critical"
        }
      },
      { 
        id: generateFieldId(46), 
        type: "radio", 
        label: "Know Your Customer (KYC) procedures", 
        required: true, 
        options: ["Enhanced due diligence", "Standard procedures", "Basic checks", "Limited"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 3,
          correctAnswers: ["Enhanced due diligence"],
          riskLevel: "high"
        }
      },
      
      // Financial Health Section (25% weight)
      { 
        id: generateFieldId(47), 
        type: "select", 
        label: "Capital Adequacy Ratio", 
        required: true, 
        options: ["> 15%", "12-15%", "10-12%", "8-10%", "< 8%", "Not Applicable"],
        scoring: { 
          enabled: true, 
          maxPoints: 20, 
          weightMultiplier: 3,
          scoringCriteria: { "> 15%": 20, "12-15%": 16, "10-12%": 12, "8-10%": 8, "< 8%": 0, "Not Applicable": 10 },
          riskLevel: "high"
        }
      },
      { 
        id: generateFieldId(48), 
        type: "radio", 
        label: "Regulatory enforcement actions in last 3 years?", 
        required: true, 
        options: ["None", "Minor violations", "Significant violations", "Cease and desist"],
        scoring: { 
          enabled: true, 
          maxPoints: 25, 
          weightMultiplier: 4,
          scoringCriteria: { "None": 25, "Minor violations": 15, "Significant violations": 5, "Cease and desist": 0 },
          riskLevel: "critical"
        }
      }
    ]
  },

  // Third-Party Data Processor Assessment Template
  {
    id: "vra-4",
    name: "Third-Party Data Processor Assessment",
    description: "Privacy and data protection focused assessment for data processing vendors",
    category: "vendor-risk",
    targetAudience: ["vendor", "external"], 
    preview: "GDPR compliance, data security, cross-border transfers",
    riskCategories: ["Data Protection", "Privacy Controls", "Cross-border Compliance"],
    scoringModel: "percentage",
    fields: [
      { id: generateFieldId(49), type: "text", label: "Data Processor Name", required: true },
      { id: generateFieldId(50), type: "textarea", label: "Type of Data Processing", required: true },
      
      // GDPR Compliance Section
      { 
        id: generateFieldId(51), 
        type: "radio", 
        label: "GDPR Article 28 compliant Data Processing Agreement?", 
        required: true, 
        options: ["Yes - Comprehensive DPA", "Yes - Basic DPA", "In negotiation", "No"],
        scoring: { 
          enabled: true, 
          maxPoints: 25, 
          weightMultiplier: 4,
          correctAnswers: ["Yes - Comprehensive DPA"],
          riskLevel: "critical"
        }
      },
      { 
        id: generateFieldId(52), 
        type: "checkbox", 
        label: "Data Subject Rights Support", 
        required: true, 
        options: ["Access", "Rectification", "Erasure", "Portability", "Restriction", "Objection"],
        scoring: { 
          enabled: true, 
          maxPoints: 20, 
          weightMultiplier: 3,
          correctAnswers: ["Access", "Rectification", "Erasure"],
          riskLevel: "high"
        }
      },
      { 
        id: generateFieldId(53), 
        type: "radio", 
        label: "Data breach notification procedures", 
        required: true, 
        options: ["< 24 hours", "24-48 hours", "48-72 hours", "> 72 hours", "No procedure"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 3,
          correctAnswers: ["< 24 hours"],
          riskLevel: "critical"
        }
      },
      
      // Cross-border transfers Section
      { 
        id: generateFieldId(54), 
        type: "select", 
        label: "Data transfer mechanisms", 
        required: true, 
        options: ["Adequacy decisions", "Standard Contractual Clauses", "Binding Corporate Rules", "Derogations", "No transfers"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 2,
          requiresManualReview: true,
          riskLevel: "high"
        }
      }
    ]
  },

  // Critical Infrastructure Vendor Assessment Template
  {
    id: "vra-5",
    name: "Critical Infrastructure Vendor Assessment",
    description: "Assessment for vendors supporting critical infrastructure and essential services",
    category: "vendor-risk",
    targetAudience: ["vendor"],
    preview: "National security, operational resilience, supply chain security",
    riskCategories: ["National Security", "Supply Chain", "Operational Resilience"],
    scoringModel: "risk-matrix",
    fields: [
      { id: generateFieldId(55), type: "text", label: "Vendor Name", required: true },
      { 
        id: generateFieldId(56), 
        type: "select", 
        label: "Critical Infrastructure Sector", 
        required: true, 
        options: ["Energy", "Water", "Transportation", "Communications", "Healthcare", "Financial", "Government", "Other"],
        scoring: { 
          enabled: true, 
          maxPoints: 10, 
          requiresManualReview: true,
          riskLevel: "critical"
        }
      },
      
      // Supply Chain Security Section
      { 
        id: generateFieldId(57), 
        type: "radio", 
        label: "Supply chain risk management program", 
        required: true, 
        options: ["Comprehensive program", "Basic assessments", "Limited oversight", "No program"],
        scoring: { 
          enabled: true, 
          maxPoints: 20, 
          weightMultiplier: 4,
          correctAnswers: ["Comprehensive program"],
          riskLevel: "critical"
        }
      },
      { 
        id: generateFieldId(58), 
        type: "radio", 
        label: "Foreign ownership or control?", 
        required: true, 
        options: ["No foreign involvement", "Minority foreign investment", "Majority foreign owned", "Foreign controlled"],
        scoring: { 
          enabled: true, 
          maxPoints: 25, 
          weightMultiplier: 5,
          scoringCriteria: { 
            "No foreign involvement": 25, 
            "Minority foreign investment": 15, 
            "Majority foreign owned": 5, 
            "Foreign controlled": 0 
          },
          riskLevel: "critical"
        }
      },
      { 
        id: generateFieldId(59), 
        type: "checkbox", 
        label: "Security clearances held", 
        required: true, 
        options: ["Secret", "Top Secret", "TS/SCI", "None required", "None held"],
        scoring: { 
          enabled: true, 
          maxPoints: 15, 
          weightMultiplier: 2,
          requiresManualReview: true,
          riskLevel: "high"
        }
      }
    ]
  },

  // External Company Assessment Templates
  {
    id: "ext-1",
    name: "Business Partnership Assessment",
    description: "Comprehensive evaluation for potential business partners and strategic alliances",
    category: "external-assessment",
    targetAudience: ["external"],
    preview: "Company overview, capabilities, financial health, strategic alignment",
    fields: [
      { id: generateFieldId(60), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(61), type: "text", label: "Primary Contact", required: true },
      { id: generateFieldId(62), type: "email", label: "Contact Email", required: true },
      { id: generateFieldId(63), type: "text", label: "Company Website", required: false },
      { 
        id: generateFieldId(64), 
        type: "select", 
        label: "Partnership Type", 
        required: true, 
        options: ["Strategic Alliance", "Joint Venture", "Distribution Partner", "Technology Partner", "Other"]
      },
      { id: generateFieldId(65), type: "textarea", label: "Company Overview", required: true },
      { 
        id: generateFieldId(66), 
        type: "select", 
        label: "Years in Business", 
        required: true, 
        options: ["< 2 years", "2-5 years", "5-10 years", "10-20 years", "> 20 years"]
      },
      { 
        id: generateFieldId(67), 
        type: "checkbox", 
        label: "Core Capabilities", 
        required: true, 
        options: ["Technology Development", "Manufacturing", "Distribution", "Marketing", "Research & Development", "Customer Support"]
      },
      { 
        id: generateFieldId(68), 
        type: "radio", 
        label: "Previous Partnership Experience", 
        required: true, 
        options: ["Extensive experience", "Some experience", "Limited experience", "No experience"]
      },
      { id: generateFieldId(69), type: "textarea", label: "Key Differentiators", required: false },
      { id: generateFieldId(70), type: "textarea", label: "Expected Benefits from Partnership", required: true }
    ]
  },

  {
    id: "ext-2",
    name: "Supplier Capability Assessment",
    description: "Evaluation form for non-vendor suppliers and service providers",
    category: "external-assessment",
    targetAudience: ["external"],
    preview: "Service capabilities, quality standards, delivery performance",
    fields: [
      { id: generateFieldId(71), type: "text", label: "Supplier Company Name", required: true },
      { id: generateFieldId(72), type: "text", label: "Service/Product Type", required: true },
      { id: generateFieldId(73), type: "email", label: "Business Contact Email", required: true },
      { 
        id: generateFieldId(74), 
        type: "select", 
        label: "Service Category", 
        required: true, 
        options: ["Professional Services", "Logistics & Transportation", "Maintenance & Support", "Consulting", "Training", "Other"]
      },
      { 
        id: generateFieldId(75), 
        type: "checkbox", 
        label: "Quality Certifications", 
        required: false, 
        options: ["ISO 9001", "ISO 14001", "Six Sigma", "Lean Manufacturing", "Industry Specific", "None"]
      },
      { 
        id: generateFieldId(76), 
        type: "radio", 
        label: "Geographic Coverage", 
        required: true, 
        options: ["Local", "Regional", "National", "International"]
      },
      { 
        id: generateFieldId(77), 
        type: "select", 
        label: "Typical Delivery Timeline", 
        required: true, 
        options: ["Same day", "1-3 days", "1-2 weeks", "2-4 weeks", "> 1 month"]
      },
      { id: generateFieldId(78), type: "textarea", label: "Service Description", required: true },
      { id: generateFieldId(79), type: "textarea", label: "Quality Assurance Process", required: false }
    ]
  },

  {
    id: "ext-3",
    name: "External Consultant Registration",
    description: "Registration and qualification form for external consultants and contractors",
    category: "external-assessment",
    targetAudience: ["external"],
    preview: "Professional background, expertise areas, availability",
    fields: [
      { id: generateFieldId(80), type: "text", label: "Consultant Name", required: true },
      { id: generateFieldId(81), type: "email", label: "Professional Email", required: true },
      { id: generateFieldId(82), type: "text", label: "Phone Number", required: true },
      { id: generateFieldId(83), type: "text", label: "Company/Firm Name", required: false },
      { 
        id: generateFieldId(84), 
        type: "checkbox", 
        label: "Areas of Expertise", 
        required: true, 
        options: ["Strategy", "Operations", "Technology", "Finance", "HR", "Marketing", "Legal", "Risk Management"]
      },
      { 
        id: generateFieldId(85), 
        type: "select", 
        label: "Years of Experience", 
        required: true, 
        options: ["< 5 years", "5-10 years", "10-15 years", "15-20 years", "> 20 years"]
      },
      { 
        id: generateFieldId(86), 
        type: "checkbox", 
        label: "Industry Experience", 
        required: true, 
        options: ["Healthcare", "Financial Services", "Technology", "Manufacturing", "Retail", "Government", "Other"]
      },
      { 
        id: generateFieldId(87), 
        type: "radio", 
        label: "Availability", 
        required: true, 
        options: ["Immediately", "Within 2 weeks", "Within 1 month", "Future projects only"]
      },
      { id: generateFieldId(88), type: "textarea", label: "Professional Summary", required: true },
      { id: generateFieldId(89), type: "textarea", label: "Notable Projects or Achievements", required: false }
    ]
  },

  {
    id: "ext-4",
    name: "Client Information Gathering",
    description: "Comprehensive form for collecting information from external clients",
    category: "external-assessment",
    targetAudience: ["external"],
    preview: "Client requirements, project scope, timeline expectations",
    fields: [
      { id: generateFieldId(90), type: "text", label: "Client Organization", required: true },
      { id: generateFieldId(91), type: "text", label: "Primary Contact Person", required: true },
      { id: generateFieldId(92), type: "email", label: "Contact Email", required: true },
      { id: generateFieldId(93), type: "text", label: "Project Title", required: true },
      { 
        id: generateFieldId(94), 
        type: "select", 
        label: "Project Type", 
        required: true, 
        options: ["Software Development", "Consulting", "Integration", "Support Services", "Training", "Other"]
      },
      { id: generateFieldId(95), type: "textarea", label: "Project Description", required: true },
      { 
        id: generateFieldId(96), 
        type: "checkbox", 
        label: "Required Services", 
        required: true, 
        options: ["Analysis & Planning", "Design", "Development", "Testing", "Deployment", "Training", "Support"]
      },
      { 
        id: generateFieldId(97), 
        type: "select", 
        label: "Expected Timeline", 
        required: true, 
        options: ["< 1 month", "1-3 months", "3-6 months", "6-12 months", "> 1 year"]
      },
      { 
        id: generateFieldId(98), 
        type: "radio", 
        label: "Budget Range", 
        required: false, 
        options: ["< $50K", "$50K-$100K", "$100K-$500K", "$500K-$1M", "> $1M", "To be discussed"]
      },
      { id: generateFieldId(99), type: "textarea", label: "Success Criteria", required: true },
      { id: generateFieldId(100), type: "textarea", label: "Special Requirements", required: false }
    ]
  }
];

/**
 * FormLibrary Component
 * Displays a searchable library of form templates categorized by type
 * Allows users to filter and select templates for their forms
 */
export const FormLibrary = ({ onUseTemplate }: FormLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Available categories for filtering templates
  const categories = ["all", "survey", "assessment", "registration", "feedback", "compliance", "risk", "vendor-risk", "external-assessment"];

  /**
   * Filter templates based on search term and selected category
   */
  const filteredTemplates = formTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  /**
   * Handle template selection and notify parent component
   */
  const handleUseTemplate = (template: FormTemplate) => {
    console.log("Using template:", template);
    if (onUseTemplate) {
      onUseTemplate(template);
    }
  };

  /**
   * Get icon for specific category types
   */
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vendor-risk':
        return <Shield className="h-4 w-4" />;
      case 'risk':
        return <AlertTriangle className="h-4 w-4" />;
      case 'compliance':
        return <Building className="h-4 w-4" />;
      case 'external-assessment':
        return <Globe className="h-4 w-4" />;
      default:
        return null;
    }
  };

  /**
   * Get color scheme for category badges
   */
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vendor-risk':
        return 'bg-red-100 text-red-800';
      case 'risk':
        return 'bg-orange-100 text-orange-800';
      case 'compliance':
        return 'bg-blue-100 text-blue-800';
      case 'external-assessment':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md bg-white"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === "all" ? "All Categories" : 
               category === "vendor-risk" ? "Vendor Risk" :
               category === "external-assessment" ? "External Assessment" :
               category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                   <div className="flex items-center gap-2 mt-2">
                     <Badge 
                       variant="secondary" 
                       className={`${getCategoryColor(template.category)} flex items-center gap-1`}
                     >
                       {getCategoryIcon(template.category)}
                       {template.category === "vendor-risk" ? "Vendor Risk" : 
                        template.category === "external-assessment" ? "External" : template.category}
                     </Badge>
                     {template.targetAudience && (
                       <div className="flex gap-1">
                         {template.targetAudience.map((audience) => (
                           <Badge key={audience} variant="outline" className="text-xs flex items-center gap-1">
                             {audience === 'vendor' && <Building className="h-3 w-3" />}
                             {audience === 'external' && <Globe className="h-3 w-3" />}
                             {audience === 'internal' && <Users className="h-3 w-3" />}
                             {audience}
                           </Badge>
                         ))}
                       </div>
                     )}
                     {template.scoringModel && (
                       <Badge variant="outline" className="text-xs">
                         {template.scoringModel}
                       </Badge>
                     )}
                   </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{template.description}</p>
              {/* Risk Categories Display */}
              {template.riskCategories && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-700">Risk Categories:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.riskCategories.map((category, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Preview:</p>
                  <p className="text-sm text-gray-500">{template.preview}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Fields ({template.fields.length}):</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.fields.slice(0, 3).map((field, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {field.type}
                      </Badge>
                    ))}
                    {template.fields.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.fields.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => handleUseTemplate(template)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results Message */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No templates found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
