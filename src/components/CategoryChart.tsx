
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Product {
  category?: string;
  currentDemand: number;
}

interface CategoryChartProps {
  data: Product[];
}

const CategoryChart = ({ data }: CategoryChartProps) => {
  // Group products by category and calculate totals
  const categoryData = data.reduce((acc: any, product) => {
    const category = product.category || 'Sem Categoria';
    if (!acc[category]) {
      acc[category] = {
        name: category,
        totalDemand: 0,
        productCount: 0
      };
    }
    acc[category].totalDemand += product.currentDemand;
    acc[category].productCount += 1;
    return acc;
  }, {});

  const chartData = Object.values(categoryData).map((cat: any) => ({
    ...cat,
    avgDemand: Math.round(cat.totalDemand / cat.productCount)
  }));

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
          <XAxis 
            dataKey="name" 
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
            formatter={(value, name) => [
              name === 'totalDemand' ? `${value} (Total)` : `${value} (Média)`,
              name === 'totalDemand' ? 'Demanda Total' : 'Demanda Média'
            ]}
          />
          <Bar dataKey="totalDemand" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="avgDemand" fill="#A855F7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
