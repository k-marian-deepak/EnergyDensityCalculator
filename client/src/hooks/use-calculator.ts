import { useState, useCallback } from "react";
import { calculateEnergyDensity, validateInputs, type CalculationInputs, type CalculationResult } from "@/lib/physics";

export function useCalculator() {
  const [inputs, setInputs] = useState<Partial<CalculationInputs>>({});
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const updateInput = useCallback((field: keyof CalculationInputs, value: number) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);
    
    // Clear previous errors
    setErrors([]);
    
    // Auto-calculate if both fields are valid
    if (newInputs.relativePermittivity && newInputs.electricField) {
      const validationErrors = validateInputs(newInputs);
      if (validationErrors.length === 0) {
        const calculationResult = calculateEnergyDensity(newInputs as CalculationInputs);
        setResult(calculationResult);
      } else {
        setResult(null);
      }
    } else {
      setResult(null);
    }
  }, [inputs]);

  const calculate = useCallback(() => {
    const validationErrors = validateInputs(inputs);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return false;
    }
    
    const calculationResult = calculateEnergyDensity(inputs as CalculationInputs);
    setResult(calculationResult);
    setErrors([]);
    return true;
  }, [inputs]);

  const reset = useCallback(() => {
    setInputs({});
    setResult(null);
    setErrors([]);
  }, []);

  return {
    inputs,
    result,
    errors,
    updateInput,
    calculate,
    reset,
    hasValidInputs: inputs.relativePermittivity && inputs.electricField && validateInputs(inputs).length === 0
  };
}
