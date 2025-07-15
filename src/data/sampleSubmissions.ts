
import { FormSubmission } from "@/types/form";

export const sampleSubmissions: FormSubmission[] = [
  {
    id: "1",
    formId: "form-1",
    submitterName: "John Doe",
    submitterEmail: "john@company.com",
    companyName: "TechCorp Inc",
    submissionType: "vendor",
    responses: {
      company_name: "TechCorp Inc",
      contact_person: "John Doe",
      email: "john@company.com"
    },
    submittedAt: new Date("2024-01-15"),
    status: "approved",
    approvalType: "fully",
    timeSpent: 25,
    score: {
      total: 85,
      maxTotal: 100,
      percentage: 85,
      riskLevel: "low"
    }
  },
  {
    id: "2",
    formId: "form-1",
    submitterName: "Jane Smith",
    submitterEmail: "jane@external.com",
    submissionType: "external",
    responses: {
      company_name: "External Solutions",
      contact_person: "Jane Smith"
    },
    submittedAt: new Date("2024-01-20"),
    status: "under_review",
    timeSpent: 15
  }
];
