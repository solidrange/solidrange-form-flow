
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export const NotificationPanel: React.FC = () => {
  const notifications = [
    {
      id: '1',
      type: 'info',
      title: 'New submission received',
      message: 'TechCorp Solutions submitted their vendor assessment form',
      timestamp: '2 minutes ago',
      unread: true
    },
    {
      id: '2',
      type: 'warning',
      title: 'Form approval pending',
      message: 'HealthPlus Medical submission requires your review',
      timestamp: '1 hour ago',
      unread: true
    },
    {
      id: '3',
      type: 'success',
      title: 'Report generated',
      message: 'Monthly compliance report has been generated successfully',
      timestamp: '3 hours ago',
      unread: false
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
        <Button variant="ghost" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start space-x-3 p-3 rounded-lg border ${
              notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
            }`}
          >
            {getIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                {notification.unread && (
                  <Badge variant="secondary" className="ml-2">
                    New
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {notification.timestamp}
              </p>
            </div>
          </div>
        ))}
        
        {notifications.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationPanel;
