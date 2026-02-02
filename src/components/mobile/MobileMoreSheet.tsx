import { 
  Settings,
  FileText,
  HelpCircle,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";

interface MobileMoreSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onHelpClick: () => void;
}

export function MobileMoreSheet({ 
  open, 
  onOpenChange, 
  activeTab, 
  onTabChange,
  onHelpClick
}: MobileMoreSheetProps) {
  const { t, isRTL } = useLanguage();
  const { showDevelopmentResources } = useSettings();

  const items = [
    ...(showDevelopmentResources ? [{ id: "resources", icon: FileText, label: "Resources" }] : []),
    { id: "global-settings", icon: Settings, label: t("settings") },
    { id: "help", icon: HelpCircle, label: "Help & Tour", action: onHelpClick },
  ];

  const handleItemClick = (item: typeof items[0]) => {
    if (item.action) {
      item.action();
    } else {
      onTabChange(item.id);
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="rounded-t-2xl max-h-[50vh]"
      >
        <SheetHeader className="pb-4">
          <SheetTitle className={cn(
            "text-base",
            isRTL ? "text-right" : "text-left"
          )}>
            More Options
          </SheetTitle>
        </SheetHeader>

        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-4 rounded-xl",
                  "transition-colors duration-200 touch-manipulation",
                  "min-h-[56px]",
                  isRTL && "flex-row-reverse",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted active:bg-muted"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  isActive ? "bg-primary/20" : "bg-muted"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={cn(
                  "text-base font-medium flex-1",
                  isRTL ? "text-right" : "text-left"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
