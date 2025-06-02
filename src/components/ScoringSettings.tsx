
import { Form } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScoringSettingsProps {
  formSettings: Form['settings'];
  onUpdateSettings: (updates: Partial<Form['settings']>) => void;
}

export const ScoringSettings = ({ formSettings, onUpdateSettings }: ScoringSettingsProps) => {
  const updateScoring = (updates: Partial<NonNullable<Form['settings']['scoring']>>) => {
    onUpdateSettings({
      scoring: {
        ...formSettings.scoring,
        enabled: formSettings.scoring?.enabled || false,
        maxTotalPoints: formSettings.scoring?.maxTotalPoints || 100,
        showScoreToUser: formSettings.scoring?.showScoreToUser || false,
        ...updates
      }
    });
  };

  const updateExpiration = (updates: Partial<NonNullable<Form['settings']['expiration']>>) => {
    onUpdateSettings({
      expiration: {
        ...formSettings.expiration,
        enabled: formSettings.expiration?.enabled || false,
        ...updates
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Scoring Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Scoring Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="enable-scoring"
              checked={formSettings.scoring?.enabled || false}
              onCheckedChange={(checked) => updateScoring({ enabled: !!checked })}
            />
            <Label htmlFor="enable-scoring">Enable scoring for this form</Label>
          </div>

          {formSettings.scoring?.enabled && (
            <>
              <div>
                <Label htmlFor="max-points">Maximum Total Points</Label>
                <Input
                  id="max-points"
                  type="number"
                  value={formSettings.scoring.maxTotalPoints || 100}
                  onChange={(e) => updateScoring({ maxTotalPoints: parseInt(e.target.value) || 100 })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="passing-score">Passing Score (optional)</Label>
                <Input
                  id="passing-score"
                  type="number"
                  value={formSettings.scoring.passingScore || ''}
                  onChange={(e) => updateScoring({ passingScore: parseInt(e.target.value) || undefined })}
                  placeholder="e.g., 70"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-score"
                  checked={formSettings.scoring.showScoreToUser || false}
                  onCheckedChange={(checked) => updateScoring({ showScoreToUser: !!checked })}
                />
                <Label htmlFor="show-score">Show score to user after submission</Label>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Expiration Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Form Expiration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="enable-expiration"
              checked={formSettings.expiration?.enabled || false}
              onCheckedChange={(checked) => updateExpiration({ enabled: !!checked })}
            />
            <Label htmlFor="enable-expiration">Set expiration date for this form</Label>
          </div>

          {formSettings.expiration?.enabled && (
            <>
              <div>
                <Label htmlFor="expiration-date">Expiration Date</Label>
                <div className="relative mt-1">
                  <Input
                    id="expiration-date"
                    type="datetime-local"
                    value={formSettings.expiration.expirationDate ? 
                      new Date(formSettings.expiration.expirationDate).toISOString().slice(0, 16) : ''
                    }
                    onChange={(e) => updateExpiration({ 
                      expirationDate: e.target.value ? new Date(e.target.value) : undefined 
                    })}
                  />
                  <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <Label htmlFor="expiration-message">Expiration Message (optional)</Label>
                <Textarea
                  id="expiration-message"
                  value={formSettings.expiration.message || ''}
                  onChange={(e) => updateExpiration({ message: e.target.value })}
                  placeholder="This form has expired and is no longer accepting submissions."
                  className="mt-1"
                  rows={2}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
