import React, { useState } from 'react';
import { Calculator, Share, Download, RotateCcw, Users, FileText, MessageSquare } from 'lucide-react';

const ElectromagneticEnergyDensityCalculator = () => {
  const [relativePermittivity, setRelativePermittivity] = useState('');
  const [electricFieldStrength, setElectricFieldStrength] = useState('');
  const [result, setResult] = useState(null);
  const [showSteps, setShowSteps] = useState(false);

  // Physical constants
  const VACUUM_PERMITTIVITY = 8.8541878176e-12; // F/m
  const COEFFICIENT = 0.5;

  const calculateEnergyDensity = () => {
    const epsilonR = parseFloat(relativePermittivity);
    const electricField = parseFloat(electricFieldStrength);

    if (isNaN(epsilonR) || isNaN(electricField) || epsilonR <= 0 || electricField <= 0) {
      setResult({ error: 'Please enter valid positive numbers for all fields' });
      setShowSteps(false);
      return;
    }

    // Formula: U = ½ × ε₀ × εᵣ × E²
    const energyDensity = COEFFICIENT * VACUUM_PERMITTIVITY * epsilonR * Math.pow(electricField, 2);
    
    setResult({
      value: energyDensity,
      epsilonR,
      electricField,
      steps: {
        step1: `U = ½ × ε₀ × εᵣ × E²`,
        step2: `U = ${COEFFICIENT} × ${VACUUM_PERMITTIVITY.toExponential(4)} × ${epsilonR} × ${electricField}²`,
        step3: `U = ${COEFFICIENT} × ${VACUUM_PERMITTIVITY.toExponential(4)} × ${epsilonR} × ${Math.pow(electricField, 2)}`,
        step4: `U = ${energyDensity.toExponential(4)} J/m³`
      }
    });
    setShowSteps(true);
  };

  const resetCalculator = () => {
    setRelativePermittivity('');
    setElectricFieldStrength('');
    setResult(null);
    setShowSteps(false);
  };

  const shareResults = () => {
    if (result && !result.error) {
      const shareText = `Energy Density Calculation Result: ${result.value.toExponential(4)} J/m³
Relative Permittivity: ${result.epsilonR}
Electric Field Strength: ${result.electricField} V/m`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Energy Density Calculator Result',
          text: shareText
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Results copied to clipboard!');
      }
    }
  };

  const exportData = () => {
    if (result && !result.error) {
      const data = {
        formula: "U = ½ × ε₀ × εᵣ × E²",
        inputs: {
          relativePermittivity: result.epsilonR,
          electricFieldStrength: result.electricField
        },
        constants: {
          vacuumPermittivity: VACUUM_PERMITTIVITY,
          coefficient: COEFFICIENT
        },
        result: {
          energyDensity: result.value,
          unit: "J/m³"
        },
        timestamp: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'energy-density-calculation.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-500 p-2 rounded-lg mr-4">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Energy Density Calculator</h1>
                <p className="text-gray-600">Physics Analysis Tool</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={shareResults}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={!result || result.error}
              >
                <Share className="h-4 w-4" />
                Share Results
              </button>
              <button 
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={!result || result.error}
              >
                <Download className="h-4 w-4" />
                Export Data
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Formula Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Energy Density Formula</h2>
              <p className="text-gray-600 mb-6">
                Calculate electromagnetic energy density using the formula below
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold text-blue-900 mb-4">
                    U = ½ × ε₀ × εᵣ × E²
                  </div>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>Where:</strong> U = Energy density (J/m³)</p>
                    <p>ε₀ = 8.8541878176×10⁻¹² F/m (vacuum permittivity)</p>
                    <p>εᵣ = Relative permittivity (dimensionless)</p>
                    <p>E = Electric field strength (V/m)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Parameters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Input Parameters</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Relative Permittivity (εᵣ)
                  </label>
                  <input
                    type="number"
                    value={relativePermittivity}
                    onChange={(e) => setRelativePermittivity(e.target.value)}
                    placeholder="e.g., 2.1 (for PTFE)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    step="any"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500">
                      Typical values: Air ≈ 1, Glass ≈ 4-10, Water ≈ 81
                    </p>
                    <span className="text-sm text-gray-400">dimensionless</span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Electric Field Strength (E)
                  </label>
                  <input
                    type="number"
                    value={electricFieldStrength}
                    onChange={(e) => setElectricFieldStrength(e.target.value)}
                    placeholder="e.g., 1000000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    step="any"
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500">
                      Enter electric field strength in volts per meter
                    </p>
                    <span className="text-sm text-gray-400">V/m</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={calculateEnergyDensity}
                  className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  Calculate
                </button>
                <button
                  onClick={resetCalculator}
                  className="bg-gray-100 text-gray-600 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calculation Results */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Calculation Results</h2>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 min-h-[200px] flex flex-col justify-center">
                {result ? (
                  result.error ? (
                    <div className="text-center text-red-600">
                      <p>{result.error}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-600 mb-2">Energy Density (U)</p>
                        <div className="text-3xl font-bold text-blue-600">
                          {result.value.toExponential(4)}
                        </div>
                        <p className="text-gray-500 mt-1">J/m³</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="text-2xl font-light mb-2">Enter values to calculate</div>
                    <p className="text-sm">J/m³</p>
                  </div>
                )}
              </div>
            </div>

            {/* Step-by-step Calculation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Step-by-step Calculation
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 min-h-[200px]">
                {showSteps && result && !result.error ? (
                  <div className="space-y-3 font-mono text-sm">
                    <div className="pb-2 border-b border-gray-300">
                      <p className="font-semibold text-gray-800">Given:</p>
                      <p>εᵣ = {result.epsilonR}</p>
                      <p>E = {result.electricField} V/m</p>
                      <p>ε₀ = {VACUUM_PERMITTIVITY.toExponential(4)} F/m</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-2">Calculation:</p>
                      <p>1. {result.steps.step1}</p>
                      <p>2. {result.steps.step2}</p>
                      <p>3. {result.steps.step3}</p>
                      <p className="font-semibold text-blue-600">4. {result.steps.step4}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <p className="text-center">
                      Complete the input form above to see detailed calculation steps
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Physical Constants */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                ℹ️ Physical Constants
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-700">Vacuum Permittivity (ε₀)</span>
                  <span className="font-mono text-sm">{VACUUM_PERMITTIVITY.toExponential(4)} F/m</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Coefficient (½)</span>
                  <span className="font-mono text-sm">{COEFFICIENT}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                These constants are used automatically in calculations and don't require input.
              </p>
            </div>
          </div>
        </div>

        {/* Team Collaboration Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Collaboration
              </h2>
              <p className="text-gray-600">Share your calculations with team members and clients</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Share className="h-4 w-4" />
                Share Link
              </button>
              <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Add Comment
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <p className="text-gray-600">Calculations Today</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">3</div>
              <p className="text-gray-600">Team Members Active</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
              <p className="text-gray-600">Reports Generated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// This is the key change - export the component as default
export default ElectromagneticEnergyDensityCalculator;