
import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DemandChart from './DemandChart';

interface Product {
  name: string;
  currentDemand: number;
  predictedDemand: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  category?: string;
}

interface AnalysisResultsProps {
  results: {
    products: Product[];
    summary: {
      totalProducts: number;
      avgGrowth: number;
      highDemandProducts: number;
    };
  };
}

const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Target className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'down':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Análise Completa
        </h2>
        <p className="text-gray-300 text-lg">
          Previsões geradas por nossa IA avançada
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-300 text-sm font-medium flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Total de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {results.summary.totalProducts}
            </div>
            <p className="text-xs text-gray-400 mt-1">produtos analisados</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-300 text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Crescimento Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {results.summary.avgGrowth > 0 ? '+' : ''}{results.summary.avgGrowth.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-400 mt-1">previsão próximo período</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-300 text-sm font-medium flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alta Demanda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {results.summary.highDemandProducts}
            </div>
            <p className="text-xs text-gray-400 mt-1">produtos em alta</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white">Previsão de Demanda por Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <DemandChart data={results.products} />
        </CardContent>
      </Card>

      {/* Products List */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-white">Detalhes por Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.products.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-white">{product.name}</h3>
                    <Badge className={getTrendColor(product.trend)}>
                      {getTrendIcon(product.trend)}
                      <span className="ml-1 capitalize">{product.trend}</span>
                    </Badge>
                  </div>
                  {product.category && (
                    <p className="text-sm text-gray-400 mb-2">{product.category}</p>
                  )}
                </div>
                
                <div className="text-right space-y-1">
                  <div className="text-sm text-gray-400">
                    Atual: <span className="text-white font-medium">{product.currentDemand}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Previsto: <span className="text-purple-400 font-medium">{product.predictedDemand}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Confiança: {(product.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default AnalysisResults;
