import { 
  BarChart3, 
  ClipboardList, 
  Folder, 
  Wrench, 
  Settings,
  FileText,
  HelpCircle,
  X
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";
import { BrandLogo } from "@/components/BrandLogo";

interface MobileNavDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  hasUnpublishedDrafts: boolean;
  onHelpClick: () => void;
}

export function MobileNavDrawer({ 
  open, 
  onOpenChange, 
  activeTab, 
  onTabChange,
  hasUnpublishedDrafts,
  onHelpClick
}: MobileNavDrawerProps) {
  const { t, isRTL } = useLanguage();
  const { showDevelopmentResources } = useSettings();

  const navItems = [
    { id: "dashboard", icon: BarChart3, label: t("dashboard") },
    { id: "review-submissions", icon: ClipboardList, label: t("review") },
    { id: "forms", icon: Folder, label: t("forms"), badge: hasUnpublishedDrafts },
    { id: "build-form", icon: Wrench, label: t("build") },
  ];

  const secondaryItems = [
    ...(showDevelopmentResources ? [{ id: "resources", icon: FileText, label: "Resources" }] : []),
    { id: "global-settings", icon: Settings, label: t("settings") },
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side={isRTL ? "right" : "left"} 
        className="w-[280px] p-0 flex flex-col"
      >
        <SheetHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <BrandLogo size="sm" showText />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto py-4">
          {/* Primary Navigation */}
          <div className="px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg",
                    "transition-colors duration-200 touch-manipulation",
                    "min-h-[48px]",
                    isRTL && "flex-row-reverse",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <div className="relative">
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm font-medium flex-1",
                    isRTL ? "text-right" : "text-left"
                  )}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <Separator className="my-4" />

          {/* Secondary Navigation */}
          <div className="px-2 space-y-1">
            {secondaryItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg",
                    "transition-colors duration-200 touch-manipulation",
                    "min-h-[48px]",
                    isRTL && "flex-row-reverse",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className={cn(
                    "text-sm font-medium flex-1",
                    isRTL ? "text-right" : "text-left"
                  )}>
                    {item.label}
                  </span>
                </button>
              );
            })}

            {/* Help Button */}
            <button
              onClick={() => {
                onHelpClick();
                onOpenChange(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-lg",
                "transition-colors duration-200 touch-manipulation",
                "min-h-[48px] text-foreground hover:bg-muted",
                isRTL && "flex-row-reverse"
              )}
            >
              <HelpCircle className="h-5 w-5 shrink-0" />
              <span className={cn(
                "text-sm font-medium flex-1",
                isRTL ? "text-right" : "text-left"
              )}>
                Help
              </span>
            </button>
          </div>
        </nav>

        {/* Version footer */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            V1.0.0
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
