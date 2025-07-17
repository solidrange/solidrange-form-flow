
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
  Mountain
} from 'lucide-react';

interface FormLibraryProps {
  onUseTemplate: (template: FormTemplate) => void;
}

// Comprehensive template library with detailed fields for all sectors
const templates: FormTemplate[] = [
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
    id: 'patient-intake-form',
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
    id: 'loan-application',
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
    id: 'business-license-application',
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique categories and tags
  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))];
  const allTags = Array.from(new Set(templates.flatMap(t => t.tags)));

  // Filter templates based on search and filters
  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => template.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchTerm, selectedCategory, selectedTags]);

  // Group templates by category for display
  const templatesByCategory = useMemo(() => {
    const grouped = filteredTemplates.reduce((acc, template) => {
      if (!acc[template.category]) {
        acc[template.category] = [];
      }
      acc[template.category].push(template);
      return acc;
    }, {} as Record<string, FormTemplate[]>);
    return grouped;
  }, [filteredTemplates]);

  // Category icons
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactNode> = {
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
    return iconMap[category] || <FileText className="h-5 w-5" />;
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
            <SelectTrigger className="w-64">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 10).map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => {
                setSelectedTags(prev => 
                  prev.includes(tag) 
                    ? prev.filter(t => t !== tag)
                    : [...prev, tag]
                );
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
        {selectedCategory !== 'all' && ` in ${selectedCategory}`}
      </div>

      {/* Templates by Category */}
      <div className="space-y-8">
        {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
          <div key={category}>
            <div className="flex items-center gap-3 mb-4">
              {getCategoryIcon(category)}
              <h3 className="text-xl font-semibold">{category}</h3>
              <Badge variant="outline">{categoryTemplates.length} templates</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTemplates.map(template => (
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
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {template.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button 
                      onClick={() => handleUseTemplate(template)}
                      className="w-full"
                      size="sm"
                    >
                      Use This Template
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
