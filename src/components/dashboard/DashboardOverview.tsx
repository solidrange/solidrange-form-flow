
import React from 'react';
import { AnimatedCard } from '../AnimatedCard';
import { 
  BarChart3, 
  FileText, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface DashboardOverviewProps {
  className?: string;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ className }) => {
  const stats = [
    {
      title: "Total Forms",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      delay: 0
    },
    {
      title: "Active Responses",
      value: "1,234",
      change: "+23%",
      trend: "up", 
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50",
      delay: 100
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-500", 
      bgColor: "bg-purple-50",
      delay: 200
    },
    {
      title: "Avg. Response Time",
      value: "2.3min",
      change: "-15%",
      trend: "down",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      delay: 300
    }
  ];

  const recentActivity = [
    {
      type: "form_created",
      title: "New Customer Survey created",
      time: "2 hours ago",
      icon: FileText,
      color: "text-blue-500"
    },
    {
      type: "response_received", 
      title: "15 new responses received",
      time: "4 hours ago",
      icon: Users,
      color: "text-green-500"
    },
    {
      type: "form_published",
      title: "Marketing Form published",
      time: "1 day ago", 
      icon: CheckCircle,
      color: "text-purple-500"
    }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <AnimatedCard 
            key={stat.title} 
            className="relative overflow-hidden group hover:shadow-xl transition-all duration-500"
            delay={stat.delay}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl lg:text-3xl font-bold">{stat.value}</h3>
                  <Badge 
                    variant={stat.trend === 'up' ? 'default' : 'secondary'}
                    className={cn(
                      "text-xs animate-pulse",
                      stat.trend === 'up' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    )}
                  >
                    {stat.change}
                  </Badge>
                </div>
              </div>
              <div className={cn(
                "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
                stat.bgColor
              )}>
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4">
              <Progress 
                value={Math.random() * 100} 
                className="h-1"
              />
            </div>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </AnimatedCard>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <AnimatedCard 
          title="Recent Activity" 
          icon={BarChart3} 
          iconColor="text-blue-500"
          delay={400}
        >
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 animate-slide-in-right"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="p-2 rounded-lg bg-muted">
                  <activity.icon className={cn("h-4 w-4", activity.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        {/* Quick Actions */}
        <AnimatedCard 
          title="Quick Actions" 
          icon={Zap} 
          iconColor="text-yellow-500"
          delay={500}
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "Create Form", icon: FileText, color: "text-blue-500" },
              { title: "View Reports", icon: BarChart3, color: "text-green-500" },
              { title: "Manage Users", icon: Users, color: "text-purple-500" },
              { title: "Settings", icon: AlertCircle, color: "text-orange-500" }
            ].map((action, index) => (
              <button
                key={action.title}
                className="p-4 rounded-lg border border-dashed border-muted-foreground/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group animate-scale-in"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <action.icon className={cn(
                  "h-6 w-6 mx-auto mb-2 transition-all duration-300 group-hover:scale-110",
                  action.color
                )} />
                <p className="text-xs font-medium text-center">{action.title}</p>
              </button>
            ))}
          </div>
        </AnimatedCard>
      </div>
    </div>
  );
};
