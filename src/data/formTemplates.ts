
import { FormTemplate } from '@/types/form';

// Government Sector Templates - 20 specific templates for government entities
export const governmentTemplates: FormTemplate[] = [
  {
    id: 'gov-1',
    name: 'Business License Application',
    description: 'Apply for municipal business license with comprehensive documentation',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'License', 'Business', 'Municipal'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Legal business name' },
      { id: '2', type: 'select', label: 'Business Type', required: true, options: ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship'] },
      { id: '3', type: 'text', label: 'Federal EIN', required: true, placeholder: 'XX-XXXXXXX' },
      { id: '4', type: 'textarea', label: 'Business Address', required: true, placeholder: 'Physical business location' },
      { id: '5', type: 'text', label: 'Owner Name', required: true, placeholder: 'Primary owner full name' },
      { id: '6', type: 'email', label: 'Contact Email', required: true, placeholder: 'business@email.com' },
      { id: '7', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '8', type: 'select', label: 'Industry Type', required: true, options: ['Retail', 'Service', 'Manufacturing', 'Professional', 'Food Service'] },
      { id: '9', type: 'number', label: 'Expected Employees', required: true, placeholder: '0' },
      { id: '10', type: 'date', label: 'Proposed Start Date', required: true },
      { id: '11', type: 'file', label: 'Articles of Incorporation', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'gov-2',
    name: 'Building Permit Application',
    description: 'Apply for construction permits and building approvals',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Construction', 'Permit', 'Building'],
    fields: [
      { id: '1', type: 'text', label: 'Property Address', required: true, placeholder: 'Complete property address' },
      { id: '2', type: 'text', label: 'Parcel Number', required: true, placeholder: 'Tax parcel number' },
      { id: '3', type: 'text', label: 'Property Owner', required: true, placeholder: 'Legal property owner' },
      { id: '4', type: 'text', label: 'Contractor Name', required: true, placeholder: 'Licensed contractor' },
      { id: '5', type: 'text', label: 'Contractor License', required: true, placeholder: 'State license number' },
      { id: '6', type: 'select', label: 'Project Type', required: true, options: ['New Construction', 'Addition', 'Renovation', 'Demolition'] },
      { id: '7', type: 'textarea', label: 'Project Description', required: true, placeholder: 'Detailed work description' },
      { id: '8', type: 'number', label: 'Project Value', required: true, placeholder: 'Estimated cost in USD' },
      { id: '9', type: 'number', label: 'Square Footage', required: true, placeholder: 'Total square feet' },
      { id: '10', type: 'file', label: 'Building Plans', required: true, acceptedFileTypes: ['pdf', 'dwg'] }
    ]
  },
  {
    id: 'gov-3',
    name: 'Public Records Request (FOIA)',
    description: 'Freedom of Information Act request for public documents',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'FOIA', 'Records', 'Transparency'],
    fields: [
      { id: '1', type: 'text', label: 'Requester Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'email', label: 'Contact Email', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: false, placeholder: '(555) 123-4567' },
      { id: '4', type: 'textarea', label: 'Records Description', required: true, placeholder: 'Describe specific records requested' },
      { id: '5', type: 'select', label: 'Department', required: true, options: ['Police', 'Fire', 'Public Works', 'Finance', 'Mayor Office', 'Planning'] },
      { id: '6', type: 'date', label: 'Date Range From', required: false },
      { id: '7', type: 'date', label: 'Date Range To', required: false },
      { id: '8', type: 'radio', label: 'Format Preference', required: true, options: ['Electronic Copy', 'Paper Copy', 'CD/DVD'] },
      { id: '9', type: 'checkbox', label: 'Fee Agreement', required: true, options: ['I agree to pay applicable fees'] }
    ]
  },
  {
    id: 'gov-4',
    name: 'Vendor Registration',
    description: 'Register as government contractor for procurement opportunities',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Procurement', 'Vendor', 'Contract'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Legal company name' },
      { id: '2', type: 'text', label: 'Federal Tax ID', required: true, placeholder: 'XX-XXXXXXX' },
      { id: '3', type: 'text', label: 'DUNS Number', required: false, placeholder: 'DUNS if available' },
      { id: '4', type: 'select', label: 'Business Size', required: true, options: ['Small Business', 'Large Business', 'Non-Profit'] },
      { id: '5', type: 'checkbox', label: 'Certifications', required: false, options: ['MBE', 'WBE', 'DBE', 'SBE', 'DVBE', '8(a)'] },
      { id: '6', type: 'textarea', label: 'Products/Services', required: true, placeholder: 'Describe offerings' },
      { id: '7', type: 'text', label: 'Primary Contact', required: true, placeholder: 'Contact person name' },
      { id: '8', type: 'email', label: 'Contact Email', required: true, placeholder: 'contact@company.com' },
      { id: '9', type: 'file', label: 'Business License', required: true, acceptedFileTypes: ['pdf'] },
      { id: '10', type: 'file', label: 'Insurance Certificate', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'gov-5',
    name: 'Property Tax Assessment Appeal',
    description: 'Challenge property tax assessment valuations',
    category: 'Assessment',
    sector: 'Government',
    tags: ['Government', 'Tax', 'Property', 'Appeal'],
    fields: [
      { id: '1', type: 'text', label: 'Property Owner', required: true, placeholder: 'Legal property owner name' },
      { id: '2', type: 'text', label: 'Property Address', required: true, placeholder: 'Complete property address' },
      { id: '3', type: 'text', label: 'Tax Account Number', required: true, placeholder: 'Account number' },
      { id: '4', type: 'number', label: 'Current Assessment', required: true, placeholder: 'Current assessed value' },
      { id: '5', type: 'number', label: 'Requested Value', required: true, placeholder: 'Proposed assessed value' },
      { id: '6', type: 'textarea', label: 'Appeal Basis', required: true, placeholder: 'Reason for assessment challenge' },
      { id: '7', type: 'file', label: 'Supporting Evidence', required: false, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '8', type: 'textarea', label: 'Comparable Properties', required: false, placeholder: 'List similar properties' }
    ]
  },
  {
    id: 'gov-6',
    name: 'Marriage License Application',
    description: 'Apply for marriage license and ceremony authorization',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Marriage', 'License', 'Vital Records'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant 1 Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'date', label: 'Applicant 1 DOB', required: true },
      { id: '3', type: 'text', label: 'Applicant 1 SSN', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '4', type: 'text', label: 'Applicant 2 Name', required: true, placeholder: 'Full legal name' },
      { id: '5', type: 'date', label: 'Applicant 2 DOB', required: true },
      { id: '6', type: 'text', label: 'Applicant 2 SSN', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '7', type: 'date', label: 'Ceremony Date', required: true },
      { id: '8', type: 'text', label: 'Ceremony Location', required: true, placeholder: 'Where ceremony will occur' },
      { id: '9', type: 'text', label: 'Officiant Name', required: true, placeholder: 'Who will perform ceremony' },
      { id: '10', type: 'file', label: 'ID Documents', required: true, acceptedFileTypes: ['pdf', 'jpg'] }
    ]
  },
  {
    id: 'gov-7',
    name: 'Zoning Variance Request',
    description: 'Request exception to zoning ordinances and regulations',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Zoning', 'Variance', 'Planning'],
    fields: [
      { id: '1', type: 'text', label: 'Property Owner', required: true, placeholder: 'Legal property owner' },
      { id: '2', type: 'text', label: 'Property Address', required: true, placeholder: 'Subject property address' },
      { id: '3', type: 'text', label: 'Parcel ID', required: true, placeholder: 'Tax parcel number' },
      { id: '4', type: 'select', label: 'Current Zoning', required: true, options: ['Residential', 'Commercial', 'Industrial', 'Mixed Use'] },
      { id: '5', type: 'textarea', label: 'Variance Request', required: true, placeholder: 'Describe requested variance' },
      { id: '6', type: 'textarea', label: 'Hardship Justification', required: true, placeholder: 'Explain hardship requiring variance' },
      { id: '7', type: 'number', label: 'Project Cost', required: true, placeholder: 'Estimated project value' },
      { id: '8', type: 'file', label: 'Site Plan', required: true, acceptedFileTypes: ['pdf', 'dwg'] }
    ]
  },
  {
    id: 'gov-8',
    name: 'Birth Certificate Request',
    description: 'Request certified copy of birth certificate',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Birth Certificate', 'Vital Records', 'Identity'],
    fields: [
      { id: '1', type: 'text', label: 'Name on Certificate', required: true, placeholder: 'Name as appears on birth certificate' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Place of Birth', required: true, placeholder: 'City, State of birth' },
      { id: '4', type: 'text', label: "Father's Name", required: true, placeholder: "Father's full name" },
      { id: '5', type: 'text', label: "Mother's Maiden Name", required: true, placeholder: "Mother's maiden name" },
      { id: '6', type: 'text', label: 'Requester Name', required: true, placeholder: 'Person making request' },
      { id: '7', type: 'select', label: 'Relationship', required: true, options: ['Self', 'Parent', 'Spouse', 'Child', 'Legal Representative'] },
      { id: '8', type: 'select', label: 'Number of Copies', required: true, options: ['1', '2', '3', '4', '5+'] },
      { id: '9', type: 'file', label: 'Photo ID', required: true, acceptedFileTypes: ['pdf', 'jpg'] }
    ]
  },
  {
    id: 'gov-9',
    name: 'Parking Permit Application',
    description: 'Apply for residential or commercial parking permits',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Parking', 'Permit', 'Transportation'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant Name', required: true, placeholder: 'Full name' },
      { id: '2', type: 'select', label: 'Permit Type', required: true, options: ['Residential', 'Business', 'Visitor', 'Disability'] },
      { id: '3', type: 'text', label: 'Vehicle Make', required: true, placeholder: 'e.g., Toyota' },
      { id: '4', type: 'text', label: 'Vehicle Model', required: true, placeholder: 'e.g., Camry' },
      { id: '5', type: 'text', label: 'License Plate', required: true, placeholder: 'Current plate number' },
      { id: '6', type: 'textarea', label: 'Address', required: true, placeholder: 'Address where permit applies' },
      { id: '7', type: 'select', label: 'Duration', required: true, options: ['1 Month', '3 Months', '6 Months', '1 Year'] },
      { id: '8', type: 'file', label: 'Proof of Residency', required: true, acceptedFileTypes: ['pdf', 'jpg'] }
    ]
  },
  {
    id: 'gov-10',
    name: 'Dog License Registration',
    description: 'Register pet with city animal control services',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Pet', 'License', 'Animal Control'],
    fields: [
      { id: '1', type: 'text', label: 'Owner Name', required: true, placeholder: 'Pet owner name' },
      { id: '2', type: 'textarea', label: 'Owner Address', required: true, placeholder: 'Complete address' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'text', label: 'Dog Name', required: true, placeholder: 'Pet name' },
      { id: '5', type: 'text', label: 'Breed', required: true, placeholder: 'Dog breed or mix' },
      { id: '6', type: 'select', label: 'Size', required: true, options: ['Small (under 25 lbs)', 'Medium (25-60 lbs)', 'Large (over 60 lbs)'] },
      { id: '7', type: 'radio', label: 'Gender', required: true, options: ['Male', 'Female'] },
      { id: '8', type: 'radio', label: 'Spayed/Neutered', required: true, options: ['Yes', 'No'] },
      { id: '9', type: 'date', label: 'Date of Birth', required: true },
      { id: '10', type: 'file', label: 'Vaccination Records', required: true, acceptedFileTypes: ['pdf', 'jpg'] }
    ]
  },
  {
    id: 'gov-11',
    name: 'Special Event Permit',
    description: 'Apply for permits to host public events and gatherings',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Event', 'Permit', 'Public Safety'],
    fields: [
      { id: '1', type: 'text', label: 'Event Name', required: true, placeholder: 'Name of event' },
      { id: '2', type: 'text', label: 'Organization', required: true, placeholder: 'Organizing entity' },
      { id: '3', type: 'text', label: 'Contact Person', required: true, placeholder: 'Primary contact name' },
      { id: '4', type: 'email', label: 'Contact Email', required: true, placeholder: 'contact@email.com' },
      { id: '5', type: 'text', label: 'Event Location', required: true, placeholder: 'Venue or address' },
      { id: '6', type: 'date', label: 'Event Date', required: true },
      { id: '7', type: 'text', label: 'Start Time', required: true, placeholder: 'HH:MM AM/PM' },
      { id: '8', type: 'text', label: 'End Time', required: true, placeholder: 'HH:MM AM/PM' },
      { id: '9', type: 'number', label: 'Expected Attendance', required: true, placeholder: 'Number of attendees' },
      { id: '10', type: 'textarea', label: 'Event Description', required: true, placeholder: 'Describe the event' },
      { id: '11', type: 'checkbox', label: 'Services Needed', required: false, options: ['Police', 'Fire/EMS', 'Public Works', 'Traffic Control'] }
    ]
  },
  {
    id: 'gov-12',
    name: 'Water/Sewer Service Application',
    description: 'Apply for municipal water and sewer utility services',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Utilities', 'Water', 'Sewer'],
    fields: [
      { id: '1', type: 'text', label: 'Property Owner', required: true, placeholder: 'Legal property owner' },
      { id: '2', type: 'text', label: 'Service Address', required: true, placeholder: 'Property address for service' },
      { id: '3', type: 'text', label: 'Mailing Address', required: true, placeholder: 'Billing address' },
      { id: '4', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '5', type: 'email', label: 'Email Address', required: true, placeholder: 'contact@email.com' },
      { id: '6', type: 'checkbox', label: 'Services Requested', required: true, options: ['Water Service', 'Sewer Service', 'Both'] },
      { id: '7', type: 'date', label: 'Requested Start Date', required: true },
      { id: '8', type: 'select', label: 'Property Type', required: true, options: ['Residential', 'Commercial', 'Industrial'] },
      { id: '9', type: 'file', label: 'Proof of Ownership', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'gov-13',
    name: 'Business Tax Certificate',
    description: 'Apply for local business tax certificate and registration',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Business', 'Tax', 'Certificate'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Legal business name' },
      { id: '2', type: 'text', label: 'DBA Name', required: false, placeholder: 'Doing Business As name' },
      { id: '3', type: 'text', label: 'Federal EIN', required: true, placeholder: 'XX-XXXXXXX' },
      { id: '4', type: 'select', label: 'Business Structure', required: true, options: ['Sole Proprietorship', 'Partnership', 'Corporation', 'LLC'] },
      { id: '5', type: 'textarea', label: 'Business Address', required: true, placeholder: 'Physical location' },
      { id: '6', type: 'date', label: 'Start Date', required: true },
      { id: '7', type: 'select', label: 'Business Category', required: true, options: ['Retail', 'Service', 'Manufacturing', 'Professional', 'Restaurant'] },
      { id: '8', type: 'text', label: 'Owner Name', required: true, placeholder: 'Primary owner' },
      { id: '9', type: 'number', label: 'Gross Receipts', required: true, placeholder: 'Estimated annual revenue' }
    ]
  },
  {
    id: 'gov-14',
    name: 'Environmental Review Application',
    description: 'Submit project for environmental impact assessment',
    category: 'Assessment',
    sector: 'Government',
    tags: ['Government', 'Environmental', 'Impact', 'Review'],
    fields: [
      { id: '1', type: 'text', label: 'Project Name', required: true, placeholder: 'Development project name' },
      { id: '2', type: 'text', label: 'Project Location', required: true, placeholder: 'Complete address' },
      { id: '3', type: 'text', label: 'Applicant Name', required: true, placeholder: 'Project applicant' },
      { id: '4', type: 'text', label: 'Contact Person', required: true, placeholder: 'Primary contact' },
      { id: '5', type: 'textarea', label: 'Project Description', required: true, placeholder: 'Detailed project description' },
      { id: '6', type: 'number', label: 'Project Area (acres)', required: true, placeholder: 'Total project area' },
      { id: '7', type: 'checkbox', label: 'Environmental Factors', required: true, options: ['Wetlands', 'Endangered Species', 'Historic Sites', 'Air Quality', 'Water Quality'] },
      { id: '8', type: 'file', label: 'Project Plans', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'file', label: 'Environmental Study', required: false, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'gov-15',
    name: 'Street Closure Permit',
    description: 'Request temporary street closure for construction or events',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Street', 'Closure', 'Transportation'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant Name', required: true, placeholder: 'Person/organization requesting' },
      { id: '2', type: 'text', label: 'Contact Phone', required: true, placeholder: '(555) 123-4567' },
      { id: '3', type: 'text', label: 'Street Name', required: true, placeholder: 'Street to be closed' },
      { id: '4', type: 'text', label: 'From Intersection', required: true, placeholder: 'Starting point' },
      { id: '5', type: 'text', label: 'To Intersection', required: true, placeholder: 'Ending point' },
      { id: '6', type: 'date', label: 'Closure Date', required: true },
      { id: '7', type: 'text', label: 'Start Time', required: true, placeholder: 'HH:MM AM/PM' },
      { id: '8', type: 'text', label: 'End Time', required: true, placeholder: 'HH:MM AM/PM' },
      { id: '9', type: 'select', label: 'Reason', required: true, options: ['Construction', 'Special Event', 'Utility Work', 'Emergency Repair'] },
      { id: '10', type: 'textarea', label: 'Detour Plan', required: true, placeholder: 'Describe alternative routes' }
    ]
  },
  {
    id: 'gov-16',
    name: 'Liquor License Application',
    description: 'Apply for alcohol sales and service license',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Liquor', 'License', 'Alcohol'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Establishment name' },
      { id: '2', type: 'text', label: 'Business Address', required: true, placeholder: 'Licensed premises address' },
      { id: '3', type: 'text', label: 'Applicant Name', required: true, placeholder: 'License applicant' },
      { id: '4', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '5', type: 'select', label: 'License Type', required: true, options: ['On-Premises Beer/Wine', 'On-Premises Full Liquor', 'Off-Premises Beer/Wine', 'Off-Premises Full Liquor'] },
      { id: '6', type: 'select', label: 'Business Type', required: true, options: ['Restaurant', 'Bar', 'Retail Store', 'Hotel', 'Grocery Store'] },
      { id: '7', type: 'number', label: 'Seating Capacity', required: false, placeholder: 'Number of seats' },
      { id: '8', type: 'text', label: 'Operating Hours', required: true, placeholder: 'Daily operating hours' },
      { id: '9', type: 'file', label: 'Floor Plan', required: true, acceptedFileTypes: ['pdf'] },
      { id: '10', type: 'file', label: 'Criminal Background Check', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'gov-17',
    name: 'Code Enforcement Complaint',
    description: 'Report code violations and property maintenance issues',
    category: 'Complaint',
    sector: 'Government',
    tags: ['Government', 'Code', 'Enforcement', 'Complaint'],
    fields: [
      { id: '1', type: 'text', label: 'Complainant Name', required: false, placeholder: 'Your name (optional)' },
      { id: '2', type: 'text', label: 'Contact Phone', required: false, placeholder: '(555) 123-4567' },
      { id: '3', type: 'text', label: 'Property Address', required: true, placeholder: 'Address of violation' },
      { id: '4', type: 'select', label: 'Violation Type', required: true, options: ['Property Maintenance', 'Zoning', 'Health/Safety', 'Noise', 'Illegal Construction'] },
      { id: '5', type: 'textarea', label: 'Violation Description', required: true, placeholder: 'Describe the violation' },
      { id: '6', type: 'date', label: 'Date Observed', required: true },
      { id: '7', type: 'radio', label: 'Ongoing Issue', required: true, options: ['Yes', 'No'] },
      { id: '8', type: 'file', label: 'Photos', required: false, acceptedFileTypes: ['jpg', 'png'] },
      { id: '9', type: 'radio', label: 'Anonymous Complaint', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'gov-18',
    name: 'Public Works Service Request',
    description: 'Request municipal services and infrastructure repairs',
    category: 'Service Request',
    sector: 'Government',
    tags: ['Government', 'Public Works', 'Service', 'Infrastructure'],
    fields: [
      { id: '1', type: 'text', label: 'Requester Name', required: true, placeholder: 'Your name' },
      { id: '2', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '3', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '4', type: 'text', label: 'Service Location', required: true, placeholder: 'Address or intersection' },
      { id: '5', type: 'select', label: 'Service Type', required: true, options: ['Pothole Repair', 'Street Light', 'Tree Removal', 'Snow Removal', 'Drainage Issue', 'Traffic Sign'] },
      { id: '6', type: 'textarea', label: 'Problem Description', required: true, placeholder: 'Describe the issue' },
      { id: '7', type: 'select', label: 'Priority', required: true, options: ['Low', 'Medium', 'High', 'Emergency'] },
      { id: '8', type: 'file', label: 'Photos', required: false, acceptedFileTypes: ['jpg', 'png'] }
    ]
  },
  {
    id: 'gov-19',
    name: 'Cemetery Plot Purchase',
    description: 'Purchase burial plot in municipal cemetery',
    category: 'Registration',
    sector: 'Government',
    tags: ['Government', 'Cemetery', 'Burial', 'Plot'],
    fields: [
      { id: '1', type: 'text', label: 'Purchaser Name', required: true, placeholder: 'Plot purchaser name' },
      { id: '2', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '3', type: 'textarea', label: 'Mailing Address', required: true, placeholder: 'Complete mailing address' },
      { id: '4', type: 'select', label: 'Plot Type', required: true, options: ['Single Grave', 'Double Grave', 'Family Plot', 'Cremation Niche'] },
      { id: '5', type: 'select', label: 'Cemetery Section', required: true, options: ['East Section', 'West Section', 'North Section', 'Memorial Garden'] },
      { id: '6', type: 'text', label: 'Deceased Name', required: false, placeholder: 'If for specific person' },
      { id: '7', type: 'radio', label: 'Payment Method', required: true, options: ['Full Payment', 'Payment Plan'] },
      { id: '8', type: 'textarea', label: 'Special Requests', required: false, placeholder: 'Any special considerations' }
    ]
  },
  {
    id: 'gov-20',
    name: 'Freedom of Information Appeal',
    description: 'Appeal denied public records request',
    category: 'Appeal',
    sector: 'Government',
    tags: ['Government', 'FOIA', 'Appeal', 'Records'],
    fields: [
      { id: '1', type: 'text', label: 'Appellant Name', required: true, placeholder: 'Person filing appeal' },
      { id: '2', type: 'email', label: 'Contact Email', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Original Request Date', required: true, placeholder: 'Date of original FOIA request' },
      { id: '4', type: 'text', label: 'Denial Date', required: true, placeholder: 'Date request was denied' },
      { id: '5', type: 'textarea', label: 'Original Request', required: true, placeholder: 'Description of original records request' },
      { id: '6', type: 'textarea', label: 'Denial Reason', required: true, placeholder: 'Reason given for denial' },
      { id: '7', type: 'textarea', label: 'Appeal Basis', required: true, placeholder: 'Why you believe records should be released' },
      { id: '8', type: 'file', label: 'Supporting Documents', required: false, acceptedFileTypes: ['pdf'] }
    ]
  }
];

// Insurance Sector Templates - 20 specific templates for insurance companies
export const insuranceTemplates: FormTemplate[] = [
  {
    id: 'ins-1',
    name: 'Auto Insurance Claim',
    description: 'Report and file automobile insurance claims',
    category: 'Claims',
    sector: 'Insurance',
    tags: ['Insurance', 'Auto', 'Claims', 'Vehicle'],
    fields: [
      { id: '1', type: 'text', label: 'Policy Number', required: true, placeholder: 'Policy number' },
      { id: '2', type: 'text', label: 'Policyholder Name', required: true, placeholder: 'Primary policyholder' },
      { id: '3', type: 'date', label: 'Accident Date', required: true },
      { id: '4', type: 'text', label: 'Accident Time', required: true, placeholder: 'HH:MM AM/PM' },
      { id: '5', type: 'textarea', label: 'Accident Location', required: true, placeholder: 'Detailed accident location' },
      { id: '6', type: 'textarea', label: 'Accident Description', required: true, placeholder: 'How did the accident occur' },
      { id: '7', type: 'text', label: 'Vehicle Make', required: true, placeholder: 'e.g., Toyota' },
      { id: '8', type: 'text', label: 'Vehicle Model', required: true, placeholder: 'e.g., Camry' },
      { id: '9', type: 'text', label: 'Vehicle Year', required: true, placeholder: 'e.g., 2020' },
      { id: '10', type: 'text', label: 'License Plate', required: true, placeholder: 'Vehicle license plate' },
      { id: '11', type: 'radio', label: 'Police Report Filed', required: true, options: ['Yes', 'No'] },
      { id: '12', type: 'text', label: 'Other Driver Name', required: false, placeholder: 'If applicable' },
      { id: '13', type: 'text', label: 'Other Insurance Company', required: false, placeholder: 'Other party insurance' },
      { id: '14', type: 'radio', label: 'Injuries Reported', required: true, options: ['Yes', 'No'] },
      { id: '15', type: 'file', label: 'Photos', required: false, acceptedFileTypes: ['jpg', 'png'] }
    ]
  },
  {
    id: 'ins-2',
    name: 'Home Insurance Quote',
    description: 'Request quote for homeowners insurance coverage',
    category: 'Quote',
    sector: 'Insurance',
    tags: ['Insurance', 'Home', 'Quote', 'Property'],
    fields: [
      { id: '1', type: 'text', label: 'Homeowner Name', required: true, placeholder: 'Full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'textarea', label: 'Property Address', required: true, placeholder: 'Complete property address' },
      { id: '5', type: 'select', label: 'Property Type', required: true, options: ['Single Family', 'Townhouse', 'Condo', 'Mobile Home'] },
      { id: '6', type: 'number', label: 'Year Built', required: true, placeholder: 'Year home was built' },
      { id: '7', type: 'number', label: 'Square Footage', required: true, placeholder: 'Total square feet' },
      { id: '8', type: 'number', label: 'Home Value', required: true, placeholder: 'Estimated home value' },
      { id: '9', type: 'select', label: 'Construction Type', required: true, options: ['Frame', 'Masonry', 'Steel', 'Other'] },
      { id: '10', type: 'select', label: 'Roof Type', required: true, options: ['Asphalt Shingle', 'Tile', 'Metal', 'Other'] },
      { id: '11', type: 'radio', label: 'Security System', required: true, options: ['Yes', 'No'] },
      { id: '12', type: 'radio', label: 'Swimming Pool', required: true, options: ['Yes', 'No'] },
      { id: '13', type: 'checkbox', label: 'Coverage Needed', required: true, options: ['Dwelling', 'Personal Property', 'Liability', 'Loss of Use'] }
    ]
  },
  {
    id: 'ins-3',
    name: 'Life Insurance Application',
    description: 'Apply for life insurance coverage',
    category: 'Application',
    sector: 'Insurance',
    tags: ['Insurance', 'Life', 'Application', 'Coverage'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'radio', label: 'Gender', required: true, options: ['Male', 'Female'] },
      { id: '4', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '5', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete address' },
      { id: '6', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '7', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '8', type: 'text', label: 'Occupation', required: true, placeholder: 'Current occupation' },
      { id: '9', type: 'number', label: 'Annual Income', required: true, placeholder: 'Annual gross income' },
      { id: '10', type: 'select', label: 'Coverage Amount', required: true, options: ['$100,000', '$250,000', '$500,000', '$1,000,000', '$2,000,000+'] },
      { id: '11', type: 'select', label: 'Policy Type', required: true, options: ['Term Life', 'Whole Life', 'Universal Life'] },
      { id: '12', type: 'text', label: 'Primary Beneficiary', required: true, placeholder: 'Full name of beneficiary' },
      { id: '13', type: 'text', label: 'Beneficiary Relationship', required: true, placeholder: 'Relationship to applicant' },
      { id: '14', type: 'radio', label: 'Tobacco Use', required: true, options: ['Yes', 'No'] },
      { id: '15', type: 'textarea', label: 'Medical History', required: true, placeholder: 'Brief medical history' }
    ]
  },
  {
    id: 'ins-4',
    name: 'Workers Compensation Claim',
    description: 'File workers compensation injury claim',
    category: 'Claims',
    sector: 'Insurance',
    tags: ['Insurance', 'Workers Comp', 'Claims', 'Injury'],
    fields: [
      { id: '1', type: 'text', label: 'Employee Name', required: true, placeholder: 'Injured employee name' },
      { id: '2', type: 'text', label: 'Employee ID', required: true, placeholder: 'Company employee ID' },
      { id: '3', type: 'text', label: 'Employer Name', required: true, placeholder: 'Company name' },
      { id: '4', type: 'date', label: 'Injury Date', required: true },
      { id: '5', type: 'text', label: 'Injury Time', required: true, placeholder: 'Time of injury' },
      { id: '6', type: 'textarea', label: 'Injury Location', required: true, placeholder: 'Where injury occurred' },
      { id: '7', type: 'textarea', label: 'Injury Description', required: true, placeholder: 'How injury occurred' },
      { id: '8', type: 'select', label: 'Body Part Injured', required: true, options: ['Head', 'Neck', 'Back', 'Arm', 'Hand', 'Leg', 'Foot', 'Multiple'] },
      { id: '9', type: 'select', label: 'Injury Type', required: true, options: ['Strain/Sprain', 'Cut/Laceration', 'Burn', 'Fracture', 'Bruise', 'Other'] },
      { id: '10', type: 'radio', label: 'Medical Treatment Sought', required: true, options: ['Yes', 'No'] },
      { id: '11', type: 'text', label: 'Doctor/Hospital Name', required: false, placeholder: 'If treatment received' },
      { id: '12', type: 'text', label: 'Witness Name', required: false, placeholder: 'If witness present' },
      { id: '13', type: 'radio', label: 'Reported to Supervisor', required: true, options: ['Yes', 'No'] },
      { id: '14', type: 'date', label: 'Last Day Worked', required: true }
    ]
  },
  {
    id: 'ins-5',
    name: 'Property Damage Claim',
    description: 'Report property damage for insurance claim',
    category: 'Claims',
    sector: 'Insurance',
    tags: ['Insurance', 'Property', 'Damage', 'Claims'],
    fields: [
      { id: '1', type: 'text', label: 'Policy Number', required: true, placeholder: 'Insurance policy number' },
      { id: '2', type: 'text', label: 'Policyholder Name', required: true, placeholder: 'Primary policyholder' },
      { id: '3', type: 'date', label: 'Date of Loss', required: true },
      { id: '4', type: 'textarea', label: 'Property Address', required: true, placeholder: 'Address of damaged property' },
      { id: '5', type: 'select', label: 'Cause of Damage', required: true, options: ['Fire', 'Water', 'Storm', 'Theft', 'Vandalism', 'Other'] },
      { id: '6', type: 'textarea', label: 'Damage Description', required: true, placeholder: 'Describe the damage' },
      { id: '7', type: 'number', label: 'Estimated Damage Cost', required: true, placeholder: 'Estimated repair cost' },
      { id: '8', type: 'radio', label: 'Police Report Filed', required: true, options: ['Yes', 'No'] },
      { id: '9', type: 'radio', label: 'Temporary Repairs Made', required: true, options: ['Yes', 'No'] },
      { id: '10', type: 'file', label: 'Photos of Damage', required: false, acceptedFileTypes: ['jpg', 'png'] },
      { id: '11', type: 'file', label: 'Receipts/Estimates', required: false, acceptedFileTypes: ['pdf', 'jpg'] }
    ]
  },
  {
    id: 'ins-6',
    name: 'Health Insurance Enrollment',
    description: 'Enroll in health insurance plan',
    category: 'Application',
    sector: 'Insurance',
    tags: ['Insurance', 'Health', 'Enrollment', 'Coverage'],
    fields: [
      { id: '1', type: 'text', label: 'Primary Member Name', required: true, placeholder: 'Primary insured name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '4', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete address' },
      { id: '5', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '6', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '7', type: 'select', label: 'Plan Type', required: true, options: ['HMO', 'PPO', 'EPO', 'High Deductible'] },
      { id: '8', type: 'radio', label: 'Coverage Type', required: true, options: ['Individual', 'Family'] },
      { id: '9', type: 'textarea', label: 'Dependents', required: false, placeholder: 'List dependents to be covered' },
      { id: '10', type: 'text', label: 'Employer', required: false, placeholder: 'Employer name if applicable' },
      { id: '11', type: 'radio', label: 'Previous Coverage', required: true, options: ['Yes', 'No'] },
      { id: '12', type: 'checkbox', label: 'Pre-existing Conditions', required: false, options: ['Diabetes', 'Heart Disease', 'Cancer', 'None'] }
    ]
  },
  {
    id: 'ins-7',
    name: 'Commercial Insurance Quote',
    description: 'Request quote for business insurance coverage',
    category: 'Quote',
    sector: 'Insurance',
    tags: ['Insurance', 'Commercial', 'Business', 'Quote'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Legal business name' },
      { id: '2', type: 'text', label: 'Contact Person', required: true, placeholder: 'Primary contact' },
      { id: '3', type: 'email', label: 'Email Address', required: true, placeholder: 'business@email.com' },
      { id: '4', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '5', type: 'textarea', label: 'Business Address', required: true, placeholder: 'Complete business address' },
      { id: '6', type: 'select', label: 'Industry Type', required: true, options: ['Retail', 'Manufacturing', 'Professional Services', 'Restaurant', 'Construction'] },
      { id: '7', type: 'number', label: 'Years in Business', required: true, placeholder: 'Number of years operating' },
      { id: '8', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Total employees' },
      { id: '9', type: 'number', label: 'Annual Revenue', required: true, placeholder: 'Annual gross revenue' },
      { id: '10', type: 'checkbox', label: 'Coverage Types', required: true, options: ['General Liability', 'Property', 'Workers Comp', 'Professional Liability', 'Cyber Liability'] },
      { id: '11', type: 'radio', label: 'Previous Claims', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'ins-8',
    name: 'Disability Insurance Claim',
    description: 'File disability insurance benefit claim',
    category: 'Claims',
    sector: 'Insurance',
    tags: ['Insurance', 'Disability', 'Claims', 'Benefits'],
    fields: [
      { id: '1', type: 'text', label: 'Claimant Name', required: true, placeholder: 'Full name of claimant' },
      { id: '2', type: 'text', label: 'Policy Number', required: true, placeholder: 'Disability policy number' },
      { id: '3', type: 'date', label: 'Date Disabled', required: true },
      { id: '4', type: 'date', label: 'Last Day Worked', required: true },
      { id: '5', type: 'textarea', label: 'Disability Description', required: true, placeholder: 'Describe your disability' },
      { id: '6', type: 'text', label: 'Treating Physician', required: true, placeholder: 'Primary doctor name' },
      { id: '7', type: 'text', label: 'Physician Phone', required: true, placeholder: 'Doctor phone number' },
      { id: '8', type: 'text', label: 'Employer Name', required: true, placeholder: 'Current/last employer' },
      { id: '9', type: 'text', label: 'Job Title', required: true, placeholder: 'Your job title' },
      { id: '10', type: 'textarea', label: 'Job Duties', required: true, placeholder: 'Describe your job duties' },
      { id: '11', type: 'radio', label: 'Receiving Workers Comp', required: true, options: ['Yes', 'No'] },
      { id: '12', type: 'file', label: 'Medical Records', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'ins-9',
    name: 'Travel Insurance Application',
    description: 'Apply for travel insurance coverage',
    category: 'Application',
    sector: 'Insurance',
    tags: ['Insurance', 'Travel', 'Application', 'Coverage'],
    fields: [
      { id: '1', type: 'text', label: 'Traveler Name', required: true, placeholder: 'Primary traveler name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '5', type: 'textarea', label: 'Home Address', required: true, placeholder: 'Complete home address' },
      { id: '6', type: 'text', label: 'Destination', required: true, placeholder: 'Travel destination' },
      { id: '7', type: 'date', label: 'Departure Date', required: true },
      { id: '8', type: 'date', label: 'Return Date', required: true },
      { id: '9', type: 'number', label: 'Trip Cost', required: true, placeholder: 'Total trip cost' },
      { id: '10', type: 'number', label: 'Number of Travelers', required: true, placeholder: 'Total travelers' },
      { id: '11', type: 'checkbox', label: 'Coverage Options', required: true, options: ['Trip Cancellation', 'Medical Emergency', 'Lost Baggage', 'Flight Delay'] },
      { id: '12', type: 'radio', label: 'Pre-existing Conditions', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'ins-10',
    name: 'Cyber Insurance Assessment',
    description: 'Assess business cyber security risks for insurance',
    category: 'Assessment',
    sector: 'Insurance',
    tags: ['Insurance', 'Cyber', 'Security', 'Assessment'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Legal company name' },
      { id: '2', type: 'text', label: 'Contact Person', required: true, placeholder: 'IT/Security contact' },
      { id: '3', type: 'email', label: 'Email Address', required: true, placeholder: 'contact@company.com' },
      { id: '4', type: 'select', label: 'Industry', required: true, options: ['Healthcare', 'Financial', 'Retail', 'Technology', 'Manufacturing', 'Other'] },
      { id: '5', type: 'number', label: 'Annual Revenue', required: true, placeholder: 'Annual company revenue' },
      { id: '6', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Total employees' },
      { id: '7', type: 'radio', label: 'Store Credit Card Data', required: true, options: ['Yes', 'No'] },
      { id: '8', type: 'radio', label: 'Handle Personal Data', required: true, options: ['Yes', 'No'] },
      { id: '9', type: 'checkbox', label: 'Security Measures', required: true, options: ['Firewall', 'Antivirus', 'Employee Training', 'Data Encryption', 'Backup Systems'] },
      { id: '10', type: 'radio', label: 'Previous Cyber Incidents', required: true, options: ['Yes', 'No'] },
      { id: '11', type: 'select', label: 'Desired Coverage Limit', required: true, options: ['$1M', '$5M', '$10M', '$25M+'] }
    ]
  },
  {
    id: 'ins-11',
    name: 'Flood Insurance Application',
    description: 'Apply for flood insurance coverage',
    category: 'Application',
    sector: 'Insurance',
    tags: ['Insurance', 'Flood', 'Property', 'Application'],
    fields: [
      { id: '1', type: 'text', label: 'Property Owner', required: true, placeholder: 'Property owner name' },
      { id: '2', type: 'textarea', label: 'Property Address', required: true, placeholder: 'Complete property address' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '5', type: 'select', label: 'Property Type', required: true, options: ['Single Family', 'Condo', 'Rental Property', 'Commercial'] },
      { id: '6', type: 'number', label: 'Year Built', required: true, placeholder: 'Year property was built' },
      { id: '7', type: 'select', label: 'Foundation Type', required: true, options: ['Basement', 'Crawl Space', 'Slab', 'Pier/Post'] },
      { id: '8', type: 'radio', label: 'Flood Zone', required: true, options: ['High Risk', 'Moderate Risk', 'Low Risk', 'Unknown'] },
      { id: '9', type: 'number', label: 'Building Coverage', required: true, placeholder: 'Desired building coverage amount' },
      { id: '10', type: 'number', label: 'Contents Coverage', required: true, placeholder: 'Desired contents coverage amount' },
      { id: '11', type: 'radio', label: 'Previous Flood Damage', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'ins-12',
    name: 'Pet Insurance Enrollment',
    description: 'Enroll pet in insurance coverage plan',
    category: 'Application',
    sector: 'Insurance',
    tags: ['Insurance', 'Pet', 'Enrollment', 'Animal'],
    fields: [
      { id: '1', type: 'text', label: 'Pet Owner Name', required: true, placeholder: 'Owner full name' },
      { id: '2', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '3', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '4', type: 'text', label: 'Pet Name', required: true, placeholder: 'Pet name' },
      { id: '5', type: 'select', label: 'Pet Type', required: true, options: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'] },
      { id: '6', type: 'text', label: 'Breed', required: true, placeholder: 'Pet breed' },
      { id: '7', type: 'date', label: 'Pet Date of Birth', required: true },
      { id: '8', type: 'radio', label: 'Pet Gender', required: true, options: ['Male', 'Female'] },
      { id: '9', type: 'radio', label: 'Spayed/Neutered', required: true, options: ['Yes', 'No'] },
      { id: '10', type: 'text', label: 'Veterinarian Name', required: true, placeholder: 'Current veterinarian' },
      { id: '11', type: 'checkbox', label: 'Coverage Options', required: true, options: ['Accidents', 'Illness', 'Wellness', 'Dental'] },
      { id: '12', type: 'radio', label: 'Pre-existing Conditions', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'ins-13',
    name: 'Umbrella Insurance Quote',
    description: 'Request quote for umbrella liability insurance',
    category: 'Quote',
    sector: 'Insurance',
    tags: ['Insurance', 'Umbrella', 'Liability', 'Quote'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant Name', required: true, placeholder: 'Primary applicant name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'number', label: 'Current Auto Liability Limit', required: true, placeholder: 'Current auto coverage limit' },
      { id: '5', type: 'number', label: 'Current Home Liability Limit', required: true, placeholder: 'Current home coverage limit' },
      { id: '6', type: 'select', label: 'Desired Umbrella Limit', required: true, options: ['$1M', '$2M', '$5M', '$10M'] },
      { id: '7', type: 'number', label: 'Number of Vehicles', required: true, placeholder: 'Total vehicles owned' },
      { id: '8', type: 'number', label: 'Number of Properties', required: true, placeholder: 'Total properties owned' },
      { id: '9', type: 'radio', label: 'Pool/Trampoline', required: true, options: ['Yes', 'No'] },
      { id: '10', type: 'radio', label: 'Watercraft', required: true, options: ['Yes', 'No'] },
      { id: '11', type: 'radio', label: 'Previous Liability Claims', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'ins-14',
    name: 'Renters Insurance Application',
    description: 'Apply for renters insurance coverage',
    category: 'Application',
    sector: 'Insurance',
    tags: ['Insurance', 'Renters', 'Property', 'Application'],
    fields: [
      { id: '1', type: 'text', label: 'Renter Name', required: true, placeholder: 'Primary renter name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '5', type: 'textarea', label: 'Rental Address', required: true, placeholder: 'Complete rental property address' },
      { id: '6', type: 'select', label: 'Property Type', required: true, options: ['Apartment', 'House', 'Condo', 'Townhouse'] },
      { id: '7', type: 'date', label: 'Move-in Date', required: true },
      { id: '8', type: 'number', label: 'Personal Property Value', required: true, placeholder: 'Estimated value of belongings' },
      { id: '9', type: 'select', label: 'Liability Coverage', required: true, options: ['$100,000', '$300,000', '$500,000'] },
      { id: '10', type: 'radio', label: 'Security System', required: true, options: ['Yes', 'No'] },
      { id: '11', type: 'radio', label: 'Previous Claims', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'ins-15',
    name: 'Marine Insurance Quote',
    description: 'Request quote for boat/marine insurance',
    category: 'Quote',
    sector: 'Insurance',
    tags: ['Insurance', 'Marine', 'Boat', 'Quote'],
    fields: [
      { id: '1', type: 'text', label: 'Boat Owner Name', required: true, placeholder: 'Owner full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'text', label: 'Boat Make', required: true, placeholder: 'Manufacturer' },
      { id: '5', type: 'text', label: 'Boat Model', required: true, placeholder: 'Model name' },
      { id: '6', type: 'number', label: 'Year', required: true, placeholder: 'Year manufactured' },
      { id: '7', type: 'number', label: 'Length', required: true, placeholder: 'Length in feet' },
      { id: '8', type: 'select', label: 'Boat Type', required: true, options: ['Sailboat', 'Powerboat', 'Yacht', 'Personal Watercraft'] },
      { id: '9', type: 'number', label: 'Value', required: true, placeholder: 'Current market value' },
      { id: '10', type: 'text', label: 'Primary Use', required: true, placeholder: 'Recreation, fishing, etc.' },
      { id: '11', type: 'text', label: 'Storage Location', required: true, placeholder: 'Where boat is stored' },
      { id: '12', type: 'radio', label: 'Boating Course Completed', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'ins-16',
    name: 'Professional Liability Quote',
    description: 'Request quote for professional liability insurance',
    category: 'Quote',
    sector: 'Insurance',
    tags: ['Insurance', 'Professional', 'Liability', 'Quote'],
    fields: [
      { id: '1', type: 'text', label: 'Professional Name', required: true, placeholder: 'Professional/firm name' },
      { id: '2', type: 'text', label: 'Contact Person', required: true, placeholder: 'Primary contact' },
      { id: '3', type: 'email', label: 'Email Address', required: true, placeholder: 'contact@firm.com' },
      { id: '4', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '5', type: 'select', label: 'Profession', required: true, options: ['Doctor', 'Lawyer', 'Accountant', 'Architect', 'Engineer', 'Consultant'] },
      { id: '6', type: 'number', label: 'Years in Practice', required: true, placeholder: 'Years of experience' },
      { id: '7', type: 'number', label: 'Annual Revenue', required: true, placeholder: 'Annual gross revenue' },
      { id: '8', type: 'select', label: 'Coverage Limit', required: true, options: ['$1M', '$2M', '$5M', '$10M'] },
      { id: '9', type: 'radio', label: 'Previous Claims', required: true, options: ['Yes', 'No'] },
      { id: '10', type: 'checkbox', label: 'Services Provided', required: true, options: ['Consultation', 'Design', 'Implementation', 'Training', 'Other'] }
    ]
  },
  {
    id: 'ins-17',
    name: 'Farm Insurance Application',
    description: 'Apply for agricultural and farm insurance',
    category: 'Application',
    sector: 'Insurance',
    tags: ['Insurance', 'Farm', 'Agricultural', 'Application'],
    fields: [
      { id: '1', type: 'text', label: 'Farm Owner Name', required: true, placeholder: 'Farm owner name' },
      { id: '2', type: 'text', label: 'Farm Name', required: true, placeholder: 'Farm business name' },
      { id: '3', type: 'textarea', label: 'Farm Address', required: true, placeholder: 'Complete farm address' },
      { id: '4', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '5', type: 'email', label: 'Email Address', required: true, placeholder: 'farm@email.com' },
      { id: '6', type: 'number', label: 'Total Acres', required: true, placeholder: 'Total farm acreage' },
      { id: '7', type: 'checkbox', label: 'Farm Operations', required: true, options: ['Crops', 'Livestock', 'Dairy', 'Poultry', 'Orchards'] },
      { id: '8', type: 'number', label: 'Number of Buildings', required: true, placeholder: 'Farm buildings count' },
      { id: '9', type: 'number', label: 'Equipment Value', required: true, placeholder: 'Total equipment value' },
      { id: '10', type: 'number', label: 'Livestock Count', required: false, placeholder: 'Number of animals' },
      { id: '11', type: 'checkbox', label: 'Coverage Needed', required: true, options: ['Property', 'Liability', 'Crop', 'Livestock', 'Equipment'] }
    ]
  },
  {
    id: 'ins-18',
    name: 'Event Insurance Application',
    description: 'Apply for special event insurance coverage',
    category: 'Application',
    sector: 'Insurance',
    tags: ['Insurance', 'Event', 'Special', 'Application'],
    fields: [
      { id: '1', type: 'text', label: 'Event Organizer', required: true, placeholder: 'Organizer name/organization' },
      { id: '2', type: 'text', label: 'Contact Person', required: true, placeholder: 'Primary contact' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'email', label: 'Email Address', required: true, placeholder: 'contact@email.com' },
      { id: '5', type: 'text', label: 'Event Name', required: true, placeholder: 'Name of event' },
      { id: '6', type: 'text', label: 'Event Location', required: true, placeholder: 'Venue address' },
      { id: '7', type: 'date', label: 'Event Date', required: true },
      { id: '8', type: 'number', label: 'Expected Attendance', required: true, placeholder: 'Number of attendees' },
      { id: '9', type: 'select', label: 'Event Type', required: true, options: ['Wedding', 'Concert', 'Festival', 'Conference', 'Sports Event'] },
      { id: '10', type: 'radio', label: 'Alcohol Served', required: true, options: ['Yes', 'No'] },
      { id: '11', type: 'checkbox', label: 'Coverage Types', required: true, options: ['General Liability', 'Property Damage', 'Cancellation', 'Weather'] }
    ]
  },
  {
    id: 'ins-19',
    name: 'Directors and Officers Insurance',
    description: 'Apply for D&O liability insurance for executives',
    category: 'Application',
    sector: 'Insurance',
    tags: ['Insurance', 'Directors', 'Officers', 'Liability'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Legal company name' },
      { id: '2', type: 'text', label: 'Contact Person', required: true, placeholder: 'Primary contact' },
      { id: '3', type: 'email', label: 'Email Address', required: true, placeholder: 'contact@company.com' },
      { id: '4', type: 'select', label: 'Company Type', required: true, options: ['Public', 'Private', 'Non-Profit'] },
      { id: '5', type: 'number', label: 'Annual Revenue', required: true, placeholder: 'Annual company revenue' },
      { id: '6', type: 'number', label: 'Number of Directors', required: true, placeholder: 'Board of directors count' },
      { id: '7', type: 'number', label: 'Number of Officers', required: true, placeholder: 'Company officers count' },
      { id: '8', type: 'select', label: 'Coverage Limit', required: true, options: ['$1M', '$5M', '$10M', '$25M', '$50M+'] },
      { id: '9', type: 'radio', label: 'Previous Claims', required: true, options: ['Yes', 'No'] },
      { id: '10', type: 'radio', label: 'SEC Filings', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'ins-20',
    name: 'Aviation Insurance Application',
    description: 'Apply for aircraft insurance coverage',
    category: 'Application',
    sector: 'Insurance',
    tags: ['Insurance', 'Aviation', 'Aircraft', 'Application'],
    fields: [
      { id: '1', type: 'text', label: 'Aircraft Owner', required: true, placeholder: 'Owner name/organization' },
      { id: '2', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '3', type: 'email', label: 'Email Address', required: true, placeholder: 'owner@email.com' },
      { id: '4', type: 'text', label: 'Aircraft Make', required: true, placeholder: 'Manufacturer' },
      { id: '5', type: 'text', label: 'Aircraft Model', required: true, placeholder: 'Model designation' },
      { id: '6', type: 'number', label: 'Year Manufactured', required: true, placeholder: 'Year built' },
      { id: '7', type: 'text', label: 'Registration Number', required: true, placeholder: 'Aircraft registration' },
      { id: '8', type: 'number', label: 'Aircraft Value', required: true, placeholder: 'Current market value' },
      { id: '9', type: 'select', label: 'Primary Use', required: true, options: ['Personal', 'Business', 'Commercial', 'Training'] },
      { id: '10', type: 'text', label: 'Pilot Name', required: true, placeholder: 'Primary pilot name' },
      { id: '11', type: 'number', label: 'Pilot Hours', required: true, placeholder: 'Total flight hours' },
      { id: '12', type: 'text', label: 'Storage Location', required: true, placeholder: 'Where aircraft is kept' }
    ]
  }
];

// Fintech Sector Templates - 20 specific templates for financial technology companies
export const fintechTemplates: FormTemplate[] = [
  {
    id: 'fintech-1',
    name: 'Digital Banking Account Opening',
    description: 'Open new digital banking account with KYC verification',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Banking', 'KYC', 'Account'],
    fields: [
      { id: '1', type: 'text', label: 'Full Legal Name', required: true, placeholder: 'Full name as on ID' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '4', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '5', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '6', type: 'textarea', label: 'Home Address', required: true, placeholder: 'Complete residential address' },
      { id: '7', type: 'select', label: 'Employment Status', required: true, options: ['Employed', 'Self-Employed', 'Unemployed', 'Retired', 'Student'] },
      { id: '8', type: 'text', label: 'Employer Name', required: false, placeholder: 'Current employer' },
      { id: '9', type: 'number', label: 'Annual Income', required: true, placeholder: 'Annual gross income' },
      { id: '10', type: 'select', label: 'Account Type', required: true, options: ['Checking', 'Savings', 'Premium', 'Business'] },
      { id: '11', type: 'radio', label: 'US Citizen', required: true, options: ['Yes', 'No'] },
      { id: '12', type: 'file', label: 'Government ID', required: true, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '13', type: 'checkbox', label: 'Agreements', required: true, options: ['Terms of Service', 'Privacy Policy', 'Account Agreement'] }
    ]
  },
  {
    id: 'fintech-2',
    name: 'Loan Application',
    description: 'Apply for personal or business loan through digital platform',
    category: 'Application',
    sector: 'Fintech',
    tags: ['Fintech', 'Loan', 'Credit', 'Application'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '4', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '5', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '6', type: 'select', label: 'Loan Type', required: true, options: ['Personal', 'Business', 'Auto', 'Home', 'Student'] },
      { id: '7', type: 'number', label: 'Loan Amount', required: true, placeholder: 'Requested loan amount' },
      { id: '8', type: 'select', label: 'Loan Purpose', required: true, options: ['Debt Consolidation', 'Home Improvement', 'Business Expansion', 'Emergency', 'Other'] },
      { id: '9', type: 'number', label: 'Annual Income', required: true, placeholder: 'Gross annual income' },
      { id: '10', type: 'select', label: 'Employment Status', required: true, options: ['Full-time', 'Part-time', 'Self-employed', 'Unemployed'] },
      { id: '11', type: 'number', label: 'Years at Current Job', required: true, placeholder: 'Years of employment' },
      { id: '12', type: 'number', label: 'Monthly Expenses', required: true, placeholder: 'Total monthly expenses' },
      { id: '13', type: 'radio', label: 'Own Home', required: true, options: ['Yes', 'No'] },
      { id: '14', type: 'file', label: 'Income Verification', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'fintech-3',
    name: 'Investment Account Setup',
    description: 'Setup investment account for trading and portfolio management',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Investment', 'Trading', 'Portfolio'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Legal full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '4', type: 'email', label: 'Email Address', required: true, placeholder: 'investor@email.com' },
      { id: '5', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '6', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete address' },
      { id: '7', type: 'select', label: 'Account Type', required: true, options: ['Individual', 'Joint', 'IRA', 'Corporate'] },
      { id: '8', type: 'select', label: 'Investment Experience', required: true, options: ['Beginner', 'Intermediate', 'Advanced', 'Professional'] },
      { id: '9', type: 'number', label: 'Net Worth', required: true, placeholder: 'Total net worth' },
      { id: '10', type: 'number', label: 'Liquid Net Worth', required: true, placeholder: 'Liquid assets value' },
      { id: '11', type: 'number', label: 'Annual Income', required: true, placeholder: 'Annual income' },
      { id: '12', type: 'select', label: 'Risk Tolerance', required: true, options: ['Conservative', 'Moderate', 'Aggressive'] },
      { id: '13', type: 'checkbox', label: 'Investment Goals', required: true, options: ['Retirement', 'Growth', 'Income', 'Speculation'] },
      { id: '14', type: 'file', label: 'Identity Verification', required: true, acceptedFileTypes: ['pdf', 'jpg'] }
    ]
  },
  {
    id: 'fintech-4',
    name: 'Cryptocurrency Exchange Registration',
    description: 'Register for cryptocurrency trading platform',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Crypto', 'Exchange', 'Trading'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Legal full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'email', label: 'Email Address', required: true, placeholder: 'crypto@email.com' },
      { id: '4', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '5', type: 'select', label: 'Country of Residence', required: true, options: ['United States', 'Canada', 'United Kingdom', 'Other'] },
      { id: '6', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete residential address' },
      { id: '7', type: 'select', label: 'Trading Experience', required: true, options: ['Beginner', 'Intermediate', 'Advanced'] },
      { id: '8', type: 'number', label: 'Expected Monthly Volume', required: true, placeholder: 'USD trading volume' },
      { id: '9', type: 'checkbox', label: 'Cryptocurrencies of Interest', required: true, options: ['Bitcoin', 'Ethereum', 'Litecoin', 'Ripple', 'Others'] },
      { id: '10', type: 'radio', label: 'Professional Trader', required: true, options: ['Yes', 'No'] },
      { id: '11', type: 'file', label: 'Government ID', required: true, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '12', type: 'file', label: 'Proof of Address', required: true, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '13', type: 'checkbox', label: 'Compliance', required: true, options: ['AML/KYC Agreement', 'Terms of Service', 'Risk Disclosure'] }
    ]
  },
  {
    id: 'fintech-5',
    name: 'Credit Card Application',
    description: 'Apply for credit card with instant approval process',
    category: 'Application',
    sector: 'Fintech',
    tags: ['Fintech', 'Credit Card', 'Application', 'Credit'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Name as it will appear on card' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '4', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '5', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '6', type: 'textarea', label: 'Home Address', required: true, placeholder: 'Complete address' },
      { id: '7', type: 'select', label: 'Housing Status', required: true, options: ['Own', 'Rent', 'Live with Family'] },
      { id: '8', type: 'number', label: 'Monthly Rent/Mortgage', required: true, placeholder: 'Monthly housing payment' },
      { id: '9', type: 'select', label: 'Employment Status', required: true, options: ['Employed', 'Self-Employed', 'Student', 'Retired'] },
      { id: '10', type: 'text', label: 'Employer Name', required: false, placeholder: 'Current employer' },
      { id: '11', type: 'number', label: 'Annual Income', required: true, placeholder: 'Gross annual income' },
      { id: '12', type: 'select', label: 'Card Type', required: true, options: ['Rewards', 'Cash Back', 'Travel', 'Business', 'Student'] },
      { id: '13', type: 'radio', label: 'Previous Bankruptcy', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'fintech-6',
    name: 'Peer-to-Peer Payment Setup',
    description: 'Setup P2P payment account for money transfers',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'P2P', 'Payment', 'Transfer'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Legal full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'date', label: 'Date of Birth', required: true },
      { id: '5', type: 'text', label: 'Social Security Number', required: true, placeholder: 'Last 4 digits: XXXX' },
      { id: '6', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete address' },
      { id: '7', type: 'select', label: 'Primary Use', required: true, options: ['Personal', 'Business', 'Both'] },
      { id: '8', type: 'text', label: 'Bank Name', required: true, placeholder: 'Primary bank' },
      { id: '9', type: 'text', label: 'Account Number', required: true, placeholder: 'Bank account number' },
      { id: '10', type: 'text', label: 'Routing Number', required: true, placeholder: 'Bank routing number' },
      { id: '11', type: 'select', label: 'Account Type', required: true, options: ['Checking', 'Savings'] },
      { id: '12', type: 'radio', label: 'Two-Factor Authentication', required: true, options: ['SMS', 'Email', 'App'] }
    ]
  },
  {
    id: 'fintech-7',
    name: 'Robo-Advisor Portfolio Setup',
    description: 'Setup automated investment portfolio management',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Robo-Advisor', 'Portfolio', 'Investment'],
    fields: [
      { id: '1', type: 'text', label: 'Investor Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'investor@email.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'date', label: 'Date of Birth', required: true },
      { id: '5', type: 'number', label: 'Initial Investment', required: true, placeholder: 'Starting investment amount' },
      { id: '6', type: 'select', label: 'Investment Goal', required: true, options: ['Retirement', 'General Wealth', 'Major Purchase', 'Emergency Fund'] },
      { id: '7', type: 'select', label: 'Time Horizon', required: true, options: ['1-3 years', '3-5 years', '5-10 years', '10+ years'] },
      { id: '8', type: 'select', label: 'Risk Tolerance', required: true, options: ['Conservative', 'Moderate', 'Aggressive'] },
      { id: '9', type: 'number', label: 'Monthly Contribution', required: false, placeholder: 'Monthly investment amount' },
      { id: '10', type: 'radio', label: 'Tax-Loss Harvesting', required: true, options: ['Yes', 'No'] },
      { id: '11', type: 'checkbox', label: 'Investment Preferences', required: false, options: ['ESG Funds', 'Dividend Stocks', 'Index Funds', 'International'] }
    ]
  },
  {
    id: 'fintech-8',
    name: 'Digital Wallet Registration',
    description: 'Register for digital wallet and mobile payments',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Digital Wallet', 'Mobile', 'Payment'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Legal full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'wallet@email.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'date', label: 'Date of Birth', required: true },
      { id: '5', type: 'select', label: 'Device Type', required: true, options: ['iPhone', 'Android', 'Both'] },
      { id: '6', type: 'text', label: 'Primary Card Number', required: true, placeholder: 'Credit/debit card to add' },
      { id: '7', type: 'text', label: 'Card Expiration', required: true, placeholder: 'MM/YY' },
      { id: '8', type: 'text', label: 'Billing ZIP Code', required: true, placeholder: 'Card billing ZIP' },
      { id: '9', type: 'checkbox', label: 'Wallet Features', required: true, options: ['Contactless Pay', 'Online Shopping', 'P2P Transfers', 'Bill Pay'] },
      { id: '10', type: 'radio', label: 'Biometric Authentication', required: true, options: ['Fingerprint', 'Face ID', 'PIN'] }
    ]
  },
  {
    id: 'fintech-9',
    name: 'SME Business Loan Application',
    description: 'Small business loan application for SMEs',
    category: 'Application',
    sector: 'Fintech',
    tags: ['Fintech', 'SME', 'Business Loan', 'Small Business'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Legal business name' },
      { id: '2', type: 'text', label: 'Business Owner', required: true, placeholder: 'Primary owner name' },
      { id: '3', type: 'text', label: 'Federal EIN', required: true, placeholder: 'Employer ID number' },
      { id: '4', type: 'email', label: 'Business Email', required: true, placeholder: 'business@email.com' },
      { id: '5', type: 'text', label: 'Business Phone', required: true, placeholder: '(555) 123-4567' },
      { id: '6', type: 'textarea', label: 'Business Address', required: true, placeholder: 'Complete business address' },
      { id: '7', type: 'select', label: 'Industry', required: true, options: ['Retail', 'Restaurant', 'Manufacturing', 'Services', 'Technology'] },
      { id: '8', type: 'number', label: 'Years in Business', required: true, placeholder: 'Years operating' },
      { id: '9', type: 'number', label: 'Annual Revenue', required: true, placeholder: 'Annual gross revenue' },
      { id: '10', type: 'number', label: 'Loan Amount', required: true, placeholder: 'Requested loan amount' },
      { id: '11', type: 'select', label: 'Loan Purpose', required: true, options: ['Working Capital', 'Equipment', 'Expansion', 'Inventory', 'Real Estate'] },
      { id: '12', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Total employees' },
      { id: '13', type: 'file', label: 'Financial Statements', required: true, acceptedFileTypes: ['pdf'] },
      { id: '14', type: 'file', label: 'Bank Statements', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'fintech-10',
    name: 'Merchant Payment Processing',
    description: 'Setup merchant account for payment processing',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Merchant', 'Payment Processing', 'Business'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Legal business name' },
      { id: '2', type: 'text', label: 'DBA Name', required: false, placeholder: 'Doing business as' },
      { id: '3', type: 'text', label: 'Owner Name', required: true, placeholder: 'Business owner' },
      { id: '4', type: 'email', label: 'Business Email', required: true, placeholder: 'business@email.com' },
      { id: '5', type: 'text', label: 'Business Phone', required: true, placeholder: '(555) 123-4567' },
      { id: '6', type: 'text', label: 'Federal Tax ID', required: true, placeholder: 'EIN or SSN' },
      { id: '7', type: 'select', label: 'Business Type', required: true, options: ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship'] },
      { id: '8', type: 'select', label: 'Industry', required: true, options: ['Retail', 'E-commerce', 'Restaurant', 'Professional Services', 'Non-profit'] },
      { id: '9', type: 'number', label: 'Monthly Volume', required: true, placeholder: 'Expected monthly processing volume' },
      { id: '10', type: 'number', label: 'Average Transaction', required: true, placeholder: 'Average transaction amount' },
      { id: '11', type: 'checkbox', label: 'Processing Methods', required: true, options: ['Credit Cards', 'Debit Cards', 'ACH', 'Mobile Payments'] },
      { id: '12', type: 'text', label: 'Bank Name', required: true, placeholder: 'Business bank name' },
      { id: '13', type: 'text', label: 'Bank Account Number', required: true, placeholder: 'Deposit account number' }
    ]
  },
  {
    id: 'fintech-11',
    name: 'Buy Now Pay Later Application',
    description: 'Apply for buy now pay later financing options',
    category: 'Application',
    sector: 'Fintech',
    tags: ['Fintech', 'BNPL', 'Financing', 'Credit'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Legal full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'date', label: 'Date of Birth', required: true },
      { id: '5', type: 'text', label: 'Social Security Number', required: true, placeholder: 'Last 4 digits: XXXX' },
      { id: '6', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete address' },
      { id: '7', type: 'number', label: 'Purchase Amount', required: true, placeholder: 'Amount to finance' },
      { id: '8', type: 'text', label: 'Merchant', required: true, placeholder: 'Where you are shopping' },
      { id: '9', type: 'select', label: 'Payment Plan', required: true, options: ['4 payments', '6 payments', '12 payments', '24 payments'] },
      { id: '10', type: 'number', label: 'Annual Income', required: true, placeholder: 'Annual gross income' },
      { id: '11', type: 'select', label: 'Employment Status', required: true, options: ['Employed', 'Self-Employed', 'Student', 'Other'] },
      { id: '12', type: 'text', label: 'Debit Card Number', required: true, placeholder: 'For automatic payments' }
    ]
  },
  {
    id: 'fintech-12',
    name: 'Crowdfunding Campaign Setup',
    description: 'Setup crowdfunding campaign for project or business',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Crowdfunding', 'Campaign', 'Fundraising'],
    fields: [
      { id: '1', type: 'text', label: 'Campaign Creator', required: true, placeholder: 'Your full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'creator@email.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'text', label: 'Campaign Title', required: true, placeholder: 'Campaign name' },
      { id: '5', type: 'textarea', label: 'Campaign Description', required: true, placeholder: 'Describe your project' },
      { id: '6', type: 'number', label: 'Funding Goal', required: true, placeholder: 'Target amount to raise' },
      { id: '7', type: 'select', label: 'Campaign Category', required: true, options: ['Technology', 'Creative', 'Business', 'Social Cause', 'Personal'] },
      { id: '8', type: 'date', label: 'Campaign End Date', required: true },
      { id: '9', type: 'textarea', label: 'Reward Tiers', required: false, placeholder: 'Describe backer rewards' },
      { id: '10', type: 'file', label: 'Campaign Images', required: true, acceptedFileTypes: ['jpg', 'png'] },
      { id: '11', type: 'text', label: 'Bank Account', required: true, placeholder: 'Account for fund deposits' },
      { id: '12', type: 'text', label: 'Tax ID', required: true, placeholder: 'SSN or EIN' }
    ]
  },
  {
    id: 'fintech-13',
    name: 'Micro-Investment Account',
    description: 'Setup micro-investment account for spare change investing',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Micro-Investment', 'Spare Change', 'Investment'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Legal full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'investor@email.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'date', label: 'Date of Birth', required: true },
      { id: '5', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '6', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete address' },
      { id: '7', type: 'select', label: 'Investment Strategy', required: true, options: ['Conservative', 'Moderate', 'Aggressive'] },
      { id: '8', type: 'text', label: 'Linked Card', required: true, placeholder: 'Card for round-up investments' },
      { id: '9', type: 'select', label: 'Round-up Multiplier', required: true, options: ['1x', '2x', '3x', '5x', '10x'] },
      { id: '10', type: 'number', label: 'Monthly Deposit', required: false, placeholder: 'Additional monthly investment' },
      { id: '11', type: 'checkbox', label: 'Investment Goals', required: true, options: ['Emergency Fund', 'Retirement', 'Vacation', 'General Savings'] }
    ]
  },
  {
    id: 'fintech-14',
    name: 'Foreign Exchange Trading',
    description: 'Setup forex trading account for currency exchange',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Forex', 'Currency', 'Trading'],
    fields: [
      { id: '1', type: 'text', label: 'Trader Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'trader@email.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'date', label: 'Date of Birth', required: true },
      { id: '5', type: 'select', label: 'Country of Residence', required: true, options: ['United States', 'Canada', 'United Kingdom', 'Other'] },
      { id: '6', type: 'select', label: 'Trading Experience', required: true, options: ['Beginner', 'Intermediate', 'Advanced', 'Professional'] },
      { id: '7', type: 'number', label: 'Initial Deposit', required: true, placeholder: 'Starting deposit amount' },
      { id: '8', type: 'select', label: 'Account Type', required: true, options: ['Standard', 'Professional', 'VIP'] },
      { id: '9', type: 'checkbox', label: 'Currency Pairs', required: true, options: ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CAD', 'AUD/USD'] },
      { id: '10', type: 'select', label: 'Leverage Preference', required: true, options: ['1:50', '1:100', '1:200', '1:500'] },
      { id: '11', type: 'file', label: 'Identity Verification', required: true, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '12', type: 'checkbox', label: 'Risk Disclosure', required: true, options: ['I understand forex trading risks'] }
    ]
  },
  {
    id: 'fintech-15',
    name: 'Digital Banking for Business',
    description: 'Open business banking account with digital platform',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Business Banking', 'Digital', 'Corporate'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Legal business name' },
      { id: '2', type: 'text', label: 'Authorized Signer', required: true, placeholder: 'Authorized person name' },
      { id: '3', type: 'text', label: 'Federal EIN', required: true, placeholder: 'Employer ID number' },
      { id: '4', type: 'email', label: 'Business Email', required: true, placeholder: 'business@email.com' },
      { id: '5', type: 'text', label: 'Business Phone', required: true, placeholder: '(555) 123-4567' },
      { id: '6', type: 'textarea', label: 'Business Address', required: true, placeholder: 'Complete business address' },
      { id: '7', type: 'select', label: 'Business Structure', required: true, options: ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship'] },
      { id: '8', type: 'select', label: 'Industry', required: true, options: ['Technology', 'Retail', 'Manufacturing', 'Services', 'Healthcare'] },
      { id: '9', type: 'number', label: 'Annual Revenue', required: true, placeholder: 'Expected annual revenue' },
      { id: '10', type: 'number', label: 'Monthly Transactions', required: true, placeholder: 'Expected monthly transactions' },
      { id: '11', type: 'checkbox', label: 'Services Needed', required: true, options: ['ACH Processing', 'Wire Transfers', 'Merchant Services', 'Payroll', 'Lending'] },
      { id: '12', type: 'file', label: 'Articles of Incorporation', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'fintech-16',
    name: 'Personal Financial Management',
    description: 'Setup personal finance management and budgeting tools',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'PFM', 'Budgeting', 'Financial Planning'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Your full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'date', label: 'Date of Birth', required: true },
      { id: '5', type: 'number', label: 'Monthly Income', required: true, placeholder: 'Monthly gross income' },
      { id: '6', type: 'number', label: 'Monthly Expenses', required: true, placeholder: 'Monthly expenses' },
      { id: '7', type: 'checkbox', label: 'Account Types to Link', required: true, options: ['Checking', 'Savings', 'Credit Cards', 'Investments', 'Loans'] },
      { id: '8', type: 'checkbox', label: 'Financial Goals', required: true, options: ['Emergency Fund', 'Debt Payoff', 'Retirement', 'Home Purchase', 'Vacation'] },
      { id: '9', type: 'select', label: 'Budget Method', required: true, options: ['50/30/20', 'Zero-Based', 'Envelope', 'Custom'] },
      { id: '10', type: 'radio', label: 'Credit Score Monitoring', required: true, options: ['Yes', 'No'] },
      { id: '11', type: 'radio', label: 'Investment Tracking', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'fintech-17',
    name: 'Insurance Technology Platform',
    description: 'Setup insurtech platform for digital insurance services',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Insurtech', 'Insurance', 'Digital'],
    fields: [
      { id: '1', type: 'text', label: 'Policyholder Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'date', label: 'Date of Birth', required: true },
      { id: '5', type: 'textarea', label: 'Address', required: true, placeholder: 'Complete address' },
      { id: '6', type: 'checkbox', label: 'Insurance Types', required: true, options: ['Auto', 'Home', 'Life', 'Health', 'Travel'] },
      { id: '7', type: 'select', label: 'Coverage Level', required: true, options: ['Basic', 'Standard', 'Premium'] },
      { id: '8', type: 'number', label: 'Annual Income', required: true, placeholder: 'Annual income' },
      { id: '9', type: 'radio', label: 'Current Insurance', required: true, options: ['Yes', 'No'] },
      { id: '10', type: 'select', label: 'Payment Frequency', required: true, options: ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'] },
      { id: '11', type: 'radio', label: 'Digital Claims', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'fintech-18',
    name: 'RegTech Compliance Setup',
    description: 'Setup regulatory technology compliance monitoring',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'RegTech', 'Compliance', 'Regulatory'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Financial institution name' },
      { id: '2', type: 'text', label: 'Compliance Officer', required: true, placeholder: 'Chief compliance officer' },
      { id: '3', type: 'email', label: 'Contact Email', required: true, placeholder: 'compliance@company.com' },
      { id: '4', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '5', type: 'select', label: 'Institution Type', required: true, options: ['Bank', 'Credit Union', 'Broker-Dealer', 'Investment Advisor', 'Fintech'] },
      { id: '6', type: 'checkbox', label: 'Regulatory Requirements', required: true, options: ['AML/BSA', 'KYC', 'GDPR', 'SOX', 'FINRA', 'SEC'] },
      { id: '7', type: 'number', label: 'Transaction Volume', required: true, placeholder: 'Monthly transaction volume' },
      { id: '8', type: 'number', label: 'Customer Count', required: true, placeholder: 'Total customers' },
      { id: '9', type: 'checkbox', label: 'Monitoring Needs', required: true, options: ['Transaction Monitoring', 'Sanctions Screening', 'PEP Screening', 'Risk Assessment'] },
      { id: '10', type: 'select', label: 'Implementation Timeline', required: true, options: ['Immediate', '30 days', '60 days', '90 days'] }
    ]
  },
  {
    id: 'fintech-19',
    name: 'Blockchain Identity Verification',
    description: 'Setup blockchain-based identity verification system',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Blockchain', 'Identity', 'Verification'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Legal full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'date', label: 'Date of Birth', required: true },
      { id: '5', type: 'text', label: 'Document Number', required: true, placeholder: 'ID document number' },
      { id: '6', type: 'select', label: 'Document Type', required: true, options: ['Passport', 'Drivers License', 'National ID', 'Military ID'] },
      { id: '7', type: 'text', label: 'Wallet Address', required: true, placeholder: 'Blockchain wallet address' },
      { id: '8', type: 'select', label: 'Blockchain Network', required: true, options: ['Ethereum', 'Bitcoin', 'Polygon', 'Solana'] },
      { id: '9', type: 'radio', label: 'Biometric Verification', required: true, options: ['Yes', 'No'] },
      { id: '10', type: 'file', label: 'Identity Document', required: true, acceptedFileTypes: ['pdf', 'jpg'] },
      { id: '11', type: 'checkbox', label: 'Privacy Consent', required: true, options: ['Consent to blockchain storage of identity data'] }
    ]
  },
  {
    id: 'fintech-20',
    name: 'Open Banking API Access',
    description: 'Request access to open banking APIs for financial data',
    category: 'Registration',
    sector: 'Fintech',
    tags: ['Fintech', 'Open Banking', 'API', 'Financial Data'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'API requesting company' },
      { id: '2', type: 'text', label: 'Developer Name', required: true, placeholder: 'Lead developer name' },
      { id: '3', type: 'email', label: 'Contact Email', required: true, placeholder: 'developer@company.com' },
      { id: '4', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '5', type: 'text', label: 'Company Registration', required: true, placeholder: 'Business registration number' },
      { id: '6', type: 'textarea', label: 'Use Case Description', required: true, placeholder: 'Describe intended API usage' },
      { id: '7', type: 'checkbox', label: 'API Endpoints', required: true, options: ['Account Information', 'Payment Initiation', 'Transaction History', 'Balance Inquiry'] },
      { id: '8', type: 'select', label: 'Expected Volume', required: true, options: ['Low (< 1000)', 'Medium (1000-10000)', 'High (10000+)'] },
      { id: '9', type: 'radio', label: 'Production Ready', required: true, options: ['Sandbox Only', 'Production Access'] },
      { id: '10', type: 'file', label: 'Technical Documentation', required: true, acceptedFileTypes: ['pdf'] },
      { id: '11', type: 'checkbox', label: 'Compliance Certifications', required: true, options: ['PCI DSS', 'ISO 27001', 'SOC 2', 'Open Banking Standards'] }
    ]
  }
];

// Health Sector Templates - 20 specific templates for healthcare organizations
export const healthTemplates: FormTemplate[] = [
  {
    id: 'health-1',
    name: 'Patient Registration',
    description: 'New patient registration for healthcare providers',
    category: 'Registration',
    sector: 'Health',
    tags: ['Health', 'Patient', 'Registration', 'Medical'],
    fields: [
      { id: '1', type: 'text', label: 'Patient First Name', required: true, placeholder: 'Patient first name' },
      { id: '2', type: 'text', label: 'Patient Last Name', required: true, placeholder: 'Patient last name' },
      { id: '3', type: 'date', label: 'Date of Birth', required: true },
      { id: '4', type: 'radio', label: 'Gender', required: true, options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
      { id: '5', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '6', type: 'email', label: 'Email Address', required: true, placeholder: 'patient@email.com' },
      { id: '7', type: 'textarea', label: 'Home Address', required: true, placeholder: 'Complete residential address' },
      { id: '8', type: 'text', label: 'Emergency Contact', required: true, placeholder: 'Emergency contact name' },
      { id: '9', type: 'text', label: 'Emergency Phone', required: true, placeholder: 'Emergency contact phone' },
      { id: '10', type: 'text', label: 'Insurance Provider', required: false, placeholder: 'Health insurance company' },
      { id: '11', type: 'text', label: 'Policy Number', required: false, placeholder: 'Insurance policy number' },
      { id: '12', type: 'textarea', label: 'Medical History', required: false, placeholder: 'Brief medical history' },
      { id: '13', type: 'checkbox', label: 'Allergies', required: false, options: ['Food allergies', 'Drug allergies', 'Environmental allergies', 'No known allergies'] },
      { id: '14', type: 'textarea', label: 'Current Medications', required: false, placeholder: 'List current medications' }
    ]
  },
  {
    id: 'health-2',
    name: 'Appointment Booking',
    description: 'Schedule medical appointments with healthcare providers',
    category: 'Appointment',
    sector: 'Health',
    tags: ['Health', 'Appointment', 'Booking', 'Schedule'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Full patient name' },
      { id: '2', type: 'text', label: 'Patient ID', required: true, placeholder: 'Patient ID number' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'select', label: 'Department', required: true, options: ['General Medicine', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Mental Health'] },
      { id: '5', type: 'select', label: 'Doctor Preference', required: false, options: ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'No preference'] },
      { id: '6', type: 'date', label: 'Preferred Date', required: true },
      { id: '7', type: 'select', label: 'Preferred Time', required: true, options: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'] },
      { id: '8', type: 'radio', label: 'Visit Type', required: true, options: ['First visit', 'Follow-up', 'Routine checkup', 'Urgent care'] },
      { id: '9', type: 'textarea', label: 'Reason for Visit', required: true, placeholder: 'Describe symptoms or reason for visit' },
      { id: '10', type: 'radio', label: 'Insurance', required: true, options: ['Will use insurance', 'Self-pay', 'Workers compensation'] }
    ]
  },
  {
    id: 'health-3',
    name: 'Medical History Intake',
    description: 'Comprehensive medical history collection for new patients',
    category: 'Assessment',
    sector: 'Health',
    tags: ['Health', 'Medical History', 'Assessment', 'Intake'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Full patient name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'textarea', label: 'Chief Complaint', required: true, placeholder: 'Main reason for visit' },
      { id: '4', type: 'textarea', label: 'Current Medications', required: false, placeholder: 'List all current medications' },
      { id: '5', type: 'checkbox', label: 'Past Medical History', required: false, options: ['Diabetes', 'High Blood Pressure', 'Heart Disease', 'Cancer', 'Stroke', 'Asthma'] },
      { id: '6', type: 'checkbox', label: 'Surgical History', required: false, options: ['Appendectomy', 'Gallbladder', 'Heart Surgery', 'Orthopedic Surgery', 'Other'] },
      { id: '7', type: 'textarea', label: 'Family History', required: false, placeholder: 'Family medical history' },
      { id: '8', type: 'checkbox', label: 'Social History', required: false, options: ['Tobacco use', 'Alcohol use', 'Drug use', 'Exercise regularly'] },
      { id: '9', type: 'textarea', label: 'Allergies', required: false, placeholder: 'List all known allergies' },
      { id: '10', type: 'text', label: 'Primary Care Doctor', required: false, placeholder: 'Current primary care physician' },
      { id: '11', type: 'textarea', label: 'Review of Systems', required: false, placeholder: 'Any other symptoms or concerns' }
    ]
  },
  {
    id: 'health-4',
    name: 'Insurance Verification',
    description: 'Verify patient insurance coverage and benefits',
    category: 'Verification',
    sector: 'Health',
    tags: ['Health', 'Insurance', 'Verification', 'Benefits'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Insurance Company', required: true, placeholder: 'Health insurance provider' },
      { id: '4', type: 'text', label: 'Policy Number', required: true, placeholder: 'Insurance policy number' },
      { id: '5', type: 'text', label: 'Group Number', required: false, placeholder: 'Group number if applicable' },
      { id: '6', type: 'text', label: 'Subscriber Name', required: true, placeholder: 'Primary policyholder name' },
      { id: '7', type: 'text', label: 'Subscriber ID', required: true, placeholder: 'Subscriber ID number' },
      { id: '8', type: 'select', label: 'Relationship to Subscriber', required: true, options: ['Self', 'Spouse', 'Child', 'Other'] },
      { id: '9', type: 'date', label: 'Effective Date', required: false },
      { id: '10', type: 'text', label: 'Employer', required: false, placeholder: 'Subscriber employer' },
      { id: '11', type: 'radio', label: 'Secondary Insurance', required: true, options: ['Yes', 'No'] },
      { id: '12', type: 'text', label: 'Secondary Insurance Name', required: false, placeholder: 'If secondary insurance' }
    ]
  },
  {
    id: 'health-5',
    name: 'Pre-Surgery Assessment',
    description: 'Pre-operative assessment and clearance form',
    category: 'Assessment',
    sector: 'Health',
    tags: ['Health', 'Surgery', 'Pre-operative', 'Assessment'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Proposed Surgery', required: true, placeholder: 'Type of surgery planned' },
      { id: '4', type: 'text', label: 'Surgeon Name', required: true, placeholder: 'Operating surgeon' },
      { id: '5', type: 'date', label: 'Surgery Date', required: true },
      { id: '6', type: 'textarea', label: 'Current Medications', required: true, placeholder: 'All current medications and dosages' },
      { id: '7', type: 'checkbox', label: 'Medical Conditions', required: false, options: ['Heart Disease', 'High Blood Pressure', 'Diabetes', 'Kidney Disease', 'Lung Disease'] },
      { id: '8', type: 'textarea', label: 'Previous Surgeries', required: false, placeholder: 'List previous surgical procedures' },
      { id: '9', type: 'textarea', label: 'Allergies', required: false, placeholder: 'Drug and other allergies' },
      { id: '10', type: 'radio', label: 'Anesthesia History', required: true, options: ['No problems', 'Previous problems', 'Never had anesthesia'] },
      { id: '11', type: 'checkbox', label: 'Social History', required: false, options: ['Smoking', 'Alcohol use', 'Drug use'] },
      { id: '12', type: 'text', label: 'Emergency Contact', required: true, placeholder: 'Emergency contact person' }
    ]
  },
  {
    id: 'health-6',
    name: 'Discharge Planning',
    description: 'Hospital discharge planning and instructions',
    category: 'Planning',
    sector: 'Health',
    tags: ['Health', 'Discharge', 'Planning', 'Hospital'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'text', label: 'Medical Record Number', required: true, placeholder: 'MRN' },
      { id: '3', type: 'date', label: 'Admission Date', required: true },
      { id: '4', type: 'date', label: 'Discharge Date', required: true },
      { id: '5', type: 'textarea', label: 'Discharge Diagnosis', required: true, placeholder: 'Primary and secondary diagnoses' },
      { id: '6', type: 'textarea', label: 'Discharge Medications', required: true, placeholder: 'Medications to continue at home' },
      { id: '7', type: 'textarea', label: 'Activity Restrictions', required: false, placeholder: 'Physical activity limitations' },
      { id: '8', type: 'textarea', label: 'Diet Instructions', required: false, placeholder: 'Dietary restrictions or recommendations' },
      { id: '9', type: 'text', label: 'Follow-up Appointment', required: false, placeholder: 'Scheduled follow-up details' },
      { id: '10', type: 'select', label: 'Discharge Destination', required: true, options: ['Home', 'Home with Home Health', 'Skilled Nursing Facility', 'Rehabilitation Facility'] },
      { id: '11', type: 'textarea', label: 'Warning Signs', required: true, placeholder: 'When to seek immediate medical attention' },
      { id: '12', type: 'text', label: 'Emergency Contact', required: true, placeholder: 'Who to call in emergency' }
    ]
  },
  {
    id: 'health-7',
    name: 'Mental Health Screening',
    description: 'Mental health assessment and screening questionnaire',
    category: 'Assessment',
    sector: 'Health',
    tags: ['Health', 'Mental Health', 'Screening', 'Psychology'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'textarea', label: 'Reason for Visit', required: true, placeholder: 'Why are you seeking mental health services' },
      { id: '4', type: 'select', label: 'Mood Rating', required: true, options: ['Very Good', 'Good', 'Fair', 'Poor', 'Very Poor'] },
      { id: '5', type: 'checkbox', label: 'Symptoms', required: false, options: ['Depression', 'Anxiety', 'Sleep Problems', 'Mood Swings', 'Concentration Issues'] },
      { id: '6', type: 'radio', label: 'Previous Mental Health Treatment', required: true, options: ['Yes', 'No'] },
      { id: '7', type: 'textarea', label: 'Current Stressors', required: false, placeholder: 'What is causing stress in your life' },
      { id: '8', type: 'radio', label: 'Substance Use', required: true, options: ['Never', 'Occasional', 'Regular', 'Daily'] },
      { id: '9', type: 'radio', label: 'Suicidal Thoughts', required: true, options: ['Never', 'Rarely', 'Sometimes', 'Often'] },
      { id: '10', type: 'textarea', label: 'Support System', required: false, placeholder: 'Describe your family and social support' },
      { id: '11', type: 'checkbox', label: 'Goals for Treatment', required: false, options: ['Reduce Anxiety', 'Improve Mood', 'Better Sleep', 'Relationship Issues', 'Work Stress'] }
    ]
  },
  {
    id: 'health-8',
    name: 'Vaccination Record',
    description: 'Track and record patient vaccination history',
    category: 'Record',
    sector: 'Health',
    tags: ['Health', 'Vaccination', 'Immunization', 'Record'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Patient ID', required: true, placeholder: 'Patient ID number' },
      { id: '4', type: 'select', label: 'Vaccine Type', required: true, options: ['COVID-19', 'Influenza', 'Hepatitis B', 'MMR', 'Tdap', 'Pneumonia'] },
      { id: '5', type: 'text', label: 'Vaccine Brand', required: true, placeholder: 'Manufacturer/brand name' },
      { id: '6', type: 'text', label: 'Lot Number', required: true, placeholder: 'Vaccine lot number' },
      { id: '7', type: 'date', label: 'Date Administered', required: true },
      { id: '8', type: 'text', label: 'Administering Provider', required: true, placeholder: 'Healthcare provider name' },
      { id: '9', type: 'text', label: 'Clinic Location', required: true, placeholder: 'Where vaccine was given' },
      { id: '10', type: 'select', label: 'Injection Site', required: true, options: ['Left Arm', 'Right Arm', 'Left Thigh', 'Right Thigh'] },
      { id: '11', type: 'radio', label: 'Adverse Reactions', required: true, options: ['None', 'Mild', 'Moderate', 'Severe'] },
      { id: '12', type: 'textarea', label: 'Reaction Details', required: false, placeholder: 'If reactions occurred, describe' }
    ]
  },
  {
    id: 'health-9',
    name: 'Lab Test Request',
    description: 'Order laboratory tests and diagnostics',
    category: 'Order',
    sector: 'Health',
    tags: ['Health', 'Laboratory', 'Test', 'Diagnostics'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Medical Record Number', required: true, placeholder: 'MRN' },
      { id: '4', type: 'text', label: 'Ordering Physician', required: true, placeholder: 'Doctor ordering tests' },
      { id: '5', type: 'checkbox', label: 'Blood Tests', required: false, options: ['Complete Blood Count', 'Basic Metabolic Panel', 'Lipid Panel', 'Liver Function', 'Thyroid Function'] },
      { id: '6', type: 'checkbox', label: 'Urine Tests', required: false, options: ['Urinalysis', 'Urine Culture', 'Drug Screen', 'Pregnancy Test'] },
      { id: '7', type: 'checkbox', label: 'Other Tests', required: false, options: ['Blood Culture', 'Stool Culture', 'Strep Test', 'Flu Test', 'COVID Test'] },
      { id: '8', type: 'textarea', label: 'Clinical Information', required: true, placeholder: 'Relevant clinical history and symptoms' },
      { id: '9', type: 'select', label: 'Priority', required: true, options: ['Routine', 'Urgent', 'STAT'] },
      { id: '10', type: 'radio', label: 'Fasting Required', required: true, options: ['Yes', 'No'] },
      { id: '11', type: 'textarea', label: 'Special Instructions', required: false, placeholder: 'Any special collection instructions' }
    ]
  },
  {
    id: 'health-10',
    name: 'Physical Therapy Evaluation',
    description: 'Initial physical therapy assessment and treatment plan',
    category: 'Assessment',
    sector: 'Health',
    tags: ['Health', 'Physical Therapy', 'Evaluation', 'Rehabilitation'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Referring Physician', required: true, placeholder: 'Doctor who referred patient' },
      { id: '4', type: 'textarea', label: 'Chief Complaint', required: true, placeholder: 'Main problem or pain' },
      { id: '5', type: 'date', label: 'Date of Injury', required: false },
      { id: '6', type: 'textarea', label: 'Mechanism of Injury', required: false, placeholder: 'How injury occurred' },
      { id: '7', type: 'select', label: 'Pain Level', required: true, options: ['0 (No Pain)', '1-2 (Mild)', '3-4 (Moderate)', '5-6 (Moderate-Severe)', '7-8 (Severe)', '9-10 (Worst)'] },
      { id: '8', type: 'checkbox', label: 'Functional Limitations', required: false, options: ['Walking', 'Stairs', 'Lifting', 'Reaching', 'Sitting', 'Standing'] },
      { id: '9', type: 'textarea', label: 'Past Medical History', required: false, placeholder: 'Relevant medical history' },
      { id: '10', type: 'textarea', label: 'Current Medications', required: false, placeholder: 'Medications for pain or other conditions' },
      { id: '11', type: 'checkbox', label: 'Treatment Goals', required: true, options: ['Reduce Pain', 'Improve Mobility', 'Increase Strength', 'Return to Work', 'Return to Sports'] },
      { id: '12', type: 'select', label: 'Frequency', required: true, options: ['1x per week', '2x per week', '3x per week', 'Daily'] }
    ]
  },
  {
    id: 'health-11',
    name: 'Telemedicine Consultation',
    description: 'Virtual healthcare consultation setup and intake',
    category: 'Consultation',
    sector: 'Health',
    tags: ['Health', 'Telemedicine', 'Virtual', 'Consultation'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'patient@email.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'date', label: 'Date of Birth', required: true },
      { id: '5', type: 'select', label: 'Consultation Type', required: true, options: ['Follow-up Visit', 'New Problem', 'Medication Review', 'Lab Review', 'Mental Health'] },
      { id: '6', type: 'textarea', label: 'Reason for Visit', required: true, placeholder: 'Describe your symptoms or concerns' },
      { id: '7', type: 'select', label: 'Preferred Date', required: true, options: ['Today', 'Tomorrow', 'This Week', 'Next Week'] },
      { id: '8', type: 'select', label: 'Preferred Time', required: true, options: ['Morning', 'Afternoon', 'Evening'] },
      { id: '9', type: 'select', label: 'Device Type', required: true, options: ['Computer', 'Tablet', 'Smartphone'] },
      { id: '10', type: 'radio', label: 'Internet Connection', required: true, options: ['High Speed', 'Regular', 'Slow'] },
      { id: '11', type: 'radio', label: 'Privacy Confirmed', required: true, options: ['Yes, I have a private space for consultation', 'No, I may have interruptions'] },
      { id: '12', type: 'textarea', label: 'Current Medications', required: false, placeholder: 'List current medications' }
    ]
  },
  {
    id: 'health-12',
    name: 'Medical Records Release',
    description: 'Authorization to release medical records',
    category: 'Authorization',
    sector: 'Health',
    tags: ['Health', 'Medical Records', 'Release', 'Authorization'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '4', type: 'textarea', label: 'Patient Address', required: true, placeholder: 'Complete address' },
      { id: '5', type: 'text', label: 'Records From', required: true, placeholder: 'Healthcare provider releasing records' },
      { id: '6', type: 'text', label: 'Records To', required: true, placeholder: 'Who will receive the records' },
      { id: '7', type: 'checkbox', label: 'Records Requested', required: true, options: ['Complete Medical Record', 'Lab Results', 'X-rays/Imaging', 'Operative Reports', 'Discharge Summaries'] },
      { id: '8', type: 'date', label: 'Date Range From', required: false },
      { id: '9', type: 'date', label: 'Date Range To', required: false },
      { id: '10', type: 'textarea', label: 'Purpose of Release', required: true, placeholder: 'Why records are needed' },
      { id: '11', type: 'select', label: 'Delivery Method', required: true, options: ['Mail', 'Fax', 'Secure Email', 'Pick up in person'] },
      { id: '12', type: 'date', label: 'Expiration Date', required: true },
      { id: '13', type: 'text', label: 'Patient Signature', required: true, placeholder: 'Digital signature or typed name' }
    ]
  },
  {
    id: 'health-13',
    name: 'Prescription Refill Request',
    description: 'Request refill for existing prescription medications',
    category: 'Request',
    sector: 'Health',
    tags: ['Health', 'Prescription', 'Refill', 'Medication'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'text', label: 'Medication Name', required: true, placeholder: 'Name of medication' },
      { id: '5', type: 'text', label: 'Dosage', required: true, placeholder: 'Medication strength' },
      { id: '6', type: 'text', label: 'Prescribing Doctor', required: true, placeholder: 'Doctor who prescribed medication' },
      { id: '7', type: 'text', label: 'Pharmacy Name', required: true, placeholder: 'Preferred pharmacy' },
      { id: '8', type: 'text', label: 'Pharmacy Phone', required: true, placeholder: 'Pharmacy phone number' },
      { id: '9', type: 'date', label: 'Last Refill Date', required: false },
      { id: '10', type: 'select', label: 'Quantity Needed', required: true, options: ['30 days', '60 days', '90 days'] },
      { id: '11', type: 'radio', label: 'Generic Acceptable', required: true, options: ['Yes', 'No', 'Doctor decides'] },
      { id: '12', type: 'textarea', label: 'Additional Notes', required: false, placeholder: 'Any special instructions or concerns' }
    ]
  },
  {
    id: 'health-14',
    name: 'Dental Examination Form',
    description: 'Comprehensive dental examination and treatment planning',
    category: 'Assessment',
    sector: 'Health',
    tags: ['Health', 'Dental', 'Examination', 'Oral Health'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'textarea', label: 'Chief Complaint', required: true, placeholder: 'Main dental concern' },
      { id: '5', type: 'date', label: 'Last Dental Visit', required: false },
      { id: '6', type: 'select', label: 'Pain Level', required: false, options: ['No Pain', 'Mild', 'Moderate', 'Severe'] },
      { id: '7', type: 'checkbox', label: 'Dental History', required: false, options: ['Previous Cavities', 'Gum Disease', 'Root Canals', 'Extractions', 'Orthodontics'] },
      { id: '8', type: 'radio', label: 'Brush Frequency', required: true, options: ['Once daily', 'Twice daily', 'After meals', 'Rarely'] },
      { id: '9', type: 'radio', label: 'Floss Frequency', required: true, options: ['Daily', 'Weekly', 'Rarely', 'Never'] },
      { id: '10', type: 'checkbox', label: 'Oral Habits', required: false, options: ['Tobacco Use', 'Grinding/Clenching', 'Nail Biting', 'Ice Chewing'] },
      { id: '11', type: 'textarea', label: 'Medical Conditions', required: false, placeholder: 'Medical conditions affecting dental care' },
      { id: '12', type: 'textarea', label: 'Current Medications', required: false, placeholder: 'All current medications' }
    ]
  },
  {
    id: 'health-15',
    name: 'Emergency Department Triage',
    description: 'Emergency department patient triage and priority assessment',
    category: 'Assessment',
    sector: 'Health',
    tags: ['Health', 'Emergency', 'Triage', 'Urgent Care'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Time of Arrival', required: true, placeholder: 'HH:MM' },
      { id: '4', type: 'textarea', label: 'Chief Complaint', required: true, placeholder: 'Why patient came to ER' },
      { id: '5', type: 'select', label: 'Pain Level', required: true, options: ['0 (No Pain)', '1-3 (Mild)', '4-6 (Moderate)', '7-10 (Severe)'] },
      { id: '6', type: 'text', label: 'Vital Signs - Temperature', required: true, placeholder: 'Temperature in F' },
      { id: '7', type: 'text', label: 'Vital Signs - Blood Pressure', required: true, placeholder: 'Systolic/Diastolic' },
      { id: '8', type: 'text', label: 'Vital Signs - Heart Rate', required: true, placeholder: 'Beats per minute' },
      { id: '9', type: 'text', label: 'Vital Signs - Respiratory Rate', required: true, placeholder: 'Breaths per minute' },
      { id: '10', type: 'select', label: 'Triage Level', required: true, options: ['Level 1 (Immediate)', 'Level 2 (Emergent)', 'Level 3 (Urgent)', 'Level 4 (Less Urgent)', 'Level 5 (Non-urgent)'] },
      { id: '11', type: 'checkbox', label: 'Symptoms', required: false, options: ['Chest Pain', 'Shortness of Breath', 'Severe Bleeding', 'Altered Mental Status', 'Severe Pain'] },
      { id: '12', type: 'textarea', label: 'Allergies', required: false, placeholder: 'Known allergies' }
    ]
  },
  {
    id: 'health-16',
    name: 'Home Health Care Assessment',
    description: 'Assessment for home healthcare services and needs',
    category: 'Assessment',
    sector: 'Health',
    tags: ['Health', 'Home Care', 'Assessment', 'Services'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'textarea', label: 'Home Address', required: true, placeholder: 'Complete home address' },
      { id: '4', type: 'text', label: 'Emergency Contact', required: true, placeholder: 'Emergency contact name and phone' },
      { id: '5', type: 'text', label: 'Primary Care Doctor', required: true, placeholder: 'Primary physician name' },
      { id: '6', type: 'textarea', label: 'Reason for Home Care', required: true, placeholder: 'Why home care is needed' },
      { id: '7', type: 'checkbox', label: 'Services Needed', required: true, options: ['Skilled Nursing', 'Physical Therapy', 'Occupational Therapy', 'Speech Therapy', 'Home Health Aide'] },
      { id: '8', type: 'select', label: 'Frequency', required: true, options: ['Daily', '3x per week', '2x per week', 'Weekly', 'As needed'] },
      { id: '9', type: 'checkbox', label: 'Activities of Daily Living', required: false, options: ['Bathing', 'Dressing', 'Meal Preparation', 'Medication Management', 'Transportation'] },
      { id: '10', type: 'radio', label: 'Lives Alone', required: true, options: ['Yes', 'No'] },
      { id: '11', type: 'textarea', label: 'Safety Concerns', required: false, placeholder: 'Home safety issues or concerns' },
      { id: '12', type: 'text', label: 'Insurance Provider', required: true, placeholder: 'Health insurance company' }
    ]
  },
  {
    id: 'health-17',
    name: 'Pediatric Well-Child Visit',
    description: 'Regular pediatric checkup and developmental assessment',
    category: 'Assessment',
    sector: 'Health',
    tags: ['Health', 'Pediatric', 'Well-Child', 'Development'],
    fields: [
      { id: '1', type: 'text', label: 'Child Name', required: true, placeholder: 'Child full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Parent/Guardian Name', required: true, placeholder: 'Primary caregiver name' },
      { id: '4', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '5', type: 'text', label: 'Weight', required: true, placeholder: 'Current weight' },
      { id: '6', type: 'text', label: 'Height', required: true, placeholder: 'Current height' },
      { id: '7', type: 'text', label: 'Head Circumference', required: false, placeholder: 'For infants/toddlers' },
      { id: '8', type: 'checkbox', label: 'Developmental Milestones', required: false, options: ['Sitting up', 'Walking', 'Talking', 'Potty trained', 'Reading'] },
      { id: '9', type: 'checkbox', label: 'Immunizations Due', required: false, options: ['MMR', 'Dtap', 'Polio', 'Flu', 'COVID-19'] },
      { id: '10', type: 'textarea', label: 'Parent Concerns', required: false, placeholder: 'Any concerns about child development' },
      { id: '11', type: 'select', label: 'School Performance', required: false, options: ['Excellent', 'Good', 'Average', 'Below Average', 'Not in school'] },
      { id: '12', type: 'checkbox', label: 'Social Development', required: false, options: ['Plays well with others', 'Shares toys', 'Follows rules', 'Shows empathy'] }
    ]
  },
  {
    id: 'health-18',
    name: 'Chronic Disease Management',
    description: 'Ongoing management plan for chronic health conditions',
    category: 'Management',
    sector: 'Health',
    tags: ['Health', 'Chronic Disease', 'Management', 'Care Plan'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'select', label: 'Primary Condition', required: true, options: ['Diabetes', 'Hypertension', 'Heart Disease', 'COPD', 'Arthritis', 'Depression'] },
      { id: '4', type: 'date', label: 'Date of Diagnosis', required: true },
      { id: '5', type: 'textarea', label: 'Current Medications', required: true, placeholder: 'All medications with dosages' },
      { id: '6', type: 'select', label: 'Medication Compliance', required: true, options: ['Always', 'Usually', 'Sometimes', 'Rarely', 'Never'] },
      { id: '7', type: 'textarea', label: 'Symptoms', required: false, placeholder: 'Current symptoms or concerns' },
      { id: '8', type: 'text', label: 'Last Lab Results', required: false, placeholder: 'Recent test results' },
      { id: '9', type: 'select', label: 'Exercise Frequency', required: true, options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never'] },
      { id: '10', type: 'select', label: 'Diet Compliance', required: true, options: ['Excellent', 'Good', 'Fair', 'Poor'] },
      { id: '11', type: 'text', label: 'Blood Pressure', required: false, placeholder: 'Most recent BP reading' },
      { id: '12', type: 'textarea', label: 'Treatment Goals', required: true, placeholder: 'Short and long-term health goals' }
    ]
  },
  {
    id: 'health-19',
    name: 'Surgical Consent Form',
    description: 'Informed consent for surgical procedures',
    category: 'Consent',
    sector: 'Health',
    tags: ['Health', 'Surgical', 'Consent', 'Informed Consent'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Surgeon Name', required: true, placeholder: 'Operating surgeon' },
      { id: '4', type: 'textarea', label: 'Procedure Description', required: true, placeholder: 'Detailed description of surgical procedure' },
      { id: '5', type: 'date', label: 'Surgery Date', required: true },
      { id: '6', type: 'textarea', label: 'Indication for Surgery', required: true, placeholder: 'Medical reason for surgery' },
      { id: '7', type: 'textarea', label: 'Risks and Complications', required: true, placeholder: 'Potential risks explained to patient' },
      { id: '8', type: 'textarea', label: 'Alternative Treatments', required: true, placeholder: 'Other treatment options discussed' },
      { id: '9', type: 'textarea', label: 'Benefits of Surgery', required: true, placeholder: 'Expected benefits and outcomes' },
      { id: '10', type: 'radio', label: 'Anesthesia Consent', required: true, options: ['General Anesthesia', 'Regional Anesthesia', 'Local Anesthesia'] },
      { id: '11', type: 'checkbox', label: 'Patient Understanding', required: true, options: ['I understand the procedure', 'I understand the risks', 'I understand alternatives', 'All questions answered'] },
      { id: '12', type: 'text', label: 'Patient Signature', required: true, placeholder: 'Patient signature or consent' },
      { id: '13', type: 'text', label: 'Witness Signature', required: true, placeholder: 'Witness to consent process' }
    ]
  },
  {
    id: 'health-20',
    name: 'Hospital Admission Assessment',
    description: 'Comprehensive admission assessment for hospital patients',
    category: 'Assessment',
    sector: 'Health',
    tags: ['Health', 'Hospital', 'Admission', 'Assessment'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true, placeholder: 'Patient full name' },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'date', label: 'Admission Date', required: true },
      { id: '4', type: 'text', label: 'Admitting Physician', required: true, placeholder: 'Doctor admitting patient' },
      { id: '5', type: 'textarea', label: 'Reason for Admission', required: true, placeholder: 'Primary reason for hospitalization' },
      { id: '6', type: 'textarea', label: 'Current Medications', required: true, placeholder: 'All home medications' },
      { id: '7', type: 'textarea', label: 'Allergies', required: false, placeholder: 'Drug and food allergies' },
      { id: '8', type: 'textarea', label: 'Medical History', required: true, placeholder: 'Significant past medical history' },
      { id: '9', type: 'text', label: 'Emergency Contact', required: true, placeholder: 'Name and phone of emergency contact' },
      { id: '10', type: 'select', label: 'Admission Type', required: true, options: ['Emergency', 'Scheduled', 'Transfer', 'Observation'] },
      { id: '11', type: 'checkbox', label: 'Advance Directives', required: false, options: ['Living Will', 'Healthcare Proxy', 'DNR Order', 'None'] },
      { id: '12', type: 'text', label: 'Insurance Information', required: true, placeholder: 'Primary insurance provider' },
      { id: '13', type: 'textarea', label: 'Social History', required: false, placeholder: 'Living situation, support system' },
      { id: '14', type: 'select', label: 'Functional Status', required: true, options: ['Independent', 'Needs Assistance', 'Dependent', 'Bedridden'] }
    ]
  }
];

// Multi-Sector Templates - Templates useful across multiple sectors
export const multiSectorTemplates: FormTemplate[] = [
  {
    id: 'multi-1',
    name: 'Customer Satisfaction Survey',
    description: 'Comprehensive customer satisfaction and feedback survey',
    category: 'Survey',
    sector: 'Multi-Sector',
    tags: ['Multi-Sector', 'Customer', 'Satisfaction', 'Feedback'],
    fields: [
      { id: '1', type: 'text', label: 'Customer Name', required: false, placeholder: 'Your name (optional)' },
      { id: '2', type: 'email', label: 'Email Address', required: false, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'select', label: 'Service/Product Used', required: true, options: ['Product A', 'Product B', 'Service A', 'Service B', 'Other'] },
      { id: '4', type: 'select', label: 'Overall Satisfaction', required: true, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
      { id: '5', type: 'select', label: 'Quality Rating', required: true, options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'] },
      { id: '6', type: 'select', label: 'Value for Money', required: true, options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'] },
      { id: '7', type: 'select', label: 'Customer Service Rating', required: true, options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'] },
      { id: '8', type: 'radio', label: 'Would Recommend', required: true, options: ['Definitely Yes', 'Probably Yes', 'Neutral', 'Probably No', 'Definitely No'] },
      { id: '9', type: 'textarea', label: 'What did you like most', required: false, placeholder: 'Tell us what you liked' },
      { id: '10', type: 'textarea', label: 'Areas for Improvement', required: false, placeholder: 'How can we improve' },
      { id: '11', type: 'radio', label: 'Likelihood to Purchase Again', required: true, options: ['Very Likely', 'Likely', 'Neutral', 'Unlikely', 'Very Unlikely'] }
    ]
  },
  {
    id: 'multi-2',
    name: 'Employee Onboarding Form',
    description: 'New employee onboarding and information collection',
    category: 'Registration',
    sector: 'Multi-Sector',
    tags: ['Multi-Sector', 'Employee', 'Onboarding', 'HR'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Employee full name' },
      { id: '2', type: 'email', label: 'Personal Email', required: true, placeholder: 'personal@email.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'date', label: 'Date of Birth', required: true },
      { id: '5', type: 'textarea', label: 'Home Address', required: true, placeholder: 'Complete home address' },
      { id: '6', type: 'text', label: 'Social Security Number', required: true, placeholder: 'XXX-XX-XXXX' },
      { id: '7', type: 'text', label: 'Position Title', required: true, placeholder: 'Job title' },
      { id: '8', type: 'text', label: 'Department', required: true, placeholder: 'Department name' },
      { id: '9', type: 'date', label: 'Start Date', required: true },
      { id: '10', type: 'text', label: 'Manager Name', required: true, placeholder: 'Direct supervisor' },
      { id: '11', type: 'text', label: 'Emergency Contact', required: true, placeholder: 'Emergency contact name and phone' },
      { id: '12', type: 'checkbox', label: 'Benefits Enrollment', required: false, options: ['Health Insurance', 'Dental Insurance', '401k Plan', 'Life Insurance'] },
      { id: '13', type: 'file', label: 'Required Documents', required: true, acceptedFileTypes: ['pdf', 'jpg'] }
    ]
  },
  {
    id: 'multi-3',
    name: 'Event Registration',
    description: 'General event registration and attendee information',
    category: 'Registration',
    sector: 'Multi-Sector',
    tags: ['Multi-Sector', 'Event', 'Registration', 'Attendee'],
    fields: [
      { id: '1', type: 'text', label: 'Attendee Name', required: true, placeholder: 'Full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'text', label: 'Organization', required: false, placeholder: 'Company or organization' },
      { id: '5', type: 'text', label: 'Job Title', required: false, placeholder: 'Your position' },
      { id: '6', type: 'select', label: 'Registration Type', required: true, options: ['Regular', 'Student', 'Senior', 'Group', 'VIP'] },
      { id: '7', type: 'checkbox', label: 'Sessions to Attend', required: false, options: ['Opening Keynote', 'Workshop A', 'Workshop B', 'Panel Discussion', 'Networking'] },
      { id: '8', type: 'select', label: 'Meal Preference', required: false, options: ['Regular', 'Vegetarian', 'Vegan', 'Gluten-Free', 'No Meal'] },
      { id: '9', type: 'textarea', label: 'Dietary Restrictions', required: false, placeholder: 'Any food allergies or restrictions' },
      { id: '10', type: 'radio', label: 'T-Shirt Size', required: false, options: ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large'] },
      { id: '11', type: 'textarea', label: 'Special Accommodations', required: false, placeholder: 'Any accessibility needs' }
    ]
  },
  {
    id: 'multi-4',
    name: 'Vendor Application',
    description: 'Application to become approved vendor or supplier',
    category: 'Application',
    sector: 'Multi-Sector',
    tags: ['Multi-Sector', 'Vendor', 'Supplier', 'Application'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Legal company name' },
      { id: '2', type: 'text', label: 'Contact Person', required: true, placeholder: 'Primary contact name' },
      { id: '3', type: 'email', label: 'Contact Email', required: true, placeholder: 'contact@company.com' },
      { id: '4', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '5', type: 'textarea', label: 'Company Address', required: true, placeholder: 'Complete business address' },
      { id: '6', type: 'text', label: 'Federal Tax ID', required: true, placeholder: 'EIN number' },
      { id: '7', type: 'select', label: 'Business Type', required: true, options: ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship'] },
      { id: '8', type: 'number', label: 'Years in Business', required: true, placeholder: 'Years operating' },
      { id: '9', type: 'textarea', label: 'Products/Services Offered', required: true, placeholder: 'Describe your offerings' },
      { id: '10', type: 'checkbox', label: 'Certifications', required: false, options: ['ISO 9001', 'Minority Owned', 'Woman Owned', 'Veteran Owned', 'Small Business'] },
      { id: '11', type: 'file', label: 'Business License', required: true, acceptedFileTypes: ['pdf'] },
      { id: '12', type: 'file', label: 'Insurance Certificate', required: true, acceptedFileTypes: ['pdf'] },
      { id: '13', type: 'textarea', label: 'References', required: true, placeholder: 'Three business references with contact info' }
    ]
  },
  {
    id: 'multi-5',
    name: 'Complaint/Feedback Form',
    description: 'Customer complaint and feedback submission form',
    category: 'Complaint',
    sector: 'Multi-Sector',
    tags: ['Multi-Sector', 'Complaint', 'Feedback', 'Customer Service'],
    fields: [
      { id: '1', type: 'text', label: 'Your Name', required: true, placeholder: 'Full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: false, placeholder: '(555) 123-4567' },
      { id: '4', type: 'select', label: 'Type of Feedback', required: true, options: ['Complaint', 'Suggestion', 'Compliment', 'General Feedback'] },
      { id: '5', type: 'select', label: 'Department/Service', required: true, options: ['Customer Service', 'Sales', 'Billing', 'Technical Support', 'General'] },
      { id: '6', type: 'date', label: 'Date of Incident', required: false },
      { id: '7', type: 'textarea', label: 'Description', required: true, placeholder: 'Detailed description of your feedback' },
      { id: '8', type: 'select', label: 'Priority Level', required: true, options: ['Low', 'Medium', 'High', 'Urgent'] },
      { id: '9', type: 'textarea', label: 'Resolution Desired', required: false, placeholder: 'How would you like this resolved' },
      { id: '10', type: 'radio', label: 'Preferred Contact Method', required: true, options: ['Email', 'Phone', 'Mail'] },
      { id: '11', type: 'file', label: 'Supporting Documents', required: false, acceptedFileTypes: ['pdf', 'jpg', 'png'] }
    ]
  },
  {
    id: 'multi-6',
    name: 'Data Privacy Consent',
    description: 'GDPR compliant data privacy and consent form',
    category: 'Consent',
    sector: 'Multi-Sector',
    tags: ['Multi-Sector', 'Privacy', 'GDPR', 'Consent'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true, placeholder: 'Your full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'date', label: 'Date of Birth', required: false },
      { id: '4', type: 'text', label: 'Phone Number', required: false, placeholder: '(555) 123-4567' },
      { id: '5', type: 'checkbox', label: 'Data Processing Consent', required: true, options: ['I consent to processing of personal data for service provision'] },
      { id: '6', type: 'checkbox', label: 'Marketing Communications', required: false, options: ['I consent to receive marketing emails', 'I consent to receive promotional SMS', 'I consent to phone marketing calls'] },
      { id: '7', type: 'checkbox', label: 'Data Sharing', required: false, options: ['I consent to sharing data with trusted partners', 'I consent to anonymized data for research'] },
      { id: '8', type: 'checkbox', label: 'Cookie Consent', required: false, options: ['Essential cookies', 'Analytics cookies', 'Marketing cookies'] },
      { id: '9', type: 'radio', label: 'Right to be Forgotten', required: true, options: ['I understand my right to data deletion', 'I do not wish to exercise this right currently'] },
      { id: '10', type: 'checkbox', label: 'Terms Agreement', required: true, options: ['I have read and agree to the Privacy Policy', 'I have read and agree to Terms of Service'] }
    ]
  },
  {
    id: 'multi-7',
    name: 'Training Registration',
    description: 'Register for professional training and development programs',
    category: 'Registration',
    sector: 'Multi-Sector',
    tags: ['Multi-Sector', 'Training', 'Professional Development', 'Education'],
    fields: [
      { id: '1', type: 'text', label: 'Participant Name', required: true, placeholder: 'Full name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'your.email@domain.com' },
      { id: '3', type: 'text', label: 'Phone Number', required: true, placeholder: '(555) 123-4567' },
      { id: '4', type: 'text', label: 'Organization', required: true, placeholder: 'Company or organization' },
      { id: '5', type: 'text', label: 'Job Title', required: true, placeholder: 'Current position' },
      { id: '6', type: 'select', label: 'Training Program', required: true, options: ['Leadership Development', 'Technical Skills', 'Safety Training', 'Compliance Training', 'Soft Skills'] },
      { id: '7', type: 'select', label: 'Experience Level', required: true, options: ['Beginner', 'Intermediate', 'Advanced'] },
      { id: '8', type: 'checkbox', label: 'Training Modules', required: true, options: ['Module 1: Basics', 'Module 2: Intermediate', 'Module 3: Advanced', 'Module 4: Practical'] },
      { id: '9', type: 'select', label: 'Preferred Format', required: true, options: ['In-Person', 'Virtual', 'Hybrid', 'Self-Paced Online'] },
      { id: '10', type: 'textarea', label: 'Learning Objectives', required: false, placeholder: 'What do you hope to achieve' },
      { id: '11', type: 'radio', label: 'Certification Needed', required: true, options: ['Yes', 'No'] }
    ]
  },
  {
    id: 'multi-8',
    name: 'Security Incident Report',
    description: 'Report security incidents and breaches across any sector',
    category: 'Incident',
    sector: 'Multi-Sector',
    tags: ['Multi-Sector', 'Security', 'Incident', 'Report'],
    fields: [
      { id: '1', type: 'text', label: 'Reporter Name', required: true, placeholder: 'Person reporting incident' },
      { id: '2', type: 'email', label: 'Reporter Email', required: true, placeholder: 'reporter@email.com' },
      { id: '3', type: 'text', label: 'Organization', required: true, placeholder: 'Company or department' },
      { id: '4', type: 'date', label: 'Incident Date', required: true },
      { id: '5', type: 'text', label: 'Incident Time', required: true, placeholder: 'HH:MM' },
      { id: '6', type: 'select', label: 'Incident Type', required: true, options: ['Data Breach', 'Unauthorized Access', 'Malware', 'Phishing', 'Physical Security', 'Other'] },
      { id: '7', type: 'select', label: 'Severity Level', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
      { id: '8', type: 'textarea', label: 'Incident Description', required: true, placeholder: 'Detailed description of what happened' },
      { id: '9', type: 'textarea', label: 'Systems Affected', required: false, placeholder: 'Which systems or data were affected' },
      { id: '10', type: 'textarea', label: 'Immediate Actions Taken', required: false, placeholder: 'What was done immediately' },
      { id: '11', type: 'radio', label: 'Authorities Notified', required: true, options: ['Yes', 'No', 'Not Required'] },
      { id: '12', type: 'file', label: 'Supporting Evidence', required: false, acceptedFileTypes: ['pdf', 'jpg', 'png'] }
    ]
  },
  {
    id: 'multi-9',
    name: 'Quality Assurance Audit',
    description: 'Quality assurance and compliance audit form',
    category: 'Audit',
    sector: 'Multi-Sector',
    tags: ['Multi-Sector', 'Quality', 'Audit', 'Compliance'],
    fields: [
      { id: '1', type: 'text', label: 'Auditor Name', required: true, placeholder: 'Lead auditor name' },
      { id: '2', type: 'text', label: 'Organization Audited', required: true, placeholder: 'Organization being audited' },
      { id: '3', type: 'date', label: 'Audit Date', required: true },
      { id: '4', type: 'select', label: 'Audit Type', required: true, options: ['Internal', 'External', 'Compliance', 'Quality', 'Safety'] },
      { id: '5', type: 'select', label: 'Audit Scope', required: true, options: ['Full Organization', 'Department', 'Process', 'Product', 'Service'] },
      { id: '6', type: 'textarea', label: 'Audit Objectives', required: true, placeholder: 'What is being evaluated' },
      { id: '7', type: 'checkbox', label: 'Standards Evaluated', required: true, options: ['ISO 9001', 'ISO 14001', 'OSHA', 'FDA', 'Industry Specific'] },
      { id: '8', type: 'textarea', label: 'Key Findings', required: true, placeholder: 'Summary of audit findings' },
      { id: '9', type: 'select', label: 'Overall Rating', required: true, options: ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement', 'Unsatisfactory'] },
      { id: '10', type: 'textarea', label: 'Non-Conformities', required: false, placeholder: 'Issues that need correction' },
      { id: '11', type: 'textarea', label: 'Recommendations', required: false, placeholder: 'Recommendations for improvement' },
      { id: '12', type: 'date', label: 'Follow-up Date', required: false }
    ]
  },
  {
    id: 'multi-10',
    name: 'Risk Assessment Form',
    description: 'Comprehensive risk assessment and mitigation planning',
    category: 'Assessment',
    sector: 'Multi-Sector',
    tags: ['Multi-Sector', 'Risk', 'Assessment', 'Management'],
    fields: [
      { id: '1', type: 'text', label: 'Assessor Name', required: true, placeholder: 'Person conducting assessment' },
      { id: '2', type: 'text', label: 'Department/Area', required: true, placeholder: 'Area being assessed' },
      { id: '3', type: 'date', label: 'Assessment Date', required: true },
      { id: '4', type: 'select', label: 'Risk Category', required: true, options: ['Safety', 'Financial', 'Operational', 'Compliance', 'Cyber Security', 'Environmental'] },
      { id: '5', type: 'textarea', label: 'Risk Description', required: true, placeholder: 'Describe the identified risk' },
      { id: '6', type: 'select', label: 'Probability', required: true, options: ['Very Low', 'Low', 'Medium', 'High', 'Very High'] },
      { id: '7', type: 'select', label: 'Impact Level', required: true, options: ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic'] },
      { id: '8', type: 'select', label: 'Risk Level', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
      { id: '9', type: 'textarea', label: 'Current Controls', required: false, placeholder: 'Existing risk controls' },
      { id: '10', type: 'textarea', label: 'Mitigation Actions', required: true, placeholder: 'Proposed actions to reduce risk' },
      { id: '11', type: 'text', label: 'Responsible Person', required: true, placeholder: 'Who will implement actions' },
      { id: '12', type: 'date', label: 'Target Completion', required: true }
    ]
  }
];

// Energy Sector Templates - 20 specific templates for energy companies
export const energyTemplates: FormTemplate[] = [
  {
    id: 'energy-1',
    name: 'Solar Installation Assessment',
    description: 'Evaluate property for solar panel installation feasibility',
    category: 'Assessment',
    sector: 'Energy',
    tags: ['Energy', 'Solar', 'Installation', 'Assessment'],
    fields: [
      { id: '1', type: 'text', label: 'Property Owner', required: true, placeholder: 'Full name' },
      { id: '2', type: 'textarea', label: 'Property Address', required: true, placeholder: 'Complete address' },
      { id: '3', type: 'select', label: 'Property Type', required: true, options: ['Residential', 'Commercial', 'Industrial'] },
      { id: '4', type: 'number', label: 'Roof Area (sq ft)', required: true, placeholder: 'Available roof space' },
      { id: '5', type: 'select', label: 'Roof Type', required: true, options: ['Asphalt Shingle', 'Metal', 'Tile', 'Flat', 'Other'] },
      { id: '6', type: 'select', label: 'Roof Age', required: true, options: ['0-5 years', '6-10 years', '11-20 years', '20+ years'] },
      { id: '7', type: 'number', label: 'Monthly Electric Bill', required: true, placeholder: 'Average monthly cost' },
      { id: '8', type: 'select', label: 'Shading Concerns', required: true, options: ['None', 'Minimal', 'Moderate', 'Significant'] },
      { id: '9', type: 'checkbox', label: 'Goals', required: true, options: ['Reduce Bills', 'Environmental Impact', 'Energy Independence', 'Increase Property Value'] }
    ]
  },
  {
    id: 'energy-2',
    name: 'Wind Energy Site Assessment',
    description: 'Evaluate location for wind energy project development',
    category: 'Assessment',
    sector: 'Energy',
    tags: ['Energy', 'Wind', 'Site', 'Assessment'],
    fields: [
      { id: '1', type: 'text', label: 'Site Location', required: true, placeholder: 'GPS coordinates or address' },
      { id: '2', type: 'number', label: 'Site Area (acres)', required: true, placeholder: 'Available land area' },
      { id: '3', type: 'select', label: 'Terrain Type', required: true, options: ['Flat', 'Rolling Hills', 'Mountainous', 'Coastal'] },
      { id: '4', type: 'number', label: 'Average Wind Speed (mph)', required: true, placeholder: 'Historical average' },
      { id: '5', type: 'select', label: 'Turbulence Level', required: true, options: ['Low', 'Medium', 'High'] },
      { id: '6', type: 'number', label: 'Distance to Grid (miles)', required: true, placeholder: 'Nearest transmission line' },
      { id: '7', type: 'select', label: 'Environmental Concerns', required: false, options: ['Wildlife Migration', 'Protected Areas', 'Noise Restrictions', 'None'] },
      { id: '8', type: 'checkbox', label: 'Local Support', required: true, options: ['Community Approval', 'Government Support', 'Utility Cooperation'] }
    ]
  },
  {
    id: 'energy-3',
    name: 'Energy Efficiency Audit',
    description: 'Comprehensive building energy efficiency evaluation',
    category: 'Audit',
    sector: 'Energy',
    tags: ['Energy', 'Efficiency', 'Audit', 'Building'],
    fields: [
      { id: '1', type: 'text', label: 'Building Name', required: true, placeholder: 'Facility name' },
      { id: '2', type: 'number', label: 'Building Size (sq ft)', required: true, placeholder: 'Total floor area' },
      { id: '3', type: 'select', label: 'Building Type', required: true, options: ['Office', 'Retail', 'Industrial', 'Residential', 'Educational'] },
      { id: '4', type: 'number', label: 'Building Age', required: true, placeholder: 'Years since construction' },
      { id: '5', type: 'select', label: 'HVAC System', required: true, options: ['Central Air', 'Heat Pump', 'Boiler', 'Window Units', 'None'] },
      { id: '6', type: 'select', label: 'Insulation Quality', required: true, options: ['Excellent', 'Good', 'Fair', 'Poor', 'Unknown'] },
      { id: '7', type: 'select', label: 'Window Type', required: true, options: ['Single Pane', 'Double Pane', 'Triple Pane', 'Storm Windows'] },
      { id: '8', type: 'number', label: 'Annual Energy Cost', required: true, placeholder: 'Total yearly energy costs' },
      { id: '9', type: 'textarea', label: 'Energy Goals', required: true, placeholder: 'Desired efficiency improvements' }
    ]
  },
  {
    id: 'energy-4',
    name: 'Utility Service Application',
    description: 'Apply for new utility service connection',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'Utility', 'Service', 'Connection'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant Name', required: true, placeholder: 'Account holder name' },
      { id: '2', type: 'textarea', label: 'Service Address', required: true, placeholder: 'Address for utility service' },
      { id: '3', type: 'select', label: 'Service Type', required: true, options: ['Residential', 'Commercial', 'Industrial'] },
      { id: '4', type: 'checkbox', label: 'Utilities Needed', required: true, options: ['Electricity', 'Natural Gas', 'Water', 'Sewer'] },
      { id: '5', type: 'date', label: 'Requested Service Date', required: true },
      { id: '6', type: 'number', label: 'Estimated Usage (kWh)', required: false, placeholder: 'Monthly electricity usage' },
      { id: '7', type: 'text', label: 'Contact Phone', required: true, placeholder: '(555) 123-4567' },
      { id: '8', type: 'email', label: 'Contact Email', required: true, placeholder: 'your.email@domain.com' },
      { id: '9', type: 'file', label: 'ID Verification', required: true, acceptedFileTypes: ['pdf', 'jpg'] }
    ]
  },
  {
    id: 'energy-5',
    name: 'Power Outage Report',
    description: 'Report electrical outages and service disruptions',
    category: 'Support',
    sector: 'Energy',
    tags: ['Energy', 'Outage', 'Report', 'Emergency'],
    fields: [
      { id: '1', type: 'text', label: 'Account Number', required: true, placeholder: 'Utility account number' },
      { id: '2', type: 'textarea', label: 'Outage Location', required: true, placeholder: 'Affected address or area' },
      { id: '3', type: 'datetime-local', label: 'Outage Start Time', required: true },
      { id: '4', type: 'select', label: 'Outage Type', required: true, options: ['Complete Power Loss', 'Partial Outage', 'Flickering', 'Low Voltage'] },
      { id: '5', type: 'number', label: 'Affected Customers', required: false, placeholder: 'Estimated number' },
      { id: '6', type: 'textarea', label: 'Description', required: false, placeholder: 'Additional details about the outage' },
      { id: '7', type: 'text', label: 'Contact Name', required: true, placeholder: 'Reporter name' },
      { id: '8', type: 'text', label: 'Contact Phone', required: true, placeholder: '(555) 123-4567' },
      { id: '9', type: 'select', label: 'Priority Level', required: true, options: ['Low', 'Medium', 'High', 'Emergency'] }
    ]
  },
  {
    id: 'energy-6',
    name: 'Renewable Energy Incentive Application',
    description: 'Apply for government renewable energy incentives and rebates',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'Renewable', 'Incentive', 'Rebate'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'text', label: 'Tax ID', required: true, placeholder: 'SSN or EIN' },
      { id: '3', type: 'select', label: 'System Type', required: true, options: ['Solar PV', 'Wind', 'Geothermal', 'Hydroelectric', 'Battery Storage'] },
      { id: '4', type: 'number', label: 'System Capacity (kW)', required: true, placeholder: 'Rated power output' },
      { id: '5', type: 'number', label: 'Total System Cost', required: true, placeholder: 'Installation cost in USD' },
      { id: '6', type: 'date', label: 'Installation Date', required: true },
      { id: '7', type: 'text', label: 'Installer Company', required: true, placeholder: 'Licensed installer name' },
      { id: '8', type: 'file', label: 'Installation Certificate', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'file', label: 'Equipment Specs', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'energy-7',
    name: 'Grid Interconnection Application',
    description: 'Apply to connect renewable energy system to electrical grid',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'Grid', 'Interconnection', 'Renewable'],
    fields: [
      { id: '1', type: 'text', label: 'System Owner', required: true, placeholder: 'Legal owner name' },
      { id: '2', type: 'textarea', label: 'Installation Address', required: true, placeholder: 'System location' },
      { id: '3', type: 'select', label: 'Generation Type', required: true, options: ['Solar PV', 'Wind', 'Combined Heat Power', 'Fuel Cell', 'Other'] },
      { id: '4', type: 'number', label: 'AC Rating (kW)', required: true, placeholder: 'AC power rating' },
      { id: '5', type: 'number', label: 'DC Rating (kW)', required: true, placeholder: 'DC power rating' },
      { id: '6', type: 'select', label: 'Inverter Type', required: true, options: ['String', 'Power Optimizer', 'Microinverter', 'Central'] },
      { id: '7', type: 'text', label: 'Electrical Contractor', required: true, placeholder: 'Licensed electrician' },
      { id: '8', type: 'file', label: 'Single Line Diagram', required: true, acceptedFileTypes: ['pdf', 'dwg'] },
      { id: '9', type: 'checkbox', label: 'Safety Requirements', required: true, options: ['AC Disconnect', 'DC Disconnect', 'Rapid Shutdown', 'Arc Fault Protection'] }
    ]
  },
  {
    id: 'energy-8',
    name: 'Energy Storage System Registration',
    description: 'Register battery energy storage systems with utility',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'Storage', 'Battery', 'Registration'],
    fields: [
      { id: '1', type: 'text', label: 'System Owner', required: true, placeholder: 'Owner name' },
      { id: '2', type: 'textarea', label: 'Installation Location', required: true, placeholder: 'System address' },
      { id: '3', type: 'select', label: 'Battery Technology', required: true, options: ['Lithium-ion', 'Lead Acid', 'Flow Battery', 'Other'] },
      { id: '4', type: 'number', label: 'Storage Capacity (kWh)', required: true, placeholder: 'Energy capacity' },
      { id: '5', type: 'number', label: 'Power Rating (kW)', required: true, placeholder: 'Maximum power output' },
      { id: '6', type: 'select', label: 'Installation Type', required: true, options: ['Indoor', 'Outdoor', 'Garage', 'Basement'] },
      { id: '7', type: 'checkbox', label: 'Safety Features', required: true, options: ['Fire Suppression', 'Ventilation', 'Emergency Shutdown', 'Monitoring System'] },
      { id: '8', type: 'file', label: 'Equipment Certification', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'text', label: 'Installer License', required: true, placeholder: 'Installer license number' }
    ]
  },
  {
    id: 'energy-9',
    name: 'Carbon Credit Application',
    description: 'Apply for carbon offset credits for renewable projects',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'Carbon', 'Credits', 'Offset'],
    fields: [
      { id: '1', type: 'text', label: 'Project Name', required: true, placeholder: 'Carbon offset project name' },
      { id: '2', type: 'select', label: 'Project Type', required: true, options: ['Renewable Energy', 'Energy Efficiency', 'Reforestation', 'Methane Capture'] },
      { id: '3', type: 'textarea', label: 'Project Location', required: true, placeholder: 'Geographic location' },
      { id: '4', type: 'number', label: 'Annual CO2 Reduction (tons)', required: true, placeholder: 'Estimated reduction' },
      { id: '5', type: 'date', label: 'Project Start Date', required: true },
      { id: '6', type: 'date', label: 'Project End Date', required: true },
      { id: '7', type: 'select', label: 'Verification Standard', required: true, options: ['VCS', 'Gold Standard', 'CDM', 'ACR'] },
      { id: '8', type: 'file', label: 'Project Documentation', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'textarea', label: 'Methodology', required: true, placeholder: 'Carbon calculation methodology' }
    ]
  },
  {
    id: 'energy-10',
    name: 'Demand Response Program Enrollment',
    description: 'Enroll in utility demand response programs',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'Demand Response', 'Program', 'Enrollment'],
    fields: [
      { id: '1', type: 'text', label: 'Customer Name', required: true, placeholder: 'Account holder name' },
      { id: '2', type: 'text', label: 'Account Number', required: true, placeholder: 'Utility account number' },
      { id: '3', type: 'select', label: 'Customer Type', required: true, options: ['Residential', 'Small Commercial', 'Large Commercial', 'Industrial'] },
      { id: '4', type: 'number', label: 'Peak Demand (kW)', required: true, placeholder: 'Maximum power usage' },
      { id: '5', type: 'number', label: 'Curtailable Load (kW)', required: true, placeholder: 'Reducible power' },
      { id: '6', type: 'checkbox', label: 'Available Equipment', required: true, options: ['Smart Thermostat', 'Water Heater Control', 'EV Charger', 'Battery Storage'] },
      { id: '7', type: 'select', label: 'Notification Preference', required: true, options: ['SMS', 'Email', 'Phone Call', 'Mobile App'] },
      { id: '8', type: 'textarea', label: 'Participation Constraints', required: false, placeholder: 'Times or conditions when participation is not possible' }
    ]
  },
  {
    id: 'energy-11',
    name: 'Electric Vehicle Charging Station Permit',
    description: 'Apply for EV charging station installation permit',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'EV', 'Charging', 'Permit'],
    fields: [
      { id: '1', type: 'text', label: 'Property Owner', required: true, placeholder: 'Legal property owner' },
      { id: '2', type: 'textarea', label: 'Installation Address', required: true, placeholder: 'Charging station location' },
      { id: '3', type: 'select', label: 'Charger Type', required: true, options: ['Level 1 (120V)', 'Level 2 (240V)', 'DC Fast Charger', 'Tesla Supercharger'] },
      { id: '4', type: 'number', label: 'Number of Stations', required: true, placeholder: 'Charging stations to install' },
      { id: '5', type: 'select', label: 'Installation Type', required: true, options: ['Wall Mounted', 'Pedestal', 'Canopy', 'Indoor'] },
      { id: '6', type: 'select', label: 'Access Type', required: true, options: ['Public', 'Private', 'Workplace', 'Multi-Family'] },
      { id: '7', type: 'text', label: 'Electrical Contractor', required: true, placeholder: 'Licensed electrician' },
      { id: '8', type: 'file', label: 'Site Plan', required: true, acceptedFileTypes: ['pdf', 'dwg'] },
      { id: '9', type: 'checkbox', label: 'ADA Compliance', required: true, options: ['Accessible Parking', 'Accessible Route', 'Proper Signage'] }
    ]
  },
  {
    id: 'energy-12',
    name: 'Energy Management System Assessment',
    description: 'Evaluate energy management system implementation',
    category: 'Assessment',
    sector: 'Energy',
    tags: ['Energy', 'Management', 'System', 'Assessment'],
    fields: [
      { id: '1', type: 'text', label: 'Facility Name', required: true, placeholder: 'Organization name' },
      { id: '2', type: 'select', label: 'Facility Type', required: true, options: ['Manufacturing', 'Office Building', 'Hospital', 'School', 'Retail'] },
      { id: '3', type: 'number', label: 'Annual Energy Consumption (kWh)', required: true, placeholder: 'Total yearly usage' },
      { id: '4', type: 'number', label: 'Annual Energy Cost', required: true, placeholder: 'Total yearly cost' },
      { id: '5', type: 'checkbox', label: 'Current Systems', required: true, options: ['HVAC Controls', 'Lighting Controls', 'Energy Monitoring', 'Building Automation'] },
      { id: '6', type: 'select', label: 'Energy Goals', required: true, options: ['Cost Reduction', 'Consumption Reduction', 'Peak Demand Management', 'Sustainability'] },
      { id: '7', type: 'number', label: 'Target Reduction (%)', required: true, placeholder: 'Desired energy reduction' },
      { id: '8', type: 'textarea', label: 'Current Challenges', required: true, placeholder: 'Energy management challenges' },
      { id: '9', type: 'select', label: 'Implementation Timeline', required: true, options: ['Immediate', '3-6 months', '6-12 months', '1+ years'] }
    ]
  },
  {
    id: 'energy-13',
    name: 'Substation Maintenance Request',
    description: 'Request maintenance for electrical substation equipment',
    category: 'Support',
    sector: 'Energy',
    tags: ['Energy', 'Substation', 'Maintenance', 'Equipment'],
    fields: [
      { id: '1', type: 'text', label: 'Substation ID', required: true, placeholder: 'Unique substation identifier' },
      { id: '2', type: 'textarea', label: 'Substation Location', required: true, placeholder: 'Physical address or coordinates' },
      { id: '3', type: 'select', label: 'Equipment Type', required: true, options: ['Transformer', 'Breaker', 'Switch', 'Protection Relay', 'Other'] },
      { id: '4', type: 'select', label: 'Maintenance Type', required: true, options: ['Preventive', 'Corrective', 'Emergency', 'Upgrade'] },
      { id: '5', type: 'select', label: 'Priority Level', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
      { id: '6', type: 'textarea', label: 'Issue Description', required: true, placeholder: 'Detailed problem description' },
      { id: '7', type: 'date', label: 'Requested Date', required: true },
      { id: '8', type: 'text', label: 'Requestor Name', required: true, placeholder: 'Person making request' },
      { id: '9', type: 'checkbox', label: 'Safety Concerns', required: false, options: ['High Voltage', 'Equipment Failure', 'Fire Hazard', 'Access Issues'] }
    ]
  },
  {
    id: 'energy-14',
    name: 'Energy Commodity Trading Registration',
    description: 'Register for energy commodity trading platform',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'Trading', 'Commodity', 'Registration'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Legal company name' },
      { id: '2', type: 'text', label: 'Federal Tax ID', required: true, placeholder: 'EIN number' },
      { id: '3', type: 'select', label: 'Entity Type', required: true, options: ['Corporation', 'LLC', 'Partnership', 'Sole Proprietorship'] },
      { id: '4', type: 'checkbox', label: 'Trading Interests', required: true, options: ['Electricity', 'Natural Gas', 'Renewable Energy Credits', 'Carbon Credits'] },
      { id: '5', type: 'select', label: 'Trading Experience', required: true, options: ['None', '1-2 years', '3-5 years', '5+ years'] },
      { id: '6', type: 'text', label: 'Primary Contact', required: true, placeholder: 'Authorized representative' },
      { id: '7', type: 'email', label: 'Contact Email', required: true, placeholder: 'trading@company.com' },
      { id: '8', type: 'file', label: 'Articles of Incorporation', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'file', label: 'Financial Statements', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'energy-15',
    name: 'Power Purchase Agreement Application',
    description: 'Apply for long-term power purchase agreement',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'PPA', 'Purchase', 'Agreement'],
    fields: [
      { id: '1', type: 'text', label: 'Developer Name', required: true, placeholder: 'Project developer' },
      { id: '2', type: 'text', label: 'Project Name', required: true, placeholder: 'Power generation project' },
      { id: '3', type: 'textarea', label: 'Project Location', required: true, placeholder: 'Geographic location' },
      { id: '4', type: 'select', label: 'Generation Type', required: true, options: ['Solar', 'Wind', 'Hydroelectric', 'Biomass', 'Geothermal'] },
      { id: '5', type: 'number', label: 'Capacity (MW)', required: true, placeholder: 'Generation capacity' },
      { id: '6', type: 'number', label: 'Annual Output (MWh)', required: true, placeholder: 'Expected annual generation' },
      { id: '7', type: 'date', label: 'Commercial Operation Date', required: true },
      { id: '8', type: 'number', label: 'Contract Term (years)', required: true, placeholder: 'PPA duration' },
      { id: '9', type: 'number', label: 'Proposed Price ($/MWh)', required: true, placeholder: 'Energy price' }
    ]
  },
  {
    id: 'energy-16',
    name: 'Transmission Line Right-of-Way Application',
    description: 'Apply for transmission line right-of-way permits',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'Transmission', 'Right-of-Way', 'Permit'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant Company', required: true, placeholder: 'Utility company name' },
      { id: '2', type: 'text', label: 'Project Name', required: true, placeholder: 'Transmission project name' },
      { id: '3', type: 'textarea', label: 'Route Description', required: true, placeholder: 'Transmission line route' },
      { id: '4', type: 'number', label: 'Line Length (miles)', required: true, placeholder: 'Total transmission length' },
      { id: '5', type: 'select', label: 'Voltage Level', required: true, options: ['69 kV', '138 kV', '230 kV', '345 kV', '500 kV', '765 kV'] },
      { id: '6', type: 'number', label: 'Right-of-Way Width (feet)', required: true, placeholder: 'Required corridor width' },
      { id: '7', type: 'checkbox', label: 'Land Types', required: true, options: ['Private Property', 'Public Land', 'Agricultural', 'Forest', 'Wetlands'] },
      { id: '8', type: 'file', label: 'Route Maps', required: true, acceptedFileTypes: ['pdf', 'dwg'] },
      { id: '9', type: 'textarea', label: 'Environmental Mitigation', required: true, placeholder: 'Environmental protection measures' }
    ]
  },
  {
    id: 'energy-17',
    name: 'Energy Performance Contract Proposal',
    description: 'Propose energy performance contracting services',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'Performance', 'Contract', 'ESCO'],
    fields: [
      { id: '1', type: 'text', label: 'ESCO Company', required: true, placeholder: 'Energy service company' },
      { id: '2', type: 'text', label: 'Client Organization', required: true, placeholder: 'Customer organization' },
      { id: '3', type: 'select', label: 'Facility Type', required: true, options: ['Government', 'School', 'Hospital', 'Commercial', 'Industrial'] },
      { id: '4', type: 'number', label: 'Annual Energy Cost', required: true, placeholder: 'Current energy costs' },
      { id: '5', type: 'number', label: 'Guaranteed Savings (%)', required: true, placeholder: 'Minimum savings guarantee' },
      { id: '6', type: 'checkbox', label: 'Proposed Measures', required: true, options: ['HVAC Upgrade', 'Lighting Retrofit', 'Building Envelope', 'Controls Systems', 'Renewable Energy'] },
      { id: '7', type: 'number', label: 'Project Cost', required: true, placeholder: 'Total implementation cost' },
      { id: '8', type: 'number', label: 'Contract Term (years)', required: true, placeholder: 'Performance contract duration' },
      { id: '9', type: 'file', label: 'Energy Audit Report', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'energy-18',
    name: 'Net Metering Application',
    description: 'Apply for net energy metering program',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'Net Metering', 'Solar', 'Billing'],
    fields: [
      { id: '1', type: 'text', label: 'Customer Name', required: true, placeholder: 'Account holder name' },
      { id: '2', type: 'text', label: 'Service Account', required: true, placeholder: 'Utility account number' },
      { id: '3', type: 'select', label: 'System Type', required: true, options: ['Solar PV', 'Wind', 'Micro-Hydro', 'Fuel Cell'] },
      { id: '4', type: 'number', label: 'System Size (kW)', required: true, placeholder: 'AC system rating' },
      { id: '5', type: 'number', label: 'Annual Production (kWh)', required: true, placeholder: 'Expected annual generation' },
      { id: '6', type: 'date', label: 'Interconnection Date', required: true },
      { id: '7', type: 'text', label: 'Installer Company', required: true, placeholder: 'System installer' },
      { id: '8', type: 'file', label: 'Interconnection Agreement', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'select', label: 'Meter Type', required: true, options: ['Bi-directional', 'Dual Meter', 'Smart Meter'] }
    ]
  },
  {
    id: 'energy-19',
    name: 'Fuel Supply Contract Registration',
    description: 'Register fuel supply contracts for power generation',
    category: 'Registration',
    sector: 'Energy',
    tags: ['Energy', 'Fuel', 'Supply', 'Contract'],
    fields: [
      { id: '1', type: 'text', label: 'Generator Company', required: true, placeholder: 'Power generation company' },
      { id: '2', type: 'text', label: 'Fuel Supplier', required: true, placeholder: 'Fuel supply company' },
      { id: '3', type: 'select', label: 'Fuel Type', required: true, options: ['Natural Gas', 'Coal', 'Oil', 'Biomass', 'Nuclear'] },
      { id: '4', type: 'number', label: 'Annual Volume', required: true, placeholder: 'Contracted fuel quantity' },
      { id: '5', type: 'select', label: 'Delivery Method', required: true, options: ['Pipeline', 'Truck', 'Rail', 'Barge', 'Ship'] },
      { id: '6', type: 'date', label: 'Contract Start Date', required: true },
      { id: '7', type: 'date', label: 'Contract End Date', required: true },
      { id: '8', type: 'number', label: 'Contract Value', required: true, placeholder: 'Total contract value' },
      { id: '9', type: 'file', label: 'Supply Agreement', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'energy-20',
    name: 'Energy Emergency Response Plan',
    description: 'Submit emergency response plan for energy facilities',
    category: 'Compliance',
    sector: 'Energy',
    tags: ['Energy', 'Emergency', 'Response', 'Safety'],
    fields: [
      { id: '1', type: 'text', label: 'Facility Name', required: true, placeholder: 'Energy facility name' },
      { id: '2', type: 'textarea', label: 'Facility Address', required: true, placeholder: 'Complete facility address' },
      { id: '3', type: 'select', label: 'Facility Type', required: true, options: ['Power Plant', 'Substation', 'Gas Pipeline', 'Oil Refinery', 'Storage Facility'] },
      { id: '4', type: 'checkbox', label: 'Potential Hazards', required: true, options: ['Fire', 'Explosion', 'Chemical Release', 'Electrical', 'Natural Disaster'] },
      { id: '5', type: 'text', label: 'Emergency Coordinator', required: true, placeholder: 'Emergency response coordinator' },
      { id: '6', type: 'text', label: 'Emergency Phone', required: true, placeholder: '24/7 emergency contact' },
      { id: '7', type: 'textarea', label: 'Evacuation Procedures', required: true, placeholder: 'Emergency evacuation plans' },
      { id: '8', type: 'checkbox', label: 'Response Resources', required: true, options: ['Fire Department', 'Hazmat Team', 'Medical', 'Law Enforcement'] },
      { id: '9', type: 'file', label: 'Emergency Plan Document', required: true, acceptedFileTypes: ['pdf'] }
    ]
  }
];

// Telecom Sector Templates - 20 specific templates for telecommunications companies
export const telecomTemplates: FormTemplate[] = [
  {
    id: 'telecom-1',
    name: 'Cell Tower Site Application',
    description: 'Apply for new cellular tower construction permits',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Cell Tower', 'Site', 'Permit'],
    fields: [
      { id: '1', type: 'text', label: 'Carrier Name', required: true, placeholder: 'Wireless carrier company' },
      { id: '2', type: 'textarea', label: 'Proposed Site Location', required: true, placeholder: 'Complete address and coordinates' },
      { id: '3', type: 'select', label: 'Tower Type', required: true, options: ['Monopole', 'Lattice', 'Stealth', 'Rooftop', 'Small Cell'] },
      { id: '4', type: 'number', label: 'Tower Height (feet)', required: true, placeholder: 'Proposed tower height' },
      { id: '5', type: 'select', label: 'Coverage Purpose', required: true, options: ['Fill Coverage Gap', 'Capacity Enhancement', '5G Deployment', 'Emergency Services'] },
      { id: '6', type: 'checkbox', label: 'Technologies', required: true, options: ['4G LTE', '5G', 'IoT', 'Emergency Services'] },
      { id: '7', type: 'text', label: 'RF Engineer', required: true, placeholder: 'Licensed RF engineer' },
      { id: '8', type: 'file', label: 'RF Coverage Analysis', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'checkbox', label: 'Environmental Considerations', required: true, options: ['Wildlife Impact', 'Historical Sites', 'Noise Assessment', 'Visual Impact'] }
    ]
  },
  {
    id: 'telecom-2',
    name: 'Fiber Optic Installation Permit',
    description: 'Apply for fiber optic cable installation permits',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Fiber', 'Installation', 'Permit'],
    fields: [
      { id: '1', type: 'text', label: 'Service Provider', required: true, placeholder: 'Telecommunications company' },
      { id: '2', type: 'textarea', label: 'Installation Route', required: true, placeholder: 'Fiber cable route description' },
      { id: '3', type: 'select', label: 'Installation Method', required: true, options: ['Underground', 'Aerial', 'Conduit', 'Directional Boring'] },
      { id: '4', type: 'number', label: 'Cable Length (miles)', required: true, placeholder: 'Total fiber cable length' },
      { id: '5', type: 'select', label: 'Service Type', required: true, options: ['Residential', 'Business', 'Backbone', 'Municipal'] },
      { id: '6', type: 'checkbox', label: 'Right-of-Way', required: true, options: ['Public Streets', 'Private Property', 'Utility Easements', 'Railroad'] },
      { id: '7', type: 'text', label: 'Construction Contractor', required: true, placeholder: 'Licensed contractor' },
      { id: '8', type: 'file', label: 'Route Maps', required: true, acceptedFileTypes: ['pdf', 'dwg'] },
      { id: '9', type: 'date', label: 'Proposed Start Date', required: true }
    ]
  },
  {
    id: 'telecom-3',
    name: 'Telecommunications Service Application',
    description: 'Apply for business telecommunications services',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Service', 'Business', 'Application'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Company legal name' },
      { id: '2', type: 'textarea', label: 'Service Address', required: true, placeholder: 'Service location address' },
      { id: '3', type: 'checkbox', label: 'Services Requested', required: true, options: ['Internet', 'Voice/Phone', 'Data Lines', 'Video Conferencing', 'Cloud Services'] },
      { id: '4', type: 'select', label: 'Internet Speed', required: true, options: ['10 Mbps', '100 Mbps', '1 Gbps', '10 Gbps', 'Custom'] },
      { id: '5', type: 'number', label: 'Number of Phone Lines', required: false, placeholder: 'Voice lines needed' },
      { id: '6', type: 'select', label: 'Service Level', required: true, options: ['Basic', 'Business', 'Enterprise', 'Premium'] },
      { id: '7', type: 'date', label: 'Requested Installation Date', required: true },
      { id: '8', type: 'text', label: 'Primary Contact', required: true, placeholder: 'Main contact person' },
      { id: '9', type: 'email', label: 'Contact Email', required: true, placeholder: 'business@company.com' }
    ]
  },
  {
    id: 'telecom-4',
    name: 'Network Outage Report',
    description: 'Report telecommunications network outages and service disruptions',
    category: 'Support',
    sector: 'Telecom',
    tags: ['Telecom', 'Outage', 'Network', 'Report'],
    fields: [
      { id: '1', type: 'text', label: 'Account Number', required: true, placeholder: 'Customer account number' },
      { id: '2', type: 'textarea', label: 'Affected Location', required: true, placeholder: 'Outage location description' },
      { id: '3', type: 'datetime-local', label: 'Outage Start Time', required: true },
      { id: '4', type: 'checkbox', label: 'Affected Services', required: true, options: ['Internet', 'Phone', 'TV', 'Mobile', 'Data Services'] },
      { id: '5', type: 'select', label: 'Outage Scope', required: true, options: ['Single Location', 'Multiple Locations', 'Area-wide', 'Regional'] },
      { id: '6', type: 'number', label: 'Estimated Affected Users', required: false, placeholder: 'Number of users impacted' },
      { id: '7', type: 'textarea', label: 'Issue Description', required: true, placeholder: 'Detailed description of the problem' },
      { id: '8', type: 'text', label: 'Reporter Name', required: true, placeholder: 'Person reporting outage' },
      { id: '9', type: 'select', label: 'Business Impact', required: true, options: ['Low', 'Medium', 'High', 'Critical'] }
    ]
  },
  {
    id: 'telecom-5',
    name: 'Spectrum Allocation Request',
    description: 'Request radio frequency spectrum allocation',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Spectrum', 'Frequency', 'Allocation'],
    fields: [
      { id: '1', type: 'text', label: 'Licensee Name', required: true, placeholder: 'Company requesting spectrum' },
      { id: '2', type: 'select', label: 'Service Type', required: true, options: ['Mobile Broadband', 'Fixed Wireless', 'Satellite', 'Broadcasting', 'Public Safety'] },
      { id: '3', type: 'text', label: 'Frequency Band', required: true, placeholder: 'Requested frequency range' },
      { id: '4', type: 'textarea', label: 'Geographic Area', required: true, placeholder: 'Service area description' },
      { id: '5', type: 'number', label: 'Bandwidth (MHz)', required: true, placeholder: 'Required bandwidth' },
      { id: '6', type: 'select', label: 'License Term', required: true, options: ['5 years', '10 years', '15 years', '20 years'] },
      { id: '7', type: 'textarea', label: 'Technical Specifications', required: true, placeholder: 'Technical use parameters' },
      { id: '8', type: 'file', label: 'Engineering Study', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'number', label: 'Application Fee', required: true, placeholder: 'Regulatory fee amount' }
    ]
  },
  {
    id: 'telecom-6',
    name: 'Equipment Type Approval',
    description: 'Submit telecommunications equipment for type approval',
    category: 'Compliance',
    sector: 'Telecom',
    tags: ['Telecom', 'Equipment', 'Approval', 'Certification'],
    fields: [
      { id: '1', type: 'text', label: 'Manufacturer Name', required: true, placeholder: 'Equipment manufacturer' },
      { id: '2', type: 'text', label: 'Equipment Model', required: true, placeholder: 'Model number/name' },
      { id: '3', type: 'select', label: 'Equipment Type', required: true, options: ['Mobile Phone', 'Base Station', 'Router', 'Modem', 'IoT Device'] },
      { id: '4', type: 'text', label: 'Operating Frequencies', required: true, placeholder: 'Frequency bands used' },
      { id: '5', type: 'number', label: 'RF Power Output (W)', required: true, placeholder: 'Maximum power output' },
      { id: '6', type: 'checkbox', label: 'Standards Compliance', required: true, options: ['FCC Part 15', 'FCC Part 22', 'FCC Part 24', 'SAR Testing', 'EMC Testing'] },
      { id: '7', type: 'file', label: 'Test Report', required: true, acceptedFileTypes: ['pdf'] },
      { id: '8', type: 'file', label: 'User Manual', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'text', label: 'Test Laboratory', required: true, placeholder: 'Accredited test lab' }
    ]
  },
  {
    id: 'telecom-7',
    name: 'Submarine Cable Landing Application',
    description: 'Apply for submarine cable landing permits',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Submarine', 'Cable', 'Landing'],
    fields: [
      { id: '1', type: 'text', label: 'Cable System Name', required: true, placeholder: 'Submarine cable system name' },
      { id: '2', type: 'text', label: 'Cable Owner/Operator', required: true, placeholder: 'System owner company' },
      { id: '3', type: 'textarea', label: 'Landing Point Location', required: true, placeholder: 'Shore landing coordinates' },
      { id: '4', type: 'textarea', label: 'Cable Route', required: true, placeholder: 'Underwater cable path description' },
      { id: '5', type: 'number', label: 'Cable Length (km)', required: true, placeholder: 'Total cable length' },
      { id: '6', type: 'number', label: 'Capacity (Tbps)', required: true, placeholder: 'System capacity' },
      { id: '7', type: 'checkbox', label: 'Environmental Approvals', required: true, options: ['Marine Environmental', 'Coastal Zone', 'Fisheries', 'Protected Areas'] },
      { id: '8', type: 'file', label: 'Marine Survey', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'date', label: 'Planned Installation Date', required: true }
    ]
  },
  {
    id: 'telecom-8',
    name: 'Emergency Communication System Registration',
    description: 'Register emergency communication systems',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Emergency', 'Communication', 'Public Safety'],
    fields: [
      { id: '1', type: 'text', label: 'Agency Name', required: true, placeholder: 'Emergency services agency' },
      { id: '2', type: 'select', label: 'Agency Type', required: true, options: ['Police', 'Fire', 'EMS', 'Emergency Management', 'Multi-Agency'] },
      { id: '3', type: 'textarea', label: 'Coverage Area', required: true, placeholder: 'Geographic service area' },
      { id: '4', type: 'checkbox', label: 'System Components', required: true, options: ['Radio Network', 'Mobile Command', 'Dispatch Center', 'Interoperability Gateway'] },
      { id: '5', type: 'text', label: 'Operating Frequencies', required: true, placeholder: 'Radio frequencies used' },
      { id: '6', type: 'number', label: 'Number of Users', required: true, placeholder: 'System users count' },
      { id: '7', type: 'checkbox', label: 'Interoperability', required: true, options: ['P25', 'TETRA', 'FirstNet', 'Satellite'] },
      { id: '8', type: 'text', label: 'System Administrator', required: true, placeholder: 'Technical contact person' },
      { id: '9', type: 'file', label: 'System Documentation', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'telecom-9',
    name: 'Satellite Earth Station License',
    description: 'Apply for satellite earth station operating license',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Satellite', 'Earth Station', 'License'],
    fields: [
      { id: '1', type: 'text', label: 'Station Operator', required: true, placeholder: 'Earth station operator' },
      { id: '2', type: 'textarea', label: 'Station Location', required: true, placeholder: 'Earth station coordinates' },
      { id: '3', type: 'select', label: 'Station Type', required: true, options: ['Fixed', 'Mobile', 'Transportable', 'VSAT'] },
      { id: '4', type: 'number', label: 'Antenna Diameter (meters)', required: true, placeholder: 'Dish antenna size' },
      { id: '5', type: 'text', label: 'Satellite System', required: true, placeholder: 'Target satellite name' },
      { id: '6', type: 'text', label: 'Frequency Bands', required: true, placeholder: 'Uplink/downlink frequencies' },
      { id: '7', type: 'select', label: 'Service Type', required: true, options: ['Fixed Satellite', 'Mobile Satellite', 'Broadcasting', 'Earth Exploration'] },
      { id: '8', type: 'file', label: 'Radiation Pattern', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'checkbox', label: 'Coordination Required', required: false, options: ['Terrestrial Microwave', 'Radio Astronomy', 'Airport Radar'] }
    ]
  },
  {
    id: 'telecom-10',
    name: 'Internet Service Provider Registration',
    description: 'Register as an Internet Service Provider',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'ISP', 'Internet', 'Provider'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'ISP company name' },
      { id: '2', type: 'text', label: 'Federal Tax ID', required: true, placeholder: 'EIN number' },
      { id: '3', type: 'textarea', label: 'Service Territory', required: true, placeholder: 'Geographic service area' },
      { id: '4', type: 'checkbox', label: 'Services Offered', required: true, options: ['Broadband Internet', 'Dial-up', 'Wireless', 'Satellite', 'Fiber'] },
      { id: '5', type: 'number', label: 'Expected Subscribers', required: true, placeholder: 'Projected customer count' },
      { id: '6', type: 'text', label: 'Upstream Provider', required: true, placeholder: 'Wholesale internet provider' },
      { id: '7', type: 'text', label: 'Technical Contact', required: true, placeholder: 'Network administrator' },
      { id: '8', type: 'email', label: 'Technical Email', required: true, placeholder: 'noc@isp.com' },
      { id: '9', type: 'file', label: 'Network Diagram', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'telecom-11',
    name: 'VoIP Service Registration',
    description: 'Register Voice over IP telecommunications service',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'VoIP', 'Voice', 'Service'],
    fields: [
      { id: '1', type: 'text', label: 'Service Provider', required: true, placeholder: 'VoIP company name' },
      { id: '2', type: 'select', label: 'Service Type', required: true, options: ['Interconnected VoIP', 'Non-interconnected VoIP', 'Nomadic VoIP'] },
      { id: '3', type: 'textarea', label: 'Service Area', required: true, placeholder: 'Geographic coverage area' },
      { id: '4', type: 'checkbox', label: 'Features Offered', required: true, options: ['E911', 'Number Portability', 'Directory Listing', 'CALEA Compliance'] },
      { id: '5', type: 'number', label: 'Expected Customers', required: true, placeholder: 'Projected subscriber count' },
      { id: '6', type: 'text', label: 'Softswitch Provider', required: false, placeholder: 'Platform vendor' },
      { id: '7', type: 'text', label: 'Emergency Services Contact', required: true, placeholder: '911 coordinator' },
      { id: '8', type: 'file', label: 'Network Architecture', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'checkbox', label: 'Regulatory Compliance', required: true, options: ['FCC Registration', 'State PUC', 'USF Contributions', 'Accessibility'] }
    ]
  },
  {
    id: 'telecom-12',
    name: 'Telecommunications Tower Sharing Agreement',
    description: 'Apply for tower sharing arrangements with other carriers',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Tower', 'Sharing', 'Collocation'],
    fields: [
      { id: '1', type: 'text', label: 'Tower Owner', required: true, placeholder: 'Current tower owner' },
      { id: '2', type: 'text', label: 'Requesting Carrier', required: true, placeholder: 'Carrier seeking space' },
      { id: '3', type: 'textarea', label: 'Tower Location', required: true, placeholder: 'Tower site address' },
      { id: '4', type: 'number', label: 'Tower Height (feet)', required: true, placeholder: 'Existing tower height' },
      { id: '5', type: 'select', label: 'Antenna Position', required: true, options: ['Top Mount', 'Side Mount', 'Ground Level', 'Rooftop'] },
      { id: '6', type: 'checkbox', label: 'Equipment Needed', required: true, options: ['Antennas', 'Cabinets', 'Power', 'Backup Generator', 'Fiber Connection'] },
      { id: '7', type: 'number', label: 'Lease Fee (monthly)', required: true, placeholder: 'Proposed monthly payment' },
      { id: '8', type: 'file', label: 'Structural Analysis', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'checkbox', label: 'Technical Coordination', required: true, options: ['RF Interference Study', 'Power Analysis', 'Ground Space', 'Access Rights'] }
    ]
  },
  {
    id: 'telecom-13',
    name: 'Microwave Link Registration',
    description: 'Register point-to-point microwave communication links',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Microwave', 'Link', 'Point-to-Point'],
    fields: [
      { id: '1', type: 'text', label: 'Operator Name', required: true, placeholder: 'Link operator company' },
      { id: '2', type: 'textarea', label: 'Point A Location', required: true, placeholder: 'Transmit site coordinates' },
      { id: '3', type: 'textarea', label: 'Point B Location', required: true, placeholder: 'Receive site coordinates' },
      { id: '4', type: 'number', label: 'Link Distance (miles)', required: true, placeholder: 'Path length' },
      { id: '5', type: 'text', label: 'Frequency Band', required: true, placeholder: 'Operating frequency' },
      { id: '6', type: 'number', label: 'Antenna Height A (feet)', required: true, placeholder: 'Transmit antenna height' },
      { id: '7', type: 'number', label: 'Antenna Height B (feet)', required: true, placeholder: 'Receive antenna height' },
      { id: '8', type: 'select', label: 'Link Purpose', required: true, options: ['Backhaul', 'Network Extension', 'Emergency Backup', 'Temporary'] },
      { id: '9', type: 'file', label: 'Path Profile', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'telecom-14',
    name: 'Small Cell Deployment Application',
    description: 'Apply for small cell wireless facility deployment',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Small Cell', '5G', 'Deployment'],
    fields: [
      { id: '1', type: 'text', label: 'Wireless Carrier', required: true, placeholder: 'Deploying carrier name' },
      { id: '2', type: 'textarea', label: 'Deployment Area', required: true, placeholder: 'Geographic deployment zone' },
      { id: '3', type: 'number', label: 'Number of Nodes', required: true, placeholder: 'Small cells to deploy' },
      { id: '4', type: 'checkbox', label: 'Mounting Options', required: true, options: ['Utility Poles', 'Light Poles', 'Traffic Signals', 'Buildings', 'New Poles'] },
      { id: '5', type: 'checkbox', label: 'Technology Support', required: true, options: ['4G LTE', '5G NR', 'IoT', 'CBRS'] },
      { id: '6', type: 'select', label: 'Power Requirements', required: true, options: ['Utility Power', 'Solar', 'Battery Backup', 'Hybrid'] },
      { id: '7', type: 'text', label: 'Fiber Provider', required: true, placeholder: 'Backhaul fiber provider' },
      { id: '8', type: 'file', label: 'Site Survey', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'checkbox', label: 'Municipal Approvals', required: true, options: ['Right-of-Way', 'Building Permits', 'Historic Review', 'Environmental'] }
    ]
  },
  {
    id: 'telecom-15',
    name: 'Telecommunications Infrastructure Assessment',
    description: 'Assess existing telecommunications infrastructure for upgrades',
    category: 'Assessment',
    sector: 'Telecom',
    tags: ['Telecom', 'Infrastructure', 'Assessment', 'Upgrade'],
    fields: [
      { id: '1', type: 'text', label: 'Assessment Organization', required: true, placeholder: 'Organization conducting assessment' },
      { id: '2', type: 'textarea', label: 'Assessment Area', required: true, placeholder: 'Geographic area being assessed' },
      { id: '3', type: 'checkbox', label: 'Infrastructure Types', required: true, options: ['Fiber Optic', 'Copper', 'Wireless Towers', 'Submarine Cables', 'Satellite'] },
      { id: '4', type: 'checkbox', label: 'Services Evaluated', required: true, options: ['Internet', 'Phone', 'Video', 'Mobile', 'Emergency Communications'] },
      { id: '5', type: 'select', label: 'Assessment Purpose', required: true, options: ['Network Planning', 'Disaster Recovery', 'Competition Analysis', 'Investment Planning'] },
      { id: '6', type: 'number', label: 'Population Served', required: true, placeholder: 'People in assessment area' },
      { id: '7', type: 'checkbox', label: 'Key Metrics', required: true, options: ['Coverage Areas', 'Speed/Capacity', 'Reliability', 'Competition', 'Pricing'] },
      { id: '8', type: 'date', label: 'Assessment Date', required: true },
      { id: '9', type: 'file', label: 'Assessment Report', required: false, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'telecom-16',
    name: 'Wireless Emergency Alert System Registration',
    description: 'Register for Wireless Emergency Alert (WEA) system',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Emergency', 'Alert', 'WEA'],
    fields: [
      { id: '1', type: 'text', label: 'Alert Originator', required: true, placeholder: 'Emergency agency name' },
      { id: '2', type: 'select', label: 'Originator Type', required: true, options: ['Federal Agency', 'State Government', 'Local Government', 'Tribal Authority'] },
      { id: '3', type: 'textarea', label: 'Jurisdiction Area', required: true, placeholder: 'Geographic alert authority' },
      { id: '4', type: 'checkbox', label: 'Alert Types', required: true, options: ['Presidential', 'Imminent Threat', 'AMBER Alert', 'Public Safety'] },
      { id: '5', type: 'text', label: 'Alert Contact Person', required: true, placeholder: 'Authorized alert issuer' },
      { id: '6', type: 'text', label: 'Contact Phone', required: true, placeholder: '24/7 contact number' },
      { id: '7', type: 'email', label: 'Contact Email', required: true, placeholder: 'emergency@agency.gov' },
      { id: '8', type: 'checkbox', label: 'System Requirements', required: true, options: ['CAP Message Format', 'Digital Signature', 'Geographic Targeting', 'Language Support'] },
      { id: '9', type: 'file', label: 'Authorization Letter', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'telecom-17',
    name: 'Network Security Incident Report',
    description: 'Report telecommunications network security incidents',
    category: 'Support',
    sector: 'Telecom',
    tags: ['Telecom', 'Security', 'Incident', 'Cybersecurity'],
    fields: [
      { id: '1', type: 'text', label: 'Reporting Organization', required: true, placeholder: 'Company reporting incident' },
      { id: '2', type: 'datetime-local', label: 'Incident Discovery Time', required: true },
      { id: '3', type: 'datetime-local', label: 'Estimated Start Time', required: false },
      { id: '4', type: 'select', label: 'Incident Type', required: true, options: ['Unauthorized Access', 'DDoS Attack', 'Data Breach', 'Malware', 'Social Engineering'] },
      { id: '5', type: 'checkbox', label: 'Affected Systems', required: true, options: ['Network Infrastructure', 'Customer Data', 'Billing Systems', 'Emergency Services', 'Corporate Systems'] },
      { id: '6', type: 'textarea', label: 'Incident Description', required: true, placeholder: 'Detailed incident description' },
      { id: '7', type: 'select', label: 'Severity Level', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
      { id: '8', type: 'checkbox', label: 'Response Actions', required: true, options: ['Incident Isolation', 'System Restoration', 'Law Enforcement', 'Customer Notification'] },
      { id: '9', type: 'text', label: 'Incident Response Contact', required: true, placeholder: 'Security team contact' }
    ]
  },
  {
    id: 'telecom-18',
    name: 'Telecommunications Equipment Import License',
    description: 'Apply for license to import telecommunications equipment',
    category: 'Registration',
    sector: 'Telecom',
    tags: ['Telecom', 'Import', 'Equipment', 'License'],
    fields: [
      { id: '1', type: 'text', label: 'Importing Company', required: true, placeholder: 'Company importing equipment' },
      { id: '2', type: 'text', label: 'Manufacturer Name', required: true, placeholder: 'Equipment manufacturer' },
      { id: '3', type: 'text', label: 'Country of Origin', required: true, placeholder: 'Manufacturing country' },
      { id: '4', type: 'select', label: 'Equipment Category', required: true, options: ['Network Infrastructure', 'Customer Premises', 'Mobile Devices', 'Test Equipment'] },
      { id: '5', type: 'textarea', label: 'Equipment Description', required: true, placeholder: 'Detailed equipment specifications' },
      { id: '6', type: 'number', label: 'Quantity', required: true, placeholder: 'Number of units' },
      { id: '7', type: 'number', label: 'Value (USD)', required: true, placeholder: 'Total shipment value' },
      { id: '8', type: 'file', label: 'Technical Specifications', required: true, acceptedFileTypes: ['pdf'] },
      { id: '9', type: 'checkbox', label: 'Compliance Certifications', required: true, options: ['Type Approval', 'Safety Standards', 'EMC Testing', 'Security Evaluation'] }
    ]
  },
  {
    id: 'telecom-19',
    name: 'Universal Service Fund Contribution',
    description: 'Submit Universal Service Fund (USF) contribution reports',
    category: 'Compliance',
    sector: 'Telecom',
    tags: ['Telecom', 'USF', 'Contribution', 'Regulatory'],
    fields: [
      { id: '1', type: 'text', label: 'Contributing Entity', required: true, placeholder: 'Telecommunications company' },
      { id: '2', type: 'text', label: 'FRN Number', required: true, placeholder: 'FCC Registration Number' },
      { id: '3', type: 'select', label: 'Filing Period', required: true, options: ['Q1', 'Q2', 'Q3', 'Q4'] },
      { id: '4', type: 'number', label: 'Filing Year', required: true, placeholder: 'Contribution year' },
      { id: '5', type: 'number', label: 'Interstate Revenues', required: true, placeholder: 'Interstate telecom revenues' },
      { id: '6', type: 'number', label: 'International Revenues', required: true, placeholder: 'International telecom revenues' },
      { id: '7', type: 'number', label: 'Contribution Amount', required: true, placeholder: 'USF contribution due' },
      { id: '8', type: 'checkbox', label: 'Service Categories', required: true, options: ['Local Exchange', 'Long Distance', 'Mobile', 'VoIP', 'Data Services'] },
      { id: '9', type: 'file', label: 'Revenue Worksheet', required: true, acceptedFileTypes: ['pdf', 'xlsx'] }
    ]
  },
  {
    id: 'telecom-20',
    name: 'Disaster Recovery Communication Plan',
    description: 'Submit telecommunications disaster recovery and continuity plan',
    category: 'Compliance',
    sector: 'Telecom',
    tags: ['Telecom', 'Disaster Recovery', 'Emergency', 'Continuity'],
    fields: [
      { id: '1', type: 'text', label: 'Service Provider', required: true, placeholder: 'Telecommunications company' },
      { id: '2', type: 'textarea', label: 'Service Territory', required: true, placeholder: 'Geographic coverage area' },
      { id: '3', type: 'checkbox', label: 'Disaster Types Covered', required: true, options: ['Natural Disasters', 'Cyber Attacks', 'Equipment Failure', 'Power Outages', 'Terrorist Attacks'] },
      { id: '4', type: 'checkbox', label: 'Critical Infrastructure', required: true, options: ['Central Offices', 'Cell Towers', 'Data Centers', 'Fiber Routes', 'Emergency Services'] },
      { id: '5', type: 'text', label: 'Emergency Coordinator', required: true, placeholder: 'Disaster response coordinator' },
      { id: '6', type: 'text', label: 'Emergency Contact', required: true, placeholder: '24/7 emergency number' },
      { id: '7', type: 'textarea', label: 'Backup Procedures', required: true, placeholder: 'Service restoration procedures' },
      { id: '8', type: 'checkbox', label: 'Recovery Resources', required: true, options: ['Mobile Command Centers', 'Portable Generators', 'Satellite Links', 'Emergency Crews'] },
      { id: '9', type: 'file', label: 'Recovery Plan Document', required: true, acceptedFileTypes: ['pdf'] }
    ]
  }
];

// Startups Sector Templates - 20 specific templates for startup companies
export const startupsTemplates: FormTemplate[] = [
  {
    id: 'startup-1',
    name: 'Startup Incubator Application',
    description: 'Apply for startup incubator or accelerator programs',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'Incubator', 'Accelerator', 'Application'],
    fields: [
      { id: '1', type: 'text', label: 'Startup Name', required: true, placeholder: 'Company name' },
      { id: '2', type: 'text', label: 'Founder Names', required: true, placeholder: 'All founder names' },
      { id: '3', type: 'textarea', label: 'Business Description', required: true, placeholder: 'What does your startup do?' },
      { id: '4', type: 'select', label: 'Industry Sector', required: true, options: ['Technology', 'Healthcare', 'Fintech', 'E-commerce', 'CleanTech', 'Biotech', 'EdTech'] },
      { id: '5', type: 'select', label: 'Development Stage', required: true, options: ['Idea Stage', 'Prototype', 'MVP', 'Revenue Generating', 'Growth Stage'] },
      { id: '6', type: 'number', label: 'Funding Raised', required: false, placeholder: 'Total funding to date (USD)' },
      { id: '7', type: 'textarea', label: 'Problem Statement', required: true, placeholder: 'What problem are you solving?' },
      { id: '8', type: 'textarea', label: 'Solution Overview', required: true, placeholder: 'How do you solve this problem?' },
      { id: '9', type: 'text', label: 'Team Size', required: true, placeholder: 'Number of team members' },
      { id: '10', type: 'file', label: 'Pitch Deck', required: true, acceptedFileTypes: ['pdf', 'ppt'] }
    ]
  },
  {
    id: 'startup-2',
    name: 'Angel Investor Application',
    description: 'Apply for angel investment funding',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'Angel', 'Investment', 'Funding'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Startup legal name' },
      { id: '2', type: 'text', label: 'CEO/Founder', required: true, placeholder: 'Chief Executive Officer' },
      { id: '3', type: 'number', label: 'Funding Amount Sought', required: true, placeholder: 'Investment amount needed (USD)' },
      { id: '4', type: 'select', label: 'Use of Funds', required: true, options: ['Product Development', 'Marketing', 'Team Expansion', 'Operations', 'Market Expansion'] },
      { id: '5', type: 'number', label: 'Company Valuation', required: true, placeholder: 'Pre-money valuation (USD)' },
      { id: '6', type: 'number', label: 'Equity Offered (%)', required: true, placeholder: 'Percentage equity for investment' },
      { id: '7', type: 'number', label: 'Monthly Burn Rate', required: true, placeholder: 'Monthly cash burn (USD)' },
      { id: '8', type: 'number', label: 'Revenue (Annual)', required: false, placeholder: 'Annual revenue (USD)' },
      { id: '9', type: 'textarea', label: 'Competitive Advantage', required: true, placeholder: 'What makes you unique?' },
      { id: '10', type: 'file', label: 'Financial Projections', required: true, acceptedFileTypes: ['pdf', 'xlsx'] }
    ]
  },
  {
    id: 'startup-3',
    name: 'Venture Capital Pitch Submission',
    description: 'Submit pitch to venture capital firms',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'VC', 'Venture Capital', 'Pitch'],
    fields: [
      { id: '1', type: 'text', label: 'Startup Name', required: true, placeholder: 'Company name' },
      { id: '2', type: 'select', label: 'Funding Round', required: true, options: ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+'] },
      { id: '3', type: 'number', label: 'Funding Target', required: true, placeholder: 'Target funding amount (USD)' },
      { id: '4', type: 'textarea', label: 'Market Size', required: true, placeholder: 'Total addressable market (TAM)' },
      { id: '5', type: 'textarea', label: 'Revenue Model', required: true, placeholder: 'How do you make money?' },
      { id: '6', type: 'number', label: 'Current ARR/MRR', required: false, placeholder: 'Annual/Monthly recurring revenue' },
      { id: '7', type: 'text', label: 'Key Metrics', required: true, placeholder: 'Important business metrics' },
      { id: '8', type: 'textarea', label: 'Go-to-Market Strategy', required: true, placeholder: 'Customer acquisition strategy' },
      { id: '9', type: 'text', label: 'Key Team Members', required: true, placeholder: 'Core team backgrounds' },
      { id: '10', type: 'file', label: 'Executive Summary', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'startup-4',
    name: 'Government Grant Application',
    description: 'Apply for government startup grants and funding',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'Government', 'Grant', 'SBIR'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Legal company name' },
      { id: '2', type: 'text', label: 'DUNS Number', required: true, placeholder: 'Dun & Bradstreet number' },
      { id: '3', type: 'select', label: 'Grant Program', required: true, options: ['SBIR Phase I', 'SBIR Phase II', 'STTR', 'DOE Grants', 'NSF Innovation Corps'] },
      { id: '4', type: 'textarea', label: 'Project Title', required: true, placeholder: 'Research/development project title' },
      { id: '5', type: 'textarea', label: 'Technical Abstract', required: true, placeholder: 'Technical project summary' },
      { id: '6', type: 'number', label: 'Grant Amount Requested', required: true, placeholder: 'Funding amount (USD)' },
      { id: '7', type: 'select', label: 'Project Duration', required: true, options: ['6 months', '12 months', '18 months', '24 months', '36 months'] },
      { id: '8', type: 'textarea', label: 'Commercial Potential', required: true, placeholder: 'Market commercialization plan' },
      { id: '9', type: 'text', label: 'Principal Investigator', required: true, placeholder: 'Lead researcher name' },
      { id: '10', type: 'file', label: 'Detailed Proposal', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'startup-5',
    name: 'Startup Competition Entry',
    description: 'Enter startup pitch competitions and contests',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'Competition', 'Contest', 'Pitch'],
    fields: [
      { id: '1', type: 'text', label: 'Startup Name', required: true, placeholder: 'Company name' },
      { id: '2', type: 'text', label: 'Competition Name', required: true, placeholder: 'Contest/competition name' },
      { id: '3', type: 'select', label: 'Category', required: true, options: ['Early Stage', 'Growth Stage', 'Social Impact', 'DeepTech', 'Student', 'Women-Led'] },
      { id: '4', type: 'textarea', label: 'Elevator Pitch', required: true, placeholder: '30-second company description' },
      { id: '5', type: 'textarea', label: 'Innovation Description', required: true, placeholder: 'What makes your solution innovative?' },
      { id: '6', type: 'number', label: 'Customer Traction', required: false, placeholder: 'Number of customers/users' },
      { id: '7', type: 'select', label: 'Stage of Development', required: true, options: ['Concept', 'Prototype', 'Beta Testing', 'Market Ready', 'Scaling'] },
      { id: '8', type: 'textarea', label: 'Awards/Recognition', required: false, placeholder: 'Previous awards or recognition' },
      { id: '9', type: 'text', label: 'Team Lead', required: true, placeholder: 'Primary contact person' },
      { id: '10', type: 'file', label: 'Demo Video', required: false, acceptedFileTypes: ['mp4', 'mov'] }
    ]
  },
  {
    id: 'startup-6',
    name: 'Intellectual Property Application',
    description: 'Apply for patents and intellectual property protection',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'IP', 'Patent', 'Intellectual Property'],
    fields: [
      { id: '1', type: 'text', label: 'Applicant Name', required: true, placeholder: 'Individual or company name' },
      { id: '2', type: 'select', label: 'IP Type', required: true, options: ['Utility Patent', 'Design Patent', 'Trademark', 'Copyright', 'Trade Secret'] },
      { id: '3', type: 'text', label: 'Invention Title', required: true, placeholder: 'Descriptive invention title' },
      { id: '4', type: 'textarea', label: 'Invention Description', required: true, placeholder: 'Detailed description of invention' },
      { id: '5', type: 'textarea', label: 'Technical Field', required: true, placeholder: 'Field of technology' },
      { id: '6', type: 'textarea', label: 'Problem Solved', required: true, placeholder: 'What problem does this solve?' },
      { id: '7', type: 'textarea', label: 'Prior Art Search', required: false, placeholder: 'Existing similar inventions' },
      { id: '8', type: 'text', label: 'Inventor(s)', required: true, placeholder: 'All inventor names' },
      { id: '9', type: 'file', label: 'Technical Drawings', required: false, acceptedFileTypes: ['pdf', 'dwg'] },
      { id: '10', type: 'checkbox', label: 'Filing Options', required: true, options: ['Provisional Patent', 'PCT Application', 'Fast Track', 'Priority Claim'] }
    ]
  },
  {
    id: 'startup-7',
    name: 'Startup Bank Account Application',
    description: 'Apply for business banking services for startups',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'Banking', 'Account', 'Financial'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Legal business name' },
      { id: '2', type: 'text', label: 'Federal EIN', required: true, placeholder: 'Employer Identification Number' },
      { id: '3', type: 'select', label: 'Business Structure', required: true, options: ['LLC', 'Corporation', 'Partnership', 'Sole Proprietorship'] },
      { id: '4', type: 'textarea', label: 'Business Address', required: true, placeholder: 'Physical business address' },
      { id: '5', type: 'select', label: 'Industry', required: true, options: ['Technology', 'Healthcare', 'Retail', 'Services', 'Manufacturing', 'Other'] },
      { id: '6', type: 'number', label: 'Expected Monthly Revenue', required: false, placeholder: 'Projected monthly revenue' },
      { id: '7', type: 'checkbox', label: 'Services Needed', required: true, options: ['Checking Account', 'Savings Account', 'Credit Line', 'Merchant Services', 'Wire Transfers'] },
      { id: '8', type: 'text', label: 'Primary Contact', required: true, placeholder: 'Account holder name' },
      { id: '9', type: 'file', label: 'Articles of Incorporation', required: true, acceptedFileTypes: ['pdf'] },
      { id: '10', type: 'number', label: 'Initial Deposit', required: true, placeholder: 'Opening deposit amount' }
    ]
  },
  {
    id: 'startup-8',
    name: 'Startup Insurance Application',
    description: 'Apply for startup business insurance coverage',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'Insurance', 'Coverage', 'Protection'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Company legal name' },
      { id: '2', type: 'select', label: 'Business Type', required: true, options: ['Technology', 'Healthcare', 'E-commerce', 'Consulting', 'Manufacturing', 'Service'] },
      { id: '3', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Total employee count' },
      { id: '4', type: 'number', label: 'Annual Revenue', required: false, placeholder: 'Expected annual revenue' },
      { id: '5', type: 'checkbox', label: 'Coverage Types', required: true, options: ['General Liability', 'Professional Liability', 'Cyber Liability', 'Directors & Officers', 'Workers Compensation'] },
      { id: '6', type: 'number', label: 'Coverage Amount', required: true, placeholder: 'Desired coverage limit' },
      { id: '7', type: 'textarea', label: 'Business Description', required: true, placeholder: 'What does your business do?' },
      { id: '8', type: 'checkbox', label: 'Risk Factors', required: false, options: ['Data Storage', 'Client Meetings', 'Product Development', 'International Operations'] },
      { id: '9', type: 'textarea', label: 'Previous Claims', required: false, placeholder: 'Any previous insurance claims' },
      { id: '10', type: 'date', label: 'Desired Start Date', required: true }
    ]
  },
  {
    id: 'startup-9',
    name: 'Startup Mentorship Application',
    description: 'Apply for startup mentorship programs',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'Mentorship', 'Guidance', 'Support'],
    fields: [
      { id: '1', type: 'text', label: 'Startup Name', required: true, placeholder: 'Company name' },
      { id: '2', type: 'text', label: 'Founder Name', required: true, placeholder: 'Primary founder name' },
      { id: '3', type: 'select', label: 'Industry Focus', required: true, options: ['Technology', 'Healthcare', 'Fintech', 'E-commerce', 'SaaS', 'Hardware', 'Biotech'] },
      { id: '4', type: 'select', label: 'Business Stage', required: true, options: ['Pre-Launch', 'Launch', 'Early Growth', 'Scaling', 'Expansion'] },
      { id: '5', type: 'textarea', label: 'Current Challenges', required: true, placeholder: 'What challenges are you facing?' },
      { id: '6', type: 'checkbox', label: 'Mentorship Areas', required: true, options: ['Business Strategy', 'Fundraising', 'Marketing', 'Product Development', 'Team Building', 'Legal'] },
      { id: '7', type: 'text', label: 'Preferred Mentor Background', required: false, placeholder: 'Desired mentor experience' },
      { id: '8', type: 'select', label: 'Time Commitment', required: true, options: ['1 hour/month', '2 hours/month', '1 hour/week', '2+ hours/week'] },
      { id: '9', type: 'textarea', label: 'Goals', required: true, placeholder: 'What do you hope to achieve?' },
      { id: '10', type: 'text', label: 'Previous Mentorship', required: false, placeholder: 'Previous mentorship experience' }
    ]
  },
  {
    id: 'startup-10',
    name: 'Startup Legal Services Application',
    description: 'Apply for legal services and consultation',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'Legal', 'Services', 'Consultation'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Business name' },
      { id: '2', type: 'select', label: 'Legal Structure', required: false, options: ['Not Incorporated', 'LLC', 'C-Corp', 'S-Corp', 'Partnership'] },
      { id: '3', type: 'checkbox', label: 'Legal Services Needed', required: true, options: ['Incorporation', 'Contracts', 'IP Protection', 'Employment Law', 'Fundraising', 'Compliance'] },
      { id: '4', type: 'select', label: 'Priority Service', required: true, options: ['Incorporation', 'Contract Review', 'IP Filing', 'Investment Agreements', 'Employment Issues'] },
      { id: '5', type: 'textarea', label: 'Legal Issue Description', required: true, placeholder: 'Describe your legal needs' },
      { id: '6', type: 'select', label: 'Timeline', required: true, options: ['Urgent (1 week)', 'Soon (2-4 weeks)', 'Moderate (1-2 months)', 'Flexible'] },
      { id: '7', type: 'number', label: 'Budget Range', required: false, placeholder: 'Legal budget (USD)' },
      { id: '8', type: 'text', label: 'Primary Contact', required: true, placeholder: 'Main contact person' },
      { id: '9', type: 'email', label: 'Contact Email', required: true, placeholder: 'legal@startup.com' },
      { id: '10', type: 'file', label: 'Relevant Documents', required: false, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'startup-11',
    name: 'Customer Development Survey',
    description: 'Conduct customer development and market validation surveys',
    category: 'Assessment',
    sector: 'Startups',
    tags: ['Startups', 'Customer', 'Survey', 'Validation'],
    fields: [
      { id: '1', type: 'text', label: 'Participant Name', required: false, placeholder: 'Optional - customer name' },
      { id: '2', type: 'select', label: 'Customer Type', required: true, options: ['Target Customer', 'Current User', 'Potential Customer', 'Industry Expert'] },
      { id: '3', type: 'textarea', label: 'Problem Description', required: true, placeholder: 'Describe the problem we are trying to solve' },
      { id: '4', type: 'select', label: 'Problem Importance', required: true, options: ['Not Important', 'Somewhat Important', 'Important', 'Very Important', 'Critical'] },
      { id: '5', type: 'textarea', label: 'Current Solution', required: true, placeholder: 'How do you currently solve this problem?' },
      { id: '6', type: 'select', label: 'Solution Satisfaction', required: true, options: ['Very Unsatisfied', 'Unsatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'] },
      { id: '7', type: 'textarea', label: 'Proposed Solution Feedback', required: true, placeholder: 'What do you think of our proposed solution?' },
      { id: '8', type: 'select', label: 'Purchase Intent', required: true, options: ['Definitely Not', 'Probably Not', 'Might or Might Not', 'Probably Yes', 'Definitely Yes'] },
      { id: '9', type: 'number', label: 'Willingness to Pay', required: false, placeholder: 'Price you would pay (USD)' },
      { id: '10', type: 'textarea', label: 'Additional Feedback', required: false, placeholder: 'Any other thoughts or suggestions?' }
    ]
  },
  {
    id: 'startup-12',
    name: 'Product Beta Testing Application',
    description: 'Apply for product beta testing programs',
    category: 'Assessment',
    sector: 'Startups',
    tags: ['Startups', 'Beta', 'Testing', 'Product'],
    fields: [
      { id: '1', type: 'text', label: 'Tester Name', required: true, placeholder: 'Beta tester name' },
      { id: '2', type: 'email', label: 'Email Address', required: true, placeholder: 'contact@email.com' },
      { id: '3', type: 'select', label: 'User Type', required: true, options: ['Individual', 'Small Business', 'Enterprise', 'Developer', 'Educator'] },
      { id: '4', type: 'textarea', label: 'Use Case', required: true, placeholder: 'How would you use our product?' },
      { id: '5', type: 'select', label: 'Experience Level', required: true, options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
      { id: '6', type: 'checkbox', label: 'Testing Areas', required: true, options: ['Usability', 'Performance', 'Features', 'Mobile', 'Integration', 'Security'] },
      { id: '7', type: 'select', label: 'Commitment Level', required: true, options: ['1-2 hours/week', '3-5 hours/week', '6-10 hours/week', '10+ hours/week'] },
      { id: '8', type: 'checkbox', label: 'Platforms Available', required: true, options: ['Web Browser', 'iOS', 'Android', 'Windows', 'Mac', 'Linux'] },
      { id: '9', type: 'textarea', label: 'Previous Beta Experience', required: false, placeholder: 'Previous beta testing experience' },
      { id: '10', type: 'checkbox', label: 'Feedback Methods', required: true, options: ['Surveys', 'Interviews', 'Bug Reports', 'Feature Requests', 'User Forums'] }
    ]
  },
  {
    id: 'startup-13',
    name: 'Startup Employee Onboarding',
    description: 'New employee onboarding form for startups',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'Employee', 'Onboarding', 'HR'],
    fields: [
      { id: '1', type: 'text', label: 'Employee Name', required: true, placeholder: 'Full legal name' },
      { id: '2', type: 'email', label: 'Personal Email', required: true, placeholder: 'personal@email.com' },
      { id: '3', type: 'text', label: 'Position Title', required: true, placeholder: 'Job title' },
      { id: '4', type: 'select', label: 'Department', required: true, options: ['Engineering', 'Product', 'Marketing', 'Sales', 'Operations', 'Finance'] },
      { id: '5', type: 'date', label: 'Start Date', required: true },
      { id: '6', type: 'select', label: 'Employment Type', required: true, options: ['Full-time', 'Part-time', 'Contract', 'Intern'] },
      { id: '7', type: 'textarea', label: 'Home Address', required: true, placeholder: 'Complete address' },
      { id: '8', type: 'text', label: 'Emergency Contact', required: true, placeholder: 'Emergency contact name and phone' },
      { id: '9', type: 'checkbox', label: 'Equipment Needed', required: true, options: ['Laptop', 'Monitor', 'Phone', 'Software Licenses', 'Office Supplies'] },
      { id: '10', type: 'file', label: 'Signed Offer Letter', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'startup-14',
    name: 'Startup Partnership Proposal',
    description: 'Propose strategic partnerships with other companies',
    category: 'Registration',
    sector: 'Startups',
    tags: ['Startups', 'Partnership', 'Strategic', 'Collaboration'],
    fields: [
      { id: '1', type: 'text', label: 'Your Company', required: true, placeholder: 'Your startup name' },
      { id: '2', type: 'text', label: 'Target Partner', required: true, placeholder: 'Partner company name' },
      { id: '3', type: 'select', label: 'Partnership Type', required: true, options: ['Technology Integration', 'Channel Partnership', 'Co-Marketing', 'Joint Venture', 'Reseller Agreement'] },
      { id: '4', type: 'textarea', label: 'Partnership Rationale', required: true, placeholder: 'Why this partnership makes sense' },
      { id: '5', type: 'textarea', label: 'Mutual Benefits', required: true, placeholder: 'Benefits for both companies' },
      { id: '6', type: 'text', label: 'Target Market', required: true, placeholder: 'Market or customer segment' },
      { id: '7', type: 'number', label: 'Revenue Potential', required: false, placeholder: 'Potential revenue impact (USD)' },
      { id: '8', type: 'textarea', label: 'Implementation Plan', required: true, placeholder: 'How to execute the partnership' },
      { id: '9', type: 'text', label: 'Key Contact', required: true, placeholder: 'Primary contact at partner company' },
      { id: '10', type: 'file', label: 'Partnership Proposal', required: false, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'startup-15',
    name: 'Startup Compliance Checklist',
    description: 'Regulatory compliance assessment for startups',
    category: 'Compliance',
    sector: 'Startups',
    tags: ['Startups', 'Compliance', 'Regulatory', 'Legal'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Legal company name' },
      { id: '2', type: 'select', label: 'Industry', required: true, options: ['Technology', 'Healthcare', 'Financial Services', 'E-commerce', 'SaaS', 'Hardware'] },
      { id: '3', type: 'checkbox', label: 'Data Handling', required: true, options: ['Personal Data', 'Financial Data', 'Health Data', 'Children Data', 'International Data'] },
      { id: '4', type: 'checkbox', label: 'Compliance Areas', required: true, options: ['GDPR', 'CCPA', 'HIPAA', 'PCI-DSS', 'SOX', 'FDA', 'FTC'] },
      { id: '5', type: 'select', label: 'Geographic Operations', required: true, options: ['US Only', 'EU Only', 'US & EU', 'Global', 'Asia-Pacific'] },
      { id: '6', type: 'checkbox', label: 'Business Activities', required: true, options: ['Online Sales', 'Data Processing', 'Financial Transactions', 'Health Services', 'Advertising'] },
      { id: '7', type: 'text', label: 'Compliance Officer', required: false, placeholder: 'Designated compliance person' },
      { id: '8', type: 'select', label: 'Current Status', required: true, options: ['Not Started', 'In Progress', 'Mostly Compliant', 'Fully Compliant', 'Need Assessment'] },
      { id: '9', type: 'textarea', label: 'Specific Concerns', required: false, placeholder: 'Any specific compliance concerns' },
      { id: '10', type: 'date', label: 'Target Compliance Date', required: false }
    ]
  },
  {
    id: 'startup-16',
    name: 'Startup Market Research Request',
    description: 'Request market research and competitive analysis',
    category: 'Assessment',
    sector: 'Startups',
    tags: ['Startups', 'Market Research', 'Competition', 'Analysis'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Startup name' },
      { id: '2', type: 'select', label: 'Research Type', required: true, options: ['Market Size', 'Competitive Analysis', 'Customer Segmentation', 'Pricing Analysis', 'Industry Trends'] },
      { id: '3', type: 'textarea', label: 'Target Market', required: true, placeholder: 'Define your target market' },
      { id: '4', type: 'textarea', label: 'Key Competitors', required: true, placeholder: 'List main competitors' },
      { id: '5', type: 'checkbox', label: 'Research Scope', required: true, options: ['Market Size', 'Growth Trends', 'Customer Behavior', 'Pricing Models', 'Distribution Channels'] },
      { id: '6', type: 'select', label: 'Geographic Focus', required: true, options: ['Local', 'Regional', 'National', 'International', 'Global'] },
      { id: '7', type: 'number', label: 'Research Budget', required: false, placeholder: 'Budget for research (USD)' },
      { id: '8', type: 'select', label: 'Timeline', required: true, options: ['1-2 weeks', '3-4 weeks', '1-2 months', '3+ months'] },
      { id: '9', type: 'textarea', label: 'Specific Questions', required: true, placeholder: 'Key questions you need answered' },
      { id: '10', type: 'select', label: 'Deliverable Format', required: true, options: ['Executive Summary', 'Detailed Report', 'Presentation', 'Dashboard', 'All of Above'] }
    ]
  },
  {
    id: 'startup-17',
    name: 'Startup Pivot Assessment',
    description: 'Evaluate and document startup pivot decisions',
    category: 'Assessment',
    sector: 'Startups',
    tags: ['Startups', 'Pivot', 'Strategy', 'Assessment'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Startup name' },
      { id: '2', type: 'textarea', label: 'Current Business Model', required: true, placeholder: 'Describe current business model' },
      { id: '3', type: 'textarea', label: 'Proposed Pivot', required: true, placeholder: 'Describe the proposed pivot' },
      { id: '4', type: 'select', label: 'Pivot Type', required: true, options: ['Customer Segment', 'Problem Focus', 'Solution Approach', 'Revenue Model', 'Technology Platform'] },
      { id: '5', type: 'textarea', label: 'Reasons for Pivot', required: true, placeholder: 'Why are you considering this pivot?' },
      { id: '6', type: 'checkbox', label: 'Current Challenges', required: true, options: ['Low Customer Adoption', 'Revenue Issues', 'Market Size', 'Competition', 'Product-Market Fit'] },
      { id: '7', type: 'number', label: 'Current Monthly Revenue', required: false, placeholder: 'Current MRR (USD)' },
      { id: '8', type: 'number', label: 'Customer Count', required: false, placeholder: 'Current customer count' },
      { id: '9', type: 'textarea', label: 'Expected Outcomes', required: true, placeholder: 'What do you expect from the pivot?' },
      { id: '10', type: 'file', label: 'Supporting Data', required: false, acceptedFileTypes: ['pdf', 'xlsx'] }
    ]
  },
  {
    id: 'startup-18',
    name: 'Startup Exit Strategy Planning',
    description: 'Plan startup exit strategies and succession planning',
    category: 'Assessment',
    sector: 'Startups',
    tags: ['Startups', 'Exit', 'Strategy', 'Planning'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Startup name' },
      { id: '2', type: 'select', label: 'Exit Strategy Type', required: true, options: ['IPO', 'Acquisition', 'Merger', 'Management Buyout', 'Liquidation'] },
      { id: '3', type: 'select', label: 'Timeline', required: true, options: ['1-2 years', '3-5 years', '5-10 years', '10+ years', 'Flexible'] },
      { id: '4', type: 'number', label: 'Target Valuation', required: false, placeholder: 'Desired exit valuation (USD)' },
      { id: '5', type: 'textarea', label: 'Strategic Buyers', required: false, placeholder: 'Potential acquisition candidates' },
      { id: '6', type: 'checkbox', label: 'Exit Preparation', required: true, options: ['Financial Audit', 'Legal Review', 'IP Protection', 'Management Team', 'Growth Metrics'] },
      { id: '7', type: 'number', label: 'Annual Revenue', required: false, placeholder: 'Current annual revenue (USD)' },
      { id: '8', type: 'select', label: 'Profitability Status', required: true, options: ['Profitable', 'Break-even', 'Path to Profitability', 'Pre-Revenue', 'Unknown'] },
      { id: '9', type: 'textarea', label: 'Key Success Metrics', required: true, placeholder: 'Metrics that define success' },
      { id: '10', type: 'text', label: 'Advisory Team', required: false, placeholder: 'Advisors helping with exit' }
    ]
  },
  {
    id: 'startup-19',
    name: 'Startup International Expansion',
    description: 'Plan international market expansion for startups',
    category: 'Assessment',
    sector: 'Startups',
    tags: ['Startups', 'International', 'Expansion', 'Global'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Startup name' },
      { id: '2', type: 'checkbox', label: 'Target Markets', required: true, options: ['Europe', 'Asia-Pacific', 'Latin America', 'Middle East', 'Africa', 'Canada'] },
      { id: '3', type: 'select', label: 'Primary Market', required: true, options: ['United Kingdom', 'Germany', 'Japan', 'Australia', 'Canada', 'Singapore', 'Other'] },
      { id: '4', type: 'select', label: 'Expansion Strategy', required: true, options: ['Direct Sales', 'Local Partnerships', 'Subsidiary', 'Franchise', 'Licensing'] },
      { id: '5', type: 'number', label: 'Expansion Budget', required: false, placeholder: 'Budget for expansion (USD)' },
      { id: '6', type: 'select', label: 'Timeline', required: true, options: ['6 months', '12 months', '18 months', '24 months', '3+ years'] },
      { id: '7', type: 'checkbox', label: 'Challenges Expected', required: true, options: ['Regulatory Compliance', 'Cultural Differences', 'Local Competition', 'Currency Exchange', 'Talent Acquisition'] },
      { id: '8', type: 'textarea', label: 'Product Localization', required: false, placeholder: 'Required product modifications' },
      { id: '9', type: 'text', label: 'Local Partners', required: false, placeholder: 'Potential local partners' },
      { id: '10', type: 'file', label: 'Market Research', required: false, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'startup-20',
    name: 'Startup Digital Marketing Assessment',
    description: 'Assess digital marketing strategies and channels',
    category: 'Assessment',
    sector: 'Startups',
    tags: ['Startups', 'Marketing', 'Digital', 'Strategy'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Startup name' },
      { id: '2', type: 'textarea', label: 'Target Audience', required: true, placeholder: 'Define your target customers' },
      { id: '3', type: 'checkbox', label: 'Current Channels', required: true, options: ['Social Media', 'Email Marketing', 'Content Marketing', 'Paid Advertising', 'SEO', 'Influencer Marketing'] },
      { id: '4', type: 'number', label: 'Monthly Marketing Budget', required: false, placeholder: 'Marketing budget (USD)' },
      { id: '5', type: 'select', label: 'Primary Goal', required: true, options: ['Brand Awareness', 'Lead Generation', 'Customer Acquisition', 'Customer Retention', 'Revenue Growth'] },
      { id: '6', type: 'checkbox', label: 'Platforms Used', required: true, options: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube', 'TikTok', 'Google Ads'] },
      { id: '7', type: 'number', label: 'Website Traffic (Monthly)', required: false, placeholder: 'Monthly website visitors' },
      { id: '8', type: 'number', label: 'Conversion Rate (%)', required: false, placeholder: 'Website conversion rate' },
      { id: '9', type: 'textarea', label: 'Current Challenges', required: true, placeholder: 'Marketing challenges you are facing' },
      { id: '10', type: 'select', label: 'Analytics Tools', required: true, options: ['Google Analytics', 'Facebook Analytics', 'HubSpot', 'Mailchimp', 'Custom Dashboard', 'None'] }
    ]
  }
];

// SME (Small and Medium Enterprises) Sector Templates - 20 specific templates for SMEs
export const smeTemplates: FormTemplate[] = [
  {
    id: 'sme-1',
    name: 'Small Business Loan Application',
    description: 'Apply for small business financing and loans',
    category: 'Registration',
    sector: 'SME',
    tags: ['SME', 'Loan', 'Financing', 'Business'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Legal business name' },
      { id: '2', type: 'text', label: 'Federal Tax ID', required: true, placeholder: 'EIN number' },
      { id: '3', type: 'select', label: 'Business Structure', required: true, options: ['Sole Proprietorship', 'LLC', 'Corporation', 'Partnership'] },
      { id: '4', type: 'number', label: 'Years in Business', required: true, placeholder: 'Years operating' },
      { id: '5', type: 'number', label: 'Annual Revenue', required: true, placeholder: 'Annual gross revenue (USD)' },
      { id: '6', type: 'number', label: 'Loan Amount Requested', required: true, placeholder: 'Desired loan amount (USD)' },
      { id: '7', type: 'select', label: 'Loan Purpose', required: true, options: ['Working Capital', 'Equipment Purchase', 'Real Estate', 'Expansion', 'Debt Consolidation'] },
      { id: '8', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Full-time employees' },
      { id: '9', type: 'file', label: 'Financial Statements', required: true, acceptedFileTypes: ['pdf'] },
      { id: '10', type: 'file', label: 'Business Plan', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'sme-2',
    name: 'Government Contract Bid',
    description: 'Submit bids for government contracts and procurement',
    category: 'Registration',
    sector: 'SME',
    tags: ['SME', 'Government', 'Contract', 'Bid'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Legal company name' },
      { id: '2', type: 'text', label: 'Solicitation Number', required: true, placeholder: 'RFP/RFQ number' },
      { id: '3', type: 'text', label: 'DUNS Number', required: true, placeholder: 'Dun & Bradstreet number' },
      { id: '4', type: 'checkbox', label: 'Certifications', required: false, options: ['Small Business', 'Woman-Owned', 'Veteran-Owned', 'Minority-Owned', '8(a) Certified'] },
      { id: '5', type: 'number', label: 'Bid Amount', required: true, placeholder: 'Total bid price (USD)' },
      { id: '6', type: 'textarea', label: 'Technical Approach', required: true, placeholder: 'Technical solution overview' },
      { id: '7', type: 'select', label: 'Contract Type', required: true, options: ['Fixed Price', 'Cost Plus', 'Time & Materials', 'Indefinite Delivery'] },
      { id: '8', type: 'number', label: 'Performance Period (months)', required: true, placeholder: 'Contract duration' },
      { id: '9', type: 'file', label: 'Technical Proposal', required: true, acceptedFileTypes: ['pdf'] },
      { id: '10', type: 'file', label: 'Past Performance', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'sme-3',
    name: 'Business License Renewal',
    description: 'Renew local business licenses and permits',
    category: 'Compliance',
    sector: 'SME',
    tags: ['SME', 'License', 'Renewal', 'Permit'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Legal business name' },
      { id: '2', type: 'text', label: 'License Number', required: true, placeholder: 'Current license number' },
      { id: '3', type: 'textarea', label: 'Business Address', required: true, placeholder: 'Business location' },
      { id: '4', type: 'select', label: 'Business Type', required: true, options: ['Retail', 'Restaurant', 'Service', 'Manufacturing', 'Professional', 'Contractor'] },
      { id: '5', type: 'date', label: 'Current Expiration Date', required: true },
      { id: '6', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Current employee count' },
      { id: '7', type: 'number', label: 'Annual Gross Revenue', required: true, placeholder: 'Revenue for license year' },
      { id: '8', type: 'checkbox', label: 'Changes Since Last Renewal', required: false, options: ['Location Change', 'Ownership Change', 'Business Type Change', 'Name Change'] },
      { id: '9', type: 'text', label: 'Contact Person', required: true, placeholder: 'Primary contact name' },
      { id: '10', type: 'file', label: 'Certificate of Insurance', required: true, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'sme-4',
    name: 'Employee Benefits Enrollment',
    description: 'Enroll in employee benefits and insurance programs',
    category: 'Registration',
    sector: 'SME',
    tags: ['SME', 'Benefits', 'Insurance', 'Employee'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Business name' },
      { id: '2', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Eligible employees' },
      { id: '3', type: 'checkbox', label: 'Benefits Desired', required: true, options: ['Health Insurance', 'Dental Insurance', 'Vision Insurance', '401(k) Plan', 'Life Insurance'] },
      { id: '4', type: 'select', label: 'Health Plan Type', required: true, options: ['HMO', 'PPO', 'High Deductible', 'EPO', 'No Health Insurance'] },
      { id: '5', type: 'number', label: 'Monthly Budget', required: false, placeholder: 'Benefits budget per employee (USD)' },
      { id: '6', type: 'date', label: 'Desired Effective Date', required: true },
      { id: '7', type: 'select', label: 'Payroll Frequency', required: true, options: ['Weekly', 'Bi-weekly', 'Semi-monthly', 'Monthly'] },
      { id: '8', type: 'text', label: 'HR Contact', required: true, placeholder: 'HR administrator name' },
      { id: '9', type: 'email', label: 'HR Email', required: true, placeholder: 'hr@company.com' },
      { id: '10', type: 'file', label: 'Employee Census', required: true, acceptedFileTypes: ['xlsx', 'pdf'] }
    ]
  },
  {
    id: 'sme-5',
    name: 'Supply Chain Partner Application',
    description: 'Apply to become a supply chain partner or vendor',
    category: 'Registration',
    sector: 'SME',
    tags: ['SME', 'Supply Chain', 'Vendor', 'Partner'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Supplier company name' },
      { id: '2', type: 'text', label: 'Primary Contact', required: true, placeholder: 'Main contact person' },
      { id: '3', type: 'checkbox', label: 'Products/Services', required: true, options: ['Raw Materials', 'Components', 'Finished Goods', 'Professional Services', 'Logistics'] },
      { id: '4', type: 'textarea', label: 'Product Description', required: true, placeholder: 'Detailed product/service description' },
      { id: '5', type: 'number', label: 'Production Capacity', required: false, placeholder: 'Monthly production capacity' },
      { id: '6', type: 'checkbox', label: 'Certifications', required: false, options: ['ISO 9001', 'ISO 14001', 'OSHA', 'FDA', 'Industry Specific'] },
      { id: '7', type: 'number', label: 'Years in Business', required: true, placeholder: 'Years of operation' },
      { id: '8', type: 'textarea', label: 'Key Customers', required: false, placeholder: 'Major customers (optional)' },
      { id: '9', type: 'file', label: 'Company Brochure', required: false, acceptedFileTypes: ['pdf'] },
      { id: '10', type: 'file', label: 'Quality Certificates', required: false, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'sme-6',
    name: 'Business Expansion Assessment',
    description: 'Assess business expansion opportunities and requirements',
    category: 'Assessment',
    sector: 'SME',
    tags: ['SME', 'Expansion', 'Growth', 'Assessment'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Current business name' },
      { id: '2', type: 'select', label: 'Expansion Type', required: true, options: ['New Location', 'Product Line', 'Market Expansion', 'Service Addition', 'Franchise'] },
      { id: '3', type: 'textarea', label: 'Current Operations', required: true, placeholder: 'Describe current business operations' },
      { id: '4', type: 'number', label: 'Current Annual Revenue', required: true, placeholder: 'Current revenue (USD)' },
      { id: '5', type: 'number', label: 'Expansion Investment', required: false, placeholder: 'Required investment (USD)' },
      { id: '6', type: 'select', label: 'Target Timeline', required: true, options: ['3-6 months', '6-12 months', '1-2 years', '2+ years'] },
      { id: '7', type: 'textarea', label: 'Market Research', required: true, placeholder: 'Target market analysis' },
      { id: '8', type: 'checkbox', label: 'Resources Needed', required: true, options: ['Additional Staff', 'New Equipment', 'Larger Facility', 'Technology', 'Funding'] },
      { id: '9', type: 'textarea', label: 'Expected Challenges', required: true, placeholder: 'Anticipated obstacles' },
      { id: '10', type: 'number', label: 'Revenue Projection', required: false, placeholder: 'Projected revenue increase (%)' }
    ]
  },
  {
    id: 'sme-7',
    name: 'Quality Management System Certification',
    description: 'Apply for quality management system certifications',
    category: 'Compliance',
    sector: 'SME',
    tags: ['SME', 'Quality', 'ISO', 'Certification'],
    fields: [
      { id: '1', type: 'text', label: 'Organization Name', required: true, placeholder: 'Company name' },
      { id: '2', type: 'select', label: 'Certification Standard', required: true, options: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 27001', 'AS9100'] },
      { id: '3', type: 'textarea', label: 'Business Scope', required: true, placeholder: 'Business activities to be certified' },
      { id: '4', type: 'number', label: 'Number of Sites', required: true, placeholder: 'Locations to be certified' },
      { id: '5', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Total employees' },
      { id: '6', type: 'select', label: 'Current QMS Status', required: true, options: ['No QMS', 'Developing QMS', 'Implemented QMS', 'Previously Certified'] },
      { id: '7', type: 'text', label: 'Management Representative', required: true, placeholder: 'QMS management representative' },
      { id: '8', type: 'date', label: 'Desired Certification Date', required: true },
      { id: '9', type: 'file', label: 'Quality Manual', required: false, acceptedFileTypes: ['pdf'] },
      { id: '10', type: 'checkbox', label: 'Previous Certifications', required: false, options: ['ISO 9001', 'ISO 14001', 'OSHA VPP', 'Industry Specific'] }
    ]
  },
  {
    id: 'sme-8',
    name: 'Technology Upgrade Assessment',
    description: 'Assess technology infrastructure upgrade needs',
    category: 'Assessment',
    sector: 'SME',
    tags: ['SME', 'Technology', 'Upgrade', 'IT'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Business name' },
      { id: '2', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Total employees' },
      { id: '3', type: 'checkbox', label: 'Current Technology', required: true, options: ['Desktop Computers', 'Laptops', 'Servers', 'Network Equipment', 'Cloud Services'] },
      { id: '4', type: 'select', label: 'Primary Challenge', required: true, options: ['Slow Performance', 'Security Concerns', 'Outdated Software', 'Limited Capacity', 'High Maintenance'] },
      { id: '5', type: 'number', label: 'IT Budget', required: false, placeholder: 'Annual IT budget (USD)' },
      { id: '6', type: 'checkbox', label: 'Software Used', required: true, options: ['Microsoft Office', 'Accounting Software', 'CRM System', 'ERP System', 'Custom Applications'] },
      { id: '7', type: 'select', label: 'Upgrade Priority', required: true, options: ['Hardware', 'Software', 'Network', 'Security', 'Cloud Migration'] },
      { id: '8', type: 'select', label: 'Timeline', required: true, options: ['Immediate', '3-6 months', '6-12 months', '1+ years'] },
      { id: '9', type: 'textarea', label: 'Business Requirements', required: true, placeholder: 'Technology needs for business goals' },
      { id: '10', type: 'text', label: 'IT Contact', required: false, placeholder: 'IT manager or contact person' }
    ]
  },
  {
    id: 'sme-9',
    name: 'Export/Import License Application',
    description: 'Apply for international trade licenses and permits',
    category: 'Registration',
    sector: 'SME',
    tags: ['SME', 'Export', 'Import', 'Trade'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Legal business name' },
      { id: '2', type: 'text', label: 'Federal Tax ID', required: true, placeholder: 'EIN number' },
      { id: '3', type: 'select', label: 'License Type', required: true, options: ['Export License', 'Import License', 'Dual Use License', 'Temporary Import'] },
      { id: '4', type: 'textarea', label: 'Product Description', required: true, placeholder: 'Detailed product information' },
      { id: '5', type: 'text', label: 'Commodity Code', required: true, placeholder: 'HS or ECCN code' },
      { id: '6', type: 'checkbox', label: 'Target Countries', required: true, options: ['Canada', 'Mexico', 'EU', 'Asia', 'South America', 'Middle East'] },
      { id: '7', type: 'number', label: 'Estimated Value', required: true, placeholder: 'Annual trade value (USD)' },
      { id: '8', type: 'text', label: 'Foreign Partner', required: false, placeholder: 'International partner company' },
      { id: '9', type: 'file', label: 'Product Specifications', required: true, acceptedFileTypes: ['pdf'] },
      { id: '10', type: 'checkbox', label: 'Compliance Requirements', required: true, options: ['Export Controls', 'Anti-Dumping', 'Country Sanctions', 'Product Standards'] }
    ]
  },
  {
    id: 'sme-10',
    name: 'Business Insurance Assessment',
    description: 'Assess business insurance coverage needs and options',
    category: 'Assessment',
    sector: 'SME',
    tags: ['SME', 'Insurance', 'Coverage', 'Risk'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Company name' },
      { id: '2', type: 'select', label: 'Industry Type', required: true, options: ['Retail', 'Manufacturing', 'Services', 'Construction', 'Technology', 'Healthcare'] },
      { id: '3', type: 'number', label: 'Annual Revenue', required: true, placeholder: 'Annual revenue (USD)' },
      { id: '4', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Total employees' },
      { id: '5', type: 'checkbox', label: 'Current Coverage', required: false, options: ['General Liability', 'Property Insurance', 'Workers Compensation', 'Professional Liability', 'Cyber Liability'] },
      { id: '6', type: 'checkbox', label: 'Risk Factors', required: true, options: ['Customer Interactions', 'Product Manufacturing', 'Data Storage', 'Vehicle Operations', 'Professional Services'] },
      { id: '7', type: 'number', label: 'Property Value', required: false, placeholder: 'Business property value (USD)' },
      { id: '8', type: 'textarea', label: 'Previous Claims', required: false, placeholder: 'Insurance claims history' },
      { id: '9', type: 'number', label: 'Desired Coverage Limit', required: false, placeholder: 'Coverage amount (USD)' },
      { id: '10', type: 'select', label: 'Budget Range', required: true, options: ['Under $1,000', '$1,000-$5,000', '$5,000-$10,000', '$10,000+', 'Need Quote'] }
    ]
  },
  {
    id: 'sme-11',
    name: 'Customer Satisfaction Survey',
    description: 'Conduct customer satisfaction and feedback surveys',
    category: 'Assessment',
    sector: 'SME',
    tags: ['SME', 'Customer', 'Satisfaction', 'Survey'],
    fields: [
      { id: '1', type: 'text', label: 'Customer Name', required: false, placeholder: 'Customer name (optional)' },
      { id: '2', type: 'select', label: 'Customer Type', required: true, options: ['Individual', 'Small Business', 'Large Business', 'Government', 'Non-Profit'] },
      { id: '3', type: 'select', label: 'How long have you been our customer?', required: true, options: ['Less than 6 months', '6-12 months', '1-2 years', '2-5 years', '5+ years'] },
      { id: '4', type: 'select', label: 'Overall Satisfaction', required: true, options: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'] },
      { id: '5', type: 'select', label: 'Product/Service Quality', required: true, options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'] },
      { id: '6', type: 'select', label: 'Customer Service Rating', required: true, options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'] },
      { id: '7', type: 'select', label: 'Value for Money', required: true, options: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'] },
      { id: '8', type: 'select', label: 'Likelihood to Recommend', required: true, options: ['Very Unlikely', 'Unlikely', 'Neutral', 'Likely', 'Very Likely'] },
      { id: '9', type: 'textarea', label: 'What do we do well?', required: false, placeholder: 'Positive feedback' },
      { id: '10', type: 'textarea', label: 'How can we improve?', required: false, placeholder: 'Suggestions for improvement' }
    ]
  },
  {
    id: 'sme-12',
    name: 'Environmental Compliance Assessment',
    description: 'Assess environmental compliance requirements and status',
    category: 'Compliance',
    sector: 'SME',
    tags: ['SME', 'Environmental', 'Compliance', 'Regulations'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Business name' },
      { id: '2', type: 'select', label: 'Industry Type', required: true, options: ['Manufacturing', 'Chemical', 'Food Processing', 'Automotive', 'Electronics', 'Construction'] },
      { id: '3', type: 'checkbox', label: 'Environmental Aspects', required: true, options: ['Air Emissions', 'Water Discharge', 'Waste Generation', 'Chemical Storage', 'Noise Pollution'] },
      { id: '4', type: 'checkbox', label: 'Required Permits', required: false, options: ['Air Quality Permit', 'Water Discharge Permit', 'Waste Management Permit', 'Chemical Storage Permit'] },
      { id: '5', type: 'select', label: 'Facility Size', required: true, options: ['Small (<50 employees)', 'Medium (50-250)', 'Large (250+)', 'Multiple Locations'] },
      { id: '6', type: 'checkbox', label: 'Environmental Programs', required: false, options: ['Recycling Program', 'Energy Management', 'Water Conservation', 'Waste Reduction'] },
      { id: '7', type: 'textarea', label: 'Environmental Concerns', required: false, placeholder: 'Current environmental challenges' },
      { id: '8', type: 'text', label: 'Environmental Coordinator', required: false, placeholder: 'Environmental manager name' },
      { id: '9', type: 'date', label: 'Last Environmental Audit', required: false },
      { id: '10', type: 'file', label: 'Environmental Documentation', required: false, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'sme-13',
    name: 'Employee Training Program Registration',
    description: 'Register for employee training and development programs',
    category: 'Registration',
    sector: 'SME',
    tags: ['SME', 'Training', 'Employee', 'Development'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Business name' },
      { id: '2', type: 'number', label: 'Number of Participants', required: true, placeholder: 'Employees to be trained' },
      { id: '3', type: 'checkbox', label: 'Training Areas', required: true, options: ['Safety Training', 'Technical Skills', 'Management Development', 'Customer Service', 'Compliance Training'] },
      { id: '4', type: 'select', label: 'Training Format', required: true, options: ['In-Person', 'Online', 'Hybrid', 'On-Site', 'Workshop'] },
      { id: '5', type: 'select', label: 'Training Duration', required: true, options: ['Half Day', 'Full Day', '2-3 Days', '1 Week', 'Ongoing Program'] },
      { id: '6', type: 'number', label: 'Training Budget', required: false, placeholder: 'Budget per participant (USD)' },
      { id: '7', type: 'date', label: 'Preferred Start Date', required: true },
      { id: '8', type: 'textarea', label: 'Specific Requirements', required: false, placeholder: 'Special training needs or requirements' },
      { id: '9', type: 'text', label: 'Training Coordinator', required: true, placeholder: 'Contact person for training' },
      { id: '10', type: 'checkbox', label: 'Certification Needed', required: false, options: ['Industry Certification', 'Continuing Education Credits', 'Internal Certificate', 'No Certification'] }
    ]
  },
  {
    id: 'sme-14',
    name: 'Business Continuity Planning',
    description: 'Develop business continuity and disaster recovery plans',
    category: 'Assessment',
    sector: 'SME',
    tags: ['SME', 'Continuity', 'Disaster', 'Planning'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Company name' },
      { id: '2', type: 'select', label: 'Business Type', required: true, options: ['Manufacturing', 'Retail', 'Services', 'Technology', 'Healthcare', 'Finance'] },
      { id: '3', type: 'checkbox', label: 'Critical Business Functions', required: true, options: ['Customer Service', 'Production', 'Sales', 'IT Systems', 'Supply Chain'] },
      { id: '4', type: 'checkbox', label: 'Potential Threats', required: true, options: ['Natural Disasters', 'Cyber Attacks', 'Equipment Failure', 'Key Personnel Loss', 'Supply Chain Disruption'] },
      { id: '5', type: 'select', label: 'Recovery Time Objective', required: true, options: ['1-4 hours', '4-24 hours', '1-3 days', '3-7 days', '1+ weeks'] },
      { id: '6', type: 'number', label: 'Daily Revenue at Risk', required: false, placeholder: 'Daily revenue loss (USD)' },
      { id: '7', type: 'checkbox', label: 'Backup Systems', required: false, options: ['Data Backup', 'Alternate Location', 'Remote Work Capability', 'Backup Suppliers'] },
      { id: '8', type: 'text', label: 'Emergency Coordinator', required: true, placeholder: 'Business continuity coordinator' },
      { id: '9', type: 'textarea', label: 'Current Preparedness', required: false, placeholder: 'Existing emergency plans or procedures' },
      { id: '10', type: 'file', label: 'Current Plan Document', required: false, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'sme-15',
    name: 'Marketing Campaign Assessment',
    description: 'Assess marketing campaign effectiveness and ROI',
    category: 'Assessment',
    sector: 'SME',
    tags: ['SME', 'Marketing', 'Campaign', 'ROI'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Company name' },
      { id: '2', type: 'text', label: 'Campaign Name', required: true, placeholder: 'Marketing campaign title' },
      { id: '3', type: 'checkbox', label: 'Marketing Channels', required: true, options: ['Social Media', 'Email Marketing', 'Print Advertising', 'Radio/TV', 'Direct Mail', 'Online Advertising'] },
      { id: '4', type: 'number', label: 'Campaign Budget', required: true, placeholder: 'Total campaign budget (USD)' },
      { id: '5', type: 'date', label: 'Campaign Start Date', required: true },
      { id: '6', type: 'date', label: 'Campaign End Date', required: true },
      { id: '7', type: 'select', label: 'Primary Goal', required: true, options: ['Brand Awareness', 'Lead Generation', 'Sales Increase', 'Customer Retention', 'Market Expansion'] },
      { id: '8', type: 'number', label: 'Target Audience Size', required: false, placeholder: 'Number of people targeted' },
      { id: '9', type: 'number', label: 'Generated Leads', required: false, placeholder: 'Number of leads generated' },
      { id: '10', type: 'number', label: 'Revenue Generated', required: false, placeholder: 'Revenue attributed to campaign (USD)' }
    ]
  },
  {
    id: 'sme-16',
    name: 'Workplace Safety Assessment',
    description: 'Assess workplace safety conditions and compliance',
    category: 'Assessment',
    sector: 'SME',
    tags: ['SME', 'Safety', 'Workplace', 'OSHA'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Business name' },
      { id: '2', type: 'select', label: 'Industry Type', required: true, options: ['Manufacturing', 'Construction', 'Retail', 'Office', 'Healthcare', 'Transportation'] },
      { id: '3', type: 'number', label: 'Number of Employees', required: true, placeholder: 'Total workforce' },
      { id: '4', type: 'checkbox', label: 'Safety Hazards Present', required: true, options: ['Chemical Exposure', 'Fall Hazards', 'Machinery', 'Electrical', 'Ergonomic', 'Noise'] },
      { id: '5', type: 'checkbox', label: 'Safety Programs', required: false, options: ['Safety Training', 'PPE Program', 'Emergency Procedures', 'Incident Reporting', 'Safety Committee'] },
      { id: '6', type: 'number', label: 'Incidents Last Year', required: false, placeholder: 'Number of workplace incidents' },
      { id: '7', type: 'text', label: 'Safety Officer', required: false, placeholder: 'Designated safety person' },
      { id: '8', type: 'date', label: 'Last Safety Inspection', required: false },
      { id: '9', type: 'textarea', label: 'Safety Concerns', required: false, placeholder: 'Current safety issues or concerns' },
      { id: '10', type: 'file', label: 'Safety Documentation', required: false, acceptedFileTypes: ['pdf'] }
    ]
  },
  {
    id: 'sme-17',
    name: 'Financial Health Assessment',
    description: 'Assess overall financial health and performance',
    category: 'Assessment',
    sector: 'SME',
    tags: ['SME', 'Financial', 'Health', 'Performance'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Company name' },
      { id: '2', type: 'number', label: 'Annual Revenue', required: true, placeholder: 'Last year revenue (USD)' },
      { id: '3', type: 'number', label: 'Net Profit Margin (%)', required: false, placeholder: 'Profit margin percentage' },
      { id: '4', type: 'number', label: 'Current Assets', required: false, placeholder: 'Current assets value (USD)' },
      { id: '5', type: 'number', label: 'Current Liabilities', required: false, placeholder: 'Current liabilities (USD)' },
      { id: '6', type: 'number', label: 'Outstanding Debt', required: false, placeholder: 'Total debt (USD)' },
      { id: '7', type: 'select', label: 'Cash Flow Status', required: true, options: ['Positive', 'Break-even', 'Negative', 'Seasonal Variation', 'Uncertain'] },
      { id: '8', type: 'number', label: 'Months of Cash Reserve', required: false, placeholder: 'Cash runway in months' },
      { id: '9', type: 'checkbox', label: 'Financial Concerns', required: false, options: ['Cash Flow', 'Debt Management', 'Profitability', 'Growth Funding', 'Tax Issues'] },
      { id: '10', type: 'text', label: 'Accountant/CPA', required: false, placeholder: 'Financial advisor name' }
    ]
  },
  {
    id: 'sme-18',
    name: 'Digital Transformation Assessment',
    description: 'Assess digital transformation readiness and strategy',
    category: 'Assessment',
    sector: 'SME',
    tags: ['SME', 'Digital', 'Transformation', 'Technology'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Business name' },
      { id: '2', type: 'select', label: 'Industry Sector', required: true, options: ['Manufacturing', 'Retail', 'Healthcare', 'Finance', 'Professional Services', 'Other'] },
      { id: '3', type: 'checkbox', label: 'Current Digital Tools', required: true, options: ['Website', 'E-commerce', 'CRM System', 'Social Media', 'Cloud Services', 'Mobile App'] },
      { id: '4', type: 'select', label: 'Digital Maturity Level', required: true, options: ['Basic', 'Developing', 'Defined', 'Managed', 'Optimized'] },
      { id: '5', type: 'checkbox', label: 'Transformation Goals', required: true, options: ['Customer Experience', 'Operational Efficiency', 'New Revenue Streams', 'Data Analytics', 'Remote Work'] },
      { id: '6', type: 'number', label: 'Digital Investment Budget', required: false, placeholder: 'Annual digital budget (USD)' },
      { id: '7', type: 'checkbox', label: 'Challenges Expected', required: true, options: ['Employee Training', 'Technology Integration', 'Security Concerns', 'Cost Management', 'Change Management'] },
      { id: '8', type: 'select', label: 'Implementation Timeline', required: true, options: ['3-6 months', '6-12 months', '1-2 years', '2+ years'] },
      { id: '9', type: 'text', label: 'Digital Champion', required: false, placeholder: 'Person leading digital initiative' },
      { id: '10', type: 'textarea', label: 'Success Metrics', required: false, placeholder: 'How will you measure success?' }
    ]
  },
  {
    id: 'sme-19',
    name: 'Succession Planning Assessment',
    description: 'Assess business succession planning and leadership transition',
    category: 'Assessment',
    sector: 'SME',
    tags: ['SME', 'Succession', 'Planning', 'Leadership'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Company name' },
      { id: '2', type: 'text', label: 'Current Owner/CEO', required: true, placeholder: 'Current business leader' },
      { id: '3', type: 'number', label: 'Owner Age', required: false, placeholder: 'Current owner age' },
      { id: '4', type: 'select', label: 'Succession Timeline', required: true, options: ['1-2 years', '3-5 years', '5-10 years', '10+ years', 'Undetermined'] },
      { id: '5', type: 'select', label: 'Preferred Succession Type', required: true, options: ['Family Member', 'Key Employee', 'External Sale', 'Management Buyout', 'Liquidation'] },
      { id: '6', type: 'checkbox', label: 'Key Leadership Roles', required: true, options: ['CEO/President', 'Operations Manager', 'Sales Manager', 'Financial Manager', 'Technical Leader'] },
      { id: '7', type: 'textarea', label: 'Potential Successors', required: false, placeholder: 'Potential candidates for key roles' },
      { id: '8', type: 'number', label: 'Business Valuation', required: false, placeholder: 'Estimated business value (USD)' },
      { id: '9', type: 'checkbox', label: 'Planning Elements', required: false, options: ['Leadership Development', 'Financial Planning', 'Legal Documentation', 'Tax Planning', 'Employee Communication'] },
      { id: '10', type: 'text', label: 'Professional Advisor', required: false, placeholder: 'Attorney/CPA/Consultant' }
    ]
  },
  {
    id: 'sme-20',
    name: 'Customer Acquisition Strategy Assessment',
    description: 'Assess customer acquisition strategies and effectiveness',
    category: 'Assessment',
    sector: 'SME',
    tags: ['SME', 'Customer', 'Acquisition', 'Strategy'],
    fields: [
      { id: '1', type: 'text', label: 'Business Name', required: true, placeholder: 'Company name' },
      { id: '2', type: 'textarea', label: 'Target Customer Profile', required: true, placeholder: 'Describe ideal customer' },
      { id: '3', type: 'checkbox', label: 'Current Acquisition Channels', required: true, options: ['Referrals', 'Digital Marketing', 'Sales Team', 'Partnerships', 'Trade Shows', 'Cold Outreach'] },
      { id: '4', type: 'number', label: 'Monthly New Customers', required: false, placeholder: 'Average new customers per month' },
      { id: '5', type: 'number', label: 'Customer Acquisition Cost', required: false, placeholder: 'Cost per new customer (USD)' },
      { id: '6', type: 'number', label: 'Customer Lifetime Value', required: false, placeholder: 'Average customer value (USD)' },
      { id: '7', type: 'select', label: 'Most Effective Channel', required: true, options: ['Referrals', 'Digital Marketing', 'Direct Sales', 'Partnerships', 'Content Marketing', 'Events'] },
      { id: '8', type: 'number', label: 'Conversion Rate (%)', required: false, placeholder: 'Lead to customer conversion rate' },
      { id: '9', type: 'textarea', label: 'Acquisition Challenges', required: true, placeholder: 'Main obstacles in customer acquisition' },
      { id: '10', type: 'number', label: 'Acquisition Budget', required: false, placeholder: 'Monthly acquisition budget (USD)' }
    ]
  }
];

// Consolidate all templates
export const allTemplates: FormTemplate[] = [
  ...governmentTemplates,
  ...insuranceTemplates,
  ...fintechTemplates,
  ...healthTemplates,
  ...energyTemplates,
  ...telecomTemplates,
  ...startupsTemplates,
  ...smeTemplates,
  ...multiSectorTemplates
];
