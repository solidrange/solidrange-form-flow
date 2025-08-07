
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

// Consolidate all templates
export const allTemplates: FormTemplate[] = [
  ...governmentTemplates,
  ...insuranceTemplates,
  ...fintechTemplates,
  ...healthTemplates,
  ...multiSectorTemplates
];
