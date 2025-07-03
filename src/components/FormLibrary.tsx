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
    category: "hr",
    sector: "other",
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
    sector: "other",
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
      }
    ]
  },

  // IT Vendor Security Assessment Template
  {
    id: "vra-2", 
    name: "IT Vendor Security Assessment",
    description: "Focused security and technology risk evaluation for IT service providers",
    category: "vendor-risk",
    sector: "other",
    targetAudience: ["vendor"],
    preview: "Technical security controls, data protection, and IT governance",
    riskCategories: ["Technical Security", "Data Protection", "Access Management", "Infrastructure"],
    scoringModel: "risk-matrix",
    fields: [
      { id: generateFieldId(32), type: "text", label: "Vendor Name", required: true },
      { id: generateFieldId(33), type: "text", label: "Service Type", required: true }
    ]
  },

  // Financial Services Vendor Assessment Template
  {
    id: "vra-3",
    name: "Financial Services Vendor Assessment", 
    description: "Specialized assessment for financial services vendors focusing on regulatory compliance",
    category: "vendor-risk",
    sector: "fintech",
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
      }
    ]
  },

  {
    id: "ins-1",
    name: "Insurance Claim Processing Form",
    description: "Insurance claim intake and processing documentation",
    category: "assessment",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Policy details, incident information, claim documentation",
    fields: [
      { id: generateFieldId(100), type: "text", label: "Policy Number", required: true },
      { id: generateFieldId(101), type: "text", label: "Policyholder Name", required: true },
      { id: generateFieldId(102), type: "date", label: "Incident Date", required: true },
      { id: generateFieldId(103), type: "textarea", label: "Incident Description", required: true },
      { id: generateFieldId(104), type: "select", label: "Claim Type", required: true, options: ["Auto", "Home", "Life", "Health", "Business"] },
      { id: generateFieldId(105), type: "text", label: "Estimated Loss Amount", required: true }
    ]
  },

  {
    id: "gov-1",
    name: "Government Service Request",
    description: "Citizen service request and application processing",
    category: "registration",
    sector: "government",
    targetAudience: ["external"],
    preview: "Service type, citizen information, supporting documents",
    fields: [
      { id: generateFieldId(110), type: "text", label: "Citizen ID", required: true },
      { id: generateFieldId(111), type: "text", label: "Full Name", required: true },
      { id: generateFieldId(112), type: "select", label: "Service Type", required: true, options: ["License Renewal", "Permit Application", "Document Request", "Complaint Filing"] },
      { id: generateFieldId(113), type: "textarea", label: "Request Details", required: true },
      { id: generateFieldId(114), type: "text", label: "Contact Phone", required: true }
    ]
  },

  {
    id: "energy-1",
    name: "Energy Efficiency Assessment",
    description: "Building energy consumption and efficiency evaluation",
    category: "assessment",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Building details, energy usage, efficiency recommendations",
    fields: [
      { id: generateFieldId(120), type: "text", label: "Building Address", required: true },
      { id: generateFieldId(121), type: "text", label: "Building Size (sq ft)", required: true },
      { id: generateFieldId(122), type: "select", label: "Building Type", required: true, options: ["Residential", "Commercial", "Industrial", "Mixed Use"] },
      { id: generateFieldId(123), type: "text", label: "Current Energy Usage (kWh)", required: true },
      { id: generateFieldId(124), type: "checkbox", label: "Energy Systems", required: true, options: ["HVAC", "Lighting", "Appliances", "Solar", "Other"] }
    ]
  },

  {
    id: "telecom-1",
    name: "Telecommunications Service Setup",
    description: "New telecommunications service installation and configuration",
    category: "registration",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "Service requirements, installation details, technical specifications",
    fields: [
      { id: generateFieldId(130), type: "text", label: "Customer Name", required: true },
      { id: generateFieldId(131), type: "text", label: "Service Address", required: true },
      { id: generateFieldId(132), type: "select", label: "Service Type", required: true, options: ["Internet", "Phone", "TV", "Bundle Package"] },
      { id: generateFieldId(133), type: "select", label: "Speed Requirements", required: true, options: ["Basic", "Standard", "Premium", "Enterprise"] },
      { id: generateFieldId(134), type: "date", label: "Preferred Installation Date", required: true }
    ]
  },

  {
    id: "startup-1",
    name: "Startup Funding Application",
    description: "Early-stage startup funding and investment application",
    category: "finance",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Business plan, financial projections, team information",
    fields: [
      { id: generateFieldId(140), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(141), type: "text", label: "Founder Name", required: true },
      { id: generateFieldId(142), type: "select", label: "Industry", required: true, options: ["Tech", "Fintech", "Health", "E-commerce", "Other"] },
      { id: generateFieldId(143), type: "text", label: "Funding Amount Requested", required: true },
      { id: generateFieldId(144), type: "textarea", label: "Business Description", required: true },
      { id: generateFieldId(145), type: "textarea", label: "Market Opportunity", required: true }
    ]
  },

  {
    id: "sme-1",
    name: "SME Loan Application",
    description: "Small and medium enterprise business loan application",
    category: "finance",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Business information, financial statements, loan requirements",
    fields: [
      { id: generateFieldId(150), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(151), type: "text", label: "Business Registration Number", required: true },
      { id: generateFieldId(152), type: "select", label: "Business Type", required: true, options: ["Manufacturing", "Retail", "Services", "Agriculture", "Technology"] },
      { id: generateFieldId(153), type: "text", label: "Annual Revenue", required: true },
      { id: generateFieldId(154), type: "text", label: "Loan Amount", required: true },
      { id: generateFieldId(155), type: "textarea", label: "Loan Purpose", required: true }
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
      { id: generateFieldId(160), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(161), type: "checkbox", label: "Operating Sectors", required: true, options: ["Government", "Financial Services", "Healthcare", "Energy", "Telecommunications", "Other"] },
      { id: generateFieldId(162), type: "checkbox", label: "Applicable Regulations", required: true, options: ["GDPR", "HIPAA", "SOX", "PCI DSS", "SOC 2", "ISO 27001", "NIST"] },
      { id: generateFieldId(163), type: "textarea", label: "Current Compliance Status", required: true },
      { id: generateFieldId(164), type: "textarea", label: "Identified Gaps", required: false },
      { id: generateFieldId(165), type: "textarea", label: "Remediation Plan", required: true }
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
      { id: generateFieldId(170), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(171), type: "checkbox", label: "Types of Personal Data", required: true, options: ["Basic Identity", "Financial", "Health", "Biometric", "Location", "Behavioral"] },
      { id: generateFieldId(172), type: "checkbox", label: "Processing Activities", required: true, options: ["Collection", "Storage", "Analysis", "Sharing", "Transfer", "Deletion"] },
      { id: generateFieldId(173), type: "select", label: "Data Volume", required: true, options: ["Low (<1000 records)", "Medium (1000-10000)", "High (10000-100000)", "Very High (>100000)"] },
      { id: generateFieldId(174), type: "textarea", label: "Risk Assessment", required: true },
      { id: generateFieldId(175), type: "textarea", label: "Mitigation Measures", required: true }
    ]
  },

  {
    id: "general-1",
    name: "Customer Registration",
    description: "New customer account setup and information collection",
    category: "registration",
    sector: "other",
    targetAudience: ["external"],
    preview: "Company details, contact information, service requirements",
    fields: [
      { id: generateFieldId(180), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(181), type: "text", label: "Primary Contact", required: true },
      { id: generateFieldId(182), type: "email", label: "Business Email", required: true },
      { id: generateFieldId(183), type: "text", label: "Phone Number", required: true },
      { id: generateFieldId(184), type: "textarea", label: "Company Address", required: true },
      { id: generateFieldId(185), type: "select", label: "Industry", required: true, options: ["Technology", "Healthcare", "Finance", "Manufacturing", "Retail", "Education", "Government", "Other"] },
      { id: generateFieldId(186), type: "select", label: "Company Size", required: true, options: ["1-10", "11-50", "51-200", "201-1000", "1000+"] },
      { id: generateFieldId(187), type: "checkbox", label: "Services Interested In", required: true, options: ["Consulting", "Software Development", "Support", "Training", "Integration"] }
    ]
  },

  {
    id: "general-2",
    name: "Service Request",
    description: "Customer service request and support ticket",
    category: "customer",
    sector: "other",
    targetAudience: ["external"],
    preview: "Issue description, priority, contact details",
    fields: [
      { id: generateFieldId(190), type: "text", label: "Customer Name", required: true },
      { id: generateFieldId(191), type: "email", label: "Contact Email", required: true },
      { id: generateFieldId(192), type: "select", label: "Request Type", required: true, options: ["Technical Support", "Account Issue", "Billing Inquiry", "Feature Request", "Bug Report", "General Question"] },
      { id: generateFieldId(193), type: "select", label: "Priority", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { id: generateFieldId(194), type: "textarea", label: "Issue Description", required: true },
      { id: generateFieldId(195), type: "textarea", label: "Steps to Reproduce", required: false },
      { id: generateFieldId(196), type: "text", label: "Preferred Contact Method", required: false }
    ]
  },

  {
    id: "general-3",
    name: "Product Feedback",
    description: "Customer feedback on products and services",
    category: "feedback",
    sector: "other",
    targetAudience: ["external"],
    preview: "Product experience, ratings, improvement suggestions",
    fields: [
      { id: generateFieldId(200), type: "text", label: "Product/Service", required: true },
      { id: generateFieldId(201), type: "rating", label: "Overall Satisfaction", required: true },
      { id: generateFieldId(202), type: "rating", label: "Ease of Use", required: true },
      { id: generateFieldId(203), type: "rating", label: "Value for Money", required: true },
      { id: generateFieldId(204), type: "textarea", label: "What Do You Like Most?", required: false },
      { id: generateFieldId(205), type: "textarea", label: "What Could Be Improved?", required: false },
      { id: generateFieldId(206), type: "radio", label: "Would You Recommend This Product?", required: true, options: ["Definitely", "Probably", "Not Sure", "Probably Not", "Definitely Not"] }
    ]
  },

  {
    id: "general-4",
    name: "Event Registration",
    description: "Registration form for events, webinars, and conferences",
    category: "registration",
    sector: "other",
    targetAudience: ["external"],
    preview: "Event details, attendee information, preferences",
    fields: [
      { id: generateFieldId(210), type: "text", label: "Full Name", required: true },
      { id: generateFieldId(211), type: "email", label: "Email Address", required: true },
      { id: generateFieldId(212), type: "text", label: "Job Title", required: true },
      { id: generateFieldId(213), type: "text", label: "Company", required: true },
      { id: generateFieldId(214), type: "select", label: "Event Session", required: true, options: ["Morning Session", "Afternoon Session", "Full Day", "Virtual Only"] },
      { id: generateFieldId(215), type: "checkbox", label: "Dietary Requirements", required: false, options: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "None"] },
      { id: generateFieldId(216), type: "textarea", label: "Special Requirements", required: false }
    ]
  },

  {
    id: "compliance-1",
    name: "GDPR Data Processing Agreement",
    description: "GDPR compliance assessment for data processors",
    category: "compliance",
    sector: ["government", "fintech", "health"],
    targetAudience: ["vendor", "external"],
    preview: "Data protection measures, processing activities, compliance status",
    fields: [
      { id: generateFieldId(220), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(221), type: "textarea", label: "Data Processing Activities", required: true },
      { id: generateFieldId(222), type: "checkbox", label: "Types of Personal Data", required: true, options: ["Contact Information", "Financial Data", "Health Data", "Biometric Data", "Special Categories"] },
      { id: generateFieldId(223), type: "radio", label: "Data Protection Officer Appointed?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(224), type: "radio", label: "Data Breach Notification Procedure?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(225), type: "textarea", label: "Technical Security Measures", required: true },
      { id: generateFieldId(226), type: "textarea", label: "Organizational Security Measures", required: true }
    ]
  },

  {
    id: "security-1",
    name: "Security Incident Report",
    description: "Report security incidents and breaches",
    category: "security",
    sector: "other",
    targetAudience: ["internal"],
    preview: "Incident details, impact assessment, response actions",
    fields: [
      { id: generateFieldId(230), type: "text", label: "Incident Reporter", required: true },
      { id: generateFieldId(231), type: "date", label: "Incident Date", required: true },
      { id: generateFieldId(232), type: "text", label: "Incident Time", required: true },
      { id: generateFieldId(233), type: "select", label: "Incident Type", required: true, options: ["Data Breach", "Malware", "Unauthorized Access", "Phishing", "System Compromise", "Other"] },
      { id: generateFieldId(234), type: "textarea", label: "Incident Description", required: true },
      { id: generateFieldId(235), type: "select", label: "Severity", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { id: generateFieldId(236), type: "textarea", label: "Immediate Actions Taken", required: false }
    ]
  },

  {
    id: "it-1",
    name: "System Access Request",
    description: "Request for system access and permissions",
    category: "it",
    sector: "other",
    targetAudience: ["internal"],
    preview: "User details, system requirements, access levels",
    fields: [
      { id: generateFieldId(240), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(241), type: "text", label: "Employee ID", required: true },
      { id: generateFieldId(242), type: "text", label: "Department", required: true },
      { id: generateFieldId(243), type: "text", label: "System/Application", required: true },
      { id: generateFieldId(244), type: "select", label: "Access Level", required: true, options: ["Read Only", "Read/Write", "Administrator", "Super User"] },
      { id: generateFieldId(245), type: "textarea", label: "Business Justification", required: true },
      { id: generateFieldId(246), type: "text", label: "Supervisor Approval", required: true }
    ]
  },

  {
    id: "quality-1",
    name: "Quality Assurance Checklist",
    description: "Quality control and assurance evaluation",
    category: "quality",
    sector: "other",
    targetAudience: ["internal"],
    preview: "Quality standards, testing procedures, compliance checks",
    fields: [
      { id: generateFieldId(250), type: "text", label: "Product/Service", required: true },
      { id: generateFieldId(251), type: "text", label: "QA Inspector", required: true },
      { id: generateFieldId(252), type: "date", label: "Inspection Date", required: true },
      { id: generateFieldId(253), type: "checkbox", label: "Quality Criteria", required: true, options: ["Specifications Met", "Documentation Complete", "Testing Passed", "Packaging Correct", "Labeling Accurate"] },
      { id: generateFieldId(254), type: "radio", label: "Overall Quality Rating", required: true, options: ["Excellent", "Good", "Acceptable", "Needs Improvement", "Rejected"] },
      { id: generateFieldId(255), type: "textarea", label: "Issues Identified", required: false },
      { id: generateFieldId(256), type: "textarea", label: "Corrective Actions", required: false }
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
  const categories = ["all", "survey", "assessment", "registration", "feedback", "compliance", "risk", "vendor-risk", "external-assessment", "hr", "customer", "finance", "it", "security", "quality", "operations", "procurement", "marketing", "sales", "project", "training", "legal", "audit", "business", "multi-category", "other"];
  const sectors = ["all", "government", "insurance", "fintech", "health", "energy", "telecom", "startups", "sme", "multi-sector", "other"];

  // Count functions for filters
  const getSectorCount = (sector: string) => {
    if (sector === "all") {
      return formTemplates.length;
    } else if (sector === "multi-sector") {
      return formTemplates.filter(template => 
        template.sector && Array.isArray(template.sector) && template.sector.length > 1
      ).length;
    } else if (sector === "other") {
      return formTemplates.filter(template => !template.sector || template.sector === 'other').length;
    } else {
      return formTemplates.filter(template => {
        if (!template.sector) return false;
        const templateSectors = Array.isArray(template.sector) ? template.sector : [template.sector];
        return templateSectors.includes(sector);
      }).length;
    }
  };

  const getCategoryCount = (category: string) => {
    if (category === "all") {
      return formTemplates.length;
    } else if (category === "multi-category") {
      return formTemplates.filter(template => 
        template.category && Array.isArray(template.category) && template.category.length > 1
      ).length;
    } else if (category === "other") {
      return formTemplates.filter(template => !template.category || 
        (typeof template.category === 'string' && template.category === 'other')).length;
    } else {
      return formTemplates.filter(template => {
        if (Array.isArray(template.category)) {
          return template.category.includes(category);
        }
        return template.category === category;
      }).length;
    }
  };

  /**
   * Filter templates based on search term and selected categories/sectors
   * Then sort alphabetically
   */
  const filteredTemplates = formTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filtering logic
    let matchesCategory = false;
    if (selectedCategories.length === 0) {
      matchesCategory = true;
    } else if (selectedCategories.includes("multi-category")) {
      // "Multi-Category" selected - show forms with multiple categories only
      matchesCategory = template.category && Array.isArray(template.category) && template.category.length > 1;
    } else if (selectedCategories.includes("other")) {
      // "Other" category selected - show forms with no specific category or 'other' category
      matchesCategory = !template.category || template.category === 'other';
    } else {
      // Specific category(s) selected
      if (Array.isArray(template.category)) {
        matchesCategory = template.category.some(c => selectedCategories.includes(c));
      } else {
        matchesCategory = selectedCategories.includes(template.category);
      }
    }
    
    // Sector filtering logic
    let matchesSector = false;
    if (selectedSectors.length === 0) {
      // No sector filter applied - show all forms
      matchesSector = true;
    } else if (selectedSectors.includes("multi-sector")) {
      // "Multi-Sector" selected - show forms with multiple sectors only
      matchesSector = template.sector && Array.isArray(template.sector) && template.sector.length > 1;
    } else if (selectedSectors.includes("other")) {
      // "Other" sector selected - show forms with no sector or 'other' sector
      matchesSector = !template.sector || template.sector === 'other';
    } else {
      // Specific sector(s) selected - show forms that match those sectors
      if (template.sector) {
        const templateSectors = Array.isArray(template.sector) ? template.sector : [template.sector];
        matchesSector = templateSectors.some(s => selectedSectors.includes(s));
      }
    }
    
    return matchesSearch && matchesCategory && matchesSector;
  }).sort((a, b) => a.name.localeCompare(b.name));

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
      case 'multi-sector':
        return <Globe className="h-3 w-3" />;
      case 'other':
        return <Building className="h-3 w-3" />;
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
            getCounts={getCategoryCount}
          />
          <MultiSelectFilter
            options={sectors}
            selectedValues={selectedSectors}
            onSelectionChange={setSelectedSectors}
            placeholder="All Sectors"
            showCounts={true}
            getCounts={getSectorCount}
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