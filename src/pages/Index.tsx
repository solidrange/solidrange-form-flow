import { useState, useEffect } from "react";
import { FormBuilder } from "@/components/FormBuilder";
import { FormPreview } from "@/components/FormPreview";
import { SubmissionReview } from "@/components/SubmissionReview";
import { Reports } from "@/components/Reports";
import { Analytics } from "@/components/Analytics";
import { GlobalSettings } from "@/components/GlobalSettings";
import { AppSidebar } from "@/components/AppSidebar";
import { NotificationPanel } from "@/components/NotificationPanel";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCard } from "@/components/AnimatedCard";
import { BrandLogo } from "@/components/BrandLogo";
import { useBrand } from "@/contexts/BrandContext";
import { 
  Bell, 
  Settings, 
  TrendingUp, 
  Users, 
  FileText, 
  AlertTriangle,
  Clock,
  CheckCircle,
  BarChart3,
  PieChart,
  Target,
  Activity,
  Award,
  Building
} from "lucide-react";
import { sampleForm, sampleSubmissions } from "@/data/sampleData";
import { Form, FormSubmission } from "@/types/form";

export default function Index() {
  const { brand } = useBrand();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [forms] = useState<Form[]>([sampleForm]);
  const [submissions, setSubmissions] = useState<FormSubmission[]>(sampleSubmissions);
  const [selectedForm] = useState<Form>(sampleForm);

  useEffect(() => {
    const handleSetFilter = (event: CustomEvent) => {
      const { detail } = event;
      console.log("Received filter event:", detail);
      // Handle filter logic here
    };

    const handleSelectSubmission = (event: CustomEvent) => {
      const { detail } = event;
      console.log("Received select submission event:", detail);
      // Handle select submission logic here
    };

    window.addEventListener('setSubmissionFilter', handleSetFilter as EventListener);
    window.addEventListener('selectSubmission', handleSelectSubmission as EventListener);

    return () => {
      window.removeEventListener('setSubmissionFilter', handleSetFilter as EventListener);
      window.removeEventListener('selectSubmission', handleSelectSubmission as EventListener);
    };
  }, []);

  const handleUpdateSubmission = (submissionId: string, updates: any) => {
    setSubmissions(prev => 
      prev.map(sub => 
        sub.id === submissionId ? { ...sub, ...updates } : sub
      )
    );
  };

  const handleResendForm = (submissionId: string, comments: string) => {
    console.log(`Resending form for submission ${submissionId} with comments: ${comments}`);
    handleUpdateSubmission(submissionId, { 
      status: 'submitted', 
      comments,
      lastResent: new Date()
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Form Management Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-600 hidden sm:block">Monitor and manage your form submissions</p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow" 
                onClick={() => {
                  setActiveTab("submissions");
                  window.dispatchEvent(new CustomEvent('setSubmissionFilter', { 
                    detail: { status: [] } 
                  }));
                }}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Total</p>
                      <p className="text-lg sm:text-2xl font-bold">55</p>
                    </div>
                    <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow" 
                onClick={() => {
                  setActiveTab("submissions");
                  window.dispatchEvent(new CustomEvent('setSubmissionFilter', { 
                    detail: { status: ['submitted'] } 
                  }));
                }}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Pending</p>
                      <p className="text-lg sm:text-2xl font-bold text-orange-600">12</p>
                    </div>
                    <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow" 
                onClick={() => {
                  setActiveTab("submissions");
                  window.dispatchEvent(new CustomEvent('setSubmissionFilter', { 
                    detail: { status: ['approved'] } 
                  }));
                }}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Approved</p>
                      <p className="text-lg sm:text-2xl font-bold text-green-600">13</p>
                    </div>
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow" 
                onClick={() => setActiveTab("analytics")}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">Rate</p>
                      <p className="text-lg sm:text-2xl font-bold">78%</p>
                    </div>
                    <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity and Risk Assessment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <AnimatedCard title="Recent Activity" icon={Activity} iconColor="text-orange-600">
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { company: "TechCorp Solutions", date: "3/19/2025", status: "submitted", statusColor: "blue" },
                    { company: "Global Finance Inc", date: "3/21/2024", status: "rejected", statusColor: "red" },
                    { company: "MedTech Industries", date: "1/14/2025", status: "rejected", statusColor: "red" },
                    { company: "SecureCloud Systems", date: "6/4/2025", status: "under review", statusColor: "yellow" }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => {
                        setActiveTab("submissions");
                        setTimeout(() => {
                          window.dispatchEvent(new CustomEvent('selectSubmission', { 
                            detail: { submissionId: `submission-${index + 1}` } 
                          }));
                        }, 100);
                      }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Building className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                        <div>
                          <p className="text-xs sm:text-sm font-medium">{item.company}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={item.statusColor === 'blue' ? 'default' : item.statusColor === 'red' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </AnimatedCard>

              <AnimatedCard title="Risk Assessment Overview" icon={AlertTriangle} iconColor="text-red-600" delay={200}>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { level: "Critical Risk", count: 16, color: "red" },
                    { level: "High Risk", count: 11, color: "orange" },
                    { level: "Medium Risk", count: 17, color: "yellow" },
                    { level: "Low Risk", count: 11, color: "green" }
                  ].map((risk, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => {
                        setActiveTab("submissions");
                        window.dispatchEvent(new CustomEvent('setSubmissionFilter', { 
                          detail: { riskLevel: [risk.level.toLowerCase().replace(' risk', '')] } 
                        }));
                      }}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-${risk.color}-500`}></div>
                        <span className="text-xs sm:text-sm font-medium">{risk.level}</span>
                      </div>
                      <span className="text-sm sm:text-lg font-bold">{risk.count}</span>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            </div>

            {/* Quick Actions */}
            <AnimatedCard title="Quick Actions" icon={Target} iconColor="text-blue-600" delay={400}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto p-3 sm:p-4 flex-col gap-2"
                  onClick={() => setActiveTab("form-builder")}
                >
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm">New Form</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-3 sm:p-4 flex-col gap-2"
                  onClick={() => setActiveTab("submissions")}
                >
                  <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm">Review</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-3 sm:p-4 flex-col gap-2"
                  onClick={() => setActiveTab("analytics")}
                >
                  <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm">Analytics</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto p-3 sm:p-4 flex-col gap-2"
                  onClick={() => setActiveTab("reports")}
                >
                  <PieChart className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs sm:text-sm">Reports</span>
                </Button>
              </div>
            </AnimatedCard>
          </div>
        );
      case "submissions":
        return (
          <SubmissionReview 
            submissions={submissions}
            form={selectedForm}
            onUpdateSubmission={handleUpdateSubmission}
            onResendForm={handleResendForm}
          />
        );
      case "form-builder":
        return <FormBuilder />;
      case "reports":
        return <Reports submissions={submissions} forms={forms} />;
      case "analytics":
        return <Analytics submissions={submissions} />;
      case "settings":
        return <GlobalSettings />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="flex h-12 sm:h-14 lg:h-16 shrink-0 items-center gap-2 border-b px-3 sm:px-4 lg:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2 sm:gap-3">
              <BrandLogo size="sm" showText={false} />
              <div className="hidden sm:block">
                <h1 className="text-base sm:text-lg font-semibold">{brand.name}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden lg:block">{brand.tagline}</p>
              </div>
            </div>
            
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 text-xs bg-red-500 text-white">
                    3
                  </Badge>
                  <span className="sr-only sm:not-sr-only sm:ml-2 text-xs sm:text-sm">Notifications</span>
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 z-50">
                    <NotificationPanel onClose={() => setShowNotifications(false)} />
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("settings")}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only sm:not-sr-only text-xs sm:text-sm">Settings</span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-3 sm:p-4 lg:p-6">
            {renderContent()}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
