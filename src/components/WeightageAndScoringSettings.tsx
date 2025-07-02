
import { FormField, FormSettings } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface WeightageAndScoringSettingsProps {
  fields: FormField[];
  settings: FormSettings;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onUpdateSettings: (updates: Partial<FormSettings>) => void;
}

export const WeightageAndScoringSettings = ({ 
  fields, 
  settings, 
  onUpdateField, 
  onUpdateSettings 
}: WeightageAndScoringSettingsProps) => {
  const scoringFields = fields.filter(field => field.scoring?.enabled);

  const handleScoringSettingChange = (field: string, value: any) => {
    const currentScoring = settings.scoring || {
      enabled: false,
      maxTotalPoints: 100,
      showScoreToUser: false,
      passingScore: 70,
      riskThresholds: {
        low: 30,
        medium: 60,
        high: 90
      }
    };

    onUpdateSettings({
      scoring: {
        ...currentScoring,
        [field]: value
      }
    });
  };

  const handleWeightChange = (fieldId: string, weight: number) => {
    const field = fields.find(f => f.id === fieldId);
    if (field) {
      onUpdateField(fieldId, {
        scoring: {
          ...field.scoring,
          weightMultiplier: weight
        }
      });
    }
  };

  const resetWeights = () => {
    scoringFields.forEach(field => {
      onUpdateField(field.id, {
        scoring: {
          ...field.scoring,
          weightMultiplier: 1
        }
      });
    });
  };

  const calculateImpact = (fieldWeight: number) => {
    const totalWeight = scoringFields.reduce((sum, field) => 
      sum + (field.scoring?.weightMultiplier || 1), 0
    );
    return totalWeight > 0 ? ((fieldWeight / totalWeight) * 100).toFixed(2) : "0.00";
  };

  return (
    <div className="space-y-6">
      {/* Scoring Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Scoring Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Scoring</Label>
              <p className="text-sm text-gray-500">Enable scoring for this form</p>
            </div>
            <Switch
              checked={settings.scoring?.enabled || false}
              onCheckedChange={(checked) => handleScoringSettingChange('enabled', checked)}
            />
          </div>

          {settings.scoring?.enabled && (
            <>
              <div>
                <Label>Max Total Points</Label>
                <Input
                  type="number"
                  min="1"
                  value={settings.scoring.maxTotalPoints || 100}
                  onChange={(e) => handleScoringSettingChange('maxTotalPoints', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Score to User</Label>
                  <p className="text-sm text-gray-500">Display the score to the user after submission</p>
                </div>
                <Switch
                  checked={settings.scoring.showScoreToUser || false}
                  onCheckedChange={(checked) => handleScoringSettingChange('showScoreToUser', checked)}
                />
              </div>

              <div>
                <Label>Passing Score (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.scoring.passingScore || 70}
                  onChange={(e) => handleScoringSettingChange('passingScore', parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Risk Thresholds</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <Label className="text-xs">Low</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.scoring.riskThresholds?.low || 30}
                      onChange={(e) => handleScoringSettingChange('riskThresholds', {
                        ...settings.scoring?.riskThresholds,
                        low: parseInt(e.target.value)
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Medium</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.scoring.riskThresholds?.medium || 60}
                      onChange={(e) => handleScoringSettingChange('riskThresholds', {
                        ...settings.scoring?.riskThresholds,
                        medium: parseInt(e.target.value)
                      })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">High</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={settings.scoring.riskThresholds?.high || 90}
                      onChange={(e) => handleScoringSettingChange('riskThresholds', {
                        ...settings.scoring?.riskThresholds,
                        high: parseInt(e.target.value)
                      })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Question Weightage */}
      {settings.scoring?.enabled && (
        <Card>
          <CardHeader>
            <CardTitle>Question Weightage</CardTitle>
            <p className="text-sm text-gray-500">Configure the importance of each scoring field</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {scoringFields.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No scoring fields available. Enable scoring on fields to configure weightage.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4 font-medium text-sm text-gray-600 border-b pb-2">
                  <div>Question</div>
                  <div>Weight</div>
                  <div>Impact</div>
                </div>

                {scoringFields.map((field) => (
                  <div key={field.id} className="grid grid-cols-3 gap-4 items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center">
                        <span className="text-xs">📝</span>
                      </div>
                      <span className="font-medium truncate">{field.label}</span>
                    </div>

                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((weight) => (
                        <button
                          key={weight}
                          onClick={() => handleWeightChange(field.id, weight)}
                          className={cn(
                            "w-8 h-6 text-xs font-medium rounded transition-colors",
                            (field.scoring?.weightMultiplier || 1) >= weight
                              ? "bg-purple-500 text-white"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                          )}
                        >
                          x{weight}
                        </button>
                      ))}
                    </div>

                    <div className="font-medium">
                      {calculateImpact(field.scoring?.weightMultiplier || 1)}%
                    </div>
                  </div>
                ))}

                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={resetWeights}>
                    Reset weights
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
