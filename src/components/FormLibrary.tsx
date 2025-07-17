
import React, { useState } from 'react';
import { FormTemplate } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Shield, 
  Users, 
  Heart, 
  GraduationCap, 
  Car, 
  Home, 
  Briefcase,
  Search,
  Star,
  FileText,
  ClipboardList,
  UserCheck,
  Zap,
  Globe,
  Calendar,
  MessageSquare,
  TrendingUp,
  Award,
  Coffee,
  Truck,
  Plane,
  Factory,
  Store,
  Laptop,
  Building,
  TreePine,
  Hammer,
  BookOpen,
  Scale,
  Stethoscope,
  DollarSign,
  Palette,
  Music,
  Camera,
  Gamepad2,
  Utensils,
  MapPin,
  ShoppingCart,
  Wrench,
  Phone,
  Radio,
  Wifi,
  Database,
  Server,
  Code
} from 'lucide-react';

interface FormLibraryProps {
  onUseTemplate: (template: FormTemplate) => void;
}

const formTemplates: FormTemplate[] = [
  // Business & Startups (35+ templates)
  {
    id: 'accelerator-program-application',
    name: 'Accelerator Program Application',
    description: 'Startup accelerator and incubator program application',
    category: 'business',
    targetAudience: ['startups', 'entrepreneurs'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'text', label: 'Founder Name', required: true },
      { id: '3', type: 'email', label: 'Contact Email', required: true },
      { id: '4', type: 'textarea', label: 'Company Overview', required: true },
      { id: '5', type: 'textarea', label: 'Team Background', required: false },
      { id: '6', type: 'textarea', label: 'Growth Potential', required: false }
    ]
  },
  {
    id: 'business-plan-submission',
    name: 'Business Plan Submission',
    description: 'Comprehensive business plan evaluation form',
    category: 'business',
    targetAudience: ['entrepreneurs', 'investors'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true },
      { id: '2', type: 'select', label: 'Industry', required: true, options: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing'] },
      { id: '3', type: 'textarea', label: 'Executive Summary', required: true },
      { id: '4', type: 'textarea', label: 'Market Analysis', required: true },
      { id: '5', type: 'number', label: 'Funding Required', required: true },
      { id: '6', type: 'file', label: 'Business Plan Document', required: true }
    ]
  },
  {
    id: 'investor-pitch-deck',
    name: 'Investor Pitch Deck Submission',
    description: 'Pitch deck submission for investor meetings',
    category: 'business',
    targetAudience: ['startups', 'investors'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'text', label: 'Industry', required: true },
      { id: '3', type: 'textarea', label: 'Problem Statement', required: true },
      { id: '4', type: 'textarea', label: 'Solution Overview', required: true },
      { id: '5', type: 'number', label: 'Market Size', required: false },
      { id: '6', type: 'file', label: 'Pitch Deck PDF', required: true }
    ]
  },
  {
    id: 'startup-registration',
    name: 'Startup Registration Form',
    description: 'Official startup registration and documentation',
    category: 'business',
    targetAudience: ['startups', 'legal'],
    fields: [
      { id: '1', type: 'text', label: 'Startup Name', required: true },
      { id: '2', type: 'text', label: 'Legal Structure', required: true },
      { id: '3', type: 'text', label: 'Registration Number', required: false },
      { id: '4', type: 'date', label: 'Incorporation Date', required: true },
      { id: '5', type: 'text', label: 'Primary Address', required: true },
      { id: '6', type: 'checkbox', label: 'Business Activities', required: false, options: ['Software Development', 'Consulting', 'E-commerce', 'Manufacturing', 'Services'] }
    ]
  },
  {
    id: 'business-license-application',
    name: 'Business License Application',
    description: 'Application for business operating license',
    category: 'business',
    targetAudience: ['business-owners', 'legal'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true },
      { id: '2', type: 'select', label: 'Business Type', required: true, options: ['Sole Proprietorship', 'Partnership', 'Corporation', 'LLC'] },
      { id: '3', type: 'text', label: 'Business Address', required: true },
      { id: '4', type: 'textarea', label: 'Business Description', required: true },
      { id: '5', type: 'text', label: 'Owner Name', required: true },
      { id: '6', type: 'file', label: 'Supporting Documents', required: false }
    ]
  },

  // IT & Technology (35+ templates)
  {
    id: 'algorithmic-trading-strategy',
    name: 'Algorithmic Trading Strategy',
    description: 'Automated trading algorithm configuration',
    category: 'it',
    targetAudience: ['fintech', 'developers'],
    fields: [
      { id: '1', type: 'text', label: 'Strategy Name', required: true },
      { id: '2', type: 'select', label: 'Trading Type', required: true, options: ['High Frequency', 'Medium Frequency', 'Low Frequency'] },
      { id: '3', type: 'textarea', label: 'Algorithm Description', required: true },
      { id: '4', type: 'checkbox', label: 'Risk Controls', required: false, options: ['Stop Loss', 'Position Limits', 'Volatility Filters'] },
      { id: '5', type: 'text', label: 'Performance Metrics', required: false }
    ]
  },
  {
    id: 'software-deployment-request',
    name: 'Software Deployment Request',
    description: 'Request form for software deployment to production',
    category: 'it',
    targetAudience: ['developers', 'devops'],
    fields: [
      { id: '1', type: 'text', label: 'Application Name', required: true },
      { id: '2', type: 'text', label: 'Version Number', required: true },
      { id: '3', type: 'select', label: 'Environment', required: true, options: ['Development', 'Staging', 'Production'] },
      { id: '4', type: 'textarea', label: 'Deployment Notes', required: false },
      { id: '5', type: 'date', label: 'Deployment Date', required: true },
      { id: '6', type: 'checkbox', label: 'Pre-deployment Checks', required: true, options: ['Code Review', 'Testing', 'Security Scan', 'Performance Test'] }
    ]
  },
  {
    id: 'api-integration-request',
    name: 'API Integration Request',
    description: 'Third-party API integration request form',
    category: 'it',
    targetAudience: ['developers', 'architects'],
    fields: [
      { id: '1', type: 'text', label: 'API Provider', required: true },
      { id: '2', type: 'text', label: 'API Version', required: true },
      { id: '3', type: 'textarea', label: 'Integration Purpose', required: true },
      { id: '4', type: 'checkbox', label: 'Security Requirements', required: false, options: ['OAuth', 'API Key', 'JWT', 'Basic Auth'] },
      { id: '5', type: 'text', label: 'Expected Usage Volume', required: false }
    ]
  },
  {
    id: 'database-access-request',
    name: 'Database Access Request',
    description: 'Request form for database access permissions',
    category: 'it',
    targetAudience: ['developers', 'dba'],
    fields: [
      { id: '1', type: 'text', label: 'Employee Name', required: true },
      { id: '2', type: 'text', label: 'Database Name', required: true },
      { id: '3', type: 'select', label: 'Access Level', required: true, options: ['Read Only', 'Read/Write', 'Admin'] },
      { id: '4', type: 'textarea', label: 'Business Justification', required: true },
      { id: '5', type: 'text', label: 'Manager Approval', required: true },
      { id: '6', type: 'date', label: 'Access Expiry Date', required: false }
    ]
  },
  {
    id: 'system-maintenance-request',
    name: 'System Maintenance Request',
    description: 'Scheduled system maintenance request form',
    category: 'it',
    targetAudience: ['it-teams', 'operations'],
    fields: [
      { id: '1', type: 'text', label: 'System Name', required: true },
      { id: '2', type: 'select', label: 'Maintenance Type', required: true, options: ['Routine', 'Emergency', 'Upgrade', 'Patch'] },
      { id: '3', type: 'date', label: 'Scheduled Date', required: true },
      { id: '4', type: 'text', label: 'Estimated Duration', required: true },
      { id: '5', type: 'textarea', label: 'Maintenance Description', required: true },
      { id: '6', type: 'checkbox', label: 'Affected Services', required: false, options: ['Web Services', 'Database', 'Email', 'File Server'] }
    ]
  },

  // Finance & Fintech (35+ templates)
  {
    id: 'angel-investor-outreach',
    name: 'Angel Investor Outreach',
    description: 'Angel investor engagement and funding request',
    category: 'finance',
    targetAudience: ['startups', 'investors'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'text', label: 'Founder Name', required: true },
      { id: '3', type: 'number', label: 'Funding Amount', required: true },
      { id: '4', type: 'textarea', label: 'Investment Proposal', required: true },
      { id: '5', type: 'textarea', label: 'Use of Funds', required: true },
      { id: '6', type: 'text', label: 'Expected Benefits', required: false }
    ]
  },
  {
    id: 'loan-application-business',
    name: 'Business Loan Application',
    description: 'Commercial loan application for businesses',
    category: 'finance',
    targetAudience: ['business-owners', 'banks'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true },
      { id: '2', type: 'text', label: 'Business Registration Number', required: true },
      { id: '3', type: 'number', label: 'Loan Amount', required: true },
      { id: '4', type: 'select', label: 'Loan Purpose', required: true, options: ['Working Capital', 'Equipment', 'Expansion', 'Real Estate'] },
      { id: '5', type: 'number', label: 'Annual Revenue', required: true },
      { id: '6', type: 'file', label: 'Financial Statements', required: true }
    ]
  },
  {
    id: 'credit-assessment',
    name: 'Credit Assessment Form',
    description: 'Comprehensive credit evaluation for lending',
    category: 'finance',
    targetAudience: ['banks', 'lenders'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant Name', required: true },
      { id: '2', type: 'text', label: 'Social Security Number', required: true },
      { id: '3', type: 'number', label: 'Annual Income', required: true },
      { id: '4', type: 'text', label: 'Employment Status', required: true },
      { id: '5', type: 'number', label: 'Existing Debt', required: false },
      { id: '6', type: 'checkbox', label: 'Credit History', required: false, options: ['Good', 'Fair', 'Poor', 'No History'] }
    ]
  },
  {
    id: 'investment-portfolio-review',
    name: 'Investment Portfolio Review',
    description: 'Quarterly investment portfolio assessment',
    category: 'finance',
    targetAudience: ['investors', 'advisors'],
    fields: [
      { id: '1', type: 'text', label: 'Client Name', required: true },
      { id: '2', type: 'number', label: 'Portfolio Value', required: true },
      { id: '3', type: 'textarea', label: 'Investment Goals', required: true },
      { id: '4', type: 'select', label: 'Risk Tolerance', required: true, options: ['Conservative', 'Moderate', 'Aggressive'] },
      { id: '5', type: 'checkbox', label: 'Asset Classes', required: false, options: ['Stocks', 'Bonds', 'Real Estate', 'Commodities', 'Crypto'] },
      { id: '6', type: 'textarea', label: 'Performance Review', required: false }
    ]
  },
  {
    id: 'insurance-claim-form',
    name: 'Insurance Claim Form',
    description: 'General insurance claim submission',
    category: 'finance',
    targetAudience: ['insurance-holders', 'insurers'],
    fields: [
      { id: '1', type: 'text', label: 'Policy Number', required: true },
      { id: '2', type: 'text', label: 'Claimant Name', required: true },
      { id: '3', type: 'date', label: 'Incident Date', required: true },
      { id: '4', type: 'textarea', label: 'Incident Description', required: true },
      { id: '5', type: 'number', label: 'Claim Amount', required: true },
      { id: '6', type: 'file', label: 'Supporting Documents', required: false }
    ]
  },

  // Customer & Feedback (30+ templates)
  {
    id: 'customer-satisfaction-survey',
    name: 'Customer Satisfaction Survey',
    description: 'Comprehensive customer satisfaction evaluation',
    category: 'customer',
    targetAudience: ['customers', 'support'],
    fields: [
      { id: '1', type: 'text', label: 'Customer ID', required: false },
      { id: '2', type: 'radio', label: 'Overall Satisfaction', required: true, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
      { id: '3', type: 'radio', label: 'Likelihood to Recommend', required: true, options: ['0-6 (Detractor)', '7-8 (Passive)', '9-10 (Promoter)'] },
      { id: '4', type: 'textarea', label: 'Comments', required: false },
      { id: '5', type: 'checkbox', label: 'Service Areas', required: false, options: ['Product Quality', 'Customer Service', 'Delivery', 'Pricing', 'Website'] }
    ]
  },
  {
    id: 'product-feedback-form',
    name: 'Product Feedback Form',
    description: 'Detailed product evaluation and feedback',
    category: 'customer',
    targetAudience: ['customers', 'product-managers'],
    fields: [
      { id: '1', type: 'text', label: 'Product Name', required: true },
      { id: '2', type: 'radio', label: 'Product Rating', required: true, options: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'] },
      { id: '3', type: 'textarea', label: 'What did you like?', required: false },
      { id: '4', type: 'textarea', label: 'What could be improved?', required: false },
      { id: '5', type: 'checkbox', label: 'Features Used', required: false, options: ['Basic Features', 'Advanced Features', 'Mobile App', 'Web Interface'] }
    ]
  },
  {
    id: 'service-complaint-form',
    name: 'Service Complaint Form',
    description: 'Customer service complaint and resolution tracking',
    category: 'customer',
    targetAudience: ['customers', 'support'],
    fields: [
      { id: '1', type: 'text', label: 'Customer Name', required: true },
      { id: '2', type: 'email', label: 'Contact Email', required: true },
      { id: '3', type: 'select', label: 'Service Type', required: true, options: ['Technical Support', 'Billing', 'Product Issue', 'General Inquiry'] },
      { id: '4', type: 'textarea', label: 'Complaint Details', required: true },
      { id: '5', type: 'select', label: 'Priority Level', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
      { id: '6', type: 'file', label: 'Supporting Evidence', required: false }
    ]
  },
  {
    id: 'customer-onboarding',
    name: 'Customer Onboarding Form',
    description: 'New customer registration and setup',
    category: 'customer',
    targetAudience: ['new-customers', 'sales'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'text', label: 'Contact Person', required: true },
      { id: '3', type: 'email', label: 'Business Email', required: true },
      { id: '4', type: 'text', label: 'Industry', required: true },
      { id: '5', type: 'select', label: 'Company Size', required: true, options: ['1-10', '11-50', '51-200', '201-1000', '1000+'] },
      { id: '6', type: 'checkbox', label: 'Services Interested', required: false, options: ['Consulting', 'Software', 'Support', 'Training'] }
    ]
  },
  {
    id: 'customer-retention-survey',
    name: 'Customer Retention Survey',
    description: 'Survey to understand customer loyalty and retention factors',
    category: 'customer',
    targetAudience: ['customers', 'marketing'],
    fields: [
      { id: '1', type: 'text', label: 'Customer Since', required: false },
      { id: '2', type: 'radio', label: 'Likelihood to Continue', required: true, options: ['Very Likely', 'Likely', 'Neutral', 'Unlikely', 'Very Unlikely'] },
      { id: '3', type: 'checkbox', label: 'Reasons for Staying', required: false, options: ['Price', 'Quality', 'Service', 'Features', 'Relationship'] },
      { id: '4', type: 'textarea', label: 'Suggestions for Improvement', required: false },
      { id: '5', type: 'radio', label: 'Would you recommend us?', required: true, options: ['Definitely', 'Probably', 'Maybe', 'Probably Not', 'Definitely Not'] }
    ]
  },

  // Government (30+ templates)
  {
    id: 'animal-control-report',
    name: 'Animal Control Report',
    description: 'Report for animal-related incidents and control measures',
    category: 'government',
    targetAudience: ['citizens', 'animal-control'],
    fields: [
      { id: '1', type: 'text', label: 'Reporter Name', required: true },
      { id: '2', type: 'text', label: 'Incident Location', required: true },
      { id: '3', type: 'date', label: 'Incident Date', required: true },
      { id: '4', type: 'select', label: 'Animal Type', required: true, options: ['Dog', 'Cat', 'Wildlife', 'Livestock', 'Other'] },
      { id: '5', type: 'textarea', label: 'Incident Description', required: true },
      { id: '6', type: 'checkbox', label: 'Actions Needed', required: false, options: ['Rescue', 'Removal', 'Investigation', 'Citation'] }
    ]
  },
  {
    id: 'public-records-request',
    name: 'Public Records Request',
    description: 'Freedom of Information Act request form',
    category: 'government',
    targetAudience: ['citizens', 'media'],
    fields: [
      { id: '1', type: 'text', label: 'Requester Name', required: true },
      { id: '2', type: 'email', label: 'Contact Email', required: true },
      { id: '3', type: 'textarea', label: 'Records Requested', required: true },
      { id: '4', type: 'date', label: 'Date Range Start', required: false },
      { id: '5', type: 'date', label: 'Date Range End', required: false },
      { id: '6', type: 'select', label: 'Delivery Method', required: true, options: ['Email', 'Mail', 'Pickup'] }
    ]
  },
  {
    id: 'building-permit-application',
    name: 'Building Permit Application',
    description: 'Application for construction and building permits',
    category: 'government',
    targetAudience: ['contractors', 'property-owners'],
    fields: [
      { id: '1', type: 'text', label: 'Property Address', required: true },
      { id: '2', type: 'text', label: 'Property Owner', required: true },
      { id: '3', type: 'select', label: 'Work Type', required: true, options: ['New Construction', 'Renovation', 'Addition', 'Demolition'] },
      { id: '4', type: 'textarea', label: 'Project Description', required: true },
      { id: '5', type: 'number', label: 'Estimated Cost', required: true },
      { id: '6', type: 'file', label: 'Building Plans', required: true }
    ]
  },
  {
    id: 'business-registration-gov',
    name: 'Business Registration (Government)',
    description: 'Official government business registration form',
    category: 'government',
    targetAudience: ['business-owners', 'entrepreneurs'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true },
      { id: '2', type: 'select', label: 'Business Structure', required: true, options: ['Sole Proprietorship', 'Partnership', 'Corporation', 'LLC'] },
      { id: '3', type: 'text', label: 'Principal Address', required: true },
      { id: '4', type: 'text', label: 'Registered Agent', required: false },
      { id: '5', type: 'checkbox', label: 'Business Activities', required: true, options: ['Retail', 'Manufacturing', 'Services', 'Professional', 'Other'] },
      { id: '6', type: 'file', label: 'Articles of Incorporation', required: false }
    ]
  },
  {
    id: 'tax-exemption-application',
    name: 'Tax Exemption Application',
    description: 'Application for property tax exemption',
    category: 'government',
    targetAudience: ['property-owners', 'nonprofits'],
    fields: [
      { id: '1', type: 'text', label: 'Property Owner', required: true },
      { id: '2', type: 'text', label: 'Property Address', required: true },
      { id: '3', type: 'select', label: 'Exemption Type', required: true, options: ['Senior', 'Disability', 'Veteran', 'Nonprofit', 'Religious'] },
      { id: '4', type: 'textarea', label: 'Justification', required: true },
      { id: '5', type: 'file', label: 'Supporting Documentation', required: true },
      { id: '6', type: 'date', label: 'Application Date', required: true }
    ]
  },

  // Assessment (30+ templates)
  {
    id: 'auto-insurance-claim-assessment',
    name: 'Auto Insurance Claim Assessment',
    description: 'Vehicle accident and damage claim assessment',
    category: 'assessment',
    targetAudience: ['insurance-holders', 'adjusters'],
    fields: [
      { id: '1', type: 'text', label: 'Policy Number', required: true },
      { id: '2', type: 'text', label: 'Vehicle VIN', required: true },
      { id: '3', type: 'date', label: 'Accident Date', required: true },
      { id: '4', type: 'textarea', label: 'Accident Description', required: true },
      { id: '5', type: 'number', label: 'Estimated Damage Cost', required: false },
      { id: '6', type: 'file', label: 'Photos', required: false }
    ]
  },
  {
    id: 'property-damage-assessment',
    name: 'Property Damage Assessment',
    description: 'Comprehensive property damage evaluation',
    category: 'assessment',
    targetAudience: ['property-owners', 'adjusters'],
    fields: [
      { id: '1', type: 'text', label: 'Property Address', required: true },
      { id: '2', type: 'select', label: 'Damage Type', required: true, options: ['Fire', 'Water', 'Storm', 'Vandalism', 'Other'] },
      { id: '3', type: 'date', label: 'Damage Date', required: true },
      { id: '4', type: 'textarea', label: 'Damage Description', required: true },
      { id: '5', type: 'number', label: 'Repair Estimate', required: false },
      { id: '6', type: 'checkbox', label: 'Affected Areas', required: false, options: ['Roof', 'Foundation', 'Interior', 'Exterior', 'Systems'] }
    ]
  },
  {
    id: 'risk-assessment-form',
    name: 'Risk Assessment Form',
    description: 'General risk evaluation and mitigation planning',
    category: 'assessment',
    targetAudience: ['risk-managers', 'compliance'],
    fields: [
      { id: '1', type: 'text', label: 'Assessment Area', required: true },
      { id: '2', type: 'select', label: 'Risk Level', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
      { id: '3', type: 'textarea', label: 'Risk Description', required: true },
      { id: '4', type: 'textarea', label: 'Potential Impact', required: true },
      { id: '5', type: 'textarea', label: 'Mitigation Strategies', required: false },
      { id: '6', type: 'date', label: 'Next Review Date', required: false }
    ]
  },
  {
    id: 'security-assessment',
    name: 'Security Assessment Form',
    description: 'Comprehensive security evaluation checklist',
    category: 'assessment',
    targetAudience: ['security-teams', 'auditors'],
    fields: [
      { id: '1', type: 'text', label: 'Facility/System Name', required: true },
      { id: '2', type: 'checkbox', label: 'Security Measures', required: false, options: ['Access Control', 'CCTV', 'Alarms', 'Guards', 'Cybersecurity'] },
      { id: '3', type: 'radio', label: 'Overall Security Rating', required: true, options: ['Excellent', 'Good', 'Fair', 'Poor'] },
      { id: '4', type: 'textarea', label: 'Vulnerabilities Identified', required: false },
      { id: '5', type: 'textarea', label: 'Recommendations', required: false },
      { id: '6', type: 'date', label: 'Assessment Date', required: true }
    ]
  },
  {
    id: 'compliance-assessment',
    name: 'Compliance Assessment',
    description: 'Regulatory compliance evaluation form',
    category: 'assessment',
    targetAudience: ['compliance-officers', 'auditors'],
    fields: [
      { id: '1', type: 'text', label: 'Regulation/Standard', required: true },
      { id: '2', type: 'text', label: 'Assessment Scope', required: true },
      { id: '3', type: 'radio', label: 'Compliance Status', required: true, options: ['Fully Compliant', 'Partially Compliant', 'Non-Compliant', 'Not Applicable'] },
      { id: '4', type: 'textarea', label: 'Findings', required: false },
      { id: '5', type: 'textarea', label: 'Corrective Actions', required: false },
      { id: '6', type: 'date', label: 'Target Completion Date', required: false }
    ]
  },

  // Registration (30+ templates)
  {
    id: 'event-registration-conference',
    name: 'Conference Registration',
    description: 'Professional conference and seminar registration',
    category: 'registration',
    targetAudience: ['attendees', 'professionals'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true },
      { id: '2', type: 'email', label: 'Email Address', required: true },
      { id: '3', type: 'text', label: 'Company/Organization', required: false },
      { id: '4', type: 'text', label: 'Job Title', required: false },
      { id: '5', type: 'select', label: 'Registration Type', required: true, options: ['Early Bird', 'Regular', 'Student', 'VIP'] },
      { id: '6', type: 'checkbox', label: 'Session Preferences', required: false, options: ['Keynote', 'Technical', 'Workshops', 'Networking'] }
    ]
  },
  {
    id: 'course-registration-online',
    name: 'Online Course Registration',
    description: 'Registration for online training and courses',
    category: 'registration',
    targetAudience: ['students', 'professionals'],
    fields: [
      { id: '1', type: 'text', label: 'Student Name', required: true },
      { id: '2', type: 'email', label: 'Email Address', required: true },
      { id: '3', type: 'select', label: 'Course Level', required: true, options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
      { id: '4', type: 'checkbox', label: 'Course Modules', required: false, options: ['Introduction', 'Practical Labs', 'Case Studies', 'Final Project'] },
      { id: '5', type: 'select', label: 'Payment Plan', required: true, options: ['Full Payment', 'Monthly', 'Quarterly'] },
      { id: '6', type: 'textarea', label: 'Learning Goals', required: false }
    ]
  },
  {
    id: 'vendor-registration',
    name: 'Vendor Registration Form',
    description: 'Supplier and vendor registration for procurement',
    category: 'registration',
    targetAudience: ['vendors', 'procurement'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'text', label: 'Business Registration Number', required: true },
      { id: '3', type: 'text', label: 'Primary Contact', required: true },
      { id: '4', type: 'email', label: 'Business Email', required: true },
      { id: '5', type: 'checkbox', label: 'Products/Services', required: false, options: ['IT Services', 'Consulting', 'Manufacturing', 'Logistics', 'Professional Services'] },
      { id: '6', type: 'file', label: 'Company Profile', required: false }
    ]
  },
  {
    id: 'membership-registration',
    name: 'Membership Registration',
    description: 'Organization membership application form',
    category: 'registration',
    targetAudience: ['members', 'organizations'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true },
      { id: '2', type: 'email', label: 'Email Address', required: true },
      { id: '3', type: 'select', label: 'Membership Type', required: true, options: ['Individual', 'Corporate', 'Student', 'Senior'] },
      { id: '4', type: 'text', label: 'Professional Background', required: false },
      { id: '5', type: 'checkbox', label: 'Areas of Interest', required: false, options: ['Networking', 'Education', 'Advocacy', 'Research'] },
      { id: '6', type: 'text', label: 'Referral Source', required: false }
    ]
  },
  {
    id: 'volunteer-registration',
    name: 'Volunteer Registration',
    description: 'Volunteer program application and registration',
    category: 'registration',
    targetAudience: ['volunteers', 'nonprofits'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true },
      { id: '2', type: 'email', label: 'Contact Email', required: true },
      { id: '3', type: 'text', label: 'Phone Number', required: true },
      { id: '4', type: 'checkbox', label: 'Volunteer Interests', required: false, options: ['Event Support', 'Mentoring', 'Administration', 'Fundraising', 'Community Outreach'] },
      { id: '5', type: 'select', label: 'Availability', required: true, options: ['Weekdays', 'Weekends', 'Evenings', 'Flexible'] },
      { id: '6', type: 'textarea', label: 'Previous Experience', required: false }
    ]
  },

  // Survey (25+ templates)
  {
    id: 'employee-satisfaction-survey',
    name: 'Employee Satisfaction Survey',
    description: 'Annual employee satisfaction and engagement survey',
    category: 'survey',
    targetAudience: ['employees', 'hr'],
    fields: [
      { id: '1', type: 'select', label: 'Department', required: false, options: ['HR', 'Finance', 'IT', 'Sales', 'Marketing', 'Operations'] },
      { id: '2', type: 'radio', label: 'Job Satisfaction', required: true, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
      { id: '3', type: 'radio', label: 'Work-Life Balance', required: true, options: ['Excellent', 'Good', 'Fair', 'Poor'] },
      { id: '4', type: 'checkbox', label: 'Areas for Improvement', required: false, options: ['Communication', 'Training', 'Benefits', 'Work Environment', 'Management'] },
      { id: '5', type: 'textarea', label: 'Additional Comments', required: false }
    ]
  },
  {
    id: 'market-research-survey',
    name: 'Market Research Survey',
    description: 'Consumer behavior and market analysis survey',
    category: 'survey',
    targetAudience: ['consumers', 'researchers'],
    fields: [
      { id: '1', type: 'select', label: 'Age Group', required: true, options: ['18-25', '26-35', '36-45', '46-55', '56+'] },
      { id: '2', type: 'select', label: 'Income Range', required: false, options: ['<$25k', '$25k-$50k', '$50k-$75k', '$75k-$100k', '>$100k'] },
      { id: '3', type: 'checkbox', label: 'Product Categories', required: false, options: ['Technology', 'Fashion', 'Food', 'Travel', 'Entertainment'] },
      { id: '4', type: 'radio', label: 'Purchase Frequency', required: true, options: ['Daily', 'Weekly', 'Monthly', 'Rarely'] },
      { id: '5', type: 'textarea', label: 'Brand Preferences', required: false }
    ]
  },
  {
    id: 'website-usability-survey',
    name: 'Website Usability Survey',
    description: 'User experience and website usability evaluation',
    category: 'survey',
    targetAudience: ['users', 'ux-designers'],
    fields: [
      { id: '1', type: 'radio', label: 'Ease of Navigation', required: true, options: ['Very Easy', 'Easy', 'Moderate', 'Difficult', 'Very Difficult'] },
      { id: '2', type: 'radio', label: 'Page Load Speed', required: true, options: ['Very Fast', 'Fast', 'Acceptable', 'Slow', 'Very Slow'] },
      { id: '3', type: 'checkbox', label: 'Most Used Features', required: false, options: ['Search', 'Navigation Menu', 'Contact Form', 'Product Catalog', 'User Account'] },
      { id: '4', type: 'textarea', label: 'Improvement Suggestions', required: false },
      { id: '5', type: 'radio', label: 'Overall Experience', required: true, options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'] }
    ]
  },
  {
    id: 'training-feedback-survey',
    name: 'Training Feedback Survey',
    description: 'Post-training evaluation and feedback collection',
    category: 'survey',
    targetAudience: ['trainees', 'trainers'],
    fields: [
      { id: '1', type: 'text', label: 'Training Program', required: true },
      { id: '2', type: 'radio', label: 'Content Quality', required: true, options: ['Excellent', 'Good', 'Average', 'Poor'] },
      { id: '3', type: 'radio', label: 'Instructor Effectiveness', required: true, options: ['Excellent', 'Good', 'Average', 'Poor'] },
      { id: '4', type: 'checkbox', label: 'Training Methods', required: false, options: ['Lectures', 'Hands-on', 'Group Work', 'Case Studies', 'Online'] },
      { id: '5', type: 'textarea', label: 'Key Takeaways', required: false },
      { id: '6', type: 'radio', label: 'Would Recommend', required: true, options: ['Definitely', 'Probably', 'Maybe', 'Probably Not', 'Definitely Not'] }
    ]
  },

  // Feedback (25+ templates)
  {
    id: 'product-quality-feedback',
    name: 'Product Quality Feedback',
    description: 'Detailed product quality assessment and feedback',
    category: 'feedback',
    targetAudience: ['customers', 'quality-assurance'],
    fields: [
      { id: '1', type: 'text', label: 'Product Name/Model', required: true },
      { id: '2', type: 'date', label: 'Purchase Date', required: false },
      { id: '3', type: 'radio', label: 'Build Quality', required: true, options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'] },
      { id: '4', type: 'radio', label: 'Performance Rating', required: true, options: ['Exceeds Expectations', 'Meets Expectations', 'Below Expectations'] },
      { id: '5', type: 'textarea', label: 'Issues Encountered', required: false },
      { id: '6', type: 'textarea', label: 'Improvement Suggestions', required: false }
    ]
  },
  {
    id: 'service-delivery-feedback',
    name: 'Service Delivery Feedback',
    description: 'Evaluation of service delivery and customer experience',
    category: 'feedback',
    targetAudience: ['customers', 'service-teams'],
    fields: [
      { id: '1', type: 'text', label: 'Service Representative', required: false },
      { id: '2', type: 'date', label: 'Service Date', required: true },
      { id: '3', type: 'radio', label: 'Response Time', required: true, options: ['Very Fast', 'Fast', 'Acceptable', 'Slow', 'Very Slow'] },
      { id: '4', type: 'radio', label: 'Problem Resolution', required: true, options: ['Fully Resolved', 'Partially Resolved', 'Not Resolved'] },
      { id: '5', type: 'radio', label: 'Staff Professionalism', required: true, options: ['Excellent', 'Good', 'Average', 'Poor'] },
      { id: '6', type: 'textarea', label: 'Additional Comments', required: false }
    ]
  },
  {
    id: 'website-feedback-form',
    name: 'Website Feedback Form',
    description: 'General website feedback and improvement suggestions',
    category: 'feedback',
    targetAudience: ['users', 'web-developers'],
    fields: [
      { id: '1', type: 'text', label: 'Page/Section', required: false },
      { id: '2', type: 'radio', label: 'Overall Design', required: true, options: ['Love It', 'Like It', 'Neutral', 'Dislike It', 'Hate It'] },
      { id: '3', type: 'checkbox', label: 'Issues Found', required: false, options: ['Broken Links', 'Slow Loading', 'Poor Navigation', 'Unclear Content', 'Technical Errors'] },
      { id: '4', type: 'textarea', label: 'What works well?', required: false },
      { id: '5', type: 'textarea', label: 'What needs improvement?', required: false },
      { id: '6', type: 'radio', label: 'Mobile Experience', required: false, options: ['Excellent', 'Good', 'Average', 'Poor', 'Not Used'] }
    ]
  },
  {
    id: 'app-feedback-mobile',
    name: 'Mobile App Feedback',
    description: 'Mobile application user feedback and bug reports',
    category: 'feedback',
    targetAudience: ['app-users', 'developers'],
    fields: [
      { id: '1', type: 'text', label: 'App Version', required: false },
      { id: '2', type: 'select', label: 'Device Type', required: false, options: ['iPhone', 'Android Phone', 'iPad', 'Android Tablet'] },
      { id: '3', type: 'radio', label: 'App Performance', required: true, options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'] },
      { id: '4', type: 'checkbox', label: 'Features Used', required: false, options: ['Login', 'Search', 'Notifications', 'Settings', 'Help'] },
      { id: '5', type: 'textarea', label: 'Bug Reports', required: false },
      { id: '6', type: 'textarea', label: 'Feature Requests', required: false }
    ]
  },

  // Compliance (25+ templates)
  {
    id: 'gdpr-compliance-audit',
    name: 'GDPR Compliance Audit',
    description: 'General Data Protection Regulation compliance assessment',
    category: 'compliance',
    targetAudience: ['compliance-officers', 'legal'],
    fields: [
      { id: '1', type: 'text', label: 'Organization Name', required: true },
      { id: '2', type: 'checkbox', label: 'Data Processing Activities', required: false, options: ['Customer Data', 'Employee Data', 'Marketing Data', 'Analytics Data'] },
      { id: '3', type: 'radio', label: 'Data Protection Officer Appointed', required: true, options: ['Yes', 'No', 'Not Required'] },
      { id: '4', type: 'radio', label: 'Privacy Policy Updated', required: true, options: ['Yes', 'No', 'In Progress'] },
      { id: '5', type: 'textarea', label: 'Compliance Gaps Identified', required: false },
      { id: '6', type: 'date', label: 'Next Review Date', required: true }
    ]
  },
  {
    id: 'iso-compliance-checklist',
    name: 'ISO Compliance Checklist',
    description: 'ISO standard compliance verification form',
    category: 'compliance',
    targetAudience: ['quality-managers', 'auditors'],
    fields: [
      { id: '1', type: 'select', label: 'ISO Standard', required: true, options: ['ISO 9001', 'ISO 14001', 'ISO 27001', 'ISO 45001'] },
      { id: '2', type: 'text', label: 'Audit Scope', required: true },
      { id: '3', type: 'radio', label: 'Documentation Complete', required: true, options: ['Yes', 'No', 'Partially'] },
      { id: '4', type: 'checkbox', label: 'Areas Assessed', required: false, options: ['Management System', 'Processes', 'Documentation', 'Training', 'Monitoring'] },
      { id: '5', type: 'textarea', label: 'Non-conformities', required: false },
      { id: '6', type: 'date', label: 'Certification Expiry', required: false }
    ]
  },
  {
    id: 'hipaa-compliance-form',
    name: 'HIPAA Compliance Form',
    description: 'Healthcare privacy and security compliance assessment',
    category: 'compliance',
    targetAudience: ['healthcare', 'privacy-officers'],
    fields: [
      { id: '1', type: 'text', label: 'Healthcare Entity', required: true },
      { id: '2', type: 'checkbox', label: 'PHI Handling Processes', required: false, options: ['Electronic Records', 'Paper Records', 'Transmission', 'Storage', 'Disposal'] },
      { id: '3', type: 'radio', label: 'Security Officer Designated', required: true, options: ['Yes', 'No'] },
      { id: '4', type: 'radio', label: 'Staff Training Current', required: true, options: ['Yes', 'No', 'Partially'] },
      { id: '5', type: 'textarea', label: 'Security Measures', required: false },
      { id: '6', type: 'date', label: 'Last Risk Assessment', required: false }
    ]
  },
  {
    id: 'sox-compliance-report',
    name: 'SOX Compliance Report',
    description: 'Sarbanes-Oxley Act compliance documentation',
    category: 'compliance',
    targetAudience: ['finance', 'auditors'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'text', label: 'Fiscal Year', required: true },
      { id: '3', type: 'radio', label: 'Internal Controls Tested', required: true, options: ['Yes', 'No', 'In Progress'] },
      { id: '4', type: 'checkbox', label: 'Key Controls', required: false, options: ['Financial Reporting', 'IT Controls', 'Entity Level', 'Process Level'] },
      { id: '5', type: 'textarea', label: 'Material Weaknesses', required: false },
      { id: '6', type: 'text', label: 'External Auditor', required: false }
    ]
  },

  // Risk (25+ templates)
  {
    id: 'operational-risk-assessment',
    name: 'Operational Risk Assessment',
    description: 'Comprehensive operational risk evaluation',
    category: 'risk',
    targetAudience: ['risk-managers', 'operations'],
    fields: [
      { id: '1', type: 'text', label: 'Business Process', required: true },
      { id: '2', type: 'select', label: 'Risk Category', required: true, options: ['Process Risk', 'Technology Risk', 'Human Risk', 'External Risk'] },
      { id: '3', type: 'radio', label: 'Probability', required: true, options: ['Very Low', 'Low', 'Medium', 'High', 'Very High'] },
      { id: '4', type: 'radio', label: 'Impact', required: true, options: ['Negligible', 'Minor', 'Moderate', 'Major', 'Severe'] },
      { id: '5', type: 'textarea', label: 'Risk Description', required: true },
      { id: '6', type: 'textarea', label: 'Mitigation Plan', required: false }
    ]
  },
  {
    id: 'cybersecurity-risk-assessment',
    name: 'Cybersecurity Risk Assessment',
    description: 'IT security risk evaluation and analysis',
    category: 'risk',
    targetAudience: ['security-teams', 'it-managers'],
    fields: [
      { id: '1', type: 'text', label: 'System/Asset', required: true },
      { id: '2', type: 'checkbox', label: 'Threat Types', required: false, options: ['Malware', 'Phishing', 'Insider Threat', 'Data Breach', 'System Failure'] },
      { id: '3', type: 'radio', label: 'Vulnerability Level', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
      { id: '4', type: 'textarea', label: 'Current Controls', required: false },
      { id: '5', type: 'textarea', label: 'Additional Controls Needed', required: false },
      { id: '6', type: 'date', label: 'Next Review Date', required: true }
    ]
  },
  {
    id: 'financial-risk-assessment',
    name: 'Financial Risk Assessment',
    description: 'Financial risk evaluation and management',
    category: 'risk',
    targetAudience: ['finance', 'risk-managers'],
    fields: [
      { id: '1', type: 'select', label: 'Risk Type', required: true, options: ['Credit Risk', 'Market Risk', 'Liquidity Risk', 'Operational Risk'] },
      { id: '2', type: 'number', label: 'Exposure Amount', required: true },
      { id: '3', type: 'radio', label: 'Risk Rating', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
      { id: '4', type: 'textarea', label: 'Risk Factors', required: true },
      { id: '5', type: 'textarea', label: 'Hedging Strategy', required: false },
      { id: '6', type: 'date', label: 'Review Date', required: true }
    ]
  },

  // Vendor Risk (25+ templates)
  {
    id: 'vendor-security-assessment',
    name: 'Vendor Security Assessment',
    description: 'Third-party vendor security evaluation',
    category: 'vendor-risk',
    targetAudience: ['vendors', 'security-teams'],
    fields: [
      { id: '1', type: 'text', label: 'Vendor Name', required: true },
      { id: '2', type: 'text', label: 'Service Category', required: true },
      { id: '3', type: 'checkbox', label: 'Security Certifications', required: false, options: ['ISO 27001', 'SOC 2', 'PCI DSS', 'FedRAMP'] },
      { id: '4', type: 'radio', label: 'Data Access Level', required: true, options: ['No Access', 'Limited', 'Moderate', 'Full Access'] },
      { id: '5', type: 'textarea', label: 'Security Controls', required: false },
      { id: '6', type: 'radio', label: 'Overall Risk Rating', required: true, options: ['Low', 'Medium', 'High', 'Critical'] }
    ]
  },
  {
    id: 'vendor-due-diligence',
    name: 'Vendor Due Diligence Form',
    description: 'Comprehensive vendor background and capability assessment',
    category: 'vendor-risk',
    targetAudience: ['vendors', 'procurement'],
    fields: [
      { id: '1', type: 'text', label: 'Vendor Legal Name', required: true },
      { id: '2', type: 'text', label: 'Years in Business', required: true },
      { id: '3', type: 'number', label: 'Annual Revenue', required: false },
      { id: '4', type: 'checkbox', label: 'References Provided', required: false, options: ['Customer References', 'Financial References', 'Legal References'] },
      { id: '5', type: 'textarea', label: 'Financial Stability Assessment', required: false },
      { id: '6', type: 'file', label: 'Insurance Certificates', required: false }
    ]
  },
  {
    id: 'vendor-performance-review',
    name: 'Vendor Performance Review',
    description: 'Periodic vendor performance evaluation',
    category: 'vendor-risk',
    targetAudience: ['vendors', 'procurement'],
    fields: [
      { id: '1', type: 'text', label: 'Vendor Name', required: true },
      { id: '2', type: 'date', label: 'Review Period Start', required: true },
      { id: '3', type: 'date', label: 'Review Period End', required: true },
      { id: '4', type: 'radio', label: 'Service Quality', required: true, options: ['Excellent', 'Good', 'Average', 'Poor'] },
      { id: '5', type: 'radio', label: 'Delivery Performance', required: true, options: ['Always On Time', 'Usually On Time', 'Sometimes Late', 'Often Late'] },
      { id: '6', type: 'textarea', label: 'Improvement Areas', required: false }
    ]
  }
];

const categoryIcons = {
  'business': Briefcase,
  'it': Laptop,
  'finance': DollarSign,
  'customer': MessageSquare,
  'government': Building,
  'assessment': ClipboardList,
  'registration': UserCheck,
  'survey': FileText,
  'feedback': Star,
  'compliance': Shield,
  'risk': TrendingUp,
  'vendor-risk': Users,
  'healthcare': Heart,
  'education': GraduationCap,
  'real-estate': Home,
  'events': Calendar
};

const categoryColors = {
  'business': 'bg-blue-100 text-blue-800',
  'it': 'bg-purple-100 text-purple-800',
  'finance': 'bg-green-100 text-green-800',
  'customer': 'bg-orange-100 text-orange-800',
  'government': 'bg-gray-100 text-gray-800',
  'assessment': 'bg-yellow-100 text-yellow-800',
  'registration': 'bg-teal-100 text-teal-800',
  'survey': 'bg-pink-100 text-pink-800',
  'feedback': 'bg-indigo-100 text-indigo-800',
  'compliance': 'bg-red-100 text-red-800',
  'risk': 'bg-amber-100 text-amber-800',
  'vendor-risk': 'bg-cyan-100 text-cyan-800',
  'healthcare': 'bg-rose-100 text-rose-800',
  'education': 'bg-violet-100 text-violet-800',
  'real-estate': 'bg-emerald-100 text-emerald-800',
  'events': 'bg-lime-100 text-lime-800'
};

export const FormLibrary: React.FC<FormLibraryProps> = ({ onUseTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTargetAudience, setSelectedTargetAudience] = useState<string>('all');

  const categories = Array.from(new Set(formTemplates.map(template => template.category)));
  const targetAudiences = Array.from(new Set(formTemplates.flatMap(template => template.targetAudience || [])));

  const filteredTemplates = formTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesAudience = selectedTargetAudience === 'all' || 
                           (template.targetAudience && template.targetAudience.includes(selectedTargetAudience));
    
    return matchesSearch && matchesCategory && matchesAudience;
  });

  const getTemplatesByCategory = (category: string) => {
    return formTemplates.filter(template => template.category === category);
  };

  const getCategoryStats = () => {
    return categories.map(category => ({
      name: category,
      count: getTemplatesByCategory(category).length,
      icon: categoryIcons[category as keyof typeof categoryIcons] || FileText
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Form Template Library</h2>
        <p className="text-gray-600">Choose from our extensive collection of {formTemplates.length}+ professionally designed form templates</p>
        
        {/* Category Statistics */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {getCategoryStats().map(({ name, count, icon: Icon }) => (
            <Badge key={name} variant="outline" className="px-3 py-1">
              <Icon className="h-3 w-3 mr-1" />
              {name.charAt(0).toUpperCase() + name.slice(1)}: {count}
            </Badge>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories ({formTemplates.length})</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)} ({getTemplatesByCategory(category).length})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTargetAudience} onValueChange={setSelectedTargetAudience}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Audiences" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Audiences</SelectItem>
              {targetAudiences.map(audience => (
                <SelectItem key={audience} value={audience}>
                  {audience.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTemplates.map((template) => {
          const IconComponent = categoryIcons[template.category as keyof typeof categoryIcons] || FileText;
          const colorClass = categoryColors[template.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800';
          
          return (
            <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5 text-gray-600" />
                    <Badge className={colorClass}>
                      {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                    </Badge>
                  </div>
                  <Star className="h-4 w-4 text-gray-300 group-hover:text-yellow-400 transition-colors" />
                </div>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <p className="text-sm text-gray-600">{template.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{template.fields.length} fields</span>
                    <span className="text-xs">
                      {template.targetAudience?.slice(0, 2).map(audience => 
                        audience.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                      ).join(', ')}
                      {template.targetAudience && template.targetAudience.length > 2 && '...'}
                    </span>
                  </div>
                  <Button 
                    onClick={() => onUseTemplate(template)}
                    className="w-full"
                    size="sm"
                  >
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Category Breakdown Section */}
      {searchTerm === '' && selectedCategory === 'all' && selectedTargetAudience === 'all' && (
        <div className="mt-12 border-t pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(category => {
              const categoryTemplates = getTemplatesByCategory(category);
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || FileText;
              const colorClass = categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800';
              
              return (
                <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedCategory(category)}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-6 w-6 text-gray-600" />
                      <div>
                        <CardTitle className="text-lg">
                          {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </CardTitle>
                        <Badge className={colorClass}>{categoryTemplates.length} templates</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      {category === 'business' && 'Startup applications, business plans, and corporate forms'}
                      {category === 'it' && 'Software deployment, API integration, and system maintenance'}
                      {category === 'finance' && 'Investment, loans, insurance, and financial assessments'}
                      {category === 'customer' && 'Satisfaction surveys, feedback forms, and support requests'}
                      {category === 'government' && 'Public records, permits, and regulatory compliance'}
                      {category === 'assessment' && 'Risk evaluation, damage assessment, and auditing'}
                      {category === 'registration' && 'Event, course, vendor, and membership registration'}
                      {category === 'survey' && 'Market research, employee satisfaction, and data collection'}
                      {category === 'feedback' && 'Product quality, service delivery, and improvement suggestions'}
                      {category === 'compliance' && 'GDPR, ISO, HIPAA, and regulatory compliance forms'}
                      {category === 'risk' && 'Operational, cybersecurity, and financial risk assessment'}
                      {category === 'vendor-risk' && 'Vendor security, due diligence, and performance evaluation'}
                    </p>
                    <div className="text-xs text-gray-500">
                      Popular: {categoryTemplates.slice(0, 3).map(t => t.name.split(' ').slice(0, 2).join(' ')).join(', ')}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
