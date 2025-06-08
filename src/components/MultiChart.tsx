
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DemandChart from './DemandChart';
import StockHistoryChart from './StockHistoryChart';
import TrendsChart from './TrendsChart';
import CategoryChart from './CategoryChart';

interface Product {
  name: string;
  currentDemand: number;
  predictedDemand: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
  category?: string;
  stockHistory?: { month: string; stock: number }[];
}

interface MultiChartProps {
  data: Product[];
}

const MultiChart = ({ data }: MultiChartProps) => {
  return (
    <Tabs defaultValue="demand" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-white/90 border border-orange-200">
        <TabsTrigger value="demand" className="text-gray-700 data-[state=active]:bg-orange-100">
          Demanda
        </TabsTrigger>
        <TabsTrigger value="stock" className="text-gray-700 data-[state=active]:bg-orange-100">
          Histórico Estoque
        </TabsTrigger>
        <TabsTrigger value="trends" className="text-gray-700 data-[state=active]:bg-orange-100">
          Tendências
        </TabsTrigger>
        <TabsTrigger value="categories" className="text-gray-700 data-[state=active]:bg-orange-100">
          Categorias
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="demand" className="mt-6">
        <DemandChart data={data} />
      </TabsContent>
      
      <TabsContent value="stock" className="mt-6">
        <StockHistoryChart data={data} />
      </TabsContent>
      
      <TabsContent value="trends" className="mt-6">
        <TrendsChart data={data} />
      </TabsContent>
      
      <TabsContent value="categories" className="mt-6">
        <CategoryChart data={data} />
      </TabsContent>
    </Tabs>
  );
};

export default MultiChart;
