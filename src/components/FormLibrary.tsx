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
  },

  // GOVERNMENT SECTOR FORMS (20 forms)
  {
    id: "gov-2",
    name: "Building Permit Application",
    description: "Construction and building permit request form",
    category: "registration",
    sector: "government",
    targetAudience: ["external"],
    preview: "Property details, construction plans, safety compliance",
    fields: [
      { id: generateFieldId(300), type: "text", label: "Property Address", required: true },
      { id: generateFieldId(301), type: "text", label: "Applicant Name", required: true },
      { id: generateFieldId(302), type: "select", label: "Construction Type", required: true, options: ["New Construction", "Renovation", "Addition", "Demolition"] },
      { id: generateFieldId(303), type: "text", label: "Square Footage", required: true },
      { id: generateFieldId(304), type: "textarea", label: "Construction Description", required: true }
    ]
  },
  {
    id: "gov-3",
    name: "Business License Registration",
    description: "New business registration and licensing",
    category: "registration",
    sector: "government",
    targetAudience: ["external"],
    preview: "Business information, license type, regulatory compliance",
    fields: [
      { id: generateFieldId(310), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(311), type: "text", label: "Owner Name", required: true },
      { id: generateFieldId(312), type: "select", label: "Business Type", required: true, options: ["LLC", "Corporation", "Partnership", "Sole Proprietorship"] },
      { id: generateFieldId(313), type: "text", label: "Business Address", required: true },
      { id: generateFieldId(314), type: "textarea", label: "Business Description", required: true }
    ]
  },
  {
    id: "gov-4",
    name: "Zoning Variance Request",
    description: "Request for zoning law exceptions or modifications",
    category: "assessment",
    sector: "government",
    targetAudience: ["external"],
    preview: "Property details, variance request, justification",
    fields: [
      { id: generateFieldId(320), type: "text", label: "Property Address", required: true },
      { id: generateFieldId(321), type: "text", label: "Current Zoning", required: true },
      { id: generateFieldId(322), type: "text", label: "Requested Variance", required: true },
      { id: generateFieldId(323), type: "textarea", label: "Justification", required: true }
    ]
  },
  {
    id: "gov-5",
    name: "Public Records Request",
    description: "Freedom of Information Act (FOIA) request form",
    category: "customer",
    sector: "government",
    targetAudience: ["external"],
    preview: "Record type, time period, delivery method",
    fields: [
      { id: generateFieldId(330), type: "text", label: "Requester Name", required: true },
      { id: generateFieldId(331), type: "textarea", label: "Records Requested", required: true },
      { id: generateFieldId(332), type: "date", label: "Date Range Start", required: false },
      { id: generateFieldId(333), type: "date", label: "Date Range End", required: false }
    ]
  },
  {
    id: "gov-6",
    name: "Tax Assessment Appeal",
    description: "Property tax assessment dispute form",
    category: "assessment",
    sector: "government",
    targetAudience: ["external"],
    preview: "Property information, assessment details, dispute grounds",
    fields: [
      { id: generateFieldId(340), type: "text", label: "Property Address", required: true },
      { id: generateFieldId(341), type: "text", label: "Current Assessment", required: true },
      { id: generateFieldId(342), type: "text", label: "Disputed Amount", required: true },
      { id: generateFieldId(343), type: "textarea", label: "Grounds for Appeal", required: true }
    ]
  },
  {
    id: "gov-7",
    name: "Environmental Impact Assessment",
    description: "Environmental review for development projects",
    category: "assessment",
    sector: "government",
    targetAudience: ["external"],
    preview: "Project details, environmental factors, mitigation measures",
    fields: [
      { id: generateFieldId(350), type: "text", label: "Project Name", required: true },
      { id: generateFieldId(351), type: "textarea", label: "Project Description", required: true },
      { id: generateFieldId(352), type: "checkbox", label: "Environmental Factors", required: true, options: ["Air Quality", "Water Quality", "Wildlife", "Soil", "Noise"] },
      { id: generateFieldId(353), type: "textarea", label: "Mitigation Measures", required: true }
    ]
  },
  {
    id: "gov-8",
    name: "Voter Registration",
    description: "Citizen voter registration form",
    category: "registration",
    sector: "government",
    targetAudience: ["external"],
    preview: "Personal information, address verification, eligibility",
    fields: [
      { id: generateFieldId(360), type: "text", label: "Full Name", required: true },
      { id: generateFieldId(361), type: "date", label: "Date of Birth", required: true },
      { id: generateFieldId(362), type: "text", label: "Social Security Number", required: true },
      { id: generateFieldId(363), type: "text", label: "Address", required: true }
    ]
  },
  {
    id: "gov-9",
    name: "Public Complaint Filing",
    description: "Citizen complaint against government services",
    category: "customer",
    sector: "government",
    targetAudience: ["external"],
    preview: "Complaint details, department involved, resolution request",
    fields: [
      { id: generateFieldId(370), type: "text", label: "Complainant Name", required: true },
      { id: generateFieldId(371), type: "select", label: "Department", required: true, options: ["Public Works", "Police", "Fire", "Parks", "Planning"] },
      { id: generateFieldId(372), type: "textarea", label: "Complaint Details", required: true },
      { id: generateFieldId(373), type: "text", label: "Desired Resolution", required: false }
    ]
  },
  {
    id: "gov-10",
    name: "Municipal Grant Application",
    description: "Application for municipal funding and grants",
    category: "finance",
    sector: "government",
    targetAudience: ["external"],
    preview: "Project proposal, budget, community impact",
    fields: [
      { id: generateFieldId(380), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(381), type: "text", label: "Grant Amount Requested", required: true },
      { id: generateFieldId(382), type: "textarea", label: "Project Description", required: true },
      { id: generateFieldId(383), type: "textarea", label: "Community Impact", required: true }
    ]
  },
  {
    id: "gov-11",
    name: "Special Event Permit",
    description: "Permit application for public events",
    category: "registration",
    sector: "government",
    targetAudience: ["external"],
    preview: "Event details, safety plans, traffic management",
    fields: [
      { id: generateFieldId(390), type: "text", label: "Event Name", required: true },
      { id: generateFieldId(391), type: "date", label: "Event Date", required: true },
      { id: generateFieldId(392), type: "text", label: "Event Location", required: true },
      { id: generateFieldId(393), type: "text", label: "Expected Attendance", required: true },
      { id: generateFieldId(394), type: "textarea", label: "Safety Plan", required: true }
    ]
  },
  {
    id: "gov-12",
    name: "Sidewalk Repair Request",
    description: "Request for public sidewalk maintenance",
    category: "customer",
    sector: "government",
    targetAudience: ["external"],
    preview: "Location details, damage description, priority level",
    fields: [
      { id: generateFieldId(400), type: "text", label: "Street Address", required: true },
      { id: generateFieldId(401), type: "textarea", label: "Damage Description", required: true },
      { id: generateFieldId(402), type: "select", label: "Priority", required: true, options: ["Low", "Medium", "High", "Emergency"] },
      { id: generateFieldId(403), type: "text", label: "Reporter Contact", required: true }
    ]
  },
  {
    id: "gov-13",
    name: "Animal Control Report",
    description: "Report for animal-related incidents",
    category: "customer",
    sector: "government",
    targetAudience: ["external"],
    preview: "Animal description, incident details, location",
    fields: [
      { id: generateFieldId(410), type: "text", label: "Incident Location", required: true },
      { id: generateFieldId(411), type: "select", label: "Animal Type", required: true, options: ["Dog", "Cat", "Wildlife", "Livestock", "Other"] },
      { id: generateFieldId(412), type: "textarea", label: "Incident Description", required: true },
      { id: generateFieldId(413), type: "radio", label: "Animal Aggressive?", required: true, options: ["Yes", "No", "Unknown"] }
    ]
  },
  {
    id: "gov-14",
    name: "Traffic Signal Request",
    description: "Request for new traffic signals or modifications",
    category: "assessment",
    sector: "government",
    targetAudience: ["external"],
    preview: "Intersection details, traffic patterns, safety concerns",
    fields: [
      { id: generateFieldId(420), type: "text", label: "Intersection Location", required: true },
      { id: generateFieldId(421), type: "textarea", label: "Traffic Safety Concerns", required: true },
      { id: generateFieldId(422), type: "text", label: "Average Daily Traffic", required: false },
      { id: generateFieldId(423), type: "text", label: "Accident History", required: false }
    ]
  },
  {
    id: "gov-15",
    name: "Historic Preservation Application",
    description: "Application for historic building designation",
    category: "registration",
    sector: "government",
    targetAudience: ["external"],
    preview: "Property history, architectural significance, preservation plan",
    fields: [
      { id: generateFieldId(430), type: "text", label: "Property Address", required: true },
      { id: generateFieldId(431), type: "text", label: "Year Built", required: true },
      { id: generateFieldId(432), type: "textarea", label: "Historical Significance", required: true },
      { id: generateFieldId(433), type: "textarea", label: "Preservation Plan", required: true }
    ]
  },
  {
    id: "gov-16",
    name: "Code Violation Appeal",
    description: "Appeal form for building code violations",
    category: "assessment",
    sector: "government",
    targetAudience: ["external"],
    preview: "Violation details, appeal grounds, corrective actions",
    fields: [
      { id: generateFieldId(440), type: "text", label: "Property Address", required: true },
      { id: generateFieldId(441), type: "text", label: "Violation Number", required: true },
      { id: generateFieldId(442), type: "textarea", label: "Appeal Grounds", required: true },
      { id: generateFieldId(443), type: "textarea", label: "Corrective Actions Taken", required: false }
    ]
  },
  {
    id: "gov-17",
    name: "Water Quality Report",
    description: "Water quality testing and monitoring report",
    category: "assessment",
    sector: "government",
    targetAudience: ["internal"],
    preview: "Testing results, contamination levels, remediation",
    fields: [
      { id: generateFieldId(450), type: "text", label: "Testing Location", required: true },
      { id: generateFieldId(451), type: "date", label: "Sample Date", required: true },
      { id: generateFieldId(452), type: "text", label: "pH Level", required: true },
      { id: generateFieldId(453), type: "checkbox", label: "Contaminants Tested", required: true, options: ["Lead", "Chlorine", "Bacteria", "Nitrates", "Fluoride"] }
    ]
  },
  {
    id: "gov-18",
    name: "Municipal Employee Evaluation",
    description: "Performance evaluation for government employees",
    category: "hr",
    sector: "government",
    targetAudience: ["internal"],
    preview: "Performance metrics, goals assessment, development plans",
    fields: [
      { id: generateFieldId(460), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(461), type: "text", label: "Department", required: true },
      { id: generateFieldId(462), type: "rating", label: "Job Performance", required: true },
      { id: generateFieldId(463), type: "textarea", label: "Goals Achievement", required: true },
      { id: generateFieldId(464), type: "textarea", label: "Development Plan", required: false }
    ]
  },
  {
    id: "gov-19",
    name: "Budget Allocation Request",
    description: "Department budget request and justification",
    category: "finance",
    sector: "government",
    targetAudience: ["internal"],
    preview: "Budget categories, justification, expected outcomes",
    fields: [
      { id: generateFieldId(470), type: "text", label: "Department Name", required: true },
      { id: generateFieldId(471), type: "text", label: "Requested Amount", required: true },
      { id: generateFieldId(472), type: "textarea", label: "Budget Justification", required: true },
      { id: generateFieldId(473), type: "textarea", label: "Expected Outcomes", required: true }
    ]
  },
  {
    id: "gov-20",
    name: "Emergency Response Plan",
    description: "Emergency preparedness and response planning",
    category: "operations",
    sector: "government",
    targetAudience: ["internal"],
    preview: "Emergency types, response procedures, resource allocation",
    fields: [
      { id: generateFieldId(480), type: "select", label: "Emergency Type", required: true, options: ["Natural Disaster", "Public Health", "Security Threat", "Infrastructure Failure"] },
      { id: generateFieldId(481), type: "textarea", label: "Response Procedures", required: true },
      { id: generateFieldId(482), type: "checkbox", label: "Required Resources", required: true, options: ["Personnel", "Equipment", "Medical", "Transportation", "Communication"] },
      { id: generateFieldId(483), type: "text", label: "Incident Commander", required: true }
    ]
  },
  {
    id: "gov-21",
    name: "Public Transit Feedback",
    description: "Citizen feedback on public transportation services",
    category: "feedback",
    sector: "government",
    targetAudience: ["external"],
    preview: "Service quality, route suggestions, accessibility",
    fields: [
      { id: generateFieldId(490), type: "select", label: "Transit Type", required: true, options: ["Bus", "Train", "Subway", "Light Rail"] },
      { id: generateFieldId(491), type: "text", label: "Route Number", required: false },
      { id: generateFieldId(492), type: "rating", label: "Service Quality", required: true },
      { id: generateFieldId(493), type: "textarea", label: "Suggestions for Improvement", required: false }
    ]
  },

  // INSURANCE SECTOR FORMS (20 forms)
  {
    id: "ins-2",
    name: "Auto Insurance Claim",
    description: "Vehicle accident and damage claim form",
    category: "assessment",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Accident details, vehicle information, damages",
    fields: [
      { id: generateFieldId(500), type: "text", label: "Policy Number", required: true },
      { id: generateFieldId(501), type: "date", label: "Accident Date", required: true },
      { id: generateFieldId(502), type: "text", label: "Vehicle Make/Model", required: true },
      { id: generateFieldId(503), type: "textarea", label: "Accident Description", required: true },
      { id: generateFieldId(504), type: "text", label: "Estimated Repair Cost", required: false }
    ]
  },
  {
    id: "ins-3",
    name: "Home Insurance Claim",
    description: "Property damage and loss claim form",
    category: "assessment",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Property details, damage assessment, claim amount",
    fields: [
      { id: generateFieldId(510), type: "text", label: "Property Address", required: true },
      { id: generateFieldId(511), type: "select", label: "Damage Type", required: true, options: ["Fire", "Water", "Storm", "Theft", "Vandalism"] },
      { id: generateFieldId(512), type: "textarea", label: "Damage Description", required: true },
      { id: generateFieldId(513), type: "text", label: "Estimated Loss", required: true }
    ]
  },
  {
    id: "ins-4",
    name: "Life Insurance Application",
    description: "New life insurance policy application",
    category: "registration",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Personal information, health details, beneficiaries",
    fields: [
      { id: generateFieldId(520), type: "text", label: "Applicant Name", required: true },
      { id: generateFieldId(521), type: "date", label: "Date of Birth", required: true },
      { id: generateFieldId(522), type: "text", label: "Coverage Amount", required: true },
      { id: generateFieldId(523), type: "text", label: "Primary Beneficiary", required: true },
      { id: generateFieldId(524), type: "checkbox", label: "Health Conditions", required: false, options: ["Diabetes", "Heart Disease", "Cancer", "None"] }
    ]
  },
  {
    id: "ins-5",
    name: "Health Insurance Enrollment",
    description: "Health insurance plan enrollment form",
    category: "registration",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Plan selection, dependent information, medical history",
    fields: [
      { id: generateFieldId(530), type: "text", label: "Subscriber Name", required: true },
      { id: generateFieldId(531), type: "select", label: "Plan Type", required: true, options: ["Basic", "Standard", "Premium", "Family"] },
      { id: generateFieldId(532), type: "text", label: "Number of Dependents", required: false },
      { id: generateFieldId(533), type: "checkbox", label: "Coverage Options", required: true, options: ["Medical", "Dental", "Vision", "Prescription"] }
    ]
  },
  {
    id: "ins-6",
    name: "Disability Insurance Claim",
    description: "Disability benefits claim and assessment",
    category: "assessment",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Medical condition, work impact, benefit calculation",
    fields: [
      { id: generateFieldId(540), type: "text", label: "Claimant Name", required: true },
      { id: generateFieldId(541), type: "text", label: "Employer", required: true },
      { id: generateFieldId(542), type: "textarea", label: "Medical Condition", required: true },
      { id: generateFieldId(543), type: "date", label: "Date of Disability", required: true },
      { id: generateFieldId(544), type: "text", label: "Attending Physician", required: true }
    ]
  },
  {
    id: "ins-7",
    name: "Commercial Property Insurance",
    description: "Business property insurance application",
    category: "registration",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Business details, property value, risk assessment",
    fields: [
      { id: generateFieldId(550), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(551), type: "text", label: "Property Address", required: true },
      { id: generateFieldId(552), type: "text", label: "Property Value", required: true },
      { id: generateFieldId(553), type: "select", label: "Business Type", required: true, options: ["Retail", "Office", "Manufacturing", "Warehouse"] },
      { id: generateFieldId(554), type: "checkbox", label: "Coverage Needed", required: true, options: ["Building", "Equipment", "Inventory", "Business Interruption"] }
    ]
  },
  {
    id: "ins-8",
    name: "Workers Compensation Claim",
    description: "Workplace injury compensation claim",
    category: "assessment",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Injury details, medical treatment, work status",
    fields: [
      { id: generateFieldId(560), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(561), type: "date", label: "Injury Date", required: true },
      { id: generateFieldId(562), type: "textarea", label: "Injury Description", required: true },
      { id: generateFieldId(563), type: "text", label: "Body Part Injured", required: true },
      { id: generateFieldId(564), type: "radio", label: "Work Status", required: true, options: ["Full Duty", "Light Duty", "Unable to Work"] }
    ]
  },
  {
    id: "ins-9",
    name: "Travel Insurance Application",
    description: "Travel protection insurance enrollment",
    category: "registration",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Trip details, coverage options, traveler information",
    fields: [
      { id: generateFieldId(570), type: "text", label: "Traveler Name", required: true },
      { id: generateFieldId(571), type: "text", label: "Destination", required: true },
      { id: generateFieldId(572), type: "date", label: "Departure Date", required: true },
      { id: generateFieldId(573), type: "date", label: "Return Date", required: true },
      { id: generateFieldId(574), type: "checkbox", label: "Coverage Types", required: true, options: ["Trip Cancellation", "Medical", "Baggage", "Emergency Evacuation"] }
    ]
  },
  {
    id: "ins-10",
    name: "Marine Insurance Application",
    description: "Boat and watercraft insurance application",
    category: "registration",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Vessel details, usage patterns, coverage options",
    fields: [
      { id: generateFieldId(580), type: "text", label: "Vessel Name", required: true },
      { id: generateFieldId(581), type: "text", label: "Make/Model", required: true },
      { id: generateFieldId(582), type: "text", label: "Year", required: true },
      { id: generateFieldId(583), type: "text", label: "Value", required: true },
      { id: generateFieldId(584), type: "select", label: "Usage", required: true, options: ["Recreational", "Commercial", "Charter", "Racing"] }
    ]
  },
  {
    id: "ins-11",
    name: "Cyber Liability Insurance",
    description: "Cybersecurity insurance coverage application",
    category: "registration",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "IT infrastructure, data protection, cyber risks",
    fields: [
      { id: generateFieldId(590), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(591), type: "text", label: "Annual Revenue", required: true },
      { id: generateFieldId(592), type: "checkbox", label: "Data Types", required: true, options: ["Customer Data", "Financial Data", "Health Records", "Personal Information"] },
      { id: generateFieldId(593), type: "radio", label: "Previous Cyber Incidents?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(594), type: "textarea", label: "Security Measures", required: true }
    ]
  },
  {
    id: "ins-12",
    name: "Professional Liability Claim",
    description: "Professional errors and omissions claim",
    category: "assessment",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Professional service details, alleged errors, damages",
    fields: [
      { id: generateFieldId(600), type: "text", label: "Professional Name", required: true },
      { id: generateFieldId(601), type: "text", label: "Profession", required: true },
      { id: generateFieldId(602), type: "textarea", label: "Alleged Error", required: true },
      { id: generateFieldId(603), type: "text", label: "Client Name", required: true },
      { id: generateFieldId(604), type: "text", label: "Claimed Damages", required: true }
    ]
  },
  {
    id: "ins-13",
    name: "Umbrella Insurance Application",
    description: "Additional liability coverage application",
    category: "registration",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Current coverage, assets, additional protection needs",
    fields: [
      { id: generateFieldId(610), type: "text", label: "Applicant Name", required: true },
      { id: generateFieldId(611), type: "text", label: "Desired Coverage Amount", required: true },
      { id: generateFieldId(612), type: "checkbox", label: "Current Policies", required: true, options: ["Auto", "Home", "Business", "Watercraft"] },
      { id: generateFieldId(613), type: "text", label: "Total Asset Value", required: true }
    ]
  },
  {
    id: "ins-14",
    name: "Pet Insurance Claim",
    description: "Veterinary treatment claim for pets",
    category: "assessment",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Pet information, treatment details, veterinary costs",
    fields: [
      { id: generateFieldId(620), type: "text", label: "Pet Name", required: true },
      { id: generateFieldId(621), type: "select", label: "Pet Type", required: true, options: ["Dog", "Cat", "Bird", "Rabbit", "Other"] },
      { id: generateFieldId(622), type: "text", label: "Veterinarian Name", required: true },
      { id: generateFieldId(623), type: "textarea", label: "Treatment Description", required: true },
      { id: generateFieldId(624), type: "text", label: "Treatment Cost", required: true }
    ]
  },
  {
    id: "ins-15",
    name: "Flood Insurance Assessment",
    description: "Flood risk and coverage assessment",
    category: "assessment",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Property location, flood zone, coverage needs",
    fields: [
      { id: generateFieldId(630), type: "text", label: "Property Address", required: true },
      { id: generateFieldId(631), type: "text", label: "Flood Zone", required: false },
      { id: generateFieldId(632), type: "text", label: "Distance to Water", required: false },
      { id: generateFieldId(633), type: "radio", label: "Previous Flood Damage?", required: true, options: ["Yes", "No"] },
      { id: generateFieldId(634), type: "text", label: "Desired Coverage", required: true }
    ]
  },
  {
    id: "ins-16",
    name: "Renters Insurance Application",
    description: "Tenant property and liability insurance",
    category: "registration",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Rental property, personal property value, liability needs",
    fields: [
      { id: generateFieldId(640), type: "text", label: "Tenant Name", required: true },
      { id: generateFieldId(641), type: "text", label: "Rental Address", required: true },
      { id: generateFieldId(642), type: "text", label: "Monthly Rent", required: true },
      { id: generateFieldId(643), type: "text", label: "Personal Property Value", required: true },
      { id: generateFieldId(644), type: "checkbox", label: "Coverage Options", required: true, options: ["Personal Property", "Liability", "Additional Living Expenses"] }
    ]
  },
  {
    id: "ins-17",
    name: "Business Interruption Claim",
    description: "Business income loss claim form",
    category: "assessment",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Business impact, revenue loss, additional expenses",
    fields: [
      { id: generateFieldId(650), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(651), type: "date", label: "Interruption Start Date", required: true },
      { id: generateFieldId(652), type: "text", label: "Cause of Interruption", required: true },
      { id: generateFieldId(653), type: "text", label: "Lost Revenue", required: true },
      { id: generateFieldId(654), type: "textarea", label: "Additional Expenses", required: false }
    ]
  },
  {
    id: "ins-18",
    name: "Product Liability Claim",
    description: "Product defect and injury claim form",
    category: "assessment",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Product details, defect description, injury information",
    fields: [
      { id: generateFieldId(660), type: "text", label: "Product Name", required: true },
      { id: generateFieldId(661), type: "text", label: "Manufacturer", required: true },
      { id: generateFieldId(662), type: "textarea", label: "Defect Description", required: true },
      { id: generateFieldId(663), type: "textarea", label: "Injury Description", required: false },
      { id: generateFieldId(664), type: "date", label: "Incident Date", required: true }
    ]
  },
  {
    id: "ins-19",
    name: "Directors and Officers Insurance",
    description: "Executive liability insurance application",
    category: "registration",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Company governance, executive roles, liability coverage",
    fields: [
      { id: generateFieldId(670), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(671), type: "text", label: "Number of Directors", required: true },
      { id: generateFieldId(672), type: "text", label: "Annual Revenue", required: true },
      { id: generateFieldId(673), type: "checkbox", label: "Coverage Areas", required: true, options: ["Corporate Liability", "Employment Practices", "Fiduciary Liability"] },
      { id: generateFieldId(674), type: "radio", label: "Previous Claims?", required: true, options: ["Yes", "No"] }
    ]
  },
  {
    id: "ins-20",
    name: "Event Insurance Application",
    description: "Special event liability and cancellation insurance",
    category: "registration",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Event details, attendance, risk factors, coverage needs",
    fields: [
      { id: generateFieldId(680), type: "text", label: "Event Name", required: true },
      { id: generateFieldId(681), type: "date", label: "Event Date", required: true },
      { id: generateFieldId(682), type: "text", label: "Event Location", required: true },
      { id: generateFieldId(683), type: "text", label: "Expected Attendance", required: true },
      { id: generateFieldId(684), type: "checkbox", label: "Coverage Types", required: true, options: ["General Liability", "Event Cancellation", "Weather Protection", "Equipment Coverage"] }
    ]
  },
  {
    id: "ins-21",
    name: "Key Person Insurance",
    description: "Business key employee life insurance",
    category: "registration",
    sector: "insurance",
    targetAudience: ["external"],
    preview: "Employee value, business impact, coverage amount",
    fields: [
      { id: generateFieldId(690), type: "text", label: "Key Person Name", required: true },
      { id: generateFieldId(691), type: "text", label: "Position/Title", required: true },
      { id: generateFieldId(692), type: "text", label: "Annual Salary", required: true },
      { id: generateFieldId(693), type: "textarea", label: "Business Impact", required: true },
      { id: generateFieldId(694), type: "text", label: "Coverage Amount", required: true }
    ]
  },

  // FINTECH SECTOR FORMS (20 forms)
  {
    id: "fintech-1",
    name: "Digital Wallet Setup",
    description: "New digital wallet account creation",
    category: "registration",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Identity verification, payment methods, security settings",
    fields: [
      { id: generateFieldId(700), type: "text", label: "Full Name", required: true },
      { id: generateFieldId(701), type: "email", label: "Email Address", required: true },
      { id: generateFieldId(702), type: "text", label: "Phone Number", required: true },
      { id: generateFieldId(703), type: "date", label: "Date of Birth", required: true },
      { id: generateFieldId(704), type: "text", label: "Social Security Number", required: true }
    ]
  },
  {
    id: "fintech-2",
    name: "Cryptocurrency Exchange KYC",
    description: "Know Your Customer verification for crypto trading",
    category: "compliance",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Identity documents, source of funds, trading experience",
    fields: [
      { id: generateFieldId(710), type: "text", label: "Full Legal Name", required: true },
      { id: generateFieldId(711), type: "text", label: "Country of Residence", required: true },
      { id: generateFieldId(712), type: "select", label: "Source of Funds", required: true, options: ["Employment", "Business", "Investment", "Inheritance", "Other"] },
      { id: generateFieldId(713), type: "select", label: "Trading Experience", required: true, options: ["Beginner", "Intermediate", "Advanced", "Professional"] },
      { id: generateFieldId(714), type: "text", label: "Expected Monthly Volume", required: true }
    ]
  },
  {
    id: "fintech-3",
    name: "Peer-to-Peer Lending Application",
    description: "P2P lending platform borrower application",
    category: "finance",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Loan purpose, financial information, credit history",
    fields: [
      { id: generateFieldId(720), type: "text", label: "Loan Amount", required: true },
      { id: generateFieldId(721), type: "select", label: "Loan Purpose", required: true, options: ["Personal", "Business", "Education", "Home Improvement", "Debt Consolidation"] },
      { id: generateFieldId(722), type: "text", label: "Annual Income", required: true },
      { id: generateFieldId(723), type: "text", label: "Employment Status", required: true },
      { id: generateFieldId(724), type: "text", label: "Credit Score", required: false }
    ]
  },
  {
    id: "fintech-4",
    name: "Robo-Advisor Investment Profile",
    description: "Automated investment service risk assessment",
    category: "assessment",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Investment goals, risk tolerance, time horizon",
    fields: [
      { id: generateFieldId(730), type: "text", label: "Investment Goal", required: true },
      { id: generateFieldId(731), type: "select", label: "Risk Tolerance", required: true, options: ["Conservative", "Moderate", "Aggressive", "Very Aggressive"] },
      { id: generateFieldId(732), type: "select", label: "Time Horizon", required: true, options: ["< 1 year", "1-3 years", "3-5 years", "5-10 years", "> 10 years"] },
      { id: generateFieldId(733), type: "text", label: "Initial Investment", required: true },
      { id: generateFieldId(734), type: "text", label: "Monthly Contribution", required: false }
    ]
  },
  {
    id: "fintech-5",
    name: "Mobile Payment Merchant Registration",
    description: "Business registration for mobile payment acceptance",
    category: "registration",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Business details, payment processing needs, fee structure",
    fields: [
      { id: generateFieldId(740), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(741), type: "text", label: "Business Type", required: true },
      { id: generateFieldId(742), type: "text", label: "Monthly Transaction Volume", required: true },
      { id: generateFieldId(743), type: "checkbox", label: "Payment Methods", required: true, options: ["Credit Cards", "Debit Cards", "Digital Wallets", "Bank Transfers"] },
      { id: generateFieldId(744), type: "text", label: "Bank Account Number", required: true }
    ]
  },
  {
    id: "fintech-6",
    name: "Blockchain Identity Verification",
    description: "Decentralized identity verification system",
    category: "compliance",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Digital identity, blockchain credentials, verification levels",
    fields: [
      { id: generateFieldId(750), type: "text", label: "Digital Identity Hash", required: true },
      { id: generateFieldId(751), type: "checkbox", label: "Verification Documents", required: true, options: ["Government ID", "Proof of Address", "Bank Statement", "Utility Bill"] },
      { id: generateFieldId(752), type: "select", label: "Verification Level", required: true, options: ["Basic", "Enhanced", "Premium"] },
      { id: generateFieldId(753), type: "text", label: "Wallet Address", required: false }
    ]
  },
  {
    id: "fintech-7",
    name: "Crowdfunding Campaign Application",
    description: "Project funding campaign setup form",
    category: "finance",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Project details, funding goals, rewards structure",
    fields: [
      { id: generateFieldId(760), type: "text", label: "Project Name", required: true },
      { id: generateFieldId(761), type: "textarea", label: "Project Description", required: true },
      { id: generateFieldId(762), type: "text", label: "Funding Goal", required: true },
      { id: generateFieldId(763), type: "text", label: "Campaign Duration", required: true },
      { id: generateFieldId(764), type: "textarea", label: "Rewards Structure", required: false }
    ]
  },
  {
    id: "fintech-8",
    name: "Neobank Account Opening",
    description: "Digital-only bank account application",
    category: "registration",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Personal information, account type, initial deposit",
    fields: [
      { id: generateFieldId(770), type: "text", label: "Full Name", required: true },
      { id: generateFieldId(771), type: "text", label: "Address", required: true },
      { id: generateFieldId(772), type: "select", label: "Account Type", required: true, options: ["Checking", "Savings", "Business", "Premium"] },
      { id: generateFieldId(773), type: "text", label: "Initial Deposit", required: true },
      { id: generateFieldId(774), type: "checkbox", label: "Services", required: false, options: ["Debit Card", "Mobile Banking", "Investment", "Credit Line"] }
    ]
  },
  {
    id: "fintech-9",
    name: "RegTech Compliance Monitoring",
    description: "Regulatory technology compliance tracking",
    category: "compliance",
    sector: "fintech",
    targetAudience: ["internal"],
    preview: "Compliance metrics, regulatory requirements, monitoring alerts",
    fields: [
      { id: generateFieldId(780), type: "text", label: "Institution Name", required: true },
      { id: generateFieldId(781), type: "checkbox", label: "Regulatory Requirements", required: true, options: ["KYC", "AML", "GDPR", "PCI DSS", "SOX"] },
      { id: generateFieldId(782), type: "text", label: "Compliance Officer", required: true },
      { id: generateFieldId(783), type: "textarea", label: "Monitoring Scope", required: true }
    ]
  },
  {
    id: "fintech-10",
    name: "InsurTech Policy Comparison",
    description: "Digital insurance policy comparison and selection",
    category: "assessment",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Coverage needs, policy options, pricing comparison",
    fields: [
      { id: generateFieldId(790), type: "select", label: "Insurance Type", required: true, options: ["Auto", "Health", "Life", "Property", "Travel"] },
      { id: generateFieldId(791), type: "text", label: "Coverage Amount", required: true },
      { id: generateFieldId(792), type: "select", label: "Budget Range", required: true, options: ["< $100", "$100-$300", "$300-$500", "> $500"] },
      { id: generateFieldId(793), type: "checkbox", label: "Coverage Features", required: true, options: ["Deductible", "Premium", "Benefits", "Exclusions"] }
    ]
  },
  {
    id: "fintech-11",
    name: "API Banking Integration",
    description: "Third-party banking API integration request",
    category: "it",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "API requirements, security protocols, integration scope",
    fields: [
      { id: generateFieldId(800), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(801), type: "checkbox", label: "API Services", required: true, options: ["Account Info", "Payments", "Transfers", "Transaction History"] },
      { id: generateFieldId(802), type: "select", label: "Integration Type", required: true, options: ["REST API", "GraphQL", "Webhook", "SDK"] },
      { id: generateFieldId(803), type: "textarea", label: "Security Requirements", required: true }
    ]
  },
  {
    id: "fintech-12",
    name: "Smart Contract Deployment",
    description: "Blockchain smart contract deployment form",
    category: "it",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Contract specifications, blockchain platform, deployment parameters",
    fields: [
      { id: generateFieldId(810), type: "text", label: "Contract Name", required: true },
      { id: generateFieldId(811), type: "select", label: "Blockchain Platform", required: true, options: ["Ethereum", "Binance Smart Chain", "Polygon", "Solana"] },
      { id: generateFieldId(812), type: "textarea", label: "Contract Logic", required: true },
      { id: generateFieldId(813), type: "text", label: "Gas Limit", required: true },
      { id: generateFieldId(814), type: "text", label: "Deployment Address", required: false }
    ]
  },
  {
    id: "fintech-13",
    name: "Digital Asset Trading",
    description: "Cryptocurrency and digital asset trading setup",
    category: "registration",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Trading preferences, risk parameters, portfolio allocation",
    fields: [
      { id: generateFieldId(820), type: "checkbox", label: "Asset Types", required: true, options: ["Bitcoin", "Ethereum", "Altcoins", "NFTs", "Stablecoins"] },
      { id: generateFieldId(821), type: "select", label: "Trading Strategy", required: true, options: ["Day Trading", "Swing Trading", "Long-term Hold", "DCA"] },
      { id: generateFieldId(822), type: "text", label: "Risk Limit (%)", required: true },
      { id: generateFieldId(823), type: "text", label: "Initial Portfolio Value", required: true }
    ]
  },
  {
    id: "fintech-14",
    name: "Buy Now Pay Later Application",
    description: "BNPL service credit application",
    category: "finance",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Purchase details, payment schedule, credit assessment",
    fields: [
      { id: generateFieldId(830), type: "text", label: "Purchase Amount", required: true },
      { id: generateFieldId(831), type: "select", label: "Payment Plan", required: true, options: ["4 payments", "6 payments", "12 payments", "24 payments"] },
      { id: generateFieldId(832), type: "text", label: "Merchant Name", required: true },
      { id: generateFieldId(833), type: "text", label: "Monthly Income", required: true },
      { id: generateFieldId(834), type: "checkbox", label: "Employment Type", required: true, options: ["Full-time", "Part-time", "Self-employed", "Student"] }
    ]
  },
  {
    id: "fintech-15",
    name: "Wealth Management Onboarding",
    description: "Digital wealth management service enrollment",
    category: "registration",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Financial goals, investment profile, advisory preferences",
    fields: [
      { id: generateFieldId(840), type: "text", label: "Net Worth", required: true },
      { id: generateFieldId(841), type: "text", label: "Investment Experience (years)", required: true },
      { id: generateFieldId(842), type: "checkbox", label: "Investment Preferences", required: true, options: ["Stocks", "Bonds", "ETFs", "Real Estate", "Alternatives"] },
      { id: generateFieldId(843), type: "select", label: "Advisory Level", required: true, options: ["Self-directed", "Hybrid", "Full-service"] },
      { id: generateFieldId(844), type: "textarea", label: "Financial Goals", required: true }
    ]
  },
  {
    id: "fintech-16",
    name: "Digital Banking Security Alert",
    description: "Suspicious activity and security incident report",
    category: "security",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Activity details, security concerns, verification steps",
    fields: [
      { id: generateFieldId(850), type: "text", label: "Account Number", required: true },
      { id: generateFieldId(851), type: "date", label: "Incident Date", required: true },
      { id: generateFieldId(852), type: "textarea", label: "Suspicious Activity", required: true },
      { id: generateFieldId(853), type: "select", label: "Alert Type", required: true, options: ["Unauthorized Transaction", "Login Attempt", "Profile Change", "Password Reset"] },
      { id: generateFieldId(854), type: "radio", label: "Activity Authorized?", required: true, options: ["Yes", "No", "Unsure"] }
    ]
  },
  {
    id: "fintech-17",
    name: "Micro-Investment Setup",
    description: "Spare change and micro-investment configuration",
    category: "registration",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Investment preferences, rounding rules, portfolio selection",
    fields: [
      { id: generateFieldId(860), type: "text", label: "Linked Bank Account", required: true },
      { id: generateFieldId(861), type: "select", label: "Rounding Method", required: true, options: ["Round Up", "Fixed Amount", "Percentage", "Custom"] },
      { id: generateFieldId(862), type: "select", label: "Investment Portfolio", required: true, options: ["Conservative", "Moderate", "Aggressive", "ESG"] },
      { id: generateFieldId(863), type: "text", label: "Monthly Investment Limit", required: true }
    ]
  },
  {
    id: "fintech-18",
    name: "Central Bank Digital Currency Registration",
    description: "CBDC wallet setup and registration",
    category: "registration",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Digital ID verification, wallet configuration, usage preferences",
    fields: [
      { id: generateFieldId(870), type: "text", label: "Citizen ID", required: true },
      { id: generateFieldId(871), type: "text", label: "Digital Wallet Address", required: true },
      { id: generateFieldId(872), type: "select", label: "Usage Purpose", required: true, options: ["Personal", "Business", "Government", "Cross-border"] },
      { id: generateFieldId(873), type: "checkbox", label: "Verification Methods", required: true, options: ["Biometric", "SMS", "Email", "Hardware Token"] }
    ]
  },
  {
    id: "fintech-19",
    name: "Algorithmic Trading Strategy",
    description: "Automated trading algorithm configuration",
    category: "it",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Trading parameters, risk controls, performance metrics",
    fields: [
      { id: generateFieldId(880), type: "text", label: "Strategy Name", required: true },
      { id: generateFieldId(881), type: "checkbox", label: "Asset Classes", required: true, options: ["Equities", "Forex", "Commodities", "Crypto", "Bonds"] },
      { id: generateFieldId(882), type: "text", label: "Max Position Size", required: true },
      { id: generateFieldId(883), type: "text", label: "Stop Loss (%)", required: true },
      { id: generateFieldId(884), type: "textarea", label: "Trading Logic", required: true }
    ]
  },
  {
    id: "fintech-20",
    name: "Financial Data Analytics Request",
    description: "Request for financial data analysis and insights",
    category: "assessment",
    sector: "fintech",
    targetAudience: ["external"],
    preview: "Data requirements, analysis scope, reporting preferences",
    fields: [
      { id: generateFieldId(890), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(891), type: "checkbox", label: "Data Types", required: true, options: ["Transaction Data", "Market Data", "Credit Data", "Risk Metrics"] },
      { id: generateFieldId(892), type: "select", label: "Analysis Period", required: true, options: ["1 month", "3 months", "6 months", "1 year", "Custom"] },
      { id: generateFieldId(893), type: "textarea", label: "Analysis Requirements", required: true },
      { id: generateFieldId(894), type: "select", label: "Delivery Format", required: true, options: ["Dashboard", "Report", "API", "Raw Data"] }
    ]
  },

  // HEALTH SECTOR FORMS (20 forms)
  {
    id: "health-2",
    name: "Patient Registration",
    description: "New patient enrollment and medical history",
    category: "registration",
    sector: "health",
    targetAudience: ["external"],
    preview: "Personal information, medical history, insurance details",
    fields: [
      { id: generateFieldId(900), type: "text", label: "Patient Name", required: true },
      { id: generateFieldId(901), type: "date", label: "Date of Birth", required: true },
      { id: generateFieldId(902), type: "text", label: "Insurance Provider", required: false },
      { id: generateFieldId(903), type: "checkbox", label: "Medical History", required: false, options: ["Diabetes", "Heart Disease", "Allergies", "Surgery", "None"] },
      { id: generateFieldId(904), type: "textarea", label: "Current Medications", required: false }
    ]
  },
  {
    id: "health-3",
    name: "Telemedicine Consultation Request",
    description: "Virtual healthcare appointment scheduling",
    category: "customer",
    sector: "health",
    targetAudience: ["external"],
    preview: "Appointment preferences, symptoms, medical urgency",
    fields: [
      { id: generateFieldId(910), type: "text", label: "Patient Name", required: true },
      { id: generateFieldId(911), type: "select", label: "Consultation Type", required: true, options: ["General", "Specialist", "Follow-up", "Emergency"] },
      { id: generateFieldId(912), type: "textarea", label: "Symptoms Description", required: true },
      { id: generateFieldId(913), type: "date", label: "Preferred Date", required: true },
      { id: generateFieldId(914), type: "select", label: "Urgency Level", required: true, options: ["Routine", "Urgent", "Very Urgent"] }
    ]
  },
  {
    id: "health-4",
    name: "Clinical Trial Enrollment",
    description: "Research study participant registration",
    category: "registration",
    sector: "health",
    targetAudience: ["external"],
    preview: "Study eligibility, consent forms, medical screening",
    fields: [
      { id: generateFieldId(920), type: "text", label: "Participant Name", required: true },
      { id: generateFieldId(921), type: "text", label: "Study ID", required: true },
      { id: generateFieldId(922), type: "checkbox", label: "Inclusion Criteria", required: true, options: ["Age Range", "Medical Condition", "Treatment History", "Geographic Location"] },
      { id: generateFieldId(923), type: "radio", label: "Informed Consent", required: true, options: ["Agreed", "Declined"] },
      { id: generateFieldId(924), type: "textarea", label: "Medical Background", required: true }
    ]
  },
  {
    id: "health-5",
    name: "Vaccination Record",
    description: "Immunization tracking and documentation",
    category: "assessment",
    sector: "health",
    targetAudience: ["external"],
    preview: "Vaccine details, administration date, adverse reactions",
    fields: [
      { id: generateFieldId(930), type: "text", label: "Patient Name", required: true },
      { id: generateFieldId(931), type: "select", label: "Vaccine Type", required: true, options: ["COVID-19", "Influenza", "Hepatitis", "MMR", "Other"] },
      { id: generateFieldId(932), type: "date", label: "Administration Date", required: true },
      { id: generateFieldId(933), type: "text", label: "Lot Number", required: true },
      { id: generateFieldId(934), type: "textarea", label: "Adverse Reactions", required: false }
    ]
  },
  {
    id: "health-6",
    name: "Mental Health Assessment",
    description: "Psychological evaluation and screening",
    category: "assessment",
    sector: "health",
    targetAudience: ["external"],
    preview: "Mental health history, current symptoms, treatment goals",
    fields: [
      { id: generateFieldId(940), type: "text", label: "Patient Name", required: true },
      { id: generateFieldId(941), type: "checkbox", label: "Symptoms", required: true, options: ["Anxiety", "Depression", "Sleep Issues", "Mood Changes", "Concentration"] },
      { id: generateFieldId(942), type: "select", label: "Severity", required: true, options: ["Mild", "Moderate", "Severe"] },
      { id: generateFieldId(943), type: "textarea", label: "Previous Treatment", required: false },
      { id: generateFieldId(944), type: "textarea", label: "Treatment Goals", required: true }
    ]
  },
  {
    id: "health-7",
    name: "Medical Equipment Request",
    description: "Hospital equipment procurement and maintenance",
    category: "procurement",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Equipment specifications, budget approval, maintenance schedule",
    fields: [
      { id: generateFieldId(950), type: "text", label: "Equipment Type", required: true },
      { id: generateFieldId(951), type: "text", label: "Department", required: true },
      { id: generateFieldId(952), type: "text", label: "Estimated Cost", required: true },
      { id: generateFieldId(953), type: "textarea", label: "Justification", required: true },
      { id: generateFieldId(954), type: "date", label: "Required Date", required: true }
    ]
  },
  {
    id: "health-8",
    name: "Laboratory Test Request",
    description: "Medical laboratory testing order form",
    category: "customer",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Test specifications, patient information, urgency level",
    fields: [
      { id: generateFieldId(960), type: "text", label: "Patient ID", required: true },
      { id: generateFieldId(961), type: "checkbox", label: "Test Types", required: true, options: ["Blood Work", "Urine Analysis", "Imaging", "Biopsy", "Culture"] },
      { id: generateFieldId(962), type: "text", label: "Ordering Physician", required: true },
      { id: generateFieldId(963), type: "select", label: "Priority", required: true, options: ["Routine", "Urgent", "STAT"] },
      { id: generateFieldId(964), type: "textarea", label: "Clinical Information", required: false }
    ]
  },
  {
    id: "health-9",
    name: "Prescription Renewal",
    description: "Medication prescription refill request",
    category: "customer",
    sector: "health",
    targetAudience: ["external"],
    preview: "Medication details, dosage, refill authorization",
    fields: [
      { id: generateFieldId(970), type: "text", label: "Patient Name", required: true },
      { id: generateFieldId(971), type: "text", label: "Medication Name", required: true },
      { id: generateFieldId(972), type: "text", label: "Current Dosage", required: true },
      { id: generateFieldId(973), type: "text", label: "Prescribing Physician", required: true },
      { id: generateFieldId(974), type: "date", label: "Last Prescription Date", required: true }
    ]
  },
  {
    id: "health-10",
    name: "Surgical Consent Form",
    description: "Pre-operative consent and risk acknowledgment",
    category: "compliance",
    sector: "health",
    targetAudience: ["external"],
    preview: "Procedure details, risks, patient consent",
    fields: [
      { id: generateFieldId(980), type: "text", label: "Patient Name", required: true },
      { id: generateFieldId(981), type: "text", label: "Procedure Name", required: true },
      { id: generateFieldId(982), type: "text", label: "Surgeon Name", required: true },
      { id: generateFieldId(983), type: "date", label: "Scheduled Date", required: true },
      { id: generateFieldId(984), type: "radio", label: "Consent Given", required: true, options: ["Yes", "No"] }
    ]
  },
  {
    id: "health-11",
    name: "Medical Record Access Request",
    description: "Patient medical record release authorization",
    category: "customer",
    sector: "health",
    targetAudience: ["external"],
    preview: "Record types, recipient information, authorization period",
    fields: [
      { id: generateFieldId(990), type: "text", label: "Patient Name", required: true },
      { id: generateFieldId(991), type: "checkbox", label: "Record Types", required: true, options: ["Lab Results", "Imaging", "Visit Notes", "Prescriptions", "Complete Record"] },
      { id: generateFieldId(992), type: "text", label: "Recipient Name", required: true },
      { id: generateFieldId(993), type: "date", label: "Authorization Expiry", required: true }
    ]
  },
  {
    id: "health-12",
    name: "Hospital Discharge Planning",
    description: "Patient discharge coordination and follow-up",
    category: "operations",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Discharge instructions, follow-up care, medication reconciliation",
    fields: [
      { id: generateFieldId(1000), type: "text", label: "Patient ID", required: true },
      { id: generateFieldId(1001), type: "date", label: "Discharge Date", required: true },
      { id: generateFieldId(1002), type: "textarea", label: "Discharge Instructions", required: true },
      { id: generateFieldId(1003), type: "text", label: "Follow-up Appointment", required: false },
      { id: generateFieldId(1004), type: "textarea", label: "Medication Changes", required: false }
    ]
  },
  {
    id: "health-13",
    name: "Healthcare Quality Metrics",
    description: "Clinical quality measurement and reporting",
    category: "quality",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Performance indicators, patient outcomes, improvement goals",
    fields: [
      { id: generateFieldId(1010), type: "text", label: "Department", required: true },
      { id: generateFieldId(1011), type: "text", label: "Reporting Period", required: true },
      { id: generateFieldId(1012), type: "checkbox", label: "Quality Metrics", required: true, options: ["Patient Satisfaction", "Readmission Rate", "Infection Rate", "Mortality Rate", "Length of Stay"] },
      { id: generateFieldId(1013), type: "textarea", label: "Improvement Initiatives", required: false }
    ]
  },
  {
    id: "health-14",
    name: "Medical Device Incident Report",
    description: "Medical equipment malfunction or adverse event",
    category: "quality",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Device information, incident details, corrective actions",
    fields: [
      { id: generateFieldId(1020), type: "text", label: "Device Name", required: true },
      { id: generateFieldId(1021), type: "text", label: "Model Number", required: true },
      { id: generateFieldId(1022), type: "date", label: "Incident Date", required: true },
      { id: generateFieldId(1023), type: "textarea", label: "Incident Description", required: true },
      { id: generateFieldId(1024), type: "textarea", label: "Corrective Actions", required: false }
    ]
  },
  {
    id: "health-15",
    name: "Pharmacy Medication Dispensing",
    description: "Medication preparation and dispensing documentation",
    category: "operations",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Prescription verification, dispensing details, patient counseling",
    fields: [
      { id: generateFieldId(1030), type: "text", label: "Prescription Number", required: true },
      { id: generateFieldId(1031), type: "text", label: "Medication Name", required: true },
      { id: generateFieldId(1032), type: "text", label: "Quantity Dispensed", required: true },
      { id: generateFieldId(1033), type: "text", label: "Pharmacist Name", required: true },
      { id: generateFieldId(1034), type: "radio", label: "Patient Counseled", required: true, options: ["Yes", "No"] }
    ]
  },
  {
    id: "health-16",
    name: "Emergency Department Triage",
    description: "Patient priority assessment and classification",
    category: "assessment",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Chief complaint, vital signs, acuity level, bed assignment",
    fields: [
      { id: generateFieldId(1040), type: "text", label: "Patient Name", required: true },
      { id: generateFieldId(1041), type: "textarea", label: "Chief Complaint", required: true },
      { id: generateFieldId(1042), type: "text", label: "Vital Signs", required: true },
      { id: generateFieldId(1043), type: "select", label: "Triage Level", required: true, options: ["1 - Resuscitation", "2 - Emergent", "3 - Urgent", "4 - Semi-urgent", "5 - Non-urgent"] },
      { id: generateFieldId(1044), type: "text", label: "Assigned Bed", required: false }
    ]
  },
  {
    id: "health-17",
    name: "Infection Control Assessment",
    description: "Healthcare-associated infection prevention monitoring",
    category: "quality",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Infection surveillance, prevention measures, outbreak investigation",
    fields: [
      { id: generateFieldId(1050), type: "text", label: "Unit/Department", required: true },
      { id: generateFieldId(1051), type: "select", label: "Infection Type", required: true, options: ["Bloodstream", "Pneumonia", "Surgical Site", "UTI", "Other"] },
      { id: generateFieldId(1052), type: "text", label: "Patient Count", required: true },
      { id: generateFieldId(1053), type: "checkbox", label: "Prevention Measures", required: true, options: ["Hand Hygiene", "PPE", "Isolation", "Sterilization", "Cleaning"] },
      { id: generateFieldId(1054), type: "textarea", label: "Investigation Notes", required: false }
    ]
  },
  {
    id: "health-18",
    name: "Nursing Care Plan",
    description: "Patient care planning and nursing intervention",
    category: "operations",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Nursing diagnoses, care goals, interventions, evaluation",
    fields: [
      { id: generateFieldId(1060), type: "text", label: "Patient ID", required: true },
      { id: generateFieldId(1061), type: "textarea", label: "Nursing Diagnosis", required: true },
      { id: generateFieldId(1062), type: "textarea", label: "Care Goals", required: true },
      { id: generateFieldId(1063), type: "textarea", label: "Nursing Interventions", required: true },
      { id: generateFieldId(1064), type: "text", label: "Assigned Nurse", required: true }
    ]
  },
  {
    id: "health-19",
    name: "Radiology Imaging Request",
    description: "Medical imaging order and scheduling",
    category: "customer",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Imaging type, clinical indication, contrast requirements",
    fields: [
      { id: generateFieldId(1070), type: "text", label: "Patient ID", required: true },
      { id: generateFieldId(1071), type: "select", label: "Imaging Type", required: true, options: ["X-ray", "CT Scan", "MRI", "Ultrasound", "Nuclear Medicine"] },
      { id: generateFieldId(1072), type: "text", label: "Body Part", required: true },
      { id: generateFieldId(1073), type: "textarea", label: "Clinical Indication", required: true },
      { id: generateFieldId(1074), type: "radio", label: "Contrast Required", required: true, options: ["Yes", "No", "To be determined"] }
    ]
  },
  {
    id: "health-20",
    name: "Healthcare Staff Credentialing",
    description: "Medical staff qualification and privilege verification",
    category: "hr",
    sector: "health",
    targetAudience: ["internal"],
    preview: "Professional credentials, license verification, clinical privileges",
    fields: [
      { id: generateFieldId(1080), type: "text", label: "Provider Name", required: true },
      { id: generateFieldId(1081), type: "text", label: "License Number", required: true },
      { id: generateFieldId(1082), type: "text", label: "Specialty", required: true },
      { id: generateFieldId(1083), type: "checkbox", label: "Clinical Privileges", required: true, options: ["Surgery", "Procedures", "Admitting", "Emergency", "Telemedicine"] },
      { id: generateFieldId(1084), type: "date", label: "Credential Expiry", required: true }
    ]
  },
  {
    id: "health-21",
    name: "Patient Satisfaction Survey",
    description: "Healthcare service quality feedback collection",
    category: "feedback",
    sector: "health",
    targetAudience: ["external"],
    preview: "Service ratings, care experience, improvement suggestions",
    fields: [
      { id: generateFieldId(1090), type: "text", label: "Visit Date", required: true },
      { id: generateFieldId(1091), type: "select", label: "Service Area", required: true, options: ["Emergency", "Inpatient", "Outpatient", "Surgery", "Radiology"] },
      { id: generateFieldId(1092), type: "rating", label: "Overall Satisfaction", required: true },
      { id: generateFieldId(1093), type: "rating", label: "Staff Communication", required: true },
      { id: generateFieldId(1094), type: "textarea", label: "Comments", required: false }
    ]
  },

  // ENERGY SECTOR FORMS (20 forms)
  {
    id: "energy-2",
    name: "Solar Panel Installation Application",
    description: "Residential solar energy system installation permit",
    category: "registration",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Property assessment, system specifications, grid connection",
    fields: [
      { id: generateFieldId(1100), type: "text", label: "Property Address", required: true },
      { id: generateFieldId(1101), type: "text", label: "System Capacity (kW)", required: true },
      { id: generateFieldId(1102), type: "select", label: "Panel Type", required: true, options: ["Monocrystalline", "Polycrystalline", "Thin Film"] },
      { id: generateFieldId(1103), type: "text", label: "Estimated Annual Production", required: true },
      { id: generateFieldId(1104), type: "radio", label: "Grid Connection Required", required: true, options: ["Yes", "No"] }
    ]
  },
  {
    id: "energy-3",
    name: "Wind Farm Environmental Impact",
    description: "Wind energy project environmental assessment",
    category: "assessment",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Environmental factors, wildlife impact, noise assessment",
    fields: [
      { id: generateFieldId(1110), type: "text", label: "Project Name", required: true },
      { id: generateFieldId(1111), type: "text", label: "Location Coordinates", required: true },
      { id: generateFieldId(1112), type: "text", label: "Number of Turbines", required: true },
      { id: generateFieldId(1113), type: "checkbox", label: "Environmental Factors", required: true, options: ["Wildlife Migration", "Noise Impact", "Visual Impact", "Soil Erosion", "Water Resources"] },
      { id: generateFieldId(1114), type: "textarea", label: "Mitigation Measures", required: true }
    ]
  },
  {
    id: "energy-4",
    name: "Utility Service Connection",
    description: "New utility service hookup request",
    category: "registration",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Service type, capacity requirements, connection timeline",
    fields: [
      { id: generateFieldId(1120), type: "text", label: "Service Address", required: true },
      { id: generateFieldId(1121), type: "select", label: "Service Type", required: true, options: ["Electricity", "Natural Gas", "Water", "Sewer"] },
      { id: generateFieldId(1122), type: "text", label: "Required Capacity", required: true },
      { id: generateFieldId(1123), type: "date", label: "Requested Connection Date", required: true },
      { id: generateFieldId(1124), type: "text", label: "Contractor Information", required: false }
    ]
  },
  {
    id: "energy-5",
    name: "Energy Audit Request",
    description: "Building energy efficiency evaluation",
    category: "assessment",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Building analysis, efficiency recommendations, cost savings",
    fields: [
      { id: generateFieldId(1130), type: "text", label: "Building Address", required: true },
      { id: generateFieldId(1131), type: "text", label: "Building Age", required: true },
      { id: generateFieldId(1132), type: "text", label: "Square Footage", required: true },
      { id: generateFieldId(1133), type: "checkbox", label: "Systems to Audit", required: true, options: ["HVAC", "Lighting", "Windows", "Insulation", "Appliances"] },
      { id: generateFieldId(1134), type: "select", label: "Audit Type", required: true, options: ["Basic", "Comprehensive", "Investment Grade"] }
    ]
  },
  {
    id: "energy-6",
    name: "Power Outage Report",
    description: "Electrical service disruption notification",
    category: "customer",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Outage location, affected customers, estimated restoration",
    fields: [
      { id: generateFieldId(1140), type: "text", label: "Affected Address", required: true },
      { id: generateFieldId(1141), type: "date", label: "Outage Start Time", required: true },
      { id: generateFieldId(1142), type: "select", label: "Outage Cause", required: false, options: ["Weather", "Equipment Failure", "Maintenance", "Accident", "Unknown"] },
      { id: generateFieldId(1143), type: "text", label: "Number of Affected Customers", required: false },
      { id: generateFieldId(1144), type: "textarea", label: "Additional Information", required: false }
    ]
  },
  {
    id: "energy-7",
    name: "Renewable Energy Certificate Trading",
    description: "Green energy credit trading and verification",
    category: "finance",
    sector: "energy",
    targetAudience: ["external"],
    preview: "REC details, trading terms, environmental verification",
    fields: [
      { id: generateFieldId(1150), type: "text", label: "Generator Name", required: true },
      { id: generateFieldId(1151), type: "select", label: "Energy Source", required: true, options: ["Solar", "Wind", "Hydro", "Biomass", "Geothermal"] },
      { id: generateFieldId(1152), type: "text", label: "MWh Generated", required: true },
      { id: generateFieldId(1153), type: "text", label: "Certificate Serial Number", required: true },
      { id: generateFieldId(1154), type: "date", label: "Generation Date", required: true }
    ]
  },
  {
    id: "energy-8",
    name: "Smart Grid Integration",
    description: "Advanced metering infrastructure deployment",
    category: "it",
    sector: "energy",
    targetAudience: ["internal"],
    preview: "Technology specifications, communication protocols, data management",
    fields: [
      { id: generateFieldId(1160), type: "text", label: "Deployment Area", required: true },
      { id: generateFieldId(1161), type: "text", label: "Number of Meters", required: true },
      { id: generateFieldId(1162), type: "select", label: "Communication Technology", required: true, options: ["RF Mesh", "Cellular", "Power Line", "Fiber Optic"] },
      { id: generateFieldId(1163), type: "checkbox", label: "Smart Grid Features", required: true, options: ["Demand Response", "Outage Management", "Load Forecasting", "Grid Analytics"] },
      { id: generateFieldId(1164), type: "date", label: "Implementation Date", required: true }
    ]
  },
  {
    id: "energy-9",
    name: "Electric Vehicle Charging Station",
    description: "EV charging infrastructure installation request",
    category: "registration",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Location assessment, charging capacity, grid impact",
    fields: [
      { id: generateFieldId(1170), type: "text", label: "Installation Address", required: true },
      { id: generateFieldId(1171), type: "select", label: "Charger Type", required: true, options: ["Level 1", "Level 2", "DC Fast Charger", "Tesla Supercharger"] },
      { id: generateFieldId(1172), type: "text", label: "Number of Charging Ports", required: true },
      { id: generateFieldId(1173), type: "text", label: "Power Requirements (kW)", required: true },
      { id: generateFieldId(1174), type: "radio", label: "Public Access", required: true, options: ["Yes", "No"] }
    ]
  },
  {
    id: "energy-10",
    name: "Energy Storage System Registration",
    description: "Battery energy storage system application",
    category: "registration",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Storage capacity, application type, grid services",
    fields: [
      { id: generateFieldId(1180), type: "text", label: "System Location", required: true },
      { id: generateFieldId(1181), type: "text", label: "Storage Capacity (MWh)", required: true },
      { id: generateFieldId(1182), type: "text", label: "Power Rating (MW)", required: true },
      { id: generateFieldId(1183), type: "select", label: "Application Type", required: true, options: ["Frequency Regulation", "Peak Shaving", "Backup Power", "Grid Stabilization"] },
      { id: generateFieldId(1184), type: "checkbox", label: "Battery Technology", required: true, options: ["Lithium-ion", "Flow Battery", "Compressed Air", "Pumped Hydro"] }
    ]
  },
  {
    id: "energy-11",
    name: "Carbon Emissions Monitoring",
    description: "Greenhouse gas emissions tracking and reporting",
    category: "compliance",
    sector: "energy",
    targetAudience: ["internal"],
    preview: "Emission sources, measurement protocols, reduction targets",
    fields: [
      { id: generateFieldId(1190), type: "text", label: "Facility Name", required: true },
      { id: generateFieldId(1191), type: "checkbox", label: "Emission Sources", required: true, options: ["Combustion", "Process", "Fugitive", "Electricity", "Transportation"] },
      { id: generateFieldId(1192), type: "text", label: "Total CO2 Equivalent (tons)", required: true },
      { id: generateFieldId(1193), type: "text", label: "Reporting Period", required: true },
      { id: generateFieldId(1194), type: "textarea", label: "Reduction Initiatives", required: false }
    ]
  },
  {
    id: "energy-12",
    name: "Hydroelectric Project Licensing",
    description: "Hydropower facility licensing and permitting",
    category: "compliance",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Project specifications, environmental impact, water rights",
    fields: [
      { id: generateFieldId(1200), type: "text", label: "Project Name", required: true },
      { id: generateFieldId(1201), type: "text", label: "Water Body", required: true },
      { id: generateFieldId(1202), type: "text", label: "Generation Capacity (MW)", required: true },
      { id: generateFieldId(1203), type: "text", label: "Dam Height (meters)", required: true },
      { id: generateFieldId(1204), type: "textarea", label: "Environmental Mitigation", required: true }
    ]
  },
  {
    id: "energy-13",
    name: "Energy Market Trading Registration",
    description: "Electricity market participant registration",
    category: "registration",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Market participation, trading capabilities, compliance requirements",
    fields: [
      { id: generateFieldId(1210), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(1211), type: "checkbox", label: "Market Functions", required: true, options: ["Generator", "Load Serving Entity", "Transmission", "Ancillary Services"] },
      { id: generateFieldId(1212), type: "text", label: "Credit Rating", required: true },
      { id: generateFieldId(1213), type: "text", label: "Financial Guarantee Amount", required: true },
      { id: generateFieldId(1214), type: "textarea", label: "Trading Strategy", required: false }
    ]
  },
  {
    id: "energy-14",
    name: "Demand Response Program Enrollment",
    description: "Customer demand reduction program participation",
    category: "registration",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Load reduction capability, participation terms, incentive structure",
    fields: [
      { id: generateFieldId(1220), type: "text", label: "Customer Name", required: true },
      { id: generateFieldId(1221), type: "text", label: "Peak Load (kW)", required: true },
      { id: generateFieldId(1222), type: "text", label: "Curtailable Load (kW)", required: true },
      { id: generateFieldId(1223), type: "select", label: "Response Time", required: true, options: ["Immediate", "30 minutes", "1 hour", "2 hours"] },
      { id: generateFieldId(1224), type: "checkbox", label: "Participation Months", required: true, options: ["June", "July", "August", "September", "October"] }
    ]
  },
  {
    id: "energy-15",
    name: "Geothermal Exploration Permit",
    description: "Geothermal resource exploration authorization",
    category: "registration",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Exploration area, drilling plans, environmental considerations",
    fields: [
      { id: generateFieldId(1230), type: "text", label: "Exploration Area", required: true },
      { id: generateFieldId(1231), type: "text", label: "Number of Test Wells", required: true },
      { id: generateFieldId(1232), type: "text", label: "Maximum Drilling Depth", required: true },
      { id: generateFieldId(1233), type: "textarea", label: "Geological Assessment", required: true },
      { id: generateFieldId(1234), type: "textarea", label: "Environmental Plan", required: true }
    ]
  },
  {
    id: "energy-16",
    name: "Energy Efficiency Rebate Application",
    description: "Customer energy efficiency incentive program",
    category: "finance",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Equipment upgrades, efficiency measures, rebate calculation",
    fields: [
      { id: generateFieldId(1240), type: "text", label: "Customer Account Number", required: true },
      { id: generateFieldId(1241), type: "checkbox", label: "Efficiency Measures", required: true, options: ["LED Lighting", "High-Efficiency HVAC", "Insulation", "Smart Thermostats", "Energy Star Appliances"] },
      { id: generateFieldId(1242), type: "text", label: "Total Project Cost", required: true },
      { id: generateFieldId(1243), type: "text", label: "Expected Energy Savings", required: true },
      { id: generateFieldId(1244), type: "date", label: "Installation Completion Date", required: true }
    ]
  },
  {
    id: "energy-17",
    name: "Transmission Line Maintenance",
    description: "High-voltage transmission system maintenance scheduling",
    category: "operations",
    sector: "energy",
    targetAudience: ["internal"],
    preview: "Maintenance scope, outage coordination, safety procedures",
    fields: [
      { id: generateFieldId(1250), type: "text", label: "Transmission Line ID", required: true },
      { id: generateFieldId(1251), type: "checkbox", label: "Maintenance Type", required: true, options: ["Routine Inspection", "Conductor Replacement", "Insulator Cleaning", "Vegetation Management", "Emergency Repair"] },
      { id: generateFieldId(1252), type: "date", label: "Scheduled Date", required: true },
      { id: generateFieldId(1253), type: "text", label: "Estimated Duration (hours)", required: true },
      { id: generateFieldId(1254), type: "textarea", label: "Safety Procedures", required: true }
    ]
  },
  {
    id: "energy-18",
    name: "Biofuel Production Certification",
    description: "Renewable fuel production verification and certification",
    category: "compliance",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Feedstock sources, production process, sustainability criteria",
    fields: [
      { id: generateFieldId(1260), type: "text", label: "Facility Name", required: true },
      { id: generateFieldId(1261), type: "select", label: "Biofuel Type", required: true, options: ["Ethanol", "Biodiesel", "Renewable Diesel", "Sustainable Aviation Fuel"] },
      { id: generateFieldId(1262), type: "checkbox", label: "Feedstock Sources", required: true, options: ["Corn", "Soybeans", "Used Cooking Oil", "Agricultural Waste", "Algae"] },
      { id: generateFieldId(1263), type: "text", label: "Annual Production Capacity", required: true },
      { id: generateFieldId(1264), type: "textarea", label: "Sustainability Measures", required: true }
    ]
  },
  {
    id: "energy-19",
    name: "Nuclear Safety Inspection",
    description: "Nuclear facility safety assessment and compliance",
    category: "compliance",
    sector: "energy",
    targetAudience: ["internal"],
    preview: "Safety systems, radiation monitoring, regulatory compliance",
    fields: [
      { id: generateFieldId(1270), type: "text", label: "Facility Name", required: true },
      { id: generateFieldId(1271), type: "date", label: "Inspection Date", required: true },
      { id: generateFieldId(1272), type: "checkbox", label: "Safety Systems", required: true, options: ["Reactor Cooling", "Containment", "Emergency Shutdown", "Radiation Monitoring", "Waste Management"] },
      { id: generateFieldId(1273), type: "text", label: "Inspector Name", required: true },
      { id: generateFieldId(1274), type: "textarea", label: "Findings", required: true }
    ]
  },
  {
    id: "energy-20",
    name: "Microgrid Development Application",
    description: "Local energy system development proposal",
    category: "registration",
    sector: "energy",
    targetAudience: ["external"],
    preview: "System design, energy sources, grid interconnection",
    fields: [
      { id: generateFieldId(1280), type: "text", label: "Project Name", required: true },
      { id: generateFieldId(1281), type: "text", label: "Service Area", required: true },
      { id: generateFieldId(1282), type: "checkbox", label: "Energy Sources", required: true, options: ["Solar", "Wind", "Battery Storage", "Natural Gas", "Diesel Generator"] },
      { id: generateFieldId(1283), type: "text", label: "Peak Load (MW)", required: true },
      { id: generateFieldId(1284), type: "radio", label: "Grid Connected", required: true, options: ["Yes", "No", "Island Capable"] }
    ]
  },
  {
    id: "energy-21",
    name: "Energy Data Analytics Request",
    description: "Energy consumption and performance data analysis",
    category: "assessment",
    sector: "energy",
    targetAudience: ["external"],
    preview: "Data requirements, analysis scope, reporting format",
    fields: [
      { id: generateFieldId(1290), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(1291), type: "checkbox", label: "Data Types", required: true, options: ["Energy Consumption", "Peak Demand", "Power Quality", "Renewable Generation", "Grid Stability"] },
      { id: generateFieldId(1292), type: "select", label: "Analysis Period", required: true, options: ["1 month", "3 months", "6 months", "1 year", "Custom"] },
      { id: generateFieldId(1293), type: "textarea", label: "Analysis Objectives", required: true },
      { id: generateFieldId(1294), type: "select", label: "Report Format", required: true, options: ["Dashboard", "Executive Summary", "Technical Report", "Raw Data Export"] }
    ]
  },

  // TELECOM SECTOR FORMS (20 forms)
  {
    id: "telecom-2",
    name: "Network Infrastructure Planning",
    description: "Telecommunications network expansion and upgrade planning",
    category: "operations",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Coverage area, technology specifications, capacity planning",
    fields: [
      { id: generateFieldId(1300), type: "text", label: "Project Name", required: true },
      { id: generateFieldId(1301), type: "text", label: "Coverage Area", required: true },
      { id: generateFieldId(1302), type: "select", label: "Technology Type", required: true, options: ["5G", "4G LTE", "Fiber Optic", "Satellite", "Fixed Wireless"] },
      { id: generateFieldId(1303), type: "text", label: "Expected Capacity (Gbps)", required: true },
      { id: generateFieldId(1304), type: "date", label: "Target Completion", required: true }
    ]
  },
  {
    id: "telecom-3",
    name: "Spectrum License Application",
    description: "Radio frequency spectrum licensing request",
    category: "compliance",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "Frequency band, coverage area, interference analysis",
    fields: [
      { id: generateFieldId(1310), type: "text", label: "Applicant Name", required: true },
      { id: generateFieldId(1311), type: "text", label: "Frequency Band", required: true },
      { id: generateFieldId(1312), type: "text", label: "Geographic Coverage", required: true },
      { id: generateFieldId(1313), type: "text", label: "Transmitter Power", required: true },
      { id: generateFieldId(1314), type: "textarea", label: "Interference Analysis", required: true }
    ]
  },
  {
    id: "telecom-4",
    name: "Mobile Device Management",
    description: "Corporate mobile device deployment and management",
    category: "it",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "Device allocation, security policies, usage monitoring",
    fields: [
      { id: generateFieldId(1320), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(1321), type: "text", label: "Number of Devices", required: true },
      { id: generateFieldId(1322), type: "checkbox", label: "Device Types", required: true, options: ["Smartphones", "Tablets", "Laptops", "IoT Devices", "Wearables"] },
      { id: generateFieldId(1323), type: "checkbox", label: "Security Features", required: true, options: ["Encryption", "Remote Wipe", "App Control", "VPN", "Biometric"] },
      { id: generateFieldId(1324), type: "select", label: "Data Plan", required: true, options: ["Unlimited", "Shared Pool", "Individual Plans", "Custom"] }
    ]
  },
  {
    id: "telecom-5",
    name: "Fiber Optic Installation",
    description: "Fiber-to-the-home/business installation request",
    category: "registration",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "Installation address, service requirements, construction needs",
    fields: [
      { id: generateFieldId(1330), type: "text", label: "Installation Address", required: true },
      { id: generateFieldId(1331), type: "select", label: "Service Type", required: true, options: ["Residential", "Business", "Enterprise", "Wholesale"] },
      { id: generateFieldId(1332), type: "text", label: "Bandwidth Requirements", required: true },
      { id: generateFieldId(1333), type: "radio", label: "Construction Required", required: true, options: ["Yes", "No", "Assessment Needed"] },
      { id: generateFieldId(1334), type: "date", label: "Requested Installation Date", required: true }
    ]
  },
  {
    id: "telecom-6",
    name: "Network Security Incident",
    description: "Telecommunications network security breach report",
    category: "security",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Incident details, impact assessment, response actions",
    fields: [
      { id: generateFieldId(1340), type: "text", label: "Incident ID", required: true },
      { id: generateFieldId(1341), type: "date", label: "Detection Date", required: true },
      { id: generateFieldId(1342), type: "select", label: "Threat Type", required: true, options: ["DDoS Attack", "Data Breach", "Malware", "Unauthorized Access", "System Compromise"] },
      { id: generateFieldId(1343), type: "textarea", label: "Impact Assessment", required: true },
      { id: generateFieldId(1344), type: "textarea", label: "Response Actions", required: true }
    ]
  },
  {
    id: "telecom-7",
    name: "International Roaming Agreement",
    description: "Cross-border mobile service partnership",
    category: "business",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "Partner carrier, service areas, pricing structure",
    fields: [
      { id: generateFieldId(1350), type: "text", label: "Partner Carrier", required: true },
      { id: generateFieldId(1351), type: "checkbox", label: "Countries Covered", required: true, options: ["North America", "Europe", "Asia Pacific", "Latin America", "Africa"] },
      { id: generateFieldId(1352), type: "checkbox", label: "Services Included", required: true, options: ["Voice", "SMS", "Data", "Emergency Services"] },
      { id: generateFieldId(1353), type: "textarea", label: "Pricing Structure", required: true },
      { id: generateFieldId(1354), type: "date", label: "Agreement Start Date", required: true }
    ]
  },
  {
    id: "telecom-8",
    name: "Cell Tower Site Acquisition",
    description: "New cell tower location evaluation and acquisition",
    category: "procurement",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Site location, coverage analysis, zoning requirements",
    fields: [
      { id: generateFieldId(1360), type: "text", label: "Site Address", required: true },
      { id: generateFieldId(1361), type: "text", label: "Tower Height", required: true },
      { id: generateFieldId(1362), type: "text", label: "Coverage Radius", required: true },
      { id: generateFieldId(1363), type: "checkbox", label: "Zoning Approvals", required: true, options: ["Building Permit", "Environmental", "FAA Clearance", "Local Permits"] },
      { id: generateFieldId(1364), type: "text", label: "Monthly Lease Cost", required: true }
    ]
  },
  {
    id: "telecom-9",
    name: "Voice over IP Configuration",
    description: "VoIP system setup and configuration",
    category: "it",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "System requirements, feature configuration, quality parameters",
    fields: [
      { id: generateFieldId(1370), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(1371), type: "text", label: "Number of Extensions", required: true },
      { id: generateFieldId(1372), type: "checkbox", label: "Features Required", required: true, options: ["Call Forwarding", "Voicemail", "Conference Calling", "Auto Attendant", "Call Recording"] },
      { id: generateFieldId(1373), type: "text", label: "Bandwidth Allocation", required: true },
      { id: generateFieldId(1374), type: "select", label: "Quality of Service", required: true, options: ["Standard", "High", "Premium", "Enterprise"] }
    ]
  },
  {
    id: "telecom-10",
    name: "Emergency Communication System",
    description: "Critical communication infrastructure for emergencies",
    category: "operations",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Emergency protocols, backup systems, priority routing",
    fields: [
      { id: generateFieldId(1380), type: "text", label: "Emergency Type", required: true },
      { id: generateFieldId(1381), type: "checkbox", label: "Communication Methods", required: true, options: ["Cellular", "Satellite", "Radio", "Internet", "Landline"] },
      { id: generateFieldId(1382), type: "text", label: "Coverage Area", required: true },
      { id: generateFieldId(1383), type: "textarea", label: "Priority Routing Rules", required: true },
      { id: generateFieldId(1384), type: "text", label: "Backup Power Duration", required: true }
    ]
  },
  {
    id: "telecom-11",
    name: "Satellite Communication Setup",
    description: "Satellite-based communication service configuration",
    category: "registration",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "Satellite selection, ground equipment, service parameters",
    fields: [
      { id: generateFieldId(1390), type: "text", label: "Customer Location", required: true },
      { id: generateFieldId(1391), type: "select", label: "Satellite System", required: true, options: ["Geostationary", "Low Earth Orbit", "Medium Earth Orbit", "Hybrid"] },
      { id: generateFieldId(1392), type: "text", label: "Bandwidth Requirements", required: true },
      { id: generateFieldId(1393), type: "checkbox", label: "Equipment Needed", required: true, options: ["Dish Antenna", "Modem", "Router", "Amplifier", "Weather Protection"] },
      { id: generateFieldId(1394), type: "select", label: "Service Level", required: true, options: ["Basic", "Standard", "Premium", "Enterprise"] }
    ]
  },
  {
    id: "telecom-12",
    name: "Network Performance Monitoring",
    description: "Telecommunications network quality and performance tracking",
    category: "operations",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Performance metrics, monitoring tools, threshold alerts",
    fields: [
      { id: generateFieldId(1400), type: "text", label: "Network Segment", required: true },
      { id: generateFieldId(1401), type: "checkbox", label: "Performance Metrics", required: true, options: ["Latency", "Throughput", "Packet Loss", "Jitter", "Availability"] },
      { id: generateFieldId(1402), type: "text", label: "Monitoring Interval", required: true },
      { id: generateFieldId(1403), type: "textarea", label: "Alert Thresholds", required: true },
      { id: generateFieldId(1404), type: "select", label: "Reporting Frequency", required: true, options: ["Real-time", "Hourly", "Daily", "Weekly", "Monthly"] }
    ]
  },
  {
    id: "telecom-13",
    name: "Customer Service Ticket",
    description: "Telecommunications service issue resolution",
    category: "customer",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "Service issue, troubleshooting steps, resolution tracking",
    fields: [
      { id: generateFieldId(1410), type: "text", label: "Customer Account Number", required: true },
      { id: generateFieldId(1411), type: "select", label: "Issue Type", required: true, options: ["No Service", "Poor Signal", "Billing Issue", "Equipment Problem", "Service Request"] },
      { id: generateFieldId(1412), type: "textarea", label: "Issue Description", required: true },
      { id: generateFieldId(1413), type: "select", label: "Priority Level", required: true, options: ["Low", "Medium", "High", "Critical"] },
      { id: generateFieldId(1414), type: "textarea", label: "Troubleshooting Steps", required: false }
    ]
  },
  {
    id: "telecom-14",
    name: "IoT Device Connectivity",
    description: "Internet of Things device network integration",
    category: "it",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "Device specifications, connectivity requirements, data plans",
    fields: [
      { id: generateFieldId(1420), type: "text", label: "Device Type", required: true },
      { id: generateFieldId(1421), type: "text", label: "Number of Devices", required: true },
      { id: generateFieldId(1422), type: "select", label: "Connectivity Type", required: true, options: ["Cellular", "LoRaWAN", "NB-IoT", "Wi-Fi", "Bluetooth"] },
      { id: generateFieldId(1423), type: "text", label: "Data Usage Per Device (MB/month)", required: true },
      { id: generateFieldId(1424), type: "checkbox", label: "Device Management", required: true, options: ["Remote Configuration", "Firmware Updates", "Monitoring", "Diagnostics"] }
    ]
  },
  {
    id: "telecom-15",
    name: "Telecom Equipment Procurement",
    description: "Network equipment purchase and deployment",
    category: "procurement",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Equipment specifications, vendor selection, deployment plan",
    fields: [
      { id: generateFieldId(1430), type: "text", label: "Equipment Type", required: true },
      { id: generateFieldId(1431), type: "text", label: "Quantity Required", required: true },
      { id: generateFieldId(1432), type: "text", label: "Technical Specifications", required: true },
      { id: generateFieldId(1433), type: "text", label: "Budget Allocation", required: true },
      { id: generateFieldId(1434), type: "date", label: "Required Delivery Date", required: true }
    ]
  },
  {
    id: "telecom-16",
    name: "Network Capacity Planning",
    description: "Telecommunications network capacity assessment and planning",
    category: "operations",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Traffic analysis, growth projections, upgrade requirements",
    fields: [
      { id: generateFieldId(1440), type: "text", label: "Network Area", required: true },
      { id: generateFieldId(1441), type: "text", label: "Current Traffic Volume", required: true },
      { id: generateFieldId(1442), type: "text", label: "Projected Growth Rate", required: true },
      { id: generateFieldId(1443), type: "text", label: "Peak Usage Hours", required: true },
      { id: generateFieldId(1444), type: "textarea", label: "Upgrade Recommendations", required: true }
    ]
  },
  {
    id: "telecom-17",
    name: "Regulatory Compliance Filing",
    description: "Telecommunications regulatory reporting and compliance",
    category: "compliance",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Regulatory requirements, compliance status, filing deadlines",
    fields: [
      { id: generateFieldId(1450), type: "text", label: "Regulatory Agency", required: true },
      { id: generateFieldId(1451), type: "text", label: "Filing Type", required: true },
      { id: generateFieldId(1452), type: "date", label: "Filing Deadline", required: true },
      { id: generateFieldId(1453), type: "checkbox", label: "Compliance Areas", required: true, options: ["Network Security", "Customer Privacy", "Service Quality", "Emergency Services", "Accessibility"] },
      { id: generateFieldId(1454), type: "textarea", label: "Compliance Status", required: true }
    ]
  },
  {
    id: "telecom-18",
    name: "Unified Communications Implementation",
    description: "Integrated communication platform deployment",
    category: "it",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "Platform features, integration requirements, user training",
    fields: [
      { id: generateFieldId(1460), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(1461), type: "text", label: "Number of Users", required: true },
      { id: generateFieldId(1462), type: "checkbox", label: "Communication Features", required: true, options: ["Voice Calls", "Video Conferencing", "Instant Messaging", "File Sharing", "Screen Sharing"] },
      { id: generateFieldId(1463), type: "checkbox", label: "Integration Requirements", required: true, options: ["Email", "Calendar", "CRM", "Document Management", "ERP"] },
      { id: generateFieldId(1464), type: "select", label: "Deployment Type", required: true, options: ["Cloud-based", "On-premise", "Hybrid", "Hosted"] }
    ]
  },
  {
    id: "telecom-19",
    name: "Network Redundancy Planning",
    description: "Backup and failover system configuration",
    category: "operations",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Redundancy requirements, failover protocols, recovery procedures",
    fields: [
      { id: generateFieldId(1470), type: "text", label: "Critical Network Segment", required: true },
      { id: generateFieldId(1471), type: "checkbox", label: "Redundancy Types", required: true, options: ["Equipment Redundancy", "Path Redundancy", "Site Redundancy", "Power Backup", "Data Backup"] },
      { id: generateFieldId(1472), type: "text", label: "Failover Time Target", required: true },
      { id: generateFieldId(1473), type: "textarea", label: "Recovery Procedures", required: true },
      { id: generateFieldId(1474), type: "select", label: "Testing Frequency", required: true, options: ["Monthly", "Quarterly", "Semi-annual", "Annual"] }
    ]
  },
  {
    id: "telecom-20",
    name: "Digital Transformation Assessment",
    description: "Telecommunications infrastructure modernization evaluation",
    category: "assessment",
    sector: "telecom",
    targetAudience: ["external"],
    preview: "Current state analysis, modernization roadmap, technology adoption",
    fields: [
      { id: generateFieldId(1480), type: "text", label: "Organization Name", required: true },
      { id: generateFieldId(1481), type: "checkbox", label: "Current Technologies", required: true, options: ["Legacy Systems", "Cloud Services", "5G Network", "IoT Platform", "AI/ML Tools"] },
      { id: generateFieldId(1482), type: "checkbox", label: "Modernization Goals", required: true, options: ["Cost Reduction", "Performance Improvement", "Scalability", "Security Enhancement", "Innovation"] },
      { id: generateFieldId(1483), type: "textarea", label: "Business Objectives", required: true },
      { id: generateFieldId(1484), type: "select", label: "Implementation Timeline", required: true, options: ["6 months", "1 year", "2 years", "3+ years"] }
    ]
  },
  {
    id: "telecom-21",
    name: "Wireless Signal Optimization",
    description: "Mobile network signal strength and quality improvement",
    category: "operations",
    sector: "telecom",
    targetAudience: ["internal"],
    preview: "Coverage analysis, interference mitigation, antenna optimization",
    fields: [
      { id: generateFieldId(1490), type: "text", label: "Optimization Area", required: true },
      { id: generateFieldId(1491), type: "checkbox", label: "Signal Issues", required: true, options: ["Weak Coverage", "Interference", "Dropped Calls", "Slow Data", "Poor Indoor Coverage"] },
      { id: generateFieldId(1492), type: "text", label: "Current Signal Strength (dBm)", required: true },
      { id: generateFieldId(1493), type: "textarea", label: "Optimization Techniques", required: true },
      { id: generateFieldId(1494), type: "text", label: "Expected Improvement", required: true }
    ]
  },

  // STARTUPS SECTOR FORMS (20 forms)
  {
    id: "startup-2",
    name: "Business Plan Submission",
    description: "Comprehensive business plan for startup evaluation",
    category: "business",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Executive summary, market analysis, financial projections",
    fields: [
      { id: generateFieldId(1500), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(1501), type: "textarea", label: "Executive Summary", required: true },
      { id: generateFieldId(1502), type: "textarea", label: "Market Analysis", required: true },
      { id: generateFieldId(1503), type: "text", label: "Target Market Size", required: true },
      { id: generateFieldId(1504), type: "textarea", label: "Revenue Model", required: true }
    ]
  },
  {
    id: "startup-3",
    name: "Venture Capital Pitch Deck",
    description: "Investment presentation for venture capital funding",
    category: "finance",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Problem statement, solution, market opportunity, team",
    fields: [
      { id: generateFieldId(1510), type: "text", label: "Startup Name", required: true },
      { id: generateFieldId(1511), type: "textarea", label: "Problem Statement", required: true },
      { id: generateFieldId(1512), type: "textarea", label: "Solution Description", required: true },
      { id: generateFieldId(1513), type: "text", label: "Market Size (TAM)", required: true },
      { id: generateFieldId(1514), type: "text", label: "Funding Amount Sought", required: true }
    ]
  },
  {
    id: "startup-4",
    name: "Intellectual Property Application",
    description: "Patent and trademark application for startup innovations",
    category: "legal",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Innovation description, prior art, commercial application",
    fields: [
      { id: generateFieldId(1520), type: "text", label: "Innovation Title", required: true },
      { id: generateFieldId(1521), type: "textarea", label: "Technical Description", required: true },
      { id: generateFieldId(1522), type: "select", label: "IP Type", required: true, options: ["Patent", "Trademark", "Copyright", "Trade Secret"] },
      { id: generateFieldId(1523), type: "textarea", label: "Commercial Application", required: true },
      { id: generateFieldId(1524), type: "text", label: "Inventor(s)", required: true }
    ]
  },
  {
    id: "startup-5",
    name: "Accelerator Program Application",
    description: "Startup accelerator and incubator program application",
    category: "business",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Company overview, team background, growth potential",
    fields: [
      { id: generateFieldId(1530), type: "text", label: "Startup Name", required: true },
      { id: generateFieldId(1531), type: "text", label: "Stage of Development", required: true },
      { id: generateFieldId(1532), type: "textarea", label: "Team Background", required: true },
      { id: generateFieldId(1533), type: "text", label: "Current Revenue", required: false },
      { id: generateFieldId(1534), type: "textarea", label: "Growth Strategy", required: true }
    ]
  },
  {
    id: "startup-6",
    name: "MVP Development Plan",
    description: "Minimum viable product development and testing strategy",
    category: "project",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Product features, development timeline, testing approach",
    fields: [
      { id: generateFieldId(1540), type: "text", label: "Product Name", required: true },
      { id: generateFieldId(1541), type: "checkbox", label: "Core Features", required: true, options: ["User Registration", "Core Functionality", "Payment Processing", "Analytics", "Mobile App"] },
      { id: generateFieldId(1542), type: "text", label: "Development Timeline", required: true },
      { id: generateFieldId(1543), type: "textarea", label: "Testing Strategy", required: true },
      { id: generateFieldId(1544), type: "text", label: "Success Metrics", required: true }
    ]
  },
  {
    id: "startup-7",
    name: "Angel Investor Outreach",
    description: "Angel investor engagement and funding request",
    category: "finance",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Investment proposal, use of funds, investor benefits",
    fields: [
      { id: generateFieldId(1550), type: "text", label: "Company Name", required: true },
      { id: generateFieldId(1551), type: "text", label: "Investment Amount", required: true },
      { id: generateFieldId(1552), type: "text", label: "Equity Percentage", required: true },
      { id: generateFieldId(1553), type: "textarea", label: "Use of Funds", required: true },
      { id: generateFieldId(1554), type: "textarea", label: "Investor Benefits", required: true }
    ]
  },
  {
    id: "startup-8",
    name: "Market Research Survey",
    description: "Customer validation and market research data collection",
    category: "assessment",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Target audience, research objectives, data collection methods",
    fields: [
      { id: generateFieldId(1560), type: "text", label: "Research Objective", required: true },
      { id: generateFieldId(1561), type: "textarea", label: "Target Audience", required: true },
      { id: generateFieldId(1562), type: "checkbox", label: "Research Methods", required: true, options: ["Surveys", "Interviews", "Focus Groups", "A/B Testing", "Analytics"] },
      { id: generateFieldId(1563), type: "text", label: "Sample Size", required: true },
      { id: generateFieldId(1564), type: "textarea", label: "Key Questions", required: true }
    ]
  },
  {
    id: "startup-9",
    name: "Co-founder Agreement",
    description: "Startup co-founder roles and equity agreement",
    category: "legal",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Equity distribution, roles, vesting schedule, exit terms",
    fields: [
      { id: generateFieldId(1570), type: "text", label: "Co-founder Name", required: true },
      { id: generateFieldId(1571), type: "text", label: "Equity Percentage", required: true },
      { id: generateFieldId(1572), type: "textarea", label: "Roles and Responsibilities", required: true },
      { id: generateFieldId(1573), type: "text", label: "Vesting Period", required: true },
      { id: generateFieldId(1574), type: "textarea", label: "Exit Conditions", required: true }
    ]
  },
  {
    id: "startup-10",
    name: "Product Launch Strategy",
    description: "Go-to-market strategy for product launch",
    category: "marketing",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Launch timeline, marketing channels, success metrics",
    fields: [
      { id: generateFieldId(1580), type: "text", label: "Product Name", required: true },
      { id: generateFieldId(1581), type: "date", label: "Launch Date", required: true },
      { id: generateFieldId(1582), type: "checkbox", label: "Marketing Channels", required: true, options: ["Social Media", "Email", "Content Marketing", "PR", "Paid Advertising"] },
      { id: generateFieldId(1583), type: "text", label: "Launch Budget", required: true },
      { id: generateFieldId(1584), type: "textarea", label: "Success Metrics", required: true }
    ]
  },
  {
    id: "startup-11",
    name: "Customer Discovery Interview",
    description: "Customer problem validation and solution fit assessment",
    category: "assessment",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Problem validation, solution feedback, customer needs",
    fields: [
      { id: generateFieldId(1590), type: "text", label: "Interviewee Name", required: true },
      { id: generateFieldId(1591), type: "text", label: "Company/Role", required: true },
      { id: generateFieldId(1592), type: "textarea", label: "Problem Description", required: true },
      { id: generateFieldId(1593), type: "rating", label: "Problem Severity", required: true },
      { id: generateFieldId(1594), type: "textarea", label: "Current Solutions Used", required: false }
    ]
  },
  {
    id: "startup-12",
    name: "Startup Metrics Dashboard",
    description: "Key performance indicators tracking and reporting",
    category: "assessment",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Growth metrics, financial indicators, user engagement",
    fields: [
      { id: generateFieldId(1600), type: "text", label: "Reporting Period", required: true },
      { id: generateFieldId(1601), type: "text", label: "Monthly Recurring Revenue", required: false },
      { id: generateFieldId(1602), type: "text", label: "Customer Acquisition Cost", required: false },
      { id: generateFieldId(1603), type: "text", label: "Churn Rate", required: false },
      { id: generateFieldId(1604), type: "text", label: "Monthly Active Users", required: false }
    ]
  },
  {
    id: "startup-13",
    name: "Regulatory Compliance Assessment",
    description: "Startup regulatory requirements and compliance planning",
    category: "compliance",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Industry regulations, compliance status, action plan",
    fields: [
      { id: generateFieldId(1610), type: "text", label: "Business Industry", required: true },
      { id: generateFieldId(1611), type: "checkbox", label: "Applicable Regulations", required: true, options: ["GDPR", "CCPA", "HIPAA", "SOX", "PCI DSS", "Industry Specific"] },
      { id: generateFieldId(1612), type: "textarea", label: "Current Compliance Status", required: true },
      { id: generateFieldId(1613), type: "textarea", label: "Compliance Action Plan", required: true },
      { id: generateFieldId(1614), type: "date", label: "Target Compliance Date", required: true }
    ]
  },
  {
    id: "startup-14",
    name: "Technology Stack Assessment",
    description: "Startup technology infrastructure evaluation and planning",
    category: "it",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Current technology, scalability needs, upgrade plan",
    fields: [
      { id: generateFieldId(1620), type: "checkbox", label: "Current Technologies", required: true, options: ["Cloud Infrastructure", "Database", "Frontend Framework", "Backend Services", "DevOps Tools"] },
      { id: generateFieldId(1621), type: "text", label: "Expected User Growth", required: true },
      { id: generateFieldId(1622), type: "checkbox", label: "Scalability Concerns", required: true, options: ["Performance", "Security", "Cost", "Maintenance", "Integration"] },
      { id: generateFieldId(1623), type: "textarea", label: "Technology Roadmap", required: true },
      { id: generateFieldId(1624), type: "text", label: "Technology Budget", required: true }
    ]
  },
  {
    id: "startup-15",
    name: "Partnership Agreement Proposal",
    description: "Strategic partnership opportunity evaluation",
    category: "business",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Partnership type, mutual benefits, collaboration terms",
    fields: [
      { id: generateFieldId(1630), type: "text", label: "Partner Company", required: true },
      { id: generateFieldId(1631), type: "select", label: "Partnership Type", required: true, options: ["Technology", "Marketing", "Sales", "Distribution", "Strategic"] },
      { id: generateFieldId(1632), type: "textarea", label: "Mutual Benefits", required: true },
      { id: generateFieldId(1633), type: "textarea", label: "Collaboration Scope", required: true },
      { id: generateFieldId(1634), type: "text", label: "Partnership Duration", required: true }
    ]
  },
  {
    id: "startup-16",
    name: "Employee Stock Option Plan",
    description: "Startup equity compensation program design",
    category: "hr",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Option pool size, vesting schedule, exercise terms",
    fields: [
      { id: generateFieldId(1640), type: "text", label: "Option Pool Percentage", required: true },
      { id: generateFieldId(1641), type: "text", label: "Vesting Period (years)", required: true },
      { id: generateFieldId(1642), type: "text", label: "Cliff Period (months)", required: true },
      { id: generateFieldId(1643), type: "textarea", label: "Eligibility Criteria", required: true },
      { id: generateFieldId(1644), type: "text", label: "Exercise Price", required: true }
    ]
  },
  {
    id: "startup-17",
    name: "Customer Onboarding Process",
    description: "New customer experience and onboarding workflow",
    category: "customer",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Onboarding steps, success metrics, user experience",
    fields: [
      { id: generateFieldId(1650), type: "checkbox", label: "Onboarding Steps", required: true, options: ["Account Creation", "Profile Setup", "Feature Tutorial", "First Use Case", "Support Contact"] },
      { id: generateFieldId(1651), type: "text", label: "Target Onboarding Time", required: true },
      { id: generateFieldId(1652), type: "textarea", label: "Success Criteria", required: true },
      { id: generateFieldId(1653), type: "checkbox", label: "Support Materials", required: true, options: ["Video Tutorials", "Documentation", "In-app Guidance", "Live Chat", "Email Support"] },
      { id: generateFieldId(1654), type: "text", label: "Conversion Target (%)", required: true }
    ]
  },
  {
    id: "startup-18",
    name: "Competitive Analysis Report",
    description: "Market competition assessment and positioning",
    category: "assessment",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Competitor analysis, market positioning, differentiation",
    fields: [
      { id: generateFieldId(1660), type: "text", label: "Primary Competitor", required: true },
      { id: generateFieldId(1661), type: "checkbox", label: "Comparison Factors", required: true, options: ["Features", "Pricing", "Market Share", "Customer Base", "Technology"] },
      { id: generateFieldId(1662), type: "textarea", label: "Competitive Advantages", required: true },
      { id: generateFieldId(1663), type: "textarea", label: "Market Gaps", required: true },
      { id: generateFieldId(1664), type: "textarea", label: "Differentiation Strategy", required: true }
    ]
  },
  {
    id: "startup-19",
    name: "Investor Relations Update",
    description: "Regular investor communication and progress reporting",
    category: "finance",
    sector: "startups",
    targetAudience: ["external"],
    preview: "Business progress, financial metrics, milestone updates",
    fields: [
      { id: generateFieldId(1670), type: "text", label: "Reporting Period", required: true },
      { id: generateFieldId(1671), type: "textarea", label: "Business Highlights", required: true },
      { id: generateFieldId(1672), type: "text", label: "Revenue Growth", required: false },
      { id: generateFieldId(1673), type: "textarea", label: "Key Milestones Achieved", required: true },
      { id: generateFieldId(1674), type: "textarea", label: "Upcoming Objectives", required: true }
    ]
  },
  {
    id: "startup-20",
    name: "Exit Strategy Planning",
    description: "Startup exit strategy development and evaluation",
    category: "business",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Exit options, valuation targets, timeline planning",
    fields: [
      { id: generateFieldId(1680), type: "checkbox", label: "Exit Options", required: true, options: ["IPO", "Acquisition", "Merger", "Management Buyout", "Strategic Sale"] },
      { id: generateFieldId(1681), type: "text", label: "Target Valuation", required: true },
      { id: generateFieldId(1682), type: "text", label: "Expected Timeline", required: true },
      { id: generateFieldId(1683), type: "textarea", label: "Value Creation Plan", required: true },
      { id: generateFieldId(1684), type: "textarea", label: "Risk Factors", required: true }
    ]
  },
  {
    id: "startup-21",
    name: "Startup Hiring Plan",
    description: "Talent acquisition strategy and workforce planning",
    category: "hr",
    sector: "startups",
    targetAudience: ["internal"],
    preview: "Hiring needs, role priorities, compensation strategy",
    fields: [
      { id: generateFieldId(1690), type: "text", label: "Hiring Period", required: true },
      { id: generateFieldId(1691), type: "checkbox", label: "Priority Roles", required: true, options: ["Engineering", "Sales", "Marketing", "Product", "Operations"] },
      { id: generateFieldId(1692), type: "text", label: "Total Headcount Target", required: true },
      { id: generateFieldId(1693), type: "text", label: "Hiring Budget", required: true },
      { id: generateFieldId(1694), type: "textarea", label: "Compensation Strategy", required: true }
    ]
  },

  // SME SECTOR FORMS (20 forms)
  {
    id: "sme-2",
    name: "Small Business Registration",
    description: "Small and medium enterprise business registration",
    category: "registration",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Business details, ownership structure, registration requirements",
    fields: [
      { id: generateFieldId(1700), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(1701), type: "select", label: "Business Structure", required: true, options: ["Sole Proprietorship", "Partnership", "LLC", "Corporation"] },
      { id: generateFieldId(1702), type: "text", label: "Industry Type", required: true },
      { id: generateFieldId(1703), type: "text", label: "Number of Employees", required: true },
      { id: generateFieldId(1704), type: "text", label: "Annual Revenue", required: true }
    ]
  },
  {
    id: "sme-3",
    name: "Working Capital Loan",
    description: "Short-term financing for business operations",
    category: "finance",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Cash flow needs, repayment terms, collateral requirements",
    fields: [
      { id: generateFieldId(1710), type: "text", label: "Loan Amount", required: true },
      { id: generateFieldId(1711), type: "select", label: "Loan Purpose", required: true, options: ["Inventory", "Payroll", "Equipment", "Marketing", "Expansion"] },
      { id: generateFieldId(1712), type: "text", label: "Repayment Period", required: true },
      { id: generateFieldId(1713), type: "textarea", label: "Cash Flow Projection", required: true },
      { id: generateFieldId(1714), type: "text", label: "Collateral Offered", required: false }
    ]
  },
  {
    id: "sme-4",
    name: "Export Documentation",
    description: "International trade documentation for SME exports",
    category: "compliance",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Export details, documentation requirements, customs compliance",
    fields: [
      { id: generateFieldId(1720), type: "text", label: "Destination Country", required: true },
      { id: generateFieldId(1721), type: "text", label: "Product Description", required: true },
      { id: generateFieldId(1722), type: "text", label: "Export Value", required: true },
      { id: generateFieldId(1723), type: "checkbox", label: "Required Documents", required: true, options: ["Commercial Invoice", "Packing List", "Certificate of Origin", "Export License", "Insurance"] },
      { id: generateFieldId(1724), type: "text", label: "Shipping Method", required: true }
    ]
  },
  {
    id: "sme-5",
    name: "Digital Marketing Plan",
    description: "Online marketing strategy for small businesses",
    category: "marketing",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Marketing objectives, target audience, digital channels",
    fields: [
      { id: generateFieldId(1730), type: "textarea", label: "Marketing Objectives", required: true },
      { id: generateFieldId(1731), type: "textarea", label: "Target Audience", required: true },
      { id: generateFieldId(1732), type: "checkbox", label: "Digital Channels", required: true, options: ["Social Media", "Email Marketing", "SEO", "PPC Advertising", "Content Marketing"] },
      { id: generateFieldId(1733), type: "text", label: "Marketing Budget", required: true },
      { id: generateFieldId(1734), type: "textarea", label: "Success Metrics", required: true }
    ]
  },
  {
    id: "sme-6",
    name: "Supply Chain Management",
    description: "Supplier relationship and inventory management",
    category: "operations",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Supplier evaluation, inventory levels, procurement process",
    fields: [
      { id: generateFieldId(1740), type: "text", label: "Supplier Name", required: true },
      { id: generateFieldId(1741), type: "text", label: "Product/Service", required: true },
      { id: generateFieldId(1742), type: "text", label: "Lead Time (days)", required: true },
      { id: generateFieldId(1743), type: "rating", label: "Supplier Performance", required: true },
      { id: generateFieldId(1744), type: "text", label: "Contract Value", required: true }
    ]
  },
  {
    id: "sme-7",
    name: "Employee Performance Review",
    description: "Staff evaluation and development planning",
    category: "hr",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Performance assessment, goal setting, development needs",
    fields: [
      { id: generateFieldId(1750), type: "text", label: "Employee Name", required: true },
      { id: generateFieldId(1751), type: "text", label: "Review Period", required: true },
      { id: generateFieldId(1752), type: "rating", label: "Overall Performance", required: true },
      { id: generateFieldId(1753), type: "textarea", label: "Key Achievements", required: true },
      { id: generateFieldId(1754), type: "textarea", label: "Development Goals", required: true }
    ]
  },
  {
    id: "sme-8",
    name: "Customer Relationship Management",
    description: "Customer data and interaction management",
    category: "customer",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Customer profile, interaction history, sales opportunities",
    fields: [
      { id: generateFieldId(1760), type: "text", label: "Customer Name", required: true },
      { id: generateFieldId(1761), type: "text", label: "Contact Information", required: true },
      { id: generateFieldId(1762), type: "select", label: "Customer Type", required: true, options: ["New Lead", "Existing Customer", "Returning Customer", "VIP Customer"] },
      { id: generateFieldId(1763), type: "textarea", label: "Interaction History", required: false },
      { id: generateFieldId(1764), type: "text", label: "Sales Opportunity Value", required: false }
    ]
  },
  {
    id: "sme-9",
    name: "Quality Control Checklist",
    description: "Product and service quality assurance",
    category: "quality",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Quality standards, inspection procedures, corrective actions",
    fields: [
      { id: generateFieldId(1770), type: "text", label: "Product/Service", required: true },
      { id: generateFieldId(1771), type: "checkbox", label: "Quality Criteria", required: true, options: ["Specifications Met", "No Defects", "Proper Packaging", "Documentation Complete", "Customer Requirements"] },
      { id: generateFieldId(1772), type: "select", label: "Quality Rating", required: true, options: ["Excellent", "Good", "Acceptable", "Needs Improvement", "Rejected"] },
      { id: generateFieldId(1773), type: "textarea", label: "Issues Found", required: false },
      { id: generateFieldId(1774), type: "textarea", label: "Corrective Actions", required: false }
    ]
  },
  {
    id: "sme-10",
    name: "Business Insurance Assessment",
    description: "SME insurance needs analysis and coverage planning",
    category: "assessment",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Business risks, coverage requirements, insurance types",
    fields: [
      { id: generateFieldId(1780), type: "text", label: "Business Type", required: true },
      { id: generateFieldId(1781), type: "text", label: "Number of Employees", required: true },
      { id: generateFieldId(1782), type: "text", label: "Annual Revenue", required: true },
      { id: generateFieldId(1783), type: "checkbox", label: "Risk Factors", required: true, options: ["Property Damage", "Liability", "Cyber Attacks", "Business Interruption", "Employee Injury"] },
      { id: generateFieldId(1784), type: "checkbox", label: "Insurance Types Needed", required: true, options: ["General Liability", "Property", "Workers Comp", "Cyber Liability", "Professional Liability"] }
    ]
  },
  {
    id: "sme-11",
    name: "Technology Upgrade Plan",
    description: "IT infrastructure modernization for small businesses",
    category: "it",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Current technology, upgrade needs, implementation plan",
    fields: [
      { id: generateFieldId(1790), type: "checkbox", label: "Current Systems", required: true, options: ["Desktop Computers", "Server", "Cloud Services", "POS System", "Accounting Software"] },
      { id: generateFieldId(1791), type: "checkbox", label: "Upgrade Needs", required: true, options: ["Hardware", "Software", "Internet", "Security", "Backup"] },
      { id: generateFieldId(1792), type: "text", label: "Upgrade Budget", required: true },
      { id: generateFieldId(1793), type: "text", label: "Implementation Timeline", required: true },
      { id: generateFieldId(1794), type: "textarea", label: "Expected Benefits", required: true }
    ]
  },
  {
    id: "sme-12",
    name: "Market Research Survey",
    description: "Customer and market analysis for SME growth",
    category: "assessment",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Market trends, customer preferences, competitive analysis",
    fields: [
      { id: generateFieldId(1800), type: "text", label: "Research Objective", required: true },
      { id: generateFieldId(1801), type: "textarea", label: "Target Market", required: true },
      { id: generateFieldId(1802), type: "checkbox", label: "Research Methods", required: true, options: ["Customer Surveys", "Focus Groups", "Competitor Analysis", "Industry Reports", "Online Research"] },
      { id: generateFieldId(1803), type: "text", label: "Budget Allocated", required: true },
      { id: generateFieldId(1804), type: "date", label: "Research Completion Date", required: true }
    ]
  },
  {
    id: "sme-13",
    name: "Franchise Application",
    description: "Franchise opportunity evaluation and application",
    category: "business",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Franchise details, investment requirements, business plan",
    fields: [
      { id: generateFieldId(1810), type: "text", label: "Franchise Brand", required: true },
      { id: generateFieldId(1811), type: "text", label: "Desired Location", required: true },
      { id: generateFieldId(1812), type: "text", label: "Initial Investment", required: true },
      { id: generateFieldId(1813), type: "text", label: "Business Experience", required: true },
      { id: generateFieldId(1814), type: "textarea", label: "Business Plan Summary", required: true }
    ]
  },
  {
    id: "sme-14",
    name: "Environmental Compliance",
    description: "Environmental regulations compliance for SMEs",
    category: "compliance",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Environmental impact, compliance requirements, action plan",
    fields: [
      { id: generateFieldId(1820), type: "text", label: "Business Activity", required: true },
      { id: generateFieldId(1821), type: "checkbox", label: "Environmental Factors", required: true, options: ["Waste Management", "Air Emissions", "Water Usage", "Chemical Storage", "Noise Levels"] },
      { id: generateFieldId(1822), type: "checkbox", label: "Applicable Regulations", required: true, options: ["EPA Standards", "Local Ordinances", "Industry Guidelines", "Waste Disposal", "Safety Requirements"] },
      { id: generateFieldId(1823), type: "textarea", label: "Current Compliance Status", required: true },
      { id: generateFieldId(1824), type: "textarea", label: "Improvement Action Plan", required: true }
    ]
  },
  {
    id: "sme-15",
    name: "Financial Planning Analysis",
    description: "Business financial planning and cash flow management",
    category: "finance",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Financial projections, cash flow, investment planning",
    fields: [
      { id: generateFieldId(1830), type: "text", label: "Planning Period", required: true },
      { id: generateFieldId(1831), type: "text", label: "Revenue Projection", required: true },
      { id: generateFieldId(1832), type: "text", label: "Operating Expenses", required: true },
      { id: generateFieldId(1833), type: "text", label: "Capital Investments", required: false },
      { id: generateFieldId(1834), type: "textarea", label: "Financial Goals", required: true }
    ]
  },
  {
    id: "sme-16",
    name: "Partnership Agreement",
    description: "Business partnership formation and terms",
    category: "legal",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Partnership structure, profit sharing, responsibilities",
    fields: [
      { id: generateFieldId(1840), type: "text", label: "Partner Name", required: true },
      { id: generateFieldId(1841), type: "text", label: "Partnership Type", required: true },
      { id: generateFieldId(1842), type: "text", label: "Ownership Percentage", required: true },
      { id: generateFieldId(1843), type: "textarea", label: "Roles and Responsibilities", required: true },
      { id: generateFieldId(1844), type: "textarea", label: "Profit/Loss Sharing", required: true }
    ]
  },
  {
    id: "sme-17",
    name: "Business Continuity Plan",
    description: "Emergency preparedness and business continuity planning",
    category: "operations",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Risk assessment, contingency plans, recovery procedures",
    fields: [
      { id: generateFieldId(1850), type: "checkbox", label: "Potential Risks", required: true, options: ["Natural Disasters", "Cyber Attacks", "Supply Chain Disruption", "Key Person Loss", "Economic Downturn"] },
      { id: generateFieldId(1851), type: "textarea", label: "Impact Assessment", required: true },
      { id: generateFieldId(1852), type: "textarea", label: "Contingency Plans", required: true },
      { id: generateFieldId(1853), type: "text", label: "Recovery Time Objective", required: true },
      { id: generateFieldId(1854), type: "textarea", label: "Emergency Contacts", required: true }
    ]
  },
  {
    id: "sme-18",
    name: "Employee Training Program",
    description: "Staff development and training initiative planning",
    category: "hr",
    sector: "sme",
    targetAudience: ["internal"],
    preview: "Training needs, program design, skill development",
    fields: [
      { id: generateFieldId(1860), type: "text", label: "Training Topic", required: true },
      { id: generateFieldId(1861), type: "checkbox", label: "Target Employees", required: true, options: ["All Staff", "Management", "Sales Team", "Technical Staff", "Customer Service"] },
      { id: generateFieldId(1862), type: "select", label: "Training Method", required: true, options: ["In-person", "Online", "Workshop", "Mentoring", "External Course"] },
      { id: generateFieldId(1863), type: "text", label: "Training Budget", required: true },
      { id: generateFieldId(1864), type: "textarea", label: "Expected Outcomes", required: true }
    ]
  },
  {
    id: "sme-19",
    name: "Customer Satisfaction Survey",
    description: "Customer feedback and service quality assessment",
    category: "feedback",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Service ratings, satisfaction levels, improvement suggestions",
    fields: [
      { id: generateFieldId(1870), type: "text", label: "Service/Product Used", required: true },
      { id: generateFieldId(1871), type: "rating", label: "Overall Satisfaction", required: true },
      { id: generateFieldId(1872), type: "rating", label: "Service Quality", required: true },
      { id: generateFieldId(1873), type: "rating", label: "Value for Money", required: true },
      { id: generateFieldId(1874), type: "textarea", label: "Suggestions for Improvement", required: false }
    ]
  },
  {
    id: "sme-20",
    name: "E-commerce Platform Setup",
    description: "Online store development and configuration",
    category: "it",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Platform requirements, product catalog, payment processing",
    fields: [
      { id: generateFieldId(1880), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(1881), type: "text", label: "Number of Products", required: true },
      { id: generateFieldId(1882), type: "checkbox", label: "Required Features", required: true, options: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Inventory Management", "Order Tracking"] },
      { id: generateFieldId(1883), type: "checkbox", label: "Payment Methods", required: true, options: ["Credit Cards", "PayPal", "Bank Transfer", "Digital Wallets", "Cash on Delivery"] },
      { id: generateFieldId(1884), type: "text", label: "Expected Monthly Orders", required: true }
    ]
  },
  {
    id: "sme-21",
    name: "Business Valuation Request",
    description: "SME business valuation for sale or investment",
    category: "finance",
    sector: "sme",
    targetAudience: ["external"],
    preview: "Business financials, valuation purpose, market conditions",
    fields: [
      { id: generateFieldId(1890), type: "text", label: "Business Name", required: true },
      { id: generateFieldId(1891), type: "text", label: "Annual Revenue", required: true },
      { id: generateFieldId(1892), type: "text", label: "Net Profit", required: true },
      { id: generateFieldId(1893), type: "select", label: "Valuation Purpose", required: true, options: ["Sale", "Investment", "Partnership", "Insurance", "Estate Planning"] },
      { id: generateFieldId(1894), type: "textarea", label: "Business Assets", required: true }
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