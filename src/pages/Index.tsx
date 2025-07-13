import { useState, useEffect } from "react";
import { FormBuilder } from "@/components/FormBuilder";
import { FormPreview } from "@/components/FormPreview";
import { SubmissionReview } from "@/components/SubmissionReview";
import { FormLibrary } from "@/components/FormLibrary";
import { GlobalSettings } from "@/components/GlobalSettings";
import { FeatureTestSuite } from "@/components/FeatureTestSuite";
import { Form, FormField } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBrand } from "@/contexts/BrandContext";
import { BrandLogo } from "@/components/BrandLogo";
import { useFormStatus } from "@/hooks/useFormStatus";
import { sampleSubmissions } from "@/data/sampleSubmissions";

const Index = () => {
  const [currentForm, setCurrentForm] = useState<Form>({
    id: Date.now().toString(),
    title: "Untitled Form",
    description: "",
    fields: [],
    analytics: {
      views: 0,
      submissions: 0,
      completionRate: 0,
      emailsSent: 0,
    },
    settings: {
      allowMultipleSubmissions: true,
      requireLogin: false,
      showProgressBar: true,
      scoring: {
        enabled: false,
        passingScore: 70,
        showScoreToUser: true,
      },
      expiration: {
        enabled: false,
        expirationDate: new Date(),
        message: "This form has expired.",
      },
      emailDistribution: {
        enabled: false,
        recipients: [],
        reminderEnabled: false,
        reminderIntervalDays: 7,
        maxReminders: 3,
      },
      approval: {
        enabled: false,
        requireApproval: false,
        approvers: [],
        autoApproveScore: 80,
      },
      documents: {
        enabled: false,
        allowedTypes: [],
        maxSize: 10,
        requiredDocuments: [],
        allowUserUploads: true,
      },
      branding: {
        enabled: true,
        showLogo: true,
        showBrandColors: true,
        brandName: 'FormFlow',
        logo: null,
        colors: {
          primary: {
            main: '208 100% 47%',
            light: '210 100% 70%',
            dark: '208 100% 35%'
          },
          secondary: {
            main: '262 83% 58%',
            light: '262 83% 75%',
            dark: '262 83% 45%'
          }
        }
      },
    },
  });
  const [currentTab, setCurrentTab] = useState("builder");
  const { brand } = useBrand();
  const { setFormStatus } = useFormStatus();

  useEffect(() => {
    setFormStatus({
      title: currentForm.title,
      description: currentForm.description,
      status: "draft",
    });
  }, [currentForm.title, currentForm.description, setFormStatus]);

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setCurrentForm((prevForm) => ({
      ...prevForm,
      fields: prevForm.fields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    }));
  };

  const createNewForm = () => {
    const newForm: Form = {
      id: Date.now().toString(),
      title: "New Form",
      description: "",
      fields: [],
      analytics: {
        views: 0,
        submissions: 0,
        completionRate: 0,
        emailsSent: 0,
      },
      settings: {
        allowMultipleSubmissions: true,
        requireLogin: false,
        showProgressBar: true,
        scoring: {
          enabled: false,
          passingScore: 70,
          showScoreToUser: true,
        },
        expiration: {
          enabled: false,
          expirationDate: new Date(),
          message: "This form has expired.",
        },
        emailDistribution: {
          enabled: false,
          recipients: [],
          reminderEnabled: false,
          reminderIntervalDays: 7,
          maxReminders: 3,
        },
        approval: {
          enabled: false,
          requireApproval: false,
          approvers: [],
          autoApproveScore: 80,
        },
        documents: {
          enabled: false,
          allowedTypes: [],
          maxSize: 10,
          requiredDocuments: [],
          allowUserUploads: true,
        },
        branding: {
          enabled: true,
          showLogo: true,
          showBrandColors: true,
          brandName: brand.name,
          logo: brand.logo,
          colors: brand.colors,
        },
      },
    };
    setCurrentForm(newForm);
    setCurrentTab("builder");
  };

  const handleFormUpdate = (updatedForm: Form) => {
    setCurrentForm(updatedForm);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="mb-6 flex items-center justify-between">
          <BrandLogo size="lg" />
          <div className="flex gap-2">
            <Button onClick={createNewForm} variant="default">
              New Form
            </Button>
          </div>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="library">Library</TabsTrigger>
            <TabsTrigger value="builder">Builder</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="test">Test Suite</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="mt-6">
            <FormLibrary
              onUseTemplate={(template) => {
                setCurrentForm(template);
                setCurrentTab("builder");
              }}
            />
          </TabsContent>

          <TabsContent value="builder" className="mt-6">
            <FormBuilder
              form={currentForm}
              onFormUpdate={setCurrentForm}
            />
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <FormPreview
              formTitle={currentForm.title}
              formDescription={currentForm.description}
              formFields={currentForm.fields}
              formSettings={currentForm.settings}
              attachments={[]}
            />
          </TabsContent>

          <TabsContent value="submissions" className="mt-6">
            <SubmissionReview
              form={currentForm}
              submissions={sampleSubmissions}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <GlobalSettings />
          </TabsContent>

          <TabsContent value="test" className="mt-6">
            <FeatureTestSuite />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
