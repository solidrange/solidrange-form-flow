
import { useState } from "react";
import { 
  BarChart3, 
  ClipboardList, 
  Folder, 
  Settings,
  FileText,
  HelpCircle,
  LogOut,
  User,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useAuth } from "@/contexts/AuthContext";
import { HelpPanel } from "@/components/tour/HelpPanel";

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasUnpublishedDrafts: boolean;
}

const tourIdMap: Record<string, string> = {
  'dashboard': 'nav-dashboard',
  'forms': 'nav-forms',
  'reports': 'nav-reports',
  'global-settings': 'nav-settings',
  'resources': 'nav-resources'
};

export function AppSidebar({ activeTab, onTabChange, hasUnpublishedDrafts }: AppSidebarProps) {
  const { state } = useSidebar();
  const { t, isRTL } = useLanguage();
  const { showDevelopmentResources } = useSettings();
  const { currentUser, logout } = useAuth();
  const isCollapsed = state === "collapsed";
  const [helpPanelOpen, setHelpPanelOpen] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  const primaryNavItems = [
    {
      id: "dashboard",
      label: t("dashboard"),
      icon: BarChart3,
      onClick: () => onTabChange("dashboard")
    },
    {
      id: "forms",
      label: t("forms"),
      icon: Folder,
      onClick: () => onTabChange("forms"),
      badge: isAdmin && hasUnpublishedDrafts
    },
    {
      id: "reports",
      label: "Reports",
      icon: ClipboardList,
      onClick: () => onTabChange("reports")
    },
    // Settings only for admin
    ...(isAdmin ? [{
      id: "global-settings",
      label: t("settings"),
      icon: Settings,
      onClick: () => onTabChange("global-settings")
    }] : [])
  ];

  return (
    <>
      <Sidebar collapsible="icon" className={`border-r border-sidebar-border ${isRTL ? 'sidebar-border-fix' : ''}`}>
        <SidebarContent className="bg-sidebar text-sidebar-foreground">
          <div className="p-3 sm:p-4 border-b border-sidebar-border" data-tour-id="brand-logo">
            <BrandLogo 
              size="sm" 
              showText={!isCollapsed} 
              className="cursor-pointer"
              onClick={() => onTabChange("dashboard")}
            />
          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {primaryNavItems.map((item) => (
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

                {/* Help */}
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

                {/* Dev Resources - below Help, admin only */}
                {isAdmin && showDevelopmentResources && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => onTabChange("resources")}
                      isActive={activeTab === "resources"}
                      data-tour-id={tourIdMap["resources"]}
                      className={`w-full min-h-[44px] touch-manipulation transition-colors ${
                        isRTL ? 'flex-row-reverse' : 'justify-start'
                      } ${
                        activeTab === "resources"
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                          : 'hover:bg-sidebar-accent/50'
                      }`}
                    >
                      <FileText className={`h-4 w-4 shrink-0 ${
                        activeTab === "resources" ? 'text-primary' : ''
                      }`} />
                      {!isCollapsed && (
                        <span className={`text-sm sm:text-base truncate ${isRTL ? 'text-right' : 'text-left'}`}>
                          Resources
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          {/* User info + Logout at bottom */}
          <div className="mt-auto border-t border-sidebar-border">
            {!isCollapsed && currentUser && (
              <div className="p-3 space-y-2">
                <div className="flex items-center gap-2">
                  {currentUser.role === 'admin' ? (
                    <Shield className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <User className="h-4 w-4 text-primary shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            )}
            {isCollapsed && (
              <div className="p-2">
                <Button variant="ghost" size="icon" onClick={logout} className="w-full" title="Sign Out">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="p-3 pt-0">
              <div className="text-center">
                <span className="text-xs text-muted-foreground">V1.0.0</span>
              </div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>

      <HelpPanel open={helpPanelOpen} onOpenChange={setHelpPanelOpen} />
    </>
  );
}
