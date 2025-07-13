
import React from 'react';
import { 
  Home,
  ClipboardList, 
  Folder, 
  Wrench, 
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasUnpublishedDrafts: boolean;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeTab,
  onTabChange,
  hasUnpublishedDrafts
}) => {
  const navItems = [
    {
      id: "dashboard",
      label: "Home",
      icon: Home,
      onClick: () => onTabChange("dashboard")
    },
    {
      id: "review-submissions", 
      label: "Reviews",
      icon: ClipboardList,
      onClick: () => onTabChange("review-submissions")
    },
    {
      id: "forms",
      label: "Forms", 
      icon: Folder,
      onClick: () => onTabChange("forms"),
      badge: hasUnpublishedDrafts
    },
    {
      id: "build-form",
      label: "Builder",
      icon: Wrench,
      onClick: () => onTabChange("build-form")
    },
    {
      id: "global-settings",
      label: "Settings",
      icon: Settings,
      onClick: () => onTabChange("global-settings")
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t shadow-lg sm:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 relative",
              "hover:bg-primary/10 active:scale-95",
              activeTab === item.id 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
            {item.badge && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
        
        {/* More button for additional items */}
        <button
          onClick={() => onTabChange("global-settings")}
          className={cn(
            "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200",
            "hover:bg-primary/10 active:scale-95",
            activeTab === "global-settings" 
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground"
          )}
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="text-xs font-medium">More</span>
        </button>
      </div>
    </div>
  );
};
