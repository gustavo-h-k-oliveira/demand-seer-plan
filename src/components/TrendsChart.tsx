
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Product {
  trend: 'up' | 'down' | 'stable';
}

interface TrendsChartProps {
  data: Product[];
}

const TrendsChart = ({ data }: TrendsChartProps) => {
  const trendsData = [
    {
      name: 'Em Alta',
      value: data.filter(p => p.trend === 'up').length,
      color: '#10B981'
    },
    {
      name: 'Estável',
      value: data.filter(p => p.trend === 'stable').length,
      color: '#F59E0B'
    },
    {
      name: 'Em Baixa',
      value: data.filter(p => p.trend === 'down').length,
      color: '#EF4444'
    }
  ].filter(item => item.value > 0);

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={trendsData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
          >
            {trendsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendsChart;
