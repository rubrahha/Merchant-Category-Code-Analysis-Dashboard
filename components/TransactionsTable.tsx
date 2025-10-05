
import React from 'react';
import { ProcessedTransaction } from '../types';

interface TransactionsTableProps {
  data: ProcessedTransaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ data }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
       <h3 className="text-lg font-semibold mb-4 text-white">Processed Transactions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Merchant</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">MCC</th>
              <th scope="col" className="px-6 py-3">MCC Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tx) => (
              <tr key={tx.transaction_id} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-600">
                <td className="px-6 py-4">{tx.date}</td>
                <td className="px-6 py-4 font-medium text-white">{tx.merchant_name}</td>
                <td className="px-6 py-4">${tx.amount.toFixed(2)}</td>
                <td className="px-6 py-4">{tx.mcc}</td>
                <td className="px-6 py-4">{tx.mcc_description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
