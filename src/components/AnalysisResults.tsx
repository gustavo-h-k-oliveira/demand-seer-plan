
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Target, ChevronUp, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import DemandChart from './DemandChart';
import StockHistoryChart from './StockHistoryChart';
import SalesMetricsTable from './SalesMetricsTable';
import FilterSection from './FilterSection';
import ExportReports from './ExportReports';

interface Product {
  name: string;
  currentDemand: number;
  predictedDemand: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  category?: string;
  management?: string;
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
  selectedManagement: string;
  setSelectedManagement: (management: string) => void;
  categories: string[];
  managements: string[];
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
  selectedManagement,
  setSelectedManagement,
  categories,
  managements,
  onClearFilters
}: AnalysisResultsProps) => {
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(true);
  
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
        selectedManagement={selectedManagement}
        setSelectedManagement={setSelectedManagement}
        categories={categories}
        managements={managements}
        onClearFilters={onClearFilters}
      />

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-gray-600 text-sm font-medium flex items-center justify-center">
              <Target className="w-4 h-4 mr-2" />
              Total de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {displaySummary.totalProducts}
            </div>
            <p className="text-sm text-gray-500">
              {filteredSummary ? 'produtos filtrados' : 'produtos analisados'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-gray-600 text-sm font-medium flex items-center justify-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Crescimento Médio
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {results.summary.avgGrowth > 0 ? '+' : ''}{results.summary.avgGrowth.toFixed(1)}%
            </div>
            <p className="text-sm text-gray-500">previsão próximo período</p>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-gray-600 text-sm font-medium flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alta Demanda
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {results.summary.highDemandProducts}
            </div>
            <p className="text-sm text-gray-500">produtos em alta</p>
          </CardContent>
        </Card>
      </div>

      {/* Demand Chart Section */}
      <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">
            Análise de Demanda
            {filteredSummary && (
              <span className="text-sm text-gray-500 ml-2">
                ({displayProducts.length} de {results.products.length} produtos)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DemandChart data={displayProducts} />
        </CardContent>
      </Card>

      {/* Stock History Chart Section */}
      <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-800">
            Histórico de Estoque
            {filteredSummary && (
              <span className="text-sm text-gray-500 ml-2">
                ({displayProducts.length} de {results.products.length} produtos)
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StockHistoryChart data={displayProducts} />
        </CardContent>
      </Card>

      {/* Sales Metrics Table */}
      <SalesMetricsTable data={displayProducts} />

      {/* Products List */}
      <Card className="bg-white/90 border-orange-200 backdrop-blur-lg shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800">Detalhes por Produto</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProductDetailsExpanded(!isProductDetailsExpanded)}
              className="text-gray-600 hover:text-gray-800"
            >
              {isProductDetailsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        {isProductDetailsExpanded && (
          <CardContent className="pt-0">
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
                      <div className="flex space-x-4 text-sm text-gray-500">
                        {product.category && <span>Categoria: {product.category}</span>}
                        {product.management && <span>Gerência: {product.management}</span>}
                      </div>
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
        )}
      </Card>

      {/* Export Reports Section - Moved to the end */}
      <ExportReports products={displayProducts} summary={displaySummary} />
    </section>
  );
};

export default AnalysisResults;
