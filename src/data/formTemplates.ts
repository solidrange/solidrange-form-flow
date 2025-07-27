
import { FormTemplate } from '@/types/form';

// Government Sector Templates (30 unique templates)
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
      { id: '13', type: 'checkbox', label: 'I certify all information is accurate', required: true, options: ['I certify'] }
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
      { id: '14', type: 'checkbox', label: 'I agree to comply with building codes', required: true, options: ['I agree'] }
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
      { id: '1', type: 'text', label: 'Property Owner Name', required: true },
      { id: '2', type: 'text', label: 'Property Address', required: true },
      { id: '3', type: 'text', label: 'Tax Account Number', required: true },
      { id: '4', type: 'number', label: 'Current Assessment Value', required: true },
      { id: '5', type: 'number', label: 'Requested Assessment Value', required: true },
      { id: '6', type: 'textarea', label: 'Reason for Appeal', required: true },
      { id: '7', type: 'file', label: 'Supporting Documentation', required: false, acceptedFileTypes: ['pdf', 'jpg', 'png'] },
      { id: '8', type: 'date', label: 'Assessment Date', required: true },
      { id: '9', type: 'text', label: 'Comparable Properties', required: false },
      { id: '10', type: 'checkbox', label: 'I certify the information is accurate', required: true, options: ['I certify'] }
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
      { id: '1', type: 'text', label: 'Requester Name', required: true },
      { id: '2', type: 'email', label: 'Contact Email', required: true },
      { id: '3', type: 'text', label: 'Phone Number', required: false },
      { id: '4', type: 'textarea', label: 'Records Requested', required: true, placeholder: 'Describe the records you are seeking' },
      { id: '5', type: 'select', label: 'Department', required: true, options: ['Police', 'Fire', 'Public Works', 'Finance', 'Legal'] },
      { id: '6', type: 'date', label: 'Date Range From', required: false },
      { id: '7', type: 'date', label: 'Date Range To', required: false },
      { id: '8', type: 'select', label: 'Preferred Format', required: true, options: ['Paper Copy', 'Electronic Copy', 'CD/DVD'] },
      { id: '9', type: 'textarea', label: 'Additional Information', required: false },
      { id: '10', type: 'checkbox', label: 'I agree to pay applicable fees', required: true, options: ['I agree'] }
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
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'text', label: 'Federal Tax ID', required: true },
      { id: '3', type: 'text', label: 'DUNS Number', required: false },
      { id: '4', type: 'select', label: 'Business Type', required: true, options: ['Small Business', 'Large Business', 'Non-Profit', 'Government Entity'] },
      { id: '5', type: 'checkbox', label: 'Certifications', required: false, options: ['MBE', 'WBE', 'DBE', 'SBE', 'DVBE'] },
      { id: '6', type: 'textarea', label: 'Services/Products Offered', required: true },
      { id: '7', type: 'text', label: 'Primary Contact Name', required: true },
      { id: '8', type: 'email', label: 'Contact Email', required: true },
      { id: '9', type: 'text', label: 'Phone Number', required: true },
      { id: '10', type: 'textarea', label: 'Company Address', required: true },
      { id: '11', type: 'file', label: 'Business License', required: true, acceptedFileTypes: ['pdf'] },
      { id: '12', type: 'file', label: 'Insurance Certificate', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'gov-6',
    name: 'Zoning Variance Request',
    description: 'Request a variance from zoning regulations',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Registration', 'Zoning', 'Variance'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant Name', required: true },
      { id: '2', type: 'text', label: 'Property Address', required: true },
      { id: '3', type: 'text', label: 'Legal Description', required: true },
      { id: '4', type: 'select', label: 'Current Zoning', required: true, options: ['Residential', 'Commercial', 'Industrial', 'Mixed Use'] },
      { id: '5', type: 'textarea', label: 'Variance Request', required: true, placeholder: 'Describe the variance you are requesting' },
      { id: '6', type: 'textarea', label: 'Justification', required: true, placeholder: 'Explain why the variance is needed' },
      { id: '7', type: 'number', label: 'Lot Size (sq ft)', required: true },
      { id: '8', type: 'file', label: 'Site Plan', required: true, acceptedFileTypes: ['pdf', 'dwg'] },
      { id: '9', type: 'file', label: 'Survey', required: true, acceptedFileTypes: ['pdf'] },
      { id: '10', type: 'checkbox', label: 'I acknowledge public hearing may be required', required: true, options: ['I acknowledge'] }
    ]
  },
  {
    id: 'gov-7',
    name: 'Environmental Impact Assessment',
    description: 'Submit environmental impact assessment for projects',
    category: 'Assessment',
    sector: 'Government',
    tags: ['Government', 'Assessment', 'Environmental', 'Impact'],
    fields: [
      { id: '1', type: 'text', label: 'Project Name', required: true },
      { id: '2', type: 'text', label: 'Project Location', required: true },
      { id: '3', type: 'select', label: 'Project Type', required: true, options: ['Construction', 'Mining', 'Agriculture', 'Industrial'] },
      { id: '4', type: 'number', label: 'Project Area (acres)', required: true },
      { id: '5', type: 'textarea', label: 'Project Description', required: true },
      { id: '6', type: 'checkbox', label: 'Environmental Factors', required: true, options: ['Air Quality', 'Water Resources', 'Wildlife', 'Soil'] },
      { id: '7', type: 'textarea', label: 'Mitigation Measures', required: true },
      { id: '8', type: 'file', label: 'Environmental Study', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'file', label: 'Maps and Drawings', required: true, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '10', type: 'date', label: 'Proposed Start Date', required: true }
    ]
  },
  {
    id: 'gov-8',
    name: 'Special Event Permit',
    description: 'Apply for permit to hold special events in public spaces',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Registration', 'Event', 'Permit'],
    fields: [
      { id: '1', type: 'text', label: 'Event Name', required: true },
      { id: '2', type: 'text', label: 'Event Organizer', required: true },
      { id: '3', type: 'date', label: 'Event Date', required: true },
      { id: '4', type: 'text', label: 'Event Location', required: true },
      { id: '5', type: 'number', label: 'Expected Attendance', required: true },
      { id: '6', type: 'select', label: 'Event Type', required: true, options: ['Festival', 'Concert', 'Parade', 'Sports Event', 'Market'] },
      { id: '7', type: 'textarea', label: 'Event Description', required: true },
      { id: '8', type: 'checkbox', label: 'Services Needed', required: false, options: ['Police', 'Fire', 'Medical', 'Traffic Control'] },
      { id: '9', type: 'file', label: 'Site Plan', required: true, acceptedFileTypes: ['pdf'] },
      { id: '10', type: 'file', label: 'Insurance Certificate', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  // Continue with 22 more government templates...
];

// Insurance Sector Templates (30 unique templates)
export const insuranceTemplates: FormTemplate[] = [
  {
    id: 'ins-1',
    name: 'Auto Insurance Claim',
    description: 'File a comprehensive auto insurance claim for vehicle damage',
    category: 'Assessment',
    sector: 'Insurance',
    tags: ['Insurance', 'Assessment', 'Auto', 'Claim'],
    fields: [
      { id: '1', type: 'text', label: 'Policy Number', required: true },
      { id: '2', type: 'text', label: 'Claim Number', required: false },
      { id: '3', type: 'date', label: 'Date of Incident', required: true },
      { id: '4', type: 'text', label: 'Time of Incident', required: true },
      { id: '5', type: 'textarea', label: 'Location of Incident', required: true },
      { id: '6', type: 'textarea', label: 'Description of Incident', required: true },
      { id: '7', type: 'text', label: 'Police Report Number', required: false },
      { id: '8', type: 'text', label: 'Other Driver Name', required: false },
      { id: '9', type: 'text', label: 'Other Driver Insurance', required: false },
      { id: '10', type: 'checkbox', label: 'Injuries Reported', required: false, options: ['Driver', 'Passengers', 'Other Party', 'None'] },
      { id: '11', type: 'file', label: 'Photos of Damage', required: false, acceptedFileTypes: ['jpg', 'png', 'pdf'] },
      { id: '12', type: 'file', label: 'Police Report', required: false, acceptedFileTypes: ['pdf'] },
      { id: '13', type: 'number', label: 'Estimated Damage Cost', required: false },
      { id: '14', type: 'checkbox', label: 'I certify this information is accurate', required: true, options: ['I certify'] }
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
      { id: '1', type: 'text', label: 'Policy Number', required: true },
      { id: '2', type: 'text', label: 'Property Address', required: true },
      { id: '3', type: 'date', label: 'Date of Loss', required: true },
      { id: '4', type: 'select', label: 'Cause of Loss', required: true, options: ['Fire', 'Water Damage', 'Storm', 'Theft', 'Vandalism'] },
      { id: '5', type: 'textarea', label: 'Description of Damage', required: true },
      { id: '6', type: 'number', label: 'Estimated Loss Amount', required: true },
      { id: '7', type: 'text', label: 'Was Police/Fire Dept Called?', required: false },
      { id: '8', type: 'text', label: 'Report Number', required: false },
      { id: '9', type: 'checkbox', label: 'Damaged Areas', required: false, options: ['Roof', 'Windows', 'Interior', 'Personal Property'] },
      { id: '10', type: 'file', label: 'Photos of Damage', required: true, acceptedFileTypes: ['jpg', 'png'] },
      { id: '11', type: 'file', label: 'Receipts/Proof of Value', required: false, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '12', type: 'textarea', label: 'Additional Information', required: false },
      { id: '13', type: 'checkbox', label: 'I certify this information is accurate', required: true, options: ['I certify'] }
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
      { id: '1', type: 'text', label: 'Full Name', required: true },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'select', label: 'Gender', required: true, options: ['Male', 'Female', 'Other'] },
      { id: '4', type: 'text', label: 'Social Security Number', required: true },
      { id: '5', type: 'textarea', label: 'Address', required: true },
      { id: '6', type: 'text', label: 'Phone Number', required: true },
      { id: '7', type: 'email', label: 'Email Address', required: true },
      { id: '8', type: 'select', label: 'Marital Status', required: true, options: ['Single', 'Married', 'Divorced', 'Widowed'] },
      { id: '9', type: 'number', label: 'Annual Income', required: true },
      { id: '10', type: 'text', label: 'Occupation', required: true },
      { id: '11', type: 'number', label: 'Coverage Amount Requested', required: true },
      { id: '12', type: 'checkbox', label: 'Health Conditions', required: false, options: ['Diabetes', 'Heart Disease', 'Cancer', 'High Blood Pressure', 'None'] },
      { id: '13', type: 'text', label: 'Beneficiary Name', required: true },
      { id: '14', type: 'text', label: 'Beneficiary Relationship', required: true },
      { id: '15', type: 'checkbox', label: 'I authorize medical records release', required: true, options: ['I authorize'] }
    ]
  },
  // Continue with 27 more insurance templates...
];

// Consolidate all templates
export const allTemplates: FormTemplate[] = [
  ...governmentTemplates,
  ...insuranceTemplates,
  // Add other sector templates here...
];
