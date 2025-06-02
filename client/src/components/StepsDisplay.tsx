import { ListOrdered, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VACUUM_PERMITTIVITY, COEFFICIENT, type CalculationResult } from "@/lib/physics";

interface StepsDisplayProps {
  result: CalculationResult | null;
}

export default function StepsDisplay({ result }: StepsDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Step-by-step Calculation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <ListOrdered className="mr-2 text-primary" size={20} />
            Step-by-step Calculation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result ? (
              result.steps.map((step) => (
                <div key={step.step} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900 mb-2">{step.description}</div>
                      <div className="bg-slate-50 rounded p-3 font-mono text-sm">
                        <div 
                          className="text-slate-700 mb-1" 
                          dangerouslySetInnerHTML={{ __html: step.formula }}
                        />
                        <div 
                          className="text-primary font-medium"
                          dangerouslySetInnerHTML={{ __html: step.substitution }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-slate-500 italic text-center py-8">
                Complete the input form above to see detailed calculation steps
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Constants Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
            <Info className="mr-2 text-primary" size={20} />
            Physical Constants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-700">Vacuum Permittivity (ε₀)</span>
              <span className="text-sm font-mono text-slate-600">{VACUUM_PERMITTIVITY.toExponential(4)} F/m</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-700">Coefficient (½)</span>
              <span className="text-sm font-mono text-slate-600">{COEFFICIENT}</span>
            </div>
            <div className="text-xs text-slate-500 mt-3">
              These constants are used automatically in calculations and don't require input.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
