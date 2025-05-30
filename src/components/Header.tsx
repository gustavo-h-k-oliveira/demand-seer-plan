
import React from 'react';
import { TrendingUp, Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                DemandAI
              </h1>
              <p className="text-xs text-gray-400">Previsão Inteligente</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Machine Learning</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
