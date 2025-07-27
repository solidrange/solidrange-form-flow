
import { FormTemplate } from '@/types/form';

// Government Sector Templates
export const governmentTemplates: FormTemplate[] = [
  {
    id: 'gov-1',
    name: 'Business License Application',
    description: 'Apply for a new business license with comprehensive documentation',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Registration', 'Business', 'License'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Enter business name' },
      { id: '2', type: 'select', label: 'Business Type', required: true, options: ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship'] },
      { id: '3', type: 'text', label: 'Owner Full Name', required: true, placeholder: 'Full legal name' },
      { id: '4', type: 'email', label: 'Contact Email', required: true, placeholder: 'business@email.com' },
      { id: '5', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '6', type: 'textarea', label: 'Business Address', required: true, placeholder: 'Complete business address' },
      { id: '7', type: 'number', label: 'Expected Annual Revenue', required: true, placeholder: '0' },
      { id: '8', type: 'number', label: 'Number of Employees', required: true, placeholder: '0' },
      { id: '9', type: 'date', label: 'Proposed Start Date', required: true },
      { id: '10', type: 'textarea', label: 'Business Description', required: true, placeholder: 'Describe your business activities' },
      { id: '11', type: 'checkbox', label: 'License Type', required: true, options: ['General Business', 'Home Occupation', 'Retail', 'Food Service'] },
      { id: '12', type: 'file', label: 'Articles of Incorporation', required: true, acceptedFileTypes: ['pdf'] },
      { id: '13', type: 'checkbox', label: 'Certifications', required: true, options: ['I certify all information is accurate'] }
    ]
  },
  {
    id: 'gov-2',
    name: 'Building Permit Application',
    description: 'Submit application for construction and building permits',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Registration', 'Building', 'Construction'],
    fields: [
      { id: '1', type: 'text', label: 'Property Address', required: true, placeholder: 'Complete property address' },
      { id: '2', type: 'text', label: 'Parcel Number', required: true, placeholder: 'Tax parcel number' },
      { id: '3', type: 'text', label: 'Property Owner Name', required: true, placeholder: 'Legal property owner' },
      { id: '4', type: 'text', label: 'Contractor Name', required: false, placeholder: 'Licensed contractor' },
      { id: '5', type: 'text', label: 'Contractor License Number', required: false, placeholder: 'State license number' },
      { id: '6', type: 'select', label: 'Project Type', required: true, options: ['New Construction', 'Addition', 'Renovation', 'Demolition'] },
      { id: '7', type: 'textarea', label: 'Project Description', required: true, placeholder: 'Detailed description of work' },
      { id: '8', type: 'number', label: 'Estimated Project Cost', required: true, placeholder: '0' },
      { id: '9', type: 'number', label: 'Square Footage', required: true, placeholder: '0' },
      { id: '10', type: 'date', label: 'Proposed Start Date', required: true },
      { id: '11', type: 'date', label: 'Expected Completion Date', required: true },
      { id: '12', type: 'file', label: 'Building Plans', required: true, acceptedFileTypes: ['pdf', 'dwg'] },
      { id: '13', type: 'file', label: 'Site Plan', required: true, acceptedFileTypes: ['pdf', 'dwg'] },
      { id: '14', type: 'checkbox', label: 'Compliance Agreement', required: true, options: ['I agree to comply with building codes'] }
    ]
  },
  {
    id: 'gov-3',
    name: 'Tax Assessment Appeal',
    description: 'Appeal property tax assessment decisions',
    category: 'Assessment',
    sector: 'Government',
    tags: ['Government', 'Assessment', 'Tax', 'Property'],
    fields: [
      { id: '1', type: 'text', label: 'Property Owner Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'text', label: 'Property Address', required: true, placeholder: 'Complete property address' },
      { id: '3', type: 'text', label: 'Tax Account Number', required: true, placeholder: 'Account number' },
      { id: '4', type: 'number', label: 'Current Assessment Value', required: true, placeholder: '0' },
      { id: '5', type: 'number', label: 'Requested Assessment Value', required: true, placeholder: '0' },
      { id: '6', type: 'textarea', label: 'Reason for Appeal', required: true, placeholder: 'Explain why you believe the assessment is incorrect' },
      { id: '7', type: 'file', label: 'Supporting Documentation', required: false, acceptedFileTypes: ['pdf', 'jpg', 'png'] },
      { id: '8', type: 'date', label: 'Assessment Date', required: true },
      { id: '9', type: 'textarea', label: 'Comparable Properties', required: false, placeholder: 'List comparable properties with their values' },
      { id: '10', type: 'checkbox', label: 'Certification', required: true, options: ['I certify the information is accurate'] }
    ]
  },
  {
    id: 'gov-4',
    name: 'Public Records Request',
    description: 'Request access to public documents and records',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Registration', 'Records', 'FOIA'],
    fields: [
      { id: '1', type: 'text', label: 'Requester Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'email', label: 'Contact Email', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: false, placeholder: '(555) 123-4567' },
      { id: '4', type: 'textarea', label: 'Records Requested', required: true, placeholder: 'Describe the records you are seeking' },
      { id: '5', type: 'select', label: 'Department', required: true, options: ['Police', 'Fire', 'Public Works', 'Finance', 'Legal'] },
      { id: '6', type: 'date', label: 'Date Range From', required: false },
      { id: '7', type: 'date', label: 'Date Range To', required: false },
      { id: '8', type: 'radio', label: 'Preferred Format', required: true, options: ['Paper Copy', 'Electronic Copy', 'CD/DVD'] },
      { id: '9', type: 'textarea', label: 'Additional Information', required: false, placeholder: 'Any additional details' },
      { id: '10', type: 'checkbox', label: 'Fee Agreement', required: true, options: ['I agree to pay applicable fees'] }
    ]
  },
  {
    id: 'gov-5',
    name: 'Vendor Registration',
    description: 'Register as a government vendor for procurement opportunities',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Registration', 'Vendor', 'Procurement'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Legal company name' },
      { id: '2', type: 'text', label: 'Federal Tax ID', required: true, placeholder: 'XX-XXXXXXX' },
      { id: '3', type: 'text', label: 'DUNS Number', required: false, placeholder: 'DUNS number if available' },
      { id: '4', type: 'select', label: 'Business Type', required: true, options: ['Small Business', 'Large Business', 'Non-Profit', 'Government Entity'] },
      { id: '5', type: 'checkbox', label: 'Certifications', required: false, options: ['MBE', 'WBE', 'DBE', 'SBE', 'DVBE'] },
      { id: '6', type: 'textarea', label: 'Services/Products Offered', required: true, placeholder: 'Describe your services and products' },
      { id: '7', type: 'text', label: 'Primary Contact Name', required: true, placeholder: 'Contact person name' },
      { id: '8', type: 'email', label: 'Contact Email', required: true, placeholder: 'contact@company.com' },
      { id: '9', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '10', type: 'textarea', label: 'Company Address', required: true, placeholder: 'Complete business address' },
      { id: '11', type: 'file', label: 'Business License', required: true, acceptedFileTypes: ['pdf'] },
      { id: '12', type: 'file', label: 'Insurance Certificate', required: true, acceptedFileTypes: ['pdf'] }
    ]
  }
];

