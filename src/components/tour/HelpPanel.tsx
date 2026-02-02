import React from 'react';
import { useTour } from '@/contexts/TourContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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
  Shield
} from 'lucide-react';
import { getTipsForRole } from '@/data/tourSteps';
import { cn } from '@/lib/utils';

interface HelpPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HelpPanel: React.FC<HelpPanelProps> = ({ open, onOpenChange }) => {
  const {
    userRole,
    setUserRole,
    tourState,
    getAvailableTours,
    getTourProgress,
    startTour,
    restartTour,
    resumeTour,
    isTourActive,
    currentTour
  } = useTour();

  const availableTours = getAvailableTours();
  const tips = getTipsForRole(userRole);
  
  // Group tips by category
  const tipsByCategory = tips.reduce((acc, tip) => {
    if (!acc[tip.category]) acc[tip.category] = [];
    acc[tip.category].push(tip);
    return acc;
  }, {} as Record<string, typeof tips>);

  const handleStartTour = (tourId: string) => {
    onOpenChange(false);
    setTimeout(() => startTour(tourId), 300);
  };

  const handleRestartTour = (tourId: string) => {
    onOpenChange(false);
    setTimeout(() => restartTour(tourId), 300);
  };

  const handleResumeTour = () => {
    onOpenChange(false);
    setTimeout(() => resumeTour(), 300);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[450px] p-0">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Help & Guided Tours
          </SheetTitle>
        </SheetHeader>

        <div className="p-6 pt-4">
          {/* Role Selector */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Your Role</p>
            <div className="flex gap-2">
              <Button
                variant={userRole === 'admin' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUserRole('admin')}
                className="flex-1"
              >
                <Shield className="h-4 w-4 mr-1" />
                Admin
              </Button>
              <Button
                variant={userRole === 'user' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUserRole('user')}
                className="flex-1"
              >
                <User className="h-4 w-4 mr-1" />
                User
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {userRole === 'admin' 
                ? 'Full access to all features, settings, and reports.'
                : 'Access to forms, submissions, and basic features.'}
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
                  Step {tourState.currentStepIndex + 1} of {currentTour?.steps.length || 0}
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
              <ScrollArea className="h-[calc(100vh-380px)]">
                <div className="space-y-3 pr-4">
                  {availableTours.map(tour => {
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
                            <div>
                              <CardTitle className="text-base flex items-center gap-2">
                                {tour.name}
                                {progress.completed && (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                )}
                              </CardTitle>
                              <CardDescription className="text-xs mt-1">
                                {tour.description}
                              </CardDescription>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {progress.totalSteps} steps
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          {progress.stepsCompleted > 0 && !progress.completed && (
                            <div className="mb-3">
                              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Progress</span>
                                <span>{progress.stepsCompleted}/{progress.totalSteps}</span>
                              </div>
                              <Progress 
                                value={(progress.stepsCompleted / progress.totalSteps) * 100} 
                                className="h-1"
                              />
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            {progress.completed ? (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full"
                                onClick={() => handleRestartTour(tour.id)}
                              >
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Restart Tour
                              </Button>
                            ) : isInProgress && tourState.isPaused ? (
                              <Button 
                                size="sm" 
                                className="w-full"
                                onClick={handleResumeTour}
                              >
                                <Play className="h-4 w-4 mr-1" />
                                Resume Tour
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                className="w-full"
                                onClick={() => handleStartTour(tour.id)}
                                disabled={isTourActive}
                              >
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
              </ScrollArea>
            </TabsContent>

            <TabsContent value="tips" className="mt-4">
              <ScrollArea className="h-[calc(100vh-380px)]">
                <div className="space-y-4 pr-4">
                  {Object.entries(tipsByCategory).map(([category, categoryTips]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium capitalize mb-2 text-muted-foreground">
                        {category}
                      </h4>
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
