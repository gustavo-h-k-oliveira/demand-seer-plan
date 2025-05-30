
import React from 'react';
import { TrendingUp, Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-amber-200/50 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                DemandAI
              </h1>
              <p className="text-xs text-amber-700">Previsão Inteligente</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-amber-700">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Machine Learning</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
