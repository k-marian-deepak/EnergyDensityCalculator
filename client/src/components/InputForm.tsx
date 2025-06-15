import { Calculator, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface InputFormProps {
  relativePermittivity: number | undefined;
  electricField: number | undefined;
  errors: string[];
  onInputChange: (field: 'relativePermittivity' | 'electricField', value: number) => void;
  onCalculate: () => boolean;
  onReset: () => void;
}

export default function InputForm({
  relativePermittivity,
  electricField,
  errors,
  onInputChange,
  onCalculate,
  onReset
}: InputFormProps) {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onCalculate();
    
    if (success) {
      toast({
        title: "Calculation completed",
        description: "Energy density calculated successfully",
      });
    } else {
      toast({
        title: "Calculation failed",
        description: errors.join('. '),
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    onReset();
    toast({
      title: "Form reset",
      description: "All inputs have been cleared",
    });
  };

  const hasRelativePermittivityError = errors.some(error => 
    error.toLowerCase().includes('relative permittivity')
  );
  
  const hasElectricFieldError = errors.some(error => 
    error.toLowerCase().includes('electric field')
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Input Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Relative Permittivity Input */}
          <div className="space-y-2">
            <Label htmlFor="relative-permittivity" className="text-sm font-medium text-slate-700">
              Relative Permittivity (ε<sub>ᵣ</sub>)
            </Label>
            <div className="relative">
              <Input
                id="relative-permittivity"
                type="number"
                step="any"
                min="1"
                placeholder="e.g., 2.1 (for PTFE)"
                value={relativePermittivity || ''}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    onInputChange('relativePermittivity', value);
                  }
                }}
                className={`pr-24 ${
                  hasRelativePermittivityError 
                    ? 'border-destructive focus:ring-destructive focus:border-destructive' 
                    : ''
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-slate-400 text-sm">dimensionless</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Typical values: Air ≈ 1, Glass ≈ 4-10, Water ≈ 81
            </p>
          </div>

          {/* Electric Field Input */}
          <div className="space-y-2">
            <Label htmlFor="electric-field" className="text-sm font-medium text-slate-700">
              Electric Field Strength (E)
            </Label>
            <div className="relative">
              <Input
                id="electric-field"
                type="number"
                step="any"
                placeholder="e.g., 1000000"
                value={electricField || ''}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value)) {
                    onInputChange('electricField', value);
                  }
                }}
                className={`pr-12 ${
                  hasElectricFieldError 
                    ? 'border-destructive focus:ring-destructive focus:border-destructive' 
                    : ''
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-slate-400 text-sm">V/m</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Enter electric field strength in volts per meter
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="submit" className="flex-1">
              <Calculator className="mr-2" size={16} />
              Calculate
            </Button>
            <Button type="button" variant="outline" className="flex-1 sm:flex-none" onClick={handleReset}>
              <RotateCcw className="mr-2" size={16} />
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
