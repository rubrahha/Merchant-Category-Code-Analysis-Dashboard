
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SpendingTrendPoint } from '../types';

interface SpendingTrendChartProps {
  data: SpendingTrendPoint[];
  categories: string[];
}

const COLORS = ['#22D3EE', '#818CF8', '#F472B6', '#34D399', '#FBBF24'];

const SpendingTrendChart: React.FC<SpendingTrendChartProps> = ({ data, categories }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg h-96">
      <h3 className="text-lg font-semibold mb-4 text-white">Spending Trends Over Time</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="date" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip 
             contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4A5568' }}
             cursor={{ stroke: '#4A5568', strokeWidth: 1 }}
          />
          <Legend />
          {categories.map((cat, index) => (
            <Line
              key={cat}
              type="monotone"
              dataKey={cat}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingTrendChart;
