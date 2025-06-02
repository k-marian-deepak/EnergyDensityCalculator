import { Calculator, Menu, Share2, Download, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Calculator className="text-white text-sm" size={16} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Energy Density Calculator</h1>
              <p className="text-xs text-slate-500">Physics Analysis Tool</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu size={16} />
            </Button>
            <div className="hidden lg:flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary">
                <Share2 size={14} className="mr-1" />
                Share Results
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary">
                <Download size={14} className="mr-1" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
