
import { useState } from "react";
import { 
  BarChart3, 
  ClipboardList, 
  Folder, 
  Wrench, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  FileText,
  Users,
  Zap
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
import { cn } from "@/lib/utils";

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
      shortLabel: "Home",
      icon: Home,
      onClick: () => onTabChange("dashboard"),
      color: "text-blue-500"
    },
    {
      id: "review-submissions",
      label: "Review Submissions",
      shortLabel: "Reviews",
      icon: ClipboardList,
      onClick: () => onTabChange("review-submissions"),
      color: "text-green-500"
    },
    {
      id: "forms",
      label: "Form Management",
      shortLabel: "Forms",
      icon: Folder,
      onClick: () => onTabChange("forms"),
      badge: hasUnpublishedDrafts,
      color: "text-purple-500"
    },
    {
      id: "build-form",
      label: "Form Builder",
      shortLabel: "Builder",
      icon: Wrench,
      onClick: () => onTabChange("build-form"),
      color: "text-orange-500"
    },
    {
      id: "global-settings",
      label: "Global Settings",
      shortLabel: "Settings",
      icon: Settings,
      onClick: () => onTabChange("global-settings"),
      color: "text-gray-500"
    }
  ];

  return (
    <Sidebar collapsible="icon" className="border-r animate-slide-in-left">
      <SidebarContent className="bg-gradient-to-b from-background to-muted/20">
        {/* Brand Logo */}
        <div className="p-3 lg:p-4 border-b bg-background/80 backdrop-blur-sm">
          <BrandLogo 
            size={isCollapsed ? "sm" : "md"} 
            showText={!isCollapsed} 
            className="cursor-pointer hover-scale transition-all duration-300"
            onClick={() => onTabChange("dashboard")}
          />
        </div>

        {/* Navigation Menu */}
        <SidebarGroup className="px-2 lg:px-3">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item, index) => (
                <SidebarMenuItem key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <SidebarMenuButton
                    onClick={item.onClick}
                    isActive={activeTab === item.id}
                    className={cn(
                      "w-full justify-start group transition-all duration-300 hover:scale-105",
                      "rounded-lg h-10 lg:h-12",
                      activeTab === item.id && "bg-primary/10 border border-primary/20 shadow-sm"
                    )}
                  >
                    <item.icon 
                      className={cn(
                        "h-4 w-4 lg:h-5 lg:w-5 transition-all duration-300",
                        activeTab === item.id ? "text-primary" : item.color,
                        "group-hover:scale-110"
                      )} 
                    />
                    {!isCollapsed && (
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-xs lg:text-sm truncate">
                          {item.label}
                        </span>
                        {item.badge && (
                          <div className="animate-pulse">
                            <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg"></div>
                          </div>
                        )}
                      </div>
                    )}
                    {isCollapsed && item.badge && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce shadow-lg"></div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Stats - Collapsed State */}
        {isCollapsed && (
          <div className="mt-auto p-3 border-t animate-fade-in">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-1 bg-primary/30 rounded-full"></div>
              <div className="w-6 h-1 bg-primary/20 rounded-full"></div>
            </div>
          </div>
        )}

        {/* Bottom Stats - Expanded State */}
        {!isCollapsed && (
          <div className="mt-auto p-3 lg:p-4 border-t bg-muted/30 animate-slide-up">
            <div className="text-center space-y-2">
              <div className="text-xs text-muted-foreground font-medium">Quick Stats</div>
              <div className="flex justify-around text-xs">
                <div className="text-center">
                  <div className="font-bold text-primary">12</div>
                  <div className="text-muted-foreground">Forms</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-500">345</div>
                  <div className="text-muted-foreground">Responses</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
