import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MultiChart from './MultiChart';
import FilterSection from './FilterSection';

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
  filteredProducts: Product[];
  filteredSummary: {
    totalProducts: number;
    avgGrowth: number;
    highDemandProducts: number;
  } | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedTrend: string;
  setSelectedTrend: (trend: string) => void;
  categories: string[];
  onClearFilters: () => void;
}

const AnalysisResults = ({ 
  results, 
  filteredProducts, 
  filteredSummary,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedTrend,
  setSelectedTrend,
  categories,
  onClearFilters
}: AnalysisResultsProps) => {
  const displaySummary = filteredSummary || results.summary;
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : results.products;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Target className="w-4 h-4 text-amber-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'down':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-amber-100 text-amber-700 border-amber-300';
    }
  };

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Análise Completa
        </h2>
        <p className="text-gray-600 text-lg">
          Previsões geradas por nossa IA avançada
        </p>
      </div>

      <FilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTrend={selectedTrend}
        setSelectedTrend={setSelectedTrend}
        categories={categories}
        onClearFilters={onClearFilters}
      />

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-600 text-sm font-medium flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Total de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {displaySummary.totalProducts}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {filteredSummary ? 'produtos filtrados' : 'produtos analisados'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-600 text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Crescimento Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {results.summary.avgGrowth > 0 ? '+' : ''}{results.summary.avgGrowth.toFixed(1)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">previsão próximo período</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-600 text-sm font-medium flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alta Demanda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {results.summary.highDemandProducts}
            </div>
            <p className="text-xs text-gray-500 mt-1">produtos em alta</p>
          </CardContent>
        </Card>
      </div>

      {/* Updated Chart Section */}
      <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">
            Análise Visual dos Dados
            {filteredSummary && (
              <span className="text-sm text-gray-500 ml-2">
                ({displayProducts.length} de {results.products.length} produtos)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MultiChart data={displayProducts} />
        </CardContent>
      </Card>

      {/* Products List */}
      <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">Detalhes por Produto</CardTitle>
        </CardHeader>
        <CardContent>
          {displayProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum produto encontrado com os filtros aplicados.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/70 rounded-lg border border-orange-200 hover:border-orange-400 transition-all duration-200 shadow-sm"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{product.name}</h3>
                      <Badge className={getTrendColor(product.trend)}>
                        {getTrendIcon(product.trend)}
                        <span className="ml-1 capitalize">{product.trend}</span>
                      </Badge>
                    </div>
                    {product.category && (
                      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    )}
                  </div>
                  
                  <div className="text-right space-y-1">
                    <div className="text-sm text-gray-600">
                      Atual: <span className="text-gray-800 font-medium">{product.currentDemand}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Previsto: <span className="text-orange-600 font-medium">{product.predictedDemand}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Confiança: {(product.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default AnalysisResults;
