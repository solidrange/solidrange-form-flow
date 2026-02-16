import React from 'react';
import { useTour } from '@/contexts/TourContext';
import { useAuth } from '@/contexts/AuthContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  HelpCircle, 
  Play, 
  RefreshCw, 
  Pause, 
  CheckCircle2, 
  BookOpen, 
  Lightbulb,
  User,
  Shield,
  MapPin
} from 'lucide-react';
import { getTipsForRole } from '@/data/tourSteps';
import { cn } from '@/lib/utils';

interface HelpPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  complete: <MapPin className="h-4 w-4" />,
  navigation: <MapPin className="h-4 w-4" />,
  forms: <BookOpen className="h-4 w-4" />,
  submissions: <BookOpen className="h-4 w-4" />,
  settings: <BookOpen className="h-4 w-4" />,
  reports: <BookOpen className="h-4 w-4" />
};

export const HelpPanel: React.FC<HelpPanelProps> = ({ open, onOpenChange }) => {
  const {
    userRole,
    setUserRole,
    tourState,
    layoutMode,
    getAvailableTours,
    getTourProgress,
    startTour,
    restartTour,
    resumeTour,
    isTourActive,
    currentTour
  } = useTour();

  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  const availableTours = getAvailableTours();
  const tips = getTipsForRole(userRole);
  const isMobile = layoutMode === 'mobile';
  
  const tipsByCategory = tips.reduce((acc, tip) => {
    if (!acc[tip.category]) acc[tip.category] = [];
    acc[tip.category].push(tip);
    return acc;
  }, {} as Record<string, typeof tips>);

  const toursByCategory = availableTours.reduce((acc, tour) => {
    if (!acc[tour.category]) acc[tour.category] = [];
    acc[tour.category].push(tour);
    return acc;
  }, {} as Record<string, typeof availableTours>);

  const handleStartTour = (tourId: string) => {
    onOpenChange(false);
    setTimeout(() => { startTour(tourId); }, 350);
  };

  const handleRestartTour = (tourId: string) => {
    onOpenChange(false);
    setTimeout(() => { restartTour(tourId); }, 350);
  };

  const handleResumeTour = () => {
    onOpenChange(false);
    setTimeout(() => { resumeTour(); }, 350);
  };

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      complete: 'Getting Started',
      navigation: 'Navigation',
      forms: 'Forms',
      submissions: 'Submissions',
      settings: 'Settings',
      reports: 'Reports'
    };
    return labels[category] || category;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className={cn("p-0", isMobile ? "w-full" : "w-[400px] sm:w-[450px]")}>
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Help & Guided Tours
          </SheetTitle>
        </SheetHeader>

        <div className="p-6 pt-4">
          {/* Layout Mode Indicator */}
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {layoutMode === 'mobile' ? '📱 Mobile View' : '🖥️ Desktop View'}
            </Badge>
            <span className="text-xs text-muted-foreground">Tours adapt to your current layout</span>
          </div>

          {/* Role Display - auto-set from auth, only admin can switch for testing */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Your Role</p>
            {isAdmin ? (
              <div className="flex gap-2">
                <Button
                  variant={userRole === 'admin' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUserRole('admin')}
                  className={cn("flex-1", isMobile && "min-h-[44px]")}
                >
                  <Shield className="h-4 w-4 mr-1" />
                  Admin
                </Button>
                <Button
                  variant={userRole === 'user' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setUserRole('user')}
                  className={cn("flex-1", isMobile && "min-h-[44px]")}
                >
                  <User className="h-4 w-4 mr-1" />
                  User
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">User</span>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {userRole === 'admin' 
                ? 'Full access: create forms, manage submissions, configure settings, generate all reports, and create custom reports.'
                : 'Fill assigned forms, view your personal dashboard and reports, and access help resources. Custom reports and settings are admin-only.'}
            </p>
          </div>

          <Separator className="my-4" />

          {/* Paused Tour Banner */}
          {tourState.isPaused && tourState.activeTourId && (
            <Card className="mb-4 border-primary/50 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Pause className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Tour Paused</span>
                  </div>
                  <Button size="sm" onClick={handleResumeTour}>
                    <Play className="h-4 w-4 mr-1" />
                    Resume
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {currentTour?.name} - Step {tourState.currentStepIndex + 1}
                </p>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="tours" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tours" className="text-sm">
                <BookOpen className="h-4 w-4 mr-1" />
                Tours
              </TabsTrigger>
              <TabsTrigger value="tips" className="text-sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                Quick Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tours" className="mt-4">
              <ScrollArea className="h-[calc(100vh-400px)]">
                <div className="space-y-6 pr-4">
                  {Object.entries(toursByCategory).map(([category, categoryTours]) => (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-3">
                        {categoryIcons[category]}
                        <h4 className="text-sm font-semibold text-foreground">{getCategoryLabel(category)}</h4>
                      </div>
                      <div className="space-y-3">
                        {categoryTours.map(tour => {
                          const progress = getTourProgress(tour.id);
                          const isInProgress = tourState.activeTourId === tour.id;
                          
                          return (
                            <Card key={tour.id} className={cn(
                              "transition-all",
                              progress.completed && "border-green-500/30 bg-green-500/5",
                              isInProgress && "border-primary/50 bg-primary/5"
                            )}>
                              <CardHeader className="pb-2">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    <CardTitle className="text-base flex items-center gap-2">
                                      <span className="truncate">{tour.name}</span>
                                      {progress.completed && <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />}
                                    </CardTitle>
                                    <CardDescription className="text-xs mt-1">{tour.description}</CardDescription>
                                  </div>
                                  <Badge variant="outline" className="text-xs ml-2 flex-shrink-0">{progress.totalSteps} steps</Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="pt-0">
                                {progress.stepsCompleted > 0 && !progress.completed && (
                                  <div className="mb-3">
                                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                      <span>Progress</span>
                                      <span>{progress.stepsCompleted}/{progress.totalSteps}</span>
                                    </div>
                                    <Progress value={(progress.stepsCompleted / progress.totalSteps) * 100} className="h-1" />
                                  </div>
                                )}
                                <div className="flex gap-2">
                                  {progress.completed ? (
                                    <Button variant="outline" size="sm" className="w-full" onClick={() => handleRestartTour(tour.id)}>
                                      <RefreshCw className="h-4 w-4 mr-1" />
                                      Restart Tour
                                    </Button>
                                  ) : isInProgress && tourState.isPaused ? (
                                    <Button size="sm" className="w-full" onClick={handleResumeTour}>
                                      <Play className="h-4 w-4 mr-1" />
                                      Resume Tour
                                    </Button>
                                  ) : (
                                    <Button size="sm" className="w-full" onClick={() => handleStartTour(tour.id)} disabled={isTourActive && !tourState.isPaused}>
                                      <Play className="h-4 w-4 mr-1" />
                                      Start Tour
                                    </Button>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="tips" className="mt-4">
              <ScrollArea className="h-[calc(100vh-400px)]">
                <div className="space-y-4 pr-4">
                  {Object.entries(tipsByCategory).map(([category, categoryTips]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium capitalize mb-2 text-muted-foreground">{category}</h4>
                      <div className="space-y-2">
                        {categoryTips.map(tip => (
                          <Card key={tip.id} className="bg-muted/30">
                            <CardContent className="p-3">
                              <h5 className="text-sm font-medium mb-1">{tip.title}</h5>
                              <p className="text-xs text-muted-foreground">{tip.content}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};