// Insurance Sector Templates
export const insuranceTemplates: FormTemplate[] = [
  {
    id: 'ins-1',
    name: 'Auto Insurance Claim',
    description: 'File a comprehensive auto insurance claim for vehicle damage',
    category: 'Assessment',
    sector: 'Insurance',
    tags: ['Insurance', 'Assessment', 'Auto', 'Claim'],
    fields: [
      { id: '1', type: 'text', label: 'Policy Number', required: true, placeholder: 'Policy number' },
      { id: '2', type: 'text', label: 'Claim Number', required: false, placeholder: 'Claim number (if available)' },
      { id: '3', type: 'date', label: 'Date of Incident', required: true },
      { id: '4', type: 'text', label: 'Time of Incident', required: true, placeholder: 'HH:MM AM/PM' },
      { id: '5', type: 'textarea', label: 'Location of Incident', required: true, placeholder: 'Exact location where incident occurred' },
      { id: '6', type: 'textarea', label: 'Description of Incident', required: true, placeholder: 'Detailed description of what happened' },
      { id: '7', type: 'text', label: 'Police Report Number', required: false, placeholder: 'Report number if police were called' },
      { id: '8', type: 'text', label: 'Other Driver Name', required: false, placeholder: 'Name of other driver involved' },
      { id: '9', type: 'text', label: 'Other Driver Insurance', required: false, placeholder: 'Other driver\'s insurance company' },
      { id: '10', type: 'checkbox', label: 'Injuries Reported', required: false, options: ['Driver', 'Passengers', 'Other Party', 'None'] },
      { id: '11', type: 'file', label: 'Photos of Damage', required: false, acceptedFileTypes: ['jpg', 'png', 'pdf'] },
      { id: '12', type: 'file', label: 'Police Report', required: false, acceptedFileTypes: ['pdf'] },
      { id: '13', type: 'number', label: 'Estimated Damage Cost', required: false, placeholder: '0' },
      { id: '14', type: 'checkbox', label: 'Certification', required: true, options: ['I certify this information is accurate'] }
    ]
  },
  {
    id: 'ins-2',
    name: 'Property Insurance Claim',
    description: 'File a claim for property damage or loss',
    category: 'Assessment',
    sector: 'Insurance',
    tags: ['Insurance', 'Assessment', 'Property', 'Claim'],
    fields: [
      { id: '1', type: 'text', label: 'Policy Number', required: true, placeholder: 'Policy number' },
      { id: '2', type: 'text', label: 'Property Address', required: true, placeholder: 'Complete property address' },
      { id: '3', type: 'date', label: 'Date of Loss', required: true },
      { id: '4', type: 'select', label: 'Cause of Loss', required: true, options: ['Fire', 'Water Damage', 'Storm', 'Theft', 'Vandalism'] },
      { id: '5', type: 'textarea', label: 'Description of Damage', required: true, placeholder: 'Detailed description of damage' },
      { id: '6', type: 'number', label: 'Estimated Loss Amount', required: true, placeholder: '0' },
      { id: '7', type: 'radio', label: 'Emergency Services Called', required: false, options: ['Police', 'Fire Department', 'Both', 'None'] },
      { id: '8', type: 'text', label: 'Report Number', required: false, placeholder: 'Official report number' },
      { id: '9', type: 'checkbox', label: 'Damaged Areas', required: false, options: ['Roof', 'Windows', 'Interior', 'Personal Property'] },
      { id: '10', type: 'file', label: 'Photos of Damage', required: true, acceptedFileTypes: ['jpg', 'png'] },
      { id: '11', type: 'file', label: 'Receipts/Proof of Value', required: false, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '12', type: 'textarea', label: 'Additional Information', required: false, placeholder: 'Any additional relevant information' },
      { id: '13', type: 'checkbox', label: 'Certification', required: true, options: ['I certify this information is accurate'] }
    ]
  },
  {
    id: 'ins-3',
    name: 'Life Insurance Application',
    description: 'Apply for life insurance coverage',
    category: 'Registration',
    sector: 'Insurance',
    tags: ['Insurance', 'Registration', 'Life Insurance', 'Application'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'radio', label: 'Gender', required: true, options: ['Male', 'Female', 'Other'] },
      { id: '4', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '5', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete mailing address' },
      { id: '6', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '7', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '8', type: 'select', label: 'Marital Status', required: true, options: ['Single', 'Married', 'Divorced', 'Widowed'] },
      { id: '9', type: 'number', label: 'Annual Income', required: true, placeholder: '0' },
      { id: '10', type: 'text', label: 'Occupation', required: true, placeholder: 'Your current occupation' },
      { id: '11', type: 'number', label: 'Coverage Amount Requested', required: true, placeholder: '0' },
      { id: '12', type: 'checkbox', label: 'Health Conditions', required: false, options: ['Diabetes', 'Heart Disease', 'Cancer', 'High Blood Pressure', 'None'] },
      { id: '13', type: 'text', label: 'Beneficiary Name', required: true, placeholder: 'Primary beneficiary name' },
      { id: '14', type: 'text', label: 'Beneficiary Relationship', required: true, placeholder: 'Relationship to beneficiary' },
      { id: '15', type: 'checkbox', label: 'Authorization', required: true, options: ['I authorize medical records release'] }
    ]
  },
  {
    id: 'ins-4',
    name: 'Health Insurance Enrollment',
    description: 'Enroll in health insurance coverage',
    category: 'Registration',
    sector: 'Insurance',
    tags: ['Insurance', 'Registration', 'Health', 'Enrollment'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '4', type: 'select', label: 'Plan Type', required: true, options: ['HMO', 'PPO', 'EPO', 'POS'] },
      { id: '5', type: 'radio', label: 'Coverage Level', required: true, options: ['Individual', 'Family', 'Employee + Spouse', 'Employee + Children'] },
      { id: '6', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete mailing address' },
      { id: '7', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '8', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '9', type: 'text', label: 'Employer Name', required: false, placeholder: 'Current employer' },
      { id: '10', type: 'checkbox', label: 'Pre-existing Conditions', required: false, options: ['Diabetes', 'Heart Disease', 'Asthma', 'Cancer', 'None'] },
      { id: '11', type: 'file', label: 'Income Verification', required: false, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '12', type: 'checkbox', label: 'Terms Agreement', required: true, options: ['I agree to the terms and conditions'] }
    ]
  },
  {
    id: 'ins-5',
    name: 'Workers Compensation Claim',
    description: 'File a workers compensation claim for workplace injury',
    category: 'Assessment',
    sector: 'Insurance',
    tags: ['Insurance', 'Assessment', 'Workers Comp', 'Claim'],
    fields: [
      { id: '1', type: 'text', label: 'Employee Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'text', label: 'Employee ID', required: true, placeholder: 'Employee identification number' },
      { id: '3', type: 'date', label: 'Date of Injury', required: true },
      { id: '4', type: 'text', label: 'Time of Injury', required: true, placeholder: 'HH:MM AM/PM' },
      { id: '5', type: 'textarea', label: 'Location of Injury', required: true, placeholder: 'Where did the injury occur?' },
      { id: '6', type: 'textarea', label: 'Description of Injury', required: true, placeholder: 'How did the injury happen?' },
      { id: '7', type: 'select', label: 'Body Part Injured', required: true, options: ['Head', 'Neck', 'Back', 'Arms', 'Legs', 'Multiple'] },
      { id: '8', type: 'radio', label: 'Medical Treatment Required', required: true, options: ['Emergency Room', 'Doctor Visit', 'First Aid Only', 'None'] },
      { id: '9', type: 'text', label: 'Supervisor Name', required: true, placeholder: 'Name of immediate supervisor' },
      { id: '10', type: 'date', label: 'Date Reported to Supervisor', required: true },
      { id: '11', type: 'checkbox', label: 'Witnesses', required: false, options: ['Co-worker witnessed', 'Supervisor witnessed', 'Customer witnessed', 'No witnesses'] },
      { id: '12', type: 'file', label: 'Medical Records', required: false, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '13', type: 'checkbox', label: 'Certification', required: true, options: ['I certify this information is accurate'] }
    ]
  }
];

// Fintech Sector Templates
export const fintechTemplates: FormTemplate[] = [
  {
    id: 'fin-1',
    name: 'KYC Customer Verification',
    description: 'Know Your Customer verification for financial services',
    category: 'Compliance',
    sector: 'Fintech',
    tags: ['Fintech', 'Compliance', 'KYC', 'Verification'],
    fields: [
      { id: '1', type: 'text', label: 'Full Legal Name', required: true, placeholder: 'As shown on government ID' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '4', type: 'select', label: 'ID Type', required: true, options: ['Drivers License', 'Passport', 'State ID', 'Military ID'] },
      { id: '5', type: 'text', label: 'ID Number', required: true, placeholder: 'ID number' },
      { id: '6', type: 'textarea', label: 'Residential Address', required: true, placeholder: 'Current home address' },
      { id: '7', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '8', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '9', type: 'text', label: 'Occupation', required: true, placeholder: 'Current occupation' },
      { id: '10', type: 'text', label: 'Employer Name', required: true, placeholder: 'Current employer' },
      { id: '11', type: 'number', label: 'Annual Income', required: true, placeholder: '0' },
      { id: '12', type: 'select', label: 'Source of Funds', required: true, options: ['Salary', 'Business Income', 'Investment', 'Inheritance', 'Other'] },
      { id: '13', type: 'file', label: 'Government ID Front', required: true, acceptedFileTypes: ['jpg', 'png', 'pdf'] },
      { id: '14', type: 'file', label: 'Government ID Back', required: true, acceptedFileTypes: ['jpg', 'png', 'pdf'] },
      { id: '15', type: 'file', label: 'Proof of Address', required: true, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '16', type: 'checkbox', label: 'Declarations', required: true, options: ['I am not a politically exposed person', 'I certify all information is accurate'] }
    ]
  },
  {
    id: 'fin-2',
    name: 'Loan Application',
    description: 'Apply for personal or business loan',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Registration', 'Loan', 'Credit'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'select', label: 'Loan Type', required: true, options: ['Personal Loan', 'Business Loan', 'Auto Loan', 'Mortgage'] },
      { id: '3', type: 'number', label: 'Loan Amount Requested', required: true, placeholder: '0' },
      { id: '4', type: 'select', label: 'Loan Purpose', required: true, options: ['Debt Consolidation', 'Home Improvement', 'Business Expansion', 'Vehicle Purchase'] },
      { id: '5', type: 'number', label: 'Annual Income', required: true, placeholder: '0' },
      { id: '6', type: 'select', label: 'Employment Status', required: true, options: ['Full-time', 'Part-time', 'Self-employed', 'Unemployed'] },
      { id: '7', type: 'text', label: 'Employer Name', required: true, placeholder: 'Current employer' },
      { id: '8', type: 'number', label: 'Monthly Expenses', required: true, placeholder: '0' },
      { id: '9', type: 'select', label: 'Credit Score Range', required: true, options: ['Excellent (750+)', 'Good (700-749)', 'Fair (650-699)', 'Poor (Below 650)'] },
      { id: '10', type: 'radio', label: 'Collateral Available', required: true, options: ['Yes', 'No'] },
      { id: '11', type: 'file', label: 'Income Verification', required: true, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '12', type: 'file', label: 'Bank Statements', required: true, acceptedFileTypes: ['pdf'] },
      { id: '13', type: 'checkbox', label: 'Agreements', required: true, options: ['I authorize credit check', 'I agree to loan terms'] }
    ]
  }
];

