
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SpendingByCategory } from '../types';

interface TopSpendingChartProps {
  data: SpendingByCategory[];
}

const TopSpendingChart: React.FC<TopSpendingChartProps> = ({ data }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg h-96">
      <h3 className="text-lg font-semibold mb-4 text-white">Top 10 Spending Categories</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis type="number" stroke="#9CA3AF" />
          <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={120} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #4A5568' }}
            cursor={{ fill: 'rgba(34, 211, 238, 0.1)' }}
          />
          <Legend />
          <Bar dataKey="total" name="Total Spend" fill="#22D3EE" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopSpendingChart;
