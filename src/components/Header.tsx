
import React from 'react';
import { BarChart3 } from 'lucide-react';
import UserMenu from './UserMenu';

const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Análise de Produtos IA
              </h1>
              <p className="text-sm text-gray-600">
                Previsão inteligente de demanda
              </p>
            </div>
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
