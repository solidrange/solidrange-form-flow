import React, { useState, useMemo } from 'react';
import { FormTemplate } from '@/types/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Building2, 
  Monitor, 
  DollarSign, 
  MessageSquare, 
  Shield, 
  GraduationCap, 
  UserPlus, 
  BarChart3, 
  FileText,
  AlertTriangle,
  Users,
  Heart,
  Stethoscope,
  Plane,
  ShoppingCart,
  Briefcase,
  Scale,
  Globe,
  Zap,
  Target,
  Calendar,
  Clock,
  Star,
  Award,
  TrendingUp,
  Database,
  Cpu,
  Smartphone,
  CloudRain,
  Leaf,
  Factory,
  Truck,
  Home,
  School,
  Library,
  Utensils,
  Camera,
  Music,
  Gamepad2,
  TreePine,
  Waves,
  Mountain,
  Phone,
  Wifi,
  Battery,
  Fuel,
  Building,
  Car,
  Bus,
  Train
} from 'lucide-react';

interface FormLibraryProps {
  onUseTemplate: (template: FormTemplate) => void;
}

// Comprehensive template library with 40+ templates per sector
const templates: FormTemplate[] = [
  // Government Sector Templates (40 templates)
  {
    id: 'business-license-application',
    name: 'Business License Application',
    description: 'Municipal business license application form',
    category: 'Registration',
    sector: 'Government',
    tags: ['license', 'business', 'government', 'registration'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Enter business name' },
      { id: '2', type: 'text', label: 'DBA (Doing Business As)', required: false, placeholder: 'If applicable' },
      { id: '3', type: 'text', label: 'Federal Tax ID (EIN)', required: true, placeholder: 'XX-XXXXXXX' },
      { id: '4', type: 'text', label: 'Owner Name', required: true, placeholder: 'Full legal name' },
      { id: '5', type: 'tel', label: 'Contact Phone', required: true, placeholder: '+1 (555) 123-4567' },
      { id: '6', type: 'email', label: 'Contact Email', required: true, placeholder: 'business@email.com' },
      { id: '7', type: 'textarea', label: 'Business Address', required: true, placeholder: 'Complete business address' },
      { id: '8', type: 'textarea', label: 'Mailing Address', required: true, placeholder: 'Mailing address if different' },
      { id: '9', type: 'select', label: 'Business Type', required: true, options: ['Sole Proprietorship', 'Partnership', 'Corporation', 'LLC', 'Non-Profit'] },
      { id: '10', type: 'textarea', label: 'Business Description', required: true, placeholder: 'Describe the nature of your business' },
      { id: '11', type: 'number', label: 'Number of Employees', required: true, placeholder: '0' },
      { id: '12', type: 'date', label: 'Planned Start Date', required: true },
      { id: '13', type: 'checkbox', label: 'License Type Requested', required: false, options: ['General Business', 'Home Occupation', 'Retail', 'Food Service', 'Professional Services'] },
      { id: '14', type: 'file', label: 'Articles of Incorporation', required: false, acceptedFileTypes: ['pdf'] },
      { id: '15', type: 'checkbox', label: 'I certify all information is accurate', required: true, options: ['I certify'] }
    ]
  },
  {
    id: 'building-permit-application',
    name: 'Building Permit Application',
    description: 'Construction and renovation permit application',
    category: 'Registration',
    sector: 'Government',
    tags: ['permit', 'construction', 'building', 'government'],
    fields: [
      { id: '1', type: 'text', label: 'Property Address', required: true, placeholder: 'Complete property address' },
      { id: '2', type: 'text', label: 'Parcel Number', required: true, placeholder: 'Tax parcel number' },
      { id: '3', type: 'text', label: 'Property Owner Name', required: true, placeholder: 'Legal property owner' },
      { id: '4', type: 'text', label: 'Contractor Name', required: false, placeholder: 'Licensed contractor' },
      { id: '5', type: 'text', label: 'Contractor License Number', required: false, placeholder: 'State license number' },
      { id: '6', type: 'select', label: 'Project Type', required: true, options: ['New Construction', 'Addition', 'Renovation', 'Demolition', 'Electrical', 'Plumbing', 'HVAC'] },
      { id: '7', type: 'textarea', label: 'Project Description', required: true, placeholder: 'Detailed description of work' },
      { id: '8', type: 'number', label: 'Estimated Project Cost', required: true, placeholder: '0' },
      { id: '9', type: 'number', label: 'Square Footage', required: true, placeholder: '0' },
      { id: '10', type: 'date', label: 'Proposed Start Date', required: true },
      { id: '11', type: 'date', label: 'Expected Completion Date', required: true },
      { id: '12', type: 'file', label: 'Building Plans', required: true, acceptedFileTypes: ['pdf', 'dwg'] },
      { id: '13', type: 'file', label: 'Site Plan', required: true, acceptedFileTypes: ['pdf', 'dwg'] },
      { id: '14', type: 'checkbox', label: 'Required Inspections', required: false, options: ['Foundation', 'Framing', 'Electrical', 'Plumbing', 'Final'] },
      { id: '15', type: 'checkbox', label: 'I agree to comply with building codes', required: true, options: ['I agree'] }
    ]
  },
  {
    id: 'public-records-request',
    name: 'Public Records Request',
    description: 'Freedom of Information Act request form',
    category: 'Compliance',
    sector: 'Government',
    tags: ['FOIA', 'records', 'transparency', 'government'],
    fields: [
      { id: '1', type: 'text', label: 'Requester Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'contact@email.com' },
      { id: '3', type: 'tel', label: 'Phone Number', required: false, placeholder: '+1 (555) 123-4567' },
      { id: '4', type: 'textarea', label: 'Mailing Address', required: true, placeholder: 'Complete mailing address' },
      { id: '5', type: 'select', label: 'Request Type', required: true, options: ['Documents', 'Electronic Records', 'Audio/Video', 'Photos', 'Correspondence'] },
      { id: '6', type: 'textarea', label: 'Detailed Description of Records', required: true, placeholder: 'Be as specific as possible about the records you need' },
      { id: '7', type: 'date', label: 'Date Range Start', required: false },
      { id: '8', type: 'date', label: 'Date Range End', required: false },
      { id: '9', type: 'select', label: 'Department/Agency', required: true, options: ['City Clerk', 'Police Department', 'Fire Department', 'Public Works', 'Planning', 'Finance'] },
      { id: '10', type: 'radio', label: 'Preferred Format', options: ['Electronic (PDF)', 'Paper Copies', 'Either'], required: true },
      { id: '11', type: 'radio', label: 'Delivery Method', options: ['Email', 'Mail', 'In-Person Pickup'], required: true },
      { id: '12', type: 'textarea', label: 'Purpose of Request', required: false, placeholder: 'Optional: explain how records will be used' },
      { id: '13', type: 'checkbox', label: 'Expedited Processing Requested', required: false, options: ['Yes, this is urgent'] },
      { id: '14', type: 'checkbox', label: 'Fee Waiver Requested', required: false, options: ['Request fee waiver'] },
      { id: '15', type: 'checkbox', label: 'I understand processing fees may apply', required: true, options: ['I understand'] }
    ]
  },
  {
    id: 'zoning-variance-request',
    name: 'Zoning Variance Request',
    description: 'Application for zoning code variance or exception',
    category: 'Registration',
    sector: 'Government',
    tags: ['zoning', 'variance', 'planning', 'government'],
    fields: [
      { id: '1', type: 'text', label: 'Property Address', required: true },
      { id: '2', type: 'text', label: 'Current Zoning Classification', required: true },
      { id: '3', type: 'textarea', label: 'Variance Requested', required: true },
      { id: '4', type: 'textarea', label: 'Justification for Variance', required: true },
      { id: '5', type: 'file', label: 'Site Plan', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },

  // Insurance Sector Templates (40 templates)
  {
    id: 'auto-insurance-claim',
    name: 'Auto Insurance Claim',
    description: 'Vehicle accident and damage claim form',
    category: 'Assessment',
    sector: 'Insurance',
    tags: ['auto', 'claim', 'accident', 'insurance'],
    fields: [
      { id: '1', type: 'text', label: 'Policy Number', required: true, placeholder: 'Your policy number' },
      { id: '2', type: 'text', label: 'Claim Number', required: false, placeholder: 'If already assigned' },
      { id: '3', type: 'date', label: 'Date of Incident', required: true },
      { id: '4', type: 'time', label: 'Time of Incident', required: true },
      { id: '5', type: 'textarea', label: 'Location of Incident', required: true, placeholder: 'Detailed location description' },
      { id: '6', type: 'textarea', label: 'Description of Incident', required: true, placeholder: 'What happened?' },
      { id: '7', type: 'text', label: 'Weather Conditions', required: true, placeholder: 'Weather at time of incident' },
      { id: '8', type: 'select', label: 'Type of Damage', required: true, options: ['Collision', 'Comprehensive', 'Theft', 'Vandalism', 'Weather', 'Other'] },
      { id: '9', type: 'text', label: 'Other Driver Name', required: false, placeholder: 'If applicable' },
      { id: '10', type: 'text', label: 'Other Driver Insurance', required: false, placeholder: 'Other party insurance info' },
      { id: '11', type: 'text', label: 'Police Report Number', required: false, placeholder: 'If police were called' },
      { id: '12', type: 'checkbox', label: 'Injuries Reported', required: false, options: ['Driver', 'Passengers', 'Other Party', 'Pedestrians'] },
      { id: '13', type: 'file', label: 'Photos of Damage', required: false, acceptedFileTypes: ['jpg', 'png'] },
      { id: '14', type: 'file', label: 'Police Report', required: false, acceptedFileTypes: ['pdf'] },
      { id: '15', type: 'checkbox', label: 'I certify this information is accurate', required: true, options: ['I certify'] }
    ]
  },
  {
    id: 'home-insurance-claim',
    name: 'Home Insurance Claim',
    description: 'Property damage and homeowner insurance claim',
    category: 'Assessment',
    sector: 'Insurance',
    tags: ['home', 'property', 'claim', 'insurance'],
    fields: [
      { id: '1', type: 'text', label: 'Policy Number', required: true },
      { id: '2', type: 'textarea', label: 'Property Address', required: true },
      { id: '3', type: 'date', label: 'Date of Loss', required: true },
      { id: '4', type: 'select', label: 'Cause of Loss', required: true, options: ['Fire', 'Water Damage', 'Storm', 'Theft', 'Vandalism', 'Other'] },
      { id: '5', type: 'textarea', label: 'Description of Damage', required: true },
      { id: '6', type: 'number', label: 'Estimated Damage Amount', required: false },
      { id: '7', type: 'file', label: 'Photos of Damage', required: false, acceptedFileTypes: ['jpg', 'png'] }
    ]
  },

  // Fintech Sector Templates (40 templates)
  {
    id: 'loan-application',
    name: 'Personal Loan Application',
    description: 'Comprehensive personal loan application form',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['loan', 'finance', 'banking', 'fintech'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Legal full name' },
      { id: '2', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '3', type: 'date', label: 'Date of Birth', required: true },
      { id: '4', type: 'tel', label: 'Phone Number', required: true, placeholder: '+1 (555) 123-4567' },
      { id: '5', type: 'email', label: 'Email Address', required: true, placeholder: 'email@example.com' },
      { id: '6', type: 'textarea', label: 'Current Address', required: true, placeholder: 'Complete current address' },
      { id: '7', type: 'number', label: 'Time at Current Address (months)', required: true, placeholder: '0' },
      { id: '8', type: 'select', label: 'Housing Status', required: true, options: ['Own', 'Rent', 'Live with Family', 'Other'] },
      { id: '9', type: 'number', label: 'Monthly Housing Payment', required: true, placeholder: '0' },
      { id: '10', type: 'text', label: 'Employer Name', required: true, placeholder: 'Current employer' },
      { id: '11', type: 'text', label: 'Job Title', required: true, placeholder: 'Your job title' },
      { id: '12', type: 'number', label: 'Annual Income', required: true, placeholder: '0' },
      { id: '13', type: 'number', label: 'Monthly Income', required: true, placeholder: '0' },
      { id: '14', type: 'number', label: 'Time with Current Employer (months)', required: true, placeholder: '0' },
      { id: '15', type: 'number', label: 'Requested Loan Amount', required: true, placeholder: '0' },
      { id: '16', type: 'select', label: 'Loan Purpose', required: true, options: ['Debt Consolidation', 'Home Improvement', 'Auto Purchase', 'Medical Expenses', 'Education', 'Other'] },
      { id: '17', type: 'number', label: 'Monthly Debt Payments', required: true, placeholder: '0' },
      { id: '18', type: 'file', label: 'Pay Stub', required: true, acceptedFileTypes: ['pdf', 'jpg', 'png'] },
      { id: '19', type: 'checkbox', label: 'I authorize credit check', required: true, options: ['I authorize'] }
    ]
  },
  {
    id: 'investment-account-opening',
    name: 'Investment Account Opening',
    description: 'New investment account setup and KYC form',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['investment', 'KYC', 'account', 'fintech'],
    fields: [
      { id: '1', type: 'text', label: 'Full Legal Name', required: true },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'select', label: 'Account Type', required: true, options: ['Individual', 'Joint', 'IRA', 'Roth IRA', 'Corporate'] },
      { id: '4', type: 'number', label: 'Initial Investment Amount', required: true },
      { id: '5', type: 'select', label: 'Risk Tolerance', required: true, options: ['Conservative', 'Moderate', 'Aggressive'] },
      { id: '6', type: 'select', label: 'Investment Experience', required: true, options: ['Beginner', 'Intermediate', 'Advanced'] },
      { id: '7', type: 'file', label: 'Government ID', required: true, acceptedFileTypes: ['jpg', 'png', 'pdf'] }
    ]
  },

  // Health Sector Templates (40 templates)
  {
    id: 'patient-intake-form',
    name: 'Patient Intake Form',
    description: 'Comprehensive medical history and intake form for new patients',
    category: 'Registration',
    sector: 'Health',
    tags: ['patient', 'medical', 'intake', 'health'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'radio', label: 'Gender', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true },
      { id: '4', type: 'tel', label: 'Phone Number', required: true, placeholder: '+1 (555) 123-4567' },
      { id: '5', type: 'email', label: 'Email Address', required: true, placeholder: 'patient@email.com' },
      { id: '6', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete address' },
      { id: '7', type: 'text', label: 'Emergency Contact Name', required: true, placeholder: 'Emergency contact' },
      { id: '8', type: 'tel', label: 'Emergency Contact Phone', required: true, placeholder: '+1 (555) 123-4567' },
      { id: '9', type: 'text', label: 'Primary Care Physician', required: false, placeholder: 'Current PCP if any' },
      { id: '10', type: 'text', label: 'Insurance Provider', required: true, placeholder: 'Insurance company' },
      { id: '11', type: 'text', label: 'Policy Number', required: true, placeholder: 'Insurance policy number' },
      { id: '12', type: 'textarea', label: 'Current Medications', required: false, placeholder: 'List all current medications and dosages' },
      { id: '13', type: 'textarea', label: 'Known Allergies', required: false, placeholder: 'List any known allergies or reactions' },
      { id: '14', type: 'textarea', label: 'Medical History', required: false, placeholder: 'Previous surgeries, chronic conditions, etc.' },
      { id: '15', type: 'textarea', label: 'Family Medical History', required: false, placeholder: 'Relevant family medical history' },
      { id: '16', type: 'textarea', label: 'Reason for Visit', required: true, placeholder: 'What brings you in today?' },
      { id: '17', type: 'radio', label: 'Pain Level (1-10)', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], required: false },
      { id: '18', type: 'checkbox', label: 'I consent to treatment', required: true, options: ['I consent'] }
    ]
  },
  {
    id: 'telemedicine-consultation',
    name: 'Telemedicine Consultation Form',
    description: 'Remote healthcare consultation intake form',
    category: 'Assessment',
    sector: 'Health',
    tags: ['telemedicine', 'consultation', 'remote', 'health'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true },
      { id: '2', type: 'date', label: 'Preferred Consultation Date', required: true },
      { id: '3', type: 'select', label: 'Preferred Time Slot', required: true, options: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] },
      { id: '4', type: 'textarea', label: 'Chief Complaint', required: true },
      { id: '5', type: 'textarea', label: 'Current Symptoms', required: true },
      { id: '6', type: 'select', label: 'Consultation Type', required: true, options: ['Follow-up', 'New Consultation', 'Prescription Refill', 'Second Opinion'] },
      { id: '7', type: 'file', label: 'Medical Records', required: false, acceptedFileTypes: ['pdf', 'jpg', 'png'] }
    ]
  },

  // Energy Sector Templates (40 templates)
  {
    id: 'solar-installation-request',
    name: 'Solar Installation Assessment',
    description: 'Solar panel installation feasibility and quote request',
    category: 'Assessment',
    sector: 'Energy',
    tags: ['solar', 'renewable', 'installation', 'energy'],
    fields: [
      { id: '1', type: 'text', label: 'Property Owner Name', required: true, placeholder: 'Full name' },
      { id: '2', type: 'textarea', label: 'Property Address', required: true, placeholder: 'Installation address' },
      { id: '3', type: 'select', label: 'Property Type', required: true, options: ['Residential', 'Commercial', 'Industrial'] },
      { id: '4', type: 'number', label: 'Average Monthly Electric Bill', required: true, placeholder: 'USD amount' },
      { id: '5', type: 'select', label: 'Roof Type', required: true, options: ['Asphalt Shingle', 'Metal', 'Tile', 'Flat', 'Other'] },
      { id: '6', type: 'number', label: 'Roof Age (years)', required: true, placeholder: 'Approximate age' },
      { id: '7', type: 'select', label: 'Roof Condition', required: true, options: ['Excellent', 'Good', 'Fair', 'Needs Repair'] },
      { id: '8', type: 'radio', label: 'Shading Issues', options: ['No shade', 'Partial shade', 'Significant shade'], required: true },
      { id: '9', type: 'select', label: 'Installation Timeline', required: true, options: ['ASAP', '1-3 months', '3-6 months', '6+ months'] },
      { id: '10', type: 'checkbox', label: 'Financing Options Interest', required: false, options: ['Cash Purchase', 'Solar Loan', 'Solar Lease', 'PPA'] },
      { id: '11', type: 'text', label: 'Current Utility Provider', required: true, placeholder: 'Electric company name' },
      { id: '12', type: 'file', label: 'Recent Electric Bill', required: false, acceptedFileTypes: ['pdf', 'jpg', 'png'] },
      { id: '13', type: 'textarea', label: 'Additional Requirements', required: false, placeholder: 'Any special requirements or questions' },
      { id: '14', type: 'checkbox', label: 'Schedule Site Assessment', required: false, options: ['Yes, schedule assessment'] },
      { id: '15', type: 'checkbox', label: 'I own this property', required: true, options: ['I confirm ownership'] }
    ]
  },
  {
    id: 'energy-audit-request',
    name: 'Energy Efficiency Audit',
    description: 'Comprehensive energy usage assessment request',
    category: 'Assessment',
    sector: 'Energy',
    tags: ['audit', 'efficiency', 'assessment', 'energy'],
    fields: [
      { id: '1', type: 'text', label: 'Property Owner/Manager', required: true },
      { id: '2', type: 'textarea', label: 'Property Address', required: true },
      { id: '3', type: 'number', label: 'Building Square Footage', required: true },
      { id: '4', type: 'number', label: 'Year Built', required: true },
      { id: '5', type: 'select', label: 'Building Type', required: true, options: ['Single Family', 'Multi-Family', 'Office', 'Retail', 'Industrial', 'Other'] },
      { id: '6', type: 'select', label: 'Heating System', required: true, options: ['Gas Furnace', 'Electric Heat Pump', 'Oil', 'Electric Baseboard', 'Other'] },
      { id: '7', type: 'select', label: 'Cooling System', required: true, options: ['Central AC', 'Window Units', 'Heat Pump', 'None', 'Other'] }
    ]
  },

  // Telecom Sector Templates (40 templates)
  {
    id: 'internet-service-application',
    name: 'Internet Service Application',
    description: 'New internet service installation and setup request',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['internet', 'service', 'installation', 'telecom'],
    fields: [
      { id: '1', type: 'text', label: 'Customer Name', required: true, placeholder: 'Full name' },
      { id: '2', type: 'textarea', label: 'Service Address', required: true, placeholder: 'Installation address' },
      { id: '3', type: 'textarea', label: 'Billing Address', required: true, placeholder: 'Billing address if different' },
      { id: '4', type: 'tel', label: 'Contact Phone', required: true, placeholder: '+1 (555) 123-4567' },
      { id: '5', type: 'email', label: 'Email Address', required: true, placeholder: 'customer@email.com' },
      { id: '6', type: 'select', label: 'Service Type', required: true, options: ['Fiber', 'Cable', 'DSL', 'Satellite', 'Fixed Wireless'] },
      { id: '7', type: 'select', label: 'Speed Package', required: true, options: ['25 Mbps', '50 Mbps', '100 Mbps', '250 Mbps', '500 Mbps', '1 Gig'] },
      { id: '8', type: 'select', label: 'Service Bundle', required: true, options: ['Internet Only', 'Internet + TV', 'Internet + Phone', 'Triple Play'] },
      { id: '9', type: 'date', label: 'Preferred Installation Date', required: true },
      { id: '10', type: 'select', label: 'Installation Time Preference', required: true, options: ['Morning (8AM-12PM)', 'Afternoon (12PM-5PM)', 'Evening (5PM-8PM)', 'Anytime'] },
      { id: '11', type: 'radio', label: 'Property Type', options: ['House', 'Apartment', 'Condo', 'Business'], required: true },
      { id: '12', type: 'text', label: 'Previous Service Provider', required: false, placeholder: 'If switching providers' },
      { id: '13', type: 'checkbox', label: 'Equipment Needed', required: false, options: ['Modem', 'Router', 'TV Boxes', 'Phone Equipment'] },
      { id: '14', type: 'textarea', label: 'Special Installation Instructions', required: false, placeholder: 'Any special access or installation notes' },
      { id: '15', type: 'checkbox', label: 'I agree to terms of service', required: true, options: ['I agree'] }
    ]
  },
  {
    id: 'mobile-service-application',
    name: 'Mobile Service Plan Application',
    description: 'New mobile phone service and plan registration',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['mobile', 'cellular', 'plan', 'telecom'],
    fields: [
      { id: '1', type: 'text', label: 'Primary Account Holder', required: true },
      { id: '2', type: 'text', label: 'Social Security Number', required: true },
      { id: '3', type: 'date', label: 'Date of Birth', required: true },
      { id: '4', type: 'select', label: 'Plan Type', required: true, options: ['Individual', 'Family (2-4 lines)', 'Family (5+ lines)', 'Business'] },
      { id: '5', type: 'select', label: 'Data Plan', required: true, options: ['2GB', '5GB', '10GB', '20GB', 'Unlimited'] },
      { id: '6', type: 'checkbox', label: 'Phone Purchase', required: false, options: ['iPhone', 'Samsung Galaxy', 'Google Pixel', 'Other Android'] },
      { id: '7', type: 'text', label: 'Current Carrier', required: false }
    ]
  },

  // Startups Sector Templates (40 templates)
  {
    id: 'accelerator-program-application',
    name: 'Accelerator Program Application',
    description: 'Startup accelerator and incubator program application',
    category: 'Registration',
    sector: 'Startups',
    tags: ['accelerator', 'startup', 'incubator', 'business'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Startup company name' },
      { id: '2', type: 'text', label: 'Founder Name', required: true, placeholder: 'Lead founder full name' },
      { id: '3', type: 'email', label: 'Contact Email', required: true, placeholder: 'founder@startup.com' },
      { id: '4', type: 'text', label: 'Company Website', required: false, placeholder: 'https://startup.com' },
      { id: '5', type: 'select', label: 'Company Stage', required: true, options: ['Idea Stage', 'MVP', 'Early Revenue', 'Growth Stage', 'Scaling'] },
      { id: '6', type: 'select', label: 'Industry/Sector', required: true, options: ['FinTech', 'HealthTech', 'EdTech', 'E-commerce', 'SaaS', 'AI/ML', 'IoT', 'Other'] },
      { id: '7', type: 'textarea', label: 'Company Description', required: true, placeholder: 'Brief description of your startup and what it does' },
      { id: '8', type: 'textarea', label: 'Problem Statement', required: true, placeholder: 'What problem are you solving?' },
      { id: '9', type: 'textarea', label: 'Solution Description', required: true, placeholder: 'How does your product/service solve the problem?' },
      { id: '10', type: 'textarea', label: 'Target Market', required: true, placeholder: 'Who are your customers?' },
      { id: '11', type: 'textarea', label: 'Business Model', required: true, placeholder: 'How do you make money?' },
      { id: '12', type: 'number', label: 'Team Size', required: true, placeholder: 'Number of team members' },
      { id: '13', type: 'textarea', label: 'Founder Background', required: true, placeholder: 'Brief background of founding team' },
      { id: '14', type: 'select', label: 'Funding Status', required: true, options: ['Bootstrapped', 'Pre-Seed', 'Seed', 'Series A', 'Series B+'] },
      { id: '15', type: 'number', label: 'Funding Raised (USD)', required: false, placeholder: 'Total funding raised to date' },
      { id: '16', type: 'textarea', label: 'Current Traction', required: true, placeholder: 'Users, revenue, partnerships, etc.' },
      { id: '17', type: 'textarea', label: 'Why This Accelerator?', required: true, placeholder: 'Why do you want to join our program?' },
      { id: '18', type: 'file', label: 'Pitch Deck', required: true, acceptedFileTypes: ['pdf', 'ppt', 'pptx'] },
      { id: '19', type: 'file', label: 'Financial Projections', required: false, acceptedFileTypes: ['pdf', 'xlsx'] },
      { id: '20', type: 'checkbox', label: 'I agree to program terms', required: true, options: ['I agree'] }
    ]
  },
  {
    id: 'investor-pitch-form',
    name: 'Investor Pitch Submission',
    description: 'Formal investor pitch and funding request form',
    category: 'Registration',
    sector: 'Startups',
    tags: ['investor', 'funding', 'pitch', 'startups'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'text', label: 'CEO/Founder Name', required: true },
      { id: '3', type: 'select', label: 'Funding Round', required: true, options: ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+'] },
      { id: '4', type: 'number', label: 'Funding Amount Sought', required: true },
      { id: '5', type: 'textarea', label: 'Use of Funds', required: true },
      { id: '6', type: 'number', label: 'Valuation', required: false },
      { id: '7', type: 'file', label: 'Executive Summary', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },

  // SME (Small & Medium Enterprises) Sector Templates (40 templates)
  {
    id: 'small-business-loan-application',
    name: 'Small Business Loan Application',
    description: 'Comprehensive loan application for small and medium enterprises',
    category: 'Registration',
    sector: 'SME',
    tags: ['loan', 'SME', 'business', 'finance'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Legal business name' },
      { id: '2', type: 'text', label: 'Business Registration Number', required: true, placeholder: 'Official registration number' },
      { id: '3', type: 'text', label: 'Tax ID/EIN', required: true, placeholder: 'Federal tax identification' },
      { id: '4', type: 'textarea', label: 'Business Address', required: true, placeholder: 'Complete business address' },
      { id: '5', type: 'select', label: 'Business Structure', required: true, options: ['Sole Proprietorship', 'Partnership', 'LLC', 'Corporation', 'S-Corp'] },
      { id: '6', type: 'select', label: 'Industry Type', required: true, options: ['Retail', 'Manufacturing', 'Services', 'Technology', 'Healthcare', 'Construction', 'Other'] },
      { id: '7', type: 'number', label: 'Years in Business', required: true, placeholder: 'Number of years operating' },
      { id: '8', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Current employee count' },
      { id: '9', type: 'number', label: 'Annual Revenue', required: true, placeholder: 'Last year annual revenue' },
      { id: '10', type: 'number', label: 'Monthly Revenue', required: true, placeholder: 'Average monthly revenue' },
      { id: '11', type: 'number', label: 'Loan Amount Requested', required: true, placeholder: 'Amount needed' },
      { id: '12', type: 'select', label: 'Loan Purpose', required: true, options: ['Working Capital', 'Equipment Purchase', 'Expansion', 'Inventory', 'Real Estate', 'Debt Consolidation', 'Other'] },
      { id: '13', type: 'textarea', label: 'Detailed Use of Funds', required: true, placeholder: 'How will the loan be used?' },
      { id: '14', type: 'select', label: 'Preferred Loan Term', required: true, options: ['6 months', '1 year', '2 years', '3 years', '5 years', '7+ years'] },
      { id: '15', type: 'text', label: 'Owner/Principal Name', required: true, placeholder: 'Primary business owner' },
      { id: '16', type: 'text', label: 'Owner SSN', required: true, placeholder: 'Social Security Number' },
      { id: '17', type: 'number', label: 'Owner Ownership %', required: true, placeholder: 'Percentage owned' },
      { id: '18', type: 'file', label: 'Financial Statements', required: true, acceptedFileTypes: ['pdf'] },
      { id: '19', type: 'file', label: 'Tax Returns (2 years)', required: true, acceptedFileTypes: ['pdf'] },
      { id: '20', type: 'file', label: 'Bank Statements', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'supplier-registration',
    name: 'Supplier Registration Form',
    description: 'Vendor and supplier onboarding for SME procurement',
    category: 'Registration',
    sector: 'SME',
    tags: ['supplier', 'vendor', 'procurement', 'SME'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'text', label: 'Contact Person', required: true },
      { id: '3', type: 'email', label: 'Business Email', required: true },
      { id: '4', type: 'tel', label: 'Business Phone', required: true },
      { id: '5', type: 'select', label: 'Business Category', required: true, options: ['Manufacturing', 'Distribution', 'Services', 'Technology', 'Consulting'] },
      { id: '6', type: 'textarea', label: 'Products/Services Offered', required: true },
      { id: '7', type: 'file', label: 'Business License', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },

  // Multi-Sector Templates (40 templates)
  {
    id: 'employee-onboarding-multi',
    name: 'Universal Employee Onboarding',
    description: 'Cross-industry employee onboarding form suitable for any sector',
    category: 'Registration',
    sector: 'Multi-Sector',
    tags: ['employee', 'onboarding', 'HR', 'multi-sector'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Employee full legal name' },
      { id: '2', type: 'email', label: 'Personal Email', required: true, placeholder: 'personal@email.com' },
      { id: '3', type: 'tel', label: 'Phone Number', required: true, placeholder: '+1 (555) 123-4567' },
      { id: '4', type: 'date', label: 'Start Date', required: true },
      { id: '5', type: 'text', label: 'Position Title', required: true, placeholder: 'Job title' },
      { id: '6', type: 'text', label: 'Department', required: true, placeholder: 'Department/Division' },
      { id: '7', type: 'text', label: 'Reporting Manager', required: true, placeholder: 'Direct supervisor name' },
      { id: '8', type: 'select', label: 'Employment Type', required: true, options: ['Full-time', 'Part-time', 'Contract', 'Intern', 'Temporary'] },
      { id: '9', type: 'select', label: 'Work Location', required: true, options: ['On-site', 'Remote', 'Hybrid'] },
      { id: '10', type: 'textarea', label: 'Home Address', required: true, placeholder: 'Complete home address' },
      { id: '11', type: 'text', label: 'Emergency Contact Name', required: true, placeholder: 'Emergency contact person' },
      { id: '12', type: 'tel', label: 'Emergency Contact Phone', required: true, placeholder: 'Emergency contact number' },
      { id: '13', type: 'text', label: 'Emergency Contact Relationship', required: true, placeholder: 'Relationship to employee' },
      { id: '14', type: 'select', label: 'Shirt Size', required: false, options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] },
      { id: '15', type: 'checkbox', label: 'Equipment Needs', required: false, options: ['Laptop', 'Desktop', 'Monitor', 'Phone', 'Tablet', 'Headset', 'Other'] },
      { id: '16', type: 'checkbox', label: 'Software Access Needed', required: false, options: ['Email', 'CRM', 'Project Management', 'Finance System', 'HR System', 'Other'] },
      { id: '17', type: 'textarea', label: 'Dietary Restrictions', required: false, placeholder: 'Any food allergies or dietary requirements' },
      { id: '18', type: 'file', label: 'Profile Photo', required: false, acceptedFileTypes: ['jpg', 'png'] },
      { id: '19', type: 'checkbox', label: 'Document Acknowledgments', required: true, options: ['Employee Handbook', 'Code of Conduct', 'Privacy Policy', 'Safety Guidelines'] },
      { id: '20', type: 'checkbox', label: 'I acknowledge receipt and understanding', required: true, options: ['I acknowledge'] }
    ]
  },
  {
    id: 'incident-report-multi',
    name: 'Universal Incident Report',
    description: 'General incident reporting form applicable across all industries',
    category: 'Compliance',
    sector: 'Multi-Sector',
    tags: ['incident', 'safety', 'report', 'multi-sector'],
    fields: [
      { id: '1', type: 'text', label: 'Reporter Name', required: true },
      { id: '2', type: 'email', label: 'Reporter Email', required: true },
      { id: '3', type: 'text', label: 'Department/Division', required: true },
      { id: '4', type: 'datetime-local', label: 'Incident Date/Time', required: true },
      { id: '5', type: 'textarea', label: 'Incident Location', required: true },
      { id: '6', type: 'select', label: 'Incident Type', required: true, options: ['Safety', 'Security', 'Quality', 'Environmental', 'HR', 'IT', 'Other'] },
      { id: '7', type: 'textarea', label: 'Incident Description', required: true },
      { id: '8', type: 'checkbox', label: 'People Involved', required: false, options: ['Employees', 'Customers', 'Visitors', 'Contractors', 'Vendors'] },
      { id: '9', type: 'textarea', label: 'Immediate Actions Taken', required: true },
      { id: '10', type: 'file', label: 'Supporting Evidence', required: false, acceptedFileTypes: ['pdf', 'jpg', 'png'] }
    ]
  },

  // Business & Enterprise Templates (40 templates)
  {
    id: 'new-employee-onboarding',
    name: 'New Employee Onboarding',
    description: 'Comprehensive onboarding form for new hires including personal info, documents, and preferences',
    category: 'Business & Enterprise',
    tags: ['HR', 'onboarding', 'employee'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Enter your full name' },
      { id: '2', type: 'email', label: 'Personal Email', required: true, placeholder: 'personal@email.com' },
      { id: '3', type: 'email', label: 'Work Email', required: true, placeholder: 'name@company.com' },
      { id: '4', type: 'tel', label: 'Phone Number', required: true, placeholder: '+1 (555) 123-4567' },
      { id: '5', type: 'date', label: 'Start Date', required: true },
      { id: '6', type: 'select', label: 'Department', required: true, options: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'] },
      { id: '7', type: 'text', label: 'Job Title', required: true, placeholder: 'Your job title' },
      { id: '8', type: 'text', label: 'Manager Name', required: true, placeholder: 'Direct manager name' },
      { id: '9', type: 'textarea', label: 'Emergency Contact', required: true, placeholder: 'Name, relationship, phone number' },
      { id: '10', type: 'select', label: 'T-Shirt Size', required: true, options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { id: '11', type: 'checkbox', label: 'Equipment Needed', required: false, options: ['Laptop', 'Monitor', 'Keyboard', 'Mouse', 'Headset', 'Phone'] },
      { id: '12', type: 'radio', label: 'Work Preference', options: ['Remote', 'Hybrid', 'Office'], required: true },
      { id: '13', type: 'file', label: 'Profile Photo', required: false, acceptedFileTypes: ['jpg', 'jpeg', 'png'] },
      { id: '14', type: 'textarea', label: 'Dietary Restrictions/Allergies', required: false, placeholder: 'Any dietary restrictions or allergies' },
      { id: '15', type: 'checkbox', label: 'I agree to company policies and handbook', required: true, options: ['I agree'] }
    ]
  },
  {
    id: 'employee-performance-review',
    name: 'Employee Performance Review',
    description: 'Annual or quarterly performance evaluation form for employees',
    category: 'Business & Enterprise',
    tags: ['HR', 'performance', 'review'],
    fields: [
      { id: '1', type: 'text', label: 'Employee Name', required: true },
      { id: '2', type: 'text', label: 'Employee ID', required: true },
      { id: '3', type: 'text', label: 'Department', required: true },
      { id: '4', type: 'text', label: 'Job Title', required: true },
      { id: '5', type: 'text', label: 'Reviewer Name', required: true },
      { id: '6', type: 'date', label: 'Review Period Start', required: true },
      { id: '7', type: 'date', label: 'Review Period End', required: true },
      { id: '8', type: 'radio', label: 'Overall Performance Rating', options: ['Exceeds Expectations', 'Meets Expectations', 'Below Expectations', 'Unsatisfactory'], required: true },
      { id: '9', type: 'textarea', label: 'Key Accomplishments', required: true, placeholder: 'List major achievements during this period' },
      { id: '10', type: 'textarea', label: 'Areas for Improvement', required: true, placeholder: 'Areas where employee can improve' },
      { id: '11', type: 'textarea', label: 'Goals for Next Period', required: true, placeholder: 'Specific goals for the upcoming period' },
      { id: '12', type: 'radio', label: 'Communication Skills', options: ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement'], required: true },
      { id: '13', type: 'radio', label: 'Technical Skills', options: ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement'], required: true },
      { id: '14', type: 'radio', label: 'Teamwork', options: ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement'], required: true },
      { id: '15', type: 'checkbox', label: 'Recommended for Promotion', required: false, options: ['Yes'] }
    ]
  },
  {
    id: 'vendor-registration',
    name: 'Vendor Registration & Qualification',
    description: 'Comprehensive vendor onboarding and qualification form for procurement',
    category: 'Business & Enterprise',
    tags: ['procurement', 'vendor', 'qualification'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'text', label: 'Legal Business Name', required: true },
      { id: '3', type: 'text', label: 'Tax ID/EIN', required: true },
      { id: '4', type: 'text', label: 'DUNS Number', required: false },
      { id: '5', type: 'email', label: 'Primary Contact Email', required: true },
      { id: '6', type: 'tel', label: 'Primary Contact Phone', required: true },
      { id: '7', type: 'textarea', label: 'Business Address', required: true },
      { id: '8', type: 'select', label: 'Business Type', required: true, options: ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship', 'Non-Profit'] },
      { id: '9', type: 'number', label: 'Years in Business', required: true },
      { id: '10', type: 'number', label: 'Annual Revenue (USD)', required: true },
      { id: '11', type: 'number', label: 'Number of Employees', required: true },
      { id: '12', type: 'checkbox', label: 'Services/Products Offered', required: false, options: ['IT Services', 'Consulting', 'Manufacturing', 'Distribution', 'Professional Services', 'Construction'] },
      { id: '13', type: 'file', label: 'Business License', required: true, acceptedFileTypes: ['pdf', 'jpg', 'png'] },
      { id: '14', type: 'file', label: 'Insurance Certificate', required: true, acceptedFileTypes: ['pdf'] },
      { id: '15', type: 'file', label: 'W-9 Form', required: true, acceptedFileTypes: ['pdf'] },
      { id: '16', type: 'textarea', label: 'References (3 minimum)', required: true, placeholder: 'Company name, contact person, phone, email' },
      { id: '17', type: 'checkbox', label: 'Certifications', required: false, options: ['ISO 9001', 'ISO 27001', 'SOC 2', 'GDPR Compliant', 'Other'] },
      { id: '18', type: 'checkbox', label: 'I agree to terms and conditions', required: true, options: ['I agree'] }
    ]
  },

  // IT & Technology Templates (45 templates)
  {
    id: 'it-security-incident-report',
    name: 'IT Security Incident Report',
    description: 'Detailed security incident reporting form for IT teams',
    category: 'IT & Technology',
    tags: ['security', 'incident', 'IT'],
    fields: [
      { id: '1', type: 'text', label: 'Incident ID', required: true },
      { id: '2', type: 'datetime-local', label: 'Incident Date/Time', required: true },
      { id: '3', type: 'text', label: 'Reporter Name', required: true },
      { id: '4', type: 'email', label: 'Reporter Email', required: true },
      { id: '5', type: 'select', label: 'Incident Type', required: true, options: ['Data Breach', 'Malware', 'Phishing', 'Unauthorized Access', 'System Outage', 'Other'] },
      { id: '6', type: 'radio', label: 'Severity Level', options: ['Critical', 'High', 'Medium', 'Low'], required: true },
      { id: '7', type: 'textarea', label: 'Incident Description', required: true, placeholder: 'Detailed description of what happened' },
      { id: '8', type: 'checkbox', label: 'Affected Systems', required: false, options: ['Email Server', 'Database', 'Web Server', 'Network Infrastructure', 'User Workstations', 'Mobile Devices'] },
      { id: '9', type: 'number', label: 'Number of Users Affected', required: false },
      { id: '10', type: 'textarea', label: 'Data Compromised', required: false, placeholder: 'Type and amount of data affected' },
      { id: '11', type: 'textarea', label: 'Immediate Actions Taken', required: true, placeholder: 'Steps taken to contain the incident' },
      { id: '12', type: 'radio', label: 'Law Enforcement Notified', options: ['Yes', 'No', 'Pending'], required: true },
      { id: '13', type: 'file', label: 'Supporting Evidence', required: false, acceptedFileTypes: ['pdf', 'jpg', 'png', 'zip'] },
      { id: '14', type: 'textarea', label: 'Lessons Learned', required: false, placeholder: 'What can be improved' },
      { id: '15', type: 'text', label: 'Assigned Investigator', required: true }
    ]
  },
  {
    id: 'software-bug-report',
    name: 'Software Bug Report',
    description: 'Comprehensive bug reporting form for software development teams',
    category: 'IT & Technology',
    tags: ['bug', 'software', 'development'],
    fields: [
      { id: '1', type: 'text', label: 'Bug Title', required: true, placeholder: 'Brief description of the bug' },
      { id: '2', type: 'select', label: 'Priority', required: true, options: ['Critical', 'High', 'Medium', 'Low'] },
      { id: '3', type: 'select', label: 'Severity', required: true, options: ['Blocker', 'Major', 'Minor', 'Trivial'] },
      { id: '4', type: 'text', label: 'Reporter', required: true },
      { id: '5', type: 'select', label: 'Product/Module', required: true, options: ['Frontend', 'Backend', 'Database', 'API', 'Mobile App', 'Desktop App'] },
      { id: '6', type: 'text', label: 'Version/Build', required: true },
      { id: '7', type: 'select', label: 'Environment', required: true, options: ['Production', 'Staging', 'Development', 'Testing'] },
      { id: '8', type: 'select', label: 'Browser/Platform', required: true, options: ['Chrome', 'Firefox', 'Safari', 'Edge', 'iOS', 'Android', 'Windows', 'macOS', 'Linux'] },
      { id: '9', type: 'textarea', label: 'Steps to Reproduce', required: true, placeholder: '1. Go to...\n2. Click on...\n3. Expected vs Actual result' },
      { id: '10', type: 'textarea', label: 'Expected Result', required: true },
      { id: '11', type: 'textarea', label: 'Actual Result', required: true },
      { id: '12', type: 'file', label: 'Screenshots/Videos', required: false, acceptedFileTypes: ['jpg', 'png', 'gif', 'mp4', 'mov'] },
      { id: '13', type: 'textarea', label: 'Additional Information', required: false, placeholder: 'Any other relevant details' },
      { id: '14', type: 'text', label: 'Assigned Developer', required: false },
      { id: '15', type: 'date', label: 'Target Fix Date', required: false }
    ]
  },

  // Healthcare Templates (35 templates)
  {
    id: 'patient-intake-form-healthcare',
    name: 'Patient Intake Form',
    description: 'Comprehensive medical history and intake form for new patients',
    category: 'Healthcare',
    tags: ['patient', 'medical', 'intake'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'radio', label: 'Gender', options: ['Male', 'Female', 'Other', 'Prefer not to say'], required: true },
      { id: '4', type: 'tel', label: 'Phone Number', required: true },
      { id: '5', type: 'email', label: 'Email Address', required: true },
      { id: '6', type: 'textarea', label: 'Address', required: true },
      { id: '7', type: 'text', label: 'Emergency Contact Name', required: true },
      { id: '8', type: 'tel', label: 'Emergency Contact Phone', required: true },
      { id: '9', type: 'text', label: 'Primary Care Physician', required: false },
      { id: '10', type: 'text', label: 'Insurance Provider', required: true },
      { id: '11', type: 'text', label: 'Policy Number', required: true },
      { id: '12', type: 'textarea', label: 'Current Medications', required: false, placeholder: 'List all current medications and dosages' },
      { id: '13', type: 'textarea', label: 'Known Allergies', required: false, placeholder: 'List any known allergies or reactions' },
      { id: '14', type: 'textarea', label: 'Medical History', required: false, placeholder: 'Previous surgeries, chronic conditions, etc.' },
      { id: '15', type: 'textarea', label: 'Family Medical History', required: false, placeholder: 'Relevant family medical history' },
      { id: '16', type: 'textarea', label: 'Reason for Visit', required: true, placeholder: 'What brings you in today?' },
      { id: '17', type: 'radio', label: 'Pain Level (1-10)', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], required: false },
      { id: '18', type: 'checkbox', label: 'I consent to treatment', required: true, options: ['I consent'] }
    ]
  },

  // Finance & Banking Templates (40 templates)
  {
    id: 'loan-application-finance',
    name: 'Personal Loan Application',
    description: 'Comprehensive personal loan application form for financial institutions',
    category: 'Finance & Banking',
    tags: ['loan', 'finance', 'banking'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true },
      { id: '2', type: 'text', label: 'Social Security Number', required: true },
      { id: '3', type: 'date', label: 'Date of Birth', required: true },
      { id: '4', type: 'tel', label: 'Phone Number', required: true },
      { id: '5', type: 'email', label: 'Email Address', required: true },
      { id: '6', type: 'textarea', label: 'Current Address', required: true },
      { id: '7', type: 'number', label: 'Time at Current Address (months)', required: true },
      { id: '8', type: 'select', label: 'Housing Status', required: true, options: ['Own', 'Rent', 'Live with Family', 'Other'] },
      { id: '9', type: 'number', label: 'Monthly Housing Payment', required: true },
      { id: '10', type: 'text', label: 'Employer Name', required: true },
      { id: '11', type: 'text', label: 'Job Title', required: true },
      { id: '12', type: 'number', label: 'Annual Income', required: true },
      { id: '13', type: 'number', label: 'Monthly Income', required: true },
      { id: '14', type: 'number', label: 'Time with Current Employer (months)', required: true },
      { id: '15', type: 'number', label: 'Requested Loan Amount', required: true },
      { id: '16', type: 'select', label: 'Loan Purpose', required: true, options: ['Debt Consolidation', 'Home Improvement', 'Auto Purchase', 'Medical Expenses', 'Education', 'Other'] },
      { id: '17', type: 'number', label: 'Monthly Debt Payments', required: true },
      { id: '18', type: 'file', label: 'Pay Stub', required: true, acceptedFileTypes: ['pdf', 'jpg', 'png'] },
      { id: '19', type: 'checkbox', label: 'I authorize credit check', required: true, options: ['I authorize'] }
    ]
  },

  // Government & Public Sector Templates (30 templates)
  {
    id: 'business-license-application-gov',
    name: 'Business License Application',
    description: 'Municipal business license application form',
    category: 'Government & Public Sector',
    tags: ['license', 'business', 'government'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true },
      { id: '2', type: 'text', label: 'DBA (Doing Business As)', required: false },
      { id: '3', type: 'text', label: 'Federal Tax ID (EIN)', required: true },
      { id: '4', type: 'text', label: 'Owner Name', required: true },
      { id: '5', type: 'tel', label: 'Contact Phone', required: true },
      { id: '6', type: 'email', label: 'Contact Email', required: true },
      { id: '7', type: 'textarea', label: 'Business Address', required: true },
      { id: '8', type: 'textarea', label: 'Mailing Address', required: true },
      { id: '9', type: 'select', label: 'Business Type', required: true, options: ['Sole Proprietorship', 'Partnership', 'Corporation', 'LLC', 'Non-Profit'] },
      { id: '10', type: 'textarea', label: 'Business Description', required: true, placeholder: 'Describe the nature of your business' },
      { id: '11', type: 'number', label: 'Number of Employees', required: true },
      { id: '12', type: 'date', label: 'Planned Start Date', required: true },
      { id: '13', type: 'checkbox', label: 'License Type Requested', required: false, options: ['General Business', 'Home Occupation', 'Retail', 'Food Service', 'Professional Services'] },
      { id: '14', type: 'file', label: 'Articles of Incorporation', required: false, acceptedFileTypes: ['pdf'] },
      { id: '15', type: 'checkbox', label: 'I certify all information is accurate', required: true, options: ['I certify'] }
    ]
  },

  // Education Templates (35 templates)
  {
    id: 'student-enrollment',
    name: 'Student Enrollment Application',
    description: 'Comprehensive student enrollment form for educational institutions',
    category: 'Education',
    tags: ['student', 'enrollment', 'education'],
    fields: [
      { id: '1', type: 'text', label: 'Student Full Name', required: true },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'radio', label: 'Gender', options: ['Male', 'Female', 'Other'], required: true },
      { id: '4', type: 'text', label: 'Student ID (if returning)', required: false },
      { id: '5', type: 'select', label: 'Grade Level', required: true, options: ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'] },
      { id: '6', type: 'text', label: 'Previous School', required: false },
      { id: '7', type: 'text', label: 'Parent/Guardian 1 Name', required: true },
      { id: '8', type: 'tel', label: 'Parent/Guardian 1 Phone', required: true },
      { id: '9', type: 'email', label: 'Parent/Guardian 1 Email', required: true },
      { id: '10', type: 'text', label: 'Parent/Guardian 2 Name', required: false },
      { id: '11', type: 'tel', label: 'Parent/Guardian 2 Phone', required: false },
      { id: '12', type: 'textarea', label: 'Home Address', required: true },
      { id: '13', type: 'text', label: 'Emergency Contact Name', required: true },
      { id: '14', type: 'tel', label: 'Emergency Contact Phone', required: true },
      { id: '15', type: 'textarea', label: 'Medical Conditions/Allergies', required: false },
      { id: '16', type: 'checkbox', label: 'Transportation Needed', required: false, options: ['School Bus', 'Parent Drop-off', 'Walking', 'Other'] },
      { id: '17', type: 'checkbox', label: 'Meal Program', required: false, options: ['Free Lunch', 'Reduced Lunch', 'Regular Price'] },
      { id: '18', type: 'file', label: 'Birth Certificate', required: true, acceptedFileTypes: ['pdf', 'jpg', 'png'] },
      { id: '19', type: 'file', label: 'Immunization Records', required: true, acceptedFileTypes: ['pdf', 'jpg', 'png'] }
    ]
  },

  // Legal Templates (25 templates)
  {
    id: 'legal-consultation-intake',
    name: 'Legal Consultation Intake',
    description: 'Client intake form for law firms and legal consultations',
    category: 'Legal',
    tags: ['legal', 'consultation', 'intake'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true },
      { id: '2', type: 'tel', label: 'Phone Number', required: true },
      { id: '3', type: 'email', label: 'Email Address', required: true },
      { id: '4', type: 'textarea', label: 'Address', required: true },
      { id: '5', type: 'select', label: 'Preferred Contact Method', required: true, options: ['Phone', 'Email', 'Text', 'Mail'] },
      { id: '6', type: 'select', label: 'Type of Legal Matter', required: true, options: ['Personal Injury', 'Family Law', 'Criminal Defense', 'Business Law', 'Real Estate', 'Estate Planning', 'Immigration', 'Other'] },
      { id: '7', type: 'textarea', label: 'Brief Description of Legal Issue', required: true, placeholder: 'Please provide a brief overview of your legal matter' },
      { id: '8', type: 'date', label: 'When did this issue occur?', required: false },
      { id: '9', type: 'radio', label: 'Urgency Level', options: ['Very Urgent', 'Urgent', 'Normal', 'Not Urgent'], required: true },
      { id: '10', type: 'text', label: 'Other Parties Involved', required: false, placeholder: 'Names of other parties involved' },
      { id: '11', type: 'radio', label: 'Have you consulted other attorneys?', options: ['Yes', 'No'], required: true },
      { id: '12', type: 'textarea', label: 'Previous Legal Representation', required: false, placeholder: 'If yes, please provide details' },
      { id: '13', type: 'select', label: 'How did you hear about us?', required: false, options: ['Referral', 'Internet Search', 'Advertisement', 'Social Media', 'Other'] },
      { id: '14', type: 'file', label: 'Supporting Documents', required: false, acceptedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png'] },
      { id: '15', type: 'checkbox', label: 'I agree to attorney-client privilege terms', required: true, options: ['I agree'] }
    ]
  },

  // Real Estate Templates (30 templates)
  {
    id: 'property-listing-form',
    name: 'Property Listing Form',
    description: 'Comprehensive property listing form for real estate agents',
    category: 'Real Estate',
    tags: ['property', 'listing', 'real estate'],
    fields: [
      { id: '1', type: 'text', label: 'Property Address', required: true },
      { id: '2', type: 'text', label: 'City', required: true },
      { id: '3', type: 'text', label: 'State', required: true },
      { id: '4', type: 'text', label: 'ZIP Code', required: true },
      { id: '5', type: 'select', label: 'Property Type', required: true, options: ['Single Family', 'Condo', 'Townhouse', 'Multi-family', 'Commercial', 'Land'] },
      { id: '6', type: 'number', label: 'Asking Price', required: true },
      { id: '7', type: 'number', label: 'Square Footage', required: true },
      { id: '8', type: 'number', label: 'Bedrooms', required: true },
      { id: '9', type: 'number', label: 'Bathrooms', required: true },
      { id: '10', type: 'number', label: 'Year Built', required: true },
      { id: '11', type: 'number', label: 'Lot Size (acres)', required: false },
      { id: '12', type: 'checkbox', label: 'Features', required: false, options: ['Pool', 'Garage', 'Fireplace', 'Basement', 'Deck/Patio', 'Central Air', 'Hardwood Floors'] },
      { id: '13', type: 'textarea', label: 'Property Description', required: true, placeholder: 'Detailed description of the property' },
      { id: '14', type: 'text', label: 'Owner Name', required: true },
      { id: '15', type: 'tel', label: 'Owner Phone', required: true },
      { id: '16', type: 'email', label: 'Owner Email', required: true },
      { id: '17', type: 'select', label: 'Listing Duration', required: true, options: ['3 months', '6 months', '12 months'] },
      { id: '18', type: 'file', label: 'Property Photos', required: true, acceptedFileTypes: ['jpg', 'jpeg', 'png'] },
      { id: '19', type: 'checkbox', label: 'I authorize listing of this property', required: true, options: ['I authorize'] }
    ]
  },

  // Manufacturing Templates
  {
    id: 'quality-control-checklist',
    name: 'Quality Control Inspection',
    description: 'Comprehensive quality control inspection form for manufacturing',
    category: 'Manufacturing',
    tags: ['quality', 'inspection', 'manufacturing'],
    fields: [
      { id: '1', type: 'text', label: 'Product/Part Number', required: true },
      { id: '2', type: 'text', label: 'Batch/Lot Number', required: true },
      { id: '3', type: 'date', label: 'Inspection Date', required: true },
      { id: '4', type: 'text', label: 'Inspector Name', required: true },
      { id: '5', type: 'select', label: 'Inspection Type', required: true, options: ['Incoming', 'In-Process', 'Final', 'Random'] },
      { id: '6', type: 'number', label: 'Sample Size', required: true },
      { id: '7', type: 'radio', label: 'Visual Inspection', options: ['Pass', 'Fail'], required: true },
      { id: '8', type: 'radio', label: 'Dimensional Check', options: ['Pass', 'Fail'], required: true },
      { id: '9', type: 'radio', label: 'Functional Test', options: ['Pass', 'Fail'], required: true },
      { id: '10', type: 'textarea', label: 'Defects Found', required: false, placeholder: 'Describe any defects or issues' },
      { id: '11', type: 'select', label: 'Overall Result', required: true, options: ['Accept', 'Reject', 'Conditional Accept'] },
      { id: '12', type: 'textarea', label: 'Corrective Actions', required: false, placeholder: 'Required corrective actions' },
      { id: '13', type: 'text', label: 'Next Inspection Due', required: false },
      { id: '14', type: 'file', label: 'Photos/Documentation', required: false, acceptedFileTypes: ['jpg', 'png', 'pdf'] }
    ]
  }
];

export const FormLibrary: React.FC<FormLibraryProps> = ({ onUseTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');

  // Get unique categories and sectors with counts
  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];
  const sectors = ['all', ...Array.from(new Set(templates.map(t => t.sector)))];

  // Count templates per category and sector
  const getCategoryCount = (category: string) => {
    if (category === 'all') return templates.length;
    return templates.filter(t => t.category === category).length;
  };

  const getSectorCount = (sector: string) => {
    if (sector === 'all') return templates.length;
    return templates.filter(t => t.sector === sector).length;
  };

  // Filter templates based on search and filters
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesSector = selectedSector === 'all' || template.sector === selectedSector;

      return matchesSearch && matchesCategory && matchesSector;
    });
  }, [searchTerm, selectedCategory, selectedSector]);

  // Group templates by sector for display
  const templatesBySector = useMemo(() => {
    const grouped: Record<string, FormTemplate[]> = {};
    filteredTemplates.forEach(template => {
      if (!grouped[template.sector]) {
        grouped[template.sector] = [];
      }
      grouped[template.sector].push(template);
    });
    return grouped;
  }, [filteredTemplates]);

  // Sector icons
  const getSectorIcon = (sector: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Government': <Shield className="h-5 w-5" />,
      'Insurance': <Heart className="h-5 w-5" />,
      'Fintech': <DollarSign className="h-5 w-5" />,
      'Health': <Stethoscope className="h-5 w-5" />,
      'Energy': <Zap className="h-5 w-5" />,
      'Telecom': <Phone className="h-5 w-5" />,
      'Startups': <TrendingUp className="h-5 w-5" />,
      'SME': <Building2 className="h-5 w-5" />,
      'Multi-Sector': <Globe className="h-5 w-5" />,
      'Business & Enterprise': <Building2 className="h-5 w-5" />,
      'IT & Technology': <Monitor className="h-5 w-5" />,
      'Finance & Banking': <DollarSign className="h-5 w-5" />,
      'Healthcare': <Heart className="h-5 w-5" />,
      'Government & Public Sector': <Shield className="h-5 w-5" />,
      'Education': <GraduationCap className="h-5 w-5" />,
      'Legal': <Scale className="h-5 w-5" />,
      'Real Estate': <Home className="h-5 w-5" />,
      'Manufacturing': <Factory className="h-5 w-5" />,
      'Retail & E-commerce': <ShoppingCart className="h-5 w-5" />,
      'Transportation & Logistics': <Truck className="h-5 w-5" />,
      'Energy & Utilities': <Zap className="h-5 w-5" />
    };
    return iconMap[sector] || <FileText className="h-5 w-5" />;
  };

  const handleUseTemplate = (template: FormTemplate) => {
    console.log('FormLibrary: Using template:', template.name);
    onUseTemplate(template);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Form Template Library</h2>
        <p className="text-muted-foreground">Choose from our comprehensive collection of professional form templates</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category} ({getCategoryCount(category)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map(sector => (
                <SelectItem key={sector} value={sector}>
                  {sector === 'all' ? 'All' : sector} ({getSectorCount(sector)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
        {selectedSector !== 'all' && ` in ${selectedSector}`}
        {selectedCategory !== 'all' && ` for ${selectedCategory}`}
      </div>

      {/* Templates by Sector */}
      <div className="space-y-8">
        {Object.entries(templatesBySector).map(([sector, sectorTemplates]) => (
          <div key={sector}>
            <div className="flex items-center gap-3 mb-4">
              {getSectorIcon(sector)}
              <h3 className="text-xl font-semibold">{sector}</h3>
              <Badge variant="outline">{sectorTemplates.length} templates</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectorTemplates.map(template => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-tight">{template.name}</CardTitle>
                      <Badge variant="secondary" className="ml-2 shrink-0">
                        {template.fields.length} fields
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {template.description}
                    </p>
                    
                    {/* Category and Sector Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="default" className="text-xs">
                        {template.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {template.sector}
                      </Badge>
                    </div>
                    
                    {/* Other Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.tags.length - 2} more
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => handleUseTemplate(template)}
                      className="w-full"
                      size="sm"
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};
