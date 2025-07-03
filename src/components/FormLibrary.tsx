
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
  },

  // HR & INTERNAL TEMPLATES
  {
    id: "hr-1",
    name: "Employee Performance Review",
    description: "Annual performance evaluation and goal setting for employees",
    category: "hr",
    targetAudience: ["internal"],
    preview: "Performance metrics, achievements, goals, development plans",
    fields: [
      { id: generateFieldId(101), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(102), type: "text", label: "Position", required: true },
      { id: generateFieldId(103), type: "text", label: "Department", required: true },
      { id: generateFieldId(104), type: "date", label: "Review Period Start", required: true },
      { id: generateFieldId(105), type: "date", label: "Review Period End", required: true },
      { id: generateFieldId(106), type: "rating", label: "Overall Performance Rating", required: true },
      { id: generateFieldId(107), type: "textarea", label: "Key Achievements", required: true },
      { id: generateFieldId(108), type: "textarea", label: "Areas for Improvement", required: false },
      { id: generateFieldId(109), type: "textarea", label: "Goals for Next Period", required: true },
      { id: generateFieldId(110), type: "checkbox", label: "Training Needs", required: false, options: ["Leadership", "Technical Skills", "Communication", "Project Management", "Other"] }
    ]
  },

  {
    id: "hr-2", 
    name: "Exit Interview",
    description: "Comprehensive exit interview for departing employees",
    category: "hr",
    targetAudience: ["internal"],
    preview: "Reasons for leaving, feedback, suggestions for improvement",
    fields: [
      { id: generateFieldId(111), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(112), type: "date", label: "Last Working Day", required: true },
      { id: generateFieldId(113), type: "select", label: "Reason for Leaving", required: true, options: ["New Job Opportunity", "Career Growth", "Salary", "Work-Life Balance", "Management Issues", "Company Culture", "Other"] },
      { id: generateFieldId(114), type: "rating", label: "Overall Job Satisfaction", required: true },
      { id: generateFieldId(115), type: "rating", label: "Management Satisfaction", required: true },
      { id: generateFieldId(116), type: "textarea", label: "What Did You Like Most About Working Here?", required: false },
      { id: generateFieldId(117), type: "textarea", label: "What Could Be Improved?", required: false },
      { id: generateFieldId(118), type: "radio", label: "Would You Recommend This Company to Others?", required: true, options: ["Yes", "No", "Maybe"] }
    ]
  },

  {
    id: "hr-3",
    name: "Training Request",
    description: "Employee training and development request form",
    category: "hr",
    targetAudience: ["internal"],
    preview: "Training type, justification, budget, timeline",
    fields: [
      { id: generateFieldId(119), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(120), type: "text", label: "Training Program", required: true },
      { id: generateFieldId(121), type: "select", label: "Training Type", required: true, options: ["Conference", "Online Course", "Certification", "Workshop", "External Training", "Internal Training"] },
      { id: generateFieldId(122), type: "textarea", label: "Business Justification", required: true },
      { id: generateFieldId(123), type: "text", label: "Estimated Cost", required: true },
      { id: generateFieldId(124), type: "date", label: "Preferred Date", required: false },
      { id: generateFieldId(125), type: "textarea", label: "Expected Benefits", required: true }
    ]
  },

  {
    id: "hr-4",
    name: "Internal Job Application",
    description: "Application form for internal job postings",
    category: "hr",
    targetAudience: ["internal"],
    preview: "Position details, qualifications, experience, motivation",
    fields: [
      { id: generateFieldId(126), type: "text", label: "Current Position", required: true },
      { id: generateFieldId(127), type: "text", label: "Applied Position", required: true },
      { id: generateFieldId(128), type: "text", label: "Department", required: true },
      { id: generateFieldId(129), type: "textarea", label: "Relevant Experience", required: true },
      { id: generateFieldId(130), type: "textarea", label: "Why Are You Interested?", required: true },
      { id: generateFieldId(131), type: "checkbox", label: "Required Skills", required: true, options: ["Leadership", "Project Management", "Technical Expertise", "Communication", "Problem Solving"] },
      { id: generateFieldId(132), type: "text", label: "Notice Period", required: true }
    ]
  },

  {
    id: "hr-5",
    name: "Expense Reimbursement",
    description: "Employee expense reimbursement request",
    category: "finance",
    targetAudience: ["internal"],
    preview: "Expense details, receipts, approvals",
    fields: [
      { id: generateFieldId(133), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(134), type: "text", label: "Employee ID", required: true },
      { id: generateFieldId(135), type: "date", label: "Expense Date", required: true },
      { id: generateFieldId(136), type: "select", label: "Expense Category", required: true, options: ["Travel", "Meals", "Office Supplies", "Training", "Client Entertainment", "Other"] },
      { id: generateFieldId(137), type: "text", label: "Amount", required: true },
      { id: generateFieldId(138), type: "textarea", label: "Business Purpose", required: true },
      { id: generateFieldId(139), type: "text", label: "Project/Client Code", required: false }
    ]
  },

  // CUSTOMER & EXTERNAL TEMPLATES
  {
    id: "cust-1",
    name: "Customer Registration",
    description: "New customer account setup and information collection",
    category: "customer",
    targetAudience: ["external"],
    preview: "Company details, contact information, service requirements",
    fields: [
      { id: generateFieldId(140), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(141), type: "text", label: "Primary Contact", required: true },
      { id: generateFieldId(142), type: "email", label: "Business Email", required: true },
      { id: generateFieldId(143), type: "text", label: "Phone Number", required: true },
      { id: generateFieldId(144), type: "textarea", label: "Company Address", required: true },
      { id: generateFieldId(145), type: "select", label: "Industry", required: true, options: ["Technology", "Healthcare", "Finance", "Manufacturing", "Retail", "Education", "Government", "Other"] },
      { id: generateFieldId(146), type: "select", label: "Company Size", required: true, options: ["1-10", "11-50", "51-200", "201-1000", "1000+"] },
      { id: generateFieldId(147), type: "checkbox", label: "Services Interested In", required: true, options: ["Consulting", "Software Development", "Support", "Training", "Integration"] }
    ]
  },

  {
    id: "cust-2",
    name: "Service Request",
    description: "Customer service request and support ticket",
    category: "customer",
    targetAudience: ["external"],
    preview: "Issue description, priority, contact details",
    fields: [
      { id: generateFieldId(148), type: "text", label: "Customer Name", required: true },
      { id: generateFieldId(149), type: "email", label: "Contact Email", required: true },
      { id: generateFieldId(150), type: "select", label: "Request Type", required: true, options: ["Technical Support", "Account Issue", "Billing Inquiry", "Feature Request", "Bug Report", "General Question"] },
      { id: generateFieldId(151), type: "select", label: "Priority", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { id: generateFieldId(152), type: "textarea", label: "Issue Description", required: true },
      { id: generateFieldId(153), type: "textarea", label: "Steps to Reproduce", required: false },
      { id: generateFieldId(154), type: "text", label: "Preferred Contact Method", required: false }
    ]
  },

  {
    id: "cust-3",
    name: "Product Feedback",
    description: "Customer feedback on products and services",
    category: "customer",
    targetAudience: ["external"],
    preview: "Product experience, ratings, improvement suggestions",
    fields: [
      { id: generateFieldId(155), type: "text", label: "Product/Service", required: true },
      { id: generateFieldId(156), type: "rating", label: "Overall Satisfaction", required: true },
      { id: generateFieldId(157), type: "rating", label: "Ease of Use", required: true },
      { id: generateFieldId(158), type: "rating", label: "Value for Money", required: true },
      { id: generateFieldId(159), type: "textarea", label: "What Do You Like Most?", required: false },
      { id: generateFieldId(160), type: "textarea", label: "What Could Be Improved?", required: false },
      { id: generateFieldId(161), type: "radio", label: "Would You Recommend This Product?", required: true, options: ["Definitely", "Probably", "Not Sure", "Probably Not", "Definitely Not"] }
    ]
  },

  {
    id: "cust-4",
    name: "Event Registration",
    description: "Registration form for events, webinars, and conferences",
    category: "marketing",
    targetAudience: ["external"],
    preview: "Event details, attendee information, preferences",
    fields: [
      { id: generateFieldId(162), type: "text", label: "Full Name", required: true },
      { id: generateFieldId(163), type: "email", label: "Email Address", required: true },
      { id: generateFieldId(164), type: "text", label: "Job Title", required: true },
      { id: generateFieldId(165), type: "text", label: "Company", required: true },
      { id: generateFieldId(166), type: "select", label: "Event Session", required: true, options: ["Morning Session", "Afternoon Session", "Full Day", "Virtual Only"] },
      { id: generateFieldId(167), type: "checkbox", label: "Dietary Requirements", required: false, options: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "None"] },
      { id: generateFieldId(168), type: "textarea", label: "Special Requirements", required: false }
    ]
  },

  {
    id: "cust-5",
    name: "Partnership Inquiry",
    description: "Inquiry form for potential business partnerships",
    category: "business",
    targetAudience: ["external"],
    preview: "Partnership type, company background, proposal details",
    fields: [
      { id: generateFieldId(169), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(170), type: "text", label: "Contact Person", required: true },
      { id: generateFieldId(171), type: "email", label: "Business Email", required: true },
      { id: generateFieldId(172), type: "select", label: "Partnership Type", required: true, options: ["Strategic Alliance", "Distribution", "Technology Integration", "Joint Venture", "Supplier", "Reseller"] },
      { id: generateFieldId(173), type: "textarea", label: "Company Overview", required: true },
      { id: generateFieldId(174), type: "textarea", label: "Partnership Proposal", required: true },
      { id: generateFieldId(175), type: "text", label: "Expected Start Date", required: false }
    ]
  },

  // COMPLIANCE & LEGAL TEMPLATES
  {
    id: "comp-1",
    name: "GDPR Data Processing Agreement",
    description: "GDPR compliance assessment for data processors",
    category: "compliance",
    targetAudience: ["vendor", "external"],
    preview: "Data protection measures, processing activities, compliance status",
    fields: [
      { id: generateFieldId(176), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(177), type: "textarea", label: "Data Processing Activities", required: true },
      { id: generateFieldId(178), type: "checkbox", label: "Types of Personal Data", required: true, options: ["Contact Information", "Financial Data", "Health Data", "Biometric Data", "Special Categories"] },
      { id: generateFieldId(179), type: "radio", label: "Data Protection Officer Appointed?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(180), type: "radio", label: "Data Breach Notification Procedure?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(181), type: "textarea", label: "Technical Security Measures", required: true },
      { id: generateFieldId(182), type: "textarea", label: "Organizational Security Measures", required: true }
    ]
  },

  {
    id: "comp-2",
    name: "SOX Compliance Assessment",
    description: "Sarbanes-Oxley compliance evaluation",
    category: "compliance",
    targetAudience: ["vendor", "internal"],
    preview: "Financial controls, audit procedures, documentation",
    fields: [
      { id: generateFieldId(183), type: "text", label: "Department/Function", required: true },
      { id: generateFieldId(184), type: "radio", label: "Financial Reporting Controls Documented?", required: true, options: ["Yes", "No", "Partially"] },
      { id: generateFieldId(185), type: "radio", label: "Regular Testing of Controls?", required: true, options: ["Quarterly", "Semi-annually", "Annually", "Not Tested"] },
      { id: generateFieldId(186), type: "textarea", label: "Key Financial Processes", required: true },
      { id: generateFieldId(187), type: "radio", label: "Segregation of Duties Implemented?", required: true, options: ["Yes", "No", "Partially"] },
      { id: generateFieldId(188), type: "textarea", label: "Control Deficiencies Identified", required: false }
    ]
  },

  {
    id: "comp-3",
    name: "ISO 27001 Assessment",
    description: "Information security management system assessment",
    category: "compliance",
    targetAudience: ["vendor", "internal"],
    preview: "Security policies, risk management, incident response",
    fields: [
      { id: generateFieldId(189), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(190), type: "radio", label: "Information Security Policy Established?", required: true, options: ["Yes", "No", "In Development"] },
      { id: generateFieldId(191), type: "radio", label: "Risk Assessment Conducted?", required: true, options: ["Yes", "No", "Planned"] },
      { id: generateFieldId(192), type: "checkbox", label: "Security Controls Implemented", required: true, options: ["Access Control", "Cryptography", "Physical Security", "Operations Security", "Network Security"] },
      { id: generateFieldId(193), type: "radio", label: "Incident Response Plan?", required: true, options: ["Yes", "No", "In Development"] },
      { id: generateFieldId(194), type: "radio", label: "Regular Security Training?", required: true, options: ["Yes", "No", "Planned"] }
    ]
  },

  // IT & TECHNOLOGY TEMPLATES
  {
    id: "it-1",
    name: "Software License Audit",
    description: "Software license compliance and usage assessment",
    category: "it",
    targetAudience: ["vendor", "internal"],
    preview: "License inventory, usage metrics, compliance status",
    fields: [
      { id: generateFieldId(195), type: "text", label: "Software Product", required: true },
      { id: generateFieldId(196), type: "text", label: "Vendor", required: true },
      { id: generateFieldId(197), type: "text", label: "License Type", required: true },
      { id: generateFieldId(198), type: "text", label: "Number of Licenses Purchased", required: true },
      { id: generateFieldId(199), type: "text", label: "Number of Installations", required: true },
      { id: generateFieldId(200), type: "date", label: "License Expiry Date", required: false },
      { id: generateFieldId(201), type: "textarea", label: "Usage Details", required: false }
    ]
  },

  {
    id: "it-2",
    name: "System Access Request",
    description: "Request for system access and permissions",
    category: "it",
    targetAudience: ["internal"],
    preview: "User details, system requirements, access levels",
    fields: [
      { id: generateFieldId(202), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(203), type: "text", label: "Employee ID", required: true },
      { id: generateFieldId(204), type: "text", label: "Department", required: true },
      { id: generateFieldId(205), type: "text", label: "System/Application", required: true },
      { id: generateFieldId(206), type: "select", label: "Access Level", required: true, options: ["Read Only", "Read/Write", "Administrator", "Super User"] },
      { id: generateFieldId(207), type: "textarea", label: "Business Justification", required: true },
      { id: generateFieldId(208), type: "text", label: "Supervisor Approval", required: true }
    ]
  },

  {
    id: "it-3",
    name: "Security Incident Report",
    description: "Report security incidents and breaches",
    category: "security",
    targetAudience: ["internal"],
    preview: "Incident details, impact assessment, response actions",
    fields: [
      { id: generateFieldId(209), type: "text", label: "Incident Reporter", required: true },
      { id: generateFieldId(210), type: "date", label: "Incident Date", required: true },
      { id: generateFieldId(211), type: "text", label: "Incident Time", required: true },
      { id: generateFieldId(212), type: "select", label: "Incident Type", required: true, options: ["Data Breach", "Malware", "Unauthorized Access", "Phishing", "System Compromise", "Other"] },
      { id: generateFieldId(213), type: "textarea", label: "Incident Description", required: true },
      { id: generateFieldId(214), type: "select", label: "Severity", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { id: generateFieldId(215), type: "textarea", label: "Immediate Actions Taken", required: false }
    ]
  },

  // QUALITY & OPERATIONS TEMPLATES
  {
    id: "qual-1",
    name: "Quality Assurance Checklist",
    description: "Quality control and assurance evaluation",
    category: "quality",
    targetAudience: ["internal"],
    preview: "Quality standards, testing procedures, compliance checks",
    fields: [
      { id: generateFieldId(216), type: "text", label: "Product/Service", required: true },
      { id: generateFieldId(217), type: "text", label: "QA Inspector", required: true },
      { id: generateFieldId(218), type: "date", label: "Inspection Date", required: true },
      { id: generateFieldId(219), type: "checkbox", label: "Quality Criteria", required: true, options: ["Specifications Met", "Documentation Complete", "Testing Passed", "Packaging Correct", "Labeling Accurate"] },
      { id: generateFieldId(220), type: "radio", label: "Overall Quality Rating", required: true, options: ["Excellent", "Good", "Acceptable", "Needs Improvement", "Rejected"] },
      { id: generateFieldId(221), type: "textarea", label: "Issues Identified", required: false },
      { id: generateFieldId(222), type: "textarea", label: "Corrective Actions", required: false }
    ]
  },

  {
    id: "qual-2",
    name: "Supplier Quality Assessment",
    description: "Supplier quality and performance evaluation",
    category: "quality",
    targetAudience: ["vendor"],
    preview: "Quality systems, certifications, performance metrics",
    fields: [
      { id: generateFieldId(223), type: "text", label: "Supplier Name", required: true },
      { id: generateFieldId(224), type: "text", label: "Product/Service Category", required: true },
      { id: generateFieldId(225), type: "checkbox", label: "Quality Certifications", required: false, options: ["ISO 9001", "ISO 14001", "Six Sigma", "AS9100", "TS 16949", "None"] },
      { id: generateFieldId(226), type: "radio", label: "Quality Management System", required: true, options: ["Fully Implemented", "Partially Implemented", "In Development", "Not Implemented"] },
      { id: generateFieldId(227), type: "rating", label: "Delivery Performance", required: true },
      { id: generateFieldId(228), type: "rating", label: "Quality Performance", required: true },
      { id: generateFieldId(229), type: "textarea", label: "Quality Improvement Initiatives", required: false }
    ]
  },

  {
    id: "ops-1",
    name: "Process Improvement Suggestion",
    description: "Employee suggestions for process improvements",
    category: "operations",
    targetAudience: ["internal"],
    preview: "Current process, proposed changes, expected benefits",
    fields: [
      { id: generateFieldId(230), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(231), type: "text", label: "Department", required: true },
      { id: generateFieldId(232), type: "text", label: "Process Name", required: true },
      { id: generateFieldId(233), type: "textarea", label: "Current Process Description", required: true },
      { id: generateFieldId(234), type: "textarea", label: "Proposed Improvement", required: true },
      { id: generateFieldId(235), type: "textarea", label: "Expected Benefits", required: true },
      { id: generateFieldId(236), type: "text", label: "Implementation Timeline", required: false }
    ]
  },

  // FINANCE & PROCUREMENT TEMPLATES
  {
    id: "fin-1",
    name: "Purchase Order Request",
    description: "Request for purchase order approval",
    category: "finance",
    targetAudience: ["internal"],
    preview: "Vendor details, items, costs, approvals",
    fields: [
      { id: generateFieldId(237), type: "text", label: "Requestor Name", required: true },
      { id: generateFieldId(238), type: "text", label: "Department", required: true },
      { id: generateFieldId(239), type: "text", label: "Vendor Name", required: true },
      { id: generateFieldId(240), type: "textarea", label: "Items/Services Description", required: true },
      { id: generateFieldId(241), type: "text", label: "Total Amount", required: true },
      { id: generateFieldId(242), type: "date", label: "Required Date", required: true },
      { id: generateFieldId(243), type: "text", label: "Budget Code", required: true },
      { id: generateFieldId(244), type: "textarea", label: "Business Justification", required: true }
    ]
  },

  {
    id: "fin-2",
    name: "Budget Request",
    description: "Annual or project budget request form",
    category: "finance",
    targetAudience: ["internal"],
    preview: "Budget categories, justifications, ROI projections",
    fields: [
      { id: generateFieldId(245), type: "text", label: "Department/Project", required: true },
      { id: generateFieldId(246), type: "text", label: "Budget Owner", required: true },
      { id: generateFieldId(247), type: "select", label: "Budget Type", required: true, options: ["Annual Operating", "Project", "Capital Expenditure", "Emergency"] },
      { id: generateFieldId(248), type: "text", label: "Total Budget Requested", required: true },
      { id: generateFieldId(249), type: "textarea", label: "Budget Breakdown", required: true },
      { id: generateFieldId(250), type: "textarea", label: "Business Justification", required: true },
      { id: generateFieldId(251), type: "textarea", label: "Expected ROI", required: false }
    ]
  },

  {
    id: "proc-1",
    name: "Vendor Prequalification",
    description: "Prequalification assessment for new vendors",
    category: "procurement",
    targetAudience: ["vendor"],
    preview: "Company credentials, capabilities, financial status",
    fields: [
      { id: generateFieldId(252), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(253), type: "text", label: "Registration Number", required: true },
      { id: generateFieldId(254), type: "text", label: "Years in Business", required: true },
      { id: generateFieldId(255), type: "textarea", label: "Core Competencies", required: true },
      { id: generateFieldId(256), type: "text", label: "Annual Revenue", required: true },
      { id: generateFieldId(257), type: "checkbox", label: "Certifications", required: false, options: ["ISO 9001", "ISO 14001", "OHSAS 18001", "Industry Specific", "None"] },
      { id: generateFieldId(258), type: "textarea", label: "Major Clients", required: false },
      { id: generateFieldId(259), type: "textarea", label: "Key Personnel Qualifications", required: true }
    ]
  },

  // MARKETING & SALES TEMPLATES
  {
    id: "mkt-1",
    name: "Marketing Campaign Feedback",
    description: "Feedback collection for marketing campaigns",
    category: "marketing",
    targetAudience: ["external"],
    preview: "Campaign awareness, effectiveness, brand perception",
    fields: [
      { id: generateFieldId(260), type: "text", label: "Name", required: false },
      { id: generateFieldId(261), type: "email", label: "Email", required: false },
      { id: generateFieldId(262), type: "radio", label: "Did You See Our Recent Campaign?", required: true, options: ["Yes", "No", "Not Sure"] },
      { id: generateFieldId(263), type: "checkbox", label: "Where Did You See It?", required: false, options: ["Social Media", "Email", "Website", "Print", "TV/Radio", "Other"] },
      { id: generateFieldId(264), type: "rating", label: "Campaign Effectiveness", required: false },
      { id: generateFieldId(265), type: "textarea", label: "What Message Did You Take Away?", required: false },
      { id: generateFieldId(266), type: "radio", label: "Likelihood to Purchase", required: false, options: ["Very Likely", "Likely", "Neutral", "Unlikely", "Very Unlikely"] }
    ]
  },

  {
    id: "sales-1",
    name: "Lead Qualification",
    description: "Sales lead qualification and scoring",
    category: "sales",
    targetAudience: ["external"],
    preview: "Contact details, needs assessment, buying timeline",
    fields: [
      { id: generateFieldId(267), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(268), type: "text", label: "Contact Person", required: true },
      { id: generateFieldId(269), type: "email", label: "Email Address", required: true },
      { id: generateFieldId(270), type: "text", label: "Phone Number", required: true },
      { id: generateFieldId(271), type: "select", label: "Company Size", required: true, options: ["1-10", "11-50", "51-200", "201-1000", "1000+"] },
      { id: generateFieldId(272), type: "select", label: "Budget Range", required: false, options: ["< $10K", "$10K-$50K", "$50K-$100K", "$100K-$500K", "> $500K"] },
      { id: generateFieldId(273), type: "select", label: "Timeline", required: true, options: ["Immediate", "1-3 months", "3-6 months", "6-12 months", "> 1 year"] },
      { id: generateFieldId(274), type: "textarea", label: "Current Challenges", required: true }
    ]
  },

  // PROJECT MANAGEMENT TEMPLATES
  {
    id: "pm-1",
    name: "Project Initiation Request",
    description: "Request to initiate a new project",
    category: "project",
    targetAudience: ["internal"],
    preview: "Project scope, objectives, resources, timeline",
    fields: [
      { id: generateFieldId(275), type: "text", label: "Project Name", required: true },
      { id: generateFieldId(276), type: "text", label: "Project Sponsor", required: true },
      { id: generateFieldId(277), type: "textarea", label: "Project Description", required: true },
      { id: generateFieldId(278), type: "textarea", label: "Business Objectives", required: true },
      { id: generateFieldId(279), type: "date", label: "Proposed Start Date", required: true },
      { id: generateFieldId(280), type: "date", label: "Target Completion Date", required: true },
      { id: generateFieldId(281), type: "text", label: "Estimated Budget", required: true },
      { id: generateFieldId(282), type: "textarea", label: "Resource Requirements", required: true }
    ]
  },

  {
    id: "pm-2",
    name: "Project Status Report",
    description: "Weekly/monthly project status update",
    category: "project",
    targetAudience: ["internal"],
    preview: "Progress metrics, milestones, risks, issues",
    fields: [
      { id: generateFieldId(283), type: "text", label: "Project Name", required: true },
      { id: generateFieldId(284), type: "text", label: "Project Manager", required: true },
      { id: generateFieldId(285), type: "date", label: "Report Date", required: true },
      { id: generateFieldId(286), type: "select", label: "Overall Status", required: true, options: ["On Track", "At Risk", "Behind Schedule", "Completed"] },
      { id: generateFieldId(287), type: "text", label: "Percent Complete", required: true },
      { id: generateFieldId(288), type: "textarea", label: "Key Accomplishments", required: true },
      { id: generateFieldId(289), type: "textarea", label: "Upcoming Milestones", required: false },
      { id: generateFieldId(290), type: "textarea", label: "Risks and Issues", required: false }
    ]
  },

  // TRAINING & DEVELOPMENT TEMPLATES
  {
    id: "train-1",
    name: "Training Evaluation",
    description: "Post-training feedback and evaluation",
    category: "training",
    targetAudience: ["internal", "external"],
    preview: "Training effectiveness, content quality, instructor performance",
    fields: [
      { id: generateFieldId(291), type: "text", label: "Training Program", required: true },
      { id: generateFieldId(292), type: "date", label: "Training Date", required: true },
      { id: generateFieldId(293), type: "text", label: "Instructor Name", required: true },
      { id: generateFieldId(294), type: "rating", label: "Overall Training Quality", required: true },
      { id: generateFieldId(295), type: "rating", label: "Content Relevance", required: true },
      { id: generateFieldId(296), type: "rating", label: "Instructor Effectiveness", required: true },
      { id: generateFieldId(297), type: "textarea", label: "What Did You Learn?", required: false },
      { id: generateFieldId(298), type: "textarea", label: "How Will You Apply This?", required: false },
      { id: generateFieldId(299), type: "textarea", label: "Suggestions for Improvement", required: false }
    ]
  },

  {
    id: "train-2",
    name: "Skills Assessment",
    description: "Employee skills and competency assessment",
    category: "training",
    targetAudience: ["internal"],
    preview: "Skill levels, training needs, development goals",
    fields: [
      { id: generateFieldId(300), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(301), type: "text", label: "Position", required: true },
      { id: generateFieldId(302), type: "checkbox", label: "Technical Skills", required: true, options: ["Programming", "Data Analysis", "Project Management", "Design", "Testing", "Documentation"] },
      { id: generateFieldId(303), type: "checkbox", label: "Soft Skills", required: true, options: ["Communication", "Leadership", "Problem Solving", "Teamwork", "Time Management", "Customer Service"] },
      { id: generateFieldId(304), type: "textarea", label: "Skill Gaps Identified", required: false },
      { id: generateFieldId(305), type: "textarea", label: "Development Goals", required: false }
    ]
  },

  // LEGAL & CONTRACTS TEMPLATES
  {
    id: "legal-1",
    name: "Contract Review Request",
    description: "Request for legal review of contracts",
    category: "legal",
    targetAudience: ["internal"],
    preview: "Contract details, review requirements, timeline",
    fields: [
      { id: generateFieldId(306), type: "text", label: "Contract Title", required: true },
      { id: generateFieldId(307), type: "text", label: "Counterparty", required: true },
      { id: generateFieldId(308), type: "select", label: "Contract Type", required: true, options: ["Service Agreement", "Purchase Agreement", "NDA", "Employment Contract", "Partnership Agreement", "License Agreement"] },
      { id: generateFieldId(309), type: "text", label: "Contract Value", required: false },
      { id: generateFieldId(310), type: "date", label: "Required Review Date", required: true },
      { id: generateFieldId(311), type: "textarea", label: "Key Terms to Review", required: false },
      { id: generateFieldId(312), type: "textarea", label: "Special Considerations", required: false }
    ]
  },

  {
    id: "legal-2",
    name: "Intellectual Property Disclosure",
    description: "Disclosure of intellectual property and inventions",
    category: "legal",
    targetAudience: ["internal"],
    preview: "Invention details, inventors, commercial potential",
    fields: [
      { id: generateFieldId(313), type: "text", label: "Invention Title", required: true },
      { id: generateFieldId(314), type: "text", label: "Primary Inventor", required: true },
      { id: generateFieldId(315), type: "text", label: "Co-Inventors", required: false },
      { id: generateFieldId(316), type: "textarea", label: "Technical Description", required: true },
      { id: generateFieldId(317), type: "textarea", label: "Commercial Applications", required: true },
      { id: generateFieldId(318), type: "radio", label: "Prior Public Disclosure?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(319), type: "textarea", label: "Related Prior Art", required: false }
    ]
  },

  // AUDIT & RISK TEMPLATES
  {
    id: "audit-1",
    name: "Internal Audit Checklist",
    description: "Internal audit procedures and findings",
    category: "audit",
    targetAudience: ["internal"],
    preview: "Audit scope, procedures, findings, recommendations",
    fields: [
      { id: generateFieldId(320), type: "text", label: "Audit Area", required: true },
      { id: generateFieldId(321), type: "text", label: "Auditor Name", required: true },
      { id: generateFieldId(322), type: "date", label: "Audit Date", required: true },
      { id: generateFieldId(323), type: "textarea", label: "Audit Scope", required: true },
      { id: generateFieldId(324), type: "checkbox", label: "Procedures Performed", required: true, options: ["Document Review", "Interviews", "Observation", "Testing", "Analysis", "Confirmation"] },
      { id: generateFieldId(325), type: "textarea", label: "Key Findings", required: true },
      { id: generateFieldId(326), type: "textarea", label: "Recommendations", required: true },
      { id: generateFieldId(327), type: "select", label: "Overall Rating", required: true, options: ["Satisfactory", "Needs Improvement", "Unsatisfactory"] }
    ]
  },

  {
    id: "risk-1",
    name: "Risk Assessment",
    description: "Operational risk identification and assessment",
    category: "risk",
    targetAudience: ["internal"],
    preview: "Risk identification, impact analysis, mitigation strategies",
    fields: [
      { id: generateFieldId(328), type: "text", label: "Risk Category", required: true },
      { id: generateFieldId(329), type: "textarea", label: "Risk Description", required: true },
      { id: generateFieldId(330), type: "select", label: "Probability", required: true, options: ["Very Low", "Low", "Medium", "High", "Very High"] },
      { id: generateFieldId(331), type: "select", label: "Impact", required: true, options: ["Very Low", "Low", "Medium", "High", "Very High"] },
      { id: generateFieldId(332), type: "textarea", label: "Potential Consequences", required: true },
      { id: generateFieldId(333), type: "textarea", label: "Current Controls", required: false },
      { id: generateFieldId(334), type: "textarea", label: "Mitigation Strategies", required: true },
      { id: generateFieldId(335), type: "text", label: "Risk Owner", required: true }
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
  const categories = ["all", "survey", "assessment", "registration", "feedback", "compliance", "risk", "vendor-risk", "external-assessment", "hr", "customer", "finance", "it", "security", "quality", "operations", "procurement", "marketing", "sales", "project", "training", "legal", "audit", "business"];

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
      case 'audit':
        return 'bg-orange-100 text-orange-800';
      case 'compliance':
      case 'legal':
        return 'bg-blue-100 text-blue-800';
      case 'external-assessment':
      case 'customer':
        return 'bg-green-100 text-green-800';
      case 'hr':
      case 'training':
        return 'bg-purple-100 text-purple-800';
      case 'it':
      case 'security':
        return 'bg-indigo-100 text-indigo-800';
      case 'finance':
      case 'procurement':
        return 'bg-yellow-100 text-yellow-800';
      case 'marketing':
      case 'sales':
        return 'bg-pink-100 text-pink-800';
      case 'project':
      case 'operations':
        return 'bg-teal-100 text-teal-800';
      case 'quality':
        return 'bg-emerald-100 text-emerald-800';
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
               category === "hr" ? "HR" :
               category === "it" ? "IT" :
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
