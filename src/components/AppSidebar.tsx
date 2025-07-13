
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

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasUnpublishedDrafts: boolean;
}

export function AppSidebar({ activeTab, onTabChange, hasUnpublishedDrafts }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      onClick: () => onTabChange("dashboard")
    },
    {
      id: "review-submissions",
      label: "Review Submissions",
      icon: ClipboardList,
      onClick: () => onTabChange("review-submissions")
    },
    {
      id: "forms",
      label: "Form Management",
      icon: Folder,
      onClick: () => onTabChange("forms"),
      badge: hasUnpublishedDrafts
    },
    {
      id: "build-form",
      label: "Form Builder",
      icon: Wrench,
      onClick: () => onTabChange("build-form")
    },
    {
      id: "global-settings",
      label: "Global Settings",
      icon: Settings,
      onClick: () => onTabChange("global-settings")
    }
  ];

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        {/* Brand Logo */}
        <div className="p-4 border-b">
          <BrandLogo 
            size="sm" 
            showText={!isCollapsed} 
            className="cursor-pointer"
            onClick={() => onTabChange("dashboard")}
          />
        </div>

        {/* Navigation Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={item.onClick}
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && (
                      <>
                        <span>{item.label}</span>
                        {item.badge && (
                          <div className="ml-auto">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          </div>
                        )}
                      </>
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
