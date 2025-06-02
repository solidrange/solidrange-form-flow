
import { FormField } from "@/types/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface WeightageEditorProps {
  fields: FormField[];
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
}

export const WeightageEditor = ({ fields, onUpdateField }: WeightageEditorProps) => {
  const scoringFields = fields.filter(field => field.scoring?.enabled);

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

  if (scoringFields.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Question Weightage</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No scoring fields available. Enable scoring on fields to configure weightage.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question Weightage</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4 font-medium text-sm text-gray-600 border-b pb-2">
          <div>Tests</div>
          <div>Weights</div>
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
          <Button variant="secondary">
            Set weights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
