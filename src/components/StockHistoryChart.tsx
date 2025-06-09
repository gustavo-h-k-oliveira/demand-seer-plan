
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  name: string;
  dailyStockHistory?: { date: string; stock: number }[];
  currentDemand?: number;
}

interface StockHistoryChartProps {
  data: Product[];
}

const StockHistoryChart = ({ data }: StockHistoryChartProps) => {
  const [periodFilter, setPeriodFilter] = useState(30);
  
  // Initialize with top 3 products by demand
  const defaultSelectedProducts = useMemo(() => {
    const sortedByDemand = [...data]
      .sort((a, b) => (b.currentDemand || 0) - (a.currentDemand || 0))
      .slice(0, 3)
      .map(product => product.name);
    return sortedByDemand;
  }, [data]);

  const [selectedProducts, setSelectedProducts] = useState<string[]>(defaultSelectedProducts);

  const colors = ['#3B82F6', '#A855F7', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  // Handle product selection
  const handleProductToggle = (productName: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(productName)) {
        return prev.filter(name => name !== productName);
      } else {
        // Limit to 10 products maximum
        if (prev.length >= 10) {
          return prev;
        }
        return [...prev, productName];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === data.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(data.slice(0, 10).map(product => product.name));
    }
  };

  // Filter data based on selected products and period
  const getFilteredData = () => {
    if (selectedProducts.length === 0 || !data[0]?.dailyStockHistory) return [];
    
    const allDates = data[0].dailyStockHistory.slice(-periodFilter);
    
    return allDates.map((dateData) => {
      const dataPoint: any = { date: dateData.date };
      
      // Add only selected products
      data.filter(product => selectedProducts.includes(product.name)).forEach((product) => {
        const productStock = product.dailyStockHistory?.find(h => h.date === dateData.date);
        if (productStock) {
          const productName = product.name.length > 12 ? product.name.substring(0, 12) + '...' : product.name;
          dataPoint[productName] = productStock.stock;
        }
      });
      
      return dataPoint;
    });
  };

  const chartData = getFilteredData();
  const selectedProductsData = data.filter(product => selectedProducts.includes(product.name));

  return (
    <div className="space-y-4">
      {/* Product Selection Section */}
      <Card className="bg-white/90 border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-gray-700">
            Selecionar Produtos ({selectedProducts.length}/10)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedProducts.length === Math.min(data.length, 10)}
                onCheckedChange={handleSelectAll}
              />
              <label
                htmlFor="select-all"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                Selecionar Todos
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
              {data.slice(0, 10).map((product) => (
                <div key={product.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={product.name}
                    checked={selectedProducts.includes(product.name)}
                    onCheckedChange={() => handleProductToggle(product.name)}
                  />
                  <label
                    htmlFor={product.name}
                    className="text-xs text-gray-600 cursor-pointer truncate flex-1"
                    title={product.name}
                  >
                    {product.name}
                  </label>
                </div>
              ))}
            </div>
            
            {data.length > 10 && (
              <p className="text-xs text-gray-500">
                Mostrando primeiros 10 produtos. Máximo de 10 produtos podem ser selecionados.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Period Filter Buttons */}
      <div className="flex space-x-2">
        <Button
          variant={periodFilter === 7 ? "default" : "outline"}
          size="sm"
          onClick={() => setPeriodFilter(7)}
          className="bg-orange-600 text-white hover:bg-orange-700"
        >
          7 dias
        </Button>
        <Button
          variant={periodFilter === 15 ? "default" : "outline"}
          size="sm"
          onClick={() => setPeriodFilter(15)}
          className="bg-orange-600 text-white hover:bg-orange-700"
        >
          15 dias
        </Button>
        <Button
          variant={periodFilter === 30 ? "default" : "outline"}
          size="sm"
          onClick={() => setPeriodFilter(30)}
          className="bg-orange-600 text-white hover:bg-orange-700"
        >
          30 dias
        </Button>
      </div>
      
      {/* Chart Section */}
      <div className="h-96">
        {selectedProducts.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p>Selecione pelo menos um produto para visualizar o histórico de estoque</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                fontSize={12}
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  color: '#374151',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              {selectedProductsData.map((product, index) => {
                const productName = product.name.length > 12 ? product.name.substring(0, 12) + '...' : product.name;
                return (
                  <Line
                    key={product.name}
                    type="monotone"
                    dataKey={productName}
                    stroke={colors[index % colors.length]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default StockHistoryChart;