// Health Sector Templates
export const healthTemplates: FormTemplate[] = [
  {
    id: 'health-1',
    name: 'Patient Registration',
    description: 'Register new patient for healthcare services',
    category: 'Registration',
    sector: 'Health',
    tags: ['Health', 'Registration', 'Patient', 'Medical'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'radio', label: 'Gender', required: true, options: ['Male', 'Female', 'Other'] },
      { id: '4', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '5', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete mailing address' },
      { id: '6', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '7', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '8', type: 'text', label: 'Emergency Contact Name', required: true, placeholder: 'Emergency contact name' },
      { id: '9', type: 'text', label: 'Emergency Contact Phone', required: true, placeholder: '(555) 123-4567' },
      { id: '10', type: 'text', label: 'Insurance Provider', required: false, placeholder: 'Insurance company name' },
      { id: '11', type: 'text', label: 'Insurance Policy Number', required: false, placeholder: 'Policy number' },
      { id: '12', type: 'text', label: 'Primary Care Physician', required: false, placeholder: 'Current PCP name' },
      { id: '13', type: 'checkbox', label: 'Medical History', required: false, options: ['Diabetes', 'Heart Disease', 'High Blood Pressure', 'Allergies', 'None'] },
      { id: '14', type: 'textarea', label: 'Current Medications', required: false, placeholder: 'List current medications' },
      { id: '15', type: 'checkbox', label: 'Consent', required: true, options: ['I consent to treatment', 'I authorize insurance billing'] }
    ]
  },
  {
    id: 'health-2',
    name: 'Medical History Assessment',
    description: 'Comprehensive medical history evaluation',
    category: 'Assessment',
    sector: 'Health',
    tags: ['Health', 'Assessment', 'Medical', 'History'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'textarea', label: 'Chief Complaint', required: true, placeholder: 'Primary reason for visit' },
      { id: '4', type: 'textarea', label: 'History of Present Illness', required: true, placeholder: 'Description of current symptoms' },
      { id: '5', type: 'checkbox', label: 'Past Medical History', required: false, options: ['Hypertension', 'Diabetes', 'Heart Disease', 'Cancer', 'Stroke', 'None'] },
      { id: '6', type: 'checkbox', label: 'Surgical History', required: false, options: ['Appendectomy', 'Gallbladder', 'Heart Surgery', 'Orthopedic', 'Other', 'None'] },
      { id: '7', type: 'textarea', label: 'Current Medications', required: false, placeholder: 'List all current medications' },
      { id: '8', type: 'textarea', label: 'Allergies', required: false, placeholder: 'List all known allergies' },
      { id: '9', type: 'checkbox', label: 'Family History', required: false, options: ['Heart Disease', 'Cancer', 'Diabetes', 'Stroke', 'Mental Health', 'None'] },
      { id: '10', type: 'checkbox', label: 'Social History', required: false, options: ['Smoking', 'Alcohol Use', 'Drug Use', 'Exercise Regularly', 'None'] },
      { id: '11', type: 'rating', label: 'Pain Level (1-10)', required: false },
      { id: '12', type: 'file', label: 'Previous Medical Records', required: false, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '13', type: 'checkbox', label: 'Acknowledgment', required: true, options: ['I have provided accurate medical history'] }
    ]
  }
];

// Consolidate all templates
export const allTemplates: FormTemplate[] = [
  ...governmentTemplates,
  ...insuranceTemplates,
  ...fintechTemplates,
  ...healthTemplates
];
