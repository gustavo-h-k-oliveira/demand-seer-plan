
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';

interface Product {
  name: string;
  dailyStockHistory?: { date: string; stock: number }[];
}

interface StockHistoryChartProps {
  data: Product[];
}

const StockHistoryChart = ({ data }: StockHistoryChartProps) => {
  const [periodFilter, setPeriodFilter] = useState(30);

  // Prepare data for the chart based on period filter
  const getFilteredData = () => {
    if (!data[0]?.dailyStockHistory) return [];
    
    const allDates = data[0].dailyStockHistory.slice(-periodFilter);
    
    return allDates.map((dateData) => {
      const dataPoint: any = { date: dateData.date };
      
      // Add top 5 products to avoid cluttering
      data.slice(0, 5).forEach((product) => {
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
  const colors = ['#3B82F6', '#A855F7', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-4">
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
      
      <div className="h-96">
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
            {data.slice(0, 5).map((product, index) => {
              const productName = product.name.length > 12 ? product.name.substring(0, 12) + '...' : product.name;
              return (
                <Line
                  key={product.name}
                  type="monotone"
                  dataKey={productName}
                  stroke={colors[index]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockHistoryChart;
