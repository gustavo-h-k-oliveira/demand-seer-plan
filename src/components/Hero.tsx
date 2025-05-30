
import React from 'react';
import { Upload, BarChart3, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent leading-tight">
            Previsão de Demanda
            <br />
            <span className="text-4xl md:text-6xl">com IA</span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 mb-8 max-w-3xl mx-auto leading-relaxed">
            Faça upload da sua planilha de produtos e nossa IA analisará automaticamente 
            os dados para prever a demanda futura com precisão.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-amber-200 hover:border-amber-400 transition-all duration-300 hover:scale-105 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Upload Simples</h3>
            <p className="text-amber-700 text-sm">Carregue planilhas Excel ou CSV com seus dados de produtos</p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-amber-200 hover:border-amber-400 transition-all duration-300 hover:scale-105 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">IA Avançada</h3>
            <p className="text-amber-700 text-sm">Machine learning analisa padrões e tendências automaticamente</p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-amber-200 hover:border-amber-400 transition-all duration-300 hover:scale-105 shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Insights Visuais</h3>
            <p className="text-amber-700 text-sm">Gráficos interativos mostram previsões detalhadas</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
