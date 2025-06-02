import Header from "./Header";
import FormulaDisplay from "./FormulaDisplay";
import InputForm from "./InputForm";
import ResultsDisplay from "./ResultsDisplay";
import StepsDisplay from "./StepsDisplay";
import TeamCollaboration from "./TeamCollaboration";
import { useCalculator } from "@/hooks/use-calculator";

export default function EnergyDensityCalculator() {
  const {
    inputs,
    result,
    errors,
    updateInput,
    calculate,
    reset
  } = useCalculator();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Input Panel */}
          <div className="space-y-6">
            <FormulaDisplay />
            <InputForm
              relativePermittivity={inputs.relativePermittivity}
              electricField={inputs.electricField}
              errors={errors}
              onInputChange={updateInput}
              onCalculate={calculate}
              onReset={reset}
            />
          </div>

          {/* Results Panel */}
          <div className="space-y-6">
            <ResultsDisplay result={result} />
            <StepsDisplay result={result} />
          </div>
        </div>

        {/* Team Collaboration */}
        <div className="mt-8">
          <TeamCollaboration />
        </div>
      </main>
    </div>
  );
}
