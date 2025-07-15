import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  X, 
  MoreHorizontal,
  Settings,
  Filter
} from "lucide-react";

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Pending Review Required',
    message: 'You have 5 submissions pending review that require immediate attention.',
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    read: false,
    actionRequired: true
  },
  {
    id: '2',
    type: 'success',
    title: 'Form Approved',
    message: 'TechCorp Solutions submission has been approved successfully.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false
  },
  {
    id: '3',
    type: 'info',
    title: 'System Update',
    message: 'New filtering options are now available in the submissions panel.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true
  },
  {
    id: '4',
    type: 'error',
    title: 'High Risk Alert',
    message: 'New submission from DataFlow Inc. has been flagged as high risk.',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    read: false,
    actionRequired: true
  },
  {
    id: '5',
    type: 'info',
    title: 'Weekly Report Ready',
    message: 'Your weekly submission report is ready for download.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true
  }
];

interface NotificationPanelProps {
  onNavigate?: (tab: string, filters?: any) => void;
}

export const NotificationPanel = ({ onNavigate }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'actionRequired'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'actionRequired') return notification.actionRequired;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    // Navigate based on notification type
    if (notification.actionRequired) {
      onNavigate?.('submissions', { status: ['submitted'] });
    } else if (notification.type === 'error') {
      onNavigate?.('submissions', { riskLevel: ['high', 'critical'] });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark all read
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All ({notifications.length})
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </Button>
            <Button
              variant={filter === 'actionRequired' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('actionRequired')}
            >
              Action ({actionRequiredCount})
            </Button>
          </div>
        </div>

        <ScrollArea className="h-96">
          <div className="space-y-2">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                  !notification.read ? 'border-blue-200 bg-blue-50' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">
                          {notification.title}
                        </p>
                        <div className="flex items-center gap-2">
                          {notification.actionRequired && (
                            <Badge variant="destructive" className="text-xs">
                              Action Required
                            </Badge>
                          )}
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredNotifications.length === 0 && (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No notifications found</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};