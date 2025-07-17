
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
  Laptop
} from 'lucide-react';

interface FormLibraryProps {
  onUseTemplate: (template: FormTemplate) => void;
}

const formTemplates: FormTemplate[] = [
  // Vendor Risk Assessment
  {
    id: 'vendor-risk-basic',
    name: 'Basic Vendor Risk Assessment',
    description: 'Essential security and compliance evaluation for new vendors',
    category: 'vendor-risk',
    targetAudience: ['vendors', 'procurement'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true, placeholder: 'Enter vendor company name' },
      { id: '2', type: 'email', label: 'Primary Contact Email', required: true },
      { id: '3', type: 'select', label: 'Industry Sector', required: true, options: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Other'] },
      { id: '4', type: 'radio', label: 'Data Processing Level', required: true, options: ['No Data', 'Non-Sensitive', 'Sensitive', 'Highly Sensitive'] },
      { id: '5', type: 'checkbox', label: 'Compliance Certifications', options: ['ISO 27001', 'SOC 2', 'HIPAA', 'GDPR', 'PCI DSS'] },
      { id: '6', type: 'textarea', label: 'Security Controls Description', placeholder: 'Describe your security measures...' }
    ]
  },
  {
    id: 'vendor-risk-comprehensive',
    name: 'Comprehensive Vendor Risk Assessment',
    description: 'Detailed security, financial, and operational risk evaluation',
    category: 'vendor-risk',
    targetAudience: ['vendors', 'security-teams'],
    fields: [
      { id: '1', type: 'text', label: 'Vendor Legal Name', required: true },
      { id: '2', type: 'text', label: 'Tax ID / Registration Number', required: true },
      { id: '3', type: 'select', label: 'Risk Tier', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
      { id: '4', type: 'number', label: 'Annual Revenue (USD)', required: true },
      { id: '5', type: 'radio', label: 'Geographic Location', required: true, options: ['Domestic', 'EU/EEA', 'Other International'] },
      { id: '6', type: 'checkbox', label: 'Services Provided', options: ['Data Processing', 'Cloud Services', 'Payment Processing', 'Customer Support', 'Software Development'] },
      { id: '7', type: 'textarea', label: 'Business Continuity Plan', placeholder: 'Describe your BCP and disaster recovery...' },
      { id: '8', type: 'file', label: 'Insurance Certificates' },
      { id: '9', type: 'date', label: 'Contract Start Date' },
      { id: '10', type: 'date', label: 'Next Review Date' }
    ]
  },
  {
    id: 'vendor-cybersecurity',
    name: 'Cybersecurity Vendor Assessment',
    description: 'Focused cybersecurity and data protection evaluation',
    category: 'vendor-risk',
    targetAudience: ['security-teams', 'it-teams'],
    fields: [
      { id: '1', type: 'text', label: 'Vendor Name', required: true },
      { id: '2', type: 'radio', label: 'Access to Our Systems', required: true, options: ['No Access', 'Limited Access', 'Full Access', 'Administrative Access'] },
      { id: '3', type: 'checkbox', label: 'Security Frameworks', options: ['NIST', 'ISO 27001', 'CIS Controls', 'OWASP', 'SANS'] },
      { id: '4', type: 'select', label: 'Incident Response Time', required: true, options: ['< 1 hour', '1-4 hours', '4-24 hours', '> 24 hours'] },
      { id: '5', type: 'textarea', label: 'Data Encryption Methods', placeholder: 'Describe encryption at rest and in transit...' },
      { id: '6', type: 'radio', label: 'Penetration Testing Frequency', options: ['Quarterly', 'Semi-Annual', 'Annual', 'As Needed'] },
      { id: '7', type: 'checkbox', label: 'Security Monitoring', options: ['24/7 SOC', 'SIEM', 'Threat Intelligence', 'Vulnerability Scanning'] }
    ]
  },

  // Customer Feedback
  {
    id: 'customer-satisfaction',
    name: 'Customer Satisfaction Survey',
    description: 'Measure customer satisfaction and identify improvement areas',
    category: 'customer-feedback',
    targetAudience: ['customers', 'general'],
    fields: [
      { id: '1', type: 'text', label: 'Customer ID (Optional)', placeholder: 'Enter your customer ID' },
      { id: '2', type: 'radio', label: 'Overall Satisfaction', required: true, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
      { id: '3', type: 'select', label: 'Product/Service Used', required: true, options: ['Product A', 'Product B', 'Service Package', 'Support Services'] },
      { id: '4', type: 'radio', label: 'Likelihood to Recommend', required: true, options: ['0-6 (Detractor)', '7-8 (Passive)', '9-10 (Promoter)'] },
      { id: '5', type: 'checkbox', label: 'Areas for Improvement', options: ['Response Time', 'Product Quality', 'Pricing', 'Customer Support', 'User Interface'] },
      { id: '6', type: 'textarea', label: 'Additional Comments', placeholder: 'Please share any additional feedback...' },
      { id: '7', type: 'email', label: 'Contact Email (Optional)', placeholder: 'For follow-up questions' }
    ]
  },
  {
    id: 'product-feedback',
    name: 'Product Feedback Form',
    description: 'Collect detailed feedback on product features and usability',
    category: 'customer-feedback',
    targetAudience: ['customers', 'beta-users'],
    fields: [
      { id: '1', type: 'select', label: 'Product Version', required: true, options: ['v1.0', 'v1.1', 'v2.0', 'Beta Version'] },
      { id: '2', type: 'radio', label: 'Ease of Use', required: true, options: ['Very Easy', 'Easy', 'Moderate', 'Difficult', 'Very Difficult'] },
      { id: '3', type: 'checkbox', label: 'Features Used', options: ['Dashboard', 'Reports', 'Integrations', 'Mobile App', 'API'] },
      { id: '4', type: 'radio', label: 'Performance Rating', required: true, options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'] },
      { id: '5', type: 'textarea', label: 'Bug Reports', placeholder: 'Describe any bugs or issues encountered...' },
      { id: '6', type: 'textarea', label: 'Feature Requests', placeholder: 'What features would you like to see added?' },
      { id: '7', type: 'file', label: 'Screenshots (Optional)' }
    ]
  },

  // Human Resources
  {
    id: 'employee-onboarding',
    name: 'Employee Onboarding Form',
    description: 'Comprehensive new employee information collection',
    category: 'human-resources',
    targetAudience: ['new-employees', 'hr-teams'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true },
      { id: '2', type: 'email', label: 'Personal Email', required: true },
      { id: '3', type: 'text', label: 'Phone Number', required: true },
      { id: '4', type: 'text', label: 'Emergency Contact', required: true },
      { id: '5', type: 'text', label: 'Emergency Contact Phone', required: true },
      { id: '6', type: 'date', label: 'Start Date', required: true },
      { id: '7', type: 'select', label: 'Department', required: true, options: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'] },
      { id: '8', type: 'text', label: 'Job Title', required: true },
      { id: '9', type: 'select', label: 'Employment Type', required: true, options: ['Full-time', 'Part-time', 'Contract', 'Intern'] },
      { id: '10', type: 'textarea', label: 'Dietary Restrictions/Allergies' },
      { id: '11', type: 'checkbox', label: 'Required Documents Submitted', options: ['ID Copy', 'Tax Forms', 'Bank Details', 'Signed Contract'] }
    ]
  },
  {
    id: 'performance-review',
    name: 'Performance Review Form',
    description: 'Annual or quarterly employee performance evaluation',
    category: 'human-resources',
    targetAudience: ['managers', 'employees'],
    fields: [
      { id: '1', type: 'text', label: 'Employee Name', required: true },
      { id: '2', type: 'text', label: 'Employee ID', required: true },
      { id: '3', type: 'text', label: 'Reviewer Name', required: true },
      { id: '4', type: 'date', label: 'Review Period Start' },
      { id: '5', type: 'date', label: 'Review Period End' },
      { id: '6', type: 'radio', label: 'Overall Performance', required: true, options: ['Exceeds Expectations', 'Meets Expectations', 'Below Expectations', 'Needs Improvement'] },
      { id: '7', type: 'textarea', label: 'Key Achievements', placeholder: 'List major accomplishments during this period...' },
      { id: '8', type: 'textarea', label: 'Areas for Development', placeholder: 'Identify areas for improvement...' },
      { id: '9', type: 'textarea', label: 'Goals for Next Period', placeholder: 'Set objectives for the upcoming period...' },
      { id: '10', type: 'radio', label: 'Promotion Recommendation', options: ['Strongly Recommend', 'Recommend', 'Not Ready', 'Not Applicable'] }
    ]
  },

  // Healthcare
  {
    id: 'patient-intake',
    name: 'Patient Intake Form',
    description: 'New patient registration and medical history',
    category: 'healthcare',
    targetAudience: ['patients', 'medical-staff'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Full Name', required: true },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'radio', label: 'Gender', required: true, options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
      { id: '4', type: 'text', label: 'Insurance Provider' },
      { id: '5', type: 'text', label: 'Policy Number' },
      { id: '6', type: 'textarea', label: 'Current Medications', placeholder: 'List all current medications...' },
      { id: '7', type: 'textarea', label: 'Known Allergies', placeholder: 'List any known allergies...' },
      { id: '8', type: 'checkbox', label: 'Medical History', options: ['Diabetes', 'Hypertension', 'Heart Disease', 'Cancer', 'Mental Health'] },
      { id: '9', type: 'text', label: 'Emergency Contact Name', required: true },
      { id: '10', type: 'text', label: 'Emergency Contact Phone', required: true }
    ]
  },
  {
    id: 'symptom-checker',
    name: 'Symptom Assessment Form',
    description: 'Pre-visit symptom evaluation and triage',
    category: 'healthcare',
    targetAudience: ['patients', 'medical-staff'],
    fields: [
      { id: '1', type: 'text', label: 'Patient Name', required: true },
      { id: '2', type: 'date', label: 'Date of Symptoms' },
      { id: '3', type: 'checkbox', label: 'Current Symptoms', options: ['Fever', 'Cough', 'Shortness of Breath', 'Headache', 'Nausea', 'Fatigue'] },
      { id: '4', type: 'radio', label: 'Pain Level (1-10)', options: ['1-2 (Mild)', '3-4 (Moderate)', '5-6 (Moderate-Severe)', '7-8 (Severe)', '9-10 (Extreme)'] },
      { id: '5', type: 'textarea', label: 'Symptom Description', placeholder: 'Describe your symptoms in detail...' },
      { id: '6', type: 'radio', label: 'Urgency Level', required: true, options: ['Emergency', 'Urgent', 'Semi-Urgent', 'Non-Urgent'] },
      { id: '7', type: 'checkbox', label: 'Recent Travel', options: ['Domestic', 'International', 'No Recent Travel'] }
    ]
  },

  // Education
  {
    id: 'course-enrollment',
    name: 'Course Enrollment Form',
    description: 'Student registration for courses and programs',
    category: 'education',
    targetAudience: ['students', 'academic-staff'],
    fields: [
      { id: '1', type: 'text', label: 'Student Name', required: true },
      { id: '2', type: 'text', label: 'Student ID', required: true },
      { id: '3', type: 'email', label: 'Student Email', required: true },
      { id: '4', type: 'select', label: 'Academic Year', required: true, options: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'] },
      { id: '5', type: 'select', label: 'Program of Study', required: true, options: ['Computer Science', 'Business', 'Engineering', 'Arts', 'Sciences'] },
      { id: '6', type: 'checkbox', label: 'Course Selection', options: ['Mathematics', 'Science', 'Literature', 'History', 'Foreign Language'] },
      { id: '7', type: 'radio', label: 'Enrollment Status', required: true, options: ['Full-time', 'Part-time', 'Audit'] },
      { id: '8', type: 'textarea', label: 'Special Accommodations', placeholder: 'Describe any needed accommodations...' }
    ]
  },
  {
    id: 'student-feedback',
    name: 'Course Evaluation Form',
    description: 'Student feedback on course content and instruction',
    category: 'education',
    targetAudience: ['students', 'faculty'],
    fields: [
      { id: '1', type: 'text', label: 'Course Code', required: true },
      { id: '2', type: 'text', label: 'Course Title', required: true },
      { id: '3', type: 'text', label: 'Instructor Name', required: true },
      { id: '4', type: 'radio', label: 'Overall Course Rating', required: true, options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'] },
      { id: '5', type: 'radio', label: 'Instructor Effectiveness', required: true, options: ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'] },
      { id: '6', type: 'radio', label: 'Course Difficulty', options: ['Too Easy', 'Just Right', 'Too Difficult'] },
      { id: '7', type: 'textarea', label: 'What did you like most?', placeholder: 'Describe the best aspects of the course...' },
      { id: '8', type: 'textarea', label: 'Suggestions for improvement', placeholder: 'How could this course be improved?' }
    ]
  },

  // Financial Services
  {
    id: 'loan-application',
    name: 'Personal Loan Application',
    description: 'Application form for personal loan requests',
    category: 'financial-services',
    targetAudience: ['customers', 'loan-officers'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true },
      { id: '2', type: 'text', label: 'Social Security Number', required: true },
      { id: '3', type: 'date', label: 'Date of Birth', required: true },
      { id: '4', type: 'number', label: 'Loan Amount Requested', required: true },
      { id: '5', type: 'select', label: 'Loan Purpose', required: true, options: ['Home Improvement', 'Debt Consolidation', 'Education', 'Medical', 'Other'] },
      { id: '6', type: 'number', label: 'Annual Income', required: true },
      { id: '7', type: 'text', label: 'Employer Name', required: true },
      { id: '8', type: 'number', label: 'Years at Current Job' },
      { id: '9', type: 'checkbox', label: 'Assets', options: ['Checking Account', 'Savings Account', 'Investment Account', 'Real Estate', 'Vehicle'] },
      { id: '10', type: 'textarea', label: 'Additional Information', placeholder: 'Any additional financial information...' }
    ]
  },
  {
    id: 'account-opening',
    name: 'Bank Account Opening Form',
    description: 'New customer bank account application',
    category: 'financial-services',
    targetAudience: ['customers', 'bank-staff'],
    fields: [
      { id: '1', type: 'text', label: 'First Name', required: true },
      { id: '2', type: 'text', label: 'Last Name', required: true },
      { id: '3', type: 'date', label: 'Date of Birth', required: true },
      { id: '4', type: 'text', label: 'Address', required: true },
      { id: '5', type: 'text', label: 'Phone Number', required: true },
      { id: '6', type: 'email', label: 'Email Address', required: true },
      { id: '7', type: 'select', label: 'Account Type', required: true, options: ['Checking', 'Savings', 'Money Market', 'CD'] },
      { id: '8', type: 'number', label: 'Initial Deposit Amount' },
      { id: '9', type: 'checkbox', label: 'Additional Services', options: ['Online Banking', 'Mobile Banking', 'Debit Card', 'Checks', 'Overdraft Protection'] }
    ]
  },

  // Real Estate
  {
    id: 'property-listing',
    name: 'Property Listing Form',
    description: 'List residential or commercial property for sale/rent',
    category: 'real-estate',
    targetAudience: ['property-owners', 'agents'],
    fields: [
      { id: '1', type: 'text', label: 'Property Address', required: true },
      { id: '2', type: 'select', label: 'Property Type', required: true, options: ['Single Family', 'Condo', 'Townhouse', 'Commercial', 'Land'] },
      { id: '3', type: 'select', label: 'Listing Type', required: true, options: ['For Sale', 'For Rent', 'For Lease'] },
      { id: '4', type: 'number', label: 'Price/Rent Amount', required: true },
      { id: '5', type: 'number', label: 'Square Footage' },
      { id: '6', type: 'number', label: 'Bedrooms' },
      { id: '7', type: 'number', label: 'Bathrooms' },
      { id: '8', type: 'checkbox', label: 'Features', options: ['Pool', 'Garage', 'Fireplace', 'Hardwood Floors', 'Central AC'] },
      { id: '9', type: 'textarea', label: 'Property Description', placeholder: 'Describe the property features and amenities...' },
      { id: '10', type: 'file', label: 'Property Photos' }
    ]
  },
  {
    id: 'rental-application',
    name: 'Rental Application Form',
    description: 'Tenant application for rental properties',
    category: 'real-estate',
    targetAudience: ['tenants', 'landlords'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true },
      { id: '2', type: 'date', label: 'Date of Birth', required: true },
      { id: '3', type: 'text', label: 'Current Address', required: true },
      { id: '4', type: 'number', label: 'Monthly Income', required: true },
      { id: '5', type: 'text', label: 'Employer Name', required: true },
      { id: '6', type: 'text', label: 'Previous Landlord Contact' },
      { id: '7', type: 'number', label: 'Number of Occupants' },
      { id: '8', type: 'checkbox', label: 'Pets', options: ['No Pets', 'Cat', 'Dog', 'Other Pet'] },
      { id: '9', type: 'textarea', label: 'References', placeholder: 'Provide 2-3 references with contact information...' },
      { id: '10', type: 'date', label: 'Desired Move-in Date' }
    ]
  },

  // Event Management
  {
    id: 'event-registration',
    name: 'Event Registration Form',
    description: 'Registration for conferences, workshops, and events',
    category: 'events',
    targetAudience: ['attendees', 'event-organizers'],
    fields: [
      { id: '1', type: 'text', label: 'Full Name', required: true },
      { id: '2', type: 'email', label: 'Email Address', required: true },
      { id: '3', type: 'text', label: 'Company/Organization' },
      { id: '4', type: 'text', label: 'Job Title' },
      { id: '5', type: 'select', label: 'Registration Type', required: true, options: ['Early Bird', 'Regular', 'Student', 'VIP'] },
      { id: '6', type: 'checkbox', label: 'Sessions of Interest', options: ['Keynote', 'Technical Sessions', 'Workshops', 'Networking', 'Panel Discussions'] },
      { id: '7', type: 'radio', label: 'Dietary Preferences', options: ['No Restrictions', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Other'] },
      { id: '8', type: 'textarea', label: 'Special Requirements', placeholder: 'Any special accommodations needed...' }
    ]
  },
  {
    id: 'vendor-booth',
    name: 'Vendor Booth Application',
    description: 'Application for exhibitor booths at trade shows',
    category: 'events',
    targetAudience: ['vendors', 'exhibitors'],
    fields: [
      { id: '1', type: 'text', label: 'Company Name', required: true },
      { id: '2', type: 'text', label: 'Contact Person', required: true },
      { id: '3', type: 'email', label: 'Contact Email', required: true },
      { id: '4', type: 'select', label: 'Booth Size', required: true, options: ['10x10', '10x20', '20x20', '20x30', 'Custom'] },
      { id: '5', type: 'select', label: 'Industry Category', required: true, options: ['Technology', 'Healthcare', 'Manufacturing', 'Services', 'Retail'] },
      { id: '6', type: 'checkbox', label: 'Required Services', options: ['Electricity', 'Internet', 'Carpet', 'Furniture', 'A/V Equipment'] },
      { id: '7', type: 'textarea', label: 'Product/Service Description', placeholder: 'Describe what you will be showcasing...' },
      { id: '8', type: 'number', label: 'Expected Attendees' }
    ]
  }
];

const categoryIcons = {
  'vendor-risk': Shield,
  'customer-feedback': MessageSquare,
  'human-resources': Users,
  'healthcare': Heart,
  'education': GraduationCap,
  'financial-services': Briefcase,
  'real-estate': Home,
  'events': Calendar,
  'general': FileText
};

const categoryColors = {
  'vendor-risk': 'bg-red-100 text-red-800',
  'customer-feedback': 'bg-blue-100 text-blue-800',
  'human-resources': 'bg-green-100 text-green-800',
  'healthcare': 'bg-pink-100 text-pink-800',
  'education': 'bg-purple-100 text-purple-800',
  'financial-services': 'bg-yellow-100 text-yellow-800',
  'real-estate': 'bg-indigo-100 text-indigo-800',
  'events': 'bg-orange-100 text-orange-800',
  'general': 'bg-gray-100 text-gray-800'
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

  const popularTemplates = formTemplates.filter(template => 
    ['vendor-risk-basic', 'customer-satisfaction', 'employee-onboarding', 'event-registration'].includes(template.id)
  );

  const recentTemplates = formTemplates.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Form Template Library</h2>
        <p className="text-gray-600">Choose from our collection of professionally designed form templates</p>
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
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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

      {/* Template Sections */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                          {template.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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
                        <span>
                          {template.targetAudience?.map(audience => 
                            audience.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                          ).join(', ')}
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
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularTemplates.map((template) => {
              const IconComponent = categoryIcons[template.category as keyof typeof categoryIcons] || FileText;
              const colorClass = categoryColors[template.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800';
              
              return (
                <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer group relative">
                  <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <Badge className={colorClass}>
                        {template.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{template.fields.length} fields</span>
                        <span>
                          {template.targetAudience?.map(audience => 
                            audience.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                          ).join(', ')}
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
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentTemplates.map((template) => {
              const IconComponent = categoryIcons[template.category as keyof typeof categoryIcons] || FileText;
              const colorClass = categoryColors[template.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800';
              
              return (
                <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer group relative">
                  <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    New
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <Badge className={colorClass}>
                        {template.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{template.fields.length} fields</span>
                        <span>
                          {template.targetAudience?.map(audience => 
                            audience.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                          ).join(', ')}
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
        </TabsContent>

        <TabsContent value="by-category" className="space-y-8">
          {categories.map(category => {
            const categoryTemplates = formTemplates.filter(template => template.category === category);
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || FileText;
            const colorClass = categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800';
            
            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-6 w-6 text-gray-600" />
                  <h3 className="text-xl font-semibold">
                    {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h3>
                  <Badge className={colorClass}>{categoryTemplates.length} templates</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="text-sm text-gray-500">
                            {template.fields.length} fields
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
                  ))}
                </div>
              </div>
            );
          })}
        </TabsContent>
      </Tabs>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};
