
import { useState } from "react";
import { 
  BarChart3, 
  ClipboardList, 
  Folder, 
  Wrench, 
  Settings,
  ChevronLeft,
  ChevronRight
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

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasUnpublishedDrafts: boolean;
}

export function AppSidebar({ activeTab, onTabChange, hasUnpublishedDrafts }: AppSidebarProps) {
  const { state } = useSidebar();
  const { t, isRTL } = useLanguage();
  const isCollapsed = state === "collapsed";

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
      id: "global-settings",
      label: t("settings"),
      mobileLabel: t("settings"),
      icon: Settings,
      onClick: () => onTabChange("global-settings")
    }
  ];

  return (
    <Sidebar collapsible="icon" className={`border-r ${isRTL ? 'sidebar-border-fix' : ''}`}>
      <SidebarContent>
        {/* Brand Logo - Mobile optimized */}
        <div className="p-3 sm:p-4 border-b">
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
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={item.onClick}
                    isActive={activeTab === item.id}
                    className={`w-full min-h-[44px] touch-manipulation ${
                      isRTL ? 'flex-row-reverse' : 'justify-start'
                    }`}
                  >
                    <item.icon className={`h-4 w-4 shrink-0`} />
                    {!isCollapsed && (
                      <>
                        <span className={`text-sm sm:text-base truncate ${isRTL ? 'text-right' : 'text-left'}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <div className={`shrink-0 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          </div>
                        )}
                      </>
                    )}
                    {isCollapsed && item.badge && (
                      <div className={`absolute -top-1 ${isRTL ? '-left-1' : '-right-1'}`}>
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
