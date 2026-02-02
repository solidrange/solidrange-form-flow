import { Menu, Bell, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileHeaderProps {
  title: string;
  onMenuClick: () => void;
  onBackClick?: () => void;
  showBack?: boolean;
  rightActions?: React.ReactNode;
}

export function MobileHeader({ 
  title, 
  onMenuClick, 
  onBackClick,
  showBack = false,
  rightActions 
}: MobileHeaderProps) {
  const { isRTL } = useLanguage();

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 bg-background border-b border-border",
        "h-14 flex items-center px-3 gap-2",
        "md:hidden",
        isRTL && "flex-row-reverse"
      )}
    >
      {/* Left action - Menu or Back */}
      {showBack && onBackClick ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBackClick}
          className="h-10 w-10 shrink-0 touch-manipulation"
          aria-label="Go back"
        >
          <ArrowLeft className={cn("h-5 w-5", isRTL && "rotate-180")} />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="h-10 w-10 shrink-0 touch-manipulation"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Title - centered */}
      <h1 className={cn(
        "flex-1 text-base font-semibold text-foreground truncate",
        isRTL ? "text-right" : "text-left"
      )}>
        {title}
      </h1>

      {/* Right actions */}
      <div className={cn(
        "flex items-center gap-1",
        isRTL && "flex-row-reverse"
      )}>
        {rightActions || (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0 touch-manipulation"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0 touch-manipulation"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
