
import { useState } from "react";
import { FormTemplate } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Shield, AlertTriangle, Building, Users, User, Globe, Landmark, CreditCard, Stethoscope, Zap, Smartphone, Rocket, Store } from "lucide-react";
import { MultiSelectFilter } from "./MultiSelectFilter";

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
    id: "health-1",
    name: "Patient Safety Incident Report",
    description: "Healthcare patient safety and adverse event reporting",
    category: "quality",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Patient details, incident description, contributing factors, corrective actions",
    fields: [
      { id: generateFieldId(435), type: "text", label: "Patient ID", required: true },
      { id: generateFieldId(436), type: "date", label: "Incident Date", required: true },
      { id: generateFieldId(437), type: "text", label: "Reporter Name", required: true },
      { id: generateFieldId(438), type: "select", label: "Incident Type", required: true, options: ["Medication Error", "Fall", "Equipment Malfunction", "Procedure Complication", "Other"] },
      { id: generateFieldId(439), type: "textarea", label: "Incident Description", required: true },
      { id: generateFieldId(440), type: "textarea", label: "Contributing Factors", required: false }
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
    id: "multi-1",
    name: "Cross-Sector Compliance Assessment",
    description: "Multi-industry compliance evaluation for organizations operating across sectors",
    category: "compliance",
    sector: ["government", "fintech", "health"],
    targetAudience: ["internal", "external"],
    preview: "Regulatory requirements, industry standards, compliance gaps, remediation plan",
    fields: [
      { id: generateFieldId(148), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(149), type: "checkbox", label: "Operating Sectors", required: true, options: ["Government", "Financial Services", "Healthcare", "Energy", "Telecommunications", "Other"] },
      { id: generateFieldId(150), type: "checkbox", label: "Applicable Regulations", required: true, options: ["GDPR", "HIPAA", "SOX", "PCI DSS", "SOC 2", "ISO 27001", "NIST"] },
      { id: generateFieldId(151), type: "textarea", label: "Current Compliance Status", required: true },
      { id: generateFieldId(152), type: "textarea", label: "Identified Gaps", required: false },
      { id: generateFieldId(153), type: "textarea", label: "Remediation Plan", required: true }
    ]
  },

  {
    id: "multi-2",
    name: "Universal Data Protection Impact Assessment",
    description: "Comprehensive data protection assessment for any organization handling personal data",
    category: "compliance",
    sector: ["government", "fintech", "health", "insurance"],
    targetAudience: ["internal"],
    preview: "Data processing activities, risk assessment, mitigation measures, compliance verification",
    fields: [
      { id: generateFieldId(154), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(155), type: "checkbox", label: "Types of Personal Data", required: true, options: ["Basic Identity", "Financial", "Health", "Biometric", "Location", "Behavioral"] },
      { id: generateFieldId(156), type: "checkbox", label: "Processing Activities", required: true, options: ["Collection", "Storage", "Analysis", "Sharing", "Transfer", "Deletion"] },
      { id: generateFieldId(157), type: "select", label: "Data Volume", required: true, options: ["Low (<1000 records)", "Medium (1000-10000)", "High (10000-100000)", "Very High (>100000)"] },
      { id: generateFieldId(158), type: "textarea", label: "Risk Assessment", required: true },
      { id: generateFieldId(159), type: "textarea", label: "Mitigation Measures", required: true }
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
    name: "Capital Expenditure Request",
    description: "Request for major capital investment approval",
    category: "finance",
    targetAudience: ["internal"],
    preview: "Asset details, cost-benefit analysis, depreciation schedule, funding source",
    fields: [
      { id: generateFieldId(245), type: "text", label: "Asset/Equipment Name", required: true },
      { id: generateFieldId(246), type: "text", label: "Requesting Department", required: true },
      { id: generateFieldId(247), type: "select", label: "Asset Category", required: true, options: ["IT Equipment", "Manufacturing Equipment", "Vehicles", "Real Estate", "Software Licenses", "Other"] },
      { id: generateFieldId(248), type: "text", label: "Total Investment Amount", required: true },
      { id: generateFieldId(249), type: "number", label: "Useful Life (years)", required: true },
      { id: generateFieldId(250), type: "textarea", label: "Business Case & ROI", required: true },
      { id: generateFieldId(251), type: "select", label: "Funding Source", required: true, options: ["Operating Budget", "Capital Reserve", "Bank Financing", "Lease", "Grant Funding"] },
      { id: generateFieldId(252), type: "date", label: "Required By Date", required: true },
      { id: generateFieldId(253), type: "textarea", label: "Alternative Solutions Considered", required: false }
    ]
  },

  {
    id: "fin-new-1",
    name: "Emergency Fund Request",
    description: "Urgent funding request for unexpected expenses",
    category: "finance",
    targetAudience: ["internal"],
    preview: "Emergency details, impact assessment, immediate actions, temporary funding",
    fields: [
      { id: generateFieldId(254), type: "text", label: "Emergency Situation", required: true },
      { id: generateFieldId(255), type: "select", label: "Urgency Level", required: true, options: ["Critical - Immediate", "High - Within 24hrs", "Medium - Within Week", "Low - Within Month"] },
      { id: generateFieldId(256), type: "text", label: "Amount Requested", required: true },
      { id: generateFieldId(257), type: "textarea", label: "Situation Description", required: true },
      { id: generateFieldId(258), type: "textarea", label: "Business Impact if Not Funded", required: true },
      { id: generateFieldId(259), type: "textarea", label: "Immediate Actions Taken", required: true },
      { id: generateFieldId(260), type: "date", label: "Funds Needed By", required: true },
      { id: generateFieldId(261), type: "text", label: "Alternative Funding Sources", required: false }
    ]
  },

  {
    id: "fin-new-2", 
    name: "Department Budget Variance Request",
    description: "Request to reallocate budget between categories within department",
    category: "finance",
    targetAudience: ["internal"],
    preview: "Budget reallocation, variance explanation, impact analysis, approval workflow",
    fields: [
      { id: generateFieldId(262), type: "text", label: "Department Name", required: true },
      { id: generateFieldId(263), type: "text", label: "Budget Period", required: true },
      { id: generateFieldId(264), type: "text", label: "Source Budget Category", required: true },
      { id: generateFieldId(265), type: "text", label: "Target Budget Category", required: true },
      { id: generateFieldId(266), type: "text", label: "Amount to Transfer", required: true },
      { id: generateFieldId(267), type: "textarea", label: "Reason for Reallocation", required: true },
      { id: generateFieldId(268), type: "textarea", label: "Impact on Original Category", required: true },
      { id: generateFieldId(269), type: "select", label: "Frequency", required: true, options: ["One-time", "Recurring Monthly", "Recurring Quarterly", "Annual Adjustment"] }
    ]
  },

  {
    id: "fin-new-3",
    name: "Travel & Entertainment Budget Request", 
    description: "Request for travel, training, and business entertainment expenses",
    category: "finance",
    targetAudience: ["internal"],
    preview: "Travel details, business purpose, cost breakdown, policy compliance",
    fields: [
      { id: generateFieldId(270), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(271), type: "select", label: "Request Type", required: true, options: ["Business Travel", "Training/Conference", "Client Entertainment", "Team Building", "Recruitment"] },
      { id: generateFieldId(272), type: "text", label: "Destination/Venue", required: true },
      { id: generateFieldId(273), type: "date", label: "Start Date", required: true },
      { id: generateFieldId(274), type: "date", label: "End Date", required: true },
      { id: generateFieldId(275), type: "text", label: "Estimated Total Cost", required: true },
      { id: generateFieldId(276), type: "textarea", label: "Business Purpose & Expected Outcomes", required: true },
      { id: generateFieldId(277), type: "checkbox", label: "Expense Categories", required: true, options: ["Airfare", "Accommodation", "Meals", "Ground Transportation", "Conference Fees", "Other"] }
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
  },

  // GOVERNMENT SECTOR TEMPLATES
  {
    id: "gov-1",
    name: "Public Procurement Vendor Registration",
    description: "Comprehensive vendor registration for government contracts",
    category: "procurement",
    sector: "government",
    targetAudience: ["vendor"],
    preview: "Business credentials, financial statements, security clearances, compliance certifications",
    fields: [
      { id: generateFieldId(336), type: "text", label: "Business Legal Name", required: true },
      { id: generateFieldId(337), type: "text", label: "Tax Identification Number", required: true },
      { id: generateFieldId(338), type: "text", label: "DUNS Number", required: true },
      { id: generateFieldId(339), type: "checkbox", label: "Business Classifications", required: true, options: ["Small Business", "Minority-Owned", "Woman-Owned", "Veteran-Owned", "Disadvantaged Business"] },
      { id: generateFieldId(340), type: "select", label: "Security Clearance Level", required: false, options: ["None", "Confidential", "Secret", "Top Secret", "TS/SCI"] },
      { id: generateFieldId(341), type: "checkbox", label: "Compliance Certifications", required: true, options: ["FIPS 140-2", "FedRAMP", "FISMA", "Section 508", "FAR Compliance"] },
      { id: generateFieldId(342), type: "textarea", label: "Government Contract Experience", required: true },
      { id: generateFieldId(343), type: "text", label: "Bonding Capacity", required: false },
      { id: generateFieldId(344), type: "radio", label: "Debarment Status", required: true, options: ["No Debarment", "Under Investigation", "Previously Debarred"] }
    ]
  },

  {
    id: "gov-2",
    name: "FOIA Request Form",
    description: "Freedom of Information Act request submission",
    category: "legal",
    sector: "government",
    targetAudience: ["external"],
    preview: "Request details, record description, fee category, contact information",
    fields: [
      { id: generateFieldId(345), type: "text", label: "Full Name", required: true },
      { id: generateFieldId(346), type: "email", label: "Email Address", required: true },
      { id: generateFieldId(347), type: "textarea", label: "Mailing Address", required: true },
      { id: generateFieldId(348), type: "select", label: "Requester Category", required: true, options: ["Commercial Use", "Educational Institution", "News Media", "All Other Requesters"] },
      { id: generateFieldId(349), type: "textarea", label: "Records Requested (Specific Description)", required: true },
      { id: generateFieldId(350), type: "date", label: "Date Range Start", required: false },
      { id: generateFieldId(351), type: "date", label: "Date Range End", required: false },
      { id: generateFieldId(352), type: "select", label: "Preferred Format", required: false, options: ["Electronic", "Paper", "CD/DVD", "No Preference"] },
      { id: generateFieldId(353), type: "text", label: "Maximum Fee Willing to Pay", required: false },
      { id: generateFieldId(354), type: "textarea", label: "Fee Waiver Justification", required: false }
    ]
  },

  {
    id: "gov-3",
    name: "Citizen Complaint Form",
    description: "Public complaint and grievance submission",
    category: "customer",
    sector: "government",
    targetAudience: ["external"],
    preview: "Complaint details, department, incident information, resolution request",
    fields: [
      { id: generateFieldId(355), type: "text", label: "Your Name", required: true },
      { id: generateFieldId(356), type: "email", label: "Email Address", required: true },
      { id: generateFieldId(357), type: "text", label: "Phone Number", required: false },
      { id: generateFieldId(358), type: "select", label: "Department/Agency", required: true, options: ["Public Works", "Police Department", "Fire Department", "Health Department", "Planning & Zoning", "Parks & Recreation", "Other"] },
      { id: generateFieldId(359), type: "date", label: "Date of Incident", required: true },
      { id: generateFieldId(360), type: "textarea", label: "Detailed Description of Complaint", required: true },
      { id: generateFieldId(361), type: "text", label: "Location of Incident", required: false },
      { id: generateFieldId(362), type: "select", label: "Priority Level", required: true, options: ["Low", "Medium", "High", "Emergency"] },
      { id: generateFieldId(363), type: "textarea", label: "Desired Resolution", required: false }
    ]
  },

  {
    id: "gov-4",
    name: "Security Clearance Application",
    description: "Government security clearance background investigation form",
    category: "security",
    sector: "government",
    targetAudience: ["internal", "external"],
    preview: "Personal history, employment, education, references, foreign contacts",
    fields: [
      { id: generateFieldId(364), type: "text", label: "Full Legal Name", required: true },
      { id: generateFieldId(365), type: "date", label: "Date of Birth", required: true },
      { id: generateFieldId(366), type: "text", label: "Social Security Number", required: true },
      { id: generateFieldId(367), type: "select", label: "Clearance Level Requested", required: true, options: ["Confidential", "Secret", "Top Secret", "TS/SCI"] },
      { id: generateFieldId(368), type: "textarea", label: "Employment History (Last 10 Years)", required: true },
      { id: generateFieldId(369), type: "textarea", label: "Education History", required: true },
      { id: generateFieldId(370), type: "radio", label: "Foreign Travel in Last 7 Years?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(371), type: "textarea", label: "Foreign Contacts", required: false },
      { id: generateFieldId(372), type: "textarea", label: "Financial Issues or Bankruptcies", required: false },
      { id: generateFieldId(373), type: "textarea", label: "References (3 Required)", required: true }
    ]
  },

  {
    id: "gov-5",
    name: "Administrative Policy Review",
    description: "Government administrative policy review and recommendation",
    category: "assessment",
    sector: "government",
    targetAudience: ["internal"],
    preview: "Policy analysis, stakeholder impact, implementation feasibility, recommendations",
    fields: [
      { id: generateFieldId(374), type: "text", label: "Policy Title", required: true },
      { id: generateFieldId(375), type: "text", label: "Policy Number", required: true },
      { id: generateFieldId(376), type: "date", label: "Review Date", required: true },
      { id: generateFieldId(377), type: "text", label: "Reviewer Name", required: true },
      { id: generateFieldId(378), type: "checkbox", label: "Areas Reviewed", required: true, options: ["Legal Compliance", "Budget Impact", "Operational Feasibility", "Public Interest", "Stakeholder Impact"] },
      { id: generateFieldId(379), type: "textarea", label: "Current Policy Summary", required: true },
      { id: generateFieldId(380), type: "textarea", label: "Identified Issues", required: false },
      { id: generateFieldId(381), type: "textarea", label: "Recommendations", required: true },
      { id: generateFieldId(382), type: "select", label: "Priority Level", required: true, options: ["Low", "Medium", "High", "Critical"] }
    ]
  },

  {
    id: "gov-6", 
    name: "Budget Allocation Request",
    description: "Government department budget allocation and justification",
    category: "finance",
    sector: "government", 
    targetAudience: ["internal"],
    preview: "Budget category, amount requested, justification, expected outcomes",
    fields: [
      { id: generateFieldId(383), type: "text", label: "Department Name", required: true },
      { id: generateFieldId(384), type: "text", label: "Budget Category", required: true },
      { id: generateFieldId(385), type: "text", label: "Amount Requested", required: true },
      { id: generateFieldId(386), type: "select", label: "Fiscal Year", required: true, options: ["2024", "2025", "2026", "Multi-Year"] },
      { id: generateFieldId(387), type: "textarea", label: "Justification", required: true },
      { id: generateFieldId(388), type: "textarea", label: "Expected Outcomes", required: true },
      { id: generateFieldId(389), type: "radio", label: "Emergency Request?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(390), type: "textarea", label: "Alternative Solutions Considered", required: false }
    ]
  },

  // INSURANCE SECTOR TEMPLATES
  {
    id: "ins-1",
    name: "Insurance Claim Report",
    description: "Comprehensive insurance claim submission form",
    category: "customer",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Policy details, incident description, damages, witness information",
    fields: [
      { id: generateFieldId(374), type: "text", label: "Policy Number", required: true },
      { id: generateFieldId(375), type: "text", label: "Policyholder Name", required: true },
      { id: generateFieldId(376), type: "select", label: "Claim Type", required: true, options: ["Auto", "Property", "Life", "Health", "Disability", "Liability"] },
      { id: generateFieldId(377), type: "date", label: "Date of Loss", required: true },
      { id: generateFieldId(378), type: "text", label: "Time of Loss", required: true },
      { id: generateFieldId(379), type: "textarea", label: "Location of Loss", required: true },
      { id: generateFieldId(380), type: "textarea", label: "Description of Loss/Incident", required: true },
      { id: generateFieldId(381), type: "text", label: "Estimated Damage Amount", required: false },
      { id: generateFieldId(382), type: "radio", label: "Police Report Filed?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(383), type: "textarea", label: "Witness Information", required: false },
      { id: generateFieldId(384), type: "radio", label: "Injuries Involved?", required: true, options: ["Yes", "No"] }
    ]
  },

  {
    id: "ins-2",
    name: "Underwriting Risk Assessment",
    description: "Risk evaluation for insurance underwriting",
    category: "risk",
    sector: "insurance",
    targetAudience: ["internal"],
    preview: "Risk factors, exposure analysis, premium calculation, coverage recommendations",
    fields: [
      { id: generateFieldId(385), type: "text", label: "Applicant Name", required: true },
      { id: generateFieldId(386), type: "select", label: "Insurance Type", required: true, options: ["Life", "Auto", "Property", "Business", "Health", "Disability"] },
      { id: generateFieldId(387), type: "text", label: "Coverage Amount Requested", required: true },
      { id: generateFieldId(388), type: "checkbox", label: "Risk Factors", required: true, options: ["High-Risk Occupation", "Medical History", "Previous Claims", "Credit Issues", "Geographic Risk"] },
      { id: generateFieldId(389), type: "rating", label: "Overall Risk Rating", required: true },
      { id: generateFieldId(390), type: "textarea", label: "Risk Mitigation Factors", required: false },
      { id: generateFieldId(391), type: "text", label: "Recommended Premium", required: true },
      { id: generateFieldId(392), type: "select", label: "Underwriting Decision", required: true, options: ["Approve Standard", "Approve Substandard", "Decline", "Request Additional Information"] },
      { id: generateFieldId(393), type: "textarea", label: "Underwriter Comments", required: false }
    ]
  },

  {
    id: "ins-3",
    name: "Agent Performance Review",
    description: "Insurance agent performance evaluation and goal setting",
    category: "hr",
    sector: "insurance",
    targetAudience: ["internal"],
    preview: "Sales metrics, customer satisfaction, compliance, professional development",
    fields: [
      { id: generateFieldId(394), type: "text", label: "Agent Name", required: true },
      { id: generateFieldId(395), type: "text", label: "Agent ID", required: true },
      { id: generateFieldId(396), type: "date", label: "Review Period Start", required: true },
      { id: generateFieldId(397), type: "date", label: "Review Period End", required: true },
      { id: generateFieldId(398), type: "text", label: "Policies Sold", required: true },
      { id: generateFieldId(399), type: "text", label: "Total Premium Written", required: true },
      { id: generateFieldId(400), type: "rating", label: "Customer Satisfaction Score", required: true },
      { id: generateFieldId(401), type: "checkbox", label: "Compliance Training Completed", required: true, options: ["Ethics", "Product Knowledge", "Regulatory Updates", "Sales Practices"] },
      { id: generateFieldId(402), type: "textarea", label: "Goals for Next Period", required: true },
      { id: generateFieldId(403), type: "rating", label: "Overall Performance Rating", required: true }
    ]
  },

  // FINTECH SECTOR TEMPLATES
  {
    id: "fin-1",
    name: "KYC/AML Customer Onboarding",
    description: "Know Your Customer and Anti-Money Laundering compliance form",
    category: "compliance",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Identity verification, source of funds, PEP screening, risk assessment",
    fields: [
      { id: generateFieldId(404), type: "text", label: "Full Legal Name", required: true },
      { id: generateFieldId(405), type: "date", label: "Date of Birth", required: true },
      { id: generateFieldId(406), type: "text", label: "National ID/Passport Number", required: true },
      { id: generateFieldId(407), type: "textarea", label: "Residential Address", required: true },
      { id: generateFieldId(408), type: "select", label: "Source of Funds", required: true, options: ["Employment Income", "Business Income", "Investment Returns", "Inheritance", "Gift", "Other"] },
      { id: generateFieldId(409), type: "text", label: "Employer/Business Name", required: true },
      { id: generateFieldId(410), type: "text", label: "Annual Income", required: true },
      { id: generateFieldId(411), type: "radio", label: "Politically Exposed Person (PEP)?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(412), type: "radio", label: "Sanctions List Check Clear?", required: true, options: ["Yes", "No", "Under Review"] },
      { id: generateFieldId(413), type: "select", label: "Risk Rating", required: true, options: ["Low", "Medium", "High"] },
      { id: generateFieldId(414), type: "textarea", label: "Additional Risk Factors", required: false }
    ]
  },

  {
    id: "fin-2",
    name: "Credit Risk Assessment",
    description: "Credit risk evaluation for lending decisions",
    category: "risk",
    sector: "fintech",
    targetAudience: ["internal"],
    preview: "Credit history, income verification, debt-to-income ratio, collateral assessment",
    fields: [
      { id: generateFieldId(415), type: "text", label: "Applicant Name", required: true },
      { id: generateFieldId(416), type: "text", label: "Credit Score", required: true },
      { id: generateFieldId(417), type: "text", label: "Monthly Income", required: true },
      { id: generateFieldId(418), type: "text", label: "Monthly Debt Payments", required: true },
      { id: generateFieldId(419), type: "text", label: "Debt-to-Income Ratio", required: true },
      { id: generateFieldId(420), type: "text", label: "Loan Amount Requested", required: true },
      { id: generateFieldId(421), type: "select", label: "Loan Purpose", required: true, options: ["Personal", "Business", "Auto", "Mortgage", "Education", "Debt Consolidation"] },
      { id: generateFieldId(422), type: "textarea", label: "Collateral Description", required: false },
      { id: generateFieldId(423), type: "checkbox", label: "Negative Credit Events", required: false, options: ["Bankruptcy", "Foreclosure", "Late Payments", "Collections", "Charge-offs"] },
      { id: generateFieldId(424), type: "select", label: "Credit Decision", required: true, options: ["Approve", "Decline", "Counter Offer", "Request Additional Information"] }
    ]
  },

  {
    id: "fin-3",
    name: "Fraud Investigation Report",
    description: "Financial fraud incident investigation and reporting",
    category: "security",
    sector: "fintech",
    targetAudience: ["internal"],
    preview: "Incident details, transaction analysis, evidence collection, recommendations",
    fields: [
      { id: generateFieldId(425), type: "text", label: "Case Number", required: true },
      { id: generateFieldId(426), type: "text", label: "Investigating Officer", required: true },
      { id: generateFieldId(427), type: "date", label: "Incident Date", required: true },
      { id: generateFieldId(428), type: "select", label: "Fraud Type", required: true, options: ["Identity Theft", "Credit Card Fraud", "Wire Fraud", "Account Takeover", "Synthetic Identity", "Other"] },
      { id: generateFieldId(429), type: "text", label: "Financial Loss Amount", required: true },
      { id: generateFieldId(430), type: "textarea", label: "Incident Description", required: true },
      { id: generateFieldId(431), type: "textarea", label: "Transaction Details", required: true },
      { id: generateFieldId(432), type: "textarea", label: "Evidence Collected", required: true },
      { id: generateFieldId(433), type: "radio", label: "Law Enforcement Notified?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(434), type: "textarea", label: "Recommendations", required: true }
    ]
  },

  // HEALTH SECTOR TEMPLATES
  {
    id: "health-1",
    name: "Patient Safety Incident Report",
    description: "Healthcare patient safety and adverse event reporting",
    category: "quality",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Patient details, incident description, contributing factors, corrective actions",
    fields: [
      { id: generateFieldId(435), type: "text", label: "Patient ID", required: true },
      { id: generateFieldId(436), type: "date", label: "Incident Date", required: true },
      { id: generateFieldId(437), type: "text", label: "Reporter Name", required: true },
      { id: generateFieldId(438), type: "select", label: "Incident Type", required: true, options: ["Medication Error", "Fall", "Infection", "Surgical Complication", "Equipment Failure", "Documentation Error"] },
      { id: generateFieldId(439), type: "select", label: "Severity Level", required: true, options: ["No Harm", "Mild Harm", "Moderate Harm", "Severe Harm", "Death"] },
      { id: generateFieldId(440), type: "textarea", label: "Incident Description", required: true },
      { id: generateFieldId(441), type: "textarea", label: "Contributing Factors", required: false },
      { id: generateFieldId(442), type: "textarea", label: "Immediate Actions Taken", required: true },
      { id: generateFieldId(443), type: "textarea", label: "Corrective Actions Required", required: false },
      { id: generateFieldId(444), type: "radio", label: "Family Notified?", required: true, options: ["Yes", "No", "N/A"] }
    ]
  },

  {
    id: "health-2",
    name: "HIPAA Privacy Breach Report",
    description: "Healthcare data breach incident reporting under HIPAA",
    category: "compliance",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Breach details, affected records, notification requirements, remediation",
    fields: [
      { id: generateFieldId(445), type: "text", label: "Incident ID", required: true },
      { id: generateFieldId(446), type: "date", label: "Discovery Date", required: true },
      { id: generateFieldId(447), type: "date", label: "Estimated Breach Date", required: true },
      { id: generateFieldId(448), type: "select", label: "Breach Type", required: true, options: ["Unauthorized Access", "Data Theft", "Lost Device", "Email Error", "Hacking", "Improper Disposal"] },
      { id: generateFieldId(449), type: "text", label: "Number of Patients Affected", required: true },
      { id: generateFieldId(450), type: "checkbox", label: "Types of PHI Involved", required: true, options: ["Names", "Addresses", "SSN", "Medical Records", "Insurance Info", "Financial Data"] },
      { id: generateFieldId(451), type: "textarea", label: "Breach Description", required: true },
      { id: generateFieldId(452), type: "radio", label: "Risk Assessment Completed?", required: true, options: ["Yes", "No", "In Progress"] },
      { id: generateFieldId(453), type: "radio", label: "Requires HHS Notification?", required: true, options: ["Yes", "No", "Under Review"] },
      { id: generateFieldId(454), type: "textarea", label: "Mitigation Actions", required: true }
    ]
  },

  {
    id: "health-3",
    name: "Healthcare Quality Assurance Audit",
    description: "Comprehensive quality assurance evaluation for healthcare facilities",
    category: "audit",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Quality metrics, compliance standards, patient outcomes, staff competency",
    fields: [
      { id: generateFieldId(455), type: "text", label: "Facility Name", required: true },
      { id: generateFieldId(456), type: "date", label: "Audit Date", required: true },
      { id: generateFieldId(457), type: "text", label: "Auditor Name", required: true },
      { id: generateFieldId(458), type: "checkbox", label: "Areas Audited", required: true, options: ["Patient Care", "Medication Management", "Infection Control", "Documentation", "Staff Training", "Equipment Maintenance"] },
      { id: generateFieldId(459), type: "radio", label: "Overall Compliance Score", required: true, options: ["Excellent (90-100%)", "Good (80-89%)", "Satisfactory (70-79%)", "Needs Improvement (<70%)"] },
      { id: generateFieldId(460), type: "textarea", label: "Key Findings", required: true },
      { id: generateFieldId(461), type: "textarea", label: "Recommendations", required: true },
      { id: generateFieldId(462), type: "date", label: "Follow-up Date", required: false }
    ]
  },

  // ENERGY SECTOR TEMPLATES
  {
    id: "energy-1",
    name: "Environmental Impact Assessment",
    description: "Environmental impact evaluation for energy projects",
    category: "compliance",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Project scope, environmental factors, mitigation measures, regulatory compliance",
    fields: [
      { id: generateFieldId(465), type: "text", label: "Project Name", required: true },
      { id: generateFieldId(466), type: "text", label: "Project Location", required: true },
      { id: generateFieldId(467), type: "select", label: "Project Type", required: true, options: ["Solar", "Wind", "Nuclear", "Hydroelectric", "Natural Gas", "Coal", "Transmission Line"] },
      { id: generateFieldId(468), type: "text", label: "Project Capacity (MW)", required: true },
      { id: generateFieldId(469), type: "checkbox", label: "Environmental Factors", required: true, options: ["Air Quality", "Water Resources", "Wildlife", "Noise", "Visual Impact", "Cultural Sites"] },
      { id: generateFieldId(470), type: "textarea", label: "Environmental Impact Description", required: true },
      { id: generateFieldId(471), type: "textarea", label: "Mitigation Measures", required: true },
      { id: generateFieldId(472), type: "radio", label: "EIS Required?", required: true, options: ["Yes", "No", "Under Determination"] },
      { id: generateFieldId(473), type: "textarea", label: "Regulatory Permits Required", required: false },
      { id: generateFieldId(474), type: "date", label: "Expected Construction Start", required: false }
    ]
  },

  {
    id: "energy-2",
    name: "Grid Connection Request",
    description: "Utility grid interconnection application",
    category: "operations",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Generation details, technical specifications, interconnection requirements",
    fields: [
      { id: generateFieldId(475), type: "text", label: "Facility Name", required: true },
      { id: generateFieldId(476), type: "text", label: "Applicant Company", required: true },
      { id: generateFieldId(477), type: "text", label: "Maximum Output (MW)", required: true },
      { id: generateFieldId(478), type: "select", label: "Generation Type", required: true, options: ["Solar PV", "Wind", "Natural Gas", "Energy Storage", "Hydroelectric", "Biomass"] },
      { id: generateFieldId(479), type: "text", label: "Connection Voltage Level", required: true },
      { id: generateFieldId(480), type: "textarea", label: "Proposed Connection Point", required: true },
      { id: generateFieldId(481), type: "date", label: "Requested In-Service Date", required: true },
      { id: generateFieldId(482), type: "checkbox", label: "Study Requirements", required: true, options: ["Feasibility Study", "System Impact Study", "Facilities Study"] },
      { id: generateFieldId(483), type: "text", label: "Estimated Construction Cost", required: false },
      { id: generateFieldId(484), type: "textarea", label: "Special Requirements", required: false }
    ]
  },

  {
    id: "energy-3",
    name: "Safety Incident Report",
    description: "Energy facility safety incident reporting",
    category: "safety",
    sector: "energy",
    targetAudience: ["internal"],
    preview: "Incident details, injuries, environmental impact, corrective actions",
    fields: [
      { id: generateFieldId(485), type: "text", label: "Facility Name", required: true },
      { id: generateFieldId(486), type: "date", label: "Incident Date", required: true },
      { id: generateFieldId(487), type: "text", label: "Incident Time", required: true },
      { id: generateFieldId(488), type: "select", label: "Incident Type", required: true, options: ["Personal Injury", "Equipment Failure", "Environmental Release", "Fire/Explosion", "Electrical Incident", "Near Miss"] },
      { id: generateFieldId(489), type: "select", label: "Severity Level", required: true, options: ["Minor", "Moderate", "Major", "Critical"] },
      { id: generateFieldId(490), type: "textarea", label: "Incident Description", required: true },
      { id: generateFieldId(491), type: "text", label: "Injuries/Fatalities", required: false },
      { id: generateFieldId(492), type: "textarea", label: "Environmental Impact", required: false },
      { id: generateFieldId(493), type: "textarea", label: "Immediate Actions", required: true },
      { id: generateFieldId(494), type: "radio", label: "Regulatory Notification Required?", required: true, options: ["Yes", "No"] }
    ]
  },

  // TELCO SECTOR TEMPLATES
  {
    id: "telco-1",
    name: "Network Outage Report",
    description: "Telecommunications network outage incident reporting",
    category: "operations",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Outage details, affected services, customer impact, restoration timeline",
    fields: [
      { id: generateFieldId(495), type: "text", label: "Outage ID", required: true },
      { id: generateFieldId(496), type: "date", label: "Outage Start Date", required: true },
      { id: generateFieldId(497), type: "text", label: "Outage Start Time", required: true },
      { id: generateFieldId(498), type: "select", label: "Affected Network", required: true, options: ["Mobile", "Fixed Line", "Internet", "Data Center", "Fiber Backbone", "Satellite"] },
      { id: generateFieldId(499), type: "text", label: "Affected Customers", required: true },
      { id: generateFieldId(500), type: "checkbox", label: "Services Affected", required: true, options: ["Voice", "Data", "SMS", "Emergency Services", "Roaming", "VoLTE"] },
      { id: generateFieldId(501), type: "textarea", label: "Root Cause", required: true },
      { id: generateFieldId(502), type: "text", label: "Geographic Coverage", required: true },
      { id: generateFieldId(503), type: "text", label: "Estimated Restoration Time", required: false },
      { id: generateFieldId(504), type: "radio", label: "FCC Notification Required?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(505), type: "textarea", label: "Customer Communication", required: true }
    ]
  },

  {
    id: "telco-2",
    name: "5G Site Deployment Plan",
    description: "5G cell site deployment planning and approval",
    category: "project",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Site specifications, coverage area, equipment requirements, deployment timeline",
    fields: [
      { id: generateFieldId(506), type: "text", label: "Site ID", required: true },
      { id: generateFieldId(507), type: "textarea", label: "Site Address", required: true },
      { id: generateFieldId(508), type: "select", label: "Site Type", required: true, options: ["Macro", "Small Cell", "Indoor DAS", "Microcell", "Femtocell"] },
      { id: generateFieldId(509), type: "text", label: "Coverage Radius (km)", required: true },
      { id: generateFieldId(510), type: "checkbox", label: "Technology Support", required: true, options: ["5G NR", "LTE", "3G", "2G", "Wi-Fi 6"] },
      { id: generateFieldId(511), type: "text", label: "Antenna Height (m)", required: true },
      { id: generateFieldId(512), type: "checkbox", label: "Equipment Required", required: true, options: ["Base Station", "Antenna", "Power System", "Cooling", "Backup Generator"] },
      { id: generateFieldId(513), type: "date", label: "Planned Deployment Date", required: true },
      { id: generateFieldId(514), type: "text", label: "Estimated Cost", required: true },
      { id: generateFieldId(515), type: "textarea", label: "Regulatory Approvals Needed", required: false }
    ]
  },

  {
    id: "telco-3",
    name: "Customer Service Quality Assessment",
    description: "Telecommunications customer service performance evaluation",
    category: "quality",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Service metrics, customer satisfaction, issue resolution, improvement areas",
    fields: [
      { id: generateFieldId(516), type: "text", label: "Agent Name", required: true },
      { id: generateFieldId(517), type: "date", label: "Evaluation Date", required: true },
      { id: generateFieldId(518), type: "text", label: "Customer Account Number", required: true },
      { id: generateFieldId(519), type: "select", label: "Call Type", required: true, options: ["Billing Inquiry", "Technical Support", "Service Request", "Complaint", "New Service", "Cancellation"] },
      { id: generateFieldId(520), type: "rating", label: "Call Handling Quality", required: true },
      { id: generateFieldId(521), type: "rating", label: "Technical Knowledge", required: true },
      { id: generateFieldId(522), type: "rating", label: "Customer Courtesy", required: true },
      { id: generateFieldId(523), type: "text", label: "Call Duration (minutes)", required: true },
      { id: generateFieldId(524), type: "radio", label: "Issue Resolved?", required: true, options: ["Yes", "No", "Escalated"] },
      { id: generateFieldId(525), type: "textarea", label: "Improvement Recommendations", required: false }
    ]
  },

  // STARTUPS SECTOR TEMPLATES
  {
    id: "startup-1",
    name: "Investor Pitch Deck Submission",
    description: "Startup pitch deck and investment proposal",
    category: "business",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Company overview, market analysis, financial projections, funding requirements",
    fields: [
      { id: generateFieldId(526), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(527), type: "text", label: "Founder/CEO Name", required: true },
      { id: generateFieldId(528), type: "email", label: "Contact Email", required: true },
      { id: generateFieldId(529), type: "select", label: "Industry", required: true, options: ["Technology", "Healthcare", "Fintech", "E-commerce", "SaaS", "Biotech", "Clean Energy", "Other"] },
      { id: generateFieldId(530), type: "select", label: "Funding Stage", required: true, options: ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Bridge Round"] },
      { id: generateFieldId(531), type: "text", label: "Funding Amount Requested", required: true },
      { id: generateFieldId(532), type: "textarea", label: "Problem Statement", required: true },
      { id: generateFieldId(533), type: "textarea", label: "Solution Description", required: true },
      { id: generateFieldId(534), type: "text", label: "Current Monthly Revenue", required: false },
      { id: generateFieldId(535), type: "text", label: "Team Size", required: true },
      { id: generateFieldId(536), type: "textarea", label: "Competitive Advantage", required: true }
    ]
  },

  {
    id: "startup-2",
    name: "Employee Equity Grant",
    description: "Startup employee equity and stock option grant",
    category: "hr",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Employee details, equity type, vesting schedule, grant terms",
    fields: [
      { id: generateFieldId(537), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(538), type: "text", label: "Employee ID", required: true },
      { id: generateFieldId(539), type: "text", label: "Position/Title", required: true },
      { id: generateFieldId(540), type: "date", label: "Grant Date", required: true },
      { id: generateFieldId(541), type: "select", label: "Equity Type", required: true, options: ["Stock Options", "Restricted Stock", "RSUs", "ESPP", "Phantom Equity"] },
      { id: generateFieldId(542), type: "text", label: "Number of Shares", required: true },
      { id: generateFieldId(543), type: "text", label: "Strike Price", required: false },
      { id: generateFieldId(544), type: "select", label: "Vesting Schedule", required: true, options: ["4 years, 1 year cliff", "3 years, 6 month cliff", "Immediate", "Custom"] },
      { id: generateFieldId(545), type: "date", label: "Vesting Start Date", required: true },
      { id: generateFieldId(546), type: "textarea", label: "Special Terms", required: false }
    ]
  },

  {
    id: "startup-3",
    name: "Product Market Fit Survey",
    description: "Customer feedback survey for product-market fit assessment",
    category: "survey",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Product usage, satisfaction, improvement suggestions, recommendation likelihood",
    fields: [
      { id: generateFieldId(547), type: "text", label: "Company/Organization", required: false },
      { id: generateFieldId(548), type: "select", label: "User Role", required: true, options: ["End User", "Decision Maker", "Influencer", "Administrator", "Other"] },
      { id: generateFieldId(549), type: "select", label: "Usage Frequency", required: true, options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"] },
      { id: generateFieldId(550), type: "radio", label: "How would you feel if you could no longer use our product?", required: true, options: ["Very disappointed", "Somewhat disappointed", "Not disappointed", "N/A - I don't use it"] },
      { id: generateFieldId(551), type: "textarea", label: "What is the main benefit you receive from our product?", required: true },
      { id: generateFieldId(552), type: "select", label: "What type of person do you think would benefit most from our product?", required: true, options: ["Small Business Owner", "Enterprise Manager", "Individual Professional", "Student", "Other"] },
      { id: generateFieldId(553), type: "textarea", label: "How can we improve our product?", required: false },
      { id: generateFieldId(554), type: "radio", label: "Would you recommend our product to others?", required: true, options: ["Definitely", "Probably", "Not Sure", "Probably Not", "Definitely Not"] }
    ]
  },

  // SME SECTOR TEMPLATES
  {
    id: "sme-1",
    name: "Small Business Loan Application",
    description: "Comprehensive small business loan application form",
    category: "finance",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Business details, financial information, loan purpose, collateral",
    fields: [
      { id: generateFieldId(555), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(556), type: "text", label: "Tax ID/EIN", required: true },
      { id: generateFieldId(557), type: "select", label: "Business Type", required: true, options: ["Sole Proprietorship", "LLC", "Corporation", "Partnership", "S-Corp"] },
      { id: generateFieldId(558), type: "date", label: "Business Start Date", required: true },
      { id: generateFieldId(559), type: "text", label: "Annual Revenue", required: true },
      { id: generateFieldId(560), type: "text", label: "Number of Employees", required: true },
      { id: generateFieldId(561), type: "text", label: "Loan Amount Requested", required: true },
      { id: generateFieldId(562), type: "select", label: "Loan Purpose", required: true, options: ["Working Capital", "Equipment Purchase", "Real Estate", "Expansion", "Debt Consolidation", "Inventory"] },
      { id: generateFieldId(563), type: "textarea", label: "Business Description", required: true },
      { id: generateFieldId(564), type: "text", label: "Personal Credit Score", required: true },
      { id: generateFieldId(565), type: "textarea", label: "Collateral Available", required: false }
    ]
  },

  {
    id: "sme-2",
    name: "Business Process Audit",
    description: "Small business operations and process efficiency audit",
    category: "audit",
    sector: "sme",
    targetAudience: ["internal", "external"],
    preview: "Process evaluation, efficiency metrics, improvement recommendations",
    fields: [
      { id: generateFieldId(566), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(567), type: "text", label: "Process/Department", required: true },
      { id: generateFieldId(568), type: "date", label: "Audit Date", required: true },
      { id: generateFieldId(569), type: "text", label: "Auditor Name", required: true },
      { id: generateFieldId(570), type: "checkbox", label: "Areas Reviewed", required: true, options: ["Sales Process", "Customer Service", "Inventory Management", "Financial Controls", "HR Processes", "Technology Systems"] },
      { id: generateFieldId(571), type: "rating", label: "Process Efficiency", required: true },
      { id: generateFieldId(572), type: "rating", label: "Documentation Quality", required: true },
      { id: generateFieldId(573), type: "rating", label: "Staff Training Level", required: true },
      { id: generateFieldId(574), type: "textarea", label: "Key Findings", required: true },
      { id: generateFieldId(575), type: "textarea", label: "Improvement Recommendations", required: true },
      { id: generateFieldId(576), type: "select", label: "Priority Level", required: true, options: ["High", "Medium", "Low"] }
    ]
  },

  {
    id: "sme-3",
    name: "Digital Transformation Assessment",
    description: "Small business digital readiness and technology assessment",
    category: "assessment",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Current technology, digital capabilities, transformation needs, roadmap",
    fields: [
      { id: generateFieldId(577), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(578), type: "select", label: "Industry", required: true, options: ["Retail", "Manufacturing", "Professional Services", "Healthcare", "Construction", "Hospitality", "Other"] },
      { id: generateFieldId(579), type: "text", label: "Number of Employees", required: true },
      { id: generateFieldId(580), type: "checkbox", label: "Current Technology", required: true, options: ["CRM System", "ERP/Accounting Software", "E-commerce Platform", "Cloud Storage", "Mobile Apps", "Social Media"] },
      { id: generateFieldId(581), type: "radio", label: "Website Functionality", required: true, options: ["No Website", "Basic Information Only", "E-commerce Enabled", "Fully Integrated"] },
      { id: generateFieldId(582), type: "select", label: "Digital Marketing Maturity", required: true, options: ["None", "Basic", "Intermediate", "Advanced"] },
      { id: generateFieldId(583), type: "rating", label: "Staff Digital Skills", required: true },
      { id: generateFieldId(584), type: "text", label: "IT Budget ($)", required: false },
      { id: generateFieldId(585), type: "checkbox", label: "Transformation Goals", required: true, options: ["Improve Efficiency", "Reduce Costs", "Better Customer Experience", "Data Analytics", "Remote Work Capability"] },
      { id: generateFieldId(586), type: "textarea", label: "Biggest Digital Challenges", required: true }
    ]
  },

  // ADDITIONAL TELECOM TEMPLATES
  {
    id: "telecom-4",
    name: "Spectrum License Application",
    description: "Radio frequency spectrum licensing application",
    category: "compliance",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Frequency requirements, coverage area, technical specifications, interference analysis",
    fields: [
      { id: generateFieldId(587), type: "text", label: "License Type", required: true },
      { id: generateFieldId(588), type: "text", label: "Frequency Band (MHz)", required: true },
      { id: generateFieldId(589), type: "text", label: "Bandwidth Required", required: true },
      { id: generateFieldId(590), type: "textarea", label: "Coverage Area", required: true },
      { id: generateFieldId(591), type: "select", label: "Service Type", required: true, options: ["Mobile", "Fixed", "Satellite", "Broadcasting", "Point-to-Point"] },
      { id: generateFieldId(592), type: "textarea", label: "Technical Specifications", required: true },
      { id: generateFieldId(593), type: "radio", label: "Interference Analysis Completed?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(594), type: "text", label: "Transmitter Power (Watts)", required: true },
      { id: generateFieldId(595), type: "date", label: "Requested Start Date", required: true }
    ]
  },

  {
    id: "telecom-5",
    name: "Telecom Infrastructure Audit",
    description: "Comprehensive telecommunications infrastructure assessment",
    category: "audit",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Network capacity, equipment condition, performance metrics, upgrade recommendations",
    fields: [
      { id: generateFieldId(596), type: "text", label: "Site/Location", required: true },
      { id: generateFieldId(597), type: "date", label: "Audit Date", required: true },
      { id: generateFieldId(598), type: "checkbox", label: "Infrastructure Components", required: true, options: ["Base Stations", "Transmission Equipment", "Power Systems", "Cooling Systems", "Security Systems"] },
      { id: generateFieldId(599), type: "rating", label: "Overall Equipment Condition", required: true },
      { id: generateFieldId(600), type: "text", label: "Network Capacity Utilization (%)", required: true },
      { id: generateFieldId(601), type: "textarea", label: "Performance Issues Identified", required: false },
      { id: generateFieldId(602), type: "textarea", label: "Upgrade Recommendations", required: true },
      { id: generateFieldId(603), type: "text", label: "Estimated Upgrade Cost", required: false }
    ]
  },

  {
    id: "telecom-6",
    name: "Telecom Vendor Assessment",
    description: "Telecommunications vendor qualification and performance evaluation",
    category: "vendor-risk",
    sector: "telecom",
    targetAudience: ["vendor"],
    preview: "Technical capabilities, financial stability, service quality, compliance status",
    fields: [
      { id: generateFieldId(604), type: "text", label: "Vendor Company Name", required: true },
      { id: generateFieldId(605), type: "checkbox", label: "Service Categories", required: true, options: ["Network Equipment", "Software Solutions", "Installation Services", "Maintenance", "Consulting"] },
      { id: generateFieldId(606), type: "checkbox", label: "Technology Standards", required: true, options: ["5G", "LTE", "Wi-Fi 6", "Fiber Optic", "Satellite", "IoT"] },
      { id: generateFieldId(607), type: "rating", label: "Technical Expertise", required: true },
      { id: generateFieldId(608), type: "text", label: "Years in Telecom Industry", required: true },
      { id: generateFieldId(609), type: "textarea", label: "Key Reference Projects", required: true },
      { id: generateFieldId(610), type: "radio", label: "24/7 Support Available?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(611), type: "select", label: "Financial Rating", required: true, options: ["Excellent", "Good", "Fair", "Poor"] }
    ]
  },

  // ADDITIONAL GOVERNMENT TEMPLATES
  {
    id: "gov-5",
    name: "Grant Application Form",
    description: "Federal/state grant funding application",
    category: "finance",
    sector: "government",
    targetAudience: ["external"],
    preview: "Project description, budget, timeline, impact assessment",
    fields: [
      { id: generateFieldId(612), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(613), type: "text", label: "Tax-Exempt Status", required: true },
      { id: generateFieldId(614), type: "text", label: "Project Title", required: true },
      { id: generateFieldId(615), type: "textarea", label: "Project Description", required: true },
      { id: generateFieldId(616), type: "text", label: "Total Grant Amount Requested", required: true },
      { id: generateFieldId(617), type: "textarea", label: "Budget Breakdown", required: true },
      { id: generateFieldId(618), type: "date", label: "Project Start Date", required: true },
      { id: generateFieldId(619), type: "date", label: "Project End Date", required: true },
      { id: generateFieldId(620), type: "textarea", label: "Expected Outcomes", required: true },
      { id: generateFieldId(621), type: "textarea", label: "Community Impact", required: true }
    ]
  },

  {
    id: "gov-6",
    name: "Public Records Request",
    description: "Government transparency and public information request",
    category: "legal",
    sector: "government",
    targetAudience: ["external"],
    preview: "Record type, specific information, time period, format preference",
    fields: [
      { id: generateFieldId(622), type: "text", label: "Requester Name", required: true },
      { id: generateFieldId(623), type: "email", label: "Email Address", required: true },
      { id: generateFieldId(624), type: "select", label: "Request Type", required: true, options: ["Meeting Minutes", "Financial Records", "Personnel Records", "Contracts", "Correspondence", "Other"] },
      { id: generateFieldId(625), type: "textarea", label: "Specific Records Requested", required: true },
      { id: generateFieldId(626), type: "date", label: "Start Date Range", required: false },
      { id: generateFieldId(627), type: "date", label: "End Date Range", required: false },
      { id: generateFieldId(628), type: "select", label: "Preferred Format", required: false, options: ["Digital/PDF", "Physical Copies", "Both", "No Preference"] },
      { id: generateFieldId(629), type: "textarea", label: "Purpose of Request", required: false }
    ]
  },

  // ADDITIONAL INSURANCE TEMPLATES
  {
    id: "ins-4",
    name: "Insurance Broker Evaluation",
    description: "Insurance broker performance and service quality assessment",
    category: "vendor-risk",
    sector: "insurance",
    targetAudience: ["vendor"],
    preview: "Service quality, market knowledge, client satisfaction, compliance",
    fields: [
      { id: generateFieldId(630), type: "text", label: "Broker Name/Company", required: true },
      { id: generateFieldId(631), type: "text", label: "License Number", required: true },
      { id: generateFieldId(632), type: "checkbox", label: "Lines of Business", required: true, options: ["Property & Casualty", "Life & Health", "Commercial", "Personal Lines", "Specialty"] },
      { id: generateFieldId(633), type: "rating", label: "Market Knowledge", required: true },
      { id: generateFieldId(634), type: "rating", label: "Client Service Quality", required: true },
      { id: generateFieldId(635), type: "text", label: "Years of Experience", required: true },
      { id: generateFieldId(636), type: "textarea", label: "Specializations", required: false },
      { id: generateFieldId(637), type: "radio", label: "E&O Insurance Current?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(638), type: "text", label: "Client Retention Rate (%)", required: false }
    ]
  },

  {
    id: "ins-5",
    name: "Catastrophe Response Plan",
    description: "Insurance catastrophic event response and claims management",
    category: "operations",
    sector: "insurance",
    targetAudience: ["internal"],
    preview: "Event type, response procedures, resource allocation, communication plan",
    fields: [
      { id: generateFieldId(639), type: "select", label: "Catastrophe Type", required: true, options: ["Hurricane", "Earthquake", "Flood", "Wildfire", "Tornado", "Winter Storm", "Other"] },
      { id: generateFieldId(640), type: "text", label: "Event Name/ID", required: true },
      { id: generateFieldId(641), type: "text", label: "Affected Geographic Area", required: true },
      { id: generateFieldId(642), type: "text", label: "Estimated Claims Volume", required: true },
      { id: generateFieldId(643), type: "checkbox", label: "Response Teams Deployed", required: true, options: ["CAT Adjusters", "Emergency Response", "Customer Service", "IT Support", "Claims Processing"] },
      { id: generateFieldId(644), type: "textarea", label: "Resource Allocation Plan", required: true },
      { id: generateFieldId(645), type: "textarea", label: "Customer Communication Strategy", required: true },
      { id: generateFieldId(646), type: "date", label: "Response End Date (Estimated)", required: false }
    ]
  },

  // ADDITIONAL FINTECH TEMPLATES
  {
    id: "fin-4",
    name: "Open Banking API Integration",
    description: "Third-party fintech API integration assessment",
    category: "it",
    sector: "fintech",
    targetAudience: ["vendor", "external"],
    preview: "API specifications, security requirements, data handling, compliance",
    fields: [
      { id: generateFieldId(647), type: "text", label: "Fintech Company Name", required: true },
      { id: generateFieldId(648), type: "text", label: "API Service Description", required: true },
      { id: generateFieldId(649), type: "checkbox", label: "Data Types Accessed", required: true, options: ["Account Information", "Transaction History", "Payment Initiation", "Identity Verification", "Credit Scoring"] },
      { id: generateFieldId(650), type: "checkbox", label: "Security Standards", required: true, options: ["OAuth 2.0", "TLS 1.3", "API Keys", "Mutual TLS", "JWT Tokens"] },
      { id: generateFieldId(651), type: "radio", label: "PCI DSS Compliant?", required: true, options: ["Yes", "No", "Not Applicable"] },
      { id: generateFieldId(652), type: "textarea", label: "Data Retention Policy", required: true },
      { id: generateFieldId(653), type: "radio", label: "Real-time Data Processing?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(654), type: "text", label: "Maximum API Call Rate", required: true }
    ]
  },

  {
    id: "fin-5",
    name: "Cryptocurrency Exchange Compliance",
    description: "Digital asset exchange regulatory compliance assessment",
    category: "compliance",
    sector: "fintech",
    targetAudience: ["internal"],
    preview: "Regulatory requirements, AML procedures, customer verification, reporting",
    fields: [
      { id: generateFieldId(655), type: "text", label: "Exchange Name", required: true },
      { id: generateFieldId(656), type: "checkbox", label: "Regulatory Licenses", required: true, options: ["Money Transmitter", "MSB Registration", "BitLicense", "European MiCA", "Other"] },
      { id: generateFieldId(657), type: "checkbox", label: "Supported Cryptocurrencies", required: true, options: ["Bitcoin", "Ethereum", "Stablecoins", "Altcoins", "NFTs"] },
      { id: generateFieldId(658), type: "radio", label: "Enhanced KYC Procedures?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(659), type: "textarea", label: "AML Transaction Monitoring", required: true },
      { id: generateFieldId(660), type: "radio", label: "Suspicious Activity Reporting?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(661), type: "text", label: "Daily Transaction Limit", required: true },
      { id: generateFieldId(662), type: "radio", label: "Cold Storage for Assets?", required: true, options: ["Yes", "No"] }
    ]
  },

  // ADDITIONAL HEALTH TEMPLATES
  {
    id: "health-4",
    name: "Clinical Trial Participant Screening",
    description: "Clinical research participant eligibility assessment",
    category: "assessment",
    sector: "health",
    targetAudience: ["external"],
    preview: "Medical history, inclusion criteria, exclusion criteria, consent process",
    fields: [
      { id: generateFieldId(663), type: "text", label: "Study Title", required: true },
      { id: generateFieldId(664), type: "text", label: "Participant ID", required: true },
      { id: generateFieldId(665), type: "date", label: "Date of Birth", required: true },
      { id: generateFieldId(666), type: "select", label: "Gender", required: true, options: ["Male", "Female", "Other", "Prefer not to say"] },
      { id: generateFieldId(667), type: "checkbox", label: "Medical Conditions", required: false, options: ["Diabetes", "Hypertension", "Heart Disease", "Cancer", "Autoimmune", "None"] },
      { id: generateFieldId(668), type: "textarea", label: "Current Medications", required: false },
      { id: generateFieldId(669), type: "radio", label: "Pregnant or Nursing?", required: true, options: ["Yes", "No", "Not Applicable"] },
      { id: generateFieldId(670), type: "radio", label: "Previous Clinical Trial Participation?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(671), type: "radio", label: "Informed Consent Provided?", required: true, options: ["Yes", "No"] }
    ]
  },

  {
    id: "health-5",
    name: "Telemedicine Platform Assessment",
    description: "Healthcare technology platform evaluation for telemedicine",
    category: "it",
    sector: "health",
    targetAudience: ["vendor"],
    preview: "Platform features, security compliance, integration capabilities, user experience",
    fields: [
      { id: generateFieldId(672), type: "text", label: "Platform Name", required: true },
      { id: generateFieldId(673), type: "checkbox", label: "Platform Features", required: true, options: ["Video Consultation", "Chat Messaging", "File Sharing", "Prescription Management", "Appointment Scheduling"] },
      { id: generateFieldId(674), type: "radio", label: "HIPAA Compliant?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(675), type: "radio", label: "End-to-End Encryption?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(676), type: "checkbox", label: "EHR Integration", required: false, options: ["Epic", "Cerner", "Allscripts", "eClinicalWorks", "Custom API"] },
      { id: generateFieldId(677), type: "rating", label: "User Interface Quality", required: true },
      { id: generateFieldId(678), type: "text", label: "Maximum Concurrent Users", required: true },
      { id: generateFieldId(679), type: "radio", label: "Mobile App Available?", required: true, options: ["Yes", "No"] }
    ]
  },

  // ADDITIONAL ENERGY TEMPLATES
  {
    id: "energy-4",
    name: "Renewable Energy Certificate Tracking",
    description: "Renewable energy credit and certificate management",
    category: "compliance",
    sector: "energy",
    targetAudience: ["internal"],
    preview: "REC generation, tracking, trading, compliance reporting",
    fields: [
      { id: generateFieldId(680), type: "text", label: "Generation Facility", required: true },
      { id: generateFieldId(681), type: "select", label: "Renewable Source", required: true, options: ["Solar", "Wind", "Hydroelectric", "Biomass", "Geothermal", "Landfill Gas"] },
      { id: generateFieldId(682), type: "text", label: "Nameplate Capacity (MW)", required: true },
      { id: generateFieldId(683), type: "text", label: "Energy Generated (MWh)", required: true },
      { id: generateFieldId(684), type: "text", label: "RECs Created", required: true },
      { id: generateFieldId(685), type: "date", label: "Generation Period Start", required: true },
      { id: generateFieldId(686), type: "date", label: "Generation Period End", required: true },
      { id: generateFieldId(687), type: "select", label: "REC Status", required: true, options: ["Created", "Sold", "Retired", "Banked"] },
      { id: generateFieldId(688), type: "text", label: "Registry Tracking ID", required: false }
    ]
  },

  {
    id: "energy-5",
    name: "Power Plant Maintenance Schedule",
    description: "Energy facility maintenance planning and tracking",
    category: "operations",
    sector: "energy",
    targetAudience: ["internal"],
    preview: "Equipment maintenance, scheduling, downtime impact, safety procedures",
    fields: [
      { id: generateFieldId(689), type: "text", label: "Facility Name", required: true },
      { id: generateFieldId(690), type: "select", label: "Maintenance Type", required: true, options: ["Routine", "Preventive", "Corrective", "Emergency", "Overhaul"] },
      { id: generateFieldId(691), type: "text", label: "Equipment/System", required: true },
      { id: generateFieldId(692), type: "date", label: "Scheduled Start Date", required: true },
      { id: generateFieldId(693), type: "text", label: "Estimated Duration (hours)", required: true },
      { id: generateFieldId(694), type: "text", label: "Expected Capacity Reduction (MW)", required: true },
      { id: generateFieldId(695), type: "checkbox", label: "Safety Procedures", required: true, options: ["Lockout/Tagout", "Confined Space", "Hot Work Permit", "Fall Protection", "Electrical Safety"] },
      { id: generateFieldId(696), type: "textarea", label: "Work Description", required: true },
      { id: generateFieldId(697), type: "text", label: "Estimated Cost", required: false }
    ]
  },

  // ADDITIONAL STARTUP TEMPLATES
  {
    id: "startup-4",
    name: "Startup Accelerator Application",
    description: "Application for startup accelerator or incubator program",
    category: "business",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Company stage, team, market opportunity, growth metrics",
    fields: [
      { id: generateFieldId(698), type: "text", label: "Startup Name", required: true },
      { id: generateFieldId(699), type: "text", label: "Industry/Vertical", required: true },
      { id: generateFieldId(700), type: "select", label: "Company Stage", required: true, options: ["Idea Stage", "MVP", "Beta", "Live Product", "Revenue Generating"] },
      { id: generateFieldId(701), type: "textarea", label: "Problem You're Solving", required: true },
      { id: generateFieldId(702), type: "textarea", label: "Your Solution", required: true },
      { id: generateFieldId(703), type: "text", label: "Target Market Size", required: true },
      { id: generateFieldId(704), type: "text", label: "Monthly Recurring Revenue", required: false },
      { id: generateFieldId(705), type: "text", label: "User/Customer Count", required: false },
      { id: generateFieldId(706), type: "textarea", label: "Team Background", required: true },
      { id: generateFieldId(707), type: "textarea", label: "Why This Accelerator?", required: true }
    ]
  },

  {
    id: "startup-5",
    name: "Intellectual Property Audit",
    description: "Startup intellectual property portfolio assessment",
    category: "legal",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Patents, trademarks, copyrights, trade secrets, IP strategy",
    fields: [
      { id: generateFieldId(708), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(709), type: "checkbox", label: "IP Types", required: true, options: ["Patents", "Trademarks", "Copyrights", "Trade Secrets", "Domain Names"] },
      { id: generateFieldId(710), type: "text", label: "Number of Patent Applications", required: false },
      { id: generateFieldId(711), type: "text", label: "Number of Granted Patents", required: false },
      { id: generateFieldId(712), type: "textarea", label: "Core Technology Description", required: true },
      { id: generateFieldId(713), type: "radio", label: "Employee IP Assignments Complete?", required: true, options: ["Yes", "No", "Partial"] },
      { id: generateFieldId(714), type: "radio", label: "Competitor IP Analysis Done?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(715), type: "textarea", label: "IP Strategy", required: true },
      { id: generateFieldId(716), type: "text", label: "Annual IP Budget", required: false }
    ]
  },

  // ADDITIONAL SME TEMPLATES
  {
    id: "sme-4",
    name: "Small Business Tax Preparation",
    description: "Annual tax preparation and documentation for small businesses",
    category: "finance",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Financial records, deductions, tax obligations, documentation requirements",
    fields: [
      { id: generateFieldId(717), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(718), type: "select", label: "Business Structure", required: true, options: ["Sole Proprietorship", "LLC", "S-Corp", "C-Corp", "Partnership"] },
      { id: generateFieldId(719), type: "text", label: "Tax Year", required: true },
      { id: generateFieldId(720), type: "text", label: "Gross Revenue", required: true },
      { id: generateFieldId(721), type: "text", label: "Total Expenses", required: true },
      { id: generateFieldId(722), type: "checkbox", label: "Business Deductions", required: false, options: ["Home Office", "Business Travel", "Equipment", "Professional Services", "Marketing", "Insurance"] },
      { id: generateFieldId(723), type: "text", label: "Number of Employees", required: true },
      { id: generateFieldId(724), type: "radio", label: "Quarterly Taxes Paid?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(725), type: "textarea", label: "Additional Tax Information", required: false }
    ]
  },

  {
    id: "sme-5",
    name: "Business Insurance Assessment",
    description: "Small business insurance needs and coverage evaluation",
    category: "risk",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Business risks, current coverage, insurance needs, recommendations",
    fields: [
      { id: generateFieldId(726), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(727), type: "select", label: "Industry Type", required: true, options: ["Retail", "Professional Services", "Manufacturing", "Construction", "Food Service", "Technology"] },
      { id: generateFieldId(728), type: "text", label: "Number of Employees", required: true },
      { id: generateFieldId(729), type: "text", label: "Annual Revenue", required: true },
      { id: generateFieldId(730), type: "checkbox", label: "Current Insurance", required: false, options: ["General Liability", "Professional Liability", "Property", "Workers' Comp", "Cyber Liability", "None"] },
      { id: generateFieldId(731), type: "checkbox", label: "Business Risks", required: true, options: ["Customer Injuries", "Data Breach", "Property Damage", "Professional Errors", "Employee Injury", "Business Interruption"] },
      { id: generateFieldId(732), type: "text", label: "Business Property Value", required: false },
      { id: generateFieldId(733), type: "radio", label: "Home-Based Business?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(734), type: "textarea", label: "Specific Insurance Concerns", required: false }
    ]
  },

  // CROSS-SECTOR TEMPLATES
  {
    id: "cross-1",
    name: "Data Privacy Impact Assessment",
    description: "GDPR/privacy compliance assessment for data processing activities",
    category: "compliance",
    targetAudience: ["internal"],
    preview: "Data processing activities, privacy risks, mitigation measures, legal basis",
    fields: [
      { id: generateFieldId(735), type: "text", label: "Processing Activity Name", required: true },
      { id: generateFieldId(736), type: "textarea", label: "Purpose of Processing", required: true },
      { id: generateFieldId(737), type: "checkbox", label: "Types of Personal Data", required: true, options: ["Contact Information", "Financial Data", "Health Data", "Biometric Data", "Location Data", "Behavioral Data"] },
      { id: generateFieldId(738), type: "select", label: "Legal Basis", required: true, options: ["Consent", "Contract", "Legal Obligation", "Vital Interests", "Public Task", "Legitimate Interests"] },
      { id: generateFieldId(739), type: "checkbox", label: "Data Subjects", required: true, options: ["Employees", "Customers", "Suppliers", "Website Visitors", "Children", "Vulnerable Groups"] },
      { id: generateFieldId(740), type: "textarea", label: "Privacy Risks Identified", required: true },
      { id: generateFieldId(741), type: "textarea", label: "Mitigation Measures", required: true },
      { id: generateFieldId(742), type: "radio", label: "High Risk Processing?", required: true, options: ["Yes", "No"] }
    ]
  },

  {
    id: "cross-2",
    name: "Cybersecurity Incident Response",
    description: "Security incident reporting and response coordination",
    category: "security",
    targetAudience: ["internal"],
    preview: "Incident details, impact assessment, response actions, lessons learned",
    fields: [
      { id: generateFieldId(743), type: "text", label: "Incident ID", required: true },
      { id: generateFieldId(744), type: "date", label: "Incident Discovery Date", required: true },
      { id: generateFieldId(745), type: "select", label: "Incident Type", required: true, options: ["Data Breach", "Malware", "Phishing", "DDoS Attack", "Insider Threat", "System Compromise"] },
      { id: generateFieldId(746), type: "select", label: "Severity Level", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { id: generateFieldId(747), type: "textarea", label: "Incident Description", required: true },
      { id: generateFieldId(748), type: "checkbox", label: "Affected Systems", required: true, options: ["Email", "Database", "Web Application", "Network Infrastructure", "Mobile Devices", "Cloud Services"] },
      { id: generateFieldId(749), type: "textarea", label: "Immediate Response Actions", required: true },
      { id: generateFieldId(750), type: "radio", label: "External Notification Required?", required: true, options: ["Yes", "No", "Under Review"] },
      { id: generateFieldId(751), type: "textarea", label: "Lessons Learned", required: false }
    ]
  },

  {
    id: "cross-3",
    name: "Business Continuity Plan Assessment",
    description: "Business continuity and disaster recovery planning evaluation",
    category: "risk",
    targetAudience: ["internal"],
    preview: "Critical processes, recovery objectives, resource requirements, testing results",
    fields: [
      { id: generateFieldId(752), type: "text", label: "Department/Function", required: true },
      { id: generateFieldId(753), type: "checkbox", label: "Critical Business Processes", required: true, options: ["Customer Service", "Financial Operations", "IT Systems", "Supply Chain", "Manufacturing", "Communications"] },
      { id: generateFieldId(754), type: "text", label: "Recovery Time Objective (Hours)", required: true },
      { id: generateFieldId(755), type: "text", label: "Recovery Point Objective (Hours)", required: true },
      { id: generateFieldId(756), type: "textarea", label: "Key Dependencies", required: true },
      { id: generateFieldId(757), type: "checkbox", label: "Recovery Strategies", required: true, options: ["Backup Site", "Remote Work", "Manual Processes", "Third-party Services", "Cloud Solutions"] },
      { id: generateFieldId(758), type: "radio", label: "Plan Tested in Last 12 Months?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(759), type: "textarea", label: "Resource Requirements", required: true },
      { id: generateFieldId(760), type: "rating", label: "Plan Effectiveness", required: true }
    ]
  },

  {
    id: "cross-4",
    name: "ESG Reporting Assessment",
    description: "Environmental, Social, and Governance performance evaluation",
    category: "compliance",
    targetAudience: ["internal"],
    preview: "Environmental impact, social responsibility, governance practices, sustainability metrics",
    fields: [
      { id: generateFieldId(761), type: "text", label: "Reporting Period", required: true },
      { id: generateFieldId(762), type: "text", label: "Carbon Footprint (CO2 equivalent)", required: false },
      { id: generateFieldId(763), type: "text", label: "Energy Consumption (kWh)", required: false },
      { id: generateFieldId(764), type: "text", label: "Water Usage (Gallons)", required: false },
      { id: generateFieldId(765), type: "checkbox", label: "Social Initiatives", required: false, options: ["Community Investment", "Employee Diversity", "Training Programs", "Charitable Giving", "Volunteer Programs"] },
      { id: generateFieldId(766), type: "checkbox", label: "Governance Practices", required: true, options: ["Board Independence", "Ethics Code", "Risk Management", "Compliance Program", "Transparency Reporting"] },
      { id: generateFieldId(767), type: "textarea", label: "Sustainability Goals", required: false },
      { id: generateFieldId(768), type: "radio", label: "Third-party ESG Rating?", required: false, options: ["Yes", "No", "Planned"] }
    ]
  },

  {
    id: "cross-5",
    name: "Remote Work Policy Assessment",
    description: "Remote work readiness and policy compliance evaluation",
    category: "hr",
    targetAudience: ["internal"],
    preview: "Work arrangements, technology requirements, security measures, productivity metrics",
    fields: [
      { id: generateFieldId(769), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(770), type: "text", label: "Department", required: true },
      { id: generateFieldId(771), type: "select", label: "Work Arrangement", required: true, options: ["Fully Remote", "Hybrid", "Occasional Remote", "On-site Only"] },
      { id: generateFieldId(772), type: "checkbox", label: "Home Office Setup", required: true, options: ["Dedicated Workspace", "High-speed Internet", "Ergonomic Furniture", "Adequate Lighting", "Privacy/Security"] },
      { id: generateFieldId(773), type: "checkbox", label: "Technology Requirements", required: true, options: ["Company Laptop", "VPN Access", "Collaboration Tools", "Security Software", "Mobile Device"] },
      { id: generateFieldId(774), type: "rating", label: "Productivity Level", required: true },
      { id: generateFieldId(775), type: "textarea", label: "Communication Preferences", required: false },
      { id: generateFieldId(776), type: "radio", label: "Security Training Completed?", required: true, options: ["Yes", "No"] }
    ]
  },

  // 100 ADDITIONAL COMPREHENSIVE TEMPLATES

  // GENERAL/CROSS-SECTOR TEMPLATES (NO SECTOR TAG)
  {
    id: "gen-1",
    name: "New Hire Training Plan",
    description: "Comprehensive training program for new employees",
    category: "training",
    targetAudience: ["internal"],
    preview: "Training modules, timeline, assessment criteria, mentorship",
    fields: [
      { id: generateFieldId(777), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(778), type: "text", label: "Position", required: true },
      { id: generateFieldId(779), type: "date", label: "Start Date", required: true },
      { id: generateFieldId(780), type: "checkbox", label: "Training Modules", required: true, options: ["Company Orientation", "Job-Specific Skills", "Safety Training", "Compliance", "Systems Training", "Soft Skills"] },
      { id: generateFieldId(781), type: "text", label: "Training Duration (weeks)", required: true },
      { id: generateFieldId(782), type: "text", label: "Assigned Mentor", required: false },
      { id: generateFieldId(783), type: "textarea", label: "Success Criteria", required: true },
      { id: generateFieldId(784), type: "date", label: "Evaluation Date", required: true }
    ]
  },

  {
    id: "gen-2",
    name: "Workplace Incident Report",
    description: "General workplace incident reporting for all industries",
    category: "safety",
    targetAudience: ["internal"],
    preview: "Incident details, injuries, witnesses, corrective actions",
    fields: [
      { id: generateFieldId(785), type: "date", label: "Incident Date", required: true },
      { id: generateFieldId(786), type: "text", label: "Incident Time", required: true },
      { id: generateFieldId(787), type: "text", label: "Location", required: true },
      { id: generateFieldId(788), type: "select", label: "Incident Type", required: true, options: ["Injury", "Near Miss", "Property Damage", "Security Incident", "Environmental", "Other"] },
      { id: generateFieldId(789), type: "textarea", label: "Description", required: true },
      { id: generateFieldId(790), type: "text", label: "Injured Person(s)", required: false },
      { id: generateFieldId(791), type: "textarea", label: "Witnesses", required: false },
      { id: generateFieldId(792), type: "textarea", label: "Immediate Actions Taken", required: true },
      { id: generateFieldId(793), type: "textarea", label: "Preventive Measures", required: false }
    ]
  },

  {
    id: "gen-3", 
    name: "Supplier Performance Evaluation",
    description: "Universal supplier assessment across all industries",
    category: "procurement",
    targetAudience: ["vendor"],
    preview: "Quality metrics, delivery performance, service level, cost effectiveness",
    fields: [
      { id: generateFieldId(794), type: "text", label: "Supplier Name", required: true },
      { id: generateFieldId(795), type: "text", label: "Contract Period", required: true },
      { id: generateFieldId(796), type: "rating", label: "Quality of Products/Services", required: true },
      { id: generateFieldId(797), type: "rating", label: "On-time Delivery", required: true },
      { id: generateFieldId(798), type: "rating", label: "Customer Service", required: true },
      { id: generateFieldId(799), type: "rating", label: "Cost Competitiveness", required: true },
      { id: generateFieldId(800), type: "textarea", label: "Strengths", required: false },
      { id: generateFieldId(801), type: "textarea", label: "Areas for Improvement", required: false },
      { id: generateFieldId(802), type: "select", label: "Overall Rating", required: true, options: ["Excellent", "Good", "Satisfactory", "Needs Improvement", "Unsatisfactory"] }
    ]
  },

  {
    id: "telecom-new-2",
    name: "Network Infrastructure Audit",
    description: "Comprehensive telecommunications network infrastructure assessment",
    category: "audit",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Equipment inventory, performance metrics, security assessment, upgrade recommendations",
    fields: [
      { id: generateFieldId(803), type: "text", label: "Network Segment", required: true },
      { id: generateFieldId(804), type: "select", label: "Infrastructure Type", required: true, options: ["Core Network", "Access Network", "Transport Network", "Data Centers", "Radio Access"] },
      { id: generateFieldId(805), type: "text", label: "Equipment Age (years)", required: true },
      { id: generateFieldId(806), type: "rating", label: "Performance Rating", required: true },
      { id: generateFieldId(807), type: "checkbox", label: "Issues Found", required: false, options: ["Capacity Constraints", "Security Vulnerabilities", "Legacy Equipment", "Maintenance Backlog", "Compliance Gaps"] },
      { id: generateFieldId(808), type: "select", label: "Priority Level", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { id: generateFieldId(809), type: "textarea", label: "Recommendations", required: true },
      { id: generateFieldId(810), type: "text", label: "Estimated Upgrade Cost", required: false },
      { id: generateFieldId(811), type: "date", label: "Recommended Timeline", required: false }
    ]
  },

  {
    id: "gen-5",
    name: "Project Closure Report",
    description: "Project completion documentation and lessons learned",
    category: "project",
    targetAudience: ["internal"],
    preview: "Project outcomes, deliverables, budget analysis, lessons learned",
    fields: [
      { id: generateFieldId(812), type: "text", label: "Project Name", required: true },
      { id: generateFieldId(813), type: "text", label: "Project Manager", required: true },
      { id: generateFieldId(814), type: "date", label: "Project End Date", required: true },
      { id: generateFieldId(815), type: "radio", label: "Project Status", required: true, options: ["Completed Successfully", "Completed with Issues", "Cancelled", "On Hold"] },
      { id: generateFieldId(816), type: "text", label: "Final Budget", required: true },
      { id: generateFieldId(817), type: "text", label: "Budget Variance", required: true },
      { id: generateFieldId(818), type: "textarea", label: "Key Deliverables", required: true },
      { id: generateFieldId(819), type: "textarea", label: "Lessons Learned", required: true },
      { id: generateFieldId(820), type: "textarea", label: "Recommendations", required: false }
    ]
  },

  // GOVERNMENT SECTOR TEMPLATES
  {
    id: "gov-7",
    name: "Municipal Service Request",
    description: "Citizen request for municipal services and infrastructure",
    category: "customer",
    sector: "government",
    targetAudience: ["external"],
    preview: "Service type, location, urgency, contact information",
    fields: [
      { id: generateFieldId(821), type: "text", label: "Citizen Name", required: true },
      { id: generateFieldId(822), type: "email", label: "Email Address", required: true },
      { id: generateFieldId(823), type: "text", label: "Phone Number", required: true },
      { id: generateFieldId(824), type: "select", label: "Service Type", required: true, options: ["Road Repair", "Street Lighting", "Water/Sewer", "Trash Collection", "Tree Service", "Snow Removal", "Other"] },
      { id: generateFieldId(825), type: "textarea", label: "Service Location", required: true },
      { id: generateFieldId(826), type: "textarea", label: "Issue Description", required: true },
      { id: generateFieldId(827), type: "select", label: "Priority", required: true, options: ["Low", "Medium", "High", "Emergency"] },
      { id: generateFieldId(828), type: "date", label: "Preferred Service Date", required: false }
    ]
  },

  {
    id: "gov-8",
    name: "Public Meeting Minutes Template",
    description: "Standardized template for government meeting documentation",
    category: "legal",
    sector: "government",
    targetAudience: ["internal"],
    preview: "Meeting details, attendees, agenda items, decisions, action items",
    fields: [
      { id: generateFieldId(829), type: "text", label: "Meeting Title", required: true },
      { id: generateFieldId(830), type: "date", label: "Meeting Date", required: true },
      { id: generateFieldId(831), type: "text", label: "Meeting Location", required: true },
      { id: generateFieldId(832), type: "textarea", label: "Attendees", required: true },
      { id: generateFieldId(833), type: "textarea", label: "Agenda Items", required: true },
      { id: generateFieldId(834), type: "textarea", label: "Decisions Made", required: true },
      { id: generateFieldId(835), type: "textarea", label: "Action Items", required: false },
      { id: generateFieldId(836), type: "date", label: "Next Meeting Date", required: false }
    ]
  },

  {
    id: "gov-9",
    name: "Government Contractor Billing",
    description: "Invoice and billing form for government contractors",
    category: "finance",
    sector: "government",
    targetAudience: ["vendor"],
    preview: "Contract details, work performed, rates, compliance certifications",
    fields: [
      { id: generateFieldId(837), type: "text", label: "Contract Number", required: true },
      { id: generateFieldId(838), type: "text", label: "Contractor Name", required: true },
      { id: generateFieldId(839), type: "date", label: "Invoice Date", required: true },
      { id: generateFieldId(840), type: "text", label: "Invoice Number", required: true },
      { id: generateFieldId(841), type: "date", label: "Service Period Start", required: true },
      { id: generateFieldId(842), type: "date", label: "Service Period End", required: true },
      { id: generateFieldId(843), type: "textarea", label: "Work Performed", required: true },
      { id: generateFieldId(844), type: "text", label: "Total Amount", required: true },
      { id: generateFieldId(845), type: "radio", label: "Certified Payroll Submitted?", required: true, options: ["Yes", "No", "Not Required"] }
    ]
  },

  {
    id: "gov-10",
    name: "Public Works Project Proposal",
    description: "Proposal submission for public infrastructure projects",
    category: "project",
    sector: "government",
    targetAudience: ["external"],
    preview: "Project scope, timeline, budget, environmental impact, community benefit",
    fields: [
      { id: generateFieldId(846), type: "text", label: "Project Title", required: true },
      { id: generateFieldId(847), type: "text", label: "Proposing Organization", required: true },
      { id: generateFieldId(848), type: "textarea", label: "Project Description", required: true },
      { id: generateFieldId(849), type: "text", label: "Project Location", required: true },
      { id: generateFieldId(850), type: "text", label: "Estimated Cost", required: true },
      { id: generateFieldId(851), type: "date", label: "Proposed Start Date", required: true },
      { id: generateFieldId(852), type: "text", label: "Project Duration (months)", required: true },
      { id: generateFieldId(853), type: "textarea", label: "Community Benefits", required: true },
      { id: generateFieldId(854), type: "textarea", label: "Environmental Considerations", required: false }
    ]
  },

  // INSURANCE SECTOR TEMPLATES
  {
    id: "ins-6",
    name: "Policy Renewal Assessment",
    description: "Annual insurance policy review and renewal evaluation",
    category: "customer",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Coverage review, risk changes, premium adjustments, renewal terms",
    fields: [
      { id: generateFieldId(855), type: "text", label: "Policy Number", required: true },
      { id: generateFieldId(856), type: "text", label: "Policyholder Name", required: true },
      { id: generateFieldId(857), type: "date", label: "Current Expiry Date", required: true },
      { id: generateFieldId(858), type: "radio", label: "Any Changes Since Last Renewal?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(859), type: "textarea", label: "Risk Changes", required: false },
      { id: generateFieldId(860), type: "checkbox", label: "Coverage Adjustments Needed", required: false, options: ["Increase Coverage", "Decrease Coverage", "Add Coverage", "Remove Coverage", "No Changes"] },
      { id: generateFieldId(861), type: "rating", label: "Satisfaction with Current Coverage", required: true },
      { id: generateFieldId(862), type: "radio", label: "Interest in Additional Products?", required: false, options: ["Yes", "No", "Maybe"] },
      { id: generateFieldId(863), type: "textarea", label: "Special Requests", required: false }
    ]
  },

  {
    id: "ins-7",
    name: "Insurance Fraud Investigation",
    description: "Detailed fraud investigation report for suspicious claims",
    category: "security",
    sector: "insurance",
    targetAudience: ["internal"],
    preview: "Claim details, investigation findings, evidence, recommendations",
    fields: [
      { id: generateFieldId(864), type: "text", label: "Claim Number", required: true },
      { id: generateFieldId(865), type: "text", label: "Investigator Name", required: true },
      { id: generateFieldId(866), type: "date", label: "Investigation Date", required: true },
      { id: generateFieldId(867), type: "checkbox", label: "Fraud Indicators", required: true, options: ["Inconsistent Statements", "Delayed Reporting", "Excessive Claim Amount", "Previous Claims History", "Documentation Issues"] },
      { id: generateFieldId(868), type: "textarea", label: "Investigation Summary", required: true },
      { id: generateFieldId(869), type: "textarea", label: "Evidence Collected", required: true },
      { id: generateFieldId(870), type: "select", label: "Fraud Likelihood", required: true, options: ["No Fraud", "Possible", "Probable", "Confirmed"] },
      { id: generateFieldId(871), type: "textarea", label: "Recommendations", required: true }
    ]
  },

  {
    id: "ins-8",
    name: "Reinsurance Treaty Assessment",
    description: "Reinsurance arrangement evaluation and risk transfer analysis",
    category: "risk",
    sector: "insurance",
    targetAudience: ["internal"],
    preview: "Coverage terms, retention levels, risk analysis, financial impact",
    fields: [
      { id: generateFieldId(872), type: "text", label: "Reinsurer Name", required: true },
      { id: generateFieldId(873), type: "select", label: "Treaty Type", required: true, options: ["Quota Share", "Surplus", "Excess of Loss", "Stop Loss", "Catastrophe"] },
      { id: generateFieldId(874), type: "text", label: "Coverage Limit", required: true },
      { id: generateFieldId(875), type: "text", label: "Retention Amount", required: true },
      { id: generateFieldId(876), type: "text", label: "Premium Rate (%)", required: true },
      { id: generateFieldId(877), type: "checkbox", label: "Lines of Business", required: true, options: ["Property", "Casualty", "Motor", "Life", "Health"] },
      { id: generateFieldId(878), type: "rating", label: "Reinsurer Financial Rating", required: true },
      { id: generateFieldId(879), type: "textarea", label: "Risk Transfer Benefits", required: true }
    ]
  },

  // FINTECH SECTOR TEMPLATES
  {
    id: "fin-6",
    name: "Digital Wallet Onboarding",
    description: "Digital payment wallet user registration and verification",
    category: "customer",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "User verification, payment methods, security setup, terms acceptance",
    fields: [
      { id: generateFieldId(880), type: "text", label: "Full Name", required: true },
      { id: generateFieldId(881), type: "email", label: "Email Address", required: true },
      { id: generateFieldId(882), type: "text", label: "Phone Number", required: true },
      { id: generateFieldId(883), type: "date", label: "Date of Birth", required: true },
      { id: generateFieldId(884), type: "text", label: "Government ID Number", required: true },
      { id: generateFieldId(885), type: "checkbox", label: "Identity Verification Methods", required: true, options: ["Photo ID", "Address Verification", "Phone Verification", "Email Verification", "Biometric"] },
      { id: generateFieldId(886), type: "checkbox", label: "Payment Methods", required: true, options: ["Bank Transfer", "Credit Card", "Debit Card", "Cryptocurrency", "Cash Top-up"] },
      { id: generateFieldId(887), type: "radio", label: "Terms and Conditions Accepted?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(888), type: "radio", label: "Privacy Policy Accepted?", required: true, options: ["Yes", "No"] }
    ]
  },

  {
    id: "fin-7",
    name: "Robo-Advisor Risk Profiling",
    description: "Automated investment advisory risk assessment",
    category: "assessment",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Investment goals, risk tolerance, time horizon, financial situation",
    fields: [
      { id: generateFieldId(889), type: "text", label: "Client Name", required: true },
      { id: generateFieldId(890), type: "text", label: "Age", required: true },
      { id: generateFieldId(891), type: "text", label: "Annual Income", required: true },
      { id: generateFieldId(892), type: "text", label: "Net Worth", required: true },
      { id: generateFieldId(893), type: "select", label: "Investment Goal", required: true, options: ["Retirement", "Wealth Building", "Education", "Emergency Fund", "Short-term Goals"] },
      { id: generateFieldId(894), type: "select", label: "Time Horizon", required: true, options: ["< 1 year", "1-3 years", "3-5 years", "5-10 years", "> 10 years"] },
      { id: generateFieldId(895), type: "radio", label: "Risk Tolerance", required: true, options: ["Conservative", "Moderate", "Aggressive", "Very Aggressive"] },
      { id: generateFieldId(896), type: "text", label: "Investment Amount", required: true },
      { id: generateFieldId(897), type: "radio", label: "Previous Investment Experience?", required: true, options: ["None", "Basic", "Intermediate", "Advanced"] }
    ]
  },

  {
    id: "fin-8",
    name: "Peer-to-Peer Lending Assessment",
    description: "P2P lending platform borrower and lender evaluation",
    category: "risk",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Credit assessment, loan purpose, repayment capacity, platform terms",
    fields: [
      { id: generateFieldId(898), type: "select", label: "Application Type", required: true, options: ["Borrower", "Lender"] },
      { id: generateFieldId(899), type: "text", label: "Requested Loan Amount", required: true },
      { id: generateFieldId(900), type: "select", label: "Loan Purpose", required: true, options: ["Debt Consolidation", "Home Improvement", "Business", "Personal", "Education"] },
      { id: generateFieldId(901), type: "text", label: "Credit Score", required: true },
      { id: generateFieldId(902), type: "text", label: "Monthly Income", required: true },
      { id: generateFieldId(903), type: "text", label: "Monthly Debt Payments", required: true },
      { id: generateFieldId(904), type: "select", label: "Employment Status", required: true, options: ["Full-time", "Part-time", "Self-employed", "Unemployed", "Retired"] },
      { id: generateFieldId(905), type: "text", label: "Desired Interest Rate (%)", required: false },
      { id: generateFieldId(906), type: "select", label: "Loan Term", required: true, options: ["12 months", "24 months", "36 months", "48 months", "60 months"] }
    ]
  },

  // HEALTH SECTOR TEMPLATES
  {
    id: "health-6",
    name: "Clinical Research Data Collection",
    description: "Standardized clinical trial data collection form",
    category: "research",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Patient data, treatment protocols, adverse events, efficacy measures",
    fields: [
      { id: generateFieldId(907), type: "text", label: "Study ID", required: true },
      { id: generateFieldId(908), type: "text", label: "Subject ID", required: true },
      { id: generateFieldId(909), type: "date", label: "Visit Date", required: true },
      { id: generateFieldId(910), type: "text", label: "Visit Number", required: true },
      { id: generateFieldId(911), type: "text", label: "Principal Investigator", required: true },
      { id: generateFieldId(912), type: "checkbox", label: "Assessments Completed", required: true, options: ["Vital Signs", "Laboratory Tests", "Physical Exam", "Questionnaires", "Imaging", "ECG"] },
      { id: generateFieldId(913), type: "radio", label: "Adverse Events Reported?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(914), type: "textarea", label: "Adverse Event Details", required: false },
      { id: generateFieldId(915), type: "radio", label: "Protocol Deviations?", required: true, options: ["Yes", "No"] }
    ]
  },

  {
    id: "health-7",
    name: "Healthcare Quality Metrics",
    description: "Healthcare facility quality performance measurement",
    category: "quality",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Patient outcomes, safety indicators, satisfaction scores, improvement plans",
    fields: [
      { id: generateFieldId(916), type: "text", label: "Facility Name", required: true },
      { id: generateFieldId(917), type: "date", label: "Reporting Period", required: true },
      { id: generateFieldId(918), type: "text", label: "Patient Satisfaction Score (%)", required: true },
      { id: generateFieldId(919), type: "text", label: "Readmission Rate (%)", required: true },
      { id: generateFieldId(920), type: "text", label: "Hospital-Acquired Infection Rate (%)", required: true },
      { id: generateFieldId(921), type: "text", label: "Average Length of Stay (days)", required: true },
      { id: generateFieldId(922), type: "text", label: "Mortality Rate (%)", required: true },
      { id: generateFieldId(923), type: "checkbox", label: "Quality Improvement Initiatives", required: false, options: ["Hand Hygiene", "Fall Prevention", "Medication Safety", "Infection Control", "Patient Communication"] },
      { id: generateFieldId(924), type: "textarea", label: "Quality Improvement Plan", required: false }
    ]
  },

  {
    id: "health-8",
    name: "Mental Health Screening",
    description: "Comprehensive mental health assessment and screening tool",
    category: "assessment",
    sector: "health",
    targetAudience: ["external"],
    preview: "Mental health history, current symptoms, risk assessment, treatment recommendations",
    fields: [
      { id: generateFieldId(925), type: "text", label: "Patient Name", required: true },
      { id: generateFieldId(926), type: "date", label: "Assessment Date", required: true },
      { id: generateFieldId(927), type: "text", label: "Clinician Name", required: true },
      { id: generateFieldId(928), type: "checkbox", label: "Current Symptoms", required: false, options: ["Depression", "Anxiety", "Mood Swings", "Sleep Issues", "Concentration Problems", "Substance Use"] },
      { id: generateFieldId(929), type: "radio", label: "Previous Mental Health Treatment?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(930), type: "textarea", label: "Family Mental Health History", required: false },
      { id: generateFieldId(931), type: "radio", label: "Suicidal Ideation?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(932), type: "select", label: "Risk Level", required: true, options: ["Low", "Moderate", "High", "Immediate"] },
      { id: generateFieldId(933), type: "textarea", label: "Treatment Recommendations", required: true }
    ]
  },

  // ENERGY SECTOR TEMPLATES
  {
    id: "energy-6",
    name: "Carbon Emissions Tracking",
    description: "Greenhouse gas emissions monitoring and reporting",
    category: "compliance",
    sector: "energy",
    targetAudience: ["internal"],
    preview: "Emission sources, calculation methods, reduction targets, verification",
    fields: [
      { id: generateFieldId(934), type: "text", label: "Facility Name", required: true },
      { id: generateFieldId(935), type: "date", label: "Reporting Period Start", required: true },
      { id: generateFieldId(936), type: "date", label: "Reporting Period End", required: true },
      { id: generateFieldId(937), type: "text", label: "Total CO2 Emissions (tons)", required: true },
      { id: generateFieldId(938), type: "checkbox", label: "Emission Sources", required: true, options: ["Combustion", "Process", "Fugitive", "Transportation", "Electricity", "Waste"] },
      { id: generateFieldId(939), type: "text", label: "Scope 1 Emissions (tons CO2)", required: true },
      { id: generateFieldId(940), type: "text", label: "Scope 2 Emissions (tons CO2)", required: true },
      { id: generateFieldId(941), type: "text", label: "Reduction Target (%)", required: false },
      { id: generateFieldId(942), type: "radio", label: "Third-party Verification?", required: true, options: ["Yes", "No", "Planned"] }
    ]
  },

  {
    id: "energy-7",
    name: "Energy Efficiency Audit",
    description: "Comprehensive energy usage assessment and optimization recommendations",
    category: "audit",
    sector: "energy",
    targetAudience: ["internal", "external"],
    preview: "Energy consumption, efficiency measures, cost savings, implementation timeline",
    fields: [
      { id: generateFieldId(943), type: "text", label: "Building/Facility Name", required: true },
      { id: generateFieldId(944), type: "text", label: "Building Size (sq ft)", required: true },
      { id: generateFieldId(945), type: "text", label: "Annual Energy Consumption (kWh)", required: true },
      { id: generateFieldId(946), type: "text", label: "Annual Energy Cost ($)", required: true },
      { id: generateFieldId(947), type: "checkbox", label: "Energy Systems Assessed", required: true, options: ["HVAC", "Lighting", "Insulation", "Windows", "Appliances", "Controls"] },
      { id: generateFieldId(948), type: "textarea", label: "Efficiency Recommendations", required: true },
      { id: generateFieldId(949), type: "text", label: "Estimated Annual Savings ($)", required: false },
      { id: generateFieldId(950), type: "text", label: "Implementation Cost ($)", required: false },
      { id: generateFieldId(951), type: "text", label: "Payback Period (years)", required: false }
    ]
  },

  {
    id: "energy-8",
    name: "Utility Rate Analysis",
    description: "Energy utility rate structure analysis and optimization",
    category: "finance",
    sector: "energy",
    targetAudience: ["internal"],
    preview: "Rate schedules, usage patterns, cost optimization, tariff recommendations",
    fields: [
      { id: generateFieldId(952), type: "text", label: "Utility Company", required: true },
      { id: generateFieldId(953), type: "select", label: "Service Type", required: true, options: ["Electricity", "Natural Gas", "Water", "Steam", "Compressed Air"] },
      { id: generateFieldId(954), type: "text", label: "Current Rate Schedule", required: true },
      { id: generateFieldId(955), type: "text", label: "Monthly Average Usage", required: true },
      { id: generateFieldId(956), type: "text", label: "Peak Demand (kW)", required: false },
      { id: generateFieldId(957), type: "text", label: "Current Monthly Cost ($)", required: true },
      { id: generateFieldId(958), type: "checkbox", label: "Rate Options Analyzed", required: true, options: ["Standard", "Time-of-Use", "Demand Response", "Green Energy", "Interruptible"] },
      { id: generateFieldId(959), type: "textarea", label: "Recommendations", required: true },
      { id: generateFieldId(960), type: "text", label: "Projected Annual Savings ($)", required: false }
    ]
  },

  // TELECOM SECTOR TEMPLATES
  {
    id: "telecom-7",
    name: "Cell Tower Lease Agreement",
    description: "Cell tower site lease negotiation and agreement form",
    category: "legal",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "Site details, lease terms, rental rates, maintenance responsibilities",
    fields: [
      { id: generateFieldId(961), type: "text", label: "Property Owner Name", required: true },
      { id: generateFieldId(962), type: "textarea", label: "Property Address", required: true },
      { id: generateFieldId(963), type: "text", label: "Lease Area (sq ft)", required: true },
      { id: generateFieldId(964), type: "text", label: "Monthly Rental Rate ($)", required: true },
      { id: generateFieldId(965), type: "text", label: "Lease Term (years)", required: true },
      { id: generateFieldId(966), type: "text", label: "Annual Escalation (%)", required: false },
      { id: generateFieldId(967), type: "checkbox", label: "Included Utilities", required: false, options: ["Electricity", "Internet", "Road Access", "Security", "Maintenance"] },
      { id: generateFieldId(968), type: "radio", label: "Exclusivity Clause?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(969), type: "textarea", label: "Special Terms", required: false }
    ]
  },

  {
    id: "telecom-8",
    name: "Network Performance Monitoring",
    description: "Telecommunications network performance tracking and analysis",
    category: "operations",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Performance metrics, service quality, issue identification, optimization",
    fields: [
      { id: generateFieldId(970), type: "text", label: "Network Region", required: true },
      { id: generateFieldId(971), type: "date", label: "Monitoring Period", required: true },
      { id: generateFieldId(972), type: "text", label: "Average Call Success Rate (%)", required: true },
      { id: generateFieldId(973), type: "text", label: "Average Data Throughput (Mbps)", required: true },
      { id: generateFieldId(974), type: "text", label: "Network Latency (ms)", required: true },
      { id: generateFieldId(975), type: "text", label: "Customer Complaints", required: true },
      { id: generateFieldId(976), type: "checkbox", label: "Performance Issues", required: false, options: ["Coverage Gaps", "Capacity Constraints", "Equipment Failures", "Interference", "Backhaul Issues"] },
      { id: generateFieldId(977), type: "textarea", label: "Optimization Recommendations", required: false },
      { id: generateFieldId(978), type: "rating", label: "Overall Network Quality", required: true }
    ]
  },

  {
    id: "telecom-9",
    name: "Telecom Regulatory Filing",
    description: "Regulatory compliance filing for telecommunications authorities",
    category: "compliance",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "License details, service metrics, compliance status, filing requirements",
    fields: [
      { id: generateFieldId(979), type: "text", label: "License Number", required: true },
      { id: generateFieldId(980), type: "select", label: "Filing Type", required: true, options: ["Annual Report", "Quarterly Update", "Service Launch", "License Renewal", "Incident Report"] },
      { id: generateFieldId(981), type: "date", label: "Filing Deadline", required: true },
      { id: generateFieldId(982), type: "text", label: "Total Subscribers", required: true },
      { id: generateFieldId(983), type: "text", label: "Network Coverage (%)", required: true },
      { id: generateFieldId(984), type: "text", label: "Quality of Service Score", required: true },
      { id: generateFieldId(985), type: "checkbox", label: "Compliance Areas", required: true, options: ["Consumer Protection", "Network Security", "Emergency Services", "Universal Access", "Competition"] },
      { id: generateFieldId(986), type: "radio", label: "All Requirements Met?", required: true, options: ["Yes", "No", "Partially"] },
      { id: generateFieldId(987), type: "textarea", label: "Non-compliance Issues", required: false }
    ]
  },

  // STARTUP SECTOR TEMPLATES
  {
    id: "startup-6",
    name: "Startup Milestone Tracking",
    description: "Key milestone achievement and progress tracking for startups",
    category: "project",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Milestone targets, completion status, metrics, investor updates",
    fields: [
      { id: generateFieldId(988), type: "text", label: "Milestone Name", required: true },
      { id: generateFieldId(989), type: "date", label: "Target Date", required: true },
      { id: generateFieldId(990), type: "select", label: "Milestone Category", required: true, options: ["Product Development", "Revenue", "User Growth", "Funding", "Team Building", "Market Expansion"] },
      { id: generateFieldId(991), type: "text", label: "Target Metric", required: true },
      { id: generateFieldId(992), type: "text", label: "Current Status", required: true },
      { id: generateFieldId(993), type: "select", label: "Completion Status", required: true, options: ["Not Started", "In Progress", "Completed", "Delayed", "At Risk"] },
      { id: generateFieldId(994), type: "textarea", label: "Key Challenges", required: false },
      { id: generateFieldId(995), type: "textarea", label: "Next Steps", required: true },
      { id: generateFieldId(996), type: "radio", label: "Investor Update Required?", required: true, options: ["Yes", "No"] }
    ]
  },

  {
    id: "startup-7",
    name: "Technology Stack Assessment",
    description: "Startup technology infrastructure and development stack evaluation",
    category: "it",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Technology choices, scalability, security, development efficiency",
    fields: [
      { id: generateFieldId(997), type: "checkbox", label: "Frontend Technologies", required: true, options: ["React", "Vue", "Angular", "JavaScript", "TypeScript", "Native Mobile"] },
      { id: generateFieldId(998), type: "checkbox", label: "Backend Technologies", required: true, options: ["Node.js", "Python", "Java", "PHP", "Ruby", "Go", ".NET"] },
      { id: generateFieldId(999), type: "checkbox", label: "Database Systems", required: true, options: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Firebase"] },
      { id: generateFieldId(1000), type: "checkbox", label: "Cloud Platforms", required: true, options: ["AWS", "Google Cloud", "Azure", "Heroku", "Vercel", "Digital Ocean"] },
      { id: generateFieldId(1001), type: "rating", label: "Scalability Rating", required: true },
      { id: generateFieldId(1002), type: "rating", label: "Security Level", required: true },
      { id: generateFieldId(1003), type: "text", label: "Monthly Infrastructure Cost ($)", required: false },
      { id: generateFieldId(1004), type: "textarea", label: "Technical Debt Issues", required: false },
      { id: generateFieldId(1005), type: "textarea", label: "Upgrade Recommendations", required: false }
    ]
  },

  {
    id: "startup-8",
    name: "Customer Discovery Interview",
    description: "Structured customer interview for product validation and market research",
    category: "survey",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Customer problems, solution validation, pricing sensitivity, feature feedback",
    fields: [
      { id: generateFieldId(1006), type: "text", label: "Interviewee Name", required: false },
      { id: generateFieldId(1007), type: "text", label: "Company/Role", required: false },
      { id: generateFieldId(1008), type: "date", label: "Interview Date", required: true },
      { id: generateFieldId(1009), type: "textarea", label: "Current Challenges/Pain Points", required: true },
      { id: generateFieldId(1010), type: "textarea", label: "Current Solutions Used", required: true },
      { id: generateFieldId(1011), type: "rating", label: "Problem Severity (1-10)", required: true },
      { id: generateFieldId(1012), type: "textarea", label: "Reaction to Proposed Solution", required: true },
      { id: generateFieldId(1013), type: "text", label: "Willingness to Pay ($)", required: false },
      { id: generateFieldId(1014), type: "textarea", label: "Feature Requests", required: false },
      { id: generateFieldId(1015), type: "radio", label: "Likelihood to Use Product", required: true, options: ["Definitely", "Probably", "Maybe", "Probably Not", "Definitely Not"] }
    ]
  },

  // SME SECTOR TEMPLATES
  {
    id: "sme-6",
    name: "Small Business Marketing Plan",
    description: "Comprehensive marketing strategy and campaign planning for SMEs",
    category: "marketing",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Target market, marketing channels, budget allocation, success metrics",
    fields: [
      { id: generateFieldId(1016), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(1017), type: "textarea", label: "Target Customer Profile", required: true },
      { id: generateFieldId(1018), type: "text", label: "Marketing Budget ($)", required: true },
      { id: generateFieldId(1019), type: "checkbox", label: "Marketing Channels", required: true, options: ["Social Media", "Email Marketing", "Google Ads", "Print Advertising", "Radio/TV", "Events", "Referrals"] },
      { id: generateFieldId(1020), type: "textarea", label: "Key Messages", required: true },
      { id: generateFieldId(1021), type: "text", label: "Campaign Duration", required: true },
      { id: generateFieldId(1022), type: "checkbox", label: "Success Metrics", required: true, options: ["Website Traffic", "Lead Generation", "Sales Revenue", "Brand Awareness", "Customer Acquisition"] },
      { id: generateFieldId(1023), type: "textarea", label: "Competitive Advantage", required: true },
      { id: generateFieldId(1024), type: "date", label: "Campaign Launch Date", required: true }
    ]
  },

  {
    id: "sme-7",
    name: "Small Business HR Policy Template",
    description: "Human resources policy development for small businesses",
    category: "hr",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Employment policies, benefits, procedures, compliance requirements",
    fields: [
      { id: generateFieldId(1025), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(1026), type: "text", label: "Number of Employees", required: true },
      { id: generateFieldId(1027), type: "checkbox", label: "HR Policies Needed", required: true, options: ["Hiring Procedures", "Anti-Harassment", "Time Off", "Performance Reviews", "Disciplinary Actions", "Termination"] },
      { id: generateFieldId(1028), type: "checkbox", label: "Benefits Offered", required: false, options: ["Health Insurance", "Retirement Plan", "Paid Time Off", "Flexible Schedule", "Professional Development"] },
      { id: generateFieldId(1029), type: "radio", label: "Employee Handbook Exists?", required: true, options: ["Yes", "No", "Outdated"] },
      { id: generateFieldId(1030), type: "textarea", label: "Current HR Challenges", required: false },
      { id: generateFieldId(1031), type: "radio", label: "HR Compliance Training Needed?", required: true, options: ["Yes", "No", "Unsure"] },
      { id: generateFieldId(1032), type: "date", label: "Policy Implementation Date", required: true }
    ]
  },

  {
    id: "sme-8",
    name: "Small Business Financial Health Check",
    description: "Comprehensive financial assessment for small business owners",
    category: "finance",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Cash flow analysis, profitability, debt management, growth planning",
    fields: [
      { id: generateFieldId(1033), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(1034), type: "text", label: "Years in Operation", required: true },
      { id: generateFieldId(1035), type: "text", label: "Monthly Revenue ($)", required: true },
      { id: generateFieldId(1036), type: "text", label: "Monthly Expenses ($)", required: true },
      { id: generateFieldId(1037), type: "text", label: "Cash on Hand ($)", required: true },
      { id: generateFieldId(1038), type: "text", label: "Outstanding Debt ($)", required: true },
      { id: generateFieldId(1039), type: "radio", label: "Profitable?", required: true, options: ["Yes", "No", "Break-even"] },
      { id: generateFieldId(1040), type: "checkbox", label: "Financial Concerns", required: false, options: ["Cash Flow", "Customer Payments", "Seasonal Fluctuations", "Competition", "Rising Costs"] },
      { id: generateFieldId(1041), type: "textarea", label: "Growth Plans", required: false },
      { id: generateFieldId(1042), type: "radio", label: "Financial Advisor Needed?", required: false, options: ["Yes", "No", "Maybe"] }
    ]
  },

  // NEW UNIQUE SECTOR-SPECIFIC TEMPLATES

  // TELECOM - 5G Network Deployment
  {
    id: "telecom-new-1",
    name: "5G Network Site Deployment",
    description: "Assessment and planning for 5G cell site installation",
    category: "project", 
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Site survey, regulatory approvals, equipment specs, community impact",
    fields: [
      { id: generateFieldId(1050), type: "text", label: "Site Location", required: true },
      { id: generateFieldId(1051), type: "select", label: "Deployment Type", required: true, options: ["Macro Cell", "Small Cell", "Indoor DAS", "mmWave"] },
      { id: generateFieldId(1052), type: "number", label: "Coverage Radius (meters)", required: true },
      { id: generateFieldId(1053), type: "checkbox", label: "Regulatory Requirements", required: true, options: ["FCC Compliance", "Local Zoning", "Environmental Review", "Historic Preservation"] },
      { id: generateFieldId(1054), type: "textarea", label: "Community Concerns", required: false },
      { id: generateFieldId(1055), type: "date", label: "Target Activation Date", required: true }
    ]
  },

  // HEALTH - Clinical Trial Protocol
  {
    id: "health-new-1", 
    name: "Clinical Trial Patient Screening",
    description: "Pre-screening assessment for clinical trial participants",
    category: "assessment",
    sector: "health",
    targetAudience: ["external"],
    preview: "Medical history, eligibility criteria, informed consent, safety considerations",
    fields: [
      { id: generateFieldId(1056), type: "text", label: "Patient ID", required: true },
      { id: generateFieldId(1057), type: "select", label: "Study Phase", required: true, options: ["Phase I", "Phase II", "Phase III", "Phase IV"] },
      { id: generateFieldId(1058), type: "number", label: "Age", required: true },
      { id: generateFieldId(1059), type: "checkbox", label: "Inclusion Criteria Met", required: true, options: ["Age Range", "Diagnosis", "Disease Stage", "Previous Treatment"] },
      { id: generateFieldId(1060), type: "checkbox", label: "Exclusion Criteria", required: true, options: ["Pregnancy", "Other Medications", "Chronic Conditions", "Recent Procedures"] },
      { id: generateFieldId(1061), type: "radio", label: "Informed Consent Obtained", required: true, options: ["Yes", "No", "Pending"] }
    ]
  },

  // STARTUPS - Accelerator Application
  {
    id: "startup-new-1",
    name: "Startup Accelerator Application", 
    description: "Application form for startup accelerator program admission",
    category: "business",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Business model, team background, market analysis, funding needs",
    fields: [
      { id: generateFieldId(1062), type: "text", label: "Startup Name", required: true },
      { id: generateFieldId(1063), type: "select", label: "Industry Vertical", required: true, options: ["FinTech", "HealthTech", "EdTech", "CleanTech", "AI/ML", "Blockchain", "IoT", "Other"] },
      { id: generateFieldId(1064), type: "textarea", label: "Problem Statement", required: true },
      { id: generateFieldId(1065), type: "textarea", label: "Solution Description", required: true },
      { id: generateFieldId(1066), type: "select", label: "Development Stage", required: true, options: ["Idea", "Prototype", "MVP", "Early Revenue", "Scaling"] },
      { id: generateFieldId(1067), type: "number", label: "Team Size", required: true },
      { id: generateFieldId(1068), type: "text", label: "Funding Sought", required: true }
    ]
  },

  // INSURANCE - Catastrophe Claims
  {
    id: "ins-new-1",
    name: "Catastrophic Event Claims Processing",
    description: "Large-scale disaster insurance claims assessment",
    category: "claims",
    sector: "insurance", 
    targetAudience: ["external"],
    preview: "Event details, property damage, business interruption, emergency response",
    fields: [
      { id: generateFieldId(1069), type: "select", label: "Catastrophe Type", required: true, options: ["Hurricane", "Earthquake", "Wildfire", "Flood", "Tornado", "Hail Storm"] },
      { id: generateFieldId(1070), type: "date", label: "Event Date", required: true },
      { id: generateFieldId(1071), type: "text", label: "Property Address", required: true },
      { id: generateFieldId(1072), type: "select", label: "Damage Severity", required: true, options: ["Minor", "Moderate", "Major", "Total Loss"] },
      { id: generateFieldId(1073), type: "checkbox", label: "Affected Areas", required: true, options: ["Structure", "Contents", "Landscaping", "Vehicles", "Outbuildings"] },
      { id: generateFieldId(1074), type: "number", label: "Estimated Damage Amount", required: true },
      { id: generateFieldId(1075), type: "radio", label: "Emergency Services Required", required: true, options: ["Yes", "No", "Already Provided"] }
    ]
  },

  // ENERGY - Smart Grid Integration  
  {
    id: "energy-new-1",
    name: "Smart Grid Technology Integration",
    description: "Assessment for smart grid infrastructure deployment",
    category: "project",
    sector: "energy",
    targetAudience: ["internal"],
    preview: "Grid modernization, IoT sensors, data analytics, customer engagement",
    fields: [
      { id: generateFieldId(1076), type: "text", label: "Grid Segment", required: true },
      { id: generateFieldId(1077), type: "checkbox", label: "Technologies to Deploy", required: true, options: ["Smart Meters", "Distribution Automation", "Energy Storage", "Demand Response", "Grid Analytics"] },
      { id: generateFieldId(1078), type: "number", label: "Customers Affected", required: true },
      { id: generateFieldId(1079), type: "text", label: "Investment Amount", required: true },
      { id: generateFieldId(1080), type: "textarea", label: "Expected Benefits", required: true },
      { id: generateFieldId(1081), type: "select", label: "Implementation Timeline", required: true, options: ["3-6 months", "6-12 months", "1-2 years", "2+ years"] }
    ]
  },

  // SME - Digital Marketing Assessment
  {
    id: "sme-new-1", 
    name: "Digital Marketing Readiness Assessment",
    description: "Small business digital marketing capabilities evaluation",
    category: "marketing",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Online presence, social media, email marketing, analytics capabilities",
    fields: [
      { id: generateFieldId(1082), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(1083), type: "select", label: "Industry Type", required: true, options: ["Retail", "Service", "Manufacturing", "Technology", "Healthcare", "Restaurant", "Other"] },
      { id: generateFieldId(1084), type: "radio", label: "Have Website?", required: true, options: ["Yes", "No", "Under Development"] },
      { id: generateFieldId(1085), type: "checkbox", label: "Social Media Presence", required: false, options: ["Facebook", "Instagram", "Twitter", "LinkedIn", "TikTok", "YouTube"] },
      { id: generateFieldId(1086), type: "select", label: "Email Marketing", required: true, options: ["Active", "Inactive", "Never Used", "Planning to Start"] },
      { id: generateFieldId(1087), type: "number", label: "Monthly Marketing Budget", required: false },
      { id: generateFieldId(1088), type: "textarea", label: "Marketing Challenges", required: true }
    ]
  },

  // FINTECH - Blockchain Implementation
  {
    id: "fin-new-1",
    name: "Blockchain Technology Implementation", 
    description: "Assessment for blockchain solution deployment in financial services",
    category: "project",
    sector: "fintech",
    targetAudience: ["internal"],
    preview: "Use case definition, technology selection, regulatory compliance, integration planning",
    fields: [
      { id: generateFieldId(1089), type: "select", label: "Use Case", required: true, options: ["Payments", "Trade Finance", "Identity Verification", "Smart Contracts", "Asset Tokenization", "Supply Chain"] },
      { id: generateFieldId(1090), type: "select", label: "Blockchain Type", required: true, options: ["Public", "Private", "Consortium", "Hybrid"] },
      { id: generateFieldId(1091), type: "checkbox", label: "Technical Requirements", required: true, options: ["High Throughput", "Low Latency", "Privacy", "Interoperability", "Energy Efficiency"] },
      { id: generateFieldId(1092), type: "textarea", label: "Regulatory Considerations", required: true },
      { id: generateFieldId(1093), type: "select", label: "Implementation Phase", required: true, options: ["Proof of Concept", "Pilot", "Production", "Scale-up"] },
      { id: generateFieldId(1094), type: "text", label: "Expected Timeline", required: true }
    ]
  },

  // GOVERNMENT - Citizen Engagement Platform
  {
    id: "gov-new-1",
    name: "Digital Citizen Engagement Platform",
    description: "Platform assessment for citizen participation and feedback systems",
    category: "project", 
    sector: "government",
    targetAudience: ["internal"],
    preview: "Community needs, engagement methods, technology requirements, accessibility features",
    fields: [
      { id: generateFieldId(1095), type: "text", label: "Municipality/Agency", required: true },
      { id: generateFieldId(1096), type: "number", label: "Population Served", required: true },
      { id: generateFieldId(1097), type: "checkbox", label: "Engagement Goals", required: true, options: ["Public Consultations", "Budget Participation", "Service Feedback", "Community Reporting", "Town Halls"] },
      { id: generateFieldId(1098), type: "select", label: "Digital Literacy Level", required: true, options: ["Low", "Medium", "High", "Mixed"] },
      { id: generateFieldId(1099), type: "checkbox", label: "Accessibility Requirements", required: true, options: ["Screen Readers", "Multiple Languages", "Mobile Friendly", "Offline Access", "Simple Navigation"] },
      { id: generateFieldId(1100), type: "textarea", label: "Success Metrics", required: true }
    ]
  },

  // ADDITIONAL UNIQUE FORMS FOR ALL SECTORS

  // GOVERNMENT SECTOR - Citizen Services
  {
    id: "gov-new-2",
    name: "Permit Application Processing",
    description: "Comprehensive permit application for construction and business permits",
    category: "legal",
    sector: "government",
    targetAudience: ["external"],
    preview: "Permit type, property details, compliance requirements, fee calculation",
    fields: [
      { id: generateFieldId(1101), type: "select", label: "Permit Type", required: true, options: ["Building Permit", "Business License", "Zoning Variance", "Special Event", "Demolition", "Sign Permit"] },
      { id: generateFieldId(1102), type: "text", label: "Property Address", required: true },
      { id: generateFieldId(1103), type: "text", label: "Applicant Name", required: true },
      { id: generateFieldId(1104), type: "text", label: "Project Description", required: true },
      { id: generateFieldId(1105), type: "text", label: "Estimated Value", required: true },
      { id: generateFieldId(1106), type: "date", label: "Proposed Start Date", required: true },
      { id: generateFieldId(1107), type: "textarea", label: "Environmental Considerations", required: false },
      { id: generateFieldId(1108), type: "checkbox", label: "Required Documentation", required: true, options: ["Site Plans", "Financial Records", "Insurance Certificate", "Environmental Assessment"] }
    ]
  },

  // INSURANCE SECTOR - Claims Processing  
  {
    id: "ins-new-2",
    name: "Auto Insurance Claim Filing",
    description: "Comprehensive automobile insurance claim submission form",
    category: "claims",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Accident details, vehicle information, damage assessment, police report",
    fields: [
      { id: generateFieldId(1109), type: "text", label: "Policy Number", required: true },
      { id: generateFieldId(1110), type: "date", label: "Date of Incident", required: true },
      { id: generateFieldId(1111), type: "text", label: "Location of Incident", required: true },
      { id: generateFieldId(1112), type: "textarea", label: "Description of Incident", required: true },
      { id: generateFieldId(1113), type: "text", label: "Vehicle Make/Model/Year", required: true },
      { id: generateFieldId(1114), type: "radio", label: "Police Report Filed", required: true, options: ["Yes", "No", "Unknown"] },
      { id: generateFieldId(1115), type: "checkbox", label: "Damage Areas", required: true, options: ["Front End", "Rear End", "Driver Side", "Passenger Side", "Roof", "Interior"] },
      { id: generateFieldId(1116), type: "select", label: "Estimated Repair Cost", required: true, options: ["Under $1,000", "$1,000-$5,000", "$5,000-$15,000", "Over $15,000", "Total Loss"] }
    ]
  },

  // FINTECH SECTOR - Compliance
  {
    id: "fin-new-4",
    name: "Anti-Money Laundering Transaction Monitoring",
    description: "Suspicious transaction activity reporting for AML compliance",
    category: "compliance",
    sector: "fintech",
    targetAudience: ["internal"],
    preview: "Transaction details, risk indicators, investigation notes, regulatory reporting",
    fields: [
      { id: generateFieldId(1117), type: "text", label: "Transaction ID", required: true },
      { id: generateFieldId(1118), type: "text", label: "Customer ID", required: true },
      { id: generateFieldId(1119), type: "text", label: "Transaction Amount", required: true },
      { id: generateFieldId(1120), type: "date", label: "Transaction Date", required: true },
      { id: generateFieldId(1121), type: "checkbox", label: "Suspicious Indicators", required: true, options: ["Unusual Amount", "Frequent Transactions", "Round Numbers", "Geographical Risk", "Customer Behavior Change"] },
      { id: generateFieldId(1122), type: "textarea", label: "Investigation Notes", required: true },
      { id: generateFieldId(1123), type: "select", label: "Risk Level", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { id: generateFieldId(1124), type: "radio", label: "SAR Filing Required", required: true, options: ["Yes", "No", "Under Review"] }
    ]
  },

  // HEALTH SECTOR - Patient Care
  {
    id: "health-new-2",
    name: "Telemedicine Consultation Setup",
    description: "Patient registration and setup for telehealth appointments",
    category: "customer",
    sector: "health",
    targetAudience: ["external"],
    preview: "Technology requirements, medical history, consent forms, scheduling preferences",
    fields: [
      { id: generateFieldId(1125), type: "text", label: "Patient Name", required: true },
      { id: generateFieldId(1126), type: "date", label: "Date of Birth", required: true },
      { id: generateFieldId(1127), type: "text", label: "Preferred Consultation Date/Time", required: true },
      { id: generateFieldId(1128), type: "select", label: "Consultation Type", required: true, options: ["Follow-up", "New Patient", "Urgent Care", "Mental Health", "Specialist Referral"] },
      { id: generateFieldId(1129), type: "checkbox", label: "Technology Available", required: true, options: ["Smartphone", "Tablet", "Computer", "High-speed Internet", "Camera", "Microphone"] },
      { id: generateFieldId(1130), type: "textarea", label: "Chief Complaint", required: true },
      { id: generateFieldId(1131), type: "radio", label: "Previous Telemedicine Experience", required: true, options: ["Yes", "No", "Limited"] },
      { id: generateFieldId(1132), type: "checkbox", label: "Consent Acknowledgments", required: true, options: ["Privacy Policy", "Technology Limitations", "Emergency Procedures", "Recording Consent"] }
    ]
  },

  // ENERGY SECTOR - Operations
  {
    id: "energy-new-2",
    name: "Power Plant Maintenance Scheduling",
    description: "Preventive and corrective maintenance planning for power generation facilities",
    category: "operations",
    sector: "energy",
    targetAudience: ["internal"],
    preview: "Equipment details, maintenance type, scheduling constraints, resource requirements",
    fields: [
      { id: generateFieldId(1133), type: "text", label: "Equipment/Unit ID", required: true },
      { id: generateFieldId(1134), type: "select", label: "Facility Type", required: true, options: ["Natural Gas", "Coal", "Nuclear", "Hydroelectric", "Solar", "Wind", "Biomass"] },
      { id: generateFieldId(1135), type: "select", label: "Maintenance Type", required: true, options: ["Preventive", "Corrective", "Emergency", "Predictive", "Overhaul"] },
      { id: generateFieldId(1136), type: "date", label: "Proposed Start Date", required: true },
      { id: generateFieldId(1137), type: "number", label: "Estimated Duration (hours)", required: true },
      { id: generateFieldId(1138), type: "text", label: "Required Outage Capacity (MW)", required: true },
      { id: generateFieldId(1139), type: "textarea", label: "Work Description", required: true },
      { id: generateFieldId(1140), type: "checkbox", label: "Resource Requirements", required: true, options: ["Specialized Contractors", "Heavy Equipment", "Safety Permits", "Environmental Clearance"] }
    ]
  },

  // TELECOM SECTOR - Network Management
  {
    id: "telecom-new-3", 
    name: "Network Capacity Planning Request",
    description: "Telecommunications network capacity analysis and expansion planning",
    category: "project",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Traffic analysis, growth projections, infrastructure requirements, investment planning",
    fields: [
      { id: generateFieldId(1141), type: "text", label: "Network Region/Market", required: true },
      { id: generateFieldId(1142), type: "select", label: "Network Layer", required: true, options: ["Core Network", "Metro Network", "Access Network", "Backhaul", "Edge Computing"] },
      { id: generateFieldId(1143), type: "text", label: "Current Utilization (%)", required: true },
      { id: generateFieldId(1144), type: "text", label: "Projected Growth (%)", required: true },
      { id: generateFieldId(1145), type: "date", label: "Capacity Threshold Date", required: true },
      { id: generateFieldId(1146), type: "textarea", label: "Traffic Drivers", required: true },
      { id: generateFieldId(1147), type: "select", label: "Proposed Solution", required: true, options: ["Add Capacity", "New Technology", "Traffic Engineering", "Alternative Routing", "Service Migration"] },
      { id: generateFieldId(1148), type: "text", label: "Estimated Investment", required: true }
    ]
  },

  // STARTUPS SECTOR - Funding
  {
    id: "startup-new-2",
    name: "Venture Capital Pitch Deck Submission",
    description: "Comprehensive startup funding application for venture capital investment",
    category: "business",
    sector: "startups", 
    targetAudience: ["external"],
    preview: "Business model, market analysis, financial projections, team credentials",
    fields: [
      { id: generateFieldId(1149), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(1150), type: "select", label: "Funding Stage", required: true, options: ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Bridge Round"] },
      { id: generateFieldId(1151), type: "text", label: "Funding Amount Sought", required: true },
      { id: generateFieldId(1152), type: "select", label: "Industry Sector", required: true, options: ["SaaS", "E-commerce", "FinTech", "HealthTech", "EdTech", "AI/ML", "Blockchain", "IoT", "CleanTech"] },
      { id: generateFieldId(1153), type: "textarea", label: "Problem Statement", required: true },
      { id: generateFieldId(1154), type: "textarea", label: "Solution Description", required: true },
      { id: generateFieldId(1155), type: "text", label: "Total Addressable Market", required: true },
      { id: generateFieldId(1156), type: "text", label: "Current Monthly Revenue", required: false },
      { id: generateFieldId(1157), type: "text", label: "Customer Acquisition Cost", required: false }
    ]
  },

  // SME SECTOR - Business Operations
  {
    id: "sme-new-3",
    name: "Small Business Tax Preparation Checklist",
    description: "Comprehensive tax document collection and preparation for small businesses",
    category: "finance",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Financial documents, deductions, business expenses, compliance requirements",
    fields: [
      { id: generateFieldId(1158), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(1159), type: "select", label: "Business Entity Type", required: true, options: ["Sole Proprietorship", "Partnership", "LLC", "S-Corp", "C-Corp"] },
      { id: generateFieldId(1160), type: "text", label: "Tax Year", required: true },
      { id: generateFieldId(1161), type: "text", label: "Gross Revenue", required: true },
      { id: generateFieldId(1162), type: "checkbox", label: "Available Financial Documents", required: true, options: ["Profit & Loss Statement", "Balance Sheet", "Bank Statements", "Receipts", "1099s", "W-2s"] },
      { id: generateFieldId(1163), type: "checkbox", label: "Business Deductions", required: false, options: ["Home Office", "Vehicle Expenses", "Travel", "Equipment", "Professional Services", "Marketing"] },
      { id: generateFieldId(1164), type: "textarea", label: "Special Circumstances", required: false },
      { id: generateFieldId(1165), type: "date", label: "Preferred Completion Date", required: true }
    ]
  },

  // CROSS-SECTOR - Innovation
  {
    id: "cross-new-1",
    name: "Innovation Project Proposal",
    description: "New technology or process innovation proposal for any organization",
    category: "project",
    targetAudience: ["internal"],
    preview: "Innovation concept, feasibility analysis, resource requirements, expected impact",
    fields: [
      { id: generateFieldId(1166), type: "text", label: "Innovation Title", required: true },
      { id: generateFieldId(1167), type: "select", label: "Innovation Type", required: true, options: ["Product Innovation", "Process Innovation", "Service Innovation", "Technology Innovation", "Business Model Innovation"] },
      { id: generateFieldId(1168), type: "textarea", label: "Current Challenge/Opportunity", required: true },
      { id: generateFieldId(1169), type: "textarea", label: "Proposed Solution", required: true },
      { id: generateFieldId(1170), type: "select", label: "Development Stage", required: true, options: ["Concept", "Research", "Prototype", "Pilot", "Implementation"] },
      { id: generateFieldId(1171), type: "text", label: "Estimated Development Cost", required: true },
      { id: generateFieldId(1172), type: "text", label: "Timeline to Market", required: true },
      { id: generateFieldId(1173), type: "textarea", label: "Expected Benefits", required: true },
      { id: generateFieldId(1174), type: "checkbox", label: "Required Resources", required: true, options: ["R&D Team", "External Partners", "Specialized Equipment", "Technology Licenses", "Regulatory Approval"] }
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  // Available categories and sectors for filtering templates
  const categories = ["all", "survey", "assessment", "registration", "feedback", "compliance", "risk", "vendor-risk", "external-assessment", "hr", "customer", "finance", "it", "security", "quality", "operations", "procurement", "marketing", "sales", "project", "training", "legal", "audit", "business"];
  const sectors = ["all", "government", "insurance", "fintech", "health", "energy", "telecom", "startups", "sme", "other"];

  /**
   * Filter templates based on search term and selected categories/sectors
   * Then sort sector-specific forms first, followed by general forms
   */
  const filteredTemplates = formTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(template.category);
    
    // Sector filtering logic
    let matchesSector = false;
    if (selectedSectors.length === 0) {
      // No sector filter applied - show all forms
      matchesSector = true;
    } else if (selectedSectors.includes("other")) {
      // "Other" sector selected - show forms with no sector, multiple sectors, or general forms
      if (!template.sector) {
        // General form (no sector specified)
        matchesSector = true;
      } else if (Array.isArray(template.sector) && template.sector.length > 1) {
        // Multi-sector form
        matchesSector = true;
      }
    } else {
      // Specific sector(s) selected - ONLY show forms that match those sectors exactly
      if (template.sector) {
        const templateSectors = Array.isArray(template.sector) ? template.sector : [template.sector];
        // Only match if it's a single-sector form matching the selected sector
        matchesSector = templateSectors.length === 1 && templateSectors.some(s => selectedSectors.includes(s));
      }
    }
    
    return matchesSearch && matchesCategory && matchesSector;
  }).sort((a, b) => {
    // When sector filtering is active, prioritize matching sector forms first
    if (selectedSectors.length > 0 && !selectedSectors.includes("other")) {
      const aMatchesSector = a.sector && (Array.isArray(a.sector) ? 
        a.sector.some(s => selectedSectors.includes(s)) : 
        selectedSectors.includes(a.sector));
      const bMatchesSector = b.sector && (Array.isArray(b.sector) ? 
        b.sector.some(s => selectedSectors.includes(s)) : 
        selectedSectors.includes(b.sector));
      
      // All displayed forms should match the sector, so just sort alphabetically
      return a.name.localeCompare(b.name);
    }
    
    // Default alphabetical sorting
    return a.name.localeCompare(b.name);
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
   * Get icon for specific sector types
   */
  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case 'government':
        return <Landmark className="h-3 w-3" />;
      case 'insurance':
        return <Shield className="h-3 w-3" />;
      case 'fintech':
        return <CreditCard className="h-3 w-3" />;
      case 'health':
        return <Stethoscope className="h-3 w-3" />;
      case 'energy':
        return <Zap className="h-3 w-3" />;
      case 'telecom':
        return <Smartphone className="h-3 w-3" />;
      case 'startups':
        return <Rocket className="h-3 w-3" />;
      case 'sme':
        return <Store className="h-3 w-3" />;
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
        <div className="flex gap-2">
          <MultiSelectFilter
            options={categories}
            selectedValues={selectedCategories}
            onSelectionChange={setSelectedCategories}
            placeholder="All Categories"
            showCounts={true}
            getCounts={(category) => {
              if (category === "all") return formTemplates.length;
              return formTemplates.filter(t => t.category === category).length;
            }}
          />
          <MultiSelectFilter
            options={sectors}
            selectedValues={selectedSectors}
            onSelectionChange={setSelectedSectors}
            placeholder="All Sectors"
            showCounts={true}
            getCounts={(sector) => {
              if (sector === "all") return formTemplates.length;
              return formTemplates.filter(t => 
                !t.sector ? false : // Don't count general forms in sector counts
                Array.isArray(t.sector) ? t.sector.includes(sector) : t.sector === sector
              ).length;
            }}
          />
        </div>
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
                     {template.sector && (
                       <div className="flex gap-1 flex-wrap">
                         {(Array.isArray(template.sector) ? template.sector : [template.sector]).map((sector) => (
                           <Badge key={sector} variant="outline" className="text-xs flex items-center gap-1">
                             {getSectorIcon(sector)}
                             {sector === "sme" ? "SME" : 
                              sector === "telecom" ? "Telecom" :
                              sector.charAt(0).toUpperCase() + sector.slice(1)}
                           </Badge>
                         ))}
                       </div>
                     )}
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
