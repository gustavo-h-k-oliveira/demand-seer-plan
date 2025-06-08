
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Product {
  name: string;
  stockHistory?: { month: string; stock: number }[];
}

interface StockHistoryChartProps {
  data: Product[];
}

const StockHistoryChart = ({ data }: StockHistoryChartProps) => {
  // Prepare data for the chart - combine all products' stock history
  const chartData = data[0]?.stockHistory?.map((monthData) => {
    const dataPoint: any = { month: monthData.month };
    
    // Add top 5 products to avoid cluttering
    data.slice(0, 5).forEach((product) => {
      const productStock = product.stockHistory?.find(h => h.month === monthData.month);
      if (productStock) {
        const productName = product.name.length > 12 ? product.name.substring(0, 12) + '...' : product.name;
        dataPoint[productName] = productStock.stock;
      }
    });
    
    return dataPoint;
  }) || [];

  const colors = ['#3B82F6', '#A855F7', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
          <XAxis 
            dataKey="month" 
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
  );
};

export default StockHistoryChart;
