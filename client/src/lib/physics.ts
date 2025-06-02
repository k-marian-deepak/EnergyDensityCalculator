// Physical constants
export const VACUUM_PERMITTIVITY = 8.8541878176e-12; // F/m
export const COEFFICIENT = 0.5;

// Types
export interface CalculationInputs {
  relativePermittivity: number;
  electricField: number;
}

export interface CalculationResult {
  energyDensity: number;
  scientific: string;
  steps: CalculationStep[];
}

export interface CalculationStep {
  step: number;
  description: string;
  formula: string;
  substitution: string;
}

// Validation
export function validateInputs(inputs: Partial<CalculationInputs>): string[] {
  const errors: string[] = [];
  
  if (!inputs.relativePermittivity || inputs.relativePermittivity <= 0) {
    errors.push('Relative permittivity must be a positive number');
  }
  
  if (!inputs.electricField || inputs.electricField === 0) {
    errors.push('Electric field strength must be a non-zero number');
  }
  
  return errors;
}

// Main calculation function
export function calculateEnergyDensity(inputs: CalculationInputs): CalculationResult {
  const { relativePermittivity, electricField } = inputs;
  
  // Calculate energy density: U = ½ × ε₀ × εᵣ × E²
  const energyDensity = COEFFICIENT * VACUUM_PERMITTIVITY * relativePermittivity * Math.pow(electricField, 2);
  
  // Generate calculation steps
  const steps: CalculationStep[] = [
    {
      step: 1,
      description: 'Substitute values into formula',
      formula: 'U = ½ × ε₀ × ε<sub>ᵣ</sub> × E²',
      substitution: `U = ${COEFFICIENT} × ${VACUUM_PERMITTIVITY.toExponential(4)} × ${relativePermittivity} × (${electricField})²`
    },
    {
      step: 2,
      description: 'Calculate E²',
      formula: `E² = (${electricField})²`,
      substitution: `E² = ${Math.pow(electricField, 2).toExponential(4)}`
    },
    {
      step: 3,
      description: 'Multiply all terms',
      formula: `U = ${COEFFICIENT} × ${VACUUM_PERMITTIVITY.toExponential(4)} × ${relativePermittivity} × ${Math.pow(electricField, 2).toExponential(4)}`,
      substitution: `U = ${energyDensity.toExponential(4)} J/m³`
    }
  ];
  
  return {
    energyDensity,
    scientific: energyDensity.toExponential(4),
    steps
  };
}

// Formatting utilities
export function formatResult(value: number): string {
  if (value >= 1e-3 && value < 1e6) {
    return value.toFixed(6);
  }
  return value.toExponential(4);
}

export function shouldShowScientific(value: number): boolean {
  return value < 1e-3 || value >= 1e6;
}
