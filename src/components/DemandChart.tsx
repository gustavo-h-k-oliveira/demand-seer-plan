
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Product {
  name: string;
  currentDemand: number;
  predictedDemand: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

interface DemandChartProps {
  data: Product[];
}

const DemandChart = ({ data }: DemandChartProps) => {
  const chartData = data.slice(0, 10).map((product) => ({
    name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
    'Demanda Atual': product.currentDemand,
    'Previsão IA': product.predictedDemand,
  }));

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            fontSize={12}
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
            tick={{ fill: '#9CA3AF' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend />
          <Bar 
            dataKey="Demanda Atual" 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="Previsão IA" 
            fill="#A855F7" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DemandChart;
