import { 
  BarChart3, 
  ClipboardList, 
  Folder, 
  Wrench, 
  Settings,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileBottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasUnpublishedDrafts: boolean;
  onMoreClick: () => void;
}

const navItems = [
  { id: "dashboard", icon: BarChart3, labelKey: "home" },
  { id: "review-submissions", icon: ClipboardList, labelKey: "review" },
  { id: "forms", icon: Folder, labelKey: "forms" },
  { id: "build-form", icon: Wrench, labelKey: "build" },
];

export function MobileBottomNav({ 
  activeTab, 
  onTabChange, 
  hasUnpublishedDrafts,
  onMoreClick 
}: MobileBottomNavProps) {
  const { t, isRTL } = useLanguage();

  return (
    <nav 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border",
        "safe-area-bottom md:hidden"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={cn(
        "flex items-stretch justify-around h-16",
        isRTL && "flex-row-reverse"
      )}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          const showBadge = item.id === "forms" && hasUnpublishedDrafts;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 px-2 py-2",
                "transition-colors duration-200 touch-manipulation",
                "min-h-[44px] min-w-[44px]",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={t(item.labelKey)}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon 
                  className={cn(
                    "h-5 w-5 transition-transform duration-200",
                    isActive && "scale-110"
                  )} 
                />
                {showBadge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium leading-tight",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {t(item.labelKey)}
              </span>
            </button>
          );
        })}
        
        {/* More button for Settings & Resources */}
        <button
          onClick={onMoreClick}
          className={cn(
            "flex-1 flex flex-col items-center justify-center gap-0.5 px-2 py-2",
            "transition-colors duration-200 touch-manipulation",
            "min-h-[44px] min-w-[44px]",
            (activeTab === "global-settings" || activeTab === "resources")
              ? "text-primary" 
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label="More options"
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="text-[10px] font-medium leading-tight">More</span>
        </button>
      </div>
    </nav>
  );
}
