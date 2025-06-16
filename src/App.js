import React, { useState } from 'react';
import { Calculator, Share, Download, RotateCcw, Users, FileText, MessageSquare } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ElectromagneticEnergyDensityCalculator = () => {
  const [relativePermittivity, setRelativePermittivity] = useState('');
  const [electricFieldStrength, setElectricFieldStrength] = useState('');
  const [result, setResult] = useState(null);
  const [showSteps, setShowSteps] = useState(false);

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
      const shareText = `Energy Density Calculation Result: ${result.value.toExponential(4)} J/m³\nRelative Permittivity: ${result.epsilonR}\nElectric Field Strength: ${result.electricField} V/m`;

      if (navigator.share) {
        navigator.share({ title: 'Energy Density Calculator Result', text: shareText });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Results copied to clipboard!');
      }
    }
  };

  const exportToPDF = async () => {
    const input = document.getElementById('pdf-content');
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('energy-density-calculation.pdf');
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
              <button onClick={shareResults} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors" disabled={!result || result.error}>
                <Share className="h-4 w-4" /> Share Results
              </button>
              <button onClick={exportToPDF} className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors" disabled={!result || result.error}>
                <Download className="h-4 w-4" /> Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* All exportable content inside this wrapper */}
        <div id="pdf-content">
          {/* Your existing grid layout, results, steps, etc. */}
          {/* Wrap the full section to include everything you want in the PDF */}
        </div>

        {/* ... The rest of your code remains unchanged ... */}
      </div>
    </div>
  );
};

export default ElectromagneticEnergyDensityCalculator;
