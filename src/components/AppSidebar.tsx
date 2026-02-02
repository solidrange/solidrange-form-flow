
import { useState } from "react";
import { 
  BarChart3, 
  ClipboardList, 
  Folder, 
  Wrench, 
  Settings,
  FileText,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { BrandLogo } from "@/components/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";
import { HelpPanel } from "@/components/tour/HelpPanel";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasUnpublishedDrafts: boolean;
}

// Map nav item IDs to tour data attributes
const tourIdMap: Record<string, string> = {
  'dashboard': 'nav-dashboard',
  'review-submissions': 'nav-review',
  'forms': 'nav-forms',
  'build-form': 'nav-build',
  'global-settings': 'nav-settings',
  'resources': 'nav-resources'
};

export function AppSidebar({ activeTab, onTabChange, hasUnpublishedDrafts }: AppSidebarProps) {
  const { state } = useSidebar();
  const { t, isRTL } = useLanguage();
  const { showDevelopmentResources } = useSettings();
  const isCollapsed = state === "collapsed";
  const [helpPanelOpen, setHelpPanelOpen] = useState(false);

  const navItems = [
    {
      id: "dashboard",
      label: t("dashboard"),
      mobileLabel: t("home"),
      icon: BarChart3,
      onClick: () => onTabChange("dashboard")
    },
    {
      id: "review-submissions",
      label: t("review"),
      mobileLabel: t("review"),
      icon: ClipboardList,
      onClick: () => onTabChange("review-submissions")
    },
    {
      id: "forms",
      label: t("forms"),
      mobileLabel: t("forms"),
      icon: Folder,
      onClick: () => onTabChange("forms"),
      badge: hasUnpublishedDrafts
    },
    {
      id: "build-form",
      label: t("build"),
      mobileLabel: t("build"),
      icon: Wrench,
      onClick: () => onTabChange("build-form")
    },
    {
      id: "resources",
      label: "Resources",
      mobileLabel: "Resources",
      icon: FileText,
      onClick: () => onTabChange("resources")
    },
    {
      id: "global-settings",
      label: t("settings"),
      mobileLabel: t("settings"),
      icon: Settings,
      onClick: () => onTabChange("global-settings")
    }
  ];

  return (
    <>
      <Sidebar collapsible="icon" className={`border-r border-sidebar-border ${isRTL ? 'sidebar-border-fix' : ''}`}>
        <SidebarContent className="bg-sidebar text-sidebar-foreground">
          {/* Brand Logo - Mobile optimized */}
          <div className="p-3 sm:p-4 border-b border-sidebar-border" data-tour-id="brand-logo">
            <BrandLogo 
              size="sm" 
              showText={!isCollapsed} 
              className="cursor-pointer"
              onClick={() => onTabChange("dashboard")}
            />
          </div>

          {/* Navigation Menu - Mobile optimized */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems
                  .filter((item) => item.id !== 'resources' || showDevelopmentResources)
                  .map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={item.onClick}
                      isActive={activeTab === item.id}
                      data-tour-id={tourIdMap[item.id]}
                      className={`w-full min-h-[44px] touch-manipulation transition-colors ${
                        isRTL ? 'flex-row-reverse' : 'justify-start'
                      } ${
                        activeTab === item.id 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                          : 'hover:bg-sidebar-accent/50'
                      }`}
                    >
                      <item.icon className={`h-4 w-4 shrink-0 ${
                        activeTab === item.id ? 'text-primary' : ''
                      }`} />
                      {!isCollapsed && (
                        <>
                          <span className={`text-sm sm:text-base truncate ${isRTL ? 'text-right' : 'text-left'}`}>
                            {item.label}
                          </span>
                          {item.badge && (
                            <div className={`shrink-0 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                              <div className="w-2 h-2 bg-destructive rounded-full"></div>
                            </div>
                          )}
                        </>
                      )}
                      {isCollapsed && item.badge && (
                        <div className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'}`}>
                          <div className="w-2 h-2 bg-destructive rounded-full"></div>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {/* Help & Tour Button */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setHelpPanelOpen(true)}
                    data-tour-id="nav-help"
                    className={`w-full min-h-[44px] touch-manipulation transition-colors ${
                      isRTL ? 'flex-row-reverse' : 'justify-start'
                    } hover:bg-sidebar-accent/50`}
                  >
                    <HelpCircle className="h-4 w-4 shrink-0" />
                    {!isCollapsed && (
                      <span className={`text-sm sm:text-base truncate ${isRTL ? 'text-right' : 'text-left'}`}>
                        Help
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          {/* Version info at bottom */}
          <div className="mt-auto p-3 border-t border-sidebar-border">
            <div className="text-center">
              <span className="text-xs text-muted-foreground">
                V1.0.0
              </span>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>

      {/* Help Panel */}
      <HelpPanel open={helpPanelOpen} onOpenChange={setHelpPanelOpen} />
    </>
  );
}
