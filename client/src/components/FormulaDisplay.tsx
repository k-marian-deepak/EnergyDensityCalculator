import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormulaDisplay() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Energy Density Formula</CardTitle>
        <CardDescription>Calculate electromagnetic energy density using the formula below</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="text-center">
            <div className="text-2xl font-mono text-slate-800 mb-2">
              U = ½ × ε₀ × ε<sub>ᵣ</sub> × E²
            </div>
            <div className="text-sm text-slate-600 space-y-1">
              <div>Where: U = Energy density (J/m³)</div>
              <div>ε₀ = 8.8541878176×10⁻¹² F/m (vacuum permittivity)</div>
              <div>ε<sub>ᵣ</sub> = Relative permittivity (dimensionless)</div>
              <div>E = Electric field strength (V/m)</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
