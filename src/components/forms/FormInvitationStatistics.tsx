import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Form } from "@/types/form";

interface FormInvitationStatisticsProps {
  form: Form;
}

export const FormInvitationStatistics = ({ form }: FormInvitationStatisticsProps) => {
  const emailSettings = form.settings.emailDistribution || {
    enabled: false,
    recipients: [],
    reminderEnabled: true,
    reminderIntervalDays: 7,
    maxReminders: 3
  };

  const completedCount = emailSettings.recipients.filter(r => r.status === 'completed').length;
  const startedCount = emailSettings.recipients.filter(r => ['sent', 'opened'].includes(r.status)).length;
  const notStartedCount = emailSettings.recipients.filter(r => r.status === 'pending').length;
  const completionRate = emailSettings.recipients.length > 0 
    ? Math.round((completedCount / emailSettings.recipients.length) * 100)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Invitation Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {emailSettings.recipients.length}
            </div>
            <div className="text-sm text-blue-800">Total Invites</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {completedCount}
            </div>
            <div className="text-sm text-green-800">Completed</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {startedCount}
            </div>
            <div className="text-sm text-yellow-800">Started</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {notStartedCount}
            </div>
            <div className="text-sm text-red-800">Not Started</div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Completion Rate:</span>
            <span className="text-lg font-bold text-blue-600">
              {completionRate}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};