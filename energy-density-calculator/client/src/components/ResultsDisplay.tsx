import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatResult, shouldShowScientific, type CalculationResult } from "@/lib/physics";

interface ResultsDisplayProps {
  result: CalculationResult | null;
}

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Calculation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Result Display */}
          <div className="bg-slate-50 rounded-lg p-6 text-center border border-slate-200">
            <div className="text-sm text-slate-500 mb-2">Energy Density (U)</div>
            <div className={`text-3xl font-bold ${result ? 'text-success' : 'text-slate-400'}`}>
              {result ? formatResult(result.energyDensity) : 'Enter values to calculate'}
            </div>
            <div className="text-sm text-slate-500 mt-1">J/m³</div>
          </div>

          {/* Scientific Notation */}
          {result && shouldShowScientific(result.energyDensity) && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-900 mb-1">Scientific Notation</div>
              <div className="text-lg font-mono text-blue-800">{result.scientific}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
